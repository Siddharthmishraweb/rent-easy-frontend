import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = false,
      variant = 'outlined',
      className = '',
      ...props
    },
    ref
  ) => {
    const isError = !!error;

    return (
      <div className={twMerge('relative', fullWidth && 'w-full', className)}>
        {label && (
          <label
            className={twMerge(
              'block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300',
              isError && 'text-red-600 dark:text-red-500'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(
              'block rounded-lg transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
              variant === 'outlined'
                ? 'border border-gray-300 dark:border-gray-600'
                : 'border-2 border-transparent bg-gray-100 dark:bg-gray-700',
              'text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500',
              isError &&
                'border-red-600 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500',
              startIcon ? 'pl-10' : 'pl-4',
              endIcon ? 'pr-10' : 'pr-4',
              'py-2',
              fullWidth && 'w-full',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              props.className
            )}
            {...props}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              {endIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={twMerge(
              'mt-1 text-sm',
              isError ? 'text-red-600 dark:text-red-500' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);