import api from './api';
import { UserDto } from '../dto/userDto';

const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password }, { withCredentials: true });
    const user = response.data.user;
    return new UserDto(user.userId, user.username, user.email, user.createdAt);
  },

  register: async (username, password, email) => {
    const response = await api.post('/auth/register', { username, password, email }, { withCredentials: true });
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout', {}, { withCredentials: true });
    console.log('Logged out and session cleared');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me', { withCredentials: true });
    console.log("auth",response)
    const user = response.data.user;
    return user;
  }
};

export default authService;
