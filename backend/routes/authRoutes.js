const express = require("express");
const { body } = require("express-validator");
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
    body("name").trim().isLength({ min: 1 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").isIn(["admin", "super_admin"]),
    body("department").isIn(["admissions", "academics", "placements", "general", "it"])
  ],
  createAdmin
);

authRouter.put("/admin/users/:id", protect, authorize("super_admin"), updateAdmin);

authRouter.delete("/admin/users/:id", protect, authorize("super_admin"), deleteAdmin);

module.exports = authRouter;
