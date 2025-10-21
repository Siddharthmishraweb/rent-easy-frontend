export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'owner' | 'tenant';
  avatar?: string;
}

export interface Property {
  _id: string;
  name: string;
  description: string;
  address: string;
  type: 'apartment' | 'house' | 'room';
  rent: number;
  securityDeposit: number;
  features: string[];
  images: string[];
  owner: User;
  status: 'available' | 'rented';
  createdAt: string;
  updatedAt: string;
}

export interface Agreement {
  _id: string;
  property: Property;
  tenant: User;
  owner: User;
  startDate: string;
  endDate: string;
  rent: number;
  securityDeposit: number;
  status: 'pending' | 'active' | 'expired' | 'terminated';
  documents: {
    url: string;
    name: string;
    type: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  _id: string;
  agreement: Agreement;
  property: Property;
  tenant: User;
  owner: User;
  amount: number;
  type: 'rent' | 'deposit';
  date: string;
  status: 'pending' | 'paid' | 'failed';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProperties: number;
  activeAgreements: number;
  pendingPayments: number;
  totalRevenue: number;
}