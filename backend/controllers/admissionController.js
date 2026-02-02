const { validationResult } = require("express-validator");
const { admissionService } = require("../services/admissionService");
const logger = require("../utils/logger");

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

module.exports = {
  completeApplication,
  getApplicationStatus,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  getAdmissionStats
};
