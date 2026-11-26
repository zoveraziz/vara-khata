'use client';

import React, { useState } from 'react';
import { Bill, Flat } from '@/types';
import { useApp } from '@/context/AppContext';
import { Zap, X, Calculator, CheckCircle2 } from 'lucide-react';

interface ElectricityModalProps {
  bill: Bill;
  flat?: Flat;
  onClose: () => void;
}

export default function ElectricityModal({ bill, flat, onClose }: ElectricityModalProps) {
  const { updateBillElectricity } = useApp();
  const [currReading, setCurrReading] = useState<number>(
    bill.currMeterReading || flat?.lastMeterReading || 0
  );
  const [unitPrice, setUnitPrice] = useState<number>(bill.unitPrice || 10);

  const prevReading = bill.prevMeterReading || 0;
  const units = Math.max(0, currReading - prevReading);
  const calculatedBill = units * unitPrice;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBillElectricity(bill.id, currReading, unitPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-gray-900 border border-gray-100 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">সাব-মিটার বিদ্যুৎ বিল ক্যালকুলেটর</h3>
              <p className="text-xs text-gray-500">{flat?.name} — মিটার নং: {flat?.meterNo || 'নাই'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 flex justify-between items-center text-xs">
            <div>
              <span className="text-gray-600 block">পূর্ববর্তী মাসের রিডিং:</span>
              <strong className="text-base text-gray-900">{prevReading} ইউনিট</strong>
            </div>
            <div className="text-right">
              <span className="text-gray-600 block">মোট ব্যবহৃত ইউনিট:</span>
              <strong className="text-base text-amber-800">{units} ইউনিট</strong>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              বর্তমান মাসের মিটার রিডিং <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min={prevReading}
              value={currReading}
              onChange={(e) => setCurrReading(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-base font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              * মিটারের গায়ে যে সংখ্যাটি দেখা যাচ্ছে তা হুবহু লিখুন।
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              প্রতি ইউনিটের সরকারি/নির্ধারিত দর (টাকা)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2 text-sm text-gray-500 font-bold">৳</span>
              <input
                type="number"
                step="0.5"
                min="1"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
            <span className="text-xs font-medium text-gray-700">গণনাকৃত বিদ্যুৎ বিল:</span>
            <span className="text-lg font-black text-emerald-800">৳ {calculatedBill.toLocaleString()}</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold shadow transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>বিলে যোগ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
