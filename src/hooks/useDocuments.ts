import { useState, useEffect } from 'react';
import { documentService } from '@/services/document.service';
import { useAuth } from '@/contexts/AuthContext';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  userId: string;
  createdAt: string;
  status: 'pending' | 'verified' | 'rejected';
}

export const useDocuments = () => {
  const [data, setData] = useState<Document[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const response = await documentService.getUserDocuments(user.id);
        setData(response.data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [user?.id]);

  return { data, isLoading, error };
};