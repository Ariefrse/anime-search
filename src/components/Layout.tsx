import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#FF69B4] shadow-lg">
        <div className="px-4 py-3">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white text-xl font-bold hover:text-pink-100 transition-colors"
          >
            <SearchIcon size={24} />
            <span>Anime Search App</span>
          </Link>
        </div>
      </header>
      <main className="flex-grow bg-gray-100">
        <div className="max-w-[1200px] mx-auto py-6 px-4">
          <Outlet />
        </div>
      </main>
      <footer className="bg-[#161A1D] text-[#B3B3B3] py-4 mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 text-center text-sm">
          <p>© 2025 Anime Search App - Powered by Jikan API</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;