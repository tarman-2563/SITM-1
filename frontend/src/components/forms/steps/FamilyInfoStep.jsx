import { useState } from 'react';
import { Button } from '../../common/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const INCOME_RANGES = [
  'Below 1 Lakh',
  '1-2 Lakhs',
  '2-5 Lakhs',
  '5-10 Lakhs',
  '10-20 Lakhs',
  'Above 20 Lakhs'
];

const RELATIONS = [
  'Father',
  'Mother',
  'Uncle',
  'Aunt',
  'Grandfather',
  'Grandmother',
  'Brother',
  'Sister',
  'Other'
];

const HOW_DID_YOU_HEAR = [
  'Google Search',
  'Social Media (Facebook, Instagram)',
  'Friends/Family',
  'School Counselor',
  'Education Fair',
  'Newspaper/Magazine',
  'TV/Radio Advertisement',
  'College Website',
  'Other'
];

export function FamilyInfoStep({ 
  data, 
  additionalInfo, 
  onFamilyChange, 
  onAdditionalChange, 
  onNext, 
  onPrev,
  isLoading = false
}) {
  const [errors, setErrors] = useState({});

  const handleFamilyChange = (section, field, value) => {
    onFamilyChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    });

    // Clear error when user starts typing
    const errorKey = `${section}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleAdditionalChange = (field, value) => {
    onAdditionalChange({
      ...additionalInfo,
      [field]: value
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmergencyContactChange = (field, value) => {
    onAdditionalChange({
      ...additionalInfo,
      emergencyContact: {
        ...additionalInfo.emergencyContact,
        [field]: value
      }
    });

    // Clear error when user starts typing
    const errorKey = `emergencyContact.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    // Father's details validation
    if (!data.father?.name) {
      newErrors['father.name'] = "Father's name is required";
    }

    if (!data.father?.phone) {
      newErrors['father.phone'] = "Father's phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(data.father.phone)) {
      newErrors['father.phone'] = 'Please enter a valid 10-digit phone number';
    }

    if (!data.father?.occupation) {
      newErrors['father.occupation'] = "Father's occupation is required";
    }

    // Emergency contact validation
    if (!additionalInfo.emergencyContact?.name) {
      newErrors['emergencyContact.name'] = 'Emergency contact name is required';
    }

    if (!additionalInfo.emergencyContact?.phone) {
      newErrors['emergencyContact.phone'] = 'Emergency contact phone is required';
    } else if (!/^[6-9]\d{9}$/.test(additionalInfo.emergencyContact.phone)) {
      newErrors['emergencyContact.phone'] = 'Please enter a valid 10-digit phone number';
    }

    if (!additionalInfo.emergencyContact?.relation) {
      newErrors['emergencyContact.relation'] = 'Emergency contact relation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Family Information
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Please provide details about your family members and emergency contact.
        </p>
      </div>

      {/* Father's Information */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Father's Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Father's Name *
            </label>
            <input
              type="text"
              value={data.father?.name || ''}
              onChange={(e) => handleFamilyChange('father', 'name', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                errors['father.name'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            />
            {errors['father.name'] && (
              <p className="text-red-500 text-xs mt-1">{errors['father.name']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Father's Phone *
            </label>
            <input
              type="tel"
              value={data.father?.phone || ''}
              onChange={(e) => handleFamilyChange('father', 'phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit phone number"
              className={`w-full p-3 rounded-lg border ${
                errors['father.phone'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            />
            {errors['father.phone'] && (
              <p className="text-red-500 text-xs mt-1">{errors['father.phone']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Father's Occupation *
            </label>
            <input
              type="text"
              value={data.father?.occupation || ''}
              onChange={(e) => handleFamilyChange('father', 'occupation', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                errors['father.occupation'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            />
            {errors['father.occupation'] && (
              <p className="text-red-500 text-xs mt-1">{errors['father.occupation']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Father's Email
            </label>
            <input
              type="email"
              value={data.father?.email || ''}
              onChange={(e) => handleFamilyChange('father', 'email', e.target.value)}
              placeholder="Optional"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Annual Family Income
            </label>
            <select
              value={data.father?.income || ''}
              onChange={(e) => handleFamilyChange('father', 'income', e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
            >
              <option value="">Select Income Range</option>
              {INCOME_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mother's Information */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Mother's Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mother's Name
            </label>
            <input
              type="text"
              value={data.mother?.name || ''}
              onChange={(e) => handleFamilyChange('mother', 'name', e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mother's Phone
            </label>
            <input
              type="tel"
              value={data.mother?.phone || ''}
              onChange={(e) => handleFamilyChange('mother', 'phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit phone number"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mother's Occupation
            </label>
            <input
              type="text"
              value={data.mother?.occupation || ''}
              onChange={(e) => handleFamilyChange('mother', 'occupation', e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mother's Email
            </label>
            <input
              type="email"
              value={data.mother?.email || ''}
              onChange={(e) => handleFamilyChange('mother', 'email', e.target.value)}
              placeholder="Optional"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Emergency Contact *
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Name *
            </label>
            <input
              type="text"
              value={additionalInfo.emergencyContact?.name || ''}
              onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                errors['emergencyContact.name'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            />
            {errors['emergencyContact.name'] && (
              <p className="text-red-500 text-xs mt-1">{errors['emergencyContact.name']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Relation *
            </label>
            <select
              value={additionalInfo.emergencyContact?.relation || ''}
              onChange={(e) => handleEmergencyContactChange('relation', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                errors['emergencyContact.relation'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            >
              <option value="">Select Relation</option>
              {RELATIONS.map((relation) => (
                <option key={relation} value={relation}>
                  {relation}
                </option>
              ))}
            </select>
            {errors['emergencyContact.relation'] && (
              <p className="text-red-500 text-xs mt-1">{errors['emergencyContact.relation']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={additionalInfo.emergencyContact?.phone || ''}
              onChange={(e) => handleEmergencyContactChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit phone number"
              className={`w-full p-3 rounded-lg border ${
                errors['emergencyContact.phone'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            />
            {errors['emergencyContact.phone'] && (
              <p className="text-red-500 text-xs mt-1">{errors['emergencyContact.phone']}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Additional Information
        </h4>
        <div className="space-y-4">
          {/* Accommodation & Transport */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hostelRequired"
                checked={additionalInfo.hostelRequired || false}
                onChange={(e) => handleAdditionalChange('hostelRequired', e.target.checked)}
                className="w-4 h-4 text-sitm-maroon bg-gray-100 border-gray-300 rounded focus:ring-sitm-maroon dark:focus:ring-sitm-gold dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="hostelRequired" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hostel accommodation required
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="transportRequired"
                checked={additionalInfo.transportRequired || false}
                onChange={(e) => handleAdditionalChange('transportRequired', e.target.checked)}
                className="w-4 h-4 text-sitm-maroon bg-gray-100 border-gray-300 rounded focus:ring-sitm-maroon dark:focus:ring-sitm-gold dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="transportRequired" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                College transport required
              </label>
            </div>
          </div>

          {/* How did you hear about us */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              How did you hear about SITM?
            </label>
            <select
              value={additionalInfo.howDidYouHear || ''}
              onChange={(e) => handleAdditionalChange('howDidYouHear', e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
            >
              <option value="">Select an option</option>
              {HOW_DID_YOU_HEAR.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Medical Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Medical Conditions (if any)
            </label>
            <textarea
              value={additionalInfo.medicalConditions || ''}
              onChange={(e) => handleAdditionalChange('medicalConditions', e.target.value)}
              placeholder="Please mention any medical conditions, allergies, or special requirements"
              rows={3}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors resize-none"
            />
          </div>

          {/* Expectations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              What are your expectations from SITM?
            </label>
            <textarea
              value={additionalInfo.expectations || ''}
              onChange={(e) => handleAdditionalChange('expectations', e.target.value)}
              placeholder="Share your goals and what you hope to achieve during your time at SITM"
              rows={3}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
        <Button 
          variant="outline" 
          onClick={onPrev} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Previous
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting Application...
            </>
          ) : (
            <>
              Continue to Documents
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}