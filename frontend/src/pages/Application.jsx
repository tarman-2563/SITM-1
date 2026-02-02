import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicationForm } from '../components/forms/ApplicationForm';
import { leadService } from '../services/leadService';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Loader2, AlertCircle } from 'lucide-react';

export function Application() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeadData = async () => {
      if (!leadId) {
        setError('Invalid application link');
        setLoading(false);
        return;
      }

      try {
        const response = await leadService.getLeadById(leadId);
        setLeadData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load application data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeadData();
  }, [leadId]);

  const handleClose = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sitm-maroon mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading your application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Application Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-sitm-maroon text-white px-6 py-3 rounded-lg hover:bg-sitm-maroon-light transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      <div className="py-8">
        <ApplicationForm
          isOpen={true}
          onClose={handleClose}
          leadId={leadId}
          leadData={leadData}
        />
      </div>
      <Footer />
    </div>
  );
}