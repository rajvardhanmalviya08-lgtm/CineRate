import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Bookmark, Check, Heart, Sparkles } from 'lucide-react';
import { getPosterUrl, getYear, formatRating } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { watchlistService } from '../../services/authService';
import toast from 'react-hot-toast';

const MovieCard = ({ movie, onWatchlistChange, initialInWatchlist = false }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  const [loading, setLoading] = useState(false);

  // Genre extraction (handles array of objects or strings or single genre)
  const getGenreDisplay = () => {
    if (movie.genres && Array.isArray(movie.genres) && movie.genres.length > 0) {
      return typeof movie.genres[0] === 'object' ? movie.genres[0].name : movie.genres[0];
    }
    if (movie.genre_ids && Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0) {
      // Map common TMDB genre IDs
      const genreMap = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
        18: 'Drama', 14: 'Fantasy', 27: 'Horror', 878: 'Sci-Fi', 53: 'Thriller', 36: 'History'
      };
      return genreMap[movie.genre_ids[0]] || 'Cinema';
    }
    return 'Film';
  };

  const handleWatchlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please sign in to add movies to your watchlist');
      navigate('/login');
      return;
    }

    setLoading(true);
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

      if (onWatchlistChange) {
        onWatchlistChange(movie.id, !inWatchlist);
      }
    } catch (err) {
      toast.error('Could not update watchlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const posterUrl = getPosterUrl(movie.poster_path);
  const year = getYear(movie.release_date);
  const genre = getGenreDisplay();
  const tmdbScore = formatRating(movie.vote_average);
  const cinerateScore = movie.cinerateRating ? formatRating(movie.cinerateRating) : null;

  return (
    <div className="group relative flex-shrink-0 w-44 sm:w-52 transition-all duration-300 hover:-translate-y-2">
      <Link to={`/movie/${movie.id}`} className="block">
        {/* Card Poster Container */}
        <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-cine-surface border border-cine-border shadow-lg group-hover:shadow-glow-purple group-hover:border-purple-500/50 transition-all duration-300">
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';
            }}
          />

          {/* Dark Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Quick Watchlist Button */}
          <button
            onClick={handleWatchlistToggle}
            disabled={loading}
            title={inWatchlist ? "In Watchlist" : "Add to Watchlist"}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
              inWatchlist
                ? 'bg-amber-500 text-black shadow-glow-gold'
                : 'bg-black/60 text-white hover:bg-purple-600 hover:text-white border border-white/20'
            }`}
          >
            {inWatchlist ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>

          {/* Genre Badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-black/60 backdrop-blur-md text-gray-300 rounded-md border border-white/10">
              {genre}
            </span>
          </div>

          {/* Bottom Ratings on Poster */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs font-semibold">
            {/* TMDB Rating */}
            <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-amber-400 border border-amber-500/20">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{tmdbScore}</span>
            </div>

            {/* CineRate Rating */}
            {cinerateScore ? (
              <div className="flex items-center space-x-1 bg-purple-950/80 backdrop-blur-md px-1.5 py-0.5 rounded text-purple-300 border border-purple-500/40">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>{cinerateScore}</span>
              </div>
            ) : (
              <div className="text-[10px] text-gray-400 bg-black/50 px-1 rounded">
                CR: —
              </div>
            )}
          </div>
        </div>

        {/* Card Metadata */}
        <div className="mt-2.5 px-0.5">
          <h3 className="font-semibold text-sm text-gray-100 group-hover:text-purple-300 transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-0.5 text-xs text-gray-400">
            <span>{year}</span>
            <span className="text-[11px] text-gray-500">{movie.vote_count ? `${movie.vote_count.toLocaleString()} votes` : ''}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

