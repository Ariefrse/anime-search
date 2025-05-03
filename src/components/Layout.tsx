import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';


const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800">
      <header className="bg-purple-400 border-b  dark:border-gray-800 dark:bg-gray-900">
        <div className="px-4 py-1 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white-800 text-xl font-bold hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-300"
          >
            <span className="bg-black text-white bg-clip-text dark:text-gray-400">Anime Search App</span>
          </Link>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>
      <main className="flex-grow bg-background dark:bg-gray-800">
        <div className="max-w-[1200px] mx-auto py-6 px-4">
          <Outlet />
        </div>
      </main>
      <footer className="bg-black/90 text-gray-500 font-thin font-mono py-1  dark:bg-gray-900 dark:text-gray-400">
        <div className="max-w-[1200px] mx-auto px-4 text-center text-sm">
          <p>© 2025 Anime Search App - Powered by Jikan API</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;