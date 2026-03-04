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
  ExclamationCircleIcon,
  UsersIcon
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
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading hostess rates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Hostess / Temporary Staff Rates</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Manage rates for different hostess categories</p>
          </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Total Categories</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{categories.length}/2</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Active</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">
              {categories.filter(c => c.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Avg. Rate/Day</p>
            <p className="text-lg sm:text-xl font-bold text-blue-600">
              {categories.length ? formatCurrency(Math.round(categories.reduce((acc, c) => acc + c.ratePerDay, 0) / categories.length)) : '₹0'}
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className={`bg-white rounded-xl shadow-sm border p-4 sm:p-6 transition-all hover:shadow-md ${
              cat.isActive ? 'border-green-200 bg-green-50/30' : 'border-gray-200 opacity-75'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                    <SparklesIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${cat.isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Category {cat.category}</h3>
                    <button
                      onClick={() => handleToggleStatus(cat.id, cat.isActive)}
                      className={`px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
                        cat.isActive 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                    {formatCurrency(cat.ratePerDay)}
                    <span className="text-xs sm:text-sm font-normal text-gray-500 ml-1">/ day</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                    Working hours: {cat.workingHours} hrs/day
                  </div>
                  {cat.description && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 italic">"{cat.description}"</p>
                  )}
                  {cat.updatedAt && (
                    <p className="text-xs text-gray-400 mt-2 sm:mt-3">
                      Last updated: {new Date(cat.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 sm:gap-2 self-end sm:self-start">
                  <button
                    onClick={() => editCategory(cat)}
                    className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          {categories.length < 2 && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors min-h-[200px] sm:min-h-[250px] group"
            >
              <UsersIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mb-2 sm:mb-3 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm sm:text-base font-medium group-hover:text-gray-700">Add New Category</span>
              <span className="text-xs text-gray-400 mt-1 sm:mt-2">
                {categories.length === 0 ? 'Add Category A or B' : 
                 categories.find(c => c.category === 'A') ? 'Add Category B' : 'Add Category A'}
              </span>
              <PlusIcon className="h-6 w-6 sm:h-8 sm:w-8 mt-2 sm:mt-4 text-gray-300 group-hover:text-gray-500" />
            </button>
          )}

          {/* Both categories exist message */}
          {categories.length === 2 && (
            <div className="col-span-2 text-center py-3 sm:py-4 text-gray-500 bg-gray-50 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm">Both categories (A and B) have been configured.</p>
              <p className="text-xs text-gray-400">You can edit existing categories using the pencil icon.</p>
            </div>
          )}
        </div>

        {/* Modal - Fixed overlapping issue */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-md w-full my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {editingCategory ? 'Edit Hostess Category' : 'Add New Hostess Category'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    <label htmlFor="ratePerDay" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Rate per Day (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500 text-sm">₹</span>
                      <input
                        type="number"
                        id="ratePerDay"
                        name="ratePerDay"
                        value={formData.ratePerDay}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="workingHours" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Working Hours per Day <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="workingHours"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                      max="24"
                      required
                    />
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
                      placeholder="Describe the category responsibilities..."
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
                      Active (available for exhibitors)
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
                      disabled={submitting || (!editingCategory && categories.find(c => c.category === formData.category) ? true : false)}
                      className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-w-[80px] disabled:opacity-50 text-sm"
                    >
                      {submitting ? 'Saving...' : (editingCategory ? 'Update' : 'Save')}
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