const express = require('express');
const router = express.Router();
const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  toggleWatched,
  checkWatchlistStatus,
} = require('../controllers/watchlistController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.delete('/:movieId', removeFromWatchlist);
router.patch('/:movieId/toggle-watched', toggleWatched);
router.get('/check/:movieId', checkWatchlistStatus);

module.exports = router;

