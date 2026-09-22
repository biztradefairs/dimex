// components/QRCodeScanner.jsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import toast from 'react-hot-toast';

const QRCodeScanner = ({ onScanSuccess, onScanError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';

  useEffect(() => {
    // Initialize scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
      },
      false
    );

    scannerRef.current = scanner;

    const onScanSuccessHandler = async (decodedText, decodedResult) => {
      console.log('QR Code scanned:', decodedText);
      
      try {
        // Parse QR code data - it contains visitor code
        // Format: "DIEMEX 2026\nVisitor\nName: XXX\nEmail: XXX\nCode: diemex-1234567890\nDate: 24-26 Mar 2027"
        const lines = decodedText.split('\n');
        const codeLine = lines.find(line => line.includes('Code: '));
        
        if (codeLine) {
          const visitorCode = codeLine.replace('Code: ', '').trim();
          console.log('Visitor Code:', visitorCode);
          
          // Call API to check-in visitor
          const response = await fetch(`${API_URL}/api/contact/visitor/checkin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ visitorCode }),
          });
          
          const data = await response.json();
          
          if (data.success) {
            toast.success(`Welcome ${data.visitor.firstName} ${data.visitor.lastName || ''}! Checked in successfully.`);
            if (onScanSuccess) {
              onScanSuccess({
                ...data.visitor,
                checkInTime: new Date().toISOString()
              });
            }
          } else {
            if (data.alreadyCheckedIn) {
              toast.error(`${data.message} - Already checked in at ${new Date(data.checkInTime).toLocaleTimeString()}`);
            } else {
              toast.error(data.message || 'Invalid QR code');
            }
            if (onScanError) onScanError(data.message);
          }
        } else {
          toast.error('Invalid QR code format');
          if (onScanError) onScanError('Invalid QR code format');
        }
      } catch (error) {
        console.error('Error processing QR code:', error);
        toast.error('Error processing QR code');
        if (onScanError) onScanError(error.message);
      }
    };

    const onScanErrorHandler = (error) => {
      console.warn('QR scan error:', error);
      // Don't show toast for every scan error, just log it
    };

    scanner.render(onScanSuccessHandler, onScanErrorHandler);
    setIsScanning(true);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error('Failed to clear scanner:', error);
        });
      }
    };
  }, [onScanSuccess, onScanError, API_URL]);

  return (
    <div className="w-full">
      <div id="qr-reader" className="w-full max-w-md mx-auto"></div>
      {!isScanning && (
        <div className="text-center text-gray-500 mt-4">
          Initializing camera...
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;