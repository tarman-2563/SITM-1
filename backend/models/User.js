const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email"
      ]
    },
    phone: {
      type: String,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"]
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false
    },
    role: {
      type: String,
      enum: [
        "applicant",
        "student",
        "alumni",
        "faculty",
        "admin",
        "super_admin"
      ],
      required: [true, "Role is required"],
      default: "applicant"
    },
    userType: {
      type: String,
      enum: ["student", "staff"],
      required: [true, "User type is required"],
      default: "student"
    },
    academic: {
      rollNumber: {
        type: String,
        sparse: true,
        unique: true
      },
      program: {
        type: String,
        enum: ["CSE", "ECE", "ME", "CE", "BCA", "BBA"]
      },
      batch: Number,
      semester: Number,
      section: String,
      admissionYear: Number,
      graduationYear: Number,
      currentStatus: {
        type: String,
        enum: [
          "applicant",
          "active",
          "graduated",
          "dropped",
          "suspended"
        ],
        default: "applicant"
      }
    },
    staff: {
      employeeId: {
        type: String,
        sparse: true,
        unique: true
      },
      department: {
        type: String,
        enum: [
          "CSE",
          "ECE",
          "ME",
          "CE",
          "BCA",
          "BBA",
          "general",
          "admissions",
          "accounts",
          "library",
          "placement"
        ]
      },
      designation: String,
      joiningDate: Date,
      qualification: [String],
      experience: Number,
      specialization: [String],
      permissions: [
        {
          type: String,
          enum: [
            "manage_students",
            "manage_admissions",
            "manage_contacts",
            "manage_programs",
            "manage_gallery",
            "manage_placements",
            "manage_faculty",
            "manage_users",
            "view_analytics",
            "manage_fees",
            "manage_library",
            "manage_exams",
            "manage_attendance"
          ]
        }
      ]
    },
    profile: {
      avatar: String,
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
      },
      address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: {
          type: String,
          default: "India"
        }
      },
      emergencyContact: {
        name: String,
        phone: String,
        relationship: String
      },
      bio: String,
      socialLinks: {
        linkedin: String,
        github: String,
        twitter: String
      }
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    activationToken: String,
    activationExpire: Date,
    emailVerifiedAt: Date,
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission"
    },
    preferences: {
      language: {
        type: String,
        default: "en"
      },
      timezone: {
        type: String,
        default: "Asia/Kolkata"
      },
      notifications: {
        email: {
          type: Boolean,
          default: true
        },
        sms: {
          type: Boolean,
          default: false
        },
        push: {
          type: Boolean,
          default: true
        }
      }
    }
  },
  { timestamps: true }
);


userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("isLocked").get(function () {
  return Boolean(this.lockUntil && this.lockUntil > Date.now());
});

// Password hashing middleware - Re-enabled with better error handling
userSchema.pre("save", async function (next) {
  try {
    // Only hash password if it's modified and exists
    if (!this.isModified("password") || !this.password) {
      return next();
    }

    console.log("Hashing password for user:", this.email);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Password hashed successfully");
    next();
  } catch (error) {
    console.error("Password hashing error:", error);
    next(error);
  }
});

// ID generation middleware - Re-enabled with better error handling
userSchema.pre("save", async function (next) {
  try {
    // Generate roll number for students
    if (
      this.userType === "student" &&
      this.academic?.currentStatus === "active" &&
      !this.academic?.rollNumber
    ) {
      const year = this.academic.admissionYear || new Date().getFullYear();
      const program = this.academic.program;
      
      if (program) {
        const count = await this.constructor.countDocuments({
          userType: "student",
          "academic.program": program,
          "academic.admissionYear": year,
          "academic.rollNumber": { $exists: true }
        });

        this.academic.rollNumber = `${year}${program}${String(
          count + 1
        ).padStart(3, "0")}`;
        console.log("Generated roll number:", this.academic.rollNumber);
      }
    }

    // Generate employee ID for staff
    if (this.userType === "staff" && !this.staff?.employeeId) {
      const year = new Date().getFullYear();
      const dept = this.staff?.department || "GEN";
      const count = await this.constructor.countDocuments({
        userType: "staff",
        "staff.department": this.staff?.department
      });

      if (!this.staff) {
        this.staff = {};
      }
      this.staff.employeeId = `EMP${year}${dept.toUpperCase()}${String(
        count + 1
      ).padStart(3, "0")}`;
      console.log("Generated employee ID:", this.staff.employeeId);
    }

    next();
  } catch (error) {
    console.error("ID generation error:", error);
    next(error);
  }
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
      userType: this.userType
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.incLoginAttempts = function () {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + 2 * 60 * 60 * 1000
    };
  }

  return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

userSchema.methods.getPermissions = function () {
  const rolePermissions = {
    applicant: ["view_profile", "update_profile", "view_application_status"],
    student: [
      "view_profile",
      "update_profile",
      "view_grades",
      "view_attendance",
      "view_fees"
    ],
    alumni: ["view_profile", "update_profile", "view_alumni_network"],
    faculty: [
      "view_profile",
      "update_profile",
      "manage_attendance",
      "view_students"
    ],
    admin: [
      "manage_students",
      "manage_admissions",
      "manage_contacts",
      "view_analytics"
    ],
    super_admin: ["*"]
  };

  let permissions = rolePermissions[this.role] || [];

  if (this.userType === "staff" && this.staff.permissions) {
    permissions = [...permissions, ...this.staff.permissions];
  }

  return [...new Set(permissions)];
};

module.exports=mongoose.model("User", userSchema);
