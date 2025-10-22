import { useState } from 'react';
import { requestService } from '@/services/request.service';

export interface TenantRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  status: 'pending' | 'accepted' | 'rejected';
  documentIds: string[];
  message?: string;
  property?: {
    id: string;
    name: string;
    image: string;
    address: string;
    rent: number;
  };
  tenant?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
  };
}

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRequest = async (data: Omit<TenantRequest, 'id' | 'status'>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await requestService.create(data);
      return response.data;
    } catch (err) {
      setError('Failed to create request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (requestId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await requestService.acceptRequest(requestId);
      return response.data;
    } catch (err) {
      setError('Failed to accept request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyDocument = async (requestId: string, documentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await requestService.verifyDocument(requestId, documentId);
      return response.data;
    } catch (err) {
      setError('Failed to verify document');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (requestId: string, reason: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await requestService.rejectRequest(requestId, reason);
      return response.data;
    } catch (err) {
      setError('Failed to reject request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createRequest,
    acceptRequest,
    verifyDocument,
    rejectRequest
  };
};