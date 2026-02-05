import api from './api';

export const adminService = {
  // Get all applications with filters
  getAllApplications: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const response = await api.get(`/admission?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get application by ID
  getApplicationById: async (applicationId) => {
    try {
      const response = await api.get(`/admission/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update application status
  updateApplicationStatus: async (applicationId, status, remarks = '') => {
    try {
      const response = await api.put(`/admission/${applicationId}/status`, {
        status,
        remarks
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get admission statistics
  getAdmissionStats: async () => {
    try {
      const response = await api.get('/admission/stats/overview');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin user management (Super Admin only)
  getAdmins: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const response = await api.get(`/auth/admin/users?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create admin (Super Admin only)
  createAdmin: async (adminData) => {
    try {
      const response = await api.post('/auth/admin/users', adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update admin (Super Admin only)
  updateAdmin: async (adminId, adminData) => {
    try {
      const response = await api.put(`/auth/admin/users/${adminId}`, adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete admin (Super Admin only)
  deleteAdmin: async (adminId) => {
    try {
      const response = await api.delete(`/auth/admin/users/${adminId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Export applications to CSV
  exportApplicationsCSV: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const response = await api.get(`/admission/export/csv?${queryParams.toString()}`, {
        responseType: 'blob' // Important for file downloads
      });
      
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};