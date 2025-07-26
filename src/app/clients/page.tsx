"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
  const fetchClients = async () => {
  try {
    const res = await fetch("/api/clients", {
      credentials: "include", 
    });

    if (!res.ok) throw new Error("Unauthorized");

    const data = await res.json();
    setClients(data);
  } catch (error) {
    console.error("Failed to fetch clients:", error);
  }
};
    fetchClients();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Link
          href="/clients/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Client
        </Link>
      </div>

      <div className="bg-gray-900 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Company</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {clients.map((client) => (
              <tr key={client._id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.company}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    href={`/clients/${client._id}/edit`}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      if (confirm("Are you sure you want to delete this client?")) {
                        await fetch(`/api/clients/${client._id}`, { method: "DELETE" });
                        window.location.reload(); 
                      }
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center px-6 py-4 text-gray-400">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
