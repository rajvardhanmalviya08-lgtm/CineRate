const MovieRating = require('../models/MovieRating');
const Review = require('../models/Review');
const Watchlist = require('../models/Watchlist');
const Favorite = require('../models/Favorite');

// @desc    Get dashboard metrics and stats for the logged-in user
// @route   GET /api/users/dashboard-stats
// @access  Private
const getUserDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [totalRatings, totalReviews, watchlistCount, favoritesCount, ratingStats, recentRatings] = await Promise.all([
      MovieRating.countDocuments({ userId }),
      Review.countDocuments({ userId }),
      Watchlist.countDocuments({ userId }),
      Favorite.countDocuments({ userId }),
      MovieRating.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: '$userId',
            avgRating: { $avg: '$rating' },
          },
        },
      ]),
      MovieRating.find({ userId }).sort({ updatedAt: -1 }).limit(5),
    ]);

    const averagePersonalRating = ratingStats.length > 0 ? Number(ratingStats[0].avgRating.toFixed(1)) : 0;

    res.json({
      success: true,
      stats: {
        totalRatings,
        totalReviews,
        watchlistCount,
        favoritesCount,
        averagePersonalRating,
        recentRatings,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserDashboardStats,
};

