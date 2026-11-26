'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PaymentRecord, Bill } from '@/types';
import {
  CreditCard,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  Banknote,
  Smartphone,
  Landmark,
} from 'lucide-react';
import ReceiptModal from '@/components/ReceiptModal';

export default function PaymentsPage() {
  const { properties, activePropertyId, flats, tenants, bills, payments } = useApp();
  const [selectedBillForReceipt, setSelectedBillForReceipt] = useState<Bill | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const totalCollectedAmount = filteredPayments.reduce((acc, p) => acc + p.amount, 0);

  const handleOpenReceipt = (pay: PaymentRecord) => {
    const bill = bills.find((b) => b.id === pay.billId);
    if (bill) {
      setSelectedBillForReceipt(bill);
      setSelectedPayment(pay);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-700" />
            পেমেন্ট কালেকশন হিস্ট্রি ও ক্যাশবই
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {activeProperty?.name} — নগদ, বিকাশ, নগদ ও ব্যাংকের মাধ্যমে গৃহীত সকল ভাড়ার খতিয়ান।
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-right">
          <span className="text-[11px] text-emerald-800 font-semibold block">মোট আদায়কৃত টাকা:</span>
          <span className="text-lg font-black text-emerald-950">৳ {totalCollectedAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
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
                <th className="py-3 px-4 whitespace-nowrap">সংগ্রহকারী</th>
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

                      <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                        {pay.collectedBy}
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

      {/* Receipt Modal */}
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
