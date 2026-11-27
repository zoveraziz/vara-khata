'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  MessageCircle,
  Receipt,
  ShieldCheck,
  Check,
  ChevronDown,
  Clock,
  Printer,
  XCircle,
  Menu,
  X,
} from 'lucide-react';

export default function HomePage() {
  // 1. Mobile Menu Dropdown State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Interactive States for Live In-Hero Previews
  const [heroView, setHeroView] = useState<'dashboard' | 'whatsapp' | 'meter'>('dashboard');

  // 3. Interactive ROI Calculator States
  const [flatCount, setFlatCount] = useState<number>(12);

  // 4. Sub-meter Interactive Calculator in Hero
  const [prevMeter, setPrevMeter] = useState<number>(1420);
  const [currMeter, setCurrMeter] = useState<number>(1540);
  const [unitRate, setUnitRate] = useState<number>(10);

  // 5. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Derived Calculations
  const usedUnits = Math.max(0, currMeter - prevMeter);
  const calculatedElectricBill = usedUnits * unitRate;

  const hoursSaved = Math.max(4, Math.round(flatCount * 0.8));
  const phoneHassleSaved = Math.max(6, Math.round(flatCount * 1.5));

  const faqs = [
    {
      q: 'সফটওয়্যারটি কি মোবাইল দিয়ে সহজে চালানো যায়?',
      a: 'হ্যাঁ, সম্পূর্ণ মোবাইল-বান্ধব (১০০% রেসপনসিভ)। আপনার ফোনে কোনো অ্যাপ ডাউনলোড করারও বাধ্যবাধকতা নেই; ক্রোম বা যেকোনো ব্রাউজারে লগইন করেই মুহূর্তের মধ্যে সব কাজ শেষ করতে পারবেন।',
    },
    {
      q: 'ভাড়াটিয়াকে কি কোনো মোবাইল অ্যাপ ইনস্টল করতে হবে?',
      a: 'একদমই না! ভাড়াটিয়ার কোনো বাড়তি অ্যাপ বা সফটওয়্যার ইনস্টল করতে হবে না। আপনি শুধু সফটওয়্যার থেকে "WhatsApp-এ পাঠান" বা "এসএমএস পাঠান" বাটনে ক্লিক করবেন, সাথে সাথে তাঁর ফোনে মূল ভাড়া ও বকেয়ার স্বচ্ছ হিসাবসহ ডিজিটাল মানি রিসিট চলে যাবে।',
    },
    {
      q: 'বাংলাদেশ পুলিশ ভাড়াটিয়া তথ্য ফরম কীভাবে পাওয়া যাবে?',
      a: 'ভাড়াটিয়ার নাম, ফোন, এনআইডি ও তথ্য সিস্টেমে এন্ট্রি করা থাকলে "পুলিশ ফরম" বাটনে চাপ দিলেই ১ ক্লিকে ১ কপি পাসপোর্ট সাইজ ছবি ও স্বাক্ষর সহ ডিএমপি (DMP) নির্ধারিত প্রিন্টযোগ্য সরকারি ফরম স্বয়ংক্রিয়ভাবে তৈরি হয়ে যায়।',
    },
    {
      q: 'সাব-মিটারের বিদ্যুৎ বিল কীভাবে হিসাব করব?',
      a: 'আপনাকে ক্যালকুলেটর নিয়ে হিসাব করতে হবে না। মিটারের বর্তমান রিডিং লিখে দিলেই সিস্টেম স্বয়ংক্রিয়ভাবে আগের রিডিং থেকে বিয়োগ করে ব্যবহৃত ইউনিট এবং প্রতি ইউনিটের রেট দিয়ে গুণ করে বিলে স্বয়ংক্রিয়ভাবে বসিয়ে দেয়।',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased overflow-x-hidden">
      
      {/* 1. Header (Clean White, Subtle Slate Border, Mobile Responsive Dropdown) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-2xl shadow-sm group-hover:scale-105 transition-transform shrink-0">
              ভ
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                ভাড়া খাতা
              </span>
              <span className="text-[11px] font-bold text-emerald-800 tracking-wider block mt-0.5">
                বাড়িওয়ালাদের ডিজিটাল সহকারী
              </span>
            </div>
          </Link>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/dashboard"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center gap-1.5 shadow-2xs hover:border-slate-400"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>লাইভ ডেমো</span>
            </Link>

            <Link
              href="/login"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-sm flex items-center gap-1.5 group"
            >
              <span>লগইন / শুরু করুন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2.5 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>লাইভ ডেমো দেখুন</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center gap-2 shadow-sm"
            >
              <span>লগইন / শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Eye-friendly, Calm & High Contrast Text) */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-28 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>বাংলাদেশের #১ প্রপটেক প্ল্যাটফর্ম • ৩,৫০০+ বাড়িওয়ালার ভরসা</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.28] sm:leading-[1.2] text-slate-900">
              হাতে লেখা খাতার দিন শেষ,{' '}
              <br className="hidden sm:inline" />
              <span className="text-emerald-800">
                স্মার্ট বাড়িওয়ালার শুরু।
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium">
              মাসের ১-১০ তারিখের ভাড়া চাওয়ার অস্বস্তি আর হিসাবের দিন শেষ। 
              মোবাইল থেকেই তৈরি করুন অটো-বিল, পাঠান সম্মানজনক হোয়াটসঅ্যাপ রিমাইন্ডার ও ডিজিটাল মানি রিসিট।
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-base text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 group"
              >
                <span>৩টি ফ্ল্যাট আজীবন ফ্রি ব্যবহার করুন</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-base text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 hover:border-slate-400"
              >
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>সরাসরি লাইভ ডেমো দেখুন (১ ক্লিকে)</span>
              </Link>
            </div>
          </div>

          {/* 3. Centerpiece Interactive Showcase */}
          <div className="mt-12 max-w-5xl mx-auto">
            
            {/* View Selector Tabs (Segment-Control Style, Zero Glare) */}
            <div className="flex justify-center mb-5">
              <div className="bg-slate-200/70 p-1 rounded-2xl border border-slate-200 flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => setHeroView('dashboard')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    heroView === 'dashboard'
                      ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${heroView === 'dashboard' ? 'text-emerald-700' : 'text-slate-600'}`} />
                  <span>বাড়িওয়ালার ড্যাশবোর্ড</span>
                </button>

                <button
                  onClick={() => setHeroView('whatsapp')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    heroView === 'whatsapp'
                      ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <MessageCircle className={`w-4 h-4 ${heroView === 'whatsapp' ? 'text-emerald-700' : 'text-slate-600'}`} />
                  <span>ভাড়াটিয়ার হোয়াটসঅ্যাপ রশিদ</span>
                </button>

                <button
                  onClick={() => setHeroView('meter')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    heroView === 'meter'
                      ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${heroView === 'meter' ? 'text-amber-600' : 'text-slate-600'}`} />
                  <span>সাব-মিটার ক্যালকুলেটর</span>
                </button>
              </div>
            </div>

            {/* Showcase Stage Card (Clean Matte White, Neutral Subtle Border) */}
            <div className="relative rounded-3xl bg-white border border-slate-200 shadow-md p-4 sm:p-7 overflow-hidden">
              
              {/* VIEW 1: Landlord Dashboard Preview */}
              {heroView === 'dashboard' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Top Stats Row (Single line twelve flats '১২টি') */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-700 block font-bold">চলতি মাসের আদায়</span>
                      <span className="text-lg sm:text-2xl font-black text-slate-900 block mt-1 whitespace-nowrap">৳ ১,৮৫,৪০০</span>
                      <span className="text-[11px] text-emerald-800 font-bold mt-0.5 inline-block whitespace-nowrap">↑ ৯৪% আদায় সম্পন্ন</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-700 block font-bold">মোট বকেয়া</span>
                      <span className="text-lg sm:text-2xl font-black text-rose-700 block mt-1 whitespace-nowrap">৳ ১২,৫০০</span>
                      <span className="text-[11px] text-rose-700 font-bold mt-0.5 inline-block whitespace-nowrap">১টি ফ্ল্যাট বকেয়া</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-700 block font-bold">মোট ফ্ল্যাট ও ইউনিট</span>
                      <span className="text-lg sm:text-2xl font-black text-slate-900 block mt-1 whitespace-nowrap">১২টি</span>
                      <span className="text-[11px] text-slate-700 font-bold mt-0.5 inline-block whitespace-nowrap">১০০% ভাড়াটিয়া যুক্ত</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-700 block font-bold">অটো-রিমাইন্ডার</span>
                      <span className="text-lg sm:text-2xl font-black text-slate-900 block mt-1 whitespace-nowrap">সক্রিয়</span>
                      <span className="text-[11px] text-emerald-800 font-bold mt-0.5 inline-block whitespace-nowrap">১-৫ তারিখ স্বয়ংক্রিয়</span>
                    </div>
                  </div>

                  {/* Dashboard Table Mockup */}
                  <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        <span className="text-xs font-black text-slate-900">জুন ২০২৬ ভাড়ার তালিকা ও আদায় হিসেব</span>
                      </div>
                      <Link href="/dashboard" className="text-xs font-bold text-emerald-800 hover:underline">
                        সম্পূর্ণ ড্যাশবোর্ড দেখুন →
                      </Link>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[760px] whitespace-nowrap text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
                            <th className="py-3 px-4 whitespace-nowrap">ফ্ল্যাট ও ভাড়াটিয়া</th>
                            <th className="py-3 px-4 whitespace-nowrap">মূল ভাড়া</th>
                            <th className="py-3 px-4 whitespace-nowrap">বিদ্যুৎ (সাব-মিটার)</th>
                            <th className="py-3 px-4 whitespace-nowrap">মোট বিল</th>
                            <th className="py-3 px-4 whitespace-nowrap">পেমেন্ট মেথড</th>
                            <th className="py-3 px-4 whitespace-nowrap text-right">স্ট্যাটাস</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2.5">
                                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-black text-xs flex items-center justify-center shrink-0">
                                  1A
                                </span>
                                <div>
                                  <div className="font-bold text-slate-900">ফ্ল্যাট ১-এ (1A)</div>
                                  <div className="text-[11px] text-slate-600 font-medium">মোঃ রফিকুল ইসলাম (ব্যাংকার)</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                              ৳ ১৮,০০০
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="text-emerald-800 font-bold">৳ ১,২০০</span>
                              <span className="text-[11px] text-slate-600 block">(১২০ ইউনিট)</span>
                            </td>
                            <td className="py-3.5 px-4 font-black text-slate-900 whitespace-nowrap">
                              ৳ ২১,১৮০
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
                                💵 ক্যাশ
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                পরিশোধিত
                              </span>
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2.5">
                                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-black text-xs flex items-center justify-center shrink-0">
                                  2B
                                </span>
                                <div>
                                  <div className="font-bold text-slate-900">ফ্ল্যাট ২-বি (2B)</div>
                                  <div className="text-[11px] text-slate-600 font-medium">তানভীর আহমেদ (ব্যবসায়ী)</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                              ৳ ১৬,০০০
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="text-emerald-800 font-bold">৳ ১,৩৫০</span>
                              <span className="text-[11px] text-slate-600 block">(১৩৫ ইউনিট)</span>
                            </td>
                            <td className="py-3.5 px-4 font-black text-slate-900 whitespace-nowrap">
                              ৳ ১৯,৯৮০
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-50 text-pink-800 font-bold text-xs border border-pink-200">
                                📱 বিকাশ
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                পরিশোধিত
                              </span>
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2.5">
                                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-black text-xs flex items-center justify-center shrink-0">
                                  3C
                                </span>
                                <div>
                                  <div className="font-bold text-slate-900">ফ্ল্যাট ৩-সি (3C)</div>
                                  <div className="text-[11px] text-slate-600 font-medium">ইঞ্জি. কবির হোসেন (প্রকৌশলী)</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                              ৳ ২০,০০০
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="text-emerald-800 font-bold">৳ ১,১০০</span>
                              <span className="text-[11px] text-slate-600 block">(১১০ ইউনিট)</span>
                            </td>
                            <td className="py-3.5 px-4 font-black text-rose-700 whitespace-nowrap">
                              ৳ ২৩,৭৮০
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="text-slate-500 font-bold text-xs">বকেয়া</span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 font-bold text-xs border border-rose-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                                বকেয়া (এসএমএস প্রেরিত)
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: Tenant WhatsApp Bill & Receipt */}
              {heroView === 'whatsapp' && (
                <div className="max-w-md mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-white text-xs">
                        VK
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">ভাড়া খাতা অটো-এসএমএস / WhatsApp</div>
                        <div className="text-[10px] text-emerald-800 font-bold">অনলাইন • ভেরিফাইড সার্ভিস</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">আজ সকাল ৯:৩০</span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-2xs">
                    <p className="font-bold text-slate-900">
                      আসসালামু আলাইকুম মোঃ আব্দুল আজিজ ভাই,
                    </p>
                    <p className="text-slate-700">
                      আপনার <strong className="text-slate-900">ফ্ল্যাট ১-এ (বাড়ি নং ১২, ধানমন্ডি)</strong> এর চলতি <strong className="text-slate-900">জুন ২০২৬</strong> মাসের ভাড়ার বিবরণী প্রস্তুত হয়েছে:
                    </p>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-600">মাসিক মূল বাড়িভাড়া:</span>
                        <span className="font-bold text-slate-900">৳ ১৮,০০০</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">সাব-মিটার বিদ্যুৎ (১২০ ইউনিট):</span>
                        <span className="font-bold text-emerald-800">৳ ১,২০০</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">গ্যাস বিল:</span>
                        <span className="font-bold text-slate-900">৳ ১,০৮০</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">সার্ভিস চার্জ / দারোয়ান:</span>
                        <span className="font-bold text-slate-900">৳ ১,৫০০</span>
                      </div>
                      <div className="border-t border-slate-200 pt-1.5 flex justify-between text-sm font-bold">
                        <span className="text-slate-900">সর্বমোট প্রদেয়:</span>
                        <span className="text-emerald-800">৳ ২১,৭৮০</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      টাকা পরিশোধের শেষ তারিখ: ১০ জুন ২০২৬। ডিজিটাল মানি রিসিট দেখতে নিচে ক্লিক করুন:
                    </p>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs">
                        🔗 varakhata-bd.vercel.app/receipt/001
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 3: Live Sub-Meter Calculator Tool */}
              {heroView === 'meter' && (
                <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-black text-slate-900 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 text-amber-600" />
                      <span>লাইভ সাব-মিটার বিদ্যুৎ বিল ক্যালকুলেটর</span>
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      রিডিং টাইপ করে নিজেই পরীক্ষা করুন কীভাবে ১ সেকেন্ডে নিখুঁত হিসাব তৈরি হয়
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        পূর্বের রিডিং
                      </label>
                      <input
                        type="number"
                        value={prevMeter}
                        onChange={(e) => setPrevMeter(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-700 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        বর্তমান রিডিং
                      </label>
                      <input
                        type="number"
                        value={currMeter}
                        onChange={(e) => setCurrMeter(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-700 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        প্রতি ইউনিট রেট (৳)
                      </label>
                      <input
                        type="number"
                        value={unitRate}
                        onChange={(e) => setUnitRate(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-700 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-700 font-bold block">ব্যবহৃত ইউনিট: {usedUnits} টি</span>
                      <span className="text-sm font-black text-slate-900 mt-0.5 block">সর্বমোট বিদ্যুৎ বিল</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                        ৳ {calculatedElectricBill.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-slate-200">
            <div className="text-center p-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 block whitespace-nowrap">৩,৫০০+</span>
              <span className="text-xs sm:text-sm text-slate-700 font-bold mt-1 block">নিবন্ধিত বাড়িওয়ালা</span>
            </div>
            <div className="text-center p-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 block whitespace-nowrap">৳ ৪.৫ কোটি+</span>
              <span className="text-xs sm:text-sm text-slate-700 font-bold mt-1 block">ভাড়া আদায় সম্পন্ন</span>
            </div>
            <div className="text-center p-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-800 block whitespace-nowrap">৯৮.৫%</span>
              <span className="text-xs sm:text-sm text-slate-700 font-bold mt-1 block">সময়মতো বিল আদায়</span>
            </div>
            <div className="text-center p-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-700 block whitespace-nowrap">৪.৯ ★★★★★</span>
              <span className="text-xs sm:text-sm text-slate-700 font-bold mt-1 block">ইউজার রিভিউ রেটিং</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3.5 Section: How it Works (মাত্র ৩টি ধাপে শুরু করুন) - Modern Differentiated Style */}
      <section className="py-24 bg-white border-y border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>সহজ ও দ্রুত অনবোর্ডিং</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              মাত্র ৩টি ধাপে শুরু করুন
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              কোনো জটিলতা নেই, ১ মিনিটেই রেডি হয়ে যাবে আপনার বাড়ি বা মার্কেটের ডিজিটাল খাতা
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Step 1 Card */}
            <div className="relative rounded-3xl p-7 sm:p-8 bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all group flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs text-emerald-800 flex items-center justify-center font-black text-xl group-hover:bg-emerald-800 group-hover:text-white transition-all">
                    ১
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-900 transition-colors">
                    ধাপ ০১
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">
                  অ্যাকাউন্ট খুলুন
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  মোবাইল নম্বর বা ইমেইল দিয়ে OTP-এর মাধ্যমে মাত্র ৩০ সেকেন্ডে কোনো ক্রেডিট কার্ড ছাড়াই ফ্রি অ্যাকাউন্ট তৈরি করুন।
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>তাত্ক্ষণিক ওটিপি ভেরিফিকেশন</span>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="relative rounded-3xl p-7 sm:p-8 bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all group flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs text-emerald-800 flex items-center justify-center font-black text-xl group-hover:bg-emerald-800 group-hover:text-white transition-all">
                    ২
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-900 transition-colors">
                    ধাপ ০২
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">
                  প্রপার্টি যোগ করুন
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  আপনার বাড়ি, মার্কেট বা ভবনের নাম দিন এবং ফ্ল্যাট নম্বর ও ভাড়াটিয়াদের তথ্য ও মোবাইল নম্বর যুক্ত করুন।
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>আনলিমিটেড ফ্ল্যাট ও ইউনিট যোগ</span>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="relative rounded-3xl p-7 sm:p-8 bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all group flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs text-emerald-800 flex items-center justify-center font-black text-xl group-hover:bg-emerald-800 group-hover:text-white transition-all">
                    ৩
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-900 transition-colors">
                    ধাপ ০৩
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">
                  বিল তৈরি ও আদায়
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  প্রতি মাসের ১ তারিখে এক ক্লিকে স্বয়ংক্রিয় বিল তৈরি, হোয়াটসঅ্যাপে রসিদ প্রেরণ ও ভাড়ার হিসাব রাখুন।
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>১ ক্লিকে হোয়াটসঅ্যাপ মানি রিসিট</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Section: Before vs After Interactive Story */}
      <section id="story" className="py-20 bg-[#f8fafc] border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              তুলনামূলক বাস্তব চিত্র
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              হাতে লেখা খাতার ঝামেলা বনাম আধুনিক ‘ভাড়া খাতা’
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              প্রতি মাসের হিসাব মেলানো নিয়ে অযথা মানসিক চাপ নেওয়ার দিন কি সত্যি এখনও মেনে নেওয়া যায়?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* The Old Painful Way (হালকা লাল কার্ড) */}
            <div className="rounded-3xl p-6 sm:p-8 bg-rose-50/50 border border-rose-200/80 relative overflow-hidden space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>আগের এনালগ খাতা পদ্ধতি</span>
              </div>

              <h4 className="text-xl font-black text-slate-900">
                মাসের শুরুতেই বাড়িওয়ালার মাথায় রাজ্যের দুশ্চিন্তা
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-800 font-medium">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>খাতার পাতা ছেঁড়া ও হারিয়ে যাওয়া:</strong> কোন ভাড়াটিয়ার কত বকেয়া ছিল বা অ্যাডভান্স জমা ছিল, তা খুঁজে পেতে ঘণ্টার পর ঘণ্টা খাতা ঘাঁটতে হয়।</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>সাব-মিটারের জটিল হিসাব:</strong> ক্যালকুলেটর দিয়ে ইউনিট বিয়োগ করতে গিয়ে ভুল হওয়া এবং ভাড়াটিয়ার সাথে হিসাব নিয়ে ভুল বোঝাবুঝি।</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>ভাড়া চাইতে লজ্জা লাগা:</strong> মুখে মুখে বা বারবার ফোন করে ভাড়া চাওয়া বাড়িওয়ালাদের জন্য অত্যন্ত অস্বস্তিকর।</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>রশিদের কাগুজে ক্যাচাল:</strong> কাঁচা কাগজের রসিদ ভাড়াটিয়া হারিয়ে ফেললে কোনো লেনদেনের প্রমাণ থাকে না।</span>
                </li>
              </ul>
            </div>

            {/* The New Vara Khata Way (সবুজ ও সাদা পরিপাটি কার্ড) */}
            <div className="rounded-3xl p-6 sm:p-8 bg-emerald-50/40 border border-emerald-300/80 relative overflow-hidden space-y-5 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>স্মার্ট ‘ভাড়া খাতা’ গ্রিন হাউস সমাধান</span>
              </div>

              <h4 className="text-xl font-black text-slate-900">
                সম্পূর্ণ চাপমুক্ত জীবন ও ১ ক্লিকে সব ফ্ল্যাটের নিয়ন্ত্রণ
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-800 font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>আজীবন ক্লাউড ব্যাকআপ:</strong> মোবাইল নষ্ট বা পরিবর্তন হলেও কোনো ডেটা হারাবে না; যেকোনো সময় যেকোনো ডিভাইস থেকে এক ক্লিকে লগইন।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>অটো সাব-মিটার ক্যালকুলেশন:</strong> শুধু বর্তমান রিডিং লিখলেই ইউনিট ও প্রতি ইউনিটের রেট মিলিয়ে স্বয়ংক্রিয়ভাবে বিল তৈরি।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>স্বয়ংক্রিয় ১-৫ তারিখ রিমাইন্ডার:</strong> সফটওয়্যার স্বয়ংক্রিয়ভাবে ভদ্র ও প্রফেশনাল ভাষায় এসএমএস ও হোয়াটসঅ্যাপে তাগাদা পাঠায়।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>ডিজিটাল মানি রিসিট ও পুলিশ ফরম:</strong> পেমেন্ট পাওয়ামাত্র ডিজিটাল রিসিট এবং ভাড়াটিয়া ভেরিফিকেশনের জন্য ডিএমপি সরকারি ফরম প্রিন্ট।</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Section: Luxury Bento Grid Layout ("অল-ইন-ওয়ান সমাধান") */}
      <section id="bento" className="py-24 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              প্রিমিয়াম বেন্টো ফিচার গ্রিড
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              একটি মাত্র অ্যাপে আপনার বাড়ির প্রতিটি সমাধান
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              প্রতিটি টুল তৈরি করা হয়েছে বাংলাদেশের বাড়িওয়ালাদের বাস্তব অভিজ্ঞতার ওপর ভিত্তি করে।
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento 1: Large Featured Card (2 Columns Span) */}
            <div className="md:col-span-2 rounded-3xl p-7 sm:p-9 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-sm space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800">
                  বিদ্যুৎ বিল সমস্যা সমাধান
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  সাব-মিটার রিডিং ও অটো বিদ্যুৎ বিল ইঞ্জিন
                </h4>
                <p className="text-sm text-slate-700 max-w-xl leading-relaxed font-medium">
                  মিটার রিডিং তোলার ঝামেলা শেষ। শুধু চলতি মাসের রিডিং লিখে দিলে সফটওয়্যার স্বয়ংক্রিয়ভাবে আগের রিডিং থেকে বিয়োগ করে সঠিক ইউনিট হিসাব করে এবং প্রতি ইউনিটের রেট অনুযায়ী মোট টাকা মাসিক বিলে যোগ করে দেয়।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">পূর্বের রিডিং:</span>
                  <span className="text-slate-900 font-bold">১২০</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">বর্তমান রিডিং:</span>
                  <span className="text-slate-900 font-bold">২৫০</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">ব্যবহৃত:</span>
                  <span className="text-amber-700 font-bold">১৩০ ইউনিট</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">রেট:</span>
                  <span className="text-slate-900 font-bold">৳ ১০/ইউনিট</span>
                </div>
                <div className="text-emerald-800 font-bold text-sm">
                  = ৳ ১,৩০০
                </div>
              </div>
            </div>

            {/* Bento 2: Automated Reminders */}
            <div className="rounded-3xl p-7 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-sm space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                <MessageCircle className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                স্বয়ংক্রিয় এসএমএস ও হোয়াটসঅ্যাপ
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                মুখে ভাড়া চাওয়ার কোনো অস্বস্তি নেই। ১ থেকে ৫ তারিখের মধ্যে শুধুমাত্র বকেয়া থাকা ভাড়াটিয়াদের স্বয়ংক্রিয় সম্মানজনক তাগাদা চলে যায়।
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  পরিশোধিত কাউকে ডিস্টার্ব করবে না
                </span>
              </div>
            </div>

            {/* Bento 3: Digital Money Receipt */}
            <div className="rounded-3xl p-7 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-sm space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                <Receipt className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                ডিজিটাল মানি রিসিট (PDF)
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                টাকা গ্রহণ করার সাথে সাথেই কিউআর কোড ও রশিদ নম্বরসহ প্রফেশনাল মানি রিসিট তৈরি হয়। সরাসরি হোয়াটসঅ্যাপে পাঠানো বা প্রিন্ট নেওয়া যায়।
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Printer className="w-4 h-4 text-emerald-700" />
                  প্রিন্ট ও আজীবন ক্লাউড সংরক্ষণ
                </span>
              </div>
            </div>

            {/* Bento 4: Police Verification Form (2 Columns Span) */}
            <div className="md:col-span-2 rounded-3xl p-7 sm:p-9 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800">
                  আইনি নিরাপত্তা ও ডিএমপি
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  বাংলাদেশ পুলিশ ভাড়াটিয়া তথ্য ফরম (স্বয়ংক্রিয় প্রিন্ট)
                </h4>
                <p className="text-sm text-slate-700 max-w-xl leading-relaxed font-medium">
                  নতুন ভাড়াটিয়া তোলার পর আলাদা করে পুলিশের ফর্ম কিনে হাতে লেখার দিন শেষ। সফটওয়্যার থেকে ১ ক্লিকে ১ কপি পাসপোর্ট সাইজ ছবি ও জাতীয় পরিচয়পত্রের ঘর সহ সরকারি ফরম্যাটে প্রস্তুত হয়ে যায়।
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>ঢাকা মেট্রোপলিটন পুলিশ ফরম্যাট</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>জরুরি যোগাযোগ ও এনআইডি রেকর্ড</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Section: Interactive ROI Calculator */}
      <section id="calculator" className="py-20 bg-[#f8fafc] border-y border-slate-200 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              সঞ্চয় ও লাভ ক্যালকুলেটর
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              আপনার কত সময় ও টাকা বাঁচবে?
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              নিচের স্লাইডারটি টেনে আপনার বাড়ির ফ্ল্যাট সংখ্যা সিলেক্ট করে ফলাফল দেখুন।
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Slider Control */}
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-3">
                <label className="text-xs sm:text-base font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2 leading-tight">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800 shrink-0" />
                  <span>আপনার ভবনে মোট ফ্ল্যাট / ইউনিট সংখ্যা:</span>
                </label>
                <div className="shrink-0 flex items-center justify-center min-w-[72px] sm:min-w-[85px] px-3 sm:px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 whitespace-nowrap select-none">
                    {flatCount}টি
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="50"
                value={flatCount}
                onChange={(e) => setFlatCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
              <div className="flex justify-between text-xs text-slate-600 font-bold font-mono">
                <span>১টি ফ্ল্যাট</span>
                <span>২৫টি</span>
                <span>৫০টি ফ্ল্যাট</span>
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
                <span className="text-xs text-slate-700 font-bold block">মাসে বেঁচে যাওয়া সময়</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-2 whitespace-nowrap">
                  {hoursSaved} ঘণ্টা
                </span>
                <span className="text-[11px] text-slate-600 font-medium mt-1 block">হিসাব ও বারবার তাগাদা দেওয়ার সময়</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
                <span className="text-xs text-slate-700 font-bold block">ফোনকলের মানসিক চাপ মুক্তি</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-2 whitespace-nowrap">
                  {phoneHassleSaved}টি কল
                </span>
                <span className="text-[11px] text-slate-600 font-medium mt-1 block">অটো-মেসেজে ভাড়া পরিশোধ নিশ্চিত</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
                <span className="text-xs text-slate-700 font-bold block">বকেয়া ঝুঁকি হ্রাস</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 block mt-2 whitespace-nowrap">
                  ০% বকেয়া
                </span>
                <span className="text-[11px] text-slate-600 font-medium mt-1 block">১-১০ তারিখের ভেতরেই ভাড়া আদায়</span>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-sm transition-all"
              >
                <span>আপনার {flatCount}টি ফ্ল্যাটের জন্য ফ্রি শুরু করুন →</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Section: Pricing Matrix */}
      <section id="pricing" className="py-24 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              স্বচ্ছ ও সাশ্রয়ী প্যাকেজ
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              ছোট বা বড়—যেকোনো বাড়ির জন্য সেরা প্ল্যান
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              কোনো লুকানো চার্জ নেই। ৩টি ফ্ল্যাট পর্যন্ত আজীবন বিনামূল্যে ব্যবহার করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Free Tier */}
            <div className="rounded-3xl p-8 bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-6 relative transition-all">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-800 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                শুরু করার জন্য
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 text-xs font-bold">
                  ছোট বাড়ির জন্য
                </div>
                <h4 className="text-2xl font-black text-slate-900">ফ্রি ট্রায়াল</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">৳ ০</span>
                  <span className="text-xs text-slate-600 font-bold">/আজীবন ফ্রি</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed min-h-[36px] font-medium">
                  যাদের ৩টি পর্যন্ত ফ্ল্যাট রয়েছে এবং সম্পূর্ণ নিশ্চিন্তে ডিজিটাল খাতা শুরু করতে চান।
                </p>

                <ul className="space-y-2.5 text-xs text-slate-800 font-medium pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>সর্বোচ্চ ৩টি ফ্ল্যাট</strong> পরিচালনা</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>ডিজিটাল মানি রিসিট তৈরি</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>সাব-মিটার ক্যালকুলেটর</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>ডিএমপি পুলিশ ফরম ডাউনলোড</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-center text-sm block transition-all shadow-xs"
              >
                ফ্রিতে শুরু করুন →
              </Link>
            </div>

            {/* Popular Tier (Pro) */}
            <div className="rounded-3xl p-8 bg-white border-2 border-emerald-600 shadow-md ring-4 ring-emerald-50 flex flex-col justify-between space-y-6 relative transition-all">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-800 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                সবচেয়ে জনপ্রিয়
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60">
                  মাঝারি বাড়ির জন্য
                </div>
                <h4 className="text-2xl font-black text-slate-900">প্রো বাড়িওয়ালা</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-emerald-800">৳ ৩৯৯</span>
                  <span className="text-xs text-slate-600 font-bold">/প্রতি মাস</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed min-h-[36px] font-medium">
                  ৪ থেকে ১০টি ফ্ল্যাট থাকা বাড়িওয়ালাদের জন্য নিখুঁত স্বয়ংক্রিয় সমাধান।
                </p>

                <ul className="space-y-2.5 text-xs text-slate-800 font-medium pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>১০টি ফ্ল্যাট</strong> পর্যন্ত সম্পূর্ণ নিয়ন্ত্রণ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>স্বয়ংক্রিয় ১-৫ তারিখ এসএমএস রিমাইন্ডার</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>হোয়াটসঅ্যাপে ১-ক্লিক ভাড়ার রশিদ প্রেরণ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>বকেয়া ট্র্যাকিং ও অডিট স্টেটমেন্ট</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>প্রাধান্যভিত্তিক ফোন সাপোর্ট</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-center text-sm block transition-all shadow-xs"
              >
                প্রো প্ল্যান শুরু করুন →
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="rounded-3xl p-8 bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-6 relative transition-all">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-800 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                বড় ভবন ও সমিতি
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 text-xs font-bold">
                  কমপ্লেক্স ও সমিতির জন্য
                </div>
                <h4 className="text-2xl font-black text-slate-900">এপার্টমেন্ট সমিতি</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">৳ ৯৯৯</span>
                  <span className="text-xs text-slate-600 font-bold">/প্রতি মাস</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed min-h-[36px] font-medium">
                  ১১ থেকে ৩০+ ফ্ল্যাট এবং অ্যাপার্টমেন্ট কমিটির সম্পূর্ণ ফিনান্সিয়াল ম্যানেজমেন্ট।
                </p>

                <ul className="space-y-2.5 text-xs text-slate-800 font-medium pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>আনলিমিটেড ফ্ল্যাট</strong> ও একাধিক বিল্ডিং</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>কমিটি ও ম্যানেজারের আলাদা রোল ও পারমিশন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>মাসিক অডিট ও ব্যাংক স্টেটমেন্ট রিপোর্ট</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-center text-sm block transition-all shadow-xs"
              >
                সমিতি প্ল্যান নিন →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Section: FAQ Accordion */}
      <section id="faq" className="py-20 bg-[#f8fafc] border-t border-slate-200 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              সাধারণ জিজ্ঞাসা
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              আপনার মনের কিছু প্রশ্নের উত্তর
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-800 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-emerald-800' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. Final High-Impact CTA Banner (Royal Deep Forest Green, Zero Black Hole) */}
      <section className="py-20 relative z-10 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-center space-y-6 shadow-xl border border-emerald-600/50 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug tracking-tight drop-shadow-2xs">
                বাড়িভাড়া ব্যবস্থাপনাকে ডিজিটাল ও সহজ করুন
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
                আর কোনো জটিল খাতার হিসাব বা বিল নিয়ে ভুল বোঝাবুঝি নয়। মাত্র ২ মিনিটে আপনার ভবনের ফ্ল্যাটগুলো যোগ করে নিশ্চিন্ত থাকুন।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base bg-white text-emerald-950 hover:bg-emerald-50 shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>ফ্রি অ্যাকাউন্ট তৈরি করুন</span>
                <ArrowRight className="w-4 h-4 text-emerald-800" />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base bg-emerald-900/60 hover:bg-emerald-900 text-white border border-emerald-400/40 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>সরাসরি লাইভ ডেমো দেখুন</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer (Clean White/Slate) */}
      <footer className="bg-white border-t border-slate-200 py-12 relative z-10 text-xs text-slate-600 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              ভ
            </div>
            <span className="font-bold text-slate-900 text-sm">ভাড়া খাতা</span>
            <span className="text-slate-600">• বাড়িওয়ালাদের স্মার্ট রেন্ট ম্যানেজমেন্ট (গ্রিন হাউস থিম)</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-emerald-800 transition-colors font-bold text-slate-700">
              লগইন
            </Link>
            <Link href="/dashboard" className="hover:text-emerald-800 transition-colors font-bold text-slate-700">
              ড্যাশবোর্ড
            </Link>
            <Link href="/to-let" className="hover:text-emerald-800 transition-colors font-bold text-slate-700">
              টু-লেট লিস্টিং
            </Link>
            <a href="#faq" className="hover:text-emerald-800 transition-colors font-bold text-slate-700">
              হেল্প সেন্টার
            </a>
          </div>

          <div className="text-slate-600">
            © 2026 ভাড়া খাতা। সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>

    </div>
  );
}
