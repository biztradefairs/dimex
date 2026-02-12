import api from '../api';
import { Shape, ShapeType, FloorPlan as FloorPlanType } from '@/lib/types';

// ==============================
// 🔹 API Response Interface
// ==============================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
  page?: number;
  totalPages?: number;
  floorPlanId?: string | number; // ✅ OPTIONAL (important fix)
}

// ==============================
// 🔹 Common API Error Handler
// ==============================
const handleApiError = <T>(
  error: any,
  defaultMessage: string
): ApiResponse<T> => {
  console.error('API Error:', error);

  let errorMessage = defaultMessage;

  if (error.response?.data?.error) {
    errorMessage = error.response.data.error;
  } else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error.message) {
    errorMessage = error.message;
  }

  return {
    success: false,
    error: errorMessage,
  };
};

// ==============================
// 🔹 Floor Plans API
// ==============================
export const floorPlansAPI = {
  // Test API connection
  testConnection: async (): Promise<ApiResponse> => {
    try {
      const response = await api.get('/floor-plans/test');
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to connect to floor plans API');
    }
  },

  // ==============================
  // Get All Floor Plans
  // ==============================
  getAll: async (
    params: any = {}
  ): Promise<ApiResponse<FloorPlanType[]>> => {
    try {
      const response = await api.get('/floor-plans', { params });

      if (response.data?.data) {
        const transformedData: FloorPlanType[] =
          response.data.data.map((plan: any): FloorPlanType => ({
            id: String(plan.id),
            name: plan.name || '',
            description: plan.description || '',
            version: plan.version || '1.0',
            shapes: Array.isArray(plan.shapes)
              ? plan.shapes.map((shape: any): Shape => ({
                  id:
                    shape.id ||
                    `shape-${Date.now()}-${Math.random()}`,
                  type:
                    (shape.type as ShapeType) || 'rectangle',
                  x: Number(shape.x) || 0,
                  y: Number(shape.y) || 0,
                  width: Number(shape.width) || 50,
                  height: Number(shape.height) || 50,
                  rotation: Number(shape.rotation) || 0,
                  color:
                    shape.color ||
                    'rgba(59, 130, 246, 0.3)',
                  borderColor:
                    shape.borderColor || '#1e40af',
                  borderWidth:
                    Number(shape.borderWidth) || 2,
                  fontSize:
                    Number(shape.fontSize) || 12,
                  text: shape.text || '',
                  zIndex: Number(shape.zIndex) || 1,
                  isLocked: Boolean(shape.isLocked),
                  metadata: shape.metadata || {},
                }))
              : [],
            image: plan.image || undefined,
            scale: Number(plan.scale) || 0.1,
            tags: plan.tags || [],
            isPublic: Boolean(plan.isPublic),
            createdAt: plan.createdAt,
            updatedAt: plan.updatedAt,
            thumbnail: plan.thumbnail,
          }));

        return {
          success: true,
          data: transformedData,
          total: response.data.pagination?.total,
          page: response.data.pagination?.page,
          totalPages: response.data.pagination?.pages,
          floorPlanId: response.data.floorPlanId,
        };
      }

      return {
        success: false,
        error: 'No floor plans found',
      };
    } catch (error: any) {
      return handleApiError(error, 'Failed to fetch floor plans');
    }
  },

  // ==============================
  // Get Single Floor Plan
  // ==============================
  getById: async (
    id: string | number
  ): Promise<ApiResponse<FloorPlanType>> => {
    try {
      const response = await api.get(`/floor-plans/${id}`);
      const plan = response.data?.data;

      if (!plan) {
        return {
          success: false,
          error: 'Floor plan not found',
        };
      }

      const transformedPlan: FloorPlanType = {
        id: String(plan.id),
        name: plan.name || '',
        description: plan.description || '',
        version: plan.version || '1.0',
        shapes: Array.isArray(plan.shapes)
          ? plan.shapes.map((shape: any): Shape => ({
              id:
                shape.id ||
                `shape-${Date.now()}-${Math.random()}`,
              type:
                (shape.type as ShapeType) || 'rectangle',
              x: Number(shape.x) || 0,
              y: Number(shape.y) || 0,
              width: Number(shape.width) || 50,
              height: Number(shape.height) || 50,
              rotation: Number(shape.rotation) || 0,
              color:
                shape.color ||
                'rgba(59, 130, 246, 0.3)',
              borderColor:
                shape.borderColor || '#1e40af',
              borderWidth:
                Number(shape.borderWidth) || 2,
              fontSize:
                Number(shape.fontSize) || 12,
              text: shape.text || '',
              zIndex: Number(shape.zIndex) || 1,
              isLocked: Boolean(shape.isLocked),
              metadata: shape.metadata || {},
            }))
          : [],
        image: plan.image || undefined,
        scale: Number(plan.scale) || 0.1,
        tags: plan.tags || [],
        isPublic: Boolean(plan.isPublic),
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
        thumbnail: plan.thumbnail,
      };

      return {
        success: true,
        data: transformedPlan,
        floorPlanId: plan.id,
      };
    } catch (error: any) {
      return handleApiError(error, 'Floor plan not found');
    }
  },

  // ==============================
  // Create Floor Plan
  // ==============================
  create: async (
    data: Omit<FloorPlanType, 'id'>
  ): Promise<ApiResponse<FloorPlanType>> => {
    try {
      const response = await api.post('/floor-plans', data);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to create floor plan');
    }
  },

  // ==============================
  // Update Floor Plan
  // ==============================
  update: async (
    id: string | number,
    data: Partial<FloorPlanType>
  ): Promise<ApiResponse<FloorPlanType>> => {
    try {
      const response = await api.put(`/floor-plans/${id}`, data);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to update floor plan');
    }
  },

  // ==============================
  // Delete Floor Plan
  // ==============================
  delete: async (
    id: string | number
  ): Promise<ApiResponse> => {
    try {
      const response = await api.delete(`/floor-plans/${id}`);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to delete floor plan');
    }
  },

  // ==============================
  // Quick Save
  // ==============================
  quickSave: async (
    id: string | number,
    shapes: Shape[]
  ): Promise<ApiResponse<FloorPlanType>> => {
    try {
      const response = await api.patch(
        `/floor-plans/${id}/quick-save`,
        { shapes }
      );
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Auto-save failed');
    }
  },

  // ==============================
  // Duplicate Floor Plan
  // ==============================
  duplicate: async (
    id: string | number,
    newName?: string
  ): Promise<ApiResponse<FloorPlanType>> => {
    try {
      const response = await api.post(
        `/floor-plans/${id}/duplicate`,
        { newName }
      );
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to duplicate floor plan');
    }
  },
};
