import { LoginResponse, User } from '../types/api';
import { FLAG_USE_BACKEND } from '../data/properties';
import api from './api';

type Role = 'OWNER' | 'TENANT' | 'ADMIN';

interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  profilePicture?: string;
}

const mockUsers: Record<string, MockUser> = {
  owner: {
    id: 'owner1',
    name: 'John Owner',
    email: 'owner@example.com',
    password: 'password123',
    role: 'OWNER',
    phone: '+1234567890'
  },
  tenant: {
    id: 'tenant1',
    name: 'Jane Tenant',
    email: 'tenant@example.com',
    password: 'password123',
    role: 'TENANT',
    phone: '+0987654321'
  }
};

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user with matching credentials
    const user = Object.values(mockUsers).find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Create mock token
    const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePicture: user.profilePicture
      }
    };
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
    role: Role;
    phone?: string;
  }): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    if (Object.values(mockUsers).some(user => user.email === userData.email)) {
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData
    };

    // Create mock token
    const token = btoa(JSON.stringify({ userId: newUser.id, role: newUser.role }));

    return {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone
      }
    };
  },

  async googleLogin(token: string): Promise<LoginResponse> {
    // For demo, we'll return the tenant user for any Google login
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.tenant;
    return {
      token: btoa(JSON.stringify({ userId: user.id, role: user.role })),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePicture: user.profilePicture
      }
    };
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const { userId } = JSON.parse(atob(token));
      const user = Object.values(mockUsers).find(u => u.id === userId);
      
      if (!user) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePicture: user.profilePicture
      };
    } catch {
      return null;
    }
  },

  async forgotPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = Object.values(mockUsers).find(u => u.email === email);
    if (!user) {
      throw new Error('No user found with this email');
    }
  },

  async resetPassword(token: string, password: string): Promise<void> {
    // TODO: Replace with actual API call
    // await api.post(`/auth/reset-password/${token}`, { password });

    // Mock password reset for development
    if (!token) throw new Error('Invalid token');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    // TODO: Replace with actual API call
    // await api.post('/auth/update-password', { currentPassword, newPassword });

    // Mock password update for development
    if (currentPassword !== 'password123') {
      throw new Error('Current password is incorrect');
    }
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  async updateProfile(userId: string, userData: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock profile update
    // In real app, this would be an API call
    return {
      id: userId,
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'TENANT',
      phone: userData.phone,
      profilePicture: userData.profilePicture
    };
  },

  logout() {
    localStorage.removeItem('token');
  }
};