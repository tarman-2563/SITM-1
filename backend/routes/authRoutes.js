const express = require("express");
const { body, param } = require("express-validator");
const { protect, authorize } = require("../middlewares/auth");
const {login,getActivationInfo,activateAccount,getProfile,updateProfile,changePassword,forgotPassword,resetPassword,logout,getAdmins,createAdmin,updateAdmin,deleteAdmin} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 1 })],
  login
);

authRouter.get("/activate/:token", getActivationInfo);

authRouter.post(
  "/activate/:token",
  [
    body("password").isLength({ min: 6 }),
    body("confirmPassword").custom((v, { req }) => v === req.body.password)
  ],
  activateAccount
);

authRouter.get("/profile", protect, getProfile);

authRouter.put(
  "/profile",
  protect,
  [
    body("firstName").optional().trim().isLength({ min: 1 }),
    body("lastName").optional().trim().isLength({ min: 1 }),
    body("phone").optional().matches(/^[6-9]\d{9}$/)
  ],
  updateProfile
);

authRouter.put(
  "/change-password",
  protect,
  [
    body("currentPassword").isLength({ min: 1 }),
    body("newPassword").isLength({ min: 6 })
  ],
  changePassword
);

authRouter.post("/forgot-password", [body("email").isEmail()], forgotPassword);

authRouter.put(
  "/reset-password/:resettoken",
  [body("password").isLength({ min: 6 })],
  resetPassword
);

authRouter.post("/logout", protect, logout);

// Admin management routes
authRouter.get("/admin/users", protect, authorize("super_admin"), getAdmins);

authRouter.post(
  "/admin/users",
  protect,
  authorize("super_admin"),
  [
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(["admin", "super_admin"]).withMessage("Role must be admin or super_admin")
  ],
  createAdmin
);

authRouter.put("/admin/users/:id", [
  param("id").isMongoId().withMessage("Valid user ID is required"),
  body("firstName").optional().trim().isLength({ min: 1 }).withMessage("First name cannot be empty"),
  body("lastName").optional().trim().isLength({ min: 1 }).withMessage("Last name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("role").optional().isIn(["admin", "super_admin"]).withMessage("Role must be admin or super_admin"),
  body("isActive").optional().isBoolean().withMessage("isActive must be a boolean")
], protect, authorize("super_admin"), updateAdmin);

authRouter.delete("/admin/users/:id", [
  param("id").isMongoId().withMessage("Valid user ID is required")
], protect, authorize("super_admin"), deleteAdmin);

module.exports = authRouter;
