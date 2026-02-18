// app/admin/hostess-rates/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  SparklesIcon,
  XMarkIcon,
  CheckCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
// import AdminShell from '@/app/admin/AdminShell';

interface HostessCategory {
  id: string;
  category: 'A' | 'B';
  ratePerDay: number;
  workingHours: number;
  description: string;
  isActive: boolean;
}

const dummyCategories: HostessCategory[] = [
  {
    id: '1',
    category: 'A',
    ratePerDay: 5000,
    workingHours: 8,
    description: 'Experienced hostesses with language skills',
    isActive: true
  },
  {
    id: '2',
    category: 'B',
    ratePerDay: 4000,
    workingHours: 8,
    description: 'Standard hostesses for general assistance',
    isActive: true
  }
];

export default function AdminHostessRatesPage() {
  const [categories, setCategories] = useState<HostessCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<HostessCategory | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<Partial<HostessCategory>>({
    category: 'A',
    ratePerDay: 5000,
    workingHours: 8,
    description: '',
    isActive: true
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCategories(dummyCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory: HostessCategory = {
      id: editingCategory?.id || Date.now().toString(),
      category: formData.category as 'A' | 'B',
      ratePerDay: formData.ratePerDay!,
      workingHours: formData.workingHours!,
      description: formData.description || '',
      isActive: formData.isActive!
    };

    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? newCategory : c));
      setSuccessMessage('Category updated successfully');
    } else {
      setCategories(prev => [...prev, newCategory]);
      setSuccessMessage('Category added successfully');
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    setCategories(prev => prev.filter(c => c.id !== id));
    setSuccessMessage('Category deleted successfully');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resetForm = () => {
    setFormData({
      category: 'A',
      ratePerDay: 5000,
      workingHours: 8,
      description: '',
      isActive: true
    });
    setEditingCategory(null);
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Hostess / Temporary Staff Rates</h1>
          <p className="text-sm text-gray-600 mt-1">Manage rates for different hostess categories</p>
        </div>

        {showSuccess && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className={`bg-white rounded-xl shadow-sm border p-6 ${
              cat.isActive ? 'border-green-200' : 'border-gray-200 opacity-75'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <SparklesIcon className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Category {cat.category}</h3>
                    {cat.isActive && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ₹{cat.ratePerDay.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500 ml-1">/ day</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Working hours: {cat.workingHours} hrs/day
                  </div>
                  {cat.description && (
                    <p className="text-sm text-gray-500">{cat.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(cat);
                      setFormData(cat);
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors"
          >
            <SparklesIcon className="h-12 w-12 mb-2" />
            <span className="text-sm font-medium">Add New Category</span>
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as 'A' | 'B'})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="A">Category A</option>
                    <option value="B">Category B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate per Day (₹)</label>
                  <input
                    type="number"
                    value={formData.ratePerDay}
                    onChange={(e) => setFormData({...formData, ratePerDay: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours per Day</label>
                  <input
                    type="number"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({...formData, workingHours: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    min="1"
                    max="24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Describe the category responsibilities"
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
                    {editingCategory ? 'Update' : 'Save'}
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