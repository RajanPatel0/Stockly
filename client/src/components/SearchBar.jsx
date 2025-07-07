import React, { useState } from "react";
import { FaSearch, FaCamera, FaTimes } from "react-icons/fa";

export default function SearchBar({ initialValue = "" }) {
  const [searchText, setSearchText] = useState(initialValue);

  return (
    <div className="w-full flex justify-center pt-6 px-4 relative z-10">
      {/* Add subtle background glow animation */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 opacity-10 blur-3xl animate-pulse" />
      </div>

      <div className="w-full md:w-2/3 lg:w-1/2 flex items-center bg-[#1c1c3c] rounded-full shadow-lg shadow-indigo-700/40 px-4 py-3 backdrop-blur-sm">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for products..."
          className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
          autoFocus
        />
        <div className="flex items-center space-x-4 text-xl text-white">
          <button className="hover:text-cyan-400 transition-transform transform hover:scale-110">
            <FaSearch />
          </button>
          <button className="hover:text-purple-400 transition-transform transform hover:scale-110">
            <FaCamera />
          </button>
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="hover:text-pink-400 transition-transform transform hover:scale-110"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
