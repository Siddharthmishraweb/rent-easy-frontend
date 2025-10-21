import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (variant === 'text' && !height) {
    style.height = '1em';
  }

  return <div style={style} className={twMerge(baseClasses, variantClasses[variant], animationClasses[animation], className)} />;
};

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
  animation = 'pulse',
}) => {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '75%' : '100%'}
          animation={animation}
        />
      ))}
    </div>
  );
};

interface SkeletonAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'md',
  className = '',
  animation = 'pulse',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <Skeleton
      variant="circular"
      className={twMerge(sizeClasses[size], className)}
      animation={animation}
    />
  );
};

interface SkeletonCardProps {
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = '',
  animation = 'pulse',
}) => {
  return (
    <div className={twMerge('p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm', className)}>
      <Skeleton variant="rectangular" height={200} className="mb-4" animation={animation} />
      <Skeleton variant="text" width="60%" className="mb-2" animation={animation} />
      <SkeletonText lines={2} animation={animation} />
    </div>
  );
};