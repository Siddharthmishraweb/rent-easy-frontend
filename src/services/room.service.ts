import { api } from './api';
import { Room } from '@/types/property';
import { API_CONFIG } from '@/config/api.config';
import { mockProperties } from '@/mocks/properties';

interface RoomFilters {
  minRent?: string;
  maxRent?: string;
  type?: string;
  furnishing?: string;
  availability?: string;
  propertyId?: string;
}

// Helper function to filter rooms based on criteria
const mapMockRoomToRoom = (mockRoom: any, propertyCode: string): Room => ({
  id: mockRoom._id,
  name: mockRoom.name,
  description: mockRoom.description,
  images: mockRoom.images,
  rent: mockRoom.rent,
  securityDeposit: mockRoom.securityDeposit,
  type: mockRoom.type,
  area: mockRoom.area,
  furnishing: mockRoom.furnishing,
  maxOccupancy: mockRoom.maxOccupancy,
  status: mockRoom.status,
  features: mockRoom.features,
  propertyCode: propertyCode,
  createdAt: mockRoom.createdAt,
  updatedAt: mockRoom.updatedAt
});

const filterRooms = (rooms: Room[], filters: RoomFilters): Room[] => {
  return rooms.filter(room => {
    if (filters.minRent && room.rent < parseInt(filters.minRent)) return false;
    if (filters.maxRent && room.rent > parseInt(filters.maxRent)) return false;
    if (filters.type && room.type !== filters.type) return false;
    if (filters.furnishing && room.furnishing !== filters.furnishing) return false;
    if (filters.availability && room.status !== filters.availability) return false;
    if (filters.propertyId && room.propertyCode !== filters.propertyId) return false;
    return true;
  });
};

// API functions
export const roomService = {
  getRooms: async (filters: RoomFilters = {}): Promise<Room[]> => {
    if (API_CONFIG.USE_MOCK_DATA) {
      // Get all rooms from all properties
      const allRooms = mockProperties.flatMap(property => 
        (property.rooms || []).map(room => mapMockRoomToRoom(room, property._id))
      );
      return filterRooms(allRooms, filters);
    }
    const response = await api.post(API_CONFIG.ENDPOINTS.ROOM.LIST, { query: filters });
    return response.data.data;
  },

  getRoomById: async (roomId: string): Promise<Room> => {
    if (API_CONFIG.USE_MOCK_DATA) {
      for (const property of mockProperties) {
        const room = property.rooms?.find(r => r._id === roomId);
        if (room) {
          return mapMockRoomToRoom(room, property._id);
        }
      }
      throw new Error('Room not found');
    }
    const response = await api.post(API_CONFIG.ENDPOINTS.ROOM.GET_BY_ID, { roomId });
    return response.data.data;
  },

  getRoomsByPropertyId: async (propertyId: string): Promise<Room[]> => {
    if (API_CONFIG.USE_MOCK_DATA) {
      const property = mockProperties.find(p => p._id === propertyId);
      if (!property) return [];
      return (property.rooms || []).map(room => mapMockRoomToRoom(room, property._id));
    }
    const response = await api.post(API_CONFIG.ENDPOINTS.ROOM.LIST, {
      query: { propertyId }
    });
    return response.data.data;
  },

  createRoom: async (roomData: Omit<Room, 'id'>) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      const newRoom: Room = {
        ...roomData,
        id: `room${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return {
        success: true,
        message: 'Room created successfully',
        data: newRoom
      };
    }
    const response = await api.post(API_CONFIG.ENDPOINTS.ROOM.CREATE, { roomData });
    return response.data.data;
  },

  updateRoom: async (roomId: string, roomData: Partial<Room>) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      return {
        success: true,
        message: 'Room updated successfully',
        data: {
          id: roomId,
          ...roomData,
          updatedAt: new Date().toISOString()
        }
      };
    }
    const response = await api.put(API_CONFIG.ENDPOINTS.ROOM.UPDATE, { roomId, roomData });
    return response.data.data;
  },

  deleteRoom: async (roomId: string) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      return {
        success: true,
        message: 'Room deleted successfully'
      };
    }
    const response = await api.delete(API_CONFIG.ENDPOINTS.ROOM.DELETE, {
      data: { roomId }
    });
    return response.data;
  },

  assignTenant: async (roomId: string, data: {
    tenantId: string;
    paymentSchedule: {
      frequency: 'monthly' | 'yearly';
      dueDay: number;
    };
    agreementEndDate: string;
  }) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      for (const property of mockProperties) {
        const room = property.rooms?.find(r => r._id === roomId);
        if (room) {
          return {
            success: true,
            message: 'Tenant assigned successfully',
            data: mapMockRoomToRoom({
              ...room,
              status: 'OCCUPIED',
              updatedAt: new Date().toISOString()
            }, property._id)
          };
        }
      }
      throw new Error('Room not found');
    }
    const response = await api.post(API_CONFIG.ENDPOINTS.ROOM.ASSIGN_TENANT, {
      ...data,
      roomId
    });
    return response.data.data;
  },

  vacateTenant: async (roomId: string) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      for (const property of mockProperties) {
        const room = property.rooms?.find(r => r._id === roomId);
        if (room) {
          return {
            success: true,
            message: 'Room vacated successfully',
            data: mapMockRoomToRoom({
              ...room,
              status: 'AVAILABLE',
              updatedAt: new Date().toISOString()
            }, property._id)
          };
        }
      }
      throw new Error('Room not found');
    }
    const response = await api.post(API_CONFIG.ENDPOINTS.ROOM.VACATE_TENANT, { roomId });
    return response.data.data;
  },

  uploadRoomImages: async (roomId: string, images: FormData) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      return {
        success: true,
        message: 'Images uploaded successfully',
        data: {
          imageUrls: ['https://example.com/mock-room-image.jpg']
        }
      };
    }
    const response = await api.post(`/room/${roomId}/images`, images, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteRoomImage: async (roomId: string, imageUrl: string) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      return {
        success: true,
        message: 'Image deleted successfully'
      };
    }
    const response = await api.delete(`/room/${roomId}/images`, {
      data: { imageUrl }
    });
    return response.data;
  },
};