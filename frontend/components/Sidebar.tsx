"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/providers", label: "Providers" },
  { href: "/reviews", label: "Reviews" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        Workspace
      </p>
      <div className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-slate-900 text-white shadow-sm shadow-blue-500/10"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
