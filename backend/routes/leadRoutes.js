const express = require("express");
const { body, param } = require("express-validator");
const { createLead, getLeadById } = require("../controllers/leadController");

const leadsRouter = express.Router();

leadsRouter.post("/", [
    body("firstName").trim().isLength({ min: 2, max: 50 }).withMessage("First name must be 2-50 characters long"),
    body("lastName").trim().isLength({ min: 2, max: 50 }).withMessage("Last name must be 2-50 characters long"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email address is required"),
    body("phone").matches(/^[6-9]\d{9}$/).withMessage("Valid Indian phone number is required (10 digits starting with 6-9)"),
    body("program").isIn(["CSE", "ECE", "ME", "CE", "BCA", "BBA"]).withMessage("Program must be one of: CSE, ECE, ME, CE, BCA, BBA")
], createLead);

leadsRouter.get("/:id", [
    param("id").isMongoId().withMessage("Valid lead ID is required")
], getLeadById);

module.exports = leadsRouter;