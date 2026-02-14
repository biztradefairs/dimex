'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  MapPin,
  Phone,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Package,
  Tag,
  FileText,
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  Save,
  ArrowLeft,
  ChevronRight,
  Calendar,
  Clock,
  Award,
  ExternalLink,
  HelpCircle,
  Info,
  AlertTriangle,
  Building,
  Receipt,
  FileText as FileTextIcon,
  Download as DownloadIcon
} from 'lucide-react';
import Link from 'next/link';


// API Configuration
const API_BASE_URL = 'https://diemex-backend.onrender.com';

// Types
interface ExhibitorProfile {
  id: string;
  // General Information
  companyName: string;
  shortName: string;
  registrationNumber: string;
  yearEstablished: number | string;
  companySize: string;
  companyType: string;
  
  // Contact Person
  contactPerson: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    alternatePhone: string;
  };
  
  // Exhibition Location
  exhibition: {
    pavilion: string;
    hall: string;
    standNumber: string;
    floorPlan?: File | string;
    floorPlanUrl?: string;
  };
  
  // Company Address
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    postalCode: string;
  };
  
  // Business Details
  sector: string[];
  about: string;
  mission: string;
  vision: string;
  
  // Social Media
  socialMedia: {
    website: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  
  // Logo
  logo?: File | string;
  logoUrl?: string;
  
  // Products
  products: Product[];
  
  // Brands
  brands: Brand[];
  
  // Brochures
  brochures: Brochure[];
  
  // Additional fields from API
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image?: File | string;
  imageUrl?: string;
  specifications: Record<string, string>;
}

interface Brand {
  id: string;
  name: string;
  description: string;
  logo?: File | string;
  logoUrl?: string;
}

interface Brochure {
  id: string;
  name: string;
  description: string;
  file?: File;
  fileUrl: string;
  fileSize: string;
  downloads: number;
  uploadedAt: Date;
  publicId?: string;
}

interface FloorPlan {
  id: string;
  name: string;
  gridSize: {
    rows: number;
    cols: number;
  };
  imageUrl?: string;
}

interface BoothDetails {
  boothNumber: string;
  position: {
    x: number;
    y: number;
  };
  size: string;
  status: string;
}

// Country options
const countries = [
  { code: 'TR', name: 'Turkey' },
  { code: 'RU', name: 'Russia' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'AE', name: 'UAE' },
];

// Sector options
const sectorOptions = [
  'Logistics',
  'Supply Chain',
  'Freight',
  'Technology',
  'Manufacturing',
  'Construction',
  'Automotive',
  'Healthcare',
  'Pharmaceutical',
  'Food & Beverage',
  'Textile',
  'Energy',
  'Mining',
  'Agriculture',
  'Defense',
  'Aerospace',
  'Maritime',
  'Retail',
  'E-commerce',
  'Education',
  'Finance',
  'Consulting',
  'Marketing',
  'Real Estate',
];

// Company size options
const companySizeOptions = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
];

// Company type options
const companyTypeOptions = [
  'Private',
  'Public',
  'Non-Profit',
  'Government',
  'Partnership',
  'Sole Proprietorship',
];

// Pavilion options
const pavilionOptions = [
  'Pavilion 1',
  'Pavilion 2',
  'Pavilion 3',
  'Pavilion 4',
  'Pavilion 5',
  'Pavilion 6',
  'Pavilion 7',
  'Pavilion 8',
];

// Hall options
const hallOptions = [
  'Hall A',
  'Hall B',
  'Hall C',
  'Hall D',
  'Hall E',
  'Hall F',
  'Hall G',
  'Hall H',
];

export default function ExhibitorDashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'products' | 'brands' | 'brochures' | 'preview' | 'invoices' | 'requirements' | 'manual'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddBrochure, setShowAddBrochure] = useState(false);
  const [showAddRequirement, setShowAddRequirement] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);
  const [completionScore, setCompletionScore] = useState(0);
  
  // Additional state from API
  // const [invoices, setInvoices] = useState<Invoice[]>([]);
  // const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [floorPlan, setFloorPlan] = useState<FloorPlan | null>(null);
  const [boothDetails, setBoothDetails] = useState<BoothDetails | null>(null);
  const [manualSections, setManualSections] = useState<any[]>([]);
  
  // Profile State
  const [profile, setProfile] = useState<ExhibitorProfile>({
    id: '',
    companyName: '',
    shortName: '',
    registrationNumber: '',
    yearEstablished: '',
    companySize: '',
    companyType: '',
    contactPerson: {
      name: '',
      jobTitle: '',
      email: '',
      phone: '',
      alternatePhone: '',
    },
    exhibition: {
      pavilion: '',
      hall: '',
      standNumber: '',
    },
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      countryCode: '',
      postalCode: '',
    },
    sector: [],
    about: '',
    mission: '',
    vision: '',
    socialMedia: {
      website: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
    },
    products: [],
    brands: [],
    brochures: [],
    status: 'active',
    createdAt: '',
    updatedAt: '',
  });

  // New product form state
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    category: '',
    price: '',
    specifications: {},
  });

  // New brand form state
  const [newBrand, setNewBrand] = useState<Brand>({
    id: '',
    name: '',
    description: '',
  });

  // New brochure form state
  const [newBrochure, setNewBrochure] = useState<Brochure>({
    id: '',
    name: '',
    description: '',
    file: undefined,
    fileUrl: '',
    fileSize: '',
    downloads: 0,
    uploadedAt: new Date(),
  });

  // New requirement form state
  const [newRequirement, setNewRequirement] = useState({
    type: '',
    description: '',
    quantity: 1,
  });

  // New spec key/value for product
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Load all exhibitor data
  useEffect(() => {
    fetchAllData();
  }, []);

  // Calculate profile completion
  useEffect(() => {
    calculateCompletionScore();
  }, [profile]);

  // Helper function for API calls with auth
const apiCall = async (endpoint: string, options: RequestInit = {}, isFormData = false) => {
  const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
  
  const headers: HeadersInit = {};
  
  // Don't set Content-Type for FormData - browser will set it with boundary
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
const uploadToCloudinary = async (file: File, folder: string = 'exhibitor-files') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const result = await apiCall('/api/upload', {
    method: 'POST',
    body: formData,
  }, true); // true = isFormData

  return result.data; // Should return { url, publicId, format, etc. }
};

const fetchAllData = async () => {
  setLoading(true);
  setShowError(null);
  
  try {
    // Fetch all data in parallel for better performance
    await Promise.all([
      fetchExhibitorProfile(),
      fetchProducts(),
      fetchBrands(),
      fetchBrochures(),
      fetchDashboardLayout(),
      fetchManual()
    ]);
    
  } catch (error: any) {
    console.error('Error fetching data:', error);
    setShowError(error.message || 'Failed to load data');
  } finally {
    setLoading(false);
  }
};

const fetchExhibitorProfile = async () => {
  try {
    const result = await apiCall('/api/exhibitorDashboard/profile');
    
    if (result.success) {
      const apiData = result.data;
      
      // Parse address if it's a string
      let addressParts = {
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
      };
      
      if (apiData.address) {
        const parts = apiData.address.split(',').map((p: string) => p.trim());
        addressParts.street = parts[0] || '';
        addressParts.city = parts[1] || '';
        addressParts.state = parts[2] || '';
        addressParts.country = parts[3] || '';
        addressParts.postalCode = parts[4] || '';
      }
      
      // Parse social media if it's stored as JSON string or object
      let socialMedia = {
        website: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
      };
      
      if (apiData.socialMedia) {
        if (typeof apiData.socialMedia === 'string') {
          try {
            socialMedia = JSON.parse(apiData.socialMedia);
          } catch (e) {
            console.error('Error parsing social media:', e);
          }
        } else if (typeof apiData.socialMedia === 'object') {
          socialMedia = {
            website: apiData.socialMedia.website || apiData.website || '',
            linkedin: apiData.socialMedia.linkedin || '',
            twitter: apiData.socialMedia.twitter || '',
            facebook: apiData.socialMedia.facebook || '',
            instagram: apiData.socialMedia.instagram || '',
          };
        }
      } else {
        // If no socialMedia object, try to get website directly
        socialMedia.website = apiData.website || '';
      }
      
      setProfile({
        id: apiData.id || '',
        companyName: apiData.company || apiData.name || '',
        shortName: apiData.shortName || apiData.short_name || '',
        registrationNumber: apiData.registrationNumber || apiData.registration_number || '',
        yearEstablished: apiData.yearEstablished || apiData.year_established || '',
        companySize: apiData.companySize || apiData.company_size || '',
        companyType: apiData.companyType || apiData.company_type || '',
        contactPerson: {
          name: apiData.contactPerson?.name || apiData.contact_name || apiData.name || '',
          jobTitle: apiData.contactPerson?.jobTitle || apiData.contact_job_title || '',
          email: apiData.contactPerson?.email || apiData.email || '',
          phone: apiData.contactPerson?.phone || apiData.phone || '',
          alternatePhone: apiData.contactPerson?.alternatePhone || apiData.alternate_phone || '',
        },
        exhibition: {
          pavilion: apiData.exhibition?.pavilion || apiData.pavilion || '',
          hall: apiData.exhibition?.hall || apiData.hall || '',
          standNumber: apiData.exhibition?.standNumber || apiData.boothNumber || apiData.booth_number || '',
          floorPlanUrl: apiData.exhibition?.floorPlanUrl || apiData.floor_plan_url || '',
        },
        address: {
          street: addressParts.street || apiData.address_street || '',
          city: addressParts.city || apiData.address_city || '',
          state: addressParts.state || apiData.address_state || '',
          country: addressParts.country || apiData.address_country || '',
          countryCode: apiData.address_country_code || '',
          postalCode: addressParts.postalCode || apiData.address_postal_code || '',
        },
        sector: apiData.sector ? 
          (Array.isArray(apiData.sector) ? apiData.sector : apiData.sector.split(',').map((s: string) => s.trim())) 
          : [],
        about: apiData.about || apiData.description || '',
        mission: apiData.mission || '',
        vision: apiData.vision || '',
        socialMedia: socialMedia,
        products: apiData.products || [],
        brands: apiData.brands || [],
        brochures: apiData.brochures || [],
        status: apiData.status || 'active',
        createdAt: apiData.createdAt || apiData.created_at || '',
        updatedAt: apiData.updatedAt || apiData.updated_at || '',
      });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
const fetchProducts = async () => {
  try {
    const result = await apiCall('/api/exhibitorDashboard/products');
    
    if (result.success) {
      setProfile(prev => ({
        ...prev,
        products: Array.isArray(result.data) ? result.data : []
      }));
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
const fetchBrands = async () => {
  try {
    const result = await apiCall('/api/exhibitorDashboard/brands');
    
    if (result.success) {
      setProfile(prev => ({
        ...prev,
        brands: Array.isArray(result.data) ? result.data : []
      }));
    }
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
};
const fetchBrochures = async () => {
  try {
    const result = await apiCall('/api/exhibitorDashboard/brochures');
    
    if (result.success) {
      setProfile(prev => ({
        ...prev,
        brochures: Array.isArray(result.data) ? result.data : []
      }));
    }
  } catch (error) {
    console.error('Error fetching brochures:', error);
  }
};

const fetchDashboardLayout = async () => {
  try {
    // FIXED: Use correct endpoint
    const result = await apiCall('/api/exhibitorDashboard/layout');
    
    if (result.success) {
      const { exhibitor, floorPlan: fp, booth } = result.data;
      
      setFloorPlan(fp);
      setBoothDetails(booth);
      
      // Update profile with any additional data from layout
      if (exhibitor) {
        setProfile(prev => ({
          ...prev,
          companyName: exhibitor.company || exhibitor.name || prev.companyName,
          exhibition: {
            ...prev.exhibition,
            standNumber: exhibitor.boothNumber || prev.exhibition.standNumber,
          },
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching layout:', error);
    // Don't throw - this is non-critical
  }
};





const fetchManual = async () => {
  try {
    // FIXED: Use correct endpoint
    const result = await apiCall('/api/exhibitorDashboard/manual');
    
    if (result.success) {
      setManualSections(result.data.sections || []);
    }
  } catch (error) {
    console.error('Error fetching manual:', error);
    setManualSections([]);
  }
};

  const calculateCompletionScore = () => {
    let totalFields = 0;
    let completedFields = 0;

    // Company Info
    if (profile.companyName) completedFields++;
    totalFields++;
    if (profile.registrationNumber) completedFields++;
    totalFields++;
    if (profile.yearEstablished) completedFields++;
    totalFields++;
    if (profile.companySize) completedFields++;
    totalFields++;
    if (profile.companyType) completedFields++;
    totalFields++;

    // Contact Person
    if (profile.contactPerson.name) completedFields++;
    totalFields++;
    if (profile.contactPerson.email) completedFields++;
    totalFields++;
    if (profile.contactPerson.phone) completedFields++;
    totalFields++;

    // Exhibition
    if (profile.exhibition.pavilion) completedFields++;
    totalFields++;
    if (profile.exhibition.hall) completedFields++;
    totalFields++;
    if (profile.exhibition.standNumber) completedFields++;
    totalFields++;

    // Address
    if (profile.address.street) completedFields++;
    totalFields++;
    if (profile.address.city) completedFields++;
    totalFields++;
    if (profile.address.country) completedFields++;
    totalFields++;

    // Business
    if (profile.sector.length > 0) completedFields++;
    totalFields++;
    if (profile.about) completedFields++;
    totalFields++;

    // Products & Brands
    if (profile.products.length > 0) completedFields++;
    totalFields++;
    if (profile.brands.length > 0) completedFields++;
    totalFields++;
    if (profile.brochures.length > 0) completedFields++;
    totalFields++;

    setCompletionScore(Math.round((completedFields / totalFields) * 100));
  };

const handleSaveProfile = async () => {
  setSaving(true);
  setShowError(null);
  
  try {
    // Build address string
    const addressParts = [
      profile.address.street,
      profile.address.city,
      profile.address.state,
      profile.address.country,
      profile.address.postalCode
    ].filter(part => part.trim() !== '');
    
    const addressString = addressParts.join(', ');
    
    const apiData = {
      // Basic Info
      company: profile.companyName,
      name: profile.contactPerson.name,
      email: profile.contactPerson.email,
      phone: profile.contactPerson.phone,
      alternatePhone: profile.contactPerson.alternatePhone,
      
      // Exhibition
      boothNumber: profile.exhibition.standNumber,
      pavilion: profile.exhibition.pavilion,
      hall: profile.exhibition.hall,
      
      // Address
      address: addressString || undefined,
      
      // Business Details
      description: profile.about,
      mission: profile.mission,
      vision: profile.vision,
      sector: profile.sector.join(', '),
      companySize: profile.companySize,
      companyType: profile.companyType,
      yearEstablished: profile.yearEstablished,
      registrationNumber: profile.registrationNumber,
      shortName: profile.shortName,
      
      // Social Media
      website: profile.socialMedia.website,
      linkedin: profile.socialMedia.linkedin,
      twitter: profile.socialMedia.twitter,
      facebook: profile.socialMedia.facebook,
      instagram: profile.socialMedia.instagram,
      
      // You might want to send social media as a JSON object
      socialMedia: JSON.stringify(profile.socialMedia)
    };

    const result = await apiCall('/api/exhibitorDashboard/profile', {
      method: 'PUT',
      body: JSON.stringify(apiData),
    });
    
    if (result.success) {
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Refresh all data
      await fetchAllData();
    }
  } catch (error: any) {
    console.error('Error saving profile:', error);
    setShowError(error.message || 'Failed to save profile');
  } finally {
    setSaving(false);
  }
};

const handleAddProduct = async () => {
  if (!newProduct.name || !newProduct.description) return;
  
  setSaving(true);
  try {
    let imageUrl = '';
    let imagePublicId = '';
    
    // Upload image to Cloudinary if exists
    if (newProduct.image) {
      const uploadResult = await uploadToCloudinary(newProduct.image as File, 'products');
      imageUrl = uploadResult.url;
      imagePublicId = uploadResult.publicId;
    }
    
    const product: Product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      imageUrl,
      specifications: newProduct.specifications || {},
    };
    
    // FIXED: Use correct endpoint
    const result = await apiCall('/api/exhibitorDashboard/products', {
      method: 'POST',
      body: JSON.stringify({
        ...product,
        imagePublicId
      }),
    });
    
    if (result.success) {
      setProfile({
        ...profile,
        products: [...profile.products, result.data],
      });
      
      setNewProduct({
        id: '',
        name: '',
        description: '',
        category: '',
        price: '',
        specifications: {},
      });
      setShowAddProduct(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  } catch (error: any) {
    console.error('Error adding product:', error);
    setShowError(error.message || 'Failed to add product');
  } finally {
    setSaving(false);
  }
};

const handleAddBrand = async () => {
  if (!newBrand.name) return;
  
  setSaving(true);
  try {
    let logoUrl = '';
    let logoPublicId = '';
    
    // Upload logo to Cloudinary if exists
    if (newBrand.logo) {
      const uploadResult = await uploadToCloudinary(newBrand.logo as File, 'brands');
      logoUrl = uploadResult.url;
      logoPublicId = uploadResult.publicId;
    }
    
    const brand: Brand = {
      ...newBrand,
      id: `brand-${Date.now()}`,
      logoUrl,
    };
    
    // Save to backend
    const result = await apiCall('/api/exhibitorDashboard/brands', {
      method: 'POST',
      body: JSON.stringify({
        ...brand,
        logoPublicId
      }),
    });
    
    if (result.success) {
      setProfile({
        ...profile,
        brands: [...profile.brands, result.data],
      });
      
      setNewBrand({
        id: '',
        name: '',
        description: '',
      });
      setShowAddBrand(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  } catch (error: any) {
    console.error('Error adding brand:', error);
    setShowError(error.message || 'Failed to add brand');
  } finally {
    setSaving(false);
  }
};

const handleAddBrochure = async () => {
  if (!newBrochure.name || !newBrochure.file) return;
  
  setSaving(true);
  try {
    // Upload PDF to Cloudinary
    const uploadResult = await uploadToCloudinary(newBrochure.file as File, 'brochures');
    
    const brochure: Brochure = {
      ...newBrochure,
      id: `broch-${Date.now()}`,
      fileSize: `${(newBrochure.file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileUrl: uploadResult.url,
      publicId: uploadResult.publicId, // Now this is valid
      downloads: 0,
      uploadedAt: new Date(),
    };
    
    // Save to backend
    const result = await apiCall('/api/exhibitorDashboard/brochures', {
      method: 'POST',
      body: JSON.stringify({
        name: brochure.name,
        description: brochure.description,
        fileUrl: brochure.fileUrl,
        fileSize: brochure.fileSize,
        publicId: brochure.publicId // Use the publicId from the brochure object
      }),
    });
    
    if (result.success) {
      setProfile({
        ...profile,
        brochures: [...profile.brochures, result.data],
      });
      
      setNewBrochure({
        id: '',
        name: '',
        description: '',
        file: undefined,
        fileUrl: '',
        fileSize: '',
        downloads: 0,
        uploadedAt: new Date(),
      });
      setShowAddBrochure(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  } catch (error: any) {
    console.error('Error adding brochure:', error);
    setShowError(error.message || 'Failed to upload brochure');
  } finally {
    setSaving(false);
  }
};

const handleDeleteProduct = async (productId: string, imagePublicId?: string) => {
  try {
    // Delete from Cloudinary first if image exists
    if (imagePublicId) {
      await apiCall(`/api/upload/${imagePublicId}`, {
        method: 'DELETE',
      });
    }
    
    // FIXED: Use correct endpoint
    await apiCall(`/api/exhibitorDashboard/products/${productId}`, {
      method: 'DELETE',
    });
    
    setProfile({
      ...profile,
      products: profile.products.filter(p => p.id !== productId),
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (error: any) {
    console.error('Error deleting product:', error);
    setShowError(error.message || 'Failed to delete product');
  }
};

const handleDeleteBrand = async (brandId: string, logoPublicId?: string) => {
  try {
    if (logoPublicId) {
      await apiCall(`/api/upload/${logoPublicId}`, {
        method: 'DELETE',
      });
    }
    
    // FIXED: Use correct endpoint
    await apiCall(`/api/exhibitorDashboard/brands/${brandId}`, {
      method: 'DELETE',
    });
    
    setProfile({
      ...profile,
      brands: profile.brands.filter(b => b.id !== brandId),
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (error: any) {
    console.error('Error deleting brand:', error);
    setShowError(error.message || 'Failed to delete brand');
  }
};

const handleDeleteBrochure = async (brochureId: string, publicId?: string) => {
  try {
    if (publicId) {
      await apiCall(`/api/upload/${publicId}`, {
        method: 'DELETE',
      });
    }
    
    await apiCall(`/api/exhibitorDashboard/brochures/${brochureId}`, {
      method: 'DELETE',
    });
    
    setProfile({
      ...profile,
      brochures: profile.brochures.filter(b => b.id !== brochureId),
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (error: any) {
    console.error('Error deleting brochure:', error);
    setShowError(error.message || 'Failed to delete brochure');
  }
};

  const handleSectorToggle = (sector: string) => {
    if (profile.sector.includes(sector)) {
      setProfile({
        ...profile,
        sector: profile.sector.filter(s => s !== sector),
      });
    } else {
      setProfile({
        ...profile,
        sector: [...profile.sector, sector],
      });
    }
  };

  const handleAddSpecification = () => {
    if (!newSpecKey || !newSpecValue) return;
    
    setNewProduct({
      ...newProduct,
      specifications: {
        ...newProduct.specifications,
        [newSpecKey]: newSpecValue,
      },
    });
    
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const handleRemoveSpecification = (key: string) => {
    const specs = { ...newProduct.specifications };
    delete specs[key];
    setNewProduct({
      ...newProduct,
      specifications: specs,
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({
        ...profile,
        logo: file,
        logoUrl: url,
      });
    }
  };

  const handleBrochureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBrochure({
        ...newBrochure,
        file: file,
        name: file.name,
      });
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewProduct({
        ...newProduct,
        image: file,
        imageUrl: url,
      });
    }
  };

  const handleBrandLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewBrand({
        ...newBrand,
        logo: file,
        logoUrl: url,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Exhibitor Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your exhibition presence and account
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Profile Completion */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-1">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${completionScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{completionScore}%</span>
                </div>
                <span className="text-xs text-gray-500">Complete</span>
              </div>

              {/* Preview Button */}
              <Link
                href={`/exhibitor/${profile.id}`}
                target="_blank"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Eye size={16} className="mr-2" />
                Preview
                <ExternalLink size={14} className="ml-1" />
              </Link>

              {/* Save Button */}
              {isEditing && (
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slide-down">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle size={20} className="text-green-500" />
            <span>Operation completed successfully!</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div className="fixed top-20 right-4 z-50 animate-slide-down">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            <span>{showError}</span>
            <button onClick={() => setShowError(null)} className="ml-2 text-red-500 hover:text-red-700">
              <XCircle size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden sticky top-24">
              {/* Profile Summary */}
              <div className="p-6 text-center border-b">
                <div className="relative inline-block">
                  <div className={`w-24 h-24 mx-auto rounded-2xl border-2 border-gray-200 flex items-center justify-center overflow-hidden ${
                    profile.logoUrl ? '' : 'bg-gray-100'
                  }`}>
                    {profile.logoUrl ? (
                      <img
                        src={profile.logoUrl}
                        alt={profile.companyName}
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    ) : (
                      <div className="text-3xl font-bold text-gray-400">
                        {profile.companyName ? profile.companyName.substring(0, 2).toUpperCase() : 'EX'}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                      <Upload size={14} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mt-4">
                  {profile.companyName || 'Your Company Name'}
                </h3>
                {profile.shortName && (
                  <p className="text-sm text-gray-500">{profile.shortName}</p>
                )}
                
                {profile.exhibition.standNumber && (
                  <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    <MapPin size={12} />
                    Stand {profile.exhibition.standNumber}
                  </div>
                )}

                {profile.status && (
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(profile.status)}`}>
                      {profile.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="p-4">
                <div className="space-y-1">
                  {[
                    { id: 'profile', label: 'Company Profile', icon: Building2 },
                    { id: 'products', label: 'Products & Services', icon: Package, count: profile.products.length },
                    { id: 'brands', label: 'Brands', icon: Tag, count: profile.brands.length },
                    { id: 'brochures', label: 'Brochures', icon: FileText, count: profile.brochures.length },
                   
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} />
                          <span>{tab.label}</span>
                        </div>
                        {tab.count !== undefined && tab.count > 0 && (
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Booth Info */}
              {boothDetails && (
                <div className="p-4 border-t bg-gray-50">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Booth Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Booth Number:</span>
                      <span className="font-medium text-gray-900">{boothDetails.boothNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium text-gray-900">{boothDetails.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(boothDetails.status)}`}>
                        {boothDetails.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Floor Plan */}
              {floorPlan && (
                <div className="p-4 border-t">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Floor Plan
                  </h4>
                  <p className="text-sm text-gray-700">{floorPlan.name}</p>
                  {floorPlan.imageUrl && (
                    <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                      View Floor Plan
                    </button>
                  )}
                </div>
              )}

              {/* Status */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Profile Published</span>
                </div>
                {profile.updatedAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    Last updated: {formatDate(profile.updatedAt)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="divide-y">
                  {/* Company Information */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Building2 size={20} className="text-blue-600" />
                        Company Information
                      </h2>
                      {!isEditing && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.companyName}
                            onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter company name"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.companyName || 'Not provided'}</p>
                        )}
                      </div>

                      {/* Short Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Short Name/Acronym
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.shortName}
                            onChange={(e) => setProfile({...profile, shortName: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., GLS"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.shortName || 'Not provided'}</p>
                        )}
                      </div>

                      {/* Registration Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Registration Number
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.registrationNumber}
                            onChange={(e) => setProfile({...profile, registrationNumber: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Company registration number"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.registrationNumber || 'Not provided'}</p>
                        )}
                      </div>

                      {/* Year Established */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year Established
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            value={profile.yearEstablished}
                            onChange={(e) => setProfile({...profile, yearEstablished: parseInt(e.target.value)})}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="YYYY"
                            min="1900"
                            max={new Date().getFullYear()}
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.yearEstablished || 'Not provided'}</p>
                        )}
                      </div>

                      {/* Company Size */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Size
                        </label>
                        {isEditing ? (
                          <select
                            value={profile.companySize}
                            onChange={(e) => setProfile({...profile, companySize: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select size</option>
                            {companySizeOptions.map(size => (
                              <option key={size} value={size}>{size} employees</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.companySize || 'Not provided'}</p>
                        )}
                      </div>

                      {/* Company Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Type
                        </label>
                        {isEditing ? (
                          <select
                            value={profile.companyType}
                            onChange={(e) => setProfile({...profile, companyType: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select type</option>
                            {companyTypeOptions.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.companyType || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Users size={20} className="text-blue-600" />
                      Contact Person
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.contactPerson.name}
                            onChange={(e) => setProfile({
                              ...profile,
                              contactPerson: {...profile.contactPerson, name: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Contact person name"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.contactPerson.name || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.contactPerson.jobTitle}
                            onChange={(e) => setProfile({
                              ...profile,
                              contactPerson: {...profile.contactPerson, jobTitle: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Exhibition Manager"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.contactPerson.jobTitle || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profile.contactPerson.email}
                            onChange={(e) => setProfile({
                              ...profile,
                              contactPerson: {...profile.contactPerson, email: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="email@company.com"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.contactPerson.email || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.contactPerson.phone}
                            onChange={(e) => setProfile({
                              ...profile,
                              contactPerson: {...profile.contactPerson, phone: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+90 212 555 0123"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.contactPerson.phone || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alternate Phone
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.contactPerson.alternatePhone}
                            onChange={(e) => setProfile({
                              ...profile,
                              contactPerson: {...profile.contactPerson, alternatePhone: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+90 532 555 4567"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.contactPerson.alternatePhone || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Exhibition Location */}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <MapPin size={20} className="text-blue-600" />
                      Exhibition Location
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pavilion <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <select
                            value={profile.exhibition.pavilion}
                            onChange={(e) => setProfile({
                              ...profile,
                              exhibition: {...profile.exhibition, pavilion: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Pavilion</option>
                            {pavilionOptions.map(pavilion => (
                              <option key={pavilion} value={pavilion}>{pavilion}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.exhibition.pavilion || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hall <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <select
                            value={profile.exhibition.hall}
                            onChange={(e) => setProfile({
                              ...profile,
                              exhibition: {...profile.exhibition, hall: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Hall</option>
                            {hallOptions.map(hall => (
                              <option key={hall} value={hall}>{hall}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.exhibition.hall || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stand Number <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.exhibition.standNumber}
                            onChange={(e) => setProfile({
                              ...profile,
                              exhibition: {...profile.exhibition, standNumber: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., A-42"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.exhibition.standNumber || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Company Address */}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Building size={20} className="text-blue-600" />
                      Company Address
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.address.street}
                            onChange={(e) => setProfile({
                              ...profile,
                              address: {...profile.address, street: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Street address"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.address.street || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.address.city}
                            onChange={(e) => setProfile({
                              ...profile,
                              address: {...profile.address, city: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="City"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.address.city || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State/Province
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.address.state}
                            onChange={(e) => setProfile({
                              ...profile,
                              address: {...profile.address, state: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="State/Province"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.address.state || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <select
                            value={profile.address.countryCode}
                            onChange={(e) => {
                              const country = countries.find(c => c.code === e.target.value);
                              setProfile({
                                ...profile,
                                address: {
                                  ...profile.address,
                                  countryCode: e.target.value,
                                  country: country?.name || ''
                                }
                              });
                            }}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.address.country || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.address.postalCode}
                            onChange={(e) => setProfile({
                              ...profile,
                              address: {...profile.address, postalCode: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Postal code"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.address.postalCode || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Award size={20} className="text-blue-600" />
                      Business Details
                    </h2>

                    {/* Sectors */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Business Sectors <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 border rounded-lg">
                            {sectorOptions.map(sector => (
                              <button
                                key={sector}
                                type="button"
                                onClick={() => handleSectorToggle(sector)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                  profile.sector.includes(sector)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {sector}
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            Selected: {profile.sector.length} sectors
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profile.sector.length > 0 ? (
                            profile.sector.map(sector => (
                              <span
                                key={sector}
                                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                              >
                                {sector}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500">No sectors selected</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* About Company */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        About Company <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <textarea
                          value={profile.about}
                          onChange={(e) => setProfile({...profile, about: e.target.value})}
                          rows={5}
                          className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe your company, services, history, achievements..."
                        />
                      ) : (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {profile.about || 'No description provided'}
                        </p>
                      )}
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mission
                        </label>
                        {isEditing ? (
                          <textarea
                            value={profile.mission}
                            onChange={(e) => setProfile({...profile, mission: e.target.value})}
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your company mission..."
                          />
                        ) : (
                          <p className="text-gray-700">{profile.mission || 'Not provided'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vision
                        </label>
                        {isEditing ? (
                          <textarea
                            value={profile.vision}
                            onChange={(e) => setProfile({...profile, vision: e.target.value})}
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your company vision..."
                          />
                        ) : (
                          <p className="text-gray-700">{profile.vision || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Globe size={20} className="text-blue-600" />
                      Social Media & Website
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={profile.socialMedia.website}
                            onChange={(e) => setProfile({
                              ...profile,
                              socialMedia: {...profile.socialMedia, website: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://www.example.com"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">
                            {profile.socialMedia.website ? (
                              <a href={profile.socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {profile.socialMedia.website}
                              </a>
                            ) : 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={profile.socialMedia.linkedin}
                            onChange={(e) => setProfile({
                              ...profile,
                              socialMedia: {...profile.socialMedia, linkedin: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://linkedin.com/company/..."
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.socialMedia.linkedin || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Twitter
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={profile.socialMedia.twitter}
                            onChange={(e) => setProfile({
                              ...profile,
                              socialMedia: {...profile.socialMedia, twitter: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://twitter.com/..."
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.socialMedia.twitter || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={profile.socialMedia.facebook}
                            onChange={(e) => setProfile({
                              ...profile,
                              socialMedia: {...profile.socialMedia, facebook: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://facebook.com/..."
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.socialMedia.facebook || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={profile.socialMedia.instagram}
                            onChange={(e) => setProfile({
                              ...profile,
                              socialMedia: {...profile.socialMedia, instagram: e.target.value}
                            })}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://instagram.com/..."
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.socialMedia.instagram || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCTS TAB */}
              {activeTab === 'products' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Package size={20} className="text-blue-600" />
                      Products & Services
                    </h2>
                    
                    <button
                      onClick={() => setShowAddProduct(!showAddProduct)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Product
                    </button>
                  </div>

                  {/* Add Product Form */}
                  {showAddProduct && (
                    <div className="mb-8 p-6 border-2 border-blue-200 rounded-xl bg-blue-50">
                      <h3 className="font-semibold text-gray-900 mb-4">Add New Product/Service</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Product Name *
                            </label>
                            <input
                              type="text"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Air Freight Services"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category
                            </label>
                            <input
                              type="text"
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Logistics"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                          </label>
                          <textarea
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe your product or service..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price (Optional)
                            </label>
                            <input
                              type="text"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Starting from $200"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Product Image
                            </label>
                            <div className="flex items-center gap-3">
                              <label className="flex-1 cursor-pointer">
                                <div className="border-2 border-dashed rounded-lg px-4 py-3 text-center hover:border-blue-500 transition-colors">
                                  <Upload size={20} className="mx-auto text-gray-400 mb-1" />
                                  <span className="text-xs text-gray-500">
                                    {newProduct.image ? (newProduct.image as File).name : 'Upload image'}
                                  </span>
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleProductImageUpload}
                                  className="hidden"
                                />
                              </label>
                              {newProduct.imageUrl && (
                                <div className="w-16 h-16 border rounded-lg overflow-hidden shrink-0">
                                  <img
                                    src={newProduct.imageUrl}
                                    alt="Preview"
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Specifications */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Specifications
                          </label>
                          <div className="space-y-3">
                            {/* Existing specs */}
                            {Object.entries(newProduct.specifications).map(([key, value]) => (
                              <div key={key} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700 min-w-30">{key}:</span>
                                <span className="text-sm text-gray-600">{value}</span>
                                <button
                                  onClick={() => handleRemoveSpecification(key)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                            
                            {/* Add new spec */}
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={newSpecKey}
                                onChange={(e) => setNewSpecKey(e.target.value)}
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Specification name (e.g., Coverage)"
                              />
                              <input
                                type="text"
                                value={newSpecValue}
                                onChange={(e) => setNewSpecValue(e.target.value)}
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Value (e.g., Global)"
                              />
                              <button
                                onClick={handleAddSpecification}
                                disabled={!newSpecKey || !newSpecValue}
                                className="px-3 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <button
                            onClick={() => setShowAddProduct(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddProduct}
                            disabled={!newProduct.name || !newProduct.description}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Add Product
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Products List */}
                  {profile.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.products.map((product) => (
                        <div key={product.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                {product.category && (
                                  <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                    {product.category}
                                  </span>
                                )}
                                {product.price && (
                                  <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                    {product.price}
                                  </span>
                                )}
                              </div>

                              {Object.keys(product.specifications).length > 0 && (
                                <div className="mt-3 pt-3 border-t">
                                  <p className="text-xs font-semibold text-gray-700 mb-1">Specifications:</p>
                                  <div className="space-y-1">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                      <div key={key} className="flex justify-between text-xs">
                                        <span className="text-gray-500">{key}:</span>
                                        <span className="text-gray-700">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                      <Package size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Added</h3>
                      <p className="text-gray-500 mb-4">Start adding your products and services to showcase them to visitors.</p>
                      <button
                        onClick={() => setShowAddProduct(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Your First Product
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* BRANDS TAB */}
              {activeTab === 'brands' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Tag size={20} className="text-blue-600" />
                      Brands
                    </h2>
                    
                    <button
                      onClick={() => setShowAddBrand(!showAddBrand)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Brand
                    </button>
                  </div>

                  {/* Add Brand Form */}
                  {showAddBrand && (
                    <div className="mb-8 p-6 border-2 border-blue-200 rounded-xl bg-blue-50">
                      <h3 className="font-semibold text-gray-900 mb-4">Add New Brand</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Brand Name *
                          </label>
                          <input
                            type="text"
                            value={newBrand.name}
                            onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., GLS Express"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={newBrand.description}
                            onChange={(e) => setNewBrand({...newBrand, description: e.target.value})}
                            rows={2}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe this brand..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Brand Logo
                          </label>
                          <div className="flex items-center gap-3">
                            <label className="flex-1 cursor-pointer">
                              <div className="border-2 border-dashed rounded-lg px-4 py-3 text-center hover:border-blue-500 transition-colors">
                                <Upload size={20} className="mx-auto text-gray-400 mb-1" />
                                <span className="text-xs text-gray-500">
                                  {newBrand.logo ? (newBrand.logo as File).name : 'Upload logo'}
                                </span>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleBrandLogoUpload}
                                className="hidden"
                              />
                            </label>
                            {newBrand.logoUrl && (
                              <div className="w-16 h-16 border rounded-lg overflow-hidden shrink-0">
                                <img
                                  src={newBrand.logoUrl}
                                  alt="Preview"
                                  width={64}
                                  height={64}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <button
                            onClick={() => setShowAddBrand(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddBrand}
                            disabled={!newBrand.name}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Add Brand
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Brands List */}
                  {profile.brands.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.brands.map((brand) => (
                        <div key={brand.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                {brand.logoUrl ? (
                                  <img
                                    src={brand.logoUrl}
                                    alt={brand.name}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                  />
                                ) : (
                                  <div className="text-2xl font-bold text-gray-400">
                                    {brand.name.substring(0, 2).toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                                {brand.description && (
                                  <p className="text-sm text-gray-600 mt-1">{brand.description}</p>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteBrand(brand.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                      <Tag size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Brands Added</h3>
                      <p className="text-gray-500 mb-4">Add your brands to increase visibility.</p>
                      <button
                        onClick={() => setShowAddBrand(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Your First Brand
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* BROCHURES TAB */}
              {activeTab === 'brochures' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FileText size={20} className="text-blue-600" />
                      Brochures & Documents
                    </h2>
                    
                    <button
                      onClick={() => setShowAddBrochure(!showAddBrochure)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} className="mr-2" />
                      Upload Brochure
                    </button>
                  </div>

                  {/* Add Brochure Form */}
                  {showAddBrochure && (
                    <div className="mb-8 p-6 border-2 border-blue-200 rounded-xl bg-blue-50">
                      <h3 className="font-semibold text-gray-900 mb-4">Upload New Brochure</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Brochure Name *
                          </label>
                          <input
                            type="text"
                            value={newBrochure.name}
                            onChange={(e) => setNewBrochure({...newBrochure, name: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Company Overview 2024"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={newBrochure.description}
                            onChange={(e) => setNewBrochure({...newBrochure, description: e.target.value})}
                            rows={2}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe this brochure..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            PDF File *
                          </label>
                          <label className="cursor-pointer block">
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                              <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-1">
                                {newBrochure.file ? newBrochure.file.name : 'Click to upload PDF'}
                              </p>
                              <p className="text-xs text-gray-500">
                                Maximum file size: 10MB
                              </p>
                            </div>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleBrochureUpload}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <button
                            onClick={() => setShowAddBrochure(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddBrochure}
                            disabled={!newBrochure.name || !newBrochure.file}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Upload Brochure
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Brochures List */}
                  {profile.brochures.length > 0 ? (
                    <div className="space-y-4">
                      {profile.brochures.map((brochure) => (
                        <div key={brochure.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-red-50 border rounded-lg flex items-center justify-center">
                              <FileText size={24} className="text-red-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{brochure.name}</h3>
                              <p className="text-sm text-gray-600">{brochure.description}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-500">{brochure.fileSize}</span>
                                <span className="text-xs text-gray-500">
                                  <Download size={12} className="inline mr-1" />
                                  {brochure.downloads} downloads
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(brochure.uploadedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={brochure.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0"
                              title="View"
                            >
                              <Eye size={18} />
                            </a>
                            <a
                              href={brochure.fileUrl}
                              download
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors shrink-0"
                              title="Download"
                            >
                              <Download size={18} />
                            </a>
                            <button
                              onClick={() => handleDeleteBrochure(brochure.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                      <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Brochures Uploaded</h3>
                      <p className="text-gray-500 mb-4">Upload brochures and documents for visitors to download.</p>
                      <button
                        onClick={() => setShowAddBrochure(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                      >
                        <Plus size={16} className="mr-2" />
                        Upload Your First Brochure
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}