// app/admin/electrical-rates/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  BoltIcon,
  XMarkIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  ExclamationCircleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface ElectricalRate {
  id: string;
  type: 'temporary' | 'exhibition' | 'both';
  ratePerKW: number;
  effectiveFrom: string;
  effectiveTo: string | null;
  isActive: boolean;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface FormData {
  type: 'temporary' | 'exhibition' | 'both';
  ratePerKW: string;
  effectiveFrom: string;
  effectiveTo: string;
  isActive: boolean;
  description: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

export default function AdminElectricalRatesPage() {
  const [rates, setRates] = useState<ElectricalRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingRate, setEditingRate] = useState<ElectricalRate | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    type: 'both',
    ratePerKW: '3500',
    effectiveFrom: new Date().toISOString().split('T')[0],
    effectiveTo: '',
    isActive: true,
    description: ''
  });

  // Load rates from backend
  const loadRates = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/electrical-rates`, {
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
      setRates(data.data || []);
    } catch (error) {
      console.error('Failed to load rates:', error);
      setError('Failed to load rates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.ratePerKW || !formData.effectiveFrom) {
      alert('Please fill in all required fields');
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

      const data = {
        type: formData.type,
        ratePerKW: parseInt(formData.ratePerKW),
        effectiveFrom: formData.effectiveFrom,
        effectiveTo: formData.effectiveTo || null,
        isActive: formData.isActive,
        description: formData.description
      };

      const url = editingRate 
        ? `${API_URL}/admin/electrical-rates/${editingRate.id}`
        : `${API_URL}/admin/electrical-rates`;

      const response = await fetch(url, {
        method: editingRate ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json().catch(() => null);
      
      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) {
        console.error('Server error:', responseData);
        throw new Error(responseData?.message || responseData?.error || 'Failed to save');
      }

      await loadRates();
      
      setSuccessMessage(editingRate ? 'Rate updated successfully' : 'Rate added successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm();
      
    } catch (error: any) {
      console.error('Failed to save rate:', error);
      
      if (error.message?.includes('Active rate conflict')) {
        setError('Cannot activate this rate: Another active rate already exists for the same period and type.');
      } else {
        setError(error.message || 'Failed to save rate. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this rate?')) return;
    
    try {
      setError('');
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/electrical-rates/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
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
        throw new Error(responseData?.message || 'Failed to delete');
      }

      await loadRates();
      
      setSuccessMessage('Rate deleted successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to delete rate:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete rate. Please try again.');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean): Promise<void> => {
    try {
      setError('');
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/electrical-rates/${id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
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

      await loadRates();
      
      setSuccessMessage(`Rate ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Failed to toggle status:', error);
      if (error.message?.includes('Active rate conflict')) {
        setError('Cannot activate this rate: Another active rate already exists for the same period and type.');
      } else {
        setError(error.message || 'Failed to update status. Please try again.');
      }
    }
  };

  const resetForm = (): void => {
    setFormData({
      type: 'both',
      ratePerKW: '3500',
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveTo: '',
      isActive: true,
      description: ''
    });
    setEditingRate(null);
    setShowModal(false);
  };

  const editRate = (rate: ElectricalRate): void => {
    setEditingRate(rate);
    setFormData({
      type: rate.type,
      ratePerKW: rate.ratePerKW.toString(),
      effectiveFrom: rate.effectiveFrom,
      effectiveTo: rate.effectiveTo || '',
      isActive: rate.isActive,
      description: rate.description || ''
    });
    setShowModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getTypeLabel = (type: string): string => {
    switch(type) {
      case 'both': return 'Temporary & Exhibition';
      case 'temporary': return 'Temporary Load';
      case 'exhibition': return 'Exhibition Load';
      default: return type;
    }
  };

  const getTypeBadgeColor = (type: string): string => {
    switch(type) {
      case 'both': return 'bg-purple-100 text-purple-800';
      case 'temporary': return 'bg-blue-100 text-blue-800';
      case 'exhibition': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading electrical rates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Electrical Load Rates</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Manage per KW rates for electrical loads</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
            Add New Rate
          </button>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">Total Rates</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{rates.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">Active</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
              {rates.filter(r => r.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">Inactive</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400">
              {rates.filter(r => !r.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">Avg. Rate</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
              ₹{rates.length ? Math.round(rates.reduce((acc, r) => acc + r.ratePerKW, 0) / rates.length).toLocaleString() : 0}
            </p>
          </div>
        </div>

        {/* Rates List - Responsive Cards */}
        <div className="grid gap-3 sm:gap-4">
          {rates.length > 0 ? (
            rates.map((rate) => (
              <div 
                key={rate.id} 
                className={`bg-white rounded-lg shadow-sm border p-4 sm:p-6 transition-all hover:shadow-md ${
                  rate.isActive ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <BoltIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${rate.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(rate.type)}`}>
                        {getTypeLabel(rate.type)}
                      </span>
                      <button
                        onClick={() => handleToggleStatus(rate.id, rate.isActive)}
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full transition-colors ${
                          rate.isActive 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {rate.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                      ₹{rate.ratePerKW.toLocaleString()}
                      <span className="text-xs sm:text-sm font-normal text-gray-500 ml-1">/ KW</span>
                    </div>
                    
                    {rate.description && (
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{rate.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="font-medium">From:</span>{' '}
                        {new Date(rate.effectiveFrom).toLocaleDateString()}
                      </div>
                      {rate.effectiveTo && (
                        <div className="flex items-center">
                          <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="font-medium">To:</span>{' '}
                          {new Date(rate.effectiveTo).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 self-end sm:self-start w-full sm:w-auto justify-end">
                    <button
                      onClick={() => editRate(rate)}
                      className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Rate"
                    >
                      <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(rate.id)}
                      className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Rate"
                    >
                      <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center">
              <BoltIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No Rates Found</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Get started by adding your first electrical rate</p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Add New Rate
              </button>
            </div>
          )}
        </div>

        {/* Modal - Fixed overlapping issue */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-xl my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editingRate ? 'Edit Electrical Rate' : 'Add New Electrical Rate'}
                </h2>
                <button 
                  onClick={resetForm} 
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="type" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Rate Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="both">Both Temporary & Exhibition</option>
                    <option value="temporary">Temporary Only</option>
                    <option value="exhibition">Exhibition Only</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ratePerKW" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Rate per KW (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500 text-sm">₹</span>
                    <input
                      type="number"
                      id="ratePerKW"
                      name="ratePerKW"
                      value={formData.ratePerKW}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="effectiveFrom" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Effective From <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="effectiveFrom"
                    name="effectiveFrom"
                    value={formData.effectiveFrom}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="effectiveTo" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Effective To (Optional)
                  </label>
                  <input
                    type="date"
                    id="effectiveTo"
                    name="effectiveTo"
                    value={formData.effectiveTo}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={formData.effectiveFrom}
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty for ongoing rates</p>
                </div>

                <div>
                  <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional notes about this rate..."
                  />
                </div>

                <div className="flex items-center py-1 sm:py-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-xs sm:text-sm text-gray-700">
                    Active (apply this rate to new bookings)
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-w-[80px] disabled:opacity-50 text-sm"
                  >
                    {submitting ? 'Saving...' : (editingRate ? 'Update' : 'Save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}