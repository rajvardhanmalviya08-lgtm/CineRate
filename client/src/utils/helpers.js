export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const DEFAULT_POSTER = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';
export const DEFAULT_BACKDROP = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80';

/**
 * Resolves full poster URL with fallback
 */
export const getPosterUrl = (path, size = 'w500') => {
  if (!path) return DEFAULT_POSTER;
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

/**
 * Resolves full backdrop URL with fallback
 */
export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return DEFAULT_BACKDROP;
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

/**
 * Extracts release year
 */
export const getYear = (dateStr) => {
  if (!dateStr) return 'N/A';
  return dateStr.split('-')[0] || 'N/A';
};

/**
 * Formats runtime into 'Xh Ym'
 */
export const formatRuntime = (minutes) => {
  if (!minutes || minutes <= 0) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();
};

/**
 * Formats rating to 1 decimal place
 */
export const formatRating = (rating) => {
  if (rating === null || rating === undefined || isNaN(rating)) return '—';
  return Number(rating).toFixed(1);
};

/**
 * Truncate long strings with ellipsis
 */
export const truncate = (str, len = 120) => {
  if (!str) return '';
  if (str.length <= len) return str;
  return str.slice(0, len).trim() + '...';
};

/**
 * Format relative date
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

