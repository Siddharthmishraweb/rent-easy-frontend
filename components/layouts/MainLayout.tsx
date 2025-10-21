import React from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function MainLayout({
  children,
  title = 'RentEasy - Find Your Perfect Rental',
  description = 'Find your perfect rental property with RentEasy. Browse apartments, houses, and rooms with verified listings and secure payments.',
  showHeader = true,
  showFooter = true,
}: MainLayoutProps) {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content={theme === 'dark' ? '#1f2937' : '#ffffff'} />
      </Head>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="fixed inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col flex-1 z-10">
        {showHeader && <Header />}
        
        <AnimatePresence mode="wait">
          <motion.main
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {showFooter && <Footer />}
      </div>

      {/* Toast Container - Add if using react-hot-toast */}
      <div id="toast-container" />
    </div>
  );
}