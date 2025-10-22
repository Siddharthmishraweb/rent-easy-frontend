import { Property } from './property';

export interface Owner {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  description?: string;
  properties: Property[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  documents: string[];
  rating: number;
  totalRatings: number;
  propertiesCount: number;
  isVerified: boolean;
  reviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profilePicture?: string;
  };
}