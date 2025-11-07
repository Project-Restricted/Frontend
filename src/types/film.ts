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

export interface FilmsQueryParams { 
  search: string;
  genre: string[];
}

export interface ReviewUser {
  id: number;
  avatarUrl: string;
  username: string;
}

export interface Review {
  id: number;
  replyOn: number;
  text: string;
  likes: number;
  createdAt: number;
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
  reviews: Review[];
}

export interface RatingRequest {
  filmId: number;
  value: number;
}

export interface CommentRequest {
  filmId: number;
  replyOn: number;
  text: string;  
}

export interface EditCommentRequest {
  commentId: number;
  text: string;
}