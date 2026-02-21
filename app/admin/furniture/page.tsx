// app/admin/furniture/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  EyeSlashIcon,
  CubeIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface FurnitureItem {
  id: string;
  code: string;
  description: string;
  size: string;
  cost3Days: number;
  category: string;
  inStock: boolean;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: FurnitureItem[];
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

export default function AdminFurniturePage() {
  const router = useRouter();
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FurnitureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<FurnitureItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    size: '',
    cost3Days: 0,
    category: 'Furniture',
    inStock: true,
    isActive: true
  });

  // Check authentication and fetch data
  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      console.log('No token found, redirecting to login');
      router.push('/admin/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/furniture`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        console.log('Token invalid, removing and redirecting');
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
        return;
      }

      await fetchFurniture();
    } catch (err) {
      console.error('Auth check failed:', err);
      setError('Network error. Please check your connection.');
      setLoading(false);
    }
  };

  const fetchFurniture = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${API_URL}/admin/furniture`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch');
      
      const data: ApiResponse = await response.json();
      const items = data.data || [];
      
      setFurnitureItems(items);
      
      const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
      setCategories(uniqueCategories);
      
    } catch (err) {
      setError('Failed to load furniture items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter items
  useEffect(() => {
    let filtered = furnitureItems;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => 
        selectedStatus === 'active' ? item.isActive : !item.isActive
      );
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, selectedStatus, furnitureItems]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.code || !formData.description || !formData.cost3Days) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('code', formData.code);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('size', formData.size || '');
      formDataToSend.append('cost3Days', formData.cost3Days.toString());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('inStock', formData.inStock.toString());
      formDataToSend.append('isActive', formData.isActive.toString());
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const url = editingItem 
        ? `${API_URL}/admin/furniture/${editingItem.id}`
        : `${API_URL}/admin/furniture`;

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save');
      }

      await fetchFurniture();
      
      setSuccessMessage(editingItem ? 'Item updated successfully' : 'Item added successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      resetForm();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${API_URL}/admin/furniture/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to delete');

      await fetchFurniture();
      
      setSuccessMessage('Item deleted successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (err) {
      setError('Failed to delete item');
      console.error(err);
    }
  };

  const handleToggleActive = async (item: FurnitureItem) => {
    try {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${API_URL}/admin/furniture/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !item.isActive })
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to update');

      await fetchFurniture();
      
      setSuccessMessage(`Item ${item.isActive ? 'deactivated' : 'activated'} successfully`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (err) {
      setError('Failed to update status');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      size: '',
      cost3Days: 0,
      category: 'Furniture',
      inStock: true,
      isActive: true
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingItem(null);
    setShowModal(false);
  };

  const editItem = (item: FurnitureItem) => {
    setEditingItem(item);
    setFormData({
      code: item.code,
      description: item.description,
      size: item.size || '',
      cost3Days: item.cost3Days,
      category: item.category,
      inStock: item.inStock,
      isActive: item.isActive
    });
    setImagePreview(item.imageUrl);
    setShowModal(true);
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
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading furniture catalog...</p>
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Furniture Catalog</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Manage furniture items</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
            Add New Item
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Total Items</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{furnitureItems.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">In Stock</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">
              {furnitureItems.filter(i => i.inStock).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Active</p>
            <p className="text-lg sm:text-xl font-bold text-blue-600">
              {furnitureItems.filter(i => i.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Categories</p>
            <p className="text-lg sm:text-xl font-bold text-purple-600">{categories.length}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-4 sm:mb-6 bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by code or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 sm:w-40 relative">
                <FunnelIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-7 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 sm:w-36">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-2 sm:px-4 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Furniture Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all group ${
                !item.isActive ? 'opacity-60 border-gray-300' : 'border-gray-200'
              }`}>
                {/* Image */}
                <div className="aspect-square bg-gray-100 relative">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.description}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PhotoIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Status Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${
                      item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {!item.isActive && (
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium shadow-sm bg-gray-100 text-gray-800">
                        Inactive
                      </span>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => editItem(item)}
                        className="p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors transform hover:scale-110"
                        title="Edit Item"
                      >
                        <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(item)}
                        className="p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors transform hover:scale-110"
                        title={item.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {item.isActive ? (
                          <EyeSlashIcon className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                        ) : (
                          <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors transform hover:scale-110"
                        title="Delete Item"
                      >
                        <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <div>
                      <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 sm:px-2 py-0.5 rounded">
                        {item.code}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(item.cost3Days)}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{item.description}</h3>
                  {item.size && (
                    <p className="text-xs text-gray-600">{item.size}</p>
                  )}
                  
                  {/* Timestamps */}
                  <div className="mt-2 pt-2 border-t text-xs text-gray-400">
                    <p>Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-white rounded-xl border-2 border-dashed">
            <CubeIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No Furniture Items Found</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 px-4">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'No items match your search criteria. Try adjusting your filters.'
                : 'Get started by adding your first furniture item to the catalog.'}
            </p>
            {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Modal - Fixed overlapping issue */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-2xl w-full my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {editingItem ? 'Edit Furniture Item' : 'Add New Furniture Item'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Item Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <PhotoIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="cursor-pointer inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          <ArrowUpTrayIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                          JPEG, PNG, GIF, WebP (Max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Code and Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Item Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., PI-01"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Furniture">Furniture</option>
                        <option value="Lighting">Lighting</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Display">Display</option>
                        <option value="Storage">Storage</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Executive Chair"
                      required
                    />
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Size / Dimensions
                    </label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 70CM x 75CM"
                    />
                  </div>

                  {/* Cost for 3 Days */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Cost for 3 Days (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500 text-sm">₹</span>
                      <input
                        type="number"
                        value={formData.cost3Days}
                        onChange={(e) => setFormData({...formData, cost3Days: parseInt(e.target.value) || 0})}
                        className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="2000"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* Status Checkboxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                        className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="inStock" className="ml-2 text-xs sm:text-sm text-gray-700">
                        Item is in stock
                      </label>
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
                        Active (visible to exhibitors)
                      </label>
                    </div>
                  </div>

                  {/* Form Actions */}
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
                      className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-w-[120px] justify-center disabled:opacity-50 text-sm"
                    >
                      {submitting ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
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