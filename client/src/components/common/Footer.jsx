import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Heart, Shield, Award, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cine-darker border-t border-cine-border/80 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 p-0.5 shadow-glow-purple">
                <div className="w-full h-full bg-cine-darker rounded-[6px] flex items-center justify-center">
                  <Film className="w-4 h-4 text-cine-gold" />
                </div>
              </div>
              <span className="text-xl font-black text-white">
                Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">Rate</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The premier destination for film lovers. Discover trending blockbusters, read insightful community reviews, and curate your personalized cinematic journey.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors">
                  Trending Movies
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-purple-400 transition-colors">
                  Movie Discovery
                </Link>
              </li>
              <li>
                <Link to="/search?sortBy=vote_average.desc" className="hover:text-purple-400 transition-colors">
                  Top Rated Classics
                </Link>
              </li>
              <li>
                <Link to="/search?category=bollywood" className="hover:text-purple-400 transition-colors">
                  Bollywood & Indian Cinema
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Community */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/watchlist" className="hover:text-amber-400 transition-colors">
                  My Watchlist
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-pink-400 transition-colors">
                  Favorite Films
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-400 transition-colors">
                  About CineRate
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & TMDB Attribution */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Attribution & Legal</h4>
            <div className="bg-cine-surface p-3 rounded-lg border border-cine-border text-xs text-gray-400 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sky-400">TMDB</span>
                <span className="text-[10px] bg-sky-900/40 text-sky-300 px-1.5 py-0.5 rounded">API Powered</span>
              </div>
              <p className="leading-snug">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
            </div>
            <div className="flex space-x-4 mt-4 text-xs">
              <Link to="/terms" className="hover:text-gray-200 transition-colors">Terms of Service</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-gray-200 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-cine-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} CineRate Media Inc. All rights reserved.</p>
          <p className="flex items-center">
            Built with passion for cinema <Heart className="w-3.5 h-3.5 text-red-500 ml-1.5 inline fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

