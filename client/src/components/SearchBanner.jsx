import React, { useState } from "react";
import { FaSearch, FaCamera, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SearchBanner() {
  const [searchText, setSearchText] = useState("");

  return (
    <section className="h-[20vh] w-full bg-gradient-to-br from-[#0a0a23] via-[#0f0f3d] to-[#141457] shadow-2xl shadow-blue-800/30 relative z-10">
      <div className="w-full h-full flex items-center justify-center relative">
        {/* 3D light animation background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 opacity-10 blur-3xl animate-pulse" />
        </div>

        <div className="w-4/5 md:w-2/3 lg:w-1/2 flex items-center bg-[#1c1c3c] rounded-full shadow-lg shadow-indigo-700/40 px-4 py-2 backdrop-blur-sm relative z-20">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products, items or categories..."
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
          />

          <div className="flex items-center space-x-4 text-xl text-white">
            {/* Search Icon */}
            <button className="hover:text-cyan-400 transition-transform transform hover:scale-110">
              <FaSearch />           
            </button>

            {/* Lens Icon */}
            <button className="hover:text-purple-400 transition-transform transform hover:scale-110">
              <FaCamera />
            </button>

            {/* Clear Icon */}
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
    </section>
  );
}
