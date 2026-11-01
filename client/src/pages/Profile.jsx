import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService, watchlistService, favoriteService } from '../services/authService';
import { ratingService } from '../services/ratingService';
import { reviewService } from '../services/reviewService';
import MovieCard from '../components/common/MovieCard';
import StarRating from '../components/common/StarRating';
import {
  User,
  Star,
  MessageSquare,
  Bookmark,
  Heart,
  Settings,
  Lock,
  Edit,
  Trash2,
  Sparkles,
  Film,
  Camera,
} from 'lucide-react';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [myRatings, setMyRatings] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile Edit Modal State
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [bio, setBio] = useState(user?.bio || '');

  // Password Change Modal State
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Sample avatars user can pick from
  const avatarOptions = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
  ];

  const loadUserData = async () => {
    setLoading(true);
    try {
      const [statsRes, wlRes, favRes, ratingsRes, reviewsRes] = await Promise.all([
        authService.getDashboardStats(),
        watchlistService.getWatchlist(),
        favoriteService.getFavorites(),
        ratingService.getMyRatings(),
        reviewService.getMyReviews(),
      ]);

      setStats(statsRes.stats);
      setWatchlist(wlRes.watchlist || []);
      setFavorites(favRes.favorites || []);
      setMyRatings(ratingsRes.ratings || []);
      setMyReviews(reviewsRes.reviews || []);
    } catch (err) {
      console.error('[Dashboard Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile({ name, avatar, bio });
    if (res.success) {
      setEditProfileOpen(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const res = await changePassword({ currentPassword, newPassword });
    if (res.success) {
      setPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewService.deleteReview(reviewId);
      setMyReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success('Review deleted');
      loadUserData();
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Hero Card */}
        <div className="bg-cine-surface border border-cine-border rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <div className="relative group">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                  alt={user?.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-purple-600/40 shadow-xl"
                />
                <button
                  onClick={() => setEditProfileOpen(true)}
                  className="absolute bottom-0 right-0 p-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-500 shadow-md"
                  title="Change avatar"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{user?.name}</h1>
                  {user?.role === 'admin' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
                <p className="text-sm text-gray-300 mt-2 max-w-lg leading-relaxed">
                  {user?.bio || 'Passionate movie fan rating and reviewing films on CineRate.'}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setEditProfileOpen(true)}
                className="px-4 py-2 rounded-xl bg-cine-darker border border-cine-border hover:border-purple-500 text-xs font-semibold text-gray-200 hover:text-white flex items-center space-x-1.5 transition-colors"
              >
                <Settings className="w-4 h-4 text-purple-400" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setPasswordModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-cine-darker border border-cine-border hover:border-amber-500 text-xs font-semibold text-gray-200 hover:text-white flex items-center space-x-1.5 transition-colors"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Password</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-cine-border">
            <div className="bg-cine-darker/60 rounded-xl p-3 text-center border border-cine-border/50">
              <span className="text-2xl font-black text-amber-400">
                {stats?.totalRatings ?? myRatings.length}
              </span>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                Films Rated
              </p>
            </div>

            <div className="bg-cine-darker/60 rounded-xl p-3 text-center border border-cine-border/50">
              <span className="text-2xl font-black text-purple-400">
                {stats?.totalReviews ?? myReviews.length}
              </span>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                Reviews Written
              </p>
            </div>

            <div className="bg-cine-darker/60 rounded-xl p-3 text-center border border-cine-border/50">
              <span className="text-2xl font-black text-white">
                {stats?.averagePersonalRating ? `${stats.averagePersonalRating}` : '—'}
              </span>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                Avg Rating
              </p>
            </div>

            <div className="bg-cine-darker/60 rounded-xl p-3 text-center border border-cine-border/50">
              <span className="text-2xl font-black text-pink-400">
                {stats?.watchlistCount ?? watchlist.length}
              </span>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                In Watchlist
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-cine-border pb-2 mb-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', name: 'Dashboard Overview', icon: Sparkles },
            { id: 'watchlist', name: `Watchlist (${watchlist.length})`, icon: Bookmark },
            { id: 'favorites', name: `Favorites (${favorites.length})`, icon: Heart },
            { id: 'ratings', name: `My Ratings (${myRatings.length})`, icon: Star },
            { id: 'reviews', name: `My Reviews (${myReviews.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-glow-purple'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Areas */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Recently Rated Movies */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  Recently Rated Films
                </h3>
              </div>
              {myRatings.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {myRatings.slice(0, 5).map((r) => (
                    <div
                      key={r._id}
                      className="bg-cine-surface border border-cine-border rounded-xl p-3 flex flex-col justify-between"
                    >
                      <img
                        src={r.posterPath ? `https://image.tmdb.org/t/p/w300${r.posterPath}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80'}
                        alt={r.movieTitle}
                        className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                      />
                      <p className="font-semibold text-sm text-white line-clamp-1">{r.movieTitle}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-cine-border text-xs">
                        <span className="text-gray-400">Score</span>
                        <span className="font-bold text-amber-400">{r.rating}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-8 rounded-2xl text-center text-gray-400">
                  <p>You haven't rated any films yet. Explore the catalog and share your ratings!</p>
                </div>
              )}
            </div>

            {/* Quick Watchlist preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-400" />
                  Your Watchlist Preview
                </h3>
                <button
                  onClick={() => setActiveTab('watchlist')}
                  className="text-xs font-semibold text-purple-400 hover:underline"
                >
                  View All ({watchlist.length}) →
                </button>
              </div>
              {watchlist.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {watchlist.slice(0, 6).map((item) => (
                    <div key={item._id} className="relative group">
                      <img
                        src={item.posterPath ? `https://image.tmdb.org/t/p/w300${item.posterPath}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80'}
                        alt={item.movieTitle}
                        className="w-full aspect-[2/3] object-cover rounded-xl border border-cine-border"
                      />
                      <p className="text-xs font-semibold text-white mt-1.5 truncate">{item.movieTitle}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-8 rounded-2xl text-center text-gray-400">
                  <p>Your watchlist is currently empty.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Watchlist Tab */}
        {activeTab === 'watchlist' && (
          <div>
            {watchlist.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {watchlist.map((item) => (
                  <div key={item._id} className="relative group">
                    <MovieCard
                      movie={{
                        id: item.movieId,
                        title: item.movieTitle,
                        poster_path: item.posterPath,
                        backdrop_path: item.backdropPath,
                        vote_average: item.voteAverage,
                        release_date: item.releaseDate,
                      }}
                      initialInWatchlist={true}
                      onWatchlistChange={() => loadUserData()}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-16 rounded-2xl text-center text-gray-400">
                <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Your Watchlist is Empty</h3>
                <p className="text-sm text-gray-400">
                  Bookmark movies you want to watch soon by clicking the watchlist button on any poster.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {favorites.map((item) => (
                  <MovieCard
                    key={item._id}
                    movie={{
                      id: item.movieId,
                      title: item.movieTitle,
                      poster_path: item.posterPath,
                      backdrop_path: item.backdropPath,
                      vote_average: item.voteAverage,
                      release_date: item.releaseDate,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-panel p-16 rounded-2xl text-center text-gray-400">
                <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No Favorite Films Yet</h3>
                <p className="text-sm text-gray-400">
                  Tap the heart on any movie details page to curate your all-time favorites.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div className="space-y-4">
            {myRatings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myRatings.map((item) => (
                  <div
                    key={item._id}
                    className="bg-cine-surface border border-cine-border rounded-xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.posterPath ? `https://image.tmdb.org/t/p/w185${item.posterPath}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=185&q=80'}
                        alt={item.movieTitle}
                        className="w-12 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{item.movieTitle}</h4>
                        <p className="text-xs text-gray-400">Rated {formatDate(item.updatedAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/30 text-amber-400 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{item.rating}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-16 rounded-2xl text-center text-gray-400">
                <Star className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p>You have not submitted any movie ratings yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {myReviews.length > 0 ? (
              <div className="space-y-4">
                {myReviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="bg-cine-surface border border-cine-border rounded-2xl p-6 shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-white">"{rev.title}"</h4>
                        <p className="text-xs text-purple-400 font-semibold mt-0.5">
                          Film: {rev.movieTitle} • {formatDate(rev.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-400 font-bold text-sm">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>{rev.rating}/10</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                      {rev.content}
                    </p>
                    <div className="pt-3 border-t border-cine-border flex items-center justify-between text-xs text-gray-400">
                      <span>{rev.likes?.length || 0} helpful votes</span>
                      <button
                        onClick={() => handleDeleteReview(rev._id)}
                        className="text-red-400 hover:text-red-300 flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Review</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-16 rounded-2xl text-center text-gray-400">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p>You have not published any reviews yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-cine-surface border border-cine-border rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-cine-darker border border-cine-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                  Choose Avatar
                </label>
                <div className="flex items-center space-x-2 py-2">
                  {avatarOptions.map((opt, i) => (
                    <img
                      key={i}
                      src={opt}
                      alt="avatar option"
                      onClick={() => setAvatar(opt)}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer transition-all ${
                        avatar === opt ? 'ring-2 ring-purple-500 scale-110' : 'opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Or paste custom image URL..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-cine-darker border border-cine-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500 mt-2"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                  Bio / Taste
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={250}
                  className="w-full bg-cine-darker border border-cine-border rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-cine-border">
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-cine-surface border border-cine-border rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Update Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full bg-cine-darker border border-cine-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-cine-darker border border-cine-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-cine-border">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-sm text-white bg-amber-500 hover:bg-amber-400 text-black transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

