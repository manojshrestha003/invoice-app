
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Dashboard", href: "/Dashboard", icon: HomeIcon },
  { label: "Clients", href: "/clients", icon: UsersIcon },
  { label: "Invoices", href: "/invoices", icon: DocumentTextIcon },
  { label: "Profile", href: "/profile", icon: UserCircleIcon },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        aria-label="Toggle sidebar"
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-md p-6
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-60
          z-40
          flex-shrink-0
        `}
      >
        <h1 className="text-2xl font-bold mb-8 text-gray-800">HisabKitab</h1>
        <nav>
          <ul className="space-y-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium ${
                      isActive
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
