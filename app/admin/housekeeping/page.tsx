// app/admin/housekeeping/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  SparklesIcon,
  ScaleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ClockIcon,
  CalculatorIcon,
  ExclamationCircleIcon,
  WrenchIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

interface HousekeepingConfig {
  id: string;
  chargesPerShift: number;
  shiftHours: number;
  createdAt: string;
  updatedAt: string;
}

interface HistoryItem {
  chargesPerShift: number;
  shiftHours: number;
  updatedAt: string;
}

interface StatsData {
  currentRate: number;
  shiftHours: number;
  hourlyRate: number;
  createdAt: string;
  lastUpdated: string;
  totalUpdates: number;
}

interface CalculationResult {
  chargesPerShift: number;
  shiftHours: number;
  numberOfShifts?: number;
  numberOfStaff?: number;
  hours?: number;
  hourlyRate?: number;
  totalCost: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

const FALLBACK_CONFIG: HousekeepingConfig = {
  id: 'local-1',
  chargesPerShift: 2000,
  shiftHours: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export default function AdminHousekeepingPage() {
  const [config, setConfig] = useState<HousekeepingConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<string>('2000');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [calculatorInput, setCalculatorInput] = useState<{ shifts: string; hours: string; staff: string }>({
    shifts: '1',
    hours: '10',
    staff: '1'
  });
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  const loadConfig = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${API_URL}/admin/housekeeping/config`, {
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
        console.log('Backend error, using fallback data');
        setUseFallback(true);
        setConfig(FALLBACK_CONFIG);
        setFormValue(FALLBACK_CONFIG.chargesPerShift.toString());
        setError('Using local mode - Backend connection issue. Changes will not be saved to server.');
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      
      if (data && data.data) {
        setConfig(data.data);
        setFormValue(data.data.chargesPerShift.toString());
        setUseFallback(false);
        setError('');
      } else {
        setUseFallback(true);
        setConfig(FALLBACK_CONFIG);
        setFormValue(FALLBACK_CONFIG.chargesPerShift.toString());
        setError('Invalid response from server. Using local mode.');
      }
      
    } catch (error: any) {
      console.error('Failed to load configuration:', error);
      
      setUseFallback(true);
      setConfig(FALLBACK_CONFIG);
      setFormValue(FALLBACK_CONFIG.chargesPerShift.toString());
      
      if (error.name === 'AbortError') {
        setError('Request timeout. Using local mode - Changes will not be saved to server.');
      } else {
        setError('Backend connection issue. Using local mode - Changes will not be saved to server.');
      }
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleSave = async (): Promise<void> => {
    const costValue = parseInt(formValue);
    if (isNaN(costValue) || costValue < 0) {
      setError('Please enter a valid positive number');
      return;
    }

    if (useFallback) {
      const updatedConfig = {
        ...FALLBACK_CONFIG,
        chargesPerShift: costValue,
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

      const response = await fetch(`${API_URL}/admin/housekeeping/config`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chargesPerShift: costValue }),
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
        const updatedConfig = {
          ...(config || FALLBACK_CONFIG),
          chargesPerShift: costValue,
          updatedAt: new Date().toISOString()
        };
        setConfig(updatedConfig);
        setEditing(false);
        setSuccessMessage('Rate updated locally (server error)');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        return;
      }

      if (responseData && responseData.data) {
        setConfig(responseData.data);
        setFormValue(responseData.data.chargesPerShift.toString());
      } else {
        const updatedConfig = {
          ...(config || FALLBACK_CONFIG),
          chargesPerShift: costValue,
          updatedAt: new Date().toISOString()
        };
        setConfig(updatedConfig);
      }
      
      setEditing(false);
      setSuccessMessage('Housekeeping rate updated successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to update configuration:', error);
      
      const updatedConfig = {
        ...(config || FALLBACK_CONFIG),
        chargesPerShift: costValue,
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
    if (!confirm('Are you sure you want to reset to default rate (₹2,000 per shift)?')) return;

    setFormValue('2000');
    
    if (useFallback) {
      const updatedConfig = {
        ...FALLBACK_CONFIG,
        chargesPerShift: 2000,
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

      const response = await fetch(`${API_URL}/admin/housekeeping/reset`, {
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
        const updatedConfig = {
          ...(config || FALLBACK_CONFIG),
          chargesPerShift: 2000,
          updatedAt: new Date().toISOString()
        };
        setConfig(updatedConfig);
        setSuccessMessage('Rate reset locally (server error)');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        return;
      }

      if (responseData && responseData.data) {
        setConfig(responseData.data);
        setFormValue(responseData.data.chargesPerShift.toString());
      } else {
        const updatedConfig = {
          ...(config || FALLBACK_CONFIG),
          chargesPerShift: 2000,
          updatedAt: new Date().toISOString()
        };
        setConfig(updatedConfig);
        setFormValue('2000');
      }
      
      setSuccessMessage('Rate reset to default successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to reset configuration:', error);
      
      const updatedConfig = {
        ...(config || FALLBACK_CONFIG),
        chargesPerShift: 2000,
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
        { chargesPerShift: 2000, shiftHours: 10, updatedAt: new Date().toISOString() },
        { chargesPerShift: 1800, shiftHours: 10, updatedAt: new Date(Date.now() - 86400000).toISOString() },
        { chargesPerShift: 2200, shiftHours: 10, updatedAt: new Date(Date.now() - 172800000).toISOString() }
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

      const response = await fetch(`${API_URL}/admin/housekeeping/history`, {
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
      setHistory([
        { chargesPerShift: config?.chargesPerShift || 2000, shiftHours: config?.shiftHours || 10, updatedAt: new Date().toISOString() }
      ]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadStats = async (): Promise<void> => {
    if (useFallback) {
      setStats({
        currentRate: config?.chargesPerShift || 2000,
        shiftHours: config?.shiftHours || 10,
        hourlyRate: Math.round((config?.chargesPerShift || 2000) / (config?.shiftHours || 10)),
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

      const response = await fetch(`${API_URL}/admin/housekeeping/stats`, {
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
      setStats({
        currentRate: config?.chargesPerShift || 2000,
        shiftHours: config?.shiftHours || 10,
        hourlyRate: Math.round((config?.chargesPerShift || 2000) / (config?.shiftHours || 10)),
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        totalUpdates: 1
      });
    }
  };

  const handleCalculate = (): void => {
    const shifts = parseInt(calculatorInput.shifts);
    if (shifts > 0 && config) {
      const totalCost = config.chargesPerShift * shifts;
      setCalculationResult({
        chargesPerShift: config.chargesPerShift,
        shiftHours: config.shiftHours,
        numberOfShifts: shifts,
        totalCost
      });
    }
  };

  const handleCustomCalculate = (): void => {
    const hours = parseInt(calculatorInput.hours);
    const staff = parseInt(calculatorInput.staff);
    if (hours > 0 && staff > 0 && config) {
      const hourlyRate = Math.round(config.chargesPerShift / config.shiftHours);
      const totalCost = hourlyRate * hours * staff;
      setCalculationResult({
        chargesPerShift: config.chargesPerShift,
        shiftHours: config.shiftHours,
        numberOfStaff: staff,
        hours: hours,
        hourlyRate: hourlyRate,
        totalCost
      });
    }
  };

  const toggleHistory = () => {
    if (!showHistory) {
      loadHistory();
    }
    setShowHistory(!showHistory);
    setShowStats(false);
    setShowCalculator(false);
  };

  const toggleStats = () => {
    if (!showStats) {
      loadStats();
    }
    setShowStats(!showStats);
    setShowHistory(false);
    setShowCalculator(false);
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    setShowHistory(false);
    setShowStats(false);
    if (!showCalculator) {
      setCalculationResult(null);
    }
  };

  const handleRetry = () => {
    setUseFallback(false);
    loadConfig();
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
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading housekeeping configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Housekeeping Staff</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Manage housekeeping staff rates and shifts</p>
        </div>

        {/* Fallback Mode Warning */}
        {useFallback && (
          <div className="mb-3 sm:mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center text-yellow-800">
            <div className="flex items-center mb-2 sm:mb-0">
              <WrenchIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Running in local mode. Changes will not be saved to server.</span>
            </div>
            <button 
              onClick={handleRetry}
              className="sm:ml-4 px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 text-xs"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && !useFallback && (
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
            <p className="text-xs text-gray-600">Rate per Shift</p>
            <p className="text-lg sm:text-xl font-bold text-blue-600">{formatCurrency(config?.chargesPerShift || 0)}</p>
            <p className="text-xs text-gray-500">{config?.shiftHours || 10} hour shift</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Hourly Rate</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">
              {formatCurrency(Math.round((config?.chargesPerShift || 0) / (config?.shiftHours || 10)))}
            </p>
            <p className="text-xs text-gray-500">per hour per staff</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Daily Cost (2 staff)</p>
            <p className="text-lg sm:text-xl font-bold text-purple-600">
              {formatCurrency((config?.chargesPerShift || 0) * 2)}
            </p>
            <p className="text-xs text-gray-500">for 2 staff, 1 shift</p>
          </div>
        </div>

        {/* Main Configuration Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Housekeeping Rate</h2>
              <p className="text-xs sm:text-sm text-gray-500">Charges per shift ({config?.shiftHours || 10} hours)</p>
            </div>
          </div>

          {!editing ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3">
                <div>
                  <span className="text-xs text-gray-600 block mb-1">Current Rate</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">{formatCurrency(config?.chargesPerShift || 0)}</span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">per shift</span>
                  <p className="text-xs text-gray-400 mt-1">
                    Hourly rate: {formatCurrency(Math.round((config?.chargesPerShift || 0) / (config?.shiftHours || 10)))}/hour
                  </p>
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

              {config?.updatedAt && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 border-t gap-3">
                  <div className="text-xs text-gray-400">
                    Last updated: {new Date(config.updatedAt).toLocaleString()}
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                      onClick={toggleCalculator}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <CalculatorIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      {showCalculator ? 'Hide Calculator' : 'Calculator'}
                    </button>
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
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Charges per Shift (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="100"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">Default rate: ₹2,000 per shift</p>
              </div>

              {/* Preview Calculations */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-xs text-blue-600 mb-1">1 Shift</p>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">
                    {formatCurrency(parseInt(formValue) || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 mb-1">2 Shifts</p>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">
                    {formatCurrency((parseInt(formValue) || 0) * 2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 mb-1">3 Shifts</p>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">
                    {formatCurrency((parseInt(formValue) || 0) * 3)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleSave}
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                >
                  <ScaleIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormValue(config?.chargesPerShift.toString() || '2000');
                  }}
                  disabled={submitting}
                  className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  disabled={submitting}
                  className="sm:ml-auto w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                >
                  <ArrowPathIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Calculator Section */}
        {showCalculator && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <CalculatorIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Cost Calculator
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Number of Shifts
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={calculatorInput.shifts}
                    onChange={(e) => setCalculatorInput({...calculatorInput, shifts: e.target.value})}
                    className="flex-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                  <button
                    onClick={handleCalculate}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Calculate
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Custom Hours
                </label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="number"
                    value={calculatorInput.hours}
                    onChange={(e) => setCalculatorInput({...calculatorInput, hours: e.target.value})}
                    className="w-16 sm:w-20 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                  <span className="text-xs sm:text-sm text-gray-500 self-center">hours</span>
                  <input
                    type="number"
                    value={calculatorInput.staff}
                    onChange={(e) => setCalculatorInput({...calculatorInput, staff: e.target.value})}
                    className="w-16 sm:w-20 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                  <span className="text-xs sm:text-sm text-gray-500 self-center">staff</span>
                  <button
                    onClick={handleCustomCalculate}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>

            {calculationResult && (
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm">Calculation Result:</h4>
                {calculationResult.numberOfShifts ? (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {calculationResult.numberOfShifts} shift(s) × {formatCurrency(calculationResult.chargesPerShift)}
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-blue-600 mt-1 sm:mt-2">
                      Total: {formatCurrency(calculationResult.totalCost)}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {calculationResult.hours} hours × {calculationResult.numberOfStaff} staff
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Hourly rate: {formatCurrency(calculationResult.hourlyRate || 0)} × {calculationResult.hours} hours = {formatCurrency(calculationResult.totalCost)}
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-purple-600 mt-1 sm:mt-2">
                      Total: {formatCurrency(calculationResult.totalCost)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* History Section */}
        {showHistory && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Rate Change History
            </h3>
            
            {loadingHistory ? (
              <div className="flex justify-center py-4 sm:py-8">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-gray-200 border-t-blue-600"></div>
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-2 sm:space-y-3">
                {history.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b last:border-0 hover:bg-gray-50 px-2 rounded gap-1 sm:gap-2">
                    <div>
                      <span className="text-sm sm:text-base font-medium text-blue-600">{formatCurrency(item.chargesPerShift)}</span>
                      <span className="text-xs text-gray-500 ml-1 sm:ml-2">({item.shiftHours} hrs shift)</span>
                    </div>
                    <span className="text-xs text-gray-500">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Configuration Statistics
            </h3>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Current Rate</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-blue-600">{formatCurrency(stats.currentRate)}</p>
              </div>
              <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Shift Hours</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-600">{stats.shiftHours} hrs</p>
              </div>
              <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Hourly Rate</p>
                <p className="text-sm sm:text-base font-bold text-green-600">{formatCurrency(stats.hourlyRate)}</p>
              </div>
              <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Total Updates</p>
                <p className="text-base sm:text-lg font-bold text-purple-600">{stats.totalUpdates || 0}</p>
              </div>
              <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Created</p>
                <p className="text-xs font-medium text-gray-900">
                  {stats.createdAt ? new Date(stats.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Last Updated</p>
                <p className="text-xs font-medium text-gray-900">
                  {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reference Card */}
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
          <h3 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">Quick Reference</h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center">
              <p className="text-xs text-blue-600 mb-1">1 Shift</p>
              <p className="text-sm sm:text-base md:text-lg font-bold text-blue-600">{formatCurrency(config?.chargesPerShift || 0)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-600 mb-1">2 Shifts</p>
              <p className="text-sm sm:text-base md:text-lg font-bold text-blue-600">{formatCurrency((config?.chargesPerShift || 0) * 2)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-600 mb-1">3 Shifts</p>
              <p className="text-sm sm:text-base md:text-lg font-bold text-blue-600">{formatCurrency((config?.chargesPerShift || 0) * 3)}</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2 sm:mt-3 text-center">
            Hourly rate: {formatCurrency(Math.round((config?.chargesPerShift || 0) / (config?.shiftHours || 10)))} per hour per staff
          </p>
        </div>
      </div>
    </div>
  );
}