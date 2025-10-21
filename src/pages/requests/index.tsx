import React from 'react';
import { motion } from 'framer-motion';
import { useRequests } from '@/hooks/useRequests';
import { Button } from '@/components/shared/Button';
import { Card, CardBody } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Spinner } from '@/components/shared/Spinner';
import { useAuth } from '@/contexts/AuthContext';
import { CreateRequestModal } from '@/components/complaint/CreateRequestModal';

const RequestsPage = () => {
  const { data: requests, isLoading, error } = useRequests();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Maintenance Requests</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Create New Request
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error loading requests. Please try again.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests?.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardBody>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{request.title}</h3>
                    <Badge color={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {request.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <span>Property: {request.property.name}</span>
                    <span>
                      Created: {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {request.status === 'completed' && request.resolution && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Resolution: {request.resolution}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {requests?.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No Maintenance Requests</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first maintenance request using the button above
          </p>
        </div>
      )}

      <CreateRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RequestsPage;