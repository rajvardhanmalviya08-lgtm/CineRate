const express = require('express');
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavoriteStatus,
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:movieId', removeFavorite);
router.get('/check/:movieId', checkFavoriteStatus);

module.exports = router;

