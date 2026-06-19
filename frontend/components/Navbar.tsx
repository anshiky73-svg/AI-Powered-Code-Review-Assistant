"use client";

import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <div className="h-11 w-11 rounded-xl bg-[#FF6B35] flex items-center justify-center text-white font-bold">
            AI
          </div>

          <div>
            <h1 className="font-bold text-lg text-gray-900">
              CodeReview AI
            </h1>

            <p className="text-sm text-gray-500">
              AI Powered Reviews
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-700 hover:text-[#FF6B35]"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/providers")}
            className="text-gray-700 hover:text-[#FF6B35]"
          >
            Providers
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-700 hover:text-[#FF6B35]"
          >
            Projects
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="
              bg-[#FF6B35]
              hover:bg-[#E85A29]
              text-white
              px-5
              py-2.5
              rounded-full
              font-medium
              transition
            "
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}