
import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/SidebarClient'; 

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="bg-gray-50 h-full">
        <div className="flex h-screen">
          <Sidebar />  
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
