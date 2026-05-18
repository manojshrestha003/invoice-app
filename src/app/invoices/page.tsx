"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) => {
    const query = searchQuery.toLowerCase();
    const invoiceId = invoice._id.slice(-6).toUpperCase();
    const clientName = invoice.clientId?.name?.toLowerCase() || '';
    const status = invoice.status?.toLowerCase() || '';
    const amount = invoice.totalAmount?.toString() || '';
    const date = new Date(invoice.date).toLocaleDateString('en-US').toLowerCase();

    return (
      invoiceId.includes(query.toUpperCase()) ||
      clientName.includes(query) ||
      status.includes(query) ||
      amount.includes(query) ||
      date.includes(query)
    );
  });

  useEffect(() => {
    fetch('/api/invoices', { credentials: 'include' })
      .then(async (r) => {
        if (!r.ok) {
          const err = await r.json();
          throw new Error(err.message || 'Failed to fetch invoices');
        }
        return r.json();
      })
      .then(setInvoices)
      .catch((err) => toast.error(err.message));
  }, []);

  const confirmDelete = async () => {
    if (!invoiceToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/invoices/${invoiceToDelete._id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Invoice deleted successfully");
        setInvoices(invoices.filter((i: any) => i._id !== invoiceToDelete._id));
      } else {
        toast.error("Failed to delete invoice");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setInvoiceToDelete(null);
    }
  };

  const formatCurrency = (amount: number) => 'NPR ' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-purple-500/30 font-sans pb-12">
      {/* Header Setup */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-white tracking-tight">Invoices</h1>
          <div className="hidden md:flex h-6 w-px bg-white/10"></div>
          <p className="hidden md:block text-sm font-medium text-gray-400">Manage your billing and payments</p>
        </div>
        <Link
          href="/invoices/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold text-white transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] transform hover:-translate-y-0.5 border border-purple-500/50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Invoice
        </Link>
      </header>

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto mt-4">
        {/* Invoices List Section */}
        <section className="bg-[#111111] border border-white/[0.08] rounded-[1rem] overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

          <div className="relative p-6 md:p-8 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Invoice Ledger</h2>
              <p className="text-sm text-gray-400 mt-1 font-medium">{filteredInvoices.length} of {invoices.length} invoice{invoices.length !== 1 ? 's' : ''} found.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input 
                  type="text" 
                  placeholder="Search invoices..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-[#161616] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium" 
                />
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#161616]/80 text-gray-400 backdrop-blur-sm">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Invoice ID</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Client Info</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Amount & Date</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04]">Status</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] border-b border-white/[0.04] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredInvoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-mono text-xs font-bold text-gray-400 group-hover:text-purple-400 transition-colors bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg shadow-inner">
                        INV-{inv._id.slice(-6).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center text-purple-400 font-bold text-lg shadow-inner">
                          {inv.clientId?.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="font-bold text-gray-200 group-hover:text-white transition-colors text-base">{inv.clientId?.name || 'Unknown Client'}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-black text-white text-base tracking-tight">{formatCurrency(inv.totalAmount)}</span>
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {new Date(inv.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border
                        ${inv.status === 'PAID' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]' :
                          inv.status === 'UNPAID' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' :
                            'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse
                          ${inv.status === 'PAID' ? 'bg-green-400' :
                            inv.status === 'UNPAID' ? 'bg-red-400' :
                              'bg-orange-400'}`}></span>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 transition-opacity">
                        <Link
                          href={`/invoices/${inv._id}`}
                          className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 bg-gray-500/10 hover:bg-gray-500/20 text-gray-300 rounded-lg transition-all border border-gray-500/20 hover:-translate-y-0.5"
                          title="View"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          <span className="hidden sm:block text-xs font-bold uppercase tracking-wider">View</span>
                        </Link>
                        <Link
                          href={`/invoices/${inv._id}/edit`}
                          className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg transition-all border border-purple-500/20 hover:-translate-y-0.5"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          <span className="hidden sm:block text-xs font-bold uppercase tracking-wider">Edit</span>
                        </Link>
                        <button
                          onClick={() => {
                            setInvoiceToDelete(inv);
                            setDeleteModalOpen(true);
                          }}
                          className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all border border-red-500/20 hover:-translate-y-0.5"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          <span className="hidden sm:block text-xs font-bold uppercase tracking-wider">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredInvoices.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-24 text-center">
                      <div className="inline-flex flex-col items-center justify-center text-gray-500">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5 border border-white/5 shadow-inner">
                          <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">{searchQuery ? 'No matching invoices' : 'No invoices found'}</span>
                        <p className="mt-3 text-sm text-gray-500 font-medium max-w-sm mx-auto">{searchQuery ? 'Try adjusting your search criteria.' : 'Click "New Invoice" to create your first billing document and start getting paid.'}</p>
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
      {deleteModalOpen && invoiceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-5 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 shadow-inner">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </div>

              <h3 className="text-xl font-bold text-center text-white tracking-tight mb-2">Delete Invoice</h3>
              <p className="text-center text-gray-400 text-sm font-medium leading-relaxed mb-8">
                Are you sure you want to delete invoice <strong className="text-gray-200">INV-{invoiceToDelete._id.slice(-6).toUpperCase()}</strong>? This action cannot be undone.
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
