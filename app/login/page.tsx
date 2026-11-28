'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import BrandLogo from '@/components/BrandLogo';
import {
  Building2,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setError('');
    setLoading(true);

    try {
      const res = await login(contact, password);
      if (res.success) {
        router.push('/dashboard');
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError('লগইন করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await login('01711223344');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 -m-4 sm:-m-6 lg:-m-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center">
          <BrandLogo size="lg" showSubtitle={true} />
        </Link>
        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
          আপনার অ্যাকাউন্টে লগইন করুন
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          আপনার বাড়ি বা ফ্ল্যাটের ভাড়া ও বিলের খতিয়ানে প্রবেশ করুন।
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-slate-200/80">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                মোবাইল নম্বর অথবা ইমেইল <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: 01711223344"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700">পাসওয়ার্ড</label>
                <span className="text-[11px] text-slate-400">(ঐচ্ছিক)</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>লগইন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <span className="text-xs text-slate-400 block mb-3">— অথবা দ্রুত টেস্ট করতে —</span>
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>ডেমো বাড়িওয়ালা অ্যাকাউন্ট দিয়ে ১ ক্লিকে প্রবেশ করুন</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-600">
            নতুন বাড়িওয়ালা?{' '}
            <Link href="/register" className="font-bold text-emerald-700 hover:underline">
              ফ্রি নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
