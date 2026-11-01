import api from './api';

export const movieService = {
  getTrending: async (page = 1) => {
    const res = await api.get(`/movies/trending?page=${page}`);
    return res.data;
  },
  getPopular: async (page = 1) => {
    const res = await api.get(`/movies/popular?page=${page}`);
    return res.data;
  },
  getTopRated: async (page = 1) => {
    const res = await api.get(`/movies/top-rated?page=${page}`);
    return res.data;
  },
  getUpcoming: async (page = 1) => {
    const res = await api.get(`/movies/upcoming?page=${page}`);
    return res.data;
  },
  getNowPlaying: async (page = 1) => {
    const res = await api.get(`/movies/now-playing?page=${page}`);
    return res.data;
  },
  getBollywood: async (page = 1) => {
    const res = await api.get(`/movies/bollywood?page=${page}`);
    return res.data;
  },
  getIndian: async (page = 1) => {
    const res = await api.get(`/movies/indian?page=${page}`);
    return res.data;
  },
  getHollywood: async (page = 1) => {
    const res = await api.get(`/movies/hollywood?page=${page}`);
    return res.data;
  },
  getMovieDetails: async (id) => {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  },
  searchMovies: async (params = {}) => {
    const queryStr = new URLSearchParams(params).toString();
    const res = await api.get(`/movies/search?${queryStr}`);
    return res.data;
  },
  getGenres: async () => {
    const res = await api.get('/movies/genres');
    return res.data;
  },
  getRecentReviews: async () => {
    const res = await api.get('/movies/recent-reviews');
    return res.data;
  },
};

