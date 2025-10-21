import api from './api';

// Types
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  landmark?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// API functions
export const addressService = {
  create: (address: Address) => api.post('/api/addresses', address),
  update: (id: string, address: Address) => api.put(`/api/addresses/${id}`, address),
  getUserAddresses: (userId: string) => api.get(`/api/addresses/user/${userId}`),
};