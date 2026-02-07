const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['login', 'registration', 'password_reset'],
    default: 'login'
  },
  attempts: {
    type: Number,
    default: 0
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }
  }
}, {
  timestamps: true
});

otpSchema.index({ phone: 1, purpose: 1, isUsed: 1 });

otpSchema.methods.verify = function(inputOtp) {
  if (this.isUsed) {
    return { success: false, message: 'OTP already used' };
  }
  
  if (new Date() > this.expiresAt) {
    return { success: false, message: 'OTP expired' };
  }
  
  if (this.attempts >= 3) {
    return { success: false, message: 'Maximum verification attempts exceeded' };
  }
  
  this.attempts += 1;
  
  if (this.otp === inputOtp) {
    this.isUsed = true;
    return { success: true, message: 'OTP verified successfully' };
  }
  
  return { success: false, message: 'Invalid OTP' };
};

module.exports = mongoose.model('OTP', otpSchema);
