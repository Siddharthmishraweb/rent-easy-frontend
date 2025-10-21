import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RentedProperties from '../../components/tenant/RentedProperties';
import PaymentHistory from '@/components/tenant/PaymentHistory';
import RentPayment from '@/components/tenant/RentPayment';
import ComplaintForm from '@/components/tenant/ComplaintForm';

export default function TenantDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('properties');

  if (!user?._id) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mb-4 transition-colors duration-200"></div>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-200">Tenant Dashboard</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm
              ${activeTab === 'properties' ? 
                'bg-primary-500 dark:bg-primary-600 text-white shadow hover:bg-primary-600 dark:hover:bg-primary-700 ring-2 ring-primary-500/20' : 
                'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
              }`}
          >
            My Rentals
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm
              ${activeTab === 'payments' ? 
                'bg-primary-500 dark:bg-primary-600 text-white shadow hover:bg-primary-600 dark:hover:bg-primary-700 ring-2 ring-primary-500/20' : 
                'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
              }`}
          >
            Payments
          </button>
          <button 
            onClick={() => setActiveTab('complaints')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm
              ${activeTab === 'complaints' ? 
                'bg-primary-500 dark:bg-primary-600 text-white shadow hover:bg-primary-600 dark:hover:bg-primary-700 ring-2 ring-primary-500/20' : 
                'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
              }`}
          >
            Raise Complaint
          </button>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-700 transition-colors duration-200">
          {activeTab === 'properties' && <RentedProperties tenantId={user._id} />}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <RentPayment tenantId={user._id} />
              <PaymentHistory tenantId={user._id} />
            </div>
          )}
          {activeTab === 'complaints' && <ComplaintForm tenantId={user._id} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
