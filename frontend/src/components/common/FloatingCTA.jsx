import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Award, X, ArrowRight } from 'lucide-react';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/scholarships') {
      return;
    }

    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 5000); 

    return () => clearTimeout(timer);
  }, [isDismissed, location.pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('scholarship_popup_dismissed', 'true');
  };

  const handleViewScholarships = () => {
    navigate('/scholarships');
    setIsVisible(false);
  };

  // Don't show if already dismissed in this session
  if (isDismissed || sessionStorage.getItem('scholarship_popup_dismissed')) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40 max-w-sm"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 p-3 relative">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-sitm-maroon rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-sans font-black text-gray-900 dark:text-white text-sm mb-1">
                  🎓 <span className="font-black">Scholarships Available!</span>
                </h4>
                <p className="font-sans text-gray-600 dark:text-gray-300 text-xs mb-3">
                  Don't let finances limit your dreams. Explore our scholarship opportunities.
                </p>
                
                <button
                  onClick={handleViewScholarships}
                  className="w-full bg-sitm-maroon text-white text-sm font-sans font-medium py-2 px-4 rounded-lg hover:bg-sitm-maroon-light transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  View Scholarships
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}