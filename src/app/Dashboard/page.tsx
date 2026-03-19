"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface User {
  email: string;
  username: string;
}

interface Invoice {
  id: string;
  client: string;
  totalAmount: number;
  status: "PAID" | "UNPAID" | "PENDING" | string;
  date: string;
}

interface DashboardData {
  totalInvoices: number;
  pendingPayments: number;
  totalClients: number;
  recentInvoices: Invoice[];
  statusChart: { name: string; value: number; fill: string }[];
  revenueChart: { name: string; revenue: number }[];
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const sessionRes = await fetch("/api/session");
        if (!sessionRes.ok) throw new Error("Failed to fetch session");
        const sessionData = await sessionRes.json();

        if (!sessionData?.user?.id) throw new Error("Session invalid");
        const userId = sessionData.user.id;

        const userRes = await fetch(`/api/users/${userId}`);
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        const userData: User = await userRes.json();
        setUser(userData);

        const dashboardRes = await fetch("/api/dashboard", { credentials: "include" });
        if (!dashboardRes.ok) throw new Error("Failed to fetch dashboard data");
        const dashboardInfo: DashboardData = await dashboardRes.json();
        
        // Reverse revenue array to show oldest to newest (left to right)
        if (dashboardInfo.revenueChart) {
          dashboardInfo.revenueChart.reverse();
        }
        
        setDashboardData(dashboardInfo);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    }

    fetchData();
  }, []);

  const formatCurrency = (amount: number): string =>
    "NPR " + amount.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.3)]"></div>
          <p className="text-gray-400 font-medium tracking-widest text-sm uppercase animate-pulse">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  // Custom Tooltip for Area Chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111111]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
          <p className="text-white text-lg font-black tracking-tight">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-purple-500/30 font-sans pb-12">
      {/* Header Setup */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-white tracking-tight">Analytics</h1>
          <div className="hidden md:flex h-6 w-px bg-white/10"></div>
          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-400 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            System Operational
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-white tracking-wide">{user?.username || user?.email || "User"}</span>
            <span className="text-xs text-gray-500 font-medium">Administrator</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-white/10">
            {(user?.username || user?.email || "U").charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-8 mt-4">
        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Revenue Card */}
          <div className="group relative bg-[#111111] border border-white/[0.08] rounded-[2rem] p-8 overflow-hidden transition-all duration-300 hover:bg-[#151515] hover:border-white/[0.12] hover:-translate-y-1 shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Total Revenue</h2>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(147,51,234,0.15)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.25)] transition-shadow duration-300">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <p className="text-4xl sm:text-5xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                {formatCurrency(dashboardData.totalInvoices)}
              </p>
            </div>
          </div>

          {/* Pending Payments Card */}
          <div className="group relative bg-[#111111] border border-white/[0.08] rounded-[2rem] p-8 overflow-hidden transition-all duration-300 hover:bg-[#151515] hover:border-white/[0.12] hover:-translate-y-1 shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Outstanding</h2>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-shadow duration-300">
                  <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <p className="text-4xl sm:text-5xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                {formatCurrency(dashboardData.pendingPayments)}
              </p>
            </div>
          </div>

          {/* Clients Card */}
          <div className="group relative bg-[#111111] border border-white/[0.08] rounded-[2rem] p-8 overflow-hidden transition-all duration-300 hover:bg-[#151515] hover:border-white/[0.12] hover:-translate-y-1 shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Active Clients</h2>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-shadow duration-300">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
              </div>
              <p className="text-4xl sm:text-5xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {dashboardData.totalClients}
              </p>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-[#111111] border border-white/[0.08] rounded-[2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none"></div>
            <div className="relative">
              <h2 className="text-lg font-black text-white tracking-tight mb-6">Revenue Over Time</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `NPR ${val}`} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Invoice Status Donut Chart */}
          <div className="bg-[#111111] border border-white/[0.08] rounded-[2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none"></div>
            <div className="relative flex-1 flex flex-col">
              <h2 className="text-lg font-black text-white tracking-tight mb-2">Invoice Status Overview</h2>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.statusChart}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {dashboardData.statusChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity outline-none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} 
                      itemStyle={{ fontWeight: 'bold' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/[0.04]">
                {dashboardData.statusChart.map((item) => (
                  <div key={item.name} className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></span>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{item.name}</span>
                    </div>
                    <span className="text-lg font-black text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Invoices List */}
        <section className="bg-[#111111] border border-white/[0.08] rounded-[2rem] overflow-hidden shadow-2xl relative mt-8">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="relative p-6 md:p-8 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Recent Invoices</h2>
              <p className="text-sm text-gray-400 mt-1 font-medium">An overview of your latest billing activity.</p>
            </div>
            <a href="/invoices" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-bold text-white transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transform hover:-translate-y-0.5">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
          
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#161616]/80 text-gray-400 backdrop-blur-sm">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] w-32 border-b border-white/[0.04]">Invoice ID</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Client Name</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Status</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] text-right border-b border-white/[0.04]">Issue Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {dashboardData.recentInvoices.map((invoice, i) => (
                  <tr key={invoice.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-mono text-xs font-medium text-gray-500 group-hover:text-purple-400 transition-colors bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                        INV-{invoice.id.slice(-6).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-200 group-hover:text-white transition-colors">{invoice.client}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-white tracking-tight">
                        {formatCurrency(invoice.totalAmount)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border
                        ${invoice.status === 'PAID' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]' : 
                         invoice.status === 'UNPAID' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 
                         'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse
                          ${invoice.status === 'PAID' ? 'bg-green-400' : 
                            invoice.status === 'UNPAID' ? 'bg-red-400' : 
                            'bg-orange-400'}`}></span>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                      {new Date(invoice.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
                {dashboardData.recentInvoices.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="inline-flex flex-col items-center justify-center text-gray-500">
                        <svg className="w-12 h-12 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="text-sm font-medium uppercase tracking-widest">No recent invoices found</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
