"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, BanknotesIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from 'react';

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports/analytics")
      .then(res => res.json())
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  const COLORS = ['#A855F7', '#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#6366F1'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111] border border-white/10 p-4 rounded-xl shadow-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-sm font-bold text-white">
                {entry.name}: <span className="font-mono">NPR {entry.value.toLocaleString()}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-12">
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black mb-1">Financial Intelligence</h1>
          <p className="text-gray-400 text-sm">Real-time business performance analytics.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/5">
            Export PDF
          </button>
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-purple-600/20">
            Share Report
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-8 mt-4">
        {loading || !data ? (
          <div className="space-y-8 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl"></div>)}
            </div>
            <div className="h-[400px] bg-white/5 rounded-2xl"></div>
          </div>
        ) : (
          <>
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                <BanknotesIcon className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.03] rotate-12 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Net Profit</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-black font-mono">NPR {data.profit.toLocaleString()}</h2>
                </div>
                <p className="text-[10px] text-green-400 mt-2 font-bold uppercase tracking-widest flex items-center gap-1">
                  Balanced Ledger
                </p>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                <DocumentChartBarIcon className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.03] -rotate-12 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Operating Margin</p>
                <h2 className="text-3xl font-black font-mono">{Math.round(data.margin)}%</h2>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-[10px] font-bold ${data.margin > 20 ? 'text-green-400' : 'text-orange-400'}`}>
                    {data.margin > 20 ? 'HEALTHY RANGE' : 'TIGHT MARGINS'}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group">
                <p className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-2">Total Revenue</p>
                <h2 className="text-3xl font-black font-mono">NPR {data.totalRevenue.toLocaleString()}</h2>
                <div className="flex items-center gap-1 mt-2 text-green-400">
                  <ArrowTrendingUpIcon className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase font-mono">LTM Performance</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Total Outgoings</p>
                <h2 className="text-3xl font-black font-mono text-white/90">NPR {data.totalExpenses.toLocaleString()}</h2>
                <div className="flex items-center gap-1 mt-2 text-red-400">
                  <ArrowTrendingDownIcon className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase font-mono tracking-tighter">Verified Expenses</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Trends Chart */}
              <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black">Financial Performance</h3>
                    <p className="text-gray-500 text-xs">Comparison of monthly income vs expenses</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Expenses</span>
                    </div>
                  </div>
                </div>

                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthlyTrends}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 700 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 700 }}
                        tickFormatter={(v) => `NPR ${v / 1000}k`}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff10', strokeWidth: 1 }} />
                      <Area
                        type="monotone"
                        name="Revenue"
                        dataKey="revenue"
                        stroke="#A855F7"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRev)"
                      />
                      <Area
                        type="monotone"
                        name="Expenses"
                        dataKey="expenses"
                        stroke="#ffffff20"
                        strokeWidth={2}
                        fillOpacity={0.1}
                        fill="#ffffff"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Categorical Pie Chart */}
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-black mb-1">Expense Allocation</h3>
                <p className="text-gray-500 text-xs mb-8">Breakdown of costs by category</p>

                <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.categoryBreakdown.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8 space-y-3">
                  {data.categoryBreakdown.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{entry.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">NPR {entry.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
