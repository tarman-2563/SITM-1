import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { useLeadCapture } from '../../hooks/useLeadCapture';
import { CheckCircle, AlertCircle, Loader2, X, ArrowRight } from 'lucide-react';

const PROGRAMS = [
  { value: 'CSE', label: 'Computer Science & Engineering' },
  { value: 'ECE', label: 'Electronics & Communication Engineering' },
  { value: 'EEE', label: 'Electrical & Electronics Engineering' },
  { value: 'ME', label: 'Mechanical Engineering' },
  { value: 'CE', label: 'Civil Engineering' },
  { value: 'BCA', label: 'Bachelor of Computer Applications' },
  { value: 'BBA', label: 'Bachelor of Business Administration' },
  { value: 'DATA_SCIENCE', label: 'Data Science' }
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export function LeadCaptureForm({ 
  isOpen, 
  onClose, 
  source = 'website',
  title = 'Get Started with SITM',
  subtitle = 'Fill out this quick form and we\'ll get back to you soon!',
  onContinueApplication
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    state: '',
    tenthPercentage: '',
    twelfthInfo: ''
  });
  
  const [errors, setErrors] = useState({});
  const [leadId, setLeadId] = useState(null);
  const { submitLead, isLoading, error, success } = useLeadCapture();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2 || formData.firstName.length > 50) {
      newErrors.firstName = 'First name must be 2-50 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2 || formData.lastName.length > 50) {
      newErrors.lastName = 'Last name must be 2-50 characters';
    }

    // Email is optional, but if provided, must be valid
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    if (!formData.program) {
      newErrors.program = 'Please select a program';
    }

    if (!formData.state) {
      newErrors.state = 'Please select your state';
    }

    if (!formData.tenthPercentage) {
      newErrors.tenthPercentage = '10th percentage is required';
    } else if (isNaN(formData.tenthPercentage) || formData.tenthPercentage < 0 || formData.tenthPercentage > 100) {
      newErrors.tenthPercentage = 'Please enter a valid percentage (0-100)';
    }

    if (!formData.twelfthInfo) {
      newErrors.twelfthInfo = '12th information is required';
    } else if (formData.twelfthInfo.toLowerCase() !== 'appearing') {
      // If it's not "appearing", validate as percentage
      const percentage = parseFloat(formData.twelfthInfo);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        newErrors.twelfthInfo = 'Enter "Appearing" or a valid percentage (0-100)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await submitLead(formData, source);
      if (response.data?.leadId) {
        setLeadId(response.data.leadId);
      }
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      // Reset form after a delay to avoid visual glitch
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          program: '',
          state: '',
          tenthPercentage: '',
          twelfthInfo: ''
        });
        setErrors({});
        setLeadId(null);
      }, 300);
    }
  };

  const handleContinueApplication = () => {
    if (onContinueApplication && leadId) {
      onContinueApplication(leadId, formData);
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50"
          >
            <X size={20} />
          </button>

          <div className="p-6">
            {success ? (
              // Success State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We've received your information and will contact you soon with next steps.
                </p>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  {onContinueApplication && leadId && (
                    <Button 
                      onClick={handleContinueApplication} 
                      className="w-full flex items-center justify-center gap-2"
                    >
                      Continue Application
                      <ArrowRight size={16} />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={handleClose} 
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  You can also continue your application later via the email we'll send you.
                </p>
              </motion.div>
            ) : (
              // Form State
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h2>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400"
                  >
                    <AlertCircle size={16} />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full p-3 rounded-lg border ${
                          errors.firstName 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                        disabled={isLoading}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full p-3 rounded-lg border ${
                          errors.lastName 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                        disabled={isLoading}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        errors.email 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (10 digits)"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={`w-full p-3 rounded-lg border ${
                        errors.phone 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                      disabled={isLoading}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Program */}
                  <div>
                    <select
                      value={formData.program}
                      onChange={(e) => handleInputChange('program', e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        errors.program 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                      disabled={isLoading}
                    >
                      <option value="">Select Program of Interest</option>
                      {PROGRAMS.map((program) => (
                        <option key={program.value} value={program.value}>
                          {program.label}
                        </option>
                      ))}
                    </select>
                    {errors.program && (
                      <p className="text-red-500 text-xs mt-1">{errors.program}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        errors.state 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                      disabled={isLoading}
                    >
                      <option value="">Select Your State</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                    )}
                  </div>

                  {/* 10th Percentage */}
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      placeholder="10th Percentage"
                      value={formData.tenthPercentage}
                      onChange={(e) => handleInputChange('tenthPercentage', e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        errors.tenthPercentage 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                      disabled={isLoading}
                    />
                    {errors.tenthPercentage && (
                      <p className="text-red-500 text-xs mt-1">{errors.tenthPercentage}</p>
                    )}
                  </div>

                  {/* 12th Info - Single Field */}
                  <div>
                    <input
                      type="text"
                      placeholder='12th: Type "Appearing" or enter percentage'
                      value={formData.twelfthInfo}
                      onChange={(e) => handleInputChange('twelfthInfo', e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        errors.twelfthInfo 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                      disabled={isLoading}
                    />
                    {errors.twelfthInfo && (
                      <p className="text-red-500 text-xs mt-1">{errors.twelfthInfo}</p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Type "Appearing" if currently in 12th, or enter your percentage if completed
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  By submitting this form, you agree to receive communications from SITM.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}