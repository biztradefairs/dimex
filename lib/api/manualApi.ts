// lib/api/manualApi.ts
import api from '../api'; // Import the existing axios instance with interceptors

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
  metadata?: any;
  type?: 'pdf' | 'section';
}

export interface ManualFilters {
  category?: string;
  search?: string;
  status?: string;
}

export interface ManualStatistics {
  totalManuals: number;
  publishedManuals: number;
  draftManuals: number;
  totalDownloads: number;
  categoryStats: Array<{ category: string; count: number }>;
}

export interface ImportantDate {
  id?: string;
  label: string;
  dateLabel: string;
  sortOrder?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ManualApi {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';
    console.log('✅ ManualApi initialized with axios instance');
  }

  // Get all manuals (combines text sections and PDFs)
  async getManuals(filters?: ManualFilters): Promise<ApiResponse<Manual[]>> {
    try {
      let url = `/api/manuals/admin/all`;
      
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters?.search) {
        params.append('search', filters.search);
      }
      if (filters?.status) {
        params.append('status', filters.status);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log('📡 Fetching manuals from:', url);
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching manuals:', error);
      return { success: true, data: [] };
    }
  }

  // Get single manual by ID
  async getManual(id: string): Promise<ApiResponse<Manual>> {
    try {
      console.log(`📡 Fetching manual with ID: ${id}`);
      const response = await api.get(`/api/manuals/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching manual:', error);
      if (error.response?.status === 404) {
        throw new ApiError(404, 'Manual not found');
      }
      throw error;
    }
  }

  // Get statistics
  async getStatistics(): Promise<ApiResponse<ManualStatistics>> {
    try {
      const response = await api.get('/api/manuals/admin/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return {
        success: true,
        data: {
          totalManuals: 0,
          publishedManuals: 0,
          draftManuals: 0,
          totalDownloads: 0,
          categoryStats: []
        }
      };
    }
  }

  // Create manual (for PDF uploads)
  async createManual(formData: FormData): Promise<ApiResponse<Manual>> {
    console.log('📤 Creating manual with form data');
    
    const response = await api.post('/api/manuals', formData, {
      timeout: 120000,
    });
    
    return response.data;
  }

  // Create text section
  async createSection(data: { title: string; content: string; category: string }): Promise<ApiResponse<Manual>> {
    console.log('📤 Creating section:', data.title);
    const response = await api.post('/api/manuals/sections', data);
    return response.data;
  }

  // Update manual
  async updateManual(id: string, formData: FormData): Promise<ApiResponse<Manual>> {
    console.log(`📤 Updating manual ${id}`);
    
    const response = await api.put(`/api/manuals/${id}`, formData, {
      timeout: 120000,
    });
    
    return response.data;
  }

  // Update section
  async updateSection(id: string, data: { title: string; content: string; category: string }): Promise<ApiResponse<Manual>> {
    console.log(`📤 Updating section ${id}`);
    const response = await api.put(`/api/manuals/sections/${id}`, data);
    return response.data;
  }

  // Delete manual
  async deleteManual(id: string): Promise<ApiResponse<null>> {
    console.log(`🗑️ Deleting manual ${id}`);
    const response = await api.delete(`/api/manuals/${id}`);
    return response.data;
  }

  // Delete section
  async deleteSection(id: string): Promise<ApiResponse<null>> {
    console.log(`🗑️ Deleting section ${id}`);
    const response = await api.delete(`/api/manuals/sections/${id}`);
    return response.data;
  }

  // Bulk delete manuals
  async bulkDeleteManuals(ids: string[]): Promise<ApiResponse<null>> {
    console.log(`🗑️ Bulk deleting ${ids.length} manuals`);
    const response = await api.delete('/api/manuals/bulk/delete', {
      data: { ids }
    });
    return response.data;
  }

  // Bulk delete sections
  async bulkDeleteSections(ids: string[]): Promise<ApiResponse<null>> {
    console.log(`🗑️ Bulk deleting ${ids.length} sections`);
    const response = await api.delete('/api/manuals/sections/bulk/delete', {
      data: { ids }
    });
    return response.data;
  }

  // Download manual
  async downloadManual(id: string): Promise<{ success: boolean; downloadUrl?: string }> {
    try {
      console.log(`📥 Downloading manual ${id}`);
      
      const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
      
      const response = await fetch(`${this.baseURL}/api/manuals/${id}/download`, {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download');
      }

      const blob = await response.blob();
      const header = response.headers.get('Content-Disposition') || '';
      const encoded = response.headers.get('X-File-Name');
      const starMatch = header.match(/filename\*=UTF-8''([^;]+)/i);
      const basicMatch = header.match(/filename="?([^";]+)"?/i);
      let filename = encoded
        ? decodeURIComponent(encoded)
        : starMatch?.[1]
          ? decodeURIComponent(starMatch[1])
          : basicMatch?.[1] || 'document';

      if (!/\.(pdf|docx?|xlsx?|pptx?|txt)$/i.test(filename)) {
        if (blob.type.includes('pdf')) filename += '.pdf';
        else if (blob.type.includes('wordprocessingml')) filename += '.docx';
        else if (blob.type.includes('msword')) filename += '.doc';
        else filename += '.pdf';
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error('Error downloading manual:', error);
      return { success: false };
    }
  }

  // Preview manual
  async previewManual(id: string): Promise<void> {
    console.log(`👁️ Previewing manual ${id}`);
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    window.open(`${this.baseURL}/api/manuals/${id}/preview?token=${token}`, '_blank');
  }

  // Update manual status
  async updateManualStatus(id: string, status: string): Promise<ApiResponse<Manual>> {
    console.log(`📤 Updating manual ${id} status to ${status}`);
    const response = await api.patch(`/api/manuals/${id}/status`, { status });
    return response.data;
  }

  // Get manuals by category
  async getManualsByCategory(category: string): Promise<ApiResponse<Manual[]>> {
    try {
      const response = await api.get(`/api/manuals/category/${encodeURIComponent(category)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching manuals by category:', error);
      return { success: true, data: [] };
    }
  }

  // Search manuals
  async searchManuals(query: string): Promise<ApiResponse<Manual[]>> {
    try {
      const response = await api.get(`/api/manuals/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching manuals:', error);
      return { success: true, data: [] };
    }
  }

  // Get recent manuals
  async getRecentManuals(limit: number = 5): Promise<ApiResponse<Manual[]>> {
    try {
      const response = await api.get(`/api/manuals/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent manuals:', error);
      return { success: true, data: [] };
    }
  }

  async getImportantDates(): Promise<ApiResponse<ImportantDate[]>> {
    const response = await api.get('/api/manuals/important-dates');
    return response.data;
  }

  async saveImportantDates(dates: Array<{ label: string; dateLabel: string }>): Promise<ApiResponse<ImportantDate[]>> {
    const response = await api.put('/api/manuals/admin/important-dates', { dates });
    return response.data;
  }
}

const manualApi = new ManualApi();
export default manualApi;