// app/dashboard/requirements/page.tsx
'use client';

import { useState } from 'react';
import { PlusIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';

// Define TypeScript interfaces
interface Requirement {
  id: string;
  type: string;
  description: string;
  quantity: number;
  status: 'approved' | 'pending' | 'rejected';
  cost: number;
  furnitureCode?: string;
  layoutType?: string;
  date?: string;
}

interface NewRequirementForm {
  type: string;
  description: string;
  furnitureCode: string;
  quantity: number;
  layoutType: string;
  date: string;
}

const initialRequirements: Requirement[] = [
  {
    id: 'REQ001',
    type: 'electrical',
    description: 'Additional power outlet (220V)',
    quantity: 2,
    status: 'approved',
    cost: 150
  },
  {
    id: 'REQ002',
    type: 'furniture',
    description: 'Extra chairs',
    quantity: 4,
    status: 'pending',
    cost: 80,
    furnitureCode: 'CHAIR-001'
  },
  {
    id: 'REQ003',
    type: 'display',
    description: 'TV monitor (55")',
    quantity: 1,
    status: 'pending',
    cost: 200
  }
];

// Sample furniture codes from brochure
const furnitureCodes = [
  { code: 'CHAIR-001', name: 'Conference Chair Executive', price: 2500 },
  { code: 'CHAIR-002', name: 'Banquet Chair Premium', price: 1800 },
  { code: 'CHAIR-003', name: 'Folding Chair Standard', price: 600 },
  { code: 'TABLE-001', name: 'Round Table (6ft)', price: 3500 },
  { code: 'TABLE-002', name: 'Rectangular Table (8ft)', price: 4200 },
  { code: 'SOFA-001', name: '3-Seater Sofa Luxury', price: 25000 },
  { code: 'SOFA-002', name: 'Modular Sectional Set', price: 45000 },
];

const layoutOptions = [
  { id: 'conference', name: 'Conference Style' },
  { id: 'classroom', name: 'Classroom Style' },
  { id: 'theater', name: 'Theater Style' },
  { id: 'u-shape', name: 'U-Shape' },
  { id: 'banquet', name: 'Banquet Style' },
  { id: 'exhibition', name: 'Exhibition Stall' },
];

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('furniture');
  const [newRequirement, setNewRequirement] = useState<NewRequirementForm>({
    type: 'furniture',
    description: '',
    furnitureCode: '',
    quantity: 1,
    layoutType: 'conference',
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const furnitureItem = furnitureCodes.find(item => item.code === newRequirement.furnitureCode);
    const cost = furnitureItem ? furnitureItem.price * newRequirement.quantity : 0;

    const newReq: Requirement = {
      id: `REQ${(requirements.length + 1).toString().padStart(3, '0')}`,
      type: newRequirement.type,
      description: newRequirement.description || furnitureItem?.name || '',
      quantity: newRequirement.quantity,
      status: 'pending',
      cost: cost,
      furnitureCode: newRequirement.furnitureCode,
      layoutType: newRequirement.layoutType,
      date: newRequirement.date
    };
    
    setRequirements([...requirements, newReq]);
    resetForm();
  };

  const resetForm = () => {
    setNewRequirement({
      type: 'furniture',
      description: '',
      furnitureCode: '',
      quantity: 1,
      layoutType: 'conference',
      date: ''
    });
    setShowForm(false);
  };

  const getStatusIcon = (status: Requirement['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
    }
  };

  // Helper function to get furniture name from code
  const getFurnitureName = (code: string) => {
    const item = furnitureCodes.find(f => f.code === code);
    return item ? item.name : null;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Extra Requirements</h1>
          <p className="text-gray-600 mt-1">Manage your additional event requirements</p>
        </div>
        <div className="flex gap-3">
          <a
            href="/furniture-brochure.pdf"
            download
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            📥 Download Furniture Brochure
          </a>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            {showForm ? 'Cancel' : 'New Requirement'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-500">Total Requirements</p>
          <p className="text-2xl font-bold text-gray-900">{requirements.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {requirements.filter(r => r.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {requirements.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-2xl font-bold text-blue-600">
            ₹{requirements.reduce((sum, req) => sum + (req.cost || 0), 0)}
          </p>
        </div>
      </div>

      {/* Requirement Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Add New Requirement</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirement Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['furniture', 'electrical', 'audio_visual', 'other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(type);
                        setNewRequirement({...newRequirement, type});
                      }}
                      className={`p-4 rounded-lg border text-left transition ${
                        selectedCategory === type
                          ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-medium capitalize">
                        {type.replace('_', ' ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Furniture-specific fields */}
              {selectedCategory === 'furniture' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Furniture Code (From Brochure)
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newRequirement.furnitureCode}
                        onChange={(e) => {
                          const code = e.target.value;
                          setNewRequirement({...newRequirement, furnitureCode: code});
                          
                          // Auto-fill description if code matches
                          const item = furnitureCodes.find(f => f.code === code);
                          if (item) {
                            setNewRequirement(prev => ({
                              ...prev,
                              description: item.name
                            }));
                          }
                        }}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter furniture code (e.g., CHAIR-001)"
                        required
                      />
                      {newRequirement.furnitureCode && getFurnitureName(newRequirement.furnitureCode) && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <p className="text-sm font-medium text-green-800">
                            ✓ {getFurnitureName(newRequirement.furnitureCode)}
                          </p>
                        </div>
                      )}
                      {newRequirement.furnitureCode && !getFurnitureName(newRequirement.furnitureCode) && (
                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                          <p className="text-sm font-medium text-yellow-800">
                            ⚠️ Code not found. Please check the brochure and enter correct code.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Layout Style
                    </label>
                    <select
                      value={newRequirement.layoutType}
                      onChange={(e) => setNewRequirement({...newRequirement, layoutType: e.target.value})}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {layoutOptions.map((layout) => (
                        <option key={layout.id} value={layout.id}>
                          {layout.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Common fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newRequirement.description}
                    onChange={(e) => setNewRequirement({...newRequirement, description: e.target.value})}
                    className="w-full border rounded-lg p-3 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your requirement..."
                    required
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newRequirement.quantity}
                      onChange={(e) => setNewRequirement({...newRequirement, quantity: parseInt(e.target.value) || 1})}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Date
                    </label>
                    <input
                      type="date"
                      value={newRequirement.date}
                      onChange={(e) => setNewRequirement({...newRequirement, date: e.target.value})}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Requirement
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Requirements Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">All Requirements</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Layout
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requirements.map((requirement) => (
                <tr key={requirement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {requirement.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {requirement.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{requirement.description}</div>
                    {requirement.furnitureCode && (
                      <div className="text-xs text-gray-500 mt-1">
                        Code: <span className="font-mono">{requirement.furnitureCode}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {requirement.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {requirement.layoutType || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {requirement.date || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(requirement.status)}
                      <span className="ml-2 text-sm font-medium capitalize">
                        {requirement.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{requirement.cost || 'TBD'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          📋 How to Add Furniture Requirements
        </h3>
        <ol className="space-y-3 text-blue-700">
          <li className="flex items-start">
            <span className="font-semibold mr-2">1.</span>
            <span>Download the furniture brochure using the button above</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">2.</span>
            <span>Review furniture codes, descriptions, and prices in the brochure</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">3.</span>
            <span>Click "New Requirement" and select "Furniture"</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">4.</span>
            <span>Enter the furniture code from the brochure in the text field</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">5.</span>
            <span>The system will auto-fill the description if code is valid</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">6.</span>
            <span>Fill in quantity, layout style, and required date</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">7.</span>
            <span>Submit for approval</span>
          </li>
        </ol>
        
        <div className="mt-4 p-3 bg-white rounded border">
          <h4 className="font-medium text-gray-800 mb-2">📄 Sample Furniture Codes:</h4>
          <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
            {furnitureCodes.slice(0, 4).map(item => (
              <div key={item.code} className="flex justify-between">
                <span className="font-mono">{item.code}</span>
                <span className="text-gray-500">₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}