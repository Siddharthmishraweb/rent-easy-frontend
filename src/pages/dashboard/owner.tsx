import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import PropertyList from '../../components/owner/PropertyList';
import ComplaintsList from '@/components/shared/ComplaintsList';
import PaymentOverview from '@/components/owner/PaymentOverview';
import TenantList from '@/components/owner/TenantList';

export default function OwnerDashboard() {
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

  const tabs = [
    { id: 'properties', label: 'Properties' },
    { id: 'tenants', label: 'Tenants' },
    { id: 'payments', label: 'Payments' },
    { id: 'complaints', label: 'Complaints' },
  ];

  return (
    <DashboardLayout>
      <div className="transition-colors duration-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Owner Dashboard</h1>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm
                ${activeTab === tab.id 
                  ? 'bg-primary-500 dark:bg-primary-600 text-white shadow hover:bg-primary-600 dark:hover:bg-primary-700 ring-2 ring-primary-500/20' 
                  : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-700 transition-colors duration-200">
          {activeTab === 'properties' && <PropertyList ownerId={user._id} />}
          {activeTab === 'tenants' && <TenantList ownerId={user._id} />}
          {activeTab === 'payments' && <PaymentOverview ownerId={user._id} />}
          {activeTab === 'complaints' && <ComplaintsList ownerId={user._id} userType="owner" />}
        </div>
      </div>
    </DashboardLayout>
  );
}
