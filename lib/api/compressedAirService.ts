import api from '../api';

export interface CompressedAirOption {
  id: string;
  cfmRange: string;
  costPerConnection: number;
  powerKW: number;
  isActive: boolean;
  displayOrder: number;
  totalCost?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export const compressedAirService = {
  // Get all options
  async getAll(): Promise<ApiResponse<CompressedAirOption[]>> {
    try {
      const response = await api.get('/api/admin/compressed-air');
      return response.data;
    } catch (error) {
      console.error('Error fetching options:', error);
      throw error;
    }
  },

  // Create new option
  async create(data: Partial<CompressedAirOption>): Promise<ApiResponse<CompressedAirOption>> {
    try {
      const response = await api.post('/api/admin/compressed-air', data);
      return response.data;
    } catch (error) {
      console.error('Error creating option:', error);
      throw error;
    }
  },

  // Update option
  async update(id: string, data: Partial<CompressedAirOption>): Promise<ApiResponse<CompressedAirOption>> {
    try {
      const response = await api.put(`/api/admin/compressed-air/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating option:', error);
      throw error;
    }
  },

  // Delete option
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await api.delete(`/api/admin/compressed-air/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting option:', error);
      throw error;
    }
  },

  // Toggle status
  async toggleStatus(id: string, isActive: boolean): Promise<ApiResponse<CompressedAirOption>> {
    try {
      const response = await api.patch(`/api/admin/compressed-air/${id}/toggle-status`, { isActive });
      return response.data;
    } catch (error) {
      console.error('Error toggling status:', error);
      throw error;
    }
  }
};