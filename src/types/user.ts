export interface User {
  id: number;
  email: string;
  username: string;
  avatarUrl: string | null;
  averageRating: number;
  reviewsCount: number;
  isModerator: boolean;
  createdAt: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  useCookie?: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  tokens?: {
    access: string;
    refresh: string;
  };
  error?: string;
}

export interface LogoutRequest {
  refresh: string;
}

export interface LogoutResponse {
  success: boolean;
  error?: string;
}

export interface ModeratorRequest {
  message?: string;
}

export interface ModeratorRequestResponse {
  success: boolean;
  request?: {
    id: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
  };
  error?: string;
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

export interface Tokens {
  access: string;
  refresh: string;
}