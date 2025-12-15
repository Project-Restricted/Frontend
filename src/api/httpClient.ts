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
    
    const needsAuth = this.isProtectedEndpoint(endpoint);    

    if (needsAuth) {
      const token = localStorage.getItem('access_token');      
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);        
      }
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
    });    
    
    const responseText = await response.text();
    let parsedData;
    
    try {
      parsedData = JSON.parse(responseText);
    } catch (e) {
      parsedData = responseText;
    }
    
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${responseText}`);
      (error as any).status = response.status;
      (error as any).data = parsedData;
      (error as any).responseText = responseText;
      throw error;
    }

    return parsedData;
  }

  private isProtectedEndpoint(endpoint: string): boolean {
    const protectedEndpoints = [
      '/movies/posts/',
      '/auth/logout/',
      '/auth/moderator-request/',
      '/auth/me/',
    ];
    
    const needsAuth = protectedEndpoints.some(protectedEndpoint => 
      endpoint.startsWith(protectedEndpoint)
    );
    
    return needsAuth;
  }

  get<T>(endpoint: string, params?: Record<string, string | string[]>): Promise<T> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => {
            if (item !== undefined && item !== null && item !== '') {
              searchParams.append(key, item.toString());
            }
          });
        } else if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString());
        }
      });
      
      const queryString = searchParams.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }
    
    return this.request<T>(url, { method: 'GET' });
  }

  post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const httpClient = new HttpClient();