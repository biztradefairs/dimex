// app/admin/content/terms/page.tsx
"use client";

import { useState } from 'react';
import { Save, Eye, Clock } from 'lucide-react';

export default function TermsPage() {
  const [content, setContent] = useState(`# Terms & Conditions

Last updated: January 15, 2024

## 1. Acceptance of Terms

By accessing and using the Logistics Exhibition 2024 website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

## 2. Exhibition Registration

### 2.1 Eligibility
Registration is open to professionals in the logistics and supply chain industry. You must be at least 18 years old to register.

### 2.2 Registration Process
- Complete the online registration form with accurate information
- Pay the applicable registration fees
- Receive confirmation via email

### 2.3 Registration Fees
- All fees are in US Dollars (USD)
- Fees are non-refundable except as specified in our Cancellation Policy
- Early bird discounts are available until specified dates

## 3. Payment Terms

### 3.1 Payment Methods
We accept the following payment methods:
- Credit cards (Visa, MasterCard, American Express)
- Bank transfers
- Company checks

### 3.2 Payment Deadlines
Full payment must be received by the dates specified during registration. Late payments may incur additional fees.

## 4. Cancellation Policy

### 4.1 Cancellation by Attendee
- Cancellations made 30+ days before the event: 80% refund
- Cancellations made 15-29 days before the event: 50% refund
- Cancellations made less than 15 days before the event: No refund

### 4.2 Cancellation by Organizer
We reserve the right to cancel or reschedule the exhibition. In such cases, registrants will receive a full refund or credit for a future event.

## 5. Code of Conduct

All attendees, exhibitors, and speakers must adhere to our Code of Conduct, which includes:
- Professional behavior at all times
- Respect for other participants
- Compliance with venue rules and regulations
- No harassment or discrimination of any kind

## 6. Intellectual Property

### 6.1 Our Content
All content on our website and exhibition materials is protected by copyright and other intellectual property laws.

### 6.2 Your Content
By submitting materials to us, you grant us a license to use, display, and distribute such materials in connection with the exhibition.

## 7. Limitation of Liability

To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.

## 8. Indemnification

You agree to indemnify and hold harmless the exhibition organizers from any claims, damages, or expenses arising from your violation of these terms.

## 9. Modifications to Terms

We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.

## 10. Governing Law

These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.

## 11. Contact Information

For questions about these Terms & Conditions, please contact us at:

Email: legal@logistics-expo.com
Phone: +1 (555) 123-4567
Address: 123 Exhibition Center, Downtown, City, Country 12345`);

  const [lastSaved, setLastSaved] = useState('2024-01-15 11:15 AM');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSaved(new Date().toLocaleString());
    setIsSaving(false);
    alert('Terms & Conditions saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Terms & Conditions</h1>
          <p className="text-gray-600">Edit and manage your website's terms and conditions</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => alert('Preview would open in new tab')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Last Saved Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-400 mr-2" />
          <span className="text-sm text-blue-800">
            Last saved: {lastSaved}
          </span>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Terms & Conditions Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={30}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
            />
          </div>

          {/* Template Sections */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setContent(prev => prev + '\n\n## New Section\nAdd your content here...')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <h4 className="font-medium text-gray-900">Add Section</h4>
                <p className="text-sm text-gray-600 mt-1">Add a new section to your terms</p>
              </button>
              <button
                onClick={() => setContent(prev => prev + '\n\n### Payment Terms\n• All payments are due upon registration\n• We accept major credit cards and bank transfers\n• Late payments may incur additional fees')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <h4 className="font-medium text-gray-900">Payment Terms</h4>
                <p className="text-sm text-gray-600 mt-1">Add standard payment terms</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}