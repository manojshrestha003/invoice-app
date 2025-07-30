'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/Dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-black to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-8 sm:p-12 text-gray-200 backdrop-blur-sm border border-gray-700">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-green-500 tracking-wide">HisabKitab<span className = "text-white"> Login</span></h2>

        {error && (
          <div className="bg-red-600 bg-opacity-80 text-sm text-white px-5 py-3 rounded-md mb-6 font-medium text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-7">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 rounded-lg shadow-lg transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Don’t have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-indigo-500 hover:text-indigo-400 underline focus:outline-none"
            aria-label="Go to register page"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
