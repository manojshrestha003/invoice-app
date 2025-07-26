'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    company: '',
    address: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-sm bg-white/5 border border-gray-700 shadow-2xl rounded-xl max-w-md w-full p-8 space-y-6 text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-4">Create Your Account</h1>

        {error && (
          <div className="bg-red-500/20 text-red-300 border border-red-500 rounded px-4 py-2 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company (optional)"
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address (optional)"
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-md shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-400"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-400 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
