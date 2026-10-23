import { ApiResponse } from '../types';

const CONFIGURED_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1').replace(/\/+$/, '');

class ApiClient {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('postrichly_token') || localStorage.getItem('postrichment_token');
  }

  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const isLocalhost =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      if (isLocalhost) {
        return process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api/v1';
      }

      // In production browser (e.g. deployed on Vercel):
      const configured = process.env.NEXT_PUBLIC_API_URL;
      if (configured && !configured.includes('localhost') && !configured.includes('127.0.0.1')) {
        return configured.replace(/\/+$/, '');
      }

      // Default to relative same-origin route so Next.js rewrites proxy to backendUrl safely
      return '/api/v1';
    }
    return CONFIGURED_API_URL;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const primaryBase = this.getBaseUrl();
    const primaryUrl = primaryBase === '/api/v1' ? `/api/v1${cleanEndpoint}` : `${primaryBase}${cleanEndpoint}`;
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

      const contentType = response.headers.get('content-type') || '';
      let json: ApiResponse<T> | null = null;

      if (contentType.includes('application/json')) {
        try {
          json = await response.json();
        } catch (parseErr: any) {
          throw new Error(`Invalid JSON response from server: ${parseErr.message}`);
        }
      } else {
        const text = await response.text();
        if (!response.ok) {
          throw new Error(
            response.status === 500
              ? `Backend service error (500): Could not communicate with server at ${primaryUrl}. Verify your backend service is running.`
              : `HTTP ${response.status} from ${primaryUrl}: ${text.slice(0, 150) || response.statusText}`
          );
        }
        throw new Error(`Expected JSON from ${primaryUrl}, received non-JSON: ${text.slice(0, 100)}`);
      }

      if (!json || !response.ok || !json.success) {
        const errorMsg = json?.error?.message || `Request failed with status ${response.status}`;
        throw new Error(errorMsg);
      }

      return json.data as T;
    } catch (error: any) {
      // In-browser resilience fallback:
      // If primary request failed (e.g., cross-origin Failed to fetch, network timeout, or connection refused),
      // retry once via the alternate route (proxy vs direct)
      if (typeof window !== 'undefined') {
        const isLocalhost =
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1';

        const fallbackUrl = primaryUrl.startsWith('http')
          ? `/api/v1${cleanEndpoint}`
          : (isLocalhost ? `http://127.0.0.1:4000/api/v1${cleanEndpoint}` : null);

        if (fallbackUrl && fallbackUrl !== primaryUrl) {
          try {
            console.warn(`[apiClient] Initial request to ${primaryUrl} failed (${error.message}). Retrying via ${fallbackUrl}...`);
            const fallbackResponse = await fetch(fallbackUrl, {
              ...options,
              headers,
            });

            const fallbackContentType = fallbackResponse.headers.get('content-type') || '';
            let fallbackJson: ApiResponse<T> | null = null;

            if (fallbackContentType.includes('application/json')) {
              try {
                fallbackJson = await fallbackResponse.json();
              } catch (fallbackParseErr: any) {
                throw new Error(`Invalid JSON from ${fallbackUrl}: ${fallbackParseErr.message}`);
              }
            } else {
              const fallbackText = await fallbackResponse.text();
              throw new Error(
                fallbackResponse.status === 500
                  ? `Proxy error (500) via ${fallbackUrl}: Backend server unreachable. Check BACKEND_URL or local server status.`
                  : `HTTP ${fallbackResponse.status} via ${fallbackUrl}: ${fallbackText.slice(0, 150) || fallbackResponse.statusText}`
              );
            }

            if (!fallbackJson || !fallbackResponse.ok || !fallbackJson.success) {
              const errorMsg = fallbackJson?.error?.message || `Request failed with status ${fallbackResponse.status}`;
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
