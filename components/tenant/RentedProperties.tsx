import React from 'react';
import { useQuery } from 'react-query';
import { agreementService } from '../../services/agreement.service';
import { RentalAgreement, Property } from '../../types/api';
import PropertyCard from '../shared/PropertyCard';

interface RentedPropertiesProps {
  tenantId: string;
}

export default function RentedProperties({ tenantId }: RentedPropertiesProps) {
  const { data: agreements, isLoading } = useQuery(
    ['tenantAgreements', tenantId],
    () => agreementService.getUserAgreements(),
    {
      select: (data) => data.filter((agreement) => agreement.status === 'ACTIVE'),
    }
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse bg-white rounded-lg h-96 shadow" />
        ))}
      </div>
    );
  }

  if (!agreements?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">No Active Rentals</h3>
        <p className="text-gray-600">
          You don't have any active rental agreements at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agreements.map((agreement: RentalAgreement) => (
        <div key={agreement._id} className="space-y-4">
          <PropertyCard property={agreement.property} />
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Rent</p>
                <p className="font-semibold">₹{agreement.rentAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-semibold">
                  {new Date(agreement.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-semibold">
                  {new Date(agreement.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Security Deposit</p>
                <p className="font-semibold">₹{agreement.securityDeposit}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}