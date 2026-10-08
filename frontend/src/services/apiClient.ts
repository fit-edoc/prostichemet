import { ApiResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

class ApiClient {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('postrichly_token') || localStorage.getItem('postrichment_token');
  }

  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      // In the browser, use relative /api/v1 (proxied by Next.js rewrites) to prevent cross-origin errors
      return '/api/v1';
    }
    return API_BASE_URL;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const primaryBase = this.getBaseUrl();
    const primaryUrl = `${primaryBase}${cleanEndpoint}`;
    const token = this.getAuthToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      let response: Response;
      try {
        response = await fetch(primaryUrl, {
          ...options,
          headers,
        });
      } catch (networkErr: any) {
        if (typeof window !== 'undefined' && primaryBase === '/api/v1') {
          const fallbackUrl = `http://localhost:4000/api/v1${cleanEndpoint}`;
          console.warn(`Primary proxy request failed (${networkErr.message}). Retrying fallback: ${fallbackUrl}`);
          response = await fetch(fallbackUrl, {
            ...options,
            headers,
          });
        } else {
          throw networkErr;
        }
      }

      const json: ApiResponse<T> = await response.json();

      if (!response.ok || !json.success) {
        const errorMsg = json.error?.message || `Request failed with status ${response.status}`;
        throw new Error(errorMsg);
      }

      return json.data as T;
    } catch (error: any) {
      console.error(`API Error [${endpoint}]:`, error.message);
      throw error;
    }
  }

  get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  patch<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

export const apiClient = new ApiClient();
