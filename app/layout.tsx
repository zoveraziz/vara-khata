import type { Metadata } from 'next';
import './globals.css';
import { Hind_Siliguri } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import AppShell from '@/components/AppShell';

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'ভাড়া খাতা - বাড়িওয়ালাদের স্মার্ট রেন্ট ম্যানেজমেন্ট',
  description: 'খাতা-কলম ছাড়াই বাড়ি ও ফ্ল্যাটের মাসিক ভাড়া, বকেয়া, সাব-মিটার বিল ও ভাড়াটিয়া পুলিশ ভেরিফিকেশন ফরম পরিচালনা করুন।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body
        className={`${hindSiliguri.className} bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900`}
      >
        <AuthProvider>
          <AppProvider>
            <AppShell>{children}</AppShell>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
