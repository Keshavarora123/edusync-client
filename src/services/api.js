import axios from 'axios';

// Create axios instance with base URL from environment variables
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5109/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method.toUpperCase(),
      url: config.baseURL + config.url,
      headers: config.headers,
      data: config.data
    });
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    const errorInfo = {
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        headers: error.config?.headers
      },
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    };
    
    console.error('API Error:', JSON.stringify(errorInfo, null, 2));
    
    if (error.response?.status === 401) {
      console.log('Unauthorized access - redirecting to login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
