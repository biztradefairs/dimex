export interface SecurityDeposit {
  id: string;
  category: '0-36' | '37-100' | '101+';
  minSqMtr: number;
  maxSqMtr: number;
  amountINR: number;
  amountUSD: number;
  displayOrder: number;
  isActive: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SecurityDepositFormData {
  category: '0-36' | '37-100' | '101+';
  minSqMtr: number | string;
  maxSqMtr: number | string;
  amountINR: number | string;
  amountUSD: number | string;
  displayOrder: number | string;
  isActive: boolean;
  description?: string;
}

export interface SecurityDepositFilters {
  isActive?: boolean | 'all';
  category?: string | 'all';
  search?: string;
}

export interface SecurityDepositStats {
  totalDeposits: number;
  activeDeposits: number;
  inactiveDeposits: number;
  categoryStats: Array<{
    category: string;
    count: number;
    totalINR: number;
    totalUSD: number;
  }>;
  priceStats: {
    minINR: number;
    maxINR: number;
    avgINR: number;
    minUSD: number;
    maxUSD: number;
    avgUSD: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface BulkDeleteResponse {
  successful: string[];
  failed: Array<{ id: string; error: string }>;
}