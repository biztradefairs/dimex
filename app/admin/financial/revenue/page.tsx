// app/admin/financial/revenue/page.tsx
"use client";

import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Package, Download, Filter, Calendar } from 'lucide-react';

interface RevenueData {
  month: string;
  revenue: number;
  exhibitors: number;
  growth: number;
}

interface RevenueSource {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export default function RevenuePage() {
  const [timeRange, setTimeRange] = useState('year');
  const [selectedYear, setSelectedYear] = useState('2024');

  const revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 125000, exhibitors: 45, growth: 12.5 },
    { month: 'Feb', revenue: 142000, exhibitors: 52, growth: 13.6 },
    { month: 'Mar', revenue: 158000, exhibitors: 58, growth: 11.3 },
    { month: 'Apr', revenue: 132000, exhibitors: 48, growth: 8.9 },
    { month: 'May', revenue: 165000, exhibitors: 62, growth: 15.2 },
    { month: 'Jun', revenue: 148000, exhibitors: 55, growth: 10.8 },
    { month: 'Jul', revenue: 172000, exhibitors: 65, growth: 16.2 },
    { month: 'Aug', revenue: 155000, exhibitors: 58, growth: 12.8 },
    { month: 'Sep', revenue: 182000, exhibitors: 68, growth: 17.4 },
    { month: 'Oct', revenue: 168000, exhibitors: 62, growth: 14.9 },
    { month: 'Nov', revenue: 192000, exhibitors: 72, growth: 18.5 },
    { month: 'Dec', revenue: 210000, exhibitors: 78, growth: 21.2 },
  ];

  const revenueSources: RevenueSource[] = [
    { category: 'Exhibitor Fees', amount: 450000, percentage: 45, color: 'bg-blue-500' },
    { category: 'Sponsorships', amount: 280000, percentage: 28, color: 'bg-green-500' },
    { category: 'Ticket Sales', amount: 150000, percentage: 15, color: 'bg-yellow-500' },
    { category: 'Advertising', amount: 80000, percentage: 8, color: 'bg-purple-500' },
    { category: 'Other', amount: 40000, percentage: 4, color: 'bg-gray-500' },
  ];

  const totalRevenue = revenueData.reduce((sum, month) => sum + month.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / revenueData.length);
  const maxRevenue = Math.max(...revenueData.map(m => m.revenue));
  const growthRate = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue) * 100;

  const handleExport = () => {
    alert('Exporting revenue data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
          <p className="text-gray-600">Track and analyze exhibition revenue</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Growth Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {growthRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Avg Exhibitors</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(revenueData.reduce((sum, m) => sum + m.exhibitors, 0) / revenueData.length)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-yellow-100">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Avg Revenue/Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${avgRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Revenue Trend</h3>
            <div className="h-64 flex items-end space-x-2">
              {revenueData.map((month, index) => {
                const height = (month.revenue / maxRevenue) * 100;
                return (
                  <div key={month.month} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full">
                      <div
                        className="w-full bg-blue-500 rounded-t-lg"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                          ${(month.revenue / 1000).toFixed(0)}k
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{month.month}</div>
                    <div className="text-xs text-gray-400 mt-1">{month.exhibitors} exhibitors</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total: ${totalRevenue.toLocaleString()}</span>
                <span>Growth: +{growthRate.toFixed(1)}% YoY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Sources */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue by Source</h3>
            <div className="space-y-4">
              {revenueSources.map((source) => (
                <div key={source.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900">{source.category}</span>
                    <span className="font-medium">
                      ${source.amount.toLocaleString()} ({source.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Highest Source</p>
                  <p className="text-lg font-semibold text-gray-900">Exhibitor Fees</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fastest Growing</p>
                  <p className="text-lg font-semibold text-gray-900">Sponsorships</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exhibitors
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg/Exhibitor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {revenueData.map((month) => (
                  <tr key={month.month}>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{month.month} 2024</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${month.revenue.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{month.exhibitors}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        month.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {month.growth >= 0 ? '+' : ''}{month.growth}%
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${Math.round(month.revenue / month.exhibitors).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}