import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <SearchX size={40} className="text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        We couldn't find any anime matching your search. Try different keywords or check your spelling.
      </p>
    </div>
  );
};

export default EmptyState;