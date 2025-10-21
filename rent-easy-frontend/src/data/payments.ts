export const SAMPLE_PAYMENTS = [
  {
    _id: 'p1',
    agreement: {
      _id: 'a1',
      property: {
        title: 'Luxury Apartment in City Center',
      },
      tenant: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
      },
      owner: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    },
    amount: 25000,
    dueDate: '2025-11-05',
    status: 'PENDING',
  },
  {
    _id: 'p2',
    agreement: {
      _id: 'a1',
      property: {
        title: 'Luxury Apartment in City Center',
      },
      tenant: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
      },
      owner: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    },
    amount: 25000,
    dueDate: '2025-10-05',
    status: 'PAID',
    paymentDate: '2025-10-03',
    transactionId: 'pay_123456',
  },
];