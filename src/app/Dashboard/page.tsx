'use client';

import { useEffect, useState } from 'react';


interface User {
  email: string;
}

interface Invoice {
  id: string;
  client: string;
  totalAmount: number;
  status: 'PAID' | 'UNPAID' | 'PENDING' | string;
  date: string;
}

interface DashboardData {
  totalInvoices: number;
  pendingPayments: number;
  totalClients: number;
  recentInvoices: Invoice[];
}


export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch('/api/session')
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Invalid token' || data.message === 'Token not found') {
          window.location.href = '/login';
        } else {
          setUser(data.user);
          return fetch('/api/dashboard', { credentials: 'include' });
        }
      })
      .then(res => {
        if (res && !res.ok) throw new Error('Failed to fetch dashboard');
        return res ? res.json() : null;
      })
      .then(data => {
        if (data) setDashboardData(data);
      })
      .catch(() => setDashboardData(null));
  }, []);

  const formatCurrency = (amount: number): string =>
    'NPR ' + amount.toLocaleString('en-IN');

  const statusColor: Record<string, string> = {
    PAID: 'text-green-400',
    UNPAID: 'text-red-400',
    PENDING: 'text-yellow-400',
  };

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Topbar */}
      <div className="bg-gray-800 shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-gray-300">Hi, {user?.email || 'User'}</div>
      </div>

      {/* Main */}
      <main className="p-6 space-y-6">
        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-200">Total Invoices</h2>
            <p className="text-3xl font-bold text-blue-400">{formatCurrency(dashboardData.totalInvoices)}</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-200">Pending Payments</h2>
            <p className="text-3xl font-bold text-orange-400">{formatCurrency(dashboardData.pendingPayments)}</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-200">Clients</h2>
            <p className="text-3xl font-bold text-green-400">{dashboardData.totalClients}</p>
          </div>
        </section>

        {/* Recent Invoices */}
        <section className="bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Recent Invoices</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-gray-300">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Client</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentInvoices.map((invoice, i) => (
                  <tr key={invoice.id} className="border-b border-gray-700">
                    <td className="p-2">INV-{i + 1}</td>
                    <td className="p-2">{invoice.client}</td>
                    <td className="p-2">{formatCurrency(invoice.totalAmount)}</td>
                    <td className={`p-2 font-medium ${statusColor[invoice.status] || 'text-gray-300'}`}>
                      {invoice.status.charAt(0) + invoice.status.slice(1).toLowerCase()}
                    </td>
                    <td className="p-2">
                      {new Date(invoice.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
