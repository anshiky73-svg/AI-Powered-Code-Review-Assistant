"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await apiFetch(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      localStorage.setItem(
        "token",
        response.access_token
      );

      alert("Login successful");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <main className="p-10 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">
        Login
      </h1>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="bg-green-600 text-white p-3 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}