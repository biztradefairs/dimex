// app/admin/electrical-rates/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  BoltIcon,
  XMarkIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
// import AdminShell from '@/app/admin/AdminShell';

interface ElectricalRate {
  id: string;
  type: 'temporary' | 'exhibition' | 'both';
  ratePerKW: number;
  effectiveFrom: string;
  effectiveTo: string | null;
  isActive: boolean;
  description: string;
}

const dummyRates: ElectricalRate[] = [
  {
    id: '1',
    type: 'both',
    ratePerKW: 3500,
    effectiveFrom: '2024-01-01',
    effectiveTo: null,
    isActive: true,
    description: 'Standard rate for all electrical loads'
  },
  {
    id: '2',
    type: 'temporary',
    ratePerKW: 4000,
    effectiveFrom: '2024-06-01',
    effectiveTo: '2024-12-31',
    isActive: false,
    description: 'Peak season temporary rate'
  }
];

export default function AdminElectricalRatesPage() {
  const [rates, setRates] = useState<ElectricalRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRate, setEditingRate] = useState<ElectricalRate | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<Partial<ElectricalRate>>({
    type: 'both',
    ratePerKW: 3500,
    effectiveFrom: new Date().toISOString().split('T')[0],
    effectiveTo: null,
    isActive: true,
    description: ''
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRates(dummyRates);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRate: ElectricalRate = {
      id: editingRate?.id || Date.now().toString(),
      type: formData.type as 'temporary' | 'exhibition' | 'both',
      ratePerKW: formData.ratePerKW!,
      effectiveFrom: formData.effectiveFrom!,
      effectiveTo: formData.effectiveTo || null,
      isActive: formData.isActive!,
      description: formData.description || ''
    };

    if (editingRate) {
      setRates(prev => prev.map(r => r.id === editingRate.id ? newRate : r));
      setSuccessMessage('Rate updated successfully');
    } else {
      setRates(prev => [...prev, newRate]);
      setSuccessMessage('Rate added successfully');
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this rate?')) return;
    
    setRates(prev => prev.filter(r => r.id !== id));
    setSuccessMessage('Rate deleted successfully');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resetForm = () => {
    setFormData({
      type: 'both',
      ratePerKW: 3500,
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveTo: null,
      isActive: true,
      description: ''
    });
    setEditingRate(null);
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
            <h1 className="text-2xl font-bold text-gray-900">Electrical Load Rates</h1>
            <p className="text-sm text-gray-600 mt-1">Manage per KW rates for electrical loads</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Rate
          </button>
        </div>

        {showSuccess && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
            {successMessage}
          </div>
        )}

        <div className="grid gap-4">
          {rates.map((rate) => (
            <div key={rate.id} className={`bg-white rounded-lg shadow-sm border p-6 ${
              rate.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200'
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <BoltIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900">
                      {rate.type === 'both' ? 'Temporary & Exhibition' : 
                       rate.type === 'temporary' ? 'Temporary Load' : 'Exhibition Load'}
                    </span>
                    {rate.isActive && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    ₹{rate.ratePerKW.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500 ml-1">/ KW</span>
                  </div>
                  {rate.description && (
                    <p className="text-sm text-gray-600 mb-2">{rate.description}</p>
                  )}
                  <div className="text-xs text-gray-400">
                    Effective: {new Date(rate.effectiveFrom).toLocaleDateString()}
                    {rate.effectiveTo && ` to ${new Date(rate.effectiveTo).toLocaleDateString()}`}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingRate(rate);
                      setFormData(rate);
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rate.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingRate ? 'Edit Rate' : 'Add New Rate'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="both">Both Temporary & Exhibition</option>
                    <option value="temporary">Temporary Only</option>
                    <option value="exhibition">Exhibition Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate per KW (₹)</label>
                  <input
                    type="number"
                    value={formData.ratePerKW}
                    onChange={(e) => setFormData({...formData, ratePerKW: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective From</label>
                  <input
                    type="date"
                    value={formData.effectiveFrom}
                    onChange={(e) => setFormData({...formData, effectiveFrom: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective To (Optional)</label>
                  <input
                    type="date"
                    value={formData.effectiveTo || ''}
                    onChange={(e) => setFormData({...formData, effectiveTo: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Additional notes"
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
                    {editingRate ? 'Update' : 'Save'}
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