'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  DocumentTextIcon, 
  ArrowDownTrayIcon,
  EyeIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BanknotesIcon,
  ReceiptPercentIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = 'https://diemex-backend.onrender.com';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  company?: string;
  exhibitorId?: string;
  metadata?: {
    requirementsId?: string;
    exhibitorInfo?: {
      companyName?: string;
      name?: string;
      email?: string;
    };
  };
}

export default function AdminInvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0
  });

  const getAuthToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('admin_token');
  };

  const checkAuth = () => {
    const token = getAuthToken();
    if (!token) {
      router.push('/admin/login');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (checkAuth()) {
      fetchInvoices();
    }
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [searchTerm, statusFilter, invoices]);

  const fetchInvoices = async () => {
    if (!checkAuth()) return;
    
    try {
      setLoading(true);
      const token = getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/api/invoices/admin/all?page=1&limit=1000`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        setInvoices(data.data);
        
        const paidInvoices = data.data.filter((inv: Invoice) => inv.status === 'paid');
        const pendingInvoices = data.data.filter((inv: Invoice) => inv.status === 'pending');
        
        const statsData = {
          total: data.data.length,
          paid: paidInvoices.length,
          pending: pendingInvoices.length,
          overdue: data.data.filter((inv: Invoice) => inv.status === 'overdue').length,
          totalAmount: data.data.reduce((sum: number, inv: Invoice) => sum + (Number(inv.amount) || 0), 0),
          paidAmount: paidInvoices.reduce((sum: number, inv: Invoice) => sum + (Number(inv.amount) || 0), 0),
          pendingAmount: pendingInvoices.reduce((sum: number, inv: Invoice) => sum + (Number(inv.amount) || 0), 0)
        };
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterInvoices = () => {
    let filtered = [...invoices];
    
    if (searchTerm) {
      filtered = filtered.filter(inv => 
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inv.company && inv.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inv.metadata?.exhibitorInfo?.companyName && 
          inv.metadata.exhibitorInfo.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inv.metadata?.exhibitorInfo?.name && 
          inv.metadata.exhibitorInfo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inv.metadata?.exhibitorInfo?.email && 
          inv.metadata.exhibitorInfo.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inv => inv.status === statusFilter);
    }
    
    setFilteredInvoices(filtered);
    setCurrentPage(1);
  };

  const downloadInvoice = async (invoiceId: string, invoiceNumber: string) => {
    if (downloading === invoiceId) return;
    
    setDownloading(invoiceId);
    try {
      const token = getAuthToken();
      
      if (!token) {
        alert('Please login again');
        router.push('/admin/login');
        return;
      }
      
      // Add timestamp to prevent caching
      const url = `${API_BASE_URL}/api/invoices/${invoiceId}/download?t=${Date.now()}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/pdf',
        },
      });
      
      if (response.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      
      // Check if server returned HTML instead of PDF
      if (contentType && contentType.includes('text/html')) {
        const text = await response.text();
        if (text.includes('login') || text.includes('unauthorized')) {
          alert('Authentication failed. Please login again.');
          router.push('/admin/login');
          return;
        }
        throw new Error('Server returned HTML instead of PDF');
      }
      
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('Server did not return a PDF file');
      }
      
      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }
      
      const url_ = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url_;
      link.setAttribute('download', `invoice-${invoiceNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url_);
      }, 100);
      
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert(error instanceof Error ? error.message : 'Failed to download invoice');
    } finally {
      setDownloading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      paid: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200',
      pending: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200',
      overdue: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200',
      draft: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border border-gray-200'
    };
    const icons: Record<string, React.ReactElement> = {
      paid: <CheckCircleIcon className="h-3 w-3" />,
      pending: <ClockIcon className="h-3 w-3" />,
      overdue: <ExclamationCircleIcon className="h-3 w-3" />,
      draft: <DocumentTextIcon className="h-3 w-3" />
    };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${badges[status] || badges.draft}`}>
        {icons[status] || icons.draft}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    if (!amount && amount !== 0) return '₹0';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <ReceiptPercentIcon className="h-8 w-8 text-white" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50/30 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Invoice Management
              </h1>
              <p className="text-gray-500 mt-1">View and manage all exhibitor invoices</p>
            </div>
            <button 
              onClick={fetchInvoices}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Paid</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.paid}</p>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Overdue</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.overdue}</p>
              </div>
              <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-5 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Amount</p>
                <p className="text-2xl font-bold text-blue-800 mt-1">{formatCurrency(stats.totalAmount)}</p>
              </div>
              <div className="h-12 w-12 bg-white/60 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BanknotesIcon className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-100 p-5 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Paid Amount</p>
                <p className="text-2xl font-bold text-green-800 mt-1">{formatCurrency(stats.paidAmount)}</p>
              </div>
              <div className="h-12 w-12 bg-white/60 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CurrencyRupeeIcon className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by invoice number, company, or exhibitor name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 font-medium"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="px-4 py-2.5 text-gray-500 hover:text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-500">
                {invoices.length === 0 
                  ? "No invoices have been generated yet."
                  : "No invoices match your search criteria."}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Exhibitor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Issue Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {currentInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-blue-600">
                            {invoice.invoiceNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.company || invoice.metadata?.exhibitorInfo?.companyName || '—'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            {invoice.metadata?.exhibitorInfo?.name || '—'}
                          </div>
                          <div className="text-xs text-gray-400 truncate max-w-[200px]">
                            {invoice.metadata?.exhibitorInfo?.email || '—'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">
                            {formatCurrency(Number(invoice.amount))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            {formatDate(invoice.issueDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            {formatDate(invoice.dueDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex gap-3 justify-end">
                            <Link
                              href={`/admin/financial/invoices/${invoice.id}`}
                              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                              title="View Details"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => downloadInvoice(invoice.id, invoice.invoiceNumber)}
                              disabled={downloading === invoice.id}
                              className="text-blue-500 hover:text-blue-700 disabled:opacity-50 transition-colors p-1"
                              title="Download PDF"
                            >
                              {downloading === invoice.id ? (
                                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                              ) : (
                                <ArrowDownTrayIcon className="h-5 w-5" />
                              )}
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
                <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredInvoices.length)}</span> of <span className="font-medium">{filteredInvoices.length}</span> results
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            className={`min-w-[36px] h-9 text-sm font-medium rounded-xl transition-all ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Summary Section */}
        {filteredInvoices.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-sm text-blue-700 font-medium">Showing {currentInvoices.length} of {filteredInvoices.length} invoices</p>
                {searchTerm && (
                  <p className="text-xs text-blue-600 mt-1">
                    Filtered by: "{searchTerm}" {statusFilter !== 'all' && `• Status: ${statusFilter}`}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-700 font-medium">Total Amount (Filtered)</p>
                <p className="text-xl font-bold text-blue-800">
                  {formatCurrency(filteredInvoices.reduce((sum: number, inv: Invoice) => sum + (Number(inv.amount) || 0), 0))}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}