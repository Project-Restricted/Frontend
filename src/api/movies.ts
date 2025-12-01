import type { FilmPreview, FilmsResponse } from '../types/film';

const API_BASE_URL = 'https://api.clashofclan.ru/api/v1/movies/';

export const moviesApi = {
  async getMovies(page: number = 1, search?: string, genres?: string[]): Promise<FilmsResponse> {
    try {      
      const params = new URLSearchParams({
        page: page.toString(),
      });

      if (search) {
        params.append('search', search);
      }

      if (genres && genres.length > 0) {
        params.append('genre', genres.join(','));
      }
      
      const url = `${API_BASE_URL}?${params}`;
      console.log('🔗 URL запроса:', url);
      
      const response = await fetch(url);
      
      console.log('📊 Статус ответа:', response.status, response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: FilmsResponse = await response.json();
      console.log('✅ Данные получены! Фильмов:', data.films.length);
      return data;
      
    } catch (error) {
      console.error('❌ Ошибка загрузки фильмов:', error);
      throw error;
    }
  },

  async getMovieById(id: number): Promise<FilmPreview> {
    const url = `${API_BASE_URL}${id}/`;
    console.log('🔗 URL запроса фильма:', url);
    
    const response = await fetch(url);
    return response.json();
  }
};