'use client'
import {
  XMarkIcon,
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface Item {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface AIFeedback {
  score: number;
  criticalIssues: string[];
  warnings: string[];
  suggestions: string[];
}

export default function ViewInvoicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<{
    _id: string;
    clientId: { name: string; email?: string; phone?: string; company?: string };
    date: string;
    dueDate: string;
    status: string;
    notes?: string;
    items: Item[];
    totalAmount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiLoading, setAILoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);

  const handleAIAudit = async () => {
    setShowAIModal(true);
    setAILoading(true);
    setAiFeedback(null);
    try {
      const res = await fetch("/api/ai-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice)
      });
      const data = await res.json();
      setAiFeedback(data);
    } catch (err) {
      toast.error("AI Audit failed. Check your API key.");
      setShowAIModal(false);
    } finally {
      setAILoading(false);
    }
  };

  const ScoreGauge = ({ score }: { score: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score > 80 ? '#22c55e' : score > 50 ? '#eab308' : '#ef4444';

    return (
      <div className="relative flex flex-col items-center">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle cx="80" cy="80" r={radius} className="stroke-white/5" strokeWidth="8" fill="none" />
          <circle
            cx="80" cy="80" r={radius}
            className="transition-all duration-1000 ease-out"
            strokeWidth="8"
            fill="none"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-4xl font-black font-mono leading-none">{score}</span>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Score</p>
        </div>
      </div>
    );
  };

  if (!id) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Invalid Invoice ID</h2>
        <button onClick={() => router.push("/invoices")} className="text-purple-400 hover:text-purple-300 hover:underline">Return to Invoices</button>
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
          date: new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          dueDate: new Date(data.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        });
      })
      .catch(() => {
        toast.error("Failed to load invoice");
        setInvoice(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
        <svg className="w-10 h-10 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Invoice Not Found</h2>
        <button onClick={() => router.push("/invoices")} className="text-purple-400 hover:text-purple-300 hover:underline">Return to Invoices</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-purple-500/30 font-sans pb-12 print:bg-white print:text-black print:pb-0 relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}} />
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => router.push('/invoices')} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
              INV-{invoice._id.slice(-6).toUpperCase()}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border
                ${invoice.status === 'PAID' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  invoice.status === 'UNPAID' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                {invoice.status}
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAIAudit}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl text-sm font-bold transition-colors border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            AI Audit
          </button>
          <button
            onClick={() => router.push(`/invoices/${id}/edit`)}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-gray-300 transition-colors border border-white/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Edit
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold text-white transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print / PDF
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-4xl mx-auto mt-4 print:p-0 print:m-0 print:max-w-none">
        <section className="bg-[#111111] print:bg-white border border-white/[0.08] print:border-none rounded-[1rem] print:rounded-none overflow-hidden shadow-2xl print:shadow-none relative p-8 md:p-12 print:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 print:hidden rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

          <div className="relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 pb-8 border-b border-white/[0.04] print:border-gray-200">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg print:border print:border-gray-300 print:bg-white">
                  <span className="text-2xl font-black text-white print:text-black tracking-tighter">HK</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight print:text-black">HisabKitab </h2>
                
              </div>

              <div className="md:text-right">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Invoice Number</p>
                <p className="text-2xl font-black font-mono tracking-tight print:text-black mb-4 flex items-center md:justify-end gap-2">
                  <span className="text-purple-500">#</span>{invoice._id.slice(-6).toUpperCase()}
                </p>

                <div className="flex gap-8 md:justify-end">
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">Issue Date</p>
                    <p className="text-sm font-medium text-gray-200 print:text-black">{invoice.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">Due Date</p>
                    <p className="text-sm font-medium text-gray-200 print:text-black">{invoice.dueDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Billed To</p>
              <h3 className="text-xl font-bold tracking-tight print:text-black mb-2">{invoice.clientId.name}</h3>
              {invoice.clientId.company && <p className="text-gray-400 print:text-gray-600 text-sm mb-1">{invoice.clientId.company}</p>}
              {invoice.clientId.email && <p className="text-gray-400 print:text-gray-600 text-sm mb-1">{invoice.clientId.email}</p>}
              {invoice.clientId.phone && <p className="text-gray-400 print:text-gray-600 text-sm">{invoice.clientId.phone}</p>}
            </div>

            <div className="mb-8 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-white/10 print:border-gray-300">
                    <th className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400 print:text-gray-600">Description</th>
                    <th className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400 print:text-gray-600 text-center w-24">Qty</th>
                    <th className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400 print:text-gray-600 text-right w-32">Price</th>
                    <th className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400 print:text-gray-600 text-right w-32">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] print:divide-gray-200">
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="group">
                      <td className="py-5 text-sm font-medium text-gray-200 print:text-black">{item.description}</td>
                      <td className="py-5 text-sm font-mono text-gray-400 print:text-gray-600 text-center">{item.quantity}</td>
                      <td className="py-5 text-sm font-mono text-gray-400 print:text-gray-600 text-right">{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="py-5 text-sm font-mono font-bold text-white print:text-black text-right">{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-6 border-t border-white/[0.08] print:border-gray-300">
              <div className="w-full md:w-1/2">
                {invoice.notes && (
                  <div className="bg-[#161616] p-5 rounded-xl border border-white/5 print:bg-gray-50 print:border-gray-200">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Notes</p>
                    <p className="text-sm font-medium text-gray-300 print:text-gray-700 leading-relaxed">{invoice.notes}</p>
                  </div>
                )}
              </div>

              <div className="w-full md:w-auto">
                <div className="flex justify-between items-center gap-12 mb-3 px-4">
                  <span className="text-sm font-bold text-gray-400 print:text-gray-600">Subtotal</span>
                  <span className="text-sm font-mono font-bold text-gray-200 print:text-black text-right">{invoice.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-transparent print:bg-purple-50 print:border-purple-200 rounded-xl p-6 border border-purple-500/20">
                  <div className="flex justify-between items-center gap-12">
                    <span className="text-sm font-black uppercase tracking-widest text-purple-400 print:text-purple-700">Total Due</span>
                    <span className="text-3xl font-black font-mono text-white print:text-black tracking-tight text-right">
                      <span className="text-lg text-purple-500 print:text-purple-600 mr-1 opacity-70">NPR</span>
                      {invoice.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/[0.04] print:border-gray-200 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Thank you for your business!</p>
            </div>
          </div>
        </section>
      </main>

      {/* AI Audit Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex justify-center items-center z-50 print:hidden p-4">
          <div className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowAIModal(false)} className="absolute top-8 right-8 p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <XMarkIcon className="w-6 h-6" />
            </button>

            {aiLoading ? (
              <div className="py-20 flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full animate-ping absolute inset-0"></div>
                  <div className="w-20 h-20 border-t-4 border-blue-500 rounded-full animate-spin relative z-10"></div>
                </div>
                <h2 className="text-2xl font-black mb-2 animate-pulse">Analyzing Financial Patterns</h2>
                <p className="text-gray-400 text-sm font-medium">Running CPA-grade heuristics on your invoice...</p>
              </div>
            ) : aiFeedback ? (
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-10 pb-8 border-b border-white/5">
                  <ScoreGauge score={aiFeedback.score} />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-black mb-2 flex items-center justify-center md:justify-start gap-3">
                      Audit Diagnostic
                      <SparklesIcon className="w-6 h-6 text-blue-400" />
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {aiFeedback.score > 80 ? "Your invoice is highly professional and ready for dispatch." :
                        aiFeedback.score > 50 ? "Minor improvements detected that could enhance payment probability." :
                          "Calibration required. Critical discrepancies detected in the financial structure."}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Critical Issues */}
                  {(aiFeedback.criticalIssues ?? []).length > 0 && (
                    <section>
                      <h3 className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2 mb-4">
                        <ShieldExclamationIcon className="w-4 h-4" />
                        Critical Discrepancies ({(aiFeedback.criticalIssues ?? []).length})
                      </h3>
                      <div className="space-y-3">
                        {(aiFeedback.criticalIssues ?? []).map((issue, idx) => (
                          <div key={idx} className="bg-red-500/5 border border-red-500/10 p-4 rounded-2xl flex gap-4 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                            <p className="text-sm text-red-200/90 font-medium">{issue}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Warnings */}
                  {(aiFeedback.warnings ?? []).length > 0 && (
                    <section>
                      <h3 className="text-xs font-black uppercase tracking-widest text-yellow-500 flex items-center gap-2 mb-4">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        Optimization Warnings ({(aiFeedback.warnings ?? []).length})
                      </h3>
                      <div className="space-y-3">
                        {(aiFeedback.warnings ?? []).map((warning, idx) => (
                          <div key={idx} className="bg-yellow-500/5 border border-yellow-500/10 p-4 rounded-2xl flex gap-4 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0"></div>
                            <p className="text-sm text-yellow-200/90 font-medium">{warning}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Suggestions */}
                  {(aiFeedback.suggestions ?? []).length > 0 && (
                    <section>
                      <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2 mb-4">
                        <LightBulbIcon className="w-4 h-4" />
                        Professional Suggestions ({(aiFeedback.suggestions ?? []).length})
                      </h3>
                      <div className="space-y-3">
                        {(aiFeedback.suggestions ?? []).map((suggestion, idx) => (
                          <div key={idx} className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-4 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                            <p className="text-sm text-blue-200/90 font-medium">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Perfect State fallback */}
                  {(aiFeedback.criticalIssues ?? []).length === 0 && (aiFeedback.warnings ?? []).length === 0 && (
                    <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl text-center">
                      <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-white mb-1">Pristine Financial Structure</h4>
                      <p className="text-sm text-gray-400">Our algorithms found no data inconsistencies in this document.</p>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setShowAIModal(false)}
                    className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs"
                  >
                    Acknowledge Report
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
