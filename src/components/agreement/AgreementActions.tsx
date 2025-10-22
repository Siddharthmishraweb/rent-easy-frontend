import React from 'react';
import type { RentalAgreement } from '@/types/api';
import Button from '@/components/shared/Button';
import { FiDownload, FiEdit3, FiXCircle } from 'react-icons/fi';

type ActionType = 'download' | 'edit' | 'terminate';

interface AgreementActionsProps {
  agreement: RentalAgreement;
  onAction: (action: ActionType) => void;
}

export const AgreementActions: React.FC<AgreementActionsProps> = ({ agreement, onAction }) => {
  const canEdit = agreement.status === 'DRAFT';
  const canTerminate = agreement.status === 'ACTIVE';

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="primary"
        icon={<FiDownload />}
        onClick={() => onAction('download')}
      >
        Download Agreement
      </Button>

      {canEdit && (
        <Button
          variant="secondary"
          icon={<FiEdit3 />}
          onClick={() => onAction('edit')}
        >
          Edit Agreement
        </Button>
      )}

      {canTerminate && (
        <Button
          variant="danger"
          icon={<FiXCircle />}
          onClick={() => onAction('terminate')}
        >
          Terminate Agreement
        </Button>
      )}
    </div>
  );
};