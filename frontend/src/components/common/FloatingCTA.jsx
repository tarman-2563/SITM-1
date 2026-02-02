import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeadCapture } from '../../context/LeadCaptureContext';
import { GraduationCap, X } from 'lucide-react';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openApplyNowModal } = useLeadCapture();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleApply = () => {
    openApplyNowModal();
    setIsVisible(false);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40 max-w-sm"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 p-4 relative">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-sitm-maroon rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                  Ready to Start Your Journey?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                  Join SITM and build your future with practical learning.
                </p>
                
                <button
                  onClick={handleApply}
                  className="w-full bg-sitm-maroon text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-sitm-maroon-light transition-colors duration-200"
                >
                  Apply Now - Free
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}