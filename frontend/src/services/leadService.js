import api from './api';

export const leadService = {
  // Create a new lead
  createLead: async (leadData) => {
    try {
      const response = await api.post('/leads', leadData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get lead by ID
  getLeadById: async (leadId) => {
    try {
      const response = await api.get(`/leads/${leadId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};