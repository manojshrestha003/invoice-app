'use client';

import React from 'react';

export default function APIReferencePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest border border-purple-500/20 mb-6">Developers</div>
        <h1 className="text-4xl sm:text-5xl font-black mb-8 tracking-tight">API Reference <span className="text-gray-500 font-normal">v1.0</span></h1>

        <p className="text-gray-400 text-lg mb-12">Integrate HisabKitab directly into your workflow using our secure RESTful JSON API.</p>

        <div className="space-y-12">
          {/* Endpoint Item */}
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-[#161616] px-6 py-4 border-b border-white/5 flex items-center gap-4">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-sm font-black font-mono">GET</span>
              <span className="font-mono text-white">/api/invoices</span>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">Retrieves a paginated list of all invoices associated with your account.</p>
              <div className="bg-black p-4 rounded-xl border border-white/5 font-mono text-sm text-gray-300 overflow-x-auto">
                {`curl -X GET "https://api.hisabkitab.app/v1/invoices" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
              </div>
            </div>
          </div>

          {/* Endpoint Item */}
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-[#161616] px-6 py-4 border-b border-white/5 flex items-center gap-4">
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md text-sm font-black font-mono">POST</span>
              <span className="font-mono text-white">/api/invoices</span>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">Creates a new invoice and automatically calculates total tax and liability.</p>
              <div className="bg-black p-4 rounded-xl border border-white/5 font-mono text-sm text-gray-300 overflow-x-auto">
                {`curl -X POST "https://api.hisabkitab.app/v1/invoices" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "clientId": "60d...a4",
    "dueDate": "2026-05-01",
    "items": [{ "description": "Consulting", "quantity": 10, "price": 100 }]
  }'`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
