import api from './api';
import { ApiKeyDto } from '../dto/apiKeyDto';

const apiKeyService = {
  createApiKey: async (userId, expiresInDays = 30) => {
    const response = await api.post(
      '/apiKey',
      { userId, expiresInDays },
      { withCredentials: true }
    );

    if (!response.data?.data?.apiKey) {
      throw new Error('Invalid API key response format');
    }

    return new ApiKeyDto(response.data.data);
  },

  getApiKeys: async (userId) => {
    const response = await api.get(`/apiKey?userId=${userId}`, {
      withCredentials: true,
    });

    const rawList = response.data?.data || [];
    return rawList.map((item) => new ApiKeyDto(item));
  },

  revokeApiKey: async (apiId) => {
    const response = await api.patch(
      `/apiKey/${apiId}/revoke`,
      {},
      { withCredentials: true }
    );
    return response.data;
  },

  deleteApiKey: async (apiId) => {
    const response = await api.delete(`/apiKey/${apiId}`, {
      withCredentials: true,
    });
    return response.data;
  },
};

export default apiKeyService;
