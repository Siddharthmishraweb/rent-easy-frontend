import api from '../utils/axios';
import { API_CONFIG } from '../config/api.config';
import { 
  Property, 
  ApiResponse, 
  PaginatedResponse,
  PropertyCreateRequest,
  PropertyUpdateRequest,
  PropertySearchParams
} from '../types/api';
import { mockProperties } from '../mocks/properties';
import { mockPropertyDetailsResponse } from '../mocks/propertyDetails';

const BASE_URL = API_CONFIG.API_BASE_URL;

export const propertyService = {
  // Get property by ID
  async getPropertyById(id: string): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockPropertyDetailsResponse;
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/${id}`);
    return response.data;
  },

  // Create a new property
  async createProperty(propertyData: PropertyCreateRequest): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const newProperty: Property = {
        id: `prop${mockProperties.length + 1}`,
        uniquePropertyCode: `PROP${mockProperties.length + 1}`,
        propertyName: propertyData.propertyName,
        propertyType: propertyData.propertyType,
        bhkType: propertyData.bhkType,
        description: propertyData.description,
        size: propertyData.size,
        minAmount: propertyData.minAmount,
        maxAmount: propertyData.maxAmount,
        features: propertyData.features,
        images: [],
        available: true,
        location: propertyData.location,
        owner: {
          id: 'mock-owner-1',
          name: 'Mock Owner',
          email: 'owner@example.com',
          phone: '+1234567890'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return {
        success: true,
        message: 'Property created successfully',
        data: newProperty
      };
    }
    const response = await api.post(`${BASE_URL}/api/v1/property`, propertyData);
    return response.data;
  },

  // Get property by unique code
  async getPropertyByCode(code: string): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const property = mockProperties.find(p => p._id === code);
      if (!property) {
        return {
          success: false,
          message: 'Property not found',
          data: null
        };
      }
      const mappedProperty: Property = {
        id: property._id,
        uniquePropertyCode: property._id,
        propertyName: property.name,
        propertyType: property.type,
        bhkType: `${property.configuration.bedrooms}BHK`,
        description: property.description,
        size: property.configuration.superArea,
        minAmount: property.rent,
        maxAmount: property.rent,
        features: property.amenities,
        images: property.images,
        available: property.status === 'available',
        location: {
          latitude: 0,
          longitude: 0,
          address: property.address.street,
          city: property.address.city,
          state: property.address.state,
          country: 'India',
          pincode: property.address.pincode
        },
        owner: {
          id: property.owner._id,
          name: property.owner.name,
          email: property.owner.email,
          phone: property.owner.phone
        },
        createdAt: property.createdAt,
        updatedAt: property.updatedAt
      };
      return {
        success: true,
        message: 'Property found',
        data: mappedProperty
      };
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/${code}`);
    return response.data;
  },

  // Update property details
  async updateProperty(code: string, propertyData: PropertyUpdateRequest): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return {
        success: true,
        message: 'Property updated successfully',
        data: {
          id: code,
          uniquePropertyCode: code,
          ...propertyData,
          updatedAt: new Date().toISOString()
        }
      };
    }
    const response = await api.patch(`${BASE_URL}/api/v1/property/${code}`, propertyData);
    return response.data;
  },

  // Delete a property
  async deleteProperty(code: string): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return {
        success: true,
        message: 'Property deleted successfully'
      };
    }
    const response = await api.delete(`${BASE_URL}/api/v1/property/${code}`);
    return response.data;
  },

  // Search properties with filters
  async searchProperties(params: PropertySearchParams): Promise<PaginatedResponse<Property>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      let filteredProperties = [...mockProperties];
      
      // Apply filters
      if (params.city) {
        filteredProperties = filteredProperties.filter(p => 
          p.address.city.toLowerCase() === params.city?.toLowerCase()
        );
      }
      if (params.propertyType) {
        filteredProperties = filteredProperties.filter(p => 
          p.type.toLowerCase() === params.propertyType?.toLowerCase()
        );
      }
      if (params.minAmount) {
        filteredProperties = filteredProperties.filter(p => p.rent >= params.minAmount!);
      }
      if (params.maxAmount) {
        filteredProperties = filteredProperties.filter(p => p.rent <= params.maxAmount!);
      }
      
      // Map to correct type
      const mappedProperties: any[] = filteredProperties.map(p => ({
        id: p._id,
        uniquePropertyCode: p._id,
        propertyName: p.name,
        propertyType: p.type,
        bhkType: `${p.configuration.bedrooms}BHK`,
        description: p.description,
        size: p.configuration.superArea,
        minAmount: p.rent,
        maxAmount: p.rent,
        features: p.amenities,
        images: p.images,
        available: p.status.toLowerCase() === 'available',
        rating: Math.floor(Math.random() * 2) + 3, // Random rating between 3-5
        location: {
          latitude: 0,
          longitude: 0,
          address: p.address.street,
          city: p.address.city,
          state: p.address.state,
          country: 'India',
          pincode: p.address.pincode
        },
        owner: {
          id: p.owner._id,
          name: p.owner.name,
          email: p.owner.email,
          phone: p.owner.phone
        },
        rooms: p.rooms?.map(room => ({
          _id: room._id,
          id: room._id,
          roomNumber: '1',
          roomType: room.type,
          name: room.name,
          description: room.description,
          images: room.images,
          rent: room.rent,
          securityDeposit: room.securityDeposit,
          roomSize: `${room.area}sqft`,
          floorNumber: 1,
          area: room.area,
          furnishing: room.furnishing as 'FURNISHED' | 'SEMI_FURNISHED' | 'UNFURNISHED',
          maxOccupancy: room.maxOccupancy,
          status: room.status as 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE',
          isAvailable: room.status === 'AVAILABLE',
          features: room.features,
          amenities: room.features,
          propertyCode: p._id,
          createdAt: room.createdAt,
          updatedAt: room.updatedAt
        })),
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      }));
      
      return {
        success: true,
        message: 'Properties found',
        data: mappedProperties,
        total: mappedProperties.length,
        page: params.page || 1,
        limit: params.limit || 10,
        totalPages: Math.ceil(mappedProperties.length / (params.limit || 10))
      };
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/search`, {
      params
    });
    return response.data;
  },

  // Get properties for a specific owner
  async getOwnerProperties(ownerId: string): Promise<PaginatedResponse<Property>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const ownerProperties = mockProperties.filter(p => p.owner._id === ownerId);
      const mappedProperties: Property[] = ownerProperties.map(p => ({
        id: p._id,
        uniquePropertyCode: p._id,
        propertyName: p.name,
        propertyType: p.type,
        bhkType: `${p.configuration.bedrooms}BHK`,
        description: p.description,
        size: p.configuration.superArea,
        minAmount: p.rent,
        maxAmount: p.rent,
        features: p.amenities,
        images: p.images,
        available: p.status === 'available',
        location: {
          latitude: 0,
          longitude: 0,
          address: p.address.street,
          city: p.address.city,
          state: p.address.state,
          country: 'India',
          pincode: p.address.pincode
        },
        owner: {
          id: p.owner._id,
          name: p.owner.name,
          email: p.owner.email,
          phone: p.owner.phone
        },
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      }));
      
      return {
        success: true,
        message: 'Properties found',
        data: mappedProperties,
        total: mappedProperties.length,
        page: 1,
        limit: 10,
        totalPages: Math.ceil(mappedProperties.length / 10)
      };
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/owner/${ownerId}`);
    return response.data;
  },

  // Get popular properties
  async getPopularProperties(limit: number = 10): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const sortedProperties = [...mockProperties]
        .sort(() => Math.random() - 0.5)
        .slice(0, limit)
        .map(p => ({
          id: p._id,
          uniquePropertyCode: p._id,
          propertyName: p.name,
          propertyType: p.type,
          bhkType: `${p.configuration.bedrooms}BHK`,
          description: p.description,
          size: p.configuration.superArea,
          minAmount: p.rent,
          maxAmount: p.rent,
          features: p.amenities,
          images: p.images,
          available: p.status === 'available',
          location: {
            latitude: 0,
            longitude: 0,
            address: p.address.street,
            city: p.address.city,
            state: p.address.state,
            country: 'India',
            pincode: p.address.pincode
          },
          owner: {
            id: p.owner._id,
            name: p.owner.name,
            email: p.owner.email,
            phone: p.owner.phone
          },
          createdAt: p.createdAt,
          updatedAt: p.updatedAt
        }));
      return {
        success: true,
        message: 'Popular properties found',
        data: sortedProperties
      };
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/popular`, {
      params: { limit }
    });
    return response.data;
  },

  // Get recently added properties
  async getRecentProperties(limit: number = 10): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const recentProperties = [...mockProperties]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit)
        .map(p => ({
          id: p._id,
          uniquePropertyCode: p._id,
          propertyName: p.name,
          propertyType: p.type,
          bhkType: `${p.configuration.bedrooms}BHK`,
          description: p.description,
          size: p.configuration.superArea,
          minAmount: p.rent,
          maxAmount: p.rent,
          features: p.amenities,
          images: p.images,
          available: p.status === 'available',
          location: {
            latitude: 0,
            longitude: 0,
            address: p.address.street,
            city: p.address.city,
            state: p.address.state,
            country: 'India',
            pincode: p.address.pincode
          },
          owner: {
            id: p.owner._id,
            name: p.owner.name,
            email: p.owner.email,
            phone: p.owner.phone
          },
          createdAt: p.createdAt,
          updatedAt: p.updatedAt
        }));
      return {
        success: true,
        message: 'Recent properties found',
        data: recentProperties
      };
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/recent`, {
      params: { limit }
    });
    return response.data;
  },

  // Get similar properties
  async getSimilarProperties(propertyCode: string, limit: number = 5): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const property = mockProperties.find(p => p._id === propertyCode);
      if (!property) {
        return {
          success: false,
          message: 'Property not found',
          data: []
        };
      }
      
      const similarProperties = mockProperties
        .filter(p => p._id !== propertyCode && 
                    p.type === property.type &&
                    Math.abs(p.rent - property.rent) <= 10000)
        .slice(0, limit)
        .map(p => ({
          id: p._id,
          uniquePropertyCode: p._id,
          propertyName: p.name,
          propertyType: p.type,
          bhkType: `${p.configuration.bedrooms}BHK`,
          description: p.description,
          size: p.configuration.superArea,
          minAmount: p.rent,
          maxAmount: p.rent,
          features: p.amenities,
          images: p.images,
          available: p.status === 'available',
          location: {
            latitude: 0,
            longitude: 0,
            address: p.address.street,
            city: p.address.city,
            state: p.address.state,
            country: 'India',
            pincode: p.address.pincode
          },
          owner: {
            id: p.owner._id,
            name: p.owner.name,
            email: p.owner.email,
            phone: p.owner.phone
          },
          createdAt: p.createdAt,
          updatedAt: p.updatedAt
        }));
      return {
        success: true,
        message: 'Similar properties found',
        data: similarProperties
      };
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/${propertyCode}/similar`, {
      params: { limit }
    });
    return response.data;
  },

  // Get properties based on location
  async getNearbyProperties(lat: number, lng: number, radius: number = 5): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      // Since we don't have real coordinates in mock data, return random properties
      const nearbyProperties = [...mockProperties]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map(p => ({
          id: p._id,
          uniquePropertyCode: p._id,
          propertyName: p.name,
          propertyType: p.type,
          bhkType: `${p.configuration.bedrooms}BHK`,
          description: p.description,
          size: p.configuration.superArea,
          minAmount: p.rent,
          maxAmount: p.rent,
          features: p.amenities,
          images: p.images,
          available: p.status === 'available',
          location: {
            latitude: lat + (Math.random() * 0.02 - 0.01),
            longitude: lng + (Math.random() * 0.02 - 0.01),
            address: p.address.street,
            city: p.address.city,
            state: p.address.state,
            country: 'India',
            pincode: p.address.pincode
          },
          owner: {
            id: p.owner._id,
            name: p.owner.name,
            email: p.owner.email,
            phone: p.owner.phone
          },
          createdAt: p.createdAt,
          updatedAt: p.updatedAt
        }));
      return {
        success: true,
        message: 'Nearby properties found',
        data: nearbyProperties
      };
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/nearby`, {
      params: { lat, lng, radius }
    });
    return response.data;
  },

  // Toggle property availability
  async toggleAvailability(code: string): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return {
        success: true,
        message: 'Property availability toggled successfully',
        data: { available: Math.random() > 0.5 }
      };
    }
    const response = await api.patch(`${BASE_URL}/api/v1/property/${code}/toggle-availability`);
    return response.data;
  },

  // Get property statistics
  async getPropertyStats(code: string): Promise<ApiResponse> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return {
        success: true,
        message: 'Property stats retrieved successfully',
        data: {
          viewsCount: Math.floor(Math.random() * 1000),
          inquiriesCount: Math.floor(Math.random() * 100),
          bookmarksCount: Math.floor(Math.random() * 50),
          reviewsCount: Math.floor(Math.random() * 20),
          averageRating: (Math.random() * 2 + 3).toFixed(1),
          occupancyRate: Math.floor(Math.random() * 100)
        }
      };
    }
    const response = await api.get(`${BASE_URL}/api/v1/property/${code}/stats`);
    return response.data;
  }
};