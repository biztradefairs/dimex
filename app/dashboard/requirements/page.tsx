// app/dashboard/requirements/page.tsx
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
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { MenuIcon } from 'lucide-react';

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

interface LocationDetails {
  hallNo: string;
  boothNo: string;
  boothType: 'Shell Scheme' | 'Raw Space' | 'Island' | 'Corner' | 'Inline';
  boothSize: {
    length: string;
    width: string;
    area: string;
  };
  preferredLocation1: string;
  preferredLocation2: string;
  preferredLocation3: string;
  specialRequirements: string;
  access24x7: boolean;
  forkliftRequired: boolean;
  craneRequired: boolean;
  vehicleEntry: boolean;
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
  gst: number;
  grandTotal: number;
}

interface FurnitureItem {
  code: string;
  description: string;
  size: string;
  cost3Days: number;
  quantity: number;
  cost: number;
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
  gst: number;
  grandTotal: number;
}

interface WaterConnection {
  connections: number;
  costPerConnection: number;
  totalCost: number;
  gst: number;
  grandTotal: number;
}

interface SecurityGuard {
  noOfDays: number;
  totalCost: number;
  gst: number;
  grandTotal: number;
}

interface PaymentDetails {
  paymentMode: 'RTGS' | 'NEFT' | 'IMPS' | 'UPI' | 'Cheque' | 'DD' | 'Cash';
  bankName: string;
  transactionId: string;
  transactionDate: string;
  amount: number;
  uploadedReceipt: File | null;
}

// Furniture catalog
const furnitureCatalog: FurnitureItem[] = [
  { code: 'PI-01', description: 'Executive Chair', size: 'Black/red', cost3Days: 2000, quantity: 0, cost: 0 },
  { code: 'PI-02', description: 'VIP Sofa (1 Seater)', size: 'Black', cost3Days: 2000, quantity: 0, cost: 0 },
  { code: 'PI-03', description: 'VIP Sofa (2 Seater)', size: 'Black', cost3Days: 3500, quantity: 0, cost: 0 },
  { code: 'PI-04', description: 'Visitor Chair', size: 'Black', cost3Days: 800, quantity: 0, cost: 0 },
  { code: 'PI-05', description: 'Fibre Chair', size: 'Black', cost3Days: 400, quantity: 0, cost: 0 },
  { code: 'PI-07', description: 'Round Table (Wooden Top)', size: '70CM (dia) x 75CM (H)', cost3Days: 1500, quantity: 0, cost: 0 },
  { code: 'PI-08', description: 'Round Table Cross Leg (Glass Top)', size: '90CM (dia) x 75CM (H)', cost3Days: 2000, quantity: 0, cost: 0 },
  { code: 'PI-09', description: 'Bar Stool (Adjustable Chrome leg with Cup)', size: '50CM (H)', cost3Days: 2000, quantity: 0, cost: 0 },
  { code: 'PI-10', description: 'Glass Showcase (Big with 2 downlights)', size: '1M x 50CM x 2M (H)', cost3Days: 5000, quantity: 0, cost: 0 },
  { code: 'PI-11', description: 'Glass Showcase (Small)', size: '50CM X 50CM X 2M (H)', cost3Days: 4000, quantity: 0, cost: 0 },
  { code: 'PI-12', description: 'Glass Counter', size: '1M X 50CM X 1M (H)', cost3Days: 3500, quantity: 0, cost: 0 },
  { code: 'PI-13', description: 'Centre Table (Black Glass Top)', size: '1.20M (L) x 45CM (W)', cost3Days: 1500, quantity: 0, cost: 0 },
  { code: 'PI-14', description: 'Standing Discussion Table', size: '1.0M (H) x 70CM (Dia)', cost3Days: 1500, quantity: 0, cost: 0 },
  { code: 'PI-15', description: 'System Counter (Table)', size: '1.05M X 60CM X 75CM', cost3Days: 1500, quantity: 0, cost: 0 },
  { code: 'PI-16', description: 'Side Rack (Lockable)', size: '40CM X 1M X 60CM (H)', cost3Days: 3600, quantity: 0, cost: 0 },
  { code: 'PI-17', description: 'System Podium', size: '50CM X 50CM X 1M (H)', cost3Days: 1000, quantity: 0, cost: 0 },
  { code: 'PI-18', description: 'System Podium', size: '50CM X 50CM X 70CM (H)', cost3Days: 1000, quantity: 0, cost: 0 },
  { code: 'PI-19', description: 'System Podium', size: '50CM x 50CM x 50CM (H)', cost3Days: 1500, quantity: 0, cost: 0 },
  { code: 'PI-20', description: 'Brochure Rack', size: '', cost3Days: 1500, quantity: 0, cost: 0 },
  { code: 'PI-21', description: 'Round Table (White Top)', size: '80CM (dia) x 75CM (H)', cost3Days: 1500, quantity: 0, cost: 0 },
  { code: 'PI-22', description: 'Square Table', size: '1.2M X 45CM', cost3Days: 1200, quantity: 0, cost: 0 },
  { code: 'PI-23', description: 'Lockable Door', size: '', cost3Days: 4000, quantity: 0, cost: 0 },
  { code: 'PI-24', description: 'System Panel', size: '1M x 2.5M (H) - White', cost3Days: 1500, quantity: 0, cost: 0 },
  { code: 'PI-25', description: 'Glass Shelf (each)', size: '30CM x 1M', cost3Days: 1000, quantity: 0, cost: 0 },
  { code: 'PI-26', description: 'Wooden Shelf Flat / Adjustable (each)', size: '30CM x 1M', cost3Days: 750, quantity: 0, cost: 0 },
  { code: 'PI-27', description: 'Long Arm Halogen Light', size: '150W', cost3Days: 1000, quantity: 0, cost: 0 },
  { code: 'PI-28', description: 'Spot Lights', size: '75W', cost3Days: 750, quantity: 0, cost: 0 },
  { code: 'PI-29', description: 'Metal Halide', size: '150W', cost3Days: 2000, quantity: 0, cost: 0 },
  { code: 'PI-30', description: '5A/13A Power Socket', size: '', cost3Days: 500, quantity: 0, cost: 0 },
  { code: 'PI-31', description: 'Photo Clip / T-Bolt', size: '', cost3Days: 100, quantity: 0, cost: 0 },
  { code: 'PI-32', description: 'Waste Basket', size: '', cost3Days: 150, quantity: 0, cost: 0 },
];

export default function RequirementsPage() {
  // ============= FORM STATES =============
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form 1 - General Information (SIMPLIFIED)
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

  // Form 2 - Location Details
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({
    hallNo: '',
    boothNo: '',
    boothType: 'Shell Scheme',
    boothSize: { length: '', width: '', area: '' },
    preferredLocation1: '',
    preferredLocation2: '',
    preferredLocation3: '',
    specialRequirements: '',
    access24x7: false,
    forkliftRequired: false,
    craneRequired: false,
    vehicleEntry: false
  });

  // Form 3 - Booth Details
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

  // Form 4 - Security Deposit
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

  // Form 5 - Machine Display
  const [machines, setMachines] = useState<MachineDisplay[]>([
    { srNo: 1, machineName: '', width: '', length: '', height: '', weight: '' },
    { srNo: 2, machineName: '', width: '', length: '', height: '', weight: '' },
    { srNo: 3, machineName: '', width: '', length: '', height: '', weight: '' }
  ]);

  // Form 6 - Personnel
  const [personnel, setPersonnel] = useState<Personnel[]>([
    { srNo: 1, name: '', designation: '', organisation: '' },
    { srNo: 2, name: '', designation: '', organisation: '' },
    { srNo: 3, name: '', designation: '', organisation: '' }
  ]);

  // Form 7 - Company Details
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

  // Form 8 - Electrical Load
  const [electricalLoad, setElectricalLoad] = useState<ElectricalLoad>({
    temporaryLoad: '',
    exhibitionLoad: '',
    temporaryTotal: 0,
    exhibitionTotal: 0,
    gst: 0,
    grandTotal: 0
  });

  // Form 9 - Furniture
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>(furnitureCatalog);

  // Form 10 - Hostess
  const [hostessRequirements, setHostessRequirements] = useState<HostessRequirement[]>([
    { category: 'A', quantity: 0, noOfDays: 0, amount: 0 },
    { category: 'B', quantity: 0, noOfDays: 0, amount: 0 }
  ]);

  // Form 11 - Compressed Air
  const [compressedAir, setCompressedAir] = useState<CompressedAir>({
    selected: '',
    cfmRange: '',
    costPerConnection: 0,
    qty: 0,
    powerKW: 0,
    costPerKW: 3500,
    totalCost: 0,
    gst: 0,
    grandTotal: 0
  });

  // Form 12 - Water Connection
  const [waterConnection, setWaterConnection] = useState<WaterConnection>({
    connections: 0,
    costPerConnection: 15000,
    totalCost: 0,
    gst: 0,
    grandTotal: 0
  });

  // Form 13 - Security Guard
  const [securityGuard, setSecurityGuard] = useState<SecurityGuard>({
    noOfDays: 0,
    totalCost: 0,
    gst: 0,
    grandTotal: 0
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

  // ============= CALCULATIONS =============
  
  const calculateTotals = () => {
    const furnitureTotal = furnitureItems.reduce((sum, item) => sum + item.cost, 0);
    const hostessTotal = hostessRequirements.reduce((sum, h) => sum + h.amount, 0);
    const electricalTotal = (parseFloat(electricalLoad.temporaryLoad || '0') * 3500) + 
                          (parseFloat(electricalLoad.exhibitionLoad || '0') * 3500);
    const compressedAirTotal = compressedAir.grandTotal || 0;
    const waterTotal = waterConnection.grandTotal || 0;
    const securityTotal = securityGuard.grandTotal || 0;
    const depositAmount = securityDeposit.amountINR || 0;

    return {
      furniture: furnitureTotal,
      hostess: hostessTotal,
      electrical: electricalTotal,
      compressedAir: compressedAirTotal,
      water: waterTotal,
      security: securityTotal,
      deposit: depositAmount,
      subtotal: furnitureTotal + hostessTotal + electricalTotal + compressedAirTotal + waterTotal + securityTotal,
      total: furnitureTotal + hostessTotal + electricalTotal + compressedAirTotal + waterTotal + securityTotal + depositAmount
    };
  };

  // ============= HANDLERS =============
  
  const handleGeneralInfoChange = (field: keyof GeneralInfo, value: any) => {
    setGeneralInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (field: keyof LocationDetails, value: any) => {
    if (field === 'boothSize') {
      const updatedSize = { ...locationDetails.boothSize, ...value };
      let area = '';
      if (updatedSize.length && updatedSize.width) {
        const areaValue = parseFloat(updatedSize.length) * parseFloat(updatedSize.width);
        area = areaValue.toFixed(2);
      }
      setLocationDetails(prev => ({
        ...prev,
        boothSize: { ...updatedSize, area }
      }));
    } else {
      setLocationDetails(prev => ({ ...prev, [field]: value }));
    }
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

  const handleCompressedAirSelect = (option: any) => {
    const totalCost = option.costPerConnection + (option.powerKW * 3500);
    const gst = totalCost * 0.18;
    const grandTotal = totalCost + gst;
    
    setCompressedAir({
      ...compressedAir,
      selected: option.cfmRange,
      cfmRange: option.cfmRange,
      costPerConnection: option.costPerConnection,
      qty: option.qty,
      powerKW: option.powerKW,
      totalCost,
      gst,
      grandTotal
    });
  };

  const handleElectricalLoadChange = (type: 'temporary' | 'exhibition', value: string) => {
    const loadValue = parseFloat(value) || 0;
    const total = loadValue * 3500;
    
    if (type === 'temporary') {
      const newTemporaryTotal = total;
      const newGrandTotal = newTemporaryTotal + (parseFloat(electricalLoad.exhibitionLoad || '0') * 3500);
      setElectricalLoad(prev => ({
        ...prev,
        temporaryLoad: value,
        temporaryTotal: newTemporaryTotal,
        grandTotal: newGrandTotal + (newGrandTotal * 0.18)
      }));
    } else {
      const newExhibitionTotal = total;
      const newGrandTotal = (parseFloat(electricalLoad.temporaryLoad || '0') * 3500) + newExhibitionTotal;
      setElectricalLoad(prev => ({
        ...prev,
        exhibitionLoad: value,
        exhibitionTotal: newExhibitionTotal,
        grandTotal: newGrandTotal + (newGrandTotal * 0.18)
      }));
    }
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
      formData.append('locationDetails', JSON.stringify(locationDetails));
      formData.append('boothDetails', JSON.stringify(boothDetails));
      formData.append('securityDeposit', JSON.stringify(securityDeposit));
      formData.append('machines', JSON.stringify(machines.filter(m => m.machineName)));
      formData.append('personnel', JSON.stringify(personnel.filter(p => p.name)));
      formData.append('companyDetails', JSON.stringify(companyDetails));
      formData.append('electricalLoad', JSON.stringify(electricalLoad));
      formData.append('furnitureItems', JSON.stringify(furnitureItems.filter(f => f.quantity > 0)));
      formData.append('hostessRequirements', JSON.stringify(hostessRequirements));
      formData.append('compressedAir', JSON.stringify(compressedAir));
      formData.append('waterConnection', JSON.stringify(waterConnection));
      formData.append('securityGuard', JSON.stringify(securityGuard));
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
      const gst = total * 0.18;
      const grandTotal = total + gst;
      setWaterConnection(prev => ({ ...prev, totalCost: total, gst, grandTotal }));
    }
  }, [waterConnection.connections]);

  useEffect(() => {
    if (securityGuard.noOfDays > 0) {
      const total = securityGuard.noOfDays * 2500;
      const gst = total * 0.18;
      const grandTotal = total + gst;
      setSecurityGuard(prev => ({ ...prev, totalCost: total, gst, grandTotal }));
    }
  }, [securityGuard.noOfDays]);

  // ============= RENDER FUNCTIONS =============

  const steps = [
    { number: 1, name: 'Basic Info', icon: UserIcon, mobileName: 'Basic' },
    { number: 2, name: 'Location', icon: MapPinIcon, mobileName: 'Loc' },
    { number: 3, name: 'Booth', icon: BuildingOfficeIcon, mobileName: 'Booth' },
    { number: 4, name: 'Security', icon: BanknotesIcon, mobileName: 'Deposit' },
    { number: 5, name: 'Machines', icon: CubeIcon, mobileName: 'Mach' },
    { number: 6, name: 'Personnel', icon: UserIcon, mobileName: 'Staff' },
    { number: 7, name: 'Company', icon: BuildingOfficeIcon, mobileName: 'Co' },
    { number: 8, name: 'Electrical', icon: BoltIcon, mobileName: 'Elec' },
    { number: 9, name: 'Furniture', icon: ComputerDesktopIcon, mobileName: 'Furn' },
    { number: 10, name: 'Hostess', icon: SparklesIcon, mobileName: 'Host' },
    { number: 11, name: 'Air', icon: WrenchScrewdriverIcon, mobileName: 'Air' },
    { number: 12, name: 'Water', icon: TruckIcon, mobileName: 'Water' },
    { number: 13, name: 'Security', icon: ShieldCheckIcon, mobileName: 'Guard' }
  ];

  const totalSteps = steps.length;

  // ============= FORM 1: SIMPLIFIED GENERAL INFO =============
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
                onChange={(e) => handleGeneralInfoChange('title', e.target.value)}
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
              <label className="block text-xs font-medium text-gray-600 mb-1">GST (Optional)</label>
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
          * Additional company details can be filled in the Company section (Step 7)
        </p>
      </div>
    </div>
  );

  // ============= FORM 2: LOCATION DETAILS =============
  const renderLocationDetails = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Location Details</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hall No.</label>
            <input
              type="text"
              value={locationDetails.hallNo}
              onChange={(e) => handleLocationChange('hallNo', e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hall number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booth No.</label>
            <input
              type="text"
              value={locationDetails.boothNo}
              onChange={(e) => handleLocationChange('boothNo', e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter booth number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booth Type</label>
            <select
              value={locationDetails.boothType}
              onChange={(e) => handleLocationChange('boothType', e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Shell Scheme">Shell Scheme</option>
              <option value="Raw Space">Raw Space</option>
              <option value="Island">Island</option>
              <option value="Corner">Corner</option>
              <option value="Inline">Inline</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Booth Size (in meters)</label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <input
                type="number"
                value={locationDetails.boothSize.length}
                onChange={(e) => handleLocationChange('boothSize', { length: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Length"
              />
            </div>
            <div>
              <input
                type="number"
                value={locationDetails.boothSize.width}
                onChange={(e) => handleLocationChange('boothSize', { width: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Width"
              />
            </div>
            <div>
              <input
                type="text"
                value={locationDetails.boothSize.area}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50"
                placeholder="Area (sq.m)"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location 1</label>
            <input
              type="text"
              value={locationDetails.preferredLocation1}
              onChange={(e) => handleLocationChange('preferredLocation1', e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location 2</label>
            <input
              type="text"
              value={locationDetails.preferredLocation2}
              onChange={(e) => handleLocationChange('preferredLocation2', e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
          <textarea
            value={locationDetails.specialRequirements}
            onChange={(e) => handleLocationChange('specialRequirements', e.target.value)}
            rows={2}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Any special requirements..."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={locationDetails.access24x7}
              onChange={(e) => handleLocationChange('access24x7', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">24x7 Access</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={locationDetails.forkliftRequired}
              onChange={(e) => handleLocationChange('forkliftRequired', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Forklift</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={locationDetails.craneRequired}
              onChange={(e) => handleLocationChange('craneRequired', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Crane</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={locationDetails.vehicleEntry}
              onChange={(e) => handleLocationChange('vehicleEntry', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Vehicle</span>
          </label>
        </div>
      </div>
    </div>
  );

  // ============= FORM 3: BOOTH & CONTRACTOR DETAILS =============
  const renderBoothDetails = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <BuildingOfficeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Booth & Contractor Details</h2>
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
                onChange={(e) => setBoothDetails({...boothDetails, boothNo: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter booth number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exhibitor Name</label>
              <input
                type="text"
                value={boothDetails.exhibitorName}
                onChange={(e) => setBoothDetails({...boothDetails, exhibitorName: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter exhibitor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sq. Mtr Booked</label>
              <input
                type="text"
                value={boothDetails.sqMtrBooked}
                onChange={(e) => setBoothDetails({...boothDetails, sqMtrBooked: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter square meters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
              <input
                type="text"
                value={boothDetails.organisation}
                onChange={(e) => setBoothDetails({...boothDetails, organisation: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter organisation name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={boothDetails.contactPerson}
                onChange={(e) => setBoothDetails({...boothDetails, contactPerson: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact person name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                value={boothDetails.designation}
                onChange={(e) => setBoothDetails({...boothDetails, designation: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter designation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={boothDetails.mobile}
                onChange={(e) => setBoothDetails({...boothDetails, mobile: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
              <input
                type="email"
                value={boothDetails.email}
                onChange={(e) => setBoothDetails({...boothDetails, email: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
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
                onChange={(e) => setBoothDetails({...boothDetails, contractorCompany: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contractor company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Person</label>
              <input
                type="text"
                value={boothDetails.contractorPerson}
                onChange={(e) => setBoothDetails({...boothDetails, contractorPerson: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contractor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Mobile</label>
              <input
                type="tel"
                value={boothDetails.contractorMobile}
                onChange={(e) => setBoothDetails({...boothDetails, contractorMobile: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contractor mobile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Email</label>
              <input
                type="email"
                value={boothDetails.contractorEmail}
                onChange={(e) => setBoothDetails({...boothDetails, contractorEmail: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contractor email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor GST</label>
              <input
                type="text"
                value={boothDetails.contractorGST}
                onChange={(e) => setBoothDetails({...boothDetails, contractorGST: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter GST number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor PAN</label>
              <input
                type="text"
                value={boothDetails.contractorPAN}
                onChange={(e) => setBoothDetails({...boothDetails, contractorPAN: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter PAN number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============= FORM 4: SECURITY DEPOSIT =============
  const renderSecurityDeposit = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <BanknotesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Security Deposit</h2>
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
                      onChange={() => setSecurityDeposit({...securityDeposit, boothSq: '0-36', amountINR: 25000, amountUSD: 3})}
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
                      onChange={() => setSecurityDeposit({...securityDeposit, boothSq: '37-100', amountINR: 50000, amountUSD: 6})}
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
                      onChange={() => setSecurityDeposit({...securityDeposit, boothSq: '101+', amountINR: 75000, amountUSD: 9})}
                      className="h-4 w-4 text-blue-600"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Demand Draft Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DD No.</label>
              <input
                type="text"
                value={securityDeposit.ddNo}
                onChange={(e) => setSecurityDeposit({...securityDeposit, ddNo: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter DD number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={securityDeposit.bankName}
                onChange={(e) => setSecurityDeposit({...securityDeposit, bankName: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <input
                type="text"
                value={securityDeposit.branch}
                onChange={(e) => setSecurityDeposit({...securityDeposit, branch: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter branch name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dated</label>
              <input
                type="date"
                value={securityDeposit.dated}
                onChange={(e) => setSecurityDeposit({...securityDeposit, dated: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount in words</label>
              <input
                type="text"
                value={securityDeposit.amountWords}
                onChange={(e) => setSecurityDeposit({...securityDeposit, amountWords: e.target.value})}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount in words"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============= FORM 5: MACHINES =============
  const renderMachines = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <CubeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Machines to be Displayed</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sr.</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Machine Name</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">W</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">L</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">H</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {machines.map((machine, index) => (
              <tr key={machine.srNo}>
                <td className="px-2 py-2 text-sm text-gray-900">{machine.srNo}</td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={machine.machineName}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].machineName = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="Machine name"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={machine.width}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].width = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-16 border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="W"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={machine.length}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].length = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-16 border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="L"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={machine.height}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].height = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-16 border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="H"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={machine.weight}
                    onChange={(e) => {
                      const updated = [...machines];
                      updated[index].weight = e.target.value;
                      setMachines(updated);
                    }}
                    className="w-16 border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="Tons"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-4">* Add additional rows in Company Details section</p>
    </div>
  );

  // ============= FORM 6: PERSONNEL =============
  const renderPersonnel = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Personnel Details</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sr.</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Organisation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {personnel.map((person, index) => (
              <tr key={person.srNo}>
                <td className="px-2 py-2 text-sm text-gray-900">{person.srNo}</td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) => {
                      const updated = [...personnel];
                      updated[index].name = e.target.value;
                      setPersonnel(updated);
                    }}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="Name"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={person.designation}
                    onChange={(e) => {
                      const updated = [...personnel];
                      updated[index].designation = e.target.value;
                      setPersonnel(updated);
                    }}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="Designation"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={person.organisation}
                    onChange={(e) => {
                      const updated = [...personnel];
                      updated[index].organisation = e.target.value;
                      setPersonnel(updated);
                    }}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    placeholder="Organisation"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ============= FORM 7: COMPANY DETAILS =============
  const renderCompanyDetails = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <BuildingOfficeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Company Details</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            value={companyDetails.companyName}
            onChange={(e) => setCompanyDetails({...companyDetails, companyName: e.target.value})}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={companyDetails.address}
            onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
            rows={2}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter complete address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
          <input
            type="tel"
            value={companyDetails.telephone}
            onChange={(e) => setCompanyDetails({...companyDetails, telephone: e.target.value})}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter telephone"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
          <input
            type="tel"
            value={companyDetails.mobile}
            onChange={(e) => setCompanyDetails({...companyDetails, mobile: e.target.value})}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter mobile"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={companyDetails.email}
            onChange={(e) => setCompanyDetails({...companyDetails, email: e.target.value})}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            type="url"
            value={companyDetails.website}
            onChange={(e) => setCompanyDetails({...companyDetails, website: e.target.value})}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="www.example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
          <input
            type="text"
            value={companyDetails.contactPerson}
            onChange={(e) => setCompanyDetails({...companyDetails, contactPerson: e.target.value})}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact person"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
          <input
            type="text"
            value={companyDetails.designation}
            onChange={(e) => setCompanyDetails({...companyDetails, designation: e.target.value})}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter designation"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Products/Services</label>
          <textarea
            value={companyDetails.productsServices}
            onChange={(e) => setCompanyDetails({...companyDetails, productsServices: e.target.value})}
            rows={3}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter products or services to be displayed"
          />
        </div>
      </div>
    </div>
  );

  // ============= FORM 8: ELECTRICAL LOAD =============
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
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">GST</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Load (KW)</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 text-sm">Temporary (18-19 Nov)</td>
                <td className="px-3 py-2 text-sm">₹3,500/KW</td>
                <td className="px-3 py-2">
                  <input type="checkbox" className="h-4 w-4 text-blue-600" />
                </td>
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
                  <input type="checkbox" className="h-4 w-4 text-blue-600" />
                </td>
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

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-semibold text-blue-800">Bank Transfer Details:</p>
          <p className="text-xs text-blue-700 mt-1">Account: Maxx Business Media Pvt. Ltd.</p>
          <p className="text-xs text-blue-700">A/C No: 272605000632, IFSC: ICIC0002726</p>
        </div>
      </div>
    </div>
  );

  // ============= FORM 9: FURNITURE =============
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
                <td colSpan={5} className="px-2 py-2 text-right text-xs font-semibold">Total:</td>
                <td className="px-2 py-2 text-xs font-bold text-blue-600">₹{furnitureTotal.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  // ============= FORM 10: HOSTESS =============
  const renderHostess = () => {
    const hostessTotal = hostessRequirements.reduce((sum, h) => sum + h.amount, 0);
    
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Temporary Staff / Hostess</h2>
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
                  <td className="px-3 py-2 text-sm">₹{hostess.category === 'A' ? '5,000' : '4,000'}</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={hostess.quantity || ''}
                      onChange={(e) => handleHostessChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-16 border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={hostess.noOfDays || ''}
                      onChange={(e) => handleHostessChange(index, 'noOfDays', parseInt(e.target.value) || 0)}
                      className="w-16 border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-3 py-2 text-sm font-semibold">₹{hostess.amount.toLocaleString()}</td>
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
      </div>
    );
  };

  // ============= FORM 11: COMPRESSED AIR =============
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
            <span className="font-bold text-blue-700">₹{compressedAir.grandTotal.toLocaleString()}</span>
          </div>
          <p className="text-xs text-blue-600 mt-2">Including 18% GST</p>
        </div>
      )}
    </div>
  );

  // ============= FORM 12: WATER CONNECTION =============
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
              onChange={(e) => setWaterConnection({...waterConnection, connections: parseInt(e.target.value) || 0})}
              className="w-24 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-sm">
            <p className="text-gray-600">Cost per connection: ₹15,000</p>
            <p className="font-semibold text-blue-600 mt-1">Total: ₹{waterConnection.grandTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ============= FORM 13: SECURITY GUARD =============
  const renderSecurityGuard = () => (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">Security Guard</h2>
      </div>

      <div className="max-w-md">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. of Days</label>
            <input
              type="number"
              min="0"
              value={securityGuard.noOfDays || ''}
              onChange={(e) => setSecurityGuard({...securityGuard, noOfDays: parseInt(e.target.value) || 0})}
              className="w-24 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-sm">
            <p className="text-gray-600">Rate per day: ₹2,500</p>
            <p className="font-semibold text-blue-600 mt-1">Total: ₹{securityGuard.grandTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );

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
                  <p><span className="font-medium">Name:</span> {generalInfo.title} {generalInfo.firstName} {generalInfo.lastName}</p>
                  <p><span className="font-medium">Company:</span> {generalInfo.companyName}</p>
                  <p><span className="font-medium">Email:</span> {generalInfo.email}</p>
                  <p><span className="font-medium">Mobile:</span> {generalInfo.mobile}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-blue-600" />
                  Location
                </h3>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Booth:</span> {locationDetails.boothNo || boothDetails.boothNo}</p>
                  <p><span className="font-medium">Hall:</span> {locationDetails.hallNo}</p>
                  <p><span className="font-medium">Size:</span> {locationDetails.boothSize.area || boothDetails.sqMtrBooked} sq.m</p>
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
                    <td className="px-4 py-2 text-xs">Security Deposit</td>
                    <td className="px-4 py-2 text-xs text-right">₹{totals.deposit.toLocaleString()}</td>
                  </tr>
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
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 text-xs font-semibold">Grand Total</td>
                    <td className="px-4 py-2 text-xs font-bold text-blue-600 text-right">₹{totals.total.toLocaleString()}</td>
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
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Bank Transfer</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-600">Account Name:</div>
                <div className="font-medium">Maxx Business Media Pvt. Ltd.</div>
                <div className="text-gray-600">Account No:</div>
                <div className="font-medium">272605000632</div>
                <div className="text-gray-600">IFSC:</div>
                <div className="font-medium">ICIC0002726</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Payment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Payment Mode</label>
                  <select
                    value={paymentDetails.paymentMode}
                    onChange={(e) => setPaymentDetails({...paymentDetails, paymentMode: e.target.value as any})}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="RTGS">RTGS</option>
                    <option value="NEFT">NEFT</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Transaction ID</label>
                  <input
                    type="text"
                    value={paymentDetails.transactionId}
                    onChange={(e) => setPaymentDetails({...paymentDetails, transactionId: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="UTR / Transaction ID"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Amount Paid</label>
                  <input
                    type="number"
                    value={paymentDetails.amount || ''}
                    onChange={(e) => setPaymentDetails({...paymentDetails, amount: parseFloat(e.target.value) || 0})}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Upload Receipt</label>
                  <input
                    type="file"
                    onChange={handlePaymentFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full border border-gray-200 rounded-lg p-1.5 text-sm"
                  />
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
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold disabled:opacity-50"
              >
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
        <button
          onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
          disabled={currentStep === totalSteps}
          className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center text-sm"
        >
          <span className="sm:hidden">Next</span>
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </button>
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
            <span key={step.number} className="text-xs text-gray-600">{step.name}</span>
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
            <span className="font-medium text-sm">Step {currentStep}: {steps[currentStep-1]?.mobileName}</span>
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
                  p-2 rounded-lg text-xs font-medium
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
          <p className="mt-1 text-sm sm:text-base text-gray-600">Complete all sections to register your participation</p>
        </div>

        {/* Progress Tracker */}
        {renderProgressTracker()}

        {/* Navigation - Top */}
        {renderNavigation()}

        {/* Render Forms Based on Current Step */}
        <div className="mt-4">
          {currentStep === 1 && renderGeneralInfo()}
          {currentStep === 2 && renderLocationDetails()}
          {currentStep === 3 && renderBoothDetails()}
          {currentStep === 4 && renderSecurityDeposit()}
          {currentStep === 5 && renderMachines()}
          {currentStep === 6 && renderPersonnel()}
          {currentStep === 7 && renderCompanyDetails()}
          {currentStep === 8 && renderElectricalLoad()}
          {currentStep === 9 && renderFurniture()}
          {currentStep === 10 && renderHostess()}
          {currentStep === 11 && renderCompressedAir()}
          {currentStep === 12 && renderWaterConnection()}
          {currentStep === 13 && renderSecurityGuard()}
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