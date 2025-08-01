"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email?: string;
  company?: string;
  address?: string;
  joinedOn?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const sessionRes = await fetch('/api/session');
        if (!sessionRes.ok) throw new Error('Failed to fetch session');
        const sessionData = await sessionRes.json();

        if (!sessionData?.user?.id) {
          throw new Error('Session invalid');
        }

        const userRes = await fetch(`/api/users/${sessionData.user.id}`);
        if (!userRes.ok) throw new Error('Failed to fetch user data');
        const userData: User = await userRes.json();
        setUser(userData);
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-700 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load user data.
        <div className="mt-4">
          <button
            onClick={() => router.push('/login')}
            className="underline text-blue-600 hover:text-blue-800"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const initials = user.username
    ? user.username
        .split(' ')
        .map((n) => n[0].toUpperCase())
        .join('')
    : 'U';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        My Profile
      </h1>

      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 mb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-purple-400 to-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            {initials}
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {user.username}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Admin</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileItem label="Email" value={user.email ?? 'N/A'} />
          <ProfileItem label="Company" value={user.company ?? 'N/A'} />
          <ProfileItem label="Address" value={user.address ?? 'N/A'} />
          <ProfileItem label="Joined On" value={user.joinedOn ?? 'N/A'} />
        </div>
      </div>
    </div>
  );
}

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">
      {label}
    </div>
    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
      {value}
    </div>
  </div>
);
