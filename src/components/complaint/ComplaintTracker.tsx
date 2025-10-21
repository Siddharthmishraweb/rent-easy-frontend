import { useQuery } from 'react-query';
import api from '../../utils/axios';
import { Badge } from '../shared/Badge';
import { ErrorBoundary } from 'react-error-boundary';

interface TimelineEvent {
  id: string;
  date: string;
  description: string;
}

interface Complaint {
  id: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'cancelled';
  timeline: TimelineEvent[];
}

interface ComplaintTrackerProps {
  complaintId: string;
}

const fallbackData = {
  data: {
    id: '',
    status: 'pending' as const,
    timeline: []
  }
};

export default function ComplaintTracker({ complaintId }: ComplaintTrackerProps) {
  const { data: complaint, isLoading, error } = useQuery<{ data: Complaint }>(
    ['complaint', complaintId],
    () => api.get(`/complaints/${complaintId}`).catch(() => fallbackData),
    {
      retry: 1,
      refetchOnWindowFocus: false,
      initialData: fallbackData
    }
  );

  const getStatusColor = (status: Complaint['status']) => {
    const colors: Record<Complaint['status'], string> = {
      'pending': 'yellow',
      'in-progress': 'blue',
      'resolved': 'green',
      'cancelled': 'red'
    };
    return colors[status] || 'gray';
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="border rounded p-4 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold mb-4">Complaint Status</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Status:</span>
            <Badge 
              color={getStatusColor(complaint?.data.status || 'pending')}
              text={complaint?.data.status || 'pending'}
            />
          </div>
          <div className="space-y-2">
            <p className="font-medium">Timeline:</p>
            {complaint?.data.timeline.map((event) => (
              <div key={event.id} className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
