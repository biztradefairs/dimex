"use client";

import { useRef, useState, useEffect } from "react";
import {
  Building2, CheckCircle, Clock, Download, Save,
  Loader2, Grid, ZoomIn, ZoomOut, Hand, Plus, Trash2,
  Edit, Menu, X, ChevronLeft, ChevronRight, RefreshCw,
  BarChart3, MapPin, AlertCircle
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { boothsAPI, Booth, BoothStatistics } from "../app/api/boothsAPI"

export default function BoothManagementSystem() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [selectedBoothId, setSelectedBoothId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [statistics, setStatistics] = useState<BoothStatistics>({
    total: 0,
    available: 0,
    booked: 0,
    reserved: 0,
    occupied: 0
  });

  // Form state
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editStatus, setEditStatus] = useState<'available' | 'booked' | 'reserved'>('available');
  const [isAddingBooth, setIsAddingBooth] = useState(false);
  const [newBoothPosition, setNewBoothPosition] = useState({ x: 100, y: 100 });

  // Status configuration
  const statusConfig = {
    available: {
      color: 'bg-green-600',
      lightColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-600',
      icon: CheckCircle,
      label: 'Available'
    },
    booked: {
      color: 'bg-blue-600',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-600',
      icon: Building2,
      label: 'Booked'
    },
    reserved: {
      color: 'bg-orange-600',
      lightColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-600',
      icon: Clock,
      label: 'Reserved'
    }
  };

  // Load booths on mount
  useEffect(() => {
    loadBooths();
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const checkDevice = () => {
    const width = window.innerWidth;
    setIsMobile(width < 768);
    setShowSidebar(width >= 768);
  };

  // Load booths from API
  const loadBooths = async () => {
    setIsLoading(true);
    try {
      const result = await boothsAPI.getAll();
      
      if (result.success && result.data) {
        setBooths(result.data);
        if (result.floorPlanId) {
          localStorage.setItem('floorPlanId', String(result.floorPlanId));
        }
        toast.success('Booths loaded successfully');
      } else {
        toast.error(result.error || 'Failed to load booths');
      }
      
      // Load statistics
      loadStatistics();
      
    } catch (error) {
      console.error('Error loading booths:', error);
      toast.error('Failed to load booths');
    } finally {
      setIsLoading(false);
    }
  };

  // Load statistics
  const loadStatistics = async () => {
    try {
      const result = await boothsAPI.getStatistics();
      
      if (result.success && result.data) {
        setStatistics(result.data);
      }
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  // Get coordinates with grid snap
  const getCoordinates = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    const canvasX = (clientX - rect.left - panOffset.x) / zoom;
    const canvasY = (clientY - rect.top - panOffset.y) / zoom;
    
    // Snap to grid
    return {
      x: Math.round(canvasX / gridSize) * gridSize,
      y: Math.round(canvasY / gridSize) * gridSize
    };
  };

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      setIsPanning(true);
      setStartPoint({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - startPoint.x;
      const deltaY = e.clientY - startPoint.y;
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setStartPoint({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Handle booth click
  const handleBoothClick = (booth: Booth, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBoothId(booth.id);
    setEditCompanyName(booth.companyName || '');
    setEditStatus(booth.status);
  };

  // Handle canvas click (deselect)
  const handleCanvasClick = () => {
    setSelectedBoothId(null);
    setIsAddingBooth(false);
  };

  // Update booth status
  const updateBoothStatus = async (boothId: string, status: 'available' | 'booked' | 'reserved') => {
    try {
      const result = await boothsAPI.updateStatus(boothId, status);
      
      if (result.success) {
        // Update local state
        setBooths(prev =>
          prev.map(b =>
            b.id === boothId ? { ...b, status } : b
          )
        );
        if (selectedBoothId === boothId) {
          setEditStatus(status);
        }
        toast.success(result.message || `Status updated to ${statusConfig[status].label}`);
        loadStatistics();
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  // Update company name
  const updateCompanyName = async (boothId: string, companyName: string) => {
    try {
      const result = await boothsAPI.updateCompanyName(boothId, companyName);
      
      if (result.success) {
        setBooths(prev =>
          prev.map(b =>
            b.id === boothId ? { ...b, companyName } : b
          )
        );
        toast.success('Company name updated');
        loadStatistics();
      } else {
        toast.error(result.error || 'Failed to update company name');
      }
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Failed to update company name');
    }
  };

  // Save company name from form
  const handleSaveCompany = () => {
    if (selectedBoothId) {
      updateCompanyName(selectedBoothId, editCompanyName);
    }
  };

  // Add new booth
  const addBooth = async () => {
    try {
      const newBooth = {
        boothNumber: `B${booths.length + 1}`,
        companyName: '',
        status: 'available' as const,
        x: newBoothPosition.x,
        y: newBoothPosition.y,
        width: 120,
        height: 80
      };

      const result = await boothsAPI.add(newBooth);
      
      if (result.success && result.data) {
        setBooths(prev => [...prev, result.data as Booth]);
        toast.success('New booth added');
        setIsAddingBooth(false);
        loadStatistics();
      } else {
        toast.error(result.error || 'Failed to add booth');
      }
    } catch (error) {
      console.error('Error adding booth:', error);
      toast.error('Failed to add booth');
    }
  };

  // Delete booth
  const deleteBooth = async (boothId: string) => {
    if (!confirm('Are you sure you want to delete this booth?')) return;
    
    try {
      const result = await boothsAPI.delete(boothId);
      
      if (result.success) {
        setBooths(prev => prev.filter(b => b.id !== boothId));
        if (selectedBoothId === boothId) {
          setSelectedBoothId(null);
        }
        toast.success('Booth deleted');
        loadStatistics();
      } else {
        toast.error(result.error || 'Failed to delete booth');
      }
    } catch (error) {
      console.error('Error deleting booth:', error);
      toast.error('Failed to delete booth');
    }
  };

  // Reset to default
  const resetToDefault = async () => {
    if (!confirm('Reset floor plan to default layout? This will remove all custom booths.')) return;
    
    try {
      const result = await boothsAPI.reset();
      
      if (result.success) {
        toast.success('Floor plan reset to default');
        loadBooths();
      } else {
        toast.error(result.error || 'Failed to reset floor plan');
      }
    } catch (error) {
      console.error('Error resetting:', error);
      toast.error('Failed to reset floor plan');
    }
  };

  // Export as PNG
  const exportAsPNG = async () => {
    if (!canvasRef.current) return;
    
    setIsLoading(true);
    toast.loading('Generating export...', { id: 'export' });
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        allowTaint: true,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `floor-plan-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.success('Floor plan exported successfully!', { id: 'export' });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed', { id: 'export' });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedBooth = booths.find(b => b.id === selectedBoothId);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {showSidebar ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Building2 size={20} />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">Booth Management System</h1>
                <p className="text-xs text-gray-500">Manage exhibition booths & assignments</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportAsPNG}
              disabled={isLoading}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              Export PNG
            </button>
            <button
              onClick={resetToDefault}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm flex items-center gap-2"
            >
              <RefreshCw size={14} />
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Statistics & Controls */}
        {showSidebar && (
          <aside className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 size={18} />
                Statistics
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Total Booths</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-green-700">{statistics.available}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Booked</p>
                  <p className="text-2xl font-bold text-blue-700">{statistics.booked}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Reserved</p>
                  <p className="text-2xl font-bold text-orange-700">{statistics.reserved}</p>
                </div>
                <div className="col-span-2 bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Occupied Booths</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {statistics.occupied} / {statistics.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">Controls</h2>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsAddingBooth(!isAddingBooth);
                    setSelectedBoothId(null);
                  }}
                  className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  {isAddingBooth ? 'Cancel Adding' : 'Add New Booth'}
                </button>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Zoom: {Math.round(zoom * 100)}%</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
                      className="flex-1 p-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
                      disabled={zoom <= 0.5}
                    >
                      <ZoomOut size={16} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => setZoom(1)}
                      className="flex-1 p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
                      className="flex-1 p-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
                      disabled={zoom >= 2}
                    >
                      <ZoomIn size={16} className="mx-auto" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 ${
                    showGrid 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Grid size={16} />
                  {showGrid ? 'Hide Grid' : 'Show Grid'}
                </button>

                <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-1">Tips:</p>
                  <p>• Ctrl+Click or Middle-click to pan</p>
                  <p>• Click booth to select and edit</p>
                  <p>• Double-click company name to edit</p>
                </div>
              </div>
            </div>

            {/* Selected Booth Editor */}
            {selectedBooth && (
              <div className="p-4">
                <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Edit size={18} />
                  Edit Booth {selectedBooth.boothNumber}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={editCompanyName}
                      onChange={(e) => setEditCompanyName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter company name"
                    />
                    <button
                      onClick={handleSaveCompany}
                      className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center justify-center gap-1"
                    >
                      <Save size={14} />
                      Save Company Name
                    </button>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Booth Status
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['available', 'booked', 'reserved'] as const).map((status) => {
                        const config = statusConfig[status];
                        const Icon = config.icon;
                        const isSelected = selectedBooth.status === status;
                        
                        return (
                          <button
                            key={status}
                            onClick={() => updateBoothStatus(selectedBooth.id, status)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 ${
                              isSelected
                                ? `${config.color} text-white`
                                : `${config.lightColor} ${config.textColor} hover:bg-opacity-80`
                            }`}
                          >
                            <Icon size={14} />
                            {config.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => deleteBooth(selectedBooth.id)}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center justify-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete Booth
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Main Canvas */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas Controls Bar */}
          <div className="bg-white border-b border-gray-200 p-2 px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
                  className="p-1.5 hover:bg-white rounded"
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-sm px-2">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
                  className="p-1.5 hover:bg-white rounded"
                  disabled={zoom >= 2}
                >
                  <ZoomIn size={16} />
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                <Hand size={14} className="inline mr-1" />
                Ctrl+Click to pan
              </div>

              {isAddingBooth && (
                <div className="ml-auto bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                  <MapPin size={14} />
                  Click on canvas to place new booth
                </div>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="flex-1 relative overflow-hidden bg-gray-100 cursor-default"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleCanvasClick}
          >
            {/* Grid */}
            {showGrid && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #94a3b8 1px, transparent 1px),
                    linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
                  `,
                  backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`,
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
                  opacity: 0.2
                }}
              />
            )}

            {/* Booths Container */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              {/* Booths */}
              {booths.map((booth) => {
                const isSelected = selectedBoothId === booth.id;
                const status = statusConfig[booth.status];
                const StatusIcon = status.icon;
                
                return (
                  <div
                    key={booth.id}
                    onClick={(e) => handleBoothClick(booth, e)}
                    className={`absolute cursor-pointer transition-all duration-150 ${
                      isSelected ? 'ring-4 ring-blue-500 ring-offset-2 z-50' : 'hover:shadow-xl'
                    }`}
                    style={{
                      left: `${booth.x}px`,
                      top: `${booth.y}px`,
                      width: `${booth.width}px`,
                      height: `${booth.height}px`
                    }}
                  >
                    {/* Booth Background */}
                    <div
                      className={`absolute inset-0 rounded-lg border-2 ${
                        isSelected ? 'border-blue-600' : status.borderColor
                      }`}
                      style={{
                        backgroundColor: isSelected 
                          ? 'rgba(59, 130, 246, 0.2)'
                          : booth.status === 'available' ? 'rgba(16, 185, 129, 0.15)'
                          : booth.status === 'booked' ? 'rgba(59, 130, 246, 0.15)'
                          : 'rgba(245, 158, 11, 0.15)'
                      }}
                    />

                    {/* Status Badge */}
                    <div
                      className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg ${status.color}`}
                    >
                      <StatusIcon size={10} />
                      {status.label}
                    </div>

                    {/* Booth Number */}
                    <div className="absolute top-1 left-2 text-xs font-bold text-gray-700 bg-white bg-opacity-80 px-1.5 py-0.5 rounded">
                      {booth.boothNumber}
                    </div>

                    {/* Company Name */}
                    <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                      <span className="text-sm font-medium text-gray-900 break-words line-clamp-2">
                        {booth.companyName || '—'}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* New Booth Placement Indicator */}
              {isAddingBooth && (
                <div
                  className="absolute border-3 border-dashed border-blue-500 bg-blue-100 bg-opacity-30 rounded-lg"
                  style={{
                    left: `${newBoothPosition.x}px`,
                    top: `${newBoothPosition.y}px`,
                    width: '120px',
                    height: '80px',
                    pointerEvents: 'none'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-blue-700 text-xs font-medium">
                    Click to place
                  </div>
                </div>
              )}
            </div>

            {/* Canvas Click Handler for New Booth */}
            {isAddingBooth && (
              <div
                className="absolute inset-0 cursor-crosshair"
                onClick={(e) => {
                  const { x, y } = getCoordinates(e.clientX, e.clientY);
                  setNewBoothPosition({ x, y });
                  addBooth();
                }}
              />
            )}
          </div>
        </main>

        {/* Toggle Sidebar Button (Mobile) */}
        {!showSidebar && isMobile && (
          <button
            onClick={() => setShowSidebar(true)}
            className="fixed left-4 top-20 bg-white p-2 rounded-lg shadow-lg border border-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}