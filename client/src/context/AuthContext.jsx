import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cinerate_token') || null);
  const [loading, setLoading] = useState(true);

  // Load user profile on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('cinerate_token');
      const storedUser = localStorage.getItem('cinerate_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          // Verify with backend
          const res = await authService.getProfile();
          if (res.user) {
            setUser(res.user);
            localStorage.setItem('cinerate_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('[Auth] Session expired or invalid');
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      if (res.success && res.user) {
        setUser(res.user);
        setToken(res.user.token);
        localStorage.setItem('cinerate_token', res.user.token);
        localStorage.setItem('cinerate_user', JSON.stringify(res.user));
        toast.success(`Welcome back, ${res.user.name}!`);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please verify credentials.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      if (res.success && res.user) {
        setUser(res.user);
        setToken(res.user.token);
        localStorage.setItem('cinerate_token', res.user.token);
        localStorage.setItem('cinerate_user', JSON.stringify(res.user));
        toast.success(`Welcome to CineRate, ${res.user.name}!`);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please check form details.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('cinerate_token');
    localStorage.removeItem('cinerate_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (formData) => {
    try {
      const res = await authService.updateProfile(formData);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('cinerate_user', JSON.stringify(res.user));
        toast.success('Profile updated successfully');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const changePassword = async (passwords) => {
    try {
      const res = await authService.changePassword(passwords);
      if (res.success) {
        toast.success('Password changed successfully');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to change password';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    isAdmin: Boolean(user && user.role === 'admin'),
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

