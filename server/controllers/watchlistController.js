const Watchlist = require('../models/Watchlist');

// @desc    Get current user's watchlist
// @route   GET /api/watchlist
// @access  Private
const getWatchlist = async (req, res, next) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: watchlist.length,
      watchlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add movie to watchlist
// @route   POST /api/watchlist
// @access  Private
const addToWatchlist = async (req, res, next) => {
  try {
    const { movieId, movieTitle, posterPath, backdropPath, releaseDate, voteAverage, genres } = req.body;
    const userId = req.user._id;

    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Movie ID is required' });
    }

    const item = await Watchlist.findOneAndUpdate(
      { userId, movieId: Number(movieId) },
      {
        userId,
        movieId: Number(movieId),
        movieTitle: movieTitle || 'Untitled Movie',
        posterPath: posterPath || '',
        backdropPath: backdropPath || '',
        releaseDate: releaseDate || '',
        voteAverage: voteAverage ? Number(voteAverage) : 0,
        genres: genres || [],
      },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: 'Added to watchlist',
      item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove movie from watchlist
// @route   DELETE /api/watchlist/:movieId
// @access  Private
const removeFromWatchlist = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const userId = req.user._id;

    await Watchlist.findOneAndDelete({ userId, movieId });

    res.json({
      success: true,
      message: 'Removed from watchlist',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle watched status of movie in watchlist
// @route   PATCH /api/watchlist/:movieId/toggle-watched
// @access  Private
const toggleWatched = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const userId = req.user._id;

    const item = await Watchlist.findOne({ userId, movieId });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Movie not found in your watchlist' });
    }

    item.watched = !item.watched;
    await item.save();

    res.json({
      success: true,
      message: item.watched ? 'Marked as watched' : 'Marked as unwatched',
      watched: item.watched,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if movie is in watchlist
// @route   GET /api/watchlist/check/:movieId
// @access  Private
const checkWatchlistStatus = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const item = await Watchlist.findOne({ userId: req.user._id, movieId });

    res.json({
      success: true,
      inWatchlist: Boolean(item),
      watched: item ? item.watched : false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  toggleWatched,
  checkWatchlistStatus,
};

