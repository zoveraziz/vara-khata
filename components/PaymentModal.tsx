'use client';

import React, { useState } from 'react';
import { Bill, Tenant, Flat, PaymentMethod } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  CreditCard,
  X,
  Banknote,
  Smartphone,
  Landmark,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface PaymentModalProps {
  bill: Bill;
  tenant?: Tenant;
  flat?: Flat;
  onClose: () => void;
  onSuccess: (receiptNo: string) => void;
}

export default function PaymentModal({
  bill,
  tenant,
  flat,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const { collectPayment } = useApp();
  const [amount, setAmount] = useState<number>(bill.dueAmount || bill.totalAmount);
  const [method, setMethod] = useState<PaymentMethod>('cash');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [collectedBy, setCollectedBy] = useState<string>('বাড়িওয়ালা');
  const [remarks, setRemarks] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const paymentMethods: { id: PaymentMethod; label: string; icon: any; color: string }[] = [
    { id: 'cash', label: 'ক্যাশ (নগদ)', icon: Banknote, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'bkash', label: 'বিকাশ (bKash)', icon: Smartphone, color: 'text-pink-600 bg-pink-50 border-pink-200' },
    { id: 'nagad', label: 'নগদ (Nagad)', icon: Smartphone, color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { id: 'bank', label: 'ব্যাংক ট্রান্সফার', icon: Landmark, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    setLoading(true);

    try {
      const payment = collectPayment({
        billId: bill.id,
        amount: Number(amount),
        method,
        date,
        collectedBy,
        remarks: remarks.trim() || undefined,
      });

      onSuccess(payment.receiptNo);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isPartial = amount < bill.dueAmount;
  const remainingAfterPayment = Math.max(0, bill.dueAmount - amount);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 text-gray-900 border border-gray-100 animate-in fade-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              ভাড়ার টাকা গ্রহণ ও এন্ট্রি
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {flat?.name} — {tenant?.name} ({bill.monthName})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bill Summary Overview */}
        <div className="mt-4 bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5 flex justify-between items-center">
          <div>
            <span className="text-xs text-emerald-800 font-medium block">মোট প্রদেয় বিল</span>
            <span className="text-xl font-extrabold text-emerald-950">৳ {bill.totalAmount.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-red-700 font-medium block">বর্তমান বকেয়া</span>
            <span className="text-xl font-extrabold text-red-600">৳ {bill.dueAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              টাকা পাওয়ার মাধ্যম সিলেক্ট করুন <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((m) => {
                const Icon = m.icon;
                const isSelected = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-sm font-semibold transition ${
                      isSelected
                        ? `${m.color} ring-2 ring-emerald-500 shadow-sm font-bold`
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Paid Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-gray-700">
                আদায়কৃত টাকার পরিমাণ (টাকা) <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setAmount(bill.dueAmount)}
                className="text-xs text-emerald-700 font-semibold hover:underline"
              >
                সম্পূর্ণ টাকা (৳{bill.dueAmount.toLocaleString()})
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 font-bold text-gray-500">৳</span>
              <input
                type="number"
                required
                min="1"
                max={bill.dueAmount * 2}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-9 pr-3.5 py-2.5 border border-gray-300 rounded-xl text-base font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            {isPartial && (
              <p className="mt-1 text-xs text-amber-700 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                আংশিক পেমেন্ট: বাকি ৳{remainingAfterPayment.toLocaleString()} টাকা স্বয়ংক্রিয়ভাবে পরবর্তী মাসের বকেয়ায় যোগ হবে।
              </p>
            )}
          </div>

          {/* Date and Collected By */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">পেমেন্টের তারিখ</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">টাকা গ্রহণকারী</label>
              <select
                value={collectedBy}
                onChange={(e) => setCollectedBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="বাড়িওয়ালা">বাড়িওয়ালা</option>
                <option value="ম্যানেজার">ম্যানেজার</option>
                <option value="কেয়ারটেকার">কেয়ারটেকার</option>
              </select>
            </div>
          </div>

          {/* Remarks / Reference */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              নোট বা ট্রানজ্যাকশন আইডি (ঐচ্ছিক)
            </label>
            <input
              type="text"
              placeholder="যেমন: বিকাশ লাস্ট ৪ ডিজিট / চেক নং / হ্যান্ড ক্যাশ"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={loading || amount <= 0}
              className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>পেমেন্ট নিশ্চিত করুন (Done)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
