import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { 
  SecurityDeposit, 
  SecurityDepositFormData, 
  SecurityDepositFilters,
  SecurityDepositStats,
  ApiResponse,
  BulkDeleteResponse 
} from '../types/securityDeposit';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://diemex-backend.onrender.com';

class SecurityDepositService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/admin/security-deposit`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('admin_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Get all deposits with optional filters
  async getAllDeposits(filters?: SecurityDepositFilters): Promise<ApiResponse<SecurityDeposit[]>> {
    try {
      const params = new URLSearchParams();
      if (filters?.isActive && filters.isActive !== 'all') {
        params.append('isActive', filters.isActive.toString());
      }
      if (filters?.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      
      const response = await this.api.get<ApiResponse<SecurityDeposit[]>>(`/?${params.toString()}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to fetch security deposits');
    }
  }

  // Get active deposits only (for exhibitor form)
  async getActiveDeposits(): Promise<ApiResponse<SecurityDeposit[]>> {
    try {
      const response = await this.api.get<ApiResponse<SecurityDeposit[]>>('/active');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to fetch active deposits');
    }
  }

  // Get single deposit by ID
  async getDepositById(id: string): Promise<ApiResponse<SecurityDeposit>> {
    try {
      const response = await this.api.get<ApiResponse<SecurityDeposit>>(`/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to fetch deposit');
    }
  }

  // Create new deposit
  async createDeposit(data: SecurityDepositFormData): Promise<ApiResponse<SecurityDeposit>> {
    try {
      const response = await this.api.post<ApiResponse<SecurityDeposit>>('/', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to create deposit');
    }
  }

  // Update deposit
  async updateDeposit(id: string, data: Partial<SecurityDepositFormData>): Promise<ApiResponse<SecurityDeposit>> {
    try {
      const response = await this.api.put<ApiResponse<SecurityDeposit>>(`/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to update deposit');
    }
  }

  // Delete deposit
  async deleteDeposit(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await this.api.delete<ApiResponse<null>>(`/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to delete deposit');
    }
  }

  // Bulk delete deposits
  async bulkDeleteDeposits(ids: string[]): Promise<ApiResponse<BulkDeleteResponse>> {
    try {
      const response = await this.api.delete<ApiResponse<BulkDeleteResponse>>('/bulk/delete', { 
        data: { ids } 
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to bulk delete deposits');
    }
  }

  // Toggle active status
  async toggleActiveStatus(id: string, isActive: boolean): Promise<ApiResponse<SecurityDeposit>> {
    try {
      const response = await this.api.patch<ApiResponse<SecurityDeposit>>(`/${id}/toggle-status`, { isActive });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to toggle status');
    }
  }

  // Update display order
  async updateDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<ApiResponse<BulkDeleteResponse>> {
    try {
      const response = await this.api.patch<ApiResponse<BulkDeleteResponse>>('/display-order/update', { updates });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to update display order');
    }
  }

  // Reorder all deposits
  async reorderDeposits(): Promise<ApiResponse<null>> {
    try {
      const response = await this.api.post<ApiResponse<null>>('/reorder');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to reorder deposits');
    }
  }

  // Get statistics
  async getStatistics(): Promise<ApiResponse<SecurityDepositStats>> {
    try {
      const response = await this.api.get<ApiResponse<SecurityDepositStats>>('/statistics');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error('Failed to fetch statistics');
    }
  }
}

export default new SecurityDepositService();