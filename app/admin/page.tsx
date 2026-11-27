'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSiteContent, SiteContentType } from '@/context/SiteContentContext';
import {
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Building2,
  DollarSign,
  HelpCircle,
  Layers,
  ArrowRight,
  ShieldCheck,
  Plus,
  Trash2,
  AlertCircle,
  Sliders,
  FileText,
  LayoutTemplate,
} from 'lucide-react';

export default function AdminPage() {
  const { content, updateContent, resetContent, isCustomized, lastUpdated } = useSiteContent();

  // Local working copy of content for form edits
  const [formData, setFormData] = useState<SiteContentType>(content);
  const [activeTab, setActiveTab] = useState<
    'brand' | 'hero' | 'stats' | 'howItWorks' | 'comparison' | 'features' | 'calculator' | 'pricing' | 'faqs' | 'finalCta'
  >('hero');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Sync formData whenever context content updates externally
  React.useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    resetContent();
    setResetConfirmOpen(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const tabs = [
    { id: 'hero', label: '🚀 হিরো সেকশন', icon: Sparkles },
    { id: 'brand', label: '🏷️ ব্র্যান্ড ও হেডার', icon: Building2 },
    { id: 'stats', label: '📊 পরিসংখ্যান', icon: Sliders },
    { id: 'howItWorks', label: '📝 ৩টি ধাপ (অনবোর্ডিং)', icon: Layers },
    { id: 'comparison', label: '⚖️ খাতা বনাম সমাধান', icon: LayoutTemplate },
    { id: 'features', label: '💎 ফিচার গ্রিড', icon: FileText },
    { id: 'calculator', label: '🧮 ক্যালকুলেটর', icon: Sliders },
    { id: 'pricing', label: '💰 প্যাকেজ ও খরচ', icon: DollarSign },
    { id: 'faqs', label: '❓ সচরাচর প্রশ্ন (FAQ)', icon: HelpCircle },
    { id: 'finalCta', label: '📢 ব্যানার ও ফুটার', icon: ShieldCheck },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      
      {/* Top Admin Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-xs">
              ভ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl text-slate-900 leading-none">
                  ভাড়া খাতা অ্যাডমিন কন্ট্রোল
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  সরাসরি সিঙ্ক চালু
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isCustomized
                  ? `সর্বশেষ সংরক্ষিত: ${lastUpdated || 'কাস্টমাইজড'}`
                  : 'ডিফল্ট সিস্টেম কনটেন্ট সক্রিয়'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition"
              title="নতুন ট্যাবে লাইভ সাইট দেখুন"
            >
              <span>সাইট দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <button
              type="button"
              onClick={() => setResetConfirmOpen(true)}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition flex items-center gap-1.5"
              title="সব লেখা আদি ডিফল্ট অবস্থায় ফিরিয়ে আনুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ডিফল্ট রিসেট</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>পরিবর্তন সেভ করুন</span>
            </button>
          </div>

        </div>
      </header>

      {/* Success Notification Banner */}
      {savedSuccess && (
        <div className="bg-emerald-800 text-white py-3 px-4 text-center text-sm font-bold shadow-md animate-in fade-in slide-in-from-top duration-200">
          ✓ সমস্ত পরিবর্তন সফলভাবে সংরক্ষিত ও লাইভ ওয়েবসাইটে আপডেট হয়েছে!
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900">ডিফল্ট কন্টেন্টে ফিরে যেতে চান?</h3>
            </div>
            <p className="text-sm text-slate-600">
              আপনার করা সমস্ত কাস্টম পরিবর্তন মুছে গিয়ে প্রজেক্টের আদি ডিফল্ট লেখাগুলো পুনরায় সক্রিয় হবে। আপনি কি নিশ্চিত?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
              >
                হ্যাঁ, রিসেট করুন
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs Pill Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-200 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSave} className="mt-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* ============================================================== */}
          {/* TAB 1: HERO SECTION */}
          {/* ============================================================== */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">হিরো সেকশন কনটেন্ট</h2>
                <p className="text-xs text-slate-500 mt-1">ল্যান্ডিং পেজের একদম ওপরের প্রধান হেডলাইন, সাব-টাইটেল ও কল-টু-অ্যাকশন বাটন</p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    টপ ট্রাস্ট পিল (সবুজ আইকন সংবলিত ব্যাজ)
                  </label>
                  <input
                    type="text"
                    value={formData.hero.trustPill}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, trustPill: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-emerald-700 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      মূল টাইটেল (প্রথম লাইন)
                    </label>
                    <input
                      type="text"
                      value={formData.hero.titleLine1}
                      onChange={(e) =>
                        setFormData({ ...formData, hero: { ...formData.hero, titleLine1: e.target.value } })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-emerald-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-emerald-800 block mb-1">
                      টাইটেল হাইলাইট (সবুজ কালার টেক্সট)
                    </label>
                    <input
                      type="text"
                      value={formData.hero.titleHighlight}
                      onChange={(e) =>
                        setFormData({ ...formData, hero: { ...formData.hero, titleHighlight: e.target.value } })
                      }
                      className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl px-4 py-2.5 text-sm text-emerald-950 font-bold focus:border-emerald-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    সাব-টাইটেল / বিবরণ
                  </label>
                  <textarea
                    rows={3}
                    value={formData.hero.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, subtitle: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-emerald-700 focus:bg-white focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      প্রধান বাটন টেক্সট (সবুজ বোতাম)
                    </label>
                    <input
                      type="text"
                      value={formData.hero.primaryCta}
                      onChange={(e) =>
                        setFormData({ ...formData, hero: { ...formData.hero, primaryCta: e.target.value } })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-emerald-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      সেকেন্ডারি বাটন টেক্সট (সাদা বোতাম)
                    </label>
                    <input
                      type="text"
                      value={formData.hero.secondaryCta}
                      onChange={(e) =>
                        setFormData({ ...formData, hero: { ...formData.hero, secondaryCta: e.target.value } })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-emerald-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">হিরো ডেমো ৩টি ট্যাবের নাম:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">ট্যাব ১ (ড্যাশবোর্ড)</label>
                      <input
                        type="text"
                        value={formData.hero.tabDashboard}
                        onChange={(e) =>
                          setFormData({ ...formData, hero: { ...formData.hero, tabDashboard: e.target.value } })
                        }
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">ট্যাব ২ (হোয়াটসঅ্যাপ)</label>
                      <input
                        type="text"
                        value={formData.hero.tabWhatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, hero: { ...formData.hero, tabWhatsapp: e.target.value } })
                        }
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">ট্যাব ৩ (ক্যালকুলেটর)</label>
                      <input
                        type="text"
                        value={formData.hero.tabMeter}
                        onChange={(e) =>
                          setFormData({ ...formData, hero: { ...formData.hero, tabMeter: e.target.value } })
                        }
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: BRAND & HEADER */}
          {/* ============================================================== */}
          {activeTab === 'brand' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">ব্র্যান্ড ও হেডার মেনু সেটিংস</h2>
                <p className="text-xs text-slate-500 mt-1">অ্যাপের নাম, লোগোর অক্ষর, হেডারের ট্যাগলাইন ও বাটনসমূহ</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">প্ল্যাটফর্মের নাম</label>
                  <input
                    type="text"
                    value={formData.brand.name}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: { ...formData.brand, name: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">লোগো অক্ষর (একটি অক্ষর)</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.brand.letter}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: { ...formData.brand, letter: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-black text-emerald-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">হেডার সাব-ট্যাগলাইন</label>
                  <input
                    type="text"
                    value={formData.brand.tagline}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: { ...formData.brand, tagline: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">ফুটার ট্যাগলাইন</label>
                  <input
                    type="text"
                    value={formData.brand.subTagline}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: { ...formData.brand, subTagline: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">হেডার ডেমো বাটন</label>
                  <input
                    type="text"
                    value={formData.header.demoButton}
                    onChange={(e) =>
                      setFormData({ ...formData, header: { ...formData.header, demoButton: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">হেডার লগইন বাটন</label>
                  <input
                    type="text"
                    value={formData.header.loginButton}
                    onChange={(e) =>
                      setFormData({ ...formData, header: { ...formData.header, loginButton: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: STATS BAR */}
          {/* ============================================================== */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">সোশাল প্রুফ পরিসংখ্যান বার</h2>
                <p className="text-xs text-slate-500 mt-1">হিরো সেকশনের নিচে প্রদর্শিত ৪টি বাস্তব পরিসংখ্যান সংখ্যা ও ক্যাপশন</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-500">আইটেম #{idx + 1}</span>
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">সংখ্যা / মান</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...formData.stats];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          setFormData({ ...formData, stats: updated });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">ক্যাপশন / বিবরণ</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...formData.stats];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setFormData({ ...formData, stats: updated });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: 3-STEP ONBOARDING */}
          {/* ============================================================== */}
          {activeTab === 'howItWorks' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">মাত্র ৩টি ধাপে শুরু করুন (Onboarding)</h2>
                <p className="text-xs text-slate-500 mt-1">ল্যান্ডিং পেজের ৩টি আধুনিক অনবোর্ডিং কার্ডের লেখা</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">সেকশন ব্যাজ</label>
                  <input
                    type="text"
                    value={formData.howItWorks.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, howItWorks: { ...formData.howItWorks, badge: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">সেকশন টাইটেল</label>
                  <input
                    type="text"
                    value={formData.howItWorks.title}
                    onChange={(e) =>
                      setFormData({ ...formData, howItWorks: { ...formData.howItWorks, title: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">সেকশন সাব-টাইটেল</label>
                  <input
                    type="text"
                    value={formData.howItWorks.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, howItWorks: { ...formData.howItWorks, subtitle: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-slate-200">
                {formData.howItWorks.steps.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-xs font-black text-emerald-800 block uppercase tracking-wider">
                      ধাপ {idx + 1}
                    </span>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">ধাপের শিরোনাম</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...formData.howItWorks.steps];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({
                            ...formData,
                            howItWorks: { ...formData.howItWorks, steps: updated },
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">ধাপের বিবরণ</label>
                      <textarea
                        rows={3}
                        value={step.description}
                        onChange={(e) => {
                          const updated = [...formData.howItWorks.steps];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setFormData({
                            ...formData,
                            howItWorks: { ...formData.howItWorks, steps: updated },
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">টিকচিহ্ন ফিচার পয়েন্ট</label>
                      <input
                        type="text"
                        value={step.featureBadge}
                        onChange={(e) => {
                          const updated = [...formData.howItWorks.steps];
                          updated[idx] = { ...updated[idx], featureBadge: e.target.value };
                          setFormData({
                            ...formData,
                            howItWorks: { ...formData.howItWorks, steps: updated },
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: COMPARISON (OLD VS NEW) */}
          {/* ============================================================== */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">কাগজের খাতা বনাম ভাড়া খাতার তুলনা</h2>
                <p className="text-xs text-slate-500 mt-1">এনালগ খাতার ভোগান্তি বনাম আধুনিক সমাধান কার্ডের পয়েন্টগুলো</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">সেকশন টাইটেল</label>
                  <input
                    type="text"
                    value={formData.comparison.title}
                    onChange={(e) =>
                      setFormData({ ...formData, comparison: { ...formData.comparison, title: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">সেকশন সাব-টাইটেল</label>
                  <input
                    type="text"
                    value={formData.comparison.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, comparison: { ...formData.comparison, subtitle: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                
                {/* Old Way */}
                <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-4">
                  <span className="text-xs font-bold text-rose-700 block">আগের এনালগ খাতা কার্ড</span>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">কার্ড টাইটেল</label>
                    <input
                      type="text"
                      value={formData.comparison.oldWay.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          comparison: {
                            ...formData.comparison,
                            oldWay: { ...formData.comparison.oldWay, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-rose-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    {formData.comparison.oldWay.points.map((pt, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-rose-100 space-y-1.5">
                        <input
                          type="text"
                          value={pt.bold}
                          onChange={(e) => {
                            const updated = [...formData.comparison.oldWay.points];
                            updated[i] = { ...updated[i], bold: e.target.value };
                            setFormData({
                              ...formData,
                              comparison: {
                                ...formData.comparison,
                                oldWay: { ...formData.comparison.oldWay, points: updated },
                              },
                            });
                          }}
                          className="w-full font-bold text-xs text-rose-900 border-b border-rose-100 pb-1"
                          placeholder="বোল্ড পয়েন্ট..."
                        />
                        <textarea
                          rows={2}
                          value={pt.text}
                          onChange={(e) => {
                            const updated = [...formData.comparison.oldWay.points];
                            updated[i] = { ...updated[i], text: e.target.value };
                            setFormData({
                              ...formData,
                              comparison: {
                                ...formData.comparison,
                                oldWay: { ...formData.comparison.oldWay, points: updated },
                              },
                            });
                          }}
                          className="w-full text-xs text-slate-700 leading-relaxed"
                          placeholder="বিস্তারিত বিবরণ..."
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* New Way */}
                <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-300 space-y-4">
                  <span className="text-xs font-bold text-emerald-800 block">স্মার্ট ভাড়া খাতা সমাধান কার্ড</span>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">কার্ড টাইটেল</label>
                    <input
                      type="text"
                      value={formData.comparison.newWay.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          comparison: {
                            ...formData.comparison,
                            newWay: { ...formData.comparison.newWay, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    {formData.comparison.newWay.points.map((pt, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1.5">
                        <input
                          type="text"
                          value={pt.bold}
                          onChange={(e) => {
                            const updated = [...formData.comparison.newWay.points];
                            updated[i] = { ...updated[i], bold: e.target.value };
                            setFormData({
                              ...formData,
                              comparison: {
                                ...formData.comparison,
                                newWay: { ...formData.comparison.newWay, points: updated },
                              },
                            });
                          }}
                          className="w-full font-bold text-xs text-emerald-900 border-b border-emerald-100 pb-1"
                          placeholder="বোল্ড পয়েন্ট..."
                        />
                        <textarea
                          rows={2}
                          value={pt.text}
                          onChange={(e) => {
                            const updated = [...formData.comparison.newWay.points];
                            updated[i] = { ...updated[i], text: e.target.value };
                            setFormData({
                              ...formData,
                              comparison: {
                                ...formData.comparison,
                                newWay: { ...formData.comparison.newWay, points: updated },
                              },
                            });
                          }}
                          className="w-full text-xs text-slate-700 leading-relaxed"
                          placeholder="বিস্তারিত বিবরণ..."
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: FEATURES */}
          {/* ============================================================== */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">অল-ইন-ওয়ান ফিচারসমূহ</h2>
                <p className="text-xs text-slate-500 mt-1">সাব-মিটার, স্বয়ংক্রিয় রিমাইন্ডার, মানি রিসিট ও পুলিশ ফরম কার্ড</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-amber-700">⚡ সাব-মিটার ক্যালকুলেটর কার্ড</span>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">কার্ড টাইটেল</label>
                    <input
                      type="text"
                      value={formData.features.meter.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            meter: { ...formData.features.meter, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">বিবরণ</label>
                    <textarea
                      rows={3}
                      value={formData.features.meter.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            meter: { ...formData.features.meter, description: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs leading-relaxed"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-emerald-800">💬 এসএমএস ও হোয়াটসঅ্যাপ কার্ড</span>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">কার্ড টাইটেল</label>
                    <input
                      type="text"
                      value={formData.features.reminder.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            reminder: { ...formData.features.reminder, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">বিবরণ</label>
                    <textarea
                      rows={3}
                      value={formData.features.reminder.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            reminder: { ...formData.features.reminder, description: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs leading-relaxed"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-emerald-800">🧾 মানি রিসিট কার্ড</span>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">কার্ড টাইটেল</label>
                    <input
                      type="text"
                      value={formData.features.receipt.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            receipt: { ...formData.features.receipt, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">বিবরণ</label>
                    <textarea
                      rows={3}
                      value={formData.features.receipt.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            receipt: { ...formData.features.receipt, description: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs leading-relaxed"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-emerald-800">🛡️ পুলিশ ফরম কার্ড</span>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">কার্ড টাইটেল</label>
                    <input
                      type="text"
                      value={formData.features.police.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            police: { ...formData.features.police, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">বিবরণ</label>
                    <textarea
                      rows={3}
                      value={formData.features.police.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            police: { ...formData.features.police, description: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: CALCULATOR */}
          {/* ============================================================== */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">সেভিংস ও আরওআই ক্যালকুলেটর</h2>
                <p className="text-xs text-slate-500 mt-1">ফ্ল্যাট স্লাইডার ও আনুমানিক সময়/টাকা সাশ্রয়ের ক্যাপশন</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">ক্যালকুলেটর টাইটেল</label>
                  <input
                    type="text"
                    value={formData.calculator.title}
                    onChange={(e) =>
                      setFormData({ ...formData, calculator: { ...formData.calculator, title: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">স্লাইডার লেবেল</label>
                  <input
                    type="text"
                    value={formData.calculator.label}
                    onChange={(e) =>
                      setFormData({ ...formData, calculator: { ...formData.calculator, label: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">ফলাফল ১: সময় বাঁচার লেবেল</label>
                  <input
                    type="text"
                    value={formData.calculator.timeSavedLabel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        calculator: { ...formData.calculator, timeSavedLabel: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">ফলাফল ২: ফোনকল মুক্তির লেবেল</label>
                  <input
                    type="text"
                    value={formData.calculator.hassleSavedLabel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        calculator: { ...formData.calculator, hassleSavedLabel: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: PRICING */}
          {/* ============================================================== */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">প্যাকেজ ও প্রাইসিং সেটিংস</h2>
                <p className="text-xs text-slate-500 mt-1">৩টি প্যাকেজের নাম, মূল্য, মেয়াদ ও ফিচারের তালিকা পরিবর্তন করুন</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formData.pricing.plans.map((plan, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-3xl border space-y-4 ${
                      plan.isPopular
                        ? 'bg-emerald-50/30 border-emerald-400 ring-2 ring-emerald-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-700 block uppercase">
                      প্ল্যান #{idx + 1}: {plan.name}
                    </span>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">প্যাকেজের নাম</label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => {
                          const updated = [...formData.pricing.plans];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setFormData({ ...formData, pricing: { ...formData.pricing, plans: updated } });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">মূল্য (Price)</label>
                        <input
                          type="text"
                          value={plan.price}
                          onChange={(e) => {
                            const updated = [...formData.pricing.plans];
                            updated[idx] = { ...updated[idx], price: e.target.value };
                            setFormData({ ...formData, pricing: { ...formData.pricing, plans: updated } });
                          }}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-black text-emerald-800"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">মেয়াদ (Period)</label>
                        <input
                          type="text"
                          value={plan.period}
                          onChange={(e) => {
                            const updated = [...formData.pricing.plans];
                            updated[idx] = { ...updated[idx], period: e.target.value };
                            setFormData({ ...formData, pricing: { ...formData.pricing, plans: updated } });
                          }}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">সংক্ষিপ্ত বিবরণ</label>
                      <textarea
                        rows={2}
                        value={plan.description}
                        onChange={(e) => {
                          const updated = [...formData.pricing.plans];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setFormData({ ...formData, pricing: { ...formData.pricing, plans: updated } });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">বাটন টেক্সট</label>
                      <input
                        type="text"
                        value={plan.ctaText}
                        onChange={(e) => {
                          const updated = [...formData.pricing.plans];
                          updated[idx] = { ...updated[idx], ctaText: e.target.value };
                          setFormData({ ...formData, pricing: { ...formData.pricing, plans: updated } });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 9: FAQS */}
          {/* ============================================================== */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">সচরাচর প্রশ্ন ও উত্তর (FAQ)</h2>
                  <p className="text-xs text-slate-500 mt-1">প্রশ্ন যোগ করুন, এডিট করুন বা মুছে ফেলুন</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      faqs: [
                        ...formData.faqs,
                        { q: 'নতুন প্রশ্ন এখানে লিখুন...', a: 'প্রশ্নের উত্তর এখানে লিখুন...' },
                      ],
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>নতুন প্রশ্ন যোগ করুন</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800">প্রশ্ন #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.faqs.filter((_, i) => i !== idx);
                          setFormData({ ...formData, faqs: updated });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                        title="প্রশ্নটি মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">প্রশ্ন</label>
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => {
                          const updated = [...formData.faqs];
                          updated[idx] = { ...updated[idx], q: e.target.value };
                          setFormData({ ...formData, faqs: updated });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">উত্তর</label>
                      <textarea
                        rows={2}
                        value={faq.a}
                        onChange={(e) => {
                          const updated = [...formData.faqs];
                          updated[idx] = { ...updated[idx], a: e.target.value };
                          setFormData({ ...formData, faqs: updated });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs leading-relaxed text-slate-700 font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 10: FINAL CTA & FOOTER */}
          {/* ============================================================== */}
          {activeTab === 'finalCta' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">নিচের বড় ব্যানার ও ফুটার</h2>
                <p className="text-xs text-slate-500 mt-1">সবুজ গ্রিড ব্যানার ও ফুটার লিঙ্ক ও কপিরাইট টেক্সট</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-300 space-y-4">
                <span className="text-xs font-bold text-emerald-900 block">বড় সবুজ ব্যানার</span>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">ব্যানার টাইটেল</label>
                  <input
                    type="text"
                    value={formData.finalCta.title}
                    onChange={(e) =>
                      setFormData({ ...formData, finalCta: { ...formData.finalCta, title: e.target.value } })
                    }
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">ব্যানার সাব-টাইটেল</label>
                  <textarea
                    rows={2}
                    value={formData.finalCta.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, finalCta: { ...formData.finalCta, subtitle: e.target.value } })
                    }
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs leading-relaxed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">সাদা বোতাম (ফ্রি শুরু)</label>
                    <input
                      type="text"
                      value={formData.finalCta.primaryButton}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          finalCta: { ...formData.finalCta, primaryButton: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">সবুজ বোতাম (ডেমো)</label>
                    <input
                      type="text"
                      value={formData.finalCta.secondaryButton}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          finalCta: { ...formData.finalCta, secondaryButton: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">ফুটার কপিরাইট টেক্সট</label>
                <input
                  type="text"
                  value={formData.brand.copyright}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: { ...formData.brand, copyright: e.target.value } })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                />
              </div>
            </div>
          )}

          {/* Bottom Save Action Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium">
              💡 টিপস: পরিবর্তন করার পর <strong className="text-slate-800">"পরিবর্তন সেভ করুন"</strong> বাটনে ক্লিক করলেই লাইভ সাইটে সাথে সাথে আপডেট হয়ে যাবে।
            </p>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>পরিবর্তন সেভ করুন</span>
            </button>
          </div>

        </form>

      </main>

    </div>
  );
}
