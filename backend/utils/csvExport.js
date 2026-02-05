const createCsvContent = (data, headers) => {
  if (!data || data.length === 0) {
    return '';
  }

  // Create header row
  const headerRow = headers.join(',');
  
  // Create data rows
  const dataRows = data.map(row => {
    return headers.map(header => {
      let value = row[header] || '';
      
      // Handle nested objects (e.g., address.city)
      if (header.includes('.')) {
        const keys = header.split('.');
        value = keys.reduce((obj, key) => obj?.[key] || '', row);
      }
      
      // Escape commas and quotes in values
      if (typeof value === 'string') {
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
      }
      
      return value;
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
};

const formatApplicationForCsv = (application) => {
  return {
    'Application ID': application.applicationId || application._id,
    'First Name': application.firstName || '',
    'Last Name': application.lastName || '',
    'Email': application.email || '',
    'Phone': application.phone || '',
    'Program': application.program || '',
    'Status': application.status || '',
    'Date of Birth': application.dateOfBirth ? new Date(application.dateOfBirth).toLocaleDateString() : '',
    'Gender': application.gender || '',
    'Nationality': application.nationality || 'Indian',
    'Category': application.category || '',
    'Blood Group': application.bloodGroup || '',
    'Aadhar Number': application.aadharNumber || '',
    'Street Address': application.address?.street || '',
    'City': application.address?.city || '',
    'State': application.address?.state || '',
    'Pincode': application.address?.pincode || '',
    'Previous Qualification': application.previousEducation?.qualification || '',
    'Board/University': application.previousEducation?.board || '',
    'Percentage': application.previousEducation?.percentage || '',
    'Year of Passing': application.previousEducation?.yearOfPassing || '',
    'Entrance Exam': application.entranceExam?.examName || '',
    'Exam Roll Number': application.entranceExam?.rollNumber || '',
    'Exam Score': application.entranceExam?.score || '',
    'Exam Rank': application.entranceExam?.rank || '',
    'Guardian Name': application.guardianName || '',
    'Guardian Phone': application.guardianPhone || '',
    'Guardian Occupation': application.guardianOccupation || '',
    'Father Name': application.familyInfo?.father?.name || '',
    'Father Occupation': application.familyInfo?.father?.occupation || '',
    'Father Phone': application.familyInfo?.father?.phone || '',
    'Father Email': application.familyInfo?.father?.email || '',
    'Father Income': application.familyInfo?.father?.income || '',
    'Mother Name': application.familyInfo?.mother?.name || '',
    'Mother Occupation': application.familyInfo?.mother?.occupation || '',
    'Mother Phone': application.familyInfo?.mother?.phone || '',
    'Mother Email': application.familyInfo?.mother?.email || '',
    'Guardian Contact Name': application.familyInfo?.guardian?.name || '',
    'Guardian Relation': application.familyInfo?.guardian?.relation || '',
    'Guardian Contact Phone': application.familyInfo?.guardian?.phone || '',
    'Guardian Contact Email': application.familyInfo?.guardian?.email || '',
    'Guardian Address': application.familyInfo?.guardian?.address || '',
    'Annual Income': application.familyInfo?.annualIncome || '',
    'Hostel Required': application.additionalInfo?.hostelRequired ? 'Yes' : 'No',
    'Transport Required': application.additionalInfo?.transportRequired ? 'Yes' : 'No',
    'Medical Conditions': application.additionalInfo?.medicalConditions || '',
    'Emergency Contact Name': application.additionalInfo?.emergencyContact?.name || '',
    'Emergency Contact Relation': application.additionalInfo?.emergencyContact?.relation || '',
    'Emergency Contact Phone': application.additionalInfo?.emergencyContact?.phone || '',
    'How Did You Hear': application.additionalInfo?.howDidYouHear || '',
    'Expectations': application.additionalInfo?.expectations || '',
    'Achievements': Array.isArray(application.achievements) ? application.achievements.join('; ') : '',
    'Source': application.source || '',
    'Remarks': application.remarks || '',
    'Reviewed By': application.reviewedBy ? `${application.reviewedBy.firstName} ${application.reviewedBy.lastName}` : '',
    'Reviewed At': application.reviewedAt ? new Date(application.reviewedAt).toLocaleDateString() : '',
    'Submitted At': application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : '',
    'Applied Date': application.createdAt ? new Date(application.createdAt).toLocaleDateString() : '',
    'Last Updated': application.updatedAt ? new Date(application.updatedAt).toLocaleDateString() : ''
  };
};

const exportApplicationsToCsv = (applications) => {
  const formattedData = applications.map(formatApplicationForCsv);
  
  const headers = [
    'Application ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Program', 'Status',
    'Date of Birth', 'Gender', 'Nationality', 'Category', 'Blood Group', 'Aadhar Number',
    'Street Address', 'City', 'State', 'Pincode',
    'Previous Qualification', 'Board/University', 'Percentage', 'Year of Passing',
    'Entrance Exam', 'Exam Roll Number', 'Exam Score', 'Exam Rank',
    'Guardian Name', 'Guardian Phone', 'Guardian Occupation',
    'Father Name', 'Father Occupation', 'Father Phone', 'Father Email', 'Father Income',
    'Mother Name', 'Mother Occupation', 'Mother Phone', 'Mother Email',
    'Guardian Contact Name', 'Guardian Relation', 'Guardian Contact Phone', 'Guardian Contact Email', 'Guardian Address',
    'Annual Income', 'Hostel Required', 'Transport Required', 'Medical Conditions',
    'Emergency Contact Name', 'Emergency Contact Relation', 'Emergency Contact Phone',
    'How Did You Hear', 'Expectations', 'Achievements', 'Source', 'Remarks',
    'Reviewed By', 'Reviewed At', 'Submitted At', 'Applied Date', 'Last Updated'
  ];

  return createCsvContent(formattedData, headers);
};

const exportStudentsToCsv = (students) => {
  const formattedData = students.map(student => ({
    'Student ID': student.studentId || student._id,
    'Name': `${student.firstName || ''} ${student.lastName || ''}`.trim(),
    'Email': student.email || '',
    'Phone': student.phone || '',
    'Program': student.program || '',
    'Admission Year': student.admissionYear || new Date().getFullYear(),
    'Current Status': student.status || 'enrolled',
    'Roll Number': student.rollNumber || '',
    'Section': student.section || '',
    'Batch': student.batch || '',
    'CGPA': student.cgpa || '',
    'Credits Completed': student.creditsCompleted || '0',
    'Date of Birth': student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : '',
    'Gender': student.gender || '',
    'Category': student.category || '',
    'Address': student.address || '',
    'City': student.city || '',
    'State': student.state || '',
    'Pincode': student.pincode || '',
    'Father Name': student.fatherName || '',
    'Mother Name': student.motherName || '',
    'Guardian Phone': student.guardianPhone || '',
    'Admission Date': student.admissionDate ? new Date(student.admissionDate).toLocaleDateString() : '',
    'Last Updated': student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : ''
  }));

  const headers = [
    'Student ID', 'Name', 'Email', 'Phone', 'Program', 'Admission Year', 'Current Status',
    'Roll Number', 'Section', 'Batch', 'CGPA', 'Credits Completed',
    'Date of Birth', 'Gender', 'Category', 'Address', 'City', 'State', 'Pincode',
    'Father Name', 'Mother Name', 'Guardian Phone', 'Admission Date', 'Last Updated'
  ];

  return createCsvContent(formattedData, headers);
};

module.exports = {
  createCsvContent,
  formatApplicationForCsv,
  exportApplicationsToCsv,
  exportStudentsToCsv
};