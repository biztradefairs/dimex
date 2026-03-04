// app/admin/security-guard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ScaleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface SecurityGuardConfig {
  id: string;
  ratePerGuardPerDay: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: SecurityGuardConfig;
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

export default function AdminSecurityGuardPage() {
  const [config, setConfig] = useState<SecurityGuardConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formValue, setFormValue] = useState(2500);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadConfig = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/security-guard/config`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      setConfig(data.data);
      setFormValue(data.data.ratePerGuardPerDay);
      
    } catch (error) {
      console.error('Failed to load config:', error);
      setError('Failed to load configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleSave = async () => {
    if (formValue < 0) {
      setError('Rate cannot be negative');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/security-guard/config`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ratePerGuardPerDay: formValue })
      });

      const responseData = await response.json().catch(() => null);
      
      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) {
        throw new Error(responseData?.message || 'Failed to update');
      }

      setConfig(responseData.data);
      setEditing(false);
      setSuccessMessage('Rate updated successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to update rate:', error);
      setError(error.message || 'Failed to update rate. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!confirm('Are you sure you want to reset to default rate of ₹2500?')) return;

    try {
      setSubmitting(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/security-guard/reset`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json().catch(() => null);
      
      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) {
        throw new Error(responseData?.message || 'Failed to reset');
      }

      setConfig(responseData.data);
      setFormValue(responseData.data.ratePerGuardPerDay);
      setSuccessMessage('Rate reset to default successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to reset rate:', error);
      setError(error.message || 'Failed to reset rate. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading security guard configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Security Guard</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Manage security guard rates and configuration</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 sm:mb-4 bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-center text-red-800">
            <ExclamationCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600 flex-shrink-0" />
            <span className="flex-1 text-xs sm:text-sm">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-2 sm:ml-4 text-red-600 hover:text-red-800"
            >
              <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-3 sm:mb-4 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-center text-green-800">
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
            <span className="text-xs sm:text-sm">{successMessage}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Current Rate</p>
            <p className="text-lg sm:text-xl font-bold text-blue-600">{formatCurrency(config?.ratePerGuardPerDay || 0)}</p>
            <p className="text-xs text-gray-500">per guard / day</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Daily Cost (2 Guards)</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency((config?.ratePerGuardPerDay || 0) * 2)}</p>
            <p className="text-xs text-gray-500">for 2 guards</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">3 Days Cost (2 Guards)</p>
            <p className="text-lg sm:text-xl font-bold text-purple-600">{formatCurrency((config?.ratePerGuardPerDay || 0) * 2 * 3)}</p>
            <p className="text-xs text-gray-500">typical duration</p>
          </div>
        </div>

        {/* Main Configuration Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Security Guard Rate Configuration</h2>
              <p className="text-xs sm:text-sm text-gray-500">Set the rate per guard per day</p>
            </div>
          </div>

          {!editing ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3">
                <div>
                  <span className="text-xs text-gray-600 block mb-1">Current Rate</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">{formatCurrency(config?.ratePerGuardPerDay || 0)}</span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">per guard / day</span>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  Edit Rate
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t">
                <button
                  onClick={handleResetToDefault}
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                >
                  <ArrowPathIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  Reset to Default
                </button>
              </div>

              {config?.updatedAt && (
                <div className="flex items-center text-xs text-gray-400 gap-1">
                  <ClockIcon className="h-3 w-3" />
                  <span>Last updated: {new Date(config.updatedAt).toLocaleString()}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Rate per Guard per Day (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    value={formValue}
                    onChange={(e) => setFormValue(parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">Minimum rate: ₹0 (free)</p>
              </div>

              {/* Preview Calculations */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-xs text-blue-600 mb-1">1 guard/day</p>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">{formatCurrency(formValue)}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 mb-1">2 guards/day</p>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">{formatCurrency(formValue * 2)}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 mb-1">3 days (2 guards)</p>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">{formatCurrency(formValue * 2 * 3)}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 mb-1">5 days (2 guards)</p>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">{formatCurrency(formValue * 2 * 5)}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleSave}
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                >
                  <ScaleIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormValue(config?.ratePerGuardPerDay || 2500);
                  }}
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetToDefault}
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                >
                  <ArrowPathIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Information Card */}
        <div className="mt-4 sm:mt-6 bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
          <h3 className="text-xs sm:text-sm font-semibold text-blue-800 mb-2">About Security Guard Rates</h3>
          <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
            <li>The rate is applied per guard per day</li>
            <li>Minimum booking is typically 1 guard for the exhibition duration</li>
            <li>Rates can be updated at any time, but changes will only apply to new bookings</li>
            <li>Default rate is ₹2500 per guard per day</li>
          </ul>
        </div>

        {/* Recent Activity */}
        {config?.createdAt && (
          <div className="mt-3 sm:mt-4 text-xs text-gray-400 text-right">
            Configuration created: {new Date(config.createdAt).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}