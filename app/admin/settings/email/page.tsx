// app/admin/settings/email/page.tsx
"use client";

import { useState } from 'react';
import { Save, Eye, Send, Copy, Plus, Trash2, Mail } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  category: string;
  lastUpdated: string;
  uses: number;
}

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to Logistics Exhibition 2024!',
      description: 'Sent to new exhibitors after registration',
      category: 'Registration',
      lastUpdated: '2024-01-15',
      uses: 156
    },
    {
      id: '2',
      name: 'Payment Confirmation',
      subject: 'Payment Received - Logistics Exhibition 2024',
      description: 'Sent after successful payment',
      category: 'Payment',
      lastUpdated: '2024-01-14',
      uses: 89
    },
    {
      id: '3',
      name: 'Event Reminder',
      subject: 'Reminder: Logistics Exhibition Starts Soon!',
      description: 'Sent one week before the event',
      category: 'Reminder',
      lastUpdated: '2024-01-13',
      uses: 234
    },
    {
      id: '4',
      name: 'Exhibitor Setup Guide',
      subject: 'Your Exhibitor Setup Information',
      description: 'Contains booth setup instructions',
      category: 'Setup',
      lastUpdated: '2024-01-12',
      uses: 67
    },
    {
      id: '5',
      name: 'Thank You Email',
      subject: 'Thank You for Participating!',
      description: 'Sent after the exhibition ends',
      category: 'Follow-up',
      lastUpdated: '2024-01-11',
      uses: 45
    },
    {
      id: '6',
      name: 'Invoice Sent',
      subject: 'Invoice #{invoice_number} - Logistics Exhibition',
      description: 'Sent when invoice is generated',
      category: 'Invoice',
      lastUpdated: '2024-01-10',
      uses: 123
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string>('1');
  const [templateContent, setTemplateContent] = useState(`Subject: Welcome to Logistics Exhibition 2024!

Dear {exhibitor_name},

Welcome to the Logistics Exhibition 2024! We're excited to have you as an exhibitor.

Your registration has been confirmed with the following details:
- Company: {company_name}
- Booth: {booth_number}
- Sector: {sector_name}
- Event Dates: {event_dates}
- Venue: {venue_address}

Important Next Steps:
1. Complete your exhibitor profile by {profile_deadline}
2. Review the exhibitor manual at {manual_link}
3. Submit your booth design by {design_deadline}

Need Help?
- Exhibitor Support: support@logistics-expo.com
- Technical Questions: tech@logistics-expo.com
- General Inquiries: info@logistics-expo.com

We look forward to seeing you at the exhibition!

Best regards,
The Logistics Exhibition Team`);

  const [variables] = useState([
    '{exhibitor_name}',
    '{company_name}',
    '{booth_number}',
    '{sector_name}',
    '{event_dates}',
    '{venue_address}',
    '{profile_deadline}',
    '{manual_link}',
    '{design_deadline}',
    '{invoice_number}',
    '{amount_due}',
    '{due_date}'
  ]);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const handleSave = () => {
    alert('Template saved successfully!');
  };

  const handlePreview = () => {
    alert('Email preview would open in a new tab');
  };

  const handleSendTest = () => {
    const email = prompt('Enter email address for test send:');
    if (email) {
      alert(`Test email sent to ${email}`);
    }
  };

  const handleDuplicate = () => {
    const newTemplate: EmailTemplate = {
      ...selectedTemplateData!,
      id: (templates.length + 1).toString(),
      name: `${selectedTemplateData!.name} (Copy)`,
      uses: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, newTemplate]);
    alert('Template duplicated successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(template => template.id !== id));
      if (id === selectedTemplate) {
        setSelectedTemplate(templates[0]?.id || '');
      }
    }
  };

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById('template-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = templateContent.substring(0, start) + variable + templateContent.substring(end);
      setTemplateContent(newText);
      
      // Focus back on textarea
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-gray-600">Manage email templates for communication</p>
        </div>
        <button
          onClick={() => alert('Create new template')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Templates</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left p-4 rounded-lg border ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{template.name}</p>
                          <p className="text-sm text-gray-500">{template.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-900">{template.uses} uses</p>
                        <p className="text-xs text-gray-500">
                          {new Date(template.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Template Stats */}
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Template Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Templates</span>
                <span className="text-sm font-medium text-gray-900">{templates.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Emails Sent</span>
                <span className="text-sm font-medium text-gray-900">
                  {templates.reduce((sum, t) => sum + t.uses, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Most Used Template</span>
                <span className="text-sm font-medium text-gray-900">
                  {templates.reduce((max, t) => t.uses > max.uses ? t : max).name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Template Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedTemplateData?.name}
                  </h2>
                  <p className="text-gray-600">{selectedTemplateData?.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePreview}
                    className="text-blue-600 hover:text-blue-900"
                    title="Preview"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendTest}
                    className="text-green-600 hover:text-green-900"
                    title="Send Test"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDuplicate}
                    className="text-purple-600 hover:text-purple-900"
                    title="Duplicate"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedTemplateData!.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Subject Line */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={selectedTemplateData?.subject || ''}
                  onChange={(e) => {
                    if (selectedTemplateData) {
                      setTemplates(templates.map(t => 
                        t.id === selectedTemplate ? { ...t, subject: e.target.value } : t
                      ));
                    }
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Variables */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Variables
                </label>
                <div className="flex flex-wrap gap-2">
                  {variables.map((variable) => (
                    <button
                      key={variable}
                      onClick={() => insertVariable(variable)}
                      className="px-3 py-1 text-xs font-mono bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Editor */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Content
                </label>
                <textarea
                  id="template-content"
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  rows={15}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setTemplateContent(selectedTemplateData?.subject + '\n\n' + templateContent.split('\n').slice(1).join('\n'))}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}