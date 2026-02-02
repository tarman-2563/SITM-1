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

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password") || !this.password) {
      return;
    }
    console.log("Hashing password for user:", this.email);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Password hashed successfully");
  } catch (error) {
    console.error("Password hashing error:", error);
    throw error;
  }
});

userSchema.pre("save", async function () {
  try {
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

    if (this.userType === "staff" && !this.staff?.employeeId) {
      const year = new Date().getFullYear();
      const dept = this.staff?.department || "GEN";
      
      // Find all existing employee IDs for this department and year to get the next number
      const existingEmployees = await this.constructor.find({
        userType: "staff",
        "staff.department": this.staff?.department,
        "staff.employeeId": { $regex: `^EMP${year}${dept.toUpperCase()}\\d{3}$` }
      }, { "staff.employeeId": 1 }).sort({ "staff.employeeId": 1 });

      let nextNumber = 1;
      if (existingEmployees.length > 0) {
        // Extract all numbers and find the next available one
        const existingNumbers = existingEmployees.map(emp => {
          const match = emp.staff.employeeId.match(/(\d{3})$/);
          return match ? parseInt(match[1]) : 0;
        }).filter(num => num > 0).sort((a, b) => a - b);
        
        // Find the first gap or increment from the highest
        for (let i = 1; i <= existingNumbers.length + 1; i++) {
          if (!existingNumbers.includes(i)) {
            nextNumber = i;
            break;
          }
        }
        
        // If no gaps found, use the next number after the highest
        if (nextNumber === 1 && existingNumbers.length > 0) {
          nextNumber = Math.max(...existingNumbers) + 1;
        }
      }

      if (!this.staff) {
        this.staff = {};
      }
      
      // Generate employee ID with proper padding
      this.staff.employeeId = `EMP${year}${dept.toUpperCase()}${String(nextNumber).padStart(3, "0")}`;
      console.log("Generated employee ID:", this.staff.employeeId);
      
      // Double-check for uniqueness before saving
      const duplicate = await this.constructor.findOne({
        "staff.employeeId": this.staff.employeeId
      });
      
      if (duplicate) {
        // If still duplicate, try with a random suffix
        const randomSuffix = Math.floor(Math.random() * 900) + 100;
        this.staff.employeeId = `EMP${year}${dept.toUpperCase()}${randomSuffix}`;
        console.log("Conflict detected, using random ID:", this.staff.employeeId);
      }
    }
  } catch (error) {
    console.error("ID generation error:", error);
    throw error;
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
    super_admin: [
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
  };

  let permissions = rolePermissions[this.role] || [];

  if (this.userType === "staff" && this.staff.permissions) {
    permissions = [...permissions, ...this.staff.permissions];
  }

  return [...new Set(permissions)];
};

module.exports=mongoose.model("User", userSchema);
