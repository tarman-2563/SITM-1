import api from './api';

export const applicationService = {
  // Complete application from lead
  completeApplication: async (applicationData) => {
    try {
      const response = await api.post('/admission/complete', applicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get application status by application ID
  getApplicationStatus: async (applicationId) => {
    try {
      const response = await api.get(`/admission/status/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Save application progress (temporary storage)
  saveApplicationProgress: (leadId, stepData, currentStep) => {
    try {
      const progressKey = `sitm_application_${leadId}`;
      const existingProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
      
      const updatedProgress = {
        ...existingProgress,
        leadId,
        currentStep,
        lastSaved: new Date().toISOString(),
        data: {
          ...existingProgress.data,
          ...stepData
        }
      };
      
      localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
      return updatedProgress;
    } catch (error) {
      console.warn('Failed to save application progress:', error);
      return null;
    }
  },

  // Get saved application progress
  getApplicationProgress: (leadId) => {
    try {
      const progressKey = `sitm_application_${leadId}`;
      const progress = localStorage.getItem(progressKey);
      return progress ? JSON.parse(progress) : null;
    } catch (error) {
      console.warn('Failed to get application progress:', error);
      return null;
    }
  },

  // Clear application progress
  clearApplicationProgress: (leadId) => {
    try {
      const progressKey = `sitm_application_${leadId}`;
      localStorage.removeItem(progressKey);
    } catch (error) {
      console.warn('Failed to clear application progress:', error);
    }
  }
};