"use client";

import { useRef, useState, useEffect } from "react";
import {
  Upload, ZoomIn, ZoomOut, Trash2, Move, Square, Circle,
  Triangle, Type, Minus, Plus, Download, RotateCw, Copy, 
  Grid, Layers, Palette, MousePointer, Hand, Building2, 
  Table, Armchair, DoorOpen, MoveVertical, Toilet, Printer, 
  Monitor, Speaker, Coffee, Save, Loader2, Eye, EyeOff, Ruler, 
  MapPin, Package, Truck, AlertCircle, CheckCircle, Maximize2,
  Minimize2, Search, Scissors, Home, Filter, Settings, Menu, X,
  ChevronLeft, ChevronRight, Smartphone, Tablet, Monitor as MonitorIcon,
  Expand, Minimize, SaveAll, FolderOpen, FileText, Database, 
  CloudUpload, CloudDownload, Shield, Users, Calendar, Clock, 
  Share2, Cloud, History, RefreshCw, TrendingUp, Star as StarIcon
} from "lucide-react";
import type { Options as Html2CanvasOptions } from "html2canvas";
import toast, { Toaster } from 'react-hot-toast';

// Import shared types
import { FloorPlan, Shape, ShapeType } from '@/lib/types';

type ToolMode = "select" | "draw" | "pan" | "text" | "measure";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  category: string;
}

interface ExhibitionShape {
  type: ShapeType;
  label: string;
  icon: any;
  category: string;
}

export default function ProfessionalExhibitionEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContentRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([
    {
      id: "booth-1",
      type: "booth",
      x: 100,
      y: 100,
      width: 120,
      height: 80,
      rotation: 0,
      color: "rgba(59, 130, 246, 0.3)",
      borderColor: "#1e40af",
      borderWidth: 2,
      fontSize: 14,
      text: "Booth 1",
      zIndex: 1,
      metadata: {
        boothNumber: "1",
        companyName: "TechCorp Inc.",
        status: "booked",
        category: "Technology"
      }
    }
  ]);
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [currentTool, setCurrentTool] = useState<ToolMode>("select");
  const [currentShape, setCurrentShape] = useState<ShapeType>("booth");
  const [currentColor, setCurrentColor] = useState("rgba(59, 130, 246, 0.3)");
  const [currentBorderColor, setCurrentBorderColor] = useState("#1e40af");
  const [borderWidth, setBorderWidth] = useState(2);
  const [fontSize, setFontSize] = useState(14);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [tempShape, setTempShape] = useState<Shape | null>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [gridSize, setGridSize] = useState(20);
  const [showGrid, setShowGrid] = useState(true);
  const [isSnapToGrid, setIsSnapToGrid] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [measurementLine, setMeasurementLine] = useState<{x1: number, y1: number, x2: number, y2: number} | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measureStart, setMeasureStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.1);
  const [activeLayer, setActiveLayer] = useState<string>("booths");
  const [layers, setLayers] = useState<Layer[]>([
    { id: "booths", name: "Booths", visible: true, locked: false, category: "booths" },
    { id: "fixtures", name: "Fixtures", visible: true, locked: false, category: "fixtures" },
    { id: "text", name: "Text Labels", visible: true, locked: false, category: "text" },
    { id: "measurements", name: "Measurements", visible: true, locked: true, category: "measurements" }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showBoothDetails, setShowBoothDetails] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Master floor plan state
  const [masterFloorPlan, setMasterFloorPlan] = useState<FloorPlan | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState("Master Exhibition Floor Plan");
  const [autoSave, setAutoSave] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [saveInterval, setSaveInterval] = useState<NodeJS.Timeout | null>(null);

  // Text editing state
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editingTextValue, setEditingTextValue] = useState("");

  // Professional color palette
  const colorPalette = [
    "rgba(59, 130, 246, 0.3)", "rgba(16, 185, 129, 0.3)", "rgba(245, 158, 11, 0.3)",
    "rgba(236, 72, 153, 0.3)", "rgba(139, 92, 246, 0.3)", "rgba(6, 182, 212, 0.3)",
    "rgba(132, 204, 22, 0.3)", "rgba(249, 115, 22, 0.3)", "rgba(99, 102, 241, 0.3)",
    "rgba(239, 68, 68, 0.3)"
  ];

  const borderColors = [
    "#1e40af", "#047857", "#b45309", "#be185d", "#5b21b6",
    "#0e7490", "#4d7c0f", "#c2410c", "#4338ca", "#b91c1c"
  ];

  const exhibitionShapes: ExhibitionShape[] = [
    { type: "booth", label: "Booth", icon: Building2, category: "booths" },
    { type: "table", label: "Table", icon: Table, category: "fixtures" },
    { type: "chair", label: "Chair", icon: Armchair, category: "fixtures" },
    { type: "door", label: "Door", icon: DoorOpen, category: "fixtures" },
    { type: "stairs", label: "Stairs", icon: MoveVertical, category: "fixtures" },
    { type: "toilet", label: "Toilet", icon: Toilet, category: "fixtures" },
    { type: "register", label: "Register", icon: Printer, category: "fixtures" },
    { type: "stage", label: "Stage", icon: Speaker, category: "fixtures" },
    { type: "screen", label: "Screen", icon: Monitor, category: "fixtures" },
    { type: "speaker", label: "Speaker", icon: Speaker, category: "fixtures" },
    { type: "cafe", label: "Cafe", icon: Coffee, category: "fixtures" },
    { type: "storage", label: "Storage", icon: Package, category: "fixtures" },
    { type: "truck", label: "Loading", icon: Truck, category: "fixtures" },
    { type: "pillar", label: "Pillar", icon: Square, category: "fixtures" },
    { type: "info", label: "Info Desk", icon: MapPin, category: "fixtures" },
    { type: "emergency", label: "Emergency", icon: AlertCircle, category: "fixtures" },
    { type: "rectangle", label: "Rectangle", icon: Square, category: "basic" },
    { type: "square", label: "Square", icon: Square, category: "basic" },
    { type: "circle", label: "Circle", icon: Circle, category: "basic" },
    { type: "text", label: "Text", icon: Type, category: "text" },
  ];

  const statusColors = {
    available: "#10b981",
    booked: "#3b82f6",
    reserved: "#f59e0b",
    maintenance: "#ef4444"
  };

  const statusLabels = {
    available: "Available",
    booked: "Booked",
    reserved: "Reserved",
    maintenance: "Maintenance"
  };

  // ================= CRITICAL FIXES =================

  // FIXED: Get coordinates that handle zoom/pan correctly
  const getCoordinates = (clientX: number, clientY: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Convert screen coordinates to canvas coordinates (considering zoom and pan)
    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;
    
    // Remove pan offset and divide by zoom to get true canvas coordinates
    const canvasX = (screenX - panOffset.x) / zoom;
    const canvasY = (screenY - panOffset.y) / zoom;

    if (isSnapToGrid && showGrid) {
      return {
        x: Math.round(canvasX / gridSize) * gridSize,
        y: Math.round(canvasY / gridSize) * gridSize
      };
    }

    return { x: canvasX, y: canvasY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const { x, y } = getCoordinates(e.clientX, e.clientY);

    if (currentTool === "pan") {
      setIsPanning(true);
      setStartPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (currentTool === "measure") {
      setIsMeasuring(true);
      setMeasureStart({ x, y });
      setMeasurementLine({ x1: x, y1: y, x2: x, y2: y });
      return;
    }

    if (currentTool === "draw" || currentTool === "text") {
      setIsDrawing(true);
      setStartPoint({ x, y });

      const shapeType = currentTool === "text" ? "text" : currentShape;
      const newShape: Shape = {
        id: "temp",
        type: shapeType,
        x,
        y,
        width: shapeType === "text" ? 150 : 60,
        height: shapeType === "text" ? 40 : 40,
        rotation: 0,
        color: currentColor,
        borderColor: currentBorderColor,
        borderWidth,
        fontSize: 14,
        text: shapeType === "text" ? "Double click to edit" : getDefaultText(shapeType),
        zIndex: shapes.length + 1,
        metadata: shapeType === "booth" ? {
          boothNumber: (shapes.filter(s => s.type === "booth").length + 1).toString(),
          companyName: "",
          status: "available",
          category: "General",
          scale: scale
        } : { scale: scale }
      };

      setTempShape(newShape);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const { x, y } = getCoordinates(e.clientX, e.clientY);

    if (isPanning) {
      const deltaX = e.clientX - startPoint.x;
      const deltaY = e.clientY - startPoint.y;
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setStartPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (isMeasuring && measurementLine) {
      setMeasurementLine({
        ...measurementLine,
        x2: x,
        y2: y
      });
      return;
    }

    if (isDrawing && tempShape) {
      let width = Math.abs(x - startPoint.x);
      let height = Math.abs(y - startPoint.y);

      if (tempShape.type === "square" || tempShape.type === "circle" || tempShape.type === "pillar") {
        const size = Math.max(width, height);
        width = size;
        height = size;
      }

      if (isSnapToGrid && showGrid) {
        width = Math.round(width / gridSize) * gridSize;
        height = Math.round(height / gridSize) * gridSize;
      }

      setTempShape({
        ...tempShape,
        x: Math.min(startPoint.x, x),
        y: Math.min(startPoint.y, y),
        width: Math.max(30, width),
        height: Math.max(30, height)
      });
    }

    if (currentTool === "select" && selectedId && e.buttons === 1) {
      const shape = shapes.find(s => s.id === selectedId);
      if (shape && !shape.isLocked) {
        const activeLayerObj = layers.find(l => l.id === activeLayer);
        if (activeLayerObj && !activeLayerObj.locked) {
          let newX = x - shape.width / 2;
          let newY = y - shape.height / 2;

          if (isSnapToGrid && showGrid) {
            newX = Math.round(newX / gridSize) * gridSize;
            newY = Math.round(newY / gridSize) * gridSize;
          }

          setShapes(prev =>
            prev.map(s =>
              s.id === selectedId
                ? { ...s, x: newX, y: newY }
                : s
            )
          );
        }
      }
    }
  };

  // FIXED: Export function that properly captures shapes
  const handleExport = async () => {
    if (!canvasContentRef.current) return;
    
    setIsLoading(true);
    toast.loading('Generating export...', { id: 'export' });
    
    try {
      const html2canvas = (await import("html2canvas")).default;

      // Create a clone of the canvas content with all transformations applied
      const exportContainer = document.createElement('div');
      exportContainer.style.position = 'fixed';
      exportContainer.style.left = '-9999px';
      exportContainer.style.top = '0';
      exportContainer.style.width = `${containerRef.current?.scrollWidth || 1920}px`;
      exportContainer.style.height = `${containerRef.current?.scrollHeight || 1080}px`;
      exportContainer.style.backgroundColor = 'white';
      exportContainer.style.overflow = 'visible';
      
      // Clone the canvas content
      const canvasContent = canvasContentRef.current.cloneNode(true) as HTMLElement;
      
      // Remove any temporary elements
      const tempElements = canvasContent.querySelectorAll('.temp-shape, .measurement-line');
      tempElements.forEach(el => el.remove());
      
      // Apply final transformations to the clone
      canvasContent.style.transform = `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`;
      canvasContent.style.transformOrigin = '0 0';
      
      exportContainer.appendChild(canvasContent);
      
      // Add grid if enabled
      if (showGrid) {
        const gridDiv = document.createElement('div');
        gridDiv.className = 'grid-background';
        gridDiv.style.position = 'absolute';
        gridDiv.style.top = '0';
        gridDiv.style.left = '0';
        gridDiv.style.width = '100%';
        gridDiv.style.height = '100%';
        gridDiv.style.backgroundImage = `
          linear-gradient(to right, #94a3b8 1px, transparent 1px),
          linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
        `;
        gridDiv.style.backgroundSize = `${gridSize * zoom}px ${gridSize * zoom}px`;
        gridDiv.style.opacity = '0.1';
        gridDiv.style.transform = `translate(${panOffset.x}px, ${panOffset.y}px)`;
        exportContainer.appendChild(gridDiv);
      }
      
      document.body.appendChild(exportContainer);

      const options: Partial<Html2CanvasOptions> = {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        removeContainer: false,
        width: exportContainer.scrollWidth,
        height: exportContainer.scrollHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: exportContainer.scrollWidth,
        windowHeight: exportContainer.scrollHeight
      };

      const canvas = await html2canvas(exportContainer, options);
      
      // Clean up
      document.body.removeChild(exportContainer);
      
      // Create and trigger download
      const link = document.createElement("a");
      link.download = `exhibition-floor-plan-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.success('Floor plan exported successfully!', { id: 'export' });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please try again.', { id: 'export' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDrawing && tempShape && tempShape.width > 20 && tempShape.height > 20) {
      const finalShape: Shape = {
        ...tempShape,
        id: `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: tempShape.text || getDefaultText(tempShape.type),
        metadata: {
          ...tempShape.metadata,
          createdAt: new Date().toISOString(),
          scale: scale
        }
      };
      setShapes(prev => [...prev, finalShape]);
      setSelectedId(finalShape.id);
      
      // Auto-edit text for new text shapes
      if (finalShape.type === "text") {
        setTimeout(() => {
          setEditingTextId(finalShape.id);
          setEditingTextValue(finalShape.text || "");
        }, 100);
      }
      
      if (finalShape.type === "booth") {
        setShowBoothDetails(true);
      }
      toast.success(`${getShapeLabel(finalShape.type)} added`);
    }

    setIsDrawing(false);
    setIsPanning(false);
    setIsMeasuring(false);
    setTempShape(null);
    setMeasurementLine(null);
  };

  const handleShapeClick = (shapeId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (currentTool === "select") {
      setSelectedId(shapeId);
      const shape = shapes.find(s => s.id === shapeId);
      if (shape?.type === "booth") {
        setShowBoothDetails(true);
      }
      setEditingTextId(null);
    }
  };

  const handleDoubleClick = (shapeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shape = shapes.find(s => s.id === shapeId);
    if (shape) {
      setEditingTextId(shapeId);
      setEditingTextValue(shape.text || "");
    }
  };

  const handleTextEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTextValue(e.target.value);
  };

  const handleTextEditKeyDown = (e: React.KeyboardEvent, shapeId: string) => {
    if (e.key === 'Enter') {
      saveTextEdit(shapeId);
    } else if (e.key === 'Escape') {
      setEditingTextId(null);
    }
  };

  const saveTextEdit = (shapeId: string) => {
    if (editingTextValue.trim()) {
      setShapes(prev =>
        prev.map(s =>
          s.id === shapeId
            ? { ...s, text: editingTextValue }
            : s
        )
      );
    }
    setEditingTextId(null);
  };

  const deleteSelected = () => {
    if (selectedId) {
      setShapes(prev => prev.filter(s => s.id !== selectedId));
      setSelectedId(null);
      setShowBoothDetails(false);
      toast.success('Shape deleted');
    }
  };

  const duplicateSelected = () => {
    if (selectedId) {
      const selected = shapes.find(s => s.id === selectedId);
      if (selected) {
        const duplicate: Shape = {
          ...selected,
          id: `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          x: selected.x + 20,
          y: selected.y + 20,
          metadata: {
            ...selected.metadata,
            createdAt: new Date().toISOString(),
            isDuplicate: true
          }
        };
        setShapes(prev => [...prev, duplicate]);
        setSelectedId(duplicate.id);
        toast.success('Shape duplicated');
      }
    }
  };

  const updateBoothStatus = (status: 'available' | 'booked' | 'reserved' | 'maintenance') => {
    if (selectedId) {
      setShapes(prev =>
        prev.map(s => {
          if (s.id !== selectedId) return s;
          return {
            ...s,
            metadata: {
              ...s.metadata,
              status
            }
          };
        })
      );
      toast.success(`Booth status updated to ${statusLabels[status]}`);
    }
  };

  const getDefaultText = (shapeType: ShapeType): string => {
    const shapeCount = shapes.filter(s => s.type === shapeType).length + 1;
    switch (shapeType) {
      case 'booth': return `Booth ${shapeCount}`;
      case 'table': return `Table ${shapeCount}`;
      case 'chair': return `Chair ${shapeCount}`;
      case 'door': return 'Door';
      case 'stairs': return 'Stairs';
      case 'toilet': return 'Toilet';
      case 'register': return 'Register';
      case 'stage': return 'Stage';
      case 'screen': return 'Screen';
      case 'speaker': return 'Speaker';
      case 'cafe': return 'Cafe';
      case 'storage': return 'Storage';
      case 'truck': return 'Loading';
      case 'pillar': return 'Pillar';
      case 'info': return 'Info Desk';
      case 'emergency': return 'Emergency';
      case 'text': return 'Double click to edit';
      case 'rectangle': return `Rectangle ${shapeCount}`;
      case 'square': return `Square ${shapeCount}`;
      case 'circle': return `Circle ${shapeCount}`;
      default: return shapeType.charAt(0).toUpperCase() + shapeType.slice(1);
    }
  };

  const getShapeIcon = (shapeType: ShapeType) => {
    const shape = exhibitionShapes.find(s => s.type === shapeType);
    return shape?.icon || Square;
  };

  const getShapeLabel = (shapeType: ShapeType): string => {
    const shape = exhibitionShapes.find(s => s.type === shapeType);
    return shape?.label || shapeType;
  };

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const pixels = Math.sqrt(dx * dx + dy * dy);
    return {
      pixels: Math.round(pixels),
      meters: Math.round(pixels * scale * 100) / 100
    };
  };

  // Helper function for border radius
  const getBorderRadius = (shapeType: ShapeType): string => {
    switch (shapeType) {
      case 'circle':
      case 'pillar':
        return '50%';
      default:
        return '6px';
    }
  };

  // Helper function for text color
  const getTextColor = (shape: Shape): string => {
    if (shape.type === 'booth') {
      return '#ffffff'; // White text for booths
    }
    return '#ffffff'; // White text for all shapes for better visibility
  };

  // Helper function for background color with better contrast
  const getBackgroundColor = (shape: Shape): string => {
    if (shape.type === 'booth' && shape.metadata?.status) {
      // Use status-based colors with higher opacity for better readability
      switch (shape.metadata.status) {
        case 'available': return 'rgba(16, 185, 129, 0.7)'; // Green
        case 'booked': return 'rgba(59, 130, 246, 0.7)'; // Blue
        case 'reserved': return 'rgba(245, 158, 11, 0.7)'; // Orange
        case 'maintenance': return 'rgba(239, 68, 68, 0.7)'; // Red
        default: return shape.color;
      }
    }
    return shape.color;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleMouseMove({
      ...e,
      clientX: touch.clientX,
      clientY: touch.clientY,
      buttons: 1,
      preventDefault: () => e.preventDefault()
    } as unknown as React.MouseEvent);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleMouseUp(event as unknown as React.MouseEvent);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleMouseDown({
      ...e,
      clientX: touch.clientX,
      clientY: touch.clientY,
      preventDefault: () => e.preventDefault()
    } as unknown as React.MouseEvent);
  };

  // FIXED: Render shapes with proper coordinate transformation and white text
  const renderShape = (shape: Shape) => {
    const isSelected = shape.id === selectedId;
    const isEditing = shape.id === editingTextId;
    
    // Apply zoom and pan for display
    const displayX = shape.x * zoom + panOffset.x;
    const displayY = shape.y * zoom + panOffset.y;
    const displayWidth = shape.width * zoom;
    const displayHeight = shape.height * zoom;
    const displayBorderWidth = shape.borderWidth * zoom;
    const displayFontSize = Math.max(12, (shape.fontSize ?? 14) * zoom);

    return (
      <div
        key={shape.id}
        onClick={(e) => handleShapeClick(shape.id, e)}
        onDoubleClick={(e) => handleDoubleClick(shape.id, e)}
        onTouchStart={(e) => handleShapeClick(shape.id, e)}
        className={`absolute transition-all duration-150 ${
          shape.isLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:shadow-lg'
        } ${
          isSelected ? 'ring-3 ring-blue-500 ring-offset-2 shadow-xl z-50' : ''
        }`}
        style={{
          left: `${displayX}px`,
          top: `${displayY}px`,
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          backgroundColor: getBackgroundColor(shape),
          border: `${displayBorderWidth}px solid ${shape.borderColor}`,
          borderRadius: getBorderRadius(shape.type),
          transform: `rotate(${shape.rotation}deg)`,
          transformOrigin: 'center',
          zIndex: shape.zIndex ?? 1,
          boxShadow: isSelected ? '0 10px 25px -5px rgba(0,0,0,0.2)' : '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        {/* Text Content */}
        {isEditing ? (
          <div className="absolute inset-0 flex items-center justify-center p-1">
            <input
              type="text"
              value={editingTextValue}
              onChange={handleTextEdit}
              onKeyDown={(e) => handleTextEditKeyDown(e, shape.id)}
              onBlur={() => saveTextEdit(shape.id)}
              className="w-full h-full text-center bg-white border-2 border-blue-500 rounded outline-none"
              style={{
                fontSize: `${Math.min(displayFontSize, displayWidth * 0.2)}px`,
                color: '#000000'
              }}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <>
            {/* Shape Icon - Small and subtle */}
            {shape.type !== "text" && shape.type !== "booth" && (
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 opacity-50">
                {(() => {
                  const Icon = getShapeIcon(shape.type);
                  return <Icon size={Math.max(12, displayFontSize * 0.6)} color="white" />;
                })()}
              </div>
            )}

            {/* Main Text */}
            <div className="absolute inset-0 flex items-center justify-center p-2 overflow-hidden">
              <span
                className="text-center break-words leading-tight font-medium"
                style={{
                  fontSize: `${Math.min(displayFontSize, displayWidth * 0.2)}px`,
                  color: getTextColor(shape),
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {shape.text || getDefaultText(shape.type)}
              </span>
            </div>

            {/* Status Badge for Booths */}
            {shape.type === "booth" && shape.metadata?.status && (
              <div 
                className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold shadow-lg"
                style={{ 
                  backgroundColor: statusColors[shape.metadata.status as keyof typeof statusColors],
                  color: 'white',
                  fontSize: `${Math.max(10, displayFontSize * 0.5)}px`,
                  transform: `scale(${1/zoom})`,
                  transformOrigin: 'top right',
                  whiteSpace: 'nowrap'
                }}
              >
                {statusLabels[shape.metadata.status as keyof typeof statusLabels]}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // ================= USE EFFECTS =================

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceMode("mobile");
        setIsToolsOpen(false);
        setIsPropertiesOpen(false);
      } else if (width < 1024) {
        setDeviceMode("tablet");
        setIsToolsOpen(true);
        setIsPropertiesOpen(false);
      } else {
        setDeviceMode("desktop");
        setIsToolsOpen(true);
        setIsPropertiesOpen(true);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case "delete":
        case "backspace":
          deleteSelected();
          break;
        case "d":
          if (e.ctrlKey) duplicateSelected();
          break;
        case " ":
          setCurrentTool("pan");
          break;
        case "escape":
          setSelectedId(null);
          setCurrentTool("select");
          setShowBoothDetails(false);
          setEditingTextId(null);
          break;
        case "+":
        case "=":
          if (e.ctrlKey) setZoom(z => Math.min(z + 0.1, 5));
          break;
        case "-":
          if (e.ctrlKey) setZoom(z => Math.max(z - 0.1, 0.1));
          break;
        case "m":
          setCurrentTool("measure");
          break;
        case "s":
          if (e.ctrlKey) {
            e.preventDefault();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, shapes]);

  const selectedShape = shapes.find(s => s.id === selectedId);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Building2 size={20} />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">Exhibition Planner</h1>
                <p className="text-xs text-gray-500">Professional Floor Plan Designer</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={isLoading}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              Export
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR - TOOLS */}
        {isToolsOpen && (
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { tool: "select", icon: MousePointer, label: "Select", color: "blue" },
                  { tool: "pan", icon: Hand, label: "Pan", color: "gray" },
                  { tool: "draw", icon: Square, label: "Draw", color: "purple" },
                  { tool: "text", icon: Type, label: "Text", color: "green" },
                  { tool: "measure", icon: Ruler, label: "Measure", color: "red" },
                ].map(({ tool, icon: Icon, label, color }) => (
                  <button
                    key={tool}
                    onClick={() => setCurrentTool(tool as ToolMode)}
                    className={`flex flex-col items-center p-3 rounded-lg border ${
                      currentTool === tool
                        ? `bg-${color}-50 border-${color}-200 text-${color}-700`
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-xs mt-1">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {currentTool === "draw" && (
              <div className="p-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Shapes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {exhibitionShapes.map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => setCurrentShape(type as ShapeType)}
                      className={`flex flex-col items-center p-2 rounded-lg border ${
                        currentShape === type
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-xs mt-1">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => setImage(e.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
                className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2 text-sm"
              >
                <Upload size={16} />
                Upload Background
              </button>
            </div>
          </aside>
        )}

        {/* MAIN CANVAS AREA */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas Controls */}
          <div className="bg-white border-b border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(z => Math.max(z - 0.1, 0.1))}
                  className="p-2 hover:bg-gray-100 rounded"
                  disabled={zoom <= 0.1}
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-sm text-gray-700 w-16 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(z => Math.min(z + 0.1, 5))}
                  className="p-2 hover:bg-gray-100 rounded"
                  disabled={zoom >= 5}
                >
                  <ZoomIn size={16} />
                </button>
                
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-2 rounded ${
                    showGrid ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                  title="Toggle Grid"
                >
                  <Grid size={16} />
                </button>
              </div>
              
              {selectedShape && (
                <div className="flex items-center gap-2">
                  {selectedShape.type === "booth" && (
                    <>
                      <button
                        onClick={() => updateBoothStatus('available')}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs flex items-center gap-1"
                      >
                        <CheckCircle size={14} />
                        Available
                      </button>
                      <button
                        onClick={() => updateBoothStatus('booked')}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs flex items-center gap-1"
                      >
                        <Building2 size={14} />
                        Booked
                      </button>
                      <button
                        onClick={() => updateBoothStatus('reserved')}
                        className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs flex items-center gap-1"
                      >
                        <Clock size={14} />
                        Reserved
                      </button>
                    </>
                  )}
                  <button
                    onClick={duplicateSelected}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Duplicate (Ctrl+D)"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={deleteSelected}
                    className="p-2 hover:bg-red-100 text-red-600 rounded"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={containerRef}
            className="flex-1 relative overflow-hidden bg-gray-50 select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Grid */}
            {showGrid && (
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #94a3b8 1px, transparent 1px),
                    linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
                  `,
                  backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`,
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px)`
                }}
              />
            )}

            {/* Canvas Content */}
            <div
              ref={canvasContentRef}
              className="absolute inset-0"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              {/* Background Image */}
              {image && (
                <img
                  src={image}
                  alt="Floor plan background"
                  className="absolute top-0 left-0 max-w-full max-h-full object-contain pointer-events-none"
                  draggable={false}
                  style={{ opacity: 0.7 }}
                />
              )}

              {/* Shapes */}
              {[...shapes]
                .sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
                .map(renderShape)}

              {/* Temporary Shape */}
              {tempShape && (
                <div
                  className="absolute border-2 border-dashed border-blue-400 bg-blue-100/20 pointer-events-none temp-shape"
                  style={{
                    left: `${tempShape.x}px`,
                    top: `${tempShape.y}px`,
                    width: `${tempShape.width}px`,
                    height: `${tempShape.height}px`,
                    borderRadius: getBorderRadius(tempShape.type)
                  }}
                />
              )}

              {/* Measurement Line */}
              {measurementLine && (
                <div className="measurement-line">
                  <svg
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <line
                      x1={measurementLine.x1}
                      y1={measurementLine.y1}
                      x2={measurementLine.x2}
                      y2={measurementLine.y2}
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <circle
                      cx={measurementLine.x1}
                      cy={measurementLine.y1}
                      r="4"
                      fill="#ef4444"
                    />
                    <circle
                      cx={measurementLine.x2}
                      cy={measurementLine.y2}
                      r="4"
                      fill="#ef4444"
                    />
                  </svg>
                  <div
                    className="absolute bg-white text-red-700 text-xs px-2 py-1 rounded shadow"
                    style={{
                      left: `${(measurementLine.x1 + measurementLine.x2) / 2}px`,
                      top: `${(measurementLine.y1 + measurementLine.y2) / 2 - 20}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {calculateDistance(
                      measurementLine.x1,
                      measurementLine.y1,
                      measurementLine.x2,
                      measurementLine.y2
                    ).meters}m
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR - PROPERTIES */}
        {isPropertiesOpen && selectedShape && (
          <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Properties</h3>
              <button
                onClick={() => setIsPropertiesOpen(false)}
                className="p-1 hover:bg-gray-100 rounded lg:hidden"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {selectedShape.type === 'booth' ? 'Booth Name' : 'Text'}
                </label>
                <input
                  type="text"
                  value={selectedShape.text || getDefaultText(selectedShape.type)}
                  onChange={(e) => {
                    setShapes(prev =>
                      prev.map(s =>
                        s.id === selectedId
                          ? { ...s, text: e.target.value }
                          : s
                      )
                    );
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter text"
                />
              </div>

              {selectedShape.type === 'booth' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Booth Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => updateBoothStatus('available')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium ${
                        selectedShape.metadata?.status === 'available'
                          ? 'bg-green-600 text-white'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      Available
                    </button>
                    <button
                      onClick={() => updateBoothStatus('booked')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium ${
                        selectedShape.metadata?.status === 'booked'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      Booked
                    </button>
                    <button
                      onClick={() => updateBoothStatus('reserved')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium ${
                        selectedShape.metadata?.status === 'reserved'
                          ? 'bg-orange-600 text-white'
                          : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                      }`}
                    >
                      Reserved
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">X</span>
                    <input
                      type="number"
                      value={Math.round(selectedShape.x)}
                      onChange={(e) => {
                        setShapes(prev =>
                          prev.map(s =>
                            s.id === selectedId
                              ? { ...s, x: parseFloat(e.target.value) || 0 }
                              : s
                          )
                        );
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Y</span>
                    <input
                      type="number"
                      value={Math.round(selectedShape.y)}
                      onChange={(e) => {
                        setShapes(prev =>
                          prev.map(s =>
                            s.id === selectedId
                              ? { ...s, y: parseFloat(e.target.value) || 0 }
                              : s
                          )
                        );
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Size</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">Width</span>
                    <input
                      type="number"
                      value={Math.round(selectedShape.width)}
                      onChange={(e) => {
                        setShapes(prev =>
                          prev.map(s =>
                            s.id === selectedId
                              ? { ...s, width: Math.max(20, parseFloat(e.target.value) || 20) }
                              : s
                          )
                        );
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      min="20"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Height</span>
                    <input
                      type="number"
                      value={Math.round(selectedShape.height)}
                      onChange={(e) => {
                        setShapes(prev =>
                          prev.map(s =>
                            s.id === selectedId
                              ? { ...s, height: Math.max(20, parseFloat(e.target.value) || 20) }
                              : s
                          )
                        );
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      min="20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Rotation</label>
                <input
                  type="number"
                  value={selectedShape.rotation || 0}
                  onChange={(e) => {
                    setShapes(prev =>
                      prev.map(s =>
                        s.id === selectedId
                          ? { ...s, rotation: parseFloat(e.target.value) || 0 }
                          : s
                      )
                    );
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  min="0"
                  max="360"
                  step="45"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Colors</label>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">Fill</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {colorPalette.slice(0, 5).map((color, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setShapes(prev =>
                              prev.map(s =>
                                s.id === selectedId
                                  ? { ...s, color }
                                  : s
                              )
                            );
                          }}
                          className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Border</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {borderColors.slice(0, 5).map((color, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setShapes(prev =>
                              prev.map(s =>
                                s.id === selectedId
                                  ? { ...s, borderColor: color }
                                  : s
                              )
                            );
                          }}
                          className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Border Width
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={selectedShape.borderWidth || 2}
                  onChange={(e) => {
                    setShapes(prev =>
                      prev.map(s =>
                        s.id === selectedId
                          ? { ...s, borderWidth: parseInt(e.target.value) }
                          : s
                      )
                    );
                  }}
                  className="w-full"
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={duplicateSelected}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Copy size={14} />
                    Duplicate
                  </button>
                  <button
                    onClick={deleteSelected}
                    className="flex-1 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Toggle Properties Button (when hidden) */}
        {!isPropertiesOpen && (
          <button
            onClick={() => setIsPropertiesOpen(true)}
            className="fixed right-4 top-20 bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 lg:hidden"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>
    </div>
  );
}