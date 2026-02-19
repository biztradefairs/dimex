import api from '../api';

export interface HostessCategory {
  id: string;
  category: 'A' | 'B';
  ratePerDay: number;
  workingHours: number;
  description: string;
  isActive: boolean;
}

export interface HostessFilters {
  isActive?: boolean;
  category?: string;
}

export interface CostCalculation {
  category: 'A' | 'B';
  ratePerDay: number;
  workingHours: number;
  days: number;
  hours: number;
  totalCost: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface Statistics {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
  rateStats: {
    minRate: number;
    maxRate: number;
    avgRate: number;
  };
  categoryRates: HostessCategory[];
}

export const hostessCategoryService = {
  // Get all categories with optional filters
  async getAll(filters?: HostessFilters): Promise<ApiResponse<HostessCategory[]>> {
    try {
      const params = new URLSearchParams();
      if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive));
      if (filters?.category) params.append('category', filters.category);

      const url = params.toString() ? `/api/admin/hostess-rates?${params.toString()}` : '/api/admin/hostess-rates';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching hostess categories:', error);
      throw error;
    }
  },

  // Get single category by ID
  async getById(id: string): Promise<ApiResponse<HostessCategory>> {
    try {
      const response = await api.get(`/api/admin/hostess-rates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hostess category:', error);
      throw error;
    }
  },

  // Get category by type (A or B)
  async getByType(type: string): Promise<ApiResponse<HostessCategory>> {
    try {
      const response = await api.get(`/api/admin/hostess-rates/type/${type}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hostess category by type:', error);
      throw error;
    }
  },

  // Create new category
  async create(data: Partial<HostessCategory>): Promise<ApiResponse<HostessCategory>> {
    try {
      const response = await api.post('/api/admin/hostess-rates', data);
      return response.data;
    } catch (error) {
      console.error('Error creating hostess category:', error);
      throw error;
    }
  },

  // Update category
  async update(id: string, data: Partial<HostessCategory>): Promise<ApiResponse<HostessCategory>> {
    try {
      const response = await api.put(`/api/admin/hostess-rates/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating hostess category:', error);
      throw error;
    }
  },

  // Delete category
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await api.delete(`/api/admin/hostess-rates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting hostess category:', error);
      throw error;
    }
  },

  // Toggle status
  async toggleStatus(id: string, isActive: boolean): Promise<ApiResponse<HostessCategory>> {
    try {
      const response = await api.patch(`/api/admin/hostess-rates/${id}/toggle-status`, { isActive });
      return response.data;
    } catch (error) {
      console.error('Error toggling status:', error);
      throw error;
    }
  },

  // Calculate cost
  async calculateCost(category: string, days: number, hours?: number): Promise<ApiResponse<CostCalculation>> {
    try {
      const response = await api.post('/api/admin/hostess-rates/calculate', { category, days, hours });
      return response.data;
    } catch (error) {
      console.error('Error calculating cost:', error);
      throw error;
    }
  },

  // Get statistics
  async getStatistics(): Promise<ApiResponse<Statistics>> {
    try {
      const response = await api.get('/api/admin/hostess-rates/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  // Bulk update rates
  async bulkUpdate(updates: Array<{ category: string; ratePerDay: number; workingHours: number }>): Promise<ApiResponse> {
    try {
      const response = await api.patch('/api/admin/hostess-rates/bulk/update', { updates });
      return response.data;
    } catch (error) {
      console.error('Error bulk updating rates:', error);
      throw error;
    }
  }
};