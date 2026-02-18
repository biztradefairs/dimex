"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Save,
  X,
  ArrowLeft,
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
  Trash2,
  Upload,
  Award,
  Home,
  Grid,
  AlertCircle,
  CheckCircle,
  Ruler,
  Key,
  Map,
  Navigation,
  Image as ImageIcon,
  File,
  Download,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

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
    floorPlanUrl?: string;
    location?: ExhibitionLocation;
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
  logo?: string;
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

interface ExhibitionLocation {
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  venue?: string;
  hall?: string;
  fullAddress?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image?: string;
  images?: string[];
  specifications: Record<string, string>;
}

interface Brand {
  id: string;
  name: string;
  description: string;
  logo?: string;
  logoUrl?: string;
  bannerImage?: string;
  website?: string;
}

interface Brochure {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  fileType?: string;
  fileSize: string;
  downloads: number;
  uploadedAt: Date;
  thumbnailUrl?: string;
  pages?: number;
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
];

const companySizeOptions = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
const companyTypeOptions = ['Private', 'Public', 'Non-Profit', 'Government', 'Partnership'];
const pavilionOptions = ['Pavilion 1', 'Pavilion 2', 'Pavilion 3', 'Pavilion 4', 'Pavilion 5'];
const hallOptions = ['Hall A', 'Hall B', 'Hall C', 'Hall D', 'Hall E'];
const boothTypeOptions = ['Standard', 'Double', 'Corner', 'Island', 'Custom'];
const entranceOptions = ['Main Entrance', 'North Entrance', 'South Entrance', 'East Entrance', 'West Entrance', 'VIP Entrance'];
const sectionOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function ManageExhibitorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'products' | 'brands' | 'brochures' | 'booth' | 'location'>('profile');
  
  // File upload refs
  const brandLogoInputRef = useRef<HTMLInputElement>(null);
  const brandBannerInputRef = useRef<HTMLInputElement>(null);
  const brochureFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  
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
  location: {
    city: '',
    state: '',
    zipCode: '',
    country: '',
    venue: '',
    fullAddress: '',
  }
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

  // New item states
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddBrochure, setShowAddBrochure] = useState(false);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: '',
    price: '',
    specifications: {},
    images: [],
  });

  const [newBrand, setNewBrand] = useState<Partial<Brand>>({
    name: '',
    description: '',
    website: '',
  });

  const [newBrochure, setNewBrochure] = useState<Partial<Brochure>>({
    name: '',
    description: '',
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Nearby booths state
  const [nearbyBoothInput, setNearbyBoothInput] = useState('');

  // Fetch all exhibitor data
  useEffect(() => {
    fetchAllData();
  }, [id]);

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
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
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Call Error:', error);
      throw error;
    }
  };

  // File upload function
  const uploadFile = async (file: File, type: 'image' | 'pdf'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      
      return data.fileUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await fetchExhibitorProfile();
      await Promise.all([
        fetchProducts(),
        fetchBrands(),
        fetchBrochures(),
      ]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load exhibitor data');
    } finally {
      setLoading(false);
    }
  };

  const fetchExhibitorProfile = async () => {
    try {
      const result = await apiCall(`/api/admin/exhibitors/${id}/profile`);
      
      if (result.success) {
        const data = result.data;
        // Ensure exhibition.location exists
        if (!data.exhibition.location) {
          data.exhibition.location = {
            entrance: '',
            aisle: '',
            section: '',
            nearbyBooths: [],
            coordinates: '',
          };
        }
        setProfile(prev => ({
          ...prev,
          ...data,
          id: data.id || id,
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const result = await apiCall(`/api/admin/exhibitors/${id}/products`);
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          products: result.data || []
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const result = await apiCall(`/api/admin/exhibitors/${id}/brands`);
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          brands: result.data || []
        }));
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchBrochures = async () => {
    try {
      const result = await apiCall(`/api/admin/exhibitors/${id}/brochures`);
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          brochures: result.data || []
        }));
      }
    } catch (error) {
      console.error('Error fetching brochures:', error);
    }
  };

  // Profile handlers
  const handleProfileChange = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleContactPersonChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      contactPerson: { ...prev.contactPerson, [field]: value }
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
  };

  const handleExhibitionChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      exhibition: { ...prev.exhibition, [field]: value }
    }));
  };

  const handleLocationChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      exhibition: {
        ...prev.exhibition,
        location: {
          ...prev.exhibition.location,
          [field]: value,
        }
      }
    }));
  };

  const handleSocialMediaChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [field]: value }
    }));
  };

  const handleSectorToggle = (sector: string) => {
    if (profile.sector.includes(sector)) {
      setProfile(prev => ({
        ...prev,
        sector: prev.sector.filter(s => s !== sector)
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        sector: [...prev.sector, sector]
      }));
    }
  };

  // Brand image upload handlers
  const handleBrandLogoUpload = async (brandId: string, file: File) => {
    try {
      setUploading(true);
      const logoUrl = await uploadFile(file, 'image');
      
      setProfile(prev => ({
        ...prev,
        brands: prev.brands.map(brand => 
          brand.id === brandId 
            ? { ...brand, logo: logoUrl, logoUrl: logoUrl }
            : brand
        )
      }));

      await apiCall(`/api/admin/exhibitors/${id}/brands/${brandId}/logo`, {
        method: 'PUT',
        body: JSON.stringify({ logo: logoUrl }),
      });

      toast.success('Brand logo uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleBrandBannerUpload = async (brandId: string, file: File) => {
    try {
      setUploading(true);
      const bannerUrl = await uploadFile(file, 'image');
      
      setProfile(prev => ({
        ...prev,
        brands: prev.brands.map(brand => 
          brand.id === brandId 
            ? { ...brand, bannerImage: bannerUrl }
            : brand
        )
      }));

      await apiCall(`/api/admin/exhibitors/${id}/brands/${brandId}/banner`, {
        method: 'PUT',
        body: JSON.stringify({ bannerImage: bannerUrl }),
      });

      toast.success('Brand banner uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload banner');
    } finally {
      setUploading(false);
    }
  };

  // Brochure PDF upload handler
  const handleBrochureUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    try {
      setUploading(true);
      const fileUrl = await uploadFile(file, 'pdf');
      
      const brochure = {
        ...newBrochure,
        id: `broch-${Date.now()}`,
        fileUrl,
        fileType: 'application/pdf',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        downloads: 0,
        uploadedAt: new Date(),
      };

      const result = await apiCall(`/api/admin/exhibitors/${id}/brochures`, {
        method: 'POST',
        body: JSON.stringify(brochure),
      });

      if (result.success) {
        setProfile(prev => ({
          ...prev,
          brochures: [...prev.brochures, result.data],
        }));

        setNewBrochure({
          name: '',
          description: '',
        });
        setShowAddBrochure(false);
        toast.success('Brochure uploaded successfully');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload brochure');
    } finally {
      setUploading(false);
    }
  };

  // Product handlers
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description) return;
    
    setSaving(true);
    try {
      const product = {
        ...newProduct,
        id: `prod-${Date.now()}`,
      };
      
      const result = await apiCall(`/api/admin/exhibitors/${id}/products`, {
        method: 'POST',
        body: JSON.stringify(product),
      });
      
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          products: [...prev.products, result.data],
        }));
        
        setNewProduct({
          name: '',
          description: '',
          category: '',
          price: '',
          specifications: {},
          images: [],
        });
        setShowAddProduct(false);
        toast.success('Product added successfully');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add product');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await apiCall(`/api/admin/exhibitors/${id}/products/${productId}`, {
        method: 'DELETE',
      });
      
      setProfile(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== productId),
      }));
      
      toast.success('Product deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  // Brand handlers
  const handleAddBrand = async () => {
    if (!newBrand.name) return;
    
    setSaving(true);
    try {
      const brand = {
        ...newBrand,
        id: `brand-${Date.now()}`,
      };
      
      const result = await apiCall(`/api/admin/exhibitors/${id}/brands`, {
        method: 'POST',
        body: JSON.stringify(brand),
      });
      
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          brands: [...prev.brands, result.data],
        }));
        
        setNewBrand({
          name: '',
          description: '',
          website: '',
        });
        setShowAddBrand(false);
        toast.success('Brand added successfully');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add brand');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    
    try {
      await apiCall(`/api/admin/exhibitors/${id}/brands/${brandId}`, {
        method: 'DELETE',
      });
      
      setProfile(prev => ({
        ...prev,
        brands: prev.brands.filter(b => b.id !== brandId),
      }));
      
      toast.success('Brand deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete brand');
    }
  };

  // Brochure handlers
  const handleDeleteBrochure = async (brochureId: string) => {
    if (!confirm('Are you sure you want to delete this brochure?')) return;
    
    try {
      await apiCall(`/api/admin/exhibitors/${id}/brochures/${brochureId}`, {
        method: 'DELETE',
      });
      
      setProfile(prev => ({
        ...prev,
        brochures: prev.brochures.filter(b => b.id !== brochureId),
      }));
      
      toast.success('Brochure deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete brochure');
    }
  };

  // Specification handlers
  const handleAddSpecification = () => {
    if (!newSpecKey || !newSpecValue) return;
    
    setNewProduct(prev => ({
      ...prev,
      specifications: {
        ...(prev.specifications || {}),
        [newSpecKey]: newSpecValue,
      },
    }));
    
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const handleRemoveSpecification = (key: string) => {
    const specs = { ...newProduct.specifications };
    delete specs[key];
    setNewProduct(prev => ({
      ...prev,
      specifications: specs,
    }));
  };

  // Save all changes
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const profileData = {
        companyName: profile.companyName,
        shortName: profile.shortName,
        registrationNumber: profile.registrationNumber,
        yearEstablished: profile.yearEstablished,
        companySize: profile.companySize,
        companyType: profile.companyType,
        contactPerson: profile.contactPerson,
        address: profile.address,
        exhibition: {
          ...profile.exhibition,
          location: profile.exhibition.location,
        },
        sector: profile.sector,
        about: profile.about,
        mission: profile.mission,
        vision: profile.vision,
        socialMedia: profile.socialMedia,
        boothNumber: profile.boothNumber,
        boothSize: profile.boothSize,
        boothType: profile.boothType,
        boothDimensions: profile.boothDimensions,
        boothNotes: profile.boothNotes,
        boothStatus: profile.boothStatus,
        boothPrice: profile.boothPrice,
        status: profile.status,
      };

      await apiCall(`/api/admin/exhibitors/${id}/profile`, {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });

      toast.success('All changes saved successfully');
      
      setTimeout(() => {
        router.push(`/admin/exhibition/exhibitors/${id}`);
      }, 1500);
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exhibitor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push(`/admin/exhibition/exhibitors/${id}`)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manage Exhibitor: {profile.companyName}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Full control over exhibitor profile and content
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(`/admin/exhibition/exhibitors/${id}`)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save All Changes"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-t pt-4 overflow-x-auto">
            {[
              { id: 'profile', label: 'Company Profile', icon: Building2 },
              { id: 'products', label: 'Products', icon: Package, count: profile.products.length },
              { id: 'brands', label: 'Brands', icon: Tag, count: profile.brands.length },
              { id: 'brochures', label: 'Brochures', icon: FileText, count: profile.brochures.length },
              { id: 'booth', label: 'Booth Details', icon: Home },
              { id: 'location', label: 'Exhibition Location', icon: Map },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      isActive ? 'bg-blue-500' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="p-6 space-y-8">
              {/* Company Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Building2 size={20} className="text-blue-600" />
                  Company Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profile.companyName}
                      onChange={(e) => handleProfileChange('companyName', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Name/Acronym
                    </label>
                    <input
                      type="text"
                      value={profile.shortName}
                      onChange={(e) => handleProfileChange('shortName', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      value={profile.registrationNumber}
                      onChange={(e) => handleProfileChange('registrationNumber', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Established
                    </label>
                    <input
                      type="number"
                      value={profile.yearEstablished}
                      onChange={(e) => handleProfileChange('yearEstablished', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      value={profile.companySize}
                      onChange={(e) => handleProfileChange('companySize', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select size</option>
                      {companySizeOptions.map(size => (
                        <option key={size} value={size}>{size} employees</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Type
                    </label>
                    <select
                      value={profile.companyType}
                      onChange={(e) => handleProfileChange('companyType', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      {companyTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Users size={20} className="text-blue-600" />
                  Contact Person
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profile.contactPerson.name}
                      onChange={(e) => handleContactPersonChange('name', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={profile.contactPerson.jobTitle}
                      onChange={(e) => handleContactPersonChange('jobTitle', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={profile.contactPerson.email}
                      onChange={(e) => handleContactPersonChange('email', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={profile.contactPerson.phone}
                      onChange={(e) => handleContactPersonChange('phone', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.contactPerson.alternatePhone}
                      onChange={(e) => handleContactPersonChange('alternatePhone', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" />
                  Company Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={profile.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={profile.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={profile.address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      value={profile.address.countryCode}
                      onChange={(e) => {
                        const country = countries.find(c => c.code === e.target.value);
                        handleAddressChange('countryCode', e.target.value);
                        handleAddressChange('country', country?.name || '');
                      }}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={profile.address.postalCode}
                      onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Award size={20} className="text-blue-600" />
                  Business Details
                </h2>

                {/* Sectors */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Business Sectors
                  </label>
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
                </div>

                {/* About */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Company
                  </label>
                  <textarea
                    value={profile.about}
                    onChange={(e) => handleProfileChange('about', e.target.value)}
                    rows={5}
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the company, services, history, achievements..."
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Globe size={20} className="text-blue-600" />
                  Social Media & Website
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profile.socialMedia.website}
                      onChange={(e) => handleSocialMediaChange('website', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="https://www.example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={profile.socialMedia.linkedin}
                      onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={profile.socialMedia.twitter}
                      onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="https://twitter.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={profile.socialMedia.facebook}
                      onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="https://facebook.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={profile.socialMedia.instagram}
                      onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <AlertCircle size={20} className="text-blue-600" />
                  Account Status
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={profile.status}
                      onChange={(e) => handleProfileChange('status', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={16} />
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
                          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
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
                          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="text"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., ₹5000 per unit"
                      />
                    </div>

                    {/* Specifications */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specifications
                      </label>
                      <div className="space-y-3">
                        {Object.entries(newProduct.specifications || {}).map(([key, value]) => (
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
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newSpecKey}
                            onChange={(e) => setNewSpecKey(e.target.value)}
                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                            placeholder="Specification name"
                          />
                          <input
                            type="text"
                            value={newSpecValue}
                            onChange={(e) => setNewSpecValue(e.target.value)}
                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                            placeholder="Value"
                          />
                          <button
                            onClick={handleAddSpecification}
                            disabled={!newSpecKey || !newSpecValue}
                            className="px-3 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 disabled:opacity-50"
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
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
                    <div key={product.id} className="border rounded-xl p-5 hover:shadow-md">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {product.category && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {product.category}
                              </span>
                            )}
                            {product.price && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
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
                                    <span className="text-gray-700">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg"
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
                  <p className="text-gray-500 mb-4">Add products and services for this exhibitor.</p>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={16} className="mr-2" />
                    Add First Product
                  </button>
                </div>
              )}
            </div>
          )}

          {/* BRANDS TAB - Enhanced with Images */}
          {activeTab === 'brands' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Tag size={20} className="text-blue-600" />
                  Brands
                </h2>
                
                <button
                  onClick={() => setShowAddBrand(!showAddBrand)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={16} />
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
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        value={newBrand.website}
                        onChange={(e) => setNewBrand({...newBrand, website: e.target.value})}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="https://www.brandwebsite.com"
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
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        Add Brand
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Brands List with Images */}
              {profile.brands.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {profile.brands.map((brand) => (
                    <div key={brand.id} className="border rounded-xl overflow-hidden hover:shadow-md">
                      {/* Banner Image */}
                      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                        {brand.bannerImage ? (
                          <Image
                            src={brand.bannerImage}
                            alt={`${brand.name} banner`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-white/30">
                            <ImageIcon size={48} />
                          </div>
                        )}
                        
                        {/* Banner Upload Button */}
                        <button
                          onClick={() => {
                            setSelectedBrandId(brand.id);
                            brandBannerInputRef.current?.click();
                          }}
                          className="absolute bottom-2 right-2 p-2 bg-white/90 rounded-lg hover:bg-white shadow-sm"
                          title="Upload banner image"
                        >
                          <Upload size={16} className="text-gray-700" />
                        </button>
                        <input
                          ref={brandBannerInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && selectedBrandId) {
                              handleBrandBannerUpload(selectedBrandId, file);
                            }
                          }}
                        />
                      </div>

                      {/* Brand Info */}
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          {/* Logo */}
                          <div className="relative w-20 h-20 bg-gray-100 rounded-lg border-2 border-white -mt-10 shadow-lg overflow-hidden">
                            {brand.logo || brand.logoUrl ? (
                              <Image
                                src={brand.logo || brand.logoUrl || ''}
                                alt={brand.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <Tag size={24} className="text-gray-400" />
                              </div>
                            )}
                            
                            {/* Logo Upload Button */}
                            <button
                              onClick={() => {
                                setSelectedBrandId(brand.id);
                                brandLogoInputRef.current?.click();
                              }}
                              className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <Upload size={16} className="text-white" />
                            </button>
                            <input
                              ref={brandLogoInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file && selectedBrandId) {
                                  handleBrandLogoUpload(selectedBrandId, file);
                                }
                              }}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-900 text-lg">{brand.name}</h3>
                                {brand.website && (
                                  <a
                                    href={brand.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                                  >
                                    <Globe size={14} />
                                    {brand.website.replace(/^https?:\/\//, '')}
                                  </a>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteBrand(brand.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            
                            {brand.description && (
                              <p className="text-sm text-gray-600 mt-2">{brand.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-xl">
                  <Tag size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Brands Added</h3>
                  <p className="text-gray-500 mb-4">Add brands with images for this exhibitor.</p>
                  <button
                    onClick={() => setShowAddBrand(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={16} className="mr-2" />
                    Add First Brand
                  </button>
                </div>
              )}
            </div>
          )}

          {/* BROCHURES TAB - Enhanced with PDF Upload */}
          {activeTab === 'brochures' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Brochures & Documents
                </h2>
                
                <button
                  onClick={() => setShowAddBrochure(!showAddBrochure)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Add Brochure
                </button>
              </div>

              {/* Add Brochure Form with PDF Upload */}
              {showAddBrochure && (
                <div className="mb-8 p-6 border-2 border-blue-200 rounded-xl bg-blue-50">
                  <h3 className="font-semibold text-gray-900 mb-4">Add New Brochure</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Document Name *
                      </label>
                      <input
                        type="text"
                        value={newBrochure.name}
                        onChange={(e) => setNewBrochure({...newBrochure, name: e.target.value})}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload PDF *
                      </label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                        <input
                          ref={brochureFileInputRef}
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && newBrochure.name) {
                              handleBrochureUpload(file);
                            } else if (!newBrochure.name) {
                              toast.error('Please enter document name first');
                            }
                          }}
                        />
                        
                        <FileText size={40} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          PDF files only (Max size: 10MB)
                        </p>
                        
                        <button
                          type="button"
                          onClick={() => brochureFileInputRef.current?.click()}
                          disabled={!newBrochure.name || uploading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                        >
                          {uploading ? 'Uploading...' : 'Select PDF File'}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={() => setShowAddBrochure(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Brochures List with PDF Preview */}
              {profile.brochures.length > 0 ? (
                <div className="space-y-4">
                  {profile.brochures.map((brochure) => (
                    <div key={brochure.id} className="border rounded-xl p-5 hover:shadow-md">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <FileText size={32} className="text-red-500 shrink-0" />
                              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{brochure.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{brochure.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <File size={12} />
                                  {brochure.fileSize}
                                </span>
                                <span>•</span>
                                <span>{brochure.downloads} downloads</span>
                                <span>•</span>
                                <span>Uploaded {new Date(brochure.uploadedAt).toLocaleDateString()}</span>
                                {brochure.fileType && (
                                  <>
                                    <span>•</span>
                                    <span className="text-blue-600">PDF</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <a
                            href={brochure.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View PDF"
                          >
                            <Eye size={16} />
                          </a>
                          <a
                            href={brochure.fileUrl}
                            download
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Download"
                          >
                            <Download size={16} />
                          </a>
                          <button
                            onClick={() => handleDeleteBrochure(brochure.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* PDF Preview */}
                      {brochure.fileUrl && (
                        <div className="mt-4 border rounded-lg overflow-hidden bg-gray-50">
                          <iframe
                            src={`${brochure.fileUrl}#toolbar=0&navpanes=0`}
                            className="w-full h-48"
                            title={brochure.name}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-xl">
                  <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Brochures Added</h3>
                  <p className="text-gray-500 mb-4">Upload PDF brochures for this exhibitor.</p>
                  <button
                    onClick={() => setShowAddBrochure(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={16} className="mr-2" />
                    Add First Brochure
                  </button>
                </div>
              )}
            </div>
          )}

          {/* BOOTH TAB */}
          {activeTab === 'booth' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Home size={20} className="text-blue-600" />
                Booth Details
              </h2>

              <div className="space-y-8">
                {/* Booth Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Number
                    </label>
                    <input
                      type="text"
                      value={profile.boothNumber || ''}
                      onChange={(e) => handleProfileChange('boothNumber', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., B-125"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Size (sqm)
                    </label>
                    <input
                      type="text"
                      value={profile.boothSize || ''}
                      onChange={(e) => handleProfileChange('boothSize', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 50 sqm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Type
                    </label>
                    <select
                      value={profile.boothType || ''}
                      onChange={(e) => handleProfileChange('boothType', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select booth type</option>
                      {boothTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Dimensions
                    </label>
                    <input
                      type="text"
                      value={profile.boothDimensions || ''}
                      onChange={(e) => handleProfileChange('boothDimensions', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 5m x 10m"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Price
                    </label>
                    <input
                      type="text"
                      value={profile.boothPrice || ''}
                      onChange={(e) => handleProfileChange('boothPrice', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., $5,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Status
                    </label>
                    <select
                      value={profile.boothStatus || 'pending'}
                      onChange={(e) => handleProfileChange('boothStatus', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="allocated">Allocated</option>
                      <option value="payment_pending">Payment Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Notes
                    </label>
                    <textarea
                      value={profile.boothNotes || ''}
                      onChange={(e) => handleProfileChange('boothNotes', e.target.value)}
                      rows={3}
                      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="Additional notes about the booth, special requirements, etc."
                    />
                  </div>
                </div>

                {/* Exhibition Assignment */}
                <div className="border-t pt-6">
                  <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Grid size={18} className="text-blue-600" />
                    Exhibition Assignment
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pavilion
                      </label>
                      <select
                        value={profile.exhibition.pavilion || ''}
                        onChange={(e) => handleExhibitionChange('pavilion', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select pavilion</option>
                        {pavilionOptions.map(pavilion => (
                          <option key={pavilion} value={pavilion}>{pavilion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hall
                      </label>
                      <select
                        value={profile.exhibition.hall || ''}
                        onChange={(e) => handleExhibitionChange('hall', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select hall</option>
                        {hallOptions.map(hall => (
                          <option key={hall} value={hall}>{hall}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stand Number
                      </label>
                      <input
                        type="text"
                        value={profile.exhibition.standNumber || ''}
                        onChange={(e) => handleExhibitionChange('standNumber', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 125A"
                      />
                    </div>
                  </div>
                </div>

                {/* Access Credentials */}
                <div className="border-t pt-6">
                  <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Key size={18} className="text-blue-600" />
                    Access & Credentials
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exhibitor Portal Access
                      </label>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          profile.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {profile.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={() => {
                            const newStatus = profile.status === 'active' ? 'inactive' : 'active';
                            handleProfileChange('status', newStatus);
                            toast.success(`Access ${newStatus === 'active' ? 'enabled' : 'disabled'}`);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Toggle Access
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Login
                      </label>
                      <p className="text-gray-900 py-2.5">
                        {profile.updatedAt ? new Date(profile.updatedAt).toLocaleString() : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floor Plan Preview */}
                {profile.exhibition.floorPlanUrl && (
                  <div className="border-t pt-6">
                    <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin size={18} className="text-blue-600" />
                      Floor Plan
                    </h3>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={profile.exhibition.floorPlanUrl} 
                        alt="Floor Plan"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

{/* LOCATION TAB - Simplified with only input fields */}
{activeTab === 'location' && (
  <div className="p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
      <Map size={20} className="text-blue-600" />
      Exhibition Location Details
    </h2>

    <div className="space-y-8">
      {/* Basic Location Info - All input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            value={profile.exhibition.location?.city || ''}
            onChange={(e) => handleLocationChange('city', e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/Province
          </label>
          <input
            type="text"
            value={profile.exhibition.location?.state || ''}
            onChange={(e) => handleLocationChange('state', e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter state or province"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP/Postal Code
          </label>
          <input
            type="text"
            value={profile.exhibition.location?.zipCode || ''}
            onChange={(e) => handleLocationChange('zipCode', e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ZIP or postal code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            value={profile.exhibition.location?.country || ''}
            onChange={(e) => handleLocationChange('country', e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter country name"
          />
        </div>

        {/* Additional location fields if needed */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue/Exhibition Center
          </label>
          <input
            type="text"
            value={profile.exhibition.location?.venue || ''}
            onChange={(e) => handleLocationChange('venue', e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Istanbul Expo Center"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hall
          </label>
          <input
            type="text"
            value={profile.exhibition.location?.hall || ''}
            onChange={(e) => handleLocationChange('hall', e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Hall 2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Booth Number
          </label>
          <input
            type="text"
            value={profile.boothNumber || ''}
            onChange={(e) => handleProfileChange('boothNumber', e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., B-125"
          />
        </div>
      </div>

      {/* Simple Address Field */}
      <div className="border-t pt-6">
        <h3 className="text-md font-semibold text-gray-900 mb-4">Complete Address</h3>
        <textarea
          value={profile.exhibition.location?.fullAddress || ''}
          onChange={(e) => handleLocationChange('fullAddress', e.target.value)}
          rows={3}
          className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter complete exhibition address with all details..."
        />
        <p className="text-xs text-gray-500 mt-2">
          Provide the complete address including venue, hall, booth number, and any specific directions
        </p>
      </div>

      {/* Location Preview */}
      {(profile.exhibition.location?.city || profile.exhibition.location?.country || profile.boothNumber) && (
        <div className="border-t pt-6">
          <h3 className="text-md font-semibold text-gray-900 mb-4">Location Summary</h3>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-gray-700">
              {[
                profile.exhibition.location?.venue,
                profile.exhibition.location?.hall,
                profile.boothNumber,
                profile.exhibition.location?.city,
                profile.exhibition.location?.state,
                profile.exhibition.location?.zipCode,
                profile.exhibition.location?.country
              ].filter(Boolean).join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}