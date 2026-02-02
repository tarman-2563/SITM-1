const User = require("../models/User");
const { emailService } = require("./emailService");
const crypto = require("crypto");

const loginUser = async (email, password) => {
  console.log("Login attempt for email:", email);
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("User not found for email:", email);
    return { success: false, statusCode: 401, message: "Invalid credentials" };
  }

  console.log("User found:", {
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    isLocked: user.isLocked,
    hasPassword: !!user.password
  });

  if (user.isLocked) {
    console.log("User account is locked");
    return {
      success: false,
      statusCode: 423,
      message: "Account temporarily locked due to too many failed login attempts"
    };
  }

  if (!user.isActive) {
    console.log("User account is not active");
    return {
      success: false,
      statusCode: 401,
      message: "Account not activated. Please check your email."
    };
  }

  console.log("Checking password match...");
  const isMatch = await user.matchPassword(password);
  console.log("Password match result:", isMatch);

  if (!isMatch) {
    console.log("Password does not match");
    await user.incLoginAttempts();
    return { success: false, statusCode: 401, message: "Invalid credentials" };
  }

  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  user.lastLogin = new Date();
  await user.save();

  let redirectTo = "/student/dashboard";
  if (user.role === "admin" || user.role === "super_admin") {
    redirectTo = "/admin/dashboard";
  } else if (user.role === "faculty") {
    redirectTo = "/faculty/dashboard";
  }

  console.log("Login successful for user:", user.email);

  return {
    success: true,
    data: {
      token: user.getSignedJwtToken(),
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        userType: user.userType,
        permissions: user.getPermissions(),
        academic: user.academic,
        staff: user.staff,
        profile: user.profile
      },
      redirectTo
    }
  };
};

const getActivationInfo = async (token) => {
  return User.findOne({
    activationToken: token,
    activationExpire: { $gt: Date.now() },
    isActive: false
  });
};

const activateAccount = async (token, password) => {
  const user = await User.findOne({
    activationToken: token,
    activationExpire: { $gt: Date.now() },
    isActive: false
  });

  if (!user) {
    return { success: false, message: "Invalid or expired activation link" };
  }

  user.password = password;
  user.isActive = true;
  user.activationToken = undefined;
  user.activationExpire = undefined;
  user.emailVerifiedAt = new Date();
  await user.save();

  let redirectTo = "/student/dashboard";
  if (user.role === "admin" || user.role === "super_admin") {
    redirectTo = "/admin/dashboard";
  }

  return {
    success: true,
    data: {
      token: user.getSignedJwtToken(),
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        applicationId: user.applicationId
      },
      redirectTo
    }
  };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).populate(
    "applicationId",
    "applicationId status program createdAt"
  );

  return {
    id: user._id,
    name: user.fullName,
    email: user.email,
    role: user.role,
    userType: user.userType,
    permissions: user.getPermissions(),
    academic: user.academic,
    staff: user.staff,
    profile: user.profile,
    preferences: user.preferences,
    isVerified: user.isVerified,
    application: user.applicationId,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin
  };
};

const updateUserProfile = async (userId, data) => {
  const allowed = ["firstName", "lastName", "phone", "profile", "preferences"];
  const update = {};

  allowed.forEach((field) => {
    if (data[field] !== undefined) {
      update[field] = data[field];
    }
  });

  return User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true
  });
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return { success: false, message: "Current password is incorrect" };
  }

  user.password = newPassword;
  await user.save();

  return { success: true };
};

const forgotPassword = async (email, req) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { success: false, message: "No user found with this email" };
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
  await emailService.sendPasswordResetEmail(user, resetUrl);

  return { success: true };
};

const resetPassword = async (token, newPassword) => {
  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return { success: false, message: "Invalid or expired reset token" };
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return {
    success: true,
    data: {
      token: user.getSignedJwtToken(),
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role
      }
    }
  };
};

// Admin management functions
const getAdmins = async (query = {}) => {
  const { page = 1, limit = 10, role, department, search } = query;
  const filter = { role: { $in: ['admin', 'super_admin'] } };

  if (role) filter.role = role;
  if (department) filter['staff.department'] = department;
  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const admins = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await User.countDocuments(filter);

  return {
    admins,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  };
};

const createAdmin = async (data) => {
  const { name, email, password, role, department } = data;
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User with this email already exists');
    error.statusCode = 400;
    throw error;
  }

  // Split name into firstName and lastName
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || firstName;

  const userData = {
    firstName,
    lastName,
    email,
    password,
    role,
    userType: 'staff',
    staff: {
      department,
      designation: 'Administrator',
      joiningDate: new Date()
    },
    isActive: true,
    isVerified: true,
    emailVerifiedAt: new Date()
  };

  const admin = await User.create(userData);
  return admin;
};

const updateAdmin = async (adminId, data) => {
  const allowed = ['firstName', 'lastName', 'role', 'staff.department', 'isActive'];
  const update = {};

  Object.keys(data).forEach(key => {
    if (allowed.includes(key)) {
      update[key] = data[key];
    }
  });

  const admin = await User.findByIdAndUpdate(adminId, update, {
    new: true,
    runValidators: true
  }).select('-password');

  if (!admin) {
    const error = new Error('Admin not found');
    error.statusCode = 404;
    throw error;
  }

  return admin;
};

const deleteAdmin = async (adminId) => {
  const admin = await User.findById(adminId);
  
  if (!admin) {
    const error = new Error('Admin not found');
    error.statusCode = 404;
    throw error;
  }

  if (admin.role === 'super_admin') {
    const error = new Error('Cannot delete super admin');
    error.statusCode = 403;
    throw error;
  }

  await User.findByIdAndDelete(adminId);
  return true;
};

module.exports = {
  authService: {
    loginUser,
    getActivationInfo,
    activateAccount,
    getUserProfile,
    updateUserProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    // Admin management functions
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
  }
};
