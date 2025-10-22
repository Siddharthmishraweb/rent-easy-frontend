import { useState, useEffect } from 'react'
import { ratingService } from '@/services/rating.service';

interface Rating {
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

export const useRatings = (propertyId: string) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const response = await ratingService.getPropertyRatings(propertyId);
        setRatings(response.data);
      } catch (err) {
        setError('Failed to fetch ratings');
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [propertyId]);

  const addRating = async (rating: number, review: string) => {
    try {
      const response = await ratingService.addRating(propertyId, {
        rating,
        review
      });
      setRatings(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateRating = async (ratingId: string, rating: number, review: string) => {
    try {
      const response = await ratingService.updateRating(ratingId, {
        rating,
        review
      });
      setRatings(prev =>
        prev.map(r => (r.id === ratingId ? response.data : r))
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteRating = async (ratingId: string) => {
    try {
      await ratingService.deleteRating(ratingId);
      setRatings(prev => prev.filter(r => r.id !== ratingId));
    } catch (err) {
      throw err;
    }
  };

  return {
    ratings,
    loading,
    error,
    addRating,
    updateRating,
    deleteRating
  };
};