export interface Room {
  _id: string;
  id: string;
  roomNumber: string;
  name: string;
  description: string;
  images: string[];
  rent: number;
  type: string;
  securityDeposit: number;
  roomType: string;
  roomSize: string;
  floorNumber: number;
  area: number;
  furnishing: 'FURNISHED' | 'SEMI_FURNISHED' | 'UNFURNISHED';
  maxOccupancy: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
  isAvailable: boolean;
  features: string[];
  amenities: string[];
  propertyCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  uniquePropertyCode: string;
  propertyName: string;
  propertyType: string;
  bhkType: string;
  description?: string;
  size: number;
  minAmount?: number;
  maxAmount?: number;
  features: string[];
  images: string[];
  available: boolean;
  rating?: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  owner: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  rooms?: Room[];
  reviews?: {
    id: string;
    user: {
      id: string;
      name: string;
      profilePicture?: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface PropertyCreateRequest {
  propertyName: string;
  propertyType: string;
  bhkType: string;
  description?: string;
  size: number;
  minAmount?: number;
  maxAmount?: number;
  features: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}

export interface PropertyUpdateRequest extends Partial<PropertyCreateRequest> {
  available?: boolean;
}

export interface PropertySearchParams {
  query?: string;
  propertyType?: string;
  bhkType?: string;
  minAmount?: number;
  maxAmount?: number;
  features?: string[];
  city?: string;
  state?: string;
  available?: boolean;
  sortBy?: 'minAmount' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  radius?: number;
  latitude?: number;
  longitude?: number;
}