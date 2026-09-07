// app/dashboard/invoice/[id]/page.tsx
'use client';

import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  PrinterIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  ShieldCheckIcon,
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = 'https://diemex-backend.onrender.com';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  issueDate: string;
  dueDate: string;
  company?: string;
  exhibitorDetails?: any;
  boothDetails?: any;
  items?: any[];
  totals?: {
    subtotal?: number;
    gst?: number;
    deposit?: number;
    grandTotal?: number;
    servicesTotal?: number;
  };
  metadata?: {
    exhibitorInfo?: any;
    totals?: any;
    paymentId?: string;
    paymentDate?: string;
  };
}

export default function ExhibitorInvoiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as string;
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'checking' | 'success' | 'failed' | null>(null);

  const fetchInvoiceDetails = useCallback(async (opts?: { silent?: boolean }) => {
    try {
      if (!opts?.silent) setLoading(true);
      const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/invoices/${invoiceId}/details`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setInvoice(data.data);
        setError(null);
        return data.data as Invoice;
      } else if (response.status === 403) {
        setError('You do not have permission to view this invoice');
      } else if (response.status === 404) {
        setError('Invoice not found');
      } else {
        setError('Failed to load invoice details');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load invoice details');
    } finally {
      if (!opts?.silent) setLoading(false);
    }
    return null;
  }, [invoiceId]);

  const isPaidStatus = (status?: string) => String(status || '').toLowerCase() === 'paid';

  const verifyPayment = useCallback(async (orderId: string) => {
    setPaymentStatus('checking');
    const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');

    const markSuccess = async () => {
      setPaymentStatus('success');
      setShowPaymentSuccess(true);
      await fetchInvoiceDetails({ silent: true });
      window.setTimeout(() => setShowPaymentSuccess(false), 5000);
    };

    try {
      for (let attempt = 0; attempt < 6; attempt++) {
        const latest = await fetchInvoiceDetails({ silent: true });
        if (isPaidStatus(latest?.status)) {
          await markSuccess();
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/cashfree/verify-payment/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.data?.paymentStatus === 'SUCCESS') {
            await markSuccess();
            return;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      const latest = await fetchInvoiceDetails({ silent: true });
      if (isPaidStatus(latest?.status)) {
        await markSuccess();
        return;
      }

      setPaymentStatus('failed');
    } catch (error) {
      console.error('Payment verification error:', error);
      const latest = await fetchInvoiceDetails({ silent: true });
      if (isPaidStatus(latest?.status)) {
        setPaymentStatus('success');
        setShowPaymentSuccess(true);
        return;
      }
      setPaymentStatus('failed');
    }
  }, [fetchInvoiceDetails]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatusParam = urlParams.get('payment_status');
    const orderId = urlParams.get('order_id');

    if (paymentStatusParam === 'success' && orderId) {
      verifyPayment(orderId);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [invoiceId, verifyPayment]);

  useEffect(() => {
    fetchInvoiceDetails();
  }, [fetchInvoiceDetails]);

  useEffect(() => {
    if (isPaidStatus(invoice?.status) && paymentStatus === 'checking') {
      setPaymentStatus('success');
      setShowPaymentSuccess(true);
      window.setTimeout(() => setShowPaymentSuccess(false), 5000);
    }
  }, [invoice?.status, paymentStatus]);

useEffect(() => {
  let interval: NodeJS.Timeout;
  let checkCount = 0;
  const MAX_CHECKS = 10; // Reduced from 30 to 10
  const CHECK_INTERVAL = 10000; // Increased to 10 seconds
  
  // Only auto-refresh for pending invoices that don't have payment verification pending
  if (invoice?.status === 'pending' && checkCount < MAX_CHECKS) {
    // Check if payment was just made (within last 5 minutes)
    const lastPaymentAttempt = localStorage.getItem(`payment_attempt_${invoice.id}`);
    const shouldAutoCheck = lastPaymentAttempt && (Date.now() - parseInt(lastPaymentAttempt) < 300000);
    
    if (shouldAutoCheck) {
      interval = setInterval(() => {
        console.log(`Auto-checking payment status... (${checkCount + 1}/${MAX_CHECKS})`);
        fetchInvoiceDetails();
        checkCount++;
        
        if (checkCount >= MAX_CHECKS) {
          clearInterval(interval);
          localStorage.removeItem(`payment_attempt_${invoice.id}`);
        }
      }, CHECK_INTERVAL);
    }
  }
  
  return () => {
    if (interval) clearInterval(interval);
  };
}, [invoice?.status, fetchInvoiceDetails, invoice?.id]);


const downloadInvoice = async () => {
  if (!invoice?.id) return;
  
  setDownloading(true);
  try {
    const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
    
    // Add cache-busting parameter to prevent caching issues
    const response = await fetch(`${API_BASE_URL}/api/invoices/${invoice.id}/download?t=${Date.now()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/pdf', // Explicitly request PDF
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Download failed: ${response.status} - ${errorText}`);
    }
    
    // Get the filename from Content-Disposition header if available
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = `invoice-${invoice.invoiceNumber || invoice.id}.pdf`;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (match && match[1]) {
        filename = match[1].replace(/['"]/g, '');
      }
    }
    
    const blob = await response.blob();
    
    // Verify it's actually a PDF
    if (blob.type !== 'application/pdf' && !filename.endsWith('.pdf')) {
      console.warn('Unexpected content type:', blob.type);
    }
    
    // Create download URL
    const url = window.URL.createObjectURL(blob);
    
    // Create and trigger download link
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank'); // Open in new tab as fallback
    
    // Append to body, click, and cleanup
    document.body.appendChild(link);
    link.click();
    
    // Clean up - delay removal to ensure download starts
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
    
  } catch (error) {
    console.error('Error downloading invoice:', error);
    alert(`Failed to download invoice: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    setDownloading(false);
  }
};

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    if (!amount && amount !== 0) return '₹0';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; icon: React.ReactElement; bgColor: string }> = {
      paid: { color: 'text-green-800', bgColor: 'bg-green-100', icon: <CheckCircleIcon className="h-4 w-4" /> },
      pending: { color: 'text-yellow-800', bgColor: 'bg-yellow-100', icon: <ClockIcon className="h-4 w-4" /> },
      overdue: { color: 'text-red-800', bgColor: 'bg-red-100', icon: <ExclamationCircleIcon className="h-4 w-4" /> },
      draft: { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: <DocumentTextIcon className="h-4 w-4" /> }
    };
    const c = config[status] || config.draft;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${c.bgColor} ${c.color}`}>
        {c.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const calculateTotals = () => {
    const items = invoice?.items || [];
    const totals = invoice?.totals || invoice?.metadata?.totals || {};
    
    let calculatedSubtotal = 0;
    if (items.length > 0) {
      calculatedSubtotal = items.reduce((sum, item) => sum + (item.total || item.unitPrice * (item.quantity || 1)), 0);
    }
    
    const subtotal = totals.subtotal || totals.servicesTotal || calculatedSubtotal || 0;
    const gst = totals.gst || (subtotal * 0.18) || 0;
    const deposit = totals.deposit || 0;
    const grandTotal = totals.grandTotal || subtotal + gst + deposit;
    
    return { subtotal, gst, deposit, grandTotal };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <ExclamationCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || 'Invoice Not Found'}</h2>
          <p className="text-gray-600 mb-6">The invoice you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link href="/dashboard/invoice" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Invoices
          </Link>
        </div>
      </div>
    );
  }

  const exhibitor = invoice.exhibitorDetails || invoice.metadata?.exhibitorInfo || {};
  const booth = invoice.boothDetails || {};
  const items = invoice.items || [];
  const { subtotal, gst, deposit, grandTotal } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link href="/dashboard/invoice" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group">
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Invoices</span>
          </Link>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={downloadInvoice} 
              disabled={downloading} 
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              {downloading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <ArrowDownTrayIcon className="h-5 w-5" />
              )}
              Download PDF
            </button>

<button
  onClick={() => {
    const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
    const printUrl = `${API_BASE_URL}/api/invoices/${invoice.id}/print?token=${encodeURIComponent(token || '')}`;
    window.open(printUrl, '_blank');
  }}
  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
>
  <PrinterIcon className="h-5 w-5" />
  Print
</button>
          </div>
        </div>

        {/* Payment Success Alert */}
        {showPaymentSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">Payment Successful!</h3>
                <p className="text-sm text-green-600">
                  Your payment has been received. This invoice is now marked as paid.
                  {invoice.metadata?.paymentId && (
                    <span className="block text-xs mt-1">Transaction ID: {invoice.metadata.paymentId}</span>
                  )}
                </p>
              </div>
              <button 
                onClick={() => setShowPaymentSuccess(false)}
                className="text-green-600 hover:text-green-800"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Payment Status Checking */}
        {paymentStatus === 'checking' && !isPaidStatus(invoice.status) && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <ArrowPathIcon className="h-5 w-5 text-blue-600 animate-spin" />
              <div>
                <h3 className="font-semibold text-blue-800">Verifying Payment...</h3>
                <p className="text-sm text-blue-600">Please wait while we confirm your payment.</p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Failed Alert */}
        {paymentStatus === 'failed' && !isPaidStatus(invoice.status) && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <ExclamationCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800">Payment Verification Failed</h3>
                <p className="text-sm text-red-600">
                  We couldn't verify your payment status. Please contact support if you have made the payment.
                </p>
              </div>
              <button 
                onClick={() => setPaymentStatus(null)}
                className="text-red-600 hover:text-red-800"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Auto-refresh Indicator for Pending Invoices */}
        {invoice.status === 'pending' && autoCheckCount < 30 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowPathIcon className="h-4 w-4 text-yellow-600 animate-spin" />
                <span className="text-sm text-yellow-700">
                  Waiting for payment confirmation... Auto-checking every 5 seconds
                </span>
              </div>
              <span className="text-xs text-yellow-600">
                Attempt {autoCheckCount}/30
              </span>
            </div>
          </div>
        )}

        {/* Invoice Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Gradient */}
          <div className={`px-4 sm:px-8 py-6 sm:py-8 ${
            invoice.status === 'paid' 
              ? 'bg-gradient-to-r from-green-600 to-green-700'
              : invoice.status === 'pending'
              ? 'bg-gradient-to-r from-yellow-600 to-orange-600'
              : 'bg-gradient-to-r from-blue-600 to-indigo-700'
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-white/80 font-medium tracking-wide">INVOICE</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">{invoice.invoiceNumber}</h1>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-white/80 font-medium">Total Amount</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{formatCurrency(invoice.amount)}</p>
              </div>
            </div>
          </div>

          {/* Meta Info Grid */}
          <div className="px-4 sm:px-8 py-5 border-b bg-gray-50 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Issue Date</p>
              <p className="font-semibold text-gray-900 mt-1">{formatDate(invoice.issueDate)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Due Date</p>
              <p className="font-semibold text-gray-900 mt-1">{formatDate(invoice.dueDate)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
              <div className="mt-1">{getStatusBadge(invoice.status)}</div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Invoice ID</p>
              <p className="font-mono text-sm font-medium text-gray-900 mt-1">{invoice.id.substring(0, 12)}...</p>
            </div>
          </div>

          {/* Exhibitor Info */}
          <div className="px-4 sm:px-8 py-6 border-b">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
              <BuildingOfficeIcon className="h-5 w-5 text-blue-600" /> 
              Exhibitor Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs uppercase tracking-wide">Company Name</p>
                <p className="font-semibold text-gray-900 mt-1">{exhibitor.companyName || invoice.company || '—'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs uppercase tracking-wide">Contact Person</p>
                <p className="font-semibold text-gray-900 mt-1">{`${exhibitor.title || ''} ${exhibitor.firstName || ''} ${exhibitor.lastName || ''}`.trim() || '—'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs uppercase tracking-wide flex items-center gap-1">
                  <EnvelopeIcon className="h-3 w-3" /> Email
                </p>
                <p className="font-semibold text-gray-900 mt-1 break-all">{exhibitor.email || '—'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs uppercase tracking-wide flex items-center gap-1">
                  <DevicePhoneMobileIcon className="h-3 w-3" /> Mobile
                </p>
                <p className="font-semibold text-gray-900 mt-1">{exhibitor.mobile || exhibitor.phone || '—'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs uppercase tracking-wide">GST Number</p>
                <p className="font-semibold text-gray-900 mt-1">{exhibitor.gstNumber || '—'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs uppercase tracking-wide">Business Nature</p>
                <p className="font-semibold text-gray-900 mt-1">{exhibitor.businessNature || '—'}</p>
              </div>
            </div>
          </div>

          {/* Booth Info */}
          {booth.boothNo && (
            <div className="px-4 sm:px-8 py-6 border-b">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                Booth Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Booth Number</p>
                  <p className="font-bold text-blue-600 text-lg mt-1">{booth.boothNo || '—'}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Area Booked</p>
                  <p className="font-semibold text-gray-900 mt-1">{booth.sqMtrBooked ? `${booth.sqMtrBooked} sq.m` : '—'}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Security Deposit</p>
                  <p className="font-semibold text-gray-900 mt-1">{formatCurrency(deposit)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Services Table */}
          {items.length > 0 && (
            <div className="px-4 sm:px-8 py-6 border-b">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                <BanknotesIcon className="h-5 w-5 text-blue-600" />
                Services & Items
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item: any, i: number) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-sm text-gray-900">{item.description || item.name}</td>
                        <td className="px-4 py-3 text-center text-sm text-gray-600">{item.quantity || 1}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600">{formatCurrency(item.unitPrice || 0)}</td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{formatCurrency(item.total || (item.unitPrice * (item.quantity || 1)))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Totals Section */}
          <div className="px-4 sm:px-8 py-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="max-w-xs ml-auto">
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200">
                  <span className="text-gray-600 flex items-center gap-1">
                    <ReceiptPercentIcon className="h-4 w-4" />
                    GST (18%):
                  </span>
                  <span className="font-medium text-gray-900">{formatCurrency(gst)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 flex items-center gap-1">
                    <ShieldCheckIcon className="h-4 w-4" />
                    Security Deposit:
                  </span>
                  <span className="font-medium text-gray-900">{formatCurrency(deposit)}</span>
                </div>
                <div className="flex justify-between items-center py-3 mt-2 border-t-2 border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Grand Total:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="px-4 sm:px-8 py-4 bg-gray-50 border-t">
            <p className="text-xs text-gray-500 text-center">
              This is a system generated invoice. For any queries, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}