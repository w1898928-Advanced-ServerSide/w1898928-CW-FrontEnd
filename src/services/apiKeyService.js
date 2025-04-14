import api from './api';

const apiKeyService = {
  
  //Creates a new API key for the user
  createApiKey: async (userId, expiresInDays = 30) => {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const response = await api.post('/apiKey', 
        { userId, expiresInDays },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!response.data?.data?.apiKey) {
        throw new Error('Invalid API key response format');
      }

      localStorage.setItem('apiKey', response.data.data.apiKey);
      return response.data;
    } catch (error) {
      console.error('API key creation failed:', error);
      throw new Error(error.response?.data?.message || 'Failed to create API key');
    }
  },

  //Gets all API keys for a user
  getApiKeys: async (userId) => {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const response = await api.get(`/apiKey?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
      throw new Error(error.response?.data?.message || 'Failed to get API keys');
    }
  },

  //Revokes an API key
  revokeApiKey: async (apiId) => {
    try {
      if (!apiId) {
        throw new Error('API key ID is required');
      }

      const response = await api.patch(
        `/apiKey/${apiId}/revoke`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to revoke API key:', error);
      throw new Error(error.response?.data?.message || 'Failed to revoke API key');
    }
  },
  
  //Deletes an API key
  deleteApiKey: async (apiId) => {
    try {
      if (!apiId) {
        throw new Error('API key ID is required');
      }

      const response = await api.delete(`/apiKey/${apiId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to delete API key:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete API key');
    }
  }
};

export default apiKeyService;