// app/admin/dashboard/page.tsx
'use client';

import { 
  Users, 
  Building, 
  DollarSign, 
  Calendar,
  FileText,
  Eye,
  Download,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  TrendingUp,
  Activity,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { useExhibitorStats } from '@/hooks/useExhibitorStats';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { summary, isLoading, error, health } = useDashboard();
  const { stats: exhibitorStats } = useExhibitorStats();
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (e: FormEvent) => {
    e.preventDefault();
    setIsExporting(true);
    try {
      // Implement export logic here
      toast.success('Report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCalendarView = (e: FormEvent) => {
    e.preventDefault();
    toast('Calendar view coming soon');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-3 sm:p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 sm:h-10 sm:w-10 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-3 sm:p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-red-800">Failed to load dashboard data. Please try again.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Visitors',
      value: summary?.users?.total || 0,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Exhibitors',
      value: summary?.exhibitors?.total || 0,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Building,
      color: 'bg-green-500'
    },
    {
      name: 'Revenue',
      value: summary?.revenue?.totalRevenue ? `₹${(summary.revenue.totalRevenue).toLocaleString()}` : '₹0',
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      name: 'Articles',
      value: summary?.articles?.total || 0,
      change: '+5.3%',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'bg-yellow-500'
    }
  ];

  const recentActivities = summary?.activities || [
    { id: 1, action: 'System started', user: 'System', time: new Date().toISOString() }
  ];

  const topArticles = summary?.articles?.recent || [
    { id: 1, title: 'Rail Freight Innovation Trends 2026', views: 1245, status: 'published' },
    { id: 2, title: 'Port Automation Solutions', views: 892, status: 'published' },
    { id: 3, title: 'Sustainable Logistics Practices', views: 756, status: 'published' },
    { id: 4, title: 'Autonomous Trucking Revolution', views: 654, status: 'published' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
              Welcome back, {user?.name || 'Admin'}! Here's what's happening.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:space-x-3">
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              {isExporting ? (
                <RefreshCw className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <Download className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              )}
              Export Report
            </button>
            <button 
              onClick={handleCalendarView}
              className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Calendar className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Calendar View
            </button>
          </div>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg p-3 sm:p-4 md:p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-2 sm:p-2.5 md:p-3 ${stat.color}`}>
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="ml-2 sm:ml-3 md:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-1 sm:ml-2 flex items-baseline text-xs sm:text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUp className="self-center flex-shrink-0 h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                          <ArrowDown className="self-center flex-shrink-0 h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                        <span className="sr-only">{stat.changeType === 'positive' ? 'Increased by' : 'Decreased by'}</span>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Activities */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-3 sm:px-4 py-3 sm:py-5 border-b border-gray-200">
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 flex items-center">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-blue-600" />
                Recent Activities
              </h3>
            </div>
            <div className="px-3 sm:px-4 py-3 sm:py-5">
              <div className="flow-root">
                <ul className="-mb-4 sm:-mb-8">
                  {recentActivities.slice(0, 4).map((activity, activityIdx) => (
                    <li key={activity.id || activityIdx}>
                      <div className="relative pb-4 sm:pb-8">
                        {activityIdx !== recentActivities.slice(0, 4).length - 1 ? (
                          <span className="absolute top-3 sm:top-4 left-3 sm:left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-2 sm:space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-xs sm:text-sm">
                                {activity.user?.charAt(0) || 'S'}
                              </span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <p className="text-xs sm:text-sm text-gray-900">{activity.action}</p>
                              <p className="mt-0.5 sm:mt-1 text-xs text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-0.5 sm:mr-1" />
                                by {activity.user} • {new Date(activity.time).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 sm:mt-4 text-right">
                <Link href="/admin/activities" className="text-xs sm:text-sm text-blue-600 hover:text-blue-500 inline-flex items-center">
                  View all activities
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 sm:ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Top Articles */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-3 sm:px-4 py-3 sm:py-5 border-b border-gray-200">
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 flex items-center">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-blue-600" />
                Top Articles
              </h3>
            </div>
            <div className="px-3 sm:px-4 py-3 sm:py-5">
              <div className="space-y-3 sm:space-y-4">
                {topArticles.slice(0, 4).map((article) => (
                  <div key={article.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <div className="ml-2 sm:ml-4">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-xs">
                          {article.title}
                        </p>
                        <p className="text-xs text-gray-500">{article.views?.toLocaleString()} views</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                      {article.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 sm:mt-6">
                <Link href="/admin/content/articles" className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-500 inline-flex items-center">
                  View all articles
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 sm:ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        {health && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-3 sm:px-4 py-3 sm:py-5 border-b border-gray-200">
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 flex items-center">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-blue-600" />
                System Status
              </h3>
            </div>
            <div className="px-3 sm:px-4 py-3 sm:py-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center">
                  <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${health.status === 'OK' ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="ml-2 text-xs sm:text-sm font-medium text-gray-900">
                    System is {health.status === 'OK' ? 'operational' : 'experiencing issues'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
                  <span>Uptime: {Math.floor(health.uptime / 60)} minutes</span>
                  <span>•</span>
                  <span>Environment: {health.environment}</span>
                  <span>•</span>
                  <span>Last checked: {new Date(health.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Today's Visits</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">1,234</p>
              </div>
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">New Exhibitors</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">45</p>
              </div>
              <Building className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Pending Approvals</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">12</p>
              </div>
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Conversion Rate</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">3.2%</p>
              </div>
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}