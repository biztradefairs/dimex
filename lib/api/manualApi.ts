// src/lib/api/manualApi.ts

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
  type?: 'pdf' | 'section'; // To distinguish between PDF and text sections
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
  private token: string | null = null;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';
  }

  // Set auth token for subsequent requests
  setAuthToken(token: string | null) {
    this.token = token;
    console.log('🔑 ManualApi token set:', token ? 'Token present' : 'null');
  }

  // Get headers with authorization if token exists
  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Get all manuals (combines text sections and PDFs)
  async getManuals(filters?: ManualFilters): Promise<ApiResponse<Manual[]>> {
    try {
      let url = `${this.baseURL}/api/manuals/admin/all`;
      
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

      const response = await fetch(url, {
        headers: this.getHeaders(false), // Public endpoint, no auth needed
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { success: true, data: [] };
        }
        throw new ApiError(response.status, await response.text());
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching manuals:', error);
      return { success: true, data: [] };
    }
  }

  // Get statistics
  async getStatistics(): Promise<ApiResponse<ManualStatistics>> {
    try {
      const response = await fetch(`${this.baseURL}/api/manuals/admin/statistics`, {
        headers: this.getHeaders(false), // Public endpoint, no auth needed
      });

      if (!response.ok) {
        if (response.status === 404) {
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
        throw new ApiError(response.status, await response.text());
      }

      const data = await response.json();
      return data;
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
    const response = await fetch(`${this.baseURL}/api/manuals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`, // Use stored token
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Failed to create manual');
    }

    return response.json();
  }

  // Create text section
  async createSection(data: { title: string; content: string; category: string }): Promise<ApiResponse<Manual>> {
    const response = await fetch(`${this.baseURL}/api/manuals/sections`, {
      method: 'POST',
      headers: this.getHeaders(true), // Include auth
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Failed to create section');
    }

    return response.json();
  }

  // Update manual
  async updateManual(id: string, formData: FormData): Promise<ApiResponse<Manual>> {
    const response = await fetch(`${this.baseURL}/api/manuals/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`, // Use stored token
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Failed to update manual');
    }

    return response.json();
  }

  // Delete manual
  async deleteManual(id: string): Promise<ApiResponse<null>> {
    const response = await fetch(`${this.baseURL}/api/manuals/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(true), // Include auth
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Failed to delete manual');
    }

    return response.json();
  }

  // Delete section
  async deleteSection(id: string): Promise<ApiResponse<null>> {
    const response = await fetch(`${this.baseURL}/api/manuals/sections/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(true), // Include auth
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Failed to delete section');
    }

    return response.json();
  }
  // Add this method to your ManualApi class
async getManual(id: string): Promise<ApiResponse<Manual>> {
  try {
    const response = await fetch(`${this.baseURL}/api/manuals/${id}`, {
      headers: this.getHeaders(false), // Public endpoint, no auth needed for viewing
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError(404, 'Manual not found');
      }
      throw new ApiError(response.status, await response.text());
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching manual:', error);
    throw error;
  }
}

  // Download manual
  async downloadManual(id: string): Promise<{ success: boolean; downloadUrl?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/api/manuals/${id}/download`, {
        headers: this.getHeaders(false), // Public endpoint, no auth needed
      });

      if (!response.ok) {
        throw new Error('Failed to download');
      }

      const data = await response.json();
      
      if (data.success && data.data?.downloadUrl) {
        window.open(data.data.downloadUrl, '_blank');
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error downloading manual:', error);
      return { success: false };
    }
  }

  // Preview manual
  async previewManual(id: string): Promise<void> {
    window.open(`${this.baseURL}/api/manuals/${id}/preview`, '_blank');
  }
}

const manualApi = new ManualApi();
export default manualApi;