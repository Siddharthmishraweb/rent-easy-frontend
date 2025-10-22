import React from 'react';
import type { RentalAgreement } from '@/types/api';
import { formatCurrency } from '@/utils/lib';

interface AgreementDetailsProps {
  agreement: RentalAgreement;
}

export const AgreementDetails: React.FC<AgreementDetailsProps> = ({ agreement }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
          <p className="text-gray-900">{new Date(agreement.startDate).toLocaleDateString()}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">End Date</h4>
          <p className="text-gray-900">{new Date(agreement.endDate).toLocaleDateString()}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Monthly Rent</h4>
          <p className="text-gray-900">₹{formatCurrency(agreement.rentAmount)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Security Deposit</h4>
          <p className="text-gray-900">₹{formatCurrency(agreement.securityDeposit)}</p>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">Terms & Conditions</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-900">
          {agreement.terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};