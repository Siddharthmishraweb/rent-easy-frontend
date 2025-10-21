import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/shared/Layout';

// Configure NProgress
NProgress.configure({ showSpinner: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  // Handle route changes and show progress bar
  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());

    return () => {
      Router.events.off('routeChangeStart', () => NProgress.start());
      Router.events.off('routeChangeComplete', () => NProgress.done());
      Router.events.off('routeChangeError', () => NProgress.done());
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-dark-900 dark:to-dark-950 text-gray-900 dark:text-gray-100 transition-all duration-200">
            <div className="noise-bg" /> {/* Add noise texture overlay */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'glass dark:glass-dark',
                style: {
                  background: 'var(--toaster-bg)',
                  color: 'var(--toaster-color)',
                },
                duration: 4000,
                success: {
                  iconTheme: {
                    primary: 'rgb(var(--color-primary))',
                    secondary: 'white',
                  },
                },
              }}
            />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
