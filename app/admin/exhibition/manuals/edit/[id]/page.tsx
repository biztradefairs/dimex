// app/admin/exhibition/manuals/edit/[id]/page.tsx
"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import manualApi, { Manual } from '@/lib/api/manualApi';

interface ManualFormData {
  title: string;
  description: string;
  category: string;
  version: string;
  status: 'published' | 'draft';
  updated_by: string;
}

export default function EditManualPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [originalManual, setOriginalManual] = useState<Manual | null>(null);
  const [formData, setFormData] = useState<ManualFormData>({
    title: '',
    description: '',
    category: 'Setup',
    version: '1.0',
    status: 'draft',
    updated_by: 'Admin'
  });

  const categories = [
    'Setup',
    'Safety',
    'Marketing',
    'Technical',
    'Logistics',
    'Procedures'
  ];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Setup':
        return '🛠️';
      case 'Safety':
        return '⚠️';
      case 'Marketing':
        return '📢';
      case 'Technical':
        return '💻';
      case 'Logistics':
        return '📦';
      case 'Procedures':
        return '📋';
      default:
        return '📄';
    }
  };

  useEffect(() => {
    fetchManual();
  }, [id]);

  const fetchManual = async () => {
    try {
      setLoading(true);
      const response = await manualApi.getManual(id);
      const manual = response.data;
      setOriginalManual(manual);
      setFormData({
        title: manual.title,
        description: manual.description || '',
        category: manual.category,
        version: manual.version,
        status: manual.status,
        updated_by: manual.updated_by
      });
    } catch (error) {
      console.error('Error fetching manual:', error);
      alert('Failed to fetch manual details');
      router.push('/admin/exhibition/manuals');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError('');

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.');
      setFile(null);
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      setFileError('File size must be less than 10MB');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (file) {
        formDataToSend.append('file', file);
      }

      await manualApi.updateManual(id, formDataToSend);
      
      router.push('/admin/exhibition/manuals');
      router.refresh();
    } catch (error) {
      console.error('Error updating manual:', error);
      alert('Failed to update manual. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/exhibition/manuals');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading manual details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Manual</h1>
          <p className="text-gray-600">Update manual details and upload a new version if needed</p>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Editing: {originalManual?.title}</h2>
        <p className="text-blue-100">
          You can update the manual details below. Uploading a new file will replace the existing one.
          Don't forget to update the version number if you're making significant changes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current File Info */}
        {originalManual && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current File</h3>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <DocumentIcon className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{originalManual.file_name}</p>
                <p className="text-xs text-gray-500">{originalManual.file_size}</p>
              </div>
            </div>
          </div>
        )}

        {/* File Upload Section - Optional for update */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Version (Optional)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4 flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Click to upload new version</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">(leave empty to keep current file)</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, TXT up to 10MB
              </p>
            </div>

            {fileError && (
              <div className="mt-4 flex items-center justify-center text-red-600 text-sm">
                <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                {fileError}
              </div>
            )}

            {file && !fileError && (
              <div className="mt-6 flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <DocumentIcon className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Manual Details Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Manual Details</h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative">
                <select
                  name="category"
                  id="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <span className="text-lg">{getCategoryIcon(formData.category)}</span>
                </div>
              </div>
            </div>

            {/* Version */}
            <div>
              <label htmlFor="version" className="block text-sm font-medium text-gray-700">
                Version
              </label>
              <input
                type="text"
                name="version"
                id="version"
                value={formData.version}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="draft">Draft (Hidden from exhibitors)</option>
                <option value="published">Published (Visible to exhibitors)</option>
              </select>
            </div>

            {/* Updated By */}
            <div>
              <label htmlFor="updated_by" className="block text-sm font-medium text-gray-700">
                Updated By
              </label>
              <input
                type="text"
                name="updated_by"
                id="updated_by"
                value={formData.updated_by}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">📝 Update Tips</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• Update the version number when uploading a new file</li>
            <li>• Changes will be visible to exhibitors immediately if status is "published"</li>
            <li>• You can keep manuals in "draft" while making multiple updates</li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              saving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}