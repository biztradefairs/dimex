// lib/api/auth.ts
import api from '../api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  phone?: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const authAPI = {
  // Admin login with debugging
  login: async (email: string, password: string): Promise<ApiResponse<AuthData>> => {
    try {
      console.log('🔐 Attempting login with:', { email, passwordLength: password.length });
      
      // Log the full URL being called
      console.log('🌐 Full URL:', `${api.defaults.baseURL}/api/auth/login`);
      
      // Make the request
      const response = await api.post('/api/auth/login', { email, password });
      
      console.log('✅ Login response:', response.data);
      return response.data;
      
    } catch (error: any) {
      console.error('❌ Login API error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        }
      });
      
      // Return a formatted error response
      return {
        success: false,
        error: error.response?.data?.error || 
               error.response?.data?.message || 
               error.message || 
               'Login failed. Please check your credentials.'
      };
    }
  },

  // Admin logout
  logout: async (): Promise<ApiResponse> => {
    try {
      const response = await api.post('/api/auth/logout');
      return response.data;
    } catch (error: any) {
      console.error('Logout API error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Logout failed'
      };
    }
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    try {
      const response = await api.post('/api/auth/refresh-token');
      return response.data;
    } catch (error: any) {
      console.error('Refresh token API error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to refresh token'
      };
    }
  },

  // Get current user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get('/api/auth/profile');
      return response.data;
    } catch (error: any) {
      console.error('Get profile API error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to get profile'
      };
    }
  },

  // Debug: Check admin user
  checkAdmin: async (): Promise<ApiResponse> => {
    try {
      const response = await api.get('/api/debug/check-admin');
      return response.data;
    } catch (error: any) {
      console.error('Check admin error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to check admin'
      };
    }
  },

  // Debug: Reset admin password
  resetAdmin: async (): Promise<ApiResponse> => {
    try {
      const response = await api.post('/api/debug/reset-admin');
      return response.data;
    } catch (error: any) {
      console.error('Reset admin error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to reset admin'
      };
    }
  },

  // Debug: Get all routes
  getRoutes: async (): Promise<ApiResponse> => {
    try {
      const response = await api.get('/api/debug/routes');
      return response.data;
    } catch (error: any) {
      console.error('Get routes error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to get routes'
      };
    }
  }
};