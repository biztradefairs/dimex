// lib/api/dashboard.ts
import axios from 'axios';
import api from '../api';

// Visitor data with full analytics
export interface VisitorData {
  total: number;
  today: number;
  week: number;
  month?: number;
  source?: string;
  last7Days?: Array<{ date: string; count: number }>;
  pages?: Array<{ page: string; views: number }>;
  devices?: Array<{ device: string; count: number }>;
  locations?: Array<{ location: string; count: number }>;
}

// Exhibitor stats from API
export interface ExhibitorStatsData {
  total: number;
  active: number;
  pending: number;
  approved: number;
  rejected: number;
  inactive: number;
  newThisWeek: number;
  bySector: Array<{ sector: string; count: number }>;
}

// User stats
export interface UserStatsData {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  editors: number;
  viewers: number;
  newThisWeek: number;
}

// Revenue data
export interface RevenueData {
  totalRevenue: number;
  monthRevenue: number;
  pendingAmount: number;
  invoices?: {
    total: number;
    paid: number;
    pending: number;
  };
}

// Articles data
export interface ArticlesData {
  total: number;
  published: number;
  recent: Array<{
    id: number;
    title: string;
    views: number;
    status: string;
  }>;
}

// Full dashboard summary matching your API response
export interface DashboardSummary {
  users?: UserStatsData;
  exhibitors?: ExhibitorStatsData;
  visitors?: VisitorData;
  revenue?: RevenueData;
  articles?: ArticlesData;
  activities?: Array<{
    id: number;
    action: string;
    user: string;
    time: string;
  }>;
}

export const dashboardAPI = {
  // Get full dashboard summary from your API - NO MOCK DATA
  getSummary: async (): Promise<{ success: boolean; data?: DashboardSummary; error?: string }> => {
    try {
      const response = await api.get('/api/dashboard/summary');
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data
        };
      }
      
      return {
        success: false,
        error: response.data?.error || 'Failed to load dashboard data'
      };
    } catch (error: any) {
      console.error('Dashboard summary error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch dashboard data'
      };
    }
  },

  // Get exhibitor stats
  getExhibitorStats: async (): Promise<{ success: boolean; data?: ExhibitorStatsData; error?: string }> => {
    try {
      const response = await api.get('/api/exhibitor-stats/count');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching exhibitor stats:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch exhibitor stats'
      };
    }
  },

  // Get visitor stats
  getVisitorStats: async (): Promise<{ success: boolean; data?: VisitorData; error?: string }> => {
    try {
      const response = await api.get('/api/exhibitor-stats/visitor-count');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching visitor stats:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch visitor stats'
      };
    }
  },

  // Health check
  getHealth: async () => {
    try {
      const healthApi = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000',
        timeout: 5000,
      });
      const response = await healthApi.get('/health');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};