import api from './api';

export const reviewService = {
  createReview: async ({ movieId, movieTitle, posterPath, title, content, rating }) => {
    const res = await api.post('/reviews', {
      movieId,
      movieTitle,
      posterPath,
      title,
      content,
      rating,
    });
    return res.data;
  },
  getMovieReviews: async (movieId) => {
    const res = await api.get(`/reviews/movie/${movieId}`);
    return res.data;
  },
  updateReview: async (id, { title, content, rating }) => {
    const res = await api.put(`/reviews/${id}`, { title, content, rating });
    return res.data;
  },
  deleteReview: async (id) => {
    const res = await api.delete(`/reviews/${id}`);
    return res.data;
  },
  toggleLikeReview: async (id) => {
    const res = await api.post(`/reviews/${id}/like`);
    return res.data;
  },
  getMyReviews: async () => {
    const res = await api.get('/reviews/my-reviews');
    return res.data;
  },
};

