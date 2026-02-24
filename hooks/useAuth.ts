// hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { authAPI, User, ApiResponse, AuthData } from '@/lib/api/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();

      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('admin_user', JSON.stringify(response.data));
        setError(null);
      } else {
        logout(false);
      }
    } catch (err) {
      logout(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('admin_user');
      }
    }

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const login = async (
    email: string,
    password: string
  ): Promise<ApiResponse<AuthData>> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.login(email, password);

      if (response.success && response.data) {
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.user));
        setUser(response.data.user);
      } else {
        setError(response.error || 'Login failed');
      }

      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (redirect = true) => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);

    if (redirect && typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  };

  // Debug function to check admin status
  const debugAdmin = async () => {
    try {
      const response = await authAPI.checkAdmin();
      console.log('🔍 Admin check:', response);
      return response;
    } catch (error) {
      console.error('Debug admin error:', error);
    }
  };

  // Debug function to reset admin
  const resetAdmin = async () => {
    try {
      const response = await authAPI.resetAdmin();
      console.log('🔄 Admin reset:', response);
      return response;
    } catch (error) {
      console.error('Reset admin error:', error);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    fetchUser,
    debugAdmin,
    resetAdmin,
    isAuthenticated: typeof window !== 'undefined'
      ? !!localStorage.getItem('admin_token')
      : false,
  };
};