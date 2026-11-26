'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Bill } from '@/types';
import {
  X,
  Receipt,
  Home,
  Zap,
  Flame,
  Droplets,
  ShieldCheck,
  PlusCircle,
  Calendar,
  AlertCircle,
  Save,
  Lock,
} from 'lucide-react';

interface EditBillModalProps {
  bill: Bill | null;
  onClose: () => void;
}

export default function EditBillModal({ bill, onClose }: EditBillModalProps) {
  const { flats, tenants, updateBill } = useApp();

  const [baseRent, setBaseRent] = useState<number>(0);
  const [gasBill, setGasBill] = useState<number>(0);
  const [electricityBill, setElectricityBill] = useState<number>(0);
  const [waterBill, setWaterBill] = useState<number>(0);
  const [serviceCharge, setServiceCharge] = useState<number>(0);
  const [otherBill, setOtherBill] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>('');

  useEffect(() => {
    if (bill) {
      setBaseRent(bill.baseRent || 0);
      setGasBill(bill.gasBill || 0);
      setElectricityBill(bill.electricityBill || 0);
      setWaterBill(bill.waterBill || 0);
      setServiceCharge(bill.serviceCharge || 0);
      setOtherBill(bill.otherBill || 0);
      setDueDate(bill.dueDate || '');
    }
  }, [bill]);

  if (!bill) return null;

  const flat = flats.find((f) => f.id === bill.flatId);
  const tenant = tenants.find((t) => t.id === bill.tenantId);

  const newTotal =
    baseRent + electricityBill + gasBill + waterBill + serviceCharge + otherBill + bill.previousDue;
  const newDue = Math.max(0, newTotal - bill.paidAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBill(bill.id, {
      baseRent,
      gasBill,
      electricityBill,
      waterBill,
      serviceCharge,
      otherBill,
      dueDate,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 text-slate-900 border border-slate-100 animate-in fade-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Receipt className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                ভাড়া ও ইউটিলিটি বিল এডিট
              </h3>
              <p className="text-xs text-slate-500">
                {flat?.name} — {tenant?.name} ({bill.monthName})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              মূল বাড়িভাড়া চুক্তি অনুযায়ী লকড রয়েছে। প্রয়োজনমতো গ্যাস, বিদ্যুৎ, পানি ও সার্ভিস চার্জ যোগ বা সংশোধন করুন।
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Base Rent (Locked) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-emerald-600" />
                  <span>মূল বাড়িভাড়া (চুক্তিভিত্তিক):</span>
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 inline-flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  নির্ধারিত
                </span>
              </div>
              <input
                type="number"
                value={baseRent}
                readOnly
                disabled
                className="w-full text-sm font-black bg-slate-100 text-slate-600 border border-slate-200 rounded-xl px-3 py-2 cursor-not-allowed select-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                চুক্তি অনুযায়ী নির্ধারিত — পরিবর্তন করতে ‘ফ্ল্যাট ও ইউনিট’ সেটিংসে যান
              </p>
            </div>

            {/* Electricity Bill */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>বিদ্যুৎ বিল (৳):</span>
              </label>
              <input
                type="number"
                min="0"
                value={electricityBill}
                onChange={(e) => setElectricityBill(Number(e.target.value) || 0)}
                className="w-full text-sm font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-emerald-600"
              />
            </div>

            {/* Gas Bill */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>গ্যাস বিল (৳):</span>
              </label>
              <input
                type="number"
                min="0"
                value={gasBill}
                onChange={(e) => setGasBill(Number(e.target.value) || 0)}
                className="w-full text-sm font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-emerald-600"
              />
            </div>

            {/* Water Bill */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>পানি বিল (WASA) (৳):</span>
              </label>
              <input
                type="number"
                min="0"
                value={waterBill}
                onChange={(e) => setWaterBill(Number(e.target.value) || 0)}
                className="w-full text-sm font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-emerald-600"
              />
            </div>

            {/* Service Charge */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                <span>সার্ভিস চার্জ / দারোয়ান (৳):</span>
              </label>
              <input
                type="number"
                min="0"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(Number(e.target.value) || 0)}
                className="w-full text-sm font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-emerald-600"
              />
            </div>

            {/* Other Bill */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5 text-teal-600" />
                <span>অন্যান্য / মেরামত চার্জ (৳):</span>
              </label>
              <input
                type="number"
                min="0"
                value={otherBill}
                onChange={(e) => setOtherBill(Number(e.target.value) || 0)}
                className="w-full text-sm font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-emerald-600"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>পরিশোধের শেষ তারিখ:</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-emerald-600"
            />
          </div>

          {/* Recalculation Summary Box */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>চলতি মাসের মোট বিল:</span>
              <span className="font-bold text-slate-900">
                ৳ {(baseRent + electricityBill + gasBill + waterBill + serviceCharge + otherBill).toLocaleString()}
              </span>
            </div>
            {bill.previousDue > 0 && (
              <div className="flex justify-between items-center text-xs text-rose-600">
                <span>পূর্বের বকেয়া যোগ:</span>
                <span className="font-bold">+ ৳ {bill.previousDue.toLocaleString()}</span>
              </div>
            )}
            {bill.paidAmount > 0 && (
              <div className="flex justify-between items-center text-xs text-emerald-700">
                <span>ইতিমধ্যে পরিশোধিত:</span>
                <span className="font-bold">- ৳ {bill.paidAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-emerald-200/80 pt-2 flex justify-between items-center text-sm font-black text-slate-900">
              <span>সর্বমোট বর্তমান বকেয়া:</span>
              <span className="text-base text-rose-600 font-black">
                ৳ {newDue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-md transition active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>বিল আপডেট সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
