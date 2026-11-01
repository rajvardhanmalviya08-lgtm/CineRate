const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: [true, 'Review headline is required'],
      trim: true,
      maxlength: [100, 'Headline cannot exceed 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Review content is required'],
      minlength: [10, 'Review must be at least 10 characters long'],
      maxlength: [3000, 'Review cannot exceed 3000 characters'],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// Virtual for like count
reviewSchema.virtual('likeCount').get(function () {
  return this.likes ? this.likes.length : 0;
});

reviewSchema.set('toJSON', { virtuals: true });
reviewSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Review', reviewSchema);

