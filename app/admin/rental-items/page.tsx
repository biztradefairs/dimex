// app/admin/rental-items/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ComputerDesktopIcon,
  XMarkIcon,
  CheckCircleIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DevicePhoneMobileIcon,
  TvIcon
} from '@heroicons/react/24/outline';

interface RentalItem {
  id: string;
  itemKey: string;
  description: string;
  costFor3Days: number;
  category: 'AV' | 'IT' | 'Other';
  imageUrl: string;
  isActive: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

interface FormData {
  itemKey: string;
  description: string;
  costFor3Days: string;
  category: 'AV' | 'IT' | 'Other';
  isActive: boolean;
  displayOrder: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

export default function AdminRentalItemsPage() {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<RentalItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalItems: 0,
    activeItems: 0,
    inactiveItems: 0,
    avItems: 0,
    itItems: 0,
    otherItems: 0,
    totalValue: 0
  });

  const [formData, setFormData] = useState<FormData>({
    itemKey: '',
    description: '',
    costFor3Days: '',
    category: 'AV',
    isActive: true,
    displayOrder: ''
  });

  const loadItems = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/rental-items`, {
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
      const itemsData = data.data || [];
      setItems(itemsData);
      
      const activeItems = itemsData.filter((i: RentalItem) => i.isActive).length;
      const totalValue = itemsData.reduce((acc: number, i: RentalItem) => acc + i.costFor3Days, 0);
      
      setStats({
        totalItems: itemsData.length,
        activeItems,
        inactiveItems: itemsData.length - activeItems,
        avItems: itemsData.filter((i: RentalItem) => i.category === 'AV').length,
        itItems: itemsData.filter((i: RentalItem) => i.category === 'IT').length,
        otherItems: itemsData.filter((i: RentalItem) => i.category === 'Other').length,
        totalValue
      });
      
    } catch (error) {
      console.error('Failed to load items:', error);
      setError('Failed to load items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    let filtered = items;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemKey?.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [searchTerm, selectedCategory, selectedStatus, items]);

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

    if (!formData.itemKey || !formData.description || !formData.costFor3Days) {
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

      const formDataToSend = new FormData();
      formDataToSend.append('itemKey', formData.itemKey);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('costFor3Days', formData.costFor3Days);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('isActive', formData.isActive.toString());
      
      if (formData.displayOrder) {
        formDataToSend.append('displayOrder', formData.displayOrder);
      }
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const url = editingItem 
        ? `${API_URL}/admin/rental-items/${editingItem.id}`
        : `${API_URL}/admin/rental-items`;

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
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

      await loadItems();
      
      setSuccessMessage(editingItem ? 'Item updated successfully' : 'Item added successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm();
      
    } catch (error: any) {
      console.error('Failed to save item:', error);
      
      if (error.message?.includes('unique') || error.message?.includes('already exists')) {
        setError('Item key already exists. Please use a unique key.');
      } else {
        setError(error.message || 'Failed to save item. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setError('');
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/rental-items/${id}`, {
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

      await loadItems();
      
      setSuccessMessage('Item deleted successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to delete item:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete item. Please try again.');
    }
  };

  const handleToggleActive = async (item: RentalItem) => {
    try {
      setError('');
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_URL}/admin/rental-items/${item.id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !item.isActive })
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

      await loadItems();
      
      setSuccessMessage(`Item ${!item.isActive ? 'activated' : 'deactivated'} successfully`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to toggle status:', error);
      setError(error instanceof Error ? error.message : 'Failed to update status. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      itemKey: '',
      description: '',
      costFor3Days: '',
      category: 'AV',
      isActive: true,
      displayOrder: ''
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingItem(null);
    setShowModal(false);
  };

  const editItem = (item: RentalItem) => {
    setEditingItem(item);
    setFormData({
      itemKey: item.itemKey,
      description: item.description,
      costFor3Days: item.costFor3Days.toString(),
      category: item.category,
      isActive: item.isActive,
      displayOrder: item.displayOrder.toString()
    });
    setImagePreview(item.imageUrl);
    setShowModal(true);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'AV': return 'bg-purple-100 text-purple-800';
      case 'IT': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'AV': return <TvIcon className="h-4 w-4" />;
      case 'IT': return <ComputerDesktopIcon className="h-4 w-4" />;
      default: return <DevicePhoneMobileIcon className="h-4 w-4" />;
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
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading rental items...</p>
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AV & IT Rental Items</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Manage rental items with pricing</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Total</p>
            <p className="text-base sm:text-xl font-bold text-gray-900">{stats.totalItems}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Active</p>
            <p className="text-base sm:text-xl font-bold text-green-600">{stats.activeItems}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">AV</p>
            <p className="text-base sm:text-xl font-bold text-purple-600">{stats.avItems}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">IT</p>
            <p className="text-base sm:text-xl font-bold text-blue-600">{stats.itItems}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Other</p>
            <p className="text-base sm:text-xl font-bold text-gray-600">{stats.otherItems}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4 border border-gray-200">
            <p className="text-xs text-gray-600">Total Value</p>
            <p className="text-xs sm:text-sm font-bold text-blue-600 truncate">{formatCurrency(stats.totalValue)}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-4 sm:mb-6 bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by key or description..."
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
                  <option value="AV">AV Equipment</option>
                  <option value="IT">IT Equipment</option>
                  <option value="Other">Other</option>
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

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all group ${
                !item.isActive ? 'opacity-60 border-gray-300' : 'border-gray-200'
              }`}>
                {/* Image */}
                <div className="aspect-video bg-gray-100 relative">
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
                      <ComputerDesktopIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1 ${getCategoryBadgeColor(item.category)}`}>
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => editItem(item)}
                        className="p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                        title="Edit Item"
                      >
                        <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(item)}
                        className="p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
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
                        className="p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                        title="Delete Item"
                      >
                        <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="mb-1 sm:mb-2">
                    <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      {item.itemKey}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">{item.description}</h3>
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <span className="text-sm sm:text-base font-bold text-blue-600">{formatCurrency(item.costFor3Days)}</span>
                    <span className="text-xs text-gray-500">3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-gray-400">Order #{item.displayOrder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-white rounded-xl border-2 border-dashed">
            <ComputerDesktopIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 sm:mb-2">No Rental Items Found</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 px-4">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'No items match your search criteria. Try adjusting your filters.'
                : 'Get started by adding your first rental item.'}
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-md w-full my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {editingItem ? 'Edit Rental Item' : 'Add New Rental Item'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 p-1">
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Item Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-start gap-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <PhotoIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="cursor-pointer inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                          <ArrowUpTrayIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Item Key */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Item Key <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.itemKey}
                      onChange={(e) => setFormData({...formData, itemKey: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., lcdProjector"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Unique identifier (no spaces)</p>
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
                      placeholder="Item description"
                      required
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
                        value={formData.costFor3Days}
                        onChange={(e) => setFormData({...formData, costFor3Days: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="AV">AV Equipment</option>
                      <option value="IT">IT Equipment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Display Order */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({...formData, displayOrder: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                      placeholder={!editingItem ? `Default: ${items.length + 1}` : ''}
                    />
                  </div>

                  {/* Active Checkbox */}
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
                      className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
                    >
                      {submitting ? 'Saving...' : (editingItem ? 'Update' : 'Save')}
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