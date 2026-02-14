// app/admin/exhibition/manuals/page.tsx
"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Edit, Trash2, Download, Upload, FileText, Calendar, User, Eye } from 'lucide-react';
import manualApi, { Manual, ManualFilters, ManualStatistics, ApiError } from '@/lib/api/manualApi';

export default function ExhibitorManualsPage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stats, setStats] = useState<ManualStatistics>({
    totalManuals: 0,
    publishedManuals: 0,
    draftManuals: 0,
    totalDownloads: 0,
    categoryStats: []
  });

  const categories: string[] = ['all', 'Setup', 'Safety', 'Marketing', 'Technical', 'Logistics', 'Procedures'];

  // Fetch manuals on component mount and when filters change
  useEffect(() => {
    fetchManuals();
    fetchStatistics();
  }, [selectedCategory, search]);

  const fetchManuals = async (): Promise<void> => {
    try {
      setLoading(true);
      const filters: ManualFilters = {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: search || undefined
      };
      const response = await manualApi.getManuals(filters);
      setManuals(response.data);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Error fetching manuals:', error.message);
        // Don't show alert on initial load if backend is not ready
        if (error.message !== 'Request failed with status code 404') {
          alert(`Failed to fetch manuals: ${error.message}`);
        }
      } else {
        console.error('Error fetching manuals:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async (): Promise<void> => {
    try {
      const response = await manualApi.getStatistics();
      setStats(response.data);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Error fetching statistics:', error.message);
      } else {
        console.error('Error fetching statistics:', error);
      }
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (confirm('Are you sure you want to delete this manual?')) {
      try {
        await manualApi.deleteManual(id);
        setManuals(manuals.filter(manual => manual.id !== id));
        await fetchStatistics(); // Refresh stats
      } catch (error) {
        if (error instanceof ApiError) {
          alert(`Failed to delete manual: ${error.message}`);
        } else {
          alert('Failed to delete manual');
        }
      }
    }
  };

  const handleDownload = async (id: string): Promise<void> => {
    try {
      const result = await manualApi.downloadManual(id);
      if (result.success) {
        // Update local state to reflect download count
        setManuals(manuals.map(m => 
          m.id === id ? { ...m, downloads: m.downloads + 1 } : m
        ));
        await fetchStatistics(); // Refresh stats
      }
    } catch (error) {
      if (error instanceof ApiError) {
        alert(`Failed to download manual: ${error.message}`);
      } else {
        alert('Failed to download manual');
      }
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name.replace(/\.[^/.]+$/, ""));
    formData.append('description', 'New uploaded manual');
    formData.append('category', 'Setup');
    formData.append('version', '1.0');
    formData.append('status', 'draft');
    formData.append('updated_by', 'Admin');

    try {
      await manualApi.createManual(formData);
      await fetchManuals();
      await fetchStatistics();
      alert('Manual uploaded successfully!');
    } catch (error) {
      if (error instanceof ApiError) {
        alert(`Failed to upload manual: ${error.message}`);
      } else {
        alert('Failed to upload manual');
      }
    } finally {
      // Clear the input
      event.target.value = '';
    }
  };

  const handleCreateNew = (): void => {
    router.push('/admin/exhibition/manuals/add');
  };

  const handleEdit = (id: string): void => {
    router.push(`/admin/exhibition/manuals/edit/${id}`);
  };

  const handlePreview = (id: string): void => {
    // You can implement a modal or navigate to preview page
    window.open(`/api/manuals/${id}/preview`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading manuals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exhibitor Manuals</h1>
          <p className="text-gray-600">Manage exhibitor manuals and documentation</p>
        </div>
        <div className="flex space-x-3">
          <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Quick Upload
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleUpload}
            />
          </label>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Manual
          </button>
        </div>
      </div>

      {/* Stats - Only show if we have data */}
      {stats.totalManuals > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Manuals</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalManuals}</p>
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
                <p className="text-2xl font-semibold text-gray-900">{stats.totalDownloads}</p>
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
                <p className="text-2xl font-semibold text-gray-900">{stats.publishedManuals}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <select 
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedCategory}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
          >
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
        {manuals.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No manuals found</p>
            <button
              onClick={handleCreateNew}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Manual
            </button>
          </div>
        ) : (
          manuals.map((manual) => (
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
                      <span>{new Date(manual.last_updated).toLocaleDateString()}</span>
                    </div>
                    <span className="text-gray-600">{manual.file_size}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    <span>Updated by: {manual.updated_by}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      manual.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {manual.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Downloads</p>
                    <p className="text-lg font-semibold text-gray-900">{manual.downloads}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePreview(manual.id)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Preview"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(manual.id)}
                      className="text-green-600 hover:text-green-900 transition-colors"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(manual.id)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(manual.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}