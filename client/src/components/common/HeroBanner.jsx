import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Info, Bookmark, Check, Star, Sparkles, X } from 'lucide-react';
import { getBackdropUrl, getPosterUrl, formatRating } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { watchlistService } from '../../services/authService';
import toast from 'react-hot-toast';

const HeroBanner = ({ movie }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);

  if (!movie) return null;

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const tmdbScore = formatRating(movie.vote_average);
  const cinerateScore = movie.cinerateRating ? formatRating(movie.cinerateRating) : null;
  const trailerKey = movie.trailer_key || (movie.videos?.results?.[0]?.key) || 'uYPbbksJxIg';

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add to your watchlist');
      navigate('/login');
      return;
    }

    try {
      if (inWatchlist) {
        await watchlistService.remove(movie.id);
        setInWatchlist(false);
        toast.success(`Removed "${movie.title}" from watchlist`);
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
        toast.success(`Added "${movie.title}" to watchlist!`);
      }
    } catch (err) {
      toast.error('Watchlist action failed. Please try again.');
    }
  };

  return (
    <div className="relative w-full h-[75vh] min-h-[520px] max-h-[820px] overflow-hidden">
      {/* Cinematic Backdrop Image */}
      <img
        src={backdropUrl}
        alt={movie.title}
        className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
      />

      {/* Multi-layered cinematic vignette & gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-cine-bg via-cine-bg/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-cine-bg via-cine-bg/70 to-transparent" />

      {/* Hero Content */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20">
        <div className="max-w-2xl space-y-4">
          {/* Spotlight Tag */}
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-purple flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Featured Premiere
            </span>
            {movie.release_date && (
              <span className="text-xs font-medium text-gray-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                {movie.release_date.split('-')[0]}
              </span>
            )}
          </div>

          {/* Movie Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
            {movie.title}
          </h1>

          {/* Tagline or genres */}
          {movie.tagline && (
            <p className="text-sm sm:text-base font-medium text-purple-300 italic">
              "{movie.tagline}"
            </p>
          )}

          {/* Ratings row */}
          <div className="flex items-center space-x-4 text-sm font-semibold">
            {/* TMDB score */}
            <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>TMDB: {tmdbScore}/10</span>
            </div>

            {/* CineRate score */}
            <div className="flex items-center space-x-1.5 bg-purple-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-500/40 text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>CineRate: {cinerateScore ? `${cinerateScore}/10` : 'Be the first to rate'}</span>
            </div>
          </div>

          {/* Overview text */}
          <p className="text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed drop-shadow">
            {movie.overview}
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setTrailerModalOpen(true)}
              className="px-6 py-3 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-glow-gold flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Trailer</span>
            </button>

            <Link
              to={`/movie/${movie.id}`}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <Info className="w-4 h-4" />
              <span>More Details</span>
            </Link>

            <button
              onClick={handleWatchlistToggle}
              className={`p-3 rounded-xl border backdrop-blur-md transition-all ${
                inWatchlist
                  ? 'bg-amber-500 text-black border-amber-500 shadow-glow-gold'
                  : 'bg-black/50 text-white hover:bg-purple-600 hover:border-purple-500 border-white/20'
              }`}
              title={inWatchlist ? "In Watchlist" : "Add to Watchlist"}
            >
              {inWatchlist ? <Check className="w-5 h-5 stroke-[3]" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded YouTube Trailer Modal */}
      {trailerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-cine-darker rounded-2xl overflow-hidden border border-cine-border shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-cine-border">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                {movie.title} — Official Trailer
              </h3>
              <button
                onClick={() => setTrailerModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title={`${movie.title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;

