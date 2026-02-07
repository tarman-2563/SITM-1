const OTP = require('../models/OTP');
const logger = require('../utils/logger');
const crypto = require('crypto');
const { initializeFirebase, admin } = require('../config/firebase');

const rateLimitStore = new Map();

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const checkRateLimit = (phone) => {
  const key = `otp_${phone}`;
  const now = Date.now();
  const limit = rateLimitStore.get(key);

  if (limit) {
    const { count, resetTime } = limit;
    
    if (now > resetTime) {
      rateLimitStore.delete(key);
      return { allowed: true };
    }

    if (count >= 3) {
      const waitTime = Math.ceil((resetTime - now) / 1000 / 60);
      return { 
        allowed: false, 
        message: `Too many OTP requests. Please try again after ${waitTime} minutes.` 
      };
    }

    rateLimitStore.set(key, { count: count + 1, resetTime });
    return { allowed: true };
  }

  rateLimitStore.set(key, { 
    count: 1, 
    resetTime: now + (15 * 60 * 1000)
  });
  return { allowed: true };
};

const sendSMS = async (phone, otp, purpose) => {
  const messages = {
    login: `Your SITM login OTP is: ${otp}. Valid for 10 minutes. Do not share this OTP.`,
    registration: `Your SITM registration OTP is: ${otp}. Valid for 10 minutes.`,
    password_reset: `Your SITM password reset OTP is: ${otp}. Valid for 10 minutes.`
  };

  const message = messages[purpose] || messages.login;

  if (process.env.NODE_ENV === 'development' && !process.env.FIREBASE_ENABLED) {
    logger.info('SMS OTP (Development Mode)', { phone, otp, message });
    console.log('\n=================================');
    console.log(`� MSMS to ${phone}`);
    console.log(`📨 Message: ${message}`);
    console.log(`🔢 OTP: ${otp}`);
    console.log('=================================\n');
    return;
  }

  try {
    initializeFirebase();
    
    const phoneNumber = `+91${phone}`;
    
    await admin.auth().createCustomToken(phone, {
      otp: otp,
      purpose: purpose,
      timestamp: Date.now()
    });

    logger.info('Firebase SMS sent successfully', { phone });
    
    console.log('\n=================================');
    console.log(`✅ OTP sent via Firebase to ${phone}`);
    console.log(`📨 Message: ${message}`);
    console.log('=================================\n');
  } catch (error) {
    logger.error('Firebase SMS sending failed', { phone, error: error.message });
    
    logger.warn('Falling back to development mode');
    console.log('\n=================================');
    console.log(`📱 SMS to ${phone} (Fallback)`);
    console.log(`📨 Message: ${message}`);
    console.log(`🔢 OTP: ${otp}`);
    console.log('=================================\n');
  }
};

const sendOTP = async (phone, purpose = 'login') => {
  try {
    const rateCheck = checkRateLimit(phone);
    if (!rateCheck.allowed) {
      throw new Error(rateCheck.message);
    }

    await OTP.updateMany(
      { phone, purpose, isUsed: false },
      { isUsed: true }
    );

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const otp = await OTP.create({
      phone,
      otp: otpCode,
      purpose,
      expiresAt
    });

    await sendSMS(phone, otpCode, purpose);

    logger.info('OTP sent successfully', { phone, purpose, otpId: otp._id });

    return {
      success: true,
      message: 'OTP sent successfully',
      expiresIn: 600
    };
  } catch (error) {
    logger.error('Failed to send OTP', { phone, purpose, error: error.message });
    throw error;
  }
};

const verifyOTP = async (phone, otpCode, purpose = 'login') => {
  try {
    const otp = await OTP.findOne({
      phone,
      purpose,
      isUsed: false
    }).sort({ createdAt: -1 });

    if (!otp) {
      return {
        success: false,
        message: 'No valid OTP found. Please request a new one.'
      };
    }

    const result = otp.verify(otpCode);
    await otp.save();

    if (result.success) {
      logger.info('OTP verified successfully', { phone, purpose });
    } else {
      logger.warn('OTP verification failed', { phone, purpose, reason: result.message });
    }

    return result;
  } catch (error) {
    logger.error('OTP verification error', { phone, purpose, error: error.message });
    throw error;
  }
};

const cleanupExpiredOTPs = async () => {
  try {
    const result = await OTP.deleteMany({
      expiresAt: { $lt: new Date() }
    });
    logger.info('Cleaned up expired OTPs', { count: result.deletedCount });
  } catch (error) {
    logger.error('Failed to cleanup expired OTPs', { error: error.message });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  cleanupExpiredOTPs
};
