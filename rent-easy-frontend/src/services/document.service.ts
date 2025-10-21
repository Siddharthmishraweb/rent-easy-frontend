import api from './api';

// Types
interface Document {
  userId: string;
  type: string;
  fileUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedAt?: Date;
  verifiedBy?: string;
}

interface DocumentFilter {
  userId?: string;
  type?: string;
  status?: string;
}

// API functions
export const documentService = {
  create: (document: FormData) => api.post('/api/documents', document, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getAll: (filters: DocumentFilter) => api.get('/api/documents', { params: filters }),
  getUserDocuments: (userId: string) => api.get(`/api/documents/user/${userId}`),
};