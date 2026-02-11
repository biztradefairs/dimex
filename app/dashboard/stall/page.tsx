// app/dashboard/stall/page.tsx
'use client';

import { useState } from 'react';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Stall } from '@/types';

const initialStalls: Stall[] = [
  {
    id: 'ST001',
    stallNumber: 'A-12',
    location: 'Main Hall, Entrance Area',
    size: '3m x 3m',
    type: 'premium',
    price: 4500,
    bookedDate: new Date('2024-01-15'),
    status: 'confirmed',
    amenities: ['Power Outlets', 'WiFi', 'Spotlights', 'Table & Chairs', 'Storage']
  }
];

export default function StallPage() {
  const [stalls] = useState(initialStalls);

  const getStatusIcon = (status: Stall['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
    }
  };

  const getTypeColor = (type: Stall['type']) => {
    switch (type) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'corner':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Booked Stalls</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Book Additional Stall
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stalls.map((stall) => (
          <div key={stall.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{stall.stallNumber}</h2>
                  <p className="text-gray-600">{stall.location}</p>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(stall.status)}
                  <span className="ml-2 text-sm font-medium capitalize">{stall.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium text-gray-900">{stall.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ₹{getTypeColor(stall.type)}`}>
                    {stall.type.charAt(0).toUpperCase() + stall.type.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium text-gray-900">₹{stall.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booked Date</p>
                  <p className="font-medium text-gray-900">
                    {stall.bookedDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Amenities Included</h3>
                <div className="flex flex-wrap gap-2">
                  {stall.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Important Information</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
            Stall setup begins on January 28, 2024 at 8:00 AM
          </li>
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
            All materials must be removed by February 2, 2024 at 6:00 PM
          </li>
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
            Electrical requirements must be submitted 2 weeks before the event
          </li>
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
            Contact exhibition support for any special requirements
          </li>
        </ul>
      </div>
    </div>
  );
}