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
  booth: string;        // For frontend display (maps from boothNumber)
  boothNumber?: string; // Original from backend
  boothSize?: string;
  boothType?: string;
  boothDimensions?: string;
  boothNotes?: string;
  status: string;
  originalPassword?: string;
  createdAt: string;
  stallDetails?: {
    size?: string;
    type?: string;
    dimensions?: string;
    notes?: string;
  };
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
  status: string;
  // Add booth size fields
  boothSize?: string;
  boothType?: string;
  boothDimensions?: string;
  boothNotes?: string;
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
   HELPER FUNCTION TO MAP EXHIBITOR DATA
========================================================= */

const mapExhibitorData = (data: any): Exhibitor => {
  // Parse stallDetails if it exists
  let stallDetails = data.stallDetails || {};
  if (typeof stallDetails === 'string') {
    try {
      stallDetails = JSON.parse(stallDetails);
    } catch {
      stallDetails = {};
    }
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    company: data.company,
    sector: data.sector || '',
    booth: data.boothNumber || data.booth || "Not assigned",
    boothNumber: data.boothNumber,
    boothSize: data.boothSize || stallDetails?.size || '',
    boothType: data.boothType || stallDetails?.type || 'standard',
    boothDimensions: data.boothDimensions || stallDetails?.dimensions || '',
    boothNotes: data.boothNotes || stallDetails?.notes || '',
    status: data.status === 'approved' ? 'active' : data.status,
    originalPassword: data.originalPassword,
    createdAt: data.createdAt,
    stallDetails: stallDetails
  };
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

    // Map each exhibitor to ensure proper data structure
    const mappedData = response.data.data.map(mapExhibitorData);

    return {
      ...response.data,
      data: mappedData
    };
  },

  // Get single exhibitor by ID
  getById: async (id: string): Promise<ApiResponse<Exhibitor>> => {
    const response = await api.get(`/exhibitors/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch exhibitor");
    }

    // Map the data to ensure proper structure
    const mappedData = mapExhibitorData(response.data.data);

    return {
      ...response.data,
      data: mappedData
    };
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
    // Prepare data for backend - include stallDetails structure
    const backendData = {
      ...data,
      boothNumber: data.boothNumber,
      stallDetails: {
        size: data.boothSize || '',
        type: data.boothType || 'standard',
        dimensions: data.boothDimensions || '',
        notes: data.boothNotes || ''
      }
    };

    const response = await api.post("/exhibitors", backendData);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to create exhibitor");
    }

    // Map response to include all fields
    const mappedResponse = mapExhibitorData(response.data.data);
    
    return {
      ...mappedResponse,
      originalPassword: response.data.data.originalPassword || data.password
    };
  },

  update: async (
    id: string,
    data: Partial<CreateExhibitorData>
  ): Promise<Exhibitor> => {
    // Prepare data for backend
    const backendData: any = {
      ...data,
      boothNumber: data.boothNumber,
    };

    // Include stallDetails if booth fields are provided
    if (data.boothSize || data.boothType || data.boothDimensions || data.boothNotes) {
      backendData.stallDetails = {
        size: data.boothSize || '',
        type: data.boothType || 'standard',
        dimensions: data.boothDimensions || '',
        notes: data.boothNotes || ''
      };
    }

    const response = await api.put(`/exhibitors/${id}`, backendData);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to update exhibitor");
    }

    // Map response to include all fields
    return mapExhibitorData(response.data.data);
  },

  bulkUpdateStatus: async (
    ids: string[],
    status: string
  ): Promise<{ affectedCount: number }> => {
    // Validate that status is a valid ExhibitorStatus
    const validStatuses: ExhibitorStatus[] = ["pending", "active", "inactive", "approved", "rejected"];
    
    if (!validStatuses.includes(status as ExhibitorStatus)) {
      throw new Error(`Invalid status: ${status}`);
    }

    const response = await api.post("/exhibitors/bulk/update-status", {
      ids,
      status: status as ExhibitorStatus,
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
   AUTH API
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

      // Map the exhibitor data
      const mappedExhibitor = mapExhibitorData(response.data.data.exhibitor);

      return {
        token: response.data.data.token,
        exhibitor: mappedExhibitor
      };
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

    return mapExhibitorData(response.data.data);
  },

  test: async () => {
    const response = await api.get("/auth/exhibitor/test");
    return response.data;
  },
};

/* =========================================================
   DASHBOARD API
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
      timeout: 30000,
    });

    if (!response.data.success) {
      throw new Error(
        response.data.error || 'Failed to load dashboard data'
      );
    }

    return response.data.data;
  },
};