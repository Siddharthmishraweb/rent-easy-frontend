import { Room } from '@/types/property';
import Image from 'next/image';
import { useState } from 'react';
import AssignTenantModal from './AssignTenantModal';
import Button from '@/components/shared/Button';

interface RoomCardProps {
  room: Room;
  onAssignTenant: (roomId: string, tenantData: any) => Promise<void>;
  onVacateTenant: (roomId: string) => Promise<void>;
  isOwner: boolean;
}

export default function RoomCard({
  room,
  onAssignTenant,
  onVacateTenant,
  isOwner
}: RoomCardProps) {
  const [showAssignModal, setShowAssignModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        {room.images?.[0] && (
          <Image
            src={room.images[0]}
            alt={room.roomNumber}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Room {room.roomNumber}</h3>
          <span className={`text-sm px-2 py-1 rounded ${
            room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {room.isAvailable ? 'Available' : 'Occupied'}
          </span>
        </div>

        <p className="text-gray-600">{room.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span>{room.roomType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rent:</span>
            <span>₹{room.rent}/month</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Size:</span>
            <span>{room.roomSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Floor:</span>
            <span>{room.floorNumber}</span>
          </div>
        </div>

        {room.amenities && room.amenities.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Amenities:</h4>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {isOwner && (
          <div className="mt-4 space-y-2">
            {room.isAvailable ? (
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setShowAssignModal(true)}
              >
                Assign Tenant
              </Button>
            ) : (
              <Button
                variant="danger"
                className="w-full"
                onClick={() => onVacateTenant(room._id)}
              >
                Vacate Room
              </Button>
            )}
          </div>
        )}
      </div>

      {showAssignModal && (
        <AssignTenantModal
          roomId={room._id}
          onSubmit={onAssignTenant}
          onClose={() => setShowAssignModal(false)}
        />
      )}
    </div>
  );
}