const express = require('express');
const router = express.Router();
const {
  createReview,
  getMovieReviews,
  updateReview,
  deleteReview,
  toggleLikeReview,
  getUserReviews,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createReview);
router.get('/my-reviews', protect, getUserReviews);
router.get('/movie/:movieId', getMovieReviews);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.post('/:id/like', protect, toggleLikeReview);

module.exports = router;

