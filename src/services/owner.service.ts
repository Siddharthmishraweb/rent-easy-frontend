import api from './api';

// Types
interface Owner {
  id: string;
  userId: string;
  properties: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  documents: string[];
  rating: number;
  totalRatings: number;
}

// API functions
export const ownerService = {
  create: (ownerData: FormData) => api.post('/api/owners', ownerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  getById: (ownerId: string) => api.get(`/api/owners/${ownerId}`),

  update: (ownerId: string, ownerData: FormData) => 
    api.put(`/api/owners/${ownerId}`, ownerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  verify: (ownerId: string) => api.post(`/api/owners/${ownerId}/verify`),

  reject: (ownerId: string, reason: string) => 
    api.post(`/api/owners/${ownerId}/reject`, { reason }),

  addDocument: (ownerId: string, document: FormData) => 
    api.post(`/api/owners/${ownerId}/documents`, document, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  removeDocument: (ownerId: string, documentId: string) => 
    api.delete(`/api/owners/${ownerId}/documents/${documentId}`),

  getProperties: (ownerId: string) => api.get(`/api/owners/${ownerId}/properties`),

  getRatings: (ownerId: string) => api.get(`/api/owners/${ownerId}/ratings`),
};