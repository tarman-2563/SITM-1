import api from './api';

export const documentService = {
  // Upload documents for an application
  uploadDocuments: async (applicationId, formData) => {
    try {
      const response = await api.post(`/documents/upload/${applicationId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get documents for an application
  getDocuments: async (applicationId) => {
    try {
      const response = await api.get(`/documents/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete a document
  deleteDocument: async (applicationId, documentId) => {
    try {
      const response = await api.delete(`/documents/${applicationId}/${documentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Helper function to validate file
  validateFile: (file, maxSize = 5 * 1024 * 1024) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, PDF, DOC, and DOCX files are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error(`File size too large. Maximum size is ${Math.round(maxSize / (1024 * 1024))}MB.`);
    }

    return true;
  },

  // Helper function to format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};