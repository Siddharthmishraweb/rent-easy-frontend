import api from './api';
import { config } from '@/config';

export interface Rating {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  review: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profilePicture?: string;
  };
}

export interface RatingInput {
  rating: number;
  review: string;
}

const mockRatings: Rating[] = [
  {
    id: '1',
    propertyId: 'p1',
    userId: 'u1',
    rating: 4,
    review: 'Great property, well maintained!',
    createdAt: '2025-01-01T00:00:00Z',
    user: {
      id: 'u1',
      name: 'John Doe',
      profilePicture: '/images/users/john.jpg'
    }
  },
  {
    id: '2',
    propertyId: 'p1',
    userId: 'u2',
    rating: 5,
    review: 'Excellent location and amenities!',
    createdAt: '2025-01-02T00:00:00Z',
    user: {
      id: 'u2',
      name: 'Jane Smith',
      profilePicture: '/images/users/jane.jpg'
    }
  }
];

export const ratingService = {
  async getPropertyRatings(propertyId: string): Promise<{ data: Rating[] }> {
    if (!config.useBackend) {
      // Return mock data
      const ratings = mockRatings.filter(r => r.propertyId === propertyId);
      return {
        data: ratings
      };
    }

    const response = await api.get(`/ratings/property/${propertyId}`);
    return response.data;
  },

  async addRating(propertyId: string, data: RatingInput): Promise<{ data: Rating }> {
    if (!config.useBackend) {
      // Create mock rating
      const newRating: Rating = {
        id: Math.random().toString(),
        propertyId,
        userId: 'current-user',
        rating: data.rating,
        review: data.review,
        createdAt: new Date().toISOString(),
        user: {
          id: 'current-user',
          name: 'Current User',
          profilePicture: '/images/users/default.jpg'
        }
      };
      mockRatings.push(newRating);
      return {
        data: newRating
      };
    }

    const response = await api.post(`/ratings/${propertyId}`, data);
    return response.data;
  },

  async updateRating(ratingId: string, data: RatingInput): Promise<{ data: Rating }> {
    if (!config.useBackend) {
      // Update mock rating
      const index = mockRatings.findIndex(r => r.id === ratingId);
      if (index === -1) {
        throw new Error('Rating not found');
      }
      mockRatings[index] = {
        ...mockRatings[index],
        ...data,
      };
      return {
        data: mockRatings[index]
      };
    }

    const response = await api.put(`/ratings/${ratingId}`, data);
    return response.data;
  },

  async deleteRating(ratingId: string): Promise<void> {
    if (!config.useBackend) {
      // Delete mock rating
      const index = mockRatings.findIndex(r => r.id === ratingId);
      if (index === -1) {
        throw new Error('Rating not found');
      }
      mockRatings.splice(index, 1);
      return;
    }

    await api.delete(`/ratings/${ratingId}`);
  }
};