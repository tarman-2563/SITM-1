import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { authService } from '../services/authService';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.message);
      setEmailSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Check Your Email
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  The reset link will expire in 10 minutes for security reasons. 
                  If you don't see the email, check your spam folder.
                </p>
              </div>
              
              <div className="space-y-3">
                <Link to="/login">
                  <Button className="w-full">
                    Back to Login
                  </Button>
                </Link>
                
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail('');
                    setMessage(null);
                    setError(null);
                  }}
                  className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Send to a different email
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Back to Login Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/login"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Login</span>
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
                <Mail className="w-8 h-8 text-sitm-maroon" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <p className="text-green-700 dark:text-green-400 text-sm">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    className="w-full p-3 pl-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
                    placeholder="Enter your registered email"
                    disabled={isLoading}
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Reset Link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
                <Link
                  to="/login"
                  className="text-sitm-maroon hover:text-sitm-maroon-light dark:text-sitm-gold dark:hover:text-sitm-gold-light font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}