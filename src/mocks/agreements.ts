export const mockAgreements = [
  {
    _id: 'agr1',
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
    startDate: '2023-11-01',
    endDate: '2024-10-31',
    rent: 35000,
    securityDeposit: 100000,
    status: 'active',
    documents: [
      {
        url: 'https://example.com/agreement1.pdf',
        name: 'Rental Agreement',
        type: 'application/pdf'
      }
    ],
    terms: [
      'Rent to be paid by 5th of every month',
      'Security deposit will be refunded after property inspection',
      'Two months notice period required for vacating'
    ],
    createdAt: '2023-10-15T10:00:00.000Z',
    updatedAt: '2023-10-15T10:00:00.000Z'
  },
  {
    _id: 'agr2',
    property: 'prop2',
    tenant: {
      _id: 'tenant-456',
      name: 'Another Tenant',
      email: 'another.tenant@renteasy.com',
      phone: '+919876543214'
    },
    owner: {
      _id: 'owner-123',
      name: 'Property Owner',
      email: 'owner@renteasy.com',
      phone: '+919876543211'
    },
    startDate: '2023-11-15',
    endDate: '2024-11-14',
    rent: 28000,
    securityDeposit: 84000,
    status: 'pending',
    documents: [
      {
        url: 'https://example.com/agreement2.pdf',
        name: 'Rental Agreement',
        type: 'application/pdf'
      }
    ],
    terms: [
      'Monthly maintenance charges extra',
      'No subletting allowed',
      'Property to be maintained in good condition'
    ],
    createdAt: '2023-10-16T14:30:00.000Z',
    updatedAt: '2023-10-16T14:30:00.000Z'
  }
];