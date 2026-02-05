import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { authService } from '../services/authService';
import { CheckCircle, AlertCircle, Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [activationInfo, setActivationInfo] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchActivationInfo = async () => {
      if (!token) {
        setError('Invalid activation link');
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getActivationInfo(token);
        setActivationInfo(response.data);
      } catch (err) {
        setError(err.message || 'Invalid or expired activation link');
      } finally {
        setLoading(false);
      }
    };

    fetchActivationInfo();
  }, [token]);

  const validateForm = () => {
    const errors = {};

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleActivation = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsActivating(true);
    setError(null);

    try {
      const response = await authService.activateAccount(token, password);
      setSuccess(true);
      
      // Auto-redirect to dashboard after 3 seconds
      setTimeout(() => {
        if (response.data.redirectTo) {
          navigate(response.data.redirectTo);
        } else {
          navigate('/dashboard');
        }
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to activate account');
    } finally {
      setIsActivating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sitm-maroon mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading activation page...</p>
        </div>
      </div>
    );
  }

  if (error && !activationInfo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        {/* Back to Home Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Activation Failed
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {error}
              </p>
              <Button onClick={() => navigate('/')}>
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Account Activated Successfully!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Welcome to SITM! Your account has been activated and you're now logged in.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to your dashboard...
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-sitm-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-sitm-maroon" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Activate Your Account
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome {activationInfo?.name}! Set your password to complete account activation.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleActivation} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Create Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full p-3 pr-12 rounded-lg border ${
                        validationErrors.password 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                      placeholder="Enter your password"
                      disabled={isActivating}
                    />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full p-3 pr-12 rounded-lg border ${
                        validationErrors.confirmPassword 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                      placeholder="Confirm your password"
                      disabled={isActivating}
                    />
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

                <Button
                  type="submit"
                  disabled={isActivating}
                  className="w-full"
                  size="lg"
                >
                  {isActivating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Activating Account...
                    </>
                  ) : (
                    'Activate Account'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By activating your account, you agree to SITM's terms of service and privacy policy.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}