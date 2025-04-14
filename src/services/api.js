import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for API key
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (apiKey && !token) {
    config.headers['Authorization'] = apiKey;
  }
  
  return config;
});

export default api;