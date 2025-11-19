'use client';

import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function ActionButton({
  onClick,
  label,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = ''
}: ActionButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  };
  
  // Disabled styles
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      type="button"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}

// Predefined action buttons
export function AddButton(props: Omit<ActionButtonProps, 'label' | 'variant'>) {
  return (
    <ActionButton
      label="Add Article"
      variant="primary"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      }
      {...props}
    />
  );
}

export function EditButton(props: Omit<ActionButtonProps, 'label' | 'variant'>) {
  return (
    <ActionButton
      label="Edit"
      variant="secondary"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      }
      {...props}
    />
  );
}

export function DeleteButton(props: Omit<ActionButtonProps, 'label' | 'variant'>) {
  return (
    <ActionButton
      label="Delete"
      variant="danger"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      }
      {...props}
    />
  );
}