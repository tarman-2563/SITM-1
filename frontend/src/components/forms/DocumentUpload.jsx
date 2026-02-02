import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, X, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../common/Button';

const DOCUMENT_TYPES = {
  photo: { label: 'Passport Photo', required: true, accept: 'image/*' },
  signature: { label: 'Signature', required: true, accept: 'image/*' },
  tenthMarksheet: { label: '10th Marksheet', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
  twelfthMarksheet: { label: '12th Marksheet', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
  graduationMarksheet: { label: 'Graduation Marksheet', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
  transferCertificate: { label: 'Transfer Certificate', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
  characterCertificate: { label: 'Character Certificate', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
  aadharCard: { label: 'Aadhar Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
  incomeCertificate: { label: 'Income Certificate', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
  casteCertificate: { label: 'Caste Certificate', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
  other: { label: 'Other Documents', required: false, accept: '.pdf,.jpg,.jpeg,.png,.doc,.docx', multiple: true }
};

export function DocumentUpload({ applicationId, existingDocuments = [], onUploadComplete, onError }) {
  const [uploadedFiles, setUploadedFiles] = useState(existingDocuments);
  const [uploading, setUploading] = useState({});
  const [dragOver, setDragOver] = useState(null);
  const fileInputRefs = useRef({});

  const handleFileSelect = async (documentType, files) => {
    const fileList = Array.from(files);
    
    // Validate files
    for (const file of fileList) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        onError?.(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }
    }

    setUploading(prev => ({ ...prev, [documentType]: true }));

    try {
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append(documentType, file);
      });

      const response = await fetch(`/api/v1/documents/upload/${applicationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const result = await response.json();

      if (result.status === 'success') {
        setUploadedFiles(prev => [...prev, ...result.data.uploadedDocuments]);
        onUploadComplete?.(result.data.uploadedDocuments);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      onError?.(error.message || 'Failed to upload document');
    } finally {
      setUploading(prev => ({ ...prev, [documentType]: false }));
    }
  };

  const handleDrop = (e, documentType) => {
    e.preventDefault();
    setDragOver(null);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(documentType, files);
    }
  };

  const handleDragOver = (e, documentType) => {
    e.preventDefault();
    setDragOver(documentType);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(null);
  };

  const removeDocument = async (documentId) => {
    try {
      const response = await fetch(`/api/v1/documents/${applicationId}/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();

      if (result.status === 'success') {
        setUploadedFiles(prev => prev.filter(doc => doc._id !== documentId));
      } else {
        throw new Error(result.message || 'Failed to delete document');
      }
    } catch (error) {
      console.error('Delete error:', error);
      onError?.(error.message || 'Failed to delete document');
    }
  };

  const getUploadedDocuments = (documentType) => {
    return uploadedFiles.filter(doc => doc.name === documentType);
  };

  const isDocumentUploaded = (documentType) => {
    return getUploadedDocuments(documentType).length > 0;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Document Upload
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Please upload all required documents. Maximum file size: 5MB per file.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(DOCUMENT_TYPES).map(([documentType, config]) => {
          const isUploaded = isDocumentUploaded(documentType);
          const isUploading = uploading[documentType];
          const uploadedDocs = getUploadedDocuments(documentType);

          return (
            <motion.div
              key={documentType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-4 hover:border-sitm-maroon dark:hover:border-sitm-gold transition-colors"
            >
              <div className="text-center">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {config.label}
                    {config.required && <span className="text-red-500 ml-1">*</span>}
                  </h4>
                  {isUploaded && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>

                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer ${
                    dragOver === documentType
                      ? 'border-sitm-maroon bg-sitm-maroon/5'
                      : 'border-gray-300 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold'
                  }`}
                  onDrop={(e) => handleDrop(e, documentType)}
                  onDragOver={(e) => handleDragOver(e, documentType)}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRefs.current[documentType]?.click()}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-8 h-8 animate-spin text-sitm-maroon mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {config.accept.replace(/\./g, '').toUpperCase()} files only
                      </p>
                    </div>
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  ref={el => fileInputRefs.current[documentType] = el}
                  type="file"
                  accept={config.accept}
                  multiple={config.multiple}
                  onChange={(e) => handleFileSelect(documentType, e.target.files)}
                  className="hidden"
                />

                {/* Uploaded Files List */}
                {uploadedDocs.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedDocs.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 rounded-lg p-2"
                      >
                        <div className="flex items-center space-x-2">
                          <File className="w-4 h-4 text-gray-500" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-32">
                              {doc.originalName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatFileSize(doc.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sitm-maroon hover:text-sitm-maroon-light dark:text-sitm-gold dark:hover:text-sitm-gold-light"
                          >
                            <File className="w-4 h-4" />
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeDocument(doc._id);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upload Summary */}
      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Upload Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-300">Total Documents:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {uploadedFiles.length}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-300">Required Completed:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {Object.entries(DOCUMENT_TYPES).filter(([type, config]) => 
                config.required && isDocumentUploaded(type)
              ).length} / {Object.values(DOCUMENT_TYPES).filter(config => config.required).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}