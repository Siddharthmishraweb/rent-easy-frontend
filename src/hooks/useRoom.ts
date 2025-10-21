import { useState, useEffect } from 'react';
import { roomService } from '@/services/room.service';
import { Room } from '@/types/property';

export const useRoom = (roomId?: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (roomId) {
      fetchRoom(roomId);
    }
  }, [roomId]);

  const fetchRoom = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await roomService.getRoomById(id);
      setRoom(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch room');
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (roomData: Omit<Room, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await roomService.createRoom(roomData);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create room');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRoom = async (id: string, roomData: Partial<Room>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await roomService.updateRoom(id, roomData);
      if (id === roomId) {
        setRoom(response.data);
      }
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update room');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await roomService.deleteRoom(id);
      if (id === roomId) {
        setRoom(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete room');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const assignTenant = async (roomId: string, data: {
    tenantId: string;
    paymentSchedule: {
      frequency: 'monthly' | 'yearly';
      dueDay: number;
    };
    agreementEndDate: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await roomService.assignTenant(roomId, data);
      if (roomId === roomId) {
        setRoom(response.data);
      }
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign tenant');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const vacateTenant = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await roomService.vacateTenant(id);
      if (id === roomId) {
        setRoom(response.data);
      }
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to vacate tenant');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (id: string, images: FormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await roomService.uploadRoomImages(id, images);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload images');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      setLoading(true);
      setError(null);
      await roomService.deleteRoomImage(id, imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    room,
    loading,
    error,
    fetchRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    assignTenant,
    vacateTenant,
    uploadImages,
    deleteImage
  };
};