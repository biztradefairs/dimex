// app/admin/media/page.tsx
"use client";

import { useState } from 'react';
import { Search, Plus, Trash2, Download, Image as ImageIcon, Video, File, Grid, List } from 'lucide-react';
import Image from 'next/image';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
  uploaded: string;
  uploadedBy: string;
  dimensions?: string;
  duration?: string;
}

export default function MediaPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [media, setMedia] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'exhibition-hall.jpg',
      type: 'image',
      url: '/media/exhibition-hall.jpg',
      size: '2.4 MB',
      uploaded: '2024-01-15',
      uploadedBy: 'Admin',
      dimensions: '1920x1080'
    },
    {
      id: '2',
      name: 'opening-ceremony.mp4',
      type: 'video',
      url: '/media/opening-ceremony.mp4',
      size: '45.2 MB',
      uploaded: '2024-01-14',
      uploadedBy: 'John Doe',
      duration: '5:32'
    },
    {
      id: '3',
      name: 'exhibitor-manual.pdf',
      type: 'document',
      url: '/media/exhibitor-manual.pdf',
      size: '1.8 MB',
      uploaded: '2024-01-13',
      uploadedBy: 'Jane Smith'
    },
    {
      id: '4',
      name: 'speaker-session.jpg',
      type: 'image',
      url: '/media/speaker-session.jpg',
      size: '1.9 MB',
      uploaded: '2024-01-12',
      uploadedBy: 'Admin',
      dimensions: '1280x720'
    },
    {
      id: '5',
      name: 'booth-setup.jpg',
      type: 'image',
      url: '/media/booth-setup.jpg',
      size: '3.1 MB',
      uploaded: '2024-01-11',
      uploadedBy: 'Robert Chen',
      dimensions: '2560x1440'
    },
    {
      id: '6',
      name: 'sponsor-guidelines.pdf',
      type: 'document',
      url: '/media/sponsor-guidelines.pdf',
      size: '0.9 MB',
      uploaded: '2024-01-10',
      uploadedBy: 'Admin'
    }
  ]);

  const types = ['all', 'image', 'video', 'document'];

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      setMedia(media.filter(item => item.id !== id));
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newItems: MediaItem[] = Array.from(files).map((file, index) => ({
        id: (media.length + index + 1).toString(),
        name: file.name,
        type: file.type.startsWith('image') ? 'image' : 
              file.type.startsWith('video') ? 'video' : 'document',
        url: URL.createObjectURL(file),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploaded: new Date().toISOString().split('T')[0],
        uploadedBy: 'Admin',
        dimensions: file.type.startsWith('image') ? '1920x1080' : undefined
      }));
      setMedia([...media, ...newItems]);
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Gallery</h1>
          <p className="text-gray-600">Manage images, videos, and documents</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <label htmlFor="upload-media" className="cursor-pointer">
              <div className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Upload Media
              </div>
            </label>
            <input
              id="upload-media"
              type="file"
              multiple
              className="hidden"
              onChange={handleUpload}
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="relative max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search media..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden group relative">
              <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                {item.type === 'image' ? (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    <ImageIcon className="h-12 w-12 text-gray-400 absolute inset-0 m-auto" />
                  </div>
                ) : item.type === 'video' ? (
                  <Video className="h-12 w-12 text-gray-400" />
                ) : (
                  <File className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{item.size}</span>
                  <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <a
                    href={item.url}
                    download
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredMedia.map((item) => (
              <li key={item.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.type === 'image' ? (
                        <ImageIcon className="h-8 w-8 text-blue-500 mr-3" />
                      ) : item.type === 'video' ? (
                        <Video className="h-8 w-8 text-red-500 mr-3" />
                      ) : (
                        <File className="h-8 w-8 text-gray-500 mr-3" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Uploaded by {item.uploadedBy} • {new Date(item.uploaded).toLocaleDateString()}</span>
                          {item.dimensions && <span className="mx-2">•</span>}
                          {item.dimensions && <span>{item.dimensions}</span>}
                          {item.duration && <span className="mx-2">•</span>}
                          {item.duration && <span>{item.duration}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{item.size}</span>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                        {item.type}
                      </span>
                      <div className="flex space-x-2">
                        <a
                          href={item.url}
                          download
                          className="text-gray-400 hover:text-gray-600"
                          title="Download"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No media found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? 'Try adjusting your search.' : 'No media uploaded yet.'}
          </p>
          <div className="mt-6">
            <label htmlFor="upload-media-empty" className="cursor-pointer">
              <div className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Upload Media
              </div>
            </label>
            <input
              id="upload-media-empty"
              type="file"
              multiple
              className="hidden"
              onChange={handleUpload}
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
          </div>
        </div>
      )}
    </div>
  );
}