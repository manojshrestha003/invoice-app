'use client';

import React from 'react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter">Bank-Grade Security</h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">Your financial data is your business. Keeping it safe and encrypted is ours.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-[#111] border border-white/5 p-6 rounded-2xl cursor-default hover:bg-[#151515] transition-colors">
            <h3 className="text-lg font-bold text-white mb-2">256-bit Encryption</h3>
            <p className="text-gray-400 text-sm">All data transit is secured via TLS 1.3, and data at rest is encrypted using AES-256 standards.</p>
          </div>
          <div className="bg-[#111] border border-white/5 p-6 rounded-2xl cursor-default hover:bg-[#151515] transition-colors">
            <h3 className="text-lg font-bold text-white mb-2">GDPR Compliant</h3>
            <p className="text-gray-400 text-sm">We strictly adhere to European data laws. You own your data, and can delete it permanently at any time.</p>
          </div>
          <div className="bg-[#111] border border-white/5 p-6 rounded-2xl cursor-default hover:bg-[#151515] transition-colors">
            <h3 className="text-lg font-bold text-white mb-2">No Tracking</h3>
            <p className="text-gray-400 text-sm">We never sell your financial data to third-party ad networks or data brokers. Ever.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
