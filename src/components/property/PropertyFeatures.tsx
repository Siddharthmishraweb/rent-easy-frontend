import React from 'react';
import {
  HomeIcon,
  WifiIcon,
  TvIcon,
  KeyIcon,
  ShieldCheckIcon,
  FireIcon,
  BoltIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';

interface Feature {
  name: string;
  description?: string;
  icon: React.ElementType;
}

interface PropertyFeaturesProps {
  features: string[];
  className?: string;
}

const featureIcons: { [key: string]: Feature } = {
  'Furnished': {
    name: 'Furnished',
    description: 'Fully furnished accommodation',
    icon: HomeIcon,
  },
  'WiFi': {
    name: 'WiFi',
    description: 'High-speed internet connection',
    icon: WifiIcon,
  },
  'TV': {
    name: 'TV',
    description: 'Television provided',
    icon: TvIcon,
  },
  'Security': {
    name: 'Security',
    description: '24/7 security service',
    icon: ShieldCheckIcon,
  },
  'Parking': {
    name: 'Parking',
    description: 'Dedicated parking space',
    icon: KeyIcon,
  },
  'Gas': {
    name: 'Gas',
    description: 'Gas connection available',
    icon: FireIcon,
  },
  'Electricity': {
    name: 'Electricity',
    description: 'Electricity backup',
    icon: BoltIcon,
  },
  'Water': {
    name: 'Water',
    description: '24/7 water supply',
    icon: BeakerIcon,
  },
};

export const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  features,
  className = '',
}) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {features.map((feature) => {
        const featureInfo = featureIcons[feature] || {
          name: feature,
          icon: HomeIcon,
        };

        return (
          <div
            key={feature}
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0">
              <featureInfo.icon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{featureInfo.name}</p>
              {featureInfo.description && (
                <p className="text-xs text-gray-500">{featureInfo.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};