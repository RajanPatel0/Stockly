import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ role, setRole }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/register");
  };

  return (
    <nav className="w-full px-4 sm:px-6 py-3 bg-gradient-to-r from-[#0a0a23] via-[#0f0f3d] to-[#141457] text-white shadow-lg shadow-blue-800/30 backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Title */}
        <Link to="/">
          <div className="flex items-center space-x-2 min-w-[120px]">
          <img
            src="smartlogo.png"
            alt="InVolv Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          />
          <span className="text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text whitespace-nowrap">
            InVolv
          </span>
        </div> 
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="/" className="text-lg font-medium hover:text-cyan-400 transition-colors duration-200">Home</a>
          <a href="#contact" className="text-lg font-medium hover:text-purple-400 transition-colors duration-200">Contact</a>
          
          {/* Featured Button (Desktop) */}
          {role === "user" && (
            <Link to="/search">
              <button className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-700/40 text-white font-semibold flex items-center">
                <span className="mr-2">🔍</span> Search
              </button>
            </Link>
          )}
          {role === "vendor" && (
            <Link to="/dashboard">
              <button className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-700/40 text-white font-semibold">
                Dashboard
              </button>
            </Link>
          )}

          {/* Logout (Desktop) */}
          {role && (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition text-white font-medium shadow-lg"
            >
              Logout
            </button>
          )}

          {/* Register/Login (Desktop) */}
          {!role && (
            <Link to="/register">
              <button className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-700/40 text-white font-semibold">
                Register / Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-3">
          {/* Featured Button (Mobile) */}
          {role === "user" && (
            <Link to="/search">
              <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-700/40 text-white font-semibold text-sm flex items-center">
                <span>🔍</span>
              </button>
            </Link>
          )}
          {role === "vendor" && (
            <Link to="/dashboard">
              <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-700/40 text-white font-semibold text-sm">
                Dash
              </button>
            </Link>
          )}

          {/* Hamburger Menu */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-[#2a2a5a] transition"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 py-3 flex flex-col gap-3 bg-[#1a1a3d] rounded-xl shadow-lg shadow-blue-900/30">
          <a href="#home" className="text-lg font-medium hover:text-cyan-400 transition py-1">Home</a>
          <a href="#contact" className="text-lg font-medium hover:text-purple-400 transition py-1">Contact</a>
          
          {/* Additional options */}
          {!role && (
            <Link to="/register" className="text-lg font-medium hover:text-indigo-400 transition py-1" onClick={() => setMenuOpen(false)}>
              Register / Login
            </Link>
          )}
          {role && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-lg font-medium text-red-400 hover:text-red-300 transition py-1 text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}