import api from './api';

// Types
export interface Complaint {
  id: string;
  propertyId: string;
  userId: string;
  category: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  resolutionNotes?: string;
}

export interface CreateComplaintDTO {
  propertyId: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  attachments?: File[];
}

// API functions
export const complaintService = {
  getComplaints: () => 
    api.get<Complaint[]>('/api/complaints'),

  getPropertyComplaints: (propertyId: string) => 
    api.get<Complaint[]>(`/api/properties/${propertyId}/complaints`),

  createComplaint: async (data: CreateComplaintDTO) => {
    const formData = new FormData();
    formData.append('propertyId', data.propertyId);
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('priority', data.priority);

    if (data.attachments) {
      data.attachments.forEach(file => {
        formData.append('attachments', file);
      });
    }

    return api.post<Complaint>('/api/complaints', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateComplaint: (complaintId: string, data: Partial<Complaint>) => 
    api.put<Complaint>(`/api/complaints/${complaintId}`, data),

  resolveComplaint: (complaintId: string, resolutionNotes: string) => 
    api.post<Complaint>(`/api/complaints/${complaintId}/resolve`, { resolutionNotes }),

  closeComplaint: (complaintId: string) => 
    api.post<Complaint>(`/api/complaints/${complaintId}/close`),
};