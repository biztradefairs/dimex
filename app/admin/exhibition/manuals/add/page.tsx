// app/admin/exhibition/manuals/add/page.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import manualApi from '@/lib/api/manualApi';

interface ManualFormData {
  title: string;
  description: string;
  category: string;
  version: string;
  status: 'published' | 'draft';
  updated_by: string;
}

export default function AddManualPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
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
    
    // Auto-fill title from filename if empty
    if (!formData.title) {
      const fileNameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
      setFormData(prev => ({ ...prev, title: fileNameWithoutExt }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file) {
      setFileError('Please select a file to upload');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('version', formData.version);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('updated_by', formData.updated_by);

      await manualApi.createManual(formDataToSend);
      
      // Redirect to manuals list page
      router.push('/admin/exhibition/manuals');
      router.refresh(); // Refresh the page data
    } catch (error) {
      console.error('Error creating manual:', error);
      alert('Failed to create manual. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/exhibition/manuals');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Manual</h1>
        <p className="text-gray-600">Upload a new exhibitor manual</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        {/* File Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX, TXT up to 10MB
            </p>
          </div>

          {fileError && (
            <div className="mt-4 flex items-center text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {fileError}
            </div>
          )}

          {file && !fileError && (
            <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
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
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
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

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              name="category"
              id="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

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
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

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

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !file}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (loading || !file) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Uploading...' : 'Upload Manual'}
          </button>
        </div>
      </form>
    </div>
  );
}