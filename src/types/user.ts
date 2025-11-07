export interface User {
  id: number;
  email: string;
  username: string;
  avatarUrl: string;
  averageRating: number;
  reviewsCount: number;
  isModerator: boolean;
  createdAt: number;
}

export interface RegisterRequest {
  name: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface EditProfileRequest {
  username: string;
  avatarUrl: string;
}

export interface UserResponse {
  success: boolean;
  user?: User;
  error?: string;
}