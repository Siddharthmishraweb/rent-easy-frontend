import React from 'react';
import { motion } from 'framer-motion';
import { useRentalAgreement } from '@/hooks/useRentalAgreement';
import Button from '@/components/shared/Button';
import { Card, CardBody } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Spinner } from '@/components/shared/Spinner';
import { useRouter } from 'next/router';
import type { RentalAgreement } from '@/types/api';

const AgreementDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: agreement, isLoading, error } = useRentalAgreement(id as string);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'expired':
        return 'red';
      case 'draft':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error loading agreement details. Please try again.
        </div>
      ) : agreement ? (
        <div className="max-w-4xl mx-auto">
          {/* Agreement Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                Rental Agreement
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Agreement ID: {agreement.id}
              </p>
            </div>
            <Badge color={getStatusColor(agreement.status)} size="lg">
              {agreement.status}
            </Badge>
          </div>

          {/* Property and Parties Info */}
          <Card className="mb-6">
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600 dark:text-gray-400">Name: </span>
                      {agreement.property.propertyName}
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400">Address: </span>
                      {agreement.property.location.address}
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400">Room/Unit: </span>
                      {agreement.property.rooms?.[0]?.name || 'N/A'}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Parties</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600 dark:text-gray-400">Owner: </span>
                      {agreement.ownerId}
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400">Tenant: </span>
                      {agreement.tenant.name}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Agreement Details */}
          <Card className="mb-6">
            <CardBody>
              <h3 className="text-lg font-semibold mb-4">Agreement Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p><span className="text-gray-600">Start Date:</span> {new Date(agreement.startDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">End Date:</span> {new Date(agreement.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p><span className="text-gray-600">Monthly Rent:</span> ₹{agreement.rentAmount}</p>
                  <p><span className="text-gray-600">Security Deposit:</span> ₹{agreement.securityDeposit}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Actions */}
          <Card>
            <CardBody>
              <div className="flex gap-4">
                <Button variant="primary" onClick={() => console.log('Download')}>
                  Download Agreement
                </Button>
                {agreement.status === 'ACTIVE' && (
                  <Button variant="danger" onClick={() => console.log('Terminate')}>
                    Terminate Agreement
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>

          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/agreements')}
            >
              Back to Agreements
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Agreement Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The rental agreement you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/agreements')}>
            View All Agreements
          </Button>
        </div>
      )}
    </div>
  );
};

export default AgreementDetailPage;