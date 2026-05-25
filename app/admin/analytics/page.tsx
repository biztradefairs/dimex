'use client';

import {
  ArrowLeft,
  Search,
  Eye,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  BarChart3,
  Activity,
  Users,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useDashboard } from '@/hooks/useDashboard';
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface PageView {
  page: string;
  views: number;
}

interface VisitorDay {
  date: string;
  count: number;
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

const COLORS = ['#F08400', '#F59E0B', '#FCD34D', '#FDE68A', '#FFEDD5', '#FFF7ED', '#FEF3C7', '#FFFBEB'];

export default function AnalyticsPage() {
  const { summary, isLoading, error, refresh } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'views' | 'name'>('views');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedPage, setSelectedPage] = useState<PageView | null>(null);
  const itemsPerPage = 20;

  // Move these BEFORE any conditional returns
  const data = summary as DashboardData;
  const visitorStats = data?.visitors || { 
    total: 0, today: 0, week: 0, month: 0, 
    source: 'google-analytics', last7Days: [], pages: [] 
  };
  
  const allPages = visitorStats.pages || [];
  const last7Days = visitorStats.last7Days || [];
  
  // Filter pages based on search - MOVED BEFORE CONDITIONAL RETURNS
  const filteredPages = useMemo(() => {
    let pages = [...allPages];
    
    if (searchTerm) {
      pages = pages.filter(page => 
        page.page.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort
    pages.sort((a, b) => {
      if (sortBy === 'views') {
        return sortOrder === 'desc' ? b.views - a.views : a.views - b.views;
      } else {
        const aName = a.page === '/' ? 'homepage' : a.page;
        const bName = b.page === '/' ? 'homepage' : b.page;
        return sortOrder === 'desc' 
          ? bName.localeCompare(aName) 
          : aName.localeCompare(bName);
      }
    });
    
    return pages;
  }, [allPages, searchTerm, sortBy, sortOrder]);

  // Pagination - MOVED BEFORE CONDITIONAL RETURNS
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalViews = allPages.reduce((sum, p) => sum + p.views, 0);
  const uniquePages = allPages.length;

  // Prepare chart data for visitor trends - MOVED BEFORE CONDITIONAL RETURNS
  const visitorTrendData = last7Days.map(day => ({
    date: new Date(day.date.slice(0, 4) + '-' + day.date.slice(4, 6) + '-' + day.date.slice(6, 8)),
    visitors: day.count,
    formattedDate: new Date(day.date.slice(0, 4) + '-' + day.date.slice(4, 6) + '-' + day.date.slice(6, 8)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  // Prepare top pages data for chart - MOVED BEFORE CONDITIONAL RETURNS
  const topPagesChart = allPages.slice(0, 10).map(page => ({
    name: page.page === '/' ? 'Homepage' : page.page.replace(/^\/+/, '').substring(0, 25),
    views: page.views,
    fullPath: page.page
  }));

  // Calculate stats - MOVED BEFORE CONDITIONAL RETURNS
  const engagementRate = ((topPagesChart[0]?.views || 0) / (visitorStats.total || 1) * 100).toFixed(1);
  const pagesPerVisitor = (totalViews / (visitorStats.total || 1)).toFixed(1);

  // Custom Tooltip - MOVED BEFORE CONDITIONAL RETURNS
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{payload[0].payload.formattedDate || payload[0].payload.name}</p>
          <p className="text-2xl font-bold text-[#F08400]">
            {payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">views</p>
        </div>
      );
    }
    return null;
  };

  // Format page name for display
  const formatPageName = (pagePath: string) => {
    if (pagePath === '/') return '🏠 Homepage';
    let name = pagePath.replace(/^\/+/, '').replace(/-/g, ' ');
    name = name.split('/').pop() || name;
    return name.length > 40 ? name.substring(0, 40) + '...' : name;
  };

  const getPageIcon = (pagePath: string) => {
    if (pagePath === '/') return '🏠';
    if (pagePath.includes('exhibition')) return '📋';
    if (pagePath.includes('admin')) return '🔧';
    if (pagePath.includes('contact')) return '📞';
    if (pagePath.includes('article')) return '📝';
    if (pagePath.includes('login')) return '🔐';
    return '📄';
  };

  const handleRefresh = () => {
    refresh();
    toast.success('Analytics refreshed');
  };

  const handleExport = () => {
    toast.success('Export started');
  };

  // Now the conditional returns - AFTER all hooks have been called
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-[#F08400] mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics data...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Page Analytics
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Detailed page view statistics and visitor behavior
              </p>
            </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Page Views</p>
                <p className="text-xl font-bold text-gray-800">{totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Unique Pages</p>
                <p className="text-xl font-bold text-gray-800">{uniquePages}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Visitors</p>
                <p className="text-xl font-bold text-gray-800">{visitorStats.total.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pages/Visitor</p>
                <p className="text-xl font-bold text-gray-800">{pagesPerVisitor}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Homepage Rate</p>
                <p className="text-xl font-bold text-gray-800">{engagementRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* VISITOR TREND CHART */}
        {visitorTrendData.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#F08400]" />
              Visitor Trend (Last 7 Days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={visitorTrendData}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F08400" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F08400" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#F08400"
                  strokeWidth={3}
                  fill="url(#visitorGradient)"
                  name="Visitors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* TOP PAGES BAR CHART */}
        {topPagesChart.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#F08400]" />
              Top 10 Pages by Views
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topPagesChart} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fill: '#6B7280', fontSize: 11 }}
                  width={120}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="views" fill="#F08400" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* PAGES TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                All Pages ({filteredPages.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F08400] focus:border-transparent w-full sm:w-64"
                  />
                </div>
                
                {/* Sort Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSortBy('views');
                      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                    }}
                    className={`px-3 py-2 text-sm rounded-lg border transition ${
                      sortBy === 'views' 
                        ? 'bg-[#F08400] text-white border-[#F08400]' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Views {sortBy === 'views' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      setSortBy('name');
                      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                    }}
                    className={`px-3 py-2 text-sm rounded-lg border transition ${
                      sortBy === 'name' 
                        ? 'bg-[#F08400] text-white border-[#F08400]' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Name {sortBy === 'name' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">% of Total</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">vs Top</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPages.map((page, index) => {
                  const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                  const percentage = ((page.views / totalViews) * 100).toFixed(1);
                  const vsTop = topPagesChart[0]?.views ? ((page.views / topPagesChart[0].views) * 100).toFixed(1) : '0';
                  return (
                    <tr 
                      key={page.page} 
                      className="hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => setSelectedPage(page)}
                    >
                      <td className="py-3 px-4 text-sm text-gray-500">{globalIndex}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getPageIcon(page.page)}</span>
                          <span className="text-sm font-medium text-gray-800">
                            {formatPageName(page.page)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">{page.page}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          <span className="text-sm font-semibold text-gray-800">{page.views.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-sm text-gray-600">{percentage}%</span>
                          <div className="w-16 bg-gray-100 rounded-full h-1.5">
                            <div 
                              className="bg-[#F08400] h-1.5 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-sm text-gray-500">{vsTop}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredPages.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No pages found matching your search</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPages.length)} of {filteredPages.length} pages
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg text-sm transition ${
                          currentPage === pageNum
                            ? 'bg-[#F08400] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DATA SOURCE FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-400 pt-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span>🔄 Last updated: {new Date().toLocaleString()}</span>
            <span>📊 Analytics: {visitorStats.source || 'Google Analytics'}</span>
            <span>📄 Total pages tracked: {uniquePages}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Live data streaming</span>
          </div>
        </div>
      </div>

      {/* Page Detail Modal */}
      {selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPage(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getPageIcon(selectedPage.page)}</span>
                  <h3 className="text-xl font-bold text-gray-800">{formatPageName(selectedPage.page)}</h3>
                </div>
                <p className="text-sm text-gray-500 font-mono break-all">{selectedPage.page}</p>
              </div>
              <button onClick={() => setSelectedPage(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  {/* <Eye className="h-6 w-6 text-[#F08400] mx-auto mb-2" /> */}
                  <p className="text-2xl font-bold text-gray-800">{selectedPage.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Views</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <BarChart3 className="h-6 w-6 text-[#F08400] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">
                    {((selectedPage.views / totalViews) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">of Total Views</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">vs Top Page</span>
                  <span className="font-semibold text-gray-800">
                    {topPagesChart[0]?.views ? ((selectedPage.views / topPagesChart[0].views) * 100).toFixed(1) : '0'}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#F08400] h-2 rounded-full"
                    style={{ width: `${topPagesChart[0]?.views ? (selectedPage.views / topPagesChart[0].views) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedPage(null)}
              className="mt-6 w-full bg-[#F08400] text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}