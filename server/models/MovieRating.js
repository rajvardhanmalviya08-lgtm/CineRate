const mongoose = require('mongoose');

const movieRatingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    movieId: {
      type: Number,
      required: true,
      index: true,
    },
    movieTitle: {
      type: String,
      required: true,
      trim: true,
    },
    posterPath: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  { timestamps: true }
);

// Prevent duplicate ratings from same user for same movie
movieRatingSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('MovieRating', movieRatingSchema);

