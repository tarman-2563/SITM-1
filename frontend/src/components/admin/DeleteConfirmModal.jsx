import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { 
  X, 
  AlertTriangle, 
  Trash2, 
  User,
  Loader2
} from 'lucide-react';

export function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  adminName, 
  adminEmail,
  isLoading = false 
}) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Admin User
              </h3>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Admin Info */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-sitm-navy to-sitm-maroon rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {adminName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {adminEmail}
                </div>
              </div>
            </div>

            {/* Simple Warning Message */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Are you sure you want to delete this admin user?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                This action cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}