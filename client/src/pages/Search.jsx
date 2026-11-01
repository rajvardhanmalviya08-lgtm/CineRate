import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '../services/movieService';
import MovieCard from '../components/common/MovieCard';
import SkeletonCard from '../components/common/SkeletonCard';
import {
  Search as SearchIcon,
  Filter,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Film,
} from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'popularity.desc');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sync state if URL query params change (e.g. from navbar search)
  useEffect(() => {
    const urlQ = searchParams.get('q') || '';
    const urlGenre = searchParams.get('genre') || '';
    const urlYear = searchParams.get('year') || '';
    const urlSort = searchParams.get('sortBy') || 'popularity.desc';
    const urlPage = Number(searchParams.get('page')) || 1;
    const urlCategory = searchParams.get('category');

    setQuery(urlQ);
    setSelectedGenre(urlGenre);
    setSelectedYear(urlYear);
    setSortBy(urlSort);
    setPage(urlPage);

    // If category is specified in query
    if (urlCategory === 'bollywood' || urlCategory === 'indian') {
      // handled in fetch
    }
  }, [searchParams]);

  // Load genres
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const res = await movieService.getGenres();
        setGenres(res.genres || []);
      } catch (err) {}
    };
    loadGenres();
  }, []);

  // Fetch search results (debounced query)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, selectedGenre, selectedYear, sortBy, page]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const category = searchParams.get('category');
      let data;

      if (category === 'bollywood') {
        data = await movieService.getBollywood(page);
      } else if (category === 'indian') {
        data = await movieService.getIndian(page);
      } else if (category === 'hollywood') {
        data = await movieService.getHollywood(page);
      } else {
        data = await movieService.searchMovies({
          query: query.trim(),
          genre: selectedGenre,
          year: selectedYear,
          sortBy,
          page,
        });
      }

      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 50));
      setTotalResults(data.total_results || 0);
    } catch (err) {
      console.error('[Search Error]', err);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newParams) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([k, v]) => {
      if (v) {
        nextParams.set(k, v);
      } else {
        nextParams.delete(k);
      }
    });
    setSearchParams(nextParams);
  };

  const handleClearFilters = () => {
    setQuery('');
    setSelectedGenre('');
    setSelectedYear('');
    setSortBy('popularity.desc');
    setPage(1);
    setSearchParams({});
  };

  const years = Array.from({ length: 45 }, (_, i) => `${2026 - i}`);

  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Headline */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Film className="w-7 h-7 text-purple-400" />
            Discover & Search Films
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Search our comprehensive movie catalog by title, genre, year, and platform scores
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
              updateFilters({ q: e.target.value, page: 1 });
            }}
            placeholder="Search by film title, actor, or director..."
            className="w-full bg-cine-surface border border-cine-border rounded-2xl pl-12 pr-12 py-3.5 text-base text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-lg"
          />
          <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                updateFilters({ q: '' });
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="bg-cine-surface border border-cine-border rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-sm font-semibold text-purple-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters & Sorting</span>
            </div>

            {(selectedGenre || selectedYear || query || sortBy !== 'popularity.desc') && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-red-400 hover:text-red-300 font-medium underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Genre Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                  setPage(1);
                  updateFilters({ genre: e.target.value, page: 1 });
                }}
                className="w-full bg-cine-darker border border-cine-border rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Release Year</label>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setPage(1);
                  updateFilters({ year: e.target.value, page: 1 });
                }}
                className="w-full bg-cine-darker border border-cine-border rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
              >
                <option value="">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                  updateFilters({ sortBy: e.target.value, page: 1 });
                }}
                className="w-full bg-cine-darker border border-cine-border rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
              >
                <option value="popularity.desc">Most Popular</option>
                <option value="vote_average.desc">Highest Rated</option>
                <option value="primary_release_date.desc">Newest Releases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">
            Showing <strong className="text-white">{movies.length}</strong> titles
            {totalResults > 0 && ` of ${totalResults.toLocaleString()} results`}
          </p>
        </div>

        {/* Movie Results Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-cine-surface border border-cine-border rounded-2xl p-16 text-center max-w-lg mx-auto">
            <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">No Matching Films Found</h3>
            <p className="text-sm text-gray-400 mb-6">
              We couldn't find any movies matching your current search parameters. Try adjusting keywords or clearing genre/year filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-3 mt-12">
            <button
              onClick={() => {
                const prev = Math.max(page - 1, 1);
                setPage(prev);
                updateFilters({ page: prev });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-cine-surface border border-cine-border text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-sm text-gray-400 font-medium px-2">
              Page <strong className="text-white">{page}</strong> of{' '}
              <strong className="text-white">{totalPages}</strong>
            </span>

            <button
              onClick={() => {
                const next = Math.min(page + 1, totalPages);
                setPage(next);
                updateFilters({ page: next });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page >= totalPages}
              className="px-4 py-2 rounded-xl bg-cine-surface border border-cine-border text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

