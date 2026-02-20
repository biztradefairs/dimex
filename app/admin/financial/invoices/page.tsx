// app/admin/financial/invoices/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Search, FileText, Download, Send, Printer, Eye, Filter, 
  Loader2, Plus, Calendar, DollarSign, ChevronLeft, ChevronRight,
  X, Mail, CheckCircle, Clock, AlertCircle, RefreshCw, Trash2
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  company: string;
  companyAddress?: string;
  companyGST?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  issueDate: string;
  items: InvoiceItem[];
  notes?: string;
  terms?: string;
  gst?: number;
  subtotal?: number;
  total?: number;
}

export default function InvoicesPage() {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendEmail, setSendEmail] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState('all');
  
  const statuses = ['all', 'paid', 'pending', 'overdue', 'cancelled'];
  const dateRanges = ['all', 'today', 'week', 'month', 'quarter', 'year'];

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInvoices(getSampleInvoices());
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setError('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      invoice.company.toLowerCase().includes(search.toLowerCase()) ||
      (invoice.contactPerson?.toLowerCase().includes(search.toLowerCase()) ?? false);
    
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    
    let matchesDate = true;
    if (dateRange !== 'all' && invoice.issueDate) {
      const invoiceDate = new Date(invoice.issueDate);
      const today = new Date();
      
      switch(dateRange) {
        case 'today':
          matchesDate = invoiceDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          matchesDate = invoiceDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          matchesDate = invoiceDate >= monthAgo;
          break;
        case 'quarter':
          const quarterAgo = new Date(today);
          quarterAgo.setMonth(today.getMonth() - 3);
          matchesDate = invoiceDate >= quarterAgo;
          break;
        case 'year':
          const yearAgo = new Date(today);
          yearAgo.setFullYear(today.getFullYear() - 1);
          matchesDate = invoiceDate >= yearAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const handleDownload = async (invoice: Invoice) => {
    try {
      // Generate PDF content
      const pdfContent = generateInvoiceHTML(invoice);
      
      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoice.invoiceNumber}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      // Show success message
      alert(`Invoice ${invoice.invoiceNumber} downloaded successfully!`);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice');
    }
  };

  const handlePrint = (invoice: Invoice) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generateInvoiceHTML(invoice));
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const handleSend = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setSendEmail(invoice.contactEmail || '');
    setShowSendModal(true);
  };

  const handleSendEmail = async () => {
    if (!sendEmail) {
      alert('Please enter an email address');
      return;
    }

    setSending(true);
    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Invoice ${selectedInvoice?.invoiceNumber} sent successfully to ${sendEmail}`);
      setShowSendModal(false);
      setSendEmail('');
      setSendMessage('');
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice');
    } finally {
      setSending(false);
    }
  };

  const handleStatusUpdate = (id: string, newStatus: Invoice['status']) => {
    setInvoices(invoices.map(inv => 
      inv.id === id ? { ...inv, status: newStatus } : inv
    ));
  };

  const generateInvoiceHTML = (invoice: Invoice): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoice.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .invoice-container { max-width: 800px; margin: auto; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .company-details { margin-bottom: 30px; }
          .invoice-details { margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #f5f5f5; }
          .totals { text-align: right; }
          .footer { margin-top: 50px; font-size: 12px; color: #666; }
          .status-paid { color: green; }
          .status-pending { color: orange; }
          .status-overdue { color: red; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <div>
              <h1>INVOICE</h1>
              <p>${invoice.invoiceNumber}</p>
            </div>
            <div class="status-${invoice.status}">
              <h3>${invoice.status.toUpperCase()}</h3>
            </div>
          </div>
          
          <div class="company-details">
            <h3>Bill To:</h3>
            <p><strong>${invoice.company}</strong></p>
            <p>${invoice.companyAddress || 'Address not provided'}</p>
            <p>GST: ${invoice.companyGST || 'N/A'}</p>
            <p>Attn: ${invoice.contactPerson || 'N/A'}</p>
            <p>Email: ${invoice.contactEmail || 'N/A'}</p>
            <p>Phone: ${invoice.contactPhone || 'N/A'}</p>
          </div>
          
          <div class="invoice-details">
            <p><strong>Issue Date:</strong> ${formatDate(invoice.issueDate)}</p>
            <p><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.rate)}</td>
                  <td>${formatCurrency(item.amount)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="totals">
            <p><strong>Subtotal:</strong> ${formatCurrency(invoice.subtotal || invoice.amount)}</p>
            <p><strong>GST (18%):</strong> ${formatCurrency(invoice.gst || 0)}</p>
            <p><strong>Total:</strong> ${formatCurrency(invoice.total || invoice.amount)}</p>
          </div>
          
          ${invoice.notes ? `
            <div class="notes">
              <h4>Notes:</h4>
              <p>${invoice.notes}</p>
            </div>
          ` : ''}
          
          ${invoice.terms ? `
            <div class="terms">
              <h4>Terms & Conditions:</h4>
              <p>${invoice.terms}</p>
            </div>
          ` : ''}
          
          <div class="footer">
            <p>This is a computer generated invoice. No signature required.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleCreateInvoice = () => {
    window.location.href = '/admin/financial/invoices/new';
  };

  if (loading && invoices.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600">Create, send, and track exhibition invoices</p>
        </div>
        <button
          onClick={handleCreateInvoice}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Invoices</p>
              <p className="text-2xl font-semibold text-gray-900">{invoices.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Paid Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(pendingAmount)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(overdueAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by invoice, company, contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {dateRanges.map(range => (
                <option key={range} value={range}>
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearch('');
                setSelectedStatus('all');
                setDateRange('all');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentInvoices.map((invoice) => {
                const dueDate = new Date(invoice.dueDate);
                const today = new Date();
                const daysOverdue = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                          <div className="text-xs text-gray-500">{invoice.items.length} items</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{invoice.company}</div>
                      {invoice.contactPerson && (
                        <div className="text-xs text-gray-500">Contact: {invoice.contactPerson}</div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(invoice.amount)}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span className="ml-1">{invoice.status}</span>
                      </span>
                      {invoice.status === 'overdue' && (
                        <div className="text-xs text-red-600 mt-1">
                          {daysOverdue} days overdue
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Issued: {formatDate(invoice.issueDate)}</div>
                      <div className={`text-xs ${invoice.status === 'overdue' ? 'text-red-600' : 'text-gray-500'}`}>
                        Due: {formatDate(invoice.dueDate)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(invoice)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="View Invoice"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(invoice)}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSend(invoice)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50 transition-colors"
                          title="Send Email"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePrint(invoice)}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                          title="Print"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                        {invoice.status !== 'paid' && (
                          <button
                            onClick={() => handleStatusUpdate(invoice.id, 'paid')}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                            title="Mark as Paid"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredInvoices.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredInvoices.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredInvoices.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* No Results */}
      {filteredInvoices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? 'Try adjusting your search or filter.' : 'Get started by creating a new invoice.'}
          </p>
          <div className="mt-6">
            <button
              onClick={handleCreateInvoice}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </button>
          </div>
        </div>
      )}

      {/* Invoice View Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Invoice {selectedInvoice.invoiceNumber}</h2>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto p-4">
              {/* Invoice Content */}
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                    <p className="text-gray-600 mt-1">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${getStatusColor(selectedInvoice.status)}`}>
                    <span className="font-semibold">{selectedInvoice.status.toUpperCase()}</span>
                  </div>
                </div>

                {/* Company Details */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Bill To:</h3>
                    <p className="font-semibold text-gray-900">{selectedInvoice.company}</p>
                    <p className="text-sm text-gray-600 mt-1">{selectedInvoice.companyAddress || 'Address not provided'}</p>
                    {selectedInvoice.companyGST && (
                      <p className="text-sm text-gray-600 mt-1">GST: {selectedInvoice.companyGST}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Contact:</h3>
                    {selectedInvoice.contactPerson && (
                      <p className="text-sm text-gray-600">Attn: {selectedInvoice.contactPerson}</p>
                    )}
                    {selectedInvoice.contactEmail && (
                      <p className="text-sm text-gray-600">Email: {selectedInvoice.contactEmail}</p>
                    )}
                    {selectedInvoice.contactPhone && (
                      <p className="text-sm text-gray-600">Phone: {selectedInvoice.contactPhone}</p>
                    )}
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Issue Date:</span> {formatDate(selectedInvoice.issueDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Due Date:</span> {formatDate(selectedInvoice.dueDate)}
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <table className="min-w-full divide-y divide-gray-200 mb-8">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rate</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedInvoice.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.rate)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(selectedInvoice.subtotal || selectedInvoice.amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GST (18%):</span>
                      <span className="font-medium">{formatCurrency(selectedInvoice.gst || 0)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span>Total:</span>
                      <span>{formatCurrency(selectedInvoice.total || selectedInvoice.amount)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedInvoice.notes && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Notes:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedInvoice.notes}</p>
                  </div>
                )}

                {/* Terms */}
                {selectedInvoice.terms && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Terms & Conditions:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedInvoice.terms}</p>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                  <p>This is a computer generated invoice. No signature required.</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handlePrint(selectedInvoice)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Printer className="h-4 w-4 inline mr-2" />
                Print
              </button>
              <button
                onClick={() => handleDownload(selectedInvoice)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Download
              </button>
              <button
                onClick={() => {
                  setShowInvoiceModal(false);
                  handleSend(selectedInvoice);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Send className="h-4 w-4 inline mr-2" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Email Modal */}
      {showSendModal && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Send Invoice</h2>
              <button
                onClick={() => setShowSendModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Email *
                </label>
                <input
                  type="email"
                  value={sendEmail}
                  onChange={(e) => setSendEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={`Invoice ${selectedInvoice.invoiceNumber} from Exhibition`}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  rows={4}
                  placeholder="Add a personal message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Note:</strong> The invoice will be sent as a PDF attachment.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowSendModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={sending || !sendEmail}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Invoice
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getSampleInvoices(): Invoice[] {
  return [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      company: 'ABC Logistics',
      companyAddress: '123 Business Park, Mumbai - 400001',
      companyGST: '27AAECA1234A1Z5',
      contactPerson: 'Rajesh Kumar',
      contactEmail: 'rajesh@abclogistics.com',
      contactPhone: '+91 98765 43210',
      amount: 2500,
      status: 'paid',
      dueDate: '2024-01-20',
      issueDate: '2024-01-15',
      subtotal: 2118.64,
      gst: 381.36,
      total: 2500,
      items: [
        { id: '1-1', description: 'Booth Rental - 9 sqm', quantity: 1, rate: 1500, amount: 1500 },
        { id: '1-2', description: 'Furniture Package', quantity: 1, rate: 618.64, amount: 618.64 }
      ],
      notes: 'Thank you for your business!',
      terms: 'Payment due within 30 days. Late payments subject to 2% interest per month.'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      company: 'XYZ Shipping Co.',
      companyAddress: '456 Industrial Area, Delhi - 110001',
      companyGST: '07AAACX1234A1Z8',
      contactPerson: 'Priya Sharma',
      contactEmail: 'priya@xyzshipping.com',
      contactPhone: '+91 98765 12345',
      amount: 1800,
      status: 'pending',
      dueDate: '2024-01-25',
      issueDate: '2024-01-16',
      subtotal: 1525.42,
      gst: 274.58,
      total: 1800,
      items: [
        { id: '2-1', description: 'Booth Rental - 6 sqm', quantity: 1, rate: 1200, amount: 1200 },
        { id: '2-2', description: 'Electrical Connection', quantity: 1, rate: 325.42, amount: 325.42 }
      ]
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      company: 'Tech Solutions Inc.',
      companyAddress: '789 Tech Park, Bangalore - 560001',
      companyGST: '29AAACT5678A1Z9',
      contactPerson: 'Suresh Reddy',
      contactEmail: 'suresh@techsolutions.com',
      contactPhone: '+91 98765 56789',
      amount: 4200,
      status: 'overdue',
      dueDate: '2023-12-15',
      issueDate: '2023-12-01',
      subtotal: 3559.32,
      gst: 640.68,
      total: 4200,
      items: [
        { id: '3-1', description: 'Booth Rental - 12 sqm', quantity: 1, rate: 2500, amount: 2500 },
        { id: '3-2', description: 'Premium Furniture Package', quantity: 1, rate: 850, amount: 850 },
        { id: '3-3', description: 'AV Equipment Package', quantity: 1, rate: 209.32, amount: 209.32 }
      ]
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      company: 'Global Exhibitors Ltd.',
      companyAddress: '321 Business Hub, Chennai - 600001',
      companyGST: '33AAACL9876A1Z2',
      contactPerson: 'Vikram Rajan',
      contactEmail: 'vikram@globalexhibitors.com',
      contactPhone: '+91 98765 98765',
      amount: 3200,
      status: 'paid',
      dueDate: '2024-01-10',
      issueDate: '2024-01-01',
      subtotal: 2711.86,
      gst: 488.14,
      total: 3200,
      items: [
        { id: '4-1', description: 'Booth Rental - 15 sqm', quantity: 1, rate: 3000, amount: 3000 },
        { id: '4-2', description: 'Hostess Service (3 days)', quantity: 3, rate: 150, amount: 450 },
        { id: '4-3', description: 'Security Guard (3 days)', quantity: 3, rate: 100, amount: 300 }
      ]
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      company: 'Event Masters LLC',
      companyAddress: '654 Convention Center, Kolkata - 700001',
      companyGST: '19AAACE4567A1Z3',
      contactPerson: 'Ananya Das',
      contactEmail: 'ananya@eventmasters.com',
      contactPhone: '+91 98765 24680',
      amount: 2750,
      status: 'pending',
      dueDate: '2024-02-05',
      issueDate: '2024-01-20',
      subtotal: 2330.51,
      gst: 419.49,
      total: 2750,
      items: [
        { id: '5-1', description: 'Booth Rental - 9 sqm', quantity: 1, rate: 1500, amount: 1500 },
        { id: '5-2', description: 'Carpentry Work', quantity: 1, rate: 500, amount: 500 },
        { id: '5-3', description: 'Painting Service', quantity: 1, rate: 330.51, amount: 330.51 }
      ]
    },
    {
      id: '6',
      invoiceNumber: 'INV-2024-006',
      company: 'Marketing Pros Co.',
      companyAddress: '987 Ad Agency Road, Pune - 411001',
      companyGST: '27AAACM7890A1Z6',
      contactPerson: 'Amol Joshi',
      contactEmail: 'amol@marketingpros.com',
      contactPhone: '+91 98765 13579',
      amount: 1500,
      status: 'overdue',
      dueDate: '2023-12-20',
      issueDate: '2023-12-05',
      subtotal: 1271.19,
      gst: 228.81,
      total: 1500,
      items: [
        { id: '6-1', description: 'Booth Rental - 6 sqm', quantity: 1, rate: 1200, amount: 1200 },
        { id: '6-2', description: 'Logo Design Service', quantity: 1, rate: 71.19, amount: 71.19 }
      ]
    },
    {
      id: '7',
      invoiceNumber: 'INV-2024-007',
      company: 'Design Studio Inc.',
      companyAddress: '147 Creative Lane, Ahmedabad - 380001',
      companyGST: '24AAACD5432A1Z7',
      contactPerson: 'Kavita Patel',
      contactEmail: 'kavita@designstudio.com',
      contactPhone: '+91 98765 86420',
      amount: 3800,
      status: 'paid',
      dueDate: '2024-01-30',
      issueDate: '2024-01-18',
      subtotal: 3220.34,
      gst: 579.66,
      total: 3800,
      items: [
        { id: '7-1', description: 'Booth Rental - 12 sqm', quantity: 1, rate: 2500, amount: 2500 },
        { id: '7-2', description: 'Custom Design Package', quantity: 1, rate: 720.34, amount: 720.34 }
      ]
    },
    {
      id: '8',
      invoiceNumber: 'INV-2024-008',
      company: 'Supply Chain Experts',
      companyAddress: '258 Logistics Park, Jaipur - 302001',
      companyGST: '08AAACS3210A1Z4',
      contactPerson: 'Rahul Mehta',
      contactEmail: 'rahul@supplychain.com',
      contactPhone: '+91 98765 97531',
      amount: 2200,
      status: 'pending',
      dueDate: '2024-02-15',
      issueDate: '2024-01-25',
      subtotal: 1864.41,
      gst: 335.59,
      total: 2200,
      items: [
        { id: '8-1', description: 'Booth Rental - 9 sqm', quantity: 1, rate: 1500, amount: 1500 },
        { id: '8-2', description: 'Furniture Rental', quantity: 1, rate: 364.41, amount: 364.41 }
      ]
    }
  ];
}