import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const handleClear = () => {
    setQuery('');
  };
  
  return (
    <div className="relative max-w-[1200px] mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={20} className="text-pink-400" />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for anime..."
        className="w-full pl-10 pr-10 py-3 border border-gray-400/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-gray-400 shadow-sm text-gray-900 placeholder-gray-400 transition-all duration-200 bg-white"
        autoFocus
      />
      
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <X size={20} className="text-pink-400 hover:text-pink-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;