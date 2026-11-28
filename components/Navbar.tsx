'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useAuth, UserRole } from '@/context/AuthContext';
import {
  Building2,
  LayoutDashboard,
  DoorOpen,
  Users2,
  Receipt,
  CreditCard,
  FileSpreadsheet,
  Plus,
  Menu,
  X,
  Sparkles,
  LogOut,
  User,
  Bell,
  ShieldCheck,
  Check,
  ChevronDown,
  Crown,
} from 'lucide-react';

// Modular Role Toggle: Set to false to keep UI 100% clean and simple until landlord requests activation
export const FEATURE_ROLES_ENABLED = false;

export default function Navbar() {
  const pathname = usePathname();
  const {
    currentUser,
    logout,
    isLoggedIn,
    activeRole,
    isOwner,
    isManager,
    switchRole,
    managerStaff,
    saveManagerStaff,
  } = useAuth();

  const { properties, activePropertyId, setActivePropertyId, flats, addProperty, subscription, triggerSubscriptionPrompt } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const [newPropName, setNewPropName] = useState('');
  const [newPropAddress, setNewPropAddress] = useState('');
  const [newPropFloors, setNewPropFloors] = useState('4');

  // Manager staff inputs
  const [staffName, setStaffName] = useState(managerStaff?.name || 'মোঃ কালাম হোসেন (কেয়ারটেকার)');
  const [staffPhone, setStaffPhone] = useState(managerStaff?.phone || '01811223344');
  const [staffSavedMsg, setStaffSavedMsg] = useState(false);

  // Don't render App Navbar on public Landing Page or Login / Register
  if (
    pathname === '/' ||
    pathname === '/landing' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/receipt' ||
    pathname === '/admin'
  ) {
    return null;
  }

  const activeProperty = properties.find((p) => p.id === activePropertyId);
  const propertyFlats = flats.filter((f) => f.propertyId === activePropertyId);
  const occupiedCount = propertyFlats.filter((f) => f.status === 'occupied').length;

  const navItems = [
    { name: 'ড্যাশবোর্ড', href: '/dashboard', icon: LayoutDashboard },
    { name: 'ফ্ল্যাট ও ইউনিট', href: '/flats', icon: DoorOpen },
    { name: 'ভাড়াটিয়া তালিকা', href: '/tenants', icon: Users2 },
    { name: 'মাসিক বিল ও হিসাব', href: '/bills', icon: Receipt },
    { name: 'পেমেন্ট রেকর্ড', href: '/payments', icon: CreditCard },
    { name: 'অটো রিমাইন্ডার', href: '/reminders', icon: Bell },
    { name: 'টু-লেট নোটিশ', href: '/to-let', icon: FileSpreadsheet },
  ];

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropName.trim() || !newPropAddress.trim()) return;
    addProperty({
      name: newPropName,
      address: newPropAddress,
      totalFloors: parseInt(newPropFloors) || 1,
    });
    setNewPropName('');
    setNewPropAddress('');
    setShowAddPropertyModal(false);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    saveManagerStaff({
      name: staffName,
      phone: staffPhone,
      addedAt: new Date().toISOString().split('T')[0],
    });
    setStaffSavedMsg(true);
    setTimeout(() => setStaffSavedMsg(false), 2500);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-xs print:hidden">
        
        {/* Manager Mode Active Notification Strip */}
        {FEATURE_ROLES_ENABLED && isManager && (
          <div className="bg-blue-900 text-blue-100 px-4 py-2 text-xs border-b border-blue-800 shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                <span>
                  👔 <strong>ম্যানেজার / সহকারী মোড সক্রিয়:</strong> আপনি দৈনিক মিটার রিডিং ও ভাড়ার টাকা গ্রহণ রেকর্ড করতে পারবেন। গুরুত্বপূর্ণ ডিলিট ও মালিকের ফিনান্সিয়াল সেটিংসে হাত দেওয়া যাবে না।
                </span>
              </div>
              <button
                onClick={() => switchRole('owner')}
                className="bg-white text-blue-950 px-3 py-1 rounded-lg font-bold text-[11px] hover:bg-blue-50 transition shrink-0 shadow-2xs"
              >
                👑 মালিক ভিউতে ফিরে যান →
              </button>
            </div>
          </div>
        )}

        {/* Row 1: Brand Logo, Property Switcher & User Profile */}
        <div className="border-b border-slate-200/80 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Brand Logo & Name */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <Link href="/dashboard" className="flex items-center gap-2.5 group">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform shrink-0">
                    ভ
                  </div>
                  <span className="font-black text-xl text-slate-900 tracking-tight whitespace-nowrap">
                    ভাড়া খাতা
                  </span>
                </Link>
              </div>

              {/* Right Side: Property Switcher & Role & User Info */}
              <div className="flex items-center gap-2 sm:gap-3">
                
                {/* Property Dropdown (Visible on Tablet and Desktop, clean on mobile) */}
                <div className="hidden sm:flex items-center bg-slate-50 border border-slate-200/90 rounded-xl px-2.5 sm:px-3 py-1.5 shadow-2xs">
                  <span className="mr-1.5 text-sm">🏢</span>
                  <select
                    value={activePropertyId}
                    onChange={(e) => setActivePropertyId(e.target.value)}
                    className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs sm:text-sm max-w-[120px] sm:max-w-[180px] truncate"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold ml-2 hidden lg:inline-block">
                    {occupiedCount}/{propertyFlats.length} ভাড়া
                  </span>
                </div>

                {/* Add Property Button (Hidden or disabled in Manager Mode) */}
                {isOwner && (
                  <button
                    onClick={() => setShowAddPropertyModal(true)}
                    className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl shadow-sm transition active:scale-95 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">নতুন বাড়ি</span>
                  </button>
                )}

                {/* Role Switcher Pill */}
                {FEATURE_ROLES_ENABLED && (
                  <button
                    onClick={() => setShowRoleModal(true)}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold border transition shadow-2xs ${
                      isOwner
                        ? 'bg-amber-50 text-amber-900 border-amber-300/80 hover:bg-amber-100'
                        : 'bg-blue-50 text-blue-900 border-blue-300/80 hover:bg-blue-100'
                    }`}
                    title="রোল পরিবর্তন বা ম্যানেজার সেটিংস"
                  >
                    <span>{isOwner ? '👑 মালিক' : '👔 ম্যানেজার'}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                )}

                {/* Subscription Badge */}
                {(() => {
                  const isExpired = subscription.status === 'expired';
                  return (
                    <button
                      onClick={() => triggerSubscriptionPrompt(isExpired ? 'আপনার সাবস্ক্রিপশন মেয়াদ শেষ হয়েছে। অবিলম্বে রিনিউ করুন।' : '')}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold border transition shadow-2xs ${
                        isExpired
                          ? 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100 animate-pulse'
                          : subscription.planId === 'pro'
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                          : subscription.planId === 'samiti'
                          ? 'bg-purple-50 text-purple-900 border-purple-300 hover:bg-purple-100'
                          : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                      }`}
                      title="সাবস্ক্রিপশন ও প্যাকেজ বিস্তারিত"
                    >
                      <Crown className={`w-3.5 h-3.5 ${isExpired ? 'text-rose-600' : 'text-amber-600'}`} />
                      <span className="hidden md:inline">
                        {isExpired ? 'মেয়াদ শেষ (রিনিউ করুন)' : subscription.planName}
                      </span>
                      <span className="md:hidden">
                        {isExpired ? 'রিনিউ' : 'প্যাকেজ'}
                      </span>
                    </button>
                  );
                })()}

                {/* User Profile & Logout */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {isManager && managerStaff ? managerStaff.name : (currentUser?.name || 'হাজী মোঃ আব্দুল খালেক')}
                    </p>
                    <p className={`text-[10px] font-bold ${isOwner ? 'text-amber-800' : 'text-blue-800'}`}>
                      {isOwner ? 'বাড়িওয়ালা (Owner)' : 'ম্যানেজার (Staff)'}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    title="লগআউট করুন"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Row 2: Dedicated Navigation Tab Bar */}
        <div className="bg-slate-100/90 border-b border-slate-200 py-2.5 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2.5 overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border shadow-2xs ${
                      isActive
                        ? 'bg-white text-emerald-900 border-emerald-500 shadow-sm font-black ring-1 ring-emerald-500/40'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:text-slate-950 hover:border-slate-300 font-bold'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-700' : 'text-slate-700'}`} />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 py-3 space-y-2">
            {/* Property Selector for Mobile Drawer */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span>🏢</span>
                <span>সক্রিয় বাড়ি:</span>
              </span>
              <select
                value={activePropertyId}
                onChange={(e) => setActivePropertyId(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none max-w-[170px] truncate"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-black'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center px-3">
              <span className="text-xs font-bold text-slate-900">
                {isOwner ? '👑 মালিক মোড' : '👔 ম্যানেজার মোড'}
              </span>
              <button
                onClick={logout}
                className="text-xs font-bold text-red-600 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>লগআউট</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Role Management Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-slate-900 border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-black text-slate-900">রোল ও পারমিশন কন্ট্রোল</h3>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Switch View Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 block">সক্রিয় রোল নির্বাচন করুন:</label>
              
              <div
                onClick={() => switchRole('owner')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  isOwner
                    ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-100'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl">👑</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900">বাড়িওয়ালা / মালিক (Owner)</h4>
                    {isOwner && <span className="text-[11px] font-bold text-amber-800">✓ সক্রিয়</span>}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    পূর্ণ নিয়ন্ত্রণ: সব ফ্ল্যাট, আয়-ব্যয়, ব্যাংক হিসাব, ম্যানেজার নিয়োগ ও ডিলিট ক্ষমতা।
                  </p>
                </div>
              </div>

              <div
                onClick={() => switchRole('manager')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  isManager
                    ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-100'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl">👔</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900">ম্যানেজার / কেয়ারটেকার (Staff)</h4>
                    {isManager && <span className="text-[11px] font-bold text-blue-800">✓ সক্রিয়</span>}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    দৈনন্দিন অপারেশন: সাব-মিটার রিডিং এন্ট্রি, ভাড়া গ্রহণ ও রসিদ প্রেরণ (ডিলিট বা মূল ফিনান্সিয়াল সেটিংসে বাধা)।
                  </p>
                </div>
              </div>
            </div>

            {/* Manager Details Form (Owner can edit) */}
            <form onSubmit={handleSaveStaff} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">ম্যানেজার / কেয়ারটেকারের তথ্য:</span>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">ম্যানেজারের নাম</label>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">ম্যানেজারের মোবাইল নম্বর</label>
                <input
                  type="text"
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                />
              </div>

              {staffSavedMsg && (
                <p className="text-xs font-bold text-emerald-700 animate-in fade-in">✓ ম্যানেজারের তথ্য সংরক্ষিত হয়েছে!</p>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                ম্যানেজার তথ্য সংরক্ষণ করুন
              </button>
            </form>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setShowRoleModal(false)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-gray-900 border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                নতুন বাড়ি বা মার্কেট যুক্ত করুন
              </h3>
              <button
                onClick={() => setShowAddPropertyModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  বাড়ি বা মার্কেটের নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: আল-আকসা ভিলা / রূপালী প্লাজা"
                  value={newPropName}
                  onChange={(e) => setNewPropName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ঠিকানা ও এলাকা <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: বাড়ি ১২, রোড ৫, মিরপুর-২, ঢাকা"
                  value={newPropAddress}
                  onChange={(e) => setNewPropAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  মোট তলা সংখ্যা
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={newPropFloors}
                  onChange={(e) => setNewPropFloors(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPropertyModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition"
                >
                  যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
