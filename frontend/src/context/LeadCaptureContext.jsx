import { createContext, useContext, useState } from 'react';
import { LeadCaptureForm } from '../components/forms/LeadCaptureForm';
import { ApplicationForm } from '../components/forms/ApplicationForm';
import { analytics } from '../utils/analytics';

const LeadCaptureContext = createContext();

export const useLeadCapture = () => {
  const context = useContext(LeadCaptureContext);
  if (!context) {
    throw new Error('useLeadCapture must be used within a LeadCaptureProvider');
  }
  return context;
};

export function LeadCaptureProvider({ children }) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState(null);
  const [currentLeadData, setCurrentLeadData] = useState({});
  
  const [modalConfig, setModalConfig] = useState({
    source: 'website',
    title: 'Get Started with SITM',
    subtitle: 'Fill out this quick form and we\'ll get back to you soon!'
  });

  const openLeadModal = (config = {}) => {
    setModalConfig(prev => ({ ...prev, ...config }));
    setIsLeadModalOpen(true);
    
    // Track CTA click
    analytics.trackCTAClick(config.source || 'website', window.location.pathname);
  };

  const closeLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  const openApplicationModal = (leadId, leadData) => {
    setCurrentLeadId(leadId);
    setCurrentLeadData(leadData);
    setIsApplicationModalOpen(true);
    
    // Track application start
    analytics.trackCTAClick('application_started', 'from_lead_success');
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
    setCurrentLeadId(null);
    setCurrentLeadData({});
  };

  // Predefined modal configurations for different CTAs
  const openApplyNowModal = () => {
    openLeadModal({
      source: 'apply_now_cta',
      title: 'Apply for Admission',
      subtitle: 'Start your journey with SITM. We\'ll guide you through the admission process.'
    });
  };

  const openDownloadBrochureModal = () => {
    openLeadModal({
      source: 'download_brochure_cta',
      title: 'Download Brochure',
      subtitle: 'Get detailed information about our programs and facilities.'
    });
  };

  const openVirtualTourModal = () => {
    openLeadModal({
      source: 'virtual_tour_cta',
      title: 'Virtual Campus Tour',
      subtitle: 'Experience our campus virtually and get more information.'
    });
  };

  const openEnquireNowModal = () => {
    openLeadModal({
      source: 'enquire_now_cta',
      title: 'Enquire Now',
      subtitle: 'Have questions? We\'re here to help you make the right choice.'
    });
  };

  // Direct application access (for email links, etc.)
  const openApplicationDirectly = (leadId, leadData) => {
    openApplicationModal(leadId, leadData);
  };

  return (
    <LeadCaptureContext.Provider
      value={{
        // Lead modal controls
        isOpen: isLeadModalOpen,
        openModal: openLeadModal,
        closeModal: closeLeadModal,
        openApplyNowModal,
        openDownloadBrochureModal,
        openVirtualTourModal,
        openEnquireNowModal,
        
        // Application modal controls
        openApplicationModal,
        closeApplicationModal,
        openApplicationDirectly
      }}
    >
      {children}
      
      {/* Lead Capture Modal */}
      <LeadCaptureForm
        isOpen={isLeadModalOpen}
        onClose={closeLeadModal}
        source={modalConfig.source}
        title={modalConfig.title}
        subtitle={modalConfig.subtitle}
        onContinueApplication={openApplicationModal}
      />
      
      {/* Application Form Modal */}
      <ApplicationForm
        isOpen={isApplicationModalOpen}
        onClose={closeApplicationModal}
        leadId={currentLeadId}
        leadData={currentLeadData}
      />
    </LeadCaptureContext.Provider>
  );
}