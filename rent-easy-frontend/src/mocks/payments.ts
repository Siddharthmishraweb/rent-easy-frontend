export const mockPayments = [
  {
    _id: 'pay1',
    agreement: 'agr1',
    property: 'prop1',
    tenant: {
      _id: 'tenant-123',
      name: 'Tenant User',
      email: 'tenant@renteasy.com',
      phone: '+919876543212'
    },
    owner: {
      _id: 'owner-123',
      name: 'Property Owner',
      email: 'owner@renteasy.com',
      phone: '+919876543211'
    },
    amount: 35000,
    type: 'rent',
    month: '2023-11',
    dueDate: '2023-11-05',
    paymentDate: '2023-11-03',
    status: 'paid',
    paymentMethod: 'razorpay',
    transactionId: 'rzp_123456789',
    invoice: {
      url: 'https://example.com/invoice1.pdf',
      number: 'INV-2023-11-001'
    },
    createdAt: '2023-11-03T15:30:00.000Z',
    updatedAt: '2023-11-03T15:30:00.000Z'
  },
  {
    _id: 'pay2',
    agreement: 'agr1',
    property: 'prop1',
    tenant: {
      _id: 'tenant-123',
      name: 'Tenant User',
      email: 'tenant@renteasy.com',
      phone: '+919876543212'
    },
    owner: {
      _id: 'owner-123',
      name: 'Property Owner',
      email: 'owner@renteasy.com',
      phone: '+919876543211'
    },
    amount: 35000,
    type: 'rent',
    month: '2023-12',
    dueDate: '2023-12-05',
    status: 'pending',
    createdAt: '2023-12-01T00:00:00.000Z',
    updatedAt: '2023-12-01T00:00:00.000Z'
  },
  {
    _id: 'pay3',
    agreement: 'agr1',
    property: 'prop1',
    tenant: {
      _id: 'tenant-123',
      name: 'Tenant User',
      email: 'tenant@renteasy.com',
      phone: '+919876543212'
    },
    owner: {
      _id: 'owner-123',
      name: 'Property Owner',
      email: 'owner@renteasy.com',
      phone: '+919876543211'
    },
    amount: 100000,
    type: 'deposit',
    paymentDate: '2023-10-25',
    status: 'paid',
    paymentMethod: 'razorpay',
    transactionId: 'rzp_987654321',
    invoice: {
      url: 'https://example.com/invoice2.pdf',
      number: 'INV-2023-10-001'
    },
    createdAt: '2023-10-25T12:45:00.000Z',
    updatedAt: '2023-10-25T12:45:00.000Z'
  }
];