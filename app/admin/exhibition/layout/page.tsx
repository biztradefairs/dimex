"use client";

import { useState, useEffect, useRef } from "react";
import {
  Download,
  Upload,
  Map,
  ZoomIn,
  ZoomOut,
  X,
  RefreshCw
} from "lucide-react";
import { boothsAPI } from "@/app/api/boothsAPI";

interface Booth {
  id: string;
  boothNumber: string;
  companyName?: string;
  status: "available" | "booked" | "reserved";
  xPercent?: number;
  yPercent?: number;
  widthPercent?: number;
  heightPercent?: number;
  metadata?: any;
}

interface FloorPlan {
  id: string;
  name: string;
  baseImageUrl: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  booths: Booth[];
}

export default function FloorPlanManager() {
  /* ================= STATE ================= */
  const [zoom, setZoom] = useState(1);
  const [floorPlan, setFloorPlan] = useState<FloorPlan>({
    id: "",
    name: "Main Exhibition Floor",
    baseImageUrl: null,
    imageWidth: null,
    imageHeight: null,
    booths: []
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [showBoothDetails, setShowBoothDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  /* ================= LOAD FLOOR PLAN ================= */
  const loadFloorPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await boothsAPI.getFloorPlan();
      if (response.success && response.data) {
        setFloorPlan({
          id: response.data.id?.toString() || "",
          name: response.data.name || "Main Exhibition Floor",
          baseImageUrl: response.data.baseImageUrl || null,
          imageWidth: response.data.imageWidth || null,
          imageHeight: response.data.imageHeight || null,
          booths: response.data.booths || []
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to load floor plan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFloorPlan();
  }, []);

  /* ================= UPLOAD HANDLER ================= */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setError(null);

    try {
      console.log('Uploading file:', file.name, file.type, file.size);
      
      // Use the fixed upload function
      const response = await boothsAPI.uploadImage(formData);

      if (response.success) {
        alert("Floor plan uploaded successfully!");
        // Reload the floor plan to get updated data
        await loadFloorPlan();
      } else {
        throw new Error(response.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(error.message || "Upload failed");
      alert(error.message || "Upload failed");
    } finally {
      setUploading(false);
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /* ================= RESET HANDLER ================= */
  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset the floor plan? This will delete all booths and the current image.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await boothsAPI.reset();
      if (response.success) {
        alert("Floor plan reset successfully");
        await loadFloorPlan();
      } else {
        throw new Error(response.error || "Reset failed");
      }
    } catch (error: any) {
      alert(error.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ZOOM CONTROLS ================= */
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  /* ================= BOOTH HANDLERS ================= */
  const handleBoothClick = (booth: Booth) => {
    setSelectedBooth(booth);
    setShowBoothDetails(true);
  };

  /* ================= STATUS COLOR ================= */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "booked":
        return "bg-blue-500";
      case "reserved":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  /* ================= RENDER BOOTHS ================= */
  const renderBooths = () => {
    if (!floorPlan.booths || floorPlan.booths.length === 0) {
      return null;
    }

    return floorPlan.booths.map((booth) => {
      // If we have percentage-based positioning
      if (booth.xPercent !== undefined && booth.yPercent !== undefined && imageRef.current) {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const containerHeight = containerRef.current?.offsetHeight || 0;
        
        const x = (booth.xPercent / 100) * containerWidth;
        const y = (booth.yPercent / 100) * containerHeight;
        const width = (booth.widthPercent || 10) / 100 * containerWidth;
        const height = (booth.heightPercent || 8) / 100 * containerHeight;

        return (
          <div
            key={booth.id}
            onClick={() => handleBoothClick(booth)}
            className="absolute border-2 border-white cursor-pointer group"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: `${getStatusColor(booth.status)}80`, // Add transparency
              transform: `scale(${1/zoom})`,
              transformOrigin: 'top left'
            }}
          >
            <div className="absolute -top-6 left-0 bg-black text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {booth.boothNumber} {booth.companyName ? `- ${booth.companyName}` : ''}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Floor Plan Manager</h1>
            <p className="text-sm text-gray-500">
              {floorPlan.baseImageUrl ? 'Manage your exhibition floor plan' : 'Upload a floor plan to get started'}
            </p>
          </div>

          <div className="flex gap-3">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border rounded-lg">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 rounded-l-lg"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="px-2 text-sm">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded-r-lg"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <button
              onClick={handleZoomReset}
              className="px-4 py-2 border rounded-lg flex items-center gap-2"
            >
              <RefreshCw size={16} /> Reset Zoom
            </button>

            <button
              onClick={handleReset}
              disabled={loading || uploading}
              className="px-4 py-2 border rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50"
            >
              <Upload size={16} /> Reset
            </button>

            <button
              onClick={handleUploadClick}
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 disabled:bg-blue-400"
            >
              <Upload size={16} /> 
              {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </div>
        </div>
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div
            ref={containerRef}
            className="relative w-full h-[600px] overflow-auto border rounded-lg bg-gray-100"
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
              </div>
            ) : floorPlan.baseImageUrl ? (
              <div className="relative inline-block">
                <img
                  ref={imageRef}
                  src={floorPlan.baseImageUrl}
                  alt="Floor Plan"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top left',
                    width: '100%',
                    height: 'auto',
                    maxWidth: 'none'
                  }}
                  onLoad={() => {
                    // Force re-render of booths after image loads
                    setZoom(prev => prev);
                  }}
                />
                {/* Render booths overlay */}
                <div 
                  className="absolute top-0 left-0"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top left',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  {renderBooths()}
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Map size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No floor plan uploaded yet</p>
                <button
                  onClick={handleUploadClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                >
                  <Upload size={16} /> Upload Floor Plan
                </button>
              </div>
            )}
          </div>

          {/* Statistics */}
          {floorPlan.booths && floorPlan.booths.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Total Booths</div>
                <div className="text-2xl font-bold">{floorPlan.booths.length}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-600">Available</div>
                <div className="text-2xl font-bold">
                  {floorPlan.booths.filter(b => b.status === 'available').length}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-600">Booked</div>
                <div className="text-2xl font-bold">
                  {floorPlan.booths.filter(b => b.status === 'booked').length}
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-sm text-yellow-600">Reserved</div>
                <div className="text-2xl font-bold">
                  {floorPlan.booths.filter(b => b.status === 'reserved').length}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOOTH DETAILS MODAL */}
      {showBoothDetails && selectedBooth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">
                Booth #{selectedBooth.boothNumber}
              </h3>
              <button 
                onClick={() => setShowBoothDetails(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs text-white ${getStatusColor(selectedBooth.status)}`}>
                  {selectedBooth.status}
                </span>
              </div>
              
              {selectedBooth.companyName && (
                <div>
                  <span className="text-sm text-gray-600">Company:</span>
                  <span className="ml-2 font-medium">{selectedBooth.companyName}</span>
                </div>
              )}

              {selectedBooth.metadata && (
                <div className="border-t pt-3 mt-3">
                  <h4 className="font-medium mb-2">Additional Details</h4>
                  <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40">
                    {JSON.stringify(selectedBooth.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowBoothDetails(false)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}