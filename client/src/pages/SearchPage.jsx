import React from 'react';
import SearchBar from '../components/SearchBar';

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#0f0f3d] to-[#141457] relative overflow-hidden">
      {/* Glowing animated background like SearchBanner */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 opacity-10 blur-3xl animate-pulse" />
      </div>

      {/* Active Search Bar */}
      <div className="relative z-10">
        <SearchBar />

        {/* Placeholder text or future suggestion area */}
        <div className="mt-10 px-4 text-white text-center text-lg opacity-50">
          Start typing to search for products...
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
