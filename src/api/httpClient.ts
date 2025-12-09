import { API_CONFIG } from '../config/constants';

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_CONFIG.BASE_URL;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    });
    
    const token = localStorage.getItem('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    console.log('🔗 Запрос к:', url);
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log('📊 Статус:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Ошибка:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Успешно!');
    return data;
  }

  get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url = `${url}?${searchParams}`;
    }
    return this.request<T>(url, { method: 'GET' });
  }

  post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const httpClient = new HttpClient();