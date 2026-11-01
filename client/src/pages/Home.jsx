import React, { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import HeroBanner from '../components/common/HeroBanner';
import MovieRow from '../components/common/MovieRow';
import {
  TrendingUp,
  Flame,
  Award,
  Calendar,
  PlayCircle,
  Globe,
  Film,
  Sparkles,
  MessageSquare,
  Star,
  Quote,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosterUrl, formatDate } from '../utils/helpers';

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [indianMovies, setIndianMovies] = useState([]);
  const [bollywoodMovies, setBollywoodMovies] = useState([]);
  const [hollywoodMovies, setHollywoodMovies] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [
          trendingRes,
          popularRes,
          topRatedRes,
          upcomingRes,
          nowPlayingRes,
          indianRes,
          bollywoodRes,
          hollywoodRes,
          reviewsRes,
        ] = await Promise.all([
          movieService.getTrending(),
          movieService.getPopular(),
          movieService.getTopRated(),
          movieService.getUpcoming(),
          movieService.getNowPlaying(),
          movieService.getIndian(),
          movieService.getBollywood(),
          movieService.getHollywood(),
          movieService.getRecentReviews(),
        ]);

        const trendingList = trendingRes.results || [];
        setTrending(trendingList);
        setPopular(popularRes.results || []);
        setTopRated(topRatedRes.results || []);
        setUpcoming(upcomingRes.results || []);
        setNowPlaying(nowPlayingRes.results || []);
        setIndianMovies(indianRes.results || []);
        setBollywoodMovies(bollywoodRes.results || []);
        setHollywoodMovies(hollywoodRes.results || []);
        setRecentReviews(reviewsRes.reviews || []);

        // Pick top trending or popular movie for Hero Banner
        if (trendingList.length > 0) {
          // fetch full details for hero to get tagline & trailer if possible
          try {
            const heroDetails = await movieService.getMovieDetails(trendingList[0].id);
            setHeroMovie(heroDetails.movie || trendingList[0]);
          } catch (e) {
            setHeroMovie(trendingList[0]);
          }
        }

        // Recommendations derived from top rated / popular
        if (popularRes.results && popularRes.results.length > 5) {
          setRecommended(popularRes.results.slice(3, 13));
        }
      } catch (error) {
        console.error('[Home Error] Failed to load home sections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 selection:bg-purple-600 pb-16">
      {/* 1. Hero Featured Movie */}
      <HeroBanner movie={heroMovie} />

      {/* Main Content Rows */}
      <div className="relative -mt-10 sm:-mt-16 z-20 space-y-4">
        {/* 2. Trending Movies */}
        <MovieRow
          title="Trending Now"
          movies={trending}
          loading={loading}
          icon={TrendingUp}
          viewAllLink="/search?sortBy=popularity.desc"
        />

        {/* 3. Popular Movies */}
        <MovieRow
          title="Popular Across The Globe"
          movies={popular}
          loading={loading}
          icon={Flame}
          viewAllLink="/search?sortBy=popularity.desc"
        />

        {/* 4. Top Rated Movies */}
        <MovieRow
          title="Top Rated All-Time Masterpieces"
          movies={topRated}
          loading={loading}
          icon={Award}
          viewAllLink="/search?sortBy=vote_average.desc"
        />

        {/* 5. Now Playing in Theaters */}
        <MovieRow
          title="Now Playing in Cinemas"
          movies={nowPlaying}
          loading={loading}
          icon={PlayCircle}
          viewAllLink="/search"
        />

        {/* 6. Upcoming Movies */}
        <MovieRow
          title="Upcoming Anticipated Releases"
          movies={upcoming}
          loading={loading}
          icon={Calendar}
          viewAllLink="/search?sortBy=primary_release_date.desc"
        />

        {/* 7. Bollywood Blockbusters */}
        <MovieRow
          title="Bollywood Hits & Classics"
          movies={bollywoodMovies}
          loading={loading}
          icon={Film}
          viewAllLink="/search?category=bollywood"
        />

        {/* 8. Popular Indian Movies */}
        <MovieRow
          title="Popular Indian Cinema (Pan-India)"
          movies={indianMovies}
          loading={loading}
          icon={Globe}
          viewAllLink="/search?category=indian"
        />

        {/* 9. Hollywood Blockbusters */}
        <MovieRow
          title="Hollywood Spectacles"
          movies={hollywoodMovies}
          loading={loading}
          icon={Sparkles}
          viewAllLink="/search?category=hollywood"
        />

        {/* 10. Recommended Movies */}
        <MovieRow
          title="Recommended For You"
          movies={recommended}
          loading={loading}
          icon={Sparkles}
          viewAllLink="/search"
        />

        {/* 11. Recently Added Platform Reviews */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-amber-500 rounded-full" />
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Recently Added Community Reviews
              </h2>
            </div>
            <Link
              to="/search"
              className="text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300"
            >
              Browse All Films
            </Link>
          </div>

          {recentReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentReviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-cine-surface/90 border border-cine-border rounded-2xl p-5 hover:border-purple-500/40 hover:shadow-glow-purple transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: User & Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={review.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                          alt={review.userId?.name || 'User'}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/40"
                        />
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {review.userId?.name || 'Anonymous Cinephile'}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {formatDate(review.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-500/30 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{review.rating}/10</span>
                      </div>
                    </div>

                    {/* Movie Info */}
                    <Link
                      to={`/movie/${review.movieId}`}
                      className="block text-xs font-semibold text-purple-400 hover:text-purple-300 mb-1 line-clamp-1"
                    >
                      On: {review.movieTitle}
                    </Link>

                    {/* Headline */}
                    <h4 className="font-bold text-white text-base mb-2 line-clamp-1">
                      "{review.title}"
                    </h4>

                    {/* Content */}
                    <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
                      {review.content}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-cine-border/60 flex items-center justify-between text-xs text-gray-400">
                    <span>{review.likeCount || review.likes?.length || 0} found this helpful</span>
                    <Link
                      to={`/movie/${review.movieId}`}
                      className="text-purple-400 hover:underline font-semibold"
                    >
                      Read full discussion →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl text-center text-gray-400">
              <Quote className="w-8 h-8 text-purple-400 mx-auto mb-2 opacity-50" />
              <p>No community reviews posted yet. Be the first to review a movie!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;

