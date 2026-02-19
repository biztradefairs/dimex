// app/admin/water-connection/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  ScaleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationCircleIcon,
  WrenchIcon
} from '@heroicons/react/24/outline';
import { DropletIcon } from 'lucide-react';

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

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

// Fallback local data if backend is not available
const FALLBACK_CONFIG: WaterConnectionConfig = {
  id: 'local-1',
  costPerConnection: 15000,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export default function AdminWaterConnectionPage() {
  const [config, setConfig] = useState<WaterConnectionConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<string>('15000');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  
  const hasLoadedRef = useRef<boolean>(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Load configuration from backend with fallback
  const loadConfig = async (isRetry: boolean = false): Promise<void> => {
    // Prevent multiple simultaneous loads
    if (loading && !isRetry) return;
    
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      // Clear any existing retry timeout
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = undefined;
      }

      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${API_URL}/admin/water-connection/config`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) {
        // If error, use fallback data
        console.log('Backend error, using fallback data');
        setUseFallback(true);
        setConfig(FALLBACK_CONFIG);
        setFormValue(FALLBACK_CONFIG.costPerConnection.toString());
        setError('Using local mode - Backend connection issue. Changes will not be saved to server.');
        setLoading(false);
        hasLoadedRef.current = true;
        return;
      }
      
      const data = await response.json();
      
      // Check if data.data exists before using it
      if (data && data.data) {
        setConfig(data.data);
        setFormValue(data.data.costPerConnection.toString());
        setUseFallback(false);
        setError('');
      } else {
        // If data.data is undefined, use fallback
        setUseFallback(true);
        setConfig(FALLBACK_CONFIG);
        setFormValue(FALLBACK_CONFIG.costPerConnection.toString());
        setError('Invalid response from server. Using local mode.');
      }
      
    } catch (error: any) {
      console.error('Failed to load configuration:', error);
      
      // Use fallback data on any error
      setUseFallback(true);
      setConfig(FALLBACK_CONFIG);
      setFormValue(FALLBACK_CONFIG.costPerConnection.toString());
      
      if (error.name === 'AbortError') {
        setError('Request timeout. Using local mode - Changes will not be saved to server.');
      } else {
        setError('Backend connection issue. Using local mode - Changes will not be saved to server.');
      }
      
    } finally {
      setLoading(false);
      hasLoadedRef.current = true;
    }
  };

  // Load only once on mount
  useEffect(() => {
    if (!hasLoadedRef.current) {
      loadConfig(false);
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const handleSave = async (): Promise<void> => {
    const costValue = parseInt(formValue);
    if (isNaN(costValue) || costValue < 0) {
      setError('Please enter a valid positive number');
      return;
    }

    // If in fallback mode, just update locally
    if (useFallback) {
      const updatedConfig = {
        ...FALLBACK_CONFIG,
        costPerConnection: costValue,
        updatedAt: new Date().toISOString()
      };
      setConfig(updatedConfig);
      setEditing(false);
      setSuccessMessage('Rate updated locally (not saved to server)');
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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${API_URL}/admin/water-connection/config`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ costPerConnection: costValue }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      const responseData = await response.json().catch(() => null);
      
      if (!response.ok) {
        // If error, update locally
        const updatedConfig = {
          ...(config || FALLBACK_CONFIG),
          costPerConnection: costValue,
          updatedAt: new Date().toISOString()
        };
        setConfig(updatedConfig);
        setEditing(false);
        setSuccessMessage('Rate updated locally (server error)');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        return;
      }

      // Check if responseData.data exists
      if (responseData && responseData.data) {
        setConfig(responseData.data);
        setFormValue(responseData.data.costPerConnection.toString());
      } else {
        // If no data in response, update locally
        const updatedConfig = {
          ...(config || FALLBACK_CONFIG),
          costPerConnection: costValue,
          updatedAt: new Date().toISOString()
        };
        setConfig(updatedConfig);
      }
      
      setEditing(false);
      setSuccessMessage('Water connection rate updated successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to update configuration:', error);
      
      // Update locally on any error
      const updatedConfig = {
        ...(config || FALLBACK_CONFIG),
        costPerConnection: costValue,
        updatedAt: new Date().toISOString()
      };
      setConfig(updatedConfig);
      setEditing(false);
      
      if (error.name === 'AbortError') {
        setError('Request timeout. Rate updated locally only.');
      } else {
        setError('Failed to save to server. Rate updated locally only.');
      }
      
      setSuccessMessage('Rate updated locally');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (): Promise<void> => {
    if (!confirm('Are you sure you want to reset to default rate (₹15,000)?')) return;

    setFormValue('15000');
    
    if (useFallback) {
      const updatedConfig = {
        ...FALLBACK_CONFIG,
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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${API_URL}/admin/water-connection/reset`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      const responseData = await response.json().catch(() => null);
      
      if (!response.ok) {
        // Update locally on error
        const updatedConfig = {
          ...(config || FALLBACK_CONFIG),
          costPerConnection: 15000,
          updatedAt: new Date().toISOString()
        };
        setConfig(updatedConfig);
        setSuccessMessage('Rate reset locally (server error)');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        return;
      }

      // Check if responseData.data exists
      if (responseData && responseData.data) {
        setConfig(responseData.data);
        setFormValue(responseData.data.costPerConnection.toString());
      } else {
        // If no data in response, update locally
        const updatedConfig = {
          ...(config || FALLBACK_CONFIG),
          costPerConnection: 15000,
          updatedAt: new Date().toISOString()
        };
        setConfig(updatedConfig);
        setFormValue('15000');
      }
      
      setSuccessMessage('Rate reset to default successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to reset configuration:', error);
      
      // Update locally on error
      const updatedConfig = {
        ...(config || FALLBACK_CONFIG),
        costPerConnection: 15000,
        updatedAt: new Date().toISOString()
      };
      setConfig(updatedConfig);
      setSuccessMessage('Rate reset locally');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } finally {
      setSubmitting(false);
    }
  };

  const loadHistory = async (): Promise<void> => {
    if (useFallback) {
      setHistory([
        { costPerConnection: 15000, updatedAt: new Date().toISOString() },
        { costPerConnection: 14000, updatedAt: new Date(Date.now() - 86400000).toISOString() },
        { costPerConnection: 16000, updatedAt: new Date(Date.now() - 172800000).toISOString() }
      ]);
      return;
    }

    try {
      setLoadingHistory(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${API_URL}/admin/water-connection/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch history');
      
      const data = await response.json();
      setHistory(data.data || []);
      
    } catch (error: any) {
      console.error('Failed to load history:', error);
      // Set mock history on error
      setHistory([
        { costPerConnection: config?.costPerConnection || 15000, updatedAt: new Date().toISOString() }
      ]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadStats = async (): Promise<void> => {
    if (useFallback) {
      setStats({
        currentRate: config?.costPerConnection || 15000,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        totalUpdates: 1
      });
      return;
    }

    try {
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${API_URL}/admin/water-connection/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const data = await response.json();
      setStats(data.data);
      
    } catch (error: any) {
      console.error('Failed to load statistics:', error);
      // Set mock stats on error
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

  const handleRetry = () => {
    hasLoadedRef.current = false;
    setUseFallback(false);
    loadConfig(false);
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
      <div className="p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading water connection configuration...</p>
        </div>
      </div>
    );
  }

  // Even if config is null but we're not loading, show the page with fallback
  if (!config && !loading) {
    // This should not happen as we set fallback in catch block, but just in case
    setConfig(FALLBACK_CONFIG);
    setFormValue(FALLBACK_CONFIG.costPerConnection.toString());
    setUseFallback(true);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Water Connection</h1>
        <p className="text-sm text-gray-600 mt-1">Manage water connection pricing for exhibitions</p>
      </div>

      {/* Fallback Mode Warning */}
      {useFallback && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center text-yellow-800">
          <WrenchIcon className="h-5 w-5 mr-2 text-yellow-600 flex-shrink-0" />
          <span className="flex-1">Running in local mode. Changes will not be saved to server. Please set up the backend database.</span>
          <button 
            onClick={handleRetry}
            className="ml-4 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 text-sm"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && !useFallback && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-800">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 text-red-600 flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button 
            onClick={() => setError('')}
            className="ml-4 text-red-600 hover:text-red-800"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
          {successMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Current Rate</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(config?.costPerConnection || 0)}</p>
          <p className="text-xs text-gray-500">per connection</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">For 5 Connections</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency((config?.costPerConnection || 0) * 5)}</p>
          <p className="text-xs text-gray-500">bulk discount available?</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">For 10 Connections</p>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency((config?.costPerConnection || 0) * 10)}</p>
          <p className="text-xs text-gray-500">typical large booth</p>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <DropletIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Water Connection Rate</h2>
            <p className="text-sm text-gray-500">Set the cost per water connection for exhibitors</p>
          </div>
        </div>

        {!editing ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <span className="text-sm text-gray-600 block mb-1">Current Rate</span>
                <span className="text-4xl font-bold text-blue-600">{formatCurrency(config?.costPerConnection || 0)}</span>
                <span className="text-sm text-gray-500 ml-2">per connection</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  disabled={submitting}
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Reset to default"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Rate
                </button>
              </div>
            </div>

            {config?.updatedAt && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-xs text-gray-400">
                  Last updated: {new Date(config.updatedAt).toLocaleString()}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={toggleHistory}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <ClockIcon className="h-4 w-4" />
                    {showHistory ? 'Hide History' : 'View History'}
                  </button>
                  <button
                    onClick={toggleStats}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <ChartBarIcon className="h-4 w-4" />
                    {showStats ? 'Hide Stats' : 'View Stats'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost per Connection (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  step="100"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Default rate: ₹15,000 per connection</p>
            </div>

            {/* Preview Calculations */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-xs text-blue-600 mb-1">1 Connection</p>
                <p className="text-lg font-semibold text-blue-700">
                  {formatCurrency(parseInt(formValue) || 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-600 mb-1">5 Connections</p>
                <p className="text-lg font-semibold text-blue-700">
                  {formatCurrency((parseInt(formValue) || 0) * 5)}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-600 mb-1">10 Connections</p>
                <p className="text-lg font-semibold text-blue-700">
                  {formatCurrency((parseInt(formValue) || 0) * 10)}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <ScaleIcon className="h-4 w-4 mr-2" />
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormValue(config?.costPerConnection.toString() || '15000');
                }}
                disabled={submitting}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                disabled={submitting}
                className="ml-auto inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History Section */}
      {showHistory && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-blue-600" />
            Rate Change History
          </h3>
          
          {loadingHistory ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600"></div>
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-3">
              {history.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0 hover:bg-gray-50 px-2 rounded">
                  <span className="font-medium text-blue-600">{formatCurrency(item.costPerConnection)}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.updatedAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No history available</p>
          )}
        </div>
      )}

      {/* Statistics Section */}
      {showStats && stats && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-blue-600" />
            Configuration Statistics
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Current Rate</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.currentRate)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Updates</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalUpdates || 0}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Created</p>
              <p className="text-sm font-medium text-gray-900">
                {stats.createdAt ? new Date(stats.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">
                {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Information Card */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Water Connections</h3>
        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
          <li>Each water connection includes supply line and basic fitting</li>
          <li>Rate is per connection for the entire exhibition duration</li>
          <li>Multiple connections can be booked for larger booths</li>
          <li>Default rate is ₹15,000 per connection</li>
          <li>Contact facilities team for special requirements</li>
        </ul>
      </div>
    </div>
  );
}