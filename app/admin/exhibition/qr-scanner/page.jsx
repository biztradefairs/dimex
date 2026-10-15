// app/admin/qr-scanner/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import toast, { Toaster } from 'react-hot-toast';

// Dynamically import QR scanner to avoid SSR issues
const QRCodeScanner = dynamic(() => import('@/components/QRCodeScanner'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
});

const AdminQRScanner = () => {
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    checkedIn: 0,
    pending: 0
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';

  useEffect(() => {
    fetchStats();
    fetchRecentCheckIns();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(() => {
      fetchStats();
      fetchRecentCheckIns();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact/visitors/all`, { headers: { Authorization: 'Bearer ' + (localStorage.getItem('admin_token') || '') }, cache: 'no-store' });
      const data = await response.json();
      if (data.success) {
        setStats({
          total: data.total,
          checkedIn: data.checkedIn,
          pending: data.total - data.checkedIn
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentCheckIns = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact/visitors/checked-in`, { headers: { Authorization: 'Bearer ' + (localStorage.getItem('admin_token') || '') }, cache: 'no-store' });
      const data = await response.json();
      if (data.success) {
        setRecentCheckIns(data.visitors.slice(0, 10)); // Show last 10 check-ins
      }
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    }
  };

  const handleScanSuccess = (visitor) => {
    // Add to recent check-ins
    setRecentCheckIns(prev => [visitor, ...prev].slice(0, 10));
    fetchStats();
    fetchRecentCheckIns();
  };

  const handleScanError = (error) => {
    console.error('Scan error:', error);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Visitor Check-in System</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Registrations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Checked In</p>
                <p className="text-3xl font-bold text-green-600">{stats.checkedIn}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Check-in</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Scanner */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan Visitor QR Code</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <QRCodeScanner 
                onScanSuccess={handleScanSuccess}
                onScanError={handleScanError}
              />
              <p className="text-sm text-gray-500 text-center mt-4">
                Position the QR code within the frame to scan
              </p>
            </div>
          </div>
          
          {/* Recent Check-ins */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Check-ins</h2>
            <div className="space-y-3">
              {recentCheckIns.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent check-ins</p>
              ) : (
                recentCheckIns.map((visitor, index) => (
                  <div key={index} className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{visitor.name}</p>
                        <p className="text-sm text-gray-600">{visitor.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {new Date(visitor.checkInTime).toLocaleTimeString()}
                        </p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Checked In
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How to use:</h3>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Position the QR code in front of the camera</li>
            <li>Once scanned, visitor will be automatically checked in</li>
            <li>Check-in status will be recorded with timestamp</li>
            <li>Recent check-ins will appear in the list on the right</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminQRScanner;