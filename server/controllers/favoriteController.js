const Favorite = require('../models/Favorite');

// @desc    Get current user's favorite movies
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add movie to favorites
// @route   POST /api/favorites
// @access  Private
const addFavorite = async (req, res, next) => {
  try {
    const { movieId, movieTitle, posterPath, backdropPath, releaseDate, voteAverage } = req.body;
    const userId = req.user._id;

    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Movie ID is required' });
    }

    const item = await Favorite.findOneAndUpdate(
      { userId, movieId: Number(movieId) },
      {
        userId,
        movieId: Number(movieId),
        movieTitle: movieTitle || 'Untitled Movie',
        posterPath: posterPath || '',
        backdropPath: backdropPath || '',
        releaseDate: releaseDate || '',
        voteAverage: voteAverage ? Number(voteAverage) : 0,
      },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: 'Added to favorites',
      item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove movie from favorites
// @route   DELETE /api/favorites/:movieId
// @access  Private
const removeFavorite = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const userId = req.user._id;

    await Favorite.findOneAndDelete({ userId, movieId });

    res.json({
      success: true,
      message: 'Removed from favorites',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if movie is favorited
// @route   GET /api/favorites/check/:movieId
// @access  Private
const checkFavoriteStatus = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const item = await Favorite.findOne({ userId: req.user._id, movieId });

    res.json({
      success: true,
      isFavorite: Boolean(item),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavoriteStatus,
};

