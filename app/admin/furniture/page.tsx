// app/admin/furniture/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

// API Configuration
const API_BASE_URL = 'https://diemex-backend.onrender.com';

interface FurnitureItem {
  id?: string;
  code: string;
  description: string;
  size: string;
  cost3Days: number;
  category: string;
  inStock: boolean;
  image?: File;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminFurniturePage() {
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FurnitureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<FurnitureItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState<FurnitureItem>({
    code: '',
    description: '',
    size: '',
    cost3Days: 0,
    category: 'Furniture',
    inStock: true
  });

  // Fetch furniture items
  useEffect(() => {
    fetchFurniture();
  }, []);

  // Filter items based on search and category
  useEffect(() => {
    let filtered = furnitureItems;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, furnitureItems]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(furnitureItems.map(item => item.category)));
    setCategories(uniqueCategories);
  }, [furnitureItems]);

  const apiCall = async (endpoint: string, options: RequestInit = {}, isFormData = false) => {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    
    const headers: HeadersInit = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
        credentials: 'include',
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('API Call Error:', error);
      throw error;
    }
  };

  const fetchFurniture = async () => {
    try {
      setLoading(true);
      const result = await apiCall('/api/admin/furniture');
      if (result.success) {
        setFurnitureItems(result.data);
      }
    } catch (error: any) {
      console.error('Error fetching furniture:', error);
      setShowError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setShowError('Please upload an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setShowError('Image size should be less than 5MB');
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
    setUploading(true);
    setShowError(null);

    try {
      const formDataObj = new FormData();
      
      // Append all form fields
      formDataObj.append('code', formData.code);
      formDataObj.append('description', formData.description);
      formDataObj.append('size', formData.size);
      formDataObj.append('cost3Days', formData.cost3Days.toString());
      formDataObj.append('category', formData.category);
      formDataObj.append('inStock', formData.inStock.toString());
      
      // Append image if selected - Cloudinary will handle this on backend
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }

      let result;
      if (editingItem?.id) {
        // Update existing item
        result = await apiCall(`/api/admin/furniture/${editingItem.id}`, {
          method: 'PUT',
          body: formDataObj,
        }, true);
      } else {
        // Create new item
        result = await apiCall('/api/admin/furniture', {
          method: 'POST',
          body: formDataObj,
        }, true);
      }

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        resetForm();
        fetchFurniture();
      }
    } catch (error: any) {
      console.error('Error saving furniture:', error);
      setShowError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item? This will also delete the image from Cloudinary.')) return;

    try {
      const result = await apiCall(`/api/admin/furniture/${id}`, {
        method: 'DELETE',
      });

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        fetchFurniture();
      }
    } catch (error: any) {
      console.error('Error deleting furniture:', error);
      setShowError(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      size: '',
      cost3Days: 0,
      category: 'Furniture',
      inStock: true
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
      size: item.size,
      cost3Days: item.cost3Days,
      category: item.category,
      inStock: item.inStock
    });
    setImagePreview(item.imageUrl || null);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading furniture catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Furniture Catalog Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage furniture items with Cloudinary image storage</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Item
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800 animate-fade-in">
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
            Operation completed successfully!
          </div>
        )}

        {/* Error Message */}
        {showError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between text-red-800 animate-fade-in">
            <div className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 mr-2 text-red-600" />
              {showError}
            </div>
            <button onClick={() => setShowError(null)} className="text-red-600 hover:text-red-800">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by code or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="sm:w-64 relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-2xl font-bold text-gray-900">{furnitureItems.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">In Stock</p>
            <p className="text-2xl font-bold text-green-600">
              {furnitureItems.filter(item => item.inStock).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600">
              {furnitureItems.filter(item => !item.inStock).length}
            </p>
          </div>
        </div>

        {/* Furniture Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
                {/* Image */}
                <div className="aspect-square bg-gray-100 relative">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.description}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PhotoIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                      item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editItem(item)}
                        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors transform hover:scale-110"
                        title="Edit Item"
                      >
                        <PencilIcon className="h-5 w-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id!)}
                        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors transform hover:scale-110"
                        title="Delete Item"
                      >
                        <TrashIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {item.code}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(item.cost3Days)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.description}</h3>
                  {item.size && (
                    <p className="text-sm text-gray-600">{item.size}</p>
                  )}
                  
                  {/* Timestamps */}
                  {(item.createdAt || item.updatedAt) && (
                    <div className="mt-3 pt-3 border-t text-xs text-gray-400">
                      {item.updatedAt && (
                        <p>Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed">
            <PhotoIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Furniture Items Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No items match your search criteria. Try adjusting your filters.'
                : 'Get started by adding your first furniture item to the catalog.'}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
            {!searchTerm && selectedCategory === 'all' && (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Your First Item
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingItem ? 'Edit Furniture Item' : 'Add New Furniture Item'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Image <span className="text-gray-400 text-xs">(Will be uploaded to Cloudinary)</span>
                    </label>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <PhotoIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                          <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
                        </p>
                        {editingItem?.imageUrl && !imageFile && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Current image will be kept if no new image selected
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Code and Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., PI-01"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Executive Chair"
                      required
                    />
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size / Dimensions
                    </label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 70CM x 75CM"
                    />
                  </div>

                  {/* Cost for 3 Days */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost for 3 Days (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.cost3Days}
                        onChange={(e) => setFormData({...formData, cost3Days: parseInt(e.target.value) || 0})}
                        className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="2000"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* In Stock */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                      Item is in stock and available for rent
                    </label>
                  </div>

                  {/* Form Actions */}
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
                      disabled={uploading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-w-[120px] justify-center"
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          {editingItem ? 'Updating...' : 'Adding...'}
                        </>
                      ) : (
                        editingItem ? 'Update Item' : 'Add Item'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}