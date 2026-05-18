"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, FunnelIcon, ArrowPathIcon } from "@heroicons/react/24/outline";


interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  taxAmount: number;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter/Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, amount-high, amount-low

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Software');
  const [description, setDescription] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [expenses, searchQuery, categoryFilter, sortBy]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...expenses];

    // Search
    if (searchQuery) {
      result = result.filter(e =>
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (categoryFilter !== "All") {
      result = result.filter(e => e.category === categoryFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest": return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-high": return b.amount - a.amount;
        case "amount-low": return a.amount - b.amount;
        default: return 0;
      }
    });

    setFilteredExpenses(result);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          category,
          description,
          taxAmount: Number(taxAmount || 0),
          date: date || new Date().toISOString()
        })
      });
      if (res.ok) {
        setShowModal(false);
        setAmount('');
        setDescription('');
        setTaxAmount('');
        fetchExpenses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Metrics
  const totalSpend = expenses.reduce((sum, e) => sum + e.amount, 0);
  const avgExpense = expenses.length > 0 ? totalSpend / expenses.length : 0;
  const categories = ["Software", "Hardware", "Travel", "Meals", "Office Supplies", "Other"];

  const categoryCounts = expenses.reduce((acc: any, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const topCategory = Object.keys(categoryCounts).length > 0
    ? Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b)
    : "None";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-12">
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black mb-1">Expense Management</h1>
          <p className="text-gray-400 text-sm">Centralized tracking for all business outgoings.</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchExpenses}
            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            title="Refresh Data"
          >
            <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all">
            + Log Expense
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111] border border-white/10 rounded-lg p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Total Expenditures</p>
            <h2 className="text-3xl font-black font-mono">NPR {totalSpend.toLocaleString()}</h2>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded font-bold">LIFETIME</span>
            </div>
          </div>
          <div className="bg-[#111] border border-white/10 rounded-lg p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Top Spending Category</p>
            <h2 className="text-3xl font-black text-purple-400">{topCategory}</h2>
            <p className="text-sm text-gray-400 mt-4">Primary cost driver</p>
          </div>
          <div className="bg-[#111] border border-white/10 rounded-lg p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Average Purchase</p>
            <h2 className="text-3xl font-black font-mono">NPR {Math.round(avgExpense).toLocaleString()}</h2>
            <p className="text-sm text-gray-400 mt-4">Per transaction</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.03] border border-white/10 p-4 rounded-xl">
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-purple-500/50 outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-black border border-white/10 rounded-xl px-4 py-3 min-w-[160px]">
              <FunnelIcon className="w-4 h-4 text-gray-500" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent border-none text-sm outline-none w-full [color-scheme:dark] cursor-pointer"
              >
                <option value="All" className="bg-[#0A0A0A]">All Categories</option>
                {categories.map(cat => <option key={cat} className="bg-[#0A0A0A]">{cat}</option>)}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm outline-none transition-all [color-scheme:dark] cursor-pointer"
            >
              <option value="newest" className="bg-[#0A0A0A]">Newest First</option>
              <option value="oldest" className="bg-[#0A0A0A]">Oldest First</option>
              <option value="amount-high" className="bg-[#0A0A0A]">Highest Amount</option>
              <option value="amount-low" className="bg-[#0A0A0A]">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-400">Date Logged</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-400">Classification</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-400">Description / Memo</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Tax (VAT)</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Gross Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {loading ? (
                  <tr><td colSpan={5} className="p-12 text-center text-gray-500 animate-pulse">Syncing data...</td></tr>
                ) : filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                          <MagnifyingGlassIcon className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-white font-bold">No results found</p>
                          <p className="text-gray-500 text-xs">Try adjusting your search query or filters.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : filteredExpenses.map(exp => (
                  <tr key={exp._id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="p-5 font-mono text-gray-400">{new Date(exp.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</td>
                    <td className="p-5">
                      <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all group-hover:bg-purple-500/20">{exp.category}</span>
                    </td>
                    <td className="p-5 text-gray-200 font-medium">{exp.description}</td>
                    <td className="p-5 text-right text-orange-400/80 font-mono">NPR {exp.taxAmount.toLocaleString()}</td>
                    <td className="p-5 text-right font-black tracking-tight text-white font-mono">NPR {exp.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-black mb-1">New Expenditure</h2>
                <p className="text-gray-400 text-sm">Add a new record to your financial ledger.</p>
              </div>

              <form onSubmit={handleAddExpense} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Total Amount (NPR)</label>
                    <input
                      type="number"
                      required
                      autoFocus
                      placeholder="0.00"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/[0.08] transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Includes Tax (Optional)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={taxAmount}
                      onChange={e => setTaxAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/[0.08] transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Spending Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none appearance-none cursor-pointer [color-scheme:dark]"
                  >
                    {categories.map(cat => <option key={cat} className="bg-[#0A0A0A]">{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Description / Vendor / Purpose</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Monthly Coffee Subscription"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/[0.08] transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Transaction Date (Leave for Today)</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 rounded-xl shadow-xl shadow-purple-600/20 active:scale-[0.98] transition-all uppercase tracking-widest text-xs">
                    Confirm Expenditure
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Extra import for XMarkIcon
import { XMarkIcon } from "@heroicons/react/24/outline";
