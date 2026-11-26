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
  TrendingUp,
  Award,
  Lock,
  Download,
  Share2,
  ChevronRight,
  PhoneCall,
  Search,
  Home,
  CheckCheck,
} from 'lucide-react';

export default function HomePage() {
  const { isLoggedIn, currentUser } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Hero interactive demo switch: 'dashboard' | 'whatsapp' | 'meter'
  const [heroView, setHeroView] = useState<'dashboard' | 'whatsapp' | 'meter'>('dashboard');

  // Interactive Sub-Meter Calculator in Bento / Hero
  const [prevMeter, setPrevMeter] = useState<number>(450);
  const [currMeter, setCurrMeter] = useState<number>(580);
  const [unitRate, setUnitRate] = useState<number>(10);
  const usedUnits = Math.max(0, currMeter - prevMeter);
  const calculatedElectricBill = usedUnits * unitRate;

  // Interactive ROI Calculator State
  const [flatCount, setFlatCount] = useState<number>(12);
  const hoursSaved = Math.round(flatCount * 1.8);
  const phoneHassleSaved = flatCount * 4;

  const faqs = [
    {
      q: 'বিকাশ, নগদ বা ব্যাংকে পাওয়া ভাড়া কি আলাদাভাবে রেকর্ড করা যায়?',
      a: 'হ্যাঁ, ১০০%! নগদ (ক্যাশ), বিকাশ, নগদ ও ব্যাংক ট্রান্সফার—সব মাধ্যমের পেমেন্ট এক ক্লিকে আলাদা আলাদা ব্যাজ সহ রেকর্ড করা যায়। এমনকি কেউ আংশিক ভাড়া দিলে সেটাও সহজে লিখে রাখা যায় এবং বাকি টাকা স্বয়ংক্রিয়ভাবে বকেয়া হিসেবে পরবর্তী বিলে যোগ হয়।',
    },
    {
      q: 'স্বয়ংক্রিয় ১ থেকে ৫ তারিখের রিমাইন্ডার ইঞ্জিন কীভাবে কাজ করে?',
      a: 'মাসের ১ থেকে ৫ তারিখের মধ্যে শুধুমাত্র যাঁদের ভাড়া এখনও বকেয়া রয়েছে, সিস্টেম তাঁদের মোবাইল এসএমএস ও হোয়াটসঅ্যাপে সম্মানজনক ভাষায় স্বয়ংক্রিয় তাগাদা পাঠায়। ভাড়াটিয়া টাকা পরিশোধ করা মাত্রই তিনি তালিকা থেকে বাদ পড়ে যান, ফলে পরিশোধিত কারও কাছে ভুল মেসেজ যায় না।',
    },
    {
      q: 'শুরুতে শুধু মূল ভাড়া তৈরি করে পরে কি গ্যাস বা কারেন্ট বিল যোগ করা যাবে?',
      a: 'অবশ্যই! মাসের ১ তারিখে আপনি শুধু চুক্তিভিত্তিক মূল ভাড়ার বিল তৈরি করতে পারেন। পরবর্তীতে সাব-মিটার রিডিং নেওয়ার পর বা বিদ্যুৎ/গ্যাসের বিল আসার পর যেকোনো সময় ‘এডিট’ বাটনে ক্লিক করে ইউটিলিটি বিল যোগ করতে পারেন। মূল ভাড়া সবসময় সুরক্ষিত থাকে।',
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
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-50/40 via-white to-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950 antialiased overflow-x-hidden">
      
      {/* Soft Botanical Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-40 w-[28rem] h-[28rem] bg-teal-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] bg-emerald-100/40 rounded-full blur-3xl" />
      </div>

      {/* 1. Header (Clean White & Emerald Glassmorphism) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform shrink-0">
              ভ
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                ভাড়া খাতা
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 tracking-wider block mt-0.5">
                বাড়িওয়ালাদের ডিজিটাল সহকারী
              </span>
            </div>
          </Link>

          {/* Action Buttons (Only 2 buttons as requested) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/dashboard"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all flex items-center gap-1.5 shadow-2xs hover:border-emerald-300"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>লাইভ ডেমো</span>
            </Link>

            <Link
              href="/login"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md shadow-emerald-700/20 hover:shadow-emerald-700/30 flex items-center gap-1.5 group"
            >
              <span>লগইন / শুরু করুন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Bright, Fresh White & Emerald) */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>বাংলাদেশের #১ প্রপটেক প্ল্যাটফর্ম • ৩,৫০০+ বাড়িওয়ালার ভরসা</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.28] sm:leading-[1.2] text-slate-900">
              হাতে লেখা খাতার দিন শেষ,{' '}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                স্মার্ট বাড়িওয়ালার শুরু।
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              মাসের ১-১০ তারিখের ভাড়া চাওয়ার অস্বস্তি, বিদ্যুৎ সাব-মিটারের জটিল ইউনিট প্যাঁচ আর ছেঁড়া রশিদের দিন শেষ। 
              মোবাইল থেকেই তৈরি করুন অটো-বিল, পাঠান সম্মানজনক হোয়াটসঅ্যাপ রিমাইন্ডার ও ডিজিটাল মানি রিসিট।
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-base text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-lg shadow-emerald-700/25 hover:shadow-emerald-700/40 transition-all flex items-center justify-center gap-2 group"
              >
                <span>৩টি ফ্ল্যাট আজীবন ফ্রি ব্যবহার করুন</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-base text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 hover:border-emerald-400"
              >
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>সরাসরি লাইভ ডেমো দেখুন (১ ক্লিকে)</span>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs sm:text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>কোনো ক্রেডিট কার্ড লাগে না</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>৩টি ইউনিট সম্পূর্ণ ফ্রি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>১ মিনিটে রেডি</span>
              </div>
            </div>
          </div>

          {/* 3. Centerpiece Interactive Showcase */}
          <div className="mt-14 max-w-5xl mx-auto">
            
            {/* View Selector Tabs */}
            <div className="flex justify-center mb-5">
              <div className="bg-white/95 p-1.5 rounded-2xl border border-emerald-100 flex items-center gap-1 sm:gap-2 shadow-sm backdrop-blur-md">
                <button
                  onClick={() => setHeroView('dashboard')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    heroView === 'dashboard'
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>বাড়িওয়ালার ড্যাশবোর্ড</span>
                </button>

                <button
                  onClick={() => setHeroView('whatsapp')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    heroView === 'whatsapp'
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>ভাড়াটিয়ার হোয়াটসঅ্যাপ রশিদ</span>
                </button>

                <button
                  onClick={() => setHeroView('meter')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    heroView === 'meter'
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>সাব-মিটার ক্যালকুলেটর</span>
                </button>
              </div>
            </div>

            {/* Showcase Stage Card (Clean White with Emerald Accent) */}
            <div className="relative rounded-3xl bg-white border border-emerald-200/90 shadow-xl p-4 sm:p-7 backdrop-blur-2xl ring-1 ring-emerald-50 overflow-hidden">
              
              {/* Radial Highlight */}
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

              {/* VIEW 1: Landlord Dashboard Preview */}
              {heroView === 'dashboard' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                      <span className="text-xs text-slate-500 block font-medium">চলতি মাসের আদায়</span>
                      <span className="text-lg sm:text-2xl font-black text-emerald-800 block mt-1">৳ ১,৮৫,৪০০</span>
                      <span className="text-[11px] text-emerald-700 font-bold mt-0.5 inline-block">↑ ৯৪% আদায় সম্পন্ন</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100">
                      <span className="text-xs text-slate-500 block font-medium">মোট বকেয়া</span>
                      <span className="text-lg sm:text-2xl font-black text-rose-700 block mt-1">৳ ১২,৫০০</span>
                      <span className="text-[11px] text-rose-600 font-bold mt-0.5 inline-block">১টি ফ্ল্যাট বকেয়া</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 block font-medium">মোট ফ্ল্যাট ও ইউনিট</span>
                      <span className="text-lg sm:text-2xl font-black text-slate-900 block mt-1">১২ টি</span>
                      <span className="text-[11px] text-slate-600 font-semibold mt-0.5 inline-block">১০০% ভাড়াটিয়া যুক্ত</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100">
                      <span className="text-xs text-slate-500 block font-medium">অটো-রিমাইন্ডার</span>
                      <span className="text-lg sm:text-2xl font-black text-teal-800 block mt-1">সক্রিয়</span>
                      <span className="text-[11px] text-teal-700 font-bold mt-0.5 inline-block">১-৫ তারিখ স্বয়ংক্রিয়</span>
                    </div>
                  </div>

                  {/* Dashboard Table Mockup */}
                  <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-800">জুন ২০২৬ ভাড়ার তালিকা ও আদায় হিসেব</span>
                      </div>
                      <Link href="/dashboard" className="text-xs font-bold text-emerald-700 hover:underline">
                        সম্পূর্ণ ড্যাশবোর্ড দেখুন →
                      </Link>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[760px] whitespace-nowrap text-left text-xs sm:text-sm border-collapse divide-y divide-slate-200">
                        <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-3 sm:px-4 border-r border-slate-200 whitespace-nowrap">ফ্ল্যাট ও ভাড়াটিয়া</th>
                            <th className="py-3 px-3 sm:px-4 border-r border-slate-200 whitespace-nowrap">মূল ভাড়া</th>
                            <th className="py-3 px-3 sm:px-4 border-r border-slate-200 whitespace-nowrap">বিদ্যুৎ (সাব-মিটার)</th>
                            <th className="py-3 px-3 sm:px-4 border-r border-slate-200 whitespace-nowrap">মোট বিল</th>
                            <th className="py-3 px-3 sm:px-4 border-r border-slate-200 whitespace-nowrap">পেমেন্ট মেথড</th>
                            <th className="py-3 px-3 sm:px-4 whitespace-nowrap">স্ট্যাটাস</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-700">
                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                              ফ্ল্যাট ১-এ (আব্দুল আজিজ)
                            </td>
                            <td className="py-3 px-3 sm:px-4 border-r border-slate-200 font-medium whitespace-nowrap">
                              ৳ ১৮,০০০
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-emerald-700 font-semibold border-r border-slate-200 whitespace-nowrap">
                              ৳ ১,২০০ (১২০ ইউনিট)
                            </td>
                            <td className="py-3 px-3 sm:px-4 font-black text-slate-900 border-r border-slate-200 whitespace-nowrap">
                              ৳ ২১,১৮০
                            </td>
                            <td className="py-3 px-3 sm:px-4 border-r border-slate-200 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold whitespace-nowrap">
                                💵 ক্যাশ
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs whitespace-nowrap">
                                পরিশোধিত
                              </span>
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                              ফ্ল্যাট ২-বি (তানভীর আহমেদ)
                            </td>
                            <td className="py-3 px-3 sm:px-4 border-r border-slate-200 font-medium whitespace-nowrap">
                              ৳ ১৬,০০০
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-emerald-700 font-semibold border-r border-slate-200 whitespace-nowrap">
                              ৳ ১,৩৫০ (১৩৫ ইউনিট)
                            </td>
                            <td className="py-3 px-3 sm:px-4 font-black text-slate-900 border-r border-slate-200 whitespace-nowrap">
                              ৳ ১৯,৯৮০
                            </td>
                            <td className="py-3 px-3 sm:px-4 border-r border-slate-200 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-pink-50 text-pink-700 border border-pink-200 text-xs font-bold whitespace-nowrap">
                                📱 বিকাশ
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs whitespace-nowrap">
                                পরিশোধিত
                              </span>
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                              ফ্ল্যাট ৩-সি (কবীর হোসেন)
                            </td>
                            <td className="py-3 px-3 sm:px-4 border-r border-slate-200 font-medium whitespace-nowrap">
                              ৳ ২০,০০০
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-emerald-700 font-semibold border-r border-slate-200 whitespace-nowrap">
                              ৳ ১,১০০ (১১০ ইউনিট)
                            </td>
                            <td className="py-3 px-3 sm:px-4 font-black text-rose-700 border-r border-slate-200 whitespace-nowrap">
                              ৳ ২৩,৭৮০
                            </td>
                            <td className="py-3 px-3 sm:px-4 border-r border-slate-200 whitespace-nowrap">
                              <span className="text-slate-500 text-xs font-semibold whitespace-nowrap">বকেয়া</span>
                            </td>
                            <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs animate-pulse whitespace-nowrap">
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
                <div className="max-w-md mx-auto bg-slate-50 rounded-2xl border border-emerald-200 p-4 sm:p-5 shadow-lg space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                        VK
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">ভাড়া খাতা অটো-এসএমএস / WhatsApp</div>
                        <div className="text-[10px] text-emerald-700 font-semibold">অনলাইন • ভেরিফাইড সার্ভিস</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">আজ সকাল ৯:৩০</span>
                  </div>

                  <div className="bg-white border border-emerald-100 rounded-2xl p-4 space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-xs">
                    <p className="font-bold text-emerald-800">
                      আসসালামু আলাইকুম মোঃ আব্দুল আজিজ ভাই,
                    </p>
                    <p className="text-slate-600">
                      আপনার <strong className="text-slate-900">ফ্ল্যাট ১-এ (বাড়ি নং ১২, ধানমন্ডি)</strong> এর চলতি <strong className="text-slate-900">জুন ২০২৬</strong> মাসের ভাড়ার বিবরণী প্রস্তুত হয়েছে:
                    </p>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">মাসিক মূল বাড়িভাড়া:</span>
                        <span className="font-bold text-slate-900">৳ ১৮,০০০</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">সাব-মিটার বিদ্যুৎ (১২০ ইউনিট):</span>
                        <span className="font-bold text-emerald-700">৳ ১,২০০</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">গ্যাস বিল:</span>
                        <span className="font-bold text-slate-900">৳ ১,০৮০</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">সার্ভিস চার্জ / দারোয়ান:</span>
                        <span className="font-bold text-slate-900">৳ ১,৫০০</span>
                      </div>
                      <div className="border-t border-slate-200 pt-1.5 flex justify-between text-sm font-bold">
                        <span className="text-emerald-800">সর্বমোট প্রদেয়:</span>
                        <span className="text-emerald-800">৳ ২১,৭৮০</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      টাকা পরিশোধের শেষ তারিখ: ১০ জুন ২০২৬। ডিজিটাল মানি রিসিট দেখতে নিচে ক্লিক করুন:
                    </p>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs">
                        🔗 varakhata-bd.vercel.app/receipt/001
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 3: Live Sub-Meter Calculator Tool */}
              {heroView === 'meter' && (
                <div className="max-w-xl mx-auto bg-white rounded-2xl border border-emerald-200 p-5 sm:p-7 shadow-lg space-y-5 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-black text-slate-900 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <span>লাইভ সাব-মিটার বিদ্যুৎ বিল ক্যালকুলেটর</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      রিডিং টাইপ করে নিজেই পরীক্ষা করুন কীভাবে ১ সেকেন্ডে নিখুঁত হিসাব তৈরি হয়
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        পূর্বের রিডিং
                      </label>
                      <input
                        type="number"
                        value={prevMeter}
                        onChange={(e) => setPrevMeter(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        বর্তমান রিডিং
                      </label>
                      <input
                        type="number"
                        value={currMeter}
                        onChange={(e) => setCurrMeter(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        প্রতি ইউনিট রেট (৳)
                      </label>
                      <input
                        type="number"
                        value={unitRate}
                        onChange={(e) => setUnitRate(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-emerald-800 font-semibold block">ব্যবহৃত ইউনিট: {usedUnits} টি</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">সর্বমোট বিদ্যুৎ বিল</span>
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
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-emerald-100">
            <div className="text-center p-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-700 block whitespace-nowrap">৩,৫০০+</span>
              <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 block">নিবন্ধিত বাড়িওয়ালা</span>
            </div>
            <div className="text-center p-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-teal-700 block whitespace-nowrap">৳ ৪.৫ কোটি+</span>
              <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 block">ভাড়া আদায় সম্পন্ন</span>
            </div>
            <div className="text-center p-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-600 block whitespace-nowrap">৯৮.৫%</span>
              <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 block">সময়মতো বিল আদায়</span>
            </div>
            <div className="text-center p-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-600 block whitespace-nowrap">৪.৯ ★★★★★</span>
              <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 block">ইউজার রিভিউ রেটিং</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Section: Before vs After Interactive Story */}
      <section id="story" className="py-20 bg-white border-y border-emerald-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              তুলনামূলক বাস্তব চিত্র
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              হাতে লেখা খাতার ঝামেলা বনাম আধুনিক ‘ভাড়া খাতা’
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              প্রতি মাসের হিসাব মেলানো নিয়ে অযথা মানসিক চাপ নেওয়ার দিন কি সত্যি এখনও মেনে নেওয়া যায়?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* The Old Painful Way (হালকা লাল কার্ড) */}
            <div className="rounded-3xl p-6 sm:p-8 bg-rose-50/60 border border-rose-200 relative overflow-hidden space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>আগের এনালগ খাতা পদ্ধতি</span>
              </div>

              <h4 className="text-xl font-black text-slate-900">
                মাসের শুরুতেই বাড়িওয়ালার মাথায় রাজ্যের দুশ্চিন্তা
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-700">
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

            {/* The New Vara Khata Way (সবুজ ও সাদা গর্জিয়াস কার্ড) */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-300 relative overflow-hidden space-y-5 shadow-lg">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>স্মার্ট ‘ভাড়া খাতা’ গ্রিন হাউস সমাধান</span>
              </div>

              <h4 className="text-xl font-black text-slate-900">
                সম্পূর্ণ চাপমুক্ত জীবন ও ১ ক্লিকে সব ফ্ল্যাটের নিয়ন্ত্রণ
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-700">
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
      <section id="bento" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              প্রিমিয়াম বেন্টো ফিচার গ্রিড
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              একটি মাত্র অ্যাপে আপনার বাড়ির প্রতিটি সমাধান
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              প্রতিটি টুল তৈরি করা হয়েছে বাংলাদেশের বাড়িওয়ালাদের বাস্তব অভিজ্ঞতার ওপর ভিত্তি করে।
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento 1: Large Featured Card (2 Columns Span) */}
            <div className="md:col-span-2 rounded-3xl p-7 sm:p-9 bg-white border border-emerald-200/90 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md space-y-6 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6 text-amber-700" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
                  বিদ্যুৎ বিল সমস্যা সমাধান
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  সাব-মিটার রিডিং ও অটো বিদ্যুৎ বিল ইঞ্জিন
                </h4>
                <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                  মিটার রিডিং তোলার ঝামেলা শেষ। শুধু চলতি মাসের রিডিং লিখে দিলে সফটওয়্যার স্বয়ংক্রিয়ভাবে আগের রিডিং থেকে বিয়োগ করে সঠিক ইউনিট হিসাব করে এবং প্রতি ইউনিটের রেট অনুযায়ী মোট টাকা মাসিক বিলে যোগ করে দেয়।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">পূর্বের রিডিং:</span>
                  <span className="text-slate-900 font-bold">১২০</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">বর্তমান রিডিং:</span>
                  <span className="text-emerald-700 font-bold">২৫০</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">ব্যবহৃত:</span>
                  <span className="text-amber-700 font-bold">১৩০ ইউনিট</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">রেট:</span>
                  <span className="text-slate-900 font-bold">৳ ১০/ইউনিট</span>
                </div>
                <div className="text-emerald-800 font-bold text-sm">
                  = ৳ ১,৩০০
                </div>
              </div>
            </div>

            {/* Bento 2: Automated Reminders */}
            <div className="rounded-3xl p-7 bg-white border border-emerald-200/90 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <MessageCircle className="w-6 h-6 text-teal-700" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                স্বয়ংক্রিয় এসএমএস ও হোয়াটসঅ্যাপ
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                মুখে ভাড়া চাওয়ার কোনো অস্বস্তি নেই। ১ থেকে ৫ তারিখের মধ্যে শুধুমাত্র বকেয়া থাকা ভাড়াটিয়াদের স্বয়ংক্রিয় সম্মানজনক তাগাদা চলে যায়।
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  পরিশোধিত কাউকে ডিস্টার্ব করবে না
                </span>
              </div>
            </div>

            {/* Bento 3: Digital Money Receipt */}
            <div className="rounded-3xl p-7 bg-white border border-emerald-200/90 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Receipt className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                ডিজিটাল মানি রিসিট (PDF)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                টাকা গ্রহণ করার সাথে সাথেই কিউআর কোড ও রশিদ নম্বরসহ প্রফেশনাল মানি রিসিট তৈরি হয়। সরাসরি হোয়াটসঅ্যাপে পাঠানো বা প্রিন্ট নেওয়া যায়।
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <Printer className="w-4 h-4 text-emerald-600" />
                  প্রিন্ট ও আজীবন ক্লাউড সংরক্ষণ
                </span>
              </div>
            </div>

            {/* Bento 4: Police Verification Form (2 Columns Span) */}
            <div className="md:col-span-2 rounded-3xl p-7 sm:p-9 bg-white border border-emerald-200/90 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-indigo-700" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800">
                  আইনি নিরাপত্তা ও ডিএমপি
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  বাংলাদেশ পুলিশ ভাড়াটিয়া তথ্য ফরম (স্বয়ংক্রিয় প্রিন্ট)
                </h4>
                <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                  নতুন ভাড়াটিয়া তোলার পর আলাদা করে পুলিশের ফর্ম কিনে হাতে লেখার দিন শেষ। সফটওয়্যার থেকে ১ ক্লিকে ১ কপি পাসপোর্ট সাইজ ছবি ও জাতীয় পরিচয়পত্রের ঘর সহ সরকারি ফরম্যাটে প্রস্তুত হয়ে যায়।
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ঢাকা মেট্রোপলিটন পুলিশ ফরম্যাট</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>জরুরি যোগাযোগ ও এনআইডি রেকর্ড</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Section: Interactive ROI Calculator */}
      <section id="calculator" className="py-20 bg-emerald-50/50 border-y border-emerald-200/80 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              সঞ্চয় ও লাভ ক্যালকুলেটর
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              আপনার কত সময় ও টাকা বাঁচবে?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              নিচের স্লাইডারটি টেনে আপনার বাড়ির ফ্ল্যাট সংখ্যা সিলেক্ট করে ফলাফল দেখুন।
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-10 shadow-lg space-y-8">
            
            {/* Slider Control */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                  <span>আপনার ভবনে মোট ফ্ল্যাট / ইউনিট সংখ্যা:</span>
                </label>
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 bg-emerald-100/70 px-4 py-1.5 rounded-xl border border-emerald-200">
                  {flatCount} টি
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="50"
                value={flatCount}
                onChange={(e) => setFlatCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>১ টি ফ্ল্যাট</span>
                <span>২৫ টি</span>
                <span>৫০ টি ফ্ল্যাট</span>
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center">
                <span className="text-xs text-slate-600 font-semibold block">মাসে বেঁচে যাওয়া সময়</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 block mt-2">
                  {hoursSaved} ঘণ্টা
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">হিসাব ও বারবার তাগাদা দেওয়ার সময়</span>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100 text-center">
                <span className="text-xs text-slate-600 font-semibold block">ফোনকলের মানসিক চাপ মুক্তি</span>
                <span className="text-2xl sm:text-3xl font-black text-teal-800 block mt-2">
                  {phoneHassleSaved} টি কল
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">অটো-মেসেজে ভাড়া পরিশোধ নিশ্চিত</span>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 text-center">
                <span className="text-xs text-slate-600 font-semibold block">বকেয়া ঝুঁকি হ্রাস</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-800 block mt-2">
                  ০% বকেয়া
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">১-১০ তারিখের ভেতরেই ভাড়া আদায়</span>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-800/20 transition-all"
              >
                <span>আপনার {flatCount}টি ফ্ল্যাটের জন্য ফ্রি শুরু করুন →</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Section: Pricing Matrix */}
      <section id="pricing" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              স্বচ্ছ ও সাশ্রয়ী প্যাকেজ
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              ছোট বা বড়—যেকোনো বাড়ির জন্য সেরা প্ল্যান
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              কোনো লুকানো চার্জ নেই। ৩টি ফ্ল্যাট পর্যন্ত আজীবন বিনামূল্যে ব্যবহার করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Free Tier */}
            <div className="rounded-3xl p-8 bg-gradient-to-b from-white to-emerald-50/70 border-2 border-emerald-600 shadow-xl shadow-emerald-700/10 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-800 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                শুরু করার জন্য
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  ছোট বাড়ির জন্য
                </div>
                <h4 className="text-2xl font-black text-slate-900">ফ্রি ট্রায়াল</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">৳ ০</span>
                  <span className="text-xs text-slate-500">/আজীবন ফ্রি</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  যাদের ৩টি পর্যন্ত ফ্ল্যাট রয়েছে এবং সম্পূর্ণ নিশ্চিন্তে ডিজিটাল খাতা শুরু করতে চান।
                </p>

                <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-emerald-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>সর্বোচ্চ ৩টি ফ্ল্যাট</strong> পরিচালনা</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>ডিজিটাল মানি রিসিট তৈরি</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>সাব-মিটার ক্যালকুলেটর</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>ডিএমপি পুলিশ ফরম ডাউনলোড</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center text-sm block transition-all shadow-md shadow-emerald-800/25"
              >
                ফ্রিতে শুরু করুন →
              </Link>
            </div>

            {/* Popular Tier (Pro) */}
            <div className="rounded-3xl p-8 bg-gradient-to-b from-white to-emerald-50/70 border-2 border-emerald-600 shadow-xl shadow-emerald-700/10 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-600 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                সবচেয়ে জনপ্রিয়
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  মাঝারি বাড়ির জন্য
                </div>
                <h4 className="text-2xl font-black text-slate-900">প্রো বাড়িওয়ালা</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-emerald-700">৳ ৩৯৯</span>
                  <span className="text-xs text-slate-500">/প্রতি মাস</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  ৪ থেকে ১০টি ফ্ল্যাট থাকা বাড়িওয়ালাদের জন্য নিখুঁত স্বয়ংক্রিয় সমাধান।
                </p>

                <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-emerald-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>১০টি ফ্ল্যাট</strong> পর্যন্ত সম্পূর্ণ নিয়ন্ত্রণ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>স্বয়ংক্রিয় ১-৫ তারিখ এসএমএস রিমাইন্ডার</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>হোয়াটসঅ্যাপে ১-ক্লিক ভাড়ার রশিদ প্রেরণ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>বকেয়া ট্র্যাকিং ও অডিট স্টেটমেন্ট</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>প্রাধান্যভিত্তিক ফোন সাপোর্ট</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center text-sm block transition-all shadow-md shadow-emerald-800/25"
              >
                প্রো প্ল্যান শুরু করুন →
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="rounded-3xl p-8 bg-gradient-to-b from-white to-emerald-50/70 border-2 border-emerald-600 shadow-xl shadow-emerald-700/10 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-teal-800 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                বড় ভবন ও সমিতি
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  কমপ্লেক্স ও সমিতির জন্য
                </div>
                <h4 className="text-2xl font-black text-slate-900">এপার্টমেন্ট সমিতি</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">৳ ৯৯৯</span>
                  <span className="text-xs text-slate-500">/প্রতি মাস</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  ১১ থেকে ৩০+ ফ্ল্যাট এবং অ্যাপার্টমেন্ট কমিটির সম্পূর্ণ ফিনান্সিয়াল ম্যানেজমেন্ট।
                </p>

                <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-emerald-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>আনলিমিটেড ফ্ল্যাট</strong> ও একাধিক বিল্ডিং</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>কমিটি ও ম্যানেজারের আলাদা রোল ও পারমিশন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>মাসিক অডিট ও ব্যাংক স্টেটমেন্ট রিপোর্ট</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center text-sm block transition-all shadow-md shadow-emerald-800/25"
              >
                সমিতি প্ল্যান নিন →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Section: FAQ Accordion */}
      <section id="faq" className="py-20 bg-emerald-50/40 border-t border-emerald-100 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
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
                  className="rounded-2xl bg-white border border-emerald-100/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-emerald-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. Final High-Impact CTA Banner */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug tracking-tight">
                বাড়িভাড়া ব্যবস্থাপনাকে ডিজিটাল ও সহজ করুন
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                আর কোনো জটিল খাতার হিসাব বা বিল নিয়ে ভুল বোঝাবুঝি নয়। মাত্র ২ মিনিটে আপনার ভবনের ফ্ল্যাটগুলো যোগ করে নিশ্চিন্ত থাকুন।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base bg-white text-emerald-900 hover:bg-emerald-50 shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>ফ্রি অ্যাকাউন্ট তৈরি করুন</span>
                <ArrowRight className="w-4 h-4" />
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
      <footer className="bg-white border-t border-slate-200 py-12 relative z-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              ভ
            </div>
            <span className="font-bold text-slate-800 text-sm">ভাড়া খাতা</span>
            <span>• বাড়িওয়ালাদের স্মার্ট রেন্ট ম্যানেজমেন্ট (গ্রিন হাউস থিম)</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-emerald-700 transition-colors">
              লগইন
            </Link>
            <Link href="/dashboard" className="hover:text-emerald-700 transition-colors">
              ড্যাশবোর্ড
            </Link>
            <Link href="/to-let" className="hover:text-emerald-700 transition-colors">
              টু-লেট লিস্টিং
            </Link>
            <a href="#faq" className="hover:text-emerald-700 transition-colors">
              হেল্প সেন্টার
            </a>
          </div>

          <div>
            © 2026 ভাড়া খাতা। সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>

    </div>
  );
}
