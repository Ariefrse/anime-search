import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-pink-100 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-pink-300 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-gray-700 font-medium">Loading...</p>
    </div>
  );
};

export default LoadingState;