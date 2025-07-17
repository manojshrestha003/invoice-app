import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/SidebarClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Invoice Manager',
  description: 'Create, edit, and export invoices',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="bg-gray-50 h-full">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
