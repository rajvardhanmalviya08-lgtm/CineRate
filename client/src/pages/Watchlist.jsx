import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { watchlistService } from '../services/authService';
import { Bookmark, Check, Trash2, Filter, Film } from 'lucide-react';
import { getPosterUrl, getYear, formatRating } from '../utils/helpers';
import toast from 'react-hot-toast';

const Watchlist = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unwatched, watched
  const [loading, setLoading] = useState(true);

  const loadWatchlist = async () => {
    setLoading(true);
    try {
      const res = await watchlistService.getWatchlist();
      setItems(res.watchlist || []);
    } catch (err) {
      toast.error('Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleToggleWatched = async (movieId) => {
    try {
      const res = await watchlistService.toggleWatched(movieId);
      setItems((prev) =>
        prev.map((item) =>
          item.movieId === movieId ? { ...item, watched: res.watched } : item
        )
      );
      toast.success(res.message);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleRemove = async (movieId) => {
    try {
      await watchlistService.remove(movieId);
      setItems((prev) => prev.filter((item) => item.movieId !== movieId));
      toast.success('Removed from watchlist');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'watched') return item.watched;
    if (filter === 'unwatched') return !item.watched;
    return true;
  });

  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cine-border gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Bookmark className="w-8 h-8 text-amber-400" />
              My Cinematic Watchlist
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Curate movies to watch and track your watched cinema history ({items.length} titles)
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-cine-surface p-1 rounded-xl border border-cine-border self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setFilter('unwatched')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'unwatched'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Unwatched ({items.filter((i) => !i.watched).length})
            </button>
            <button
              onClick={() => setFilter('watched')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'watched'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Watched ({items.filter((i) => i.watched).length})
            </button>
          </div>
        </div>

        {/* Watchlist Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="group relative bg-cine-surface border border-cine-border rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <Link to={`/movie/${item.movieId}`} className="block relative aspect-[2/3] overflow-hidden">
                  <img
                    src={getPosterUrl(item.posterPath)}
                    alt={item.movieTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.watched && (
                    <div className="absolute top-2 left-2 bg-green-500/90 text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center space-x-1 backdrop-blur-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Watched</span>
                    </div>
                  )}
                </Link>

                <div className="p-3">
                  <Link
                    to={`/movie/${item.movieId}`}
                    className="font-bold text-sm text-white hover:text-purple-300 line-clamp-1"
                  >
                    {item.movieTitle}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{getYear(item.releaseDate)}</p>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-cine-border/60">
                    <button
                      onClick={() => handleToggleWatched(item.movieId)}
                      className={`text-xs flex items-center space-x-1 font-semibold ${
                        item.watched
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-gray-400 hover:text-amber-400'
                      }`}
                      title={item.watched ? 'Mark as unwatched' : 'Mark as watched'}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{item.watched ? 'Seen' : 'Mark Watched'}</span>
                    </button>

                    <button
                      onClick={() => handleRemove(item.movieId)}
                      className="text-gray-500 hover:text-red-400 p-1"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-16 rounded-3xl text-center max-w-md mx-auto">
            <Bookmark className="w-12 h-12 text-amber-500/50 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">No Movies in this View</h3>
            <p className="text-sm text-gray-400 mb-6">
              {filter !== 'all'
                ? `You have no movies marked as ${filter}.`
                : 'Your watchlist is waiting for its first masterpiece!'}
            </p>
            <Link
              to="/search"
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 transition-colors inline-block"
            >
              Discover Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;

