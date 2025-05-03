import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import AnimeList from '../components/AnimeList';
import Pagination from '../components/Pagination';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { searchAnime } from '../services/animeService';
import { Anime } from '../types/anime';

const STORAGE_KEY = 'animeSearchState';
const DEBOUNCE_DELAY = 250;

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).query : '';
    } catch {
      return '';
    }
  });
  
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).currentPage : 1;
    } catch {
      return 1;
    }
  });
  const [totalPages, setTotalPages] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const saveSearchState = useCallback((searchQuery: string, page: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        query: searchQuery,
        currentPage: page,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save search state:', error);
    }
  }, []);

  const fetchAnime = useCallback(async (searchQuery: string, page: number) => {
    if (!searchQuery.trim()) {
      setAnimeList([]);
      setTotalPages(0);
      setSearchPerformed(false);
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const abortController = new AbortController();
      const response = await searchAnime(searchQuery, page, abortController.signal);
      setAnimeList(response.data);
      setTotalPages(response.pagination.last_visible_page);
      setSearchPerformed(true);
      
      saveSearchState(searchQuery, page);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setAnimeList([]);
    } finally {
      setLoading(false);
    }
  }, [saveSearchState]);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (query === '') {
      setAnimeList([]);
      setTotalPages(0);
      setSearchPerformed(false);
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    
    const timeoutId = window.setTimeout(() => {
      setCurrentPage(1);
      fetchAnime(query, 1);
    }, DEBOUNCE_DELAY);

    setSearchTimeout(timeoutId);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [query, fetchAnime]);

  useEffect(() => {
    if (query && currentPage > 1) {
      fetchAnime(query, currentPage);
    }
  }, [currentPage, query, fetchAnime]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6 dark:bg-gray-800">
      <div className="max-w-[1200px] mx-auto">
        <SearchBar query={query} setQuery={setQuery} />
      </div>
      
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : animeList.length > 0 ? (
        <>
          <AnimeList animeList={animeList} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      ) : searchPerformed ? (
        <EmptyState />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-400">
            Start searching for your favorite anime!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Use the search bar above to find anime by title, genre, or keyword.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;