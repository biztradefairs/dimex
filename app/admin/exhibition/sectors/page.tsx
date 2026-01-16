// app/admin/exhibition/sectors/page.tsx
"use client";

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Building, Users, TrendingUp, Filter } from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  description: string;
  exhibitorsCount: number;
  floorArea: string;
  revenue: number;
  status: 'active' | 'inactive';
  color: string;
}

export default function SectorsPage() {
  const [search, setSearch] = useState('');
  const [sectors, setSectors] = useState<Sector[]>([
    {
      id: '1',
      name: 'Rail Transport',
      description: 'Rail freight technology, infrastructure, and services',
      exhibitorsCount: 24,
      floorArea: '5,000 sq ft',
      revenue: 75000,
      status: 'active',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Maritime Logistics',
      description: 'Port operations, shipping, and maritime technology',
      exhibitorsCount: 18,
      floorArea: '4,200 sq ft',
      revenue: 62000,
      status: 'active',
      color: 'bg-teal-500'
    },
    {
      id: '3',
      name: 'Air Cargo',
      description: 'Air freight, airport logistics, and aviation services',
      exhibitorsCount: 15,
      floorArea: '3,800 sq ft',
      revenue: 48000,
      status: 'active',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Warehouse Solutions',
      description: 'Storage, automation, and warehouse management systems',
      exhibitorsCount: 22,
      floorArea: '6,500 sq ft',
      revenue: 85000,
      status: 'active',
      color: 'bg-green-500'
    },
    {
      id: '5',
      name: 'Technology & Software',
      description: 'Logistics software, IoT, and digital solutions',
      exhibitorsCount: 20,
      floorArea: '4,800 sq ft',
      revenue: 72000,
      status: 'active',
      color: 'bg-indigo-500'
    },
    {
      id: '6',
      name: 'Cold Chain Logistics',
      description: 'Temperature-controlled logistics and refrigeration',
      exhibitorsCount: 12,
      floorArea: '2,500 sq ft',
      revenue: 35000,
      status: 'inactive',
      color: 'bg-cyan-500'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newSector, setNewSector] = useState({
    name: '',
    description: '',
    floorArea: '',
    color: 'bg-blue-500'
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this sector? All associated exhibitors will be moved to unassigned.')) {
      setSectors(sectors.filter(sector => sector.id !== id));
    }
  };

  const handleAddSector = () => {
    if (!newSector.name.trim()) {
      alert('Please enter a sector name');
      return;
    }

    const newSectorObj: Sector = {
      id: (sectors.length + 1).toString(),
      name: newSector.name,
      description: newSector.description,
      exhibitorsCount: 0,
      floorArea: newSector.floorArea,
      revenue: 0,
      status: 'active',
      color: newSector.color
    };

    setSectors([...sectors, newSectorObj]);
    setNewSector({ name: '', description: '', floorArea: '', color: 'bg-blue-500' });
    setIsAdding(false);
    alert('Sector added successfully!');
  };

  const filteredSectors = sectors.filter(sector =>
    sector.name.toLowerCase().includes(search.toLowerCase()) ||
    sector.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalExhibitors = sectors.reduce((sum, sector) => sum + sector.exhibitorsCount, 0);
  const totalRevenue = sectors.reduce((sum, sector) => sum + sector.revenue, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sectors Management</h1>
          <p className="text-gray-600">Organize exhibition sectors and categories</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Sector
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Sectors</p>
              <p className="text-2xl font-semibold text-gray-900">{sectors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Exhibitors</p>
              <p className="text-2xl font-semibold text-gray-900">{totalExhibitors}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-purple-100">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sector Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Sector</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sector Name *
                </label>
                <input
                  type="text"
                  value={newSector.name}
                  onChange={(e) => setNewSector({...newSector, name: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Rail Transport"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newSector.description}
                  onChange={(e) => setNewSector({...newSector, description: e.target.value})}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Brief description of the sector..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Floor Area
                </label>
                <input
                  type="text"
                  value={newSector.floorArea}
                  onChange={(e) => setNewSector({...newSector, floorArea: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., 5,000 sq ft"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color Theme
                </label>
                <select
                  value={newSector.color}
                  onChange={(e) => setNewSector({...newSector, color: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="bg-blue-500">Blue</option>
                  <option value="bg-green-500">Green</option>
                  <option value="bg-red-500">Red</option>
                  <option value="bg-yellow-500">Yellow</option>
                  <option value="bg-purple-500">Purple</option>
                  <option value="bg-indigo-500">Indigo</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSector}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Sector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search sectors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSectors.map((sector) => (
          <div key={sector.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className={`h-2 ${sector.color}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{sector.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{sector.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  sector.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {sector.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Exhibitors</p>
                  <p className="text-lg font-semibold text-gray-900">{sector.exhibitorsCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Floor Area</p>
                  <p className="text-lg font-semibold text-gray-900">{sector.floorArea}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Revenue Generated</p>
                <p className="text-lg font-bold text-gray-900">
                  ${sector.revenue.toLocaleString()}
                </p>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => alert(`Edit ${sector.name}`)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Edit"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(sector.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}