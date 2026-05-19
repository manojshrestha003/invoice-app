import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                <span className="text-white font-bold uppercase tracking-tighter text-sm">H</span>
              </div>
              <span className="text-white text-xl font-black tracking-tight">Hisab<span className="text-purple-400">Kitab</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The ultimate billing and invoice management solution for modern entrepreneurs. Simplify your finances, grow your business.
            </p>
          </div>

          {/* Links */}
          <div>
            <h5 className="text-white font-bold mb-6">Product</h5>
            <ul className="space-y-4">
              <li><Link href="/features" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Features</Link></li>
              {
                /*
                    
                    <li><Link href="/pricing" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Pricing</Link></li>
                       } 
                    */
              }
              <li><Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Support</h5>
            <ul className="space-y-4">
              <li><Link href="/docs" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Documentation</Link></li>
              {/*
              <li><Link href="/api-reference" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">API Reference</Link></li>
              <li><Link href="/security" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Security</Link></li> */
              }
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Connect</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                <span className="sr-only">Twitter</span>
                {/* Twitter Icon Mockup */}
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} HisabKitab Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
