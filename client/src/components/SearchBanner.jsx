import React from "react";
import { FaSearch, FaCamera, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SearchBanner() {
  return (
    <Link to="/search" className="block w-full h-[18vh] relative z-10">
      <section className="w-full h-full bg-gradient-to-br from-[#0a0a23] via-[#0f0f3d] to-[#141457] shadow-2xl shadow-blue-800/30 cursor-pointer">
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Light 3D animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 opacity-10 blur-3xl animate-pulse" />
          </div>

          <div className="w-5/6 md:w-2/3 lg:w-1/2 flex items-center bg-[#1c1c3c] rounded-full shadow-lg shadow-indigo-700/40 px-3 py-3 backdrop-blur-sm relative z-20">
            <input
              type="text"
              placeholder="Search products, items or categories..."
              className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base pointer-events-none"
              readOnly
            />
            <div className="flex items-center space-x-4 text-xl text-white">
              <FaSearch />
              <FaCamera />
              <FaTimes className="opacity-30" />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
