import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { favoriteService } from '../services/authService';
import { Heart, Trash2, Film, Sparkles } from 'lucide-react';
import { getPosterUrl, getYear } from '../utils/helpers';
import toast from 'react-hot-toast';

const Favorites = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const res = await favoriteService.getFavorites();
      setItems(res.favorites || []);
    } catch (err) {
      toast.error('Failed to load favorite films');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await favoriteService.remove(movieId);
      setItems((prev) => prev.filter((item) => item.movieId !== movieId));
      toast.success('Removed from favorites');
    } catch (err) {
      toast.error('Failed to remove favorite');
    }
  };

  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 border-b border-cine-border mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            My All-Time Favorite Films
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Your personal cinematic hall of fame ({items.length} titles)
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="group relative bg-cine-surface border border-cine-border rounded-xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <Link to={`/movie/${item.movieId}`} className="block relative aspect-[2/3] overflow-hidden">
                  <img
                    src={getPosterUrl(item.posterPath)}
                    alt={item.movieTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-pink-400">
                    <Heart className="w-4 h-4 fill-pink-500" />
                  </div>
                </Link>

                <div className="p-3">
                  <Link
                    to={`/movie/${item.movieId}`}
                    className="font-bold text-sm text-white hover:text-pink-300 line-clamp-1"
                  >
                    {item.movieTitle}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{getYear(item.releaseDate)}</p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-cine-border/60">
                    <span className="text-xs text-gray-400">Saved</span>
                    <button
                      onClick={() => handleRemove(item.movieId)}
                      className="text-gray-500 hover:text-red-400 p-1"
                      title="Remove from favorites"
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
            <Heart className="w-12 h-12 text-pink-500/50 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">No Favorites Added Yet</h3>
            <p className="text-sm text-gray-400 mb-6">
              When you discover a film you deeply love, click the Favorite button on its details page to add it here.
            </p>
            <Link
              to="/search"
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 transition-colors inline-block"
            >
              Discover Masterpieces
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

