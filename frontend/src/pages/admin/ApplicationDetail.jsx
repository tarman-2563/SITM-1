import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminService } from '../../services/adminService';
import { authService } from '../../services/authService';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  GraduationCap,
  Users,
  FileText,
  Edit,
  Save,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'under_review', label: 'Under Review', color: 'blue' },
  { value: 'approved', label: 'Approved', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
  { value: 'waitlisted', label: 'Waitlisted', color: 'purple' }
];

export function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const initializeDetail = async () => {
      try {
        // Check admin access
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }

        const user = authService.getCurrentUser();
        if (!user || !['admin', 'super_admin'].includes(user.role)) {
          navigate('/dashboard');
          return;
        }

        // Load application details
        const response = await adminService.getApplicationById(id);
        setApplication(response.data);
        setNewStatus(response.data.status);
        setRemarks(response.data.remarks || '');
      } catch (err) {
        setError(err.message || 'Failed to load application details');
      } finally {
        setLoading(false);
      }
    };

    initializeDetail();
  }, [id, navigate]);

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      await adminService.updateApplicationStatus(id, newStatus, remarks);
      
      // Refresh application data
      const response = await adminService.getApplicationById(id);
      setApplication(response.data);
      setIsEditingStatus(false);
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const statusConfig = STATUS_OPTIONS.find(s => s.value === status);
    const color = statusConfig?.color || 'gray';
    
    return {
      yellow: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
      blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      green: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      red: 'text-red-600 bg-red-100 dark:bg-red-900/30',
      purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
      gray: 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }[color];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAddress = (address) => {
    if (!address) return 'Not provided';
    const parts = [address.street, address.city, address.state, address.pincode].filter(Boolean);
    return parts.join(', ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sitm-maroon mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Application Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Button onClick={() => navigate('/admin/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Application Details
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Application ID: {application.applicationId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User size={20} />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Full Name:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {application.firstName} {application.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{application.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{application.phone}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formatDate(application.dateOfBirth)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Gender:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{application.gender}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Category:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{application.category}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Address:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formatAddress(application.address)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Academic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <GraduationCap size={20} />
                Academic Background
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Qualification:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {application.previousEducation?.qualification}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Board:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {application.previousEducation?.board}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Percentage:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {application.previousEducation?.percentage}%
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Year of Passing:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {application.previousEducation?.yearOfPassing}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Family Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users size={20} />
                Family Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Guardian Name:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{application.guardianName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Guardian Phone:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{application.guardianPhone}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Guardian Occupation:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{application.guardianOccupation}</span>
                </div>
                {application.guardianEmail && (
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Guardian Email:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{application.guardianEmail}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Application Status
              </h3>
              
              {isEditingStatus ? (
                <div className="space-y-4">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Add remarks (optional)"
                    rows={3}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold resize-none"
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleStatusUpdate}
                      disabled={isUpdating}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      {isUpdating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingStatus(false)}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(application.status)}`}>
                    {application.status === 'pending' && <Clock size={16} />}
                    {application.status === 'under_review' && <FileText size={16} />}
                    {application.status === 'approved' && <CheckCircle size={16} />}
                    {application.status === 'rejected' && <AlertCircle size={16} />}
                    {application.status === 'waitlisted' && <Clock size={16} />}
                    <span className="font-medium capitalize">
                      {application.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {application.remarks && (
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Remarks:</strong> {application.remarks}
                      </p>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => setIsEditingStatus(true)}
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Update Status
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Application Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Application Info
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Program:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{application.program}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Submitted:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formatDate(application.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Source:</span>
                  <span className="ml-2 text-gray-900 dark:text-white capitalize">
                    {application.source?.replace('_', ' ')}
                  </span>
                </div>
                {application.reviewedBy && (
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Reviewed By:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {application.reviewedBy.name}
                    </span>
                  </div>
                )}
                {application.reviewedAt && (
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Reviewed On:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {formatDate(application.reviewedAt)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                  <Mail size={16} />
                  Send Message
                </Button>
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                  <Calendar size={16} />
                  Schedule Interview
                </Button>
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                  <FileText size={16} />
                  Download Application
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}