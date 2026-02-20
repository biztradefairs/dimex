// app/api/boothsAPI.ts
import api from "@/lib/api";

export interface FloorPlanData {
  id?: number;
  baseImageUrl: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
  name?: string;
  description?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const handleApiError = (error: any, defaultMessage: string): ApiResponse => {
  console.error('API Error Details:', {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data
  });
  
  let errorMessage = defaultMessage;
  
  if (error.response?.status === 401) {
    errorMessage = 'Authentication required. Please log in.';
  } else if (error.response?.data?.error) {
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

export const boothsAPI = {
  // Get floor plan - Use ONLY the correct endpoint
  getFloorPlan: async (): Promise<ApiResponse<FloorPlanData>> => {
    try {
      // Log what we're about to do
      console.log('Fetching floor plan from: /floor-plan/floor-plan');
      
      // Try ONLY the correct endpoint
      const response = await api.get('/floor-plan');
      console.log('Floor plan response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Get floor plan error:', {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data
      });
      
      // If unauthorized, clear token and maybe redirect
      if (error.response?.status === 401) {
        // Clear invalid token
        localStorage.removeItem('admin_token');
        localStorage.removeItem('exhibitor_token');
        
        // Optionally redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      
      return handleApiError(error, 'Failed to load floor plan');
    }
  },

  // Upload image
  uploadImage: async (formData: FormData): Promise<ApiResponse<FloorPlanData>> => {
    try {
      console.log('Uploading to: /floor-plan/upload-image');
      const response = await api.post('/floor-plan/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to upload image');
    }
  },

  // Reset floor plan
  reset: async (): Promise<ApiResponse> => {
    try {
      console.log('Resetting at: /floor-plan/reset');
      const response = await api.post('/floor-plan/reset');
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to reset floor plan');
    }
  },

  // Save floor plan
  saveFloorPlan: async (data: {
    baseImageUrl?: string | null;
    booths?: any[];
  }): Promise<ApiResponse> => {
    try {
      console.log('Saving to: /floor-plan/save-floor-plan');
      const response = await api.post("/floor-plan/save-floor-plan", data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Save failed"
      };
    }
  },
};