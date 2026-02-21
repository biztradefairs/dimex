'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  BuildingOfficeIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CubeIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ComputerDesktopIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  TruckIcon,
  MapPinIcon,
  GlobeAltIcon,
  CurrencyRupeeIcon,
  CreditCardIcon,
  PrinterIcon,
  EyeIcon,
  MinusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
  ExclamationCircleIcon,
  MagnifyingGlassPlusIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';

// ============= API CONFIGURATION =============
const API_BASE_URL = 'https://diemex-backend.onrender.com';

// ============= INTERFACES =============
interface GeneralInfo {
  title: 'Mr' | 'Mrs' | 'Ms' | 'Dr' | 'Prof';
  firstName: string;
  lastName: string;
  designation: string;
  mobile: string;
  email: string;
  companyName: string;
  businessNature: string;
  gstNumber: string;
}

interface BoothDetails {
  boothNo: string;
  exhibitorName: string;
  sqMtrBooked: string;
  organisation: string;
  contactPerson: string;
  designation: string;
  mobile: string;
  email: string;
  contractorCompany: string;
  contractorPerson: string;
  contractorMobile: string;
  contractorEmail: string;
  contractorGST: string;
  contractorPAN: string;
}

interface MachineDisplay {
  srNo: number;
  machineName: string;
  width: string;
  length: string;
  height: string;
  weight: string;
}

interface Personnel {
  srNo: number;
  name: string;
  designation: string;
  organisation: string;
}

interface CompanyDetails {
  companyName: string;
  address: string;
  telephone: string;
  mobile: string;
  email: string;
  website: string;
  contactPerson: string;
  designation: string;
  productsServices: string;
}

interface SecurityDeposit {
  boothSq: string;
  amountINR: number;
  amountUSD: number;
  ddNo: string;
  bankName: string;
  branch: string;
  dated: string;
  amountWords: string;
}

interface ElectricalLoad {
  temporaryLoad: string;
  exhibitionLoad: string;
  temporaryTotal: number;
  exhibitionTotal: number;
}

interface FurnitureItem {
  id?: string;
  code: string;
  description: string;
  size: string | null;
  cost3Days: number;
  quantity: number;
  cost: number;
  image: string;
  imageUrl?: string;
  cloudinaryPublicId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface HostessRequirement {
  category: 'A' | 'B';
  quantity: number;
  noOfDays: number;
  amount: number;
  ratePerDay?: number;
}

interface CompressedAir {
  id?: string;
  selected: string;
  cfmRange: string;
  costPerConnection: number;
  qty: number;
  powerKW: number;
  costPerKW: number;
  totalCost: number;
}

interface WaterConnection {
  connections: number;
  costPerConnection: number;
  totalCost: number;
}

interface SecurityGuard {
  quantity: number;
  noOfDays: number;
  totalCost: number;
}

interface PaymentDetails {
  paymentMode: 'RTGS' | 'NEFT' | 'IMPS' | 'UPI' | 'Cheque' | 'DD' | 'Cash';
  bankName: string;
  transactionId: string;
  transactionDate: string;
  amount: number;
  uploadedReceipt: File | null;
}

interface RentalItem {
  id?: string;
  description: string;
  costFor3Days: number;
  quantity: number;
  totalCost: number;
  image?: string;
  imageUrl?: string;
  category?: string;
  inStock?: boolean;
}

interface RentalItems {
  [key: string]: RentalItem;
}

interface HousekeepingStaff {
  quantity: number;
  category: 'Housekeeping';
  chargesPerShift: number;
  noOfDays: number;
  totalCost: number;
}

interface CompressedAirOption {
  id: string;
  cfmRange: string;
  costPerConnection: number;
  powerKW: number;
  isActive: boolean;
  displayOrder: number;
}

interface ElectricalRate {
  id: string;
  type: 'temporary' | 'exhibition';
  ratePerKW: number;
  description: string;
  isActive: boolean;
}

interface SecurityGuardConfig {
  ratePerGuardPerDay: number;
}

interface WaterConnectionConfig {
  costPerConnection: number;
  ratePerConnection: number;
}

interface HousekeepingConfig {
  ratePerShift: number;
}

interface HostessCategory {
  id: string;
  category: 'A' | 'B';
  ratePerDay: number;
  description: string;
  isActive: boolean;
}

interface SecurityDepositTier {
  id: string;
  category: '0-36' | '37-100' | '101+';
  minSqMtr: number;
  maxSqMtr: number;
  amountINR: number;
  amountUSD: number;
  displayOrder: number;
  isActive: boolean;
}

// ============= API SERVICE CLASS =============
class ApiService {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = typeof window !== 'undefined' ? 
      localStorage.getItem('exhibitor_token') || localStorage.getItem('token') : null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
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

      return responseData as T;
    } catch (error) {
      console.error('API Call Error:', error);
      throw error;
    }
  }

  async getExhibitorProfile(): Promise<{ success: boolean; data: any }> {
    return this.request<{ success: boolean; data: any }>(
      '/api/exhibitorDashboard/profile'
    );
  }

  async getFurniture(): Promise<{ success: boolean; data: FurnitureItem[] }> {
    return this.request('/api/admin/furniture');
  }

  async getCompressedAirOptions(): Promise<{ success: boolean; data: CompressedAirOption[] }> {
    return this.request('/api/admin/compressed-air');
  }

  async getElectricalRates(): Promise<{ success: boolean; data: ElectricalRate[] }> {
    return this.request('/api/admin/electrical-rates');
  }

  async getRentalItems(): Promise<{ success: boolean; data: RentalItem[] }> {
    return this.request('/api/admin/rental-items');
  }

  async getHostessCategories(): Promise<{ success: boolean; data: HostessCategory[] }> {
    return this.request('/api/admin/hostess-rates');
  }

  async getSecurityGuardConfig(): Promise<{ success: boolean; data: SecurityGuardConfig }> {
    return this.request('/api/admin/security-guard/config');
  }

  async getWaterConnectionConfig(): Promise<{ success: boolean; data: WaterConnectionConfig }> {
    return this.request('/api/admin/water-connection/config');
  }

  async getHousekeepingConfig(): Promise<{ success: boolean; data: HousekeepingConfig }> {
    return this.request('/api/admin/housekeeping/config');
  }

  async getSecurityDepositConfig(): Promise<{ success: boolean; data: SecurityDepositTier[] }> {
    return this.request('/api/admin/security-deposit/active');
  }

  async calculateWaterCost(connections: number): Promise<{ success: boolean; data: { totalCost: number } }> {
    return this.request('/api/admin/water-connection/calculate', {
      method: 'POST',
      body: JSON.stringify({ connections }),
    });
  }

  async calculateSecurityGuardCost(quantity: number, days: number): Promise<{ success: boolean; data: { totalCost: number } }> {
    return this.request('/api/admin/security-guard/calculate', {
      method: 'POST',
      body: JSON.stringify({ quantity, days }),
    });
  }

  async calculateHousekeepingCost(quantity: number, days: number): Promise<{ success: boolean; data: { totalCost: number } }> {
    return this.request('/api/admin/housekeeping/calculate', {
      method: 'POST',
      body: JSON.stringify({ quantity, days, category: 'Housekeeping' }),
    });
  }

  async calculateHostessCost(category: string, quantity: number, days: number): Promise<{ success: boolean; data: { totalCost: number } }> {
    return this.request('/api/admin/hostess-rates/calculate', {
      method: 'POST',
      body: JSON.stringify({ category, quantity, days }),
    });
  }

  async submitApplication(formData: FormData): Promise<{ success: boolean; message: string }> {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/exhibitorDashboard/requirements`, {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Submission failed');
    }
    return data;
  }
}

export default function RequirementsPage() {
  const apiService = new ApiService();

  // ============= FORM STATES =============
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  // ============= FIELD-LEVEL READ-ONLY STATES =============
  const [readOnlyFields, setReadOnlyFields] = useState({
    // General Info
    generalInfo_title: false,
    generalInfo_firstName: false,
    generalInfo_lastName: false,
    generalInfo_designation: false,
    generalInfo_mobile: false,
    generalInfo_email: false,
    generalInfo_companyName: false,
    generalInfo_businessNature: false,
    generalInfo_gstNumber: false,
    
    // Booth Details - Exhibitor fields (auto-filled)
    boothDetails_boothNo: false,
    boothDetails_exhibitorName: false,
    boothDetails_sqMtrBooked: false,
    boothDetails_organisation: false,
    boothDetails_contactPerson: false,
    boothDetails_designation: false,
    boothDetails_mobile: false,
    boothDetails_email: false,
    
    // Booth Details - Contractor fields (always editable - no read-only flags needed)
    
    // Company Details
    companyDetails_companyName: false,
    companyDetails_address: false,
    companyDetails_telephone: false,
    companyDetails_mobile: false,
    companyDetails_email: false,
    companyDetails_website: false,
    companyDetails_contactPerson: false,
    companyDetails_designation: false,
    companyDetails_productsServices: false,
    
    // Personnel - First row
    personnel_0_name: false,
    personnel_0_designation: false,
    personnel_0_organisation: false,
  });

  // Form 1 - General Information
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    title: 'Mr',
    firstName: '',
    lastName: '',
    designation: '',
    mobile: '',
    email: '',
    companyName: '',
    businessNature: '',
    gstNumber: ''
  });

  // Form 2 - Booth Details
  const [boothDetails, setBoothDetails] = useState<BoothDetails>({
    boothNo: '',
    exhibitorName: '',
    sqMtrBooked: '',
    organisation: '',
    contactPerson: '',
    designation: '',
    mobile: '',
    email: '',
    contractorCompany: '',
    contractorPerson: '',
    contractorMobile: '',
    contractorEmail: '',
    contractorGST: '',
    contractorPAN: ''
  });

  // Form 3 - Security Deposit
  const [securityDeposit, setSecurityDeposit] = useState<SecurityDeposit>({
    boothSq: '',
    amountINR: 0,
    amountUSD: 0,
    ddNo: '',
    bankName: '',
    branch: '',
    dated: '',
    amountWords: ''
  });

  // Form 4 - Machine Display (Optional)
  const [machines, setMachines] = useState<MachineDisplay[]>([
    { srNo: 1, machineName: '', width: '', length: '', height: '', weight: '' },
    { srNo: 2, machineName: '', width: '', length: '', height: '', weight: '' },
    { srNo: 3, machineName: '', width: '', length: '', height: '', weight: '' }
  ]);

  // Form 5 - Personnel (Required)
  const [personnel, setPersonnel] = useState<Personnel[]>([
    { srNo: 1, name: '', designation: '', organisation: '' },
    { srNo: 2, name: '', designation: '', organisation: '' },
    { srNo: 3, name: '', designation: '', organisation: '' }
  ]);

  // Form 6 - Company Details (Required)
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: '',
    address: '',
    telephone: '',
    mobile: '',
    email: '',
    website: '',
    contactPerson: '',
    designation: '',
    productsServices: ''
  });

  // Form 7 - Electrical Load (Optional)
  const [electricalLoad, setElectricalLoad] = useState<ElectricalLoad>({
    temporaryLoad: '',
    exhibitionLoad: '',
    temporaryTotal: 0,
    exhibitionTotal: 0
  });

  // Form 8 - Furniture (Optional)
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>([]);

  // Form 9 - Hostess (Optional)
  const [hostessRequirements, setHostessRequirements] = useState<HostessRequirement[]>([
    { category: 'A', quantity: 0, noOfDays: 0, amount: 0, ratePerDay: 5000 },
    { category: 'B', quantity: 0, noOfDays: 0, amount: 0, ratePerDay: 4000 }
  ]);

  // Form 10 - Compressed Air (Optional)
  const [compressedAirOptions, setCompressedAirOptions] = useState<CompressedAirOption[]>([]);
  const [compressedAir, setCompressedAir] = useState<CompressedAir>({
    selected: '',
    cfmRange: '',
    costPerConnection: 0,
    qty: 1,
    powerKW: 0,
    costPerKW: 3500,
    totalCost: 0
  });

  // Form 11 - Water Connection (Optional)
  const [waterConnection, setWaterConnection] = useState<WaterConnection>({
    connections: 0,
    costPerConnection: 15000,
    totalCost: 0
  });

  // Form 12 - Security Guard (Optional)
  const [securityGuard, setSecurityGuard] = useState<SecurityGuard>({
    quantity: 0,
    noOfDays: 0,
    totalCost: 0
  });

  // Form 13 - Rental Items (AV & IT) (Optional)
  const [rentalItems, setRentalItems] = useState<RentalItems>({});

  // Form 14 - Housekeeping Staff (Optional)
  const [housekeepingStaff, setHousekeepingStaff] = useState<HousekeepingStaff>({
    quantity: 0,
    category: 'Housekeeping',
    chargesPerShift: 2000,
    noOfDays: 0,
    totalCost: 0
  });

  // Payment Details
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMode: 'RTGS',
    bankName: '',
    transactionId: '',
    transactionDate: '',
    amount: 0,
    uploadedReceipt: null
  });

  // Electrical rates from API
  const [electricalRates, setElectricalRates] = useState<ElectricalRate[]>([]);
  
  // Security Deposit Tiers from API
  const [securityDepositTiers, setSecurityDepositTiers] = useState<SecurityDepositTier[]>([]);

  // ============= HELPER FUNCTION =============
  const hasData = (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    if (typeof value === 'number') return value !== 0;
    return true;
  };

  // ============= FETCH ALL DATA =============
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setApiError(null);

        // Fetch all data in parallel
        const [
          furnitureRes,
          compressedAirRes,
          electricalRatesRes,
          rentalItemsRes,
          hostessCategoriesRes,
          securityGuardConfigRes,
          waterConnectionConfigRes,
          housekeepingConfigRes,
          securityDepositRes
        ] = await Promise.allSettled([
          apiService.getFurniture(),
          apiService.getCompressedAirOptions(),
          apiService.getElectricalRates(),
          apiService.getRentalItems(),
          apiService.getHostessCategories(),
          apiService.getSecurityGuardConfig(),
          apiService.getWaterConnectionConfig(),
          apiService.getHousekeepingConfig(),
          apiService.getSecurityDepositConfig()
        ]);

        // Process Furniture
        if (furnitureRes.status === 'fulfilled' && furnitureRes.value.success) {
          console.log('Furniture API Response:', furnitureRes.value.data);
          setFurnitureItems(furnitureRes.value.data.map((item: any) => ({
            ...item,
            image: item.imageUrl || '',
            size: item.size || 'N/A',
            quantity: 0,
            cost: 0
          })));
        }

        // Process Compressed Air Options
        if (compressedAirRes.status === 'fulfilled' && compressedAirRes.value.success) {
          setCompressedAirOptions(compressedAirRes.value.data);
        }

        // Process Electrical Rates
        if (electricalRatesRes.status === 'fulfilled' && electricalRatesRes.value.success) {
          console.log('Electrical Rates API Response:', electricalRatesRes.value.data);
          setElectricalRates(electricalRatesRes.value.data);
        }

        // Process Rental Items
        if (rentalItemsRes.status === 'fulfilled' && rentalItemsRes.value.success) {
          console.log('Rental Items API Response:', rentalItemsRes.value.data);
          const items = rentalItemsRes.value.data;
          const rentalItemsMap: RentalItems = {};
          
          items.forEach(item => {
            if (item.id) {
              let imageUrl = '';
              if (item.imageUrl) {
                imageUrl = item.imageUrl.startsWith('http') 
                  ? item.imageUrl 
                  : `${API_BASE_URL}${item.imageUrl}`;
              }
              
              rentalItemsMap[item.id] = {
                id: item.id,
                description: item.description,
                costFor3Days: item.costFor3Days,
                category: item.category,
                image: imageUrl,
                quantity: 0,
                totalCost: 0
              };
            }
          });
          
          setRentalItems(rentalItemsMap);
        }

        // Process Hostess Categories
        if (hostessCategoriesRes.status === 'fulfilled' && hostessCategoriesRes.value.success) {
          const categories = hostessCategoriesRes.value.data;
          const updatedHostess = [...hostessRequirements];
          
          categories.forEach(cat => {
            const index = updatedHostess.findIndex(h => h.category === cat.category);
            if (index !== -1) {
              updatedHostess[index] = {
                ...updatedHostess[index],
                ratePerDay: cat.ratePerDay
              };
            }
          });
          
          setHostessRequirements(updatedHostess);
        }

        // Process Water Connection Config
        if (waterConnectionConfigRes.status === 'fulfilled' && waterConnectionConfigRes.value.success) {
          console.log('Water Connection Config Response:', waterConnectionConfigRes.value.data);
          const configData = waterConnectionConfigRes.value.data;
          const ratePerConnection = configData?.costPerConnection || 15000;
          
          setWaterConnection(prev => ({
            ...prev,
            costPerConnection: ratePerConnection
          }));
        }

        // Process Housekeeping Config
        if (housekeepingConfigRes.status === 'fulfilled' && housekeepingConfigRes.value.success) {
          setHousekeepingStaff(prev => ({
            ...prev,
            chargesPerShift: housekeepingConfigRes.value.data.ratePerShift
          }));
        }

        // Process Security Deposit Tiers
        if (securityDepositRes.status === 'fulfilled' && securityDepositRes.value.success) {
          console.log('Security Deposit Tiers:', securityDepositRes.value.data);
          setSecurityDepositTiers(securityDepositRes.value.data);
        }

        // Now fetch exhibitor profile data
        await fetchExhibitorProfile();

      } catch (error: any) {
        console.error('Error fetching data:', error);
        setApiError(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const fetchExhibitorProfile = async () => {
    try {
      const result = await apiService.getExhibitorProfile();

      if (!result?.success || !result?.data) {
        return;
      }

      const apiData = result.data;

      // Parse Contact Person
      let contactPersonObj = {
        name: '',
        jobTitle: '',
        email: '',
        phone: '',
        alternatePhone: ''
      };

      if (apiData.contactPerson) {
        if (typeof apiData.contactPerson === 'string') {
          try {
            contactPersonObj = JSON.parse(apiData.contactPerson);
          } catch (e) {
            console.error('Error parsing contactPerson JSON:', e);
          }
        } else if (typeof apiData.contactPerson === 'object') {
          contactPersonObj = apiData.contactPerson;
        }
      }

      contactPersonObj.name = contactPersonObj.name || apiData.name || '';
      contactPersonObj.email = contactPersonObj.email || apiData.email || '';
      contactPersonObj.phone = contactPersonObj.phone || apiData.phone || '';
      contactPersonObj.jobTitle = contactPersonObj.jobTitle || apiData.contact_job_title || '';

      // Parse Name
      let title: 'Mr' | 'Mrs' | 'Ms' | 'Dr' | 'Prof' = 'Mr';
      let firstName = '';
      let lastName = '';

      if (contactPersonObj.name) {
        const fullName = contactPersonObj.name;

        if (/^Dr\./i.test(fullName)) title = 'Dr';
        else if (/^Prof\./i.test(fullName)) title = 'Prof';
        else if (/^Mrs\./i.test(fullName)) title = 'Mrs';
        else if (/^Ms\./i.test(fullName)) title = 'Ms';

        const nameWithoutTitle = fullName
          .replace(/^(Dr\.|Prof\.|Mrs\.|Ms\.|Mr\.)\s*/i, '')
          .trim();

        const parts = nameWithoutTitle.split(' ');
        firstName = parts[0] || '';
        lastName = parts.slice(1).join(' ') || '';
      }

      // Update General Info and set read-only only for fields with data
      setGeneralInfo(prev => {
        const newState = {
          ...prev,
          title: hasData(title) ? title : prev.title,
          firstName: hasData(firstName) ? firstName : prev.firstName,
          lastName: hasData(lastName) ? lastName : prev.lastName,
          designation: contactPersonObj.jobTitle || prev.designation,
          mobile: contactPersonObj.phone || prev.mobile,
          email: contactPersonObj.email || prev.email,
          companyName: apiData.company || apiData.companyName || prev.companyName,
          businessNature: typeof apiData.sector === 'string'
            ? apiData.sector.split(',')[0]
            : Array.isArray(apiData.sector)
            ? apiData.sector[0]
            : prev.businessNature,
          gstNumber: apiData.registrationNumber || apiData.gstNumber || prev.gstNumber
        };
        
        // Set read-only flags for fields that have data
        setReadOnlyFields(prevFlags => ({
          ...prevFlags,
          generalInfo_title: hasData(title),
          generalInfo_firstName: hasData(firstName),
          generalInfo_lastName: hasData(lastName),
          generalInfo_designation: hasData(contactPersonObj.jobTitle),
          generalInfo_mobile: hasData(contactPersonObj.phone),
          generalInfo_email: hasData(contactPersonObj.email),
          generalInfo_companyName: hasData(apiData.company || apiData.companyName),
          generalInfo_businessNature: hasData(apiData.sector),
          generalInfo_gstNumber: hasData(apiData.registrationNumber || apiData.gstNumber)
        }));
        
        return newState;
      });

      // Parse Address
      let street = '';

      if (apiData.address && typeof apiData.address === 'string') {
        const parts = apiData.address.split(',').map((p: string) => p.trim());
        street = parts[0] || '';
      }

      // Update Booth Details and set read-only only for fields with data
      setBoothDetails(prev => {
        const newState = {
          ...prev,
          boothNo: apiData.boothNumber || apiData.booth_number || prev.boothNo,
          exhibitorName: contactPersonObj.name || `${title} ${firstName} ${lastName}`.trim(),
          organisation: apiData.company || apiData.companyName || prev.organisation,
          contactPerson: contactPersonObj.name || `${firstName} ${lastName}`.trim(),
          designation: contactPersonObj.jobTitle || prev.designation,
          mobile: contactPersonObj.phone || prev.mobile,
          email: contactPersonObj.email || prev.email
        };

        // Set read-only flags for fields that have data (exhibitor fields only)
        setReadOnlyFields(prevFlags => ({
          ...prevFlags,
          boothDetails_boothNo: hasData(apiData.boothNumber || apiData.booth_number),
          boothDetails_exhibitorName: hasData(contactPersonObj.name || `${title} ${firstName} ${lastName}`.trim()),
          boothDetails_organisation: hasData(apiData.company || apiData.companyName),
          boothDetails_contactPerson: hasData(contactPersonObj.name || `${firstName} ${lastName}`.trim()),
          boothDetails_designation: hasData(contactPersonObj.jobTitle),
          boothDetails_mobile: hasData(contactPersonObj.phone),
          boothDetails_email: hasData(contactPersonObj.email)
        }));

        return newState;
      });

      // Update Company Details and set read-only only for fields with data
      setCompanyDetails(prev => {
        const newState = {
          ...prev,
          companyName: apiData.company || apiData.companyName || prev.companyName,
          address: street || prev.address,
          telephone: apiData.telephone || prev.telephone,
          mobile: contactPersonObj.phone || prev.mobile,
          email: contactPersonObj.email || prev.email,
          website: apiData.website || prev.website,
          contactPerson: contactPersonObj.name || `${firstName} ${lastName}`.trim(),
          designation: contactPersonObj.jobTitle || prev.designation,
          productsServices: typeof apiData.sector === 'string'
            ? apiData.sector
            : Array.isArray(apiData.sector)
            ? apiData.sector.join(', ')
            : prev.productsServices
        };

        setReadOnlyFields(prevFlags => ({
          ...prevFlags,
          companyDetails_companyName: hasData(apiData.company || apiData.companyName),
          companyDetails_address: hasData(street),
          companyDetails_telephone: hasData(apiData.telephone),
          companyDetails_mobile: hasData(contactPersonObj.phone),
          companyDetails_email: hasData(contactPersonObj.email),
          companyDetails_website: hasData(apiData.website),
          companyDetails_contactPerson: hasData(contactPersonObj.name || `${firstName} ${lastName}`.trim()),
          companyDetails_designation: hasData(contactPersonObj.jobTitle),
          companyDetails_productsServices: hasData(apiData.sector)
        }));

        return newState;
      });

      // Update First Personnel Row and set read-only only for fields with data
      setPersonnel(prev => {
        if (prev.length === 0) return prev;

        const updated = [...prev];
        const name = contactPersonObj.name || `${firstName} ${lastName}`.trim();
        const designation = contactPersonObj.jobTitle || updated[0].designation;
        const organisation = apiData.company || updated[0].organisation;

        updated[0] = {
          ...updated[0],
          name: name,
          designation: designation,
          organisation: organisation
        };

        setReadOnlyFields(prevFlags => ({
          ...prevFlags,
          personnel_0_name: hasData(name),
          personnel_0_designation: hasData(designation),
          personnel_0_organisation: hasData(organisation)
        }));

        return updated;
      });

    } catch (error) {
      console.error('Error fetching exhibitor profile:', error);
    }
  };

  // ============= AUTO-FILL EFFECT =============
  useEffect(() => {
    // Only auto-fill if fields are empty (not read-only)
    setBoothDetails(prev => ({
      ...prev,
      exhibitorName: (!readOnlyFields.boothDetails_exhibitorName && !prev.exhibitorName) ? `${generalInfo.title} ${generalInfo.firstName} ${generalInfo.lastName}`.trim() : prev.exhibitorName,
      organisation: (!readOnlyFields.boothDetails_organisation && !prev.organisation) ? generalInfo.companyName : prev.organisation,
      contactPerson: (!readOnlyFields.boothDetails_contactPerson && !prev.contactPerson) ? `${generalInfo.firstName} ${generalInfo.lastName}`.trim() : prev.contactPerson,
      mobile: (!readOnlyFields.boothDetails_mobile && !prev.mobile) ? generalInfo.mobile : prev.mobile,
      email: (!readOnlyFields.boothDetails_email && !prev.email) ? generalInfo.email : prev.email,
      designation: (!readOnlyFields.boothDetails_designation && !prev.designation) ? generalInfo.designation : prev.designation
    }));

    setCompanyDetails(prev => ({
      ...prev,
      companyName: (!readOnlyFields.companyDetails_companyName && !prev.companyName) ? generalInfo.companyName : prev.companyName,
      mobile: (!readOnlyFields.companyDetails_mobile && !prev.mobile) ? generalInfo.mobile : prev.mobile,
      email: (!readOnlyFields.companyDetails_email && !prev.email) ? generalInfo.email : prev.email,
      contactPerson: (!readOnlyFields.companyDetails_contactPerson && !prev.contactPerson) ? `${generalInfo.firstName} ${generalInfo.lastName}`.trim() : prev.contactPerson,
      designation: (!readOnlyFields.companyDetails_designation && !prev.designation) ? generalInfo.designation : prev.designation
    }));

    setPersonnel(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[0] = {
          ...updated[0],
          name: (!readOnlyFields.personnel_0_name && !updated[0].name) ? `${generalInfo.firstName} ${generalInfo.lastName}`.trim() : updated[0].name,
          designation: (!readOnlyFields.personnel_0_designation && !updated[0].designation) ? generalInfo.designation : updated[0].designation,
          organisation: (!readOnlyFields.personnel_0_organisation && !updated[0].organisation) ? generalInfo.companyName : updated[0].organisation
        };
      }
      return updated;
    });

  }, [generalInfo, readOnlyFields]);

  // ============= CALCULATIONS =============

  const calculateTotals = () => {
    const furnitureTotal = furnitureItems.reduce((sum, item) => sum + item.cost, 0);
    const hostessTotal = hostessRequirements.reduce((sum, h) => sum + h.amount, 0);
    const electricalTotal = electricalLoad.temporaryTotal + electricalLoad.exhibitionTotal;
    const compressedAirTotal = compressedAir.totalCost || 0;
    const waterTotal = waterConnection.totalCost || 0;
    const securityTotal = securityGuard.totalCost || 0;
    const housekeepingTotal = housekeepingStaff.totalCost || 0;
    const rentalTotal = Object.values(rentalItems).reduce((sum, item) => sum + item.totalCost, 0);
    const depositAmount = securityDeposit.amountINR || 0;

    const servicesTotal =
      furnitureTotal +
      hostessTotal +
      electricalTotal +
      compressedAirTotal +
      waterTotal +
      securityTotal +
      rentalTotal +
      housekeepingTotal;

    const gst = servicesTotal * 0.18;
    const subtotal = servicesTotal + gst;
    const grandTotal = subtotal + depositAmount;

    return {
      furniture: furnitureTotal,
      hostess: hostessTotal,
      electrical: electricalTotal,
      compressedAir: compressedAirTotal,
      water: waterTotal,
      security: securityTotal,
      rental: rentalTotal,
      housekeeping: housekeepingTotal,
      deposit: depositAmount,
      servicesTotal,
      gst,
      subtotal,
      total: grandTotal
    };
  };

  // ============= HANDLERS =============

  const handleGeneralInfoChange = (field: keyof GeneralInfo, value: any) => {
    const readOnlyKey = `generalInfo_${field}` as keyof typeof readOnlyFields;
    if (readOnlyFields[readOnlyKey]) return; // Prevent changes if field is read-only
    setGeneralInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleBoothDetailsChange = (field: keyof BoothDetails, value: any) => {
    // Contractor fields are always editable
    const contractorFields = ['contractorCompany', 'contractorPerson', 'contractorMobile', 'contractorEmail', 'contractorGST', 'contractorPAN'];
    if (contractorFields.includes(field)) {
      setBoothDetails(prev => ({ ...prev, [field]: value }));
      return;
    }
    
    // Check if exhibitor field is read-only
    const readOnlyKey = `boothDetails_${field}` as keyof typeof readOnlyFields;
    if (readOnlyFields[readOnlyKey]) return; // Prevent changes if field is read-only
    
    setBoothDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyDetailsChange = (field: keyof CompanyDetails, value: any) => {
    const readOnlyKey = `companyDetails_${field}` as keyof typeof readOnlyFields;
    if (readOnlyFields[readOnlyKey]) return; // Prevent changes if field is read-only
    setCompanyDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePersonnelChange = (index: number, field: keyof Personnel, value: string) => {
    if (index === 0) {
      const readOnlyKey = `personnel_0_${field}` as keyof typeof readOnlyFields;
      if (readOnlyFields[readOnlyKey]) return; // Prevent changes to first row if field is read-only
    }
    const updated = [...personnel];
    updated[index] = { ...updated[index], [field]: value };
    setPersonnel(updated);
  };

  const handleFurnitureQuantity = (index: number, quantity: number) => {
    const updated = [...furnitureItems];
    if (updated[index]) {
      updated[index].quantity = quantity;
      updated[index].cost = quantity * (updated[index].cost3Days || 0);
      setFurnitureItems(updated);
    }
  };

  const handleHostessChange = (index: number, field: string, value: number) => {
    const updated = [...hostessRequirements];
    updated[index] = { ...updated[index], [field]: value };
    const rate = updated[index].ratePerDay || (updated[index].category === 'A' ? 5000 : 4000);
    updated[index].amount = updated[index].quantity * updated[index].noOfDays * rate;
    setHostessRequirements(updated);
  };

  const handleAddMachine = () => {
    setMachines(prev => [
      ...prev,
      {
        srNo: prev.length + 1,
        machineName: '',
        width: '',
        length: '',
        height: '',
        weight: ''
      }
    ]);
  };

  const handleRemoveMachine = (index: number) => {
    const updated = machines.filter((_, i) => i !== index);
    const reIndexed = updated.map((machine, i) => ({
      ...machine,
      srNo: i + 1
    }));
    setMachines(reIndexed);
  };

  const handleCompressedAirSelect = (option: CompressedAirOption) => {
    const totalCost = (option.costPerConnection * compressedAir.qty) + (option.powerKW * 3500 * compressedAir.qty);

    setCompressedAir({
      ...compressedAir,
      id: option.id,
      selected: option.cfmRange,
      cfmRange: option.cfmRange,
      costPerConnection: option.costPerConnection,
      powerKW: option.powerKW,
      totalCost
    });
  };

  const handleCompressedAirQuantity = (qty: number) => {
    setCompressedAir(prev => {
      const selectedOption = compressedAirOptions.find(opt => opt.cfmRange === prev.selected);
      if (selectedOption) {
        const totalCost = (selectedOption.costPerConnection * qty) + (selectedOption.powerKW * 3500 * qty);
        return { ...prev, qty, totalCost };
      }
      return { ...prev, qty };
    });
  };

  const handleElectricalLoadChange = (type: 'temporary' | 'exhibition', value: string) => {
    const loadValue = parseFloat(value) || 0;
    const rate = electricalRates.find(r => r.type === type && r.isActive)?.ratePerKW || 3500;
    const total = loadValue * rate;

    if (type === 'temporary') {
      setElectricalLoad(prev => ({
        ...prev,
        temporaryLoad: value,
        temporaryTotal: total
      }));
    } else {
      setElectricalLoad(prev => ({
        ...prev,
        exhibitionLoad: value,
        exhibitionTotal: total
      }));
    }
  };

  const handleRentalQuantity = (itemKey: string, quantity: number) => {
    setRentalItems(prev => {
      const updated = { ...prev };
      if (updated[itemKey]) {
        updated[itemKey].quantity = quantity;
        updated[itemKey].totalCost = quantity * updated[itemKey].costFor3Days;
      }
      return updated;
    });
  };

  const handleAddPersonnel = () => {
    setPersonnel(prev => [
      ...prev,
      {
        srNo: prev.length + 1,
        name: '',
        designation: '',
        organisation: ''
      }
    ]);
  };

  const handleRemovePersonnel = (index: number) => {
    if (index === 0) {
      // Check if any field in first row has data and is read-only
      if (readOnlyFields.personnel_0_name || readOnlyFields.personnel_0_designation || readOnlyFields.personnel_0_organisation) {
        return; // Prevent removing first row if it has read-only data
      }
    }
    const updated = personnel.filter((_, i) => i !== index);
    const reIndexed = updated.map((person, i) => ({
      ...person,
      srNo: i + 1
    }));
    setPersonnel(reIndexed);
  };

  const handlePaymentFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setPaymentDetails(prev => ({ ...prev, uploadedReceipt: files[0] }));
    }
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      formData.append('generalInfo', JSON.stringify(generalInfo));
      formData.append('boothDetails', JSON.stringify(boothDetails));
      formData.append('securityDeposit', JSON.stringify(securityDeposit));
      formData.append('machines', JSON.stringify(machines.filter(m => m.machineName)));
      formData.append('personnel', JSON.stringify(personnel.filter(p => p.name)));
      formData.append('companyDetails', JSON.stringify(companyDetails));
      formData.append('electricalLoad', JSON.stringify(electricalLoad));
      formData.append('furnitureItems', JSON.stringify(furnitureItems.filter(f => f.quantity > 0)));
      formData.append('hostessRequirements', JSON.stringify(hostessRequirements.filter(h => h.quantity > 0)));
      formData.append('compressedAir', JSON.stringify(compressedAir));
      formData.append('waterConnection', JSON.stringify(waterConnection));
      formData.append('securityGuard', JSON.stringify(securityGuard));
      formData.append('rentalItems', JSON.stringify(
        Object.values(rentalItems).filter(item => item.quantity > 0)
      ));
      formData.append('housekeepingStaff', JSON.stringify(housekeepingStaff));
      formData.append('paymentDetails', JSON.stringify({ 
        ...paymentDetails, 
        uploadedReceipt: null 
      }));

      if (paymentDetails.uploadedReceipt) {
        formData.append('receipt', paymentDetails.uploadedReceipt);
      }

      const result = await apiService.submitApplication(formData);

      console.log('Application submitted successfully', result);
      alert('Your exhibition registration has been submitted successfully!');
      window.location.href = '/dashboard/requirements/success';

    } catch (error: any) {
      console.error('Submission failed:', error);
      alert(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Effects for calculations
  useEffect(() => {
    if (waterConnection.connections > 0) {
      const total = waterConnection.connections * waterConnection.costPerConnection;
      setWaterConnection(prev => ({ ...prev, totalCost: total }));
    } else {
      setWaterConnection(prev => ({ ...prev, totalCost: 0 }));
    }
  }, [waterConnection.connections, waterConnection.costPerConnection]);

  useEffect(() => {
    if (securityGuard.quantity > 0 && securityGuard.noOfDays > 0) {
      const total = securityGuard.quantity * securityGuard.noOfDays * 2500;
      setSecurityGuard(prev => ({ ...prev, totalCost: total }));
    } else {
      setSecurityGuard(prev => ({ ...prev, totalCost: 0 }));
    }
  }, [securityGuard.quantity, securityGuard.noOfDays]);

  useEffect(() => {
    if (housekeepingStaff?.quantity > 0 && housekeepingStaff?.noOfDays > 0 && housekeepingStaff?.chargesPerShift) {
      const total = housekeepingStaff.quantity * housekeepingStaff.noOfDays * housekeepingStaff.chargesPerShift;
      setHousekeepingStaff(prev => ({ ...prev, totalCost: total }));
    } else {
      setHousekeepingStaff(prev => ({ ...prev, totalCost: 0 }));
    }
  }, [housekeepingStaff?.quantity, housekeepingStaff?.noOfDays, housekeepingStaff?.chargesPerShift]);

  // ============= IMAGE MODAL =============
  const renderImageModal = () => {
    if (!selectedImage) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
      >
        <div 
          className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-white rounded-full p-1 shadow-lg z-10"
          >
            <XCircleIcon className="h-8 w-8" />
          </button>
          
          <div className="p-4 bg-white">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[70vh] object-contain mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.jpg';
              }}
            />
            <p className="text-center mt-2 text-sm font-medium text-gray-700">
              {selectedImage.alt}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // ============= RENDER FUNCTIONS =============

  const steps = [
    { number: 1, name: 'Basic Info', icon: UserIcon, mobileName: 'Basic' },
    { number: 2, name: 'Booth', icon: BuildingOfficeIcon, mobileName: 'Booth' },
    { number: 3, name: 'Security', icon: BanknotesIcon, mobileName: 'Deposit' },
    { number: 4, name: 'Machines', icon: CubeIcon, mobileName: 'Mach' },
    { number: 5, name: 'Personnel', icon: UserIcon, mobileName: 'Staff' },
    { number: 6, name: 'Company', icon: BuildingOfficeIcon, mobileName: 'Co' },
    { number: 7, name: 'Electrical', icon: BoltIcon, mobileName: 'Elec' },
    { number: 8, name: 'Furniture', icon: ComputerDesktopIcon, mobileName: 'Furn' },
    { number: 9, name: 'Hostess', icon: SparklesIcon, mobileName: 'Host' },
    { number: 10, name: 'Air', icon: WrenchScrewdriverIcon, mobileName: 'Air' },
    { number: 11, name: 'Water', icon: TruckIcon, mobileName: 'Water' },
    { number: 12, name: 'Security', icon: ShieldCheckIcon, mobileName: 'Guard' },
    { number: 13, name: 'AV Rentals', icon: ComputerDesktopIcon, mobileName: 'Rentals' },
    { number: 14, name: 'Housekeeping', icon: SparklesIcon, mobileName: 'House' }
  ];

  const totalSteps = steps.length;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your profile and available services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (apiError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <ExclamationCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Data</h2>
          <p className="text-gray-600 mb-6">{apiError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ============= FORM 1: GENERAL INFO =============
  const renderGeneralInfo = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg">
            <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Basic Information</h2>
        </div>
        {Object.values(readOnlyFields).some(v => v) && (
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <LockClosedIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Some fields auto-filled</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 sm:p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
            Personal Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <select
                value={generalInfo.title}
                onChange={(e) => handleGeneralInfoChange('title', e.target.value as any)}
                disabled={readOnlyFields.generalInfo_title}
                className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white ${
                  readOnlyFields.generalInfo_title ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              >
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Ms">Ms.</option>
                <option value="Dr">Dr.</option>
                <option value="Prof">Prof.</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                value={generalInfo.firstName}
                onChange={(e) => handleGeneralInfoChange('firstName', e.target.value)}
                disabled={readOnlyFields.generalInfo_firstName}
                className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.generalInfo_firstName ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="First"
              />
              {readOnlyFields.generalInfo_firstName && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                value={generalInfo.lastName}
                onChange={(e) => handleGeneralInfoChange('lastName', e.target.value)}
                disabled={readOnlyFields.generalInfo_lastName}
                className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.generalInfo_lastName ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Last"
              />
              {readOnlyFields.generalInfo_lastName && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Designation</label>
              <input
                type="text"
                value={generalInfo.designation}
                onChange={(e) => handleGeneralInfoChange('designation', e.target.value)}
                disabled={readOnlyFields.generalInfo_designation}
                className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.generalInfo_designation ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="e.g. Manager"
              />
              {readOnlyFields.generalInfo_designation && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 sm:p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <DevicePhoneMobileIcon className="h-4 w-4 mr-2 text-gray-500" />
            Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Mobile</label>
                <input
                  type="tel"
                  value={generalInfo.mobile}
                  onChange={(e) => handleGeneralInfoChange('mobile', e.target.value)}
                  disabled={readOnlyFields.generalInfo_mobile}
                  className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                    readOnlyFields.generalInfo_mobile ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="98765 43210"
                />
                {readOnlyFields.generalInfo_mobile && (
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={generalInfo.email}
                  onChange={(e) => handleGeneralInfoChange('email', e.target.value)}
                  disabled={readOnlyFields.generalInfo_email}
                  className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                    readOnlyFields.generalInfo_email ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="name@company.com"
                />
                {readOnlyFields.generalInfo_email && (
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 sm:p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <BuildingOfficeIcon className="h-4 w-4 mr-2 text-gray-500" />
            Company
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Company Name</label>
              <input
                type="text"
                value={generalInfo.companyName}
                onChange={(e) => handleGeneralInfoChange('companyName', e.target.value)}
                disabled={readOnlyFields.generalInfo_companyName}
                className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.generalInfo_companyName ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Enter company name"
              />
              {readOnlyFields.generalInfo_companyName && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">GST</label>
              <input
                type="text"
                value={generalInfo.gstNumber}
                onChange={(e) => handleGeneralInfoChange('gstNumber', e.target.value)}
                disabled={readOnlyFields.generalInfo_gstNumber}
                className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.generalInfo_gstNumber ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="22AAAAA0000A1Z5"
              />
              {readOnlyFields.generalInfo_gstNumber && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Nature of Business</label>
              <input
                type="text"
                value={generalInfo.businessNature}
                onChange={(e) => handleGeneralInfoChange('businessNature', e.target.value)}
                disabled={readOnlyFields.generalInfo_businessNature}
                className={`w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.generalInfo_businessNature ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="e.g. Manufacturing, Trading, Services"
              />
              {readOnlyFields.generalInfo_businessNature && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 italic">
          * Additional company details can be filled in the Company section (Step 6)
        </p>
      </div>
    </div>
  );

  // ============= FORM 2: BOOTH & CONTRACTOR DETAILS =============
  const renderBoothDetails = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BuildingOfficeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">REGISTRATION OF CONTRACTOR
            <br /> <span className='text-[#4D4D4D] font-semibold text-[15px]'>FOR BARE SPACE EXHIBITORS</span>
          </h2>
        </div>
        {Object.values(readOnlyFields).some(v => v) && (
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <LockClosedIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Some fields auto-filled</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Booth Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Booth No.</label>
              <input
                type="text"
                value={boothDetails.boothNo}
                onChange={(e) => handleBoothDetailsChange('boothNo', e.target.value)}
                disabled={readOnlyFields.boothDetails_boothNo}
                className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.boothDetails_boothNo ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Enter booth number"
              />
              {readOnlyFields.boothDetails_boothNo && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exhibitor Name</label>
              <input
                type="text"
                value={boothDetails.exhibitorName}
                onChange={(e) => handleBoothDetailsChange('exhibitorName', e.target.value)}
                disabled={readOnlyFields.boothDetails_exhibitorName}
                className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.boothDetails_exhibitorName ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Auto-filled from basic info"
              />
              {readOnlyFields.boothDetails_exhibitorName && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sq. Mtr Booked</label>
              <input
                type="text"
                value={boothDetails.sqMtrBooked}
                onChange={(e) => handleBoothDetailsChange('sqMtrBooked', e.target.value)}
                disabled={readOnlyFields.boothDetails_sqMtrBooked}
                className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.boothDetails_sqMtrBooked ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Enter square meters"
              />
              {readOnlyFields.boothDetails_sqMtrBooked && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
              <input
                type="text"
                value={boothDetails.organisation}
                onChange={(e) => handleBoothDetailsChange('organisation', e.target.value)}
                disabled={readOnlyFields.boothDetails_organisation}
                className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.boothDetails_organisation ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Auto-filled from company name"
              />
              {readOnlyFields.boothDetails_organisation && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={boothDetails.contactPerson}
                onChange={(e) => handleBoothDetailsChange('contactPerson', e.target.value)}
                disabled={readOnlyFields.boothDetails_contactPerson}
                className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.boothDetails_contactPerson ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Auto-filled from name"
              />
              {readOnlyFields.boothDetails_contactPerson && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                value={boothDetails.designation}
                onChange={(e) => handleBoothDetailsChange('designation', e.target.value)}
                disabled={readOnlyFields.boothDetails_designation}
                className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.boothDetails_designation ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Auto-filled from designation"
              />
              {readOnlyFields.boothDetails_designation && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={boothDetails.mobile}
                onChange={(e) => handleBoothDetailsChange('mobile', e.target.value)}
                disabled={readOnlyFields.boothDetails_mobile}
                className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.boothDetails_mobile ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Auto-filled from contact"
              />
              {readOnlyFields.boothDetails_mobile && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
              <input
                type="email"
                value={boothDetails.email}
                onChange={(e) => handleBoothDetailsChange('email', e.target.value)}
                disabled={readOnlyFields.boothDetails_email}
                className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  readOnlyFields.boothDetails_email ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Auto-filled from contact"
              />
              {readOnlyFields.boothDetails_email && (
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contractor Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Company</label>
              <input
                type="text"
                value={boothDetails.contractorCompany}
                onChange={(e) => setBoothDetails({ ...boothDetails, contractorCompany: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contractor company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Person</label>
              <input
                type="text"
                value={boothDetails.contractorPerson}
                onChange={(e) => setBoothDetails({ ...boothDetails, contractorPerson: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contractor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Mobile</label>
              <input
                type="tel"
                value={boothDetails.contractorMobile}
                onChange={(e) => setBoothDetails({ ...boothDetails, contractorMobile: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contractor mobile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Email</label>
              <input
                type="email"
                value={boothDetails.contractorEmail}
                onChange={(e) => setBoothDetails({ ...boothDetails, contractorEmail: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contractor email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor GST</label>
              <input
                type="text"
                value={boothDetails.contractorGST}
                onChange={(e) => setBoothDetails({ ...boothDetails, contractorGST: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter GST number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor PAN</label>
              <input
                type="text"
                value={boothDetails.contractorPAN}
                onChange={(e) => setBoothDetails({ ...boothDetails, contractorPAN: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter PAN number"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Booth Fabrication Guidelines & Regulations
        </h3>
        <div className="bg-gray-50 rounded-xl p-5 space-y-4 text-sm text-gray-700 leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Height Limit:</span> The maximum allowable height for fabricated booths,
              including platform height, is 4 meters.
            </li>
            <li>
              <span className="font-semibold">Carpet Requirement:</span> Fabricators must lay a single-use carpet
              over the entire booth area before starting construction. Failure to comply will result
              in forfeiture of the refundable security deposit.
            </li>
            <li>
              <span className="font-semibold">No Storage Space:</span> Storing or retaining materials behind
              the booth is prohibited. Violating this rule will result in forfeiture of the performance bond.
            </li>
            <li>
              <span className="font-semibold">Housekeeping:</span> Organizers will not provide booth cleaning
              services during setup or show days. Fabricators must arrange their own housekeeping personnel
              to ensure final booth cleaning.
            </li>
            <li>
              <span className="font-semibold">Fire Extinguishers:</span> Each booth must have fire extinguishers.
              This requirement must be incorporated into the booth design for approval.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Damage & Performance Bond
        </h3>
        <div className="bg-red-50 border border-red-100 rounded-xl p-5 space-y-4 text-sm text-gray-700 leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Payment:</span> Booth contractors must pay a Damage & Performance
              Bond via demand draft to the organizers, <span className="font-medium">“Maxx Business Media Pvt. Ltd.”</span>,
              upon registering at the exhibition site.
            </li>
            <li>
              <span className="font-semibold">Waste Removal:</span> Contractors are responsible for removing
              all packing and waste materials during move-in and move-out.
            </li>
            <li>
              <span className="font-semibold">Refund of Security Deposit:</span> The Security Deposit DD will
              be refunded upon presentation of the receipt after the exhibition, provided the site
              is cleared without damage.
            </li>
            <li>
              <span className="font-semibold">Deductions:</span> Organizers reserve the right to deduct amounts
              for damages caused during build-up, show days, or dismantling.
            </li>
            <li>
              <span className="font-semibold">Contractor Access:</span> Upon submission of the form and deposit,
              CONTRACTOR BANDS will be issued.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // ============= FORM 3: SECURITY DEPOSIT =============
  const renderSecurityDeposit = () => {
    const sortedTiers = [...securityDepositTiers].sort((a, b) => a.displayOrder - b.displayOrder);

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BanknotesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">CONTRACTOR SECURITY
            DEPOSIT FORM <br /> <span className='text-[#4D4D4D] font-semibold text-[15px]'>FORM 2 FOR BARE SPACE EXHIBITORS</span>
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Deposit Amount</h3>
            
            {sortedTiers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Loading security deposit options...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Booth Sq.</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount (INR)</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount (USD)</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTiers.map((tier, index) => {
                      let boothSqDisplay = '';
                      if (tier.category === '0-36') boothSqDisplay = '0 - 36';
                      else if (tier.category === '37-100') boothSqDisplay = '37 - 100';
                      else if (tier.category === '101+') boothSqDisplay = '101 and above';

                      return (
                        <tr key={tier.id} className="hover:bg-gray-100">
                          <td className="px-3 py-2 text-sm">{index + 1}</td>
                          <td className="px-3 py-2 text-sm">{boothSqDisplay}</td>
                          <td className="px-3 py-2 text-sm">₹{tier.amountINR.toLocaleString()}</td>
                          <td className="px-3 py-2 text-sm">USD {tier.amountUSD}</td>
                          <td className="px-3 py-2">
                            <input
                              type="radio"
                              name="securityDeposit"
                              checked={securityDeposit.boothSq === tier.category}
                              onChange={() => setSecurityDeposit({ 
                                ...securityDeposit, 
                                boothSq: tier.category, 
                                amountINR: tier.amountINR, 
                                amountUSD: tier.amountUSD 
                              })}
                              className="h-4 w-4 text-blue-600"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Notes</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
              <ul className="list-disc pl-5 space-y-3">
                <li>The Security Deposit should be submitted only by <span className="font-semibold">Demand Draft</span>.</li>
                <li>Refundable Security Deposit must be paid by Demand Draft in the name of <span className="font-semibold">“Maxx Business Media Pvt. Ltd.”</span>.</li>
                <li>If the contractor fails to submit the Security Deposit by Demand Draft, booth possession will not be given.</li>
                <li>The Security Deposit must be paid by the <span className="font-semibold">booth contractor</span>.</li>
                <li>If the booth contractor fails to meet the deadline, the complete Security Deposit will be <span className="font-semibold text-red-600">fully forfeited</span>.</li>
                <li>Kindly bring <span className="font-semibold">2 copies</span> of this form at the time of possession.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============= FORM 4: MACHINES (OPTIONAL) =============
  const renderMachines = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg">
            <CubeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">
            MACHINE DISPLAY
            <br />
            <span className="text-[#4D4D4D] font-semibold text-[15px]">
              (OPTIONAL)
            </span>
          </h2>
        </div>

        <button
          type="button"
          onClick={handleAddMachine}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow transition"
        >
          <PlusIcon className="h-4 w-4" />
          Add Machine
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sr.</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Machine Name</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Width (m)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Length (m)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Height (m)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight (Tons)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {machines.map((machine, index) => (
              <tr key={machine.srNo} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm text-gray-900 font-medium">
                  {machine.srNo}
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={machine.machineName}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].machineName = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter machine name"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={machine.width}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].width = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="W"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={machine.length}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].length = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="L"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={machine.height}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].height = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="H"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={machine.weight}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].weight = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Tons"
                  />
                </td>
                <td className="px-3 py-2">
                  {machines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMachine(index)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4 italic">
        * Add all machines that will be displayed at your booth. (Optional)
      </p>
    </div>
  );

  // ============= FORM 5: PERSONNEL =============
  const renderPersonnel = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg">
            <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">
            EXHIBITOR PASSES
            <br />
            <span className="text-[#4D4D4D] font-semibold text-[15px]">
              (OPTIONAL)
            </span>
          </h2>
        </div>
        {(readOnlyFields.personnel_0_name || readOnlyFields.personnel_0_designation || readOnlyFields.personnel_0_organisation) && (
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <LockClosedIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Primary contact auto-filled</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddPersonnel}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow transition"
        >
          <PlusIcon className="h-4 w-4" />
          Add Exhibitor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sr.</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Organisation</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {personnel.map((person, index) => (
              <tr key={person.srNo} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm font-medium text-gray-900">
                  {person.srNo}
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) => handlePersonnelChange(index, 'name', e.target.value)}
                    disabled={index === 0 && readOnlyFields.personnel_0_name}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                      (index === 0 && readOnlyFields.personnel_0_name) ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder={index === 0 ? "Auto-filled from basic info" : "Enter name"}
                  />
                  {index === 0 && readOnlyFields.personnel_0_name && (
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                    </p>
                  )}
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={person.designation}
                    onChange={(e) => handlePersonnelChange(index, 'designation', e.target.value)}
                    disabled={index === 0 && readOnlyFields.personnel_0_designation}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                      (index === 0 && readOnlyFields.personnel_0_designation) ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder={index === 0 ? "Auto-filled" : "Designation"}
                  />
                  {index === 0 && readOnlyFields.personnel_0_designation && (
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                    </p>
                  )}
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={person.organisation}
                    onChange={(e) => handlePersonnelChange(index, 'organisation', e.target.value)}
                    disabled={index === 0 && readOnlyFields.personnel_0_organisation}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                      (index === 0 && readOnlyFields.personnel_0_organisation) ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder={index === 0 ? "Auto-filled" : "Organisation"}
                  />
                  {index === 0 && readOnlyFields.personnel_0_organisation && (
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
                    </p>
                  )}
                </td>
                <td className="px-3 py-2">
                  {personnel.length > 1 && (!readOnlyFields.personnel_0_name || index !== 0) && (
                    <button
                      type="button"
                      onClick={() => handleRemovePersonnel(index)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4 italic">
        * Please enter all representatives who require exhibitor passes. (Optional)
      </p>
    </div>
  );

  // ============= FORM 6: COMPANY DETAILS =============
  const renderCompanyDetails = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BuildingOfficeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">
            DATA FOR EXHIBITOR'S GUIDE
            <br />
            <span className="text-[#4D4D4D] font-semibold text-[15px]">
              (OPTIONAL)
            </span>
          </h2>
        </div>
        {Object.values(readOnlyFields).some(v => v) && (
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <LockClosedIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Some fields auto-filled</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={companyDetails.companyName}
            onChange={(e) => handleCompanyDetailsChange('companyName', e.target.value)}
            disabled={readOnlyFields.companyDetails_companyName}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_companyName ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Auto-filled from basic info"
          />
          {readOnlyFields.companyDetails_companyName && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            value={companyDetails.address}
            onChange={(e) =>
              handleCompanyDetailsChange('address', e.target.value)
            }
            disabled={readOnlyFields.companyDetails_address}
            rows={2}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_address ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Enter complete address"
          />
          {readOnlyFields.companyDetails_address && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telephone
          </label>
          <input
            type="tel"
            value={companyDetails.telephone}
            onChange={(e) =>
              handleCompanyDetailsChange('telephone', e.target.value)
            }
            disabled={readOnlyFields.companyDetails_telephone}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_telephone ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Enter telephone"
          />
          {readOnlyFields.companyDetails_telephone && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile
          </label>
          <input
            type="tel"
            value={companyDetails.mobile}
            onChange={(e) =>
              handleCompanyDetailsChange('mobile', e.target.value)
            }
            disabled={readOnlyFields.companyDetails_mobile}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_mobile ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Auto-filled from contact"
          />
          {readOnlyFields.companyDetails_mobile && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={companyDetails.email}
            onChange={(e) =>
              handleCompanyDetailsChange('email', e.target.value)
            }
            disabled={readOnlyFields.companyDetails_email}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_email ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Auto-filled from contact"
          />
          {readOnlyFields.companyDetails_email && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            value={companyDetails.website}
            onChange={(e) =>
              handleCompanyDetailsChange('website', e.target.value)
            }
            disabled={readOnlyFields.companyDetails_website}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_website ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="www.example.com"
          />
          {readOnlyFields.companyDetails_website && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <input
            type="text"
            value={companyDetails.contactPerson}
            onChange={(e) =>
              handleCompanyDetailsChange('contactPerson', e.target.value)
            }
            disabled={readOnlyFields.companyDetails_contactPerson}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_contactPerson ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Auto-filled from name"
          />
          {readOnlyFields.companyDetails_contactPerson && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Designation
          </label>
          <input
            type="text"
            value={companyDetails.designation}
            onChange={(e) =>
              handleCompanyDetailsChange('designation', e.target.value)
            }
            disabled={readOnlyFields.companyDetails_designation}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_designation ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Auto-filled from designation"
          />
          {readOnlyFields.companyDetails_designation && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Products / Services
          </label>
          <textarea
            value={companyDetails.productsServices}
            onChange={(e) =>
              handleCompanyDetailsChange('productsServices', e.target.value)
            }
            disabled={readOnlyFields.companyDetails_productsServices}
            rows={3}
            className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
              readOnlyFields.companyDetails_productsServices ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Enter products or services"
          />
          {readOnlyFields.companyDetails_productsServices && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <LockClosedIcon className="h-3 w-3 mr-1" /> Auto-filled
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-gray-700">
        <p className="font-semibold">Maxx Business Media Pvt. Ltd.</p>
        <p className="mt-2">This information will be published in the Exhibitor's Guide for visitors.</p>
      </div>
    </div>
  );

  // ============= FORM 7: ELECTRICAL LOAD (OPTIONAL) =============
  const renderElectricalLoad = () => {
    const tempRate = electricalRates.find(r => r.type === 'temporary' && r.isActive)?.ratePerKW || 3500;
    const exhRate = electricalRates.find(r => r.type === 'exhibition' && r.isActive)?.ratePerKW || 3500;

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BoltIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Electrical Load</h2>
        </div>

        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Cost</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Load (KW)</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 text-sm">Temporary (18-19 Nov)</td>
                  <td className="px-3 py-2 text-sm">₹{tempRate.toLocaleString()}/KW</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={electricalLoad.temporaryLoad}
                      onChange={(e) => handleElectricalLoadChange('temporary', e.target.value)}
                      className="w-20 border border-gray-200 rounded px-2 py-1 text-sm"
                      placeholder="KW"
                    />
                  </td>
                  <td className="px-3 py-2 text-sm">₹{electricalLoad.temporaryTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-sm">Exhibition (20-22 Nov)</td>
                  <td className="px-3 py-2 text-sm">₹{exhRate.toLocaleString()}/KW</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={electricalLoad.exhibitionLoad}
                      onChange={(e) => handleElectricalLoadChange('exhibition', e.target.value)}
                      className="w-20 border border-gray-200 rounded px-2 py-1 text-sm"
                      placeholder="KW"
                    />
                  </td>
                  <td className="px-3 py-2 text-sm">₹{electricalLoad.exhibitionTotal.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm">
              <p className="font-semibold text-yellow-800 mb-2">Important Note:</p>
              <p>All prices are current and subject to change without prior notice. Orders must be placed by 7th November 2025.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============= FORM 8: FURNITURE (OPTIONAL) =============
  const renderFurniture = () => {
    const furnitureTotal = furnitureItems.reduce((sum, item) => sum + (item.cost || 0), 0);

    if (furnitureItems.length === 0) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <ComputerDesktopIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Furniture</h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            No furniture items available at the moment.
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <ComputerDesktopIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Furniture</h2>
        </div>

        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cost (3 Days)</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {furnitureItems.map((item, index) => (
                <tr key={item.code || index} className="hover:bg-gray-50">
                  <td className="px-2 py-1.5">
                    <div 
                      className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        const imageUrl = item.image || item.imageUrl;
                        if (imageUrl) {
                          setSelectedImage({
                            src: imageUrl,
                            alt: item.description || 'Furniture item'
                          });
                        }
                      }}
                    >
                      {(item.image || item.imageUrl) ? (
                        <img
                          src={item.image || item.imageUrl || ''}
                          alt={item.description || 'Furniture item'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                          }}
                        />
                      ) : (
                        <PhotoIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-1.5 text-xs font-mono text-blue-600">{item.code || 'N/A'}</td>
                  <td className="px-2 py-1.5 text-xs">{item.description || 'No description'}</td>
                  <td className="px-2 py-1.5 text-xs">{item.size && item.size !== 'null' ? item.size : 'N/A'}</td>
                  <td className="px-2 py-1.5 text-xs">₹{item.cost3Days?.toLocaleString() ?? '0'}</td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      min="0"
                      value={item.quantity || ''}
                      onChange={(e) => handleFurnitureQuantity(index, parseInt(e.target.value) || 0)}
                      className="w-16 border border-gray-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-2 py-1.5 text-xs font-semibold">
                    ₹{item.cost?.toLocaleString() ?? '0'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 sticky bottom-0">
              <tr>
                <td colSpan={6} className="px-2 py-2 text-right text-xs font-semibold">Total:</td>
                <td className="px-2 py-2 text-xs font-bold text-blue-600">
                  ₹{furnitureTotal?.toLocaleString() ?? '0'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  // ============= FORM 9: HOSTESS (OPTIONAL) =============
  const renderHostess = () => {
    const hostessTotal = hostessRequirements.reduce((sum, h) => sum + h.amount, 0);

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">
            Temporary Staff / Hostess
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate/Day</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              {hostessRequirements.map((hostess, index) => (
                <tr key={hostess.category}>
                  <td className="px-3 py-2 text-sm">Category {hostess.category}</td>
                  <td className="px-3 py-2 text-sm">
                    ₹{(hostess.ratePerDay || (hostess.category === 'A' ? 5000 : 4000)).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={hostess.quantity || ''}
                      onChange={(e) =>
                        handleHostessChange(index, 'quantity', parseInt(e.target.value) || 0)
                      }
                      className="w-16 border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={hostess.noOfDays || ''}
                      onChange={(e) =>
                        handleHostessChange(index, 'noOfDays', parseInt(e.target.value) || 0)
                      }
                      className="w-16 border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-3 py-2 text-sm font-semibold">
                    ₹{hostess.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={4} className="px-3 py-2 text-right text-sm font-semibold">Total:</td>
                <td className="px-3 py-2 text-sm font-bold text-blue-600">₹{hostessTotal.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm">
            <p className="font-semibold mb-3">Please Note:</p>
            <ul className="list-decimal pl-5 space-y-2">
              <li>All prices are current and subject to change without prior notice.</li>
              <li>The working hour for service is 8 hrs./person/day.</li>
              <li>No refund for any cancellation once the order is placed.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // ============= FORM 10: COMPRESSED AIR (OPTIONAL) =============
  const renderCompressedAir = () => {
    if (compressedAirOptions.length === 0) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <WrenchScrewdriverIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Compressed Air</h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            No compressed air options available at the moment.
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <WrenchScrewdriverIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Compressed Air</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase"></th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">CFM Range</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Connection Cost</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Power</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total per Unit</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {compressedAirOptions.map((option) => (
                <tr key={option.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2">
                    <input
                      type="radio"
                      name="compressedAir"
                      checked={compressedAir.selected === option.cfmRange}
                      onChange={() => handleCompressedAirSelect(option)}
                      className="h-4 w-4 text-blue-600"
                    />
                  </td>
                  <td className="px-2 py-2 text-sm">{option.cfmRange}</td>
                  <td className="px-2 py-2 text-sm">₹{option.costPerConnection.toLocaleString()}</td>
                  <td className="px-2 py-2 text-sm">{option.powerKW} KW</td>
                  <td className="px-2 py-2 text-sm">₹{(option.costPerConnection + (option.powerKW * 3500)).toLocaleString()}</td>
                  <td className="px-2 py-2">
                    {compressedAir.selected === option.cfmRange && (
                      <input
                        type="number"
                        min="1"
                        value={compressedAir.qty}
                        onChange={(e) => handleCompressedAirQuantity(parseInt(e.target.value) || 1)}
                        className="w-16 border border-gray-200 rounded px-2 py-1 text-sm"
                      />
                    )}
                  </td>
                  <td className="px-2 py-2 text-sm">
                    {compressedAir.selected === option.cfmRange && (
                      <span className="font-semibold">₹{compressedAir.totalCost.toLocaleString()}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ============= FORM 11: WATER CONNECTION (OPTIONAL) =============
  const renderWaterConnection = () => {
    const connections = waterConnection?.connections ?? 0;
    const costPerConnection = waterConnection?.costPerConnection ?? 0;
    const totalCost = waterConnection?.totalCost ?? 0;

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">
            Water Connection
          </h2>
        </div>

        <div className="max-w-md">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. of Connections
              </label>
              <input
                type="number"
                min="0"
                value={connections || ''}
                onChange={(e) =>
                  setWaterConnection({
                    ...waterConnection,
                    connections: parseInt(e.target.value) || 0
                  })
                }
                className="w-24 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-sm">
              <p className="text-gray-600">Cost per connection: ₹{costPerConnection.toLocaleString()}</p>
              <p className="font-semibold text-blue-600 mt-1">Total: ₹{totalCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============= FORM 12: SECURITY GUARD (OPTIONAL) =============
  const renderSecurityGuard = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">
          Security Guard
        </h2>
      </div>

      <div className="max-w-lg space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No. of Guards
            </label>
            <input
              type="number"
              min="0"
              value={securityGuard.quantity || ''}
              onChange={(e) =>
                setSecurityGuard({
                  ...securityGuard,
                  quantity: parseInt(e.target.value) || 0
                })
              }
              className="w-32 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Guards"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No. of Days
            </label>
            <input
              type="number"
              min="0"
              value={securityGuard.noOfDays || ''}
              onChange={(e) =>
                setSecurityGuard({
                  ...securityGuard,
                  noOfDays: parseInt(e.target.value) || 0
                })
              }
              className="w-32 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Days"
            />
          </div>
        </div>

        {securityGuard.quantity > 0 && securityGuard.noOfDays > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              Rate per guard per day: <span className="font-semibold">₹2,500</span>
            </p>
            <p className="mt-2 text-sm font-semibold">Total Cost: ₹{securityGuard.totalCost.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );

  // ============= FORM 13: RENTAL ITEMS (AV & IT) (OPTIONAL) =============
  const renderRentalItems = () => {
    const rentalTotal = Object.values(rentalItems).reduce((sum, item) => sum + (item.totalCost || 0), 0);

    if (Object.keys(rentalItems).length === 0) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <ComputerDesktopIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">AV & IT Rentals</h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            No rental items available at the moment.
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg">
              <ComputerDesktopIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">AV & IT Rentals</h2>
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1.5 rounded-full">For 3 Days</span>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Cost for 3 Days</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(rentalItems).map(([key, item]) => (
                <tr key={key} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div 
                      className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        if (item.image) {
                          setSelectedImage({
                            src: item.image,
                            alt: item.description
                          });
                        }
                      }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.description}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                          }}
                        />
                      ) : (
                        <PhotoIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{(item.costFor3Days || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      value={item.quantity || ''}
                      onChange={(e) => handleRentalQuantity(key, parseInt(e.target.value) || 0)}
                      className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">
                    ₹{(item.totalCost || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={4} className="px-4 py-3 text-right text-sm font-bold text-gray-900">Total:</td>
                <td className="px-4 py-3 text-sm font-bold text-blue-600">₹{(rentalTotal || 0).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  // ============= FORM 14: HOUSEKEEPING STAFF (OPTIONAL) =============
  const renderHousekeepingStaff = () => {
    const chargesPerShift = housekeepingStaff?.chargesPerShift ?? 2000;
    const quantity = housekeepingStaff?.quantity ?? 0;
    const noOfDays = housekeepingStaff?.noOfDays ?? 0;
    const totalCost = housekeepingStaff?.totalCost ?? 0;

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg">
              <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">
              Housekeeping Staff
            </h2>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full">
            Per Shift (10 Hrs)
          </span>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Charges per Shift</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">No. of Staff</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">No. of Days</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">Housekeeping</td>
                <td className="px-4 py-4 text-sm text-gray-900">₹{(chargesPerShift)?.toLocaleString() ?? '2,000'}</td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    min="0"
                    value={quantity || ""}
                    onChange={(e) =>
                      setHousekeepingStaff({
                        ...housekeepingStaff,
                        quantity: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    min="0"
                    value={noOfDays || ""}
                    onChange={(e) =>
                      setHousekeepingStaff({
                        ...housekeepingStaff,
                        noOfDays: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-blue-600">
                  ₹{(totalCost)?.toLocaleString() ?? '0'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ============= PREVIEW MODAL =============
  const renderPreviewModal = () => {
    const totals = calculateTotals();

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 sm:top-20 mx-3 sm:mx-auto p-4 sm:p-6 border w-full sm:w-11/12 max-w-4xl shadow-lg rounded-lg bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Preview & Cost Summary</h2>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-blue-600" />
                  Exhibitor
                </h3>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Name:</span> {`${generalInfo.title || ""} ${generalInfo.firstName || ""} ${generalInfo.lastName || ""}`.trim() || "—"}</p>
                  <p><span className="font-medium">Company:</span> {generalInfo.companyName || "—"}</p>
                  <p><span className="font-medium">Email:</span> {generalInfo.email || "—"}</p>
                  <p><span className="font-medium">Mobile:</span> {generalInfo.mobile || "—"}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-blue-600" />
                  Booth Details
                </h3>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Booth No:</span> {boothDetails.boothNo || "—"}</p>
                  <p><span className="font-medium">Size:</span> {boothDetails.sqMtrBooked ? `${boothDetails.sqMtrBooked} sq.m` : "—"}</p>
                  <p><span className="font-medium">Exhibitor:</span> {boothDetails.exhibitorName || "—"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-800 px-4 py-2">
                <h3 className="text-sm font-semibold text-white">Cost Summary</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2 text-xs">Furniture</td><td className="px-4 py-2 text-xs text-right">₹{totals.furniture.toLocaleString()}</td></tr>
                  <tr><td className="px-4 py-2 text-xs">Hostess</td><td className="px-4 py-2 text-xs text-right">₹{totals.hostess.toLocaleString()}</td></tr>
                  <tr><td className="px-4 py-2 text-xs">Electrical</td><td className="px-4 py-2 text-xs text-right">₹{totals.electrical.toLocaleString()}</td></tr>
                  <tr><td className="px-4 py-2 text-xs">Compressed Air</td><td className="px-4 py-2 text-xs text-right">₹{totals.compressedAir.toLocaleString()}</td></tr>
                  <tr><td className="px-4 py-2 text-xs">Water</td><td className="px-4 py-2 text-xs text-right">₹{totals.water.toLocaleString()}</td></tr>
                  <tr><td className="px-4 py-2 text-xs">Security Guard</td><td className="px-4 py-2 text-xs text-right">₹{totals.security.toLocaleString()}</td></tr>
                  <tr className="bg-yellow-50"><td className="px-4 py-2 text-xs font-semibold">AV & IT Rentals</td><td className="px-4 py-2 text-xs font-semibold text-right">₹{totals.rental.toLocaleString()}</td></tr>
                  <tr className="bg-green-50"><td className="px-4 py-2 text-xs font-semibold">Housekeeping Staff</td><td className="px-4 py-2 text-xs font-semibold text-right">₹{totals.housekeeping.toLocaleString()}</td></tr>
                  <tr><td className="px-4 py-2 text-xs">Services Total</td><td className="px-4 py-2 text-xs text-right">₹{totals.servicesTotal.toLocaleString()}</td></tr>
                  <tr><td className="px-4 py-2 text-xs">GST (18%)</td><td className="px-4 py-2 text-xs text-right">₹{totals.gst.toLocaleString()}</td></tr>
                  <tr className="bg-gray-50"><td className="px-4 py-2 text-xs font-semibold">Subtotal (Including GST)</td><td className="px-4 py-2 text-xs text-right">₹{totals.subtotal.toLocaleString()}</td></tr>
                  <tr><td className="px-4 py-2 text-xs font-semibold">Security Deposit</td><td className="px-4 py-2 text-xs text-right">₹{totals.deposit.toLocaleString()}</td></tr>
                  <tr className="bg-blue-50"><td className="px-4 py-2 text-sm font-bold">Grand Total</td><td className="px-4 py-2 text-sm font-bold text-blue-700 text-right">₹{totals.total.toLocaleString()}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-end gap-3">
            <button onClick={() => setShowPreview(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">Continue Editing</button>
            <button onClick={() => { setShowPreview(false); setShowPayment(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">Proceed to Payment</button>
          </div>
        </div>
      </div>
    );
  };

  // ============= PAYMENT MODAL =============
  const renderPaymentModal = () => {
    const totals = calculateTotals();

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 sm:top-20 mx-3 sm:mx-auto p-4 sm:p-6 border w-full sm:w-11/12 max-w-2xl shadow-lg rounded-lg bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payment</h2>
            <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-gray-600"><XCircleIcon className="h-6 w-6" /></button>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-blue-900">Total Amount:</span>
                <span className="text-xl font-bold text-blue-900">₹{totals.total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">Includes 18% GST on services + Security Deposit</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Bank Transfer Details</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-600">Account Name:</div><div className="font-medium">Maxx Business Media Pvt. Ltd.</div>
                <div className="text-gray-600">Account No:</div><div className="font-medium">272605000632</div>
                <div className="text-gray-600">IFSC:</div><div className="font-medium">ICIC0002726</div>
                <div className="text-gray-600">Bank:</div><div className="font-medium">ICICI Bank</div>
                <div className="text-gray-600">Branch:</div><div className="font-medium">New Delhi</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Payment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Payment Mode</label>
                  <select value={paymentDetails.paymentMode} onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentMode: e.target.value as any })} className="w-full border border-gray-200 rounded-lg p-2 text-sm">
                    <option value="RTGS">RTGS</option><option value="NEFT">NEFT</option><option value="IMPS">IMPS</option>
                    <option value="UPI">UPI</option><option value="Cheque">Cheque</option><option value="DD">DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Transaction ID / UTR</label>
                  <input type="text" value={paymentDetails.transactionId} onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionId: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="UTR / Transaction ID" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Amount Paid</label>
                  <input type="number" value={paymentDetails.amount || ''} onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: parseFloat(e.target.value) || 0 })} className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="Enter amount" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Transaction Date</label>
                  <input type="date" value={paymentDetails.transactionDate} onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionDate: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Upload Payment Receipt</label>
                  <input type="file" onChange={handlePaymentFileUpload} accept=".pdf,.jpg,.jpeg,.png" className="w-full border border-gray-200 rounded-lg p-1.5 text-sm" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button onClick={() => setShowPayment(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">Back</button>
              <button onClick={handleSubmitApplication} disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============= NAVIGATION =============
  const renderNavigation = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
      <button onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1} className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center text-sm">
        <ChevronLeftIcon className="h-4 w-4 mr-1" /> Previous
      </button>

      <div className="flex gap-3 w-full sm:w-auto">
        <button onClick={() => setShowPreview(true)} className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center text-sm">
          <EyeIcon className="h-4 w-4 sm:mr-2" /><span className="hidden sm:inline">Preview & Totals</span><span className="sm:hidden">Preview</span>
        </button>

        {currentStep < totalSteps && (
          <button onClick={() => setCurrentStep(currentStep + 1)} className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm">
            <span className="sm:hidden">Next</span><span className="hidden sm:inline">Next</span><ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        )}

        {currentStep === totalSteps && (
          <button onClick={() => setShowPreview(true)} className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center text-sm font-semibold">
            Review & Submit
          </button>
        )}
      </div>
    </div>
  );

  // ============= PROGRESS TRACKER =============
  const renderProgressTracker = () => (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-medium ${
                currentStep > step.number ? 'bg-green-600 border-green-600 text-white' :
                currentStep === step.number ? 'bg-blue-600 border-blue-600 text-white' :
                'border-gray-300 bg-white text-gray-400'}`}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              {idx < steps.length - 1 && <div className={`w-6 h-0.5 mx-1 ${currentStep > step.number + 1 ? 'bg-green-600' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map(step => <span key={step.number} className="text-xs text-gray-600">{step.name}</span>)}
        </div>
      </div>

      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex items-center text-blue-600">
            <MenuIcon className="h-5 w-5 mr-2" /><span className="font-medium text-sm">Step {currentStep}: {steps[currentStep - 1]?.mobileName}</span>
          </button>
          <div className="text-sm text-gray-600">{currentStep} / {totalSteps}</div>
        </div>
        {isMobileMenuOpen && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {steps.map((step) => (
              <button key={step.number} onClick={() => { setCurrentStep(step.number); setIsMobileMenuOpen(false); }} className={`p-2 rounded-lg text-xs font-medium relative ${currentStep === step.number ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {step.mobileName}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ============= MAIN RENDER =============
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Exhibition Registration</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">Complete all sections to register your participation. All sections are optional.</p>
        </div>

        {renderProgressTracker()}
        {renderNavigation()}
        {renderImageModal()}

        <div className="mt-4">
          {currentStep === 1 && renderGeneralInfo()}
          {currentStep === 2 && renderBoothDetails()}
          {currentStep === 3 && renderSecurityDeposit()}
          {currentStep === 4 && renderMachines()}
          {currentStep === 5 && renderPersonnel()}
          {currentStep === 6 && renderCompanyDetails()}
          {currentStep === 7 && renderElectricalLoad()}
          {currentStep === 8 && renderFurniture()}
          {currentStep === 9 && renderHostess()}
          {currentStep === 10 && renderCompressedAir()}
          {currentStep === 11 && renderWaterConnection()}
          {currentStep === 12 && renderSecurityGuard()}
          {currentStep === 13 && renderRentalItems()}
          {currentStep === 14 && renderHousekeepingStaff()}
        </div>

        {renderNavigation()}
        {showPreview && renderPreviewModal()}
        {showPayment && renderPaymentModal()}
      </div>
    </div>
  );
}