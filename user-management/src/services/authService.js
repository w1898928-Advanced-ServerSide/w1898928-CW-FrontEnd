import api from './api';
import { UserDto } from '../dto/userDto';

const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    return new UserDto(
      response.data.user.id,
      response.data.user.username,
      response.data.user.email,
      response.data.user.createdAt
    );
  },

  register: async (username, password, email) => {
    const response = await api.post('/auth/register', { username, password, email });
    return new UserDto(response.data.id, response.data.username, response.data.email);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('apiKey');
  }
};

export default authService;