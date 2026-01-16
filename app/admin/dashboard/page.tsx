// app/admin/dashboard/page.tsx
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
  Settings
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      name: 'Total Visitors',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Exhibitors',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: Building,
      color: 'bg-green-500'
    },
    {
      name: 'Revenue',
      value: '$89,450',
      change: '+23.1%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      name: 'Articles Published',
      value: '42',
      change: '+5.3%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-yellow-500'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New exhibitor registration', user: 'ABC Logistics', time: '10 min ago' },
    { id: 2, action: 'Article published', user: 'Rail Freight Trends', time: '1 hour ago' },
    { id: 3, action: 'Payment received', user: 'XYZ Shipping Co.', amount: '$2,500', time: '2 hours ago' },
    { id: 4, action: 'User account created', user: 'John Smith', time: '5 hours ago' },
    { id: 5, action: 'Floor plan updated', user: 'Admin', time: '1 day ago' }
  ];

  const topArticles = [
    { id: 1, title: 'Rail Freight Innovation Trends 2026', views: 1245, status: 'published' },
    { id: 2, title: 'Port Automation Solutions', views: 892, status: 'published' },
    { id: 3, title: 'Sustainable Logistics Practices', views: 756, status: 'published' },
    { id: 4, title: 'Autonomous Trucking Revolution', views: 654, status: 'published' }
  ];

  const handleExport = () => {
    alert('Export functionality would be implemented here');
  };

  const handleCalendarView = () => {
    alert('Calendar view would open here');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your exhibition.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="mr-2 h-4 w-4" />
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
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div className="flex-shrink-0 pt-1.5">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {activity.user.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <p className="text-sm text-gray-900">{activity.action}</p>
                            <p className="mt-1 text-sm text-gray-500">
                              by {activity.user} • {activity.time}
                              {activity.amount && <span className="font-semibold"> • {activity.amount}</span>}
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
              {topArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Eye className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {article.title}
                      </p>
                      <p className="text-sm text-gray-500">{article.views.toLocaleString()} views</p>
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
                onClick={() => alert('Navigate to articles page')}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all articles →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => alert('Create new article')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-gray-900">New Article</span>
            </button>
            <button
              onClick={() => alert('Add exhibitor')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Building className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-gray-900">Add Exhibitor</span>
            </button>
            <button
              onClick={() => alert('Process payment')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <DollarSign className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-gray-900">Process Payment</span>
            </button>
            <button
              onClick={() => alert('Open website settings')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
            >
              <Settings className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-gray-900">Website Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}