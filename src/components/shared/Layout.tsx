import React from 'react';
import Header from './Header';
import LoginBanner from './LoginBanner';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Enhanced grid background with subtle animation */}
      <div className="fixed inset-0 bg-grid bg-grid-pattern opacity-[0.03] dark:opacity-[0.02] pointer-events-none animate-[pulse_15s_ease-in-out_infinite]" />
      
      {/* Floating particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
      </div>
      
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="flex-1 relative z-10 mt-16"
        >
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 rounded-3xl blur-3xl pointer-events-none animate-[pulse_10s_ease-in-out_infinite]" />
          
          {/* Main content with glass effect */}
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="glass dark:glass-dark rounded-xl p-6">
              {children}
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
      
      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <LoginBanner />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}