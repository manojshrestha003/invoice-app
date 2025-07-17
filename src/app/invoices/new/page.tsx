"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
  const router = useRouter();
  const [clients, setClients] = useState<any[]>([]);
  const [form, setForm] = useState({
    clientId: "",
    dueDate: "",
    status: "PENDING",
    notes: "",
    items: [{ description: "", quantity: 1, price: 0, total: 0 }],
  });

  
  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then(setClients);
  }, []);

  const handleItemChange = (
    idx: number,
    key: "description" | "quantity" | "price",
    val: string | number
  ) => {
    const items = form.items.map((item, i) => {
      if (i !== idx) return item;
      const updated = {
        ...item,
        [key]: key === "quantity" || key === "price" ? +val : val,
      };
      updated.total = updated.quantity * updated.price;
      return updated;
    });
    setForm({ ...form, items });
  };

  const addRow = () =>
    setForm({
      ...form,
      items: [
        ...form.items,
        { description: "", quantity: 1, price: 0, total: 0 },
      ],
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/invoices");
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Create New Invoice
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client & Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Client
              </label>
              <select
                required
                value={form.clientId}
                onChange={(e) =>
                  setForm({ ...form, clientId: e.target.value })
                }
                className="w-full py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                required
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["PENDING", "PAID", "UNPAID"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Notes
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
                className="w-full py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Items Header */}
          <div className="flex items-center text-gray-400 font-medium border-b border-gray-700 pb-2">
            <span className="w-2/5">Description</span>
            <span className="w-1/5 text-center">Quantity</span>
            <span className="w-1/5 text-center">Price</span>
            <span className="w-1/5 text-center">Total</span>
          </div>

          {/* Items Rows */}
          <div className="space-y-4">
            {form.items.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(idx, "description", e.target.value)
                  }
                  className="w-2/5 py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(idx, "quantity", e.target.value)
                  }
                  className="w-1/5 py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <input
                  type="number"
                  min={0}
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(idx, "price", e.target.value)
                  }
                  className="w-1/5 py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <span className="w-1/5 text-center text-gray-200">
                  {item.total.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addRow}
              className="text-blue-400 hover:text-blue-300"
            >
              + Add Item
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
