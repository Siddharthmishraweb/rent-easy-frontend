import { API_CONFIG } from '@/config/api.config';
import { api } from './api';
import { mockSimilarPropertiesResponse } from '@/mocks/similarProperties';

export const similarPropertiesService = {
  getSimilarProperties: async (propertyId: string) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockSimilarPropertiesResponse;
    }
    
    const response = await api.post(API_CONFIG.ENDPOINTS.PROPERTY.GET_SIMILAR_BY_ID, {
      propertyId
    });
    return response.data;
  },
};