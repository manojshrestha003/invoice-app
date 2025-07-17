"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  useEffect(()=>{
    fetch('/api/invoices')
      .then(r=>r.json())
      .then(setInvoices);
  },[]);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <Link href="/invoices/new" className="bg-blue-600 px-4 py-2 rounded">+ New Invoice</Link>
      </div>
      <div className="bg-gray-900 rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv=>(
              <tr key={inv._id} className="border-b border-gray-700">
                <td className="px-4 py-2">{inv._id.slice(-6)}</td>
                <td className="px-4 py-2">{inv.clientId.name}</td>
                <td className="px-4 py-2">{new Date(inv.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">NPR {inv.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-2">{inv.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link href={`/invoices/${inv._id}`} className="text-blue-400">View</Link>
                  <Link href={`/invoices/${inv._id}/edit`} className="text-green-400">Edit</Link>
                  <button onClick={async()=>{
                    if(confirm('Delete?')){
                      await fetch(`/api/invoices/${inv._id}`,{method:'DELETE'});
                      setInvoices(prev=>prev.filter(i=>i._id!==inv._id));
                    }
                  }} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
