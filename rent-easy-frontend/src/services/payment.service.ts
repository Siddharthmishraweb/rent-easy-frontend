import api from '../utils/axios';
import { RentPayment } from '../types/api';

export const paymentService = {
  async createPayment(agreementId: string): Promise<RentPayment> {
    const response = await api.post<RentPayment>(`/payments/create`, { agreementId });
    return response.data;
  },

  async getPaymentDetails(id: string): Promise<RentPayment> {
    const response = await api.get<RentPayment>(`/payments/${id}`);
    return response.data;
  },

  async initiatePayment(paymentId: string): Promise<{
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
  }> {
    const response = await api.post(`/payments/${paymentId}/initiate`);
    return response.data;
  },

  async verifyPayment(paymentId: string, razorpayData: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }): Promise<RentPayment> {
    const response = await api.post<RentPayment>(`/payments/${paymentId}/verify`, razorpayData);
    return response.data;
  },

  async getUserPayments(): Promise<RentPayment[]> {
    const response = await api.get<RentPayment[]>('/payments/user');
    return response.data;
  },
};