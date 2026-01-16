// app/admin/content/privacy/page.tsx
"use client";

import { useState } from 'react';
import { Save, Eye, Clock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState(`# Privacy Policy

Last updated: January 15, 2024

## 1. Information We Collect

### 1.1 Personal Information
We collect personal information that you voluntarily provide to us when you register for the exhibition, express interest in obtaining information about our services, or otherwise contact us.

Personal Information we collect may include:
- Name and contact details
- Company information
- Payment information
- Professional credentials

### 1.2 Automatically Collected Information
When you visit our website, we automatically collect certain information about your device and usage patterns using cookies and similar technologies.

### 1.3 Information from Third Parties
We may receive information about you from third-party sources, such as business partners and marketing agencies.

## 2. How We Use Your Information

We use the information we collect for various purposes, including to:
- Provide, operate, and maintain our exhibition services
- Process your registrations and payments
- Send you updates and promotional communications
- Improve our website and exhibition services
- Comply with legal obligations

## 3. Data Sharing and Disclosure

### 3.1 Service Providers
We may share your information with third-party vendors and service providers who perform services on our behalf.

### 3.2 Business Transfers
In connection with any merger, sale of company assets, or acquisition, your information may be transferred.

### 3.3 Legal Requirements
We may disclose your information where required to do so by law or subpoena.

## 4. Your Rights

Depending on your location, you may have certain rights regarding your personal information, including:
- Right to access your personal information
- Right to correct inaccurate information
- Right to delete your personal information
- Right to restrict processing of your information
- Right to data portability
- Right to object to processing

## 5. Data Security

We implement appropriate technical and organizational security measures to protect your personal information. However, no security system is impenetrable.

## 6. International Data Transfers

Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.

## 7. Children's Privacy

Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.

## 8. Changes to This Policy

We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.

## 9. Contact Us

If you have any questions about this Privacy Policy, please contact us at:

Email: privacy@logistics-expo.com
Address: 123 Exhibition Center, Downtown, City, Country 12345`);

  const [lastSaved, setLastSaved] = useState('2024-01-15 10:30 AM');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSaved(new Date().toLocaleString());
    setIsSaving(false);
    alert('Privacy Policy saved successfully!');
  };

  const handlePreview = () => {
    alert('Preview would open in a new tab');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600">Edit and manage your website's privacy policy</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePreview}
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
              Privacy Policy Content (Markdown Supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={30}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
            />
          </div>
          
          {/* Preview Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto">
              <div className="prose prose-blue max-w-none">
                {content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-semibold mt-3 mb-2">{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-medium mt-2 mb-1">{line.substring(4)}</h3>;
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-2">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Tips:</h4>
            <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
              <li>Use # for main headings, ## for subheadings</li>
              <li>Keep the policy clear and easy to understand</li>
              <li>Include contact information for privacy inquiries</li>
              <li>Review legal requirements for your region</li>
              <li>Update the "last updated" date when making changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}