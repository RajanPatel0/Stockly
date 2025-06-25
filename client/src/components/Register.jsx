import React, { useState } from "react";

export default function Register() {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("User");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email, password }
      : { name, email, password, role };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong ❌");
      } else {
        localStorage.setItem("token", data.token);
        setMessage(`${isLogin ? "Login" : "Registration"} successful ✅`);
        // optional: redirect user based on role
      }
    } catch (err) {
      setMessage("Server error ❌");
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
              onClick={() => setRole("user")}
              className={`px-6 py-2 rounded-full border ${
                role === "User"
                  ? "bg-cyan-500 text-white"
                  : "border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white"
              } transition duration-300`}
            >
              User
            </button>
            <button
              onClick={() => setRole("vendor")}
              className={`px-6 py-2 rounded-full border ${
                role === "Vendor"
                  ? "bg-purple-500 text-white"
                  : "border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white"
              } transition duration-300`}
            >
              Vendor
            </button>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-3 rounded-lg bg-[#2b2b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-lg bg-[#2b2b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-lg bg-[#2b2b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {!isLogin && (
            <input
              type="text"
              value={role}
              readOnly
              className="px-4 py-3 rounded-lg bg-[#2b2b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-default"
            />
          )}

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-700/40"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-yellow-300">{message}</p>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="ml-2 text-cyan-400 hover:underline hover:text-cyan-300"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
