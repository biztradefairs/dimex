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
  EyeSlashIcon
} from '@heroicons/react/24/outline';
// import AdminShell from '@/app/admin/AdminShell';

interface RentalItem {
  id: string;
  itemKey: string;
  description: string;
  costFor3Days: number;
  category: 'AV' | 'IT' | 'Other';
  imageUrl: string;
  isActive: boolean;
  displayOrder: number;
}

const dummyItems: RentalItem[] = [
  {
    id: '1',
    itemKey: 'lcdProjector',
    description: 'LCD Projector (XGA 3000 ASNI Lumens)',
    costFor3Days: 20000,
    category: 'AV',
    imageUrl: '/rentals/projector.jpg',
    isActive: true,
    displayOrder: 1
  },
  {
    id: '2',
    itemKey: 'laptop',
    description: 'Laptop with Accessories',
    costFor3Days: 4000,
    category: 'IT',
    imageUrl: '/rentals/laptop.jpg',
    isActive: true,
    displayOrder: 2
  },
  {
    id: '3',
    itemKey: 'laserPrinter',
    description: 'Laser Jet B & W Printer / Scanner (Without Cartridges)',
    costFor3Days: 10000,
    category: 'IT',
    imageUrl: '/rentals/printer.jpg',
    isActive: true,
    displayOrder: 3
  },
  {
    id: '4',
    itemKey: 'paSystem',
    description: 'PA Systems (150 w Speaker 2 nos., 400 w Amplifier 1 no)',
    costFor3Days: 10000,
    category: 'AV',
    imageUrl: '/rentals/pa-system.jpg',
    isActive: true,
    displayOrder: 4
  },
  {
    id: '5',
    itemKey: 'cordlessMike',
    description: 'Cordless Hand Mike',
    costFor3Days: 2000,
    category: 'AV',
    imageUrl: '/rentals/microphone.jpg',
    isActive: true,
    displayOrder: 5
  },
  {
    id: '6',
    itemKey: 'tv42',
    description: 'LCD / LED TV 42"',
    costFor3Days: 12000,
    category: 'AV',
    imageUrl: '/rentals/tv-42.jpg',
    isActive: true,
    displayOrder: 6
  },
  {
    id: '7',
    itemKey: 'tv50',
    description: 'LCD / LED TV 50"',
    costFor3Days: 16000,
    category: 'AV',
    imageUrl: '/rentals/tv-50.jpg',
    isActive: false,
    displayOrder: 7
  },
  {
    id: '8',
    itemKey: 'tv55',
    description: 'LCD / LED TV 55"',
    costFor3Days: 25000,
    category: 'AV',
    imageUrl: '/rentals/tv-55.jpg',
    isActive: true,
    displayOrder: 8
  }
];

export default function AdminRentalItemsPage() {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<RentalItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<Partial<RentalItem>>({
    itemKey: '',
    description: '',
    costFor3Days: 0,
    category: 'AV',
    isActive: true,
    displayOrder: 1
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setItems(dummyItems);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: RentalItem = {
      id: editingItem?.id || Date.now().toString(),
      itemKey: formData.itemKey!,
      description: formData.description!,
      costFor3Days: formData.costFor3Days!,
      category: formData.category as 'AV' | 'IT' | 'Other',
      imageUrl: imagePreview || editingItem?.imageUrl || '/rentals/placeholder.jpg',
      isActive: formData.isActive!,
      displayOrder: formData.displayOrder!
    };

    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? newItem : i));
      setSuccessMessage('Item updated successfully');
    } else {
      setItems(prev => [...prev, newItem]);
      setSuccessMessage('Item added successfully');
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    setItems(prev => prev.filter(i => i.id !== id));
    setSuccessMessage('Item deleted successfully');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleToggleActive = (item: RentalItem) => {
    setItems(prev => 
      prev.map(i => i.id === item.id ? { ...i, isActive: !i.isActive } : i)
    );
    setSuccessMessage(`Item ${item.isActive ? 'deactivated' : 'activated'} successfully`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resetForm = () => {
    setFormData({
      itemKey: '',
      description: '',
      costFor3Days: 0,
      category: 'AV',
      isActive: true,
      displayOrder: items.length + 1
    });
    setImagePreview(null);
    setEditingItem(null);
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
            <h1 className="text-2xl font-bold text-gray-900">AV & IT Rental Items</h1>
            <p className="text-sm text-gray-600 mt-1">Manage rental items with pricing</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Item
          </button>
        </div>

        {showSuccess && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
              !item.isActive ? 'opacity-60' : ''
            }`}>
              <div className="aspect-video bg-gray-100 relative">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ComputerDesktopIcon className="h-12 w-12 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.category === 'AV' ? 'bg-purple-100 text-purple-800' :
                    item.category === 'IT' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {item.itemKey}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.description}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-blue-600">₹{item.costFor3Days.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">for 3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className="p-1 text-gray-600 hover:text-gray-900"
                      title={item.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {item.isActive ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setFormData(item);
                        setImagePreview(item.imageUrl);
                        setShowModal(true);
                      }}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingItem ? 'Edit Rental Item' : 'Add New Rental Item'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                        {imagePreview ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <PhotoIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="cursor-pointer inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setImagePreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Key</label>
                    <input
                      type="text"
                      value={formData.itemKey}
                      onChange={(e) => setFormData({...formData, itemKey: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="e.g., lcdProjector"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="Item description"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost for 3 Days (₹)</label>
                    <input
                      type="number"
                      value={formData.costFor3Days}
                      onChange={(e) => setFormData({...formData, costFor3Days: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option value="AV">AV Equipment</option>
                      <option value="IT">IT Equipment</option>
                      <option value="Other">Other</option>
                    </select>
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
                      {editingItem ? 'Update' : 'Save'}
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