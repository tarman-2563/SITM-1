import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';
import { applicationService } from '../services/applicationService';
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
  Loader2,
  MapPin,
  CreditCard,
  Download,
  Edit,
  Eye,
  BookOpen,
  Award,
  Users,
  IdCard,
  Heart,
  Globe
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullProfile, setFullProfile] = useState(null);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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

        // Get full profile data
        const profileResponse = await authService.getProfile();
        setFullProfile(profileResponse.data.user);

        // Get detailed application data if user has an application
        if (profileResponse.data.user.application) {
          try {
            // For now, we'll use the status endpoint, but we can enhance this later
            const appResponse = await applicationService.getApplicationStatus(
              profileResponse.data.user.application.applicationId
            );
            setApplicationDetails(appResponse.data);
          } catch (appError) {
            console.warn('Could not fetch application details:', appError);
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
        return 'text-sitm-maroon bg-sitm-maroon/10 dark:bg-sitm-maroon/20';
      case 'under_review':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'approved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'waitlisted':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      default:
        return 'text-sitm-navy bg-sitm-navy/10 dark:bg-sitm-navy/20';
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'application', label: 'Application', icon: FileText },
    { id: 'profile', label: 'Personal Details', icon: IdCard }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-sitm-navy to-sitm-maroon rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Dashboard</h3>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we fetch your information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-red-200 dark:border-red-800">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Error
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-sitm-navy to-sitm-maroon hover:from-sitm-navy-light hover:to-sitm-maroon-light text-white"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sitm-navy/10 to-sitm-maroon/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-sitm-gold/10 to-sitm-maroon/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Enhanced Header with Glass Effect */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sitm-maroon to-sitm-navy bg-clip-text text-transparent">
                Welcome back, {fullProfile?.name || user?.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Track your application and manage your profile
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout} 
            className="flex items-center gap-2 border-sitm-maroon/30 text-sitm-maroon hover:bg-sitm-maroon hover:text-white hover:border-sitm-maroon transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </motion.div>
        {/* Enhanced Stats Cards with Hover Effects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border-l-4 border-sitm-maroon hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sitm-maroon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sitm-maroon to-sitm-maroon-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Application Status</p>
                <p className="text-lg font-bold text-sitm-maroon dark:text-sitm-maroon-light capitalize">
                  {applicationDetails?.status?.replace('_', ' ') || 'Not Submitted'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border-l-4 border-sitm-navy hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sitm-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sitm-navy to-sitm-navy-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Program</p>
                <p className="text-lg font-bold text-sitm-navy dark:text-sitm-navy-light">
                  {fullProfile?.academic?.program || applicationDetails?.program || 'Not Selected'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border-l-4 border-sitm-gold hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sitm-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sitm-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Submitted On</p>
                <p className="text-lg font-bold text-sitm-gold dark:text-sitm-gold-light">
                  {applicationDetails?.createdAt ? formatDate(applicationDetails.createdAt) : 'Not Submitted'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border-l-4 border-sitm-navy hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sitm-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sitm-navy to-sitm-maroon rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <IdCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Application ID</p>
                <p className="text-lg font-bold text-sitm-navy dark:text-sitm-navy-light font-mono">
                  {applicationDetails?.applicationId || 'Not Generated'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Tab Navigation with Glass Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 mb-8 overflow-hidden"
        >
          <div className="border-b border-blue-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-slate-800/50 dark:to-slate-700/30">
            <nav className="flex space-x-1 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${
                      activeTab === tab.id
                        ? 'border-sitm-maroon text-sitm-maroon dark:text-sitm-maroon-light bg-gradient-to-b from-sitm-maroon/10 to-sitm-maroon/5 dark:from-sitm-maroon/20 dark:to-sitm-maroon/10 shadow-lg'
                        : 'border-transparent text-sitm-navy/70 hover:text-sitm-navy dark:text-slate-400 dark:hover:text-sitm-navy-light hover:bg-gradient-to-b hover:from-blue-100/50 hover:to-blue-50/30 dark:hover:from-slate-700/50 dark:hover:to-slate-800/30'
                    } relative whitespace-nowrap py-4 px-6 border-b-3 font-semibold text-sm flex items-center gap-3 transition-all duration-300 rounded-t-xl`}
                  >
                    <Icon size={20} />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-sitm-maroon/5 to-sitm-navy/5 rounded-t-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Enhanced Tab Content */}
          <div className="p-8 bg-gradient-to-br from-white/50 to-blue-50/30 dark:from-slate-900/50 dark:to-slate-800/30">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <OverviewTab 
                  user={fullProfile || user} 
                  application={applicationDetails}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  formatDate={formatDate}
                />
              )}
              {activeTab === 'application' && (
                <ApplicationTab 
                  application={applicationDetails}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  formatDate={formatDate}
                />
              )}
              {activeTab === 'profile' && (
                <ProfileTab user={fullProfile || user} formatDate={formatDate} />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
   )
}
// 
// Tab Components
function OverviewTab({ user, application, getStatusColor, getStatusIcon, formatDate }) {
  return (
    <div className="space-y-6">
      {/* Application Status Overview */}
      {application ? (
        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-sitm-maroon rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              Application Status
            </h3>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full ${getStatusColor(application.status)} shadow-md`}>
              {getStatusIcon(application.status)}
              <span className="font-semibold capitalize text-sm">
                {application.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md border border-gray-100 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">Application ID</p>
              <p className="font-mono font-bold text-lg text-gray-900 dark:text-white mt-2">{application.applicationId}</p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md border border-gray-100 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">Program Applied</p>
              <p className="font-bold text-lg text-gray-900 dark:text-white mt-2">{application.program}</p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md border border-gray-100 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">Submitted On</p>
              <p className="font-bold text-lg text-gray-900 dark:text-white mt-2">{formatDate(application.createdAt)}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sitm-navy/10 to-sitm-maroon/10 dark:from-sitm-navy/20 dark:to-sitm-maroon/20 rounded-lg p-6 border border-sitm-navy/20 dark:border-sitm-maroon/30">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-sitm-gold rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              Next Steps
            </h4>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {application.status === 'pending' && (
                <p className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <span>Your application is being reviewed by our admissions team. We'll notify you of any updates via email.</span>
                </p>
              )}
              {application.status === 'under_review' && (
                <p className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <span>Your application is currently under detailed review. You may be contacted for additional information or an interview.</span>
                </p>
              )}
              {application.status === 'approved' && (
                <p className="flex items-start gap-3">
                  <span className="text-2xl">🎉</span>
                  <span>Congratulations! Your application has been approved. Check your email for admission confirmation and next steps.</span>
                </p>
              )}
              {application.status === 'rejected' && (
                <p className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <span>Unfortunately, your application was not successful this time. You may apply again in the next admission cycle.</span>
                </p>
              )}
              {application.status === 'waitlisted' && (
                <p className="flex items-start gap-3">
                  <span className="text-2xl">⏳</span>
                  <span>You've been placed on our waitlist. We'll contact you if a spot becomes available.</span>
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 rounded-xl border-2 border-dashed border-sitm-maroon/30 dark:border-sitm-gold/30">
          <div className="w-20 h-20 bg-gradient-to-br from-sitm-navy to-sitm-maroon rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Application Submitted
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            You haven't submitted an application yet. Start your journey with SITM today and unlock your potential!
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-sitm-navy to-sitm-maroon hover:from-sitm-navy-light hover:to-sitm-maroon-light text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Application
          </Button>
        </div>
      )}
    </div>
  );
}

function ApplicationTab({ application, getStatusColor, getStatusIcon, formatDate }) {
  if (!application) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-red-50 dark:from-slate-800 dark:to-red-900/20 rounded-xl">
        <div className="w-20 h-20 bg-gray-400 rounded-xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          No Application Found
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          You haven't submitted an application yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Application Header */}
      <div className="bg-gradient-to-r from-sitm-navy/10 to-sitm-maroon/10 dark:from-sitm-navy/20 dark:to-sitm-maroon/20 rounded-xl p-6 border border-sitm-navy/20 dark:border-sitm-maroon/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-sitm-navy rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              Application Details
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Track your application progress and view details
            </p>
          </div>
          <div className={`flex items-center gap-3 px-4 py-2 rounded-full ${getStatusColor(application.status)} shadow-md`}>
            {getStatusIcon(application.status)}
            <span className="font-semibold capitalize">
              {application.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Application Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-sitm-gold rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          Application Timeline
        </h4>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center border-2 border-green-500">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">Application Submitted</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(application.createdAt)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              ['under_review', 'approved', 'rejected', 'waitlisted'].includes(application.status)
                ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500'
                : 'bg-gray-100 dark:bg-gray-800 border-gray-300'
            }`}>
              <Clock className={`w-5 h-5 ${
                ['under_review', 'approved', 'rejected', 'waitlisted'].includes(application.status)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400'
              }`} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">Under Review</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {['under_review', 'approved', 'rejected', 'waitlisted'].includes(application.status)
                  ? 'In progress'
                  : 'Pending'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              ['approved', 'rejected', 'waitlisted'].includes(application.status)
                ? application.status === 'approved'
                  ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                  : application.status === 'rejected'
                  ? 'bg-red-100 dark:bg-red-900/30 border-red-500'
                  : 'bg-sitm-maroon/10 text-sitm-maroon dark:bg-sitm-maroon/20 dark:text-sitm-maroon-light border-sitm-maroon'
                : 'bg-gray-100 dark:bg-gray-800 border-gray-300'
            }`}>
              {application.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />}
              {application.status === 'rejected' && <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
              {application.status === 'waitlisted' && <Clock className="w-5 h-5 text-sitm-maroon dark:text-sitm-maroon-light" />}
              {!['approved', 'rejected', 'waitlisted'].includes(application.status) && (
                <Clock className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">Decision</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {['approved', 'rejected', 'waitlisted'].includes(application.status)
                  ? `${application.status.charAt(0).toUpperCase() + application.status.slice(1)}`
                  : 'Pending'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-sitm-maroon rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          Application Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Application ID</p>
              <p className="font-mono font-bold text-gray-900 dark:text-white">{application.applicationId}</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Program</p>
              <p className="font-bold text-gray-900 dark:text-white">{application.program}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Submission Date</p>
              <p className="font-bold text-gray-900 dark:text-white">{formatDate(application.createdAt)}</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Current Status</p>
              <p className="font-bold text-gray-900 dark:text-white capitalize">{application.status.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user, formatDate }) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sitm-maroon to-sitm-navy rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            Personal Information
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            View and manage your personal details and contact information
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 border-sitm-maroon/30 text-sitm-maroon hover:bg-sitm-maroon hover:text-white transition-all duration-300"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Basic Information - Enhanced */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-blue-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-slate-700 shadow-lg">
            <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Full Name</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.name || 'Not provided'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50 font-mono">
                  {user?.email || 'Not provided'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50 font-mono">
                  {user?.phone || 'Not provided'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.dateOfBirth ? formatDate(user.profile.dateOfBirth) : 'Not provided'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Gender
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.gender || 'Not provided'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Nationality
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.nationality || 'Indian'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Category
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.category || 'Not provided'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Blood Group
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.bloodGroup || 'Not provided'}
                </p>
              </div>
              <div className="md:col-span-2 space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Aadhar Number
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50 font-mono">
                  {user?.profile?.aadharNumber ? `**** **** ${user.profile.aadharNumber.slice(-4)}` : 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Address Information - Enhanced */}
          <div className="bg-gradient-to-br from-white to-green-50/50 dark:from-slate-800 dark:to-green-900/20 rounded-2xl p-8 border border-green-200/50 dark:border-slate-700 shadow-lg">
            <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              Address Information
            </h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Street Address</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.address?.street || 'Not provided'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">City</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                    {user?.profile?.address?.city || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">State</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                    {user?.profile?.address?.state || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">PIN Code</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50 font-mono">
                    {user?.profile?.address?.pincode || 'Not provided'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Country</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-4 py-3 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.address?.country || 'India'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contact - Enhanced */}
          <div className="bg-gradient-to-br from-white to-orange-50/50 dark:from-slate-800 dark:to-orange-900/20 rounded-2xl p-6 border border-orange-200/50 dark:border-slate-700 shadow-lg">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              Emergency Contact
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Contact Name</p>
                <p className="text-base font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-3 py-2 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.emergencyContact?.name || 'Not provided'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Relationship</p>
                <p className="text-base font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-3 py-2 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.profile?.emergencyContact?.relationship || 'Not provided'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Phone Number</p>
                <p className="text-base font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-3 py-2 border border-gray-200/50 dark:border-slate-600/50 font-mono">
                  {user?.profile?.emergencyContact?.phone || 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Account Information - Enhanced */}
          <div className="bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-800 dark:to-purple-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-slate-700 shadow-lg">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <IdCard className="w-5 h-5 text-white" />
              </div>
              Account Information
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Account Type</p>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user?.role === 'admin' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {user?.role === 'admin' ? '👑 Admin' : '🎓 Student'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Account Created</p>
                <p className="text-base font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-3 py-2 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.createdAt ? formatDate(user.createdAt) : 'Not available'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Last Login</p>
                <p className="text-base font-medium text-gray-900 dark:text-white bg-white/60 dark:bg-slate-700/60 rounded-lg px-3 py-2 border border-gray-200/50 dark:border-slate-600/50">
                  {user?.lastLogin ? formatDate(user.lastLogin) : 'Not available'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Email Status</p>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
                    user?.isVerified 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-sitm-maroon/10 text-sitm-maroon dark:bg-sitm-maroon/20 dark:text-sitm-maroon-light'
                  }`}>
                    {user?.isVerified ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Pending
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-blue-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-slate-700 shadow-lg">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 p-4 h-auto border-sitm-maroon/20 hover:bg-sitm-maroon hover:text-white transition-all duration-300"
              >
                <Edit className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Update Profile</p>
                  <p className="text-xs opacity-70">Edit personal information</p>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 p-4 h-auto border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Download Profile</p>
                  <p className="text-xs opacity-70">Export as PDF</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

