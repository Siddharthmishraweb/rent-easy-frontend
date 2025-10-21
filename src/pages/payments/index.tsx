import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import { FiCreditCard, FiDollarSign, FiCalendar, FiCheck, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Payments() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Mock data for development
  const mockPayments = [
    {
      _id: '1',
      agreement: {
        _id: 'a1',
        property: {
          title: 'Modern 2BHK Apartment',
          address: { city: 'Mumbai', street: 'Andheri West' },
        },
        tenant: {
          name: 'John Doe',
        },
        owner: {
          name: 'Jane Smith',
        },
        rentAmount: 25000,
      },
      amount: 25000,
      dueDate: '2025-11-01',
      status: 'PENDING',
      description: 'November 2025 Rent',
    },
    {
      _id: '2',
      agreement: {
        _id: 'a1',
        property: {
          title: 'Modern 2BHK Apartment',
          address: { city: 'Mumbai', street: 'Andheri West' },
        },
        tenant: {
          name: 'John Doe',
        },
        owner: {
          name: 'Jane Smith',
        },
        rentAmount: 25000,
      },
      amount: 25000,
      dueDate: '2025-10-01',
      status: 'PAID',
      paymentDate: '2025-10-01',
      transactionId: 'pay_abc123',
      description: 'October 2025 Rent',
    },
    // Add more mock payments as needed
  ];

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePayment = async (paymentId: string) => {
    try {
      // TODO: Replace with actual payment gateway integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Payment successful!');
    } catch (error) {
      toast.error('Payment failed');
    }
  };

  const handleDownloadReceipt = async (paymentId: string) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Receipt downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download receipt');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Rent Payments | RentEasy</title>
        <meta name="description" content="Manage your rent payments" />
      </Head>

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Rent Payments</h1>

        {/* Payment Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FiDollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-2xl font-semibold text-gray-900">₹50,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiCalendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Due This Month</p>
                <p className="text-2xl font-semibold text-gray-900">₹25,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <FiAlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="text-2xl font-semibold text-gray-900">₹0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Month Filter */}
        <div className="mb-8">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Payments List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user?.role === 'OWNER' ? 'Tenant' : 'Owner'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPayments.map((payment) => (
                <tr key={payment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.agreement.property.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.agreement.property.address.street}, {payment.agreement.property.address.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user?.role === 'OWNER' ? payment.agreement.tenant.name : payment.agreement.owner.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{payment.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </div>
                    {payment.paymentDate && (
                      <div className="text-sm text-gray-500">
                        Paid: {new Date(payment.paymentDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadgeClass(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {payment.status === 'PENDING' && user?.role === 'TENANT' ? (
                      <button
                        onClick={() => handlePayment(payment._id)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Pay Now
                      </button>
                    ) : payment.status === 'PAID' ? (
                      <button
                        onClick={() => handleDownloadReceipt(payment._id)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Download Receipt
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}