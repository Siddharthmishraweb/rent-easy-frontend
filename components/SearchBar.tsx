import { useState } from 'react';

interface SearchBarProps {
  onSearch: (params: {
    location: string;
    priceRange: string;
    propertyType: string;
  }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValues, setSearchValues] = useState({
    location: '',
    priceRange: '',
    propertyType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setSearchValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            name="location"
            placeholder="Enter location..."
            value={searchValues.location}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <select
            name="priceRange"
            value={searchValues.priceRange}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            style={{color: 'black'}}
          >
            <option value="" className='text-black' style={{color: 'black' }}>Select Price Range</option>
            <option value="0-5000">₹0 - ₹5,000</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
            <option value="20000+">₹20,000+</option>
          </select>
        </div>
        
        <div>
          <select
            name="propertyType"
            value={searchValues.propertyType}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="room">Room</option>
            <option value="pg">PG</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
