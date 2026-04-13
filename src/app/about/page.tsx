'use client';

import React from 'react';


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter">About <span className="text-purple-400">HisabKitab</span></h1>
        <p className="text-xl text-gray-400 leading-relaxed mb-12">
          HisabKitab is a simple and smart solution designed to help users manage their daily finances with ease. It allows you to track your income, expenses, and overall budget in an organized way. Our goal is to make financial management easy and accessible for everyone through a clean and user-friendly interface. With HisabKitab, users can gain better control over their money and improve their spending habits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16">
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
            <p className="text-gray-400">To simplify global finance so creative minds can focus on creating, not calculating.</p>
          </div>
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
            <p className="text-gray-400">A world where sending an invoice and getting paid requires exactly one click.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
