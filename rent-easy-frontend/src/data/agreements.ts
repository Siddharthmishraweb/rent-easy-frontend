export const SAMPLE_AGREEMENTS = [
  {
    _id: 'a1',
    property: {
      _id: '1',
      title: 'Luxury Apartment in City Center',
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
      address: {
        city: 'Mumbai',
        state: 'Maharashtra',
      },
    },
    tenant: {
      _id: 't1',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'TENANT',
    },
    owner: {
      _id: 'o1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'OWNER',
    },
    startDate: '2025-01-01',
    endDate: '2026-01-01',
    rentAmount: 25000,
    securityDeposit: 50000,
    terms: [
      'Rent due by 5th of every month',
      'No subletting allowed',
      'Pets allowed with additional deposit',
    ],
    status: 'ACTIVE',
    signatures: {
      owner: 'signed',
      tenant: 'signed',
    },
  },
];