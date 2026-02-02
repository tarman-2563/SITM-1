import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DocumentUpload } from '../DocumentUpload';
import { Button } from '../../common/Button';
import { documentService } from '../../../services/documentService';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function DocumentUploadStep({ applicationId, onNext, onPrev, allowSkip = false }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (applicationId) {
      loadDocuments();
    }
  }, [applicationId]);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentService.getDocuments(applicationId);
      setDocuments(response.data.documents || []);
    } catch (err) {
      console.error('Failed to load documents:', err);
      setError('Failed to load existing documents');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (uploadedDocuments) => {
    setDocuments(prev => [...prev, ...uploadedDocuments]);
    setSuccess('Documents uploaded successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  };

  const getRequiredDocuments = () => {
    const required = [
      'photo', 'signature', 'tenthMarksheet', 'twelfthMarksheet', 
      'transferCertificate', 'characterCertificate', 'aadharCard'
    ];
    return required;
  };

  const getUploadedDocumentTypes = () => {
    return [...new Set(documents.map(doc => doc.name))];
  };

  const isAllRequiredUploaded = () => {
    const required = getRequiredDocuments();
    const uploaded = getUploadedDocumentTypes();
    return required.every(type => uploaded.includes(type));
  };

  if (!applicationId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <AlertCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Document Upload (Optional)
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You can upload documents now or after submitting your application. 
          {allowSkip && " You can skip this step and upload documents later."}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onPrev} variant="outline">
            ← Previous Step
          </Button>
          {allowSkip && (
            <Button onClick={onNext}>
              Skip for Now →
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Required Documents
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please upload all required documents to complete your application.
        </p>
      </div>

      {/* Status Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
          <p className="text-green-700 dark:text-green-400">{success}</p>
        </motion.div>
      )}

      {/* Document Upload Component */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sitm-maroon mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading documents...</p>
        </div>
      ) : (
        <DocumentUpload
          applicationId={applicationId}
          existingDocuments={documents}
          onUploadComplete={handleUploadComplete}
          onError={handleError}
        />
      )}

      {/* Progress Indicator */}
      <div className="mt-8 bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Upload Progress
          </h4>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isAllRequiredUploaded() 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}>
            {isAllRequiredUploaded() ? 'Complete' : 'In Progress'}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Required Documents</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {getUploadedDocumentTypes().filter(type => getRequiredDocuments().includes(type)).length} / {getRequiredDocuments().length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className="bg-sitm-maroon dark:bg-sitm-gold h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(getUploadedDocumentTypes().filter(type => getRequiredDocuments().includes(type)).length / getRequiredDocuments().length) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center gap-2"
        >
          ← Previous Step
        </Button>

        <div className="flex gap-3">
          {!isAllRequiredUploaded() && allowSkip && (
            <Button
              variant="outline"
              onClick={onNext}
              className="flex items-center gap-2"
            >
              Skip for Now →
            </Button>
          )}
          <Button
            onClick={onNext}
            disabled={!allowSkip && !isAllRequiredUploaded()}
            className="flex items-center gap-2"
          >
            Continue to Review →
          </Button>
        </div>
      </div>

      {!allowSkip && !isAllRequiredUploaded() && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Please upload all required documents to continue
        </p>
      )}

      {allowSkip && !isAllRequiredUploaded() && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          You can upload documents now or after submitting your application
        </p>
      )}
    </motion.div>
  );
}