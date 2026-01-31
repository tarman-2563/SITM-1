const { body } = require("express-validator");

const completeApplication = [
  body("leadId").isMongoId().withMessage("Valid lead ID is required"),
  body("personalInfo.dateOfBirth").isISO8601().withMessage("Valid date of birth is required"),
  body("personalInfo.gender").isIn(["Male", "Female", "Other"]).withMessage("Valid gender is required"),
  body("personalInfo.address.street").trim().isLength({ min: 1 }).withMessage("Street address is required"),
  body("personalInfo.address.city").trim().isLength({ min: 1 }).withMessage("City is required"),
  body("personalInfo.address.state").trim().isLength({ min: 1 }).withMessage("State is required"),
  body("personalInfo.address.pincode").matches(/^[1-9][0-9]{5}$/).withMessage("Valid pincode is required"),
  body("academicInfo.previousEducation.qualification").trim().isLength({ min: 1 }).withMessage("Qualification is required"),
  body("academicInfo.previousEducation.board").trim().isLength({ min: 1 }).withMessage("Board is required"),
  body("academicInfo.previousEducation.percentage").isFloat({ min: 0, max: 100 }).withMessage("Valid percentage is required"),
  body("academicInfo.previousEducation.yearOfPassing").isInt({ min: 2000, max: new Date().getFullYear() }).withMessage("Valid year of passing is required"),
  body("familyInfo.father.name").trim().isLength({ min: 1 }).withMessage("Father's name is required"),
  body("familyInfo.father.phone").matches(/^[6-9]\d{9}$/).withMessage("Valid father's phone is required"),
  body("familyInfo.father.occupation").trim().isLength({ min: 1 }).withMessage("Father's occupation is required")
];

const updateStatus = [
  body("status").isIn(["pending", "under_review", "approved", "rejected", "waitlisted"]).withMessage("Valid status is required"),
  body("remarks").optional().trim().isLength({ max: 500 }).withMessage("Remarks cannot exceed 500 characters")
];

module.exports = {
  admissionValidation: {
    completeApplication,
    updateStatus
  }
};