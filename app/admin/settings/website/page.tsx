// app/admin/settings/website/page.tsx
"use client";

import { useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Clock, Upload } from 'lucide-react';

export default function WebsiteSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Logistics Exhibition 2024',
    siteTitle: 'International Logistics & Supply Chain Exhibition',
    siteDescription: 'The premier exhibition for logistics and supply chain professionals',
    contactEmail: 'info@logistics-expo.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Exhibition Center, Downtown, City, Country 12345',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    timezone: 'UTC-5',
    currency: 'USD',
    language: 'English',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    maintenanceMode: false,
    allowRegistrations: true,
    enableAnalytics: true
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Settings saved successfully!');
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
          <p className="text-gray-600">Configure your website preferences and details</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-8">
            {/* General Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    name="siteTitle"
                    value={settings.siteTitle}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      Contact Email
                    </div>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      Contact Phone
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      Address
                    </div>
                  </label>
                  <textarea
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows={2}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      Working Hours
                    </div>
                  </label>
                  <input
                    type="text"
                    name="workingHours"
                    value={settings.workingHours}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Regional Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="UTC-5">UTC-5 (EST)</option>
                    <option value="UTC-8">UTC-8 (PST)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC+1">UTC+1 (CET)</option>
                    <option value="UTC+8">UTC+8 (CST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Logo & Favicon */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Assets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                      <Globe className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <label className="cursor-pointer">
                        <div className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <Upload className="mr-2 h-4 w-4" />
                          Change Logo
                        </div>
                        <input type="file" className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                      <Globe className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <label className="cursor-pointer">
                        <div className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <Upload className="mr-2 h-4 w-4" />
                          Change Favicon
                        </div>
                        <input type="file" className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="maintenanceMode"
                    name="maintenanceMode"
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-900">
                    Enable Maintenance Mode
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="allowRegistrations"
                    name="allowRegistrations"
                    type="checkbox"
                    checked={settings.allowRegistrations}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allowRegistrations" className="ml-2 block text-sm text-gray-900">
                    Allow New User Registrations
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="enableAnalytics"
                    name="enableAnalytics"
                    type="checkbox"
                    checked={settings.enableAnalytics}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enableAnalytics" className="ml-2 block text-sm text-gray-900">
                    Enable Analytics Tracking
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}