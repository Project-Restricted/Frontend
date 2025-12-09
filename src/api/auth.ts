import { httpClient } from './httpClient';
import { ENDPOINTS } from '../config/constants';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  ModeratorRequest,
  ModeratorRequestResponse
} from '../types/user';

export const authApi = {
  register: (data: RegisterRequest): Promise<RegisterResponse> => {
    return httpClient.post<RegisterResponse>(ENDPOINTS.AUTH.REGISTER, data);
  },

  login: (data: LoginRequest): Promise<LoginResponse> => {
    return httpClient.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, data);
  },

  logout: (data: LogoutRequest): Promise<LogoutResponse> => {
    return httpClient.post<LogoutResponse>(ENDPOINTS.AUTH.LOGOUT, data);
  },

  requestModerator: (data: ModeratorRequest): Promise<ModeratorRequestResponse> => {
    return httpClient.post<ModeratorRequestResponse>(ENDPOINTS.AUTH.MODERATOR_REQUEST, data);
  }
};