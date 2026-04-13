'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-black mb-4 tracking-tighter">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last Updated: April 2026</p>

        <div className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white max-w-none">
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create or modify your account. The types of information we may collect include your name, email address, company structure, and tax codes.</p>

          <h3>2. How We Use Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services, such as facilitating invoice creation and automated tax reporting.</p>

          <h3>3. Data Retention</h3>
          <p>We store the information we collect on Amazon Web Services (AWS). Your financial logs are kept securely as long as your account remains active.</p>

          <h3>4. AI Data Processing</h3>
          <p>If you utilize the "AI Audit" feature, invoice data is parsed to OpenAI for analysis. We explicitly opt-out of allowing OpenAI to train their models on our payload data.</p>
        </div>
      </div>
    </div>
  );
}
