import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com/api';

// ========================
// TYPES
// ========================

export interface Manual {
  id: string;
  title: string;
  description: string;
  category: string;
  version: string;
  file_path: string;
  file_name: string;
  file_size: string;
  mime_type: string;
  last_updated: string;
  updated_by: string;
  downloads: number;
  status: 'published' | 'draft';
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ManualFilters {
  status?: 'published' | 'draft';
  category?: string;
  search?: string;
}

export interface ManualStatistics {
  totalManuals: number;
  publishedManuals: number;
  draftManuals: number;
  totalDownloads: number;
  categoryStats: Array<{
    category: string;
    count: number;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ========================
// CUSTOM ERROR CLASS
// ========================

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ========================
// MANUAL API CLASS
// ========================

class ManualApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });

    // Add request interceptor to ensure token is always included
this.api.interceptors.request.use(
  (config) => {
    // Get the latest token from localStorage on every request
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token'); // Use 'admin_token'
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`🔑 Token attached to ${config.method?.toUpperCase()} ${config.url}`);
      } else {
        console.warn(`🔑 No auth token found for ${config.method?.toUpperCase()} ${config.url}`);
      }
    }
    return config;
  }
);

    // Global response error handler
    this.api.interceptors.response.use(
      (response) => {
        // Log responses in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${response.config.url ? 'success' : ''})`);
        }
        return response;
      },
      (error: AxiosError) => {
        // Enhanced error logging
        if (error.response) {
          console.error(`❌ API Error ${error.response.status}:`, {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data
          });
          
          // Handle 401 Unauthorized - token expired or invalid
          if (error.response.status === 401) {
            console.error('🔐 Authentication failed. Token may be expired.');
            // Optionally redirect to login
            if (typeof window !== 'undefined') {
              // Clear invalid token
              localStorage.removeItem('authToken');
              // You might want to redirect to login page here
              // window.location.href = '/login';
            }
          }
        } else if (error.request) {
          console.error('❌ No response received:', error.request);
        } else {
          console.error('❌ Request error:', error.message);
        }
        
        const apiError = new ApiError(
          (error.response?.data as any)?.message || error.message,
          error.response?.status,
          error.response?.data
        );
        return Promise.reject(apiError);
      }
    );
  }

  // ========================
  // AUTH TOKEN HANDLER
  // ========================

 setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('admin_token', token); // Use 'admin_token' consistently
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('🔑 Auth token set in API headers');
  } else {
    localStorage.removeItem('admin_token');
    delete this.api.defaults.headers.common['Authorization'];
    console.log('🔑 Auth token removed from API headers');
  }
}

  // Helper to check if user is authenticated
isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token'); // Use 'admin_token'
    return !!token;
  }
  return false;
}

  // ========================
  // PUBLIC ROUTES
  // ========================

  async getManuals(filters: ManualFilters = {}): Promise<ApiResponse<Manual[]>> {
    try {
      const params = new URLSearchParams();

      if (filters.status) params.append('status', filters.status);
      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.search) params.append('search', filters.search);

      const queryString = params.toString();
      const url = `/manuals${queryString ? `?${queryString}` : ''}`;

      const response: AxiosResponse<ApiResponse<Manual[]>> =
        await this.api.get(url);

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch manuals');
    }
  }

  async getManual(id: string): Promise<ApiResponse<Manual>> {
    try {
      const response: AxiosResponse<ApiResponse<Manual>> =
        await this.api.get(`/manuals/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(`Failed to fetch manual with id ${id}`);
    }
  }

  async downloadManual(id: string): Promise<{ success: boolean; downloadUrl?: string; fileName?: string }> {
    try {
      const response: AxiosResponse<any> =
        await this.api.get(`/manuals/${id}/download`);

      const { downloadUrl, fileName } = response.data.data;

      // Option 1: Return the download info and let the component handle it
      return { success: true, downloadUrl, fileName };
      
      /* Option 2: Handle download here (uncomment if you prefer this)
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName || 'manual');
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true };
      */
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(`Failed to download manual with id ${id}`);
    }
  }

  // ========================
  // ADMIN ROUTES (Protected)
  // ========================

  async createManual(formData: FormData): Promise<ApiResponse<Manual>> {
    try {
      // Ensure we have a token
      if (!this.isAuthenticated()) {
        throw new ApiError('Not authenticated. Please log in.', 401);
      }

      const response: AxiosResponse<ApiResponse<Manual>> =
        await this.api.post('/manuals', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create manual');
    }
  }

  async updateManual(
    id: string,
    formData: FormData
  ): Promise<ApiResponse<Manual>> {
    try {
      // Ensure we have a token
      if (!this.isAuthenticated()) {
        throw new ApiError('Not authenticated. Please log in.', 401);
      }

      const response: AxiosResponse<ApiResponse<Manual>> =
        await this.api.put(`/manuals/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(`Failed to update manual with id ${id}`);
    }
  }

  async deleteManual(id: string): Promise<ApiResponse<null>> {
    try {
      // Ensure we have a token
      if (!this.isAuthenticated()) {
        throw new ApiError('Not authenticated. Please log in.', 401);
      }

      const response: AxiosResponse<ApiResponse<null>> =
        await this.api.delete(`/manuals/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(`Failed to delete manual with id ${id}`);
    }
  }

  async getStatistics(): Promise<ApiResponse<ManualStatistics>> {
    try {
      // Statistics might be public or protected - adjust as needed
      const response: AxiosResponse<ApiResponse<ManualStatistics>> =
        await this.api.get('/manuals/statistics/overview');

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch statistics');
    }
  }

  // Helper method to upload files
  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string }>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response: AxiosResponse<ApiResponse<{ url: string }>> =
        await this.api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              onProgress(percentCompleted);
            }
          },
        });

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to upload file');
    }
  }
}

// ========================
// EXPORT SINGLETON
// ========================

const manualApi = new ManualApi();
export default manualApi;