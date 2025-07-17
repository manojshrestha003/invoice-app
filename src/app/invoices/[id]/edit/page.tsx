"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Item {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = useParams();
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

  // Fetch invoice & clients on mount
  useEffect(() => {
    Promise.all([
      fetch(`/api/clients`).then((r) => r.json()),
      fetch(`/api/invoices/${id}`).then((r) => r.json()),
    ]).then(([clientsData, invoice]) => {
      setClients(clientsData);
      // Convert dates to yyyy-MM-dd for input[type=date]
      const due = new Date(invoice.dueDate)
        .toISOString()
        .substring(0, 10);
      setForm({
        clientId: invoice.clientId,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/invoices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/invoices");
  };

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 text-white">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Invoice</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client & Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client</label>
              <select
                required
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full py-2 px-3 bg-gray-800 rounded-lg"
              >
                {clients.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                required
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full py-2 px-3 bg-gray-800 rounded-lg"
              />
            </div>
          </div>

          {/* Status & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full py-2 px-3 bg-gray-800 rounded-lg"
              >
                {["PENDING", "PAID", "UNPAID"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full py-2 px-3 bg-gray-800 rounded-lg"
              />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-400 font-medium border-b border-gray-700 pb-2">
              <span className="w-2/5">Description</span>
              <span className="w-1/5 text-center">Quantity</span>
              <span className="w-1/5 text-center">Price</span>
              <span className="w-1/5 text-center">Total</span>
            </div>
            {form.items.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                  className="w-2/5 py-2 px-3 bg-gray-800 rounded-lg"
                />
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                  className="w-1/5 py-2 px-3 bg-gray-800 rounded-lg text-center"
                />
                <input
                  type="number"
                  min={0}
                  value={item.price}
                  onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                  className="w-1/5 py-2 px-3 bg-gray-800 rounded-lg text-center"
                />
                <span className="w-1/5 text-center">{item.total.toFixed(2)}</span>
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
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
            >
              Update Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
