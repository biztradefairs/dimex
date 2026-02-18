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
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
// import AdminShell from '@/app/admin/AdminShell';

interface SecurityDepositTier {
  id: string;
  tierNo: number;
  boothSq: string;
  amountINR: number;
  amountUSD: number;
  isActive: boolean;
  createdAt: string;
}

const dummyTiers: SecurityDepositTier[] = [
  {
    id: '1',
    tierNo: 1,
    boothSq: '0-36',
    amountINR: 25000,
    amountUSD: 300,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    tierNo: 2,
    boothSq: '37-100',
    amountINR: 50000,
    amountUSD: 600,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    tierNo: 3,
    boothSq: '101 and above',
    amountINR: 75000,
    amountUSD: 900,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export default function AdminSecurityDepositPage() {
  const [tiers, setTiers] = useState<SecurityDepositTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTier, setEditingTier] = useState<SecurityDepositTier | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<Partial<SecurityDepositTier>>({
    tierNo: 1,
    boothSq: '',
    amountINR: 0,
    amountUSD: 0,
    isActive: true
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTiers(dummyTiers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTier: SecurityDepositTier = {
      id: editingTier?.id || Date.now().toString(),
      tierNo: formData.tierNo!,
      boothSq: formData.boothSq!,
      amountINR: formData.amountINR!,
      amountUSD: formData.amountUSD!,
      isActive: formData.isActive!,
      createdAt: editingTier?.createdAt || new Date().toISOString()
    };

    if (editingTier) {
      setTiers(prev => prev.map(t => t.id === editingTier.id ? newTier : t));
      setSuccessMessage('Tier updated successfully');
    } else {
      setTiers(prev => [...prev, newTier]);
      setSuccessMessage('Tier added successfully');
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this tier?')) return;
    
    setTiers(prev => prev.filter(t => t.id !== id));
    setSuccessMessage('Tier deleted successfully');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resetForm = () => {
    setFormData({
      tierNo: tiers.length + 1,
      boothSq: '',
      amountINR: 0,
      amountUSD: 0,
      isActive: true
    });
    setEditingTier(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
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
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tier.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tier.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingTier(tier);
                          setFormData(tier);
                          setShowModal(true);
                        }}
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
                  <input
                    type="text"
                    value={formData.boothSq}
                    onChange={(e) => setFormData({...formData, boothSq: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g., 0-36, 37-100, 101+"
                    required
                  />
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
    </>
  );
}