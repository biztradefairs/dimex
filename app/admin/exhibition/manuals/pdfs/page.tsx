// app/admin/manual/pdfs/page.tsx
'use client';

import { useState } from 'react';
import {
  DocumentIcon,
  CloudArrowUpIcon,
  TrashIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';

interface PDFFile {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  category: string;
  url: string;
}

export default function ManualPDFsPage() {
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [file, setFile] = useState<File | null>(null);
  const [token] = useState(localStorage.getItem('token'));

  const categories = ['general', 'setup', 'rules', 'contact', 'forms'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        alert('Only PDF files are allowed');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);

    try {
      const response = await fetch(`${API_BASE_URL}/api/manuals/upload-pdf`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('PDF uploaded successfully');
        setTitle('');
        setFile(null);
        // Refresh PDF list
        fetchPDFs();
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    } finally {
      setUploading(false);
    }
  };

  const fetchPDFs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/manuals/pdfs`);
      const data = await response.json();
      setPdfs(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">PDF Documents</h1>
        
        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Upload New PDF</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PDF File
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <CloudArrowUpIcon className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload PDF'}
            </button>
          </form>
        </div>

        {/* PDF List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">All PDFs</h2>
          </div>
          
          <div className="divide-y">
            {pdfs.map((pdf) => (
              <div key={pdf.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h3 className="font-medium">{pdf.title}</h3>
                    <p className="text-xs text-gray-500">
                      {pdf.fileName} • {pdf.fileSize}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={pdf.url}
                    download
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </a>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}