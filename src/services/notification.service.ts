import api from './api';

// Types
interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

// API functions
export const notificationService = {
  getUserNotifications: (userId: string) => api.get<Notification[]>(`/api/notifications/user/${userId}`),
  getUnreadCount: (userId: string) => api.get<{ count: number }>(`/api/notifications/user/${userId}/unread-count`),
  markAsRead: (notificationIds: string[]) => api.post('/api/notifications/mark-read', { notificationIds }),
};