'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './SidebarClient';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes that should NOT have the Sidebar (Landing/Public pages)
  const hideSidebarRoutes = ['/', '/login', '/register', '/features', '/pricing', '/about', '/docs', '/api-reference', '/security', '/privacy', '/terms'];
  
  // Routes that SHOULD have the global Navbar and Footer
  const publicLayoutRoutes = ['/', '/features', '/pricing', '/about', '/docs', '/api-reference', '/security', '/privacy', '/terms'];
  
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);
  const isPublicLayout = publicLayoutRoutes.includes(pathname);

  return (
    <div className={`flex min-h-screen bg-[#0A0A0A] ${!shouldHideSidebar ? 'h-screen' : ''}`}>
      {!shouldHideSidebar && <Sidebar />}
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {isPublicLayout && <Navbar />}
        
        <main className={`flex-1 ${!shouldHideSidebar ? 'overflow-y-auto' : 'overflow-x-hidden'} ${isPublicLayout ? 'pt-0' : ''} ${pathname === '/Dashboard' || pathname === '/dashboard' || pathname.startsWith('/clients') || pathname.startsWith('/invoices') || pathname.startsWith('/profile') || pathname.startsWith('/expenses') || pathname.startsWith('/reports') ? 'p-0 bg-[#0A0A0A]' : ''}`}>
          {children}
        </main>

        {isPublicLayout && <Footer />}
      </div>
    </div>
  );
}
