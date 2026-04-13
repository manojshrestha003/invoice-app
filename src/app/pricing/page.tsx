'use client';

import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden pt-20">

      <section className="py-24 bg-black relative">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-6">Simple, transparent pricing</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start for free, upgrade when you need advanced features. Switch plans anytime.
            </p>
            
            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-4 mt-12 mb-8">
              <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-16 h-8 bg-green-500/[0.15] border border-green-500/30 rounded-full transition-colors focus:outline-none"
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-green-400 rounded-full transition-transform transform ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
              </button>
              <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${isAnnual ? 'text-green-400' : 'text-gray-500'}`}>
                Annually <span className="ml-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded-full">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 hover:border-white/30 transition-colors flex flex-col">
              <h4 className="text-xl font-bold text-white mb-2">Starter</h4>
              <p className="text-gray-400 mb-6 text-sm">Perfect for freelancers experimenting.</p>
              <div className="text-4xl font-black text-white mb-8">$0<span className="text-lg text-gray-500 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Up to 5 invoices/mo</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Basic templates</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Expense tracking (Basic)</li>
              </ul>
              <button onClick={() => router.push('/register')} className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">Get Started</button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-green-500/10 to-[#111] border border-green-500/50 rounded-[2rem] p-8 shadow-2xl relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Most Popular</div>
              <h4 className="text-xl font-bold text-white mb-2">Professional</h4>
              <p className="text-gray-400 mb-6 text-sm">For growing businesses needing automation.</p>
              <div className="text-4xl font-black text-white mb-8">
                ${isAnnual ? '12' : '15'}
                <span className="text-lg text-gray-500 font-medium">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-white text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Everything in Starter</li>
                <li className="flex items-center gap-3 text-white text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Unlimited invoices</li>
                <li className="flex items-center gap-3 text-white text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> AI Invoice Audits</li>
                <li className="flex items-center gap-3 text-white text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Tax Liability Reports</li>
              </ul>
              <button onClick={() => router.push('/register')} className="w-full py-4 rounded-xl bg-green-500 text-black font-black hover:bg-green-400 transition-colors">Start Free Trial</button>
            </div>

            {/* Business Plan */}
            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 hover:border-white/30 transition-colors flex flex-col">
              <h4 className="text-xl font-bold text-white mb-2">Business</h4>
              <p className="text-gray-400 mb-6 text-sm">For agencies with complex requirements.</p>
              <div className="text-4xl font-black text-white mb-8">
                ${isAnnual ? '39' : '49'}
                <span className="text-lg text-gray-500 font-medium">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Everything in Pro</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Multiple team accounts</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> White-label branding</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircleIcon className="w-5 h-5 text-green-400" /> API access</li>
              </ul>
              <button onClick={() => router.push('/register')} className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
