
import './globals.css';
import { Inter } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HisabKitab-Invoice Manager',
  description: 'Create, edit, and export invoices',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="bg-gray-50 h-full">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}


