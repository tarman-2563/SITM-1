const express = require("express");
const { body, param } = require("express-validator");
const { createLead, getLeadById, getAllLeads, exportLeadsCSV } = require("../controllers/leadController");
const { protect, authorize } = require("../middlewares/auth");

const leadsRouter = express.Router();

// Public route - create lead
leadsRouter.post("/", [
    body("firstName").trim().isLength({ min: 2, max: 50 }).withMessage("First name must be 2-50 characters long"),
    body("lastName").trim().isLength({ min: 2, max: 50 }).withMessage("Last name must be 2-50 characters long"),
    body("email").optional({ checkFalsy: true }).isEmail().normalizeEmail().withMessage("Valid email address is required"),
    body("phone").matches(/^[6-9]\d{9}$/).withMessage("Valid Indian phone number is required (10 digits starting with 6-9)"),
    body("program").isIn(["CSE", "ECE", "EEE", "ME", "CE", "BCA", "BBA", "DATA_SCIENCE"]).withMessage("Program must be one of: CSE, ECE, EEE, ME, CE, BCA, BBA, DATA_SCIENCE"),
    body("state").trim().notEmpty().withMessage("State is required"),
    body("tenthPercentage").isFloat({ min: 0, max: 100 }).withMessage("10th percentage must be between 0 and 100"),
    body("twelfthInfo").trim().notEmpty().withMessage("12th information is required")
], createLead);

// Admin routes - protected
leadsRouter.get("/all", protect, authorize('admin', 'super_admin'), getAllLeads);
leadsRouter.get("/export", protect, authorize('admin', 'super_admin'), exportLeadsCSV);

// Get single lead
leadsRouter.get("/:id", [
    param("id").isMongoId().withMessage("Valid lead ID is required")
], getLeadById);

module.exports = leadsRouter;