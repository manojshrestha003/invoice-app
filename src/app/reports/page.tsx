"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function ReportsPage() {
  const [data, setData] = useState({ totalTaxCollected: 0, totalTaxPaid: 0, netTaxLiability: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports/taxes")
      .then(res => res.json())
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-12">
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black mb-1">Tax Compliance Reports</h1>
          <p className="text-gray-400 text-sm">Keep track of your tax liability perfectly.</p>
        </div>
        <ThemeToggle />
      </header>

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto mt-4">
        {loading ? (
          <p>Analyzing taxes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-16 -mt-16 text-green-500"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Taxes Collected</p>
              <h2 className="text-4xl font-black font-mono tracking-tight text-white">${data.totalTaxCollected.toLocaleString()}</h2>
              <p className="text-sm text-gray-400 mt-4">From Paid Invoices</p>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16 text-green-500"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Taxes Paid</p>
              <h2 className="text-4xl font-black font-mono tracking-tight text-white">${data.totalTaxPaid.toLocaleString()}</h2>
              <p className="text-sm text-gray-400 mt-4">From Your Expenses</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden group">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Net Tax Liability</p>
              <h2 className="text-4xl font-black font-mono tracking-tight text-white">${data.netTaxLiability.toLocaleString()}</h2>
              <p className="text-sm text-purple-300 mt-4 flex items-center gap-2">
                What you likely owe <span className="px-2 py-1 bg-purple-500/20 rounded-md text-[10px] uppercase font-bold tracking-wider">Estimated</span>
              </p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
