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
  EyeSlashIcon
} from '@heroicons/react/24/outline';
// import AdminShell from '@/app/admin/AdminShell';
import Image from 'next/image';

interface FurnitureItem {
  id: string;
  code: string;
  description: string;
  size: string;
  cost3Days: number;
  category: string;
  inStock: boolean;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Dummy data
const dummyFurniture: FurnitureItem[] = [
  {
    id: '1',
    code: 'PI-01',
    description: 'Executive Chair',
    size: 'Black/red',
    cost3Days: 2000,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/executive-chair.jpg',
    displayOrder: 1,
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-02-20T14:45:00Z'
  },
  {
    id: '2',
    code: 'PI-02',
    description: 'VIP Sofa (1 Seater)',
    size: 'Black',
    cost3Days: 2000,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/vip-sofa-1.jpg',
    displayOrder: 2,
    isActive: true,
    createdAt: '2024-01-15T11:20:00Z',
    updatedAt: '2024-02-18T09:30:00Z'
  },
  {
    id: '3',
    code: 'PI-03',
    description: 'VIP Sofa (2 Seater)',
    size: 'Black',
    cost3Days: 3500,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/vip-sofa-2.jpg',
    displayOrder: 3,
    isActive: true,
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-02-19T16:20:00Z'
  },
  {
    id: '4',
    code: 'PI-04',
    description: 'Visitor Chair',
    size: 'Black',
    cost3Days: 800,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/visitor-chair.jpg',
    displayOrder: 4,
    isActive: true,
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-02-17T11:10:00Z'
  },
  {
    id: '5',
    code: 'PI-05',
    description: 'Fibre Chair',
    size: 'Black',
    cost3Days: 400,
    category: 'Furniture',
    inStock: false,
    imageUrl: '/furniture/fibre-chair.jpg',
    displayOrder: 5,
    isActive: true,
    createdAt: '2024-01-17T10:45:00Z',
    updatedAt: '2024-02-15T13:25:00Z'
  },
  {
    id: '6',
    code: 'PI-07',
    description: 'Round Table (Wooden Top)',
    size: '70CM (dia) x 75CM (H)',
    cost3Days: 1500,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/round-table-wooden.jpg',
    displayOrder: 6,
    isActive: true,
    createdAt: '2024-01-18T08:50:00Z',
    updatedAt: '2024-02-16T15:40:00Z'
  },
  {
    id: '7',
    code: 'PI-08',
    description: 'Round Table Cross Leg (Glass Top)',
    size: '90CM (dia) x 75CM (H)',
    cost3Days: 2000,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/round-table-glass.jpg',
    displayOrder: 7,
    isActive: true,
    createdAt: '2024-01-18T13:20:00Z',
    updatedAt: '2024-02-14T10:15:00Z'
  },
  {
    id: '8',
    code: 'PI-09',
    description: 'Bar Stool (Adjustable Chrome leg with Cup)',
    size: '50CM (H)',
    cost3Days: 2000,
    category: 'Furniture',
    inStock: false,
    imageUrl: '/furniture/bar-stool.jpg',
    displayOrder: 8,
    isActive: false,
    createdAt: '2024-01-19T11:30:00Z',
    updatedAt: '2024-02-13T09:45:00Z'
  },
  {
    id: '9',
    code: 'PI-10',
    description: 'Glass Showcase (Big with 2 downlights)',
    size: '1M x 50CM x 2M (H)',
    cost3Days: 5000,
    category: 'Display',
    inStock: true,
    imageUrl: '/furniture/glass-showcase-big.jpg',
    displayOrder: 9,
    isActive: true,
    createdAt: '2024-01-20T15:40:00Z',
    updatedAt: '2024-02-12T14:30:00Z'
  },
  {
    id: '10',
    code: 'PI-11',
    description: 'Glass Showcase (Small)',
    size: '50CM X 50CM X 2M (H)',
    cost3Days: 4000,
    category: 'Display',
    inStock: true,
    imageUrl: '/furniture/glass-showcase-small.jpg',
    displayOrder: 10,
    isActive: true,
    createdAt: '2024-01-21T10:15:00Z',
    updatedAt: '2024-02-11T16:20:00Z'
  },
  {
    id: '11',
    code: 'PI-12',
    description: 'Glass Counter',
    size: '1M X 50CM X 1M (H)',
    cost3Days: 3500,
    category: 'Display',
    inStock: true,
    imageUrl: '/furniture/glass-counter.jpg',
    displayOrder: 11,
    isActive: true,
    createdAt: '2024-01-22T09:30:00Z',
    updatedAt: '2024-02-10T11:45:00Z'
  },
  {
    id: '12',
    code: 'PI-13',
    description: 'Centre Table (Black Glass Top)',
    size: '1.20M (L) x 45CM (W)',
    cost3Days: 1500,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/centre-table.jpg',
    displayOrder: 12,
    isActive: true,
    createdAt: '2024-01-23T14:50:00Z',
    updatedAt: '2024-02-09T13:15:00Z'
  },
  {
    id: '13',
    code: 'PI-14',
    description: 'Standing Discussion Table',
    size: '1.0M (H) x 70CM (Dia)',
    cost3Days: 1500,
    category: 'Furniture',
    inStock: false,
    imageUrl: '/furniture/standing-table.jpg',
    displayOrder: 13,
    isActive: true,
    createdAt: '2024-01-24T12:20:00Z',
    updatedAt: '2024-02-08T10:30:00Z'
  },
  {
    id: '14',
    code: 'PI-15',
    description: 'System Counter (Table)',
    size: '1.05M X 60CM X 75CM',
    cost3Days: 1500,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/system-counter.jpg',
    displayOrder: 14,
    isActive: true,
    createdAt: '2024-01-25T16:35:00Z',
    updatedAt: '2024-02-07T15:40:00Z'
  },
  {
    id: '15',
    code: 'PI-16',
    description: 'Side Rack (Lockable)',
    size: '40CM X 1M X 60CM (H)',
    cost3Days: 3600,
    category: 'Storage',
    inStock: true,
    imageUrl: '/furniture/side-rack.jpg',
    displayOrder: 15,
    isActive: true,
    createdAt: '2024-01-26T11:10:00Z',
    updatedAt: '2024-02-06T09:20:00Z'
  },
  {
    id: '16',
    code: 'PI-17',
    description: 'System Podium',
    size: '50CM X 50CM X 1M (H)',
    cost3Days: 1000,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/podium-1m.jpg',
    displayOrder: 16,
    isActive: true,
    createdAt: '2024-01-27T13:45:00Z',
    updatedAt: '2024-02-05T14:50:00Z'
  },
  {
    id: '17',
    code: 'PI-18',
    description: 'System Podium',
    size: '50CM X 50CM X 70CM (H)',
    cost3Days: 1000,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/podium-70cm.jpg',
    displayOrder: 17,
    isActive: true,
    createdAt: '2024-01-28T10:25:00Z',
    updatedAt: '2024-02-04T12:35:00Z'
  },
  {
    id: '18',
    code: 'PI-19',
    description: 'System Podium',
    size: '50CM x 50CM x 50CM (H)',
    cost3Days: 1500,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/podium-50cm.jpg',
    displayOrder: 18,
    isActive: true,
    createdAt: '2024-01-29T15:15:00Z',
    updatedAt: '2024-02-03T11:55:00Z'
  },
  {
    id: '19',
    code: 'PI-20',
    description: 'Brochure Rack',
    size: '',
    cost3Days: 1500,
    category: 'Display',
    inStock: false,
    imageUrl: '/furniture/brochure-rack.jpg',
    displayOrder: 19,
    isActive: true,
    createdAt: '2024-01-30T09:40:00Z',
    updatedAt: '2024-02-02T16:10:00Z'
  },
  {
    id: '20',
    code: 'PI-21',
    description: 'Round Table (White Top)',
    size: '80CM (dia) x 75CM (H)',
    cost3Days: 1500,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/round-table-white.jpg',
    displayOrder: 20,
    isActive: true,
    createdAt: '2024-01-31T14:30:00Z',
    updatedAt: '2024-02-01T10:20:00Z'
  },
  {
    id: '21',
    code: 'PI-22',
    description: 'Square Table',
    size: '1.2M X 45CM',
    cost3Days: 1200,
    category: 'Furniture',
    inStock: true,
    imageUrl: '/furniture/square-table.jpg',
    displayOrder: 21,
    isActive: true,
    createdAt: '2024-02-01T11:50:00Z',
    updatedAt: '2024-02-20T13:25:00Z'
  },
  {
    id: '22',
    code: 'PI-23',
    description: 'Lockable Door',
    size: '',
    cost3Days: 4000,
    category: 'Accessories',
    inStock: true,
    imageUrl: '/furniture/lockable-door.jpg',
    displayOrder: 22,
    isActive: true,
    createdAt: '2024-02-02T16:20:00Z',
    updatedAt: '2024-02-19T09:15:00Z'
  },
  {
    id: '23',
    code: 'PI-24',
    description: 'System Panel',
    size: '1M x 2.5M (H) - White',
    cost3Days: 1500,
    category: 'Display',
    inStock: true,
    imageUrl: '/furniture/system-panel.jpg',
    displayOrder: 23,
    isActive: true,
    createdAt: '2024-02-03T10:35:00Z',
    updatedAt: '2024-02-18T14:40:00Z'
  },
  {
    id: '24',
    code: 'PI-25',
    description: 'Glass Shelf (each)',
    size: '30CM x 1M',
    cost3Days: 1000,
    category: 'Display',
    inStock: true,
    imageUrl: '/furniture/glass-shelf.jpg',
    displayOrder: 24,
    isActive: true,
    createdAt: '2024-02-04T13:15:00Z',
    updatedAt: '2024-02-17T11:30:00Z'
  },
  {
    id: '25',
    code: 'PI-26',
    description: 'Wooden Shelf Flat / Adjustable (each)',
    size: '30CM x 1M',
    cost3Days: 750,
    category: 'Storage',
    inStock: true,
    imageUrl: '/furniture/wooden-shelf.jpg',
    displayOrder: 25,
    isActive: true,
    createdAt: '2024-02-05T09:45:00Z',
    updatedAt: '2024-02-16T15:50:00Z'
  },
  {
    id: '26',
    code: 'PI-27',
    description: 'Long Arm Halogen Light',
    size: '150W',
    cost3Days: 1000,
    category: 'Lighting',
    inStock: true,
    imageUrl: '/furniture/halogen-light.jpg',
    displayOrder: 26,
    isActive: true,
    createdAt: '2024-02-06T14:20:00Z',
    updatedAt: '2024-02-15T10:35:00Z'
  },
  {
    id: '27',
    code: 'PI-28',
    description: 'Spot Lights',
    size: '75W',
    cost3Days: 750,
    category: 'Lighting',
    inStock: true,
    imageUrl: '/furniture/spot-light.jpg',
    displayOrder: 27,
    isActive: true,
    createdAt: '2024-02-07T11:55:00Z',
    updatedAt: '2024-02-14T16:25:00Z'
  },
  {
    id: '28',
    code: 'PI-29',
    description: 'Metal Halide',
    size: '150W',
    cost3Days: 2000,
    category: 'Lighting',
    inStock: false,
    imageUrl: '/furniture/metal-halide.jpg',
    displayOrder: 28,
    isActive: true,
    createdAt: '2024-02-08T15:30:00Z',
    updatedAt: '2024-02-13T09:40:00Z'
  },
  {
    id: '29',
    code: 'PI-30',
    description: '5A/13A Power Socket',
    size: '',
    cost3Days: 500,
    category: 'Electrical',
    inStock: true,
    imageUrl: '/furniture/power-socket.jpg',
    displayOrder: 29,
    isActive: true,
    createdAt: '2024-02-09T10:40:00Z',
    updatedAt: '2024-02-12T14:15:00Z'
  },
  {
    id: '30',
    code: 'PI-31',
    description: 'Photo Clip / T-Bolt',
    size: '',
    cost3Days: 100,
    category: 'Accessories',
    inStock: true,
    imageUrl: '/furniture/photo-clip.jpg',
    displayOrder: 30,
    isActive: true,
    createdAt: '2024-02-10T13:25:00Z',
    updatedAt: '2024-02-11T11:50:00Z'
  },
  {
    id: '31',
    code: 'PI-32',
    description: 'Waste Basket',
    size: '',
    cost3Days: 150,
    category: 'Accessories',
    inStock: true,
    imageUrl: '/furniture/waste-basket.jpg',
    displayOrder: 31,
    isActive: false,
    createdAt: '2024-02-11T09:15:00Z',
    updatedAt: '2024-02-20T10:30:00Z'
  }
];

export default function AdminFurniturePage() {
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FurnitureItem[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Form state
  const [formData, setFormData] = useState<Partial<FurnitureItem>>({
    code: '',
    description: '',
    size: '',
    cost3Days: 0,
    category: 'Furniture',
    inStock: true,
    displayOrder: 1,
    isActive: true
  });

  // Load dummy data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFurnitureItems(dummyFurniture);
      const uniqueCategories = Array.from(new Set(dummyFurniture.map(item => item.category)));
      setCategories(uniqueCategories);
      const maxOrder = dummyFurniture.reduce((max, item) => Math.max(max, item.displayOrder), 0);
      setFormData(prev => ({ ...prev, displayOrder: maxOrder + 1 }));
      setLoading(false);
    }, 1000);
  }, []);

  // Filter items
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: FurnitureItem = {
      id: editingItem?.id || Date.now().toString(),
      code: formData.code!,
      description: formData.description!,
      size: formData.size || '',
      cost3Days: formData.cost3Days || 0,
      category: formData.category || 'Furniture',
      inStock: formData.inStock || false,
      imageUrl: imagePreview || editingItem?.imageUrl || '/furniture/placeholder.jpg',
      displayOrder: formData.displayOrder || 1,
      isActive: formData.isActive || false,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingItem) {
      setFurnitureItems(prev => 
        prev.map(item => item.id === editingItem.id ? newItem : item)
      );
      setSuccessMessage('Furniture item updated successfully');
    } else {
      setFurnitureItems(prev => [...prev, newItem]);
      setSuccessMessage('Furniture item added successfully');
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    setFurnitureItems(prev => prev.filter(item => item.id !== id));
    setSuccessMessage('Furniture item deleted successfully');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleToggleActive = (item: FurnitureItem) => {
    setFurnitureItems(prev => 
      prev.map(i => i.id === item.id ? { ...i, isActive: !i.isActive } : i)
    );
    setSuccessMessage(`Item ${item.isActive ? 'deactivated' : 'activated'} successfully`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resetForm = () => {
    const maxOrder = furnitureItems.reduce((max, item) => Math.max(max, item.displayOrder), 0);
    
    setFormData({
      code: '',
      description: '',
      size: '',
      cost3Days: 0,
      category: 'Furniture',
      inStock: true,
      displayOrder: maxOrder + 1,
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
      size: item.size,
      cost3Days: item.cost3Days,
      category: item.category,
      inStock: item.inStock,
      displayOrder: item.displayOrder,
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
      <>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading furniture catalog...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Furniture Catalog</h1>
            <p className="text-sm text-gray-600 mt-1">Manage furniture items with image storage</p>
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
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
            {successMessage}
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
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
            <div className="sm:w-48 relative">
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
            <div className="sm:w-40 relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-2xl font-bold text-gray-900">{furnitureItems.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">In Stock</p>
            <p className="text-2xl font-bold text-green-600">
              {furnitureItems.filter(item => item.inStock).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Active Items</p>
            <p className="text-2xl font-bold text-blue-600">
              {furnitureItems.filter(item => item.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
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
              <div key={item.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all group ${
                !item.isActive ? 'opacity-60 border-gray-300' : 'border-gray-200'
              }`}>
                {/* Image */}
                <div className="aspect-square bg-gray-100 relative">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                      item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {!item.isActive && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium shadow-sm bg-gray-100 text-gray-800">
                        Inactive
                      </span>
                    )}
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
                        onClick={() => handleToggleActive(item)}
                        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors transform hover:scale-110"
                        title={item.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {item.isActive ? (
                          <EyeSlashIcon className="h-5 w-5 text-orange-600" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-green-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                  
                  {/* Display Order */}
                  <div className="mt-2 text-xs text-gray-400">
                    Order: #{item.displayOrder}
                  </div>
                  
                  {/* Timestamps */}
                  <div className="mt-3 pt-3 border-t text-xs text-gray-400">
                    <p>Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed">
            <PhotoIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Furniture Items Found</h3>
            <p className="text-gray-500 mb-4">
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
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                      Item Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                        {imagePreview ? (
                          // eslint-disable-next-line @next/next/no-img-element
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
                      </div>
                    </div>
                  </div>

                  {/* Code and Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  {/* Display Order */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value) || 1})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                      required
                    />
                  </div>

                  {/* Status Checkboxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                        Item is in stock
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                        Active (visible to exhibitors)
                      </label>
                    </div>
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-w-[120px] justify-center"
                    >
                      {editingItem ? 'Update Item' : 'Add Item'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}