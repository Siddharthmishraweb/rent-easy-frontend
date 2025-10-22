import { useState, useEffect } from 'react';
import type { RentPayment } from '@/types/api';

interface PaymentHistoryResult {
  data: RentPayment | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePaymentHistory(paymentId?: string): PaymentHistoryResult {
  const [data, setData] = useState<RentPayment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!paymentId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/payments/${paymentId}`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch payment details');
        }

        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch payment history'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [paymentId]);

  return { data, isLoading, error };
}