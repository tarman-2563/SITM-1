const { validationResult } = require("express-validator");
const { admissionService } = require("../services/admissionService");
const logger = require("../utils/logger");
const { exportApplicationsToCsv } = require("../utils/csvExport");

const completeApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array()
      });
    }

    logger.debug("Processing application completion request");
    
    const result = await admissionService.completeApplication(req.body, req);

    res.status(201).json({
      status: "success",
      message: "Application submitted successfully! Check your email for next steps.",
      data: {
        applicationId: result.admission.applicationId,
        email: result.admission.email,
        program: result.admission.program,
        accountCreated: result.accountCreated,
        activationToken: result.activationToken
      }
    });
  } catch (error) {
    logger.error("Application completion failed", { 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
    
    if (error.message.includes("not found") || error.message.includes("already exists")) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }

    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const getApplicationStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const admission = await admissionService.getApplicationStatus(
      req.params.applicationId
    );

    if (!admission) {
      return res.status(404).json({
        status: "error",
        message: "Application not found"
      });
    }

    res.json({
      status: "success",
      data: admission
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const admission = await admissionService.getApplicationById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        status: "error",
        message: "Application not found"
      });
    }

    res.json({
      status: "success",
      data: admission
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const admission = await admissionService.updateApplicationStatus(
      req.params.id,
      req.body.status,
      req.body.remarks,
      req.user._id
    );

    if (!admission) {
      return res.status(404).json({
        status: "error",
        message: "Application not found"
      });
    }

    res.json({
      status: "success",
      message: "Application status updated successfully",
      data: admission
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Max 100 per page

    // Validate query parameters
    if (page < 1) {
      return res.status(400).json({
        status: "error",
        message: "Page number must be greater than 0"
      });
    }

    if (limit < 1) {
      return res.status(400).json({
        status: "error",
        message: "Limit must be greater than 0"
      });
    }

    const filters = {
      status: req.query.status,
      program: req.query.program,
      search: req.query.search
    };

    // Validate status filter
    if (filters.status && !["pending", "under_review", "approved", "rejected", "waitlisted"].includes(filters.status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status filter"
      });
    }

    // Validate program filter
    if (filters.program && !["CSE", "ECE", "ME", "CE", "BCA", "BBA"].includes(filters.program)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid program filter"
      });
    }

    const result = await admissionService.getAllApplications(
      page,
      limit,
      filters
    );

    res.json({
      status: "success",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const getAdmissionStats = async (req, res) => {
  try {
    const stats = await admissionService.getAdmissionStatistics();

    res.json({
      status: "success",
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Export applications to CSV
const exportApplicationsCSV = async (req, res) => {
  try {
    logger.debug("Processing CSV export request", { 
      query: req.query,
      user: req.user?.email,
      timestamp: new Date().toISOString()
    });
    
    // Get query parameters for filtering
    const { status, program, search, startDate, endDate } = req.query;
    
    // Build filter object
    const filters = {};
    if (status) filters.status = status;
    if (program) filters.program = program;
    if (search) {
      filters.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { applicationId: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Handle date filtering
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) {
        // Parse start date and set to beginning of day
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        filters.createdAt.$gte = start;
      }
      if (endDate) {
        // Parse end date and set to end of day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filters.createdAt.$lte = end;
      }
    }

    // Get applications from service
    const applications = await admissionService.getAllApplicationsForExport(filters);
    
    if (!applications || applications.length === 0) {
      logger.info("No applications found for CSV export");
      
      // Return empty CSV with headers
      const csvContent = exportApplicationsToCsv([]);
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `applications_export_${timestamp}_empty.csv`;
      
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Pragma', 'no-cache');
      
      return res.status(200).send(csvContent || 'No data available');
    }
    
    // Generate CSV content
    const csvContent = exportApplicationsToCsv(applications);
    
    if (!csvContent) {
      logger.error("Failed to generate CSV content");
      return res.status(500).json({
        status: "error",
        message: "Failed to generate CSV content"
      });
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `applications_export_${timestamp}.csv`;
    
    // Set response headers for file download
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    
    // Send CSV content
    res.status(200).send(csvContent);
    
    logger.info(`CSV export completed successfully: ${applications.length} applications exported`);
    
  } catch (error) {
    logger.error("CSV export failed:", {
      error: error.message,
      stack: error.stack,
      user: req.user?.email,
      query: req.query
    });
    
    res.status(500).json({
      status: "error",
      message: "Failed to export applications",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  completeApplication,
  getApplicationStatus,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  getAdmissionStats,
  exportApplicationsCSV
};
