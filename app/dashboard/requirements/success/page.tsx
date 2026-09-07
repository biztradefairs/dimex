// app/dashboard/requirements/success/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  CheckCircleIcon, 
  DocumentTextIcon, 
  PrinterIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  HomeIcon,
  ReceiptPercentIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { clearRequirementsDraft } from '@/lib/requirementsDraft';

const API_BASE_URL = 'https://diemex-backend.onrender.com';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const invoiceId = searchParams.get('invoiceId');
  const orderId = searchParams.get('order_id');
  const paymentStatus = searchParams.get('status');
  const paymentReference = searchParams.get('paymentReference');
  
  const [invoice, setInvoice] = useState<any>(null);
  const [requirementData, setRequirementData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState<string | null>(null);

  useEffect(() => {
    clearRequirementsDraft();
  }, []);

  // Verify payment status with Cashfree
  const verifyCashfreePayment = useCallback(async (orderIdParam: string) => {
    try {
      setVerifyingPayment(true);
      const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
      
      console.log('Verifying payment for order:', orderIdParam);
      
      const response = await fetch(`${API_BASE_URL}/api/cashfree/verify-payment/${orderIdParam}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const result = await response.json();
      console.log('Payment verification result:', result);
      
      if (result.success && result.data.paymentStatus === 'SUCCESS') {
        console.log('✅ Payment verified successfully!');
        // Refresh invoice after payment verification
        if (invoiceId) {
          await fetchInvoiceWithDetails(invoiceId);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    } finally {
      setVerifyingPayment(false);
    }
  }, [invoiceId]);

  // Check payment status from URL and verify
  useEffect(() => {
    const checkPayment = async () => {
      // Check if we have order_id from Cashfree redirect
      if (orderId) {
        console.log('Order ID found in URL:', orderId);
        const verified = await verifyCashfreePayment(orderId);
        if (verified) {
          // Remove query params from URL
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    };
    
    checkPayment();
  }, [orderId, verifyCashfreePayment]);

  const fetchInvoiceWithDetails = async (id: string) => {
    try {
      const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/invoices/${id}/details`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setInvoice(data.data);
        setRequirementData(data.data);
        setInvoiceStatus(data.data.status);
        
        // Also update localStorage
        if (data.data.status === 'paid') {
          localStorage.setItem(`invoice_${id}_paid`, 'true');
        }
      } else {
        // Fallback to regular invoice fetch
        await fetchInvoiceById(id);
      }
    } catch (error) {
      console.error('Error fetching invoice details:', error);
      if (id) {
        await fetchInvoiceById(id);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoiceById = async (id: string) => {
    if (!id) return;
    
    try {
      const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/invoices/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setInvoice(data.data);
        setInvoiceStatus(data.data.status);
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First check if we have payment info from URL
        if (orderId) {
          // Payment verification is handled by the useEffect above
          return;
        }
        
        if (invoiceId) {
          await fetchInvoiceWithDetails(invoiceId);
        } else {
          // Try to get from localStorage
          const savedInvoiceId = localStorage.getItem('last_invoice_id');
          if (savedInvoiceId) {
            await fetchInvoiceWithDetailsById(savedInvoiceId);
          } else {
            // Try to get by requirements ID
            const savedRequirementsId = localStorage.getItem('last_requirements_id');
            if (savedRequirementsId) {
              await fetchInvoiceByRequirements(savedRequirementsId);
            } else {
              setLoading(false);
            }
          }
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError('Failed to load invoice details');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [invoiceId, orderId]);

  const fetchInvoiceWithDetailsById = async (id: string) => {
    if (!id) return;
    
    try {
      const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/invoices/${id}/details`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setInvoice(data.data);
        setRequirementData(data.data);
        setInvoiceStatus(data.data.status);
      } else {
        await fetchInvoiceById(id);
      }
    } catch (error) {
      console.error('Error fetching invoice details:', error);
      await fetchInvoiceById(id);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoiceByRequirements = async (requirementsId: string) => {
    if (!requirementsId) return;
    
    try {
      const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/invoices/by-requirements/${requirementsId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setInvoice(data.data);
        setInvoiceStatus(data.data.status);
        if (data.data?.id) {
          localStorage.setItem('last_invoice_id', data.data.id);
        }
      } else {
        console.log('No invoice found for this requirement');
      }
    } catch (error) {
      console.error('Error fetching invoice by requirements:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const sendInvoiceEmail = async () => {
    const emailTo = invoice?.exhibitorDetails?.email || invoice?.metadata?.exhibitorInfo?.email;
    if (!invoice?.id || !emailTo) return;
    
    setSendingEmail(true);
    try {
      const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/invoices/${invoice.id}/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailTo
        })
      });
      
      if (response.ok) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending invoice email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return '₹0';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getPaymentModeIcon = (mode: string) => {
    switch(mode) {
      case 'cash':
        return '💵';
      case 'cheque':
        return '📝';
      case 'dd':
        return '📄';
      default:
        return '💰';
    }
  };

  if (loading || verifyingPayment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {verifyingPayment ? (
            <>
              <ArrowPathIcon className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
              <p className="mt-4 text-gray-600 font-medium">Verifying your payment...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we confirm your transaction</p>
            </>
          ) : (
            <>
              <ArrowPathIcon className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
              <p className="mt-4 text-gray-600 font-medium">Loading invoice details...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 bg-red-100 rounded-full mb-6">
            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const exhibitorDetails = invoice?.exhibitorDetails || invoice?.metadata?.exhibitorInfo || {};
  const boothDetails = invoice?.boothDetails || {};
  const totals = invoice?.totals || invoice?.metadata?.totals || {};
  const items = invoice?.items || [];
  const paymentInfo = invoice?.paymentDetails || invoice?.metadata?.paymentInfo || {};
  
  // Check if invoice is paid (either from API or from verification)
  const isPaid = invoiceStatus === 'paid' || paymentStatus === 'verified' || paymentStatus === 'success';
  const isPending = (!isPaid && (paymentStatus === 'pending' || invoiceStatus === 'pending_verification' || invoiceStatus === 'pending'));

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Success/Status Header */}
        <div className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center mb-6 ${
          isPaid ? 'border-l-4 border-l-green-500' : isPending ? 'border-l-4 border-l-yellow-500' : ''
        }`}>
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${
            isPaid ? 'bg-green-100' : isPending ? 'bg-yellow-100' : 'bg-green-100'
          }`}>
            {isPending ? (
              <ClockIcon className="h-10 w-10 text-yellow-600" />
            ) : (
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {isPaid ? 'Payment Successful!' : isPending ? 'Application Submitted - Payment Pending' : 'Application Submitted Successfully!'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {isPaid 
              ? 'Your payment has been successfully processed. Your registration is now confirmed!'
              : isPending 
              ? 'Your exhibition requirements have been received. Our team will verify your payment details.'
              : 'Your exhibition requirements have been received. A confirmation email has been sent to your registered email address.'
            }
          </p>
          
          {isPaid && (
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-2">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">Payment Confirmed</span>
            </div>
          )}
          
          {paymentReference && (
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-2">
              <ReceiptPercentIcon className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Payment Reference: {paymentReference}</span>
            </div>
          )}
          
          {invoice && (
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <ReceiptPercentIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">Invoice #{invoice.invoiceNumber}</span>
            </div>
          )}
        </div>

        {/* Pending Payment Warning - Only show if NOT paid */}
        {isPending && paymentData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Payment Pending Verification</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Your payment details have been submitted and are pending verification by our team.
                  Once verified, you will receive a confirmation email and your invoice status will be updated.
                </p>
                {paymentData && (
                  <div className="mt-3 text-xs text-yellow-700 space-y-1">
                    <p><strong>Payment Mode:</strong> {getPaymentModeIcon(paymentData.paymentMode)} {paymentData.paymentMode?.toUpperCase()}</p>
                    {paymentData.paymentMode === 'cheque' && (
                      <>
                        <p><strong>Cheque Number:</strong> {paymentData.cheque_number}</p>
                        <p><strong>Bank Name:</strong> {paymentData.bank_name}</p>
                      </>
                    )}
                    {paymentData.paymentMode === 'dd' && (
                      <>
                        <p><strong>DD Number:</strong> {paymentData.dd_number}</p>
                        <p><strong>Bank Name:</strong> {paymentData.bank_name}</p>
                      </>
                    )}
                    {paymentData.payment_mode === 'cash' && (
                      <p><strong>Amount Paid:</strong> {formatCurrency(paymentData.amount_paid)}</p>
                    )}
                    <p><strong>Submitted on:</strong> {formatDate(paymentData.created_at)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Paid Success Message */}
        {isPaid && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Payment Verified!</h3>
                <p className="text-sm text-green-700">
                  Your payment has been successfully verified. You are now confirmed for the exhibition.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Details */}
        {invoice && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Invoice Header */}
            <div className={`px-6 py-4 ${
              isPaid ? 'bg-gradient-to-r from-green-600 to-green-700' : 
              isPending ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 
              'bg-gradient-to-r from-blue-600 to-blue-700'
            }`}>
              <div className="flex justify-between items-center text-white">
                <div>
                  <p className="text-sm opacity-80">INVOICE</p>
                  <p className="text-2xl font-bold">{invoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">Total Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(invoice.amount || totals.total)}</p>
                </div>
              </div>
            </div>

            {/* Invoice Meta Info */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Issue Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(invoice.issueDate)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Due Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(invoice.dueDate)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    isPaid
                      ? 'bg-green-100 text-green-800'
                      : isPending
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isPaid ? 'PAID' : isPending ? 'PENDING VERIFICATION' : invoice.status?.toUpperCase() || 'PENDING'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500">Payment Mode</p>
                  <p className="font-semibold text-gray-900">
                    {paymentData?.paymentMode || paymentInfo.paymentMode || 'Online Payment'}
                  </p>
                </div>
              </div>
            </div>

            {/* Rest of the invoice details remain the same */}
            {/* Exhibitor Details */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BuildingOfficeIcon className="h-4 w-4 text-blue-600" />
                Exhibitor Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Company Name</p>
                  <p className="font-medium text-gray-900">{exhibitorDetails.companyName || invoice.company || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Contact Person</p>
                  <p className="font-medium text-gray-900">
                    {`${exhibitorDetails.title || ''} ${exhibitorDetails.firstName || ''} ${exhibitorDetails.lastName || ''}`.trim() || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 flex items-center gap-1">
                    <EnvelopeIcon className="h-3 w-3" />
                    Email
                  </p>
                  <p className="font-medium text-gray-900">{exhibitorDetails.email || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500 flex items-center gap-1">
                    <DevicePhoneMobileIcon className="h-3 w-3" />
                    Mobile
                  </p>
                  <p className="font-medium text-gray-900">{exhibitorDetails.mobile || exhibitorDetails.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500">GST Number</p>
                  <p className="font-medium text-gray-900">{exhibitorDetails.gstNumber || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Business Nature</p>
                  <p className="font-medium text-gray-900">{exhibitorDetails.businessNature || '—'}</p>
                </div>
              </div>
            </div>

            {/* Booth Details */}
            {Object.keys(boothDetails).length > 0 && (
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  Booth Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Booth Number</p>
                    <p className="font-medium text-gray-900">{boothDetails.boothNo || 'Not assigned'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Area Booked</p>
                    <p className="font-medium text-gray-900">{boothDetails.sqMtrBooked ? `${boothDetails.sqMtrBooked} sq.m` : '—'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Security Deposit</p>
                    <p className="font-medium text-gray-900">{formatCurrency(totals.deposit || 0)}</p>
                  </div>
                  {boothDetails.contractorCompany && (
                    <div>
                      <p className="text-gray-500">Contractor</p>
                      <p className="font-medium text-gray-900">{boothDetails.contractorCompany}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Services Table */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Services & Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {items.map((item: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-gray-900">{item.description}</td>
                          <td className="px-3 py-2 text-center text-gray-600">{item.quantity || 1}</td>
                          <td className="px-3 py-2 text-right text-gray-600">{formatCurrency(item.unitPrice || 0)}</td>
                          <td className="px-3 py-2 text-right font-medium text-gray-900">{formatCurrency(item.total || 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="max-w-xs ml-auto">
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(totals.servicesTotal || (invoice.amount - (totals.gst || 0) - (totals.deposit || 0)))}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">GST (18%):</span>
                  <span className="font-medium">{formatCurrency(totals.gst || (invoice.amount * 0.18))}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-t border-gray-200 mt-1 pt-2">
                  <span className="text-gray-600">Security Deposit:</span>
                  <span className="font-medium">{formatCurrency(totals.deposit || 0)}</span>
                </div>
                <div className="flex justify-between text-base font-bold py-2 border-t border-gray-300 mt-1">
                  <span className="text-gray-900">Grand Total:</span>
                  <span className="text-blue-600">{formatCurrency(invoice.amount || totals.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={downloadInvoice}
            disabled={downloading || !invoice}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {downloading ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              <DocumentTextIcon className="h-5 w-5" />
            )}
            Download Invoice (PDF)
          </button>
          
          {(exhibitorDetails.email || invoice?.metadata?.exhibitorInfo?.email) && (
            <button
              onClick={sendInvoiceEmail}
              disabled={sendingEmail || emailSent}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              {sendingEmail ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : emailSent ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              ) : (
                <EnvelopeIcon className="h-5 w-5" />
              )}
              {emailSent ? 'Email Sent!' : 'Send Invoice to Email'}
            </button>
          )}
          
          <button
            onClick={() => {
              if (invoice?.id) {
                const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
                const printUrl = `${API_BASE_URL}/api/invoices/${invoice.id}/print?token=${encodeURIComponent(token || '')}`;
                window.open(printUrl, '_blank');
              }
            }}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            <PrinterIcon className="h-5 w-5" />
            Print Invoice
          </button>
        </div>
        
        {/* Navigation Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center mb-4">
            A copy of the invoice has been saved to your account. You can access it anytime from your dashboard.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              <HomeIcon className="h-4 w-4" />
              Go to Dashboard
            </Link>
            <Link
              href="/dashboard/invoice"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              <ReceiptPercentIcon className="h-4 w-4" />
              View All Invoices
            </Link>
          </div>
        </div>
        
        {/* Payment Instructions - Only show for pending payments */}
        {isPending && (
          <div className="mt-6 bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CurrencyRupeeIcon className="h-5 w-5 text-green-600" />
              Payment Instructions
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Please complete your payment using one of these methods:</p>
              
              <div className="bg-green-50 p-4 rounded-lg mt-2">
                <h4 className="font-semibold text-green-800 mb-2">Option 1: Online Bank Transfer</h4>
                <div className="space-y-1">
                  <p><strong>Account Name:</strong> Maxx Business Media Pvt. Ltd.</p>
                  <p><strong>Account Number:</strong> 272605000632</p>
                  <p><strong>IFSC Code:</strong> ICIC0002726</p>
                  <p><strong>Bank:</strong> ICICI Bank, New Delhi</p>
                  <p><strong>Branch:</strong> Connaught Place</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Option 2: Cash/Cheque/DD at Venue</h4>
                <p className="text-sm">
                  You can also make the payment at the exhibition venue during the event days.
                  Please bring a printed copy of this invoice for reference.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg mt-3">
                <p className="text-xs text-yellow-800">
                  <span className="font-semibold">Important:</span> Please use your Invoice Number <strong>{invoice?.invoiceNumber || 'N/A'}</strong> as reference when making the payment.
                  After payment, please upload the receipt in your dashboard for verification.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Support Section */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            For any queries, please contact our support team at{' '}
            <a href="mailto:support@diemex.com" className="text-blue-600 hover:underline">
              support@diemex.com
            </a>
            {' '}or call +91 1234567890
          </p>
        </div>
      </div>
    </div>
  );
}