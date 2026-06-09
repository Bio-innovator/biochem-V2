// API 请求封装，自动添加认证头

const API_BASE = '';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export async function apiFetch(path: string, options: FetchOptions = {}) {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  const url = new URL(path, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }

  // Headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = data?.error || `HTTP ${response.status}`;
    throw new Error(error);
  }

  return data;
}

// Convenience methods
export const api = {
  get: (path: string, params?: Record<string, string>) =>
    apiFetch(path, { method: 'GET', params }),

  post: (path: string, body: any) =>
    apiFetch(path, { method: 'POST', body: JSON.stringify(body) }),

  patch: (path: string, body: any) =>
    apiFetch(path, { method: 'PATCH', body: JSON.stringify(body) }),

  delete: (path: string) =>
    apiFetch(path, { method: 'DELETE' }),
};
