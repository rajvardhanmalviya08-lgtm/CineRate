const Review = require('../models/Review');
const MovieRating = require('../models/MovieRating');

// @desc    Create a new review for a movie
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res, next) => {
  try {
    const { movieId, movieTitle, posterPath, title, content, rating } = req.body;
    const userId = req.user._id;

    if (!movieId || !title || !content || !rating) {
      return res.status(400).json({ success: false, message: 'Please provide movie ID, headline, review content, and rating' });
    }

    const numMovieId = Number(movieId);
    const numRating = Number(rating);

    // Also sync with MovieRating table so user's rating is recorded in platform average
    await MovieRating.findOneAndUpdate(
      { userId, movieId: numMovieId },
      {
        userId,
        movieId: numMovieId,
        rating: numRating,
        movieTitle: movieTitle || 'Untitled Movie',
        posterPath: posterPath || '',
      },
      { new: true, upsert: true }
    );

    const review = await Review.create({
      userId,
      movieId: numMovieId,
      movieTitle: movieTitle || 'Untitled Movie',
      posterPath: posterPath || '',
      title,
      content,
      rating: numRating,
    });

    const populatedReview = await Review.findById(review._id).populate('userId', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Review posted successfully',
      review: populatedReview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for a movie
// @route   GET /api/reviews/movie/:movieId
// @access  Public
const getMovieReviews = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const reviews = await Review.find({ movieId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res, next) => {
  try {
    const { title, content, rating } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Check ownership or admin
    if (review.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this review' });
    }

    if (title) review.title = title;
    if (content) review.content = content;
    if (rating) {
      review.rating = Number(rating);
      // Sync with MovieRating table
      await MovieRating.findOneAndUpdate(
        { userId: review.userId, movieId: review.movieId },
        { rating: Number(rating) }
      );
    }

    await review.save();

    const populatedReview = await Review.findById(review._id).populate('userId', 'name avatar');

    res.json({
      success: true,
      message: 'Review updated successfully',
      review: populatedReview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Check ownership or admin
    if (review.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle helpful / like on a review
// @route   POST /api/reviews/:id/like
// @access  Private
const toggleLikeReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    const userId = req.user._id;
    const isLiked = review.likes.includes(userId);

    if (isLiked) {
      review.likes = review.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      review.likes.push(userId);
    }

    await review.save();

    res.json({
      success: true,
      isLiked: !isLiked,
      likeCount: review.likes.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's own reviews
// @route   GET /api/reviews/my-reviews
// @access  Private
const getUserReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getMovieReviews,
  updateReview,
  deleteReview,
  toggleLikeReview,
  getUserReviews,
};

