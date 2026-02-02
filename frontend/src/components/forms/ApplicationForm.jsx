import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApplicationForm } from '../../hooks/useApplicationForm';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { AcademicInfoStep } from './steps/AcademicInfoStep';
import { FamilyInfoStep } from './steps/FamilyInfoStep';
import { DocumentUploadStep } from './steps/DocumentUploadStep';
import { ReviewSubmitStep } from './steps/ReviewSubmitStep';
import { ApplicationSuccess } from './ApplicationSuccess';
import { AccountActivation } from './AccountActivation';
import { 
  CheckCircle, 
  Save,
  X,
  User,
  GraduationCap,
  Users,
  Upload,
  FileCheck
} from 'lucide-react';

const STEPS = [
  { 
    id: 1, 
    title: 'Personal Details', 
    icon: User,
    description: 'Basic personal information'
  },
  { 
    id: 2, 
    title: 'Academic Background', 
    icon: GraduationCap,
    description: 'Educational qualifications'
  },
  { 
    id: 3, 
    title: 'Family Information', 
    icon: Users,
    description: 'Family and guardian details'
  },
  { 
    id: 4, 
    title: 'Document Upload', 
    icon: Upload,
    description: 'Upload required documents'
  },
  { 
    id: 5, 
    title: 'Review & Complete', 
    icon: FileCheck,
    description: 'Review and complete process'
  }
];

export function ApplicationForm({ 
  isOpen, 
  onClose, 
  leadId,
  leadData = {} 
}) {
  const {
    currentStep,
    formData,
    isLoading,
    success,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    submitApplication
  } = useApplicationForm(leadId);

  const [isSaving, setIsSaving] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState(null);
  const [showAccountActivation, setShowAccountActivation] = useState(false);
  const [activationToken, setActivationToken] = useState(null);
  const [accountCreated, setAccountCreated] = useState(false);

  // Auto-save indicator
  useEffect(() => {
    if (leadId && Object.keys(formData.personalInfo).some(key => formData.personalInfo[key])) {
      setIsSaving(true);
      const timer = setTimeout(() => setIsSaving(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [formData, leadId]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && !isLoading) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isLoading]);

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleActivateAccount = (token) => {
    setActivationToken(token);
    setShowAccountActivation(true);
  };

  const handleActivationComplete = (userData) => {
    // User is now logged in, redirect to dashboard
    const redirectUrl = userData.redirectTo || '/dashboard';
    console.log('Redirecting to:', redirectUrl); // Debug log
    window.location.href = redirectUrl;
  };

  const handleSkipActivation = () => {
    setShowAccountActivation(false);
  };

  // Handle moving to document upload step without submitting application
  const handleFamilyInfoNext = async () => {
    nextStep(); // Just move to document upload step without submitting
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(data) => updateFormData('personalInfo', data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <AcademicInfoStep
            data={formData.academicInfo}
            onChange={(data) => updateFormData('academicInfo', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <FamilyInfoStep
            data={formData.familyInfo}
            additionalInfo={formData.additionalInfo}
            onFamilyChange={(data) => updateFormData('familyInfo', data)}
            onAdditionalChange={(data) => updateFormData('additionalInfo', data)}
            onNext={handleFamilyInfoNext}
            onPrev={prevStep}
            isLoading={isLoading}
          />
        );
      case 4:
        return (
          <DocumentUploadStep
            applicationId={submittedApplicationId}
            onNext={nextStep}
            onPrev={prevStep}
            allowSkip={!submittedApplicationId} // Allow skipping if no application ID yet
          />
        );
      case 5:
        return (
          <ReviewSubmitStep
            formData={formData}
            leadData={leadData}
            applicationId={submittedApplicationId}
            onSubmit={async () => {
              if (!submittedApplicationId) {
                // Submit application for the first time
                try {
                  const response = await submitApplication();
                  console.log('Application submission response:', response); // Debug log
                  if (response?.data?.applicationId) {
                    setSubmittedApplicationId(response.data.applicationId);
                    setAccountCreated(response.data.accountCreated);
                    setActivationToken(response.data.activationToken);
                    console.log('Account activation data:', { // Debug log
                      accountCreated: response.data.accountCreated,
                      activationToken: response.data.activationToken ? 'Present' : 'Missing'
                    });
                  }
                  nextStep(); // Move to success
                } catch (error) {
                  console.error('Application submission failed:', error);
                  throw error;
                }
              } else {
                // Application already submitted, just move to success
                nextStep();
              }
            }}
            onPrev={prevStep}
            isLoading={isLoading}
            error={null}
            isAlreadySubmitted={!!submittedApplicationId}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop - Enhanced with better blur and opacity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/40 backdrop-blur-md cursor-pointer"
          onClick={handleClose}
          title="Click outside to close"
        />

        {/* Modal - Fixed scrolling with proper flex layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-7xl h-[95vh] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 mx-2 sm:mx-4 flex flex-col"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {success ? (
            <div className="flex flex-col h-full">
              {/* Success Header with Close Button */}
              <div className="flex-shrink-0 bg-gradient-to-r from-green-600 via-green-700 to-green-600 dark:from-green-800 dark:via-green-700 dark:to-green-800 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {showAccountActivation ? 'Account Setup' : 'Application Submitted Successfully!'}
                    </h2>
                    <p className="text-white/90 text-xs sm:text-sm">
                      {leadData.firstName} {leadData.lastName} • {leadData.program}
                    </p>
                  </div>
                </div>
                <button
                  onClick={showAccountActivation ? handleSkipActivation : handleClose}
                  className="p-2 sm:p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  title={showAccountActivation ? "Skip Account Setup" : "Close Application Form"}
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Success Content */}
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {showAccountActivation ? (
                  <AccountActivation
                    activationToken={activationToken}
                    userEmail={leadData.email}
                    userName={`${leadData.firstName} ${leadData.lastName}`}
                    onActivationComplete={handleActivationComplete}
                    onSkip={handleSkipActivation}
                  />
                ) : (
                  <ApplicationSuccess 
                    onClose={handleClose}
                    applicationData={formData}
                    leadData={leadData}
                    submittedApplicationId={submittedApplicationId}
                    accountCreated={accountCreated}
                    activationToken={activationToken}
                    onActivateAccount={handleActivateAccount}
                  />
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Header - Fixed height */}
              <div className="flex-shrink-0 bg-gradient-to-r from-sitm-navy via-sitm-maroon to-sitm-navy dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Complete Your Application
                    </h2>
                    <p className="text-white/80 text-xs sm:text-sm">
                      Step {currentStep} of {STEPS.length} • {leadData.firstName} {leadData.lastName}
                    </p>
                  </div>
                  {isSaving && (
                    <div className="flex items-center gap-2 text-sitm-gold text-xs sm:text-sm bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                      <Save size={14} className="animate-pulse" />
                      <span className="hidden sm:inline">Auto-saving...</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="p-2 sm:p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress Steps - Fixed height */}
              <div className="flex-shrink-0 bg-gradient-to-b from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 px-4 sm:px-8 py-3 sm:py-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between max-w-5xl mx-auto overflow-x-auto scrollbar-hide">
                  {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;
                    const isClickable = currentStep >= step.id;

                    return (
                      <div key={step.id} className="flex items-center flex-shrink-0">
                        <button
                          onClick={() => isClickable && goToStep(step.id)}
                          disabled={!isClickable || isLoading}
                          className={`flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                            isClickable && !isLoading 
                              ? 'hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer hover:scale-105' 
                              : 'cursor-not-allowed'
                          }`}
                        >
                          <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30'
                              : isActive
                              ? 'bg-sitm-maroon border-sitm-maroon text-white shadow-lg shadow-sitm-maroon/30'
                              : 'bg-gray-200 dark:bg-slate-600 border-gray-300 dark:border-slate-500 text-gray-500 dark:text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle size={16} className="sm:w-5 sm:h-5" />
                            ) : (
                              <Icon size={16} className="sm:w-5 sm:h-5" />
                            )}
                          </div>
                          <div className="text-center">
                            <div className={`text-xs sm:text-sm font-semibold ${
                              isActive 
                                ? 'text-sitm-maroon dark:text-sitm-gold' 
                                : isCompleted
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              <span className="hidden sm:inline">{step.title}</span>
                              <span className="sm:hidden">{step.id}</span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 max-w-20 leading-tight hidden md:block">
                              {step.description}
                            </div>
                          </div>
                        </button>
                        {index < STEPS.length - 1 && (
                          <div className={`w-4 sm:w-8 h-0.5 sm:h-1 mx-1 sm:mx-2 rounded-full transition-all duration-500 ${
                            currentStep > step.id 
                              ? 'bg-gradient-to-r from-green-500 to-green-400' 
                              : 'bg-gray-300 dark:bg-slate-600'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Content - Scrollable area with custom scrollbar */}
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-6 lg:p-8 min-h-full"
                  >
                    <div className="max-w-5xl mx-auto">
                      {renderStep()}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}