"use client";

import { useState, useEffect, useRef } from "react";
import {
  Download,
  Upload,
  Map,
  ZoomIn,
  ZoomOut,
  X
} from "lucide-react";

interface Booth {
  id: string;
  number: string;
  size: string;
  type: "standard" | "corner" | "premium";
  status: "available" | "booked" | "reserved";
  position: {
    row: number;
    col: number;
    rowSpan?: number;
    colSpan?: number;
  };
}

interface FloorPlan {
  id: string;
  name: string;
  hall: string;
  description: string;
  gridSize: {
    rows: number;
    cols: number;
  };
  booths: Booth[];
  lastUpdated: string;
  status: "published" | "draft";
  capacity: number;
  entry_points: string[];
  amenities: string[];
}

export default function FloorPlanManager() {
  /* ================= STATE ================= */

  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [showBoothDetails, setShowBoothDetails] = useState(false);

  const [floorPlan] = useState<FloorPlan>({
    id: "60001",
    name: "EXHIBITION HALL - B",
    hall: "Main Hall",
    description: "Main exhibition hall with mixed booth sizes",
    gridSize: { rows: 12, cols: 20 },
    booths: generateSampleBooths(),
    lastUpdated: "2024-01-29",
    status: "published",
    capacity: 500,
    entry_points: ["Main Entrance", "Food Court Entrance"],
    amenities: ["Power Outlets", "WiFi", "Lighting"],
  });

  /* ================= AUTO FIT ZOOM ================= */

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const gridWidth = floorPlan.gridSize.cols * 50;
    const gridHeight = floorPlan.gridSize.rows * 50;

    const scaleX = containerWidth / gridWidth;
    const scaleY = containerHeight / gridHeight;

    const fittedZoom = Math.min(scaleX, scaleY);

    setZoom(fittedZoom);
  }, [floorPlan]);

  /* ================= SAMPLE BOOTHS ================= */

  function generateSampleBooths(): Booth[] {
    const booths: Booth[] = [];

    for (let i = 1; i <= 20; i++) {
      booths.push({
        id: `booth-${i}`,
        number: i.toString(),
        size: i <= 10 ? "4x3" : "5x3",
        type: i % 3 === 0 ? "corner" : "standard",
        status:
          i % 4 === 0
            ? "booked"
            : i % 7 === 0
            ? "reserved"
            : "available",
        position: {
          row: Math.ceil(i / 5),
          col: (i - 1) % 5,
        },
      });
    }

    for (let i = 21; i <= 43; i++) {
      booths.push({
        id: `booth-${i}`,
        number: i.toString(),
        size: i <= 30 ? "7x5" : "7x6",
        type: i === 41 ? "premium" : "standard",
        status: i % 3 === 0 ? "booked" : "available",
        position: {
          row: Math.ceil((i - 20) / 4) + 5,
          col: ((i - 21) % 4) + 15,
        },
      });
    }

    return booths;
  }

  /* ================= HELPERS ================= */

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300 text-green-800";
      case "booked":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "reserved":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      default:
        return "bg-gray-100 border-gray-300";
    }
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
              Upload, view, and manage your floor plans
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
              <Download size={16} /> Export
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
              <Upload size={16} /> Upload
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* FLOOR PLAN INFO */}
        <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold">{floorPlan.name}</h2>
          <p className="text-sm text-gray-500">
            Floor Plan ID: {floorPlan.id}
          </p>
        </div>

        {/* GRID SECTION */}
        <div className="bg-white rounded-xl border shadow-sm p-6">

          {/* ENTRY */}
          <div className="flex justify-between mb-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Map size={14} /> MAIN ENTRANCE
            </span>
            <span className="flex items-center gap-1">
              <Map size={14} /> FOOD COURT
            </span>
          </div>

          {/* ZOOM CONTROLS */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => setZoom((z) => z + 0.1)}
              className="p-2 border rounded"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.1, z - 0.1))}
              className="p-2 border rounded"
            >
              <ZoomOut size={16} />
            </button>
          </div>

          {/* ZOOM WRAPPER */}
          <div
            ref={containerRef}
            className="relative w-full h-[600px] overflow-hidden border rounded-lg bg-gray-100"
          >
            <div
              className="absolute top-0 left-0"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                width: `${floorPlan.gridSize.cols * 50}px`,
                height: `${floorPlan.gridSize.rows * 50}px`,
              }}
            >
              <div
                className="grid border-2 border-gray-300 bg-white"
                style={{
                  gridTemplateColumns: `repeat(${floorPlan.gridSize.cols}, 50px)`,
                  gridTemplateRows: `repeat(${floorPlan.gridSize.rows}, 50px)`,
                }}
              >
                {Array.from({
                  length:
                    floorPlan.gridSize.rows *
                    floorPlan.gridSize.cols,
                }).map((_, i) => (
                  <div key={i} className="border border-gray-100" />
                ))}

                {floorPlan.booths.map((booth) => (
                  <div
                    key={booth.id}
                    onClick={() => {
                      setSelectedBooth(booth);
                      setShowBoothDetails(true);
                    }}
                    className={`flex items-center justify-center text-xs font-bold border cursor-pointer ${getStatusColor(
                      booth.status
                    )}`}
                    style={{
                      gridRow: booth.position.row,
                      gridColumn: booth.position.col + 1,
                    }}
                  >
                    {booth.number}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CAPACITY */}
          <div className="mt-4 p-3 bg-yellow-50 border rounded-lg text-sm">
            Max Capacity: <strong>{floorPlan.capacity}</strong>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showBoothDetails && selectedBooth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">
                Booth #{selectedBooth.number}
              </h3>
              <button onClick={() => setShowBoothDetails(false)}>
                <X size={20} />
              </button>
            </div>

            <p className="text-sm">Size: {selectedBooth.size}</p>
            <p className="text-sm capitalize">
              Type: {selectedBooth.type}
            </p>
            <p className="text-sm capitalize">
              Status: {selectedBooth.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}