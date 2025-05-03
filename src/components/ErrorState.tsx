import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4 dark:bg-gray-800">
        <AlertTriangle size={40} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-black mb-2 dark:text-white">Oops! Something went wrong</h3>
      <p className="text-gray-500 max-w-md mx-auto dark:text-gray-400">{message}</p>
    </div>
  );
};

export default ErrorState;