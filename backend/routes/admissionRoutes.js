const express = require("express");
const {completeApplication,getApplicationStatus,getAllApplications,getAdmissionStats,getApplicationById,updateApplicationStatus} = require("../controllers/admissionController");
const { protect, authorize } = require("../middlewares/auth");
const {admissionValidation} = require("../middlewares/validation/admissionValidation");

const admissionRouter = express.Router();

admissionRouter.post(
  "/complete",
  admissionValidation.completeApplication,
  completeApplication
);

admissionRouter.get(
  "/status/:applicationId",
  getApplicationStatus
);

admissionRouter.get(
  "/",
  protect,
  authorize("admin", "super_admin"),
  getAllApplications
);

admissionRouter.get(
  "/stats/overview",
  protect,
  authorize("admin", "super_admin"),
  getAdmissionStats
);

admissionRouter.get(
  "/:id",
  protect,
  authorize("admin", "super_admin"),
  getApplicationById
);

admissionRouter.put(
  "/:id/status",
  protect,
  authorize("admin", "super_admin"),
  admissionValidation.updateStatus,
  updateApplicationStatus
);

module.exports = admissionRouter;
