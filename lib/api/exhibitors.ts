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
  timeout: 60000, // ⬅️ Render-safe timeout
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
        localStorage.getItem("token") ||
        localStorage.getItem("admin_token");

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
      localStorage.removeItem("token");
      localStorage.removeItem("admin_token");
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
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

  address?: string;
  website?: string;

  booth: string;
  boothNumber?: string;
  boothSize?: string;
  boothType?: string;
  boothDimensions?: string;
  boothNotes?: string;

  status: string;
  originalPassword?: string;
  createdAt: string;

  stallDetails?: {
    hall?: string;
    pavilion?: string;
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
    id: data.id || data._id,
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    company: data.company || '',
    sector: data.sector || '',
    booth: data.boothNumber || data.booth || "Not assigned",
    boothNumber: data.boothNumber || data.booth,
    boothSize: data.boothSize || stallDetails?.size || '',
    boothType: data.boothType || stallDetails?.type || 'standard',
    boothDimensions: data.boothDimensions || stallDetails?.dimensions || '',
    boothNotes: data.boothNotes || stallDetails?.notes || '',
    status: data.status === 'approved' ? 'active' : (data.status || 'pending'),
    originalPassword: data.originalPassword,
    createdAt: data.createdAt || new Date().toISOString(),
    address: data.address,
    website: data.website,
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
    try {
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
    } catch (error: any) {
      console.error("Error fetching exhibitors:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to fetch exhibitors");
    }
  },

  // Get single exhibitor by ID
  getById: async (id: string): Promise<ApiResponse<Exhibitor>> => {
    try {
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
    } catch (error: any) {
      console.error("Error fetching exhibitor:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to fetch exhibitor");
    }
  },

  getStats: async (): Promise<ExhibitorStats> => {
    try {
      const response = await api.get<ApiResponse<ExhibitorStats>>(
        "/exhibitors/stats"
      );

      if (!response.data.success) {
        throw new Error(
          response.data.error || "Failed to fetch exhibitor statistics"
        );
      }

      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching stats:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to fetch stats");
    }
  },

  create: async (
    data: CreateExhibitorData
  ): Promise<Exhibitor & { originalPassword: string }> => {
    try {
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

      console.log("📤 Creating exhibitor with data:", backendData);

      const response = await api.post("/exhibitors", backendData);

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to create exhibitor");
      }

      const createdExhibitor = response.data.data;
      
      // Send credentials email using the new route
      try {
        const emailData = {
          email: createdExhibitor.email,
          name: createdExhibitor.name,
          company: createdExhibitor.company,
          password: createdExhibitor.originalPassword || data.password,
          boothNumber: createdExhibitor.boothNumber || data.boothNumber,
          loginUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin}/login`
        };

        console.log("📧 Sending credentials email to:", emailData.email);
        
        await api.post('/exhibitor-credentials/send-credentials', emailData, {
          timeout: 30000
        });
        
        console.log(`✅ Credentials email sent to ${createdExhibitor.email}`);
      } catch (emailError: any) {
        console.error("❌ Failed to send credentials email:", emailError);
        console.error("Email error details:", {
          message: emailError.message,
          response: emailError.response?.data,
          status: emailError.response?.status
        });
        // Don't fail the creation if email fails, just log it
      }

      // Map response to include all fields
      const mappedResponse = mapExhibitorData(createdExhibitor);
      
      return {
        ...mappedResponse,
        originalPassword: createdExhibitor.originalPassword || data.password
      };
    } catch (error: any) {
      console.error("Error creating exhibitor:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to create exhibitor");
    }
  },

  update: async (
    id: string,
    data: Partial<CreateExhibitorData>
  ): Promise<Exhibitor> => {
    try {
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

      console.log("📤 Updating exhibitor:", id, backendData);

      const response = await api.put(`/exhibitors/${id}`, backendData);

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to update exhibitor");
      }

      // Map response to include all fields
      return mapExhibitorData(response.data.data);
    } catch (error: any) {
      console.error("Error updating exhibitor:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to update exhibitor");
    }
  },

  bulkUpdateStatus: async (
    ids: string[],
    status: string
  ): Promise<{ affectedCount: number }> => {
    try {
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
    } catch (error: any) {
      console.error("Error bulk updating status:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to update status");
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await api.delete(`/exhibitors/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to delete exhibitor");
      }
    } catch (error: any) {
      console.error("Error deleting exhibitor:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to delete exhibitor");
    }
  },

  resendCredentials: async (
    id: string
  ): Promise<{ success: boolean; message: string; recipient: string }> => {
    try {
      console.log(`📧 Resending credentials for exhibitor: ${id}`);
      
      // First get the exhibitor details
      const exhibitorResponse = await exhibitorsAPI.getById(id);
      const exhibitor = exhibitorResponse.data;
      
      if (!exhibitor) {
        throw new Error("Exhibitor not found");
      }
      
      console.log("📋 Exhibitor details for email:", {
        id: exhibitor.id,
        email: exhibitor.email,
        name: exhibitor.name,
        company: exhibitor.company
      });
      
      // Prepare the data for email
      const emailData = {
        exhibitorId: id,
        email: exhibitor.email,
        name: exhibitor.name,
        company: exhibitor.company,
        password: exhibitor.originalPassword || 'Please check your welcome email for the password',
        boothNumber: exhibitor.booth || exhibitor.boothNumber,
        loginUrl: `${window.location.origin}/login`
      };
      
      console.log("📧 Sending credentials email with data:", {
        ...emailData,
        password: emailData.password === 'Please check your welcome email for the password' ? '[HIDDEN]' : '[PASSWORD INCLUDED]'
      });
      
      // Send credentials using the new route
      const response = await api.post('/exhibitor-credentials/send-credentials', emailData, {
        timeout: 30000
      });

      console.log("📧 Email API response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to send credentials");
      }

      return {
        success: true,
        message: `Credentials sent to ${exhibitor.email}`,
        recipient: exhibitor.email
      };
      
    } catch (error: any) {
      console.error("❌ Error resending credentials:", error);
      
      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        throw new Error("Email service is slow. Please try again after some time.");
      }
      
      if (error.response?.status === 404) {
        throw new Error("Credentials email endpoint not found. Please check server configuration.");
      }
      
      throw new Error(error.response?.data?.error || error.message || "Failed to resend credentials");
    }
  },

  // New method to test email configuration
  testEmailService: async (): Promise<any> => {
    try {
      const response = await api.get('/exhibitor-credentials/test');
      return response.data;
    } catch (error: any) {
      console.error("Error testing email service:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to test email service");
    }
  }
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

      // Store token
      if (typeof window !== "undefined") {
        localStorage.setItem("exhibitor_token", response.data.data.token);
        localStorage.setItem("exhibitor_data", JSON.stringify(mappedExhibitor));
      }

      return {
        token: response.data.data.token,
        exhibitor: mappedExhibitor
      };
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed";

      if (error.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (error.response?.status === 403) {
        errorMessage = "Account is not active. Contact administrator.";
      } else if (error.response?.status === 404) {
        errorMessage = "Login service not available";
      } else if (
        error.message?.includes("Network Error") ||
        error.message?.includes("timeout") ||
        error.code === "ECONNABORTED"
      ) {
        errorMessage = "Server is starting up. Please wait a few seconds and retry.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      throw new Error(errorMessage);
    }
  },

  getProfile: async (): Promise<Exhibitor> => {
    try {
      const response = await api.get("/auth/exhibitor/profile");

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to fetch profile");
      }

      return mapExhibitorData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to fetch profile");
    }
  },

  logout: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("exhibitor_token");
      localStorage.removeItem("exhibitor_data");
    }
  },

  test: async () => {
    try {
      const response = await api.get("/auth/exhibitor/test");
      return response.data;
    } catch (error: any) {
      console.error("Error testing auth:", error);
      throw error;
    }
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
    try {
      const response = await api.get('/exhibitorDashboard/layout', {
        timeout: 30000,
      });

      if (!response.data.success) {
        throw new Error(
          response.data.error || 'Failed to load dashboard data'
        );
      }

      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching dashboard:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to load dashboard");
    }
  },
};

/* =========================================================
   PASSWORD RESET API
========================================================= */

export const passwordResetAPI = {
  requestReset: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await api.post("/auth/exhibitor/forgot-password", { email });

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to request password reset");
      }

      return response.data.data;
    } catch (error: any) {
      console.error("Error requesting password reset:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to request password reset");
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await api.post("/auth/exhibitor/reset-password", {
        token,
        newPassword
      });

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to reset password");
      }

      return response.data.data;
    } catch (error: any) {
      console.error("Error resetting password:", error);
      throw new Error(error.response?.data?.error || error.message || "Failed to reset password");
    }
  }
};

export default api;