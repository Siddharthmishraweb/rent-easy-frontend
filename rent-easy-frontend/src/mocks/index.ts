export * from './metadata';
export * from './properties';
export * from './agreements';
export * from './payments';
export * from './notifications';

// Mock Dashboard Stats
export const mockDashboardStats = {
  owner: {
    totalProperties: 3,
    occupiedProperties: 1,
    vacantProperties: 2,
    totalRentCollected: 35000,
    pendingPayments: 35000,
    recentAgreements: 2,
    maintenanceRequests: 2
  },
  tenant: {
    currentProperty: 1,
    rentPaid: 35000,
    upcomingPayment: 35000,
    agreementEndDate: '2024-10-31',
    maintenanceRequests: 2,
    documents: 3
  },
  admin: {
    totalUsers: 5,
    totalProperties: 3,
    activeAgreements: 1,
    monthlyRevenue: 35000,
    newRegistrations: 2,
    pendingApprovals: 1
  }
};

// Mock Chat Messages
export const mockChatMessages = [
  {
    _id: 'msg1',
    sender: 'tenant-123',
    receiver: 'owner-123',
    message: 'Hi, I\'m interested in your property in Whitefield.',
    timestamp: '2023-10-15T10:30:00.000Z',
    isRead: true
  },
  {
    _id: 'msg2',
    sender: 'owner-123',
    receiver: 'tenant-123',
    message: 'Sure! When would you like to schedule a visit?',
    timestamp: '2023-10-15T11:00:00.000Z',
    isRead: true
  },
  {
    _id: 'msg3',
    sender: 'tenant-123',
    receiver: 'owner-123',
    message: 'Can we schedule it for tomorrow at 11 AM?',
    timestamp: '2023-10-15T11:05:00.000Z',
    isRead: false
  }
];

// Mock Schedule
export const mockSchedule = [
  {
    _id: 'sch1',
    title: 'Property Visit',
    property: 'prop1',
    tenant: 'tenant-123',
    owner: 'owner-123',
    datetime: '2023-10-16T11:00:00.000Z',
    status: 'confirmed',
    type: 'visit'
  },
  {
    _id: 'sch2',
    title: 'Agreement Signing',
    property: 'prop2',
    tenant: 'tenant-456',
    owner: 'owner-123',
    datetime: '2023-10-20T15:00:00.000Z',
    status: 'pending',
    type: 'agreement'
  }
];

// Mock Documents
export const mockDocuments = [
  {
    _id: 'doc1',
    title: 'Rental Agreement',
    type: 'agreement',
    file: {
      url: 'https://example.com/agreement1.pdf',
      name: 'rental_agreement_prop1.pdf',
      size: 2500000,
      type: 'application/pdf'
    },
    property: 'prop1',
    tenant: 'tenant-123',
    owner: 'owner-123',
    uploadedAt: '2023-10-15T10:00:00.000Z',
    status: 'active'
  },
  {
    _id: 'doc2',
    title: 'Tenant ID Proof',
    type: 'identity',
    file: {
      url: 'https://example.com/id_proof.pdf',
      name: 'aadhar_card.pdf',
      size: 1500000,
      type: 'application/pdf'
    },
    tenant: 'tenant-123',
    uploadedAt: '2023-10-14T16:30:00.000Z',
    status: 'verified'
  }
];

// Mock Support Tickets
export const mockSupportTickets = [
  {
    _id: 'ticket1',
    subject: 'Payment Issue',
    description: 'Unable to make rent payment through the portal',
    user: 'tenant-123',
    status: 'open',
    priority: 'high',
    category: 'payment',
    createdAt: '2023-11-05T09:30:00.000Z',
    updatedAt: '2023-11-05T09:30:00.000Z'
  },
  {
    _id: 'ticket2',
    subject: 'Document Verification',
    description: 'Need help with document verification process',
    user: 'owner-123',
    status: 'in_progress',
    priority: 'medium',
    category: 'documentation',
    assignedTo: 'admin-123',
    createdAt: '2023-11-04T14:15:00.000Z',
    updatedAt: '2023-11-05T10:00:00.000Z'
  }
];