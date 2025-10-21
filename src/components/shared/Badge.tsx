import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'yellow' | 'blue' | 'green' | 'red' | 'gray';
  variant?: 'solid' | 'soft' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  rounded?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'gray',
  variant = 'soft',
  size = 'md',
  icon,
  rounded = true,
  className = '',
}) => {
  const colorClasses = {
    solid: {
      yellow: 'bg-yellow-500 text-white',
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      red: 'bg-red-500 text-white',
      gray: 'bg-gray-500 text-white',
    },
    soft: {
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    },
    outline: {
      yellow: 'border border-yellow-500 text-yellow-700 dark:text-yellow-400',
      blue: 'border border-blue-500 text-blue-700 dark:text-blue-400',
      green: 'border border-green-500 text-green-700 dark:text-green-400',
      red: 'border border-red-500 text-red-700 dark:text-red-400',
      gray: 'border border-gray-500 text-gray-700 dark:text-gray-400',
    },
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1 font-medium',
        colorClasses[variant][color],
        sizeClasses[size],
        rounded ? 'rounded-full' : 'rounded-md',
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
};
