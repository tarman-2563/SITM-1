const express = require("express");
const { param, body } = require("express-validator");
const { protect, authorize } = require("../middlewares/auth");
const { uploadFields, getFileUrl, deleteFile } = require("../utils/fileUpload");
const Admission = require("../models/Admission");

const documentRouter = express.Router();

// Document upload middleware configuration
const documentUploadFields = [
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'tenthMarksheet', maxCount: 1 },
  { name: 'twelfthMarksheet', maxCount: 1 },
  { name: 'graduationMarksheet', maxCount: 1 },
  { name: 'transferCertificate', maxCount: 1 },
  { name: 'characterCertificate', maxCount: 1 },
  { name: 'aadharCard', maxCount: 1 },
  { name: 'incomeCertificate', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
  { name: 'other', maxCount: 3 }
];

// Upload documents for an application
documentRouter.post("/upload/:applicationId", [
  param("applicationId").isMongoId().withMessage("Valid application ID is required")
], uploadFields(documentUploadFields, process.env.USE_CLOUDINARY === 'true'), async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    // Find the application
    const admission = await Admission.findById(applicationId);
    if (!admission) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    // Process uploaded files
    const uploadedDocuments = [];
    
    if (req.files) {
      Object.keys(req.files).forEach(fieldName => {
        const files = req.files[fieldName];
        files.forEach(file => {
          const documentUrl = getFileUrl(file, req);
          uploadedDocuments.push({
            name: fieldName,
            originalName: file.originalname,
            url: documentUrl,
            size: file.size,
            mimetype: file.mimetype,
            uploadedAt: new Date()
          });
        });
      });
    }

    // Update admission with new documents
    admission.documents = admission.documents || [];
    admission.documents.push(...uploadedDocuments);
    await admission.save();

    res.status(200).json({
      status: 'success',
      message: 'Documents uploaded successfully',
      data: {
        applicationId: admission._id,
        uploadedDocuments: uploadedDocuments
      }
    });

  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to upload documents'
    });
  }
});

// Get documents for an application
documentRouter.get("/:applicationId", [
  param("applicationId").isMongoId().withMessage("Valid application ID is required")
], async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    const admission = await Admission.findById(applicationId).select('documents');
    if (!admission) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        applicationId: admission._id,
        documents: admission.documents || []
      }
    });

  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to get documents'
    });
  }
});

// Delete a document
documentRouter.delete("/:applicationId/:documentId", [
  param("applicationId").isMongoId().withMessage("Valid application ID is required"),
  param("documentId").isMongoId().withMessage("Valid document ID is required")
], protect, authorize("admin", "super_admin"), async (req, res) => {
  try {
    const { applicationId, documentId } = req.params;
    
    const admission = await Admission.findById(applicationId);
    if (!admission) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    // Find and remove the document
    const documentIndex = admission.documents.findIndex(doc => doc._id.toString() === documentId);
    if (documentIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Document not found'
      });
    }

    const document = admission.documents[documentIndex];
    
    // Delete the file from storage
    await deleteFile(document.url);
    
    // Remove from database
    admission.documents.splice(documentIndex, 1);
    await admission.save();

    res.status(200).json({
      status: 'success',
      message: 'Document deleted successfully'
    });

  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to delete document'
    });
  }
});

module.exports = documentRouter;