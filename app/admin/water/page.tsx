// app/admin/water-connection/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  ScaleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationCircleIcon,
  WrenchIcon,
  BeakerIcon,
  
} from '@heroicons/react/24/outline';

interface WaterConnectionConfig {
  id: string;
  costPerConnection: number;
  createdAt: string;
  updatedAt: string;
}

interface HistoryItem {
  costPerConnection: number;
  updatedAt: string;
}

interface StatsData {
  currentRate: number;
  createdAt: string;
  lastUpdated: string;
  totalUpdates: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminWaterConnectionPage() {
  const [config, setConfig] = useState<WaterConnectionConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formValue, setFormValue] = useState('15000');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/water-connection/config`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch configuration');
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setConfig(data.data);
        setFormValue(data.data.costPerConnection.toString());
        setConnectionStatus('connected');
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error: any) {
      console.error('Failed to load configuration:', error);
      setConnectionStatus('disconnected');
      setError('Failed to load configuration from server. Using offline mode.');
      
      setConfig({
        id: 'local-1',
        costPerConnection: 15000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setFormValue('15000');
      
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const costValue = parseInt(formValue);
    if (isNaN(costValue) || costValue < 0) {
      setError('Please enter a valid positive number');
      return;
    }

    if (connectionStatus === 'disconnected') {
      const updatedConfig = {
        ...config!,
        costPerConnection: costValue,
        updatedAt: new Date().toISOString()
      };
      setConfig(updatedConfig);
      setEditing(false);
      setSuccessMessage('Rate updated locally (offline mode)');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
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

      const response = await fetch(`${API_BASE_URL}/admin/water-connection/config`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ costPerConnection: costValue })
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
        return;
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        setConfig(data.data);
        setFormValue(data.data.costPerConnection.toString());
        setSuccessMessage('Water connection rate updated successfully');
      } else {
        throw new Error(data.message || 'Update failed');
      }
      
      setEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to update configuration:', error);
      setError(error.message || 'Failed to save to server');
      
      const updatedConfig = {
        ...config!,
        costPerConnection: costValue,
        updatedAt: new Date().toISOString()
      };
      setConfig(updatedConfig);
      setEditing(false);
      
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset to default rate (₹15,000)?')) return;

    setFormValue('15000');
    
    if (connectionStatus === 'disconnected') {
      const updatedConfig = {
        ...config!,
        costPerConnection: 15000,
        updatedAt: new Date().toISOString()
      };
      setConfig(updatedConfig);
      setSuccessMessage('Rate reset to default locally');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
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

      const response = await fetch(`${API_BASE_URL}/admin/water-connection/reset`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
        return;
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        setConfig(data.data);
        setFormValue(data.data.costPerConnection.toString());
        setSuccessMessage('Rate reset to default successfully');
      } else {
        throw new Error(data.message || 'Reset failed');
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to reset configuration:', error);
      setError(error.message || 'Failed to reset');
      
      const updatedConfig = {
        ...config!,
        costPerConnection: 15000,
        updatedAt: new Date().toISOString()
      };
      setConfig(updatedConfig);
      
    } finally {
      setSubmitting(false);
    }
  };

  const loadHistory = async () => {
    if (connectionStatus === 'disconnected') {
      setHistory([
        { costPerConnection: 15000, updatedAt: new Date().toISOString() }
      ]);
      return;
    }

    try {
      setLoadingHistory(true);
      
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/admin/water-connection/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setHistory(data.data || []);
      }
      
    } catch (error) {
      console.error('Failed to load history:', error);
      setHistory([
        { costPerConnection: config?.costPerConnection || 15000, updatedAt: new Date().toISOString() }
      ]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadStats = async () => {
    if (connectionStatus === 'disconnected') {
      setStats({
        currentRate: config?.costPerConnection || 15000,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        totalUpdates: 1
      });
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/admin/water-connection/statistics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
      
    } catch (error) {
      console.error('Failed to load stats:', error);
      setStats({
        currentRate: config?.costPerConnection || 15000,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        totalUpdates: 1
      });
    }
  };

  const toggleHistory = () => {
    if (!showHistory) {
      loadHistory();
    }
    setShowHistory(!showHistory);
    setShowStats(false);
  };

  const toggleStats = () => {
    if (!showStats) {
      loadStats();
    }
    setShowStats(!showStats);
    setShowHistory(false);
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
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading water connection configuration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <ExclamationCircleIcon className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto" />
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Failed to load configuration</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Water Connection Management</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Configure and manage water connection pricing for exhibitions</p>
        </div>

        {/* Connection Status */}
        {connectionStatus === 'disconnected' && (
          <div className="mb-3 sm:mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 flex items-center">
            <WrenchIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-yellow-800 font-medium">Offline Mode</p>
              <p className="text-xs text-yellow-600">Working with local data. Changes won't be saved to server.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && connectionStatus !== 'disconnected' && (
          <div className="mb-3 sm:mb-4 bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-center">
            <ExclamationCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-red-600 flex-shrink-0" />
            <span className="flex-1 text-xs sm:text-sm text-red-800">{error}</span>
            <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">
              <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-3 sm:mb-4 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-center">
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-green-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-green-800">{successMessage}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 sm:p-3 md:p-4 border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">Current Rate</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-blue-700">{formatCurrency(config.costPerConnection)}</p>
            <p className="text-xs text-blue-500 mt-1">per connection</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2 sm:p-3 md:p-4 border border-green-200">
            <p className="text-xs text-green-600 mb-1">2 Connections</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-green-700">{formatCurrency(config.costPerConnection * 2)}</p>
            <p className="text-xs text-green-500 mt-1">small booth</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-2 sm:p-3 md:p-4 border border-purple-200">
            <p className="text-xs text-purple-600 mb-1">5 Connections</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-purple-700">{formatCurrency(config.costPerConnection * 5)}</p>
            <p className="text-xs text-purple-500 mt-1">medium booth</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 sm:p-3 md:p-4 border border-orange-200">
            <p className="text-xs text-orange-600 mb-1">10 Connections</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-orange-700">{formatCurrency(config.costPerConnection * 10)}</p>
            <p className="text-xs text-orange-500 mt-1">large booth</p>
          </div>
        </div>

        {/* Main Configuration Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
              <BeakerIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Water Connection Rate</h2>
              <p className="text-xs sm:text-sm text-gray-500">Set the cost per water connection for exhibitors</p>
            </div>
          </div>

          {!editing ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 md:p-5 bg-gray-50 rounded-lg gap-3">
                <div>
                  <span className="text-xs text-gray-600 block mb-1">Current Rate</span>
                  <div className="flex items-baseline">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">{formatCurrency(config.costPerConnection)}</span>
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">per connection</span>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleReset}
                    disabled={submitting}
                    className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Reset to default"
                  >
                    <ArrowPathIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    Edit Rate
                  </button>
                </div>
              </div>

              {config.updatedAt && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 border-t gap-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    Last updated: {new Date(config.updatedAt).toLocaleString()}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={toggleHistory}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      {showHistory ? 'Hide History' : 'View History'}
                    </button>
                    <button
                      onClick={toggleStats}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <ChartBarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      {showStats ? 'Hide Stats' : 'View Stats'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-3 sm:p-4 md:p-5 bg-gray-50 rounded-lg">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Cost per Connection (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-2 sm:left-3 top-2 sm:top-2.5 text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="100"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Default rate: ₹15,000 per connection</p>
              </div>

              {/* Preview Calculations */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <div className="p-2 sm:p-3 md:p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-xs text-blue-600 mb-1">1</p>
                  <p className="text-sm sm:text-base font-bold text-blue-700">
                    {formatCurrency(parseInt(formValue) || 0)}
                  </p>
                </div>
                <div className="p-2 sm:p-3 md:p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-xs text-green-600 mb-1">5</p>
                  <p className="text-sm sm:text-base font-bold text-green-700">
                    {formatCurrency((parseInt(formValue) || 0) * 5)}
                  </p>
                </div>
                <div className="p-2 sm:p-3 md:p-4 bg-purple-50 rounded-lg text-center">
                  <p className="text-xs text-purple-600 mb-1">10</p>
                  <p className="text-sm sm:text-base font-bold text-purple-700">
                    {formatCurrency((parseInt(formValue) || 0) * 10)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
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
                    setFormValue(config.costPerConnection.toString());
                  }}
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        {showHistory && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Rate Change History
            </h3>
            
            {loadingHistory ? (
              <div className="flex justify-center py-6 sm:py-8">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-gray-200 border-t-blue-600"></div>
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg gap-1">
                    <span className="text-sm sm:text-base font-semibold text-blue-600">{formatCurrency(item.costPerConnection)}</span>
                    <span className="text-xs text-gray-600">
                      {new Date(item.updatedAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-3 sm:py-4 text-sm">No history available</p>
            )}
          </div>
        )}

        {/* Statistics Section */}
        {showStats && stats && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Configuration Statistics
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Current Rate</p>
                <p className="text-sm sm:text-base font-bold text-blue-600">{formatCurrency(stats.currentRate)}</p>
              </div>
              <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Total Updates</p>
                <p className="text-sm sm:text-base font-bold text-purple-600">{stats.totalUpdates || 0}</p>
              </div>
              <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Created</p>
                <p className="text-xs font-medium text-gray-900">
                  {stats.createdAt ? new Date(stats.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                <p className="text-xs font-medium text-gray-900">
                  {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Information Card */}
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 md:p-5 border border-blue-200">
          <h3 className="text-xs sm:text-sm font-semibold text-blue-800 mb-2">About Water Connections</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Each water connection includes supply line and basic fitting
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Rate is per connection for the entire exhibition duration
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Multiple connections can be booked for larger booths
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Default rate is ₹15,000 per connection
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}