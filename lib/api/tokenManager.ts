// lib/api/tokenManager.ts
import manualApi from './manualApi';

class TokenManager {
  private token: string | null = null;
  private readonly TOKEN_KEY = 'admin_token'; // Changed from 'authToken' to match your useAuth

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Try to load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(this.TOKEN_KEY);
      if (storedToken) {
        console.log('🔑 Found stored token, initializing...');
        this.token = storedToken;
        manualApi.setAuthToken(storedToken);
      } else {
        console.log('🔑 No stored token found');
      }
    }
  }

  setToken(token: string | null) {
    console.log('🔑 Setting token:', token ? 'Token present' : 'null');
    this.token = token;
    
    // Update manualApi token
    manualApi.setAuthToken(token);
    
    // Store in localStorage if token exists
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem(this.TOKEN_KEY, token);
        console.log('🔑 Token saved to localStorage with key:', this.TOKEN_KEY);
      } else {
        localStorage.removeItem(this.TOKEN_KEY);
        console.log('🔑 Token removed from localStorage');
      }
    }
  }

  getToken() {
    // Always get fresh token from localStorage
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(this.TOKEN_KEY);
      if (storedToken !== this.token) {
        console.log('🔑 Token mismatch, syncing...');
        this.token = storedToken;
        if (storedToken) {
          manualApi.setAuthToken(storedToken);
        }
      }
    }
    return this.token;
  }

  clearToken() {
    console.log('🔑 Clearing token');
    this.setToken(null);
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }
}

export const tokenManager = new TokenManager();