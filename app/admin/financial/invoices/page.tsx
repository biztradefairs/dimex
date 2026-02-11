"use client";

import { useState, useEffect } from 'react';
import { Search, FileText, Download, Send, Printer, Eye, Filter, Loader2 } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  company: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issueDate: string;
  items: number;
}

export default function InvoicesPage() {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const statuses = ['all', 'paid', 'pending', 'overdue'];

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
      setInvoices(getSampleInvoices());
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      invoice.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const handleView = async (invoice: Invoice) => {
    try {
      alert(`View invoice: ${invoice.invoiceNumber}\n\nThis would open the PDF in a new window.`);
      // In a real implementation, this would generate/retrieve a PDF
      // const url = window.URL.createObjectURL(blob);
      // window.open(url, '_blank');
    } catch (error) {
      console.error('Error viewing invoice:', error);
      alert('Failed to view invoice');
    }
  };

  const handleDownload = async (invoice: Invoice) => {
    try {
      alert(`Downloading invoice: ${invoice.invoiceNumber}\n\nThis would download the PDF file.`);
      // In a real implementation, this would trigger a download
      // const blob = await generateInvoicePdf(invoice.id);
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${invoice.invoiceNumber}.pdf`;
      // a.click();
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice');
    }
  };

  const handleSend = async (invoice: Invoice) => {
    try {
      const email = prompt('Enter email address to send invoice:', 'client@example.com');
      if (email) {
        alert(`Invoice ${invoice.invoiceNumber} sent to ${email}\n\nIn production, this would send an email with the invoice PDF attachment.`);
        // In a real implementation, this would call an API to send email
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice');
    }
  };

  const handlePrint = async (invoice: Invoice) => {
    try {
      alert(`Printing invoice: ${invoice.invoiceNumber}\n\nThis would open the print dialog.`);
      // In a real implementation, this would open a printable version
      // const blob = await generateInvoicePdf(invoice.id);
      // const url = window.URL.createObjectURL(blob);
      // const printWindow = window.open(url, '_blank');
      // if (printWindow) {
      //   printWindow.onload = () => {
      //     printWindow.print();
      //   };
      // }
    } catch (error) {
      console.error('Error printing invoice:', error);
      alert('Failed to print invoice');
    }
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600">Create, send, and track exhibition invoices</p>
        </div>
        <button
          onClick={handleCreateInvoice}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <FileText className="mr-2 h-4 w-4" />
          New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm font-medium text-gray-500">Total Invoices</p>
          <p className="text-2xl font-semibold text-gray-900">{invoices.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm font-medium text-gray-500">Paid Revenue</p>
          <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm font-medium text-gray-500">Pending</p>
          <p className="text-2xl font-semibold text-gray-900">{formatCurrency(pendingAmount)}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm font-medium text-gray-500">Overdue</p>
          <p className="text-2xl font-semibold text-gray-900">{formatCurrency(overdueAmount)}</p>
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
                placeholder="Search invoices..."
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
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option>All Time</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
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
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => {
                const isOverdue = invoice.status === 'overdue';
                const dueDate = new Date(invoice.dueDate);
                const today = new Date();
                
                return (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-2" />
                        <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Issued: {new Date(invoice.issueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(invoice.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                      {isOverdue && (
                        <div className="text-xs text-red-600 mt-1">
                          {Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))} days overdue
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                      {!isOverdue && invoice.status === 'pending' && (
                        <div className="text-xs text-yellow-600">
                          In {Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.items} items</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(invoice)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(invoice)}
                          className="text-green-600 hover:text-green-900"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSend(invoice)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Send"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePrint(invoice)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Print"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? 'Try adjusting your search or filter.' : 'No invoices created yet.'}
          </p>
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
      amount: 2500,
      status: 'paid',
      dueDate: '2024-01-20',
      issueDate: '2024-01-15',
      items: 3
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      company: 'XYZ Shipping Co.',
      amount: 1800,
      status: 'pending',
      dueDate: '2024-01-25',
      issueDate: '2024-01-16',
      items: 2
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      company: 'Tech Solutions Inc.',
      amount: 4200,
      status: 'overdue',
      dueDate: '2023-12-15',
      issueDate: '2023-12-01',
      items: 5
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      company: 'Global Exhibitors Ltd.',
      amount: 3200,
      status: 'paid',
      dueDate: '2024-01-10',
      issueDate: '2024-01-01',
      items: 4
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      company: 'Event Masters LLC',
      amount: 2750,
      status: 'pending',
      dueDate: '2024-02-05',
      issueDate: '2024-01-20',
      items: 3
    },
    {
      id: '6',
      invoiceNumber: 'INV-2024-006',
      company: 'Marketing Pros Co.',
      amount: 1500,
      status: 'overdue',
      dueDate: '2023-12-20',
      issueDate: '2023-12-05',
      items: 2
    },
    {
      id: '7',
      invoiceNumber: 'INV-2024-007',
      company: 'Design Studio Inc.',
      amount: 3800,
      status: 'paid',
      dueDate: '2024-01-30',
      issueDate: '2024-01-18',
      items: 6
    },
    {
      id: '8',
      invoiceNumber: 'INV-2024-008',
      company: 'Supply Chain Experts',
      amount: 2200,
      status: 'pending',
      dueDate: '2024-02-15',
      issueDate: '2024-01-25',
      items: 3
    },
  ];
}