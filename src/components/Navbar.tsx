'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/50">
                <span className="text-white font-bold text-xl uppercase tracking-tighter">H</span>
            </div>
            <span className="text-white text-2xl font-black tracking-tight flex items-baseline">
                Hisab<span className="text-green-400">Kitab</span>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full ml-1 animate-pulse"></span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white font-medium transition-colors">Features</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white font-medium transition-colors">Pricing</Link>
            <Link href="#about" className="text-gray-300 hover:text-white font-medium transition-colors">About</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/login')}
              className="px-6 py-2.5 text-white/80 hover:text-white font-semibold transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => router.push('/register')}
              className="bg-green-500 hover:bg-green-600 text-white px-7 py-2.5 rounded-full font-bold shadow-lg shadow-green-500/20 transform hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
