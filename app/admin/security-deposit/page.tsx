// app/admin/security-deposit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CurrencyRupeeIcon,
  BanknotesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

interface SecurityDepositTier {
  id: string;
  tierNo: number;
  boothSq: string;
  amountINR: number;
  amountUSD: number;
  isActive: boolean;
  createdAt: string;
  minSqMtr?: number;
  maxSqMtr?: number;
}

const API_BASE_URL = 'https://diemex-backend.onrender.com';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/admin/security-deposit`,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function AdminSecurityDepositPage() {
  const [tiers, setTiers] = useState<SecurityDepositTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTier, setEditingTier] = useState<SecurityDepositTier | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<SecurityDepositTier>>({
    tierNo: 1,
    boothSq: '',
    amountINR: 0,
    amountUSD: 0,
    isActive: true,
    minSqMtr: 0,
    maxSqMtr: 0
  });

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/');
      
      if (response.data.success) {
        const mappedTiers = response.data.data.map((item: any, index: number) => ({
          id: item.id,
          tierNo: index + 1,
          boothSq: getBoothSqDisplay(item.category, item.minSqMtr, item.maxSqMtr),
          amountINR: item.amountINR,
          amountUSD: item.amountUSD,
          isActive: item.isActive,
          createdAt: item.createdAt,
          minSqMtr: item.minSqMtr,
          maxSqMtr: item.maxSqMtr
        }));
        setTiers(mappedTiers);
      } else {
        setError('Failed to load data');
      }
    } catch (error: any) {
      console.error('Error fetching tiers:', error);
      setError(error.response?.data?.message || 'Failed to load security deposits');
    } finally {
      setLoading(false);
    }
  };

  const getBoothSqDisplay = (category: string, min?: number, max?: number) => {
    if (category === '0-36') return '0 - 36 sq mtr';
    if (category === '37-100') return '37 - 100 sq mtr';
    if (category === '101+') return '101 and above sq mtr';
    return `${min || 0} - ${max || 0} sq mtr`;
  };

  const getCategoryFromBoothSq = (boothSq: string): string => {
    if (boothSq.includes('0-36')) return '0-36';
    if (boothSq.includes('37-100')) return '37-100';
    if (boothSq.includes('101')) return '101+';
    return '0-36';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError('');
      
      let minSqMtr = 0;
      let maxSqMtr = 999999;
      const boothSq = formData.boothSq || '';

      if (boothSq.includes('0-36')) {
        minSqMtr = 0;
        maxSqMtr = 36;
      } else if (boothSq.includes('37-100')) {
        minSqMtr = 37;
        maxSqMtr = 100;
      } else if (boothSq.includes('101')) {
        minSqMtr = 101;
        maxSqMtr = 999999;
      }

      const payload = {
        category: getCategoryFromBoothSq(boothSq),
        minSqMtr: formData.minSqMtr || minSqMtr,
        maxSqMtr: formData.maxSqMtr || maxSqMtr,
        amountINR: formData.amountINR,
        amountUSD: formData.amountUSD,
        isActive: formData.isActive,
        displayOrder: formData.tierNo
      };

      if (editingTier) {
        await api.put(`/${editingTier.id}`, payload);
        setSuccessMessage('Tier updated successfully');
      } else {
        await api.post('/', payload);
        setSuccessMessage('Tier added successfully');
      }

      await fetchTiers();
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm();
    } catch (error: any) {
      console.error('Error saving tier:', error);
      setError(error.response?.data?.message || 'Failed to save security deposit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tier?')) return;
    
    try {
      setError('');
      await api.delete(`/${id}`);
      
      setTiers(prev => prev.filter(t => t.id !== id));
      setSuccessMessage('Tier deleted successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error deleting tier:', error);
      setError(error.response?.data?.message || 'Failed to delete security deposit');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/${id}/toggle-status`, { isActive: !currentStatus });
      
      setTiers(prev => 
        prev.map(tier => 
          tier.id === id ? { ...tier, isActive: !currentStatus } : tier
        )
      );
      
      setSuccessMessage(`Tier ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error toggling status:', error);
      setError(error.response?.data?.message || 'Failed to update status');
    }
  };

  const resetForm = () => {
    setFormData({
      tierNo: tiers.length + 1,
      boothSq: '',
      amountINR: 0,
      amountUSD: 0,
      isActive: true,
      minSqMtr: 0,
      maxSqMtr: 0
    });
    setEditingTier(null);
    setShowModal(false);
    setError('');
  };

  const handleEdit = (tier: SecurityDepositTier) => {
    setEditingTier(tier);
    setFormData({
      tierNo: tier.tierNo,
      boothSq: tier.boothSq,
      amountINR: tier.amountINR,
      amountUSD: tier.amountUSD,
      isActive: tier.isActive,
      minSqMtr: tier.minSqMtr || 0,
      maxSqMtr: tier.maxSqMtr || 0
    });
    setShowModal(true);
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading security deposit tiers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Security Deposit Tiers</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Manage contractor security deposit amounts</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
            Add New Tier
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 sm:mb-4 bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-center text-red-800">
            <ExclamationCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600 flex-shrink-0" />
            <span className="flex-1 text-xs sm:text-sm">{error}</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Total Tiers</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{tiers.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Active</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">
              {tiers.filter(t => t.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Inactive</p>
            <p className="text-lg sm:text-xl font-bold text-gray-400">
              {tiers.filter(t => !t.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Avg. Deposit</p>
            <p className="text-sm sm:text-base font-bold text-blue-600 truncate">
              ₹{tiers.length ? Math.round(tiers.reduce((acc, t) => acc + t.amountINR, 0) / tiers.length).toLocaleString() : 0}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Booth Sq.</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">INR</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">USD</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tiers.map((tier) => (
                  <tr key={tier.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">{tier.tierNo}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600">{tier.boothSq}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">₹{tier.amountINR.toLocaleString()}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">${tier.amountUSD.toLocaleString()}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <button
                        onClick={() => handleToggleStatus(tier.id, tier.isActive)}
                        className={`px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-medium rounded-full ${
                          tier.isActive 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {tier.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEdit(tier)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(tier.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {tiers.length === 0 && (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <ShieldCheckIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3" />
              <p className="text-sm sm:text-base">No security deposit tiers found.</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Click "Add New Tier" to create one.</p>
            </div>
          )}
        </div>

        {/* Modal - Fixed overlapping */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-md w-full my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {editingTier ? 'Edit Tier' : 'Add New Tier'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 p-1">
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                {error && (
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 text-red-700 rounded-lg text-xs sm:text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Tier Number
                    </label>
                    <input
                      type="number"
                      value={formData.tierNo}
                      onChange={(e) => setFormData({...formData, tierNo: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Booth Square Range
                    </label>
                    <select
                      value={formData.boothSq}
                      onChange={(e) => setFormData({...formData, boothSq: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="0 - 36 sq mtr">0 - 36 sq mtr</option>
                      <option value="37 - 100 sq mtr">37 - 100 sq mtr</option>
                      <option value="101 and above sq mtr">101 and above sq mtr</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Amount (INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.amountINR}
                        onChange={(e) => setFormData({...formData, amountINR: parseInt(e.target.value) || 0})}
                        className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.amountUSD}
                        onChange={(e) => setFormData({...formData, amountUSD: parseInt(e.target.value) || 0})}
                        className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-xs sm:text-sm text-gray-700">
                      Active
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
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
                      className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
                    >
                      {submitting ? 'Saving...' : (editingTier ? 'Update' : 'Save')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}