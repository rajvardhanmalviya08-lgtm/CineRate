const MovieRating = require('../models/MovieRating');

// @desc    Rate a movie (1 to 10) or update existing rating
// @route   POST /api/ratings
// @access  Private
const rateMovie = async (req, res, next) => {
  try {
    const { movieId, rating, movieTitle, posterPath } = req.body;
    const userId = req.user._id;

    if (!movieId || rating === undefined || rating === null) {
      return res.status(400).json({ success: false, message: 'Movie ID and rating are required' });
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 10) {
      return res.status(400).json({ success: false, message: 'Rating must be a number between 1 and 10' });
    }

    const numMovieId = Number(movieId);

    // Upsert rating (prevents duplicate ratings from same user for same movie)
    const movieRating = await MovieRating.findOneAndUpdate(
      { userId, movieId: numMovieId },
      {
        userId,
        movieId: numMovieId,
        rating: numRating,
        movieTitle: movieTitle || 'Untitled Movie',
        posterPath: posterPath || '',
      },
      { new: true, upsert: true, runValidators: true }
    );

    // Calculate updated average rating and total counts for this movie
    const stats = await MovieRating.aggregate([
      { $match: { movieId: numMovieId } },
      {
        $group: {
          _id: '$movieId',
          avgRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    const cinerateRating = stats.length > 0 ? Number(stats[0].avgRating.toFixed(1)) : numRating;
    const cinerateVotes = stats.length > 0 ? stats[0].totalRatings : 1;

    res.json({
      success: true,
      message: 'Rating saved successfully',
      rating: movieRating,
      cinerateRating,
      cinerateVotes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's rating for a specific movie
// @route   GET /api/ratings/movie/:movieId/user
// @access  Private
const getUserRatingForMovie = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const userId = req.user._id;

    const ratingDoc = await MovieRating.findOne({ userId, movieId });

    res.json({
      success: true,
      userRating: ratingDoc ? ratingDoc.rating : null,
      ratingDetails: ratingDoc,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get average rating & stats for a movie
// @route   GET /api/ratings/movie/:movieId/stats
// @access  Public
const getMovieRatingStats = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);

    const stats = await MovieRating.aggregate([
      { $match: { movieId } },
      {
        $group: {
          _id: '$movieId',
          avgRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    if (stats.length === 0) {
      return res.json({
        success: true,
        cinerateRating: null,
        cinerateVotes: 0,
      });
    }

    res.json({
      success: true,
      cinerateRating: Number(stats[0].avgRating.toFixed(1)),
      cinerateVotes: stats[0].totalRatings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all ratings submitted by current user
// @route   GET /api/ratings/my-ratings
// @access  Private
const getUserRatings = async (req, res, next) => {
  try {
    const ratings = await MovieRating.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json({
      success: true,
      ratings,
      count: ratings.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  rateMovie,
  getUserRatingForMovie,
  getMovieRatingStats,
  getUserRatings,
};

