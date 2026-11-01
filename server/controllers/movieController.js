const tmdbService = require('../services/tmdbService');
const MovieRating = require('../models/MovieRating');
const Review = require('../models/Review');

// Helper to attach CineRate platform ratings to an array of movies
const attachCineRateRatings = async (movies) => {
  if (!movies || !Array.isArray(movies) || movies.length === 0) return movies;

  try {
    const movieIds = movies.map((m) => Number(m.id)).filter(Boolean);
    const ratings = await MovieRating.aggregate([
      { $match: { movieId: { $in: movieIds } } },
      {
        $group: {
          _id: '$movieId',
          avgRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    const ratingMap = {};
    ratings.forEach((r) => {
      ratingMap[r._id] = {
        cinerateRating: Number(r.avgRating.toFixed(1)),
        cinerateVotes: r.totalRatings,
      };
    });

    return movies.map((m) => {
      const stats = ratingMap[m.id] || { cinerateRating: null, cinerateVotes: 0 };
      return {
        ...m,
        ...stats,
      };
    });
  } catch (err) {
    // If DB is offline, return movies as is
    return movies;
  }
};

// @desc    Get trending movies
// @route   GET /api/movies/trending
const getTrending = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.getTrending(page);
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get popular movies
// @route   GET /api/movies/popular
const getPopular = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.getPopular(page);
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get top rated movies
// @route   GET /api/movies/top-rated
const getTopRated = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.getTopRated(page);
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get upcoming movies
// @route   GET /api/movies/upcoming
const getUpcoming = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.getUpcoming(page);
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get now playing movies
// @route   GET /api/movies/now-playing
const getNowPlaying = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.getNowPlaying(page);
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Bollywood movies
// @route   GET /api/movies/bollywood
const getBollywood = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.getBollywood(page);
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Indian Cinema
// @route   GET /api/movies/indian
const getIndian = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.getIndian(page);
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Hollywood blockbusters
// @route   GET /api/movies/hollywood
const getHollywood = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.getHollywood(page);
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single movie details with credits, videos, recommendations, and CineRate community stats
// @route   GET /api/movies/:id
const getMovieDetails = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);
    const movie = await tmdbService.getMovieDetails(movieId);

    // Get CineRate rating stats
    let cinerateRating = null;
    let cinerateVotes = 0;
    try {
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
      if (stats.length > 0) {
        cinerateRating = Number(stats[0].avgRating.toFixed(1));
        cinerateVotes = stats[0].totalRatings;
      }
    } catch (e) {
      // ignore db error
    }

    // Also decorate recommendations & similar
    if (movie.recommendations?.results) {
      movie.recommendations.results = await attachCineRateRatings(movie.recommendations.results);
    }
    if (movie.similar?.results) {
      movie.similar.results = await attachCineRateRatings(movie.similar.results);
    }

    res.json({
      success: true,
      movie: {
        ...movie,
        cinerateRating,
        cinerateVotes,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search and filter movies
// @route   GET /api/movies/search
const searchMovies = async (req, res, next) => {
  try {
    const { query, genre, year, sortBy, page } = req.query;
    const data = await tmdbService.searchMovies({ query, genre, year, sortBy, page });
    data.results = await attachCineRateRatings(data.results);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get movie genres
// @route   GET /api/movies/genres
const getGenres = async (req, res, next) => {
  try {
    const genres = await tmdbService.getGenres();
    res.json({ success: true, genres });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recently added platform reviews for homepage
// @route   GET /api/movies/recent-reviews
const getRecentCommunityReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(6);
    res.json({ success: true, reviews });
  } catch (error) {
    res.json({ success: true, reviews: [] });
  }
};

module.exports = {
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
};

