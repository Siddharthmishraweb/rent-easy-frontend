import { Agreement, Payment, Property, User } from '@/types';

export const mockUsers: User[] = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'owner',
    avatar: 'https://example.com/avatar1.jpg'
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'tenant',
    avatar: 'https://example.com/avatar2.jpg'
  }
];

export const mockProperties: Property[] = [
  {
    _id: '1',
    name: 'Luxury Apartment',
    description: 'A beautiful 2BHK apartment with modern amenities',
    address: '123 Main St, Bangalore',
    type: 'apartment',
    rent: 25000,
    securityDeposit: 50000,
    features: ['AC', 'Parking', 'Security'],
    images: ['https://example.com/image1.jpg'],
    owner: mockUsers[0],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Cozy House',
    description: '3BHK independent house with garden',
    address: '456 Park Ave, Bangalore',
    type: 'house',
    rent: 35000,
    securityDeposit: 70000,
    features: ['Garden', 'Parking', 'Security'],
    images: ['https://example.com/image2.jpg'],
    owner: mockUsers[0],
    status: 'rented',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockAgreements: Agreement[] = [
  {
    _id: '1',
    property: mockProperties[0],
    tenant: mockUsers[1],
    owner: mockUsers[0],
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    rent: 25000,
    securityDeposit: 50000,
    status: 'active',
    documents: [
      {
        url: 'https://example.com/agreement1.pdf',
        name: 'Rental Agreement',
        type: 'application/pdf'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockPayments: Payment[] = [
  {
    _id: '1',
    agreement: mockAgreements[0],
    property: mockProperties[0],
    tenant: mockUsers[1],
    owner: mockUsers[0],
    amount: 25000,
    type: 'rent',
    date: new Date().toISOString(),
    status: 'paid',
    transactionId: 'txn_123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockDashboardStats = {
  totalProperties: 2,
  activeAgreements: 1,
  pendingPayments: 0,
  totalRevenue: 25000
};