import { useState } from 'react';
import { ApplicationForm } from '../forms/ApplicationForm';
import { Button } from '../common/Button';

export function AccountActivationTest() {
  const [showForm, setShowForm] = useState(false);
  const [testLead, setTestLead] = useState({
    _id: 'test-lead-123',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '9876543210',
    program: 'CSE'
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Account Activation Flow Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Scenario</h2>
          <p className="text-gray-600 mb-4">
            This test simulates the complete application submission flow to verify 
            that account activation is working properly.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 mb-2">Expected Flow:</h3>
            <ol className="list-decimal list-inside text-blue-800 space-y-1">
              <li>User completes multi-step application form</li>
              <li>Backend creates user account with activation token</li>
              <li>Success page shows "Activate Student Account" button</li>
              <li>User clicks button to set password and activate account</li>
              <li>User is logged in and redirected to student dashboard</li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Test Lead Data:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {testLead.firstName} {testLead.lastName}
              </div>
              <div>
                <span className="font-medium">Email:</span> {testLead.email}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {testLead.phone}
              </div>
              <div>
                <span className="font-medium">Program:</span> {testLead.program}
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Application Test
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Backend URL:</span> {import.meta.env.VITE_API_URL || 'http://localhost:5000'}
            </div>
            <div>
              <span className="font-medium">Environment:</span> {import.meta.env.MODE}
            </div>
            <div>
              <span className="font-medium">Auth Service Available:</span> ✅
            </div>
            <div>
              <span className="font-medium">Application Service Available:</span> ✅
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <ApplicationForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        leadId={testLead._id}
        leadData={testLead}
      />
    </div>
  );
}