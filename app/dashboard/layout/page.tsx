// app/dashboard/layout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, ArrowsPointingOutIcon, 
  DocumentArrowDownIcon, ArrowPathIcon,
  BuildingOfficeIcon, MapPinIcon, UserGroupIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';
import FloorPlanRenderer from '@/components/FloorPlanRenderer';
import { Shape, ShapeType } from '@/lib/types'; // Import from shared types

interface FloorPlan {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  scale: number;
  gridSize?: number;
  showGrid?: boolean;
  shapes: Shape[]; // Use the imported Shape type
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  isPublic?: boolean;
}

interface BoothDetails {
  boothNumber: string;
  location: string;
  size: string;
  type: string;
  amenities: string[];
  restrictions: string[];
  companyName?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  status?: string;
}

export default function LayoutPage() {
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [masterFloorPlan, setMasterFloorPlan] = useState<FloorPlan | null>(null);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [stallDetails, setStallDetails] = useState<BoothDetails>({
    boothNumber: 'A-12',
    location: 'Main Hall, Near Entrance',
    size: '3m x 3m (9 sqm)',
    type: 'Premium Corner Stall',
    amenities: [
      'Power Outlets (2)',
      'WiFi Access',
      'Spotlights',
      'Table & Chairs'
    ],
    restrictions: [
      'No open flames',
      'Maximum height: 3m',
      'No blocking aisles'
    ]
  });

  // Get user data from localStorage or auth context
  const [userData, setUserData] = useState({
    id: 1,
    name: 'John Exhibitor',
    company: 'TechCorp Inc.',
    email: 'john@techcorp.com',
    phone: '+1234567890',
    boothNumber: 'A-12'
  });

  useEffect(() => {
    // Try to get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(prev => ({ ...prev, ...parsedUser }));
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
    
    fetchMasterFloorPlan();
  }, []);

const fetchMasterFloorPlan = async () => {
  try {
    setLoading(true);
    setError(null);

    const token =
      localStorage.getItem('exhibitor_token') 
      // localStorage.getItem('token');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/floor-plans/master/exhibitor-view`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to load');
    }

    const plan = result.data;

    setMasterFloorPlan({
      ...plan,
      id: String(plan.id),
      shapes: plan.shapes || []
    });

    // Auto-select exhibitor booth
    const myBooth = plan.shapes?.find(
      (s: any) => s.metadata?.isUserBooth
    );

    if (myBooth) {
      setSelectedShapeId(myBooth.id);
      updateStallDetails(myBooth);
    }

  } catch (err: any) {
    console.error(err);
    setError('Unable to load floor plan');
  } finally {
    setLoading(false);
  }
};


  const updateStallDetails = (boothShape: Shape) => {
    if (!boothShape || boothShape.type !== 'booth') return;
    
    const metadata = boothShape.metadata || {};
    const sizeInMeters = {
      width: (boothShape.width * (masterFloorPlan?.scale || 0.1)).toFixed(1),
      height: (boothShape.height * (masterFloorPlan?.scale || 0.1)).toFixed(1)
    };
    
    setStallDetails({
      boothNumber: metadata.boothNumber || 'Unknown',
      location: `${Math.round(boothShape.x)}px, ${Math.round(boothShape.y)}px on plan`,
      size: `${sizeInMeters.width}m x ${sizeInMeters.height}m (${(parseFloat(sizeInMeters.width) * parseFloat(sizeInMeters.height)).toFixed(1)} sqm)`,
      type: metadata.category || 'Standard Booth',
      amenities: metadata.amenities || [
        'Power Outlets (2)',
        'WiFi Access',
        'Spotlights',
        'Table & Chairs'
      ],
      restrictions: metadata.restrictions || [
        'No open flames',
        'Maximum height: 3m',
        'No blocking aisles'
      ],
      companyName: metadata.companyName || userData.company,
      contactPerson: metadata.contactPerson || userData.name,
      phone: metadata.phone || userData.phone,
      email: userData.email,
      status: metadata.status || 'booked'
    });
  };

  const handleShapeClick = (shapeId: string) => {
    const shape = masterFloorPlan?.shapes?.find(s => s.id === shapeId);
    if (shape) {
      setSelectedShapeId(shapeId);
      if (shape.type === 'booth') {
        updateStallDetails(shape);
      }
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const resetZoom = () => setZoom(1);

  const handlePan = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 50;
    setPanOffset(prev => ({
      x: prev.x + (direction === 'left' ? step : direction === 'right' ? -step : 0),
      y: prev.y + (direction === 'up' ? step : direction === 'down' ? -step : 0)
    }));
  };

  const handleDownloadImage = async () => {
    if (!masterFloorPlan?.image) return;
    
    try {
      const response = await fetch(masterFloorPlan.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `exhibition-floor-plan.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleFullscreen = () => {
    const container = document.querySelector('.floor-plan-container');
    if (!container) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      (container as any).requestFullscreen().catch((err: Error) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  const getBoothStatistics = () => {
    if (!masterFloorPlan?.shapes) return { total: 0, available: 0, booked: 0, reserved: 0 };
    
    const booths = masterFloorPlan.shapes.filter(s => s.type === 'booth');
    const available = booths.filter(b => b.metadata?.status === 'available').length;
    const booked = booths.filter(b => b.metadata?.status === 'booked').length;
    const reserved = booths.filter(b => b.metadata?.status === 'reserved').length;
    
    return {
      total: booths.length,
      available,
      booked,
      reserved
    };
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Exhibition Layout</h1>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="h-150 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading exhibition layout...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Exhibition Layout</h1>
          <button
            onClick={fetchMasterFloorPlan}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="h-125 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-red-500 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Floor Plan</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <p className="text-sm text-gray-500">
                Please contact exhibition support if the issue persists.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = getBoothStatistics();

  return (
    <div className="space-y-6 floor-plan-container">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exhibition Layout</h1>
          <p className="text-gray-600 mt-1">
            View your exhibition stall location and details
          </p>
        </div>
        
        {/* Statistics */}
        <div className="flex items-center space-x-6">
          <div className="bg-gray-50 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{stats.total}</div>
                <div className="text-xs text-gray-500">Total Booths</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{stats.available}</div>
                <div className="text-xs text-gray-500">Available</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{stats.booked}</div>
                <div className="text-xs text-gray-500">Booked</div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
              <button
                onClick={zoomOut}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                disabled={zoom <= 0.5}
                title="Zoom Out"
              >
                <span className="font-bold">-</span>
              </button>
              <span className="text-sm w-16 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={zoomIn}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                disabled={zoom >= 3}
                title="Zoom In"
              >
                <span className="font-bold">+</span>
              </button>
              <button
                onClick={resetZoom}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded text-sm"
                title="Reset Zoom"
              >
                Reset
              </button>
            </div>

            {/* Pan Controls */}
            <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-lg">
              <button
                onClick={() => handlePan('up')}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                title="Pan Up"
              >
                ↑
              </button>
              <div className="flex flex-col">
                <button
                  onClick={() => handlePan('left')}
                  className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                  title="Pan Left"
                >
                  ←
                </button>
                <button
                  onClick={() => handlePan('right')}
                  className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                  title="Pan Right"
                >
                  →
                </button>
              </div>
              <button
                onClick={() => handlePan('down')}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                title="Pan Down"
              >
                ↓
              </button>
            </div>

            <button 
              onClick={handleFullscreen}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowsPointingOutIcon className="h-4 w-4 mr-2" />
              Full Screen
            </button>
            
            <button 
              onClick={handleDownloadImage}
              disabled={!masterFloorPlan?.image}
              className="inline-flex items-center px-3 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-4">
            {/* Floor Plan Display */}
            <div className="relative h-[600px] border border-gray-200 rounded-lg overflow-hidden">
              {masterFloorPlan ? (
                <FloorPlanRenderer
                  image={masterFloorPlan.image}
                  shapes={masterFloorPlan.shapes || []}
                  scale={masterFloorPlan.scale || 0.1}
                  showGrid={masterFloorPlan.showGrid !== false}
                  gridSize={masterFloorPlan.gridSize || 20}
                  zoom={zoom}
                  panOffset={panOffset}
                  onShapeClick={handleShapeClick}
                  selectedShapeId={selectedShapeId}
                  isEditable={false}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <BuildingOfficeIcon className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">No Floor Plan Available</p>
                  <p className="text-sm mt-1">The exhibition floor plan will be available soon</p>
                </div>
              )}
            </div>

            {/* Plan Details */}
            {masterFloorPlan && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Plan Name:</span>
                    <p className="font-medium">{masterFloorPlan.name || 'Exhibition Floor Plan'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Scale:</span>
                    <p className="font-medium">1:{masterFloorPlan.scale}px</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Booths:</span>
                    <p className="font-medium">{stats.total}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <p className="font-medium">
                      {new Date(masterFloorPlan.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stall Details Sidebar */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Stall Details</h2>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              stallDetails.status === 'available' ? 'bg-green-100 text-green-800' :
              stallDetails.status === 'booked' ? 'bg-blue-100 text-blue-800' :
              stallDetails.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {stallDetails.status?.toUpperCase() || 'YOUR STALL'}
            </span>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium mb-1">Stall Number</p>
                <p className="text-xl font-bold text-gray-900">{stallDetails.boothNumber}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-600 font-medium mb-1">Stall Size</p>
                <p className="text-lg font-medium text-gray-900">{stallDetails.size}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Company Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="text-gray-900">{stallDetails.companyName}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p className="text-gray-900">{stallDetails.contactPerson}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{stallDetails.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Stall Type</p>
                    <p className="text-gray-900">{stallDetails.type}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Amenities Included</h3>
              <div className="space-y-2">
                {stallDetails.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Important Restrictions</h3>
              <div className="space-y-2">
                {stallDetails.restrictions.map((restriction, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-gray-700 text-sm">{restriction}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Stall Manual
                </button>
                <button 
                  onClick={fetchMasterFloorPlan}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Refresh Floor Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Footer */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0l3 3m-3-3l3-3m-3 3l-3-3m3 3V8m0 0l3 3m-3-3l-3 3" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800">Need Help?</h4>
            <p className="text-sm text-blue-600 mt-1">
              If you cannot locate your stall or have questions about the layout, 
              please contact exhibition support at support@exhibition.com or call +1 (555) 123-4567.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}