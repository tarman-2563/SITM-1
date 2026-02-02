import { useState } from 'react';
import { Button } from '../../common/Button';
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';

const QUALIFICATIONS = [
  '10+2 (Science)',
  '10+2 (Commerce)',
  '10+2 (Arts)',
  'Diploma in Engineering',
  'Other'
];

const BOARDS = [
  'CBSE',
  'ICSE',
  'State Board',
  'NIOS',
  'International Board',
  'Other'
];

const ENTRANCE_EXAMS = [
  'JEE Main',
  'JEE Advanced',
  'CEE (Assam)',
  'WBJEE',
  'BITSAT',
  'VITEEE',
  'COMEDK',
  'MHT CET',
  'KCET',
  'TS EAMCET',
  'AP EAMCET',
  'Other',
  'Not Applicable'
];

export function AcademicInfoStep({ data, onChange, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (section, field, value) => {
    onChange({
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

  const addAchievement = () => {
    onChange({
      ...data,
      achievements: [...(data.achievements || []), '']
    });
  };

  const updateAchievement = (index, value) => {
    const newAchievements = [...(data.achievements || [])];
    newAchievements[index] = value;
    onChange({
      ...data,
      achievements: newAchievements
    });
  };

  const removeAchievement = (index) => {
    const newAchievements = [...(data.achievements || [])];
    newAchievements.splice(index, 1);
    onChange({
      ...data,
      achievements: newAchievements
    });
  };

  const validateStep = () => {
    const newErrors = {};

    // Required field validations
    if (!data.previousEducation?.qualification) {
      newErrors['previousEducation.qualification'] = 'Qualification is required';
    }

    if (!data.previousEducation?.board) {
      newErrors['previousEducation.board'] = 'Board/University is required';
    }

    if (!data.previousEducation?.percentage) {
      newErrors['previousEducation.percentage'] = 'Percentage/CGPA is required';
    } else {
      const percentage = parseFloat(data.previousEducation.percentage);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        newErrors['previousEducation.percentage'] = 'Please enter a valid percentage (0-100)';
      }
    }

    if (!data.previousEducation?.yearOfPassing) {
      newErrors['previousEducation.yearOfPassing'] = 'Year of passing is required';
    } else {
      const year = parseInt(data.previousEducation.yearOfPassing);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 2000 || year > currentYear) {
        newErrors['previousEducation.yearOfPassing'] = `Please enter a valid year (2000-${currentYear})`;
      }
    }

    // Entrance exam validation - if exam is selected and not "Not Applicable", roll number is required
    if (data.entranceExam?.examName && data.entranceExam.examName !== 'Not Applicable' && !data.entranceExam?.rollNumber) {
      newErrors['entranceExam.rollNumber'] = 'Roll number is required for selected exam';
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
          Academic Background
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Please provide details about your educational qualifications and achievements.
        </p>
      </div>

      {/* Previous Education */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Previous Education
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Qualification *
            </label>
            <select
              value={data.previousEducation?.qualification || ''}
              onChange={(e) => handleInputChange('previousEducation', 'qualification', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                errors['previousEducation.qualification'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            >
              <option value="">Select Qualification</option>
              {QUALIFICATIONS.map((qual) => (
                <option key={qual} value={qual}>
                  {qual}
                </option>
              ))}
            </select>
            {errors['previousEducation.qualification'] && (
              <p className="text-red-500 text-xs mt-1">{errors['previousEducation.qualification']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Board/University *
            </label>
            <select
              value={data.previousEducation?.board || ''}
              onChange={(e) => handleInputChange('previousEducation', 'board', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                errors['previousEducation.board'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            >
              <option value="">Select Board</option>
              {BOARDS.map((board) => (
                <option key={board} value={board}>
                  {board}
                </option>
              ))}
            </select>
            {errors['previousEducation.board'] && (
              <p className="text-red-500 text-xs mt-1">{errors['previousEducation.board']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Percentage/CGPA *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={data.previousEducation?.percentage || ''}
              onChange={(e) => handleInputChange('previousEducation', 'percentage', e.target.value)}
              placeholder="Enter percentage"
              className={`w-full p-3 rounded-lg border ${
                errors['previousEducation.percentage'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            />
            {errors['previousEducation.percentage'] && (
              <p className="text-red-500 text-xs mt-1">{errors['previousEducation.percentage']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Year of Passing *
            </label>
            <input
              type="number"
              min="2000"
              max={new Date().getFullYear()}
              value={data.previousEducation?.yearOfPassing || ''}
              onChange={(e) => handleInputChange('previousEducation', 'yearOfPassing', e.target.value)}
              placeholder="YYYY"
              className={`w-full p-3 rounded-lg border ${
                errors['previousEducation.yearOfPassing'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors`}
            />
            {errors['previousEducation.yearOfPassing'] && (
              <p className="text-red-500 text-xs mt-1">{errors['previousEducation.yearOfPassing']}</p>
            )}
          </div>
        </div>
      </div>

      {/* Entrance Exam */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Entrance Exam Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Exam Name
            </label>
            <select
              value={data.entranceExam?.examName || ''}
              onChange={(e) => handleInputChange('entranceExam', 'examName', e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
            >
              <option value="">Select Exam</option>
              {ENTRANCE_EXAMS.map((exam) => (
                <option key={exam} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              value={data.entranceExam?.rollNumber || ''}
              onChange={(e) => handleInputChange('entranceExam', 'rollNumber', e.target.value)}
              placeholder="Enter roll number"
              disabled={!data.entranceExam?.examName || data.entranceExam?.examName === 'Not Applicable'}
              className={`w-full p-3 rounded-lg border ${
                errors['entranceExam.rollNumber'] 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-slate-600'
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors['entranceExam.rollNumber'] && (
              <p className="text-red-500 text-xs mt-1">{errors['entranceExam.rollNumber']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Score
            </label>
            <input
              type="text"
              value={data.entranceExam?.score || ''}
              onChange={(e) => handleInputChange('entranceExam', 'score', e.target.value)}
              placeholder="Enter score"
              disabled={!data.entranceExam?.examName || data.entranceExam?.examName === 'Not Applicable'}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rank
            </label>
            <input
              type="text"
              value={data.entranceExam?.rank || ''}
              onChange={(e) => handleInputChange('entranceExam', 'rank', e.target.value)}
              placeholder="Enter rank"
              disabled={!data.entranceExam?.examName || data.entranceExam?.examName === 'Not Applicable'}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Achievements & Awards
          </h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAchievement}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Achievement
          </Button>
        </div>
        
        {data.achievements && data.achievements.length > 0 ? (
          <div className="space-y-3">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => updateAchievement(index, e.target.value)}
                  placeholder="Describe your achievement"
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            No achievements added yet. Click "Add Achievement" to include any awards, competitions, or recognitions.
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
        <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Previous
        </Button>
        <Button onClick={handleNext} className="flex items-center gap-2">
          Next Step
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}