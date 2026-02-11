"use client";

import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Calendar,
  Upload,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: 'published' | 'draft';
  author: string;
  publishedDate: string;
  views: number;
  image?: string;
}

export default function ArticlesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const itemsPerPage = 10;
  
  const categories = ['all', 'Rail', 'Maritime', 'Air', 'Warehouse', 'Technology'];

  useEffect(() => {
    fetchArticles();
  }, [currentPage, search, selectedCategory, selectedStatus]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get all sample articles
      const allArticles = getSampleArticles();
      
      // Apply filters to all articles
      let filtered = allArticles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
                             article.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
      });
      
      // Set total counts
      setTotalArticles(filtered.length);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      
      // Get current page items
      const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
      const indexOfLastItem = indexOfFirstItem + itemsPerPage;
      const currentPageArticles = filtered.slice(indexOfFirstItem, indexOfLastItem);
      
      setArticles(currentPageArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles');
      // Fallback to sample data
      setArticles(getSampleArticles().slice(0, itemsPerPage));
      setTotalArticles(getSampleArticles().length);
      setTotalPages(Math.ceil(getSampleArticles().length / itemsPerPage));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove article from state
        const updatedArticles = articles.filter(article => article.id !== id);
        const allSampleArticles = getSampleArticles().filter(article => article.id !== id);
        
        setArticles(updatedArticles);
        setTotalArticles(allSampleArticles.length);
        setTotalPages(Math.ceil(allSampleArticles.length / itemsPerPage));
        
        alert('Article deleted successfully');
        
        // Refresh the list
        fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Failed to delete article');
      }
    }
  };

  const handleBulkUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Successfully uploaded ${files.length} file(s)\n\nIn production, this would upload files to the server.`);
      
      // Reset file input
      event.target.value = '';
      
      // Refresh articles
      fetchArticles();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    }
  };

  // Pagination calculations
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (loading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles Management</h1>
          <p className="text-gray-600">Create and manage your exhibition articles</p>
        </div>
        <div className="flex space-x-3">
          <label className="cursor-pointer">
            <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </div>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleBulkUpload}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            />
          </label>
          <Link
            href="/admin/content/articles/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {search ? 'Try adjusting your search or filter to find what you\'re looking for.' : 'No articles available.'}
            </p>
            <div className="mt-6">
              <Link
                href="/admin/content/articles/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Article
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Article
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 shrink-0">
                            <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                              {article.image ? (
                                <img
                                  className="h-10 w-10 rounded object-cover"
                                  src={article.image}
                                  alt={article.title}
                                />
                              ) : (
                                <span className="text-gray-400 text-xs">No image</span>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {article.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {article.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(article.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/articles/${article.slug}`}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/content/articles/edit/${article.id}`}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                        : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === totalPages
                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                        : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, totalArticles)}
                      </span>{' '}
                      of <span className="font-medium">{totalArticles}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      
                      {getPageNumbers().map((pageNumber, index) => (
                        pageNumber === '...' ? (
                          <span
                            key={`ellipsis-${index}`}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(Number(pageNumber))}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNumber
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        )
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Fallback function for sample articles
function getSampleArticles(): Article[] {
  return [
    {
      id: '1',
      title: 'Rail Freight Innovation Trends 2026',
      slug: 'rail-freight-innovation-trends-2026',
      excerpt: 'Latest trends in rail freight technology and infrastructure',
      category: 'Rail',
      status: 'published',
      author: 'John Doe',
      publishedDate: '2024-01-15',
      views: 1245,
      image: '/images/article1.jpg'
    },
    {
      id: '2',
      title: 'Port Automation Solutions',
      slug: 'port-automation-solutions',
      excerpt: 'How automation is transforming port operations',
      category: 'Maritime',
      status: 'published',
      author: 'Jane Smith',
      publishedDate: '2024-01-10',
      views: 892,
      image: '/images/article2.jpg'
    },
    {
      id: '3',
      title: 'Warehouse Robotics Guide',
      slug: 'warehouse-robotics-guide',
      excerpt: 'Complete guide to implementing warehouse robotics',
      category: 'Warehouse',
      status: 'draft',
      author: 'Alex Johnson',
      publishedDate: '2024-01-05',
      views: 0,
      image: '/images/article3.jpg'
    },
    {
      id: '4',
      title: 'Air Cargo Digital Transformation',
      slug: 'air-cargo-digital-transformation',
      excerpt: 'Digital technologies revolutionizing air cargo logistics',
      category: 'Air',
      status: 'published',
      author: 'Michael Brown',
      publishedDate: '2024-01-20',
      views: 1542,
      image: '/images/article4.jpg'
    },
    {
      id: '5',
      title: 'Blockchain in Supply Chain',
      slug: 'blockchain-in-supply-chain',
      excerpt: 'How blockchain technology enhances supply chain transparency',
      category: 'Technology',
      status: 'published',
      author: 'Sarah Wilson',
      publishedDate: '2024-01-18',
      views: 2105,
      image: '/images/article5.jpg'
    },
    {
      id: '6',
      title: 'Green Logistics Initiatives',
      slug: 'green-logistics-initiatives',
      excerpt: 'Sustainable practices in modern logistics operations',
      category: 'Technology',
      status: 'draft',
      author: 'David Lee',
      publishedDate: '2024-01-22',
      views: 0,
      image: '/images/article6.jpg'
    },
    {
      id: '7',
      title: 'Intermodal Transport Optimization',
      slug: 'intermodal-transport-optimization',
      excerpt: 'Strategies for efficient intermodal transportation',
      category: 'Rail',
      status: 'published',
      author: 'Emma Garcia',
      publishedDate: '2024-01-12',
      views: 987,
      image: '/images/article7.jpg'
    },
    {
      id: '8',
      title: 'Smart Container Technology',
      slug: 'smart-container-technology',
      excerpt: 'IoT-enabled containers and their impact on shipping',
      category: 'Maritime',
      status: 'published',
      author: 'Robert Chen',
      publishedDate: '2024-01-08',
      views: 1324,
      image: '/images/article8.jpg'
    },
    {
      id: '9',
      title: 'Drone Delivery Systems',
      slug: 'drone-delivery-systems',
      excerpt: 'Future of last-mile delivery with autonomous drones',
      category: 'Air',
      status: 'draft',
      author: 'Lisa Taylor',
      publishedDate: '2024-01-25',
      views: 0,
      image: '/images/article9.jpg'
    },
    {
      id: '10',
      title: 'AI in Inventory Management',
      slug: 'ai-in-inventory-management',
      excerpt: 'Artificial intelligence applications in warehouse inventory',
      category: 'Warehouse',
      status: 'published',
      author: 'Kevin Martinez',
      publishedDate: '2024-01-14',
      views: 1789,
      image: '/images/article10.jpg'
    },
    {
      id: '11',
      title: 'Cold Chain Logistics',
      slug: 'cold-chain-logistics',
      excerpt: 'Temperature-controlled supply chain solutions',
      category: 'Technology',
      status: 'published',
      author: 'Amanda White',
      publishedDate: '2024-01-16',
      views: 1123,
      image: '/images/article11.jpg'
    },
    {
      id: '12',
      title: 'Rail Terminal Automation',
      slug: 'rail-terminal-automation',
      excerpt: 'Automated systems in modern rail terminals',
      category: 'Rail',
      status: 'draft',
      author: 'James Harris',
      publishedDate: '2024-01-28',
      views: 0,
      image: '/images/article12.jpg'
    }
  ];
}