import type { FilmPreview, FilmsResponse } from '../types/film';
import { httpClient } from './httpClient';
import { ENDPOINTS } from '../config/constants';

export const moviesApi = {
  async getMovies(page: number = 1, search?: string, genres?: string[]): Promise<FilmsResponse> {
    const params: Record<string, string> = {
      page: page.toString(),
    };

    if (search) {
      params.search = search;
    }

    if (genres && genres.length > 0) {
      params.genre = genres.join(',');
    }

    return httpClient.get<FilmsResponse>(ENDPOINTS.MOVIES, params);
  },

  async getMovieById(id: number): Promise<FilmPreview> {
    return httpClient.get<FilmPreview>(`${ENDPOINTS.MOVIES}${id}/`);
  }
};