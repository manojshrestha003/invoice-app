'use client';

import React from 'react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-5xl mx-auto px-4 py-24 flex gap-12">
        {/* Sidebar Nav */}
        <aside className="w-64 hidden sm:block">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Getting Started</h4>
          <ul className="space-y-3 mb-8">
            <li className="text-purple-400 font-bold border-l-2 border-purple-500 pl-4 py-1 -ml-4">Introduction</li>
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Quickstart Guide</li>
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Your First Invoice</li>
          </ul>
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Features</h4>
          <ul className="space-y-3">
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Expense Tracking</li>
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Tax Reports</li>
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">AI Auditing</li>
          </ul>
        </aside>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Introduction</h1>
          <p className="text-lg text-gray-400 mb-8 border-b border-white/10 pb-8">Welcome to the HisabKitab documentation. Here you'll find everything you need to start automating your billing.</p>

          <h2 className="text-2xl font-bold mb-4">What is HisabKitab?</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">HisabKitab is an open-concept billing and invoicing platform specifically designed for modern agility. We combine lightning-fast UX with AI analytics to save you hours every month.</p>

          
        </div>
      </div>
    </div>
  );
}
