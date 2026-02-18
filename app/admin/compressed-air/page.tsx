// app/admin/compressed-air/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
// import AdminShell from '@/app/admin/AdminShell';

interface CompressedAirOption {
  id: string;
  cfmRange: string;
  costPerConnection: number;
  powerKW: number;
  isActive: boolean;
  displayOrder: number;
}

const dummyOptions: CompressedAirOption[] = [
  {
    id: '1',
    cfmRange: 'Upto 10 cfm',
    costPerConnection: 15000,
    powerKW: 3,
    isActive: true,
    displayOrder: 1
  },
  {
    id: '2',
    cfmRange: '10-20 cfm',
    costPerConnection: 25000,
    powerKW: 5,
    isActive: true,
    displayOrder: 2
  },
  {
    id: '3',
    cfmRange: '20-30 cfm',
    costPerConnection: 40000,
    powerKW: 8,
    isActive: true,
    displayOrder: 3
  },
  {
    id: '4',
    cfmRange: '30-40 cfm',
    costPerConnection: 50000,
    powerKW: 11,
    isActive: true,
    displayOrder: 4
  },
  {
    id: '5',
    cfmRange: 'Above 40 cfm',
    costPerConnection: 75000,
    powerKW: 15,
    isActive: true,
    displayOrder: 5
  }
];

export default function AdminCompressedAirPage() {
  const [options, setOptions] = useState<CompressedAirOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOption, setEditingOption] = useState<CompressedAirOption | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<Partial<CompressedAirOption>>({
    cfmRange: '',
    costPerConnection: 0,
    powerKW: 0,
    isActive: true,
    displayOrder: 1
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOptions(dummyOptions);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOption: CompressedAirOption = {
      id: editingOption?.id || Date.now().toString(),
      cfmRange: formData.cfmRange!,
      costPerConnection: formData.costPerConnection!,
      powerKW: formData.powerKW!,
      isActive: formData.isActive!,
      displayOrder: formData.displayOrder!
    };

    if (editingOption) {
      setOptions(prev => prev.map(o => o.id === editingOption.id ? newOption : o));
      setSuccessMessage('Option updated successfully');
    } else {
      setOptions(prev => [...prev, newOption]);
      setSuccessMessage('Option added successfully');
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this option?')) return;
    
    setOptions(prev => prev.filter(o => o.id !== id));
    setSuccessMessage('Option deleted successfully');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resetForm = () => {
    setFormData({
      cfmRange: '',
      costPerConnection: 0,
      powerKW: 0,
      isActive: true,
      displayOrder: options.length + 1
    });
    setEditingOption(null);
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
            <h1 className="text-2xl font-bold text-gray-900">Compressed Air Options</h1>
            <p className="text-sm text-gray-600 mt-1">Manage compressed air connection options</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Option
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CFM Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Connection Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Power (KW)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {options.map((option) => (
                <tr key={option.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{option.displayOrder}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{option.cfmRange}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{option.costPerConnection.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{option.powerKW} KW</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                    ₹{(option.costPerConnection + (option.powerKW * 3500)).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      option.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {option.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingOption(option);
                          setFormData(option);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(option.id)}
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
                  {editingOption ? 'Edit Option' : 'Add New Option'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CFM Range</label>
                  <input
                    type="text"
                    value={formData.cfmRange}
                    onChange={(e) => setFormData({...formData, cfmRange: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g., Upto 10 cfm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Connection Cost (₹)</label>
                  <input
                    type="number"
                    value={formData.costPerConnection}
                    onChange={(e) => setFormData({...formData, costPerConnection: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Power (KW)</label>
                  <input
                    type="number"
                    value={formData.powerKW}
                    onChange={(e) => setFormData({...formData, powerKW: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    min="1"
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
                    {editingOption ? 'Update' : 'Save'}
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