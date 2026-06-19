"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#090909]/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-sm font-semibold text-blue-400">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              AI Powered Code Review
            </p>
            <p className="text-xs text-slate-400">
              Developer-focused workflow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-200 transition hover:border-blue-500 hover:text-white"
          >
            User Menu
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            Logout
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300 sm:px-6">
          <div className="flex flex-col gap-2">
            <p className="text-white">Signed in as developer@example.com</p>
            <p className="text-slate-500">Role: Admin</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
