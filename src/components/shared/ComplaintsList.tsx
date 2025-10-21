import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';

interface Complaint {
  _id: string;
  agreement: {
    _id: string;
    property: {
      title: string;
    };
    tenant: {
      name: string;
      email: string;
    };
    owner: {
      name: string;
      email: string;
    };
  };
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  images: string[];
  createdAt: string;
  updatedAt: string;
  resolution?: string;
}

interface ComplaintsListProps {
  ownerId?: string;
  tenantId?: string;
  userType: 'owner' | 'tenant';
}

const StatusBadge: React.FC<{ status: Complaint['status'] }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'OPEN':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'RESOLVED':
        return <FiCheckCircle className="w-4 h-4" />;
      case 'IN_PROGRESS':
        return <FiClock className="w-4 h-4" />;
      case 'OPEN':
        return <FiAlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {getStatusIcon()}
      {status}
    </span>
  );
};

const PriorityBadge: React.FC<{ priority: Complaint['priority'] }> = ({ priority }) => {
  const getColor = () => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getColor()}`}>
      {priority}
    </span>
  );
};

export default function ComplaintsList({ userType, ownerId, tenantId }: ComplaintsListProps) {
  const { data: complaints, isLoading } = useQuery(['complaints', { userType, ownerId, tenantId }], async () => {
    const params = userType === 'owner' ? { ownerId } : { tenantId };
    const response = await axios.get<Complaint[]>('/api/complaints', { params });
    return response.data;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-lg shadow-sm p-6">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!complaints?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Complaints</h3>
        <p className="text-gray-600">
          {userType === 'owner'
            ? 'No complaints have been filed for your properties'
            : "You haven't filed any complaints yet"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {complaints.map((complaint) => (
        <div
          key={complaint._id}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
            <div className="space-y-3 flex-1">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-lg">
                  {complaint.agreement.property.title}
                </h4>
                <StatusBadge status={complaint.status} />
              </div>

              <p className="text-gray-600">{complaint.description}</p>

              {complaint.images.length > 0 && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {complaint.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Complaint image ${index + 1}`}
                      className="h-20 w-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              {complaint.resolution && complaint.status === 'RESOLVED' && (
                <div className="mt-4 bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">
                    <strong>Resolution:</strong> {complaint.resolution}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end space-y-2 min-w-[150px]">
              <PriorityBadge priority={complaint.priority} />
              <div className="text-sm text-gray-500">
                Filed on {format(new Date(complaint.createdAt), 'MMM d, yyyy')}
              </div>
              {userType === 'owner' ? (
                <div className="text-sm text-gray-600">
                  by {complaint.agreement.tenant.name}
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  to {complaint.agreement.owner.name}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}