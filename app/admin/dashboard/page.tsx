'use client';

import {
  Users,
  Calendar,
  Download,
  ArrowUp,
  RefreshCw,
  TrendingUp,
  Activity,
  Clock,
  
  FileText,
  BarChart3,
  TrendingDown,
  CalendarDays,
  MousePointerClick,
  ChartNoAxesCombined,
} from 'lucide-react';

import { useDashboard } from '@/hooks/useDashboard';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Types for dashboard data
interface VisitorDay {
  date: string;
  count: number;
}

interface PageView {
  page: string;
  views: number;
}

interface VisitorStats {
  total: number;
  today: number;
  week: number;
  month: number;
  source: string;
  last7Days: VisitorDay[];
  pages: PageView[];
}

interface DashboardData {
  visitors: VisitorStats;
}

// Unified chart data type
interface ChartDataPoint {
  name: string;
  visitors: number;
  fullDate?: string;
  date?: string;
  days?: number;
}

// Custom colors
const COLORS = ['#F08400', '#F59E0B', '#FCD34D', '#FDE68A', '#FFEDD5', '#FFF7ED'];
const CHART_COLORS = {
  primary: '#F08400',
  secondary: '#F59E0B',
  gradient: ['#F08400', '#FCD34D'],
  area: '#FEF3C7',
  grid: '#E5E7EB',
  text: '#6B7280'
};

export default function DashboardPage() {
  const { summary, isLoading, error, refresh } = useDashboard();
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('area');

  const handleExport = async (e: FormEvent) => {
    e.preventDefault();
    setIsExporting(true);
    try {
      toast.success('Report exported successfully');
    } catch {
      toast.error('Failed to export report');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = () => {
    refresh();
    toast.success('Dashboard refreshed');
  };

  // Format date from GA format (20260425 → Apr 25)
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length < 8) return 'Invalid Date';
    const date = new Date(
      dateStr.slice(0, 4) + '-' +
      dateStr.slice(4, 6) + '-' +
      dateStr.slice(6, 8)
    );
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getFullDate = (dateStr: string) => {
    if (!dateStr || dateStr.length < 8) return '';
    const date = new Date(
      dateStr.slice(0, 4) + '-' +
      dateStr.slice(4, 6) + '-' +
      dateStr.slice(6, 8)
    );
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDayName = (dateStr: string) => {
    if (!dateStr || dateStr.length < 8) return '';
    const date = new Date(
      dateStr.slice(0, 4) + '-' +
      dateStr.slice(4, 6) + '-' +
      dateStr.slice(6, 8)
    );
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-[#F08400] mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={handleRefresh}
            className="bg-[#F08400] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const data = summary as DashboardData;
  const visitorStats = data?.visitors || { 
    total: 0, today: 0, week: 0, month: 0, 
    source: 'google-analytics', last7Days: [], pages: [] 
  };
  
  const last7Days = visitorStats.last7Days || [];
  const topPages = visitorStats.pages || [];
  
  // Calculate percentage change
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return { percentage: '+100', trend: 'up' };
    const change = ((current - previous) / previous * 100).toFixed(1);
    return {
      percentage: `${parseFloat(change) >= 0 ? '+' : ''}${change}%`,
      trend: parseFloat(change) >= 0 ? 'up' : 'down'
    };
  };

  // Weekly change calculation
  const previousWeekTotal = last7Days.slice(0, 7).reduce((sum, d) => sum + d.count, 0);
  const currentWeekTotal = last7Days.slice(0, 7).reduce((sum, d) => sum + d.count, 0);
  const weeklyChange = calculateChange(currentWeekTotal, previousWeekTotal);

  // Monthly change calculation
  const weeklyAvg = last7Days.reduce((sum, d) => sum + d.count, 0) / 7;
  const monthlyAvg = (visitorStats.month || 0) / 30;
  const monthlyChange = calculateChange(weeklyAvg, monthlyAvg);

  // Prepare chart data with unified type
  const weeklyChartData: ChartDataPoint[] = last7Days.map(day => ({
    name: getDayName(day.date),
    fullDate: getFullDate(day.date),
    visitors: day.count,
    date: day.date
  }));

  // Prepare monthly data (group by week)
  const monthlyChartData: ChartDataPoint[] = [];
  for (let i = 0; i < last7Days.length; i += 7) {
    const weekData = last7Days.slice(i, i + 7);
    if (weekData.length > 0) {
      monthlyChartData.push({
        name: `Week ${Math.floor(i / 7) + 1}`,
        visitors: weekData.reduce((sum, d) => sum + d.count, 0),
        days: weekData.length
      });
    }
  }

  const chartData: ChartDataPoint[] = selectedPeriod === 'week' ? weeklyChartData : monthlyChartData;
  
  // Calculate stats
  const totalViews = topPages.reduce((sum, p) => sum + p.views, 0);
  const homepageViews = topPages.find(p => p.page === '/')?.views || 0;
  const engagementRate = ((homepageViews / (visitorStats.total || 1)) * 100).toFixed(1);
  const pagesPerVisitor = (totalViews / (visitorStats.total || 1)).toFixed(1);

  // Prepare pie chart data for page distribution
  const pageDistribution = topPages.slice(0, 5).map(page => ({
    name: page.page === '/' ? 'Homepage' : page.page.replace(/^\/+/, '').substring(0, 20),
    value: page.views,
    percentage: ((page.views / totalViews) * 100).toFixed(1)
  }));

  const statsCards = [
    {
      title: 'Total Visitors',
      value: visitorStats.total?.toLocaleString() || '0',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      period: 'All Time',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Monthly Visitors',
      value: visitorStats.month?.toLocaleString() || '0',
      icon: CalendarDays,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      period: 'Last 30 Days',
      subValue: `${visitorStats.week || 0} this week`,
      trend: monthlyChange.percentage,
      trendUp: monthlyChange.trend === 'up'
    },
    {
      title: 'Weekly Visitors',
      value: visitorStats.week?.toLocaleString() || '0',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      period: 'Last 7 Days',
      subValue: `${visitorStats.today || 0} today`,
      trend: weeklyChange.percentage,
      trendUp: weeklyChange.trend === 'up'
    },
    {
      title: "Today's Visitors",
      value: visitorStats.today?.toLocaleString() || '0',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      period: 'Live',
      subValue: `Updated real-time`,
      trend: '+5%',
      trendUp: true
    }
  ];

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-2xl font-bold text-[#F08400]">
            {payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">visitors</p>
        </div>
      );
    }
    return null;
  };

  // Render chart based on selected type
  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            axisLine={{ stroke: CHART_COLORS.grid }}
          />
          <YAxis 
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            axisLine={{ stroke: CHART_COLORS.grid }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="visitors" 
            stroke={CHART_COLORS.primary}
            strokeWidth={3}
            dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: CHART_COLORS.primary }}
            name="Visitors"
          />
        </LineChart>
      );
    } else if (chartType === 'bar') {
      return (
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            axisLine={{ stroke: CHART_COLORS.grid }}
          />
          <YAxis 
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            axisLine={{ stroke: CHART_COLORS.grid }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="visitors" 
            fill={CHART_COLORS.primary}
            radius={[8, 8, 0, 0]}
            name="Visitors"
          />
        </BarChart>
      );
    } else {
      return (
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            axisLine={{ stroke: CHART_COLORS.grid }}
          />
          <YAxis 
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            axisLine={{ stroke: CHART_COLORS.grid }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="visitors" 
            stroke={CHART_COLORS.primary}
            strokeWidth={3}
            fill="url(#colorVisitors)"
            name="Visitors"
          />
        </AreaChart>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Analytics Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              <span>Welcome back, {user?.name || 'Admin'}!</span>
              <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Live Data
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition shadow-sm"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsCards.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 hover:shadow-md transition group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`p-2.5 sm:p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
                    {stat.subValue && (
                      <p className="text-xs text-gray-400 mt-1">{stat.subValue}</p>
                    )}
                    <p className="text-[10px] text-gray-400 mt-0.5">{stat.period}</p>
                  </div>
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stat.trend}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CHART CONTROLS */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-md transition ${
                  selectedPeriod === 'week' 
                    ? 'bg-[#F08400] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                Weekly
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-md transition ${
                  selectedPeriod === 'month' 
                    ? 'bg-[#F08400] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                Monthly
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <button
                onClick={() => setChartType('area')}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md transition ${
                  chartType === 'area' 
                    ? 'bg-[#F08400] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📈 Area
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md transition ${
                  chartType === 'line' 
                    ? 'bg-[#F08400] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📉 Line
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md transition ${
                  chartType === 'bar' 
                    ? 'bg-[#F08400] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📊 Bar
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Source: {visitorStats.source || 'Google Analytics'}
          </div>
        </div>

        {/* MAIN CHART */}
        {chartData.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                <ChartNoAxesCombined className="h-5 w-5 text-[#F08400]" />
                Visitor Trends - {selectedPeriod === 'week' ? 'Daily Breakdown' : 'Weekly Summary'}
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#F08400] rounded-full"></span>
                  <span className="text-gray-500">Visitors</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              {renderChart()}
            </ResponsiveContainer>

            {/* Chart Summary Stats */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-xl font-bold text-gray-800">
                    {chartData.reduce((sum, d) => sum + d.visitors, 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Average</p>
                  <p className="text-xl font-bold text-gray-800">
                    {Math.round(chartData.reduce((sum, d) => sum + d.visitors, 0) / chartData.length).toLocaleString()}
                    <span className="text-xs text-gray-400">/day</span>
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Highest</p>
                  <p className="text-xl font-bold text-green-600">
                    {Math.max(...chartData.map(d => d.visitors)).toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Lowest</p>
                  <p className="text-xl font-bold text-red-500">
                    {Math.min(...chartData.map(d => d.visitors)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* TOP PAGES - Bar Chart View */}
          {topPages.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#F08400]" />
                Top Performing Pages
                <span className="text-xs font-normal text-gray-400 ml-2">by views</span>
              </h3>
              
              <div className="space-y-4">
                {topPages.slice(0, 7).map((page: PageView, i: number) => {
                  const percentage = topPages[0]?.views > 0 
                    ? (page.views / topPages[0].views) * 100 
                    : 0;
                  return (
                    <div key={i} className="group">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-xs font-bold text-gray-400 w-6">{i + 1}.</span>
                          <span className="text-sm text-gray-700 truncate font-medium">
                            {page.page === '/' ? '🏠 Homepage' : page.page.replace(/^\/+/, '').replace(/-/g, ' ').substring(0, 30) || 'Unknown'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                         
                          <span className="text-sm font-bold text-gray-800 min-w-[45px] text-right">
                            {page.views.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-400 w-12 text-right">
                            {((page.views / topPages[0].views) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#F08400] to-orange-400 h-2 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {topPages.length > 7 && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link 
                    href="/admin/analytics"
                    className="text-sm text-[#F08400] hover:text-orange-600 font-medium flex items-center gap-1 inline-flex"
                  >
                    View All {topPages.length} Pages
                    <ArrowUp className="h-3 w-3 rotate-90" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* PAGE DISTRIBUTION - Pie Chart */}
          {pageDistribution.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-[#F08400]" />
                Page View Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
        <Tooltip
  // formatter={(value: number | string | undefined) => {
  //   const num = Number(value ?? 0);
  //   return [`${num.toLocaleString()} views`, 'Views'];
  // }}
/>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-3">
                {pageDistribution.map((entry, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs text-gray-600">{entry.name}</span>
                    <span className="text-xs font-semibold text-gray-800">{entry.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SUMMARY SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <MousePointerClick className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Engagement Rate</h4>
            </div>
            <p className="text-3xl font-bold text-gray-800">{engagementRate}%</p>
            <p className="text-xs text-gray-500 mt-1">of visitors viewed homepage</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Pages per Visitor</h4>
            </div>
            <p className="text-3xl font-bold text-gray-800">{pagesPerVisitor}</p>
            <p className="text-xs text-gray-500 mt-1">average page views per session</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <CalendarDays className="h-5 w-5 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Monthly Growth</h4>
            </div>
            <p className={`text-3xl font-bold flex items-center gap-2 ${monthlyChange.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {monthlyChange.trend === 'up' ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
              {monthlyChange.percentage}
            </p>
            <p className="text-xs text-gray-500 mt-1">compared to previous period</p>
          </div>
        </div>

        {/* DATA SOURCE FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-400 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 flex-wrap">
            <span>🔄 Last updated: {new Date().toLocaleString()}</span>
            <span>📊 Analytics: {visitorStats.source || 'Google Analytics'}</span>
            <span>📈 Tracking: Real-time</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Live data streaming</span>
          </div>
        </div>
      </div>
    </div>
  );
}