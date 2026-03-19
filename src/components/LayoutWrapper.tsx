
'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './SidebarClient';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideSidebarRoutes = ['/', '/login', '/register'];
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
    <div className="flex h-screen">
      {!shouldHideSidebar && <Sidebar />}
      <main className={`flex-1 overflow-y-auto ${pathname === '/Dashboard' || pathname === '/dashboard' || pathname.startsWith('/clients') || pathname.startsWith('/invoices') || pathname.startsWith('/profile') ? 'p-0 bg-[#0A0A0A]' : 'p-4'}`}>
        {children}
      </main>
    </div>
  );
}
