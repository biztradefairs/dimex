// app/dashboard/invoice/page.tsx
'use client';

import { useState } from 'react';
import { PrinterIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Invoice } from '@/types';

const initialInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    invoiceNumber: 'INV-2024-001',
    date: new Date('2024-01-10'),
    dueDate: new Date('2024-02-10'),
    amount: 4500,
    paidAmount: 4500,
    status: 'paid',
    items: [
      { description: 'Premium Stall Booking', quantity: 1, unitPrice: 4000, total: 4000 },
      { description: 'Electrical Setup', quantity: 1, unitPrice: 500, total: 500 },
    ]
  },
  {
    id: 'INV-2024-002',
    invoiceNumber: 'INV-2024-002',
    date: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15'),
    amount: 2500,
    paidAmount: 1500,
    status: 'pending',
    items: [
      { description: 'Additional Stall', quantity: 1, unitPrice: 2000, total: 2000 },
      { description: 'Furniture Rental', quantity: 1, unitPrice: 500, total: 500 },
    ]
  }
];

export default function InvoicePage() {
  const [invoices] = useState(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Invoices & Payments</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
           <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Make Payment
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(6000)}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-500">Pending Amount</p>
          <p className="text-2xl font-bold text-yellow-600">{formatCurrency(1000)}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-500">Total Invoices</p>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Invoices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.dueDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <PrinterIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="h-10 w-16 bg-blue-100 rounded flex items-center justify-center">
                <span className="font-bold text-blue-600">VISA</span>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-900">Primary</span>
            </div>
            <p className="text-sm text-gray-600">**** **** **** 1234</p>
            <p className="text-sm text-gray-600">Expires: 12/25</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="h-10 w-16 bg-red-100 rounded flex items-center justify-center">
                <span className="font-bold text-red-600">PP</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">payments@company.com</p>
            <p className="text-sm text-gray-600">PayPal Account</p>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              + Add Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Invoice Details</h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500">Invoice #{selectedInvoice.invoiceNumber}</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-gray-900">{selectedInvoice.date.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="text-gray-900">{selectedInvoice.dueDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-b py-4 my-4">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-500 py-2">Description</th>
                      <th className="text-left text-sm font-medium text-gray-500 py-2">Quantity</th>
                      <th className="text-left text-sm font-medium text-gray-500 py-2">Unit Price</th>
                      <th className="text-left text-sm font-medium text-gray-500 py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 text-sm text-gray-900">{item.description}</td>
                        <td className="py-2 text-sm text-gray-900">{item.quantity}</td>
                        <td className="py-2 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                        <td className="py-2 text-sm text-gray-900">{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedInvoice.amount)}</p>
                  {selectedInvoice.status === 'pending' && (
                    <p className="text-sm text-gray-500 mt-1">
                      Paid: {formatCurrency(selectedInvoice.paidAmount)} | Due: {formatCurrency(selectedInvoice.amount - selectedInvoice.paidAmount)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <PrinterIcon className="h-4 w-4 inline mr-2" />
                Print
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}