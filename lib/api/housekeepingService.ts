import api from '../api';

export interface HousekeepingConfig {
  id: string;
  chargesPerShift: number;
  shiftHours: number;
  description?: string;
  updatedAt: string;
  createdAt?: string;
}

export interface CostCalculation {
  chargesPerShift: number;
  shiftHours: number;
  numberOfShifts: number;
  totalCost: number;
}

export interface CustomHoursCalculation {
  chargesPerShift: number;
  shiftHours: number;
  hourlyRate: number;
  hours: number;
  numberOfStaff: number;
  totalCost: number;
}

export interface BulkCalculationItem {
  name?: string;
  shifts: number;
  chargesPerShift: number;
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

export const housekeepingService = {
  // Get current configuration
  async getConfig(): Promise<ApiResponse<HousekeepingConfig>> {
    try {
      const response = await api.get('/api/admin/housekeeping/config');
      return response.data;
    } catch (error) {
      console.error('Error fetching housekeeping config:', error);
      throw error;
    }
  },

  // Update configuration
  async updateConfig(chargesPerShift: number, shiftHours?: number): Promise<ApiResponse<HousekeepingConfig>> {
    try {
      const response = await api.put('/api/admin/housekeeping/config', { chargesPerShift, shiftHours });
      return response.data;
    } catch (error) {
      console.error('Error updating housekeeping config:', error);
      throw error;
    }
  },

  // Calculate cost for shifts
  async calculateCost(shifts: number): Promise<ApiResponse<CostCalculation>> {
    try {
      const response = await api.post('/api/admin/housekeeping/calculate', { shifts });
      return response.data;
    } catch (error) {
      console.error('Error calculating cost:', error);
      throw error;
    }
  },

  // Calculate cost for custom hours
  async calculateCustomHours(hours: number, staff: number = 1): Promise<ApiResponse<CustomHoursCalculation>> {
    try {
      const response = await api.post('/api/admin/housekeeping/calculate/custom', { hours, staff });
      return response.data;
    } catch (error) {
      console.error('Error calculating custom hours:', error);
      throw error;
    }
  },

  // Bulk calculate
  async bulkCalculate(shifts: Array<{ name?: string; shifts: number }>): Promise<ApiResponse<BulkCalculationResult>> {
    try {
      const response = await api.post('/api/admin/housekeeping/calculate/bulk', { shifts });
      return response.data;
    } catch (error) {
      console.error('Error in bulk calculation:', error);
      throw error;
    }
  },

  // Get rate history
  async getHistory(): Promise<ApiResponse<Array<{ chargesPerShift: number; shiftHours: number; updatedAt: string }>>> {
    try {
      const response = await api.get('/api/admin/housekeeping/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching rate history:', error);
      throw error;
    }
  },

  // Reset to default
  async resetToDefault(): Promise<ApiResponse<HousekeepingConfig>> {
    try {
      const response = await api.post('/api/admin/housekeeping/reset');
      return response.data;
    } catch (error) {
      console.error('Error resetting to default:', error);
      throw error;
    }
  },

  // Get statistics
  async getStatistics(): Promise<ApiResponse<any>> {
    try {
      const response = await api.get('/api/admin/housekeeping/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }
};