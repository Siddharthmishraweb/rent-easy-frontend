import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">About RentEasy</h1>
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
        <p className="mb-4">
          RentEasy is a comprehensive property rental management platform that simplifies the rental process 
          for both landlords and tenants. Our platform provides a seamless experience for property listing, 
          tenant matching, rental agreements, and payment management.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Our Features</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Easy property listing and management</li>
          <li>Digital rental agreements with e-signatures</li>
          <li>Secure online rent payments</li>
          <li>Automated rent reminders</li>
          <li>Property maintenance request tracking</li>
          <li>Tenant verification services</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Why Choose RentEasy?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">For Landlords</h3>
            <p>Manage multiple properties, screen tenants, and receive rent payments online.</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">For Tenants</h3>
            <p>Find verified properties, sign agreements digitally, and pay rent hassle-free.</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">For Agents</h3>
            <p>Connect with property owners and tenants, manage listings efficiently.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
          <p className="mb-4">Join thousands of satisfied users who have simplified their rental experience with RentEasy.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;