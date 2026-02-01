const Admission = require("../models/Admission");
const Lead = require("../models/Lead");
const User = require("../models/User");
const { emailService } = require("./emailService");
const crypto = require("crypto");

const completeApplication = async (applicationData, req) => {
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
    religion: applicationData.personalInfo.religion,
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
    guardianEmail: applicationData.familyInfo.father.email,
    familyInfo: applicationData.familyInfo,
    additionalInfo: applicationData.additionalInfo,
    documents: applicationData.documents || [],
    source: "website_complete",
    submittedAt: new Date()
  };

  const admission = await Admission.create(admissionData);

  lead.status = "application_completed";
  lead.applicationId = admission._id;
  lead.convertedAt = new Date();
  await lead.addActivity("application_completed", "Full application submitted");

  let userAccount = null;
  let activationToken = null;
  let accountCreated = false;

  try {
    activationToken = crypto.randomBytes(32).toString("hex");
    const activationExpire = Date.now() + 24 * 60 * 60 * 1000;

    userAccount = await User.create({
      firstName: admission.firstName,
      lastName: admission.lastName,
      email: admission.email,
      phone: admission.phone,
      role: "applicant",
      userType: "student",
      isActive: false,
      activationToken,
      activationExpire,
      applicationId: admission._id,
      academic: {
        program: admission.program,
        admissionYear: new Date().getFullYear(),
        currentStatus: "applicant"
      },
      profile: {
        dateOfBirth: admission.dateOfBirth,
        gender: admission.gender,
        address: admission.address
      }
    });

    admission.userId = userAccount._id;
    await admission.save();
    accountCreated = true;
  } catch {}

  try {
    const activationUrl = `${req.protocol}://${req.get("host")}/activate/${activationToken}`;

    if (userAccount) {
      await emailService.sendApplicationConfirmationWithAccount(
        admission,
        activationUrl
      );
    } else {
      await emailService.sendApplicationConfirmation(admission);
    }
  } catch {}

  try {
    await emailService.sendApplicationAdminNotification(
      admission,
      lead.score
    );
  } catch {}

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
    .populate("reviewedBy", "name email");

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
    "name email"
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
