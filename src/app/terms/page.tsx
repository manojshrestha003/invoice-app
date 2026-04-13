'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-black mb-4 tracking-tighter">Terms of Service</h1>
        <p className="text-gray-400 mb-12">Effective Date: April 2026</p>

        <div className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white max-w-none">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using HisabKitab, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>

          <h3>2. User Responsibilities</h3>
          <p>You are responsible for maintaining the confidentiality of your account and password. HisabKitab is not liable for any losses caused by compromised passwords due to user negligence.</p>

          <h3>3. Acceptable Use</h3>
          <p>You agree not to use the platform for creating fraudulent or illegal invoices, money laundering attempts, or violating any state or federal commercial laws.</p>

          <h3>4. Service Modifications</h3>
          <p>HisabKitab reserves the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice.</p>
        </div>
      </div>
    </div>
  );
}
