// app/admin/compressed-air/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface CompressedAirOption {
  id: string;
  cfmRange: string;
  costPerConnection: number;
  powerKW: number;
  isActive: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

interface FormData {
  cfmRange: string;
  costPerConnection: string;
  powerKW: string;
  isActive: boolean;
  displayOrder: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

export default function AdminCompressedAirPage() {
  const [options, setOptions] = useState<CompressedAirOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingOption, setEditingOption] = useState<CompressedAirOption | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    cfmRange: '',
    costPerConnection: '',
    powerKW: '',
    isActive: true,
    displayOrder: ''
  });

  // Load options from backend
  const loadOptions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/compressed-air`, {
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
      setOptions(data.data || []);
    } catch (error) {
      console.error('Failed to load options:', error);
      setError('Failed to load options. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.cfmRange || !formData.costPerConnection || !formData.powerKW) {
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
        cfmRange: formData.cfmRange,
        costPerConnection: parseInt(formData.costPerConnection),
        powerKW: parseFloat(formData.powerKW),
        isActive: formData.isActive,
        displayOrder: formData.displayOrder ? parseInt(formData.displayOrder) : undefined
      };

      const url = editingOption 
        ? `${API_URL}/admin/compressed-air/${editingOption.id}`
        : `${API_URL}/admin/compressed-air`;

      const response = await fetch(url, {
        method: editingOption ? 'PUT' : 'POST',
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
        console.error('Server error response:', responseData);
        throw new Error(responseData?.message || responseData?.error || 'Failed to save');
      }

      await loadOptions();
      
      setSuccessMessage(editingOption ? 'Option updated successfully' : 'Option added successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm();
      
    } catch (error) {
      console.error('Failed to save option:', error);
      setError(error instanceof Error ? error.message : 'Failed to save option. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this option?')) return;
    
    try {
      setError('');
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/compressed-air/${id}`, {
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

      await loadOptions();
      
      setSuccessMessage('Option deleted successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to delete option:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete option. Please try again.');
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

      const response = await fetch(`${API_URL}/admin/compressed-air/${id}/toggle-status`, {
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

      await loadOptions();
      
      setSuccessMessage(`Option ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to toggle status:', error);
      setError(error instanceof Error ? error.message : 'Failed to update status. Please try again.');
    }
  };

  const resetForm = (): void => {
    setFormData({
      cfmRange: '',
      costPerConnection: '',
      powerKW: '',
      isActive: true,
      displayOrder: ''
    });
    setEditingOption(null);
    setShowModal(false);
  };

  const editOption = (option: CompressedAirOption): void => {
    setEditingOption(option);
    setFormData({
      cfmRange: option.cfmRange,
      costPerConnection: option.costPerConnection.toString(),
      powerKW: option.powerKW.toString(),
      isActive: option.isActive,
      displayOrder: option.displayOrder.toString()
    });
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotalCost = (option: CompressedAirOption): number => {
    return option.costPerConnection + (option.powerKW * 3500);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading compressed air options...</p>
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Compressed Air Options</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Manage compressed air connection options and rates</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
            Add New Option
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
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{successMessage}</span>
          </div>
        )}

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">Total Options</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{options.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">Active</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
              {options.filter(o => o.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">Inactive</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400">
              {options.filter(o => !o.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">Avg. Total</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
              ₹{options.length ? Math.round(options.reduce((acc, o) => acc + calculateTotalCost(o), 0) / options.length).toLocaleString() : 0}
            </p>
          </div>
        </div>

        {/* Table - Responsive with horizontal scroll on mobile */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CFM Range</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connection Cost</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {options.length > 0 ? (
                  options.map((option) => (
                    <tr key={option.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600">{option.displayOrder}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">{option.cfmRange}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">₹{option.costPerConnection.toLocaleString()}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">{option.powerKW} KW</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-blue-600">
                        ₹{calculateTotalCost(option).toLocaleString()}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4">
                        <button
                          onClick={() => handleToggleStatus(option.id, option.isActive)}
                          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                            option.isActive 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {option.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4">
                        <div className="flex gap-2 sm:gap-3">
                          <button
                            onClick={() => editOption(option)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                            title="Edit Option"
                          >
                            <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(option.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1"
                            title="Delete Option"
                          >
                            <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                      <div className="flex flex-col items-center">
                        <BoltIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-2 sm:mb-3" />
                        <p className="text-sm sm:text-base text-gray-500 mb-1 sm:mb-2">No options found</p>
                        <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Get started by adding your first compressed air option</p>
                        <button
                          onClick={() => setShowModal(true)}
                          className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                        >
                          <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Add New Option
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal - Fixed overlapping issue */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-xl my-4 sm:my-8">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editingOption ? 'Edit Compressed Air Option' : 'Add New Compressed Air Option'}
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
                  <label htmlFor="cfmRange" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    CFM Range <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cfmRange"
                    name="cfmRange"
                    value={formData.cfmRange}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Upto 10 cfm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="costPerConnection" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Connection Cost (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500 text-sm">₹</span>
                    <input
                      type="number"
                      id="costPerConnection"
                      name="costPerConnection"
                      value={formData.costPerConnection}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="powerKW" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Power (KW) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="powerKW"
                    name="powerKW"
                    value={formData.powerKW}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Power cost: ₹3,500 per KW</p>
                </div>

                <div>
                  <label htmlFor="displayOrder" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="displayOrder"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                    placeholder={!editingOption ? `Default: ${options.length + 1}` : ''}
                  />
                  {!editingOption && !formData.displayOrder && (
                    <p className="text-xs text-gray-500 mt-1">Will be set to {options.length + 1}</p>
                  )}
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
                    Active (visible to exhibitors)
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
                    {submitting ? 'Saving...' : (editingOption ? 'Update' : 'Save')}
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