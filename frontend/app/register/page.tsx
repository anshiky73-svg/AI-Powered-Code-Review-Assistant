"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      alert("Registration successful");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <main className="p-10 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          onClick={handleRegister}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>
      </div>
    </main>
  );
}