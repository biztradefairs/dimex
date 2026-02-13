// app/api/boothsAPI.js
import api from "@/lib/api";

export interface FloorPlanData {
  id?: number;
  baseImageUrl: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const handleApiError = (error: any, defaultMessage: string): ApiResponse => {
  console.error('API Error:', error);
  
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

export const boothsAPI = {
  // Get floor plan
  getFloorPlan: async (): Promise<ApiResponse<FloorPlanData>> => {
    try {
      const response = await api.get('/booths/floor-plan');
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to load floor plan');
    }
  },

  // Upload image
  uploadImage: async (formData: FormData): Promise<ApiResponse<FloorPlanData>> => {
    try {
      const response = await api.post('/booths/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to upload image');
    }
  },

  // Reset/Delete floor plan
  reset: async (): Promise<ApiResponse> => {
    try {
      const response = await api.post('/booths/reset');
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to reset floor plan');
    }
  },
saveFloorPlan: async (data: {
  baseImageUrl?: string | null;
  booths?: any[];
}) => {
  try {
    const response = await api.post("/booths/save-floor-plan", data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || "Save failed"
    };
  }
}
};