const { validationResult } = require("express-validator");
const { admissionService } = require("../services/admissionService");

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

    const result = await admissionService.completeApplication(req.body, req);

    res.status(201).json({
      status: "success",
      message: "Application submitted successfully! Check your email for next steps.",
      data: {
        applicationId: result.admission.applicationId,
        email: result.admission.email,
        program: result.admission.program,
        accountCreated: result.accountCreated
      }
    });
  } catch (error) {
    if (
      error.message.includes("not found") ||
      error.message.includes("already exists")
    ) {
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

const getAllApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filters = {
      status: req.query.status,
      program: req.query.program,
      search: req.query.search
    };

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

const getApplicationById = async (req, res) => {
  try {
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
