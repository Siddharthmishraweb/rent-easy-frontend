import React from 'react';
import Link from 'next/link';
import Button from './Button';

const LoginBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Try Different User Roles</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Test credentials:
            <br />
            Admin: admin@renteasy.com / admin123
            <br />
            Owner: owner@renteasy.com / owner123
            <br />
            Tenant: tenant@renteasy.com / tenant123
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/auth/register">
            <Button variant="secondary">Register</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="primary">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;