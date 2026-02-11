"use client";

import { useState, useEffect } from 'react';
import { Search, DollarSign, CheckCircle, XCircle, Clock, Download, Filter, Eye, Loader2, RefreshCw } from 'lucide-react';

interface Payment {
  id: string;
  invoiceNumber: string;
  company: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: 'credit_card' | 'bank_transfer' | 'check' | 'cash' | 'online';
  date: string;
  dueDate?: string;
  processedBy: string;
}

// Format currency in Indian Rupees
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Sample payments data
const samplePayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    company: 'ABC Logistics',
    amount: 2500,
    status: 'completed',
    method: 'credit_card',
    date: '2024-01-15',
    processedBy: 'Auto'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    company: 'XYZ Shipping Co.',
    amount: 1800,
    status: 'pending',
    method: 'bank_transfer',
    date: '2024-01-14',
    dueDate: '2024-01-21',
    processedBy: 'Manual'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    company: 'Tech Solutions Ltd.',
    amount: 3200,
    status: 'refunded',
    method: 'online',
    date: '2024-01-10',
    processedBy: 'Auto'
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    company: 'Global Industries',
    amount: 4500,
    status: 'failed',
    method: 'credit_card',
    date: '2024-01-12',
    processedBy: 'Auto'
  },
  {
    id: '5',
    invoiceNumber: 'INV-2024-005',
    company: 'Premium Services Inc.',
    amount: 2900,
    status: 'completed',
    method: 'check',
    date: '2024-01-08',
    processedBy: 'Manual'
  },
  {
    id: '6',
    invoiceNumber: 'INV-2024-006',
    company: 'Indian Enterprises',
    amount: 12500,
    status: 'completed',
    method: 'online',
    date: '2024-01-05',
    processedBy: 'Auto'
  },
  {
    id: '7',
    invoiceNumber: 'INV-2024-007',
    company: 'Digital Solutions',
    amount: 8700,
    status: 'pending',
    method: 'bank_transfer',
    date: '2024-01-16',
    dueDate: '2024-01-23',
    processedBy: 'Manual'
  },
  {
    id: '8',
    invoiceNumber: 'INV-2024-008',
    company: 'Startup Innovators',
    amount: 3400,
    status: 'completed',
    method: 'cash',
    date: '2024-01-13',
    processedBy: 'Manual'
  },
];

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');
  const [payments, setPayments] = useState<Payment[]>(samplePayments);
  const [loading, setLoading] = useState(false);
  
  const statuses = ['all', 'completed', 'pending', 'failed', 'refunded'];
  const methods = ['all', 'credit_card', 'bank_transfer', 'check', 'cash', 'online'];
  const dateRanges = ['all', 'today', 'week', 'month', 'quarter'];

  const getMethodText = (method: string) => {
    switch(method) {
      case 'credit_card': return 'Credit Card';
      case 'bank_transfer': return 'Bank Transfer';
      case 'check': return 'Check';
      case 'cash': return 'Cash';
      case 'online': return 'Online';
      default: return method.charAt(0).toUpperCase() + method.slice(1).replace('_', ' ');
    }
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'refunded':
        return <RefreshCw className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      payment.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesMethod = selectedMethod === 'all' || payment.method === selectedMethod;
    
    let matchesDate = true;
    if (dateRange !== 'all' && payment.date) {
      const paymentDate = new Date(payment.date);
      const today = new Date();
      
      switch(dateRange) {
        case 'today':
          matchesDate = paymentDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          matchesDate = paymentDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          matchesDate = paymentDate >= monthAgo;
          break;
        case 'quarter':
          const quarterAgo = new Date(today);
          quarterAgo.setMonth(today.getMonth() - 3);
          matchesDate = paymentDate >= quarterAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDate;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const refundedAmount = payments
    .filter(p => p.status === 'refunded')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setPayments([...samplePayments]);
      setLoading(false);
    }, 500);
  };

  const handleExport = () => {
    // Simulate export functionality
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Invoice,Company,Amount,Status,Method,Date", 
        ...payments.map(p => 
          `"${p.invoiceNumber}","${p.company}",${p.amount},"${p.status}","${p.method}","${p.date}"`
        )].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `payments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusUpdate = (id: string, newStatus: Payment['status']) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
    alert(`Payment status updated to ${newStatus}`);
  };

  const handleRefund = (id: string) => {
    if (confirm('Are you sure you want to refund this payment?')) {
      const reason = prompt('Enter refund reason:') || 'Customer request';
      if (reason) {
        setPayments(payments.map(p => 
          p.id === id ? { ...p, status: 'refunded' } : p
        ));
        alert('Payment refunded successfully');
      }
    }
  };

  if (loading && payments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">View and manage payment transactions</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
          <button 
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
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
              <p className="text-sm font-medium text-gray-500">Pending Payments</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(pendingAmount)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Successful Payments</p>
              <p className="text-2xl font-semibold text-gray-900">
                {payments.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-purple-100">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Refunded</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(refundedAmount)}</p>
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
                placeholder="Search payments..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {methods.map(method => (
                <option key={method} value={method}>
                  {getMethodText(method)}
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
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
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
                  Method
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
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.invoiceNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(payment.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(payment.status)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getMethodText(payment.method)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    {payment.dueDate && (
                      <div className="text-xs text-gray-500">
                        Due: {new Date(payment.dueDate).toLocaleDateString('en-IN')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {payment.status !== 'completed' && payment.status !== 'refunded' && (
                        <button 
                          onClick={() => handleStatusUpdate(payment.id, 'completed')}
                          className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50"
                          title="Mark as Completed"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      {payment.status === 'completed' && (
                        <button
                          onClick={() => handleRefund(payment.id)}
                          className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                          title="Refund"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                      {payment.status === 'failed' && (
                        <button 
                          onClick={() => handleStatusUpdate(payment.id, 'pending')}
                          className="text-yellow-600 hover:text-yellow-900 px-2 py-1 rounded hover:bg-yellow-50"
                          title="Retry Payment"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          alert(`Payment Details:\n\nInvoice: ${payment.invoiceNumber}\nCompany: ${payment.company}\nAmount: ${formatCurrency(payment.amount)}\nStatus: ${payment.status}\nMethod: ${getMethodText(payment.method)}\nDate: ${new Date(payment.date).toLocaleDateString('en-IN')}\nProcessed By: ${payment.processedBy}`);
                        }}
                        className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No results */}
      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? 'Try adjusting your search or filter.' : 'No payment records yet.'}
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="text-sm text-gray-500">
        Showing {filteredPayments.length} of {payments.length} payments
      </div>
    </div>
  );
}