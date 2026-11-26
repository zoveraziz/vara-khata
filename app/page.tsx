'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Receipt,
  CreditCard,
  MessageCircle,
  FileText,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Users,
  LogIn,
  UserPlus,
  Bell,
  Clock,
  Smartphone,
  Check,
  Star,
  Sliders,
  Printer,
  Calendar,
  Layers,
  HelpCircle,
  Flame,
  Droplets,
  Menu,
  X,
} from 'lucide-react';

export default function HomePage() {
  const { isLoggedIn, currentUser } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Interactive Calculator State
  const [flatCount, setFlatCount] = useState<number>(10);

  // Derived calculation values for landlord ROI
  const hoursSaved = Math.round(flatCount * 1.5);
  const smsSavedTaka = flatCount * 15; // Assuming monthly reminders
  const collectionSpeed = 5; // By 5th of month

  const faqs = [
    {
      q: 'বিকাশ, নগদ বা ব্যাংকে পাওয়া ভাড়া কি রেকর্ড করা যায়?',
      a: 'হ্যাঁ, ১০০%! নগদ (ক্যাশ), বিকাশ, নগদ ও ব্যাংক ট্রান্সফার—সব মাধ্যমের পেমেন্ট এক ক্লিকে রেকর্ড করা যায়। এমনকি কেউ আংশিক ভাড়া দিলে সেটাও সহজে লিখে রাখা যায় এবং বাকি টাকা স্বয়ংক্রিয়ভাবে পরবর্তী বিলে যোগ হয়।',
    },
    {
      q: 'স্বয়ংক্রিয় ১ থেকে ৫ তারিখের রিমাইন্ডার কীভাবে কাজ করে?',
      a: 'মাসের ১ থেকে ৫ তারিখের মধ্যে শুধুমাত্র যাঁদের ভাড়া বকেয়া রয়েছে, সিস্টেম তাঁদের মোবাইল এসএমএস ও হোয়াটসঅ্যাপে স্বয়ংক্রিয় তাগাদা পাঠায়। ভাড়াটিয়া টাকা পরিশোধ করা মাত্রই তাঁকে তালিকা থেকে বাদ দেওয়া হয়, ফলে পরিশোধিত কারও কাছে ভুল মেসেজ যায় না।',
    },
    {
      q: 'শুরুতে শুধু মূল ভাড়া তৈরি করে পরে কি গ্যাস বা কারেন্ট বিল যোগ করা যাবে?',
      a: 'অবশ্যই! মাসের ১ তারিখে আপনি শুধু মূল ভাড়ার বিল তৈরি করতে পারেন। পরবর্তীতে সাব-মিটার রিডিং নেওয়ার পর বা বিদ্যুৎ/গ্যাসের বিলের কাগজ আসার পর যেকোনো সময় ‘এডিট’ বাটনে ক্লিক করে ইউটিলিটি বিল যোগ করা যায়।',
    },
    {
      q: 'ভাড়াটিয়াকে কি কোনো মোবাইল অ্যাপ ইনস্টল করতে হবে?',
      a: 'একদমই না! ভাড়াটিয়াকে কোনো বাড়তি অ্যাপ ইনস্টল করতে হবে না। আপনি শুধু সফটওয়্যার থেকে "WhatsApp-এ পাঠান" বাটনে ক্লিক করবেন, সাথে সাথে তাঁর হোয়াটসঅ্যাপে মূল ভাড়া ও বকেয়ার বিবরণ সহ ডিজিটাল মানি রিসিট চলে যাবে।',
    },
    {
      q: 'বাংলাদেশ পুলিশ ভাড়াটিয়া তথ্য ফরম কীভাবে পাওয়া যাবে?',
      a: 'ভাড়াটিয়ার নাম, ফোন, এনআইডি ও তথ্য সিস্টেমে এন্ট্রি করা থাকলে "পুলিশ ফরম" বাটনে চাপ দিলেই ১ ক্লিকে ১ কপি পাসপোর্ট সাইজ ছবি ও স্বাক্ষর সহ প্রিন্টযোগ্য সরকারি ফরম স্বয়ংক্রিয়ভাবে তৈরি হয়ে যায়।',
    },
    {
      q: 'সাব-মিটারের বিদ্যুৎ বিল কীভাবে হিসাব করব?',
      a: 'আপনাকে ক্যালকুলেটর নিয়ে হিসাব করতে হবে না। মিটারের বর্তমান রিডিং লিখে দিলেই সিস্টেম স্বয়ংক্রিয়ভাবে আগের রিডিং থেকে বিয়োগ করে ব্যবহৃত ইউনিট এবং প্রতি ইউনিটের রেট দিয়ে গুণ করে বিলে যোগ করে দেবে।',
    },
    {
      q: 'একাধিক বাড়িওয়ালা বা ম্যানেজার কি আলাদা আলাদা অ্যাকাউন্ট চালাতে পারবে?',
      a: 'হ্যাঁ! প্রত্যেকে নিজেদের মোবাইল নম্বর দিয়ে আলাদা আলাদা অ্যাকাউন্ট খুলতে পারবেন। আপনার বাড়ির ফ্ল্যাট ও ভাড়ার যাবতীয় তথ্য ক্লাউড ডেটাবেসে আপনার অ্যাকাউন্টের ভেতরে সম্পূর্ণ সুরক্ষিত ও গোপন থাকবে।',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased">
      
      {/* 1. Public Premium Clean Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform shrink-0">
              ভ
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                ভাড়া খাতা
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-700 tracking-wider block mt-0.5">
                স্মার্ট রেন্ট ম্যানেজমেন্ট
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-slate-600">
            <a href="#features" className="hover:text-emerald-700 transition">ফিচারসমূহ</a>
            <a href="#calculator" className="hover:text-emerald-700 transition">ক্যালকুলেটর</a>
            <a href="#comparison" className="hover:text-emerald-700 transition">কেন ভাড়া খাতা</a>
            <a href="#faq" className="hover:text-emerald-700 transition">সাধারণ প্রশ্ন</a>
          </nav>

          {/* Right Side: Auth Buttons & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition active:scale-95"
              >
                <span>ড্যাশবোর্ডে যান</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-xl transition"
                >
                  <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>লগইন</span>
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition active:scale-95 whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>ফ্রি শুরু করুন</span>
                </Link>
              </>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition ml-1"
              aria-label="মেনু খুলুন বা বন্ধ করুন"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1 text-sm font-bold text-slate-700">
              <a
                href="#features"
                onClick={() => setMobileNavOpen(false)}
                className="px-3.5 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                ফিচারসমূহ
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileNavOpen(false)}
                className="px-3.5 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                বাঁচবে কত ক্যালকুলেটর
              </a>
              <a
                href="#comparison"
                onClick={() => setMobileNavOpen(false)}
                className="px-3.5 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                কেন ভাড়া খাতা
              </a>
              <a
                href="#faq"
                onClick={() => setMobileNavOpen(false)}
                className="px-3.5 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                সাধারণ প্রশ্নোত্তর
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full text-center bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-sm"
                >
                  ড্যাশবোর্ডে প্রবেশ করুন
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileNavOpen(false)}
                    className="text-center border border-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm hover:bg-slate-50 transition"
                  >
                    লগইন
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileNavOpen(false)}
                    className="text-center bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-sm hover:bg-emerald-800 transition"
                  >
                    ফ্রি শুরু করুন
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section with Ambient Glow */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-emerald-50/70 via-teal-50/30 to-white">
        {/* Ambient Decorative Blurs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-300/30 to-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-emerald-300/80 text-emerald-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-7 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>🇧🇩 বাংলাদেশের ১ নম্বর বাড়িওয়ালা ও মার্কেট ম্যানেজমেন্ট প্ল্যাটফর্ম</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-5xl mx-auto leading-[1.2] sm:leading-[1.15]">
            ভাড়া আদায়ের দুশ্চিন্তা শেষ, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              সব হিসাব এবার আধুনিক ও স্বয়ংক্রিয়
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            ফ্ল্যাট ও দোকান ভাড়া, সাব-মিটার বিদ্যুৎ, ১-৫ তারিখের অটো এসএমএস রিমাইন্ডার এবং বাংলাদেশ পুলিশ ফরম — খাতা-কলম ছাড়াই পরিচালনা করুন সহজে।
          </p>

          {/* Hero CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href={isLoggedIn ? "/dashboard" : "/register"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-emerald-700/25 transition active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isLoggedIn ? "আপনার ড্যাশবোর্ডে প্রবেশ করুন" : "বিনামূল্যে অ্যাকাউন্ট খুলুন (১ মিনিটে রেডি)"}</span>
            </Link>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-7 py-4 rounded-2xl border border-slate-300 shadow-xs transition"
            >
              <span>লাইভ ডেমো দেখুন</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </a>
          </div>

          {/* Key Trust Checkmarks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              কোনো ক্রেডিট কার্ড লাগবে না
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ফ্রি WhatsApp ডিজিটাল রসিদ
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ১-৫ তারিখের অটো রিমাইন্ডার
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              বাংলাদেশ পুলিশ ভেরিফিকেশন ফরম
            </span>
          </div>

          {/* 3. Gorgeous Browser UI Mockup (Crown Jewel) */}
          <div id="demo" className="mt-16 max-w-5xl mx-auto rounded-3xl border border-slate-200/80 shadow-2xl bg-white p-3 sm:p-5 text-left transition hover:shadow-emerald-900/10">
            {/* macOS Browser Window Top Bar */}
            <div className="bg-slate-100 rounded-2xl px-4 py-3 mb-4 flex items-center justify-between border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="bg-white px-4 py-1 rounded-lg text-xs font-mono text-slate-500 border border-slate-200 flex items-center gap-2 shadow-2xs">
                <span className="text-emerald-600 font-bold">https://</span>app.varakhata.com/dashboard
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>লাইভ সিস্টেম</span>
              </div>
            </div>

            {/* Inner Dashboard View */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-5 sm:p-7 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 px-2.5 py-0.5 rounded-full text-xs font-semibold text-emerald-200 mb-2 border border-emerald-600/60">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>চলতি মাস: নভেম্বর ২০২৬</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">আল-আকসা মঞ্জিল (১০টি ফ্ল্যাট)</h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                  বাড়ি #১২, রোড #০৫, মিরপুর-২, ঢাকা • মোট সংগৃহীত ভাড়া: ৳ ১,৮৫,০০০
                </p>
              </div>
              <div className="flex gap-3">
                <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                  <span className="text-[11px] text-emerald-200 block font-semibold">আদায়কৃত ভাড়া</span>
                  <span className="text-lg sm:text-xl font-black text-emerald-300">৳ ১,৮৫,০০০</span>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                  <span className="text-[11px] text-rose-200 block font-semibold">বকেয়া রয়েছে</span>
                  <span className="text-lg sm:text-xl font-black text-rose-300">৳ ২৪,০০০</span>
                </div>
              </div>
            </div>

            {/* Table Mockup Rows */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-3.5 bg-slate-100/80 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-700">
                <span>ফ্ল্যাট ও ভাড়াটিয়া</span>
                <span className="hidden sm:inline">সাব-মিটার বিদ্যুৎ</span>
                <span>মোট বিল ও বকেয়া</span>
                <span>স্ট্যাটাস ও অ্যাকশন</span>
              </div>

              <div className="divide-y divide-slate-200/80 text-xs sm:text-sm">
                {/* Row 1 */}
                <div className="p-3.5 flex justify-between items-center bg-white hover:bg-emerald-50/30 transition">
                  <div>
                    <span className="font-bold text-slate-900 block">ফ্ল্যাট ১-এ (1A)</span>
                    <span className="text-slate-500 text-xs">মোঃ আব্দুল আজিজ • 01711223344</span>
                  </div>
                  <span className="text-slate-600 text-xs hidden sm:inline">
                    ১৩০ ইউনিট (<strong className="text-slate-800">৳১,৩০০</strong>)
                  </span>
                  <div>
                    <span className="font-black text-slate-900">৳ ২২,৪৮০</span>
                    <span className="text-[11px] text-emerald-700 block font-bold">সম্পূর্ণ পরিশোধ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      পরিশোধিত ✓
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>রসিদ প্রেরিত</span>
                    </span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="p-3.5 flex justify-between items-center bg-white hover:bg-emerald-50/30 transition">
                  <div>
                    <span className="font-bold text-slate-900 block">ফ্ল্যাট ১-বি (1B)</span>
                    <span className="text-slate-500 text-xs">তানভীর আহমেদ • 01812345678</span>
                  </div>
                  <span className="text-slate-600 text-xs hidden sm:inline">
                    ১০০ ইউনিট (<strong className="text-slate-800">৳১,০০০</strong>)
                  </span>
                  <div>
                    <span className="font-black text-slate-900">৳ ২১,৭৮০</span>
                    <span className="text-[11px] text-rose-600 block font-bold">বকেয়া: ৳ ২,০০০</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                      বকেয়া আছে
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                      <Bell className="w-3.5 h-3.5" />
                      <span>অটো তাগাদা শিডিউল</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Elegant Trust Stats Bar */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-100">
            <div className="p-2">
              <p className="text-3xl sm:text-4xl font-black text-emerald-800">৩,৫০০+</p>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">বাড়ি ও মার্কেট মালিকের আস্থা</p>
            </div>
            <div className="p-2">
              <p className="text-3xl sm:text-4xl font-black text-emerald-800">১৮,০০০+</p>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">ফ্ল্যাট ও দোকান পরিচালিত</p>
            </div>
            <div className="p-2">
              <p className="text-3xl sm:text-4xl font-black text-emerald-800">১ ক্লিকে</p>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">পুলিশ ফরম ও WhatsApp রসিদ</p>
            </div>
            <div className="p-2">
              <p className="text-3xl sm:text-4xl font-black text-emerald-800">১০০%</p>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">কাগজের খাতার ঝামেলা মুক্ত</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive ROI & Time Calculator */}
      <section id="calculator" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
              হিসাব করে দেখুন
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">
              ভাড়া খাতা ব্যবহারে আপনার কতটা সময় ও টাকা বাঁচবে?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              আপনার কয়টি ফ্ল্যাট বা দোকান রয়েছে তা সিলেক্ট করে সরাসরি সুবিধা দেখুন:
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
            {/* Slider Control */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm sm:text-base font-bold text-slate-800">
                  আপনার মোট ফ্ল্যাট / ইউনিটের সংখ্যা:
                </label>
                <span className="text-2xl sm:text-3xl font-black text-emerald-700 bg-emerald-50 px-4 py-1 rounded-2xl border border-emerald-200">
                  {flatCount} টি
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                step="1"
                value={flatCount}
                onChange={(e) => setFlatCount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-semibold">
                <span>২টি ফ্ল্যাট</span>
                <span>১০টি</span>
                <span>২০টি</span>
                <span>৩০টি</span>
                <span>৪০+ ফ্ল্যাট</span>
              </div>
            </div>

            {/* Dynamic Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center">
                <Clock className="w-7 h-7 text-emerald-700 mx-auto mb-2" />
                <span className="text-xs font-bold text-emerald-900">প্রতি মাসে সময় সাশ্রয়</span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">
                  ~{hoursSaved} ঘণ্টা
                </p>
                <p className="text-[11px] text-emerald-700 mt-1">খাতা লেখা ও সাব-মিটার ক্যালকুলেটর ছাড়াই</p>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 text-center">
                <ShieldCheck className="w-7 h-7 text-teal-700 mx-auto mb-2" />
                <span className="text-xs font-bold text-teal-900">বকেয়া ভাড়া আদায়ের হার</span>
                <p className="text-2xl sm:text-3xl font-black text-teal-800 mt-1">
                  ৯৮% নিশ্চিত
                </p>
                <p className="text-[11px] text-teal-700 mt-1">১ থেকে ৫ তারিখের অটো রিমাইন্ডার দিয়ে</p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 text-center">
                <MessageCircle className="w-7 h-7 text-blue-700 mx-auto mb-2" />
                <span className="text-xs font-bold text-blue-900">ফ্রি WhatsApp রসিদ</span>
                <p className="text-2xl sm:text-3xl font-black text-blue-800 mt-1">
                  ৳ ০ খরচ
                </p>
                <p className="text-[11px] text-blue-700 mt-1">এসএমএস খরচের কোনো প্রয়োজনই নেই</p>
              </div>
            </div>

            {/* Quick Action */}
            <div className="mt-8 text-center pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md transition active:scale-95"
              >
                <span>আপনার {flatCount}টি ফ্ল্যাটের হিসাব বিনামূল্যে শুরু করুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Core Features Grid */}
      <section id="features" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
              আধুনিক ও স্বয়ংক্রিয় ফিচারসমূহ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 leading-snug">
              বাড়ি ও মার্কেট পরিচালনার জন্য প্রয়োজনীয় সবকিছু এক জায়গায়
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              বাঙালি বাড়িওয়ালাদের বাস্তব প্রয়োজন ও অভিজ্ঞতা মাথায় রেখে প্রতিটি ফিচার যত্ন নিয়ে তৈরি করা হয়েছে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1: Auto Reminders (Game Changer) */}
            <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6 text-amber-700" />
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 uppercase">
                ইউনিক ফিচার
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                ১ থেকে ৫ তারিখের অটো রিমাইন্ডার ইঞ্জিন
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                মাসের ১-৫ তারিখ শুধুমাত্র বকেয়া থাকা ভাড়াটিয়াদের মোবাইল এসএমএস ও হোয়াটসঅ্যাপে স্বয়ংক্রিয় তাগাদা বার্তা যায়। ভাড়া পরিশোধ হওয়ামাত্রই মেসেজ বন্ধ হয়ে যায়।
              </p>
            </div>

            {/* Feature 2: 1-Click Bill & Flexible Utilities */}
            <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Receipt className="w-6 h-6 text-emerald-700" />
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 uppercase">
                ফ্লেক্সিবল বিলিং
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                শুরুতে মূল ভাড়া, পরে ইউটিলিটি বিল যোগ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                মাসের শুরুতে শুধু মূল ভাড়া দিয়ে বিল তৈরি করতে পারেন। পরবর্তীতে সুবিধা অনুযায়ী গ্যাস বিল, পানি বিল ও সার্ভিস চার্জ যেকোনো সময় ‘এডিট’ বাটনে যোগ করা যায়।
              </p>
            </div>

            {/* Feature 3: Sub-meter Electricity */}
            <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-blue-700" />
              </div>
              <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 uppercase">
                সাব-মিটারিং
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                বিদ্যুৎ বিল সাব-মিটার ক্যালকুলেটর
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                শুধু বর্তমান ইউনিট রিডিং লিখে দিন। সিস্টেম স্বয়ংক্রিয়ভাবে আগের রিডিং বিয়োগ করে ব্যবহৃত ইউনিট এবং সরকারি রেটে গুণ করে বিল যোগ করে দেয়।
              </p>
            </div>

            {/* Feature 4: Free WhatsApp Receipt */}
            <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-green-700" />
              </div>
              <span className="text-[11px] font-bold text-green-800 bg-green-50 px-2.5 py-0.5 rounded-md border border-green-200 uppercase">
                ১০০% ফ্রি
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                ১-ক্লিকে ফ্রি WhatsApp মানি রিসিট
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                টাকা পাওয়া মাত্রই ‘রশিদ’ বাটনে ক্লিক করুন। কোনো এসএমএস খরচ ছাড়াই সরাসরি ভাড়াটিয়ার হোয়াটসঅ্যাপে ডিজিটাল ভাউচার চলে যাবে।
              </p>
            </div>

            {/* Feature 5: Police Verification Form */}
            <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-purple-700" />
              </div>
              <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200 uppercase">
                আইনি সুরক্ষা
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                বাংলাদেশ পুলিশ ফরম অটো-জেনারেট
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                ভাড়াটিয়ার তথ্য সিস্টেমে থাকলে বাংলাদেশ পুলিশের অফিসিয়াল ফরম্যাটে ১ ক্লিকে ছবি সহ প্রিন্টযোগ্য ফরম তৈরি হয়ে যায়। থানায় জমা দেওয়া এখন একদম সহজ।
              </p>
            </div>

            {/* Feature 6: Lifetime Ledger & TO-LET */}
            <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-rose-700" />
              </div>
              <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 uppercase">
                হিস্ট্রি ও টু-লেট
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                ৬ মাসের স্টেটমেন্ট ও টু-লেট পোস্টার
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                যেকোনো ভাড়াটিয়ার বিগত ৬ মাস বা ১ বছরের ভাড়ার হিসাবের লেজার ১ ক্লিকে প্রিন্ট করুন। আর ফ্ল্যাট খালি হলে গেটের বড় টু-লেট পোস্টার এক ক্লিকে বানিয়ে নিন।
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Before vs After Comparison */}
      <section id="comparison" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
              পার্থক্যটা নিজেই দেখুন
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">
              খাতার সনাতন হিসাব বনাম ভাড়া খাতার ডিজিটাল সমাধান
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              আগে কীভাবে বাড়িওয়ালারা সময় ও টাকা নষ্ট করতেন এবং আমাদের সফটওয়্যারে কীভাবে সবকিছু সহজ হয়:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Old Paper Way */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-red-200 shadow-sm relative">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 font-bold text-xs px-3.5 py-1.5 rounded-full mb-6">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>কাগজের খাতা ও ডায়রির সনাতন পদ্ধতি</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>খাতায় হাতে লিখে প্রতি মাসে ভাড়ার হিসাব রাখা অত্যন্ত ক্লান্তিকর।</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>কে ভাড়া দিল আর কার কত বাকি—মনে রাখা বা পাতা উল্টে খোঁজা কঠিন।</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>সাব-মিটারের ইউনিট দেখে বিদ্যুৎ, গ্যাস ও কমন বিল আলাদা হিসাব করতে ভুল হয়।</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>কাগজের রসিদ বই কিনতে টাকা লাগে এবং হারিয়ে যাওয়ার ঝুঁকি থাকে।</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>ভাড়াটিয়ার এনআইডি ও তথ্য কাগজের ফাইলে হারিয়ে যায়, থানায় যেতে ঝামেলা।</span>
                </li>
              </ul>
            </div>

            {/* Smart VaraKhata Way */}
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-7 sm:p-9 border border-emerald-700/60 shadow-xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 font-bold text-xs px-3.5 py-1.5 rounded-full mb-6 border border-emerald-600/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ভাড়া খাতার আধুনিক পদ্ধতি (স্মার্ট সমাধান)</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-emerald-100 font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>এক ক্লিকে পুরো মাসের বিল:</strong> সব ফ্ল্যাটের হিসাব একসাথে স্বয়ংক্রিয় তৈরি।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>অটোমেটিক বকেয়া যোগ:</strong> পেছনের বাকি টাকা পরের মাসের বিলে অটোমেটিক যুক্ত।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>১-৫ তারিখের অটো তাগাদা:</strong> বকেয়া ভাড়াটিয়াদের SMS ও WhatsApp-এ মেসেজ।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>ফ্রি WhatsApp মানি রিসিট:</strong> বাটনে চাপলেই ভাড়াটিয়ার হোয়াটসঅ্যাপে রসিদ।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>বাংলাদেশ পুলিশ ফরম:</strong> ১ ক্লিকে সরকারি ফরম্যাটে প্রিন্টযোগ্য ফরম রেডি।</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FAQ Accordion Section */}
      <section id="faq" className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
              সাধারণ জিজ্ঞাসা
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">
              সচরাচর জিজ্ঞাসিত প্রশ্নোত্তর
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              বাড়িওয়ালা ও প্রপার্টি মালিকদের মনের সাধারণ প্রশ্ন ও তার পরিষ্কার উত্তর।
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl overflow-hidden transition-all ${
                    isOpen ? 'border-emerald-300 shadow-sm bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-4 transition"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? 'transform rotate-180 text-emerald-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. Bottom Call to Action Banner */}
      <section className="py-20 sm:py-28 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-center relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-emerald-200 mb-6 border border-white/15">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>আজই শুরু করুন সম্পূর্ণ বিনামূল্যে</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            খাতা-কলমের ঝামেলা মুক্ত হয়ে <br className="hidden sm:inline" />
            আপনার বাড়ির হিসাব রাখুন ডিজিটালি
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
            হাজারো বাড়িওয়ালা ও মার্কেট মালিকের মতো আপনিও আপনার ভাড়ার হিসাবকে আধুনিক, নিরাপদ ও স্বচ্ছ করুন।
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={isLoggedIn ? "/dashboard" : "/register"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-base sm:text-lg px-9 py-4 rounded-2xl shadow-2xl transition active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>{isLoggedIn ? "ড্যাশবোর্ডে প্রবেশ করুন" : "১ মিনিটে ফ্রি অ্যাকাউন্ট খুলুন"}</span>
            </Link>
          </div>

          <p className="text-xs text-emerald-200/80 mt-4 font-semibold">
            কোনো ক্রেডিট কার্ডের প্রয়োজন নেই • সম্পূর্ণ সুরক্ষিত ক্লাউড ডেটাবেস
          </p>
        </div>
      </section>

      {/* 10. Polished Footer */}
      <footer className="bg-slate-900 text-white py-14 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white text-lg">
                  ভ
                </div>
                <span className="font-black text-xl text-white">ভাড়া খাতা (VaraKhata)</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                বাংলাদেশের বাড়িওয়ালা, ভবন মালিক ও প্রপার্টি ম্যানেজারদের জন্য তৈরি সহজ ও আধুনিক ক্লাউড সফটওয়্যার।
              </p>
              <p className="text-emerald-400 text-xs font-bold pt-1">
                🇧🇩 মেইড উইথ প্রাইড ইন বাংলাদেশ
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <p className="font-bold text-white text-sm mb-3">দ্রুত লিঙ্ক</p>
              <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
                <li><a href="#features" className="hover:text-emerald-400 transition">ফিচারসমূহ</a></li>
                <li><a href="#calculator" className="hover:text-emerald-400 transition">বাঁচবে কত ক্যালকুলেটর</a></li>
                <li><a href="#comparison" className="hover:text-emerald-400 transition">কেন ভাড়া খাতা</a></li>
                <li><a href="#faq" className="hover:text-emerald-400 transition">সাধারণ প্রশ্নোত্তর</a></li>
              </ul>
            </div>

            {/* Col 3: Features */}
            <div>
              <p className="font-bold text-white text-sm mb-3">প্রধান সুবিধাসমূহ</p>
              <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
                <li><span>ফ্রি WhatsApp ডিজিটাল রসিদ</span></li>
                <li><span>১-৫ তারিখের অটো SMS তাগাদা</span></li>
                <li><span>সাব-মিটার বিদ্যুৎ ক্যালকুলেটর</span></li>
                <li><span>বাংলাদেশ পুলিশ ভেরিফিকেশন ফরম</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
            <p>© ২০২৬ ভাড়া খাতা (VaraKhata) • সর্বস্বত্ব সংরক্ষিত।</p>
            <p className="text-slate-400">নিরাপদ • আধুনিক • দ্রুততম</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
