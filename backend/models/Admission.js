const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
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
      required: [true, "Phone number is required"],
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"]
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"]
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"]
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: {
        type: String,
        required: true,
        match: [/^[1-9][0-9]{5}$/, "Please enter a valid pincode"]
      }
    },
    program: {
      type: String,
      required: [true, "Program selection is required"],
      enum: ["CSE", "ECE", "ME", "CE", "BCA", "BBA"]
    },
    previousEducation: {
      qualification: { type: String, required: true },
      board: { type: String, required: true },
      percentage: {
        type: Number,
        required: true,
        min: [0, "Percentage cannot be negative"],
        max: [100, "Percentage cannot exceed 100"]
      },
      yearOfPassing: {
        type: Number,
        required: true,
        min: [2000, "Year must be after 2000"],
        max: [new Date().getFullYear(), "Year cannot be in the future"]
      }
    },
    guardianName: {
      type: String,
      required: [true, "Guardian name is required"],
      trim: true
    },
    guardianPhone: {
      type: String,
      required: [true, "Guardian phone is required"],
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"]
    },
    guardianOccupation: {
      type: String,
      required: [true, "Guardian occupation is required"]
    },
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected", "waitlisted"],
      default: "pending"
    },
    applicationId: {
      type: String,
      unique: true
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    remarks: String,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    reviewedAt: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead"
    },
    familyInfo: {
      father: {
        name: String,
        occupation: String,
        phone: String,
        email: String,
        income: String
      },
      mother: {
        name: String,
        occupation: String,
        phone: String,
        email: String
      },
      guardian: {
        name: String,
        relation: String,
        phone: String,
        email: String,
        address: String
      }
    },
    additionalInfo: {
      hostelRequired: {
        type: Boolean,
        default: false
      },
      transportRequired: {
        type: Boolean,
        default: false
      },
      medicalConditions: String,
      emergencyContact: {
        name: String,
        relation: String,
        phone: String
      },
      howDidYouHear: String,
      expectations: String
    },
    source: {
      type: String,
      enum: ["website", "website_complete", "offline", "referral"],
      default: "website"
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

admissionSchema.pre("save", function () {
  if (!this.applicationId) {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    this.applicationId = `SITM${year}${random}`;
  }
});


admissionSchema.index({ status: 1 });
admissionSchema.index({ program: 1 });

module.exports = mongoose.model("Admission", admissionSchema);
