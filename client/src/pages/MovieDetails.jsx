import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { ratingService } from '../services/ratingService';
import { reviewService } from '../services/reviewService';
import { watchlistService, favoriteService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/common/StarRating';
import ReviewModal from '../components/common/ReviewModal';
import MovieRow from '../components/common/MovieRow';
import {
  Star,
  Sparkles,
  Calendar,
  Clock,
  Bookmark,
  Heart,
  Share2,
  Play,
  ThumbsUp,
  Trash2,
  Edit,
  ArrowLeft,
  Check,
  Film,
  Users,
} from 'lucide-react';
import {
  getBackdropUrl,
  getPosterUrl,
  formatRating,
  formatRuntime,
  formatDate,
} from '../utils/helpers';
import toast from 'react-hot-toast';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReviewToEdit, setSelectedReviewToEdit] = useState(null);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);

  // Fetch movie data & community metrics
  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const res = await movieService.getMovieDetails(id);
      setMovie(res.movie);

      // Fetch reviews
      const reviewsRes = await reviewService.getMovieReviews(id);
      setReviews(reviewsRes.reviews || []);

      // If user logged in, check rating, watchlist, favorite
      if (isAuthenticated) {
        try {
          const [ratingRes, wlRes, favRes] = await Promise.all([
            ratingService.getUserRating(id),
            watchlistService.checkStatus(id),
            favoriteService.checkStatus(id),
          ]);
          setUserRating(ratingRes.userRating);
          setInWatchlist(wlRes.inWatchlist);
          setIsFavorite(favRes.isFavorite);
        } catch (e) {
          // ignore authenticated status errors
        }
      }

      // Track recently viewed in localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('cinerate_recently_viewed') || '[]');
        const updated = [
          {
            id: res.movie.id,
            title: res.movie.title,
            poster_path: res.movie.poster_path,
            vote_average: res.movie.vote_average,
            release_date: res.movie.release_date,
          },
          ...stored.filter((m) => m.id !== res.movie.id),
        ].slice(0, 10);
        localStorage.setItem('cinerate_recently_viewed', JSON.stringify(updated));
      } catch (err) {}
    } catch (error) {
      console.error('[Movie Details Error]', error);
      toast.error('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
    window.scrollTo(0, 0);
  }, [id, isAuthenticated]);

  // Handle direct star rating
  const handleRateMovie = async (newRating) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to rate this film');
      navigate('/login');
      return;
    }

    setRatingSubmitting(true);
    try {
      const res = await ratingService.rateMovie({
        movieId: movie.id,
        rating: newRating,
        movieTitle: movie.title,
        posterPath: movie.poster_path,
      });

      setUserRating(newRating);
      if (movie) {
        setMovie((prev) => ({
          ...prev,
          cinerateRating: res.cinerateRating,
          cinerateVotes: res.cinerateVotes,
        }));
      }
      toast.success(`You rated "${movie.title}" ${newRating}/10!`);
    } catch (err) {
      toast.error('Could not save rating');
    } finally {
      setRatingSubmitting(false);
    }
  };

  // Watchlist toggle
  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to manage your watchlist');
      navigate('/login');
      return;
    }

    try {
      if (inWatchlist) {
        await watchlistService.remove(movie.id);
        setInWatchlist(false);
        toast.success(`Removed from watchlist`);
      } else {
        await watchlistService.add({
          movieId: movie.id,
          movieTitle: movie.title,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
        });
        setInWatchlist(true);
        toast.success(`Added to watchlist!`);
      }
    } catch (err) {
      toast.error('Watchlist action failed');
    }
  };

  // Favorite toggle
  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save favorites');
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await favoriteService.remove(movie.id);
        setIsFavorite(false);
        toast.success(`Removed from favorites`);
      } else {
        await favoriteService.add({
          movieId: movie.id,
          movieTitle: movie.title,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
        });
        setIsFavorite(true);
        toast.success(`Added to favorite films!`);
      }
    } catch (err) {
      toast.error('Favorite action failed');
    }
  };

  // Share movie link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Movie link copied to clipboard!');
    } else {
      toast.success(window.location.href);
    }
  };

  // Like review toggle
  const handleLikeReview = async (reviewId) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like reviews');
      return;
    }

    try {
      const res = await reviewService.toggleLikeReview(reviewId);
      setReviews((prev) =>
        prev.map((r) => {
          if (r._id === reviewId) {
            const hasLiked = r.likes?.some((u) => (u._id || u) === user._id);
            const newLikes = hasLiked
              ? r.likes.filter((u) => (u._id || u) !== user._id)
              : [...(r.likes || []), user._id];
            return { ...r, likes: newLikes };
          }
          return r;
        })
      );
    } catch (err) {
      toast.error('Could not register like');
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewService.deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success('Review deleted');
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cine-bg flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 font-medium">Loading film details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-cine-bg flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
        <p className="text-gray-400 mb-6">The film you requested could not be loaded.</p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500"
        >
          Return to Cinema
        </Link>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path);
  const director = movie.director || movie.credits?.crew?.find((c) => c.job === 'Director')?.name || 'Unknown';
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const trailerVideo = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube') || movie.videos?.results?.[0];
  const trailerKey = trailerVideo?.key || movie.trailer_key || 'uYPbbksJxIg';

  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pb-20">
      {/* 1. Backdrop Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[460px] max-h-[700px] overflow-hidden">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cine-bg via-cine-bg/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-cine-bg via-cine-bg/80 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-24 left-4 sm:left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-purple-600 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* 2. Main Movie Information Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 sm:-mt-64 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Poster & Quick Actions */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center md:items-start">
            <div className="relative aspect-[2/3] w-60 sm:w-64 rounded-2xl overflow-hidden bg-cine-surface border-2 border-cine-border shadow-2xl shadow-black/80">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="w-60 sm:w-64 grid grid-cols-3 gap-2 mt-4">
              <button
                onClick={handleWatchlistToggle}
                className={`py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center text-xs font-semibold transition-all ${
                  inWatchlist
                    ? 'bg-amber-500 text-black border-amber-500 shadow-glow-gold'
                    : 'bg-cine-surface text-gray-300 hover:text-white hover:bg-white/10 border-cine-border'
                }`}
              >
                {inWatchlist ? <Check className="w-4 h-4 mb-0.5" /> : <Bookmark className="w-4 h-4 mb-0.5" />}
                <span>{inWatchlist ? 'Watchlist' : '+ Watchlist'}</span>
              </button>

              <button
                onClick={handleFavoriteToggle}
                className={`py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center text-xs font-semibold transition-all ${
                  isFavorite
                    ? 'bg-pink-600 text-white border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                    : 'bg-cine-surface text-gray-300 hover:text-pink-400 hover:bg-white/10 border-cine-border'
                }`}
              >
                <Heart className={`w-4 h-4 mb-0.5 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
              </button>

              <button
                onClick={handleShare}
                className="py-2.5 px-3 rounded-xl border border-cine-border bg-cine-surface text-gray-300 hover:text-purple-300 hover:bg-white/10 flex flex-col items-center justify-center text-xs font-semibold transition-all"
              >
                <Share2 className="w-4 h-4 mb-0.5" />
                <span>Share</span>
              </button>
            </div>

            {/* User Rating Box */}
            <div className="w-60 sm:w-64 mt-4 bg-cine-surface p-4 rounded-xl border border-cine-border shadow-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                Your CineRate Verdict
              </span>
              <StarRating
                value={userRating || 0}
                onChange={handleRateMovie}
                size="md"
              />
              <p className="text-[11px] text-gray-400 mt-1.5">
                {userRating ? `You rated this ${userRating}/10` : 'Click a star to submit your rating'}
              </p>
            </div>
          </div>

          {/* Right Column: Titles, Metadata, Overview, Ratings */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {movie.genres &&
                  movie.genres.map((g) => (
                    <span
                      key={g.id || g}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-300 border border-white/10"
                    >
                      {g.name || g}
                    </span>
                  ))}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-base sm:text-lg font-medium text-purple-300 italic mt-1">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            {/* Ratings Comparison Bar */}
            <div className="flex flex-wrap items-center gap-4 py-3 px-5 rounded-2xl bg-cine-surface border border-cine-border max-w-xl">
              {/* TMDB Score */}
              <div className="flex items-center space-x-2.5 pr-4 border-r border-cine-border">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <div>
                  <div className="text-lg font-black text-white leading-tight">
                    {formatRating(movie.vote_average)} <span className="text-xs text-gray-400 font-normal">/ 10</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    TMDB ({movie.vote_count ? `${movie.vote_count.toLocaleString()}` : '0'})
                  </span>
                </div>
              </div>

              {/* CineRate Score */}
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="text-lg font-black text-white leading-tight">
                    {movie.cinerateRating ? formatRating(movie.cinerateRating) : '—'}{' '}
                    <span className="text-xs text-gray-400 font-normal">/ 10</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                    CineRate Community ({movie.cinerateVotes || 0})
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              {movie.release_date && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
              )}
              {movie.runtime > 0 && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Film className="w-4 h-4 text-pink-400" />
                <span>Director: <strong className="text-white">{director}</strong></span>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Overview</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {movie.overview || 'No synopsis is currently available for this title.'}
              </p>
            </div>

            {/* Top Cast */}
            {cast.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" /> Top Billed Cast
                </h3>
                <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
                  {cast.map((actor) => (
                    <div
                      key={actor.id}
                      className="flex-shrink-0 w-24 text-center group/actor"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-cine-surface border border-cine-border mb-2 shadow-md">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
                          }
                          alt={actor.name}
                          className="w-full h-full object-cover group-hover/actor:scale-110 transition-transform"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      </div>
                      <p className="text-xs font-semibold text-white truncate">{actor.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Official Trailer Section */}
      {trailerKey && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-1.5 h-6 bg-amber-400 rounded-full" />
            <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="text-2xl font-bold text-white">Official Trailer & Teaser</h2>
          </div>
          <div className="aspect-video max-w-4xl rounded-2xl overflow-hidden border border-cine-border shadow-2xl bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} Trailer`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* 4. Community Reviews & Rating Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cine-border gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Community Reviews ({reviews.length})
            </h2>
            <p className="text-xs text-gray-400">
              Read uncensored opinions and ratings from verified film buffs
            </p>
          </div>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                toast.error('Please sign in to write a review');
                navigate('/login');
                return;
              }
              setSelectedReviewToEdit(null);
              setReviewModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition-all flex items-center space-x-2"
          >
            <span>+ Write a Review</span>
          </button>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => {
              const isOwner = user && rev.userId && (rev.userId._id || rev.userId) === user._id;
              const hasLiked = user && rev.likes?.some((u) => (u._id || u) === user._id);

              return (
                <div
                  key={rev._id}
                  className="bg-cine-surface border border-cine-border rounded-2xl p-6 shadow-md hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={rev.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                        alt={rev.userId?.name || 'User'}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40"
                      />
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {rev.userId?.name || 'Anonymous User'}
                        </p>
                        <p className="text-[11px] text-gray-400">{formatDate(rev.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-400 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{rev.rating}/10</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">"{rev.title}"</h4>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line mb-4">
                    {rev.content}
                  </p>

                  <div className="pt-3 border-t border-cine-border flex items-center justify-between text-xs text-gray-400">
                    <button
                      onClick={() => handleLikeReview(rev._id)}
                      className={`flex items-center space-x-1.5 py-1 px-2.5 rounded-lg transition-colors ${
                        hasLiked
                          ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                          : 'hover:bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                      <span>Helpful ({rev.likes?.length || 0})</span>
                    </button>

                    {(isOwner || isAdmin) && (
                      <div className="flex items-center space-x-2">
                        {isOwner && (
                          <button
                            onClick={() => {
                              setSelectedReviewToEdit(rev);
                              setReviewModalOpen(true);
                            }}
                            className="p-1 hover:text-purple-400 transition-colors"
                            title="Edit Review"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          className="p-1 hover:text-red-400 transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-cine-surface/60 border border-dashed border-cine-border rounded-2xl p-10 text-center text-gray-400">
            <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-2 opacity-50" />
            <p className="text-base font-semibold text-white">No reviews yet for {movie.title}</p>
            <p className="text-sm mt-1 mb-4">Be the first cinephile to share your thoughts!</p>
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login');
                  return;
                }
                setReviewModalOpen(true);
              }}
              className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              Write First Review
            </button>
          </div>
        )}
      </section>

      {/* 5. Similar Movies Carousel */}
      {movie.similar?.results && movie.similar.results.length > 0 && (
        <div className="mt-12">
          <MovieRow
            title="More Like This"
            movies={movie.similar.results}
          />
        </div>
      )}

      {/* 6. Recommended Movies Carousel */}
      {movie.recommendations?.results && movie.recommendations.results.length > 0 && (
        <div className="mt-8">
          <MovieRow
            title="Recommended If You Liked This"
            movies={movie.recommendations.results}
          />
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => {
          setReviewModalOpen(false);
          setSelectedReviewToEdit(null);
        }}
        movie={movie}
        existingReview={selectedReviewToEdit}
        onSuccess={fetchMovieData}
      />
    </div>
  );
};

export default MovieDetails;

