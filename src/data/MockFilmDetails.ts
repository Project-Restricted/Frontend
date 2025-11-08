import type { FilmDetails } from '../types/film';

export const mockFilmDetails: FilmDetails = {
  id: 1,
  title: 'Ночной город',
  posterUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/10703959/b06497d6-3609-49a0-8d27-672482329dbd/384x384',
  country: 'США',
  year: 2024,
  duration: 135,
  genres: ['Боевик', 'Триллер'],
  tags: ['экшн', 'приключения', 'фантастика', 'боевик', 'триллер'],
  director: 'Кристофер Нолан',
  actors: ['Леонардо ДиКаприо', 'Джозеф Гордон-Левитт', 'Эллен Пейдж', 'Том Харди'],
  description: 'Захватывающий боевик о жизни в ночном городе, где каждый шаг может стать последним. Герои сталкиваются с невероятными испытаниями и делают сложный моральный выбор.',
  rating: 8.5,
  videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  reviews: [
    {
      id: 1,
      replyOn: 0,
      text: 'Отличный фильм! Особенно понравилась операторская работа.',
      likes: 15,
      createdAt: Date.now() - 2 * 60 * 60 * 1000,
      user: {
        id: 1,
        avatarUrl: '',
        username: 'Алексей'
      }
    },
    {
      id: 2,
      replyOn: 1,
      text: 'Полностью согласен! Сцена в метро просто шикарная.',
      likes: 8,
      createdAt: Date.now() - 1 * 60 * 60 * 1000,
      user: {
        id: 2,
        avatarUrl: '',
        username: 'Мария'
      }
    }
  ]
};