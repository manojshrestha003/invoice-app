"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

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
  const [loading, setLoading] = useState(true);

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

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      if(res.ok) {
        setShowModal(false);
        fetchExpenses();
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-12">
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black mb-1">Expense Tracking</h1>
          <p className="text-gray-400 text-sm">Monitor your company outgoings.</p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all">
            + New Expense
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400">Category</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400">Description</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Tax</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {expenses.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">No expenses logged yet.</td></tr>
                ) : expenses.map(exp => (
                  <tr key={exp._id} className="hover:bg-white/5">
                    <td className="p-4 text-sm">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-bold">{exp.category}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-300">{exp.description}</td>
                    <td className="p-4 text-sm text-right text-orange-400">${exp.taxAmount}</td>
                    <td className="p-4 text-sm text-right font-bold tracking-tight">${exp.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 z-[100] p-4">
            <div className="bg-[#111] border border-white/10 w-full max-w-lg rounded-2xl p-6 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
              <h2 className="text-xl font-bold mb-6">Log New Expense</h2>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Amount</label>
                  <input type="number" required value={amount} onChange={e=>setAmount(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Tax Included (Optional)</label>
                  <input type="number" value={taxAmount} onChange={e=>setTaxAmount(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Category</label>
                  <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white">
                    <option>Software</option>
                    <option>Hardware</option>
                    <option>Travel</option>
                    <option>Meals</option>
                    <option>Office Supplies</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Description</label>
                  <input type="text" required value={description} onChange={e=>setDescription(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 font-bold py-3 pt-4 rounded-xl">Save Expense</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
