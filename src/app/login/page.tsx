'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
  CheckBadgeIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const benefits = [
  {
    title: 'Smart Invoicing',
    description: 'Automate your billing process with ease.',
    icon: SparklesIcon,
  },
  {
    title: 'Expense Tracking',
    description: 'Keep your finances in check, anytime, anywhere.',
    icon: CheckBadgeIcon,
  },
  {
    title: 'Client Insights',
    description: 'Detailed analytics for your business growth.',
    icon: UserIcon,
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
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
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-green-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]"></div>
        </div>

        {/* Left Side: Content */}
        <div className="lg:w-1/2 flex flex-col justify-center px-4 sm:px-12 lg:px-24 py-12 relative z-10 lg:border-r border-white/5 order-2 lg:order-1">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Welcome back to <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">HisabKitab.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg mb-10 font-medium leading-relaxed">
              Log in to your account and manage your business finances with the most advanced billing tool.
            </p>

            <div className="space-y-6 sm:space-y-8 text-left">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-green-500/10 group-hover:border-green-500/50 transition-all">
                    <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-green-400 transition-colors">{benefit.title}</h4>
                    <p className="text-gray-500 font-medium text-sm sm:text-base">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-24 relative z-10 order-1 lg:order-2">
          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 transform hover:scale-[1.01] transition-transform">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-2xl mb-6 shadow-lg shadow-green-500/20">
                <KeyIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Sign In</h2>
              <p className="text-gray-400 font-medium text-xs sm:text-sm">Welcome back! Please enter your details.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 rounded-2xl px-6 py-4 text-sm font-semibold mb-8 text-center animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative group">
                <label htmlFor="email" className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase tracking-widest">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-medium"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label htmlFor="password" className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Password
                  </label>
                  <Link href="#" className="text-[10px] font-bold text-green-500 hover:text-green-400 transition-colors uppercase tracking-wider">
                    Forgot PK?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-medium"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 disabled:cursor-not-allowed text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-green-500/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 text-lg"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </form>

            <div className="mt-8 text-center pt-8 border-t border-white/5">
              <p className="text-gray-400 font-medium text-sm">
                New to HisabKitab?{' '}
                <Link href="/register" className="text-green-400 hover:text-green-300 font-bold underline-offset-4 hover:underline transition-all">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
