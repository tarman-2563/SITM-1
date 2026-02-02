import { useState } from 'react';
import { leadService } from '../services/leadService';
import { analytics } from '../utils/analytics';

export const useLeadCapture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitLead = async (leadData, source = 'website') => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Add metadata
      const enrichedLeadData = {
        ...leadData,
        source,
        metadata: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          referrer: document.referrer || 'direct'
        }
      };

      const response = await leadService.createLead(enrichedLeadData);
      
      // Track successful lead submission
      analytics.trackLeadSubmission(source, leadData);
      
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to submit lead');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setIsLoading(false);
  };

  return {
    submitLead,
    isLoading,
    error,
    success,
    resetState
  };
};