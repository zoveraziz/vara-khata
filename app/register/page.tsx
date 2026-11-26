'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  Lock,
  Phone,
  User,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !propertyName.trim()) return;
    setError('');
    setLoading(true);

    try {
      const res = await register({
        name,
        phone,
        propertyName,
        propertyAddress,
        password,
      });

      if (res.success) {
        router.push('/dashboard');
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError('অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 -m-4 sm:-m-6 lg:-m-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
            ভ
          </div>
          <span className="font-black text-2xl text-slate-900 tracking-tight">ভাড়া খাতা</span>
        </Link>
        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
          ফ্রি বাড়িওয়ালা অ্যাকাউন্ট খুলুন
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          মাত্র ১ মিনিটে আপনার বাড়ির নাম ও মোবাইল নম্বর দিয়ে শুরু করুন।
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-slate-200/80">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                আপনার নাম (বাড়িওয়ালা / ম্যানেজার) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ কামাল হোসেন"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 01711223344"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                বাড়ি বা ভবনের নাম <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: গ্রিন ভ্যালি মঞ্জিল / রূপালী মার্কেট"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ঠিকানা ও এলাকা <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: বাড়ি ১২, রোড ৪, ধানমন্ডি, ঢাকা"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700">একটি পাসওয়ার্ড দিন</label>
                <span className="text-[11px] text-slate-400">(ঐচ্ছিক)</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <span>অ্যাকাউন্ট খুলুন এবং ড্যাশবোর্ডে যান</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-600">
            আগে থেকেই অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" className="font-bold text-emerald-700 hover:underline">
              এখানে লগইন করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
