import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    
    pageNumbers.push(1);
    
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    if (rangeStart > 2) {
      pageNumbers.push('...');
    }
    
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i);
    }
    
    if (rangeEnd < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-blue-300 bg-white text-sm font-medium
            ${currentPage === 1 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-500 hover:bg-blue-50 cursor-pointer'}`}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft size={16} />
        </button>
        
        {renderPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${currentPage === page
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-blue-300 text-gray-500 hover:bg-blue-50'}`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="relative inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-sm font-medium text-gray-700"
            >
              {page}
            </span>
          )
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-blue-300 bg-white text-sm font-medium
            ${currentPage === totalPages 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-500 hover:bg-blue-50 cursor-pointer'}`}
        >
          <span className="sr-only">Next</span>
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;