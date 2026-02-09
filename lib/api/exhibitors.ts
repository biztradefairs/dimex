import axios from "axios";

/* =========================================================
   AXIOS INSTANCE
========================================================= */

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://diemex-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // ⬅️ Render-safe timeout
});

/* =========================================================
   REQUEST INTERCEPTOR
========================================================= */

api.interceptors.request.use(
  (config) => {
    console.log(`🌐 ${config.method?.toUpperCase()} ${config.url}`);

    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("exhibitor_token") ||
        localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

/* =========================================================
   RESPONSE INTERCEPTOR
========================================================= */

api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Auto logout on 401
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("exhibitor_token");
      localStorage.removeItem("exhibitor_data");
    }

    return Promise.reject(error);
  }
);

/* =========================================================
   TYPES
========================================================= */

export type ExhibitorStatus =
  | "pending"
  | "active"
  | "inactive"
  | "approved"
  | "rejected";

export interface Exhibitor {

  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  booth: string;
  status: ExhibitorStatus;
  originalPassword?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExhibitorStats {
  total: number;
  byStatus: Array<{ _id: string; count: number }>;
  bySector: Array<{ _id: string; count: number }>;
}

export interface CreateExhibitorData {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  boothNumber: string;
  password: string;
  status?: ExhibitorStatus;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
  error?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/* =========================================================
   OPTIONAL: HEALTH CHECK (NON-BLOCKING)
========================================================= */

export const testServerConnection = async () => {
  try {
    const response = await api.get("/health", {
      timeout: 20000,
    });

    return { success: true, data: response.data };
  } catch {
    return {
      success: false,
      error: "Backend is not reachable yet (cold start).",
    };
  }
};

/* =========================================================
   EXHIBITORS API
========================================================= */

export const exhibitorsAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sector?: string;
    status?: string;
  }): Promise<PaginatedResponse<Exhibitor>> => {
    const response = await api.get("/exhibitors", { params });

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch exhibitors");
    }

    return response.data;
  },

  getStats: async (): Promise<ExhibitorStats> => {
    const response = await api.get<ApiResponse<ExhibitorStats>>(
      "/exhibitors/stats"
    );

    if (!response.data.success) {
      throw new Error(
        response.data.error || "Failed to fetch exhibitor statistics"
      );
    }

    return response.data.data;
  },

  create: async (
    data: CreateExhibitorData
  ): Promise<Exhibitor & { originalPassword: string }> => {
    const response = await api.post("/exhibitors", data);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to create exhibitor");
    }

    return response.data.data;
  },

  update: async (
    id: string,
    data: Partial<CreateExhibitorData>
  ): Promise<Exhibitor> => {
    const response = await api.put(`/exhibitors/${id}`, data);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to update exhibitor");
    }

    return response.data.data;
  },

  bulkUpdateStatus: async (
    ids: string[],
    status: ExhibitorStatus
  ): Promise<{ affectedCount: number }> => {
    const response = await api.post("/exhibitors/bulk/update-status", {
      ids,
      status,
    });

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to update status");
    }

    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    const response = await api.delete(`/exhibitors/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to delete exhibitor");
    }
  },

  resendCredentials: async (
    id: string
  ): Promise<{ email: string; timestamp: string }> => {
    try {
      const response = await api.post(
        `/exhibitors/${id}/resend-credentials`,
        {},
        { timeout: 30000 }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.error || "Failed to resend credentials"
        );
      }

      return response.data.data;
    } catch (error: any) {
      if (
        error.code === "ECONNABORTED" ||
        error.message?.includes("timeout")
      ) {
        throw new Error(
          "Email service is slow. Please try again after some time."
        );
      }

      throw error;
    }
  },
};

/* =========================================================
   AUTH API (FIXED LOGIN FLOW)
========================================================= */

export const authAPI = {
  login: async (
    email: string,
    password: string
  ): Promise<{ token: string; exhibitor: Exhibitor }> => {
    try {
      console.log("🔐 Logging in:", email);

      const response = await api.post("/auth/exhibitor/login", {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.error || "Login failed");
      }

      return response.data.data;
    } catch (error: any) {
      let errorMessage = "Login failed";

      if (error.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (error.response?.status === 403) {
        errorMessage = "Account is not active. Contact administrator.";
      } else if (
        error.message?.includes("Network Error") ||
        error.message?.includes("timeout")
      ) {
        errorMessage =
          "Server is starting up. Please wait a few seconds and retry.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      throw new Error(errorMessage);
    }
  },

  getProfile: async (): Promise<Exhibitor> => {
    const response = await api.get("/auth/exhibitor/profile");

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch profile");
    }

    return response.data.data;
  },

  test: async () => {
    const response = await api.get("/auth/exhibitor/test");
    return response.data;
  },
};
/* =========================================================
   DASHBOARD API (RENDER SAFE)
========================================================= */

export interface DashboardData {
  exhibitor: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    boothNumber: string;
    status: string;
  };
  invoices: Array<{
    id: string;
    invoiceNumber: string;
    amount: number;
    status: string;
    dueDate?: string;
  }>;
  requirements: Array<{
    id: string;
    type: string;
    description: string;
    status: string;
  }>;
  floorPlan?: {
    name: string;
    floor: string;
  };
}

export const dashboardAPI = {
  getLayout: async (): Promise<DashboardData> => {
    const response = await api.get('/exhibitorDashboard/layout', {
      timeout: 30000, // Render cold start safe
    });

    if (!response.data.success) {
      throw new Error(
        response.data.error || 'Failed to load dashboard data'
      );
    }

    return response.data.data;
  },
};
