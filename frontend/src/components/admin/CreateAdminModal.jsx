import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Building, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2,
  UserPlus
} from 'lucide-react';

export function CreateAdminModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    department: 'admissions'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const departments = [
    { value: 'admissions', label: 'Admissions' },
    { value: 'academics', label: 'Academics' },
    { value: 'placements', label: 'Placements' },
    { value: 'general', label: 'General' },
    { value: 'it', label: 'IT' }
  ];

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

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.toLowerCase(),
        password: formData.password,
        role: formData.role,
        department: formData.department
      });
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin',
        department: 'admissions'
      });
      setValidationErrors({});
    } catch (err) {
      setError(err.message || 'Failed to create admin. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin',
        department: 'admissions'
      });
      setValidationErrors({});
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

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
          className="relative w-full max-w-2xl h-[95vh] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 mx-2 sm:mx-4 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Consistent with existing design */}
          <div className="flex-shrink-0 bg-gradient-to-r from-sitm-navy via-sitm-maroon to-sitm-navy dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Create New Admin
                </h2>
                <p className="text-white/80 text-xs sm:text-sm">
                  Add a new administrator to the system
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
                        placeholder="admin@sitm.edu.in"
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

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Department *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full p-3 pl-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
                        disabled={isLoading}
                      >
                        {departments.map((dept) => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full p-3 pl-12 pr-12 rounded-lg border ${
                          validationErrors.password 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                        placeholder="Enter password (min. 6 characters)"
                        disabled={isLoading}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full p-3 pl-12 pr-12 rounded-lg border ${
                          validationErrors.confirmPassword 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                        placeholder="Confirm your password"
                        disabled={isLoading}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {validationErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Role Description */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {formData.role === 'super_admin' ? 'Super Admin Permissions:' : 'Admin Permissions:'}
                    </h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Manage applications and admissions</li>
                      <li>• View analytics and reports</li>
                      <li>• Update application statuses</li>
                      {formData.role === 'super_admin' && (
                        <>
                          <li>• Create and manage other admin users</li>
                          <li>• Access system settings</li>
                          <li>• Full system administration</li>
                        </>
                      )}
                    </ul>
                  </div>

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
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserPlus size={16} />
                          Create Admin
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