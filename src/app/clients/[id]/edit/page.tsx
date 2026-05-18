

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function EditClientPage() {
  const router = useRouter();
  const { id } = useParams();
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`/api/clients/${id}`);
      const data = await res.json();
      setClient(data);
    };
    fetchClient();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    if (res.ok) {
      toast.success('Client updated successfully!');
      router.push('/clients');
    } else {
      toast.error('Failed to update client');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30 font-sans pb-12">
      {/* Header Setup */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center gap-4">
        <button type="button" onClick={() => router.push('/clients')} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Edit Client</h1>
          <p className="text-sm font-medium text-gray-400">Update client Information</p>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-4xl mx-auto mt-4">
        <section className="bg-[#111111] border border-white/[0.08] rounded-[1rem] overflow-hidden shadow-2xl relative p-8 md:p-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="relative space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name *</label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. Acme Corp"
                  required
                  value={client.name || ''}
                  onChange={handleChange}
                  className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="contact@example.com"
                  required
                  value={client.email || ''}
                  onChange={handleChange}
                  className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number *</label>
                <input
                  name="phone"
                  type="text"
                  placeholder="+9770000000000"
                  required
                  value={client.phone || ''}
                  onChange={handleChange}
                  className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Company</label>
                <input
                  name="company"
                  type="text"
                  placeholder="Company Name"
                  value={client.company || ''}
                  onChange={handleChange}
                  className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600 font-medium"
                />
              </div>
            </div>
            
            <div className="pt-8 flex items-center justify-end gap-4 border-t border-white/[0.04]">
              <button
                type="button"
                onClick={() => router.push('/clients')}
                className="px-6 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none flex items-center gap-2"
              >
                Update Client
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
