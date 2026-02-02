// Simple analytics utility for tracking lead sources and CTA performance
export const analytics = {
  // Track CTA clicks
  trackCTAClick: (ctaType, location) => {
    try {
      // Store in localStorage for now (can be extended to send to analytics service)
      const event = {
        type: 'cta_click',
        ctaType,
        location,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      };

      // Store in localStorage
      const events = JSON.parse(localStorage.getItem('sitm_analytics') || '[]');
      events.push(event);
      
      // Keep only last 100 events
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('sitm_analytics', JSON.stringify(events));

      // Log for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', event);
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  },

  // Track lead form submissions
  trackLeadSubmission: (source, leadData) => {
    try {
      const event = {
        type: 'lead_submission',
        source,
        program: leadData.program,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      };

      const events = JSON.parse(localStorage.getItem('sitm_analytics') || '[]');
      events.push(event);
      
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('sitm_analytics', JSON.stringify(events));

      if (process.env.NODE_ENV === 'development') {
        console.log('Lead Submission Tracked:', event);
      }
    } catch (error) {
      console.warn('Lead submission tracking failed:', error);
    }
  },

  // Get analytics data
  getAnalytics: () => {
    try {
      return JSON.parse(localStorage.getItem('sitm_analytics') || '[]');
    } catch (error) {
      console.warn('Failed to get analytics data:', error);
      return [];
    }
  },

  // Clear analytics data
  clearAnalytics: () => {
    try {
      localStorage.removeItem('sitm_analytics');
    } catch (error) {
      console.warn('Failed to clear analytics data:', error);
    }
  }
};