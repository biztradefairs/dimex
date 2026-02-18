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
  Plus,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  Save,
  Award,
  Building,
  Home,
  Grid,
} from 'lucide-react';

// API Configuration
const API_BASE_URL = 'https://diemex-backend.onrender.com';

// Types
interface ExhibitorProfile {
  id: string;
  companyName: string;
  shortName: string;
  registrationNumber: string;
  yearEstablished: number | string;
  companySize: string;
  companyType: string;
  contactPerson: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    alternatePhone: string;
  };
  exhibition: {
    pavilion: string;
    hall: string;
    standNumber: string;
    floorPlan?: File | string;
    floorPlanUrl?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    postalCode: string;
  };
  sector: string[];
  about: string;
  mission: string;
  vision: string;
  socialMedia: {
    website: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  logo?: File | string;
  logoUrl?: string;
  products: Product[];
  brands: Brand[];
  brochures: Brochure[];
  boothNumber?: string;
  boothSize?: string;
  boothType?: string;
  boothDimensions?: string;
  boothNotes?: string;
  boothStatus?: string;
  boothPrice?: string;
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

// Metadata interface for additional fields stored in JSON
interface Metadata {
  [x: string]: any;
  // Company info
  shortName?: string;
  short_name?: string;
  registrationNumber?: string;
  registration_number?: string;
  yearEstablished?: string | number;
  year_established?: string | number;
  companySize?: string;
  company_size?: string;
  companyType?: string;
  company_type?: string;
  
  // Contact person
  contact_name?: string;
  contact_job_title?: string;
  alternate_phone?: string;
  contactPerson?: {
    name?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
    alternatePhone?: string;
  };
  
  // Email and phone (may be in metadata)
  email?: string;
  phone?: string;
  
  // Exhibition
  pavilion?: string;
  hall?: string;
  boothNumber?: string;
  exhibition?: {
    pavilion?: string;
    hall?: string;
    standNumber?: string;
    floorPlanUrl?: string;
  };
  
  // Address
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_country?: string;
  address_country_code?: string;
  address_postal_code?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    countryCode?: string;
    postalCode?: string;
  };
  
  // Business details
  about?: string;
  mission?: string;
  vision?: string;
  
  // Social media
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  socialMedia?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  
  // Booth info
  boothSize?: string;
  booth_size?: string;
  boothType?: string;
  booth_type?: string;
  boothDimensions?: string;
  booth_dimensions?: string;
  boothNotes?: string;
  booth_notes?: string;
  boothStatus?: string;
  booth_status?: string;
  boothPrice?: string;
  booth_price?: string;
  
  // Sector
  sector?: string | string[];
  
  // Floor plan
  floor_plan_url?: string;
}

interface StallDetails {
  size?: string;
  type?: string;
  dimensions?: string;
  notes?: string;
  price?: string;
  [key: string]: any; // Allow additional properties
}

// Options
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

const sectorOptions = [
  'Logistics', 'Supply Chain', 'Freight', 'Technology', 'Manufacturing',
  'Construction', 'Automotive', 'Healthcare', 'Pharmaceutical', 'Food & Beverage',
  'Textile', 'Energy', 'Mining', 'Agriculture', 'Defense', 'Aerospace',
  'Maritime', 'Retail', 'E-commerce', 'Education', 'Finance', 'Consulting',
  'Marketing', 'Real Estate',
];

const companySizeOptions = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
const companyTypeOptions = ['Private', 'Public', 'Non-Profit', 'Government', 'Partnership', 'Sole Proprietorship'];
const pavilionOptions = ['Pavilion 1', 'Pavilion 2', 'Pavilion 3', 'Pavilion 4', 'Pavilion 5', 'Pavilion 6', 'Pavilion 7', 'Pavilion 8'];
const hallOptions = ['Hall A', 'Hall B', 'Hall C', 'Hall D', 'Hall E', 'Hall F', 'Hall G', 'Hall H'];
const boothTypeOptions = ['Standard', 'Double', 'Corner', 'Island', 'Custom'];

export default function ExhibitorDashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'products' | 'brands' | 'brochures' | 'booth'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddBrochure, setShowAddBrochure] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<any[]>([]);
  
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
    boothNumber: '',
    boothSize: '',
    boothType: '',
    boothDimensions: '',
    boothNotes: '',
    boothStatus: 'pending',
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

  // New spec key/value for product
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Load all exhibitor data
  useEffect(() => {
    fetchAllData();
  }, []);

  const apiCall = async (endpoint: string, options: RequestInit = {}, isFormData = false) => {
    const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
    
    const headers: HeadersInit = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
        credentials: 'include',
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error('API Error Response:', responseData);
        throw new Error(responseData.error || responseData.message || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('API Call Error:', error);
      throw error;
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setShowError(null);
    
    try {
      await fetchExhibitorProfile();
      await Promise.all([
        fetchProducts(),
        fetchBrands(),
        fetchBrochures(),
        fetchBoothData(),
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
    
    console.log('📥 Raw API response:', result);
    
    if (result.success) {
      const apiData = result.data;
      
      // Extract metadata if it exists (this is where your additional fields are stored)
      let metadata: Metadata = {};
      if (apiData.metadata) {
        if (typeof apiData.metadata === 'string') {
          try {
            metadata = JSON.parse(apiData.metadata) as Metadata;
          } catch (e) {
            console.error('Error parsing metadata:', e);
          }
        } else if (typeof apiData.metadata === 'object') {
          metadata = apiData.metadata as Metadata;
        }
      }
      
      console.log('📦 Extracted metadata:', metadata);
      
      // Parse stallDetails for booth information
      let stallDetails: StallDetails = {};
      if (apiData.stallDetails) {
        if (typeof apiData.stallDetails === 'string') {
          try {
            stallDetails = JSON.parse(apiData.stallDetails) as StallDetails;
          } catch (e) {
            console.error('Error parsing stallDetails:', e);
          }
        } else if (typeof apiData.stallDetails === 'object') {
          stallDetails = apiData.stallDetails as StallDetails;
        }
      }
      
      // Build contact person object
      const contactPersonObj = {
        name: apiData.contactPerson?.name || metadata.contact_name || apiData.name || '',
        jobTitle: apiData.contactPerson?.jobTitle || metadata.contact_job_title || '',
        email: apiData.email || metadata.email || '',
        phone: apiData.phone || metadata.phone || '',
        alternatePhone: apiData.contactPerson?.alternatePhone || metadata.alternate_phone || ''
      };
      
      // Build social media object
      const socialMediaObj = {
        website: apiData.website || metadata.website || '',
        linkedin: apiData.socialMedia?.linkedin || metadata.linkedin || '',
        twitter: apiData.socialMedia?.twitter || metadata.twitter || '',
        facebook: apiData.socialMedia?.facebook || metadata.facebook || '',
        instagram: apiData.socialMedia?.instagram || metadata.instagram || ''
      };
      
      // Build exhibition object
      const exhibitionObj = {
        pavilion: apiData.exhibition?.pavilion || metadata.pavilion || '',
        hall: apiData.exhibition?.hall || metadata.hall || '',
        standNumber: apiData.boothNumber || metadata.boothNumber || apiData.exhibition?.standNumber || '',
        floorPlanUrl: apiData.exhibition?.floorPlanUrl || metadata.floor_plan_url || ''
      };
      
      // Build address object - FIXED SECTION
      let addressObj = {
        street: '',
        city: '',
        state: '',
        country: '',
        countryCode: '',
        postalCode: ''
      };

      // Check if apiData.address is an object (new structure)
      if (apiData.address && typeof apiData.address === 'object') {
        addressObj = {
          street: apiData.address.street || metadata.address_street || '',
          city: apiData.address.city || metadata.address_city || '',
          state: apiData.address.state || metadata.address_state || '',
          country: apiData.address.country || metadata.address_country || '',
          countryCode: apiData.address.countryCode || metadata.address_country_code || '',
          postalCode: apiData.address.postalCode || metadata.address_postal_code || ''
        };
      } 
      // Fallback to metadata fields if available
      else {
        addressObj = {
          street: metadata.address_street || metadata.address?.street || '',
          city: metadata.address_city || metadata.address?.city || '',
          state: metadata.address_state || metadata.address?.state || '',
          country: metadata.address_country || metadata.address?.country || '',
          countryCode: metadata.address_country_code || metadata.address?.countryCode || '',
          postalCode: metadata.address_postal_code || metadata.address?.postalCode || ''
        };
      }
      
      // Parse sector
      let sectorArray: string[] = [];
      if (apiData.sector) {
        if (typeof apiData.sector === 'string') {
          sectorArray = apiData.sector.split(',').map((s: string) => s.trim()).filter(Boolean);
        } else if (Array.isArray(apiData.sector)) {
          sectorArray = apiData.sector;
        }
      } else if (metadata.sector) {
        if (typeof metadata.sector === 'string') {
          sectorArray = metadata.sector.split(',').map((s: string) => s.trim()).filter(Boolean);
        } else if (Array.isArray(metadata.sector)) {
          sectorArray = metadata.sector;
        }
      }
      
      setProfile(prev => ({
        ...prev,
        id: apiData.id || '',
        // Basic fields from main table
        companyName: apiData.company || metadata.companyName || '',
        shortName: apiData.shortName || metadata.shortName || metadata.short_name || '',
        registrationNumber: apiData.registrationNumber || metadata.registrationNumber || metadata.registration_number || '',
        yearEstablished: apiData.yearEstablished || metadata.yearEstablished || metadata.year_established || '',
        companySize: apiData.companySize || metadata.companySize || metadata.company_size || '',
        companyType: apiData.companyType || metadata.companyType || metadata.company_type || '',
        
        // Contact person
        contactPerson: contactPersonObj,
        
        // Exhibition
        exhibition: exhibitionObj,
        
        // Address
        address: addressObj,
        
        // Sector
        sector: sectorArray,
        
        // Business details
        about: apiData.about || metadata.about || apiData.description || '',
        mission: apiData.mission || metadata.mission || '',
        vision: apiData.vision || metadata.vision || '',
        
        // Social media
        socialMedia: socialMediaObj,
        
        // Status
        status: apiData.status || 'active',
        
        // Timestamps
        createdAt: apiData.createdAt || '',
        updatedAt: apiData.updatedAt || '',
        
        // Booth fields
        boothNumber: apiData.boothNumber || metadata.boothNumber || exhibitionObj.standNumber || prev.boothNumber,
        boothSize: stallDetails.size || apiData.boothSize || metadata.boothSize || metadata.booth_size || prev.boothSize,
        boothType: stallDetails.type || apiData.boothType || metadata.boothType || metadata.booth_type || prev.boothType,
        boothDimensions: stallDetails.dimensions || apiData.boothDimensions || metadata.boothDimensions || metadata.booth_dimensions || prev.boothDimensions,
        boothNotes: stallDetails.notes || apiData.boothNotes || metadata.boothNotes || metadata.booth_notes || prev.boothNotes,
        boothStatus: apiData.boothStatus || metadata.boothStatus || metadata.booth_status || stallDetails.status || prev.boothStatus || 'pending',
        boothPrice: stallDetails.price || apiData.boothPrice || metadata.boothPrice || metadata.booth_price || prev.boothPrice,
      }));
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

  const fetchBoothData = async () => {
    try {
      // Try to fetch booth data from a separate endpoint
      const result = await apiCall('/api/exhibitorDashboard/booth', {
        method: 'GET',
      }).catch(() => null);
      
      if (result && result.success) {
        const boothData = result.data;
        console.log('Booth data from separate endpoint:', boothData);
        
        // Check if price is in stallDetails
        let boothPrice = '';
        if (boothData.stallDetails) {
          const stallDetails = typeof boothData.stallDetails === 'string'
            ? JSON.parse(boothData.stallDetails)
            : boothData.stallDetails;
          boothPrice = stallDetails.price || stallDetails.boothPrice || '';
        }
        
        setProfile(prev => ({
          ...prev,
          boothNumber: boothData.boothNumber || boothData.number || prev.boothNumber,
          boothSize: boothData.boothSize || boothData.size || prev.boothSize,
          boothType: boothData.boothType || boothData.type || prev.boothType,
          boothDimensions: boothData.boothDimensions || boothData.dimensions || prev.boothDimensions,
          boothNotes: boothData.boothNotes || boothData.notes || prev.boothNotes,
          boothStatus: boothData.boothStatus || boothData.status || prev.boothStatus,
          boothPrice: boothPrice || boothData.boothPrice || boothData.price || boothData.amount || prev.boothPrice,
        }));
      }
    } catch (error) {
      console.log('No separate booth endpoint found');
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

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description) return;
    
    setSaving(true);
    try {
      const product: Product = {
        ...newProduct,
        id: `prod-${Date.now()}`,
        specifications: newProduct.specifications || {},
      };
      
      const result = await apiCall('/api/exhibitorDashboard/products', {
        method: 'POST',
        body: JSON.stringify(product),
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
      const brand: Brand = {
        ...newBrand,
        id: `brand-${Date.now()}`,
      };
      
      const result = await apiCall('/api/exhibitorDashboard/brands', {
        method: 'POST',
        body: JSON.stringify(brand),
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
      const brochure: Brochure = {
        ...newBrochure,
        id: `broch-${Date.now()}`,
        fileSize: `${(newBrochure.file.size / (1024 * 1024)).toFixed(1)} MB`,
        downloads: 0,
        uploadedAt: new Date(),
      };
      
      const result = await apiCall('/api/exhibitorDashboard/brochures', {
        method: 'POST',
        body: JSON.stringify({
          name: brochure.name,
          description: brochure.description,
          fileSize: brochure.fileSize,
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

  const handleDeleteProduct = async (productId: string) => {
    try {
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

  const handleDeleteBrand = async (brandId: string) => {
    try {
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

  const handleDeleteBrochure = async (brochureId: string) => {
    try {
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

const handleSaveProfile = async () => {
  setSaving(true);
  setShowError(null);

  try {
    // Create metadata object for all additional fields
    const metadata: Metadata = {
      // Company info
      shortName: profile.shortName,
      registrationNumber: profile.registrationNumber,
      yearEstablished: profile.yearEstablished,
      companySize: profile.companySize,
      companyType: profile.companyType,
      
      // Contact person details
      contact_name: profile.contactPerson.name,
      contact_job_title: profile.contactPerson.jobTitle,
      alternate_phone: profile.contactPerson.alternatePhone,
      contactPerson: profile.contactPerson,
      
      // Exhibition location
      pavilion: profile.exhibition.pavilion,
      hall: profile.exhibition.hall,
      exhibition: {
        pavilion: profile.exhibition.pavilion,
        hall: profile.exhibition.hall,
        standNumber: profile.exhibition.standNumber || profile.boothNumber,
        floorPlanUrl: profile.exhibition.floorPlanUrl || ''
      },
      
      // Address fields
      address_street: profile.address.street,
      address_city: profile.address.city,
      address_state: profile.address.state,
      address_country: profile.address.country,
      address_country_code: profile.address.countryCode,
      address_postal_code: profile.address.postalCode,
      address: {
        street: profile.address.street,
        city: profile.address.city,
        state: profile.address.state,
        country: profile.address.country,
        countryCode: profile.address.countryCode,
        postalCode: profile.address.postalCode
      },
      
      // Business details
      about: profile.about,
      mission: profile.mission,
      vision: profile.vision,
      
      // Social media
      website: profile.socialMedia.website,
      linkedin: profile.socialMedia.linkedin,
      twitter: profile.socialMedia.twitter,
      facebook: profile.socialMedia.facebook,
      instagram: profile.socialMedia.instagram,
      socialMedia: profile.socialMedia,
      
      // Booth info
      boothSize: profile.boothSize,
      boothType: profile.boothType,
      boothDimensions: profile.boothDimensions,
      boothNotes: profile.boothNotes,
      boothStatus: profile.boothStatus,
      boothPrice: profile.boothPrice
    };

    // Create stallDetails object with ALL booth information including price
    const stallDetails: StallDetails = {
      size: profile.boothSize || '',
      type: profile.boothType || '',
      dimensions: profile.boothDimensions || '',
      notes: profile.boothNotes || '',
      price: profile.boothPrice || '' // MAKE SURE PRICE IS INCLUDED HERE
    };

    // Create the payload with all fields
    const payload = {
      name: profile.contactPerson.name || profile.companyName,
      email: profile.contactPerson.email,
      company: profile.companyName,
      phone: profile.contactPerson.phone,
      website: profile.socialMedia.website,
      sector: profile.sector.join(', '),
      boothNumber: profile.exhibition.standNumber || profile.boothNumber,
      address: [
        profile.address.street,
        profile.address.city,
        profile.address.state,
        profile.address.country,
        profile.address.postalCode
      ].filter(Boolean).join(', '),
      
      // Store additional fields in metadata JSON
      metadata: metadata,
      
      // Store booth details in stallDetails JSON
      stallDetails: stallDetails,
      
      status: profile.status
    };

    console.log('📤 Sending payload:', payload);

    const result = await apiCall(
      "/api/exhibitorDashboard/profile",
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );

    if (result.success) {
      setShowSuccess(true);
      setIsEditing(false);
      
      // IMPORTANT: Wait a moment then refresh the profile data
      setTimeout(async () => {
        await fetchExhibitorProfile();
        await fetchBoothData(); // Also fetch booth data separately
        setShowSuccess(false);
      }, 1500);
    } else {
      throw new Error(result.message || 'Failed to save profile');
    }
  } catch (error: any) {
    console.error("❌ Error saving profile:", error);
    setShowError(error.message || "Failed to save profile. Please check your connection and try again.");
  } finally {
    setSaving(false);
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

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
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
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} className="mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </>
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
                        className="object-contain w-full h-full"
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
                    { id: 'booth', label: 'Booth Details', icon: Home, count: profile.boothNumber ? 1 : 0 },
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
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="divide-y">
                  {/* Company Information */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Building2 size={20} className="text-blue-600" />
                        Company Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year Established
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            value={profile.yearEstablished}
                            onChange={(e) => setProfile({...profile, yearEstablished: parseInt(e.target.value) || ''})}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="YYYY"
                            min="1900"
                            max={new Date().getFullYear()}
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.yearEstablished || 'Not provided'}</p>
                        )}
                      </div>

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
                          Pavilion
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
                          Hall
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
                          Stand Number
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.exhibition.standNumber || profile.boothNumber || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              setProfile({
                                ...profile,
                                exhibition: {...profile.exhibition, standNumber: value},
                                boothNumber: value
                              });
                            }}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., A-42"
                          />
                        ) : (
                          <p className="text-gray-900 py-2.5">{profile.exhibition.standNumber || profile.boothNumber || 'Not provided'}</p>
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

              {/* Products Tab */}
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

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price (Optional)
                          </label>
                          <input
                            type="text"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., ₹5000 per unit"
                          />
                        </div>

                        {/* Specifications */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Specifications
                          </label>
                          <div className="space-y-3">
                            {/* Existing specs */}
                            {Object.entries(newProduct.specifications || {}).map(([key, value]) => (
                              <div key={key} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700 min-w-30">{key}:</span>
                                <span className="text-sm text-gray-600">{value || ''}</span>
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
                                placeholder="Specification name"
                              />
                              <input
                                type="text"
                                value={newSpecValue}
                                onChange={(e) => setNewSpecValue(e.target.value)}
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Value"
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
                  {profile.products && profile.products.length > 0 ? (
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

                              {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <div className="mt-3 pt-3 border-t">
                                  <p className="text-xs font-semibold text-gray-700 mb-1">Specifications:</p>
                                  <div className="space-y-1">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                      <div key={key} className="flex justify-between text-xs">
                                        <span className="text-gray-500">{key}:</span>
                                        <span className="text-gray-700">{value || ''}</span>
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
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Your First Product
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Brands Tab */}
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
                            placeholder="e.g., Apple, Samsung, etc."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={newBrand.description}
                            onChange={(e) => setNewBrand({...newBrand, description: e.target.value})}
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe the brand..."
                          />
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
                  {profile.brands && profile.brands.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.brands.map((brand) => (
                        <div key={brand.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                                  <p className="text-sm text-gray-600">{brand.description}</p>
                                </div>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleDeleteBrand(brand.id)}
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
                      <Tag size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Brands Added</h3>
                      <p className="text-gray-500 mb-4">Add the brands you represent or distribute.</p>
                      <button
                        onClick={() => setShowAddBrand(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Your First Brand
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Brochures Tab */}
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
                            Document Name *
                          </label>
                          <input
                            type="text"
                            value={newBrochure.name}
                            onChange={(e) => setNewBrochure({...newBrochure, name: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Company Brochure 2024"
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
                            placeholder="Brief description of the document..."
                          />
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
                            disabled={!newBrochure.name}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Upload Brochure
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Brochures List */}
                  {profile.brochures && profile.brochures.length > 0 ? (
                    <div className="space-y-4">
                      {profile.brochures.map((brochure) => (
                        <div key={brochure.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <FileText size={24} className="text-blue-600 shrink-0 mt-1" />
                                <div>
                                  <h3 className="font-semibold text-gray-900">{brochure.name}</h3>
                                  <p className="text-sm text-gray-600 mt-1">{brochure.description}</p>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <span>{brochure.fileSize}</span>
                                    <span>•</span>
                                    <span>{brochure.downloads} downloads</span>
                                    <span>•</span>
                                    <span>Uploaded {brochure.uploadedAt ? formatDate(brochure.uploadedAt.toString()) : 'Recently'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteBrochure(brochure.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                      <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Brochures Uploaded</h3>
                      <p className="text-gray-500 mb-4">Upload brochures, catalogs, and documents for visitors to download.</p>
                      <button
                        onClick={() => setShowAddBrochure(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={16} className="mr-2" />
                        Upload Your First Brochure
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Booth Tab */}
              {activeTab === 'booth' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Home size={20} className="text-blue-600" />
                      Booth Details
                    </h2>
                  </div>

                  {/* Booth Information Card */}
                  <div className="bg-white border rounded-xl overflow-hidden">
                    {/* Header with stand number */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Assigned Stand</p>
                          <p className="text-white text-2xl font-bold">
                            {profile.exhibition?.standNumber || profile.boothNumber || 'Not assigned'}
                          </p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2 text-white text-sm font-medium">
                          {profile.boothStatus || 'Pending'}
                        </div>
                      </div>
                    </div>

                    {/* Booth Specifications */}
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Booth Type */}
                        <div className="border-b pb-3">
                          <label className="block text-xs text-gray-500 mb-1">Booth Type</label>
                          {isEditing ? (
                            <select
                              value={profile.boothType || ''}
                              onChange={(e) => setProfile({...profile, boothType: e.target.value})}
                              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select Type</option>
                              {boothTypeOptions.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          ) : (
                            <p className="text-gray-900 font-medium">
                              {profile.boothType || 'Not specified'}
                            </p>
                          )}
                        </div>

                        {/* Booth Size */}
                        <div className="border-b pb-3">
                          <label className="block text-xs text-gray-500 mb-1">Booth Size</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profile.boothSize || ''}
                              onChange={(e) => setProfile({...profile, boothSize: e.target.value})}
                              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., 3m x 3m"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">
                              {profile.boothSize || 'Not specified'}
                            </p>
                          )}
                        </div>

                        {/* Dimensions */}
                        <div className="border-b pb-3">
                          <label className="block text-xs text-gray-500 mb-1">Dimensions</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profile.boothDimensions || ''}
                              onChange={(e) => setProfile({...profile, boothDimensions: e.target.value})}
                              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., 3m width x 3m depth"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">
                              {profile.boothDimensions || 'Not specified'}
                            </p>
                          )}
                        </div>

                        {/* Pavilion */}
                        <div className="border-b pb-3">
                          <label className="block text-xs text-gray-500 mb-1">Pavilion</label>
                          {isEditing ? (
                            <select
                              value={profile.exhibition.pavilion || ''}
                              onChange={(e) => setProfile({
                                ...profile,
                                exhibition: {...profile.exhibition, pavilion: e.target.value}
                              })}
                              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select Pavilion</option>
                              {pavilionOptions.map(pavilion => (
                                <option key={pavilion} value={pavilion}>{pavilion}</option>
                              ))}
                            </select>
                          ) : (
                            <p className="text-gray-900 font-medium">
                              {profile.exhibition.pavilion || 'Not specified'}
                            </p>
                          )}
                        </div>

                        {/* Hall */}
                        <div className="border-b pb-3">
                          <label className="block text-xs text-gray-500 mb-1">Hall</label>
                          {isEditing ? (
                            <select
                              value={profile.exhibition.hall || ''}
                              onChange={(e) => setProfile({
                                ...profile,
                                exhibition: {...profile.exhibition, hall: e.target.value}
                              })}
                              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select Hall</option>
                              {hallOptions.map(hall => (
                                <option key={hall} value={hall}>{hall}</option>
                              ))}
                            </select>
                          ) : (
                            <p className="text-gray-900 font-medium">
                              {profile.exhibition.hall || 'Not specified'}
                            </p>
                          )}
                        </div>

                        {/* Stand Number (duplicate but keeping for consistency) */}
                        <div className="border-b pb-3">
                          <label className="block text-xs text-gray-500 mb-1">Stand Number</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profile.exhibition.standNumber || profile.boothNumber || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                setProfile({
                                  ...profile,
                                  exhibition: {...profile.exhibition, standNumber: value},
                                  boothNumber: value
                                });
                              }}
                              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., A-1111"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">
                              {profile.exhibition.standNumber || profile.boothNumber || 'Not assigned'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Price Section - in Rupees */}
                      <div className="mt-6 pt-4 border-t-2 border-dashed">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Booth Price (₹)
                            </label>
                            <p className="text-xs text-gray-500">
                              Set the price for your booth in Indian Rupees
                            </p>
                          </div>
                          {isEditing ? (
                            <div className="w-48">
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                <input
                                  type="number"
                                  value={profile.boothPrice || ''}
                                  onChange={(e) => setProfile({...profile, boothPrice: e.target.value})}
                                  className="w-full border rounded-lg pl-8 pr-4 py-2 text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="0"
                                  min="0"
                                  step="1"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="text-right">
                              {profile.boothPrice ? (
                                <p className="text-2xl font-bold text-gray-900">
                                  ₹{parseInt(profile.boothPrice).toLocaleString('en-IN')}
                                </p>
                              ) : (
                                <p className="text-gray-400 italic">Not set</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Booth Notes */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes
                        </label>
                        {isEditing ? (
                          <textarea
                            value={profile.boothNotes || ''}
                            onChange={(e) => setProfile({...profile, boothNotes: e.target.value})}
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Any special requirements or notes about your booth..."
                          />
                        ) : (
                          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                            {profile.boothNotes || 'No additional notes'}
                          </p>
                        )}
                      </div>
                    </div>
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