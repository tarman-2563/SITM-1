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
  Loader2,
  MapPin,
  CreditCard,
  Download,
  Upload,
  Edit,
  Eye,
  BookOpen,
  Award,
  Users,
  Home,
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
    { id: 'profile', label: 'Personal Details', icon: IdCard },
    { id: 'academic', label: 'Academic Info', icon: BookOpen },
    { id: 'documents', label: 'Documents', icon: Upload }
  ];

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {fullProfile?.name || user?.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Track your application and manage your profile
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Edit size={16} />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Application Status</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {applicationDetails?.status?.replace('_', ' ') || 'Not Submitted'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Program</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {fullProfile?.academic?.program || applicationDetails?.program || 'Not Selected'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submitted On</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {applicationDetails?.createdAt ? formatDate(applicationDetails.createdAt) : 'Not Submitted'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <IdCard className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Application ID</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                  {applicationDetails?.applicationId || 'Not Generated'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-8">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-sitm-maroon text-sitm-maroon dark:text-sitm-gold'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
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
            {activeTab === 'academic' && (
              <AcademicTab user={fullProfile || user} />
            )}
            {activeTab === 'documents' && (
              <DocumentsTab application={applicationDetails} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
// 
// Tab Components
function OverviewTab({ user, application, getStatusColor, getStatusIcon, formatDate }) {
  return (
    <div className="space-y-6">
      {/* Application Status Overview */}
      {application ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Application Status
            </h3>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(application.status)}`}>
              {getStatusIcon(application.status)}
              <span className="font-medium capitalize text-sm">
                {application.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Application ID</p>
              <p className="font-mono font-medium text-gray-900 dark:text-white">{application.applicationId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Program Applied</p>
              <p className="font-medium text-gray-900 dark:text-white">{application.program}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Submitted On</p>
              <p className="font-medium text-gray-900 dark:text-white">{formatDate(application.createdAt)}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Next Steps</h4>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {application.status === 'pending' && (
                <p>📋 Your application is being reviewed by our admissions team. We'll notify you of any updates via email.</p>
              )}
              {application.status === 'under_review' && (
                <p>🔍 Your application is currently under detailed review. You may be contacted for additional information or an interview.</p>
              )}
              {application.status === 'approved' && (
                <p>🎉 Congratulations! Your application has been approved. Check your email for admission confirmation and next steps.</p>
              )}
              {application.status === 'rejected' && (
                <p>❌ Unfortunately, your application was not successful this time. You may apply again in the next admission cycle.</p>
              )}
              {application.status === 'waitlisted' && (
                <p>⏳ You've been placed on our waitlist. We'll contact you if a spot becomes available.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Application Submitted
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You haven't submitted an application yet. Start your journey with SITM today!
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Start Application
          </Button>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
            <Download className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium">Download Application</p>
              <p className="text-xs text-gray-500">Get PDF copy</p>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
            <Upload className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <p className="font-medium">Upload Documents</p>
              <p className="text-xs text-gray-500">Add missing docs</p>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
            <Mail className="w-5 h-5 text-purple-600" />
            <div className="text-left">
              <p className="font-medium">Contact Support</p>
              <p className="text-xs text-gray-500">Get help</p>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
            <Calendar className="w-5 h-5 text-orange-600" />
            <div className="text-left">
              <p className="font-medium">Schedule Interview</p>
              <p className="text-xs text-gray-500">Book slot</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ApplicationTab({ application, getStatusColor, getStatusIcon, formatDate }) {
  if (!application) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Application Details
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Track your application progress and view details
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(application.status)}`}>
          {getStatusIcon(application.status)}
          <span className="font-medium capitalize">
            {application.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Application Timeline */}
      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Application Timeline</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Application Submitted</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(application.createdAt)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              ['under_review', 'approved', 'rejected', 'waitlisted'].includes(application.status)
                ? 'bg-blue-100 dark:bg-blue-900/30'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              <Clock className={`w-4 h-4 ${
                ['under_review', 'approved', 'rejected', 'waitlisted'].includes(application.status)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400'
              }`} />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Under Review</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {['under_review', 'approved', 'rejected', 'waitlisted'].includes(application.status)
                  ? 'In progress'
                  : 'Pending'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              ['approved', 'rejected', 'waitlisted'].includes(application.status)
                ? application.status === 'approved'
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : application.status === 'rejected'
                  ? 'bg-red-100 dark:bg-red-900/30'
                  : 'bg-yellow-100 dark:bg-yellow-900/30'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              {application.status === 'approved' && <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
              {application.status === 'rejected' && <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />}
              {application.status === 'waitlisted' && <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />}
              {!['approved', 'rejected', 'waitlisted'].includes(application.status) && (
                <Clock className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Decision</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Application Summary</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Application ID</p>
              <p className="font-mono font-medium text-gray-900 dark:text-white">{application.applicationId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Program</p>
              <p className="font-medium text-gray-900 dark:text-white">{application.program}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Submission Date</p>
              <p className="font-medium text-gray-900 dark:text-white">{formatDate(application.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Actions</h4>
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Eye size={16} />
              View Full Application
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Download size={16} />
              Download PDF
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Mail size={16} />
              Contact Admissions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user, formatDate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Personal Information
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your personal details
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit size={16} />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Basic Information
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
              <p className="font-medium text-gray-900 dark:text-white">{user?.name || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
              <p className="font-medium text-gray-900 dark:text-white">{user?.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
              <p className="font-medium text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.dateOfBirth ? formatDate(user.profile.dateOfBirth) : 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gender</p>
              <p className="font-medium text-gray-900 dark:text-white">{user?.profile?.gender || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Address Information
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Street Address</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.address?.street || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">City</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.address?.city || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">State</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.address?.state || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">PIN Code</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.address?.pincode || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Country</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.address?.country || 'India'}
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Emergency Contact
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contact Name</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.emergencyContact?.name || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Relationship</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.emergencyContact?.relationship || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.profile?.emergencyContact?.phone || 'Not provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <IdCard className="w-5 h-5" />
            Account Information
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Account Type</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">{user?.role || 'Student'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Account Created</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.createdAt ? formatDate(user.createdAt) : 'Not available'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Login</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.lastLogin ? formatDate(user.lastLogin) : 'Not available'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email Verified</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.isVerified ? '✅ Verified' : '❌ Not Verified'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademicTab({ user }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Academic Information
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your educational background and academic details
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit size={16} />
          Update Academic Info
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Program */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Current Program
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Program</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.academic?.program || 'Not enrolled'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Admission Year</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.academic?.admissionYear || 'Not available'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {user?.academic?.currentStatus || 'Applicant'}
              </p>
            </div>
            {user?.academic?.rollNumber && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Roll Number</p>
                <p className="font-mono font-medium text-gray-900 dark:text-white">
                  {user.academic.rollNumber}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Academic Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Academic Progress
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Semester</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.academic?.semester || 'Not applicable'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Section</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.academic?.section || 'Not assigned'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Batch</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.academic?.batch || 'Not assigned'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expected Graduation</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.academic?.graduationYear || 'Not calculated'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Academic Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium">Course Catalog</p>
              <p className="text-xs text-gray-500">View available courses</p>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
            <Calendar className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <p className="font-medium">Academic Calendar</p>
              <p className="text-xs text-gray-500">Important dates</p>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
            <Award className="w-5 h-5 text-purple-600" />
            <div className="text-left">
              <p className="font-medium">Scholarships</p>
              <p className="text-xs text-gray-500">Financial aid options</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

function DocumentsTab({ application }) {
  const documents = [
    { name: '10th Mark Sheet', status: 'uploaded', type: 'academic' },
    { name: '12th Mark Sheet', status: 'uploaded', type: 'academic' },
    { name: 'Transfer Certificate', status: 'pending', type: 'academic' },
    { name: 'Passport Photo', status: 'uploaded', type: 'personal' },
    { name: 'Aadhar Card', status: 'uploaded', type: 'identity' },
    { name: 'Income Certificate', status: 'pending', type: 'financial' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Document Management
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Upload and manage your application documents
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload size={16} />
          Upload Document
        </Button>
      </div>

      {/* Document Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">4</p>
              <p className="text-sm text-green-700 dark:text-green-300">Uploaded</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Pending</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">6</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Total Required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white">Required Documents</h4>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {documents.map((doc, index) => (
            <div key={index} className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{doc.type} document</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {getStatusIcon(doc.status)}
                  <span className="capitalize">{doc.status}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {doc.status === 'uploaded' && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Eye size={14} />
                      View
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Upload size={14} />
                    {doc.status === 'uploaded' ? 'Replace' : 'Upload'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Upload Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
          <div>
            <h5 className="font-medium mb-2">File Requirements:</h5>
            <ul className="space-y-1">
              <li>• Maximum file size: 5MB</li>
              <li>• Supported formats: PDF, JPG, PNG</li>
              <li>• Clear and readable scans</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Important Notes:</h5>
            <ul className="space-y-1">
              <li>• All documents must be original or certified copies</li>
              <li>• Ensure all text is clearly visible</li>
              <li>• Upload documents in the correct orientation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}