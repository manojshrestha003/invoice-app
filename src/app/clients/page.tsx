"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!clientToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/clients/${clientToDelete._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Client deleted successfully");
        setClients(clients.filter(c => c._id !== clientToDelete._id));
      } else {
        toast.error("Failed to delete client");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setClientToDelete(null);
    }
  };

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
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30 font-sans pb-12">
      {/* Header Setup */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-white tracking-tight">Clients</h1>
          <div className="hidden md:flex h-6 w-px bg-white/10"></div>
          <p className="hidden md:block text-sm font-medium text-gray-400">Manage your business relationships</p>
        </div>
        <Link
          href="/clients/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-blue-600/20 transform hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Client
        </Link>
      </header>

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto mt-4">
        {/* Clients List Section */}
        <section className="bg-[#111111] border border-white/[0.08] rounded-[2rem] overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="relative p-6 md:p-8 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Client Directory</h2>
              <p className="text-sm text-gray-400 mt-1 font-medium">{clients.length} total client{clients.length !== 1 ? 's' : ''} found.</p>
            </div>
            {/* Future search bar could go here */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Search clients..." className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-[#161616] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium" />
              </div>
            </div>
          </div>
          
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#161616]/80 text-gray-400 backdrop-blur-sm">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Name</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Contact Info</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Company</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {clients.map((client) => (
                  <tr key={client._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-400 font-bold text-lg shadow-inner">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-bold text-gray-200 group-hover:text-white transition-colors text-base">{client.name}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2.5 text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                          <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          <span>{client.email}</span>
                        </div>
                        {client.phone && (
                          <div className="flex items-center gap-2.5 text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                            <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>{client.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-300 font-bold transition-colors group-hover:bg-white/10 group-hover:border-white/10">
                        <svg className="w-4 h-4 opacity-50 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        {client.company || <span className="text-gray-500 font-medium italic">N/A</span>}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 transition-opacity">
                        <Link
                          href={`/clients/${client._id}/edit`}
                          className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all border border-blue-500/20 hover:-translate-y-0.5"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          <span className="hidden sm:block text-xs font-bold uppercase tracking-wider">Edit</span>
                        </Link>
                        <button
                          onClick={() => {
                            setClientToDelete(client);
                            setDeleteModalOpen(true);
                          }}
                          className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all border border-red-500/20 hover:-translate-y-0.5"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          <span className="hidden sm:block text-xs font-bold uppercase tracking-wider">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="inline-flex flex-col items-center justify-center text-gray-500">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5 border border-white/5 shadow-inner">
                          <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">No clients found</span>
                        <p className="mt-2 text-sm text-gray-500 font-medium">Click "Add Client" to create your first connection.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-5 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 shadow-inner">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              
              <h3 className="text-xl font-bold text-center text-white tracking-tight mb-2">Delete Client</h3>
              <p className="text-center text-gray-400 text-sm font-medium leading-relaxed mb-8">
                Are you absolutely sure you want to delete <strong className="text-gray-200">{clientToDelete.name}</strong>? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-[#161616] hover:bg-[#222222] text-white text-sm font-bold rounded-xl transition-colors border border-white/10 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin text-white/70" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Deleting...
                    </>
                  ) : (
                    'Yes, Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
