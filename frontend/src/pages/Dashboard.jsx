import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';
import { applicationService } from '../services/applicationService';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Phone, 
  Calendar,
  GraduationCap,
  LogOut,
  Loader2
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Check if user is authenticated
        if (!authService.isAuthenticated()) {
          navigate('/login', { state: { from: '/dashboard' } });
          return;
        }

        // Get current user
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);

        // Get application status if user has an application
        if (currentUser?.applicationId) {
          try {
            const appResponse = await applicationService.getApplicationStatus(currentUser.applicationId);
            setApplicationStatus(appResponse.data);
          } catch (appError) {
            console.warn('Could not fetch application status:', appError);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      // Force logout even if API call fails
      navigate('/');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'under_review':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'approved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'waitlisted':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'under_review':
        return <FileText className="w-5 h-5" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5" />;
      case 'waitlisted':
        return <Clock className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sitm-maroon mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Error
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage your application and account
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-sitm-maroon/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-sitm-maroon" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Mail size={16} />
                <span className="text-sm">{user?.email}</span>
              </div>
              {user?.academic?.program && (
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <GraduationCap size={16} />
                  <span className="text-sm">{user.academic.program}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Calendar size={16} />
                <span className="text-sm">
                  Joined {new Date(user?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6">
              Edit Profile
            </Button>
          </motion.div>

          {/* Application Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Application Status
            </h2>

            {applicationStatus ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Application ID: {applicationStatus.applicationId}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Program: {applicationStatus.program}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(applicationStatus.status)}`}>
                    {getStatusIcon(applicationStatus.status)}
                    <span className="font-medium capitalize">
                      {applicationStatus.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Next Steps
                  </h4>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    {applicationStatus.status === 'pending' && (
                      <p>Your application is being reviewed by our admissions team. We'll notify you of any updates.</p>
                    )}
                    {applicationStatus.status === 'under_review' && (
                      <p>Your application is currently under detailed review. You may be contacted for additional information.</p>
                    )}
                    {applicationStatus.status === 'approved' && (
                      <p>Congratulations! Your application has been approved. Check your email for next steps.</p>
                    )}
                    {applicationStatus.status === 'rejected' && (
                      <p>Unfortunately, your application was not successful this time. You may apply again next year.</p>
                    )}
                    {applicationStatus.status === 'waitlisted' && (
                      <p>You've been placed on our waitlist. We'll contact you if a spot becomes available.</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline">
                    View Application
                  </Button>
                  <Button variant="outline">
                    Download Documents
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No Application Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  You haven't submitted an application yet.
                </p>
                <Button onClick={() => navigate('/')}>
                  Start Application
                </Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Mail size={16} />
              Contact Support
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText size={16} />
              Download Forms
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              Schedule Interview
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}