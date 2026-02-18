// app/dashboard/manual/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  DocumentIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  
} from '@heroicons/react/24/outline';

import { ManualSection } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';

interface PDFFile {
  id: string;
  title: string;
  file_name: string;
  file_path: string;
  downloadUrl?: string;
}

export default function ManualPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [manualSections, setManualSections] = useState<ManualSection[]>([]);
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [fullManualPdf, setFullManualPdf] = useState<PDFFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const categories = ['all', 'general', 'setup', 'rules', 'contact'];

  // Fetch sections and PDFs from backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch text sections
      console.log('Fetching sections from:', `${API_BASE_URL}/api/manuals/sections`);
      const sectionsResponse = await fetch(`${API_BASE_URL}/api/manuals/sections`);
      
      if (sectionsResponse.ok) {
        const sectionsData = await sectionsResponse.json();
        console.log('Received sections data:', sectionsData);
        
        let sections = [];
        if (sectionsData.success && Array.isArray(sectionsData.data)) {
          sections = sectionsData.data;
        } else if (Array.isArray(sectionsData)) {
          sections = sectionsData;
        } else if (sectionsData.data && Array.isArray(sectionsData.data)) {
          sections = sectionsData.data;
        }
        
        setManualSections(sections);
        
        // Set first section as expanded if available
        if (sections.length > 0) {
          setExpandedSection(sections[0].id);
        }
      }

      // Fetch PDFs
      console.log('Fetching PDFs from:', `${API_BASE_URL}/api/manuals/pdfs`);
      const pdfsResponse = await fetch(`${API_BASE_URL}/api/manuals/pdfs`);
      
      if (pdfsResponse.ok) {
        const pdfsData = await pdfsResponse.json();
        console.log('Received PDFs data:', pdfsData);
        
        let pdfs = [];
        if (pdfsData.success && Array.isArray(pdfsData.data)) {
          pdfs = pdfsData.data;
        } else if (Array.isArray(pdfsData)) {
          pdfs = pdfsData;
        } else if (pdfsData.data && Array.isArray(pdfsData.data)) {
          pdfs = pdfsData.data;
        }
        
        setPdfFiles(pdfs);
        
        // Look for a "Full Manual" PDF or use the first PDF as default
        const fullManual = pdfs.find((pdf: { title: string; file_name: string; }) => 
          pdf.title?.toLowerCase().includes('full') || 
          pdf.title?.toLowerCase().includes('complete') ||
          pdf.file_name?.toLowerCase().includes('full') ||
          pdf.file_name?.toLowerCase().includes('complete') ||
          pdf.title?.toLowerCase().includes('manual')
        );
        
        setFullManualPdf(fullManual || (pdfs.length > 0 ? pdfs[0] : null));
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load manual data');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFullManual = async () => {
    if (!fullManualPdf) {
      alert('No full manual PDF available for download');
      return;
    }

    setDownloading(true);
    try {
      // Method 1: Try to get download URL from backend first (forces download)
      const downloadResponse = await fetch(`${API_BASE_URL}/api/manuals/${fullManualPdf.id}/download`);
      
      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json();
        
        // If backend returns a download URL
        if (downloadData.success && downloadData.data?.downloadUrl) {
          // Create a hidden anchor element to force download
          const link = document.createElement('a');
          link.href = downloadData.data.downloadUrl;
          link.download = downloadData.data.fileName || fullManualPdf.file_name || 'manual.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } 
        // If backend returns the file directly
        else if (downloadData.success && downloadData.data?.fileUrl) {
          // Fetch the file as blob and force download
          const fileResponse = await fetch(downloadData.data.fileUrl);
          const blob = await fileResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = downloadData.data.fileName || fullManualPdf.file_name || 'manual.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
        else {
          // Fallback: try direct file path with download attribute
          await forceDownload(fullManualPdf.file_path, fullManualPdf.file_name || 'manual.pdf');
        }
      } else {
        // Fallback to direct file path
        await forceDownload(fullManualPdf.file_path, fullManualPdf.file_name || 'manual.pdf');
      }
    } catch (error) {
      console.error('Error downloading manual:', error);
      alert('Failed to download manual. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Helper function to force download a file from URL
  const forceDownload = async (url: string, filename: string) => {
    try {
      // Fetch the file as blob
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error forcing download:', error);
      
      // Last resort: open in new tab (will open in browser)
      window.open(url, '_blank');
    }
  };

  const handleDownloadPDF = async (pdf: PDFFile) => {
    setDownloading(true);
    try {
      await forceDownload(pdf.file_path, pdf.file_name || 'document.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  // Filter sections based on search and category
  const filteredSections = manualSections.filter(section => {
    const matchesSearch = searchTerm === '' || 
      section.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Exhibitor Manual</h1>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 opacity-50 cursor-not-allowed">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Loading PDF...
          </button>
        </div>

        {/* Search and Filter - Skeleton */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-8 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Manual Sections - Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
              {[1,2,3].map(i => (
                <div key={i} className="p-6">
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-gray-200 rounded mr-3"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
              {[1,2,3].map(i => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded mb-3"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Exhibitor Manual</h1>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search in manual..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {filteredSections.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <DocumentIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p>No manual sections found</p>
                <p className="text-sm mt-2">Try adjusting your search or filter</p>
              </div>
            ) : (
              filteredSections.map((section) => (
                <div key={section.id} className="p-6">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  >
                    <div className="flex items-center">
                      <DocumentIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                    </div>
                    <span className={`transform transition-transform ${
                      expandedSection === section.id ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </div>
                  
                  {expandedSection === section.id && (
                    <div className="mt-4 pl-8">
                      <div className="prose prose-sm max-w-none">
                        {section.content.split('\n').map((line, index) => (
                          <p key={index} className="text-gray-600 mb-2">{line}</p>
                        ))}
                      </div>
                      <div className="mt-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          section.category === 'general' ? 'bg-gray-100 text-gray-800' :
                          section.category === 'setup' ? 'bg-blue-100 text-blue-800' :
                          section.category === 'rules' ? 'bg-red-100 text-red-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {section.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links - Now populated with actual PDFs */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
            {pdfFiles.length === 0 ? (
              <p className="text-sm text-gray-500">No PDF documents available</p>
            ) : (
              <ul className="space-y-3">
                {pdfFiles.slice(0, 5).map((pdf) => (
                  <li key={pdf.id}>
                    <button
                      onClick={() => handleDownloadPDF(pdf)}
                      className="flex items-center text-blue-600 hover:text-blue-800 w-full text-left"
                      disabled={downloading}
                    >
                      <ArrowDownTrayIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{pdf.title || pdf.file_name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {pdfFiles.length > 5 && (
              <p className="text-xs text-gray-500 mt-2">
                +{pdfFiles.length - 5} more documents
              </p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Important Dates</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-blue-700">Setup Begins</span>
                <span className="font-medium">Jan 28</span>
              </li>
              <li className="flex justify-between">
                <span className="text-blue-700">Event Days</span>
                <span className="font-medium">Jan 29-31</span>
              </li>
              <li className="flex justify-between">
                <span className="text-blue-700">Breakdown</span>
                <span className="font-medium">Feb 1</span>
              </li>
              <li className="flex justify-between">
                <span className="text-blue-700">Requirements Due</span>
                <span className="font-medium">Jan 15</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}