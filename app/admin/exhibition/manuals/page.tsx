// app/admin/exhibition/manuals/page.tsx
"use client";

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Download, Upload, FileText, Calendar, User, Eye } from 'lucide-react';

interface Manual {
  id: string;
  title: string;
  description: string;
  category: string;
  version: string;
  fileSize: string;
  lastUpdated: string;
  updatedBy: string;
  downloads: number;
  status: 'published' | 'draft';
}

export default function ExhibitorManualsPage() {
  const [search, setSearch] = useState('');
  const [manuals, setManuals] = useState<Manual[]>([
    {
      id: '1',
      title: 'Exhibitor Setup Guide 2024',
      description: 'Complete guide for booth setup and preparation',
      category: 'Setup',
      version: '2.1',
      fileSize: '3.4 MB',
      lastUpdated: '2024-01-15',
      updatedBy: 'Admin',
      downloads: 124,
      status: 'published'
    },
    {
      id: '2',
      title: 'Safety Regulations Manual',
      description: 'Safety requirements and compliance guidelines',
      category: 'Safety',
      version: '1.3',
      fileSize: '2.8 MB',
      lastUpdated: '2024-01-14',
      updatedBy: 'Safety Officer',
      downloads: 89,
      status: 'published'
    },
    {
      id: '3',
      title: 'Marketing Guidelines',
      description: 'Branding and marketing rules for exhibitors',
      category: 'Marketing',
      version: '1.2',
      fileSize: '1.9 MB',
      lastUpdated: '2024-01-13',
      updatedBy: 'Marketing Dept',
      downloads: 67,
      status: 'published'
    },
    {
      id: '4',
      title: 'Technical Requirements',
      description: 'Power, internet, and technical specifications',
      category: 'Technical',
      version: '3.0',
      fileSize: '4.2 MB',
      lastUpdated: '2024-01-12',
      updatedBy: 'Technical Team',
      downloads: 54,
      status: 'draft'
    },
    {
      id: '5',
      title: 'Shipping & Logistics Guide',
      description: 'Instructions for shipping materials to venue',
      category: 'Logistics',
      version: '2.4',
      fileSize: '2.5 MB',
      lastUpdated: '2024-01-11',
      updatedBy: 'Logistics Team',
      downloads: 102,
      status: 'published'
    },
    {
      id: '6',
      title: 'Post-Event Procedures',
      description: 'Tear-down and post-event instructions',
      category: 'Procedures',
      version: '1.1',
      fileSize: '1.7 MB',
      lastUpdated: '2024-01-10',
      updatedBy: 'Admin',
      downloads: 45,
      status: 'published'
    }
  ]);

  const categories = ['all', 'Setup', 'Safety', 'Marketing', 'Technical', 'Logistics', 'Procedures'];

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this manual?')) {
      setManuals(manuals.filter(manual => manual.id !== id));
    }
  };

  const handleDownload = (id: string) => {
    const manual = manuals.find(m => m.id === id);
    if (manual) {
      setManuals(manuals.map(m => 
        m.id === id ? { ...m, downloads: m.downloads + 1 } : m
      ));
      alert(`Downloading "${manual.title}"...`);
    }
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const newManual: Manual = {
          id: (manuals.length + 1).toString(),
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: 'New uploaded manual',
          category: 'Setup',
          version: '1.0',
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          lastUpdated: new Date().toISOString().split('T')[0],
          updatedBy: 'Admin',
          downloads: 0,
          status: 'draft'
        };
        setManuals([...manuals, newManual]);
        alert('Manual uploaded successfully!');
      }
    };
    input.click();
  };

  const filteredManuals = manuals.filter(manual =>
    manual.title.toLowerCase().includes(search.toLowerCase()) ||
    manual.description.toLowerCase().includes(search.toLowerCase()) ||
    manual.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exhibitor Manuals</h1>
          <p className="text-gray-600">Manage exhibitor manuals and documentation</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleUpload}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Manual
          </button>
          <button
            onClick={() => alert('Create new manual')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Manual
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Manuals</p>
              <p className="text-2xl font-semibold text-gray-900">{manuals.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-green-100">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Downloads</p>
              <p className="text-2xl font-semibold text-gray-900">
                {manuals.reduce((sum, manual) => sum + manual.downloads, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-purple-100">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-2xl font-semibold text-gray-900">
                {manuals.filter(m => m.status === 'published').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search manuals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <select className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Manuals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredManuals.map((manual) => (
          <div key={manual.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">{manual.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{manual.description}</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {manual.category}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Version:</span>
                  <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">{manual.version}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{new Date(manual.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  <span className="text-gray-600">{manual.fileSize}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Updated by: {manual.updatedBy}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Downloads</p>
                  <p className="text-lg font-semibold text-gray-900">{manual.downloads}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => alert(`Preview ${manual.title}`)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Preview"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(manual.id)}
                    className="text-green-600 hover:text-green-900"
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => alert(`Edit ${manual.title}`)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(manual.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}