import api from '../api';

export interface ElectricalRate {
  id: string;
  type: 'temporary' | 'exhibition' | 'both';
  ratePerKW: number;
  effectiveFrom: string;
  effectiveTo: string | null;
  isActive: boolean;
  description: string;
}

export interface ElectricalRateFilters {
  type?: string;
  isActive?: boolean;
  search?: string;
  effectiveDate?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface Statistics {
  totalRates: number;
  activeRates: number;
  inactiveRates: number;
  typeStats: Array<{
    type: string;
    count: number;
  }>;
  rateStats: {
    minRate: number;
    maxRate: number;
    avgRate: number;
  };
}

export const electricalRateService = {
  // Get all rates with optional filters
  async getAll(filters?: ElectricalRateFilters): Promise<ApiResponse<ElectricalRate[]>> {
    try {
      const params = new URLSearchParams();
      if (filters?.type) params.append('type', filters.type);
      if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive));
      if (filters?.search) params.append('search', filters.search);
      if (filters?.effectiveDate) params.append('effectiveDate', filters.effectiveDate);

      const url = params.toString() ? `/api/admin/electrical-rates?${params.toString()}` : '/api/admin/electrical-rates';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching electrical rates:', error);
      throw error;
    }
  },

  // Get single rate by ID
  async getById(id: string): Promise<ApiResponse<ElectricalRate>> {
    try {
      const response = await api.get(`/api/admin/electrical-rates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching electrical rate:', error);
      throw error;
    }
  },

  // Create new rate
  async create(data: Partial<ElectricalRate>): Promise<ApiResponse<ElectricalRate>> {
    try {
      const response = await api.post('/api/admin/electrical-rates', data);
      return response.data;
    } catch (error) {
      console.error('Error creating electrical rate:', error);
      throw error;
    }
  },

  // Update rate
  async update(id: string, data: Partial<ElectricalRate>): Promise<ApiResponse<ElectricalRate>> {
    try {
      const response = await api.put(`/api/admin/electrical-rates/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating electrical rate:', error);
      throw error;
    }
  },

  // Delete rate
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await api.delete(`/api/admin/electrical-rates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting electrical rate:', error);
      throw error;
    }
  },

  // Toggle status
  async toggleStatus(id: string, isActive: boolean): Promise<ApiResponse<ElectricalRate>> {
    try {
      const response = await api.patch(`/api/admin/electrical-rates/${id}/toggle-status`, { isActive });
      return response.data;
    } catch (error) {
      console.error('Error toggling status:', error);
      throw error;
    }
  },

  // Get active rate by type
  async getActiveRate(type: string, date?: string): Promise<ApiResponse<ElectricalRate>> {
    try {
      const url = date 
        ? `/api/admin/electrical-rates/active/${type}?date=${date}`
        : `/api/admin/electrical-rates/active/${type}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching active rate:', error);
      throw error;
    }
  },

  // Get statistics
  async getStatistics(): Promise<ApiResponse<Statistics>> {
    try {
      const response = await api.get('/api/admin/electrical-rates/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  // Bulk delete rates
  async bulkDelete(ids: string[]): Promise<ApiResponse> {
    try {
      const response = await api.delete('/api/admin/electrical-rates/bulk/delete', {
        data: { ids }
      });
      return response.data;
    } catch (error) {
      console.error('Error bulk deleting rates:', error);
      throw error;
    }
  }
};