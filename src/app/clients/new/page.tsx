"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClientPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", address: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Client added!");
      router.push("/clients");
    } else {
      alert("Error adding client");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Client</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-md">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2"
          />
          <input
            name="company"
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2"
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Save Client
          </button>
        </form>
      </div>
    </div>
  );
}
