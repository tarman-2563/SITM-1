const { validationResult } = require("express-validator");
const { authService } = require("../services/authService");

const validate = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.errors = errors.array();
    throw error;
  }
};

const login = async (req, res) => {
  try {
    validate(req);
    const result = await authService.loginUser(req.body.email, req.body.password);

    if (!result.success) {
      return res.status(result.statusCode).json({
        status: "error",
        message: result.message
      });
    }

    res.json({
      status: "success",
      message: "Login successful",
      data: result.data
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
      errors: error.errors
    });
  }
};

const getActivationInfo = async (req, res) => {
  try {
    const user = await authService.getActivationInfo(req.params.token);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired activation link"
      });
    }

    res.json({
      status: "success",
      data: {
        token: req.params.token,
        name: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const activateAccount = async (req, res) => {
  try {
    validate(req);
    const result = await authService.activateAccount(
      req.params.token,
      req.body.password
    );

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: result.message
      });
    }

    res.json({
      status: "success",
      message: "Account activated successfully! Welcome to SITM.",
      data: result.data
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
      errors: error.errors
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user._id);

    res.json({
      status: "success",
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    validate(req);
    const user = await authService.updateUserProfile(req.user._id, req.body);

    res.json({
      status: "success",
      message: "Profile updated successfully",
      data: { user }
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
      errors: error.errors
    });
  }
};

const changePassword = async (req, res) => {
  try {
    validate(req);
    const result = await authService.changePassword(
      req.user._id,
      req.body.currentPassword,
      req.body.newPassword
    );

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: result.message
      });
    }

    res.json({
      status: "success",
      message: "Password changed successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    validate(req);
    const result = await authService.forgotPassword(req.body.email, req);

    if (!result.success) {
      return res.status(404).json({
        status: "error",
        message: result.message
      });
    }

    res.json({
      status: "success",
      message: "Password reset email sent"
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "Email could not be sent"
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    validate(req);
    const result = await authService.resetPassword(
      req.params.resettoken,
      req.body.password
    );

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: result.message
      });
    }

    res.json({
      status: "success",
      message: "Password reset successful",
      data: result.data
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const logout = async (req, res) => {
  res.json({
    status: "success",
    message: "Logged out successfully"
  });
};

// Admin management functions
const getAdmins = async (req, res) => {
  try {
    const data = await authService.getAdmins(req.query);
    res.json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    validate(req);
    const admin = await authService.createAdmin(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Admin created successfully',
      data: admin
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    validate(req);
    const admin = await authService.updateAdmin(req.params.id, req.body);
    res.json({
      status: 'success',
      message: 'Admin updated successfully',
      data: admin
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message,
      errors: error.errors
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    validate(req);
    await authService.deleteAdmin(req.params.id);
    res.json({
      status: 'success',
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message,
      errors: error.errors
    });
  }
};

module.exports = {
  login,
  getActivationInfo,
  activateAccount,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
  // Admin management functions
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
