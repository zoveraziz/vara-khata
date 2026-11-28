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
import BrandLogo from '@/components/BrandLogo';

export default function HomePage() {
  const { content: siteContent } = useSiteContent();
  // 1. Mobile Menu Dropdown State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Interactive States for Live In-Hero Previews (Dashboard & WhatsApp Receipt)
  const [heroView, setHeroView] = useState<'dashboard' | 'whatsapp'>('dashboard');

  // 3. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 4. Language Translation State
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  const toggleLanguage = () => {
    const nextLang = lang === 'bn' ? 'en' : 'bn';
    setLang(nextLang);
    if (typeof window !== 'undefined') {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = nextLang;
        select.dispatchEvent(new Event('change'));
      } else {
        document.cookie = `googtrans=/bn/${nextLang}; path=/;`;
        window.location.reload();
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased overflow-x-clip">
      
      {/* 1. Header (Clean White, Subtle Slate Border, Mobile Responsive Dropdown) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Logo on the Left */}
          <Link href="/" className="flex items-center group shrink-0">
            <BrandLogo size="md" showSubtitle={true} lang={lang} />
          </Link>

          {/* Desktop Right-Aligned Tabs Group */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-2.5 ml-auto">
            {/* Tab 1: সুবিধাসমূহ */}
            <Link
              href="#features"
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center shadow-2xs hover:border-slate-400"
            >
              সুবিধাসমূহ
            </Link>

            {/* Tab 2: প্যাকেজ */}
            <Link
              href="#pricing"
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center shadow-2xs hover:border-slate-400"
            >
              প্যাকেজ
            </Link>

            {/* Tab 3: প্রশ্নোত্তর */}
            <Link
              href="#faq"
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center shadow-2xs hover:border-slate-400"
            >
              প্রশ্নোত্তর
            </Link>

            {/* Tab 4: Language Switcher Tab */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center gap-1.5 shadow-2xs hover:border-slate-400 cursor-pointer"
              title="ভাষা পরিবর্তন / Translate (বাংলা / English)"
            >
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'bn' ? 'বাং | EN' : 'EN | বাং'}</span>
            </button>

            {/* Tab 5: Login Button */}
            <Link
              href="/login"
              className="px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-sm flex items-center gap-1.5 group ml-1"
            >
              <span>লগইন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Medium Screens (md) & Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-sm flex items-center gap-1"
            >
              <span>লগইন</span>
            </Link>

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
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-4 space-y-2.5 shadow-xl animate-in slide-in-from-top-2 duration-150">
            {/* Tab 1: সুবিধাসমূহ */}
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center justify-center shadow-2xs hover:border-slate-400"
            >
              সুবিধাসমূহ
            </Link>

            {/* Tab 2: প্যাকেজ */}
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center justify-center shadow-2xs hover:border-slate-400"
            >
              প্যাকেজ
            </Link>

            {/* Tab 3: প্রশ্নোত্তর */}
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center justify-center shadow-2xs hover:border-slate-400"
            >
              প্রশ্নোত্তর
            </Link>

            {/* Tab 4: Language Switcher Tab (Exact same wording as desktop: বাং | EN) */}
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center justify-center gap-1.5 shadow-2xs hover:border-slate-400 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'bn' ? 'বাং | EN' : 'EN | বাং'}</span>
            </button>

            {/* Tab 5: Login Button */}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-sm flex items-center justify-center gap-1.5 group"
            >
              <span>লগইন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Eye-friendly, Calm & High Contrast Text) */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-28 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Split Grid: Left Content (7 cols), Right Visual (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
            
            {/* Left Column: Headlines, Trust Marks & Action Buttons */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>{siteContent.hero.trustPill}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.24] text-slate-900">
                {siteContent.hero.titleLine1}{' '}
                <span className="text-emerald-800 block sm:inline">
                  {siteContent.hero.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium">
                {siteContent.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{siteContent.hero.primaryCta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-emerald-950 bg-emerald-50/90 hover:bg-emerald-100/90 border-2 border-emerald-600/80 shadow-xs hover:border-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  <span>{siteContent.hero.secondaryCta}</span>
                </Link>
              </div>

              {/* Micro Trust Checklist below CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-5 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>কোনো ক্রেডিট কার্ড লাগে না</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>৩টি ইউনিট সম্পূর্ণ ফ্রি</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>১ মিনিটে রেডি</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Visual Card (Building, Smart Landlord & Collection Badges) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-gradient-to-br from-emerald-50/60 via-white to-slate-50 p-2 sm:p-2.5 group">
                <div className="relative rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                  <img
                    src="/hero-landlord-building.png"
                    alt="ভাড়া খাতা - আধুনিক প্রপার্টি ম্যানেজমেন্ট ও স্মার্ট বাড়িওয়ালা"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    width={624}
                    height={610}
                  />
                  {/* Subtle live badge overlay in bottom-left corner */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-800">লাইভ প্রপার্টি কালেকশন</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 3. Centerpiece Interactive Showcase */}
          <div className="mt-8 max-w-5xl mx-auto">
            
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
                  <span>{siteContent.hero.tabDashboard}</span>
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
                  <span>{siteContent.hero.tabWhatsapp}</span>
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
                        <span className="text-xs font-black text-slate-900">{siteContent.hero.tableTitle}</span>
                      </div>
                      <Link href="/dashboard" className="text-xs font-bold text-emerald-800 hover:underline">
                        {siteContent.hero.tableLink}
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

            </div>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-slate-200">
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
      <section className="py-24 bg-white border-y border-slate-200 relative z-10">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {siteContent.howItWorks.steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl p-6 bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all group flex flex-col justify-between space-y-4 overflow-hidden"
              >
                {/* Top Subtle Emerald Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Step Number on the Left of Title in the same line */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs flex items-center justify-center font-black text-sm shrink-0 group-hover:bg-emerald-800 group-hover:text-white group-hover:border-emerald-800 transition-all">
                      {step.stepNumber}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{step.featureBadge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section: Before vs After (দুইটি বক্স: বামে ও ডানে) */}
      <section id="features" className="py-20 sm:py-24 bg-[#f8fafc] border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              {siteContent.comparison.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {siteContent.comparison.title}
            </h2>
          </div>

          {/* 4 Problem-Solution Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {siteContent.comparison.cards && siteContent.comparison.cards.length > 0 ? (
              siteContent.comparison.cards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-3.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-black text-slate-400">
                      বিষয় ০{i + 1} • {card.topic}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                      {card.tag}
                    </span>
                  </div>

                  {/* Problem (Red) */}
                  <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-3.5 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-2xs">
                      ✕
                    </span>
                    <div className="leading-tight">
                      <h4 className="text-sm font-black text-rose-950">
                        {card.problemTitle}
                      </h4>
                      <p className="text-xs font-semibold text-rose-800/90 mt-1">
                        {card.problemDesc}
                      </p>
                    </div>
                  </div>

                  {/* Solution (Green) */}
                  <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-3.5 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-2xs">
                      ✓
                    </span>
                    <div className="leading-tight">
                      <h4 className="text-sm font-black text-emerald-950">
                        {card.solutionTitle}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-800 mt-1">
                        {card.solutionDesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
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

      {/* 6. Section: Pricing Matrix */}
      <section id="pricing" className="py-24 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Badge and Centered Value Banner */}
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              {siteContent.pricing.badge}
            </div>

            {/* Motivational Value Box (Centered, Single-line Title & Clean Subtitle) */}
            {siteContent.pricing.valueBanner && (
              <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 border border-emerald-200 p-6 sm:p-7 shadow-2xs space-y-2 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-800 text-white text-lg shadow-sm mx-auto mb-1">
                  ☕
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  {siteContent.pricing.valueBanner.headline}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  {siteContent.pricing.valueBanner.subline}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
            {siteContent.pricing.plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 relative transition-all ${
                  plan.isPopular
                    ? 'bg-white border-2 border-emerald-600 shadow-lg ring-4 ring-emerald-100/70 lg:-translate-y-2.5 z-10'
                    : 'bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md'
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
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
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
                  className={`w-full py-3.5 rounded-xl font-bold text-center text-sm block transition-all ${
                    plan.isPopular
                      ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm hover:shadow-md font-black'
                      : 'bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-slate-300 hover:border-emerald-700 shadow-2xs'
                  }`}
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
      <section className="py-12 sm:py-16 relative z-10 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl py-7 sm:py-9 px-6 sm:px-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-center space-y-4 sm:space-y-5 shadow-xl border border-emerald-700/60 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
              {siteContent.finalCta.title ? (
                <>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug tracking-tight drop-shadow-2xs mb-2">
                    {siteContent.finalCta.title}
                  </h2>
                  <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
                    {siteContent.finalCta.subtitle}
                  </p>
                </>
              ) : (
                <p className="text-white text-base sm:text-lg lg:text-xl font-bold leading-relaxed">
                  {siteContent.finalCta.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1 relative z-10">
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
          <Link href="/" className="flex items-center group">
            <BrandLogo size="sm" showSubtitle={true} lang={lang} />
          </Link>

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
