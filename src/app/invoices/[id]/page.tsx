"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Item {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export default function ViewInvoicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<{
    clientId: { name: string };
    date: string;
    dueDate: string;
    status: string;
    notes?: string;
    items: Item[];
    totalAmount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  
  if (!id) {
    return (
      <div className="p-6 text-red-400">
        Invalid invoice ID.{" "}
        <button
          onClick={() => router.push("/invoices")}
          className="underline"
        >
          Back to list
        </button>
      </div>
    );
  }

  useEffect(() => {
    setLoading(true);
    fetch(`/api/invoices/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setInvoice({
          ...data,
          date: new Date(data.date).toLocaleDateString(),
          dueDate: new Date(data.dueDate).toLocaleDateString(),
        });
      })
      .catch(() => {
        setInvoice(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6 text-white">Loading invoice…</div>;
  }
  if (!invoice) {
    return (
      <div className="p-6 text-red-400">
        Invoice not found.{" "}
        <button onClick={() => router.push("/invoices")} className="underline">
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="print-container">
      <div className="min-h-screen bg-black py-8 px-4 text-white">
        <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
          <header className="flex justify-between items-center mb-6">
            {/* Now safe to call slice on `id` */}
            <h1 className="text-2xl font-bold">
              Invoice #{id.slice(-6)}
            </h1>
            <button
              onClick={() => router.push("/invoices")}
              className="text-blue-400 hover:underline"
            >
              Back to Invoices
            </button>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-300">
            <div>
              <p>
                <span className="font-medium">Client:</span>{" "}
                {invoice.clientId.name}
              </p>
              <p>
                <span className="font-medium">Issued:</span> {invoice.date}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Due:</span> {invoice.dueDate}
              </p>
              <p>
                <span className="font-medium">Status:</span> {invoice.status}
              </p>
            </div>
          </section>

          <table className="w-full text-sm mb-6 border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="py-2 text-left w-2/5">Description</th>
                <th className="py-2 text-center w-1/5">Qty</th>
                <th className="py-2 text-center w-1/5">Price</th>
                <th className="py-2 text-center w-1/5">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className={idx % 2 ? "bg-gray-800" : ""}>
                  <td className="py-2">{item.description}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-center">
                    NPR {item.price.toFixed(2)}
                  </td>
                  <td className="py-2 text-center">
                    NPR {item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-lg font-semibold text-gray-200 mb-6">
            Total: NPR {invoice.totalAmount.toFixed(2)}
          </div>

          {invoice.notes && (
            <div className="bg-gray-800 p-4 rounded mb-4">
              <h3 className="font-medium mb-1">Notes</h3>
              <p className="text-gray-300">{invoice.notes}</p>
            </div>
          )}

          <button
            onClick={() => router.push(`/invoices/${id}/edit`)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Edit Invoice
          </button>
          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg ml-4"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
