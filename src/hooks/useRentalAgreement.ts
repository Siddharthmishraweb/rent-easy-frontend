import { useQuery } from 'react-query';
import { agreementService } from '@/services/agreement.service';
import type { RentalAgreement } from '@/types/api';

export function useRentalAgreement(id: string) {
  return useQuery<RentalAgreement>(
    ['agreement', id],
    () => agreementService.getAgreement(id),
    {
      enabled: !!id,
    }
  );
}