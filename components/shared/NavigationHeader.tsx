import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiHome, FiKey, FiFileText, FiUser } from 'react-icons/fi';

const NavigationHeader = () => {
  const router = useRouter();

  const navItems = [
    { href: '/properties', label: 'Properties', icon: FiHome },
    { href: '/rooms', label: 'Rooms', icon: FiKey },
    { href: '/agreements', label: 'Agreements', icon: FiFileText },
    { href: '/profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-800 shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary-600">
            RentEasy
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = router.pathname.startsWith(item.href);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:text-primary-400 dark:hover:bg-primary-900/10'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;