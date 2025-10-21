import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FiHome, FiFileText, FiDollarSign, FiUser, FiMenu, FiMoon, FiSun, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Variants } from 'framer-motion';

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -5 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0, 
    y: -5,
    transition: { duration: 0.2 }
  }
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b border-gray-200/50 dark:border-dark-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">RentEasy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  router.pathname === '/'
                    ? 'bg-primary-100/80 text-primary-700 dark:bg-primary-900/80 dark:text-primary-100'
                    : 'text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-dark-700/80'
                }`}
              >
                <motion.span 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiHome />
                  Home
                </motion.span>
              </Link>
            </motion.div>

            <div className="flex items-center bg-gray-100/80 dark:bg-dark-700/80 rounded-lg p-1">
              <Link 
                href="/properties"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  router.pathname.startsWith('/properties') && !router.pathname.includes('list')
                    ? 'bg-white dark:bg-dark-600 text-primary-600 shadow-sm'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-200'
                }`}
              >
                <motion.span 
                  className="flex items-center gap-2 whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiHome />
                  Properties
                </motion.span>
              </Link>

              <Link 
                href="/rooms"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  router.pathname.startsWith('/rooms')
                    ? 'bg-white dark:bg-dark-600 text-primary-600 shadow-sm'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-200'
                }`}
              >
                <motion.span 
                  className="flex items-center gap-2 whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiDollarSign />
                  Rooms
                </motion.span>
              </Link>
            </div>

            {user && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/agreements"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      router.pathname.startsWith('/agreements')
                        ? 'bg-primary-100/80 text-primary-700 dark:bg-primary-900/80 dark:text-primary-100'
                        : 'text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-dark-700/80'
                    }`}
                  >
                    <motion.span 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <FiFileText />
                      Agreements
                    </motion.span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/payments"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      router.pathname.startsWith('/payments')
                        ? 'bg-primary-100/80 text-primary-700 dark:bg-primary-900/80 dark:text-primary-100'
                        : 'text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-dark-700/80'
                    }`}
                  >
                    <motion.span 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <FiDollarSign />
                      Payments
                    </motion.span>
                  </Link>
                </motion.div>

                {user.role === 'OWNER' && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/properties/list"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        router.pathname === '/properties/list'
                          ? 'bg-primary-100/80 text-primary-700 dark:bg-primary-900/80 dark:text-primary-100'
                          : 'text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-dark-700/80'
                      }`}
                    >
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        List Property
                      </motion.span>
                    </Link>
                  </motion.div>
                )}
              </>
            )}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:bg-dark-700/80 transition-colors"
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </motion.button>

            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-dark-700/80 transition-colors"
                >
                  <FiUser />
                  <span>{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div 
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white/90 dark:bg-dark-800/90 backdrop-blur-lg ring-1 ring-black/5"
                    >
                      <div className="py-1">
                        <motion.div
                          variants={navItemVariants}
                          className="w-full"
                        >
                          <Link
                            href={`/dashboard/${user.role.toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-dark-700/80 transition-colors"
                          >
                            Dashboard
                          </Link>
                        </motion.div>
                        <motion.div
                          variants={navItemVariants}
                          className="w-full"
                        >
                          <button
                            onClick={handleLogout}
                            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                          >
                            Sign Out
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-dark-700/80 rounded-md transition-colors"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600/90 hover:bg-primary-700/90 rounded-md transition-colors backdrop-blur-sm"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:bg-dark-700/80 transition-colors"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FiMenu className="h-6 w-6" />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden pb-3 pt-2 overflow-hidden"
            >
            <Link 
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                router.pathname === '/'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <FiHome />
                Home
              </span>
            </Link>

            {user && (
              <>
                <Link 
                  href="/agreements"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname.startsWith('/agreements')
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FiFileText />
                    Agreements
                  </span>
                </Link>

                <Link 
                  href="/payments"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname.startsWith('/payments')
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FiDollarSign />
                    Payments
                  </span>
                </Link>

                {user.role === 'OWNER' && (
                  <Link 
                    href="/properties/list"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      router.pathname === '/properties/list'
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    List Property
                  </Link>
                )}

                <Link
                  href={`/dashboard/${user.role.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <span className="flex items-center gap-2">
                    <FiLogOut />
                    Sign Out
                  </span>
                </button>
              </>
            )}

            {!user && (
              <div className="space-y-1 pt-2">
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="mt-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <>
                    <FiSun />
                    Light Mode
                  </>
                ) : (
                  <>
                    <FiMoon />
                    Dark Mode
                  </>
                )}
              </span>
            </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}