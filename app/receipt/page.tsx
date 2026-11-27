'use client';

import React, { Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { initialBills, initialTenants, initialFlats, initialProperties, initialPayments } from '@/lib/initialData';
import { Printer, ShieldCheck, CheckCircle2, Building2, MessageCircle, ArrowLeft } from 'lucide-react';

function ReceiptContent() {
  const searchParams = useSearchParams();
  const receiptId = searchParams.get('id') || searchParams.get('receiptNo') || 'VK-2026-06-001';
  const receiptRef = useRef<HTMLDivElement>(null);

  // 1. Try finding payment record by receiptNo
  const payment =
    initialPayments.find((p) => p.receiptNo === receiptId) ||
    initialPayments.find((p) => p.billId === receiptId) ||
    initialPayments[0];

  // 2. Find associated bill
  const bill =
    initialBills.find((b) => b.id === payment?.billId) ||
    initialBills.find((b) => b.id === receiptId) ||
    initialBills[0];

  // 3. Find tenant, flat, property
  const tenant = initialTenants.find((t) => t.id === bill.tenantId) || initialTenants[0];
  const flat = initialFlats.find((f) => f.id === bill.flatId) || initialFlats[0];
  const property = initialProperties.find((p) => p.id === flat.propertyId) || initialProperties[0];

  const handlePrint = () => {
    window.print();
  };

  const receiptIdentifier = payment?.receiptNo || `VK-${bill.id}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-8 px-4 sm:px-6 print:p-0 print:bg-white printable-receipt-modal">
      <div className="max-w-2xl mx-auto space-y-4 print:space-y-0 print:m-0 print:max-w-none">
        
        {/* Top Public Banner (Hidden in Print) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-xs">
              ভ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 text-base">ভাড়া খাতা</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  ভেরিফাইড ডিজিটাল রসিদ
                </span>
              </div>
              <p className="text-xs text-slate-600">অনলাইন মানি রিসিট ভিউয়ার</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>১-পেজ PDF সেভ / প্রিন্ট</span>
            </button>
            <Link
              href="/"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
              title="হোমে ফিরুন"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Printable Receipt Card (Strict 1-Page A4 Guarantee) */}
        <div
          ref={receiptRef}
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm print:shadow-none print:border-2 print:border-emerald-800 print:rounded-lg print:p-4 printable-receipt-card"
        >
          {/* Header */}
          <div className="text-center pb-4 border-b-2 border-emerald-800">
            <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
              {property?.name || 'আল-আকসা মঞ্জিল'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">{property?.address || 'মিরপুর, ঢাকা'}</p>
            <div className="inline-block bg-emerald-800 text-white font-bold text-xs px-4 py-1 rounded-full uppercase mt-2.5 tracking-wider shadow-2xs">
              ভাড়া আদায়ের মানি রিসিট (Official Money Receipt)
            </div>
          </div>

          {/* Meta Details */}
          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm py-4 border-b border-slate-200">
            <div className="space-y-1">
              <p className="text-slate-500 text-xs">রশিদ নং:</p>
              <p className="font-bold font-mono text-slate-900 text-sm sm:text-base">{receiptIdentifier}</p>
              <p className="text-slate-500 text-xs pt-1">ভাড়াটিয়ার নাম:</p>
              <p className="font-bold text-slate-900 text-sm">{tenant?.name || 'সম্মানিত ভাড়াটিয়া'}</p>
              <p className="text-slate-500 text-xs">মোবাইল: {tenant?.phone || 'প্রযোজ্য নয়'}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-slate-500 text-xs">তারিখ:</p>
              <p className="font-bold text-slate-900 text-sm sm:text-base">
                {payment?.date || new Date().toISOString().split('T')[0]}
              </p>
              <p className="text-slate-500 text-xs pt-1">ফ্ল্যাট / ইউনিট:</p>
              <p className="font-bold text-emerald-800 text-sm sm:text-base">{flat?.name}</p>
              <p className="text-slate-500 text-xs">
                ভাড়ার মাস: <span className="font-bold text-slate-900">{bill.monthName}</span>
              </p>
            </div>
          </div>

          {/* Table Breakdown */}
          <table className="w-full text-xs sm:text-sm mt-4 border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-800 border-b border-slate-200">
                <th className="py-2.5 px-3 text-left font-bold">বিবরণ (Item Description)</th>
                <th className="py-2.5 px-3 text-right font-bold">টাকার পরিমাণ (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 text-slate-800">মূল মাসিক বাড়িভাড়া</td>
                <td className="py-2.5 px-3 text-right font-semibold">৳ {bill.baseRent.toLocaleString()}</td>
              </tr>
              {bill.electricityBill > 0 && (
                <tr>
                  <td className="py-2.5 px-3 text-slate-800">
                    বিদ্যুৎ বিল (সাব-মিটার ইউনিট: {bill.electricityUnits} @ ৳{bill.unitPrice})
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold">৳ {bill.electricityBill.toLocaleString()}</td>
                </tr>
              )}
              {bill.gasBill > 0 && (
                <tr>
                  <td className="py-2.5 px-3 text-slate-800">গ্যাস বিল</td>
                  <td className="py-2.5 px-3 text-right font-semibold">৳ {bill.gasBill.toLocaleString()}</td>
                </tr>
              )}
              {(bill.waterBill > 0 || bill.serviceCharge > 0) && (
                <tr>
                  <td className="py-2.5 px-3 text-slate-800">পানি ও সার্ভিস চার্জ / কমন বিল</td>
                  <td className="py-2.5 px-3 text-right font-semibold">
                    ৳ {(bill.waterBill + bill.serviceCharge).toLocaleString()}
                  </td>
                </tr>
              )}
              {bill.previousDue > 0 && (
                <tr className="bg-amber-50/50">
                  <td className="py-2.5 px-3 text-amber-900 font-medium">পূর্বের বকেয়া (Carried Forward)</td>
                  <td className="py-2.5 px-3 text-right font-bold text-amber-900">৳ {bill.previousDue.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 font-bold bg-slate-50">
                <td className="py-3 px-3 text-slate-900">সর্বমোট প্রদেয় বিল:</td>
                <td className="py-3 px-3 text-right text-slate-900 font-black text-base">
                  ৳ {bill.totalAmount.toLocaleString()}
                </td>
              </tr>
              <tr className="border-t border-emerald-100 bg-emerald-50 text-emerald-950 font-bold">
                <td className="py-2.5 px-3 text-emerald-900 flex items-center gap-1.5">
                  <span>প্রাপ্ত টাকা:</span>
                  <span className="text-xs font-normal text-emerald-800">
                    ({payment?.method ? `মাধ্যমে: ${payment.method.toUpperCase()}` : 'পরিশোধিত'})
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right text-emerald-900 text-lg font-black">
                  ৳ {(payment?.amount || bill.paidAmount).toLocaleString()}
                </td>
              </tr>
              {bill.dueAmount > 0 ? (
                <tr className="bg-red-50 text-red-900 font-bold">
                  <td className="py-2 px-3">অবশিষ্ট বকেয়া (Due Amount):</td>
                  <td className="py-2 px-3 text-right">৳ {bill.dueAmount.toLocaleString()}</td>
                </tr>
              ) : (
                <tr className="bg-emerald-50/40 text-emerald-800 font-bold text-xs">
                  <td className="py-2 px-3">স্ট্যাটাস:</td>
                  <td className="py-2 px-3 text-right">✓ সম্পূর্ণ পরিশোধিত (Paid in Full)</td>
                </tr>
              )}
            </tfoot>
          </table>

          {/* Footer Signature & Digital Verification Seal Section */}
          <div className="mt-8 pt-5 border-t border-dashed border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-end text-xs text-slate-600 gap-4">
            
            {/* Left: System Verification Seal */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>ডিজিটালি ভেরিফাইড রসিদ</span>
              </div>
              <p className="text-xs text-slate-800 font-medium">
                সংগ্রহকারী: <strong className="font-bold text-slate-900">{payment?.collectedBy || 'বাড়িওয়ালা'}</strong>
              </p>
              {payment?.remarks && <p className="text-xs text-slate-500 italic">নোট: {payment.remarks}</p>}
              <p className="text-[10px] text-slate-400">ইস্যুকৃত প্ল্যাটফর্ম: ভাড়া খাতা (Vara Khata SaaS)</p>
            </div>

            {/* Right: Landlord Digital Signature Stamp */}
            <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0">
              <div className="min-h-[50px] flex items-center justify-center mb-1">
                <div className="border border-emerald-700/40 rounded-xl px-3 py-1.5 bg-emerald-50/70 flex items-center gap-2 text-emerald-950 shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-[10px]">
                    ✓
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-black block leading-none text-emerald-950 font-serif italic">
                      {payment?.collectedBy || property?.name || 'অনুমোদিত স্বাক্ষর'}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block mt-0.5">
                      Digitally Signed & Verified
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-40 border-b border-slate-400 mb-1"></div>
              <p className="font-bold text-xs text-slate-800">বাড়িওয়ালা / ম্যানেজারের স্বাক্ষর</p>
              <p className="text-[10px] text-slate-400">অনলাইন মানি রিসিট</p>
            </div>

          </div>

        </div>

        {/* Public Footer (Hidden in Print) */}
        <div className="text-center pt-2 text-xs text-slate-500 print:hidden">
          <p>© ২০২৬ ভাড়া খাতা — বাংলাদেশের বাড়িওয়ালাদের স্মার্ট রেন্ট ম্যানেজমেন্ট</p>
        </div>

      </div>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] text-slate-800 font-bold">
          ডিজিটাল রসিদ লোড হচ্ছে...
        </div>
      }
    >
      <ReceiptContent />
    </Suspense>
  );
}
