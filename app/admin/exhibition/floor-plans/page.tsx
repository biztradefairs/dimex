// app/admin/exhibition/floor-plans/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Download, Upload, Building, Eye, Grid, Save, X, MousePointer, ZoomIn, ZoomOut, Move, Check, Minus, Maximize2 } from 'lucide-react';

interface FloorPlan {
  id: string;
  name: string;
  floorNumber: string;
  totalArea: string;
  capacity: number;
  fileType: string;
  lastUpdated: string;
  exhibitorsCount: number;
  imageUrl: string;
  bookings: Booking[];
}

interface Booking {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: 'available' | 'booked' | 'reserved';
  exhibitorName?: string;
  boothNumber?: string;
}

export default function FloorPlansPage() {
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([
    {
      id: '1',
      name: 'Exhibition Hall A',
      floorNumber: 'HA',
      totalArea: '25,000 sq ft',
      capacity: 45,
      fileType: 'PNG',
      lastUpdated: '2024-01-15',
      exhibitorsCount: 28,
      imageUrl: '/api/placeholder/800/600',
      bookings: [
        { id: '1', x: 100, y: 150, width: 60, height: 40, status: 'booked', exhibitorName: 'TechCorp', boothNumber: 'A1' },
        { id: '2', x: 200, y: 150, width: 60, height: 40, status: 'available', boothNumber: 'A2' },
        { id: '3', x: 300, y: 150, width: 60, height: 40, status: 'reserved', exhibitorName: 'AutoWorks', boothNumber: 'A3' },
      ]
    },
    {
      id: '2',
      name: 'Exhibition Hall B',
      floorNumber: 'HB',
      totalArea: '18,500 sq ft',
      capacity: 35,
      fileType: 'PNG',
      lastUpdated: '2024-01-14',
      exhibitorsCount: 22,
      imageUrl: '/images/layout.jpeg',
      bookings: [
        { id: '4', x: 120, y: 120, width: 60, height: 40, status: 'booked', exhibitorName: 'Precision Tools', boothNumber: 'B1' },
        { id: '5', x: 250, y: 120, width: 60, height: 40, status: 'available', boothNumber: 'B2' },
      ]
    },
    {
      id: '3',
      name: 'Exhibition Hall C',
      floorNumber: 'HC',
      totalArea: '15,000 sq ft',
      capacity: 30,
      fileType: 'PNG',
      lastUpdated: '2024-01-13',
      exhibitorsCount: 18,
      imageUrl: '/api/placeholder/800/600',
      bookings: [
        { id: '6', x: 150, y: 100, width: 60, height: 40, status: 'booked', exhibitorName: 'Mould Masters', boothNumber: 'C1' },
      ]
    }
  ]);

  const [selectedFloor, setSelectedFloor] = useState<string>('1');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    status: 'available',
    width: 60,
    height: 40
  });
  const [activeExhibitor, setActiveExhibitor] = useState<string>('');
  const [editingBoothNumber, setEditingBoothNumber] = useState<string>('');
  const [editingExhibitorName, setEditingExhibitorName] = useState<string>('');
  
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isImageDragging, setIsImageDragging] = useState(false);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedPlans = localStorage.getItem('floorPlans');
    if (savedPlans) {
      try {
        const parsed = JSON.parse(savedPlans);
        setFloorPlans(parsed);
      } catch (error) {
        console.error('Failed to load floor plans from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever floorPlans changes
  useEffect(() => {
    localStorage.setItem('floorPlans', JSON.stringify(floorPlans));
  }, [floorPlans]);

  const selectedFloorPlan = floorPlans.find(plan => plan.id === selectedFloor);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this floor plan?')) {
      setFloorPlans(floorPlans.filter(plan => plan.id !== id));
      if (id === selectedFloor) {
        setSelectedFloor(floorPlans[0]?.id || '');
      }
    }
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        
        // Read file as data URL
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          
          const newPlan: FloorPlan = {
            id: Date.now().toString(),
            name: `New Floor ${floorPlans.length + 1}`,
            floorNumber: `F${floorPlans.length + 1}`,
            totalArea: '0 sq ft',
            capacity: 0,
            fileType: file.type.split('/')[1].toUpperCase() || 'PNG',
            lastUpdated: new Date().toISOString().split('T')[0],
            exhibitorsCount: 0,
            imageUrl,
            bookings: []
          };
          
          setFloorPlans([...floorPlans, newPlan]);
          setSelectedFloor(newPlan.id);
          setZoom(1);
          setPosition({ x: 0, y: 0 });
          alert(`Uploaded ${file.name} successfully!`);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing || isImageDragging || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - position.x) / zoom;
    const y = (e.clientY - rect.top - position.y) / zoom;

    // Create new booking
    const bookingId = `booking-${Date.now()}`;
    const boothCount = selectedFloorPlan?.bookings.length || 0;
    const newBookingData: Booking = {
      id: bookingId,
      x,
      y,
      width: newBooking.width || 60,
      height: newBooking.height || 40,
      status: newBooking.status || 'available',
      boothNumber: `B${boothCount + 1}`,
      exhibitorName: newBooking.status === 'booked' ? `Exhibitor ${boothCount + 1}` : undefined
    };

    const updatedPlans = floorPlans.map(plan => {
      if (plan.id === selectedFloor) {
        return {
          ...plan,
          bookings: [...plan.bookings, newBookingData],
          exhibitorsCount: plan.bookings.filter(b => b.status === 'booked').length + 
                         (newBookingData.status === 'booked' ? 1 : 0)
        };
      }
      return plan;
    });

    setFloorPlans(updatedPlans);
    setActiveExhibitor(bookingId);
    setEditingBoothNumber(newBookingData.boothNumber || '');
    setEditingExhibitorName(newBookingData.exhibitorName || '');
  };

  const handleUpdateBooking = (bookingId: string, updates: Partial<Booking>) => {
    const updatedPlans = floorPlans.map(plan => {
      if (plan.id === selectedFloor) {
        const updatedBookings = plan.bookings.map(booking => 
          booking.id === bookingId ? { ...booking, ...updates } : booking
        );
        
        const bookedCount = updatedBookings.filter(b => b.status === 'booked').length;
        
        return {
          ...plan,
          bookings: updatedBookings,
          exhibitorsCount: bookedCount
        };
      }
      return plan;
    });

    setFloorPlans(updatedPlans);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (!confirm('Delete this booth?')) return;
    
    const updatedPlans = floorPlans.map(plan => {
      if (plan.id === selectedFloor) {
        const updatedBookings = plan.bookings.filter(booking => booking.id !== bookingId);
        const bookedCount = updatedBookings.filter(b => b.status === 'booked').length;
        
        return {
          ...plan,
          bookings: updatedBookings,
          exhibitorsCount: bookedCount
        };
      }
      return plan;
    });

    setFloorPlans(updatedPlans);
    if (activeExhibitor === bookingId) {
      setActiveExhibitor('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-red-500/20 border-red-500';
      case 'reserved': return 'bg-yellow-500/20 border-yellow-500';
      case 'available': return 'bg-green-500/20 border-green-500';
      default: return 'bg-gray-500/20 border-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'booked': return 'text-red-700';
      case 'reserved': return 'text-yellow-700';
      case 'available': return 'text-green-700';
      default: return 'text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'booked': return '✓';
      case 'reserved': return '⏳';
      case 'available': return '○';
      default: return '';
    }
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.2));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Pan handlers for image
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditing) return;
    setIsImageDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isImageDragging || !isEditing) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsImageDragging(false);
  };

  // Handle booth dragging
  const handleBoothDragStart = (e: React.DragEvent, booking: Booking) => {
    if (isEditing) {
      setSelectedBooking(booking);
      e.dataTransfer.setData('text/plain', booking.id);
    }
  };

  const handleBoothDragEnd = (e: React.DragEvent, bookingId: string) => {
    if (!isEditing || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - position.x) / zoom;
    const y = (e.clientY - rect.top - position.y) / zoom;
    
    // Only update if within bounds
    if (x >= 0 && y >= 0) {
      handleUpdateBooking(bookingId, { x, y });
    }
    setSelectedBooking(null);
  };

  const handleUpdateExhibitor = (bookingId: string) => {
    if (editingBoothNumber.trim() || editingExhibitorName.trim()) {
      handleUpdateBooking(bookingId, {
        boothNumber: editingBoothNumber || undefined,
        exhibitorName: editingExhibitorName || undefined
      });
    }
    setActiveExhibitor('');
  };

  const handleQuickStatusChange = (bookingId: string, newStatus: 'available' | 'booked' | 'reserved') => {
    handleUpdateBooking(bookingId, { 
      status: newStatus,
      exhibitorName: newStatus === 'booked' ? `Exhibitor ${Math.floor(Math.random() * 100)}` : undefined
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Floor Plans</h1>
          <p className="text-gray-600">Manage and view exhibition floor layouts with interactive booking</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleUpload}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Floor Plan
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
              isEditing
                ? 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200'
                : 'bg-blue-600 text-white border-transparent hover:bg-blue-700'
            }`}
          >
            {isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Exit Edit Mode
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Mode
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Floor Plan List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Available Floors</h3>
              <div className="space-y-3">
                {floorPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => {
                      setSelectedFloor(plan.id);
                      setSelectedBooking(null);
                      setActiveExhibitor('');
                      setZoom(1);
                      setPosition({ x: 0, y: 0 });
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedFloor === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Building className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{plan.name}</p>
                          <p className="text-sm text-gray-500">Floor {plan.floorNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{plan.exhibitorsCount} exhibitors</p>
                        <p className="text-xs text-gray-500">{plan.totalArea}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {selectedFloorPlan && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const availableCount = selectedFloorPlan.bookings.filter(b => b.status === 'available').length;
                      alert(`${availableCount} booths available for booking`);
                    }}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
                  >
                    View Available ({selectedFloorPlan.bookings.filter(b => b.status === 'available').length})
                  </button>
                  <button
                    onClick={() => {
                      const bookedCount = selectedFloorPlan.bookings.filter(b => b.status === 'booked').length;
                      alert(`${bookedCount} booths booked`);
                    }}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
                  >
                    View Booked ({selectedFloorPlan.bookings.filter(b => b.status === 'booked').length})
                  </button>
                </div>
                
                {isEditing && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quick Add Booth
                      </label>
                      <select
                        value={newBooking.status}
                        onChange={(e) => setNewBooking({...newBooking, status: e.target.value as 'available' | 'booked' | 'reserved'})}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="available">Available (Green)</option>
                        <option value="booked">Booked (Red)</option>
                        <option value="reserved">Reserved (Yellow)</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Width
                        </label>
                        <input
                          type="number"
                          value={newBooking.width?.toString() || '60'}
                          onChange={(e) => setNewBooking({...newBooking, width: parseInt(e.target.value) || 60})}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          min="30"
                          max="200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Height
                        </label>
                        <input
                          type="number"
                          value={newBooking.height?.toString() || '40'}
                          onChange={(e) => setNewBooking({...newBooking, height: parseInt(e.target.value) || 40})}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          min="30"
                          max="200"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Click on the floor plan to add a booth with these settings.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Floor Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Booths</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedFloorPlan?.bookings.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500/30 border border-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {selectedFloorPlan?.bookings.filter(b => b.status === 'available').length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-red-500/30 border border-red-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Booked</span>
                </div>
                <span className="text-sm font-medium text-red-600">
                  {selectedFloorPlan?.bookings.filter(b => b.status === 'booked').length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-yellow-500/30 border border-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Reserved</span>
                </div>
                <span className="text-sm font-medium text-yellow-600">
                  {selectedFloorPlan?.bookings.filter(b => b.status === 'reserved').length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floor Plan Viewer */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedFloorPlan?.name} - Floor {selectedFloorPlan?.floorNumber}
                  </h2>
                  <p className="text-gray-600">
                    {selectedFloorPlan?.totalArea} • Capacity: {selectedFloorPlan?.capacity} exhibitors • 
                    Last Updated: {selectedFloorPlan?.lastUpdated}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Zoom Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleZoomOut}
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                      title="Zoom Out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-600 min-w-[50px] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                      title="Zoom In"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
                      title="Reset View"
                    >
                      Reset
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    {isEditing && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full flex items-center">
                        <Move className="h-3 w-3 mr-1" />
                        Edit Mode
                      </span>
                    )}
                    <button
                      onClick={() => {
                        alert('Download functionality would generate an image with booths');
                      }}
                      className="text-green-600 hover:text-green-900"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedFloorPlan?.id || '')}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Floor Plan"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Floor Plan Container */}
              <div 
                ref={containerRef}
                className="relative"
              >
                <div
                  ref={imageRef}
                  className="relative w-full h-[500px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{
                    cursor: isImageDragging ? 'grabbing' : isEditing ? 'grab' : 'default'
                  }}
                >
                  {/* Background Image with Zoom/Pan */}
                  {selectedFloorPlan?.imageUrl && (
                    <div 
                      className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url(${selectedFloorPlan.imageUrl})`,
                        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                        transformOrigin: 'center center',
                        transition: isImageDragging ? 'none' : 'transform 0.2s ease'
                      }}
                      onClick={handleImageClick}
                    />
                  )}
                  
                  {/* Booth Overlays */}
                  {selectedFloorPlan?.bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`absolute border-2 ${getStatusColor(booking.status)} ${
                        isEditing ? 'cursor-move hover:shadow-lg' : 'cursor-pointer'
                      } transition-all duration-150 group`}
                      style={{
                        left: `${booking.x}px`,
                        top: `${booking.y}px`,
                        width: `${booking.width}px`,
                        height: `${booking.height}px`,
                        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                        transformOrigin: '0 0',
                        zIndex: activeExhibitor === booking.id ? 50 : 10
                      }}
                      draggable={isEditing}
                      onDragStart={(e) => handleBoothDragStart(e, booking)}
                      onDragEnd={(e) => handleBoothDragEnd(e, booking.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isEditing) {
                          setActiveExhibitor(booking.id);
                          setEditingBoothNumber(booking.boothNumber || '');
                          setEditingExhibitorName(booking.exhibitorName || '');
                        }
                      }}
                    >
                      {/* Booth Content */}
                      <div className="p-1 h-full flex flex-col justify-between overflow-hidden bg-white/90">
                        {/* Booth Header */}
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center">
                            <span className={`text-[9px] font-bold ${getStatusTextColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                            </span>
                            <span className={`text-[9px] font-bold ${getStatusTextColor(booking.status)} ml-1 truncate`}>
                              {booking.boothNumber}
                            </span>
                          </div>
                          {isEditing && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBooking(booking.id);
                              }}
                              className="text-red-500 hover:text-red-700 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          )}
                        </div>
                        
                        {/* Exhibitor Name */}
                        <div className="text-center flex-grow flex items-center justify-center">
                          <div className="text-[8px] font-medium text-gray-800 truncate px-1">
                            {booking.exhibitorName || 'Available'}
                          </div>
                        </div>
                        
                        {/* Quick Status Badge */}
                        {!isEditing && (
                          <div className="mt-1">
                            <span className={`text-[7px] px-1 py-0.5 rounded ${getStatusColor(booking.status)} ${getStatusTextColor(booking.status)}`}>
                              {booking.status.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Edit Form Overlay */}
                      {activeExhibitor === booking.id && isEditing && (
                        <div className="absolute inset-0 bg-white border-2 border-blue-500 p-2 z-50">
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editingBoothNumber}
                              onChange={(e) => setEditingBoothNumber(e.target.value)}
                              placeholder="Booth #"
                              className="w-full text-xs p-1 border rounded"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <input
                              type="text"
                              value={editingExhibitorName}
                              onChange={(e) => setEditingExhibitorName(e.target.value)}
                              placeholder="Exhibitor Name"
                              className="w-full text-xs p-1 border rounded"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateExhibitor(booking.id);
                                }}
                                className="flex-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveExhibitor('');
                                }}
                                className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Controls Info */}
                {isEditing && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-blue-700 flex items-center">
                        <MousePointer className="h-4 w-4 mr-2" />
                        <span className="font-medium">Edit Mode:</span> Click to add booths • Drag booths to move • Drag background to pan
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-green-500/30 border border-green-500 mr-1"></div>
                          <span className="text-xs text-gray-600">Available</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-red-500/30 border border-red-500 mr-1"></div>
                          <span className="text-xs text-gray-600">Booked</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-yellow-500/30 border border-yellow-500 mr-1"></div>
                          <span className="text-xs text-gray-600">Reserved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Booth Management Panel */}
              {selectedFloorPlan && selectedFloorPlan.bookings.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Booth Management</h3>
                    <div className="text-sm text-gray-500">
                      {selectedFloorPlan.bookings.length} booths total
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedFloorPlan.bookings.map((booking) => (
                      <div 
                        key={booking.id}
                        className={`border rounded-lg p-4 ${getStatusColor(booking.status)}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center">
                              <span className={`font-bold ${getStatusTextColor(booking.status)} mr-2`}>
                                {booking.boothNumber}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)} ${getStatusTextColor(booking.status)}`}>
                                {booking.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="text-sm font-medium text-gray-900">
                                {booking.exhibitorName || 'No Exhibitor Assigned'}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Position: ({Math.round(booking.x)}, {Math.round(booking.y)}) • Size: {booking.width}×{booking.height}px
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleQuickStatusChange(booking.id, 'available')}
                              className={`p-1 rounded ${booking.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                              title="Mark as Available"
                            >
                              <div className="h-3 w-3 rounded-full border border-green-500"></div>
                            </button>
                            <button
                              onClick={() => handleQuickStatusChange(booking.id, 'booked')}
                              className={`p-1 rounded ${booking.status === 'booked' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}
                              title="Mark as Booked"
                            >
                              <div className="h-3 w-3 rounded-full border border-red-500"></div>
                            </button>
                            <button
                              onClick={() => handleQuickStatusChange(booking.id, 'reserved')}
                              className={`p-1 rounded ${booking.status === 'reserved' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}
                              title="Mark as Reserved"
                            >
                              <div className="h-3 w-3 rounded-full border border-yellow-500"></div>
                            </button>
                          </div>
                        </div>
                        
                        {isEditing && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex justify-between">
                              <button
                                onClick={() => {
                                  setActiveExhibitor(booking.id);
                                  setEditingBoothNumber(booking.boothNumber || '');
                                  setEditingExhibitorName(booking.exhibitorName || '');
                                }}
                                className="text-sm text-blue-600 hover:text-blue-900"
                              >
                                Edit Details
                              </button>
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-sm text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}