'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import SubscriptionModal from './SubscriptionModal';
import { useApp } from '@/context/AppContext';
import { AlertTriangle } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { subscription, triggerSubscriptionPrompt } = useApp();

  const isPublicPage =
    pathname === '/' ||
    pathname === '/landing' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/receipt' ||
    pathname === '/admin';

  if (isPublicPage) {
    return <main className="flex-1 w-full">{children}</main>;
  }

  const isExpired = subscription.status === 'expired';

  return (
    <>
      {/* Expired Subscription Alert Banner */}
      {isExpired && subscription.planId !== 'free' && (
        <div className="bg-rose-600 text-white text-xs font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 print:hidden shadow-sm">
          <AlertTriangle className="w-4 h-4 animate-bounce shrink-0" />
          <span>
            আপনার বাড়িওয়ালা সাবস্ক্রিপশনের মেয়াদ শেষ হয়েছে! নতুন মাসের বিল ও রসিদ তৈরি সাময়িকভাবে লক রয়েছে—
          </span>
          <button
            onClick={() =>
              triggerSubscriptionPrompt(
                'আপনার সাবস্ক্রিপশনের মেয়াদ শেষ হয়েছে। অবিলম্বে রিনিউ করে সকল ফিচার সচল রাখুন।'
              )
            }
            className="underline ml-1 bg-white text-rose-700 px-2.5 py-0.5 rounded-full hover:bg-rose-50 transition shadow-xs text-[11px] font-black"
          >
            এখনই রিনিউ করুন
          </button>
        </div>
      )}

      <Navbar />
      <SubscriptionModal />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            © ২০২৬ <strong className="text-slate-800 font-bold">ভাড়া খাতা (VaraKhata)</strong> — বাংলাদেশের বাড়িওয়ালা ও মার্কেট মালিকদের বিশ্বস্ত সহচর।
            <Link href="/admin" className="text-slate-400 hover:text-emerald-700 underline text-[11px] ml-3 transition-colors">
              অ্যাডমিন প্যানেল
            </Link>
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
