export const mockUsers = [
  {
    id: '1',
    name: 'Owner 1',
    email: 'owner@example.com',
    role: 'owner',
    profileUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    phone: '9519246205',
    kycVerified: true,
    address: {
      state: 'Maharashtra',
      city: 'Nagpur',
      pincode: '440002',
      fullAddress: 'House number 211, Nagpur'
    }
  },
  {
    id: '2',
    name: 'Tenant 1',
    email: 'tenant@example.com',
    role: 'tenant',
    profileUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    phone: '9876543210',
    kycVerified: true,
    address: {
      state: 'Maharashtra',
      city: 'Mumbai',
      pincode: '400001',
      fullAddress: 'Flat 404, Sunshine Apartments'
    }
  }
];