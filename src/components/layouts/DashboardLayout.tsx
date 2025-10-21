import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FiHome,
  FiUser,
  FiDollarSign,
  FiFileText,
  FiAlertCircle,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
} from 'react-icons/fi';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isOwner = user?.role === 'OWNER';

  const navItems = [
    {
      label: isOwner ? 'Properties' : 'My Rentals',
      href: isOwner ? '/dashboard/owner' : '/dashboard/tenant',
      icon: FiHome,
      active: router.pathname === `/dashboard/${isOwner ? 'owner' : 'tenant'}`,
    },
    {
      label: isOwner ? 'Tenants' : 'Payment History',
      href: '/payments',
      icon: FiDollarSign,
      active: router.pathname.startsWith('/payments'),
    },
    {
      label: 'Agreements',
      href: '/agreements',
      icon: FiFileText,
      active: router.pathname.startsWith('/agreements'),
    },
    {
      label: 'Complaints',
      href: '/complaints',
      icon: FiAlertCircle,
      active: router.pathname.startsWith('/complaints'),
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: FiUser,
      active: router.pathname === '/profile',
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 bottom-0 left-0 z-50
          w-72 bg-white dark:bg-dark-800
          border-r border-gray-200 dark:border-dark-700
          transform transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b dark:border-dark-700">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">RentEasy</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isOwner ? 'Owner Dashboard' : 'Tenant Dashboard'}
                </p>
              </div>
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 rounded-xl transition-all
                    ${
                      item.active
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                    }
                  `}
                >
                  <div
                    className={`
                      p-2 rounded-lg mr-3
                      ${item.active ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-dark-700'}
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* User Section */}
          <div className="p-6 border-t dark:border-dark-700">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name || ''}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <FiUser className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-900 dark:text-white">
                  {user?.name || 'Loading...'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email || 'Loading...'}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300"
              >
                {theme === 'dark' ? <FiSun className="w-5 h-5 mr-2" /> : <FiMoon className="w-5 h-5 mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={logout}
                className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <FiLogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-dark-900">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">R</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">RentEasy</h1>
          </Link>
          <button
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}