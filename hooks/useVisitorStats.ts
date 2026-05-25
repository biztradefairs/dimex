
// hooks/useVisitorStats.ts
import { useEffect, useState, useCallback } from 'react';
import { dashboardAPI, VisitorData } from '@/lib/api/dashboard';

export function useVisitorStats() {
  const [stats, setStats] = useState<VisitorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await dashboardAPI.getVisitorStats();

      if (response.success && response.data) {
        setStats(response.data);
      } else {
        setError(response.error || 'Failed to load visitor stats');
      }
    } catch (err: any) {
      console.error('Visitor stats fetch error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refresh = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refresh
  };
}
