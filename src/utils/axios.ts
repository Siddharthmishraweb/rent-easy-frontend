import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types/api';

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, { message: string }>;
  status: number;
}
import { toast } from 'react-hot-toast';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log('📦 [Request Data]:', config.data);
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ [API] ${response.config.method?.toUpperCase()} ${response.config.url}`);
      console.log('📦 [Response Data]:', response.data);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // If the token is invalid or expired
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken && originalRequest) {
        try {
          // Try to get a new token using refresh token
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { token } = response.data;
          localStorage.setItem('token', token);

          // Retry the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh token is also invalid, clear storage and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/login';
        }
      } else {
        // No refresh token available, redirect to login
        window.location.href = '/auth/login';
      }
    }

    // Handle network errors
    if (!error.response) {
      toast.error('Network Error. Please check your internet connection.');
      return Promise.reject(error);
    }

    // Handle specific error status codes
    const errorResponse = error.response?.data as ApiErrorResponse;
    
    switch (error.response?.status) {
      case 400:
        toast.error(errorResponse?.message || 'Bad Request');
        break;
      case 403:
        toast.error('You do not have permission to perform this action');
        break;
      case 404:
        toast.error('The requested resource was not found');
        break;
      case 422:
        // Validation errors
        if (errorResponse?.errors) {
          Object.values(errorResponse.errors).forEach((error) => {
            toast.error(error.message);
          });
        } else {
          toast.error('Validation Error');
        }
        break;
      case 429:
        toast.error('Too many requests. Please try again later.');
        break;
      case 500:
        toast.error('Internal Server Error. Please try again later.');
        break;
      default:
        toast.error(
          errorResponse?.message || 'Something went wrong. Please try again.'
        );
    }

    return Promise.reject(error);
  }
);

export default api;
