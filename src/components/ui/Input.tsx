import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`w-full px-3 py-2 bg-gray-900 border border-red-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
      {...props}
    />
  </div>
);