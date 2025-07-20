'use client';

import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-blue-100 overflow-hidden">
      {/* Background Illustration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200 via-white to-blue-200 opacity-40 pointer-events-none"></div>

      {/* Main Card */}
      <div className="z-10 bg-white/60 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-10 max-w-2xl w-full text-center transition duration-300 hover:shadow-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow">
          Welcome to <span className="text-green-600">HisabKitab</span>
        </h1>
        <p className="text-gray-800 text-lg mb-8 px-4">
          Effortless billing. Beautiful invoices. Your time, saved.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            onClick={() => router.push('/login')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-medium transition transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-medium transition transform hover:scale-105"
          >
            Register
          </button>
        </div>

        <div className="flex justify-center">
          <ArrowRightIcon className="w-8 h-8 text-gray-700 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
