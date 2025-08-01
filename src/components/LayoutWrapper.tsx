
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
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}
