import { useState, useEffect } from 'react';
import { applicationService } from '../services/applicationService';
import { analytics } from '../utils/analytics';

export const useApplicationForm = (leadId) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      dateOfBirth: '',
      gender: '',
      nationality: 'Indian',
      category: '',
      bloodGroup: '',
      aadharNumber: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    },
    academicInfo: {
      previousEducation: {
        qualification: '',
        board: '',
        percentage: '',
        yearOfPassing: ''
      },
      entranceExam: {
        examName: '',
        rollNumber: '',
        score: '',
        rank: ''
      },
      achievements: []
    },
    familyInfo: {
      father: {
        name: '',
        occupation: '',
        phone: '',
        email: '',
        income: ''
      },
      mother: {
        name: '',
        occupation: '',
        phone: '',
        email: ''
      },
      guardian: {
        name: '',
        relation: '',
        phone: '',
        email: '',
        address: ''
      }
    },
    additionalInfo: {
      hostelRequired: false,
      transportRequired: false,
      medicalConditions: '',
      emergencyContact: {
        name: '',
        relation: '',
        phone: ''
      },
      howDidYouHear: '',
      expectations: ''
    },
    documents: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    if (leadId) {
      const savedProgress = applicationService.getApplicationProgress(leadId);
      if (savedProgress) {
        setFormData(prev => ({ ...prev, ...savedProgress.data }));
        setCurrentStep(savedProgress.currentStep || 1);
      }
    }
  }, [leadId]);

  // Auto-save progress when form data changes
  useEffect(() => {
    if (leadId && Object.keys(formData.personalInfo).some(key => formData.personalInfo[key])) {
      const timeoutId = setTimeout(() => {
        applicationService.saveApplicationProgress(leadId, formData, currentStep);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [formData, currentStep, leadId]);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      // Track step progression
      analytics.trackCTAClick('application_step_next', `step_${currentStep}_to_${currentStep + 1}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  };

  const submitApplication = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const applicationData = {
        leadId,
        personalInfo: formData.personalInfo,
        academicInfo: formData.academicInfo,
        familyInfo: formData.familyInfo,
        additionalInfo: formData.additionalInfo,
        documents: formData.documents
      };

      const response = await applicationService.completeApplication(applicationData);
      
      // Track successful application submission
      analytics.trackLeadSubmission('application_completed', { leadId });
      
      // Clear saved progress
      applicationService.clearApplicationProgress(leadId);
      
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to submit application');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      personalInfo: {
        dateOfBirth: '',
        gender: '',
        nationality: 'Indian',
        category: '',
        bloodGroup: '',
        aadharNumber: '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: ''
        }
      },
      academicInfo: {
        previousEducation: {
          qualification: '',
          board: '',
          percentage: '',
          yearOfPassing: ''
        },
        entranceExam: {
          examName: '',
          rollNumber: '',
          score: '',
          rank: ''
        },
        achievements: []
      },
      familyInfo: {
        father: {
          name: '',
          occupation: '',
          phone: '',
          email: '',
          income: ''
        },
        mother: {
          name: '',
          occupation: '',
          phone: '',
          email: ''
        },
        guardian: {
          name: '',
          relation: '',
          phone: '',
          email: '',
          address: ''
        }
      },
      additionalInfo: {
        hostelRequired: false,
        transportRequired: false,
        medicalConditions: '',
        emergencyContact: {
          name: '',
          relation: '',
          phone: ''
        },
        howDidYouHear: '',
        expectations: ''
      },
      documents: []
    });
    setError(null);
    setSuccess(false);
  };

  return {
    currentStep,
    formData,
    isLoading,
    error,
    success,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    submitApplication,
    resetForm
  };
};