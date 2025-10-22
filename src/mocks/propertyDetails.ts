export const mockPropertyDetailsResponse = {
  success: true,
  message: "Get property by id successfully!",
  data: {
    _id: "68f5f0952c35729e54e0cc82",
    ownerId: {
      _id: "68f5f0952c35729e54e0cc7b",
      userId: {
        _id: "68f5f0952c35729e54e0cc64",
        name: "Rajesh Kumar",
        isProfileVerified: false,
        email: "rajesh.kumar@example.com",
        phone: "9876543210",
        role: "OWNER",
        kycVerified: false
      },
      ownedProperties: [],
      penaltyPercentPerDay: 1
    },
    addressId: {
      userId: "68f5f0952c35729e54e0cc64",
      state: "Maharashtra",
      city: "Mumbai",
      pincode: "400053",
      fullAddress: "456, Green Valley, Andheri West, Mumbai",
      geoLocation: {
        type: "Point",
        coordinates: [72.8324, 19.1281]
      }
    },
    description: "Luxurious 3BHK apartment with modern amenities",
    propertyName: "Green Valley Apartments",
    propertyType: "flat",
    bhkType: "3BHK",
    size: 1200,
    floor: 5,
    totalFloors: 15,
    availableFrom: "2025-10-20T08:19:33.467Z",
    preferredTenant: "Family",
    parking: true,
    features: ["AC", "Lift", "24x7 Security", "Power Backup", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    ],
    isActive: true,
    isArchived: false,
    highlights: ["Premium Location", "Spacious Rooms", "Modern Amenities"],
    uniquePropertyCode: "MH-MUM-001-1228",
    furnishing: "fully-furnished",
    rating: 0,
    minAmount: 35000,
    maxAmount: 40000,
    rooms: [
      {
        _id: "68f5f0952c35729e54e0cc90",
        propertyId: "68f5f0952c35729e54e0cc82",
        roomNumber: "3",
        roomType: "Single",
        description: "Spacious room with attached bathroom",
        rent: 23123,
        rentDueDay: 5,
        maintenanceCharge: {
          amount: 1000,
          frequency: "monthly"
        },
        securityDeposit: {
          amount: 40211,
          frequency: "monthly"
        },
        otherCharges: 500,
        isAvailable: true,
        amenities: ["AC", "Lift", "24x7 Security"],
        roomSize: "174 sq ft",
        floorNumber: 4,
        images: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"
        ],
        addressId: "68f5f0952c35729e54e0cc8e",
        rating: 0,
        rentalHistory: []
      },
      {
        _id: "68f5f0952c35729e54e0cc8c",
        propertyId: "68f5f0952c35729e54e0cc82",
        roomNumber: "2",
        roomType: "Suite",
        description: "Spacious room with attached bathroom",
        rent: 18830,
        rentDueDay: 5,
        maintenanceCharge: {
          amount: 1000,
          frequency: "monthly"
        },
        securityDeposit: {
          amount: 46562,
          frequency: "monthly"
        },
        otherCharges: 500,
        isAvailable: true,
        amenities: ["AC", "Lift", "24x7 Security"],
        roomSize: "121 sq ft",
        floorNumber: 2,
        images: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"
        ],
        addressId: "68f5f0952c35729e54e0cc8a",
        rating: 0,
        rentalHistory: []
      },
      {
        _id: "68f5f0952c35729e54e0cc88",
        propertyId: "68f5f0952c35729e54e0cc82",
        roomNumber: "1",
        roomType: "Double",
        description: "Spacious room with attached bathroom",
        rent: 21936,
        rentDueDay: 5,
        maintenanceCharge: {
          amount: 1000,
          frequency: "monthly"
        },
        securityDeposit: {
          amount: 36680,
          frequency: "monthly"
        },
        otherCharges: 500,
        isAvailable: true,
        amenities: ["AC", "Lift", "24x7 Security"],
        roomSize: "248 sq ft",
        floorNumber: 2,
        images: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"
        ],
        addressId: "68f5f0952c35729e54e0cc85",
        rating: 0,
        rentalHistory: []
      }
    ]
  }
};