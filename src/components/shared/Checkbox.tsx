import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  isIndeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, isIndeterminate = false, className = '', ...props }, ref) => {
    const isError = !!error;

    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate, ref]);

    return (
      <div className={twMerge('flex items-start', className)}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className={twMerge(
              'h-4 w-4 rounded border-gray-300 text-primary-600',
              'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
              'cursor-pointer transition-colors duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              isError && 'border-red-600 dark:border-red-500'
            )}
            {...props}
          />
        </div>
        {(label || error || helperText) && (
          <div className="ml-2">
            {label && (
              <label
                className={twMerge(
                  'text-sm font-medium text-gray-700 dark:text-gray-300',
                  isError && 'text-red-600 dark:text-red-500',
                  props.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {label}
              </label>
            )}
            {(error || helperText) && (
              <p
                className={twMerge(
                  'mt-0.5 text-sm',
                  isError ? 'text-red-600 dark:text-red-500' : 'text-gray-500 dark:text-gray-400'
                )}
              >
                {error || helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);