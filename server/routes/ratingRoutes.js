const express = require('express');
const router = express.Router();
const {
  rateMovie,
  getUserRatingForMovie,
  getMovieRatingStats,
  getUserRatings,
} = require('../controllers/ratingController');
const { protect } = require('../middleware/auth');

router.post('/', protect, rateMovie);
router.get('/my-ratings', protect, getUserRatings);
router.get('/movie/:movieId/user', protect, getUserRatingForMovie);
router.get('/movie/:movieId/stats', getMovieRatingStats);

module.exports = router;

