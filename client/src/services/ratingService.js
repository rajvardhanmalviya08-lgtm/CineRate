import api from './api';

export const ratingService = {
  rateMovie: async ({ movieId, rating, movieTitle, posterPath }) => {
    const res = await api.post('/ratings', {
      movieId,
      rating,
      movieTitle,
      posterPath,
    });
    return res.data;
  },
  getUserRating: async (movieId) => {
    const res = await api.get(`/ratings/movie/${movieId}/user`);
    return res.data;
  },
  getMovieRatingStats: async (movieId) => {
    const res = await api.get(`/ratings/movie/${movieId}/stats`);
    return res.data;
  },
  getMyRatings: async () => {
    const res = await api.get('/ratings/my-ratings');
    return res.data;
  },
};

