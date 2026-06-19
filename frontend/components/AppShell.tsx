"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

interface AppShellProps {
  title: string;
  children: ReactNode;
}

export function AppShell({ title, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block"> 
          <Sidebar />
        </aside>
        <main className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-sm shadow-black/20">
              <h1 className="text-3xl font-semibold text-white">{title}</h1>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
