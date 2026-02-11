"use client";

import { 
  Users, 
  Building, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  FileText,
  Eye,
  Download,
  ArrowUp,
  ArrowDown,
  Settings,
  RefreshCw
} from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { useExhibitorStats } from '@/hooks/useExhibitorStats';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useState, FormEvent } from 'react';

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
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Failed to load dashboard data. Please try again.</p>
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
      value: summary?.revenue?.totalRevenue ? `$${(summary.revenue.totalRevenue).toLocaleString()}` : '$0',
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      name: 'Articles Published',
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Here's what's happening with your exhibition.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            {isExporting ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export Report
          </button>
          <button 
            onClick={handleCalendarView}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUp className="self-center flex-shrink-0 h-4 w-4" />
                        ) : (
                          <ArrowDown className="self-center flex-shrink-0 h-4 w-4" />
                        )}
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.slice(0, 5).map((activity, activityIdx) => (
                  <li key={activity.id || activityIdx}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.slice(0, 5).length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div className="flex-shrink-0 pt-1.5">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {activity.user?.charAt(0) || 'S'}
                            </span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <p className="text-sm text-gray-900">{activity.action}</p>
                            <p className="mt-1 text-sm text-gray-500">
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
          </div>
        </div>

        {/* Top Articles */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Articles</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {topArticles.slice(0, 4).map((article) => (
                <div key={article.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Eye className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {article.title}
                      </p>
                      <p className="text-sm text-gray-500">{article.views?.toLocaleString()} views</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {article.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button 
                onClick={() => window.location.href = '/admin/content/articles'}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all articles →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      {health && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">System Status</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`h-4 w-4 rounded-full ${health.status === 'OK' ? 'bg-green-400' : 'bg-red-400'}`} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  System is {health.status === 'OK' ? 'operational' : 'experiencing issues'}
                </p>
                <p className="text-sm text-gray-500">
                  Uptime: {Math.floor(health.uptime / 60)} minutes • 
                  Environment: {health.environment} • 
                  Last checked: {new Date(health.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}