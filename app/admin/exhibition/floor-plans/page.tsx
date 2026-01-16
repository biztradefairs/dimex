// app/admin/exhibition/floor-plans/page.tsx
"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, Download, Upload, Layers, Building, Eye, Grid } from 'lucide-react';

interface FloorPlan {
  id: string;
  name: string;
  floorNumber: string;
  totalArea: string;
  capacity: number;
  fileType: string;
  lastUpdated: string;
  exhibitorsCount: number;
}

export default function FloorPlansPage() {
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([
    {
      id: '1',
      name: 'Ground Floor',
      floorNumber: 'GF',
      totalArea: '25,000 sq ft',
      capacity: 120,
      fileType: 'PDF',
      lastUpdated: '2024-01-15',
      exhibitorsCount: 45
    },
    {
      id: '2',
      name: 'First Floor',
      floorNumber: '1F',
      totalArea: '18,500 sq ft',
      capacity: 80,
      fileType: 'DWG',
      lastUpdated: '2024-01-14',
      exhibitorsCount: 32
    },
    {
      id: '3',
      name: 'Second Floor',
      floorNumber: '2F',
      totalArea: '15,000 sq ft',
      capacity: 60,
      fileType: 'PDF',
      lastUpdated: '2024-01-13',
      exhibitorsCount: 25
    },
    {
      id: '4',
      name: 'Conference Level',
      floorNumber: 'CL',
      totalArea: '12,000 sq ft',
      capacity: 40,
      fileType: 'JPG',
      lastUpdated: '2024-01-12',
      exhibitorsCount: 18
    }
  ]);

  const [selectedFloor, setSelectedFloor] = useState<string>('1');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this floor plan?')) {
      setFloorPlans(floorPlans.filter(plan => plan.id !== id));
    }
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.dwg';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        alert(`Uploading ${target.files[0].name}...`);
      }
    };
    input.click();
  };

  const selectedFloorPlan = floorPlans.find(plan => plan.id === selectedFloor);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Floor Plans</h1>
          <p className="text-gray-600">Manage and view exhibition floor layouts</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleUpload}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Plan
          </button>
          <button
            onClick={() => alert('Create new floor plan')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Floor Plan List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Available Floors</h3>
              <div className="space-y-3">
                {floorPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedFloor(plan.id)}
                    className={`w-full text-left p-4 rounded-lg border ${
                      selectedFloor === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Building className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{plan.name}</p>
                          <p className="text-sm text-gray-500">Floor {plan.floorNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{plan.exhibitorsCount} exhibitors</p>
                        <p className="text-xs text-gray-500">{plan.totalArea}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Floor Statistics</h3>
            <div className="space-y-4">
              {floorPlans.map((plan) => (
                <div key={plan.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{plan.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">{plan.exhibitorsCount} exhibitors</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{plan.capacity} capacity</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floor Plan Viewer */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedFloorPlan?.name} - Floor {selectedFloorPlan?.floorNumber}
                  </h2>
                  <p className="text-gray-600">{selectedFloorPlan?.totalArea} • Capacity: {selectedFloorPlan?.capacity} exhibitors</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => alert(`Preview ${selectedFloorPlan?.name}`)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Preview"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => alert(`Download ${selectedFloorPlan?.name}`)}
                    className="text-green-600 hover:text-green-900"
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => alert(`Edit ${selectedFloorPlan?.name}`)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedFloorPlan?.id || '')}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Floor Plan Grid (Mock) */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-8 gap-2 mb-4">
                  {[...Array(64)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded flex items-center justify-center ${
                        i % 8 === 0 || i % 8 === 7 || i < 8 || i >= 56
                          ? 'bg-gray-200'
                          : Math.random() > 0.3
                          ? 'bg-white border border-gray-300'
                          : 'bg-blue-100 border border-blue-300'
                      }`}
                    >
                      {i % 8 === 0 || i % 8 === 7 || i < 8 || i >= 56 ? (
                        <span className="text-xs text-gray-500">Wall</span>
                      ) : Math.random() > 0.3 ? (
                        <span className="text-xs text-gray-400">Empty</span>
                      ) : (
                        <div className="text-center">
                          <Building className="h-3 w-3 mx-auto text-blue-600" />
                          <span className="text-xs text-blue-600">Booth</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-white border border-gray-300 mr-2"></div>
                    <span className="text-sm text-gray-600">Available Space</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-blue-100 border border-blue-300 mr-2"></div>
                    <span className="text-sm text-gray-600">Occupied Booth</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-gray-200 mr-2"></div>
                    <span className="text-sm text-gray-600">Walls/Barriers</span>
                  </div>
                </div>
              </div>

              {/* Floor Details */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Exhibitors</p>
                  <p className="text-xl font-bold text-gray-900">{selectedFloorPlan?.exhibitorsCount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="text-xl font-bold text-gray-900">{selectedFloorPlan?.capacity}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">File Type</p>
                  <p className="text-xl font-bold text-gray-900">{selectedFloorPlan?.fileType}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedFloorPlan ? new Date(selectedFloorPlan.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}