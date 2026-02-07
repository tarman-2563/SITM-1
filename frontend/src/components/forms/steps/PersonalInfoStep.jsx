import { useState } from 'react';
import { Button } from '../../common/Button';
import { ArrowRight, User, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  { value: 'General', label: 'General' },
  { value: 'OBC', label: 'OBC' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'EWS', label: 'EWS' }
];

const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export function PersonalInfoStep({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      onChange({
        ...data,
        [parent]: {
          ...data[parent],
          [child]: value
        }
      });
    } else {
      onChange({
        ...data,
        [field]: value
      });
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    // Required field validations
    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(data.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16 || age > 35) {
        newErrors.dateOfBirth = 'Age must be between 16 and 35 years';
      }
    }

    if (!data.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!data.category) {
      newErrors.category = 'Category is required';
    }

    // Address validations
    if (!data.address?.street) {
      newErrors['address.street'] = 'Street address is required';
    }

    if (!data.address?.city) {
      newErrors['address.city'] = 'City is required';
    }

    if (!data.address?.state) {
      newErrors['address.state'] = 'State is required';
    }

    if (!data.address?.pincode) {
      newErrors['address.pincode'] = 'Pincode is required';
    } else if (!/^[1-9][0-9]{5}$/.test(data.address.pincode)) {
      newErrors['address.pincode'] = 'Please enter a valid 6-digit pincode';
    }

    // Optional field format validations
    if (data.aadharNumber && !/^[0-9]{12}$/.test(data.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-sitm-maroon via-sitm-navy to-sitm-maroon dark:from-sitm-gold dark:via-sitm-maroon dark:to-sitm-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Personal Information
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Please provide your personal details accurately as they will appear on official documents. 
          All fields marked with * are required.
        </p>
      </div>

      {/* Basic Information Card */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-800/80 dark:via-slate-800 dark:to-slate-900/80 rounded-2xl p-6 border border-gray-200 dark:border-slate-600 shadow-lg dark:shadow-slate-900/50">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-sitm-maroon dark:bg-sitm-gold rounded-full"></div>
          Basic Details
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                errors.dateOfBirth 
                  ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-200 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold'
              } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Gender *
            </label>
            <select
              value={data.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                errors.gender 
                  ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-200 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold'
              } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.gender}
              </p>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Nationality
            </label>
            <input
              type="text"
              value={data.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20 transition-all duration-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Category *
            </label>
            <select
              value={data.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                errors.category 
                  ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-200 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold'
              } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20`}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.category}
              </p>
            )}
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Blood Group
            </label>
            <select
              value={data.bloodGroup}
              onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20 transition-all duration-200"
            >
              <option value="">Select Blood Group</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Aadhar Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Aadhar Number
            </label>
            <input
              type="text"
              value={data.aadharNumber}
              onChange={(e) => handleInputChange('aadharNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
              placeholder="12-digit Aadhar number (optional)"
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                errors.aadharNumber 
                  ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-200 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold'
              } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20`}
            />
            {errors.aadharNumber && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.aadharNumber}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information Card */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-800/80 dark:via-slate-800 dark:to-slate-900/80 rounded-2xl p-6 border border-gray-200 dark:border-slate-600 shadow-lg dark:shadow-slate-900/50">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-sitm-maroon dark:bg-sitm-gold rounded-full"></div>
          Address Information
        </h4>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={data.address?.street || ''}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              placeholder="House/Flat No., Street Name, Area"
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                errors['address.street'] 
                  ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-200 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold'
              } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20`}
            />
            {errors['address.street'] && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors['address.street']}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                City *
              </label>
              <input
                type="text"
                value={data.address?.city || ''}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                placeholder="Enter city"
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                  errors['address.city'] 
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-200 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold'
                } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20`}
              />
              {errors['address.city'] && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors['address.city']}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                State *
              </label>
              <select
                value={data.address?.state || ''}
                onChange={(e) => handleInputChange('address.state', e.target.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                  errors['address.state'] 
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-200 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold'
                } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20`}
              >
                <option value="">Select State</option>
                {STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors['address.state'] && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors['address.state']}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                value={data.address?.pincode || ''}
                onChange={(e) => handleInputChange('address.pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit pincode"
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                  errors['address.pincode'] 
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-200 dark:border-slate-600 hover:border-sitm-maroon dark:hover:border-sitm-gold focus:border-sitm-maroon dark:focus:border-sitm-gold'
                } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-sitm-maroon/20 dark:focus:ring-sitm-gold/20`}
              />
              {errors['address.pincode'] && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors['address.pincode']}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleNext} 
          size="lg"
          className="flex items-center gap-3 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Continue to Academic Details
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
}