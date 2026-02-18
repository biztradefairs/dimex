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
  ExclamationCircleIcon
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
  code: string;
  description: string;
  size: string;
  cost3Days: number;
  quantity: number;
  cost: number;
  image: string;
}

interface HostessRequirement {
  category: 'A' | 'B';
  quantity: number;
  noOfDays: number;
  amount: number;
}

interface CompressedAir {
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
  description: string;
  costFor3Days: number;
  quantity: number;
  totalCost: number;
}

interface RentalItems {
  lcdProjector: RentalItem;
  laptop: RentalItem;
  laserPrinter: RentalItem;
  paSystem: RentalItem;
  cordlessMike: RentalItem;
  tv42: RentalItem;
  tv50: RentalItem;
  tv55: RentalItem;
}

interface HousekeepingStaff {
  quantity: number;
  category: 'Housekeeping';
  chargesPerShift: number;
  noOfDays: number;
  totalCost: number;
}

// Furniture catalog with image paths
const furnitureCatalog: FurnitureItem[] = [
  { code: 'PI-01', description: 'Executive Chair', size: 'Black/red', cost3Days: 2000, quantity: 0, cost: 0, image: '/furniture/executive-chair.jpg' },
  { code: 'PI-02', description: 'VIP Sofa (1 Seater)', size: 'Black', cost3Days: 2000, quantity: 0, cost: 0, image: '/furniture/vip-sofa-1.jpg' },
  { code: 'PI-03', description: 'VIP Sofa (2 Seater)', size: 'Black', cost3Days: 3500, quantity: 0, cost: 0, image: '/furniture/vip-sofa-2.jpg' },
  { code: 'PI-04', description: 'Visitor Chair', size: 'Black', cost3Days: 800, quantity: 0, cost: 0, image: '/furniture/visitor-chair.jpg' },
  { code: 'PI-05', description: 'Fibre Chair', size: 'Black', cost3Days: 400, quantity: 0, cost: 0, image: '/furniture/fibre-chair.jpg' },
  { code: 'PI-07', description: 'Round Table (Wooden Top)', size: '70CM (dia) x 75CM (H)', cost3Days: 1500, quantity: 0, cost: 0, image: '/furniture/round-table-wooden.jpg' },
  { code: 'PI-08', description: 'Round Table Cross Leg (Glass Top)', size: '90CM (dia) x 75CM (H)', cost3Days: 2000, quantity: 0, cost: 0, image: '/furniture/round-table-glass.jpg' },
  { code: 'PI-09', description: 'Bar Stool (Adjustable Chrome leg with Cup)', size: '50CM (H)', cost3Days: 2000, quantity: 0, cost: 0, image: '/furniture/bar-stool.jpg' },
  { code: 'PI-10', description: 'Glass Showcase (Big with 2 downlights)', size: '1M x 50CM x 2M (H)', cost3Days: 5000, quantity: 0, cost: 0, image: '/furniture/glass-showcase-big.jpg' },
  { code: 'PI-11', description: 'Glass Showcase (Small)', size: '50CM X 50CM X 2M (H)', cost3Days: 4000, quantity: 0, cost: 0, image: '/furniture/glass-showcase-small.jpg' },
  { code: 'PI-12', description: 'Glass Counter', size: '1M X 50CM X 1M (H)', cost3Days: 3500, quantity: 0, cost: 0, image: '/furniture/glass-counter.jpg' },
  { code: 'PI-13', description: 'Centre Table (Black Glass Top)', size: '1.20M (L) x 45CM (W)', cost3Days: 1500, quantity: 0, cost: 0, image: '/furniture/centre-table.jpg' },
  { code: 'PI-14', description: 'Standing Discussion Table', size: '1.0M (H) x 70CM (Dia)', cost3Days: 1500, quantity: 0, cost: 0, image: '/furniture/standing-table.jpg' },
  { code: 'PI-15', description: 'System Counter (Table)', size: '1.05M X 60CM X 75CM', cost3Days: 1500, quantity: 0, cost: 0, image: '/furniture/system-counter.jpg' },
  { code: 'PI-16', description: 'Side Rack (Lockable)', size: '40CM X 1M X 60CM (H)', cost3Days: 3600, quantity: 0, cost: 0, image: '/furniture/side-rack.jpg' },
  { code: 'PI-17', description: 'System Podium', size: '50CM X 50CM X 1M (H)', cost3Days: 1000, quantity: 0, cost: 0, image: '/furniture/podium-1m.jpg' },
  { code: 'PI-18', description: 'System Podium', size: '50CM X 50CM X 70CM (H)', cost3Days: 1000, quantity: 0, cost: 0, image: '/furniture/podium-70cm.jpg' },
  { code: 'PI-19', description: 'System Podium', size: '50CM x 50CM x 50CM (H)', cost3Days: 1500, quantity: 0, cost: 0, image: '/furniture/podium-50cm.jpg' },
  { code: 'PI-20', description: 'Brochure Rack', size: '', cost3Days: 1500, quantity: 0, cost: 0, image: '/furniture/brochure-rack.jpg' },
  { code: 'PI-21', description: 'Round Table (White Top)', size: '80CM (dia) x 75CM (H)', cost3Days: 1500, quantity: 0, cost: 0, image: '/furniture/round-table-white.jpg' },
  { code: 'PI-22', description: 'Square Table', size: '1.2M X 45CM', cost3Days: 1200, quantity: 0, cost: 0, image: '/furniture/square-table.jpg' },
  { code: 'PI-23', description: 'Lockable Door', size: '', cost3Days: 4000, quantity: 0, cost: 0, image: '/furniture/lockable-door.jpg' },
  { code: 'PI-24', description: 'System Panel', size: '1M x 2.5M (H) - White', cost3Days: 1500, quantity: 0, cost: 0, image: '/furniture/system-panel.jpg' },
  { code: 'PI-25', description: 'Glass Shelf (each)', size: '30CM x 1M', cost3Days: 1000, quantity: 0, cost: 0, image: '/furniture/glass-shelf.jpg' },
  { code: 'PI-26', description: 'Wooden Shelf Flat / Adjustable (each)', size: '30CM x 1M', cost3Days: 750, quantity: 0, cost: 0, image: '/furniture/wooden-shelf.jpg' },
  { code: 'PI-27', description: 'Long Arm Halogen Light', size: '150W', cost3Days: 1000, quantity: 0, cost: 0, image: '/furniture/halogen-light.jpg' },
  { code: 'PI-28', description: 'Spot Lights', size: '75W', cost3Days: 750, quantity: 0, cost: 0, image: '/furniture/spot-light.jpg' },
  { code: 'PI-29', description: 'Metal Halide', size: '150W', cost3Days: 2000, quantity: 0, cost: 0, image: '/furniture/metal-halide.jpg' },
  { code: 'PI-30', description: '5A/13A Power Socket', size: '', cost3Days: 500, quantity: 0, cost: 0, image: '/furniture/power-socket.jpg' },
  { code: 'PI-31', description: 'Photo Clip / T-Bolt', size: '', cost3Days: 100, quantity: 0, cost: 0, image: '/furniture/photo-clip.jpg' },
  { code: 'PI-32', description: 'Waste Basket', size: '', cost3Days: 150, quantity: 0, cost: 0, image: '/furniture/waste-basket.jpg' },
];

export default function RequirementsPage() {
  // ============= FORM STATES =============
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

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
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>(furnitureCatalog);

  // Form 9 - Hostess (Optional)
  const [hostessRequirements, setHostessRequirements] = useState<HostessRequirement[]>([
    { category: 'A', quantity: 0, noOfDays: 0, amount: 0 },
    { category: 'B', quantity: 0, noOfDays: 0, amount: 0 }
  ]);

  // Form 10 - Compressed Air (Optional)
  const [compressedAir, setCompressedAir] = useState<CompressedAir>({
    selected: '',
    cfmRange: '',
    costPerConnection: 0,
    qty: 0,
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
  const [rentalItems, setRentalItems] = useState<RentalItems>({
    lcdProjector: { description: 'LCD Projector (XGA 3000 ASNI Lumens)', costFor3Days: 20000, quantity: 0, totalCost: 0 },
    laptop: { description: 'Laptop with Accessories', costFor3Days: 4000, quantity: 0, totalCost: 0 },
    laserPrinter: { description: 'Laser Jet B & W Printer / Scanner (Without Cartridges)', costFor3Days: 10000, quantity: 0, totalCost: 0 },
    paSystem: { description: 'PA Systems (150 w Speaker 2 nos., 400 w Amplifier 1 no)', costFor3Days: 10000, quantity: 0, totalCost: 0 },
    cordlessMike: { description: 'Cordless Hand Mike', costFor3Days: 2000, quantity: 0, totalCost: 0 },
    tv42: { description: 'LCD / LED TV 42"', costFor3Days: 12000, quantity: 0, totalCost: 0 },
    tv50: { description: 'LCD / LED TV 50"', costFor3Days: 16000, quantity: 0, totalCost: 0 },
    tv55: { description: 'LCD / LED TV 55"', costFor3Days: 25000, quantity: 0, totalCost: 0 }
  });

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

  // ============= API FUNCTIONS =============
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');

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

  // Fetch exhibitor profile data
  const fetchExhibitorProfile = async () => {
    try {
      setLoading(true);
      setApiError(null);

      const result = await apiCall('/api/exhibitorDashboard/profile');

      console.log('Raw API response:', result);

      if (result.success) {
        const apiData = result.data;

        console.log('API Data contactPerson:', apiData.contactPerson);

        // Initialize contact person object
        let contactPersonObj = {
          name: '',
          jobTitle: '',
          email: '',
          phone: '',
          alternatePhone: ''
        };

        // Parse contact person data
        if (apiData.contactPerson) {
          if (typeof apiData.contactPerson === 'string') {
            try {
              contactPersonObj = JSON.parse(apiData.contactPerson);
            } catch (e) {
              console.error('Error parsing contact person:', e);
            }
          } else if (typeof apiData.contactPerson === 'object') {
            contactPersonObj = apiData.contactPerson;
          }
        }

        // Also check for direct fields if contactPerson is empty
        if (!contactPersonObj.name && apiData.name) {
          contactPersonObj.name = apiData.name;
        }
        if (!contactPersonObj.email && apiData.email) {
          contactPersonObj.email = apiData.email;
        }
        if (!contactPersonObj.phone && apiData.phone) {
          contactPersonObj.phone = apiData.phone;
        }
        if (!contactPersonObj.jobTitle && apiData.contact_job_title) {
          contactPersonObj.jobTitle = apiData.contact_job_title;
        }

        console.log('Parsed contact person:', contactPersonObj);

        // Parse name into title, first name, last name
        let title: 'Mr' | 'Mrs' | 'Ms' | 'Dr' | 'Prof' = 'Mr';
        let firstName = '';
        let lastName = '';

        if (contactPersonObj.name) {
          const fullName = contactPersonObj.name;
          console.log('Full name from contact person:', fullName);

          // Try to detect title
          if (fullName.includes('Dr.')) title = 'Dr';
          else if (fullName.includes('Prof.')) title = 'Prof';
          else if (fullName.includes('Mrs.')) title = 'Mrs';
          else if (fullName.includes('Ms.')) title = 'Ms';

          // Remove title from name if present
          let nameWithoutTitle = fullName
            .replace(/^(Dr\.|Prof\.|Mrs\.|Ms\.|Mr\.)\s*/i, '')
            .trim();

          const nameParts = nameWithoutTitle.split(' ');
          if (nameParts.length > 0) {
            firstName = nameParts[0] || '';
            lastName = nameParts.slice(1).join(' ') || '';
          }
        }

        // If we still don't have first name, try to use exhibitor name from company
        if (!firstName && apiData.name) {
          const nameParts = apiData.name.split(' ');
          firstName = nameParts[0] || '';
          lastName = nameParts.slice(1).join(' ') || '';
        }

        console.log('Parsed name - Title:', title, 'First:', firstName, 'Last:', lastName);

        // Update general info with ALL contact person details
        setGeneralInfo(prev => ({
          ...prev,
          title,
          firstName,
          lastName,
          designation: contactPersonObj.jobTitle || prev.designation || '',
          mobile: contactPersonObj.phone || apiData.phone || prev.mobile || '',
          email: contactPersonObj.email || apiData.email || prev.email || '',
          companyName: apiData.company || apiData.companyName || prev.companyName || '',
          businessNature: apiData.sector ?
            (typeof apiData.sector === 'string' ? apiData.sector.split(',')[0] : apiData.sector[0]) :
            prev.businessNature,
          gstNumber: apiData.registrationNumber || apiData.gstNumber || prev.gstNumber || ''
        }));

        // Parse address
        let addressObj = {
          street: '',
          city: '',
          state: '',
          country: '',
          countryCode: '',
          postalCode: ''
        };

        if (apiData.address) {
          if (typeof apiData.address === 'string') {
            const parts = apiData.address.split(',').map((p: string) => p.trim());
            addressObj = {
              street: parts[0] || '',
              city: parts[1] || '',
              state: parts[2] || '',
              country: parts[3] || '',
              countryCode: '',
              postalCode: parts[4] || ''
            };
          }
        }

        // Parse sector string back into array
        let sectorArray: string[] = [];
        if (apiData.sector) {
          if (typeof apiData.sector === 'string') {
            sectorArray = apiData.sector.split(',').map((s: string) => s.trim()).filter(Boolean);
          } else if (Array.isArray(apiData.sector)) {
            sectorArray = apiData.sector;
          }
        }

        // Parse exhibition JSON string
        let exhibitionObj = {
          pavilion: '',
          hall: '',
          standNumber: '',
          floorPlanUrl: ''
        };

        if (apiData.exhibition) {
          if (typeof apiData.exhibition === 'string') {
            try {
              exhibitionObj = JSON.parse(apiData.exhibition);
            } catch (e) {
              console.error('Error parsing exhibition:', e);
              exhibitionObj = {
                pavilion: apiData.pavilion || '',
                hall: apiData.hall || '',
                standNumber: apiData.boothNumber || apiData.booth_number || '',
                floorPlanUrl: apiData.floor_plan_url || ''
              };
            }
          } else if (typeof apiData.exhibition === 'object') {
            exhibitionObj = apiData.exhibition;
          }
        }

        // Parse stallDetails for booth info
        let boothSize = '';
        let boothType = '';
        let boothDimensions = '';
        let boothPrice = '';

        if (apiData.stallDetails) {
          const stallDetails = typeof apiData.stallDetails === 'string'
            ? JSON.parse(apiData.stallDetails)
            : apiData.stallDetails;

          boothSize = stallDetails.size || '';
          boothType = stallDetails.type || '';
          boothDimensions = stallDetails.dimensions || '';
          boothPrice = stallDetails.price || '';
        }

        // Update booth details with all contact info
        setBoothDetails(prev => ({
          ...prev,
          boothNo: exhibitionObj.standNumber || apiData.boothNumber || prev.boothNo,
          exhibitorName: contactPersonObj.name || `${title} ${firstName} ${lastName}`.trim() || prev.exhibitorName,
          sqMtrBooked: boothSize || prev.sqMtrBooked,
          organisation: apiData.company || apiData.companyName || prev.organisation,
          contactPerson: contactPersonObj.name || `${firstName} ${lastName}`.trim() || prev.contactPerson,
          designation: contactPersonObj.jobTitle || prev.designation,
          mobile: contactPersonObj.phone || apiData.phone || prev.mobile,
          email: contactPersonObj.email || apiData.email || prev.email
        }));

        // Update company details
        setCompanyDetails(prev => ({
          ...prev,
          companyName: apiData.company || apiData.companyName || prev.companyName,
          address: addressObj.street || prev.address,
          telephone: apiData.telephone || prev.telephone,
          mobile: contactPersonObj.phone || apiData.phone || prev.mobile,
          email: contactPersonObj.email || apiData.email || prev.email,
          website: apiData.website || prev.website,
          contactPerson: contactPersonObj.name || `${firstName} ${lastName}`.trim() || prev.contactPerson,
          designation: contactPersonObj.jobTitle || prev.designation,
          productsServices: sectorArray.join(', ') || prev.productsServices
        }));

        // Update first personnel entry
        setPersonnel(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[0] = {
              ...updated[0],
              name: contactPersonObj.name || `${firstName} ${lastName}`.trim() || updated[0].name,
              designation: contactPersonObj.jobTitle || updated[0].designation,
              organisation: apiData.company || apiData.companyName || updated[0].organisation
            };
          }
          return updated;
        });
      }
    } catch (error: any) {
      console.error('Error fetching exhibitor profile:', error);
      setApiError(error.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const loadAllData = async () => {
      await fetchExhibitorProfile();
    };

    loadAllData();
  }, []);

  // ============= AUTO-FILL EFFECT =============
  useEffect(() => {
    // Auto-update booth details when general info changes
    setBoothDetails(prev => ({
      ...prev,
      exhibitorName: prev.exhibitorName || `${generalInfo.title} ${generalInfo.firstName} ${generalInfo.lastName}`.trim(),
      organisation: prev.organisation || generalInfo.companyName,
      contactPerson: prev.contactPerson || `${generalInfo.firstName} ${generalInfo.lastName}`.trim(),
      mobile: prev.mobile || generalInfo.mobile,
      email: prev.email || generalInfo.email,
      designation: prev.designation || generalInfo.designation
    }));

    // Auto-update company details when general info changes
    setCompanyDetails(prev => ({
      ...prev,
      companyName: prev.companyName || generalInfo.companyName,
      mobile: prev.mobile || generalInfo.mobile,
      email: prev.email || generalInfo.email,
      contactPerson: prev.contactPerson || `${generalInfo.firstName} ${generalInfo.lastName}`.trim(),
      designation: prev.designation || generalInfo.designation
    }));

    // Auto-update first personnel entry
    setPersonnel(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[0] = {
          ...updated[0],
          name: updated[0].name || `${generalInfo.firstName} ${generalInfo.lastName}`.trim(),
          designation: updated[0].designation || generalInfo.designation,
          organisation: updated[0].organisation || generalInfo.companyName
        };
      }
      return updated;
    });

  }, [generalInfo]);

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

    // Subtotal (WITHOUT GST)
    const servicesTotal =
      furnitureTotal +
      hostessTotal +
      electricalTotal +
      compressedAirTotal +
      waterTotal +
      securityTotal +
      rentalTotal +
      housekeepingTotal;

    // GST @ 18%
    const gst = servicesTotal * 0.18;

    // Subtotal INCLUDING GST
    const subtotal = servicesTotal + gst;

    // Final Grand Total (Add Security Deposit)
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
    setGeneralInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleFurnitureQuantity = (index: number, quantity: number) => {
    const updated = [...furnitureItems];
    updated[index].quantity = quantity;
    updated[index].cost = quantity * updated[index].cost3Days;
    setFurnitureItems(updated);
  };

  const handleHostessChange = (index: number, field: string, value: number) => {
    const updated = [...hostessRequirements];
    updated[index] = { ...updated[index], [field]: value };
    const rate = updated[index].category === 'A' ? 5000 : 4000;
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

  const handleCompressedAirSelect = (option: any) => {
    const totalCost = option.costPerConnection + (option.powerKW * 3500);

    setCompressedAir({
      ...compressedAir,
      selected: option.cfmRange,
      cfmRange: option.cfmRange,
      costPerConnection: option.costPerConnection,
      qty: option.qty,
      powerKW: option.powerKW,
      totalCost
    });
  };

  const handleElectricalLoadChange = (type: 'temporary' | 'exhibition', value: string) => {
    const loadValue = parseFloat(value) || 0;
    const total = loadValue * 3500;

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

  const handleRentalQuantity = (itemKey: keyof RentalItems, quantity: number) => {
    setRentalItems(prev => {
      const updated = { ...prev };
      updated[itemKey].quantity = quantity;
      updated[itemKey].totalCost = quantity * updated[itemKey].costFor3Days;
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
      formData.append('Exhibitor Passes', JSON.stringify(personnel.filter(p => p.name)));
      formData.append('companyDetails', JSON.stringify(companyDetails));
      formData.append('electricalLoad', JSON.stringify(electricalLoad));
      formData.append('furnitureItems', JSON.stringify(furnitureItems.filter(f => f.quantity > 0)));
      formData.append('hostessRequirements', JSON.stringify(hostessRequirements));
      formData.append('compressedAir', JSON.stringify(compressedAir));
      formData.append('waterConnection', JSON.stringify(waterConnection));
      formData.append('securityGuard', JSON.stringify(securityGuard));
      formData.append('rentalItems', JSON.stringify(rentalItems));
      formData.append('housekeepingStaff', JSON.stringify(housekeepingStaff));
      formData.append('paymentDetails', JSON.stringify({ ...paymentDetails, uploadedReceipt: null }));

      if (paymentDetails.uploadedReceipt) {
        formData.append('receipt', paymentDetails.uploadedReceipt);
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Application submitted successfully');
      alert('Your exhibition registration has been submitted successfully!');

      window.location.href = '/dashboard/requirements/success';

    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Effects
  useEffect(() => {
    if (waterConnection.connections > 0) {
      const total = waterConnection.connections * waterConnection.costPerConnection;
      setWaterConnection(prev => ({ ...prev, totalCost: total }));
    } else {
      setWaterConnection(prev => ({ ...prev, totalCost: 0 }));
    }
  }, [waterConnection.connections]);

  useEffect(() => {
    if (securityGuard.quantity > 0 && securityGuard.noOfDays > 0) {
      const total = securityGuard.quantity * securityGuard.noOfDays * 2500;
      setSecurityGuard(prev => ({ ...prev, totalCost: total }));
    } else {
      setSecurityGuard(prev => ({ ...prev, totalCost: 0 }));
    }
  }, [securityGuard.quantity, securityGuard.noOfDays]);

  useEffect(() => {
    if (housekeepingStaff.quantity > 0 && housekeepingStaff.noOfDays > 0) {
      const total = housekeepingStaff.quantity * housekeepingStaff.noOfDays * housekeepingStaff.chargesPerShift;
      setHousekeepingStaff(prev => ({ ...prev, totalCost: total }));
    } else {
      setHousekeepingStaff(prev => ({ ...prev, totalCost: 0 }));
    }
  }, [housekeepingStaff.quantity, housekeepingStaff.noOfDays]);

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
          <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
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
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Basic Information</h2>
      </div>

      <div className="space-y-6">
        {/* Personal Details */}
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
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
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
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="First"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                value={generalInfo.lastName}
                onChange={(e) => handleGeneralInfoChange('lastName', e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Last"
              />
            </div>
            <div className="col-span-2 lg:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Designation</label>
              <input
                type="text"
                value={generalInfo.designation}
                onChange={(e) => handleGeneralInfoChange('designation', e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Manager"
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
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
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="98765 43210"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={generalInfo.email}
                  onChange={(e) => handleGeneralInfoChange('email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="name@company.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Details */}
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
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">GST</label>
              <input
                type="text"
                value={generalInfo.gstNumber}
                onChange={(e) => handleGeneralInfoChange('gstNumber', e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Nature of Business</label>
              <input
                type="text"
                value={generalInfo.businessNature}
                onChange={(e) => handleGeneralInfoChange('businessNature', e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Manufacturing, Trading, Services"
              />
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
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <BuildingOfficeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">REGISTRATION OF CONTRACTOR
          <br /> <span className='text-[#4D4D4D] font-semibold text-[15px]'>FOR BARE SPACE EXHIBITORS</span>
        </h2>
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
                onChange={(e) => setBoothDetails({ ...boothDetails, boothNo: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter booth number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exhibitor Name</label>
              <input
                type="text"
                value={boothDetails.exhibitorName}
                onChange={(e) => setBoothDetails({ ...boothDetails, exhibitorName: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-filled from basic info"
              />
              {!boothDetails.exhibitorName && generalInfo.firstName && (
                <p className="text-xs text-green-600 mt-1">✓ Auto-filled from basic info</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sq. Mtr Booked</label>
              <input
                type="text"
                value={boothDetails.sqMtrBooked}
                onChange={(e) => setBoothDetails({ ...boothDetails, sqMtrBooked: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter square meters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
              <input
                type="text"
                value={boothDetails.organisation}
                onChange={(e) => setBoothDetails({ ...boothDetails, organisation: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-filled from company name"
              />
              {!boothDetails.organisation && generalInfo.companyName && (
                <p className="text-xs text-green-600 mt-1">✓ Auto-filled from company name</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={boothDetails.contactPerson}
                onChange={(e) => setBoothDetails({ ...boothDetails, contactPerson: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-filled from name"
              />
              {!boothDetails.contactPerson && generalInfo.firstName && (
                <p className="text-xs text-green-600 mt-1">✓ Auto-filled from name</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                value={boothDetails.designation}
                onChange={(e) => setBoothDetails({ ...boothDetails, designation: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-filled from designation"
              />
              {!boothDetails.designation && generalInfo.designation && (
                <p className="text-xs text-green-600 mt-1">✓ Auto-filled from designation</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={boothDetails.mobile}
                onChange={(e) => setBoothDetails({ ...boothDetails, mobile: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-filled from contact"
              />
              {!boothDetails.mobile && generalInfo.mobile && (
                <p className="text-xs text-green-600 mt-1">✓ Auto-filled from contact</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
              <input
                type="email"
                value={boothDetails.email}
                onChange={(e) => setBoothDetails({ ...boothDetails, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-filled from contact"
              />
              {!boothDetails.email && generalInfo.email && (
                <p className="text-xs text-green-600 mt-1">✓ Auto-filled from contact</p>
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
      {/* Booth Fabrication Guidelines */}
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

      {/* Damage & Performance Bond */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Damage & Performance Bond
        </h3>

        <div className="bg-red-50 border border-red-100 rounded-xl p-5 space-y-4 text-sm text-gray-700 leading-relaxed">

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Payment:</span> Booth contractors must pay a Damage & Performance
              Bond via demand draft to the organizers, <span className="font-medium">“Maxx Business Media Pvt. Ltd.”</span>,
              upon registering at the exhibition site. The bond covers potential venue damages and
              disposal of booth construction waste. Any breach may result in forfeiture of the bond.
            </li>

            <li>
              <span className="font-semibold">Waste Removal:</span> Contractors are responsible for removing
              all packing and waste materials during move-in and move-out. Decoration waste must not be
              discarded into aisles. All materials must be safely removed. Non-compliance will result
              in forfeiture of the bond.
            </li>

            <li>
              <span className="font-semibold">Refund of Security Deposit:</span> The Security Deposit DD will
              be refunded upon presentation of the receipt after the exhibition, provided the site
              is cleared without damage or garbage recorded by the exhibition centre management.
            </li>

            <li>
              <span className="font-semibold">Deductions:</span> Organizers reserve the right to deduct amounts
              for damages caused during build-up, show days, or dismantling. Additional claims may be
              made if damages exceed the bond amount.
            </li>

            <li>
              <span className="font-semibold">Contractor Access:</span> Upon submission of the form and deposit,
              CONTRACTOR BANDS will be issued. Only individuals with CONTRACTOR BANDS will be granted access.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // ============= FORM 3: SECURITY DEPOSIT =============
  const renderSecurityDeposit = () => (
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
                <tr className="hover:bg-gray-100">
                  <td className="px-3 py-2 text-sm">1</td>
                  <td className="px-3 py-2 text-sm">0 - 36</td>
                  <td className="px-3 py-2 text-sm">₹25,000</td>
                  <td className="px-3 py-2 text-sm">USD 3</td>
                  <td className="px-3 py-2">
                    <input
                      type="radio"
                      name="securityDeposit"
                      checked={securityDeposit.boothSq === '0-36'}
                      onChange={() => setSecurityDeposit({ ...securityDeposit, boothSq: '0-36', amountINR: 25000, amountUSD: 3 })}
                      className="h-4 w-4 text-blue-600"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="px-3 py-2 text-sm">2</td>
                  <td className="px-3 py-2 text-sm">37 - 100</td>
                  <td className="px-3 py-2 text-sm">₹50,000</td>
                  <td className="px-3 py-2 text-sm">USD 6</td>
                  <td className="px-3 py-2">
                    <input
                      type="radio"
                      name="securityDeposit"
                      checked={securityDeposit.boothSq === '37-100'}
                      onChange={() => setSecurityDeposit({ ...securityDeposit, boothSq: '37-100', amountINR: 50000, amountUSD: 6 })}
                      className="h-4 w-4 text-blue-600"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="px-3 py-2 text-sm">3</td>
                  <td className="px-3 py-2 text-sm">101 and above</td>
                  <td className="px-3 py-2 text-sm">₹75,000</td>
                  <td className="px-3 py-2 text-sm">USD 9</td>
                  <td className="px-3 py-2">
                    <input
                      type="radio"
                      name="securityDeposit"
                      checked={securityDeposit.boothSq === '101+'}
                      onChange={() => setSecurityDeposit({ ...securityDeposit, boothSq: '101+', amountINR: 75000, amountUSD: 9 })}
                      className="h-4 w-4 text-blue-600"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Important Notes
          </h3>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-3">

              <li>
                The Security Deposit should be submitted only by <span className="font-semibold">Demand Draft</span>.
                No other mode of payment will be accepted.
              </li>

              <li>
                Refundable Security Deposit must be paid by Demand Draft in the name of
                <span className="font-semibold"> “Maxx Business Media Pvt. Ltd.”</span>.
              </li>

              <li>
                If the contractor fails to submit the Security Deposit by Demand Draft,
                booth possession will not be given. No cash will be accepted as Security Deposit.
                In exceptional cases, if cash is accepted, a service charge of
                <span className="font-semibold"> INR 5,000 / USD 63 + 18% GST </span>
                will be applicable and deducted from the Security Deposit.
              </li>

              <li>
                The Security Deposit must be paid by the <span className="font-semibold">booth contractor</span>
                and NOT the exhibitor, unless the exhibitor is undertaking their own stand fabrication.
              </li>

              <li>
                If the booth contractor fails to meet the deadline for final completion of booth
                building or dismantling, the complete Security Deposit will be
                <span className="font-semibold text-red-600"> fully forfeited </span>
                as penalty charges for non-completion on time.
              </li>

              <li>
                Kindly bring <span className="font-semibold">2 copies</span> of this form at the time of possession
                with authorized signature and company stamp.
              </li>

              <li>
                Submit the signed copy of this form while collecting your Security Deposit.
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // ============= FORM 4: MACHINES (OPTIONAL) =============
  const renderMachines = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg">
            <CubeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">
            NAME ON FASCIA
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
                    value={machine.width}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].width = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-24 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="W"
                  />
                </td>

                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="0"
                    value={machine.length}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].length = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-24 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="L"
                  />
                </td>

                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="0"
                    value={machine.height}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].height = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-24 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="H"
                  />
                </td>

                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="0"
                    value={machine.weight}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].weight = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-24 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
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
                    onChange={(e) => {
                      const updated = [...personnel];
                      updated[index].name = e.target.value;
                      setPersonnel(updated);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder={index === 0 ? "Auto-filled from basic info" : "Enter name"}
                  />
                  {index === 0 && !person.name && generalInfo.firstName && (
                    <p className="text-xs text-green-600 mt-1">✓ Auto-filled</p>
                  )}
                </td>

                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={person.designation}
                    onChange={(e) => {
                      const updated = [...personnel];
                      updated[index].designation = e.target.value;
                      setPersonnel(updated);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder={index === 0 ? "Auto-filled" : "Designation"}
                  />
                </td>

                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={person.organisation}
                    onChange={(e) => {
                      const updated = [...personnel];
                      updated[index].organisation = e.target.value;
                      setPersonnel(updated);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder={index === 0 ? "Auto-filled" : "Organisation"}
                  />
                </td>

                <td className="px-3 py-2">
                  {personnel.length > 1 && (
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
      <div className="flex items-center mb-6">
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

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={companyDetails.companyName}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                companyName: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Auto-filled from basic info"
          />
          {!companyDetails.companyName && generalInfo.companyName && (
            <p className="text-xs text-green-600 mt-1">✓ Auto-filled from basic info</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            value={companyDetails.address}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                address: e.target.value,
              })
            }
            rows={2}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter complete address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telephone
          </label>
          <input
            type="tel"
            value={companyDetails.telephone}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                telephone: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter telephone"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile
          </label>
          <input
            type="tel"
            value={companyDetails.mobile}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                mobile: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Auto-filled from contact"
          />
          {!companyDetails.mobile && generalInfo.mobile && (
            <p className="text-xs text-green-600 mt-1">✓ Auto-filled</p>
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
              setCompanyDetails({
                ...companyDetails,
                email: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Auto-filled from contact"
          />
          {!companyDetails.email && generalInfo.email && (
            <p className="text-xs text-green-600 mt-1">✓ Auto-filled</p>
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
              setCompanyDetails({
                ...companyDetails,
                website: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="www.example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <input
            type="text"
            value={companyDetails.contactPerson}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                contactPerson: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Auto-filled from name"
          />
          {!companyDetails.contactPerson && generalInfo.firstName && (
            <p className="text-xs text-green-600 mt-1">✓ Auto-filled</p>
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
              setCompanyDetails({
                ...companyDetails,
                designation: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Auto-filled from designation"
          />
          {!companyDetails.designation && generalInfo.designation && (
            <p className="text-xs text-green-600 mt-1">✓ Auto-filled</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Products / Services
          </label>
          <textarea
            value={companyDetails.productsServices}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                productsServices: e.target.value,
              })
            }
            rows={3}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter products or services to be displayed in the Exhibitor's Guide"
          />
        </div>
      </div>
      {/* Exhibitor Guide Information Notice */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
        <p>
          <span className="font-semibold">Maxx Business Media Pvt. Ltd.</span> will be publishing an
          <span className="font-semibold"> Exhibitor's Guide </span> for visitors of the Exhibition.
          This Guide will contain information about the Exhibitors, their products & services, and
          other relevant details.
        </p>
        <p className="mt-2">
          These Guides will be made available to the visitors for their reference.
          Kindly ensure that the information provided below is accurate and complete,
          as it will be used for publication.
        </p>
      </div>
    </div>
  );

  // ============= FORM 7: ELECTRICAL LOAD (OPTIONAL) =============
  const renderElectricalLoad = () => (
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
                <td className="px-3 py-2 text-sm">₹3,500/KW</td>
                <td className="px-3 py-2">
                  <input
                    type="number"
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
                <td className="px-3 py-2 text-sm">₹3,500/KW</td>
                <td className="px-3 py-2">
                  <input
                    type="number"
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

        {/* Important Notes & Electrical Rules */}
        <div className="mt-8 border-t border-gray-200 pt-6 space-y-6">

          {/* General Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold text-yellow-800 mb-2">Important Note:</p>
            <p>
              All prices are current and subject to change without prior notice.
              Electrical requirements can be serviced only if the order is placed
              on or before <span className="font-semibold">7th November 2025</span>.
              There is no provision for last-minute / onsite requests after
              7th November 2025.
            </p>
            <p className="mt-2">
              Orders are valid only when accompanied by full remittance along with
              <span className="font-semibold"> 18% GST</span>.
            </p>
          </div>

          {/* Rules Section */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold text-red-800 mb-3">Rules for Electrical Work</p>

            <p className="mb-3">
              Exhibitors are required to make payment for electrical work
              <span className="font-semibold"> 20 days before the show</span>,
              along with the form submission. The cheque or demand draft should be made payable to
              <span className="font-semibold"> "Maxx Business Media Pvt. Ltd."</span>
            </p>

            <ul className="list-decimal pl-5 space-y-2">
              <li>
                All exhibitors must hire a licensed electrical contractor to perform
                internal wiring within their stands and submit a photocopy of the
                contractor's license to the organizers.
              </li>

              <li>
                Only ISI-marked new materials must be used. Wires should be PVC copper
                insulated with a voltage rating of 1100 V.
              </li>

              <li>
                For lighting circuits, 3x2.5 sq mm PVC insulated copper wire must be used.
                For 16A power points, 3x4 sq mm PVC insulated copper wire is required.
              </li>

              <li>
                Wires must be safely routed through conduits or casing capping.
                No loose hanging wires are allowed. All terminations must use crimping lugs.
              </li>

              <li>
                LED lights must be used. If halogen lights are used,
                they must be equipped with a transformer.
              </li>

              <li>
                The load connected to the power point must be appropriate
                for the socket rating.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );

  // ============= FORM 8: FURNITURE (OPTIONAL) =============
  const renderFurniture = () => {
    const furnitureTotal = furnitureItems.reduce((sum, item) => sum + item.cost, 0);

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
                <tr key={item.code} className="hover:bg-gray-50">
                  <td className="px-2 py-1.5">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.description}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/furniture/placeholder.jpg';
                          }}
                        />
                      ) : (
                        <PhotoIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-1.5 text-xs font-mono text-blue-600">{item.code}</td>
                  <td className="px-2 py-1.5 text-xs">{item.description}</td>
                  <td className="px-2 py-1.5 text-xs">{item.size}</td>
                  <td className="px-2 py-1.5 text-xs">₹{item.cost3Days}</td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      min="0"
                      value={item.quantity || ''}
                      onChange={(e) => handleFurnitureQuantity(index, parseInt(e.target.value) || 0)}
                      className="w-16 border border-gray-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-2 py-1.5 text-xs font-semibold">₹{item.cost}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 sticky bottom-0">
              <tr>
                <td colSpan={6} className="px-2 py-2 text-right text-xs font-semibold">Total:</td>
                <td className="px-2 py-2 text-xs font-bold text-blue-600">₹{furnitureTotal.toLocaleString()}</td>
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
                    ₹{hostess.category === 'A' ? '5,000' : '4,000'}
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
                <td colSpan={4} className="px-3 py-2 text-right text-sm font-semibold">
                  Total:
                </td>
                <td className="px-3 py-2 text-sm font-bold text-blue-600">
                  ₹{hostessTotal.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Important Notes Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold text-yellow-800 mb-3">
              Please Note:
            </p>

            <ul className="list-decimal pl-5 space-y-2">
              <li>All prices are current and subject to change without prior notice.</li>
              <li>The working hour for service is 8 hrs./person/day.</li>
              <li>The duration of service is 10:00 - 18:00 hrs.</li>
              <li>On-site orders MUST be paid immediately via RTGS / UPI along with the order form.</li>
              <li>No refund for any cancellation once the order is placed.</li>
              <li>Temporary Staff must not be entrusted with handling of cash or valuables.</li>
              <li>Exhibitors will be responsible for the temporary staff in their stands during the show.</li>
              <li>Organiser will not be responsible for any damage caused by temporary staff.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // ============= FORM 10: COMPRESSED AIR (OPTIONAL) =============
  const renderCompressedAir = () => (
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
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cfmRange: 'Upto 10 cfm', costPerConnection: 15000, powerKW: 3 },
              { cfmRange: '10-20 cfm', costPerConnection: 25000, powerKW: 5 },
              { cfmRange: '20-30 cfm', costPerConnection: 40000, powerKW: 8 },
              { cfmRange: '30-40 cfm', costPerConnection: 50000, powerKW: 11 },
              { cfmRange: 'Above 40 cfm', costPerConnection: 75000, powerKW: 15 },
            ].map((option) => (
              <tr key={option.cfmRange} className="hover:bg-gray-50">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compressedAir.selected && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Selected: {compressedAir.cfmRange}</span>
            <span className="font-bold text-blue-700">₹{compressedAir.totalCost.toLocaleString()}</span>
          </div>
          <p className="text-xs text-blue-600 mt-2">Excluding GST (will be added in final summary)</p>
        </div>
      )}
    </div>
  );

  // ============= FORM 11: WATER CONNECTION (OPTIONAL) =============
  const renderWaterConnection = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Water Connection</h2>
      </div>

      <div className="max-w-md">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. of Connections</label>
            <input
              type="number"
              min="0"
              value={waterConnection.connections || ''}
              onChange={(e) => setWaterConnection({ ...waterConnection, connections: parseInt(e.target.value) || 0 })}
              className="w-24 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-sm">
            <p className="text-gray-600">Cost per connection: ₹15,000</p>
            <p className="font-semibold text-blue-600 mt-1">Total: ₹{waterConnection.totalCost.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Excluding GST (will be added in final summary)</p>
          </div>
        </div>
      </div>
    </div>
  );

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

          {/* Quantity */}
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

          {/* Days */}
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

        {/* Summary */}
        {securityGuard.quantity > 0 && securityGuard.noOfDays > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              Rate per guard per day: <span className="font-semibold">₹2,500</span>
            </p>

            <div className="mt-3 space-y-1 text-sm">
              <p>
                Total Cost: <span className="font-semibold">₹{securityGuard.totalCost.toLocaleString()}</span>
              </p>
              <p className="text-xs text-blue-600 mt-2">
                * GST @ 18% will be added in final summary
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );

  // ============= FORM 13: RENTAL ITEMS (AV & IT) (OPTIONAL) =============
  const renderRentalItems = () => {
    const rentalTotal = Object.values(rentalItems).reduce((sum, item) => sum + item.totalCost, 0);

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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description of Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cost for 3 Days</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(rentalItems).map(([key, item], index) => (
                <tr key={key} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{item.costFor3Days.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      value={item.quantity || ''}
                      onChange={(e) => handleRentalQuantity(key as keyof RentalItems, parseInt(e.target.value) || 0)}
                      className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">₹{item.totalCost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right text-sm font-bold text-gray-900">Total Rental Cost:</td>
                <td className="px-4 py-3 text-sm font-bold text-blue-600">₹{rentalTotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td colSpan={4} className="px-4 py-2 text-xs text-gray-500 italic">
                  * GST @ 18% will be applied to the total rental cost in the final summary
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  // ============= FORM 14: HOUSEKEEPING STAFF (OPTIONAL) =============
  const renderHousekeepingStaff = () => {
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Charges per Shift
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  No. of Staff
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  No. of Days
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Total Cost
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  Housekeeping
                </td>

                <td className="px-4 py-4 text-sm text-gray-900">
                  ₹{housekeepingStaff.chargesPerShift.toLocaleString()}
                </td>

                {/* Quantity */}
                <td className="px-4 py-4">
                  <input
                    type="number"
                    min="0"
                    value={housekeepingStaff.quantity || ""}
                    onChange={(e) =>
                      setHousekeepingStaff({
                        ...housekeepingStaff,
                        quantity: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </td>

                {/* Days */}
                <td className="px-4 py-4">
                  <input
                    type="number"
                    min="0"
                    value={housekeepingStaff.noOfDays || ""}
                    onChange={(e) =>
                      setHousekeepingStaff({
                        ...housekeepingStaff,
                        noOfDays: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </td>

                <td className="px-4 py-4 text-sm font-semibold text-blue-600">
                  ₹{housekeepingStaff.totalCost.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {housekeepingStaff.quantity > 0 && housekeepingStaff.noOfDays > 0 && (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              Subtotal: <span className="font-semibold text-blue-700">₹{housekeepingStaff.totalCost.toLocaleString()}</span>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              * GST @ 18% will be added in final summary
            </p>
          </div>
        )}
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
            {/* Basic Info Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-blue-600" />
                  Exhibitor
                </h3>
                <div className="space-y-1 text-xs">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {`${generalInfo.title || ""} ${generalInfo.firstName || ""} ${generalInfo.lastName || ""}`.trim() || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Company:</span>{" "}
                    {generalInfo.companyName || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {generalInfo.email || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Mobile:</span>{" "}
                    {generalInfo.mobile || "—"}
                  </p>

                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-blue-600" />
                  Booth Details
                </h3>

                <div className="space-y-1 text-xs">
                  <p>
                    <span className="font-medium">Booth No:</span>{" "}
                    {boothDetails.boothNo || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Size:</span>{" "}
                    {boothDetails.sqMtrBooked ? `${boothDetails.sqMtrBooked} sq.m` : "—"}
                  </p>

                  <p>
                    <span className="font-medium">Exhibitor Name:</span>{" "}
                    {boothDetails.exhibitorName || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Organisation:</span>{" "}
                    {boothDetails.organisation || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Contact Person:</span>{" "}
                    {boothDetails.contactPerson || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Designation:</span>{" "}
                    {boothDetails.designation || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Mobile:</span>{" "}
                    {boothDetails.mobile || "—"}
                  </p>

                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {boothDetails.email || "—"}
                  </p>
                </div>
              </div>

            </div>

            {/* Cost Summary */}
            <div className="bg-white border rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-800 px-4 py-2">
                <h3 className="text-sm font-semibold text-white">Cost Summary</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-xs">Furniture</td>
                    <td className="px-4 py-2 text-xs text-right">₹{totals.furniture.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs">Hostess</td>
                    <td className="px-4 py-2 text-xs text-right">₹{totals.hostess.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs">Electrical</td>
                    <td className="px-4 py-2 text-xs text-right">₹{totals.electrical.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs">Compressed Air</td>
                    <td className="px-4 py-2 text-xs text-right">₹{totals.compressedAir.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs">Water</td>
                    <td className="px-4 py-2 text-xs text-right">₹{totals.water.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs">Security Guard</td>
                    <td className="px-4 py-2 text-xs text-right">₹{totals.security.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="px-4 py-2 text-xs font-semibold">AV & IT Rentals</td>
                    <td className="px-4 py-2 text-xs font-semibold text-right">₹{totals.rental.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-4 py-2 text-xs font-semibold">Housekeeping Staff</td>
                    <td className="px-4 py-2 text-xs font-semibold text-right">₹{totals.housekeeping.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs">Services Total</td>
                    <td className="px-4 py-2 text-xs text-right">
                      ₹{totals.servicesTotal.toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-xs">GST (18%)</td>
                    <td className="px-4 py-2 text-xs text-right">
                      ₹{totals.gst.toLocaleString()}
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 text-xs font-semibold">
                      Subtotal (Including GST)
                    </td>
                    <td className="px-4 py-2 text-xs text-right">
                      ₹{totals.subtotal.toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-xs font-semibold">Security Deposit</td>
                    <td className="px-4 py-2 text-xs text-right">
                      ₹{totals.deposit.toLocaleString()}
                    </td>
                  </tr>

                  <tr className="bg-blue-50">
                    <td className="px-4 py-2 text-sm font-bold">Grand Total</td>
                    <td className="px-4 py-2 text-sm font-bold text-blue-700 text-right">
                      ₹{totals.total.toLocaleString()}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
            >
              Continue Editing
            </button>
            <button
              onClick={() => {
                setShowPreview(false);
                setShowPayment(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Proceed to Payment
            </button>
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
            <button
              onClick={() => setShowPayment(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
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
                <div className="text-gray-600">Account Name:</div>
                <div className="font-medium">Maxx Business Media Pvt. Ltd.</div>
                <div className="text-gray-600">Account No:</div>
                <div className="font-medium">272605000632</div>
                <div className="text-gray-600">IFSC:</div>
                <div className="font-medium">ICIC0002726</div>
                <div className="text-gray-600">Bank:</div>
                <div className="font-medium">ICICI Bank</div>
                <div className="text-gray-600">Branch:</div>
                <div className="font-medium">New Delhi</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Payment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Payment Mode</label>
                  <select
                    value={paymentDetails.paymentMode}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentMode: e.target.value as any })}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="RTGS">RTGS</option>
                    <option value="NEFT">NEFT</option>
                    <option value="IMPS">IMPS</option>
                    <option value="UPI">UPI</option>
                    <option value="Cheque">Cheque</option>
                    <option value="DD">DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Transaction ID / UTR</label>
                  <input
                    type="text"
                    value={paymentDetails.transactionId}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionId: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="UTR / Transaction ID"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Amount Paid</label>
                  <input
                    type="number"
                    value={paymentDetails.amount || ''}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Transaction Date</label>
                  <input
                    type="date"
                    value={paymentDetails.transactionDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionDate: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Upload Payment Receipt</label>
                  <input
                    type="file"
                    onChange={handlePaymentFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full border border-gray-200 rounded-lg p-1.5 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
              >
                Back
              </button>
              <button
                onClick={handleSubmitApplication}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Application'}
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
      <button
        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
        disabled={currentStep === 1}
        className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center text-sm"
      >
        <ChevronLeftIcon className="h-4 w-4 mr-1" />
        Previous
      </button>

      <div className="flex gap-3 w-full sm:w-auto">
        <button
          onClick={() => setShowPreview(true)}
          className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center text-sm"
        >
          <EyeIcon className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Preview & Totals</span>
          <span className="sm:hidden">Preview</span>
        </button>

        {/* Show Next button if not on last step */}
        {currentStep < totalSteps && (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm"
          >
            <span className="sm:hidden">Next</span>
            <span className="hidden sm:inline">Next</span>
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        )}

        {/* Show Submit button on last step */}
        {currentStep === totalSteps && (
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center text-sm font-semibold"
          >
            Review & Submit
          </button>
        )}
      </div>
    </div>
  );

  // ============= PROGRESS TRACKER =============
  const renderProgressTracker = () => (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-medium
                  ${currentStep > step.number ? 'bg-green-600 border-green-600 text-white' :
                    currentStep === step.number ? 'bg-blue-600 border-blue-600 text-white' :
                      'border-gray-300 bg-white text-gray-400'}
                `}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-6 h-0.5 mx-1 ${currentStep > step.number + 1 ? 'bg-green-600' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map(step => (
            <span key={step.number} className="text-xs text-gray-600">
              {step.name}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center text-blue-600"
          >
            <MenuIcon className="h-5 w-5 mr-2" />
            <span className="font-medium text-sm">
              Step {currentStep}: {steps[currentStep - 1]?.mobileName}
            </span>
          </button>
          <div className="text-sm text-gray-600">
            {currentStep} / {totalSteps}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => {
                  setCurrentStep(step.number);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  p-2 rounded-lg text-xs font-medium relative
                  ${currentStep === step.number
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'}
                `}
              >
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

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Exhibition Registration</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Complete all sections to register your participation. All sections are optional.
          </p>
        </div>

        {/* Progress Tracker */}
        {renderProgressTracker()}

        {/* Navigation - Top */}
        {renderNavigation()}

        {/* Render Forms Based on Current Step */}
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

        {/* Navigation - Bottom */}
        {renderNavigation()}

        {/* Modals */}
        {showPreview && renderPreviewModal()}
        {showPayment && renderPaymentModal()}
      </div>
    </div>
  );
}