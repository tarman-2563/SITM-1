import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { Footer } from '../components/layout/Footer';
import { authService } from '../services/authService';
import { AlertCircle, Loader2, Eye, EyeOff, Mail, Lock, ArrowLeft, Phone, MessageSquare } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [otpTimer, setOtpTimer] = useState(0);

  // Get redirect path from location state or default to dashboard
  const redirectTo = location.state?.from || '/dashboard';

  const validateForm = () => {
    const errors = {};

    if (loginMethod === 'email') {
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        errors.password = 'Password is required';
      }
    } else {
      if (!formData.phone) {
        errors.phone = 'Phone number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid 10-digit phone number';
      }

      if (otpSent && !formData.otp) {
        errors.otp = 'OTP is required';
      } else if (otpSent && formData.otp.length !== 6) {
        errors.otp = 'OTP must be 6 digits';
      }
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
      setError(null);
    }
  };

  const handleSendOTP = async () => {
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
      setValidationErrors({ phone: 'Please enter a valid 10-digit phone number' });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.sendLoginOTP(formData.phone);
      setOtpSent(true);
      setOtpTimer(60); // 60 seconds countdown
      
      // Start countdown
      const interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (loginMethod === 'email') {
        response = await authService.login(formData.email, formData.password);
      } else {
        response = await authService.loginWithOTP(formData.phone, formData.otp);
      }
      
      // Redirect to intended page or dashboard
      const targetPath = response.data.redirectTo || redirectTo;
      navigate(targetPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-sitm-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-sitm-maroon" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to access your SITM portal
              </p>
            </div>

            {/* Login Method Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('email');
                  setOtpSent(false);
                  setError(null);
                  setValidationErrors({});
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  loginMethod === 'email'
                    ? 'bg-white dark:bg-slate-700 text-sitm-maroon dark:text-sitm-gold shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email & Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('phone');
                  setError(null);
                  setValidationErrors({});
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  loginMethod === 'phone'
                    ? 'bg-white dark:bg-slate-700 text-sitm-maroon dark:text-sitm-gold shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Phone & OTP
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {loginMethod === 'email' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
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
                        placeholder="Enter your email"
                        disabled={isLoading}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
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
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-sitm-maroon focus:ring-sitm-maroon border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>

                    <Link
                      to="/forgot-password"
                      className="text-sm text-sitm-maroon hover:text-sitm-maroon-light dark:text-sitm-gold dark:hover:text-sitm-gold-light"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className={`w-full p-3 pl-12 rounded-lg border ${
                          validationErrors.phone 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
                        placeholder="Enter your registered phone number"
                        disabled={isLoading || otpSent}
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    {validationErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>

                  {!otpSent ? (
                    <Button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={isLoading || !formData.phone}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          Send OTP
                        </>
                      )}
                    </Button>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Enter OTP
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="6"
                            value={formData.otp}
                            onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                            className={`w-full p-3 pl-12 rounded-lg border ${
                              validationErrors.otp 
                                ? 'border-red-300 dark:border-red-600' 
                                : 'border-gray-300 dark:border-slate-600'
                            } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors text-center text-2xl tracking-widest font-mono`}
                            placeholder="000000"
                            disabled={isLoading}
                            autoComplete="one-time-code"
                          />
                          <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        {validationErrors.otp && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.otp}</p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                          {otpTimer > 0 ? (
                            `Resend OTP in ${otpTimer}s`
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setOtpSent(false);
                                setFormData(prev => ({ ...prev, otp: '' }));
                              }}
                              className="text-sitm-maroon dark:text-sitm-gold hover:underline"
                            >
                              Resend OTP
                            </button>
                          )}
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}

              {(loginMethod === 'email' || otpSent) && (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/#admissions"
                  className="text-sitm-maroon hover:text-sitm-maroon-light dark:text-sitm-gold dark:hover:text-sitm-gold-light font-medium"
                >
                  Apply for admission
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}