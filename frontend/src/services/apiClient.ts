import { ApiResponse } from '../types';

const CONFIGURED_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1').replace(/\/+$/, '');

class ApiClient {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('postrichly_token') || localStorage.getItem('postrichment_token');
  }

  private getBaseUrl(): string {
    // In client browser, prefer the same-origin Next.js proxy route ('/api/v1') for localhost development
    // to eliminate browser CORS preflight issues, IPv6 (::1) mismatches, and port-blocking extensions.
    if (typeof window !== 'undefined') {
      const isLocalhost =
        !process.env.NEXT_PUBLIC_API_URL ||
        CONFIGURED_API_URL.includes('localhost') ||
        CONFIGURED_API_URL.includes('127.0.0.1');

      if (isLocalhost) {
        return '/api/v1';
      }
    }
    return CONFIGURED_API_URL;
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
      const response = await fetch(primaryUrl, {
        ...options,
        headers,
      });

      const json: ApiResponse<T> = await response.json();

      if (!response.ok || !json.success) {
        const errorMsg = json.error?.message || `Request failed with status ${response.status}`;
        throw new Error(errorMsg);
      }

      return json.data as T;
    } catch (error: any) {
      // In-browser resilience fallback:
      // If primary request failed (e.g., cross-origin Failed to fetch, network timeout, or connection refused),
      // retry once via the alternate route (proxy vs direct)
      if (typeof window !== 'undefined') {
        const fallbackUrl = primaryUrl.startsWith('http')
          ? `/api/v1${cleanEndpoint}`
          : `${CONFIGURED_API_URL}${cleanEndpoint}`;

        if (fallbackUrl !== primaryUrl) {
          try {
            console.warn(`[apiClient] Initial request to ${primaryUrl} failed (${error.message}). Retrying via ${fallbackUrl}...`);
            const fallbackResponse = await fetch(fallbackUrl, {
              ...options,
              headers,
            });

            const fallbackJson: ApiResponse<T> = await fallbackResponse.json();

            if (!fallbackResponse.ok || !fallbackJson.success) {
              const errorMsg = fallbackJson.error?.message || `Request failed with status ${fallbackResponse.status}`;
              throw new Error(errorMsg);
            }

            return fallbackJson.data as T;
          } catch (fallbackError: any) {
            console.error(`API Error [${endpoint}]:`, fallbackError.message || error.message);
            throw fallbackError;
          }
        }
      }

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

  put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
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
