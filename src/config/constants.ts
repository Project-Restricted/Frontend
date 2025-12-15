export const API_CONFIG = {
  BASE_URL: 'https://api.clashofclan.ru/api/v1',
};

export const ENDPOINTS = {
  MOVIES: '/movies/',
  MOVIE_DETAIL: (id: number) => `/movies/${id}/`,
  MOVIE_REVIEWS: (id: number) => `/movies/${id}/reviews/`,
  MOVIE_RATE: (id: number) => `/movies/${id}/rate/`,
  MOVIE_GENRES: '/movies/genres/',
  REVIEW_CREATE: '/movies/posts/create/',
  REVIEW_LIKE: (id: number) => `/movies/posts/${id}/like/`,
  AUTH: {
    REGISTER: '/auth/register/',
    LOGIN: '/auth/login/',
    LOGOUT: '/auth/logout/',
    MODERATOR_REQUEST: '/auth/moderator-request/',
  }
} as const;