import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setRole }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState("user"); // Changed to lowercase and renamed to avoid confusion
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email, password }
      : { name, email, password, role: userRole };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      const userRole = data.user?.role;
    if (!userRole) {
      throw new Error("Role information missing in response");
    }

      // Save token and role to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", userRole.toLowerCase());
      
      // Update role in parent component
      setRole(userRole.toLowerCase());
      
      setMessage(`${isLogin ? "Login" : "Registration"} successful! Redirecting...`);
      
      // Redirect based on role
      setTimeout(() => {
        navigate(userRole === "vendor" ? "/dashboard" : "/");
      }, 1500);

    } catch (err) {
      setMessage(err.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#0f0f3d] to-[#141457] text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-[#1c1c3c] rounded-3xl shadow-2xl shadow-blue-800/40 p-8 relative">
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          {isLogin ? "Login to InVolv" : "Register to InVolv"}
        </h2>

        {!isLogin && (
          <div className="flex justify-center mb-6 gap-6">
            <button
              type="button"
              onClick={() => setUserRole("user")}
              className={`px-6 py-2 rounded-full border ${
                userRole === "user"
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white"
              } transition duration-300`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setUserRole("vendor")}
              className={`px-6 py-2 rounded-full border ${
                userRole === "vendor"
                  ? "bg-purple-500 text-white border-purple-500"
                  : "border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white"
              } transition duration-300`}
            >
              Vendor
            </button>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#2b2b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#2b2b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-4 py-3 rounded-lg bg-[#2b2b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1 text-gray-300">
                Account Type
              </label>
              <input
                id="role"
                type="text"
                value={userRole === "user" ? "User Account" : "Vendor Account"}
                readOnly
                className="w-full px-4 py-3 rounded-lg bg-[#2b2b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-default capitalize"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-700/40 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              isLogin ? "Login" : "Register"
            )}
          </button>

          {message && (
            <p className={`mt-4 text-center text-sm ${
              message.includes("successful") ? "text-green-400" : "text-yellow-300"
            }`}>
              {message}
            </p>
          )}
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="ml-2 text-cyan-400 hover:underline hover:text-cyan-300 focus:outline-none"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}