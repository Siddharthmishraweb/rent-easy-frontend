import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import Loading from '../components/shared/Loading';

export const useProtectedRoute = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  return { user, loading };
};

export const useRedirectAuthenticated = (redirectTo = '/dashboard') => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const path = user.role === 'OWNER' ? `${redirectTo}/owner` : `${redirectTo}/tenant`;
      router.replace(path);
    }
  }, [user, loading, router, redirectTo]);

  return { user, loading };
};

export const withProtectedRoute = (WrappedComponent: React.ComponentType<any>, options?: { redirectTo?: string }) => {
  return function ProtectedRoute(props: any) {
    const { user, loading } = useProtectedRoute();
    const router = useRouter();

    if (loading) {
      return <Loading fullScreen />;
    }

    if (!user) {
      return null;
    }

    if (options?.redirectTo && router.pathname === options.redirectTo) {
      const path = user.role === 'OWNER' ? '/dashboard/owner' : '/dashboard/tenant';
      router.replace(path);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};