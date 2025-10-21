import api from './api';

// Types
interface TenantRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  status: 'pending' | 'accepted' | 'rejected';
  documentIds: string[];
  message?: string;
}

// API functions
export const requestService = {
  create: (request: Omit<TenantRequest, 'id' | 'status'>) => 
    api.post('/api/requests', request),

  acceptRequest: (requestId: string) => 
    api.post(`/api/requests/${requestId}/accept`),

  verifyDocument: (requestId: string, documentId: string) => 
    api.post(`/api/requests/${requestId}/verify-document`, { documentId }),

  rejectRequest: (requestId: string, reason: string) => 
    api.post(`/api/requests/${requestId}/reject`, { reason }),
};