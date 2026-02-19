// app/admin/hostess-rates/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  SparklesIcon,
  XMarkIcon,
  CheckCircleIcon,
  TrashIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface HostessCategory {
  id: string;
  category: 'A' | 'B';
  ratePerDay: number;
  workingHours: number;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface FormData {
  category: 'A' | 'B';
  ratePerDay: string;
  workingHours: string;
  description: string;
  isActive: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

export default function AdminHostessRatesPage() {
  const [categories, setCategories] = useState<HostessCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<HostessCategory | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    category: 'A',
    ratePerDay: '5000',
    workingHours: '8',
    description: '',
    isActive: true
  });

  // Load categories from backend
  const loadCategories = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/hostess-rates`, {
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
      setCategories(data.data || []);
      
    } catch (error) {
      console.error('Failed to load categories:', error);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.ratePerDay || !formData.workingHours) {
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
        category: formData.category,
        ratePerDay: parseInt(formData.ratePerDay),
        workingHours: parseInt(formData.workingHours),
        description: formData.description,
        isActive: formData.isActive
      };

      const url = editingCategory 
        ? `${API_URL}/admin/hostess-rates/${editingCategory.id}`
        : `${API_URL}/admin/hostess-rates`;

      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
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

      await loadCategories();
      
      setSuccessMessage(editingCategory ? 'Category updated successfully' : 'Category added successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm();
      
    } catch (error: any) {
      console.error('Failed to save category:', error);
      // Check if category already exists error
      if (error.message?.includes('already exists')) {
        setError(`Category ${formData.category} already exists. You can edit the existing category instead.`);
      } else {
        setError(error.message || 'Failed to save category. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      setError('');
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/hostess-rates/${id}`, {
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

      await loadCategories();
      
      setSuccessMessage('Category deleted successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to delete category:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete category. Please try again.');
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

      const response = await fetch(`${API_URL}/admin/hostess-rates/${id}/toggle-status`, {
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

      await loadCategories();
      
      setSuccessMessage(`Category ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to toggle status:', error);
      setError(error instanceof Error ? error.message : 'Failed to update status. Please try again.');
    }
  };

  const resetForm = (): void => {
    setFormData({
      category: 'A',
      ratePerDay: '5000',
      workingHours: '8',
      description: '',
      isActive: true
    });
    setEditingCategory(null);
    setShowModal(false);
  };

  const editCategory = (category: HostessCategory): void => {
    setEditingCategory(category);
    setFormData({
      category: category.category,
      ratePerDay: category.ratePerDay.toString(),
      workingHours: category.workingHours.toString(),
      description: category.description || '',
      isActive: category.isActive
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
          <p className="mt-4 text-gray-600 font-medium">Loading hostess rates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hostess / Temporary Staff Rates</h1>
          <p className="text-sm text-gray-600 mt-1">Manage rates for different hostess categories</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Categories</p>
          <p className="text-2xl font-bold text-gray-900">{categories.length}/2</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Active Categories</p>
          <p className="text-2xl font-bold text-green-600">
            {categories.filter(c => c.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Avg. Rate/Day</p>
          <p className="text-2xl font-bold text-blue-600">
            {categories.length ? formatCurrency(Math.round(categories.reduce((acc, c) => acc + c.ratePerDay, 0) / categories.length)) : '₹0'}
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className={`bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-md ${
            cat.isActive ? 'border-green-200 bg-green-50/30' : 'border-gray-200 opacity-75'
          }`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <SparklesIcon className={`h-6 w-6 ${cat.isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                  <h3 className="text-lg font-semibold text-gray-900">Category {cat.category}</h3>
                  <button
                    onClick={() => handleToggleStatus(cat.id, cat.isActive)}
                    className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                      cat.isActive 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatCurrency(cat.ratePerDay)}
                  <span className="text-sm font-normal text-gray-500 ml-1">/ day</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Working hours: {cat.workingHours} hrs/day
                </div>
                {cat.description && (
                  <p className="text-sm text-gray-500 mt-2 italic">"{cat.description}"</p>
                )}
                {cat.updatedAt && (
                  <p className="text-xs text-gray-400 mt-3">
                    Last updated: {new Date(cat.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editCategory(cat)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card - only show if less than 2 categories (A and B) */}
        {categories.length < 2 && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors min-h-[250px] group"
          >
            <SparklesIcon className="h-12 w-12 mb-3 text-gray-400 group-hover:text-gray-600" />
            <span className="text-sm font-medium group-hover:text-gray-700">Add New Category</span>
            <span className="text-xs text-gray-400 mt-2">
              {categories.length === 0 ? 'Add Category A or B' : 
               categories.find(c => c.category === 'A') ? 'Add Category B' : 'Add Category A'}
            </span>
            <PlusIcon className="h-8 w-8 mt-4 text-gray-300 group-hover:text-gray-500" />
          </button>
        )}

        {/* If both categories exist, show message */}
        {categories.length === 2 && (
          <div className="col-span-2 text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
            <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p>Both categories (A and B) have been configured.</p>
            <p className="text-sm">You can edit existing categories using the pencil icon.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCategory ? 'Edit Hostess Category' : 'Add New Hostess Category'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!!editingCategory}
                  required
                >
                  <option value="A">Category A</option>
                  <option value="B">Category B</option>
                </select>
                {!editingCategory && categories.find(c => c.category === formData.category) && (
                  <p className="text-xs text-red-500 mt-1">
                    Category {formData.category} already exists. You can edit it instead.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="ratePerDay" className="block text-sm font-medium text-gray-700 mb-1">
                  Rate per Day (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    id="ratePerDay"
                    name="ratePerDay"
                    value={formData.ratePerDay}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700 mb-1">
                  Working Hours per Day <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="workingHours"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max="24"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the category responsibilities and requirements..."
                />
              </div>

              <div className="flex items-center py-2">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active (available for exhibitors)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || (!editingCategory && categories.find(c => c.category === formData.category) ? true : false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-w-[80px] disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : (editingCategory ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}