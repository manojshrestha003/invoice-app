'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CheckBadgeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const benefits = [
  {
    title: 'Instant Invoicing',
    description: 'Create professional invoices in seconds.',
    icon: SparklesIcon,
  },
  {
    title: 'Unlimited Clients',
    description: 'Manage all your business relationships in one place.',
    icon: UserIcon,
  },
  {
    title: 'Secure Payments',
    description: 'Get paid faster with integrated payment gateways.',
    icon: CheckBadgeIcon,
  }
];

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
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
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-green-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]"></div>
        </div>

        {/* Left Side: Content */}
        <div className="lg:w-1/2 flex flex-col justify-center px-4 sm:px-12 lg:px-24 py-12 relative z-10 lg:border-r border-white/5">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Start your business journey with <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">HisabKitab.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg mb-10 font-medium leading-relaxed">
              Join thousands of entrepreneurs who trust HisabKitab for their daily billing and invoice management. Simple, fast, and secure.
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

        {/* Right Side: Registration Form */}
        <div className="lg:w-1/2 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-24 relative z-10">
          <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 transform hover:scale-[1.01] transition-transform">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight transition-all">Create Account</h2>
              <p className="text-gray-400 font-medium text-xs sm:text-sm">Please enter your details below.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 rounded-2xl px-6 py-4 text-xs sm:text-sm font-semibold mb-8 text-center animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Username */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-medium"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-medium"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-medium"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-medium"
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-medium"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 disabled:cursor-not-allowed text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-green-500/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 text-lg"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Create My Account'
                )}
              </button>
            </form>

            <div className="mt-8 text-center pt-8 border-t border-white/5">
              <p className="text-gray-400 font-medium text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-green-400 hover:text-green-300 font-bold underline-offset-4 hover:underline transition-all">
                  Sign in here
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
