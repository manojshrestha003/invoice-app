// app/clients/page.tsx

import Link from "next/link";

const dummyClients = [
  { id: 1, name: "Manoj Shrestha", email: "manoj@example.com", phone: "9841234567", company: "Manoj Co." },
  { id: 2, name: "Sita Rai", email: "sita@example.com", phone: "9812345678", company: "Sita Traders" },
];

export default function ClientsPage() {
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {dummyClients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
