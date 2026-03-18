'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden selection:bg-green-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm transform hover:scale-105 transition-transform cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-ping"></span>
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">New: AI Invoice Audit</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
            Billing made <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
              ridiculously simple.
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            HisabKitab is the all-in-one platform for modern businesses to manage invoices, track expenses, and get paid faster. Join 10,000+ entrepreneurs today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => router.push('/register')}
              className="group bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-green-500/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              Get Started for Free
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl text-xl font-bold backdrop-blur-md transition-all transform hover:-translate-y-1 active:scale-95"
            >
              View Demo
            </button>
          </div>

          <div className="mt-24 relative max-w-5xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative aspect-video rounded-[2rem] bg-gray-900 border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
              {/* This would be an app screenshot or video demo */}
              <div className="flex items-center justify-center h-full">
                <div className="text-center group-hover:scale-105 transition-transform">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50 cursor-pointer">
                    <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span className="text-white/60 font-medium tracking-widest text-sm uppercase">Watch Product Tour</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Explore More</span>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </section>

      <Features />

      {/* Pricing Teaser / CTA Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-black to-zinc-900 px-4">
        <div className="max-w-4xl mx-auto rounded-[3rem] p-8 md:p-16 bg-white/5 border border-white/10 backdrop-blur-sm text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to transform your business?</h3>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required. Cancel anytime.
          </p>
          <button
            onClick={() => router.push('/register')}
            className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-xl text-lg font-black transition-all transform hover:scale-105"
          >
            Create Your Account Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
