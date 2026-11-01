const express = require('express');
const router = express.Router();
const {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getNowPlaying,
  getBollywood,
  getIndian,
  getHollywood,
  getMovieDetails,
  searchMovies,
  getGenres,
  getRecentCommunityReviews,
} = require('../controllers/movieController');

router.get('/trending', getTrending);
router.get('/popular', getPopular);
router.get('/top-rated', getTopRated);
router.get('/upcoming', getUpcoming);
router.get('/now-playing', getNowPlaying);
router.get('/bollywood', getBollywood);
router.get('/indian', getIndian);
router.get('/hollywood', getHollywood);
router.get('/search', searchMovies);
router.get('/genres', getGenres);
router.get('/recent-reviews', getRecentCommunityReviews);
router.get('/:id', getMovieDetails);

module.exports = router;

