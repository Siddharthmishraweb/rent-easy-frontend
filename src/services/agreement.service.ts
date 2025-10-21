import api from '../utils/axios';
import { RentalAgreement } from '../types/api';

export const agreementService = {
  async createAgreement(data: {
    propertyId: string;
    tenantId: string;
    startDate: string;
    endDate: string;
    rentAmount: number;
    securityDeposit: number;
    terms: string[];
  }): Promise<RentalAgreement> {
    const response = await api.post<RentalAgreement>('/agreements', data);
    return response.data;
  },

  async getAgreement(id: string): Promise<RentalAgreement> {
    const response = await api.get<RentalAgreement>(`/agreements/${id}`);
    return response.data;
  },

  async signAgreement(id: string, signature: string): Promise<RentalAgreement> {
    const response = await api.post<RentalAgreement>(`/agreements/${id}/sign`, { signature });
    return response.data;
  },

  async getUserAgreements(): Promise<RentalAgreement[]> {
    const response = await api.get<RentalAgreement[]>('/agreements/user');
    return response.data;
  },

  async terminateAgreement(id: string, reason: string): Promise<RentalAgreement> {
    const response = await api.post<RentalAgreement>(`/agreements/${id}/terminate`, { reason });
    return response.data;
  },
};