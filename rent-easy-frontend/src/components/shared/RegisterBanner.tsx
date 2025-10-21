import React from 'react';
import Link from 'next/link';
import Button from './Button';

const RegisterBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey with RentEasy</h2>
          <p className="text-xl mb-8">
            Join our growing community of property owners and tenants. Find your perfect rental property or list your property today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register?role=owner">
              <Button variant="secondary" size="lg">Register as Owner</Button>
            </Link>
            <Link href="/auth/register?role=tenant">
              <Button variant="secondary" size="lg">Register as Tenant</Button>
            </Link>
            <span className="text-white mx-4">or</span>
            <Link href="/auth/login">
              <Button variant="primary" size="lg">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBanner;