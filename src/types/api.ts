import type { Property } from './property';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'TENANT' | 'ADMIN';
  phone?: string;
  profilePicture?: string;
}

export type { Property, PropertyCreateRequest, PropertyUpdateRequest, PropertySearchParams } from './property';

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: {
    message: string;
    code?: string;
    status?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RentalAgreement {
  id: string;
  propertyId: string;
  property: Property;
  tenant: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
  };
  tenantId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  securityDeposit: number;
  terms: string[];
  status: 'DRAFT' | 'PENDING' | 'ACTIVE' | 'TERMINATED';
  signatures: {
    owner?: string;
    tenant?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface RentPayment {
  id: string;
  agreementId: string;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  paymentDate?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  propertyName?: string;
  tenantName?: string;
  tenantEmail?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  propertyCode: string;
  createdAt: string;
  user?: User;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface PropertyStats {
  viewsCount: number;
  inquiriesCount: number;
  bookmarksCount: number;
  reviewsCount: number;
  averageRating: number;
  occupancyRate: number;
}