import { SAMPLE_USERS, SAMPLE_PROPERTIES } from './properties';

export const SAMPLE_OWNERS = [
  {
    id: "68f7751068add6afcf53249b",
    userId: SAMPLE_USERS.owner.id,
    ownedProperties: [SAMPLE_PROPERTIES[0].id],
    bankDetails: {
      accountHolderName: "Owner 1",
      accountNumber: "123456789019",
      ifsc: "SBIN0000127"
    },
    penaltyPercentPerDay: 1,
    createdAt: "2025-10-21T11:57:04.220Z"
  }
];

export const mockCreateOwner = (ownerData: any) => {
  const newOwner = {
    ...ownerData,
    id: "mock-owner-" + Date.now(),
    createdAt: new Date().toISOString()
  };
  SAMPLE_OWNERS.push(newOwner);
  return {
    statusCode: 201,
    status: "OK",
    message: "Owner created successfully!",
    data: newOwner
  };
};

export const mockGetAllOwners = () => {
  const ownersWithUserData = SAMPLE_OWNERS.map(owner => ({
    ...owner,
    userId: SAMPLE_USERS.owner // Include full user data
  }));
  return {
    statusCode: 200,
    status: "OK",
    message: "Owners list fetched successfully!",
    data: ownersWithUserData
  };
};

export const mockGetOwnerById = (ownerId: string) => {
  const owner = SAMPLE_OWNERS.find(o => o.id === ownerId);
  if (!owner) throw new Error("Owner not found");

  return {
    statusCode: 200,
    status: "OK",
    message: "Owner fetched successfully!",
    data: {
      ...owner,
      userId: SAMPLE_USERS.owner // Include full user data
    }
  };
};

export const mockUpdateOwner = (ownerId: string, ownerData: any) => {
  const index = SAMPLE_OWNERS.findIndex(o => o.id === ownerId);
  if (index === -1) throw new Error("Owner not found");

  SAMPLE_OWNERS[index] = {
    ...SAMPLE_OWNERS[index],
    ...ownerData,
    updatedAt: new Date().toISOString()
  };

  return {
    success: true,
    data: SAMPLE_OWNERS[index]
  };
};

export const mockDeleteOwner = (ownerId: string) => {
  const index = SAMPLE_OWNERS.findIndex(o => o.id === ownerId);
  if (index === -1) throw new Error("Owner not found");

  SAMPLE_OWNERS.splice(index, 1);
  return {
    success: true,
    message: "Owner deleted"
  };
};

export const mockGetOwnerDashboard = (ownerId: string) => {
  const owner = SAMPLE_OWNERS.find(o => o.id === ownerId);
  if (!owner) throw new Error("Owner not found");

  return {
    success: true,
    data: {
      ownerInfo: {
        ...owner,
        userId: SAMPLE_USERS.owner
      },
      stats: {
        totalProperties: 1,
        totalRooms: 6,
        occupiedRooms: 5,
        occupancyRate: "83.33%",
        avgRating: "4.20"
      },
      rentSummary: {
        monthlyCollected: 15000,
        yearlyCollected: 180000
      },
      pendingPayments: [],
      properties: [SAMPLE_PROPERTIES[0]]
    }
  };
};