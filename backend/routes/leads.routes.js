const express=require("express");
const {body} = require("express-validator");
const {createLead} = require("../controllers/leads.controller");

const leadsRouter=express.Router();

leadsRouter.post("/",[
    body("firstName").trim().isLength({min:4}).withMessage("First name must be at least 4 characters long"),
    body("lastName").trim().isLength({min:4}).withMessage("Last name must be at least 4 characters long"),
    body("email").isEmail().withMessage("Valid email address is required"),
    body("phone").matches(/^\+?[1-9]\d{1,14}$/).withMessage("Valid phone number is required"),
    body("program").isIn(["CSE","ECE","ME","CE","BCA","BBA"]).withMessage("Program must be one of the predefined options")
],createLead)

module.exports=leadsRouter;