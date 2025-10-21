import { SAMPLE_PROPERTIES, SAMPLE_ROOMS, SAMPLE_USERS } from './properties';

export const mockCreateProperty = (propertyData: any) => {
  const newProperty = {
    ...propertyData,
    id: "mock-property-" + Date.now(),
    isActive: true,
    isArchived: false,
    rating: 0,
    createdAt: new Date().toISOString()
  };
  return {
    statusCode: 201,
    status: "OK",
    message: "Property created",
    data: newProperty
  };
};

export const mockGetPropertyById = (propertyId: string) => {
  const property = SAMPLE_PROPERTIES.find(p => p.id === propertyId);
  if (!property) throw new Error("Property not found");

  return {
    statusCode: 200,
    status: "OK",
    message: "Get property by id successfully!",
    data: property
  };
};

export const mockGetNearbyProperties = (lng: number, lat: number) => {
  return {
    message: "Properties fetched",
    page: 1,
    limit: 20,
    total: SAMPLE_PROPERTIES.length,
    stats: {
      minPrice: 1400,
      maxPrice: 8886,
      avgRating: 4.1,
      count: SAMPLE_PROPERTIES.length
    },
    data: SAMPLE_PROPERTIES
  };
};

export const mockGetPropertyStats = () => {
  return {
    statusCode: 200,
    status: "OK",
    message: "Property stats fetched",
    data: {
      byType: [
        {
          _id: "flat",
          count: SAMPLE_PROPERTIES.length,
          minPrice: 1400,
          maxPrice: 4500,
          avgPrice: 2950,
          avgRating: 4.1
        }
      ],
      global: {
        count: SAMPLE_PROPERTIES.length,
        minPrice: 1400,
        maxPrice: 4500,
        avgRating: 4.1
      }
    }
  };
};

export const mockGetSimilarProperties = (propertyId: string) => {
  const similarProperties = SAMPLE_PROPERTIES.filter(p => p.id !== propertyId);
  return {
    message: "Similar properties fetched",
    data: similarProperties,
    meta: {
      targetId: propertyId,
      usedFallback: false,
      weights: {
        type: 0.25,
        price: 0.25,
        bhk: 0.15,
        furnishing: 0.1,
        features: 0.15,
        distance: 0.05,
        rating: 0.05
      }
    }
  };
};

// Room APIs
export const mockCreateRoom = (roomData: any) => {
  const newRoom = {
    ...roomData,
    id: "mock-room-" + Date.now(),
    isAvailable: true,
    rating: 0,
    createdAt: new Date().toISOString()
  };
  return {
    message: "Room created successfully",
    data: newRoom
  };
};

export const mockGetAllRooms = () => {
  return {
    message: "All rooms fetched",
    data: SAMPLE_ROOMS
  };
};

export const mockGetRoomById = (roomId: string) => {
  const room = SAMPLE_ROOMS.find(r => r.id === roomId);
  if (!room) throw new Error("Room not found");

  return {
    data: room
  };
};

export const mockAssignTenant = (assignmentData: any) => {
  const room = SAMPLE_ROOMS.find(r => r.id === assignmentData.roomId);
  if (!room) throw new Error("Room not found");

  const updatedRoom = {
    ...room,
    isAvailable: false,
    rentalHistory: [{
      tenantId: assignmentData.tenantId,
      startDate: new Date().toISOString(),
      endDate: null,
      rentAmount: room.rent,
      securityDeposit: room.rent * 2
    }]
  };

  return {
    message: "Tenant assigned successfully",
    data: updatedRoom
  };
};

export const mockVacateRoom = (roomId: string) => {
  const room = SAMPLE_ROOMS.find(r => r.id === roomId);
  if (!room) throw new Error("Room not found");

  const updatedRoom = {
    ...room,
    isAvailable: true,
    tenantId: null
  };

  return {
    message: "Room vacated successfully",
    data: updatedRoom
  };
};