"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

interface Item {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<{
    clientId: string;
    dueDate: string;
    status: string;
    notes: string;
    items: Item[];
  }>({
    clientId: "",
    dueDate: "",
    status: "PENDING",
    notes: "",
    items: [{ description: "", quantity: 1, price: 0, total: 0 }],
  });
  const [clients, setClients] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/clients`).then((r) => r.json()),
      fetch(`/api/invoices/${id}`).then((r) => r.json()),
    ]).then(([clientsData, invoice]) => {
      setClients(clientsData);
      const due = new Date(invoice.dueDate)
        .toISOString()
        .substring(0, 10);
      setForm({
        clientId: invoice.clientId?._id || invoice.clientId || "",
        dueDate: due,
        status: invoice.status,
        notes: invoice.notes || "",
        items: invoice.items.map((it: any) => ({
          description: it.description,
          quantity: it.quantity,
          price: it.price,
          total: it.quantity * it.price,
        })),
      });
      setLoading(false);
    }).catch(() => {
      toast.error("Failed to load invoice details");
      setLoading(false);
    });
  }, [id]);

  const handleItemChange = (
    idx: number,
    key: keyof Item,
    val: string | number
  ) => {
    setForm((prev) => {
      const items = prev.items.map((item, i) =>
        i === idx
          ? {
              ...item,
              [key]: key === "quantity" || key === "price" ? +val : val,
            }
          : item
      );
      items[idx].total = items[idx].quantity * items[idx].price;
      return { ...prev, items };
    });
  };

  const addRow = () =>
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, price: 0, total: 0 }],
    }));

  const removeRow = (idx: number) => {
    if (form.items.length === 1) return;
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientId) {
      toast.error("Please select a client");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Invoice updated successfully!");
        router.push("/invoices");
      } else {
        toast.error("Failed to update invoice");
      }
    } catch (err) {
      toast.error("An error occurred while saving");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
        <svg className="w-10 h-10 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-purple-500/30 font-sans pb-12">
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center gap-4">
        <button type="button" onClick={() => router.push('/invoices')} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Edit Invoice</h1>
          <p className="text-sm font-medium text-gray-400">Update existing billing details</p>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-5xl mx-auto mt-4">
        <section className="bg-[#111111] border border-white/[0.08] rounded-[1rem] overflow-hidden shadow-2xl relative p-8 md:p-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="relative space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Client *</label>
                <select
                  required
                  value={form.clientId}
                  onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium appearance-none"
                >
                  <option value="" disabled>Select Client</option>
                  {clients.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Due Date *</label>
                <input
                  type="date"
                  required
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium appearance-none block"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium appearance-none"
                >
                  {["PENDING", "PAID", "UNPAID"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="Payment instructions or additional details..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder-gray-600 font-medium resize-none"
              />
            </div>

            <div className="pt-6 border-t border-white/[0.04] space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-gray-300">Line Items</h3>
              </div>
              
              <div className="space-y-3">
                {form.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#161616]/50 p-2 pr-4 rounded-xl border border-white/5 relative group">
                    <input
                      placeholder="Item description"
                      required
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      className="flex-1 w-full bg-transparent border border-transparent text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-purple-500/30 focus:bg-[#161616] transition-all placeholder-gray-600 font-medium"
                    />
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-bold uppercase">Qty</span>
                        <input
                          type="number"
                          min={1}
                          required
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                          className="w-20 bg-[#0A0A0A] border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50 transition-all text-center font-mono"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-bold uppercase">Price</span>
                        <input
                           type="number"
                           min={0}
                           step="0.01"
                           required
                           value={item.price || ''}
                           onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                           className="w-24 bg-[#0A0A0A] border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50 transition-all text-right font-mono"
                        />
                      </div>
                      <div className="w-24 text-right font-mono font-bold text-gray-300 pointer-events-none">
                        {(item.quantity * item.price).toFixed(2)}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRow(idx)}
                        disabled={form.items.length === 1}
                        className="w-8 h-8 flex justify-center items-center text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={addRow}
                  className="text-purple-400 hover:text-purple-300 font-bold text-sm flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-purple-500/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Line Item
                </button>
                <div className="text-right">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-500 mr-4">Total Amount</span>
                  <span className="text-2xl font-black text-white tracking-tight">NPR {form.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-end gap-4 border-t border-white/[0.04]">
              <button
                type="button"
                onClick={() => router.push('/invoices')}
                className="px-6 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none flex items-center gap-2"
              >
                {isSubmitting ? 'Saving...' : 'Update Invoice'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
