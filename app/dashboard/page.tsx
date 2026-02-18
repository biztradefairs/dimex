// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import EnhancedStatsCard, {
  EnhancedStatsCardProps,
} from "./components/EnhancedStatsCard";
import RecentActivity from "./components/RecentActivity";
import QuickActions from "./components/QuickActions";
import { dashboardAPI } from '@/lib/api/exhibitors';
import { useRouter } from 'next/navigation';

import {
  BuildingStorefrontIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  UserCircleIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  MapIcon,
  BuildingOfficeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface DashboardData {
  exhibitor: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    boothNumber: string;
    status: string;
  };
  invoices: Array<{
    id: string;
    invoiceNumber: string;
    amount: number;
    status: string;
    dueDate?: string;
  }>;
  requirements: Array<{
    id: string;
    type: string;
    description: string;
    status: string;
  }>;
  floorPlan?: {
    name: string;
    floor: string;
  };
  event?: {
    name: string;
    venue: string;
    exhibitionDay: string;
    dismantleDay: string;
  };
}

export default function EnhancedDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token =
        localStorage.getItem('exhibitor_token') ||
        localStorage.getItem('token');

      if (!token) {
        setError('Please log in to access dashboard');
        setTimeout(() => router.push('/login'), 1500);
        return;
      }

      const data = await dashboardAPI.getLayout();
      setDashboardData(data);

    } catch (error: any) {
      console.error('❌ Dashboard error:', error);

      if (
        error.message?.includes('401') ||
        error.message?.includes('Unauthorized')
      ) {
        localStorage.removeItem('exhibitor_token');
        localStorage.removeItem('exhibitor_data');
        setError('Session expired. Please login again.');
        setTimeout(() => router.push('/login'), 1500);
      } else if (error.message?.includes('timeout')) {
        setError('Server is waking up. Please retry in a few seconds.');
      } else {
        setError(error.message || 'Failed to load dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Calculate derived stats from data
  const calculateStats = () => {
    if (!dashboardData) return [];
    
    const totalInvoices = dashboardData.invoices?.length || 0;
    const paidInvoices = dashboardData.invoices?.filter(inv => inv.status === 'paid').length || 0;
    const pendingRequirements = dashboardData.requirements?.filter(req => req.status === 'pending').length || 0;
    const totalAmount = dashboardData.invoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0;
    const paidAmount = dashboardData.invoices
      ?.filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.amount, 0) || 0;

    const stats: EnhancedStatsCardProps[] = [
      {
        title: "Company Profile",
        value: dashboardData.exhibitor.status === 'active' ? "Complete" : "Pending",
        change: dashboardData.exhibitor.status === 'active' ? "Active" : "Setup Required",
        icon: BuildingStorefrontIcon,
        color: dashboardData.exhibitor.status === 'active' ? "from-green-500 to-emerald-600" : "from-yellow-500 to-amber-600",
        trend: dashboardData.exhibitor.status === 'active' ? "up" : "warning",
        href: "/dashboard/exhibitor",
      },
      {
        title: "Stall Location",
        value: dashboardData.exhibitor.boothNumber || "Not Assigned",
        change: dashboardData.floorPlan ? `${dashboardData.floorPlan.name} - Floor ${dashboardData.floorPlan.floor}` : "No Layout",
        icon: MapPinIcon,
        color: dashboardData.exhibitor.boothNumber ? "from-blue-500 to-cyan-600" : "from-gray-500 to-gray-600",
        trend: dashboardData.exhibitor.boothNumber ? "stable" : "warning",
        href: "/dashboard/layout",
      },
      {
        title: "Total Investment",
        value: `₹${totalAmount.toLocaleString()}`,
        change: paidInvoices > 0 ? `${paidInvoices}/${totalInvoices} Paid` : "No Invoices",
        icon: CurrencyDollarIcon,
        color: paidAmount >= totalAmount ? "from-purple-500 to-violet-600" : "from-orange-500 to-red-600",
        trend: paidAmount >= totalAmount ? "up" : "warning",
        href: "/dashboard/invoice",
      },
      {
        title: "Requirements",
        value: pendingRequirements > 0 ? `${pendingRequirements} Pending` : "Complete",
        change: dashboardData.requirements ? `${dashboardData.requirements.length} Total` : "No Requirements",
        icon: DocumentCheckIcon,
        color: pendingRequirements > 0 ? "from-amber-500 to-orange-600" : "from-green-500 to-emerald-600",
        trend: pendingRequirements > 0 ? "warning" : "up",
        href: "/dashboard/requirements",
      },
    ];
    
    return stats;
  };

  // Mock event data - you can replace this with actual API data
  const upcomingEvents = dashboardData?.event ? [
    { id: 1, title: "Event Name", value: dashboardData.event.name, icon: BuildingOfficeIcon },
    { id: 2, title: "Venue", value: dashboardData.event.venue, icon: MapIcon },
    { id: 3, title: "Exhibition Day", value: dashboardData.event.exhibitionDay, icon: CalendarIcon },
    { id: 4, title: "Dismantle Day", value: dashboardData.event.dismantleDay, icon: TrashIcon },
  ] : [
    { id: 1, title: "Event Name", value: "DIEMEX 2026", icon: BuildingOfficeIcon },
    { id: 2, title: "Venue", value: "Auto Cluster Exhibition Center", icon: MapIcon },
    { id: 3, title: "Exhibition Day", value: "8th October, 2026", icon: CalendarIcon },
    { id: 4, title: "Dismantle Day", value: "10th October, 2026", icon: TrashIcon },
  ];

  // Contact information
  const contactInfo = [
    { id: 1, type: "Phone", value: "+91 9876543210", icon: PhoneIcon },
    { id: 2, type: "Email", value: "support@exhibitionhub.com", icon: EnvelopeIcon },
    { id: 3, type: "Hours", value: "Mon-Fri, 9AM-6PM", icon: ClockIcon },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="card p-6 text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={fetchDashboardData}
              className="btn-primary flex items-center gap-2"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Retry
            </button>
            <button 
              onClick={() => router.push('/login')}
              className="btn-secondary"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="space-y-6">
        <div className="card p-6 text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Dashboard Data</h2>
          <p className="text-gray-600 mb-4">Unable to load exhibitor dashboard data.</p>
          <button 
            onClick={fetchDashboardData}
            className="btn-primary"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {dashboardData.exhibitor.company}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your exhibition today.
          </p>
        </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-100 p-5">
  
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-800">
      Account Overview
    </h3>

    <button 
      onClick={fetchDashboardData}
      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
    >
      <ArrowPathIcon className="h-4 w-4" />
      Refresh
    </button>
  </div>

  {/* Status Section */}
  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
    <div className="bg-white p-2 rounded-lg shadow-sm">
      <CalendarIcon className="h-5 w-5 text-gray-600" />
    </div>

    <div>
      <p className="text-sm text-gray-500">Account Status</p>
      <p
        className={`text-base font-semibold ${
          dashboardData.exhibitor.status === "active"
            ? "text-green-600"
            : "text-yellow-600"
        }`}
      >
        {dashboardData.exhibitor.status.charAt(0).toUpperCase() +
          dashboardData.exhibitor.status.slice(1)}
      </p>
    </div>
  </div>

</div>

      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <EnhancedStatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title">Quick Actions</h2>
                {/* <p className="section-subtitle">Common tasks and shortcuts</p> */}
              </div>
              <SparklesIcon className="h-5 w-5 text-gray-400" />
            </div>
            <QuickActions />
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title">Recent Activity</h2>
            
              </div>
             
            </div>
            <RecentActivity 
              exhibitorName={dashboardData.exhibitor.name}
              boothNumber={dashboardData.exhibitor.boothNumber}
              invoiceCount={dashboardData.invoices?.length || 0}
              pendingRequirements={dashboardData.requirements?.filter(r => r.status === 'pending').length || 0}
            />
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="section-title mb-4">Account Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                <UserCircleIcon className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Contact Person</p>
                  <p className="text-xs text-gray-500">{dashboardData.exhibitor.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                <CreditCardIcon className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment Status</p>
                  <p className="text-xs text-gray-500">
                    {dashboardData.invoices?.filter(inv => inv.status === 'paid').length || 0} of {dashboardData.invoices?.length || 0} invoices paid
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                <ClipboardDocumentListIcon className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Requirements Status</p>
                  <p className="text-xs text-gray-500">
                    {dashboardData.requirements?.filter(r => r.status === 'pending').length || 0} pending requirements
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="section-title mb-4">Event Details</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                  <event.icon className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-sm text-gray-700 mt-0.5">
                      {event.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm mb-4">
              Contact our support team for assistance with your exhibition setup.
            </p>
            <div className="space-y-3">
              {contactInfo.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3">
                  <contact.icon className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">{contact.type}</p>
                    <p className="text-sm font-medium">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}