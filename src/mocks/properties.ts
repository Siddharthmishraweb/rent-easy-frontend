import { mockCities, mockPropertyTypes, mockAmenities } from './metadata';

// Mock room data
const mockRooms = [
  {
    _id: 'room1',
    name: 'Master Bedroom',
    description: 'Spacious master bedroom with attached bathroom',
    type: 'MASTER',
    rent: 15000,
    securityDeposit: 30000,
    area: 300,
    furnishing: 'FURNISHED',
    maxOccupancy: 2,
    status: 'AVAILABLE',
    images: ['https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg'],
    features: ['Attached Bathroom', 'Walk-in Closet', 'Balcony'],
    createdAt: '2023-10-01T10:00:00.000Z',
    updatedAt: '2023-10-01T10:00:00.000Z'
  },
  {
    _id: 'room2',
    name: 'Single Room',
    description: 'Cozy single room perfect for students',
    type: 'SINGLE',
    rent: 10000,
    securityDeposit: 20000,
    area: 200,
    furnishing: 'SEMI_FURNISHED',
    maxOccupancy: 1,
    status: 'AVAILABLE',
    images: ['https://example.com/room2-img1.jpg'],
    features: ['Study Table', 'Single Bed', 'Storage'],
    createdAt: '2023-10-01T10:00:00.000Z',
    updatedAt: '2023-10-01T10:00:00.000Z'
  }
];

export const mockProperties = [
  {
    _id: 'prop1',
    name: 'Luxury Apartment in Whitefield',
    description: 'Beautiful 3BHK apartment with modern amenities and great view',
    address: {
      street: '123 Palm Grove',
      locality: 'Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066'
    },
    type: 'apartment',
    configuration: {
      bedrooms: 3,
      bathrooms: 2,
      balconies: 2,
      superArea: 1500,
      carpetArea: 1200
    },
    rent: 35000,
    securityDeposit: 100000,
    availableFrom: '2023-11-01',
    furnishingStatus: 'fully-furnished',
    amenities: ['Air Conditioning', 'Parking', '24/7 Security', 'Power Backup', 'Lift'],
    images: [
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg',
      'https://example.com/property1-img2.jpg'
    ],
    owner: {
      _id: 'owner-123',
      name: 'Property Owner',
      email: 'owner@renteasy.com',
      phone: '+919876543211'
    },
    status: 'available',
    preferredTenants: ['family', 'working-professionals'],
    rules: [
      'No pets allowed',
      'No smoking inside the apartment',
      'Visitors allowed only till 10 PM'
    ],
    rooms: mockRooms,
    reviews: [],
    createdAt: '2023-10-01T10:00:00.000Z',
    updatedAt: '2023-10-01T10:00:00.000Z'
  },
  {
    _id: 'prop2',
    name: 'Cozy 2BHK in Koramangala',
    description: 'Well-maintained apartment in prime location near tech parks',
    address: {
      street: '456 Green Valley',
      locality: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034'
    },
    type: 'apartment',
    configuration: {
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      superArea: 1200,
      carpetArea: 1000
    },
    rent: 28000,
    securityDeposit: 84000,
    availableFrom: '2023-11-15',
    furnishingStatus: 'semi-furnished',
    amenities: ['Parking', '24/7 Security', 'Power Backup', 'Gym', 'Swimming Pool'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg'
    ],
    owner: {
      _id: 'owner-123',
      name: 'Property Owner',
      email: 'owner@renteasy.com',
      phone: '+919876543211'
    },
    status: 'available',
    preferredTenants: ['family', 'working-professionals', 'students'],
    rules: [
      'No loud music after 11 PM',
      'Monthly maintenance charges extra'
    ],
    rooms: mockRooms,
    reviews: [],
    createdAt: '2023-10-05T15:30:00.000Z',
    updatedAt: '2023-10-05T15:30:00.000Z'
  },
  {
    _id: 'prop3',
    name: 'Independent Villa in Indiranagar',
    description: 'Spacious 4BHK villa with garden and modern amenities',
    address: {
      street: '789 Royal Palm',
      locality: 'Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038'
    },
    type: 'villa',
    configuration: {
      bedrooms: 4,
      bathrooms: 4,
      balconies: 2,
      superArea: 3000,
      carpetArea: 2400
    },
    rent: 75000,
    securityDeposit: 200000,
    availableFrom: '2023-12-01',
    furnishingStatus: 'fully-furnished',
    amenities: [
      'Air Conditioning',
      'Parking',
      '24/7 Security',
      'Power Backup',
      'Garden',
      'Modular Kitchen',
      'CCTV'
    ],
    images: [
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg',
      'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg',
      'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg'
    ],
    owner: {
      _id: 'owner-456',
      name: 'Another Owner',
      email: 'another.owner@renteasy.com',
      phone: '+919876543213'
    },
    status: 'available',
    preferredTenants: ['family'],
    rules: [
      'No commercial use',
      'No pets allowed',
      'Background verification mandatory'
    ],
    rooms: mockRooms,
    reviews: [],
    createdAt: '2023-10-10T09:15:00.000Z',
    updatedAt: '2023-10-10T09:15:00.000Z'
  }
];