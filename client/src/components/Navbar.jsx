import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-[#0a0a23] via-[#0f0f3d] to-[#141457] text-white shadow-lg shadow-blue-800/30 backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo and name */}
        <div className="flex items-center space-x-3 w-1/5">
          <img
            src="smartlogo.png"
            alt="InVolv Logo"
            className="h-10 w-10 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          />
          <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            InVolv
          </span>
        </div>

        {/* Navigation links (desktop) */}
        <div className="hidden md:flex space-x-10 w-2/5 justify-center">
          <a href="#home" className="text-lg font-medium hover:text-cyan-400 transition-colors duration-200">Home</a>
          <a href="#contact" className="text-lg font-medium hover:text-purple-400 transition-colors duration-200">Contact</a>
        </div>

        {/* Register/Login + hamburger */}
        <div className="w-1/5 flex justify-end items-center space-x-4">
          <Link to="/register">
  <button className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-700/40 text-white font-semibold">
    Register / Login
  </button>
</Link>
          {/* Hamburger Icon (mobile only) */}
          <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 flex flex-col gap-4 bg-[#1a1a3d] py-4 rounded-xl shadow-lg shadow-blue-900/30">
          <a href="#home" className="text-lg font-medium hover:text-cyan-400 transition">Home</a>
          <a href="#contact" className="text-lg font-medium hover:text-purple-400 transition">Contact</a>
        </div>
      )}
    </nav>
  );
}
