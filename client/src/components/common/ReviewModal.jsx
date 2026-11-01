import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import StarRating from './StarRating';
import { reviewService } from '../../services/reviewService';
import toast from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, movie, existingReview = null, onSuccess }) => {
  const [rating, setRating] = useState(existingReview ? existingReview.rating : 8);
  const [title, setTitle] = useState(existingReview ? existingReview.title : '');
  const [content, setContent] = useState(existingReview ? existingReview.content : '');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both a headline and review content');
      return;
    }

    if (content.trim().length < 10) {
      toast.error('Review must be at least 10 characters long');
      return;
    }

    setSubmitting(true);
    try {
      if (existingReview) {
        await reviewService.updateReview(existingReview._id, {
          title: title.trim(),
          content: content.trim(),
          rating,
        });
        toast.success('Your review was updated successfully!');
      } else {
        await reviewService.createReview({
          movieId: movie.id,
          movieTitle: movie.title,
          posterPath: movie.poster_path,
          title: title.trim(),
          content: content.trim(),
          rating,
        });
        toast.success('Review posted successfully!');
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit review';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-cine-surface border border-cine-border rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cine-border">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              {existingReview ? 'Edit Your Review' : `Review ${movie.title}`}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Share your cinematic verdict with the CineRate community
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">
              Your Rating (1 to 10)
            </label>
            <StarRating value={rating} onChange={setRating} size="lg" />
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">
              Headline
            </label>
            <input
              type="text"
              placeholder="e.g. A visual masterpiece of modern sci-fi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
              className="w-full bg-cine-darker border border-cine-border rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Review Body */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">
              Detailed Review
            </label>
            <textarea
              rows={5}
              placeholder="What stood out to you? The acting, score, cinematography, pacing or plot twist?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minLength={10}
              maxLength={3000}
              required
              className="w-full bg-cine-darker border border-cine-border rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>Minimum 10 characters</span>
              <span>{content.length}/3000</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-cine-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition-all disabled:opacity-50"
            >
              {submitting ? 'Saving...' : existingReview ? 'Update Review' : 'Publish Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

