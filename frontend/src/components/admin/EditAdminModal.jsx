import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { 
  X, 
  User, 
  Mail, 
  Shield, 
  AlertCircle, 
  Loader2,
  Edit,
  CheckCircle
} from 'lucide-react';

export function EditAdminModal({ isOpen, onClose, admin, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin',
    isActive: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});



  // Populate form when admin prop changes
  useEffect(() => {
    if (admin) {
      setFormData({
        name: `${admin.firstName} ${admin.lastName}`,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      });
    }
  }, [admin]);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear general error
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Split name into firstName and lastName
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      await onSubmit(admin._id, {
        firstName,
        lastName,
        email: formData.email.toLowerCase(),
        role: formData.role,
        isActive: formData.isActive
      });
      
    } catch (err) {
      setError(err.message || 'Failed to update admin. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setValidationErrors({});
      setError('');
      onClose();
    }
  };

  if (!isOpen || !admin) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop - Consistent with existing design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/40 backdrop-blur-md cursor-pointer"
          onClick={handleClose}
          title="Click outside to close"
        />

        {/* Modal - Consistent with ApplicationForm design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl h-[95vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 mx-2 sm:mx-4 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Consistent with existing design */}
          <div className="flex-shrink-0 bg-gradient-to-r from-sitm-navy via-sitm-maroon to-sitm-navy dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between rounded-t-2xl">>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Edit Admin User
                </h2>
                <p className="text-white/80 text-xs sm:text-sm">
                  Update administrator information
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 sm:p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content - Scrollable area with custom scrollbar */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3"
                    >
                      <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                      <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Current Admin Info */}
                  <div className="bg-gradient-to-r from-sitm-navy/5 via-sitm-maroon/5 to-sitm-navy/5 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 border border-sitm-navy/20 dark:border-slate-600 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Current Admin</h5>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-sitm-navy to-sitm-maroon rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {admin.firstName.charAt(0)}{admin.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {admin.firstName} {admin.lastName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {admin.email} • {admin.role.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full p-3 pl-12 rounded-lg border ${
                          validationErrors.name 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                        placeholder="Enter full name"
                        disabled={isLoading}
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    {validationErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full p-3 pl-12 rounded-lg border ${
                          validationErrors.email 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                        placeholder="Enter email address"
                        disabled={isLoading}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full p-3 pl-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
                        disabled={isLoading}
                      >
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="w-4 h-4 text-sitm-maroon bg-gray-100 border-gray-300 rounded focus:ring-sitm-maroon dark:focus:ring-sitm-gold dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        disabled={isLoading}
                      />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Active Account
                        </span>
                      </div>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Inactive accounts cannot login to the system
                    </p>
                  </div>

                  {/* Warning for Super Admin */}
                  {admin.role === 'super_admin' && formData.role !== 'super_admin' && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-400 mb-2">
                        <AlertCircle size={16} />
                        <span className="font-semibold text-sm">Warning</span>
                      </div>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        You are changing this user from Super Admin to Admin. This will remove their ability to manage other admin users.
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Edit size={16} />
                          Update Admin
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}