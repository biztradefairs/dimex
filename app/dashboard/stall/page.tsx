// app/dashboard/stall/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  WifiIcon,
  BoltIcon,
  LightBulbIcon,
  ComputerDesktopIcon,
  CubeIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Types
interface Stall {
  id: string;
  stallNumber: string;
  location: string;
  size: string;
  type: 'standard' | 'premium' | 'corner' | 'island' | 'peninsula';
  price: number;
  bookedDate: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  amenities: string[];
  dimensions?: string;
  notes?: string;
  invoiceNumber?: string;
  paymentStatus?: 'paid' | 'pending' | 'partial' | 'cancelled';
}

// API Response Types
interface ApiStallResponse {
  id: string;
  boothNumber?: string;
  boothSize?: string;
  boothType?: string;
  boothDimensions?: string;
  boothNotes?: string;
  boothCost?: number;
  registrationDate?: string;
  paymentStatus?: string;
  invoiceNumber?: string;
  status?: string;
  stallDetails?: {
    size?: string;
    type?: string;
    dimensions?: string;
    notes?: string;
    price?: string | number;
  };
}

export default function StallPage() {
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const router = useRouter();

  // Function to get token
  const getAuthToken = () => {
    const exhibitorToken = localStorage.getItem('exhibitor_token');
    if (exhibitorToken) return exhibitorToken;
    
    const token = localStorage.getItem('token');
    if (token) return token;
    
    return null;
  };

  // Function to check if we're logged in
  const checkAuth = () => {
    const token = getAuthToken();
    return !!token;
  };

  useEffect(() => {
    if (!checkAuth()) {
      setError('Please log in to view your stalls');
      setLoading(false);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return;
    }
    
    fetchStallData();
  }, []);

  // Fetch stall data from API
  const fetchStallData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getAuthToken();
      
      if (!token) {
        setError('Authentication required');
        router.push('/login');
        return;
      }

      console.log('📡 Fetching stall data...');
      
      // Fetch from profile endpoint which includes price
      const profileResponse = await axios.get('https://diemex-backend.onrender.com/api/exhibitorDashboard/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const fetchedStalls: Stall[] = [];

      // Process profile data
      if (profileResponse.data.success) {
        const profileData = profileResponse.data.data;
        const stallFromProfile = mapToStall(profileData);
        if (stallFromProfile) fetchedStalls.push(stallFromProfile);
      }

      // If we have stalls from API, use them
      if (fetchedStalls.length > 0) {
        setStalls(fetchedStalls);
      } else {
        // Show demo data if no stalls found
        setStalls(getDemoStalls());
      }

    } catch (error: any) {
      console.error('❌ Error fetching stall data:', error);
      setError('Failed to load stall information. Showing demo data.');
      setStalls(getDemoStalls());
    } finally {
      setLoading(false);
    }
  };

  // Map API data to Stall type - FIXED: NO USD CONVERSION
  const mapToStall = (data: any): Stall | null => {
    if (!data) return null;

    // Parse stallDetails if it exists
    let stallDetails = data.stallDetails || {};
    if (typeof stallDetails === 'string') {
      try {
        stallDetails = JSON.parse(stallDetails);
      } catch {
        stallDetails = {};
      }
    }

    // Determine stall number
    const stallNumber = data.boothNumber || data.booth || 'Not assigned';
    if (stallNumber === 'Not assigned') return null;

    // Determine status
    let status: 'confirmed' | 'pending' | 'cancelled' = 'pending';
    if (data.status === 'active' || data.status === 'approved' || data.paymentStatus === 'paid') {
      status = 'confirmed';
    } else if (data.status === 'rejected' || data.status === 'cancelled') {
      status = 'cancelled';
    }

    // Determine type
    const boothType = data.boothType || stallDetails?.type || 'standard';
    let type: 'standard' | 'premium' | 'corner' | 'island' | 'peninsula' = 'standard';
    if (boothType === 'premium' || boothType === 'corner' || boothType === 'island' || boothType === 'peninsula') {
      type = boothType;
    }

    // IMPORTANT: Get price directly in INR - NO CONVERSION NEEDED
    let priceInINR = 0;
    
    // Try to get price from various fields (all values are already in INR)
    if (stallDetails.price) {
      priceInINR = parseFloat(stallDetails.price.toString()) || 0;
    } else if (data.boothPrice) {
      priceInINR = parseFloat(data.boothPrice.toString()) || 0;
    } else if (data.price) {
      priceInINR = parseFloat(data.price.toString()) || 0;
    } else if (data.boothCost) {
      priceInINR = parseFloat(data.boothCost.toString()) || 0;
    }

    // Registration date
    const bookedDate = data.registrationDate || data.createdAt || new Date().toISOString();

    // Amenities based on booth type and price (price is already in INR)
    const amenities = getAmenitiesForBoothType(type, priceInINR);

    return {
      id: data.id || `stall-${Date.now()}`,
      stallNumber,
      location: data.location || data.address || 'Main Exhibition Hall',
      size: data.boothSize || stallDetails?.size || 'Standard',
      type,
      price: priceInINR, // This is already in INR
      bookedDate: new Date(bookedDate),
      status,
      amenities,
      dimensions: data.boothDimensions || stallDetails?.dimensions,
      notes: data.boothNotes || stallDetails?.notes,
      invoiceNumber: data.invoiceNumber,
      paymentStatus: data.paymentStatus
    };
  };

  // Get amenities based on booth type
  const getAmenitiesForBoothType = (type: string, price: number): string[] => {
    const baseAmenities = ['Power Outlets', 'WiFi'];
    
    const amenitiesByType: Record<string, string[]> = {
      standard: ['Basic Lighting', 'Table', '2 Chairs'],
      premium: ['Premium Lighting', 'Carpet Flooring', 'Storage Room', 'Hospitality Service'],
      corner: ['Corner Location', 'Double Sided Access', 'Premium Lighting', 'Carpet Flooring'],
      island: ['4-Sided Access', 'Premium Lighting', 'Carpet Flooring', 'Storage Room', 'Hospitality Service', 'VIP Lounge Access'],
      peninsula: ['3-Sided Access', 'Premium Lighting', 'Carpet Flooring', 'Storage Room']
    };

    const additionalAmenities = [];
    if (price > 500000) additionalAmenities.push('VIP Lounge Access'); // > ₹5,00,000
    if (price > 800000) additionalAmenities.push('Parking Pass'); // > ₹8,00,000

    return [...baseAmenities, ...(amenitiesByType[type] || amenitiesByType.standard), ...additionalAmenities];
  };

  // Demo stalls for fallback (prices in INR)
  const getDemoStalls = (): Stall[] => {
    return [
      {
        id: 'ST001',
        stallNumber: 'A-12',
        location: 'Main Hall, Entrance Area',
        size: '3m x 3m',
        type: 'premium',
        price: 373500, // ₹3,73,500
        bookedDate: new Date('2024-01-15'),
        status: 'confirmed',
        amenities: ['Power Outlets', 'WiFi', 'Premium Lighting', 'Carpet Flooring', 'Storage Room', 'Hospitality Service']
      },
      {
        id: 'ST002',
        stallNumber: 'B-24',
        location: 'Hall B, Corner Section',
        size: '4m x 4m',
        type: 'corner',
        price: 315400, // ₹3,15,400
        bookedDate: new Date('2024-01-20'),
        status: 'pending',
        amenities: ['Power Outlets', 'WiFi', 'Corner Location', 'Double Sided Access', 'Premium Lighting']
      }
    ];
  };

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

  const getStatusColor = (status: Stall['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const getTypeColor = (type: Stall['type']) => {
    switch (type) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'corner':
        return 'bg-blue-100 text-blue-800';
      case 'island':
        return 'bg-indigo-100 text-indigo-800';
      case 'peninsula':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Currency formatter for Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Alternative custom formatter for Indian format (Crores/Lakhs)
  const formatIndianCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(2)} K`;
    }
    return `₹${amount}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes('WiFi')) return <WifiIcon className="h-4 w-4" />;
    if (amenity.includes('Power')) return <BoltIcon className="h-4 w-4" />;
    if (amenity.includes('Lighting')) return <LightBulbIcon className="h-4 w-4" />;
    if (amenity.includes('Computer') || amenity.includes('Tech')) return <ComputerDesktopIcon className="h-4 w-4" />;
    return <CubeIcon className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6">
              <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Booked Stalls</h1>
          <p className="text-gray-600 mt-1">View and manage your exhibition booth details</p>
        </div>
        <button 
          onClick={() => fetchStallData()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">{error}</p>
          </div>
        </div>
      )}

      {/* Stalls Grid */}
      {stalls.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <MapPinIcon className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Stalls Booked Yet</h3>
          <p className="text-gray-500 mb-6">You haven't booked any exhibition stalls yet.</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Browse Available Stalls
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stalls.map((stall) => (
            <div 
              key={stall.id} 
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => {
                setSelectedStall(stall);
                setShowDetailsModal(true);
              }}
            >
              {/* Stall Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white">{stall.stallNumber}</h2>
                    <p className="text-blue-100 text-sm mt-1">{stall.location}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(stall.status)}`}>
                    {getStatusIcon(stall.status)}
                    <span className="capitalize">{stall.status}</span>
                  </div>
                </div>
              </div>

              {/* Stall Details */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-2">
                    <UserIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Size</p>
                      <p className="font-medium text-gray-900">{stall.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <TagIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(stall.type)}`}>
                        {stall.type.charAt(0).toUpperCase() + stall.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-medium text-gray-900">{formatCurrency(stall.price)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Booked Date</p>
                      <p className="font-medium text-gray-900">{formatDate(stall.bookedDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Amenities Included</h3>
                  <div className="flex flex-wrap gap-2">
                    {stall.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </span>
                    ))}
                    {stall.amenities.length > 4 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{stall.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                {(stall.dimensions || stall.notes || stall.paymentStatus) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-3 text-sm">
                      {stall.dimensions && (
                        <span className="text-gray-600">
                          <span className="font-medium">Dimensions:</span> {stall.dimensions}
                        </span>
                      )}
                      {stall.paymentStatus && (
                        <span className="text-gray-600">
                          <span className="font-medium">Payment:</span>{' '}
                          <span className={`capitalize ${
                            stall.paymentStatus === 'paid' ? 'text-green-600' :
                            stall.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {stall.paymentStatus}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stall Details Modal */}
      {showDetailsModal && selectedStall && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Stall Details</h2>
                  <p className="text-gray-600 mt-1">Complete information for {selectedStall.stallNumber}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Status and Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <div className="flex items-center">
                      {getStatusIcon(selectedStall.status)}
                      <span className={`ml-2 font-medium capitalize ${selectedStall.status === 'confirmed' ? 'text-green-700' : selectedStall.status === 'pending' ? 'text-yellow-700' : 'text-red-700'}`}>
                        {selectedStall.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Type</p>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(selectedStall.type)}`}>
                      {selectedStall.type.charAt(0).toUpperCase() + selectedStall.type.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Location Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    Location Details
                  </h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-500">Stall Number:</span> <span className="font-medium">{selectedStall.stallNumber}</span></p>
                    <p><span className="text-gray-500">Location:</span> {selectedStall.location}</p>
                    <p><span className="text-gray-500">Size:</span> {selectedStall.size}</p>
                    {selectedStall.dimensions && (
                      <p><span className="text-gray-500">Dimensions:</span> {selectedStall.dimensions}</p>
                    )}
                  </div>
                </div>

                {/* Financial Details - Updated for INR */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
                    Financial Details
                  </h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-500">Total Price:</span> <span className="font-bold text-gray-900">{formatCurrency(selectedStall.price)}</span></p>
                    {selectedStall.paymentStatus && (
                      <p>
                        <span className="text-gray-500">Payment Status:</span>{' '}
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          selectedStall.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          selectedStall.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedStall.paymentStatus.charAt(0).toUpperCase() + selectedStall.paymentStatus.slice(1)}
                        </span>
                      </p>
                    )}
                    {selectedStall.invoiceNumber && (
                      <p><span className="text-gray-500">Invoice Number:</span> {selectedStall.invoiceNumber}</p>
                    )}
                    <p><span className="text-gray-500">Booked Date:</span> {formatDate(selectedStall.bookedDate)}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <CubeIcon className="h-5 w-5 text-gray-500" />
                    Included Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStall.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedStall.notes && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
                      Additional Notes
                    </h3>
                    <p className="text-gray-700">{selectedStall.notes}</p>
                  </div>
                )}

                {/* Important Dates */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Important Dates</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Stall setup begins: January 28, 2024 at 8:00 AM
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Exhibition dates: January 29 - February 1, 2024
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Dismantling deadline: February 2, 2024 at 6:00 PM
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    // Navigate to support or booking page
                  }}
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Important Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Setup & Dismantling</h3>
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
                Late removal fees may apply after the deadline
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Requirements & Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                Electrical requirements due 2 weeks before event
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                Submit booth design for approval by January 15
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                Contact support at support@diemex.com for assistance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}