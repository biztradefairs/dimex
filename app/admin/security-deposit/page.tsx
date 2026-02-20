'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
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

// Add token to requests
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

  const [formData, setFormData] = useState<Partial<SecurityDepositTier>>({
    tierNo: 1,
    boothSq: '',
    amountINR: 0,
    amountUSD: 0,
    isActive: true,
    minSqMtr: 0,
    maxSqMtr: 0
  });

  // Fetch tiers from API
  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/');
      
      if (response.data.success) {
        // Map API data to your tier format
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
    return '0-36'; // default
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      
      // Parse min/max from boothSq string
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
        // Update existing
        await api.put(`/${editingTier.id}`, payload);
        setSuccessMessage('Tier updated successfully');
      } else {
        // Create new
        await api.post('/', payload);
        setSuccessMessage('Tier added successfully');
      }

      // Refresh the list
      await fetchTiers();
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm();
    } catch (error: any) {
      console.error('Error saving tier:', error);
      setError(error.response?.data?.message || 'Failed to save security deposit');
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
      
      // Update local state
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
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Deposit Tiers</h1>
          <p className="text-sm text-gray-600 mt-1">Manage contractor security deposit amounts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Tier
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-800">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 text-red-600" />
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
          {successMessage}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booth Sq.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (INR)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (USD)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tiers.map((tier) => (
              <tr key={tier.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{tier.tierNo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{tier.boothSq}</td>
                <td className="px-6 py-4 text-sm text-gray-900">₹{tier.amountINR.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-900">USD {tier.amountUSD}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleStatus(tier.id, tier.isActive)}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tier.isActive 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {tier.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tier)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(tier.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tiers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No security deposit tiers found. Click "Add New Tier" to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingTier ? 'Edit Tier' : 'Add New Tier'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tier Number</label>
                <input
                  type="number"
                  value={formData.tierNo}
                  onChange={(e) => setFormData({...formData, tierNo: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Booth Square Range</label>
                <select
                  value={formData.boothSq}
                  onChange={(e) => setFormData({...formData, boothSq: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  <option value="">Select range</option>
                  <option value="0 - 36 sq mtr">0 - 36 sq mtr</option>
                  <option value="37 - 100 sq mtr">37 - 100 sq mtr</option>
                  <option value="101 and above sq mtr">101 and above sq mtr</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
                <input
                  type="number"
                  value={formData.amountINR}
                  onChange={(e) => setFormData({...formData, amountINR: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                <input
                  type="number"
                  value={formData.amountUSD}
                  onChange={(e) => setFormData({...formData, amountUSD: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  min="0"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingTier ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}