'use client';

import React from 'react';
import Features from '@/components/Features';

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden pt-20">
      
      <div className="pt-20 pb-12 text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-6">Powerful Features for Modern Business</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Discover everything HisabKitab does to automate your finances.</p>
      </div>

      <Features />

      {/* Expanded Feature Details */}
      <section className="py-24 max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4">New For 2026</div>
            <h2 className="text-3xl font-black text-white mb-6">AI Invoice Auditing</h2>
            <p className="text-gray-400 leading-relaxed mb-6">Don't guess if your invoice is professional enough. With a single click, our robust AI Engine will parse your line items and provide a 0-100 professionalism score, catching errors before your clients see them.</p>
            <ul className="space-y-3 relative z-20">
              <li className="flex gap-2 text-gray-300"><span className="text-green-400">✓</span> Catch math discrepancies.</li>
              <li className="flex gap-2 text-gray-300"><span className="text-green-400">✓</span> Improve vague descriptions.</li>
              <li className="flex gap-2 text-gray-300"><span className="text-green-400">✓</span> Ensure standard legal phrasing.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#111] to-black border border-white/5 rounded-[2rem] p-8 h-80 shadow-2xl flex items-center justify-center relative z-20">
             <div className="text-center">
               <div className="text-6xl font-black text-white">98<span className="text-2xl text-gray-500">/100</span></div>
               <p className="text-green-400 text-sm font-bold uppercase tracking-widest mt-2">Passed AI Audit</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
