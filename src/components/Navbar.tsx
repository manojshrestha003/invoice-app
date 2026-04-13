'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all">
              <span className="text-white font-black text-lg sm:text-xl uppercase tracking-tighter">H</span>
            </div>
            <span className="text-white text-xl sm:text-2xl font-black tracking-tight flex items-baseline">
              Hisab<span className="text-green-400">Kitab</span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-green-400 rounded-full ml-1 animate-pulse"></span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-400 hover:text-white font-medium transition-colors text-sm uppercase tracking-widest">Features</Link>
            {/*
            <Link href="#pricing" className="text-gray-400 hover:text-white font-medium transition-colors text-sm uppercase tracking-widest">Pricing</Link>
            */}
            <Link href="/about" className="text-gray-400 hover:text-white font-medium transition-colors text-sm uppercase tracking-widest">About</Link>
          </div>

          {/* Auth Buttons & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-gray-400 hover:text-white font-bold transition-colors text-sm uppercase tracking-wider"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-black shadow-lg shadow-green-500/20 transform hover:-translate-y-0.5 transition-all active:scale-95 text-sm uppercase tracking-wider"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-4 py-8 space-y-6 flex flex-col items-center">
          <Link href="#features" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest">Features</Link>
          <Link href="#pricing" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest">Pricing</Link>
          <Link href="#about" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest">About</Link>
          <div className="w-full h-px bg-white/10"></div>
          <div className="flex flex-col w-full gap-4">
            <button
              onClick={() => { router.push('/login'); setIsOpen(false); }}
              className="w-full py-4 text-white font-bold border border-white/10 rounded-xl"
            >
              Login
            </button>
            <button
              onClick={() => { router.push('/register'); setIsOpen(false); }}
              className="w-full py-4 bg-green-500 text-white font-black rounded-xl"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
