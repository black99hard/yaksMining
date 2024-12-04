import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  disabled,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200';
  const variantStyles = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-red-800 hover:bg-red-900 text-white',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 hover:scale-105'
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};