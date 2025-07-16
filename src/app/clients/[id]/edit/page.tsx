

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
    await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    router.push('/clients');
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-6">Edit Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="name"
          value={client.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          name="email"
          value={client.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          name="phone"
          value={client.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          name="company"
          value={client.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Update Client
        </button>
      </form>
    </div>
  );
}
