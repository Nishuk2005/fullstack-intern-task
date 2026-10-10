import axios from 'axios';

export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
export const TOKEN_KEY = 'template_store_token';

const http = axios.create({ baseURL: `${API_URL}/api` });

let onUnauthorized = () => {};
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadToken = Boolean(error.config?.headers?.Authorization);
    if (error.response?.status === 401 && hadToken) onUnauthorized();
    return Promise.reject(error);
  }
);

export function errorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error.response) return 'Could not reach the server. Check your connection and try again.';
  return error.response.data?.message || fallback;
}

export function fieldErrors(error) {
  return error.response?.data?.errors || {};
}

export function assetUrl(path) {
  if (!path) return '';
  return /^https?:\/\//.test(path) ? path : `${API_URL}${path}`;
}

export default http;
