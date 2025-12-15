import type { FilmPreview, FilmsResponse, FilmDetails, Review, CommentRequest } from '../types/film';
import { httpClient } from './httpClient';
import { ENDPOINTS } from '../config/constants';

export interface ReviewsResponse {
  results: Review[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const moviesApi = {
  async getMovies(page: number = 1, search?: string, genres?: string[]): Promise<FilmsResponse> {
    const params: Record<string, string | string[]> = {
      page: page.toString(),
    };

    if (search) {
      params.search = search;
    }

    if (genres && genres.length > 0) {
      params.genre = genres;
    }

    return httpClient.get<FilmsResponse>(ENDPOINTS.MOVIES, params);
  },

  async getMovieById(id: number): Promise<FilmPreview> {
    return httpClient.get<FilmPreview>(`${ENDPOINTS.MOVIES}${id}/`);
  },

  async getMovieDetails(id: number, reviewsLimit: number = 5): Promise<FilmDetails> {
    const params: Record<string, string> = {};
    if (reviewsLimit > 0) {
      params.reviews_limit = reviewsLimit.toString();
    }

    return httpClient.get<FilmDetails>(ENDPOINTS.MOVIE_DETAIL(id), params);
  },

  async getMovieReviews(id: number, page: number = 1, pageSize: number = 10): Promise<ReviewsResponse> {
    const params: Record<string, string> = {
      page: page.toString(),
      page_size: pageSize.toString(),
    };

    return httpClient.get<ReviewsResponse>(ENDPOINTS.MOVIE_REVIEWS(id), params);
  },

  async createReview(data: CommentRequest): Promise<Review> {
    return httpClient.post<Review>(ENDPOINTS.REVIEW_CREATE, data);
  },
  
  async toggleLike(reviewId: number): Promise<{ 
    id: number; 
    likes: number; 
    likedByCurrentUser: boolean 
  }> {
    return httpClient.post(ENDPOINTS.REVIEW_LIKE(reviewId), {});
  },
};