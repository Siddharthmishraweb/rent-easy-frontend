export const FLAG_USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === 'true';

export const SAMPLE_USERS = {
  admin: {
    id: "68f7702c68add6afcf53248d",
    name: "Admin User",
    isProfileVerified: true,
    email: "admin@renteasy.com",
    phone: "9519246200",
    role: "admin",
    aadhaarNumber: "211304815323",
    kycVerified: true,
    address: {
      state: "Delhi",
      city: "New Delhi",
      pincode: "110001",
      fullAddress: "RentEasy HQ, Connaught Place",
      geoLocation: {
        type: "Point",
        coordinates: [77.2090, 28.6139]
      }
    }
  },
  owner: {
    id: "68f7702c68add6afcf53248c",
    name: "Owner 1",
    isProfileVerified: true,
    email: "owner@renteasy.com",
    phone: "9519246205",
    role: "owner",
    aadhaarNumber: "211304815322",
    kycVerified: true,
    address: {
      state: "Maharasthra",
      city: "Nagpur",
      pincode: "440002",
      fullAddress: "House number 211, Nagpur",
      geoLocation: {
        type: "Point",
        coordinates: [78.1095, 22.2639]
      }
    }
  },
  tenant: {
    id: "689aea036279f9b41fc6a430",
    name: "John Tenant",
    isProfileVerified: true,
    email: "tenant@renteasy.com",
    role: "tenant",
    phone: "9876543210",
    kycVerified: true,
    address: {
      state: "Maharashtra",
      city: "Mumbai",
      pincode: "400001",
      fullAddress: "123 Sea View, Mumbai",
      geoLocation: {
        type: "Point",
        coordinates: [72.8777, 19.0760]
      }
    }
  },
  guest: {
    id: "689aea036279f9b41fc6a431",
    name: "Guest User",
    isProfileVerified: false,
    email: "guest@renteasy.com",
    role: "guest",
    phone: "9876543211",
    kycVerified: false,
    address: {
      state: "Karnataka",
      city: "Bangalore",
      pincode: "560001",
      fullAddress: "456 MG Road, Bangalore",
      geoLocation: {
        type: "Point",
        coordinates: [77.5946, 12.9716]
      }
    }
  }
};

export const SAMPLE_PROPERTIES = [
  {
    id: "689ae4329944a98d364ae332",
    uniquePropertyCode: "PROP-NAGPUR-0001",
    propertyName: "Mutual Residency",
    propertyType: "flat",
    bhkType: "1 RK",
    description: "Spacious House with 30 feet front road.",
    size: 1000,
    minAmount: 1400,
    maxAmount: 4500,
    features: [
      "24x7 Water Supply",
      "Power Backup",
      "Gym"
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1687960117069-567a456fe5f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb3BlcnR5fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb3BlcnR5fGVufDB8fDB8fHww"
    ],
    available: true,
    rating: 4.2,
    location: {
      latitude: 78.1095,
      longitude: 22.2639,
      address: "House number 211, Nagpur",
      city: "Nagpur",
      state: "Maharasthra",
      country: "India",
      pincode: "440002"
    },
    owner: {
      id: "68f7702c68add6afcf53248c",
      name: "Owner 1",
      email: "letsseeuse@gmail.com",
      phone: "9519246205"
    },
    highlights: [
      "Close to airport",
      "Near shopping mall",
      "Schools within 1 km"
    ]
  },
  {
    id: "689f347c0bcb2c8a26845e80",
    uniquePropertyCode: "PROP-NAGPUR-4946",
    propertyName: "Mutual Residency 360",
    propertyType: "flat",
    bhkType: "1 RK",
    description: "Spacious House with front road.",
    size: 1000,
    minAmount: 2579,
    maxAmount: 2579,
    features: [
      "24x7 Water Supply",
      "Power Backup",
      "Gym"
    ],
    images: [
      "https://randomuser.me/api/portraits/men/28.jpg"
    ],
    available: true,
    rating: 4.0,
    location: {
      latitude: 78.1095,
      longitude: 22.2639,
      address: "House 273, Example Street",
      city: "Nagpur",
      state: "Maharashtra",
      country: "India",
      pincode: "440001"
    },
    owner: {
      id: "689f347c0bcb2c8a26845e68",
      name: "Owner 2",
      email: "owner2@example.com",
      phone: "9876543211"
    },
    highlights: [
      "Close to airport",
      "Near shopping mall",
      "Schools within 1 km"
    ]
  }
];

export const SAMPLE_ROOMS = [
  {
    id: "689ae7ff96965a58da29d642",
    propertyId: "689ae4329944a98d364ae332",
    roomNumber: "A-101",
    roomType: "Single",
    description: "Cozy single room with balcony and a city view.",
    rent: 1500,
    rentDueDay: 5,
    maintenanceCharge: {
      amount: 100,
      frequency: "monthly"
    },
    isAvailable: false,
    amenities: [
      "Air Conditioning",
      "Wi-Fi",
      "Attached Bathroom",
      "Balcony",
      "Parking"
    ],
    roomSize: "450 sq ft",
    floorNumber: 1,
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    rating: 4.0
  }
];

export const SAMPLE_AGREEMENTS = [
  {
    id: "689768798349c52eac21906a",
    roomId: "689ae7ff96965a58da29d642",
    userId: SAMPLE_USERS.tenant.id,
    ownerId: SAMPLE_USERS.owner.id,
    agreementStartDate: "2025-08-15T00:00:00.000Z",
    agreementEndDate: "2026-08-14T00:00:00.000Z",
    rentAmount: 1500,
    securityDeposit: 3000,
    signedAgreementURL: "https://www.legalindia.com/wp-content/uploads/2016/03/Rental-Agreement-Example.png",
    isActive: true,
    status: "active",
    paymentSchedule: {
      frequency: "monthly",
      dueDay: 5
    },
    meta: {
      propertyName: "Mutual Residency",
      propertyAddress: "House number 211, Nagpur",
      roomNumber: "A-101",
      amenities: [
        "Air Conditioning",
        "Wi-Fi",
        "Attached Bathroom",
        "Balcony",
        "Parking"
      ],
      floorNumber: 1,
      roomSize: "450 sq ft",
      maintenanceCharge: {
        amount: 100,
        frequency: "monthly"
      }
    }
  }
];

export const SAMPLE_PAYMENTS = [
  {
    id: "6898b373dcdc231f43fde9f0",
    agreementId: "689768798349c52eac21906a",
    userId: SAMPLE_USERS.tenant.id,
    ownerId: SAMPLE_USERS.owner.id,
    transactionNumber: "TXN-1754837875172",
    paymentDate: "2025-08-10T07:50:22.890Z",
    dueDate: "2025-08-19T07:50:22.890Z",
    amountPaid: 3000,
    paymentMode: "UPI",
    penaltyAmount: 0,
    status: "paid"
  }
];

export const SAMPLE_MAINTENANCE_REQUESTS = [
  {
    id: "68a7e712fb53314025d211d0",
    propertyId: "689ae4329944a98d364ae332",
    roomId: "689ae7ff96965a58da29d642",
    description: "Air conditioning not working in the room.",
    status: "pending",
    raisedBy: SAMPLE_USERS.tenant.id,
    ownerId: SAMPLE_USERS.owner.id,
    createdAt: "2025-08-22T03:42:10.935Z"
  }
];