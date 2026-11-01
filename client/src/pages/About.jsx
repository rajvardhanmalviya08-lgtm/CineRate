import React from 'react';
import { Film, Award, Sparkles, Shield, Heart, Database } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cinematic Excellence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            About Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">Rate</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A premium full-stack movie discovery and rating platform built for true cinephiles who demand authentic opinions, cinematic aesthetics, and seamless discovery.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-cine-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Real Movie Data</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Powered by The Movie Database (TMDB) with trailers, cast details, release dates, and high-resolution posters.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cine-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Dual-Rating Metric</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Compare global TMDB scores against our dynamic internal CineRate community ratings in real-time.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cine-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Curated Watchlists</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Build your personal watchlists, mark films as watched, and maintain a personal hall of fame for your favorite cinema.
            </p>
          </div>
        </div>

        {/* Official TMDB Attribution Section */}
        <div className="bg-cine-surface border-2 border-sky-500/30 rounded-3xl p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-sky-950 flex items-center justify-center border border-sky-500/40 font-black text-sky-400 text-lg">
              TMDB
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">The Movie Database (TMDB) Attribution</h3>
              <p className="text-xs text-sky-400 font-semibold">Official API Data Partner</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            This product uses the TMDB API but is not endorsed or certified by TMDB. All movie posters, backdrops, cast bios, plot descriptions, and release dates are sourced via TMDB's developer API or high-fidelity curated caches.
          </p>
          <div className="pt-2">
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold underline"
            >
              Learn more about TMDB →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

