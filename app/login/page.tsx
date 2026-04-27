"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      router.push("/portal/admin");
    } else if (username === "staff" && password === "staff123") {
      localStorage.setItem("role", "staff");
      router.push("/portal/staff");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-green-900 mb-2 text-center">
          Al Akeel MMV
        </h1>
        <p className="text-center text-gray-400 text-sm mb-8">Portal Login</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold text-sm transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-400 text-center space-y-1">
          <p>
            Admin: <span className="font-bold">admin</span> /{" "}
            <span className="font-bold">admin123</span>
          </p>
          <p>
            Staff: <span className="font-bold">staff</span> /{" "}
            <span className="font-bold">staff123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
