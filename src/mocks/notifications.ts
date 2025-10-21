export const mockNotifications = [
  {
    _id: 'notif1',
    user: 'tenant-123',
    title: 'Rent Due Reminder',
    message: 'Your rent payment of ₹35,000 for December 2023 is due in 3 days.',
    type: 'payment_reminder',
    isRead: false,
    actionUrl: '/payments',
    createdAt: '2023-12-02T10:00:00.000Z'
  },
  {
    _id: 'notif2',
    user: 'owner-123',
    title: 'New Rental Request',
    message: 'A new rental request has been received for your property in Koramangala.',
    type: 'rental_request',
    isRead: true,
    actionUrl: '/agreements',
    createdAt: '2023-11-25T15:30:00.000Z'
  },
  {
    _id: 'notif3',
    user: 'tenant-123',
    title: 'Payment Successful',
    message: 'Your rent payment of ₹35,000 for November 2023 has been successfully processed.',
    type: 'payment_success',
    isRead: true,
    actionUrl: '/payments',
    createdAt: '2023-11-03T15:30:00.000Z'
  },
  {
    _id: 'notif4',
    user: 'owner-123',
    title: 'Agreement Expiring Soon',
    message: 'Your rental agreement with Tenant User will expire in 30 days.',
    type: 'agreement_expiry',
    isRead: false,
    actionUrl: '/agreements',
    createdAt: '2023-10-20T09:15:00.000Z'
  }
];

export const mockMaintenanceRequests = [
  {
    _id: 'maint1',
    property: 'prop1',
    tenant: {
      _id: 'tenant-123',
      name: 'Tenant User',
      email: 'tenant@renteasy.com'
    },
    owner: {
      _id: 'owner-123',
      name: 'Property Owner',
      email: 'owner@renteasy.com'
    },
    title: 'Plumbing Issue',
    description: 'Water leakage in kitchen sink',
    priority: 'high',
    status: 'pending',
    images: ['https://example.com/issue1-img1.jpg'],
    category: 'plumbing',
    createdAt: '2023-11-10T08:00:00.000Z',
    updatedAt: '2023-11-10T08:00:00.000Z'
  },
  {
    _id: 'maint2',
    property: 'prop1',
    tenant: {
      _id: 'tenant-123',
      name: 'Tenant User',
      email: 'tenant@renteasy.com'
    },
    owner: {
      _id: 'owner-123',
      name: 'Property Owner',
      email: 'owner@renteasy.com'
    },
    title: 'Electrical Issue',
    description: 'Power fluctuation in bedroom',
    priority: 'medium',
    status: 'in_progress',
    category: 'electrical',
    assignedTo: {
      name: 'John Electrician',
      phone: '+919876543215'
    },
    createdAt: '2023-11-08T14:30:00.000Z',
    updatedAt: '2023-11-09T10:00:00.000Z'
  }
];

export const mockReviews = [
  {
    _id: 'rev1',
    property: 'prop1',
    tenant: {
      _id: 'tenant-123',
      name: 'Tenant User'
    },
    rating: 4.5,
    review: 'Great property with excellent amenities. Owner is very cooperative.',
    createdAt: '2023-10-15T16:45:00.000Z'
  },
  {
    _id: 'rev2',
    property: 'prop2',
    tenant: {
      _id: 'tenant-456',
      name: 'Another Tenant'
    },
    rating: 4,
    review: 'Good location and well-maintained property. Minor issues with parking.',
    createdAt: '2023-10-10T11:20:00.000Z'
  }
];