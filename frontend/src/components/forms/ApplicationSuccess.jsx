import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { CheckCircle, Download, Mail, Phone, Calendar } from 'lucide-react';

export function ApplicationSuccess({ onClose, applicationData, leadData }) {
  const applicationId = `SITM${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 text-center"
    >
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
      </div>

      {/* Success Message */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Application Submitted Successfully!
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Thank you for applying to SITM. Your application has been received and is being processed.
      </p>

      {/* Application Details */}
      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 mb-6 text-left">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Application Details</h4>
        <div className="space-y-3 text-sm">
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

      {/* Next Steps */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6 text-left">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          What Happens Next?
        </h4>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">1</span>
            </div>
            <div>
              <p className="font-medium">Email Confirmation</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                You'll receive a confirmation email within 24 hours with your application details.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">2</span>
            </div>
            <div>
              <p className="font-medium">Application Review</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Our admissions team will review your application within 3-5 business days.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">3</span>
            </div>
            <div>
              <p className="font-medium">Counselor Contact</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                An admission counselor will contact you to discuss next steps and answer any questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-sitm-navy dark:bg-slate-800 text-white rounded-lg p-6 mb-6">
        <h4 className="font-semibold mb-4">Need Help?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-sitm-gold" />
            <div>
              <p className="font-medium">Call Us</p>
              <p className="text-gray-300">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-sitm-gold" />
            <div>
              <p className="font-medium">Email Us</p>
              <p className="text-gray-300">admissions@sitm.ac.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
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
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Download Summary
        </Button>
        <Button onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Important Note */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
        Please keep your Application ID ({applicationId}) safe for future reference.
      </p>
    </motion.div>
  );
}