import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import { FiFileText, FiUpload, FiDownload, FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Agreements() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Redirect if not logged in
  if (!user) {
    router.push('/auth/login?redirect=/agreements');
    return null;
  }

  // Mock data for development
  const mockAgreements = [
    {
      _id: '1',
      property: {
        _id: 'p1',
        title: 'Modern 2BHK Apartment',
        address: { city: 'Mumbai', street: 'Andheri West' },
        images: ['/property1.jpg'],
      },
      tenant: {
        _id: 't1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      owner: {
        _id: 'o1',
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
      startDate: '2025-11-01',
      endDate: '2026-10-31',
      rentAmount: 25000,
      securityDeposit: 50000,
      status: 'ACTIVE',
      signatures: {
        owner: true,
        tenant: true,
      },
      createdAt: '2025-10-15',
    },
    // Add more mock agreements as needed
  ];

  const agreements = mockAgreements.filter(
    agreement => selectedStatus === 'ALL' || agreement.status === selectedStatus
  );

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'TERMINATED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSign = async (agreementId: string) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Agreement signed successfully!');
    } catch (error) {
      toast.error('Failed to sign agreement');
    }
  };

  const handleDownload = async (agreementId: string) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Agreement downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download agreement');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Rental Agreements | RentEasy</title>
        <meta name="description" content="Manage your rental agreements" />
      </Head>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Rental Agreements</h1>
          {user.role === 'TENANT' && (
            <button
              onClick={() => router.push('/agreements/new')}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Request New Agreement
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {['ALL', 'DRAFT', 'PENDING', 'ACTIVE', 'TERMINATED'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Agreements List */}
        <div className="bg-white rounded-lg shadow">
          {agreements.length === 0 ? (
            <div className="p-8 text-center">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No agreements found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {user.role === 'TENANT'
                  ? 'Start by requesting a new rental agreement'
                  : 'No rental agreements available yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {user.role === 'OWNER' ? 'Tenant' : 'Owner'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agreements.map(agreement => (
                    <tr key={agreement._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={agreement.property.images[0] || '/placeholder.jpg'}
                              alt={agreement.property.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {agreement.property.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {agreement.property.address.street}, {agreement.property.address.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.role === 'OWNER' ? agreement.tenant.name : agreement.owner.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.role === 'OWNER' ? agreement.tenant.email : agreement.owner.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(agreement.startDate).toLocaleDateString()} -
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(agreement.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{agreement.rentAmount.toLocaleString()}/month
                        </div>
                        <div className="text-sm text-gray-500">
                          Deposit: ₹{agreement.securityDeposit.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadgeClass(agreement.status)}`}>
                          {agreement.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => router.push(`/agreements/${agreement._id}`)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <FiEye className="h-5 w-5" title="View" />
                          </button>
                          {agreement.status === 'PENDING' && (
                            <button
                              onClick={() => handleSign(agreement._id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <FiCheckCircle className="h-5 w-5" title="Sign" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDownload(agreement._id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <FiDownload className="h-5 w-5" title="Download" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}