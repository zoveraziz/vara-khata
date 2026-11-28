'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Bill } from '@/types';
import {
  Receipt,
  Plus,
  Zap,
  CreditCard,
  FileText,
  Printer,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import PaymentModal from '@/components/PaymentModal';
import ReceiptModal from '@/components/ReceiptModal';
import ElectricityModal from '@/components/ElectricityModal';
import EditBillModal from '@/components/EditBillModal';
import { PenLine } from 'lucide-react';

export default function BillsPage() {
  const {
    properties,
    activePropertyId,
    flats,
    tenants,
    bills,
    payments,
    generateMonthlyBills,
    deleteBill,
    canPerformAction,
    triggerSubscriptionPrompt,
  } = useApp();

  const [selectedBillForPayment, setSelectedBillForPayment] = useState<Bill | null>(null);
  const [selectedBillForReceipt, setSelectedBillForReceipt] = useState<Bill | null>(null);
  const [selectedBillForElectricity, setSelectedBillForElectricity] = useState<Bill | null>(null);
  const [selectedBillForEdit, setSelectedBillForEdit] = useState<Bill | null>(null);

  // Month Generator States
  const [showGenModal, setShowGenModal] = useState(false);
  const [genMonth, setGenMonth] = useState('নভেম্বর ২০২৬');
  const [genMonthNum, setGenMonthNum] = useState('11');
  const [genYear, setGenYear] = useState('2026');
  const [genDueDate, setGenDueDate] = useState('2026-11-10');
  const [genOnlyBaseRent, setGenOnlyBaseRent] = useState(false);

  const activeProperty = properties.find((p) => p.id === activePropertyId);
  const propertyBills = bills.filter((b) => b.propertyId === activePropertyId);

  const monthsList = [
    { num: 1, name: 'জানুয়ারি' },
    { num: 2, name: 'ফেব্রুয়ারি' },
    { num: 3, name: 'মার্চ' },
    { num: 4, name: 'এপ্রিল' },
    { num: 5, name: 'মে' },
    { num: 6, name: 'জুন' },
    { num: 7, name: 'জুলাই' },
    { num: 8, name: 'আগস্ট' },
    { num: 9, name: 'সেপ্টেম্বর' },
    { num: 10, name: 'অক্টোবর' },
    { num: 11, name: 'নভেম্বর' },
    { num: 12, name: 'ডিসেম্বর' },
  ];

  const handleCreateBills = (e: React.FormEvent) => {
    e.preventDefault();
    const monthObj = monthsList.find((m) => m.num === parseInt(genMonthNum));
    const fullName = `${monthObj?.name} ${genYear}`;
    generateMonthlyBills(fullName, parseInt(genMonthNum), parseInt(genYear), genDueDate, genOnlyBaseRent);
    setShowGenModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-700" />
            মাসিক ভাড়া ও বিলের খাতা
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {activeProperty?.name} — এক ক্লিকে পুরো মাসের বিল তৈরি, সাব-মিটার বিদ্যুৎ ও পূর্বের বকেয়া সমন্বয়।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট করুন</span>
          </button>

          <button
            onClick={() => {
              const check = canPerformAction('generate_bill');
              if (!check.allowed) {
                triggerSubscriptionPrompt(check.reason || 'নতুন মাসের বিল তৈরি করতে প্যাকেজ রিনিউ করুন।');
                return;
              }
              setShowGenModal(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন মাসের বিল তৈরি</span>
          </button>
        </div>
      </div>

      {/* Bills Ledger Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              ভাড়ার বিস্তারিত লেজার শীট ({activeProperty?.name})
            </h2>
            <p className="text-xs text-slate-500">বকেয়া স্বয়ংক্রিয়ভাবে পরবর্তী মাসে ক্যারি-ফরওয়ার্ড হিসেবে যুক্ত থাকে</p>
          </div>
        </div>

        <div className="sm:hidden px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 text-[11px] text-emerald-800 font-semibold flex items-center justify-between">
          <span>👉 সম্পূর্ণ লেজার টেবিল দেখতে ডানে স্ক্রোল করুন</span>
          <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">১০টি কলাম</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[1080px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider whitespace-nowrap">
                <th className="py-3 px-4 whitespace-nowrap">মাস</th>
                <th className="py-3 px-4 whitespace-nowrap">ফ্ল্যাট ও ভাড়াটিয়া</th>
                <th className="py-3 px-4 whitespace-nowrap">মূল বাড়িভাড়া</th>
                <th className="py-3 px-4 whitespace-nowrap">সাব-মিটার বিদ্যুৎ</th>
                <th className="py-3 px-4 whitespace-nowrap">গ্যাস ও কমন বিল</th>
                <th className="py-3 px-4 whitespace-nowrap">পূর্বের বকেয়া</th>
                <th className="py-3 px-4 font-black whitespace-nowrap">মোট বিল</th>
                <th className="py-3 px-4 whitespace-nowrap">আদায় ও বাকি</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right whitespace-nowrap print:hidden">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {propertyBills.map((bill) => {
                const flat = flats.find((f) => f.id === bill.flatId);
                const tenant = tenants.find((t) => t.id === bill.tenantId);

                return (
                  <tr key={bill.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-700 whitespace-nowrap">
                      {bill.monthName}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-extrabold text-slate-900">{flat?.name}</div>
                      <div className="text-[11px] text-slate-500">{tenant?.name}</div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      ৳ {bill.baseRent.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-900">৳ {bill.electricityBill.toLocaleString()}</span>
                        <button
                          onClick={() => setSelectedBillForElectricity(bill)}
                          title="মিটার রিডিং আপডেট করুন"
                          className="p-1 rounded text-amber-600 hover:bg-amber-100 print:hidden"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400">({bill.electricityUnits} ইউনিট)</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span>৳ {(bill.gasBill + bill.waterBill + bill.serviceCharge).toLocaleString()}</span>
                        <button
                          onClick={() => setSelectedBillForEdit(bill)}
                          title="গ্যাস, পানি ও সার্ভিস চার্জ যোগ/এডিট করুন"
                          className="p-1 rounded text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 print:hidden transition"
                        >
                          <PenLine className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        গ্যাস: {bill.gasBill} | কমন: {bill.waterBill + bill.serviceCharge}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {bill.previousDue > 0 ? (
                        <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                          + ৳ {bill.previousDue.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900 text-sm whitespace-nowrap">
                      ৳ {bill.totalAmount.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-emerald-700 font-bold">
                        আদায়: ৳ {bill.paidAmount.toLocaleString()}
                      </div>
                      {bill.dueAmount > 0 && (
                        <div className="text-rose-600 font-bold text-[11px]">
                          বাকি: ৳ {bill.dueAmount.toLocaleString()}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {bill.status === 'paid' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          পরিশোধিত
                        </span>
                      )}
                      {bill.status === 'partial' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          আংশিক
                        </span>
                      )}
                      {bill.status === 'unpaid' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          বকেয়া
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap print:hidden">
                      <div className="inline-flex items-center justify-end gap-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedBillForEdit(bill)}
                          title="ভাড়া ও ইউটিলিটি বিল এডিট করুন"
                          className="px-2.5 py-1 border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 font-bold rounded text-xs transition inline-flex items-center gap-1 shrink-0"
                        >
                          <PenLine className="w-3 h-3" />
                          <span>এডিট</span>
                        </button>
                        {bill.dueAmount > 0 && (
                          <button
                            onClick={() => setSelectedBillForPayment(bill)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs shadow-sm transition shrink-0"
                          >
                            পেমেন্ট
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedBillForReceipt(bill)}
                          className="px-2 py-1 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded text-xs transition shrink-0"
                        >
                          রশিদ
                        </button>
                        <button
                          onClick={() => deleteBill(bill.id)}
                          className="p-1 text-slate-300 hover:text-rose-600 rounded transition shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Generator Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-gray-900 border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
              <Calendar className="w-5 h-5 text-emerald-600" />
              নতুন মাসের ভাড়ার বিল তৈরি করুন
            </h3>

            <form onSubmit={handleCreateBills} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">মাস নির্বাচন করুন</label>
                <select
                  value={genMonthNum}
                  onChange={(e) => setGenMonthNum(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none"
                >
                  {monthsList.map((m) => (
                    <option key={m.num} value={m.num}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">বছর</label>
                <input
                  type="number"
                  value={genYear}
                  onChange={(e) => setGenYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">ভাড়া পরিশোধের শেষ তারিখ</label>
                <input
                  type="date"
                  value={genDueDate}
                  onChange={(e) => setGenDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none"
                />
              </div>

              {/* Only Base Rent Checkbox */}
              <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="genOnlyBaseRent"
                  checked={genOnlyBaseRent}
                  onChange={(e) => setGenOnlyBaseRent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="genOnlyBaseRent" className="text-xs font-bold text-slate-800 cursor-pointer leading-tight">
                  শুরুতে শুধু মূল বাড়িভাড়ার বিল তৈরি করুন
                  <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                    গ্যাস, বিদ্যুৎ ও সার্ভিস চার্জ ০ থাকবে — পরবর্তীতে সুবিধা অনুযায়ী যোগ করবেন।
                  </span>
                </label>
              </div>

              <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                ✓ পূর্ববর্তী মাসের কোনো অপরিশোধিত বকেয়া থাকলে তা স্বয়ংক্রিয়ভাবে নতুন বিলে যোগ হয়ে যাবে।
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGenModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
                >
                  বিল তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
