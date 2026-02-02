import { useState } from 'react';
import { Button } from '../../common/Button';
import { ArrowLeft, Send, AlertCircle, Loader2, Edit } from 'lucide-react';

export function ReviewSubmitStep({ 
  formData, 
  leadData, 
  applicationId,
  onSubmit, 
  onPrev, 
  isLoading, 
  error,
  isAlreadySubmitted = false
}) {
  const [agreed, setAgreed] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async () => {
    if (!agreed) {
      setSubmitError('Please agree to the terms and conditions');
      return;
    }

    setSubmitError('');
    try {
      await onSubmit();
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit application');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const formatAddress = (address) => {
    if (!address) return 'Not provided';
    const parts = [
      address.street,
      address.city,
      address.state,
      address.pincode
    ].filter(Boolean);
    return parts.join(', ') || 'Not provided';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Review Your Application
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Please review all the information carefully before submitting your application.
        </p>
      </div>

      {/* Application Summary */}
      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 space-y-6">
        
        {/* Basic Information */}
        <div>
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            Basic Information
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sitm-maroon dark:text-sitm-gold hover:underline text-sm font-normal"
            >
              <Edit size={14} className="inline" /> Edit
            </button>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {leadData.firstName} {leadData.lastName}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
              <span className="ml-2 text-gray-900 dark:text-white">{leadData.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
              <span className="ml-2 text-gray-900 dark:text-white">{leadData.phone}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Program:</span>
              <span className="ml-2 text-gray-900 dark:text-white">{leadData.program}</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formatDate(formData.personalInfo.dateOfBirth)}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Gender:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.personalInfo.gender || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Category:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.personalInfo.category || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Nationality:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.personalInfo.nationality || 'Not provided'}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Address:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formatAddress(formData.personalInfo.address)}
              </span>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div>
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
            Academic Background
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Qualification:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.academicInfo.previousEducation?.qualification || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Board:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.academicInfo.previousEducation?.board || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Percentage:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.academicInfo.previousEducation?.percentage ? 
                  `${formData.academicInfo.previousEducation.percentage}%` : 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Year of Passing:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.academicInfo.previousEducation?.yearOfPassing || 'Not provided'}
              </span>
            </div>
            {formData.academicInfo.entranceExam?.examName && 
             formData.academicInfo.entranceExam.examName !== 'Not Applicable' && (
              <>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Entrance Exam:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.academicInfo.entranceExam.examName}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Roll Number:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.academicInfo.entranceExam.rollNumber || 'Not provided'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Family Information */}
        <div>
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
            Family Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Father's Name:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.familyInfo.father?.name || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Father's Phone:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.familyInfo.father?.phone || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Father's Occupation:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.familyInfo.father?.occupation || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Family Income:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.familyInfo.father?.income || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Emergency Contact:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formData.additionalInfo.emergencyContact?.name || 'Not provided'}
                {formData.additionalInfo.emergencyContact?.phone && 
                  ` (${formData.additionalInfo.emergencyContact.phone})`}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {(formData.additionalInfo.hostelRequired || 
          formData.additionalInfo.transportRequired || 
          formData.additionalInfo.howDidYouHear) && (
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
              Additional Information
            </h4>
            <div className="space-y-2 text-sm">
              {formData.additionalInfo.hostelRequired && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-900 dark:text-white">Hostel accommodation required</span>
                </div>
              )}
              {formData.additionalInfo.transportRequired && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-900 dark:text-white">College transport required</span>
                </div>
              )}
              {formData.additionalInfo.howDidYouHear && (
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Heard about SITM through:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.additionalInfo.howDidYouHear}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 text-sitm-maroon bg-gray-100 border-gray-300 rounded focus:ring-sitm-maroon dark:focus:ring-sitm-gold dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
          />
          <div>
            <label htmlFor="terms" className="text-sm font-medium text-gray-900 dark:text-white">
              I agree to the terms and conditions *
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              By submitting this application, I confirm that all information provided is accurate and complete. 
              I understand that any false information may result in rejection of my application. 
              I also consent to SITM contacting me regarding my application and admission process.
            </p>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {(error || submitError) && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
          <div>
            <p className="text-red-700 dark:text-red-400 font-medium">
              Application Submission Failed
            </p>
            <p className="text-red-600 dark:text-red-300 text-sm">
              {error || submitError}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
        <Button variant="outline" onClick={onPrev} disabled={isLoading} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Previous
        </Button>
        
        {isAlreadySubmitted ? (
          <div className="text-center">
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400 mb-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold">Application Submitted Successfully!</span>
              </div>
              {applicationId && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Application ID: <span className="font-mono font-semibold">{applicationId}</span>
                </p>
              )}
            </div>
            <Button 
              onClick={onSubmit}
              className="flex items-center gap-2"
            >
              Complete Process
              <Send size={16} />
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !agreed}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <Send size={16} />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}