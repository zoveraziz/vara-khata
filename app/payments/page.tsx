'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { PaymentRecord, Bill, CashHandoverRecord } from '@/types';
import { initialHandovers } from '@/lib/initialData';
import {
  CreditCard,
  Printer,
  Search,
  CheckCircle2,
  FileText,
  HandCoins,
  ShieldCheck,
  X,
  History,
} from 'lucide-react';
import ReceiptModal from '@/components/ReceiptModal';

// Helper: Convert number to Bengali words for Handover Voucher
function numberToBanglaWords(num: number): string {
  if (!num || num <= 0) return 'শূন্য টাকা';
  const units: { [key: number]: string } = {
    1: 'এক', 2: 'দুই', 3: 'তিন', 4: 'চার', 5: 'পাঁচ', 6: 'ছয়', 7: 'সাত', 8: 'আট', 9: 'নয়', 10: 'দশ',
    11: 'এগারো', 12: 'বারো', 13: 'তেরো', 14: 'চৌদ্দ', 15: 'পনেরো', 16: 'ষোলো', 17: 'সতেরো', 18: 'আঠারো', 19: 'উনিশ', 20: 'বিশ',
    21: 'একুশ', 22: 'বাইশ', 23: 'তেইশ', 24: 'চব্বিশ', 25: 'পঁচিশ', 26: 'ছাব্বিশ', 27: 'সাতাশ', 28: 'আটাশ', 29: 'উনত্রিশ', 30: 'ত্রিশ',
    31: 'একত্রিশ', 32: 'বত্রিশ', 33: 'তেত্রিশ', 34: 'চৌঁত্রিশ', 35: 'পঁয়ত্রিশ', 36: 'ছত্রিশ', 37: 'সাঁইত্রিশ', 38: 'আটত্রিশ', 39: 'উনচল্লিশ', 40: 'চল্লিশ',
    41: 'একচল্লিশ', 42: 'বিয়াল্লিশ', 43: 'তেতাল্লিশ', 44: 'চুয়াল্লিশ', 45: 'পঁয়তাল্লিশ', 46: 'ছেচল্লিশ', 47: 'সাতচল্লিশ', 48: 'আটচল্লিশ', 49: 'উনপঞ্চাশ', 50: 'পঞ্চাশ',
    51: 'একান্ন', 52: 'বায়ান্ন', 53: 'তিপ্পান্ন', 54: 'চুয়ান্ন', 55: 'পঞ্চান্ন', 56: 'ছাপ্পান্ন', 57: 'সাতান্ন', 58: 'আটান্ন', 59: 'উনষাট', 60: 'ষাট',
    61: 'একষট্টি', 62: 'বাষট্টি', 63: 'তেষট্টি', 64: 'চৌষট্টি', 65: 'পঁয়ষট্টি', 66: 'ছেষট্টি', 67: 'সাতষট্টি', 68: 'আটষট্টি', 69: 'উনসত্তর', 70: 'সত্তর',
    71: 'একাত্তর', 72: 'বাহাত্তর', 73: 'তিয়াত্তর', 74: 'চুয়াত্তর', 75: 'পঁচাত্তর', 76: 'ছিয়াত্তর', 77: 'সাতাত্তর', 78: 'আটাত্তর', 79: 'উনাশি', 80: 'আশি',
    81: 'একাশি', 82: 'বিরাশি', 83: 'তিরাশি', 84: 'চুরাশি', 85: 'পঁচাশি', 86: 'ছিয়াশি', 87: 'সাতাশি', 88: 'আটাশি', 89: 'উননব্বই', 90: 'নব্বই',
    91: 'একানব্বই', 92: 'বিরানব্বই', 93: 'তিরানব্বই', 94: 'চুরানব্বই', 95: 'পঁচানব্বই', 96: 'ছিয়ানব্বই', 97: 'সাতানব্বই', 98: 'আটানব্বই', 99: 'নিরানব্বই'
  };

  let remainder = num;
  const parts: string[] = [];

  // Crores
  if (remainder >= 10000000) {
    const crore = Math.floor(remainder / 10000000);
    parts.push(`${units[crore] || crore} কোটি`);
    remainder %= 10000000;
  }
  // Lakhs
  if (remainder >= 100000) {
    const lakh = Math.floor(remainder / 100000);
    parts.push(`${units[lakh] || lakh} লক্ষ`);
    remainder %= 100000;
  }
  // Thousands
  if (remainder >= 1000) {
    const thousand = Math.floor(remainder / 1000);
    parts.push(`${units[thousand] || thousand} হাজার`);
    remainder %= 1000;
  }
  // Hundreds
  if (remainder >= 100) {
    const hundred = Math.floor(remainder / 100);
    parts.push(`${units[hundred] || hundred} শত`);
    remainder %= 100;
  }
  // Remaining 1-99
  if (remainder > 0) {
    parts.push(units[remainder] || String(remainder));
  }

  return `${parts.join(' ')} টাকা মাত্র`;
}

export default function PaymentsPage() {
  const { properties, activePropertyId, flats, tenants, bills, payments } = useApp();
  const [selectedBillForReceipt, setSelectedBillForReceipt] = useState<Bill | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Manager Cash Handover States
  const [handovers, setHandovers] = useState<CashHandoverRecord[]>([]);
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedHandoverForVoucher, setSelectedHandoverForVoucher] = useState<CashHandoverRecord | null>(null);

  // Form State for Cash Handover Modal
  const [handoverAmount, setHandoverAmount] = useState<number>(0);
  const [managerName, setManagerName] = useState<string>('আব্দুল করিম (ম্যানেজার)');
  const [receivedBy, setReceivedBy] = useState<string>('বাড়িওয়ালা (মালিক)');
  const [handoverDate, setHandoverDate] = useState<string>('');
  const [handoverMethod, setHandoverMethod] = useState<'cash' | 'bank_deposit'>('cash');
  const [handoverNote, setHandoverNote] = useState<string>('ভাড়ার নগদ ক্যাশ হস্তান্তর ও হিসাব ক্লোজ');

  // Sync handovers with LocalStorage
  useEffect(() => {
    setHandoverDate(new Date().toISOString().split('T')[0]);
    try {
      const saved = localStorage.getItem('vk_cash_handovers');
      if (saved) {
        const parsed: CashHandoverRecord[] = JSON.parse(saved);
        // Clean out any past dummy mock record so user starts at ৳ 0 received
        const cleaned = parsed.filter((h) => h.id !== 'ho-1');
        setHandovers(cleaned);
        localStorage.setItem('vk_cash_handovers', JSON.stringify(cleaned));
      } else {
        setHandovers([]);
        localStorage.setItem('vk_cash_handovers', JSON.stringify([]));
      }
    } catch {
      setHandovers([]);
    }
  }, []);

  const saveHandovers = (newHandovers: CashHandoverRecord[]) => {
    setHandovers(newHandovers);
    try {
      localStorage.setItem('vk_cash_handovers', JSON.stringify(newHandovers));
    } catch (e) {
      console.error(e);
    }
  };

  const activeProperty = properties.find((p) => p.id === activePropertyId);

  // Filter payments for active property
  const propertyPayments = payments.filter((pay) => {
    const flat = flats.find((f) => f.id === pay.flatId);
    return flat?.propertyId === activePropertyId;
  });

  const filteredPayments = propertyPayments.filter((pay) => {
    const flat = flats.find((f) => f.id === pay.flatId);
    const tenant = tenants.find((t) => t.id === pay.tenantId);
    const query = searchQuery.toLowerCase();

    const matchesQuery =
      pay.receiptNo.toLowerCase().includes(query) ||
      tenant?.name.toLowerCase().includes(query) ||
      flat?.name.toLowerCase().includes(query) ||
      (pay.remarks && pay.remarks.toLowerCase().includes(query));

    const matchesMethod = methodFilter === 'all' || pay.method === methodFilter;

    return matchesQuery && matchesMethod;
  });

  // Completed handovers for this active property
  const propertyHandovers = handovers.filter((h) => h.propertyId === activePropertyId);
  const totalHandedOver = propertyHandovers.reduce((sum, h) => sum + h.amount, 0);

  const handleOpenReceipt = (pay: PaymentRecord) => {
    const bill = bills.find((b) => b.id === pay.billId);
    if (bill) {
      setSelectedBillForReceipt(bill);
      setSelectedPayment(pay);
    }
  };

  // Open Handover Modal
  const handleStartHandover = () => {
    setHandoverAmount(0);
    setHandoverDate(new Date().toISOString().split('T')[0]);
    setShowHandoverModal(true);
  };

  // Submit Handover and generate printable Voucher
  const handleConfirmHandover = (e: React.FormEvent) => {
    e.preventDefault();
    if (handoverAmount <= 0) return;

    const voucherNo = `HO-${new Date().getFullYear()}-${String(handovers.length + 1).padStart(3, '0')}`;
    const newRecord: CashHandoverRecord = {
      id: `ho-${Date.now()}`,
      propertyId: activePropertyId,
      managerName: managerName.trim() || 'ম্যানেজার',
      amount: Number(handoverAmount),
      date: handoverDate || new Date().toISOString().split('T')[0],
      method: handoverMethod,
      receivedBy: receivedBy.trim() || 'বাড়িওয়ালা (মালিক)',
      voucherNo,
      note: handoverNote.trim() || 'ক্যাশ হস্তান্তর সম্পন্ন',
      status: 'completed',
    };

    const updated = [newRecord, ...handovers];
    saveHandovers(updated);
    setShowHandoverModal(false);
    setSelectedHandoverForVoucher(newRecord);
  };

  return (
    <div className="space-y-5">
      {/* Page Header with "মালিক কত টাকা বুঝে পাইছেন" and "ম্যানেজার থেকে ক্যাশ গ্রহণ" Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-700" />
            পেমেন্ট কালেকশন হিস্ট্রি ও ক্যাশবই
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {activeProperty?.name} — নগদ, বিকাশ, নগদ ও ব্যাংকের মাধ্যমে গৃহীত সকল ভাড়ার খতিয়ান।
          </p>
        </div>

        {/* Action and Metric Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* মালিক কত টাকা বুঝে পাইছেন */}
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-left sm:text-right">
            <span className="text-[11px] text-emerald-800 font-bold block">মালিক কত টাকা বুঝে পাইছেন:</span>
            <span className="text-lg font-black text-emerald-950">৳ {totalHandedOver.toLocaleString()}</span>
          </div>

          {/* ম্যানেজার থেকে ক্যাশ গ্রহণ বাটন */}
          <button
            onClick={handleStartHandover}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition transform active:scale-95"
          >
            <HandCoins className="w-4 h-4" />
            <span>ম্যানেজার থেকে ক্যাশ গ্রহণ</span>
          </button>

          {/* Previous Handover Vouchers List Link (if any exists) */}
          {propertyHandovers.length > 0 && (
            <button
              onClick={() => setShowHistoryModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              title="পূর্বের ক্যাশ হস্তান্তর ভাউচার তালিকা"
            >
              <History className="w-3.5 h-3.5" />
              <span>ভাউচার ({propertyHandovers.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 print:hidden">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'সকল মাধ্যম' },
            { id: 'cash', label: 'ক্যাশ (নগদ)' },
            { id: 'bkash', label: 'বিকাশ (bKash)' },
            { id: 'nagad', label: 'নগদ (Nagad)' },
            { id: 'bank', label: 'ব্যাংক ট্রান্সফার' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMethodFilter(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                methodFilter === m.id
                  ? 'bg-emerald-800 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="রশিদ নং, ভাড়াটিয়া বা নোট..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[850px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider whitespace-nowrap">
                <th className="py-3 px-4 whitespace-nowrap">রশিদ নং ও তারিখ</th>
                <th className="py-3 px-4 whitespace-nowrap">ফ্ল্যাট ও ভাড়াটিয়া</th>
                <th className="py-3 px-4 whitespace-nowrap">মাধ্যম</th>
                <th className="py-3 px-4 whitespace-nowrap">আদায়কৃত টাকা</th>
                <th className="py-3 px-4 whitespace-nowrap">টাকা সংগ্রহকারী</th>
                <th className="py-3 px-4 whitespace-nowrap">নোট / ট্রানজ্যাকশন</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">রশিদ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    কোনো পেমেন্ট রেকর্ড পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredPayments.map((pay) => {
                  const flat = flats.find((f) => f.id === pay.flatId);
                  const tenant = tenants.find((t) => t.id === pay.tenantId);

                  return (
                    <tr key={pay.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                        <div className="font-bold text-slate-900">{pay.receiptNo}</div>
                        <div className="text-[11px] text-slate-500 font-sans">{pay.date}</div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{flat?.name}</div>
                        <div className="text-[11px] text-slate-500">{tenant?.name}</div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-800">
                          {pay.method}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-black text-sm text-emerald-700 whitespace-nowrap">
                        + ৳ {pay.amount.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                          {pay.collectedBy}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 italic max-w-xs truncate whitespace-nowrap">
                        {pay.remarks || '—'}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleOpenReceipt(pay)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold text-xs transition shrink-0"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>রশিদ</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL: RECEIVE CASH FROM MANAGER ================= */}
      {showHandoverModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 text-slate-900 border border-slate-100 animate-in fade-in zoom-in-95 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <HandCoins className="w-5 h-5 text-emerald-700" />
                  ম্যানেজার থেকে ক্যাশ গ্রহণ
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeProperty?.name} — ম্যানেজার থেকে প্রাপ্ত নগদ টাকা বুঝে নেওয়া ও ভাউচার তৈরি
                </p>
              </div>
              <button
                onClick={() => setShowHandoverModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Handover Form */}
            <form onSubmit={handleConfirmHandover} className="mt-4 space-y-4">
              {/* Handover Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  হস্তান্তরিত টাকার পরিমাণ (টাকা) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 font-black text-slate-500">৳</span>
                  <input
                    type="number"
                    required
                    min="1"
                    value={handoverAmount || ''}
                    onChange={(e) => setHandoverAmount(Number(e.target.value))}
                    placeholder="হস্তান্তরিত টাকার অংক লিখুন"
                    className="w-full pl-9 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-base font-black text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                {handoverAmount > 0 && (
                  <p className="mt-1 text-[11px] text-emerald-800 font-semibold italic">
                    কথায়: {numberToBanglaWords(handoverAmount)}
                  </p>
                )}
              </div>

              {/* Manager and Receiver Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    হস্তান্তরকারী (ম্যানেজার) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="ম্যানেজারের নাম"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    টাকা গ্রহণকারী (মালিক) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={receivedBy}
                    onChange={(e) => setReceivedBy(e.target.value)}
                    placeholder="বাড়িওয়ালার নাম"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Date and Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">হস্তান্তরের তারিখ</label>
                  <input
                    type="date"
                    required
                    value={handoverDate}
                    onChange={(e) => setHandoverDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">হস্তান্তরের মাধ্যম</label>
                  <select
                    value={handoverMethod}
                    onChange={(e) => setHandoverMethod(e.target.value as 'cash' | 'bank_deposit')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="cash">নগদ ক্যাশ (Cash in Hand)</option>
                    <option value="bank_deposit">ব্যাংক একাউন্টে জমা (Bank Deposit)</option>
                  </select>
                </div>
              </div>

              {/* Note / Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বিবরণ বা ভাউচার নোট
                </label>
                <input
                  type="text"
                  value={handoverNote}
                  onChange={(e) => setHandoverNote(e.target.value)}
                  placeholder="যেমন: চলতি মাসের সংগৃহীত নগদ ভাড়া হস্তান্তর"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowHandoverModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-black shadow transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>হস্তান্তর নিশ্চিত ও ভাউচার তৈরি করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PRINTABLE CASH HANDOVER VOUCHER ================= */}
      {selectedHandoverForVoucher && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto print:p-0 print:bg-white">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 border border-slate-200 animate-in fade-in zoom-in-95 my-6 print:m-0 print:p-6 print:shadow-none print:border-none print:w-full">
            {/* Action Bar (Hidden when printing) */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6 print:hidden">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span className="font-black text-sm text-slate-900">ক্যাশ হস্তান্তর ভাউচার স্লিপ</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট ভাউচার</span>
                </button>
                <button
                  onClick={() => setSelectedHandoverForVoucher(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Voucher Paper */}
            <div className="border-2 border-slate-800 p-6 rounded-xl bg-white relative">
              {/* Header */}
              <div className="text-center pb-4 border-b-2 border-slate-800">
                <div className="inline-block px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded uppercase tracking-wider mb-2">
                  ভাড়া খাতা — অফিসিয়াল ক্যাশ হস্তান্তর ভাউচার
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                  {activeProperty?.name || 'বাড়িওয়ালার প্রোপার্টি'}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {activeProperty?.address || 'ঠিকানা পাওয়া যায়নি'}
                </p>
                <div className="mt-2 text-xs font-bold text-emerald-900">
                  ক্যাশ হস্তান্তর ও হিসাব ক্লোজিং স্লিপ
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-300 text-xs">
                <div>
                  <span className="text-slate-500 block">ভাউচার নম্বর:</span>
                  <span className="font-mono font-black text-slate-900 text-sm">
                    {selectedHandoverForVoucher.voucherNo}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">হস্তান্তরের তারিখ:</span>
                  <span className="font-bold text-slate-900">
                    {selectedHandoverForVoucher.date}
                  </span>
                </div>
              </div>

              {/* Parties Details */}
              <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-300 text-xs bg-slate-50/70 -mx-6 px-6">
                <div>
                  <span className="text-slate-500 block font-medium">টাকা প্রদানকারী (হস্তান্তরকারী):</span>
                  <div className="font-black text-sm text-slate-900 mt-0.5">
                    {selectedHandoverForVoucher.managerName}
                  </div>
                  <span className="text-[11px] text-slate-500">পদবি: কেয়ারটেকার / ম্যানেজার</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block font-medium">টাকা গ্রহণকারী (মালিক):</span>
                  <div className="font-black text-sm text-slate-900 mt-0.5">
                    {selectedHandoverForVoucher.receivedBy}
                  </div>
                  <span className="text-[11px] text-slate-500">পদবি: বাড়িওয়ালা / প্রোপার্টি মালিক</span>
                </div>
              </div>

              {/* Amount Box */}
              <div className="my-5 p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 text-center">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block">
                  হস্তান্তরিত মোট টাকার পরিমাণ
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-950 mt-1">
                  ৳ {selectedHandoverForVoucher.amount.toLocaleString()}
                </div>
                <div className="text-xs font-bold text-emerald-900 mt-1.5">
                  কথায়: {numberToBanglaWords(selectedHandoverForVoucher.amount)}
                </div>
              </div>

              {/* Description & Method */}
              <div className="space-y-2 text-xs py-3 border-b border-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">অর্থ প্রদানের মাধ্যম:</span>
                  <span className="font-bold text-slate-900">
                    {selectedHandoverForVoucher.method === 'cash' ? 'নগদ ক্যাশ (Cash in Hand)' : 'ব্যাংক একাউন্ট ডিপোজিট'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">হস্তান্তরের বিবরণ / নোট:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {selectedHandoverForVoucher.note || 'নগদ ভাড়া প্রাপ্তি ও হিসাব সমম্বয়'}
                  </span>
                </div>
              </div>

              {/* Formal Legal Declaration */}
              <p className="text-[11px] text-slate-500 italic text-justify py-3">
                * প্রত্যয়ন: অত্র ভাউচারের বর্ণিত টাকা ম্যানেজার কর্তৃক বাড়িওয়ালার কাছে সম্পূর্ণভাবে হস্তান্তর করা হইল এবং বাড়িওয়ালা স্বহস্তে উক্ত অর্থ বুঝিয়া পাইয়া হিসাব সমন্বয় করিলেন।
              </p>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-12 mt-4 text-center text-xs">
                <div>
                  <div className="border-t border-slate-800 pt-1.5 font-black text-slate-900">
                    {selectedHandoverForVoucher.managerName}
                  </div>
                  <div className="text-[11px] text-slate-500">হস্তান্তরকারীর স্বাক্ষর (ম্যানেজার)</div>
                </div>

                <div>
                  <div className="border-t border-slate-800 pt-1.5 font-black text-slate-900">
                    {selectedHandoverForVoucher.receivedBy}
                  </div>
                  <div className="text-[11px] text-slate-500">গ্রহীতার স্বাক্ষর (বাড়িওয়ালা)</div>
                </div>
              </div>

              {/* Digital Footer Watermark */}
              <div className="mt-8 pt-2 border-t border-dashed border-slate-300 flex justify-between items-center text-[10px] text-slate-400">
                <span>সফটওয়্যার: ভাড়া খাতা (Vara Khata)</span>
                <span>ইস্যুর তারিখ: {selectedHandoverForVoucher.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: HISTORY OF HANDOVER VOUCHERS ================= */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 text-slate-900 border border-slate-100 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-700" />
                ম্যানেজার ক্যাশ হস্তান্তর ভাউচার তালিকা
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {propertyHandovers.map((h) => (
                <div key={h.id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono font-bold text-emerald-800">{h.voucherNo}</span>
                    <span className="text-slate-400 ml-2">({h.date})</span>
                    <div className="text-slate-600 font-medium mt-0.5">প্রদানকারী: {h.managerName}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm text-slate-900">৳ {h.amount.toLocaleString()}</span>
                    <button
                      onClick={() => {
                        setSelectedHandoverForVoucher(h);
                        setShowHistoryModal(false);
                      }}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg font-bold text-xs hover:bg-emerald-100 transition"
                    >
                      ভাউচার দেখুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: RECEIPT MODAL ================= */}
      {selectedBillForReceipt && (
        <ReceiptModal
          bill={selectedBillForReceipt}
          tenant={tenants.find((t) => t.id === selectedBillForReceipt.tenantId)}
          flat={flats.find((f) => f.id === selectedBillForReceipt.flatId)}
          property={activeProperty}
          payment={selectedPayment || payments.find((p) => p.billId === selectedBillForReceipt.id)}
          onClose={() => {
            setSelectedBillForReceipt(null);
            setSelectedPayment(null);
          }}
        />
      )}
    </div>
  );
}
