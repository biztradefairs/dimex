// app/admin/exhibition/layout/page.tsx
"use client";

import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Grid, 
  Map, 
  Building,
  Eye
} from 'lucide-react';

interface Layout {
  id: string;
  name: string;
  description: string;
  floor: string;
  version: string;
  lastUpdated: string;
  fileSize: string;
  status: 'published' | 'draft';
}

export default function LayoutPlansPage() {
  const [layouts, setLayouts] = useState<Layout[]>([
    {
      id: '1',
      name: 'Main Exhibition Hall',
      description: 'Complete layout of the main exhibition area',
      floor: 'Ground Floor',
      version: '3.2',
      lastUpdated: '2024-01-15',
      fileSize: '4.7 MB',
      status: 'published'
    },
    {
      id: '2',
      name: 'Technology Pavilion',
      description: 'Tech companies and software providers area',
      floor: 'First Floor',
      version: '2.1',
      lastUpdated: '2024-01-14',
      fileSize: '3.2 MB',
      status: 'published'
    },
    {
      id: '3',
      name: 'Food Court & Lounge',
      description: 'Dining and networking areas layout',
      floor: 'Ground Floor',
      version: '1.4',
      lastUpdated: '2024-01-13',
      fileSize: '2.8 MB',
      status: 'draft'
    },
    {
      id: '4',
      name: 'Conference Rooms',
      description: 'Speaker sessions and workshop rooms',
      floor: 'Second Floor',
      version: '2.0',
      lastUpdated: '2024-01-12',
      fileSize: '3.5 MB',
      status: 'published'
    },
    {
      id: '5',
      name: 'Registration Area',
      description: 'Check-in counters and information desk',
      floor: 'Ground Floor',
      version: '1.2',
      lastUpdated: '2024-01-11',
      fileSize: '1.9 MB',
      status: 'published'
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this layout plan?')) {
      setLayouts(layouts.filter(layout => layout.id !== id));
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      const file = files[0];
      
      // Simulate upload process
      setTimeout(() => {
        const newLayout: Layout = {
          id: (layouts.length + 1).toString(),
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          description: 'Uploaded layout plan',
          floor: 'New Floor',
          version: '1.0',
          lastUpdated: new Date().toISOString().split('T')[0],
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          status: 'draft'
        };
        
        setLayouts([...layouts, newLayout]);
        setIsUploading(false);
        alert('Layout plan uploaded successfully!');
      }, 1500);
    }
  };

  const handleDownload = (id: string) => {
    const layout = layouts.find(l => l.id === id);
    alert(`Downloading ${layout?.name}...`);
  };

  const handlePreview = (id: string) => {
    const layout = layouts.find(l => l.id === id);
    alert(`Previewing ${layout?.name}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Layout Plans</h1>
          <p className="text-gray-600">Manage exhibition hall layouts and floor plans</p>
        </div>
        <div className="flex space-x-3">
          <label className="cursor-pointer">
            <div className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload Layout'}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept=".pdf,.jpg,.jpeg,.png,.dwg"
              disabled={isUploading}
            />
          </label>
          <button
            onClick={() => alert('Create new layout')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Layout
          </button>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layouts.map((layout) => (
          <div key={layout.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <Map className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">{layout.name}</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{layout.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  layout.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {layout.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Floor: {layout.floor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Version: {layout.version}</span>
                  <span className="text-gray-600">{layout.fileSize}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Updated: {new Date(layout.lastUpdated).toLocaleDateString()}
                </div>
              </div>
              
              {/* Layout Preview (Mock) */}
              <div className="mt-4 bg-gray-100 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white border border-gray-300 rounded flex items-center justify-center">
                      <Grid className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Layout preview - {layout.name}
                </p>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePreview(layout.id)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Preview"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(layout.id)}
                    className="text-green-600 hover:text-green-900"
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => alert(`Edit ${layout.name}`)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(layout.id)}
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

      {/* No layouts message */}
      {layouts.length === 0 && (
        <div className="text-center py-12">
          <Map className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No layout plans yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload your first layout plan to get started.
          </p>
        </div>
      )}
    </div>
  );
}