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
  const [image, setImage] = useState<string | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([
    {
      id: "booth-1",
      type: "booth",
      x: 100,
      y: 100,
      width: 80,
      height: 60,
      rotation: 0,
      color: "rgba(59, 130, 246, 0.3)",
      borderColor: "#1e40af",
      borderWidth: 2,
      fontSize: 12,
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
  const [fontSize, setFontSize] = useState(12);
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

  // ================= CRITICAL FIXES START =================

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
        width: 0,
        height: 0,
        rotation: 0,
        color: currentColor,
        borderColor: currentBorderColor,
        borderWidth,
        fontSize,
        text: shapeType === "text" ? "Text" : getDefaultText(shapeType),
        zIndex: shapes.length + 1,
        metadata: shapeType === "booth" ? {
          boothNumber: (shapes.filter(s => s.type === "booth").length + 1).toString(),
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
        width: Math.max(20, width),
        height: Math.max(20, height)
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
    if (!containerRef.current) return;
    
    setIsLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;

      // Clone the container and reset transformations for export
      const clone = containerRef.current.cloneNode(true) as HTMLElement;
      
      // Remove zoom and pan transformations from clone
      const canvasContent = clone.querySelector('.canvas-content') as HTMLElement;
      if (canvasContent) {
        canvasContent.style.transform = 'none';
        canvasContent.style.left = '0';
        canvasContent.style.top = '0';
      }

      // Remove grid background from clone if present
      const grid = clone.querySelector('.grid-background');
      if (grid) {
        grid.remove();
      }

      // Set clone styles
      clone.style.position = 'fixed';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = containerRef.current.scrollWidth + 'px';
      clone.style.height = containerRef.current.scrollHeight + 'px';
      clone.style.backgroundColor = 'white';
      clone.style.overflow = 'visible';
      
      document.body.appendChild(clone);

      const options: Partial<Html2CanvasOptions> = {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        removeContainer: false,
        width: clone.scrollWidth,
        height: clone.scrollHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight,
        onclone: (clonedDoc, element) => {
          // Ensure all elements are visible
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach(el => {
            (el as HTMLElement).style.transform = 'none';
            (el as HTMLElement).style.transformOrigin = '0 0';
          });
        }
      };

      const canvas = await html2canvas(clone, options);
      
      // Clean up
      document.body.removeChild(clone);
      
      // Create and trigger download
      const link = document.createElement("a");
      link.download = `exhibition-floor-plan-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.success('Floor plan exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // FIXED: Type-safe safeNumber function
  const safeNumber = (num: number | undefined): number => {
    if (num === undefined || num === null) return 0;
    const parsed = Number(num);
    return !isNaN(parsed) && isFinite(parsed) ? parsed : 0;
  };

  // FIXED: Simple save function for shapes with proper null handling
  const saveMasterFloorPlan = async (isAutoSave: boolean = false) => {
    try {
      setIsLoading(true);
      
      const planName = saveName || "Master Exhibition Floor Plan";
      const saveScale = scale || 0.1;
      
      // Save shapes as they are in canvas coordinates
      const shapesToSave = shapes.map(shape => ({
        id: shape.id,
        type: shape.type,
        x: safeNumber(shape.x),
        y: safeNumber(shape.y),
        width: safeNumber(shape.width),
        height: safeNumber(shape.height),
        rotation: safeNumber(shape.rotation),
        color: shape.color,
        borderColor: shape.borderColor,
        borderWidth: safeNumber(shape.borderWidth),
        fontSize: safeNumber(shape.fontSize ?? 12), // FIX: Handle undefined
        text: shape.text || getDefaultText(shape.type),
        zIndex: safeNumber(shape.zIndex ?? 1), // FIX: Handle undefined
        isLocked: Boolean(shape.isLocked),
        metadata: {
          ...shape.metadata,
          realWidth: (shape.width * saveScale).toFixed(2),
          realHeight: (shape.height * saveScale).toFixed(2),
          scale: saveScale
        }
      }));

      const floorPlanData: any = {
        name: planName,
        description: masterFloorPlan?.description || 'Master floor plan',
        version: "1.0",
        shapes: shapesToSave,
        image: image || undefined,
        scale: saveScale,
        tags: ['master', 'exhibition'],
        isPublic: true,
        isMaster: true
      };

      if (masterFloorPlan?.id) {
        floorPlanData.id = masterFloorPlan.id;
      }

      // Save to backend
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/floor-plans/master`;
      const method = masterFloorPlan?.id ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token') || localStorage.getItem('token')}`
        },
        body: JSON.stringify(floorPlanData)
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          const updatedPlan = {
            ...data.data,
            id: String(data.data.id),
            shapes: data.data.shapes || []
          };
          
          setMasterFloorPlan(updatedPlan);
          setLastSaved(new Date().toLocaleTimeString());
          
          if (!isAutoSave) {
            toast.success('Master floor plan saved successfully');
            setIsSaveDialogOpen(false);
          }
        }
      }
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save floor plan');
    } finally {
      setIsLoading(false);
    }
  };

  // FIXED: Type-safe click handler for save button
  const handleSaveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await saveMasterFloorPlan(false);
  };

  // Simple load function
  const loadMasterFloorPlan = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/floor-plans/master`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token') || localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const data = await response.json();
      
      if (data.success && data.data) {
        const plan = data.data;
        const planScale = Number(plan.scale) || 0.1;
        
        setScale(planScale);
        
        // Transform shapes - use coordinates as they are
        const transformedShapes = Array.isArray(plan.shapes) ? plan.shapes.map((shape: any) => ({
          id: shape.id || `shape-${Date.now()}-${Math.random()}`,
          type: (shape.type || 'rectangle') as ShapeType,
          x: Number(shape.x) || 0,
          y: Number(shape.y) || 0,
          width: Number(shape.width) || 50,
          height: Number(shape.height) || 50,
          rotation: Number(shape.rotation) || 0,
          color: shape.color || "rgba(59, 130, 246, 0.3)",
          borderColor: shape.borderColor || "#1e40af",
          borderWidth: Number(shape.borderWidth) || 2,
          fontSize: Number(shape.fontSize) || 12,
          text: shape.text || getDefaultText(shape.type || 'rectangle'),
          zIndex: Number(shape.zIndex) || 1,
          metadata: shape.metadata || {},
          isLocked: Boolean(shape.isLocked)
        })) : [];
        
        setShapes(transformedShapes);
        setImage(plan.image || null);
        setSaveName(plan.name || "Master Exhibition Floor Plan");
        setLastSaved(plan.updatedAt || null);
        
        toast.success('Floor plan loaded successfully');
      } else {
        // Create default if none exists
        createDefaultMasterPlan();
      }
    } catch (error) {
      console.error('Error loading:', error);
      createDefaultMasterPlan();
    } finally {
      setIsLoading(false);
    }
  };

  // ================= CRITICAL FIXES END =================

  const createDefaultMasterPlan = () => {
    const defaultPlan: FloorPlan = {
      name: "Master Exhibition Floor Plan",
      description: "Main exhibition floor layout",
      version: "1.0",
      shapes: [
        {
          id: "booth-1",
          type: "booth",
          x: 100,
          y: 100,
          width: 80,
          height: 60,
          rotation: 0,
          color: "rgba(59, 130, 246, 0.3)",
          borderColor: "#1e40af",
          borderWidth: 2,
          fontSize: 12,
          text: "Booth 1",
          zIndex: 1,
          metadata: {
            boothNumber: "1",
            companyName: "TechCorp Inc.",
            status: "booked",
            category: "Technology"
          }
        }
      ],
      scale: 0.1,
      tags: ['master', 'exhibition'],
      isPublic: true,
      id: ""
    };
    
    setMasterFloorPlan(defaultPlan);
    setShapes(defaultPlan.shapes);
    setSaveName(defaultPlan.name);
  };

  const handleUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,.png,.jpg,.jpeg,.gif,.webp";
    input.onchange = async e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
      
      setIsLoading(true);
      
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target?.result as string);
          toast.success('Background image uploaded');
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
        setIsLoading(false);
      }
    };
    input.click();
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

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDrawing && tempShape && tempShape.width > 10 && tempShape.height > 10) {
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
      if (finalShape.type === "booth") {
        setShowBoothDetails(true);
      }
      toast.success(`${getShapeLabel(finalShape.type)} added`);
    }

    setIsDrawing(false);
    setIsPanning(false);
    setIsMeasuring(false);
    setTempShape(null);
  };

  const handleShapeClick = (shapeId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (currentTool === "select") {
      setSelectedId(shapeId);
      const shape = shapes.find(s => s.id === shapeId);
      if (shape?.type === "booth") {
        setShowBoothDetails(true);
      }
    }
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

  const rotateSelected = () => {
    if (selectedId) {
      setShapes(prev =>
        prev.map(s =>
          s.id === selectedId
            ? { ...s, rotation: (safeNumber(s.rotation) + 45) % 360 }
            : s
        )
      );
      toast.success('Shape rotated');
    }
  };

  const bringToFront = () => {
    if (selectedId) {
      const maxZIndex = Math.max(...shapes.map(s => safeNumber(s.zIndex ?? 1)));
      setShapes(prev =>
        prev.map(s =>
          s.id === selectedId
            ? { ...s, zIndex: maxZIndex + 1 }
            : s
        )
      );
      toast.success('Brought to front');
    }
  };

  const sendToBack = () => {
    if (selectedId) {
      const minZIndex = Math.min(...shapes.map(s => safeNumber(s.zIndex ?? 1)));
      setShapes(prev =>
        prev.map(s =>
          s.id === selectedId
            ? { ...s, zIndex: minZIndex - 1 }
            : s
        )
      );
      toast.success('Sent to back');
    }
  };

  const toggleLock = () => {
    if (selectedId) {
      setShapes(prev =>
        prev.map(s =>
          s.id === selectedId
            ? { ...s, isLocked: !s.isLocked }
            : s
        )
      );
      const selected = shapes.find(s => s.id === selectedId);
      toast.success(selected?.isLocked ? 'Shape unlocked' : 'Shape locked');
    }
  };

  const updateSelectedText = (text: string) => {
    if (selectedId) {
      setShapes(prev =>
        prev.map(s =>
          s.id === selectedId
            ? { ...s, text: text || getDefaultText(s.type) }
            : s
        )
      );
    }
  };

  const updateBoothMetadata = (key: string, value: any) => {
    if (selectedId) {
      setShapes(prev =>
        prev.map(s => {
          if (s.id !== selectedId) return s;
          return {
            ...s,
            metadata: {
              ...s.metadata,
              [key]: value,
              updatedAt: new Date().toISOString()
            }
          };
        })
      );
    }
  };

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(prev =>
      prev.map(layer =>
        layer.id === layerId
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };

  const toggleLayerLock = (layerId: string) => {
    setLayers(prev =>
      prev.map(layer =>
        layer.id === layerId
          ? { ...layer, locked: !layer.locked }
          : layer
      )
    );
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
      case 'text': return 'Text';
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

  // FIXED: Render shapes with proper coordinate transformation and null handling
  const renderShape = (shape: Shape) => {
    const isSelected = shape.id === selectedId;
    const layer = layers.find(l => l.category === exhibitionShapes.find(s => s.type === shape.type)?.category);
    const isLocked = shape.isLocked || layer?.locked;
    
    // Apply zoom and pan for display
    const displayX = shape.x * zoom + panOffset.x;
    const displayY = shape.y * zoom + panOffset.y;
    const displayWidth = shape.width * zoom;
    const displayHeight = shape.height * zoom;
    const displayBorderWidth = shape.borderWidth * zoom;
    const displayFontSize = (shape.fontSize ?? 12) * zoom; // Handle undefined

    return (
      <div
        key={shape.id}
        onClick={(e) => handleShapeClick(shape.id, e)}
        onTouchStart={(e) => handleShapeClick(shape.id, e)}
        className={`absolute transition-all duration-150 ${isLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:shadow-md'} ${
          isSelected ? 'ring-2 ring-blue-500 ring-offset-1 shadow-lg z-50' : ''
        }`}
        style={{
          left: `${displayX}px`,
          top: `${displayY}px`,
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          backgroundColor: shape.color,
          border: `${displayBorderWidth}px solid ${shape.borderColor}`,
          borderRadius: getBorderRadius(shape.type),
          transform: `rotate(${shape.rotation}deg)`,
          transformOrigin: 'center',
          zIndex: shape.zIndex ?? 1
        }}
      >
        {/* Shape Icon */}
        {shape.type !== "text" && (
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 opacity-60">
            {(() => {
              const Icon = getShapeIcon(shape.type);
              return <Icon size={Math.max(8, displayFontSize * 0.8)} />;
            })()}
          </div>
        )}

        {/* Text Content */}
        {(shape.text || shape.type === "text") && (
          <div className="w-full h-full flex items-center justify-center pointer-events-none p-2">
            <span
              className="text-center wrap-break-word leading-tight"
              style={{
                fontSize: `${Math.max(8, displayFontSize)}px`,
                color: shape.type === 'text' ? shape.borderColor : '#1f2937',
                fontWeight: shape.type === 'booth' ? '600' : '400'
              }}
            >
              {shape.text || getDefaultText(shape.type)}
            </span>
          </div>
        )}

        {/* Status Indicator */}
        {shape.type === "booth" && shape.metadata?.status && (
          <div 
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm"
            style={{ 
              backgroundColor: statusColors[shape.metadata.status as keyof typeof statusColors],
              width: `${8 * zoom}px`,
              height: `${8 * zoom}px`
            }}
            title={`Status: ${shape.metadata.status}`}
          />
        )}
      </div>
    );
  };

  // ================= USE EFFECTS =================

  useEffect(() => {
    loadMasterFloorPlan();
  }, []);

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
        case "r":
          rotateSelected();
          break;
        case "[":
          sendToBack();
          break;
        case "]":
          bringToFront();
          break;
        case "l":
          toggleLock();
          break;
        case " ":
          setCurrentTool("pan");
          break;
        case "escape":
          setSelectedId(null);
          setCurrentTool("select");
          setShowBoothDetails(false);
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
            setIsSaveDialogOpen(true);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, shapes]);

  const zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4];
  const selectedShape = shapes.find(s => s.id === selectedId);

  const handleSave = () => {
    setIsSaveDialogOpen(true);
  };

  const SaveFloorPlanModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Save Floor Plan</h3>
              <p className="text-sm text-gray-500">Save your changes</p>
            </div>
            <button
              onClick={() => setIsSaveDialogOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Floor Plan Name</label>
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter floor plan name"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={() => setIsSaveDialogOpen(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                disabled={!saveName.trim() || isLoading}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <SaveAll size={16} />}
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toaster />
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Title */}
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

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-2"
            >
              <SaveAll size={14} />
              Save
            </button>
            <button
              onClick={handleUpload}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-2"
            >
              <Upload size={14} />
              Upload
            </button>
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
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
          </aside>
        )}

        {/* MAIN CANVAS AREA */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas Controls */}
          <div className="bg-white border-b border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(z => Math.max(z - 0.2, 0.1))}
                  className="p-2 hover:bg-gray-100 rounded"
                  disabled={zoom <= 0.1}
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-sm text-gray-700">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom(z => Math.min(z + 0.2, 5))}
                  className="p-2 hover:bg-gray-100 rounded"
                  disabled={zoom >= 5}
                >
                  <ZoomIn size={16} />
                </button>
              </div>
              
              {selectedShape && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={duplicateSelected}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Duplicate"
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
            className="flex-1 relative overflow-hidden bg-gray-50 select-none canvas-container"
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
                className="absolute inset-0 opacity-10 grid-background"
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
              className="absolute inset-0 canvas-content"
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
                  className="absolute top-0 left-0 max-w-full max-h-full object-contain"
                  draggable={false}
                  style={{ opacity: 0.7 }}
                />
              )}

              {/* Shapes */}
              {[...shapes]
                .filter(shape => {
                  const layer = layers.find(l => l.category === exhibitionShapes.find(s => s.type === shape.type)?.category);
                  return layer ? layer.visible : true;
                })
                .sort((a, b) => {
                  const aZ = safeNumber(a.zIndex ?? 1);
                  const bZ = safeNumber(b.zIndex ?? 1);
                  return aZ - bZ;
                })
                .map(renderShape)}

              {/* Temporary Shape */}
              {tempShape && (
                <div
                  className="absolute border-2 border-dashed border-blue-400 bg-blue-100/20"
                  style={{
                    left: `${tempShape.x * zoom + panOffset.x}px`,
                    top: `${tempShape.y * zoom + panOffset.y}px`,
                    width: `${tempShape.width * zoom}px`,
                    height: `${tempShape.height * zoom}px`,
                    borderRadius: getBorderRadius(tempShape.type)
                  }}
                />
              )}

              {/* Measurement Line */}
              {measurementLine && (
                <>
                  <div
                    className="absolute bg-red-500"
                    style={{
                      left: `${measurementLine.x1 * zoom + panOffset.x}px`,
                      top: `${measurementLine.y1 * zoom + panOffset.y}px`,
                      width: `${Math.sqrt(
                        Math.pow((measurementLine.x2 - measurementLine.x1) * zoom, 2) + 
                        Math.pow((measurementLine.y2 - measurementLine.y1) * zoom, 2)
                      )}px`,
                      height: '2px',
                      transform: `rotate(${Math.atan2(
                        measurementLine.y2 - measurementLine.y1,
                        measurementLine.x2 - measurementLine.x1
                      )}rad)`,
                      transformOrigin: '0 0'
                    }}
                  />
                  <div
                    className="absolute bg-white text-red-700 text-xs px-2 py-1 rounded shadow"
                    style={{
                      left: `${((measurementLine.x1 + measurementLine.x2) / 2) * zoom + panOffset.x}px`,
                      top: `${((measurementLine.y1 + measurementLine.y2) / 2) * zoom + panOffset.y - 20}px`,
                    }}
                  >
                    {calculateDistance(
                      measurementLine.x1,
                      measurementLine.y1,
                      measurementLine.x2,
                      measurementLine.y2
                    ).meters}m
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR - PROPERTIES */}
        {isPropertiesOpen && selectedShape && (
          <aside className="w-80 bg-white border-l border-gray-200 p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Properties</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Text</label>
                <input
                  type="text"
                  value={selectedShape.text || getDefaultText(selectedShape.type)}
                  onChange={(e) => updateSelectedText(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">X</span>
                    <input
                      type="number"
                      value={selectedShape.x}
                      onChange={(e) => setShapes(prev =>
                        prev.map(s => s.id === selectedId ? {...s, x: parseFloat(e.target.value)} : s)
                      )}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Y</span>
                    <input
                      type="number"
                      value={selectedShape.y}
                      onChange={(e) => setShapes(prev =>
                        prev.map(s => s.id === selectedId ? {...s, y: parseFloat(e.target.value)} : s)
                      )}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Size</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">Width</span>
                    <input
                      type="number"
                      value={selectedShape.width}
                      onChange={(e) => setShapes(prev =>
                        prev.map(s => s.id === selectedId ? {...s, width: parseFloat(e.target.value)} : s)
                      )}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Height</span>
                    <input
                      type="number"
                      value={selectedShape.height}
                      onChange={(e) => setShapes(prev =>
                        prev.map(s => s.id === selectedId ? {...s, height: parseFloat(e.target.value)} : s)
                      )}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Modals */}
      {isSaveDialogOpen && <SaveFloorPlanModal />}
    </div>
  );
}