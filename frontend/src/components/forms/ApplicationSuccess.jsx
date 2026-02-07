import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { CheckCircle, Download, User } from 'lucide-react';

export function ApplicationSuccess({ 
  onClose, 
  applicationData, 
  leadData, 
  submittedApplicationId,
  accountCreated = false,
  activationToken = null,
  onActivateAccount
}) {
  // Use the actual submitted application ID if available, otherwise generate a placeholder
  const applicationId = submittedApplicationId || `SITM${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Congratulations! Your Application is Complete
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for applying to SITM. Your application has been received and is being processed.
          </p>
          
          {accountCreated && activationToken && (
            <div className="bg-white dark:bg-slate-800 border-2 border-sitm-gold dark:border-sitm-gold/80 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sitm-gold to-yellow-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Student Account Created!</span>
              </div>
              <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                We've created a student portal account for you. Activate it now to track your application status, 
                upload documents, and receive updates.
              </p>
            </div>
          )}
        </div>

        {/* Application Details */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Application Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Application ID:</span>
              <span className="font-mono font-medium text-gray-900 dark:text-white">{applicationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Applicant Name:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {leadData.firstName} {leadData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Program:</span>
              <span className="font-medium text-gray-900 dark:text-white">{leadData.program}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Submitted On:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date().toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          {accountCreated && activationToken && (
            <Button
              onClick={() => onActivateAccount(activationToken)}
              variant="secondary"
              size="lg"
            >
              <User size={16} />
              Activate Student Account
            </Button>
          )}
          
          {/* Fallback button if account creation failed but we still want to show activation option */}
          {!accountCreated && activationToken && (
            <Button
              onClick={() => onActivateAccount(activationToken)}
              variant="primary"
              size="lg"
            >
              <User size={16} />
              Set Up Your Account
            </Button>
          )}
          
          {/* Show manual activation option if no token but we know account should exist */}
          {!activationToken && submittedApplicationId && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                Your application has been submitted successfully! Check your email for account activation instructions.
              </p>
              <Button
                onClick={() => {
                  // Redirect to login page or show manual activation form
                  window.location.href = '/login';
                }}
                variant="outline"
              >
                Go to Login Page
              </Button>
            </div>
          )}
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              // Generate and download application summary
              const summary = `
SITM Application Summary
========================
Application ID: ${applicationId}
Name: ${leadData.firstName} ${leadData.lastName}
Email: ${leadData.email}
Phone: ${leadData.phone}
Program: ${leadData.program}
Submitted: ${new Date().toLocaleString('en-IN')}

Please save this information for your records.
Contact us at +91 98765 43210 for any queries.
              `.trim();
              
              const blob = new Blob([summary], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `SITM_Application_${applicationId}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <Download size={16} />
            Download Summary
          </Button>
          <Button 
            onClick={onClose}
            variant={accountCreated && activationToken ? "outline" : "primary"}
            size="lg"
          >
            {accountCreated && activationToken ? "Close" : "Done - Close Application"}
          </Button>
        </div>

        {/* Important Note */}
        <div className="text-center bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-1">
            📋 Important: Save Your Application ID
          </p>
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            Application ID: <span className="font-mono font-bold">{applicationId}</span> - Keep this safe for future reference.
          </p>
        </div>
      </div>
    </motion.div>
  );
}