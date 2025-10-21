import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Skeleton, SkeletonText } from '@/components/shared/Skeleton';
import { config } from '@/config';
import { formatDate, formatCurrency } from '@/utils/helpers';

interface TenantRecord {
  id: string;
  propertyId: string;
  propertyName: string;
  tenantId: string;
  tenantName: string;
  tenantImage: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  status: 'active' | 'completed' | 'terminated';
}

interface PropertyRentalHistoryProps {
  userId: string;
}

const statusColors = {
  active: 'green' as const,
  completed: 'gray' as const,
  terminated: 'red' as const,
};

export const PropertyRentalHistory: React.FC<PropertyRentalHistoryProps> = ({ userId }) => {
  const [history, setHistory] = React.useState<TenantRecord[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (config.useBackend) {
          const response = await fetch(`${config.apiUrl}/api/agreements/owner/${userId}`);
          const data = await response.json();
          setHistory(data);
        } else {
          // Mock data for development
          setHistory([
            {
              id: '1',
              propertyId: 'p1',
              propertyName: 'Sunshine Apartments',
              tenantId: 't1',
              tenantName: 'John Doe',
              tenantImage: '/images/tenant-1.jpg',
              startDate: '2025-01-01',
              endDate: '2025-12-31',
              monthlyRent: 25000,
              status: 'active',
            },
            {
              id: '2',
              propertyId: 'p2',
              propertyName: 'Green Valley Residency',
              tenantId: 't2',
              tenantName: 'Jane Smith',
              tenantImage: '/images/tenant-2.jpg',
              startDate: '2024-01-01',
              endDate: '2024-12-31',
              monthlyRent: 20000,
              status: 'completed',
            },
          ]);
        }
      } catch (err) {
        setError('Failed to load rental history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (error) {
    return (
      <Card>
        <CardBody>
          <div className="text-center text-red-600">{error}</div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Property Rental History</h2>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-grow">
                  <SkeletonText lines={3} />
                </div>
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No rental history found
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                {/* Tenant Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={record.tenantImage}
                    alt={record.tenantName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{record.propertyName}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Tenant: {record.tenantName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(record.startDate)} - {formatDate(record.endDate)}
                      </p>
                      <p className="text-lg font-semibold mt-2">
                        {formatCurrency(record.monthlyRent)}/month
                      </p>
                    </div>
                    <Badge color={statusColors[record.status]} variant="soft">
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};