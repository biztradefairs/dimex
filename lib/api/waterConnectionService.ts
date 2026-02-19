import api from '../api';

export interface WaterConnectionConfig {
  id: string;
  costPerConnection: number;
  updatedAt: string;
  createdAt?: string;
}

export interface CostCalculation {
  costPerConnection: number;
  numberOfConnections: number;
  totalCost: number;
}

export interface BulkCalculationItem {
  name?: string;
  quantity: number;
  costPerConnection: number;
  totalCost: number;
}

export interface BulkCalculationResult {
  items: BulkCalculationItem[];
  grandTotal: number;
  rateApplied: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export const waterConnectionService = {
  // Get current configuration
  async getConfig(): Promise<ApiResponse<WaterConnectionConfig>> {
    try {
      const response = await api.get('/api/admin/water-connection/config');
      return response.data;
    } catch (error) {
      console.error('Error fetching water connection config:', error);
      throw error;
    }
  },

  // Update configuration
  async updateConfig(costPerConnection: number): Promise<ApiResponse<WaterConnectionConfig>> {
    try {
      const response = await api.put('/api/admin/water-connection/config', { costPerConnection });
      return response.data;
    } catch (error) {
      console.error('Error updating water connection config:', error);
      throw error;
    }
  },

  // Calculate cost
  async calculateCost(connections: number): Promise<ApiResponse<CostCalculation>> {
    try {
      const response = await api.post('/api/admin/water-connection/calculate', { connections });
      return response.data;
    } catch (error) {
      console.error('Error calculating cost:', error);
      throw error;
    }
  },

  // Bulk calculate
  async bulkCalculate(connections: Array<{ name?: string; quantity: number }>): Promise<ApiResponse<BulkCalculationResult>> {
    try {
      const response = await api.post('/api/admin/water-connection/calculate/bulk', { connections });
      return response.data;
    } catch (error) {
      console.error('Error in bulk calculation:', error);
      throw error;
    }
  },

  // Get rate history
  async getHistory(): Promise<ApiResponse<Array<{ costPerConnection: number; updatedAt: string }>>> {
    try {
      const response = await api.get('/api/admin/water-connection/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching rate history:', error);
      throw error;
    }
  },

  // Reset to default
  async resetToDefault(): Promise<ApiResponse<WaterConnectionConfig>> {
    try {
      const response = await api.post('/api/admin/water-connection/reset');
      return response.data;
    } catch (error) {
      console.error('Error resetting to default:', error);
      throw error;
    }
  },

  // Get statistics
  async getStatistics(): Promise<ApiResponse<any>> {
    try {
      const response = await api.get('/api/admin/water-connection/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }
};