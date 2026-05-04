"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-linear-to-br from-green-900 via-emerald-900 to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-green-900 mb-2">
            Al Akeel MMV
          </h1>
          <p className="text-sm text-gray-500">
            Staff and admin portal access for safe management.
          </p>
        </div>
        <div className="mb-6 rounded-2xl bg-green-700/10 border border-green-700/20 p-5 text-center">
          <p className="text-sm text-green-900 font-semibold">Portal Login</p>
          <p className="text-xs text-green-700 mt-1">
            Use your assigned username and password below.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-2xl font-bold text-sm transition shadow-lg"
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
