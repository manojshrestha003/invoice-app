"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-200 h-full">
        <div className="flex flex-col h-screen overflow-hidden ">
          {/* Header */}
          <header className="flex justify-between items-center bg-gray-850 bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 shadow-md">
            <h2 className="text-3xl font-semibold tracking-wide">Dashboard</h2>
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline">Hello, User</span>
              <UserCircleIcon className="h-8 w-8 text-gray-300" />
            </div>
          </header>''

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-8 bg-gray-900">
            <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg  shadow-inner min-h-[400px]">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
