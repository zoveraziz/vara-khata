'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
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
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, logout, isLoggedIn } = useAuth();
  const { properties, activePropertyId, setActivePropertyId, flats, addProperty } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [newPropName, setNewPropName] = useState('');
  const [newPropAddress, setNewPropAddress] = useState('');
  const [newPropFloors, setNewPropFloors] = useState('4');

  // Don't render App Navbar on public Landing Page or Login / Register
  if (pathname === '/' || pathname === '/landing' || pathname === '/login' || pathname === '/register') {
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

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-xs">
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

                <Link href="/dashboard" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                    ভ
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xl text-slate-900 tracking-tight">
                        ভাড়া খাতা
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        ড্যাশবোর্ড
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right Side: Property Switcher & User Info */}
              <div className="flex items-center gap-3">
                {/* Property Dropdown */}
                <div className="flex items-center bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-2xs">
                  <span className="mr-1.5 text-sm">🏢</span>
                  <select
                    value={activePropertyId}
                    onChange={(e) => setActivePropertyId(e.target.value)}
                    className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs sm:text-sm max-w-[140px] sm:max-w-[200px] truncate"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold ml-2 hidden sm:inline-block">
                    {occupiedCount}/{propertyFlats.length} ভাড়া
                  </span>
                </div>

                {/* Add Property Button */}
                <button
                  onClick={() => setShowAddPropertyModal(true)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl shadow-sm transition active:scale-95 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">নতুন বাড়ি</span>
                </button>

                {/* User Profile & Logout */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser?.name || 'হাজী মোঃ আব্দুল খালেক'}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-semibold">বাড়িওয়ালা</p>
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-3 space-y-1 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 font-extrabold'
                      : 'text-slate-800 font-bold hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-700'}`} />
                  <span className="whitespace-nowrap">{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center px-3">
              <span className="text-xs font-bold text-slate-900">{currentUser?.name}</span>
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
