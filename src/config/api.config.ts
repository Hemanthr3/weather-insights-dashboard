import axios from 'axios';

export const API_CONFIG = {
  BASE_URL: 'https://archive-api.open-meteo.com/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const weatherApiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
weatherApiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
weatherApiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
