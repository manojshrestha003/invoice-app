'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Features from '@/components/Features';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden selection:bg-green-500/30">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">


          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
            Billing made <br />
            <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
              ridiculously simple.
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium px-4">
            HisabKitab provides a comprehensive suite of tools designed to simplify your billing process and give you total control over your business growth.


          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
            <button
              onClick={() => router.push('/register')}
              className="group bg-purple-600 hover:bg-purple-500  cursor-pointer text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold shadow-2xl  transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              Get Started for Free
              <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-white/5 hover:bg-white/10 text-white cursor-pointer border border-white/20 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold backdrop-blur-md transition-all transform hover:-translate-y-1 active:scale-95"
            >
              View Demo
            </button>
          </div>


        </div>

      </section>

      <Features />

      {/* Pricing Teaser / CTA Section */}
      <section id="pricing" className="py-20 md:py-24 bg-gradient-to-b from-black to-zinc-900 px-4">
        <div className="max-w-4xl mx-auto rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 bg-white/5 border border-white/10 backdrop-blur-sm text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6">Ready to transform your business?</h3>

          <button
            onClick={() => router.push('/register')}
            className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-black transition-all transform hover:scale-105"
          >
            Create Your Account Now
          </button>
        </div>
      </section>
    </div>
  );
}
