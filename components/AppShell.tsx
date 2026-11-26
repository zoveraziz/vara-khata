'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage =
    pathname === '/' ||
    pathname === '/landing' ||
    pathname === '/login' ||
    pathname === '/register';

  if (isPublicPage) {
    return <main className="flex-1 w-full">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            © ২০২৬ <strong className="text-slate-800 font-bold">ভাড়া খাতা (VaraKhata)</strong> — বাংলাদেশের বাড়িওয়ালা ও মার্কেট মালিকদের বিশ্বস্ত সহচর।
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <p className="text-emerald-700 font-bold">১০০% সুরক্ষিত ও নির্ভুল হিসাব</p>
          </div>
        </div>
      </footer>
    </>
  );
}
