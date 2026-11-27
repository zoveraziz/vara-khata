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
  Mail,
  Globe,
} from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

export default function HomePage() {
  const { content: siteContent } = useSiteContent();
  // 1. Mobile Menu Dropdown State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Interactive States for Live In-Hero Previews (Dashboard & WhatsApp Receipt)
  const [heroView, setHeroView] = useState<'dashboard' | 'whatsapp'>('dashboard');

  // 3. Interactive ROI Calculator States
  const [flatCount, setFlatCount] = useState<number>(12);

  // 4. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Derived Calculations
  const hoursSaved = Math.max(4, Math.round(flatCount * 0.8));
  const phoneHassleSaved = Math.max(6, Math.round(flatCount * 1.5));

  // Helper to convert English digits to Bengali digits
  const toBengaliNum = (num: number | string): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased overflow-x-hidden">
      
      {/* 1. Header (Clean White, Subtle Slate Border, Mobile Responsive Dropdown) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-2xl shadow-sm group-hover:scale-105 transition-transform shrink-0">
              {siteContent.brand.letter}
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                {siteContent.brand.name}
              </span>
              <span className="text-[11px] font-bold text-emerald-800 tracking-wider block mt-0.5">
                {siteContent.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {(siteContent.header.navLinks || []).map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/dashboard"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center gap-1.5 shadow-2xs hover:border-slate-400"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>{siteContent.header.demoButton}</span>
            </Link>

            <Link
              href="/login"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-sm flex items-center gap-1.5 group"
            >
              <span>{siteContent.header.loginButton}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label={siteContent.header.mobileMenuAria}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-1 pb-2 border-b border-slate-100">
              {(siteContent.header.navLinks || []).map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>{siteContent.header.demoButton}</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{siteContent.header.loginButton}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Modern Split 2-Column Layout like rentcollector.xyz) */}
      <section id="hero" className="relative pt-8 pb-14 lg:pt-16 lg:pb-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: Smart, punchy value proposition, CTAs & social proof */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5 text-left">
              
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-900 text-xs sm:text-sm font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{siteContent.hero.trustPill}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3rem] font-black tracking-tight leading-[1.22] sm:leading-[1.18] text-slate-900">
                {siteContent.hero.titleLine1}{' '}
                <span className="text-emerald-800 block sm:inline lg:block xl:inline">
                  {siteContent.hero.titleHighlight}
                </span>
              </h1>

              {/* Smart Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-medium max-w-xl">
                {siteContent.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/register"
                  className="px-6 sm:px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{siteContent.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/dashboard"
                  className="px-5 sm:px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 hover:border-slate-400"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>{siteContent.hero.secondaryCta}</span>
                </Link>
              </div>

              {/* Key Benefits Checklist & Social Proof */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    ৩টি ফ্ল্যাট আজীবন ফ্রি
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    কোনো ক্রেডিট কার্ড লাগে না
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    মাত্র ২ মিনিটে রেডি
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-bold bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-amber-600 font-black">★★★★★ ৪.৯</span>
                  <span className="text-slate-400">•</span>
                  <span>৩,৫০০+ বাড়িওয়ালার নির্ভরতা</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Live Mockup Card (Dashboard & WhatsApp) */}
            <div className="lg:col-span-6 xl:col-span-6 w-full">
              <div className="relative rounded-3xl bg-white border border-slate-200 shadow-md p-4 sm:p-5 overflow-hidden">
                
                {/* Card Top Bar with macOS dots and view toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                    </div>
                    <div className="h-3.5 w-px bg-slate-200 mx-1"></div>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                      </span>
                      <span className="text-xs font-black text-slate-800">
                        {heroView === 'dashboard' ? 'লাইভ খতিয়ান (জুন ২০২৬)' : 'হোয়াটসঅ্যাপ রসিদ'}
                      </span>
                    </div>
                  </div>

                  {/* Segmented View Switcher */}
                  <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200 flex items-center gap-1 text-xs">
                    <button
                      onClick={() => setHeroView('dashboard')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                        heroView === 'dashboard'
                          ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{siteContent.hero.tabDashboard}</span>
                    </button>
                    <button
                      onClick={() => setHeroView('whatsapp')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                        heroView === 'whatsapp'
                          ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{siteContent.hero.tabWhatsapp}</span>
                    </button>
                  </div>
                </div>

                {/* VIEW 1: Landlord Dashboard Preview */}
                {heroView === 'dashboard' && (
                  <div className="space-y-4 pt-3 animate-in fade-in duration-200">
                    {/* Top KPI metric tiles (3 columns) */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] text-slate-600 block font-bold">চলতি আদায়</span>
                        <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5 whitespace-nowrap">৳ ১,৮৫,৪০০</span>
                        <span className="text-[10px] text-emerald-800 font-bold mt-0.5 inline-block whitespace-nowrap">↑ ৯৪% সম্পন্ন</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] text-slate-600 block font-bold">মোট বকেয়া</span>
                        <span className="text-base sm:text-lg font-black text-rose-700 block mt-0.5 whitespace-nowrap">৳ ১২,৫০০</span>
                        <span className="text-[10px] text-rose-700 font-bold mt-0.5 inline-block whitespace-nowrap">১টি ফ্ল্যাট বাকি</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] text-slate-600 block font-bold">ফ্ল্যাট ও ইউনিট</span>
                        <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5 whitespace-nowrap">১২টি</span>
                        <span className="text-[10px] text-slate-600 font-bold mt-0.5 inline-block whitespace-nowrap">১০০% ভাড়াটিয়া</span>
                      </div>
                    </div>

                    {/* Unit Status Rows */}
                    <div className="space-y-2 pt-1">
                      {/* Flat 1A */}
                      <div className="p-2.5 rounded-xl bg-slate-50/90 hover:bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-black text-[11px] flex items-center justify-center shrink-0">
                            1A
                          </span>
                          <div>
                            <div className="font-bold text-slate-900">ফ্ল্যাট ১-এ • মোঃ রফিকুল ইসলাম</div>
                            <div className="text-[10px] text-slate-600">মূল ভাড়া ৳ ১৮,০০০ + বিদ্যুৎ ৳ ১,২০০</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            পরিশোধিত (ক্যাশ)
                          </span>
                        </div>
                      </div>

                      {/* Flat 2B */}
                      <div className="p-2.5 rounded-xl bg-slate-50/90 hover:bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-pink-50 text-pink-800 border border-pink-200 font-black text-[11px] flex items-center justify-center shrink-0">
                            2B
                          </span>
                          <div>
                            <div className="font-bold text-slate-900">ফ্ল্যাট ২-বি • তানভীর আহমেদ</div>
                            <div className="text-[10px] text-slate-600">মূল ভাড়া ৳ ১৬,০০০ + বিদ্যুৎ ৳ ১,৩৫০</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            পরিশোধিত (বিকাশ)
                          </span>
                        </div>
                      </div>

                      {/* Flat 3C */}
                      <div className="p-2.5 rounded-xl bg-slate-50/90 hover:bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-black text-[11px] flex items-center justify-center shrink-0">
                            3C
                          </span>
                          <div>
                            <div className="font-bold text-slate-900">ফ্ল্যাট ৩-সি • ইঞ্জি. কবির হোসেন</div>
                            <div className="text-[10px] text-rose-700 font-bold">বকেয়া ৳ ২৩,৭৮০ (বিলসহ)</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 font-bold text-[11px] border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                            বকেয়া (এসএমএস প্রেরিত)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Live Toast Pill */}
                    <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200/80 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="font-bold text-emerald-900 text-[11px] sm:text-xs">
                          বিকাশ থেকে ৳ ১৬,০০০ আদায় সফল • স্বয়ংক্রিয় রসিদ প্রস্তুত
                        </span>
                      </div>
                      <Link href="/dashboard" className="font-black text-emerald-800 hover:underline text-[11px] shrink-0">
                        {siteContent.hero.tableLink}
                      </Link>
                    </div>
                  </div>
                )}

                {/* VIEW 2: Tenant WhatsApp Bill & Receipt */}
                {heroView === 'whatsapp' && (
                  <div className="pt-3 animate-in fade-in duration-200 space-y-3">
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 sm:p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-white text-[11px]">
                            VK
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900">ভাড়া খাতা অটো-হোয়াটসঅ্যাপ</div>
                            <div className="text-[10px] text-emerald-800 font-bold">অনলাইন • ভেরিফাইড মেসেজ</div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">আজ সকাল ৯:৩০</span>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 text-xs text-slate-800 leading-relaxed">
                        <p className="font-bold text-slate-900">
                          আসসালামু আলাইকুম মোঃ আব্দুল আজিজ ভাই,
                        </p>
                        <p className="text-slate-700 text-[11px]">
                          আপনার <strong className="text-slate-900">ফ্ল্যাট ১-এ</strong> এর <strong className="text-slate-900">জুন ২০২৬</strong> মাসের ভাড়ার বিবরণী প্রস্তুত হয়েছে:
                        </p>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-600">মূল বাড়িভাড়া:</span>
                            <span className="font-bold text-slate-900">৳ ১৮,০০০</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">সাব-মিটার বিদ্যুৎ (১২০ ইউনিট):</span>
                            <span className="font-bold text-emerald-800">৳ ১,২০০</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">গ্যাস ও সার্ভিস চার্জ:</span>
                            <span className="font-bold text-slate-900">৳ ২,৫৮০</span>
                          </div>
                          <div className="border-t border-slate-200 pt-1 flex justify-between font-bold text-xs">
                            <span className="text-slate-900">সর্বমোট প্রদেয়:</span>
                            <span className="text-emerald-800">৳ ২১,৭৮০</span>
                          </div>
                        </div>
                        <div className="pt-0.5">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-[11px]">
                            🔗 varakhata-bd.vercel.app/receipt/001
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Social Proof Stats Bar (Positioned cleanly under the split hero) */}
          <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
            {siteContent.stats.map((stat, idx) => (
              <div key={idx} className="text-center p-3">
                <span
                  className={`text-xl sm:text-2xl lg:text-3xl font-black block whitespace-nowrap ${
                    stat.highlight === 'emerald'
                      ? 'text-emerald-800'
                      : stat.highlight === 'amber'
                      ? 'text-amber-700'
                      : 'text-slate-900'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-700 font-bold mt-1 block">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3.5 Section: How it Works (মাত্র ৩টি ধাপে শুরু করুন) */}
      <section id="how" className="py-24 bg-white border-y border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{siteContent.howItWorks.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {siteContent.howItWorks.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              {siteContent.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {siteContent.howItWorks.steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl p-7 sm:p-8 bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all group flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs text-emerald-800 flex items-center justify-center font-black text-xl group-hover:bg-emerald-800 group-hover:text-white transition-all">
                      {step.stepNumber}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-900 transition-colors">
                      {step.stepLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{step.featureBadge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section: Before vs After Interactive Story */}
      <section id="benefits" className="py-20 bg-[#f8fafc] border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              {siteContent.comparison.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {siteContent.comparison.title}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {siteContent.comparison.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* The Old Painful Way (হালকা লাল কার্ড) */}
            <div className="rounded-3xl p-6 sm:p-8 bg-rose-50/50 border border-rose-200/80 relative overflow-hidden space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>{siteContent.comparison.oldWay.badge}</span>
              </div>

              <h4 className="text-xl font-black text-slate-900">
                {siteContent.comparison.oldWay.title}
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-800 font-medium">
                {siteContent.comparison.oldWay.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <span><strong>{pt.bold}</strong>{pt.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The New Vara Khata Way (সবুজ ও সাদা পরিপাটি কার্ড) */}
            <div className="rounded-3xl p-6 sm:p-8 bg-emerald-50/40 border border-emerald-300/80 relative overflow-hidden space-y-5 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{siteContent.comparison.newWay.badge}</span>
              </div>

              <h4 className="text-xl font-black text-slate-900">
                {siteContent.comparison.newWay.title}
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-800 font-medium">
                {siteContent.comparison.newWay.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>{pt.bold}</strong>{pt.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Section: Luxury Bento Grid Layout ("অল-ইন-ওয়ান সমাধান") */}
      <section id="features" className="py-24 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              {siteContent.features.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {siteContent.features.title}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {siteContent.features.subtitle}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento 1: Large Featured Card */}
            <div className="md:col-span-2 rounded-3xl p-7 sm:p-9 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-sm space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800">
                  {siteContent.features.meter.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  {siteContent.features.meter.title}
                </h4>
                <p className="text-sm text-slate-700 max-w-xl leading-relaxed font-medium">
                  {siteContent.features.meter.description}
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
                {siteContent.features.reminder.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {siteContent.features.reminder.description}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  {siteContent.features.reminder.tag}
                </span>
              </div>
            </div>

            {/* Bento 3: Digital Money Receipt */}
            <div className="rounded-3xl p-7 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-sm space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                <Receipt className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                {siteContent.features.receipt.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {siteContent.features.receipt.description}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Printer className="w-4 h-4 text-emerald-700" />
                  {siteContent.features.receipt.tag}
                </span>
              </div>
            </div>

            {/* Bento 4: Police Verification Form */}
            <div className="md:col-span-2 rounded-3xl p-7 sm:p-9 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800">
                  {siteContent.features.police.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  {siteContent.features.police.title}
                </h4>
                <p className="text-sm text-slate-700 max-w-xl leading-relaxed font-medium">
                  {siteContent.features.police.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{siteContent.features.police.point1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{siteContent.features.police.point2}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.5 Section: NRB Landlords (প্রবাসী বাড়িওয়ালাদের বিশেষ সুবিধা - সবুজ থিম ও প্রশস্ত বক্স) */}
      {siteContent.nrb && (
        <section className="py-6 sm:py-8 bg-[#f8fafc] relative z-10 border-t border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl py-5 sm:py-6 px-6 sm:px-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white shadow-md border border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none"></div>

              <div className="space-y-1.5 text-center sm:text-left relative z-10 max-w-2xl lg:max-w-3xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-700/50 text-emerald-200 text-[11px] font-bold border border-emerald-500/40">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{siteContent.nrb.badge}</span>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight">
                  {siteContent.nrb.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                  {siteContent.nrb.subtitle}
                </p>
              </div>

              <div className="shrink-0 w-full sm:w-auto relative z-10 text-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-95"
                >
                  <span>{siteContent.nrb.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-800" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Section: Interactive ROI Calculator */}
      <section id="calculator" className="py-20 bg-[#f8fafc] border-y border-slate-200 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              {siteContent.calculator.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {siteContent.calculator.title}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {siteContent.calculator.subtitle}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Slider Control */}
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-3">
                <label className="text-xs sm:text-base font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2 leading-tight">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800 shrink-0" />
                  <span>{siteContent.calculator.label}</span>
                </label>
                <div className="shrink-0 flex items-center justify-center min-w-[72px] sm:min-w-[85px] px-3 sm:px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 whitespace-nowrap select-none">
                    {toBengaliNum(flatCount)}টি
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
                <span>{siteContent.calculator.minFlatLabel}</span>
                <span>{siteContent.calculator.midFlatLabel}</span>
                <span>{siteContent.calculator.maxFlatLabel}</span>
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
                <span className="text-xs text-slate-700 font-bold block">{siteContent.calculator.timeSavedLabel}</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-2 whitespace-nowrap">
                  {toBengaliNum(hoursSaved)} ঘণ্টা
                </span>
                <span className="text-[11px] text-slate-600 font-medium mt-1 block">{siteContent.calculator.timeSavedSub}</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
                <span className="text-xs text-slate-700 font-bold block">{siteContent.calculator.hassleSavedLabel}</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-2 whitespace-nowrap">
                  {toBengaliNum(phoneHassleSaved)}টি কল
                </span>
                <span className="text-[11px] text-slate-600 font-medium mt-1 block">{siteContent.calculator.hassleSavedSub}</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
                <span className="text-xs text-slate-700 font-bold block">{siteContent.calculator.dueRiskLabel}</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 block mt-2 whitespace-nowrap">
                  {siteContent.calculator.dueRiskValue}
                </span>
                <span className="text-[11px] text-slate-600 font-medium mt-1 block">{siteContent.calculator.dueRiskSub}</span>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-sm transition-all"
              >
                <span>{siteContent.calculator.ctaTemplate.replace('{count}', toBengaliNum(flatCount))}</span>
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
              {siteContent.pricing.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {siteContent.pricing.title}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {siteContent.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {siteContent.pricing.plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 relative transition-all ${
                  plan.isPopular
                    ? 'bg-white border-2 border-emerald-600 shadow-md ring-4 ring-emerald-50'
                    : 'bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-black text-[11px] uppercase tracking-wider shadow-sm ${
                    plan.isPopular ? 'bg-emerald-800' : 'bg-slate-800'
                  }`}
                >
                  {plan.badgeTop}
                </div>

                <div className="space-y-4">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      plan.isPopular
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                        : 'bg-white text-slate-800 border border-slate-200'
                    }`}
                  >
                    {plan.audience}
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">{plan.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-black ${
                        plan.isPopular ? 'text-emerald-800' : 'text-slate-900'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-600 font-bold">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed min-h-[36px] font-medium">
                    {plan.description}
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-800 font-medium pt-3 border-t border-slate-200">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/register"
                  className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-center text-sm block transition-all shadow-xs"
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section: FAQ Accordion */}
      <section id="faq" className="py-20 bg-[#f8fafc] border-t border-slate-200 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2.5 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              প্রশ্নোত্তর
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              সাধারণ জিজ্ঞাসা
            </h2>
          </div>

          <div className="space-y-3">
            {siteContent.faqs.map((faq, index) => {
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

      {/* 9. Final High-Impact CTA Banner */}
      <section className="py-16 sm:py-20 relative z-10 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-center space-y-6 shadow-xl border border-emerald-700/60 relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              {siteContent.finalCta.title ? (
                <>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug tracking-tight drop-shadow-2xs mb-3">
                    {siteContent.finalCta.title}
                  </h2>
                  <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
                    {siteContent.finalCta.subtitle}
                  </p>
                </>
              ) : (
                <p className="text-white text-base sm:text-xl font-bold leading-relaxed">
                  {siteContent.finalCta.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base bg-white text-emerald-950 hover:bg-emerald-50 shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>{siteContent.finalCta.primaryButton}</span>
                <ArrowRight className="w-4 h-4 text-emerald-800" />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base bg-emerald-900/60 hover:bg-emerald-900 text-white border border-emerald-400/40 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>{siteContent.finalCta.secondaryButton}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9.5 Section: Sleek Single-Line Contact Strip */}
      {siteContent.contact && (
        <section id="contact" className="py-4 bg-slate-50 border-t border-slate-200 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl px-4 sm:px-6 py-3.5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>যেকোনো প্রয়োজনে যোগাযোগ:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={`https://wa.me/${siteContent.contact.whatsappNumber || '8801721838990'}?text=${encodeURIComponent(siteContent.contact.whatsappMessage || 'হ্যালো, আমি ভাড়া খাতা সফটওয়্যার সম্পর্কে জানতে চাই')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#15803d] font-bold border border-[#25D366]/30 transition"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>হোয়াটসঅ্যাপ: {siteContent.contact.phone || '01721838990'}</span>
                </a>
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 transition"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>ইমেইল: {siteContent.contact.email}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 10. Footer (Clean White/Slate) */}
      <footer className="bg-white border-t border-slate-200 py-12 relative z-10 text-xs text-slate-600 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              {siteContent.brand.letter}
            </div>
            <span className="font-bold text-slate-900 text-sm">{siteContent.brand.name}</span>
            {siteContent.brand.subTagline ? (
              <span className="text-slate-600">• {siteContent.brand.subTagline}</span>
            ) : null}
          </div>

          <div className="flex items-center gap-6">
            {siteContent.footer.links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-emerald-800 transition-colors font-bold text-slate-700"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="text-slate-600">
            {siteContent.brand.copyright}
          </div>
        </div>
      </footer>

    </div>
  );
}
