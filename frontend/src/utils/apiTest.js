// Simple API connection test utility
import api from '../services/api';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection to:', api.defaults.baseURL);
    
    // Test the health endpoint
    const response = await fetch(api.defaults.baseURL.replace('/api/v1', '/health'));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is running:', data);
      return { success: true, data };
    } else {
      console.error('❌ Backend health check failed:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Test lead API endpoint
export const testLeadAPI = async () => {
  try {
    console.log('Testing Lead API endpoint...');
    
    const testLead = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '9876543210',
      program: 'CSE'
    };
    
    const response = await api.post('/leads', testLead);
    console.log('✅ Lead API test successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Lead API test failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

// Test email functionality
export const testEmailAPI = async () => {
  try {
    console.log('Testing Email API endpoint...');
    
    const response = await fetch(api.defaults.baseURL.replace('/api/v1', '/api/test-email'));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Email test successful:', data);
      return { success: true, data };
    } else {
      const errorData = await response.json();
      console.error('❌ Email test failed:', errorData);
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Run tests in development
if (import.meta.env.DEV) {
  window.testAPI = {
    testConnection: testApiConnection,
    testLead: testLeadAPI,
    testEmail: testEmailAPI
  };
}