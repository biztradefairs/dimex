// hooks/useDashboard.ts
import { useEffect, useState, useCallback } from 'react';
import { dashboardAPI, DashboardSummary } from '@/lib/api/dashboard';

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  // const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch summary and health in parallel
      const [summaryRes, healthRes] = await Promise.all([
        dashboardAPI.getSummary(),
        dashboardAPI.getHealth()
      ]);
      console.log("🔥 SUMMARY RESPONSE:", summaryRes);
      
      if (summaryRes.success && summaryRes.data) {
        setSummary(summaryRes.data);
         console.log("🔥 SUMMARY DATA:", summaryRes.data);
      } else {
        setError(summaryRes.error || 'Failed to load dashboard data');
      }
      
      // if (healthRes.success && healthRes.data) {
      //   setHealth(healthRes.data);
      // }
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refresh = useCallback(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    summary,
    // health,
    isLoading,
    error,
    refresh
  };
}