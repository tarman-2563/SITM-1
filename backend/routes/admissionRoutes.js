const express = require("express");
const { body, param } = require("express-validator");
const {
  completeApplication,
  getApplicationStatus,
  getAllApplications,
  getAdmissionStats,
  getApplicationById,
  updateApplicationStatus,
  exportApplicationsCSV
} = require("../controllers/admissionController");

const { protect, authorize } = require("../middlewares/auth");

const admissionRouter = express.Router();

admissionRouter.post("/complete", [
  body("leadId").isMongoId().withMessage("Valid lead ID is required"),
  body("personalInfo.dateOfBirth").isISO8601().withMessage("Valid date of birth is required"),
  body("personalInfo.gender").isIn(["Male", "Female", "Other"]).withMessage("Gender must be Male, Female, or Other"),
  body("personalInfo.address.street").trim().isLength({ min: 5 }).withMessage("Street address must be at least 5 characters"),
  body("personalInfo.address.city").trim().isLength({ min: 2 }).withMessage("City is required"),
  body("personalInfo.address.state").trim().isLength({ min: 2 }).withMessage("State is required"),
  body("personalInfo.address.pincode").matches(/^[1-9][0-9]{5}$/).withMessage("Valid 6-digit pincode is required"),
  body("academicInfo.previousEducation.qualification").trim().isLength({ min: 2 }).withMessage("Qualification is required"),
  body("academicInfo.previousEducation.board").trim().isLength({ min: 2 }).withMessage("Board is required"),
  body("academicInfo.previousEducation.percentage").isFloat({ min: 0, max: 100 }).withMessage("Percentage must be between 0 and 100"),
  body("academicInfo.previousEducation.yearOfPassing").isInt({ min: 2000, max: new Date().getFullYear() }).withMessage("Valid year of passing is required"),
  body("familyInfo.father.name").trim().isLength({ min: 2 }).withMessage("Father's name is required"),
  body("familyInfo.father.phone").matches(/^[6-9]\d{9}$/).withMessage("Valid Indian phone number is required"),
  body("familyInfo.father.occupation").trim().isLength({ min: 2 }).withMessage("Father's occupation is required")
], completeApplication);

admissionRouter.get("/status/:applicationId", [
  param("applicationId").trim().isLength({ min: 1 }).withMessage("Application ID is required")
], getApplicationStatus);

admissionRouter.get("/", protect, authorize("admin", "super_admin"), getAllApplications);

admissionRouter.get("/stats/overview", protect, authorize("admin", "super_admin"), getAdmissionStats);

// CSV Export route - Admin only (must be before /:id route)
admissionRouter.get("/export/csv", protect, authorize("admin", "super_admin"), exportApplicationsCSV);

admissionRouter.get("/:id", [
  param("id").isMongoId().withMessage("Valid application ID is required")
], protect, authorize("admin", "super_admin"), getApplicationById);

admissionRouter.put("/:id/status", [
  param("id").isMongoId().withMessage("Valid application ID is required"),
  body("status").isIn(["pending", "under_review", "approved", "rejected", "waitlisted"]).withMessage("Valid status is required"),
  body("remarks").optional().trim().isLength({ max: 500 }).withMessage("Remarks cannot exceed 500 characters")
], protect, authorize("admin", "super_admin"), updateApplicationStatus);

module.exports = admissionRouter;
