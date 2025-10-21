import { LoginResponse, User } from '../types/api';
import { FLAG_USE_BACKEND } from '../data/properties';
import { mockLogin, mockRegister } from '../data/auth';
import api from './api';

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
    const token = btoa(JSON.stringify({ userId: user._id, role: user.role }));

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
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
      _id: Math.random().toString(36).substr(2, 9),
      ...userData
    };

    // Create mock token
    const token = btoa(JSON.stringify({ userId: newUser._id, role: newUser.role }));

    return {
      token,
      user: {
        _id: newUser._id,
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
      token: btoa(JSON.stringify({ userId: user._id, role: user.role })),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    };
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const { userId } = JSON.parse(atob(token));
      const user = Object.values(mockUsers).find(u => u._id === userId);
      
      if (!user) return null;

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
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

  logout() {
    localStorage.removeItem('token');
  }
};