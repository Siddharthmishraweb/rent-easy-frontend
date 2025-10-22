import { useState, useEffect } from 'react';
import { ownerService } from '@/services/owner.service';
import type { Property } from '@/types/property';
import type { Review } from '@/types/owner';

interface Owner {
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

const useOwner = (ownerId: string) => {
  const [data, setData] = useState<Owner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOwner = async () => {
      if (!ownerId) return;

      try {
        setIsLoading(true);
        const response = await ownerService.getById(ownerId);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwner();
  }, [ownerId]);

  return { data, isLoading, error };
};

export default useOwner;