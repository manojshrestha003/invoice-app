'use client';

import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/30 rounded-full blur-2xl opacity-30 animate-pulse"></div>

      
      <div className="z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 max-w-3xl w-full mx-4 text-center transition duration-300 hover:shadow-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
          Welcome to <span className="text-green-400">HisabKitab</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 px-6 leading-relaxed">
          Smart billing. Stylish invoices. <br className="hidden sm:block" />
          Let your finances breathe.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 px-6">
          <button
            onClick={() => router.push('/login')}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105"
          >
            Register
          </button>
        </div>

        <div className="flex justify-center mt-2">
          <ArrowRightIcon className="w-8 h-8 text-green-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
