"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF6B35] text-xl font-bold text-white">
            AI
          </div>

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Start reviewing code with AI today
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm">

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  transition
                  focus:border-[#FF6B35]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  transition
                  focus:border-[#FF6B35]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  transition
                  focus:border-[#FF6B35]
                "
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="
                w-full
                rounded-2xl
                bg-[#FF6B35]
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#E85A29]
                disabled:opacity-50
              "
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#FF6B35]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}