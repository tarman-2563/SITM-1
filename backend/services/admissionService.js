const Admission = require("../models/Admission");
const Lead = require("../models/Lead");
const User = require("../models/User");
const { emailService } = require("./emailService");
const crypto = require("crypto");
const logger = require("../utils/logger");

const completeApplication = async (applicationData, req) => {
  logger.debug("Processing application completion", { leadId: applicationData.leadId });
  
  const lead = await Lead.findById(applicationData.leadId);
  if (!lead) {
    throw new Error("Lead not found");
  }

  const existingApplication = await Admission.findOne({
    $or: [{ email: lead.email }, { leadId: applicationData.leadId }]
  });
  if (existingApplication) {
    throw new Error("Application already exists for this email");
  }

  if (!applicationData.personalInfo) {
    throw new Error("Personal information is required");
  }
  if (!applicationData.academicInfo || !applicationData.academicInfo.previousEducation) {
    throw new Error("Academic information is required");
  }
  if (!applicationData.familyInfo || !applicationData.familyInfo.father) {
    throw new Error("Family information is required");
  }

  const admissionData = {
    leadId: applicationData.leadId,
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    program: lead.program,
    dateOfBirth: applicationData.personalInfo.dateOfBirth,
    gender: applicationData.personalInfo.gender,
    nationality: applicationData.personalInfo.nationality || "Indian",
    category: applicationData.personalInfo.category,
    bloodGroup: applicationData.personalInfo.bloodGroup,
    aadharNumber: applicationData.personalInfo.aadharNumber,
    address: applicationData.personalInfo.address,
    previousEducation: applicationData.academicInfo.previousEducation,
    entranceExam: applicationData.academicInfo.entranceExam,
    achievements: applicationData.academicInfo.achievements || [],
    guardianName: applicationData.familyInfo.father.name,
    guardianPhone: applicationData.familyInfo.father.phone,
    guardianOccupation: applicationData.familyInfo.father.occupation,
    guardianEmail: applicationData.familyInfo.father.email || null,
    familyInfo: applicationData.familyInfo,
    additionalInfo: applicationData.additionalInfo,
    documents: applicationData.documents || [],
    source: "website_complete",
    submittedAt: new Date()
  };

  logger.debug("Creating admission record");
  const admission = await Admission.create(admissionData);

  lead.leadStatus = "application_completed";
  lead.applicationId = admission._id;
  lead.convertedAt = new Date();
  await lead.addActivity("application_completed", "Full application submitted");

  // Create user account automatically
  let accountCreated = false;
  let activationToken = null;
  
  try {
    logger.debug("Checking if user account exists");
    let user = await User.findOne({ email: lead.email });
    
    if (!user) {
      logger.debug("Creating new user account");
      
      // Generate activation token
      activationToken = crypto.randomBytes(32).toString('hex');
      const activationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      
      // Create user account with minimal data first
      const userData = {
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        role: 'applicant',
        userType: 'student',
        isActive: false, // Will be activated when password is set
        isVerified: false,
        activationToken: activationToken,
        activationExpire: activationExpire,
        applicationId: admission._id
      };
      
      // Add academic info if available
      if (lead.program) {
        userData.academic = {
          program: lead.program,
          admissionYear: new Date().getFullYear(),
          currentStatus: 'applicant'
        };
      }
      
      // Add profile info if available
      if (applicationData.personalInfo) {
        userData.profile = {
          dateOfBirth: applicationData.personalInfo.dateOfBirth,
          gender: applicationData.personalInfo.gender,
          address: applicationData.personalInfo.address
        };
      }
      
      user = await User.create(userData);
      accountCreated = true;
      logger.info("User account created successfully", { userId: user._id, email: user.email });
    } else {
      logger.debug("User account already exists, linking to application");
      // Link existing user to this application
      user.applicationId = admission._id;
      await user.save();
    }
    
    // Update admission with user reference
    admission.userId = user._id;
    await admission.save();
    
  } catch (userError) {
    logger.error("User account creation failed:", {
      error: userError.message,
      stack: userError.stack
    });
    // Don't throw error - application should still be saved even if user creation fails
  }

  // Send email notifications
  try {
    if (accountCreated && activationToken) {
      logger.debug("Sending application confirmation with account activation");
      const activationUrl = `${req.protocol}://${req.get('host')}/activate/${activationToken}`;
      await emailService.sendApplicationConfirmationWithAccount(admission, activationUrl);
      await lead.addActivity("email_sent", "Sent application confirmation with account activation");
      logger.info("Application confirmation with account activation sent successfully");
    } else {
      logger.debug("Sending standard application confirmation email");
      await emailService.sendApplicationConfirmation(admission);
      await lead.addActivity("email_sent", "Sent application confirmation email");
      logger.info("Application confirmation email sent successfully");
    }

    logger.debug("Sending application admin notification");
    await emailService.sendApplicationAdminNotification(admission);
    logger.info("Application admin notification sent successfully");
  } catch (emailError) {
    logger.error("Email sending failed:", {
      error: emailError.message,
      code: emailError.code,
      response: emailError.response
    });
    // Don't throw error - application should still be saved even if email fails
  }

  logger.info("Application completed successfully", { 
    applicationId: admission.applicationId,
    email: admission.email,
    accountCreated: accountCreated
  });

  return { admission, accountCreated };
};

const getApplicationStatus = async (applicationId) => {
  return Admission.findOne({ applicationId }).select(
    "applicationId status program createdAt firstName lastName"
  );
};

const getAllApplications = async (page, limit, filters) => {
  const skip = (page - 1) * limit;
  const filter = {};

  if (filters.status) {
    filter.status = filters.status;
  }

  if (filters.program) {
    filter.program = filters.program;
  }

  if (filters.search) {
    filter.$or = [
      { firstName: { $regex: filters.search, $options: "i" } },
      { lastName: { $regex: filters.search, $options: "i" } },
      { email: { $regex: filters.search, $options: "i" } },
      { applicationId: { $regex: filters.search, $options: "i" } }
    ];
  }

  const admissions = await Admission.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("reviewedBy", "firstName lastName email");

  const total = await Admission.countDocuments(filter);

  return {
    admissions,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

const getApplicationById = async (applicationId) => {
  return Admission.findById(applicationId).populate(
    "reviewedBy",
    "firstName lastName email"
  );
};

const updateApplicationStatus = async (
  applicationId,
  status,
  remarks,
  reviewedBy
) => {
  const admission = await Admission.findByIdAndUpdate(
    applicationId,
    {
      status,
      remarks,
      reviewedBy,
      reviewedAt: new Date()
    },
    { new: true, runValidators: true }
  );

  if (admission) {
    try {
      await emailService.sendStatusUpdateEmail(admission);
    } catch {}
  }

  return admission;
};

const getAdmissionStatistics = async () => {
  const stats = await Admission.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: {
          $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
        },
        approved: {
          $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] }
        },
        rejected: {
          $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] }
        },
        underReview: {
          $sum: { $cond: [{ $eq: ["$status", "under_review"] }, 1, 0] }
        }
      }
    }
  ]);

  const programStats = await Admission.aggregate([
    {
      $group: {
        _id: "$program",
        count: { $sum: 1 }
      }
    }
  ]);

  return {
    overview: stats[0] || {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      underReview: 0
    },
    programWise: programStats
  };
};

module.exports = {
  admissionService: {
    completeApplication,
    getApplicationStatus,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    getAdmissionStatistics
  }
};
