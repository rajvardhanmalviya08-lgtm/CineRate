import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Film,
  Search,
  Bookmark,
  Heart,
  User,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Compass,
  Sparkles,
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/search' },
    { name: 'Top Rated', path: '/search?sortBy=vote_average.desc' },
    { name: 'Bollywood', path: '/search?category=bollywood' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500 p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-cine-darker rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-cine-gold group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center">
                Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">Rate</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path.includes('?') && location.search === link.path.split('?')[1]);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="hidden sm:flex flex-1 max-w-xs lg:max-w-md mx-2">
            <form onSubmit={handleQuickSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search movies, directors..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full bg-cine-surface/90 text-sm text-gray-200 pl-10 pr-4 py-2 rounded-full border border-cine-border focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>
          </div>

          {/* Auth & Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link
                  to="/watchlist"
                  className="hidden sm:flex items-center space-x-1 text-gray-300 hover:text-amber-400 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  title="My Watchlist"
                >
                  <Bookmark className="w-5 h-5" />
                </Link>
                <Link
                  to="/favorites"
                  className="hidden sm:flex items-center space-x-1 text-gray-300 hover:text-pink-400 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  title="My Favorites"
                >
                  <Heart className="w-5 h-5" />
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 p-1 rounded-full border border-purple-500/30 hover:border-purple-500 transition-colors focus:outline-none"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-600/50"
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl py-2 z-50 text-sm border border-cine-border animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-cine-border">
                        <p className="font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-300 rounded border border-purple-500/40">
                            Administrator
                          </span>
                        )}
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-colors"
                      >
                        <User className="w-4 h-4 mr-2.5 text-purple-400" />
                        My Dashboard & Profile
                      </Link>
                      <Link
                        to="/watchlist"
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-colors sm:hidden"
                      >
                        <Bookmark className="w-4 h-4 mr-2.5 text-amber-400" />
                        My Watchlist
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-colors sm:hidden"
                      >
                        <Heart className="w-4 h-4 mr-2.5 text-pink-400" />
                        My Favorites
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors border-t border-cine-border/50"
                        >
                          <ShieldCheck className="w-4 h-4 mr-2.5 text-amber-400" />
                          Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors border-t border-cine-border/50"
                      >
                        <LogOut className="w-4 h-4 mr-2.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-glow-purple transition-all duration-200"
                >
                  Join Free
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-cine-border px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleQuickSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search movies, actors..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-full bg-cine-darker text-sm text-gray-200 pl-10 pr-4 py-2.5 rounded-lg border border-cine-border focus:outline-none focus:border-purple-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-purple-600/20 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link
                  to="/watchlist"
                  className="px-3 py-2 rounded-lg text-base font-medium text-amber-400 hover:bg-amber-500/10 flex items-center"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  My Watchlist
                </Link>
                <Link
                  to="/favorites"
                  className="px-3 py-2 rounded-lg text-base font-medium text-pink-400 hover:bg-pink-500/10 flex items-center"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  My Favorites
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded-lg text-base font-medium text-purple-400 hover:bg-purple-500/10 flex items-center"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

