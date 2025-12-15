export interface FilmPreview {
  id: number;
  title: string;
  posterUrl: string;
  year: number;
  duration: number;
  rating: number;
  genres: string[];
}

export interface FilmsResponse {
  films: FilmPreview[];
  hasMore: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface FilmsQueryParams { 
  search: string;
  genre: number[];
}

export interface ReviewUser {
  id: number;
  username: string;
  avatarUrl?: string;
}

export interface Review {
  id: number;
  text: string;
  createdAt: number;
  likes: number;
  likedByCurrentUser: boolean;
  user: ReviewUser;
}

export interface FilmDetails {
  id: number;
  title: string;
  posterUrl: string;
  country: string;
  year: number;
  duration: number;
  genres: string[];
  tags: string[];
  director: string;
  actors: string[];
  description: string;
  rating: number;
  videoUrl: string;
  reviews?: Review[];
}

export interface RateFilmRequest {
  score: number;
}

export interface RateFilmResponse {
  movie: number;
  rating: number;
}

export interface UserRatingResponse {
  score: number;
  movie: number;
  userId: number;
  ratedAt?: string;
}

export interface CommentRequest {
  movie: number;
  text: string;
}

export interface EditCommentRequest {
  commentId: number;
  text: string;
}