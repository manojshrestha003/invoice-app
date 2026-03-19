"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  // Forms state
  const [editForm, setEditForm] = useState({ username: '', company: '', address: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    setLoading(true);
    try {
      const sessionRes = await fetch("/api/session");
      if (!sessionRes.ok) throw new Error("Session fetch failed");
      const sessionData = await sessionRes.json();
      if (!sessionData?.user?.id) throw new Error("Session invalid");

      const userRes = await fetch(`/api/users/${sessionData.user.id}`);
      if (!userRes.ok) throw new Error("User fetch failed");

      const userData = await userRes.json();
      setUser(userData);
      setEditForm({
        username: userData.username || userData.name || '',
        company: userData.company || '',
        address: userData.address || ''
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      
      const updatedUser = await res.json();
      setUser(updatedUser);
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to change password");
      
      setIsPasswordModalOpen(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success("Password changed successfully!");
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
        <svg className="w-10 h-10 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Failed to load profile</h2>
        <p className="text-gray-400 mb-6">{error || "User data not found."}</p>
        <button onClick={() => router.push("/dashboard")} className="text-purple-400 hover:text-purple-300 hover:underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-purple-500/30 font-sans pb-12 relative overflow-hidden">
      
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <h3 className="text-2xl font-black text-white mb-6 relative">Edit Profile</h3>
            <form onSubmit={handleEditProfile} className="space-y-4 relative">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Username / Name</label>
                <input required type="text" value={editForm.username} onChange={(e) => setEditForm({...editForm, username: e.target.value})} className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Company</label>
                <input type="text" value={editForm.company} onChange={(e) => setEditForm({...editForm, company: e.target.value})} className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Address</label>
                <input type="text" value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-bold rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <h3 className="text-2xl font-black text-white mb-6 relative">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4 relative">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Current Password</label>
                <input required type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">New Password</label>
                <input required type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Confirm New Password</label>
                <input required type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} className="w-full bg-[#161616] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-medium" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-bold rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-[#e11d48] hover:bg-[#be123c] disabled:opacity-50 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-white tracking-tight">Profile Settings</h1>
          <div className="hidden md:flex h-6 w-px bg-white/10"></div>
          <p className="hidden md:block text-sm font-medium text-gray-400">Manage your personal information</p>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-4xl mx-auto mt-4">
        <section className="bg-[#111111] border border-white/[0.08] rounded-[2rem] overflow-hidden shadow-2xl relative p-8 md:p-12">
          {/* Decorative ambient background glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none"></div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-white/[0.04] pb-10">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-4xl font-black shadow-[0_0_30px_rgba(147,51,234,0.3)] border-4 border-[#161616]">
                  {getInitials(user.username || user.name)}
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-[#161616] shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
              </div>
              
              <div className="text-center md:text-left pt-2 flex-1">
                <h2 className="text-3xl font-black tracking-tight text-white mb-2">{user.username || user.name}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
                  Admin
                </span>
                <p className="text-gray-400 text-sm max-w-md mx-auto md:mx-0 leading-relaxed font-medium">
                  Manage your account details, company information, and personal preferences from your centralized profile dashboard.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileItem 
                icon={<svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                label="Email Address" 
                value={user.email} 
              />
              <ProfileItem 
                icon={<svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                label="Company" 
                value={user.company || "Not provided"} 
              />
              <ProfileItem 
                icon={<svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                label="Address" 
                value={user.address || "Not provided"} 
              />
              <ProfileItem 
                icon={<svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                label="Joined On" 
                value={new Date(user.createdAt || "2024-01-15").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} 
              />
            </div>
            
            {/* Action Buttons */}
            <div className="mt-10 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row gap-4 justify-end">
              <button onClick={() => setIsPasswordModalOpen(true)} className="px-6 py-3 bg-[#161616] hover:bg-[#222222] border border-white/10 rounded-xl text-sm font-bold text-white transition-colors">
                Change Password
              </button>
              <button onClick={() => setIsEditModalOpen(true)} className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.2)] flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                Edit Profile
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const ProfileItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-[#161616]/50 rounded-2xl p-5 border border-white/5 hover:bg-[#161616] transition-colors group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/[0.04] transition-colors"></div>
    <div className="relative">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</div>
      </div>
      <div className="text-lg font-medium text-white truncate pl-1">{value}</div>
    </div>
  </div>
);
