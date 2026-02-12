import api from '@/lib/api';
import { ApiResponse } from '@/lib/api/floorPlans';

export interface Booth {
  id: string;
  boothNumber: string;
  companyName: string;
  status: 'available' | 'booked' | 'reserved';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BoothStatistics {
  total: number;
  available: number;
  booked: number;
  reserved: number;
  occupied: number;
}

// ==============================
// 🔹 Common API Error Handler
// ==============================
const handleApiError = <T>(
  error: any,
  defaultMessage: string
): ApiResponse<T> => {
  console.error('Booth API Error:', error);

  let errorMessage = defaultMessage;

  if (error.response?.data?.error) {
    errorMessage = error.response.data.error;
  } else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error.message) {
    errorMessage = error.message;
  }

  return {
    success: false,
    error: errorMessage,
  };
};

// ==============================
// 🔹 Booth API Methods
// ==============================
export const boothsAPI = {
  // Get all booths
  getAll: async (): Promise<ApiResponse<Booth[]>> => {
    try {
      const response = await api.get('/booths');

      if (response.data?.success) {
        return {
          success: true,
          data: response.data.data || [],
          floorPlanId: response.data.floorPlanId,
        };
      }

      return {
        success: false,
        error: 'Failed to load booths',
      };
    } catch (error: any) {
      return handleApiError<Booth[]>(error, 'Failed to fetch booths');
    }
  },

  // Get booth statistics
  getStatistics: async (): Promise<ApiResponse<BoothStatistics>> => {
    try {
      const response = await api.get('/booths/statistics');

      if (response.data?.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        error: 'Failed to load statistics',
      };
    } catch (error: any) {
      return handleApiError<BoothStatistics>(
        error,
        'Failed to fetch statistics'
      );
    }
  },

  // Add new booth
  add: async (
    boothData: Omit<Booth, 'id'>
  ): Promise<ApiResponse<Booth>> => {
    try {
      const response = await api.post('/booths', boothData);

      if (response.data?.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Booth added successfully',
        };
      }

      return {
        success: false,
        error: 'Failed to add booth',
      };
    } catch (error: any) {
      return handleApiError<Booth>(error, 'Failed to add booth');
    }
  },

  // Update booth
  update: async (
    boothId: string,
    updateData: Partial<Booth>
  ): Promise<ApiResponse<Booth>> => {
    try {
      const response = await api.put(`/booths/${boothId}`, updateData);

      if (response.data?.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Booth updated successfully',
        };
      }

      return {
        success: false,
        error: 'Failed to update booth',
      };
    } catch (error: any) {
      return handleApiError<Booth>(error, 'Failed to update booth');
    }
  },

  // Update booth status
  updateStatus: async (
    boothId: string,
    status: 'available' | 'booked' | 'reserved'
  ): Promise<ApiResponse<Booth>> => {
    try {
      const response = await api.patch(
        `/booths/${boothId}/status`,
        { status }
      );

      if (response.data?.success) {
        return {
          success: true,
          data: response.data.data,
          message:
            response.data.message ||
            `Booth status updated to ${status}`,
        };
      }

      return {
        success: false,
        error: 'Failed to update booth status',
      };
    } catch (error: any) {
      return handleApiError<Booth>(
        error,
        'Failed to update booth status'
      );
    }
  },

  // Update company name
  updateCompanyName: async (
    boothId: string,
    companyName: string
  ): Promise<ApiResponse<Booth>> => {
    try {
      const response = await api.patch(
        `/booths/${boothId}/company`,
        { companyName }
      );

      if (response.data?.success) {
        return {
          success: true,
          data: response.data.data,
          message:
            response.data.message ||
            'Company name updated successfully',
        };
      }

      return {
        success: false,
        error: 'Failed to update company name',
      };
    } catch (error: any) {
      return handleApiError<Booth>(
        error,
        'Failed to update company name'
      );
    }
  },

  // Delete booth
  delete: async (
    boothId: string
  ): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/booths/${boothId}`);

      if (response.data?.success) {
        return {
          success: true,
          message:
            response.data.message ||
            'Booth deleted successfully',
        };
      }

      return {
        success: false,
        error: 'Failed to delete booth',
      };
    } catch (error: any) {
      return handleApiError<null>(
        error,
        'Failed to delete booth'
      );
    }
  },

  // Bulk update booths
  bulkUpdate: async (
    updates: Array<Partial<Booth> & { id: string }>
  ): Promise<ApiResponse<Booth[]>> => {
    try {
      const response = await api.post(
        '/booths/bulk-update',
        { updates }
      );

      if (response.data?.success) {
        return {
          success: true,
          data: response.data.data,
          message:
            response.data.message ||
            `${updates.length} booths updated successfully`,
        };
      }

      return {
        success: false,
        error: 'Failed to bulk update booths',
      };
    } catch (error: any) {
      return handleApiError<Booth[]>(
        error,
        'Failed to bulk update booths'
      );
    }
  },

  // Reset floor plan
  reset: async (): Promise<ApiResponse<null>> => {
    try {
      const response = await api.post('/booths/reset');

      if (response.data?.success) {
        return {
          success: true,
          message:
            response.data.message ||
            'Floor plan reset to default',
        };
      }

      return {
        success: false,
        error: 'Failed to reset floor plan',
      };
    } catch (error: any) {
      return handleApiError<null>(
        error,
        'Failed to reset floor plan'
      );
    }
  },
};
