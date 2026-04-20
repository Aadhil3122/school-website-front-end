"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      router.push("/portal/admin");
    } else if (username === "staff" && password === "staff123") {
      localStorage.setItem("role", "staff");
      router.push("/portal/staff");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 border px-4 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          Login
        </button>

        
      </div>
    </div>
  );
}
