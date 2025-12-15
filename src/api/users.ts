import { httpClient } from './httpClient';
import type { User } from '../types/user';

export interface ModeratorRequestResponse {
  success: boolean;
  request?: {
    id: number;
    status: string;
    created_at: string;
    message?: string;
  };
  error?: string;
  message?: string;
}

export const usersApi = {
  async getCurrentUser(): Promise<User> {    
    const response = await httpClient.get<any>('/auth/me/');    
    
    if (response.user) {      
      return response.user;
    } else if (response.data) {
      return response.data;
    } else if (response.id) {      
      return response;
    } else {      
      throw new Error('Неизвестная структура ответа API');
    }
  },
  
  async updateProfile(data: { username?: string; avatarUrl?: string }): Promise<User> {
    return httpClient.patch<User>('/auth/me/', data);
  },
  
  async requestModerator(message?: string): Promise<ModeratorRequestResponse> {
    return httpClient.post<ModeratorRequestResponse>('/auth/moderator-request/', { message });
  },
  
  async getModeratorRequestStatus(): Promise<ModeratorRequestResponse | null> {
    try {
      return await httpClient.get<ModeratorRequestResponse>('/auth/moderator-request/');
    } catch (error) {
      return null;
    }
  },
};