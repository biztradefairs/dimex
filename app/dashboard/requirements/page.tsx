// app/dashboard/requirements/page.tsx
'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  UserIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

// Define TypeScript interfaces
interface GeneralInfo {
  name: string;
  company: string;
  jobTitle: string;
  department: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  alternatePhone?: string;
}

interface LocationInfo {
  eventHall: string;
  boothNumber: string;
  floorPlanNotes?: string;
}

interface Requirement {
  id: string;
  type: string;
  description: string;
  quantity: number;
  status: 'approved' | 'pending' | 'rejected';
  cost: number;
  furnitureCode?: string;
  layoutType?: string;
  date?: string;
}

interface NewRequirementForm {
  type: string;
  description: string;
  furnitureCode: string;
  quantity: number;
  layoutType: string;
  date: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface OrderConfirmation {
  orderId: string;
  transactionId: string;
  paymentDate: string;
  totalAmount: number;
  taxAmount: number;
  grandTotal: number;
  status: 'confirmed' | 'processing' | 'completed';
}

// Sample data
const furnitureCodes = [
  { code: 'CHAIR-001', name: 'Conference Chair Executive', price: 2500 },
  { code: 'CHAIR-002', name: 'Banquet Chair Premium', price: 1800 },
  { code: 'CHAIR-003', name: 'Folding Chair Standard', price: 600 },
  { code: 'TABLE-001', name: 'Round Table (6ft)', price: 3500 },
  { code: 'TABLE-002', name: 'Rectangular Table (8ft)', price: 4200 },
  { code: 'SOFA-001', name: '3-Seater Sofa Luxury', price: 25000 },
  { code: 'SOFA-002', name: 'Modular Sectional Set', price: 45000 },
];

const layoutOptions = [
  { id: 'conference', name: 'Conference Style' },
  { id: 'classroom', name: 'Classroom Style' },
  { id: 'theater', name: 'Theater Style' },
  { id: 'u-shape', name: 'U-Shape' },
  { id: 'banquet', name: 'Banquet Style' },
  { id: 'exhibition', name: 'Exhibition Stall' },
];

const eventHalls = [
  { id: 'hall-a', name: 'Hall A - Main Exhibition' },
  { id: 'hall-b', name: 'Hall B - Conference Area' },
  { id: 'hall-c', name: 'Hall C - Startup Pavilion' },
  { id: 'hall-d', name: 'Hall D - VIP Lounge' },
];

const initialRequirements: Requirement[] = [
  {
    id: 'REQ001',
    type: 'electrical',
    description: 'Additional power outlet (220V)',
    quantity: 2,
    status: 'approved',
    cost: 150
  },
  {
    id: 'REQ002',
    type: 'furniture',
    description: 'Extra chairs',
    quantity: 4,
    status: 'pending',
    cost: 80,
    furnitureCode: 'CHAIR-001'
  },
  {
    id: 'REQ003',
    type: 'display',
    description: 'TV monitor (55")',
    quantity: 1,
    status: 'pending',
    cost: 200
  }
];

type Step = 'general' | 'contact' | 'location' | 'requirements' | 'review' | 'payment' | 'confirmation';

export default function RequirementsPage() {
  const [currentStep, setCurrentStep] = useState<Step>('general');
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('furniture');
  const [orderConfirmed, setOrderConfirmed] = useState<OrderConfirmation | null>(null);
  
  // Form states
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    name: '',
    company: '',
    jobTitle: '',
    department: ''
  });
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '',
    email: '',
    alternatePhone: ''
  });
  
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    eventHall: '',
    boothNumber: '',
    floorPlanNotes: ''
  });
  
  const [newRequirement, setNewRequirement] = useState<NewRequirementForm>({
    type: 'furniture',
    description: '',
    furnitureCode: '',
    quantity: 1,
    layoutType: 'conference',
    date: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const steps: { id: Step; name: string; icon: any }[] = [
    { id: 'general', name: 'General Info', icon: UserIcon },
    { id: 'contact', name: 'Contact Info', icon: PhoneIcon },
    { id: 'location', name: 'Location', icon: MapPinIcon },
    { id: 'requirements', name: 'Requirements', icon: PlusIcon },
    { id: 'review', name: 'Review', icon: DocumentCheckIcon },
    { id: 'payment', name: 'Payment', icon: CreditCardIcon },
  ];

  const isStepValid = (step: Step): boolean => {
    switch (step) {
      case 'general':
        return !!(generalInfo.name && generalInfo.company && generalInfo.jobTitle && generalInfo.department);
      case 'contact':
        return !!(contactInfo.phone && contactInfo.email);
      case 'location':
        return !!(locationInfo.eventHall && locationInfo.boothNumber);
      case 'requirements':
        return requirements.length > 0;
      case 'review':
        return true;
      case 'payment':
        return !!(paymentInfo.cardNumber && paymentInfo.cardName && paymentInfo.expiryDate && paymentInfo.cvv);
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    const stepOrder: Step[] = ['general', 'contact', 'location', 'requirements', 'review', 'payment'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      if (isStepValid(currentStep)) {
        setCurrentStep(stepOrder[currentIndex + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    const stepOrder: Step[] = ['general', 'contact', 'location', 'requirements', 'review', 'payment'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmitRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    
    const furnitureItem = furnitureCodes.find(item => item.code === newRequirement.furnitureCode);
    const cost = furnitureItem ? furnitureItem.price * newRequirement.quantity : 0;

    const newReq: Requirement = {
      id: `REQ${(requirements.length + 1).toString().padStart(3, '0')}`,
      type: newRequirement.type,
      description: newRequirement.description || furnitureItem?.name || '',
      quantity: newRequirement.quantity,
      status: 'pending',
      cost: cost,
      furnitureCode: newRequirement.furnitureCode,
      layoutType: newRequirement.layoutType,
      date: newRequirement.date
    };
    
    setRequirements([...requirements, newReq]);
    resetRequirementForm();
  };

  const resetRequirementForm = () => {
    setNewRequirement({
      type: 'furniture',
      description: '',
      furnitureCode: '',
      quantity: 1,
      layoutType: 'conference',
      date: ''
    });
    setShowForm(false);
  };

  const getStatusIcon = (status: Requirement['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
    }
  };

  const handlePayment = () => {
    if (!isStepValid('payment')) return;
    
    // Generate order confirmation
    const totalCost = requirements.reduce((sum, req) => sum + (req.cost || 0), 0);
    const taxAmount = totalCost * 0.18;
    const grandTotal = totalCost + taxAmount;
    
    const confirmation: OrderConfirmation = {
      orderId: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      transactionId: `TXN${Date.now()}`,
      paymentDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      totalAmount: totalCost,
      taxAmount: taxAmount,
      grandTotal: grandTotal,
      status: 'confirmed'
    };
    
    setOrderConfirmed(confirmation);
    setCurrentStep('confirmation');
    
    // In a real app, you would also:
    // 1. Send data to backend API
    // 2. Save order to database
    // 3. Send confirmation email
    // 4. Update inventory
    // 5. Generate invoice PDF
  };

  const startNewOrder = () => {
    // Reset all forms
    setGeneralInfo({ name: '', company: '', jobTitle: '', department: '' });
    setContactInfo({ phone: '', email: '', alternatePhone: '' });
    setLocationInfo({ eventHall: '', boothNumber: '', floorPlanNotes: '' });
    setRequirements([]);
    setPaymentInfo({ cardNumber: '', cardName: '', expiryDate: '', cvv: '' });
    setOrderConfirmed(null);
    setCurrentStep('general');
  };

  const getFurnitureName = (code: string) => {
    const item = furnitureCodes.find(f => f.code === code);
    return item ? item.name : null;
  };

  const totalCost = requirements.reduce((sum, req) => sum + (req.cost || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('Downloading confirmation as PDF...');
  };

  // Mask card number for display
  const maskCardNumber = (cardNumber: string) => {
    const last4 = cardNumber.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header - Hidden on confirmation page */}
      {currentStep !== 'confirmation' && (
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Extra Requirements</h1>
            <p className="text-gray-600 mt-1">Complete all steps to submit your requirements</p>
          </div>
          <a
            href="/ExhibitorManual-25.pdf"
            download
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            📥 Download Furniture Brochure
          </a>
        </div>
      )}

      {/* Progress Steps - Hidden on confirmation page */}
      {currentStep !== 'confirmation' && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const stepIndex = steps.findIndex(s => s.id === step.id);
                const isCurrent = currentStep === step.id;
                const isComplete = steps.findIndex(s => s.id === currentStep) > stepIndex;
                const isValid = isStepValid(step.id);
                
                return (
                  <div key={step.id} className="relative flex flex-col items-center">
                    <button
                      onClick={() => {
                        if (stepIndex <= steps.findIndex(s => s.id === currentStep) || isComplete) {
                          setCurrentStep(step.id);
                        }
                      }}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-3 ${
                        isCurrent
                          ? 'border-blue-600 bg-white'
                          : isComplete
                          ? 'border-green-600 bg-green-600'
                          : isValid
                          ? 'border-gray-300 bg-white'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircleIcon className="h-5 w-5 text-white" />
                      ) : (
                        <step.icon className={`h-5 w-5 ${
                          isCurrent ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      )}
                    </button>
                    <span className={`text-sm font-medium ${
                      isCurrent ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Page */}
      {currentStep === 'confirmation' && orderConfirmed && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-center">
            <CheckBadgeIcon className="h-16 w-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-green-100 text-lg">Your requirements have been submitted successfully</p>
          </div>

          {/* Order Details */}
          <div className="p-6 space-y-6">
            {/* Order Status */}
            <div className="flex flex-wrap gap-4 justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="text-lg font-bold text-gray-900">{orderConfirmed.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="text-sm font-mono text-gray-900">{orderConfirmed.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Date</p>
                <p className="text-sm text-gray-900">{orderConfirmed.paymentDate}</p>
              </div>
              <div>
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✓ {orderConfirmed.status.charAt(0).toUpperCase() + orderConfirmed.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Customer & Location Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Name:</span>{' '}
                    <span className="font-medium">{generalInfo.name}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Company:</span>{' '}
                    <span className="font-medium">{generalInfo.company}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Job Title:</span>{' '}
                    <span className="font-medium">{generalInfo.jobTitle}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Department:</span>{' '}
                    <span className="font-medium">{generalInfo.department}</span>
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Event Location
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Event Hall:</span>{' '}
                    <span className="font-medium">
                      {eventHalls.find(h => h.id === locationInfo.eventHall)?.name}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Booth Number:</span>{' '}
                    <span className="font-medium">{locationInfo.boothNumber}</span>
                  </p>
                  {locationInfo.floorPlanNotes && (
                    <p className="text-sm">
                      <span className="text-gray-500">Notes:</span>{' '}
                      <span className="font-medium">{locationInfo.floorPlanNotes}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <PhoneIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Phone:</span>{' '}
                    <span className="font-medium">{contactInfo.phone}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Email:</span>{' '}
                    <span className="font-medium">{contactInfo.email}</span>
                  </p>
                  {contactInfo.alternatePhone && (
                    <p className="text-sm">
                      <span className="text-gray-500">Alternate Phone:</span>{' '}
                      <span className="font-medium">{contactInfo.alternatePhone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CreditCardIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Payment Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Card:</span>{' '}
                    <span className="font-medium">{maskCardNumber(paymentInfo.cardNumber)}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Card Holder:</span>{' '}
                    <span className="font-medium">{paymentInfo.cardName}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Payment Method:</span>{' '}
                    <span className="font-medium">Credit Card</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements Summary */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-900">Requirements Summary</h3>
              </div>
              <div className="p-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {requirements.map((req) => (
                      <tr key={req.id}>
                        <td className="px-4 py-2 text-sm">
                          <div className="font-medium text-gray-900">{req.description}</div>
                          <div className="text-xs text-gray-500">{req.type}</div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">{req.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">₹{req.cost}</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">₹{req.cost * req.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">₹{orderConfirmed.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Tax (18% GST):</span>
                <span className="font-medium">₹{orderConfirmed.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">₹{orderConfirmed.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-end pt-4 border-t">
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </button>
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Download PDF
              </button>
              <button
                onClick={startNewOrder}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Order
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Go to Dashboard
              </button>
            </div>

            {/* Email Confirmation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <EnvelopeIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Confirmation email sent to {contactInfo.email}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    You will receive order updates and delivery information via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Content - Hide on confirmation page */}
      {currentStep !== 'confirmation' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* General Information */}
          {currentStep === 'general' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                <UserIcon className="h-6 w-6 inline-block mr-2" />
                General Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={generalInfo.name}
                    onChange={(e) => setGeneralInfo({...generalInfo, name: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization *
                  </label>
                  <input
                    type="text"
                    value={generalInfo.company}
                    onChange={(e) => setGeneralInfo({...generalInfo, company: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={generalInfo.jobTitle}
                    onChange={(e) => setGeneralInfo({...generalInfo, jobTitle: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your job title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={generalInfo.department}
                    onChange={(e) => setGeneralInfo({...generalInfo, department: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter department"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {currentStep === 'contact' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                <PhoneIcon className="h-6 w-6 inline-block mr-2" />
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 1234567890"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.alternatePhone}
                    onChange={(e) => setContactInfo({...contactInfo, alternatePhone: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Location Information */}
          {currentStep === 'location' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                <MapPinIcon className="h-6 w-6 inline-block mr-2" />
                Event Location Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Hall *
                  </label>
                  <select
                    value={locationInfo.eventHall}
                    onChange={(e) => setLocationInfo({...locationInfo, eventHall: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Event Hall</option>
                    {eventHalls.map((hall) => (
                      <option key={hall.id} value={hall.id}>
                        {hall.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booth/Stand Number *
                  </label>
                  <input
                    type="text"
                    value={locationInfo.boothNumber}
                    onChange={(e) => setLocationInfo({...locationInfo, boothNumber: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., A-12, B-05, etc."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor Plan Notes (Optional)
                  </label>
                  <textarea
                    value={locationInfo.floorPlanNotes}
                    onChange={(e) => setLocationInfo({...locationInfo, floorPlanNotes: e.target.value})}
                    className="w-full border rounded-lg p-3 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special instructions about your booth location..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Requirements */}
          {currentStep === 'requirements' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  <PlusIcon className="h-6 w-6 inline-block mr-2" />
                  Extra Requirements
                </h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  {showForm ? 'Cancel' : 'Add Requirement'}
                </button>
              </div>

              {/* Requirement Form */}
              {showForm && (
                <div className="mb-8 p-6 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Requirement</h3>
                  
                  <form onSubmit={handleSubmitRequirement}>
                    <div className="space-y-6">
                      {/* Category Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Requirement Type
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['furniture', 'electrical', 'audio_visual', 'other'].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setSelectedCategory(type);
                                setNewRequirement({...newRequirement, type});
                              }}
                              className={`p-4 rounded-lg border text-left transition ${
                                selectedCategory === type
                                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <span className="font-medium capitalize">
                                {type.replace('_', ' ')}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Furniture-specific fields */}
                      {selectedCategory === 'furniture' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Furniture Code (From Brochure)
                            </label>
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={newRequirement.furnitureCode}
                                onChange={(e) => {
                                  const code = e.target.value;
                                  setNewRequirement({...newRequirement, furnitureCode: code});
                                  
                                  const item = furnitureCodes.find(f => f.code === code);
                                  if (item) {
                                    setNewRequirement(prev => ({
                                      ...prev,
                                      description: item.name
                                    }));
                                  }
                                }}
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter furniture code (e.g., CHAIR-001)"
                                required
                              />
                              {newRequirement.furnitureCode && getFurnitureName(newRequirement.furnitureCode) && (
                                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                  <p className="text-sm font-medium text-green-800">
                                    ✓ {getFurnitureName(newRequirement.furnitureCode)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Layout Style
                            </label>
                            <select
                              value={newRequirement.layoutType}
                              onChange={(e) => setNewRequirement({...newRequirement, layoutType: e.target.value})}
                              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {layoutOptions.map((layout) => (
                                <option key={layout.id} value={layout.id}>
                                  {layout.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}

                      {/* Common fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                          </label>
                          <textarea
                            value={newRequirement.description}
                            onChange={(e) => setNewRequirement({...newRequirement, description: e.target.value})}
                            className="w-full border rounded-lg p-3 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe your requirement..."
                            required
                          />
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quantity *
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={newRequirement.quantity}
                              onChange={(e) => setNewRequirement({...newRequirement, quantity: parseInt(e.target.value) || 1})}
                              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Required Date *
                            </label>
                            <input
                              type="date"
                              value={newRequirement.date}
                              onChange={(e) => setNewRequirement({...newRequirement, date: e.target.value})}
                              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={resetRequirementForm}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Add to List
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Requirements List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Layout
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cost
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requirements.map((requirement) => (
                      <tr key={requirement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {requirement.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                            {requirement.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{requirement.description}</div>
                          {requirement.furnitureCode && (
                            <div className="text-xs text-gray-500 mt-1">
                              Code: <span className="font-mono">{requirement.furnitureCode}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {requirement.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          {requirement.layoutType || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {requirement.date || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{requirement.cost || 'TBD'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => setRequirements(requirements.filter(r => r.id !== requirement.id))}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {requirements.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No requirements added yet. Click "Add Requirement" to get started.
                  </div>
                )}
              </div>

              {/* Cost Summary */}
              {requirements.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-blue-700">Total Items: {requirements.length}</p>
                      <p className="text-lg font-bold text-blue-800">Total Cost: ₹{totalCost}</p>
                    </div>
                    <div className="text-sm text-blue-700">
                      * Prices are subject to final confirmation
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Review */}
          {currentStep === 'review' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                <DocumentCheckIcon className="h-6 w-6 inline-block mr-2" />
                Review Your Submission
              </h2>
              
              <div className="space-y-8">
                {/* General Info Review */}
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">General Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{generalInfo.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{generalInfo.company || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Job Title</p>
                      <p className="font-medium">{generalInfo.jobTitle || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{generalInfo.department || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info Review */}
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{contactInfo.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{contactInfo.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alternate Phone</p>
                      <p className="font-medium">{contactInfo.alternatePhone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Location Review */}
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Location Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Event Hall</p>
                      <p className="font-medium">
                        {eventHalls.find(h => h.id === locationInfo.eventHall)?.name || 'Not selected'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Booth Number</p>
                      <p className="font-medium">{locationInfo.boothNumber || 'Not provided'}</p>
                    </div>
                    {locationInfo.floorPlanNotes && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Floor Plan Notes</p>
                        <p className="font-medium">{locationInfo.floorPlanNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Requirements Review */}
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Requirements Summary</h3>
                  <div className="space-y-3">
                    {requirements.map((req) => (
                      <div key={req.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{req.description}</p>
                          <p className="text-sm text-gray-500">
                            {req.quantity} × ₹{req.cost} • {req.type}
                          </p>
                        </div>
                        <p className="font-bold">₹{req.cost * req.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900">Subtotal</p>
                    <p className="text-2xl font-bold text-blue-600">₹{totalCost}</p>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Tax (18% GST)</p>
                    <p className="text-lg font-bold text-gray-900">₹{(totalCost * 0.18).toFixed(2)}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900">Total Amount</p>
                    <p className="text-2xl font-bold text-green-600">₹{(totalCost * 1.18).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment */}
          {currentStep === 'payment' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                <CreditCardIcon className="h-6 w-6 inline-block mr-2" />
                Payment Details
              </h2>
              
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Holder Name *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name as on card"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="month"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
                
                {/* Payment Summary */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Requirements Total</span>
                      <span className="font-medium">₹{totalCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Tax (18% GST)</span>
                      <span className="font-medium">₹{(totalCost * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{(totalCost * 1.18).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    ⚠️ Note: All fields must be completed before proceeding to payment. 
                    Your requirements will only be submitted after successful payment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex justify-between">
              <button
                onClick={handlePrevStep}
                className={`px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 ${
                  currentStep === 'general' ? 'invisible' : ''
                }`}
              >
                Previous
              </button>
              
              {currentStep === 'payment' ? (
                <button
                  onClick={handlePayment}
                  disabled={!isStepValid('payment')}
                  className={`px-8 py-2 rounded-lg text-white ${
                    isStepValid('payment')
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Complete Payment
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  disabled={!isStepValid(currentStep)}
                  className={`px-8 py-2 rounded-lg text-white ${
                    isStepValid(currentStep)
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step-specific instructions - Hide on confirmation page */}
      {currentStep !== 'confirmation' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            {currentStep === 'general' && '👤 General Information'}
            {currentStep === 'contact' && '📞 Contact Details'}
            {currentStep === 'location' && '📍 Location Details'}
            {currentStep === 'requirements' && '🛋️ Adding Requirements'}
            {currentStep === 'review' && '📋 Review Submission'}
            {currentStep === 'payment' && '💳 Secure Payment'}
          </h3>
          
          {currentStep === 'requirements' && (
            <ol className="space-y-3 text-blue-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">1.</span>
                <span>Click "Add Requirement" to start adding items</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">2.</span>
                <span>For furniture, enter code from brochure for auto-fill</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">3.</span>
                <span>You must add at least one requirement to proceed</span>
              </li>
            </ol>
          )}
          
          {currentStep !== 'requirements' && currentStep !== 'review' && (
            <p className="text-blue-700">
              Please complete all fields marked with * to proceed to the next step.
            </p>
          )}
          
          {currentStep === 'review' && (
            <p className="text-blue-700">
              Please review all your information carefully. You can go back to edit any section before proceeding to payment.
            </p>
          )}
          
          {currentStep === 'payment' && (
            <p className="text-blue-700">
              Complete your payment to submit all requirements. All transactions are secure and encrypted.
            </p>
          )}
        </div>
      )}
    </div>
  );
}