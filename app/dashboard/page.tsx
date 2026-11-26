'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { Bill, Tenant, Flat } from '@/types';
import {
  Wallet,
  AlertTriangle,
  Building,
  CheckCircle,
  Plus,
  Zap,
  CreditCard,
  FileText,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Search,
  UserCheck,
  Bell,
  PenLine,
} from 'lucide-react';
import Link from 'next/link';
import PaymentModal from '@/components/PaymentModal';
import ReceiptModal from '@/components/ReceiptModal';
import ElectricityModal from '@/components/ElectricityModal';
import EditBillModal from '@/components/EditBillModal';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const {
    properties,
    activePropertyId,
    flats,
    tenants,
    bills,
    payments,
    generateMonthlyBills,
    reminderSettings,
  } = useApp();

  const [selectedBillForPayment, setSelectedBillForPayment] = useState<Bill | null>(null);
  const [selectedBillForReceipt, setSelectedBillForReceipt] = useState<Bill | null>(null);
  const [selectedBillForElectricity, setSelectedBillForElectricity] = useState<Bill | null>(null);
  const [selectedBillForEdit, setSelectedBillForEdit] = useState<Bill | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeProperty = properties.find((p) => p.id === activePropertyId);
  const propertyFlats = flats.filter((f) => f.propertyId === activePropertyId);
  const propertyBills = bills.filter((b) => b.propertyId === activePropertyId);

  // Current Month calculations
  const totalBilled = propertyBills.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalCollected = propertyBills.reduce((acc, b) => acc + b.paidAmount, 0);
  const totalDue = propertyBills.reduce((acc, b) => acc + b.dueAmount, 0);
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

  const occupiedCount = propertyFlats.filter((f) => f.status === 'occupied').length;
  const vacantCount = propertyFlats.filter((f) => f.status === 'vacant').length;
  const unpaidBillsCount = propertyBills.filter((b) => b.dueAmount > 0).length;

  const filteredBills = propertyBills.filter((b) => {
    const flat = flats.find((f) => f.id === b.flatId);
    const tenant = tenants.find((t) => t.id === b.tenantId);
    const query = searchQuery.toLowerCase();
    return (
      flat?.name.toLowerCase().includes(query) ||
      tenant?.name.toLowerCase().includes(query) ||
      tenant?.phone.includes(query)
    );
  });

  const handleGenerateBills = () => {
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const now = new Date();
    const currentMonthNum = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const monthName = `${months[now.getMonth()]} ${currentYear}`;
    const dueDate = `${currentYear}-${String(currentMonthNum).padStart(2, '0')}-10`;

    generateMonthlyBills(monthName, currentMonthNum, currentYear, dueDate);
    setToastMessage(`✓ ${monthName} মাসের বিল সফলভাবে তৈরি ও নির্ভুলভাবে আপডেট হয়েছে!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            পরিশোধিত
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            আংশিক পরিশোধ
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            বকেয়া আছে
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Quick Actions (Rich Deep Forest Green, Zero Glare) */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-800 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-emerald-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-900/60 text-emerald-100 px-3 py-1 rounded-full text-xs font-semibold mb-2.5 border border-emerald-600/60 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-200" />
              <span>চলতি মাস: নভেম্বর ২০২৬</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-2xs">
              {activeProperty?.name}
            </h1>
            <p className="text-emerald-50 text-xs sm:text-sm mt-1 max-w-xl font-medium leading-relaxed">
              {activeProperty?.address} — খাতা-কলম ছাড়াই সব ফ্ল্যাটের ভাড়া ও বিলের স্বয়ংক্রিয় হিসাব।
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={handleGenerateBills}
              className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold px-4 py-2.5 rounded-xl text-sm shadow-md transition active:scale-95"
            >
              <Receipt className="w-4 h-4 text-emerald-700" />
              <span>এক ক্লিকে মাসের বিল জেনারেট</span>
            </button>

            <Link
              href="/tenants/new"
              className="flex items-center gap-1.5 bg-emerald-900/70 hover:bg-emerald-900 text-white font-bold px-3.5 py-2.5 rounded-xl text-sm border border-emerald-600/60 transition shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ভাড়াটিয়া</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Collected */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">আদায়কৃত ভাড়া</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            ৳ {totalCollected.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-800 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>সংগ্রহের হার: {collectionRate}%</span>
          </div>
        </div>

        {/* Total Due */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">মোট বকেয়া</span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">
            ৳ {totalDue.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-slate-700 font-medium">
            পূর্বের বকেয়া সহ চলতি মাসের বাকি টাকা
          </p>
        </div>

        {/* Flats Occupancy */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">ফ্ল্যাট পরিসংখ্যান</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-900">{occupiedCount}</span>
            <span className="text-sm font-bold text-slate-700">/ {propertyFlats.length} টি ভাড়া হয়েছে</span>
          </div>
          <p className="mt-2 text-xs text-amber-800 font-bold">
            {vacantCount} টি ফ্ল্যাট বর্তমানে খালি রয়েছে
          </p>
        </div>

        {/* Total Invoiced */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">মোট ভাড়ার দাবি</span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            ৳ {totalBilled.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-slate-700 font-medium">
            ভাড়া + বিদ্যুৎ + গ্যাস + ইউটিলিটি
          </p>
        </div>
      </div>

      {/* Auto-Reminder Quick Status Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">
                স্বয়ংক্রিয় ভাড়া রিমাইন্ডার (১–{reminderSettings.endDay} তারিখ)
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                reminderSettings.enabled
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {reminderSettings.enabled ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {unpaidBillsCount > 0
                ? `চলতি মাসে ${unpaidBillsCount} জন ভাড়াটিয়ার ভাড়া বকেয়া রয়েছে। ${reminderSettings.channel === 'both' ? 'SMS ও WhatsApp' : reminderSettings.channel === 'sms' ? 'Mobile SMS' : 'WhatsApp'} এর মাধ্যমে অটো নোটিফিকেশন যাবে।`
                : 'সকল ভাড়াটিয়ার চলতি মাসের ভাড়া পরিশোধ সম্পন্ন হয়েছে। কোনো মেসেজ পেন্ডিং নেই।'}
            </p>
          </div>
        </div>

        <Link
          href="/reminders"
          className="flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-800 font-bold px-4 py-2 rounded-xl text-xs border border-emerald-200 shadow-2xs transition whitespace-nowrap"
        >
          <span>রিমাইন্ডার ড্যাশবোর্ড ও সেটিংস</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Bills & Collection Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filter & Search Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-700" />
              চলতি মাসের ভাড়ার হিসাব ও কালেকশন
            </h2>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              টাকা পাওয়া মাত্রই ‘পেমেন্ট গ্রহণ’ বাটনে ক্লিক করে সাথে সাথে কনফার্ম করুন।
            </p>
          </div>

          <div className="w-full sm:w-auto relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="ফ্ল্যাট বা ভাড়াটিয়া খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3.5 py-1.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 font-medium"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="sm:hidden px-4 py-2 bg-emerald-50 border-b border-emerald-200 text-[11px] text-emerald-900 font-bold flex items-center justify-between">
          <span>👉 সম্পূর্ণ টেবিল পাশাপাশি দেখতে ডানে স্ক্রোল করুন</span>
          <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded border border-emerald-300">৭টি কলাম</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[960px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-900 border-b border-slate-300 font-extrabold uppercase tracking-wider whitespace-nowrap">
                <th className="py-3 px-4 whitespace-nowrap">ফ্ল্যাট ও ভাড়াটিয়া</th>
                <th className="py-3 px-4 whitespace-nowrap">মূল ভাড়া</th>
                <th className="py-3 px-4 whitespace-nowrap">সাব-মিটার বিদ্যুৎ</th>
                <th className="py-3 px-4 whitespace-nowrap">বকেয়া ও মোট বিল</th>
                <th className="py-3 px-4 whitespace-nowrap">আদায় ও বাকি</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">অ্যাকশন (পেমেন্ট ও রসিদ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-bold">
                    কোনো ভাড়ার বিল পাওয়া যায়নি। উপরের "এক ক্লিকে মাসের বিল জেনারেট" বাটনে ক্লিক করুন।
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => {
                  const flat = flats.find((f) => f.id === bill.flatId);
                  const tenant = tenants.find((t) => t.id === bill.tenantId);

                  return (
                    <tr key={bill.id} className="hover:bg-slate-50/70 transition">
                      {/* Flat & Tenant Info */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-black text-xs flex items-center justify-center shrink-0">
                            {flat?.name?.replace(/[^a-zA-Z0-9]/g, '').slice(-2) || 'FL'}
                          </span>
                          <div>
                            <div className="font-extrabold text-sm text-slate-900">{flat?.name}</div>
                            <div className="text-xs text-slate-700 font-bold">{tenant?.name}</div>
                            <div className="text-[11px] text-slate-600 font-mono font-semibold">{tenant?.phone}</div>
                          </div>
                        </div>
                      </td>

                      {/* Base Rent */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        ৳ {bill.baseRent.toLocaleString()}
                      </td>

                      {/* Sub-meter Electricity */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <div>
                            <div className="font-bold text-slate-900">
                              ৳ {bill.electricityBill.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-slate-700 font-medium">
                              {bill.electricityUnits} ইউনিট (@৳{bill.unitPrice})
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedBillForElectricity(bill)}
                            title="সাব-মিটার রিডিং হিসাব করুন"
                            className="p-1 rounded-lg text-amber-600 hover:bg-amber-100 transition shrink-0"
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Total Bill Breakdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-black text-sm text-slate-900">
                          ৳ {bill.totalAmount.toLocaleString()}
                        </div>
                        {bill.previousDue > 0 && (
                          <div className="text-[10px] text-rose-700 font-extrabold">
                            (বকেয়া: +৳{bill.previousDue.toLocaleString()})
                          </div>
                        )}
                        <div className="text-[10px] text-slate-700 font-medium">
                          গ্যাস: ৳{bill.gasBill} | কমন: ৳{bill.waterBill + bill.serviceCharge}
                        </div>
                      </td>

                      {/* Paid & Due */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-emerald-800 font-bold">
                          আদায়: ৳ {bill.paidAmount.toLocaleString()}
                        </div>
                        {bill.dueAmount > 0 ? (
                          <div className="text-rose-700 font-extrabold text-xs">
                            বাকি: ৳ {bill.dueAmount.toLocaleString()}
                          </div>
                        ) : (
                          <div className="text-slate-500 font-bold text-[11px]">কোনো বাকি নেই</div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {getStatusBadge(bill.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedBillForEdit(bill)}
                            title="ভাড়া বা ইউটিলিটি বিল এডিট করুন"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 rounded-lg font-bold text-xs transition shrink-0"
                          >
                            <PenLine className="w-3.5 h-3.5" />
                            <span>এডিট</span>
                          </button>

                          {bill.dueAmount > 0 && (
                            <button
                              onClick={() => setSelectedBillForPayment(bill)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow-sm transition active:scale-95 shrink-0"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>পেমেন্ট গ্রহণ</span>
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedBillForReceipt(bill)}
                            title="রশিদ দেখুন বা WhatsApp-এ পাঠান"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg font-bold text-xs transition shrink-0"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-700" />
                            <span>রশিদ</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              সম্প্রতি গৃহীত পেমেন্ট হিস্ট্রি
            </h3>
            <p className="text-xs text-slate-700 font-medium">নগদ, বিকাশ, নগদ ও ব্যাংকের মাধ্যমে গৃহীত ভাড়ার তালিকা</p>
          </div>
          <Link
            href="/payments"
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 mt-2">
          {payments.slice(0, 5).map((pay) => {
            const tenant = tenants.find((t) => t.id === pay.tenantId);
            const flat = flats.find((f) => f.id === pay.flatId);
            const methodDetails = (() => {
              switch (pay.method?.toLowerCase()) {
                case "cash":
                  return { label: "ক্যাশ", icon: "💵", style: "bg-emerald-50 text-emerald-800 border-emerald-200" };
                case "bkash":
                  return { label: "বিকাশ", icon: "📱", style: "bg-pink-50 text-pink-800 border-pink-200" };
                case "nagad":
                  return { label: "নগদ", icon: "🟠", style: "bg-orange-50 text-orange-800 border-orange-200" };
                case "bank":
                  return { label: "ব্যাংক", icon: "🏦", style: "bg-blue-50 text-blue-800 border-blue-200" };
                default:
                  return { label: pay.method, icon: "💳", style: "bg-slate-50 text-slate-800 border-slate-200" };
              }
            })();
            return (
              <div key={pay.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-base shadow-sm shrink-0 ${methodDetails.style}`} title={methodDetails.label}>
                    {methodDetails.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 text-sm truncate">
                      {tenant?.name} ({flat?.name})
                    </div>
                    <div className="text-xs text-slate-700 font-medium truncate">
                      রশিদ নং: {pay.receiptNo} | তারিখ: {pay.date} | গ্রহণকারী: {pay.collectedBy}
                    </div>
                    {pay.remarks && <div className="text-[11px] text-slate-600 font-medium italic truncate">নোট: {pay.remarks}</div>}
                  </div>
                </div>
                <div className="text-right shrink-0 whitespace-nowrap">
                  <span className="font-extrabold text-base text-emerald-700 block whitespace-nowrap">
                    + ৳ {pay.amount.toLocaleString()}
                  </span>
                  <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border mt-0.5 whitespace-nowrap ${methodDetails.style}`}>
                    {methodDetails.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {selectedBillForEdit && (
        <EditBillModal
          bill={selectedBillForEdit}
          onClose={() => setSelectedBillForEdit(null)}
        />
      )}

      {selectedBillForPayment && (
        <PaymentModal
          bill={selectedBillForPayment}
          tenant={tenants.find((t) => t.id === selectedBillForPayment.tenantId)}
          flat={flats.find((f) => f.id === selectedBillForPayment.flatId)}
          onClose={() => setSelectedBillForPayment(null)}
          onSuccess={() => {
            setSelectedBillForReceipt(selectedBillForPayment);
            setSelectedBillForPayment(null);
          }}
        />
      )}

      {selectedBillForReceipt && (
        <ReceiptModal
          bill={selectedBillForReceipt}
          tenant={tenants.find((t) => t.id === selectedBillForReceipt.tenantId)}
          flat={flats.find((f) => f.id === selectedBillForReceipt.flatId)}
          property={activeProperty}
          payment={payments.find((p) => p.billId === selectedBillForReceipt.id)}
          onClose={() => setSelectedBillForReceipt(null)}
        />
      )}

      {selectedBillForElectricity && (
        <ElectricityModal
          bill={selectedBillForElectricity}
          flat={flats.find((f) => f.id === selectedBillForElectricity.flatId)}
          onClose={() => setSelectedBillForElectricity(null)}
        />
      )}
    </div>
  );
}
