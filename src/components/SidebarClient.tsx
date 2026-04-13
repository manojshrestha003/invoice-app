"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  ChartBarSquareIcon
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Dashboard", href: "/Dashboard", icon: HomeIcon, match: ["/Dashboard", "/dashboard"] },
  { label: "Clients", href: "/clients", icon: UsersIcon, match: ["/clients"] },
  { label: "Invoices", href: "/invoices", icon: DocumentTextIcon, match: ["/invoices"] },
  { label: "Expenses", href: "/expenses", icon: BanknotesIcon, match: ["/expenses"] },
  { label: "Tax Reports", href: "/reports", icon: ChartBarSquareIcon, match: ["/reports"] },
  { label: "Profile", href: "/profile", icon: UserCircleIcon, match: ["/profile"] },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/login");
    }
  };

  const isRouteActive = (paths: string[]) => {
    return paths.some(p => pathname === p || pathname.startsWith(`${p}/`));
  };

  return (
    <>
      <button
        aria-label="Toggle sidebar"
        className="fixed top-4 left-4 z-50 p-2.5 bg-[#111111] border border-white/10 text-white rounded-xl lg:hidden focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#0A0A0A] border-r border-white/[0.08] pb-6 pt-8
          transform transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-64
          z-40 flex flex-col
          flex-shrink-0 shadow-2xl lg:shadow-none
        `}
      >
        <div className="px-8 pb-10">
          <Link href="/Dashboard" className="flex items-center gap-3 group" onClick={() => setSidebarOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(147,51,234,0.4)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] transition-all">
              H
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-gray-200 transition-colors">
              Hisab<span className="text-purple-400">Kitab</span>
            </h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <div className="px-4 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Main Menu</span>
          </div>
          <ul className="space-y-1.5">
            {navItems.map(({ href, label, icon: Icon, match }) => {
              const isActive = isRouteActive(match);

              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group relative overflow-hidden ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-100"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full shadow-[0_0_10px_rgba(147,51,234,1)]"></div>
                      </>
                    )}
                    <Icon className={`h-5 w-5 relative z-10 transition-colors ${isActive ? 'text-purple-400' : 'group-hover:text-gray-300'}`} />
                    <span className="relative z-10">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 pt-6 mt-auto border-t border-white/[0.04]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 group"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
