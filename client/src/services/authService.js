import api from './api';

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
  updateProfile: async (data) => {
    const res = await api.put('/auth/profile', data);
    return res.data;
  },
  changePassword: async (data) => {
    const res = await api.put('/auth/change-password', data);
    return res.data;
  },
  getDashboardStats: async () => {
    const res = await api.get('/users/dashboard-stats');
    return res.data;
  },
};

export const watchlistService = {
  getWatchlist: async () => {
    const res = await api.get('/watchlist');
    return res.data;
  },
  add: async (movieData) => {
    const res = await api.post('/watchlist', movieData);
    return res.data;
  },
  remove: async (movieId) => {
    const res = await api.delete(`/watchlist/${movieId}`);
    return res.data;
  },
  toggleWatched: async (movieId) => {
    const res = await api.patch(`/watchlist/${movieId}/toggle-watched`);
    return res.data;
  },
  checkStatus: async (movieId) => {
    const res = await api.get(`/watchlist/check/${movieId}`);
    return res.data;
  },
};

export const favoriteService = {
  getFavorites: async () => {
    const res = await api.get('/favorites');
    return res.data;
  },
  add: async (movieData) => {
    const res = await api.post('/favorites', movieData);
    return res.data;
  },
  remove: async (movieId) => {
    const res = await api.delete(`/favorites/${movieId}`);
    return res.data;
  },
  checkStatus: async (movieId) => {
    const res = await api.get(`/favorites/check/${movieId}`);
    return res.data;
  },
};

export const adminService = {
  getStats: async () => {
    const res = await api.get('/admin/stats');
    return res.data;
  },
  getUsers: async (search = '') => {
    const res = await api.get(`/admin/users?search=${encodeURIComponent(search)}`);
    return res.data;
  },
  updateRole: async (userId, role) => {
    const res = await api.put(`/admin/users/${userId}/role`, { role });
    return res.data;
  },
  deleteUser: async (userId) => {
    const res = await api.delete(`/admin/users/${userId}`);
    return res.data;
  },
  getReviews: async () => {
    const res = await api.get('/admin/reviews');
    return res.data;
  },
  deleteReview: async (reviewId) => {
    const res = await api.delete(`/admin/reviews/${reviewId}`);
    return res.data;
  },
};

