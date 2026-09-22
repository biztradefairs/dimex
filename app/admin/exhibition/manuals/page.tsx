"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Calendar, 
  User, 
  File,
  BookOpen,
  Edit2,
  Download
} from 'lucide-react';
import manualApi, { Manual, ManualFilters, ManualStatistics, ImportantDate, ApiError } from '@/lib/api/manualApi';

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
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([
    { label: 'Setup Begins', dateLabel: '' },
    { label: 'Event Days', dateLabel: '' },
    { label: 'Breakdown', dateLabel: '' },
    { label: 'Requirements Due', dateLabel: '' },
  ]);
  const [savingDates, setSavingDates] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories: string[] = ['all', 'Setup', 'Safety', 'Marketing', 'Technical', 'Logistics', 'Procedures', 'General', 'Rules', 'Contact'];

  // Fetch manuals on component mount and when filters change
  useEffect(() => {
    fetchManuals();
    fetchStatistics();
    fetchImportantDates();
  }, [selectedCategory, search]);

  const fetchManuals = async (): Promise<void> => {
    try {
      setLoading(true);
      const filters: ManualFilters = {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: search || undefined
      };
      const response = await manualApi.getManuals(filters);
      setManuals(response.data || []);
    } catch (error) {
      console.error('Error fetching manuals:', error);
      setManuals([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async (): Promise<void> => {
    try {
      const response = await manualApi.getStatistics();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchImportantDates = async (): Promise<void> => {
    try {
      const response = await manualApi.getImportantDates();
      if (response.data?.length) {
        setImportantDates(response.data);
      }
    } catch (error) {
      console.error('Error fetching important dates:', error);
    }
  };

  const saveImportantDates = async (): Promise<void> => {
    const dates = importantDates
      .map((item) => ({
        label: item.label.trim(),
        dateLabel: item.dateLabel.trim(),
      }))
      .filter((item) => item.label && item.dateLabel);

    if (!dates.length) {
      alert('Add at least one important date');
      return;
    }

    try {
      setSavingDates(true);
      await manualApi.saveImportantDates(dates);
      await fetchImportantDates();
      alert('Important dates saved');
    } catch (error) {
      console.error('Error saving important dates:', error);
      alert('Failed to save important dates');
    } finally {
      setSavingDates(false);
    }
  };

  const handleDelete = async (id: string, type?: string): Promise<void> => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        // No need to check token - axios interceptor handles it automatically
        if (type === 'section') {
          await manualApi.deleteSection(id);
        } else {
          await manualApi.deleteManual(id);
        }
        
        // Refresh the list
        await fetchManuals();
        await fetchStatistics();
        alert('Deleted successfully');
      } catch (error) {
        if (error instanceof ApiError) {
          console.error('Delete error:', error);
          if (error.status === 401) {
            alert('Session expired. Please login again.');
            router.push('/admin/login');
          } else {
            alert(`Failed to delete: ${error.message}`);
          }
        } else {
          alert('Failed to delete');
        }
      }
    }
  };

  const handleDownload = async (id: string, type?: string): Promise<void> => {
    if (type === 'section') {
      // For text sections, show content in a new window
      const section = manuals.find(m => m.id === id);
      if (section) {
        const win = window.open('', '_blank');
        if (win) {
          win.document.write(`
            <html>
              <head>
                <title>${section.title}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
                  h1 { color: #333; }
                  .content { white-space: pre-line; }
                  .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
                </style>
              </head>
              <body>
                <h1>${section.title}</h1>
                <div class="meta">Category: ${section.category}</div>
                <div class="content">${section.description}</div>
              </body>
            </html>
          `);
        }
      }
    } else {
      await manualApi.downloadManual(id);
    }
  };

  const handlePreview = async (id: string, type?: string): Promise<void> => {
    if (type === 'section') {
      const section = manuals.find(m => m.id === id);
      if (section) {
        alert(section.description);
      }
    } else {
      await manualApi.previewManual(id);
    }
  };

  const handleCreateNew = (): void => {
    router.push('/admin/exhibition/manuals/add');
  };

  const handleEdit = (id: string, type?: string): void => {
    if (type === 'section') {
      router.push(`/admin/exhibition/manuals/edit/${id}`);
    } else {
      router.push(`/admin/exhibition/manuals/edit/${id}`);
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Setup': 'bg-blue-100 text-blue-800',
      'Safety': 'bg-red-100 text-red-800',
      'Marketing': 'bg-purple-100 text-purple-800',
      'Technical': 'bg-orange-100 text-orange-800',
      'Logistics': 'bg-yellow-100 text-yellow-800',
      'Procedures': 'bg-indigo-100 text-indigo-800',
      'General': 'bg-gray-100 text-gray-800',
      'Rules': 'bg-pink-100 text-pink-800',
      'Contact': 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exhibitor Manuals</h1>
          <p className="text-gray-600">Manage exhibitor manuals and documentation</p>
        </div>
        <div className="flex space-x-3">
          <label className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${uploading ? 'opacity-60 cursor-wait' : 'cursor-pointer'}`}>
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : 'Quick Upload'}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append('file', file);
                formData.append('title', file.name.replace(/\.[^/.]+$/, ""));
                formData.append('description', 'Exhibitor manual document');
                formData.append('category', 'General');
                formData.append('version', '1.0');
                formData.append('status', 'published');
                formData.append('updated_by', 'Admin');

                try {
                  setUploading(true);
                  await manualApi.createManual(formData);
                  await fetchManuals();
                  await fetchStatistics();
                  alert('Document uploaded. Exhibitors can download it from the manual page.');
                } catch (error: unknown) {
                  const message = error && typeof error === 'object' && 'response' in error
                    ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                    : null;
                  alert(message || 'Failed to upload document');
                } finally {
                  setUploading(false);
                  e.target.value = '';
                }
              }}
            />
          </label>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Manual Section
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <File className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.publishedManuals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-yellow-100">
              <BookOpen className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.categoryStats.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-purple-100">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Downloads</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalDownloads}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Important Dates</h2>
            <p className="text-sm text-gray-500">These dates appear on the exhibitor manual page.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setImportantDates((prev) => [...prev, { label: '', dateLabel: '' }])
              }
              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Add date
            </button>
            <button
              type="button"
              onClick={saveImportantDates}
              disabled={savingDates}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {savingDates ? 'Saving...' : 'Save dates'}
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {importantDates.map((item, index) => (
            <div key={`${item.id || 'date'}-${index}`} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <input
                type="text"
                value={item.label}
                onChange={(e) =>
                  setImportantDates((prev) =>
                    prev.map((date, i) => (i === index ? { ...date, label: e.target.value } : date))
                  )
                }
                placeholder="Label, e.g. Event Days"
                className="sm:col-span-5 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={item.dateLabel}
                onChange={(e) =>
                  setImportantDates((prev) =>
                    prev.map((date, i) => (i === index ? { ...date, dateLabel: e.target.value } : date))
                  )
                }
                placeholder="Date, e.g. 24–26 Mar 2027"
                className="sm:col-span-5 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => setImportantDates((prev) => prev.filter((_, i) => i !== index))}
                className="sm:col-span-2 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-md hover:bg-red-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

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
              Add Your First Manual Section
            </button>
          </div>
        ) : (
          manuals.map((manual) => (
            <div key={manual.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {manual.type === 'section' ? (
                        <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      )}
                      <h3 className="text-lg font-medium text-gray-900 truncate" title={manual.title}>
                        {manual.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2" title={manual.description}>
                      {manual.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(manual.category)}`}>
                    {manual.category}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {manual.version && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-16">Version:</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{manual.version}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{new Date(manual.last_updated).toLocaleDateString()}</span>
                    </div>
                    <span className="text-gray-600">{manual.file_size}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="truncate">Updated by: {manual.updated_by}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-16">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      manual.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {manual.status}
                    </span>
                  </div>
                  {manual.type === 'section' && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-16">Type:</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                        Text Section
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Downloads</p>
                    <p className="text-lg font-semibold text-gray-900">{manual.downloads || 0}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(manual.id, manual.type)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(manual.id, manual.type)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(manual.id, manual.type)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
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