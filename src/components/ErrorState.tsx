import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-red-100 p-4 rounded-full mb-4">
        <AlertTriangle size={40} className="text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 max-w-md mx-auto">{message}</p>
    </div>
  );
};

export default ErrorState;