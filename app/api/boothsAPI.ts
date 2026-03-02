import axios from "axios";

/* ================= TYPES ================= */

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

/* ================= BASE URL ================= */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://diemex-backend.onrender.com/api";

/* ================= AXIOS INSTANCE ================= */

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

/* ================= TOKEN INTERCEPTOR ================= */

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("admin_token") ||
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ================= ERROR HANDLER ================= */

const handleApiError = (
  error: any,
  defaultMessage: string
): ApiResponse => {
  console.error("API ERROR:", {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    data: error.response?.data,
    message: error.message,
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

/* ================= MAIN EXPORT ================= */

export const boothsAPI = {
  /* ================= GET FLOOR PLAN ================= */
  getFloorPlan: async (): Promise<ApiResponse<FloorPlanData>> => {
    try {
      const response = await api.get("/floor-plan");
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to load floor plan");
    }
  },

  /* ================= UPLOAD IMAGE ================= */
  uploadImage: async (
    formData: FormData
  ): Promise<ApiResponse> => {
    try {
      const response = await api.post(
        "/floor-plan/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Upload failed");
    }
  },

  /* ================= RESET FLOOR PLAN ================= */
  reset: async (): Promise<ApiResponse> => {
    try {
      const response = await api.post("/floor-plan/reset");
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to reset floor plan");
    }
  },

  /* ================= SAVE FLOOR PLAN ================= */
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

  /* ================= ADD BOOTH ================= */
  addBooth: async (boothData: any): Promise<ApiResponse> => {
    try {
      const response = await api.post(
        "/floor-plan/booth",
        boothData
      );
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to add booth");
    }
  },

  /* ================= UPDATE BOOTH ================= */
  updateBooth: async (
    boothId: string,
    updateData: any
  ): Promise<ApiResponse> => {
    try {
      const response = await api.put(
        `/floor-plan/booth/${boothId}`,
        updateData
      );
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to update booth");
    }
  },

  /* ================= DELETE BOOTH ================= */
  deleteBooth: async (
    boothId: string
  ): Promise<ApiResponse> => {
    try {
      const response = await api.delete(
        `/floor-plan/booth/${boothId}`
      );
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to delete booth");
    }
  },

  /* ================= GET STATISTICS ================= */
  getStatistics: async (): Promise<ApiResponse> => {
    try {
      const response = await api.get(
        "/floor-plan/statistics"
      );
      return response.data;
    } catch (error: any) {
      return handleApiError(error, "Failed to get statistics");
    }
  },
};