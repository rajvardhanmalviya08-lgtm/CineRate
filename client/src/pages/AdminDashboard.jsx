import React, { useState, useEffect } from 'react';
import { adminService } from '../services/authService';
import {
  ShieldCheck,
  Users,
  MessageSquare,
  Star,
  Bookmark,
  Trash2,
  UserCheck,
  UserX,
  Search,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [loading, setLoading] = useState(true);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, reviewsRes] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(searchUser),
        adminService.getReviews(),
      ]);

      setStats(statsRes.stats);
      setUsers(usersRes.users || []);
      setReviews(reviewsRes.reviews || []);
    } catch (err) {
      console.error('[Admin Error]', err);
      toast.error('Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    try {
      const res = await adminService.getUsers(searchUser);
      setUsers(res.users || []);
    } catch (err) {
      toast.error('Failed to filter users');
    }
  };

  const handleUpdateRole = async (userId, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change this user's role to ${nextRole.toUpperCase()}?`)) return;

    try {
      await adminService.updateRole(userId, nextRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: nextRole } : u))
      );
      toast.success(`User role changed to ${nextRole}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update role';
      toast.error(msg);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to permanently delete user "${userName}" and all their ratings and reviews?`)) return;

    try {
      await adminService.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success(`User "${userName}" deleted`);
      loadAdminData();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete user';
      toast.error(msg);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Moderate & delete this review from the platform?')) return;

    try {
      await adminService.deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success('Review moderated and deleted');
      loadAdminData();
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cine-border gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40">
                Staff Authorization
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2 mt-1">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
              CineRate Administration Control
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Platform-wide moderation, analytics, user permission controls, and audit logs
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-black shadow-glow-gold'
                  : 'bg-cine-surface text-gray-300 hover:text-white border border-cine-border'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'users'
                  ? 'bg-amber-500 text-black shadow-glow-gold'
                  : 'bg-cine-surface text-gray-300 hover:text-white border border-cine-border'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-amber-500 text-black shadow-glow-gold'
                  : 'bg-cine-surface text-gray-300 hover:text-white border border-cine-border'
              }`}
            >
              Moderation ({reviews.length})
            </button>
          </div>
        </div>

        {/* Analytics Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-panel p-6 rounded-2xl border border-cine-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Users</span>
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">
                  {stats?.totalUsers ?? users.length}
                </div>
                <p className="text-xs text-green-400 mt-1">Verified community accounts</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-cine-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Reviews</span>
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">
                  {stats?.totalReviews ?? reviews.length}
                </div>
                <p className="text-xs text-amber-400 mt-1">Platform community critiques</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-cine-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Ratings</span>
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">
                  {stats?.totalRatings ?? 0}
                </div>
                <p className="text-xs text-yellow-400 mt-1">Numerical movie verdicts</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-cine-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Watchlists</span>
                  <Bookmark className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">
                  {stats?.totalWatchlists ?? 0}
                </div>
                <p className="text-xs text-pink-400 mt-1">Saved movie bookmarks</p>
              </div>
            </div>

            {/* Recent Platform Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-cine-surface border border-cine-border rounded-2xl p-6">
                <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  Recently Registered Cinephiles
                </h3>
                <div className="space-y-3">
                  {stats?.recentUsers?.map((u) => (
                    <div
                      key={u._id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-cine-darker/60 border border-cine-border/50 text-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-white">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-800 text-gray-400'}`}>
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-cine-surface border border-cine-border rounded-2xl p-6">
                <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  Recent Community Reviews
                </h3>
                <div className="space-y-3">
                  {stats?.recentReviews?.map((r) => (
                    <div
                      key={r._id}
                      className="p-3 rounded-xl bg-cine-darker/60 border border-cine-border/50 text-sm space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white truncate max-w-[200px]">
                          "{r.title}"
                        </span>
                        <span className="text-xs font-bold text-amber-400">{r.rating}/10</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        By {r.userId?.name || 'User'} on <strong className="text-purple-300">{r.movieTitle}</strong>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search users */}
            <form onSubmit={handleSearchUsers} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full bg-cine-surface border border-cine-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-colors flex items-center space-x-1"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Users Table */}
            <div className="bg-cine-surface border border-cine-border rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-cine-darker text-xs uppercase font-bold text-gray-400 border-b border-cine-border">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Joined Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cine-border">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 flex items-center space-x-3">
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-purple-500/40"
                          />
                          <div>
                            <p className="font-semibold text-white">{u.name}</p>
                            <p className="text-xs text-gray-400">{u.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                              u.role === 'admin'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-gray-800 text-gray-300'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400">
                          {formatDate(u.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleUpdateRole(u._id, u.role)}
                            className="px-3 py-1 rounded-lg bg-cine-darker hover:bg-white/10 text-xs font-semibold text-gray-200 border border-cine-border"
                            title="Toggle User/Admin Role"
                          >
                            {u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u._id, u.name)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Review Moderation Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <p className="text-xs text-gray-400">
              Moderators can review all platform comments and immediately remove inappropriate or abusive reviews.
            </p>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-cine-surface border border-cine-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-base">"{rev.title}"</span>
                      <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-0.5 rounded">
                        {rev.rating}/10
                      </span>
                    </div>
                    <p className="text-xs text-purple-400 font-semibold">
                      Film: {rev.movieTitle} • Author: {rev.userId?.name || 'Unknown'} ({rev.userId?.email || 'N/A'})
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed mt-1">
                      {rev.content}
                    </p>
                    <p className="text-[11px] text-gray-500">{formatDate(rev.createdAt)}</p>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => handleDeleteReview(rev._id)}
                      className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Review</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

