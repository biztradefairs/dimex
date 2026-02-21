// app/api/boothsAPI.ts
import api from "@/lib/api";
import axios from "axios";

export interface FloorPlanData {
  id?: number;
  baseImageUrl: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
  name?: string;
  description?: string;
  cloudinaryPublicId?: string;
  booths?: any[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://diemex-backend.onrender.com/api";

const handleApiError = (error: any, defaultMessage: string): ApiResponse => {
  console.error("API Error Details:", {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });

  return {
    success: false,
    error:
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      defaultMessage,
  };
};

export const boothsAPI = {
  // ==========================
  // GET FLOOR PLAN
  // ==========================
  getFloorPlan: async (): Promise<ApiResponse<FloorPlanData>> => {
    try {
      const response = await api.get("/floor-plan");
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to load floor plan");
    }
  },

  // ==========================
  // UPLOAD IMAGE - FIXED VERSION
  // ==========================
uploadImage: async (formData: FormData) => {
  try {
    const token =
      localStorage.getItem("admin_token") ||
      localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.post(
      `${API_BASE_URL}/floor-plan/upload-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("UPLOAD ERROR FULL:", error.response?.data);
    throw error;
  }
},

  // Alternative upload method using direct fetch
  uploadImageFetch: async (
    formData: FormData
  ): Promise<ApiResponse<FloorPlanData>> => {
    try {
      const token =
        localStorage.getItem("admin_token") ||
        localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/floor-plan/upload-image`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          // Do NOT set Content-Type header
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      return data;
    } catch (error: any) {
      return handleApiError(error, "Failed to upload image");
    }
  },

  // ==========================
  // RESET FLOOR PLAN
  // ==========================
  reset: async (): Promise<ApiResponse> => {
    try {
      const response = await api.post("/floor-plan/reset");
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to reset floor plan");
    }
  },

  // ==========================
  // SAVE FLOOR PLAN
  // ==========================
  saveFloorPlan: async (data: {
    baseImageUrl?: string | null;
    booths?: any[];
  }): Promise<ApiResponse> => {
    try {
      const response = await api.post(
        "/floor-plan/save-floor-plan",
        data
      );
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Save failed");
    }
  },

  // ==========================
  // ADD BOOTH
  // ==========================
  addBooth: async (boothData: any): Promise<ApiResponse> => {
    try {
      const response = await api.post("/floor-plan/booth", boothData);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to add booth");
    }
  },

  // ==========================
  // UPDATE BOOTH
  // ==========================
  updateBooth: async (boothId: string, updateData: any): Promise<ApiResponse> => {
    try {
      const response = await api.put(`/floor-plan/booth/${boothId}`, updateData);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to update booth");
    }
  },

  // ==========================
  // DELETE BOOTH
  // ==========================
  deleteBooth: async (boothId: string): Promise<ApiResponse> => {
    try {
      const response = await api.delete(`/floor-plan/booth/${boothId}`);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to delete booth");
    }
  },

  // ==========================
  // GET STATISTICS
  // ==========================
  getStatistics: async (): Promise<ApiResponse> => {
    try {
      const response = await api.get("/floor-plan/statistics");
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to get statistics");
    }
  }
};