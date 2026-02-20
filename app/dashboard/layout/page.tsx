// app/dashboard/layout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, ArrowsPointingOutIcon, 
  DocumentArrowDownIcon, ArrowPathIcon,
  BuildingOfficeIcon, MapPinIcon, UserGroupIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';
import FloorPlanRenderer from '@/components/FloorPlanRenderer';
import { Shape, ShapeType } from '@/lib/types';

interface FloorPlan {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  scale: number;
  gridSize?: number;
  showGrid?: boolean;
  shapes: Shape[];
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
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [masterFloorPlan, setMasterFloorPlan] = useState<FloorPlan | null>(null);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [stallDetails, setStallDetails] = useState<BoothDetails | null>(null);
  const [userBooth, setUserBooth] = useState<Shape | null>(null);

  // Get user data from localStorage
  const [userData, setUserData] = useState({
    id: 1,
    name: '',
    company: '',
    email: '',
    phone: '',
    boothNumber: ''
  });

  useEffect(() => {
    // Get user data from localStorage
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

// app/dashboard/layout/page.tsx - Update the fetch function
// app/dashboard/layout/page.tsx - Updated fetch function
const fetchMasterFloorPlan = async (silent = false) => {
  try {
    if (!silent) setLoading(true);
    setError(null);

    // For public access, you might not need a token
    // But if you're using exhibitor_token, keep it
    const token = localStorage.getItem('exhibitor_token');
    console.log("TOKEN:", token);
    
    // Use the correct public endpoint
    const response = await fetch(
      "https://diemex-backend.onrender.com/api/floor-plan", // Changed from /api/booths/floor-plan
      {
        method: "GET",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Only add if token exists
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        setMasterFloorPlan(null);
        return;
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    
    // The response structure might be different from /api/booths/floor-plan
    // Adjust based on actual response
    let planData;
    
    // Handle different response structures
    if (result.success && result.data) {
      planData = result.data;
    } else if (result.data) {
      planData = result.data;
    } else {
      planData = result; // Assume result is the plan itself
    }

    // Transform the data to match your FloorPlanRenderer props
    const transformedPlan = {
      id: planData.id || 'floor-plan-1',
      name: planData.name || 'Exhibition Floor Plan',
      image: planData.imageUrl || planData.baseImageUrl || planData.image,
      scale: 0.1,
      gridSize: 20,
      showGrid: true,
      shapes: (planData.booths || []).map((booth: any) => ({
        id: booth.id || `booth-${Math.random()}`,
        type: 'booth',
        x: booth.position?.x || booth.x || 0,
        y: booth.position?.y || booth.y || 0,
        width: booth.position?.width || booth.width || 50,
        height: booth.position?.height || booth.height || 50,
        metadata: {
          boothNumber: booth.boothNumber,
          companyName: booth.companyName,
          status: booth.status,
          amenities: booth.amenities || [],
          restrictions: booth.restrictions || [],
          ...booth.metadata
        }
      })),
      createdAt: planData.createdAt || new Date().toISOString(),
      updatedAt: planData.updatedAt || new Date().toISOString()
    };

    setMasterFloorPlan(transformedPlan);

    // Find user's booth
    if (userData.boothNumber) {
      const myBooth = transformedPlan.shapes.find(
        (shape: any) => 
          shape.metadata?.boothNumber === userData.boothNumber
      );

      if (myBooth) {
        setUserBooth(myBooth);
        setSelectedShapeId(myBooth.id);
        updateStallDetails(myBooth, transformedPlan);
      }
    }

  } catch (err: any) {
    console.error('Error fetching floor plan:', err);
    setError(err.message || 'Unable to load floor plan');
  } finally {
    if (!silent) setLoading(false);
  }
};

  const updateStallDetails = (boothShape: Shape, floorPlan: FloorPlan) => {
    if (!boothShape || boothShape.type !== 'booth') return;
    
    const metadata = boothShape.metadata || {};
    const scale = floorPlan.scale || 0.1;
    
    // Calculate actual dimensions
    const widthInMeters = (boothShape.width * scale).toFixed(1);
    const heightInMeters = (boothShape.height * scale).toFixed(1);
    const area = (parseFloat(widthInMeters) * parseFloat(heightInMeters)).toFixed(1);
    
    setStallDetails({
      boothNumber: metadata.boothNumber || userData.boothNumber || 'Not Assigned',
      location: `Position: (${Math.round(boothShape.x)}, ${Math.round(boothShape.y)}) on plan`,
      size: `${widthInMeters}m × ${heightInMeters}m (${area} m²)`,
      type: metadata.category || metadata.type || 'Standard Booth',
      amenities: metadata.amenities || [],
      restrictions: metadata.restrictions || [],
      companyName: metadata.companyName || userData.company || '',
      contactPerson: metadata.contactPerson || userData.name || '',
      phone: metadata.phone || userData.phone || '',
      email: metadata.email || userData.email || '',
      status: metadata.status || 'booked'
    });
  };

  const handleShapeClick = (shapeId: string) => {
    const shape = masterFloorPlan?.shapes?.find(s => s.id === shapeId);
    if (shape && shape.type === 'booth' && masterFloorPlan) {
      setSelectedShapeId(shapeId);
      updateStallDetails(shape, masterFloorPlan);
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.25));
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
      link.download = `floor-plan-${masterFloorPlan.id || 'latest'}.jpg`;
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
    if (!masterFloorPlan?.shapes) {
      return { total: 0, available: 0, booked: 0, reserved: 0 };
    }
    
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
            onClick={() => fetchMasterFloorPlan()}
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

  // No floor plan exists yet
  if (!masterFloorPlan) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Exhibition Layout</h1>
          <button
            onClick={() => fetchMasterFloorPlan()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Check for Updates
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="h-125 flex flex-col items-center justify-center">
            <div className="text-center">
              <BuildingOfficeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Floor Plan Available</h3>
              <p className="text-gray-600 mb-4">
                The exhibition floor plan hasn't been published yet.
              </p>
              <p className="text-sm text-gray-500">
                Please check back later or contact the exhibition organizer.
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
            {userBooth ? (
              <>Your stall: <span className="font-medium text-blue-600">{userBooth.metadata?.boothNumber || 'Not assigned'}</span></>
            ) : (
              'View the exhibition floor plan'
            )}
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
                disabled={zoom <= 0.25}
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
            </div>

            {/* Plan Details */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Plan Name:</span>
                  <p className="font-medium">{masterFloorPlan.name || 'Exhibition Floor Plan'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Scale:</span>
                  <p className="font-medium">1:{masterFloorPlan.scale}px = 1m</p>
                </div>
                <div>
                  <span className="text-gray-500">Total Booths:</span>
                  <p className="font-medium">{stats.total}</p>
                </div>
                <div>
                  <span className="text-gray-500">Last Updated:</span>
                  <p className="font-medium">
                    {new Date(masterFloorPlan.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stall Details Sidebar */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Stall Details</h2>
            {stallDetails && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                stallDetails.status === 'available' ? 'bg-green-100 text-green-800' :
                stallDetails.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                stallDetails.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {stallDetails.status?.toUpperCase() || 'YOUR STALL'}
              </span>
            )}
          </div>
          
          {stallDetails ? (
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
                  {stallDetails.companyName && (
                    <div className="flex items-start">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="text-gray-900">{stallDetails.companyName}</p>
                      </div>
                    </div>
                  )}
                  {stallDetails.contactPerson && (
                    <div className="flex items-start">
                      <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Contact Person</p>
                        <p className="text-gray-900">{stallDetails.contactPerson}</p>
                      </div>
                    </div>
                  )}
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

              {stallDetails.amenities && stallDetails.amenities.length > 0 && (
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
              )}

              {stallDetails.restrictions && stallDetails.restrictions.length > 0 && (
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
              )}

              <div className="pt-4 border-t">
                <div className="space-y-3">
                  <button 
                    onClick={() => fetchMasterFloorPlan()}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center"
                  >
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Refresh Floor Plan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Click on a booth to view details</p>
              <p className="text-sm text-gray-500 mt-2">
                {userBooth ? (
                  <>Your booth is highlighted in blue on the map</>
                ) : (
                  <>You haven't been assigned a booth yet</>
                )}
              </p>
            </div>
          )}
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
              please contact exhibition support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}