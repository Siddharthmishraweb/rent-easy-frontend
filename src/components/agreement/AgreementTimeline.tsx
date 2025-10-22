import React from 'react';
import { FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi';

interface TimelineEvent {
  id: string;
  type: 'CREATED' | 'SIGNED' | 'ACTIVE' | 'TERMINATED';
  date: string;
  actor?: {
    id: string;
    name: string;
    role: string;
  };
}

interface AgreementTimelineProps {
  events: TimelineEvent[];
}

export const AgreementTimeline: React.FC<AgreementTimelineProps> = ({ events }) => {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'CREATED':
        return <FiClock className="h-5 w-5 text-blue-500" />;
      case 'SIGNED':
        return <FiCheck className="h-5 w-5 text-green-500" />;
      case 'ACTIVE':
        return <FiCheck className="h-5 w-5 text-green-500" />;
      case 'TERMINATED':
        return <FiAlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getEventTitle = (event: TimelineEvent) => {
    switch (event.type) {
      case 'CREATED':
        return 'Agreement Created';
      case 'SIGNED':
        return `Signed by ${event.actor?.name}`;
      case 'ACTIVE':
        return 'Agreement Activated';
      case 'TERMINATED':
        return 'Agreement Terminated';
      default:
        return '';
    }
  };

  if (!events?.length) {
    return <p className="text-gray-500">No timeline events available.</p>;
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, idx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {idx !== events.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-white">
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">
                      {getEventTitle(event)}
                    </p>
                    {event.actor && (
                      <p className="text-xs text-gray-500">
                        {event.actor.role.toLowerCase()}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {new Date(event.date).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};