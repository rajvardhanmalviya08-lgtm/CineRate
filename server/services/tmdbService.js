const axios = require('axios');
const { fallbackMovies, genresList } = require('./fallbackMovies');

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY || '';

// Axios instance with default config
const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 8000,
});

// Helper to check if TMDB API key is active
const hasTmdbKey = () => Boolean(process.env.TMDB_API_KEY && process.env.TMDB_API_KEY.trim() !== '');

/**
 * Fetch trending movies
 */
const getTrending = async (page = 1) => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/trending/movie/day', {
        params: { api_key: process.env.TMDB_API_KEY, page },
      });
      return res.data;
    } catch (err) {
      console.warn('[TMDB Warning] Falling back to curated catalog:', err.message);
    }
  }
  return {
    page: 1,
    results: fallbackMovies.slice(0, 10),
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
};

/**
 * Fetch popular movies
 */
const getPopular = async (page = 1) => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/movie/popular', {
        params: { api_key: process.env.TMDB_API_KEY, page },
      });
      return res.data;
    } catch (err) {
      console.warn('[TMDB Warning] Falling back to curated catalog:', err.message);
    }
  }
  return {
    page: 1,
    results: fallbackMovies.filter((m) => m.category === 'popular' || m.vote_average >= 8.0).concat(fallbackMovies).slice(0, 10),
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
};

/**
 * Fetch top rated movies
 */
const getTopRated = async (page = 1) => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/movie/top_rated', {
        params: { api_key: process.env.TMDB_API_KEY, page },
      });
      return res.data;
    } catch (err) {
      console.warn('[TMDB Warning] Falling back to curated catalog:', err.message);
    }
  }
  return {
    page: 1,
    results: fallbackMovies.filter((m) => m.vote_average >= 8.2).slice(0, 10),
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
};

/**
 * Fetch upcoming movies
 */
const getUpcoming = async (page = 1) => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/movie/upcoming', {
        params: { api_key: process.env.TMDB_API_KEY, page },
      });
      return res.data;
    } catch (err) {
      console.warn('[TMDB Warning] Falling back to curated catalog:', err.message);
    }
  }
  return {
    page: 1,
    results: fallbackMovies.filter((m) => m.category === 'upcoming' || new Date(m.release_date) >= new Date('2024-01-01')).concat(fallbackMovies.slice(0, 4)),
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
};

/**
 * Fetch now playing movies
 */
const getNowPlaying = async (page = 1) => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/movie/now_playing', {
        params: { api_key: process.env.TMDB_API_KEY, page },
      });
      return res.data;
    } catch (err) {
      console.warn('[TMDB Warning] Falling back to curated catalog:', err.message);
    }
  }
  return {
    page: 1,
    results: fallbackMovies.filter((m) => m.category === 'now_playing' || m.category === 'hollywood').slice(0, 8),
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
};

/**
 * Fetch Bollywood & Hindi movies
 */
const getBollywood = async (page = 1) => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/discover/movie', {
        params: {
          api_key: process.env.TMDB_API_KEY,
          with_original_language: 'hi',
          sort_by: 'popularity.desc',
          page,
        },
      });
      return res.data;
    } catch (err) {
      console.warn('[TMDB Warning] Falling back to curated catalog:', err.message);
    }
  }
  return {
    page: 1,
    results: fallbackMovies.filter((m) => m.category === 'bollywood' || m.category === 'indian'),
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
};

/**
 * Fetch Indian Cinema (all languages: Hindi, Telugu, Tamil, etc.)
 */
const getIndian = async (page = 1) => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/discover/movie', {
        params: {
          api_key: process.env.TMDB_API_KEY,
          with_origin_country: 'IN',
          sort_by: 'popularity.desc',
          page,
        },
      });
      return res.data;
    } catch (err) {
      console.warn('[TMDB Warning] Falling back to curated catalog:', err.message);
    }
  }
  return {
    page: 1,
    results: fallbackMovies.filter((m) => m.category === 'indian' || m.category === 'bollywood'),
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
};

/**
 * Fetch Hollywood / International blockbusters
 */
const getHollywood = async (page = 1) => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/discover/movie', {
        params: {
          api_key: process.env.TMDB_API_KEY,
          with_original_language: 'en',
          sort_by: 'popularity.desc',
          page,
        },
      });
      return res.data;
    } catch (err) {
      console.warn('[TMDB Warning] Falling back to curated catalog:', err.message);
    }
  }
  return {
    page: 1,
    results: fallbackMovies.filter((m) => m.category === 'hollywood' || m.category === 'top_rated'),
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
};

/**
 * Fetch detailed movie data with credits, videos (trailer), recommendations, and similar
 */
const getMovieDetails = async (movieId) => {
  const numericId = Number(movieId);

  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get(`/movie/${numericId}`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          append_to_response: 'credits,videos,recommendations,similar',
        },
      });
      return res.data;
    } catch (err) {
      console.warn(`[TMDB Warning] Failed to fetch movie ${numericId}:`, err.message);
    }
  }

  // Look up in fallbackMovies
  const movie = fallbackMovies.find((m) => m.id === numericId) || fallbackMovies[0];

  return {
    ...movie,
    videos: {
      results: [
        {
          key: movie.trailer_key || 'uYPbbksJxIg',
          site: 'YouTube',
          type: 'Trailer',
          official: true,
          name: `${movie.title} Official Trailer`,
        },
      ],
    },
    recommendations: {
      results: fallbackMovies.filter((m) => m.id !== movie.id).slice(0, 6),
    },
    similar: {
      results: fallbackMovies.filter((m) => m.id !== movie.id).slice(2, 8),
    },
  };
};

/**
 * Search movies with query, genre, year, sorting and pagination
 */
const searchMovies = async ({ query = '', genre = '', year = '', sortBy = 'popularity.desc', page = 1 }) => {
  if (hasTmdbKey()) {
    try {
      if (query && query.trim() !== '') {
        const res = await tmdbClient.get('/search/movie', {
          params: {
            api_key: process.env.TMDB_API_KEY,
            query: query.trim(),
            primary_release_year: year || undefined,
            page,
          },
        });
        return res.data;
      } else {
        const res = await tmdbClient.get('/discover/movie', {
          params: {
            api_key: process.env.TMDB_API_KEY,
            with_genres: genre || undefined,
            primary_release_year: year || undefined,
            sort_by: sortBy,
            page,
          },
        });
        return res.data;
      }
    } catch (err) {
      console.warn('[TMDB Warning] Search failed, falling back to catalog:', err.message);
    }
  }

  // Fallback search logic
  let results = [...fallbackMovies];

  if (query && query.trim() !== '') {
    const q = query.toLowerCase();
    results = results.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.overview && m.overview.toLowerCase().includes(q)) ||
        (m.director && m.director.toLowerCase().includes(q))
    );
  }

  if (genre) {
    const genreId = Number(genre);
    results = results.filter((m) => m.genres && m.genres.some((g) => g.id === genreId || g.name.toLowerCase() === genre.toLowerCase()));
  }

  if (year) {
    results = results.filter((m) => m.release_date && m.release_date.startsWith(year));
  }

  if (sortBy === 'vote_average.desc') {
    results.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  } else if (sortBy === 'primary_release_date.desc') {
    results.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
  } else {
    // Popularity / vote_count desc
    results.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
  }

  return {
    page: Number(page),
    results,
    total_pages: 1,
    total_results: results.length,
  };
};

/**
 * Get genre list
 */
const getGenres = async () => {
  if (hasTmdbKey()) {
    try {
      const res = await tmdbClient.get('/genre/movie/list', {
        params: { api_key: process.env.TMDB_API_KEY },
      });
      return res.data.genres;
    } catch (err) {
      console.warn('[TMDB Warning] Genres failed, using default genres:', err.message);
    }
  }
  return genresList;
};

module.exports = {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getNowPlaying,
  getBollywood,
  getIndian,
  getHollywood,
  getMovieDetails,
  searchMovies,
  getGenres,
};

