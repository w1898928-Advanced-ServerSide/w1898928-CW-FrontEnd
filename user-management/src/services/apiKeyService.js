import api from './api';

const apiKeyService = {
  createApiKey: async (userId, expiresInDays = 30) => {
    const response = await api.post('/apiKey', { userId, expiresInDays });
    localStorage.setItem('apiKey', response.data.data.apiKey);
    return response.data;
  },

  getApiKeys: async (userId) => {
    const response = await api.get(`/apiKey?userId=${userId}`);
    return response.data;
  },

  revokeApiKey: async (apiId) => {
    const response = await api.patch(`/apiKey/${apiId}/revoke`);
    return response.data;
  },

  deleteApiKey: async (apiId) => {
    const response = await api.delete(`/apiKey/${apiId}`);
    return response.data;
  }
};

export default apiKeyService;