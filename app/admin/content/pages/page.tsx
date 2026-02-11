// app/admin/content/pages/page.tsx
"use client";

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Globe, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: 'published' | 'draft';
  visibility: 'public' | 'private';
  lastEdited: string;
  views: number;
}

export default function PagesPage() {
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'Home',
      slug: '/',
      description: 'Main landing page',
      status: 'published',
      visibility: 'public',
      lastEdited: '2024-01-15',
      views: 15420
    },
    {
      id: '2',
      title: 'About Us',
      slug: '/about',
      description: 'Company information and team',
      status: 'published',
      visibility: 'public',
      lastEdited: '2024-01-10',
      views: 3245
    },
    {
      id: '3',
      title: 'Exhibitors',
      slug: '/exhibitors',
      description: 'List of exhibition participants',
      status: 'published',
      visibility: 'public',
      lastEdited: '2024-01-12',
      views: 5678
    },
    {
      id: '4',
      title: 'Contact',
      slug: '/contact',
      description: 'Contact information form',
      status: 'published',
      visibility: 'public',
      lastEdited: '2024-01-08',
      views: 2345
    },
    {
      id: '5',
      title: 'Admin Dashboard',
      slug: '/admin',
      description: 'Administration panel',
      status: 'published',
      visibility: 'private',
      lastEdited: '2024-01-05',
      views: 890
    }
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(page => page.id !== id));
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(search.toLowerCase()) ||
    page.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages Management</h1>
          <p className="text-gray-600">Manage website pages and content</p>
        </div>
        <Link
          href="/admin/content/pages/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Page
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Pages List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredPages.map((page) => (
            <li key={page.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      {page.visibility === 'public' ? (
                        <Globe className="h-5 w-5 text-green-500 mr-3" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400 mr-3" />
                      )}
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {page.title}
                          </p>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            page.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {page.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {page.slug} • {page.description}
                        </p>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>Last edited: {new Date(page.lastEdited).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>{page.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={page.slug}
                      target="_blank"
                      className="text-gray-400 hover:text-gray-600"
                      title="Preview"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`/admin/content/pages/edit/${page.id}`}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* No results */}
      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pages found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}