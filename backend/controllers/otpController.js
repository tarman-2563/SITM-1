const { validationResult } = require('express-validator');
const otpService = require('../services/otpService');
const User = require('../models/User');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

const sendLoginOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { phone } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'No account found with this phone number. Please register first.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        status: 'error',
        message: 'Your account is not active. Please contact support.'
      });
    }

    const result = await otpService.sendOTP(phone, 'login');

    res.status(200).json({
      status: 'success',
      message: result.message,
      data: {
        expiresIn: result.expiresIn,
        phone: phone.replace(/(\d{2})(\d{4})(\d{4})/, '$1****$3')
      }
    });
  } catch (error) {
    logger.error('Send login OTP failed', { error: error.message });
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to send OTP. Please try again.'
    });
  }
};

const loginWithOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { phone, otp } = req.body;

    const otpResult = await otpService.verifyOTP(phone, otp, 'login');
    
    if (!otpResult.success) {
      return res.status(400).json({
        status: 'error',
        message: otpResult.message
      });
    }

    const user = await User.findOne({ phone }).select('+password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        status: 'error',
        message: 'Your account is not active. Please contact support.'
      });
    }

    user.lastLogin = new Date();
    if (!user.phoneVerified) {
      user.phoneVerified = true;
      user.phoneVerifiedAt = new Date();
      logger.info('Phone number verified via OTP', { userId: user._id, phone: user.phone });
    }
    await user.save();

    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const userData = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
      role: user.role,
      isVerified: user.isVerified,
      academic: user.academic,
      application: user.applicationId ? {
        applicationId: user.applicationId
      } : null
    };

    let redirectTo = '/dashboard';
    if (user.role === 'admin' || user.role === 'super_admin') {
      redirectTo = '/admin/dashboard';
    }

    logger.info('User logged in with OTP', { 
      userId: user._id, 
      email: user.email,
      phone: user.phone 
    });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        user: userData,
        redirectTo
      }
    });
  } catch (error) {
    logger.error('OTP login failed', { error: error.message });
    res.status(500).json({
      status: 'error',
      message: 'Login failed. Please try again.'
    });
  }
};

module.exports = {
  sendLoginOTP,
  loginWithOTP
};
