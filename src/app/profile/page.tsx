'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  username: string;
  email: string;
  company?: string;
  address?: string;
}

interface SessionData {
  id: string; // user id
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 1. Get session info (must return at least user id)
        const sessionRes = await fetch('/api/session');
        if (!sessionRes.ok) {
          router.push('/login');
          return;
        }

        const sessionData: SessionData = await sessionRes.json();

        console.log(sessionData.id)

        if (!sessionData.id) {
          router.push('/login');
          return;
        }

        // 2. Fetch user profile using id
        const userRes = await fetch(`/api/users/${sessionData.id}`);
        if (!userRes.ok) {
          console.error('Failed to fetch user profile');
          router.push('/login');
          return;
        }

        const userData: UserProfile = await userRes.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
      <div className="space-y-4">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.company || 'N/A'}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
      </div>
    </div>
  );
}
