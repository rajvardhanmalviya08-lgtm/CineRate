import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
          <Film className="w-10 h-10" />
        </div>

        <div>
          <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Scene Missing: That's a Cut!
          </h1>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            The reel you're looking for seems to have ended up on the cutting room floor or was moved to another location.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 pt-2">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple flex items-center space-x-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/search"
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-gray-300 bg-cine-surface border border-cine-border hover:bg-white/10 hover:text-white transition-all"
          >
            Search Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

