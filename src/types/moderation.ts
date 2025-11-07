export interface FilmSubmission {
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
  videoUrl: string;
}

export interface TagSubmission {
  id: number;
  filmId: number;
  tagName: string;
}

export interface FilmModerationResponse {
  films: FilmSubmission[];
}

export interface TagModerationResponse {
  tags: TagSubmission[];
}

export interface ModerationDecision {
  requestId: number;
  isTag: boolean;
  isApproved: boolean;
}