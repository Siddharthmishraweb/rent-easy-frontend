import React from 'react';
import { useQuery } from 'react-query';
import { agreementService } from '../../services/agreement.service';
import type { RentalAgreement, User } from '../../types/api';
import { FiMail, FiPhone } from 'react-icons/fi';

interface TenantListProps {
  ownerId: string;
}

interface TenantCardProps {
  tenant: User;
  agreement: RentalAgreement;
}

const TenantCard: React.FC<TenantCardProps> = ({ tenant, agreement }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          {tenant.profilePicture ? (
            <img
              src={tenant.profilePicture}
              alt={tenant.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-gray-600">
              {tenant.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{tenant.name}</h3>
          <p className="text-gray-600 text-sm">{agreement.property.title}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center text-gray-600">
          <FiMail className="w-4 h-4 mr-2" />
          {tenant.email}
        </div>
        {tenant.phone && (
          <div className="flex items-center text-gray-600">
            <FiPhone className="w-4 h-4 mr-2" />
            {tenant.phone}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Rent Amount</p>
            <p className="font-semibold">₹{agreement.rentAmount}/month</p>
          </div>
          <div>
            <p className="text-gray-500">Start Date</p>
            <p className="font-semibold">
              {new Date(agreement.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TenantList({ ownerId }: TenantListProps) {
  const { data: agreements, isLoading } = useQuery(
    ['ownerAgreements', ownerId],
    () => agreementService.getUserAgreements(),
    {
      select: (data) => data.filter((agreement: RentalAgreement) => agreement.status === 'ACTIVE'),
    }
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse bg-white rounded-lg h-48 shadow" />
        ))}
      </div>
    );
  }

  if (!agreements?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">No Active Tenants</h3>
        <p className="text-gray-600">
          You don't have any active rental agreements at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agreements.map((agreement: RentalAgreement) => (
        <TenantCard
          key={agreement._id}
          tenant={agreement.tenant}
          agreement={agreement}
        />
      ))}
    </div>
  );
}