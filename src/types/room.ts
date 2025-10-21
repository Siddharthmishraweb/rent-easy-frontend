export interface Room {
  _id: string;
  propertyId: string;
  roomNumber: string;
  roomType: 'Single' | 'Double' | 'Suite';
  description: string;
  rent: number;
  rentDueDay: number;
  maintenanceCharge: {
    amount: number;
    frequency: 'monthly' | 'yearly';
  };
  isAvailable: boolean;
  amenities: string[];
  roomSize: string;
  floorNumber: number;
  images: string[];
  addressId: string;
  rating: number;
  rentalHistory: Array<{
    tenantId: string;
    startDate: string;
    endDate: string | null;
    rentAmount: number;
    securityDeposit: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface RoomCreateInput {
  propertyId: string;
  roomNumber: string;
  roomType: string;
  description: string;
  rent: number;
  rentDueDay: number;
  maintenanceCharge: {
    amount: number;
    frequency: 'monthly' | 'yearly';
  };
  amenities: string[];
  roomSize: string;
  floorNumber: number;
  images: string[];
  addressId: string;
}

export interface AssignTenantInput {
  tenantId: string;
  roomId: string;
  paymentSchedule: {
    frequency: 'monthly' | 'yearly';
    dueDay: number;
  };
  agreementEndDate: string;
}