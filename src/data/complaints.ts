export const SAMPLE_COMPLAINTS = [
  {
    _id: 'c1',
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
    description: 'Water leakage in bathroom',
    status: 'OPEN',
    priority: 'HIGH',
    images: ['https://example.com/leak.jpg'],
    createdAt: '2025-10-15T10:00:00Z',
    updatedAt: '2025-10-15T10:00:00Z',
  },
  {
    _id: 'c2',
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
    description: 'AC not working properly',
    status: 'RESOLVED',
    priority: 'MEDIUM',
    images: [],
    createdAt: '2025-09-20T14:30:00Z',
    updatedAt: '2025-09-22T11:15:00Z',
    resolution: 'AC serviced and working properly now',
  },
];