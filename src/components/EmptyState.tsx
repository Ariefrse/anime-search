import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4 dark:bg-gray-800">
        <SearchX size={40} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-black mb-2 dark:text-white">No results found</h3>
      <p className="text-gray-500 max-w-md mx-auto dark:text-gray-400">
        We couldn't find any anime matching your search. Try different keywords or check your spelling.
      </p>
    </div>
  );
};

export default EmptyState;