'use client';

import React, { useRef } from 'react';
import { Tenant, Flat, Property, Bill, PaymentRecord } from '@/types';
import {
  X,
  Printer,
  FileText,
  MessageCircle,
  Building,
  CheckCircle2,
  Calendar,
  Wallet,
  AlertTriangle,
  ArrowDownRight,
} from 'lucide-react';

interface TenantStatementModalProps {
  tenant: Tenant;
  flat?: Flat;
  property?: Property;
  bills: Bill[];
  payments: PaymentRecord[];
  onClose: () => void;
  onViewReceipt: (bill: Bill) => void;
}

export default function TenantStatementModal({
  tenant,
  flat,
  property,
  bills,
  payments,
  onClose,
  onViewReceipt,
}: TenantStatementModalProps) {
  // Filter all bills and payments belonging to this tenant
  const tenantBills = bills
    .filter((b) => b.tenantId === tenant.id)
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.monthNum - a.monthNum;
    });

  const tenantPayments = payments.filter((p) => p.tenantId === tenant.id);

  // Totals calculation
  const totalBilled = tenantBills.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalPaid = tenantBills.reduce((acc, b) => acc + b.paidAmount, 0);
  const totalDue = tenantBills.reduce((acc, b) => acc + b.dueAmount, 0);
  const paidMonthsCount = tenantBills.filter((b) => b.status === 'paid').length;

  const handlePrint = () => {
    window.print();
  };

  const buildWhatsAppStatementUrl = () => {
    if (!tenant?.phone) return '#';
    const cleanPhone = tenant.phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone}`;

    const text = encodeURIComponent(
      `সম্মানিত ভাড়াটিয়া ${tenant.name},\n` +
      `আপনার ${property?.name || 'বাড়ি'}-এর ${flat?.name || 'ফ্ল্যাট'}-এর ভাড়ার স্টেটমেন্ট:\n` +
      `---------------------------------\n` +
      `ভাড়া শুরুর তারিখ: ${tenant.startDate}\n` +
      `জামানত/অগ্রিম টাকা: ৳${tenant.advanceDeposit.toLocaleString()}\n` +
      `হিসাবকৃত মোট মাস: ${tenantBills.length} টি\n` +
      `সর্বমোট ভাড়ার বিল: ৳${totalBilled.toLocaleString()}\n` +
      `সর্বমোট পরিশোধিত: ৳${totalPaid.toLocaleString()}\n` +
      `বর্তমান অবশিষ্ট বকেয়া: ৳${totalDue.toLocaleString()}\n` +
      `---------------------------------\n` +
      `ধন্যবাদান্তে,\n${property?.name || 'বাড়িওয়ালা'}`
    );

    return `https://api.whatsapp.com/send?phone=${intlPhone}&text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 text-gray-900 border border-gray-100 my-6 print:shadow-none print:border-none print:m-0 print:p-0">
        
        {/* Top Header & Actions (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-200 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                ভাড়াটিয়ার ভাড়ার স্টেটমেন্ট ও পেমেন্ট হিস্ট্রি
              </h3>
              <p className="text-xs text-slate-500">
                {tenant.name} — {flat?.name} ({property?.name})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
            >
              <Printer className="w-4 h-4" />
              <span>স্টেটমেন্ট প্রিন্ট / PDF</span>
            </button>

            <a
              href={buildWhatsAppStatementUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp-এ পাঠান</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Statement Document Content */}
        <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl mt-4 print:border-none print:p-0">
          
          {/* Document Letterhead */}
          <div className="text-center pb-4 border-b-2 border-emerald-900">
            <h2 className="text-2xl font-black text-emerald-950 tracking-tight">
              {property?.name}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">{property?.address}</p>
            <div className="inline-block bg-emerald-900 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase mt-2">
              ভাড়াটিয়ার ব্যক্তিগত ভাড়ার খতিয়ান (Tenant Rent Statement)
            </div>
          </div>

          {/* Tenant Meta Profile Information */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-gray-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">ভাড়াটিয়ার নাম:</span>
              <strong className="text-slate-900 text-sm">{tenant.name}</strong>
              <span className="text-slate-500 block">{tenant.occupation}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">মোবাইল নম্বর:</span>
              <strong className="text-slate-900 font-mono">{tenant.phone}</strong>
              <span className="text-slate-500 block">NID: {tenant.nid}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">ফ্ল্যাট ও তলা:</span>
              <strong className="text-emerald-800 text-sm">{flat?.name}</strong>
              <span className="text-slate-500 block">{flat?.floor} তলা (মিটার: {flat?.meterNo})</span>
            </div>
            <div className="sm:text-right">
              <span className="text-slate-400 block text-[10px]">ভাড়ার শুরুর তারিখ:</span>
              <strong className="text-slate-900">{tenant.startDate}</strong>
              <span className="text-emerald-700 block font-semibold">
                জামানত: ৳ {tenant.advanceDeposit.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Lifetime Summary KPI Cards (Printable & Screen) */}
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">সর্বমোট ভাড়ার দাবি</span>
              <strong className="text-base sm:text-lg font-black text-slate-900">
                ৳ {totalBilled.toLocaleString()}
              </strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">({tenantBills.length} মাসের মোট বিল)</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">সর্বমোট পরিশোধিত ভাড়া</span>
              <strong className="text-base sm:text-lg font-black text-emerald-700">
                ৳ {totalPaid.toLocaleString()}
              </strong>
              <span className="text-[10px] text-emerald-600 block mt-0.5">({paidMonthsCount} মাস সম্পূর্ণ পরিশোধিত)</span>
            </div>

            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-center">
              <span className="text-[10px] font-bold text-rose-800 uppercase block">বর্তমান মোট বকেয়া</span>
              <strong className="text-base sm:text-lg font-black text-rose-600">
                ৳ {totalDue.toLocaleString()}
              </strong>
              <span className="text-[10px] text-rose-500 block mt-0.5">
                {totalDue === 0 ? 'সব পরিশোধিত ✓' : 'অবশিষ্ট দেনা'}
              </span>
            </div>
          </div>

          {/* Month-by-Month Statement Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">ভাড়ার মাস</th>
                  <th className="py-2.5 px-3">মূল ভাড়া</th>
                  <th className="py-2.5 px-3">বিদ্যুৎ বিল</th>
                  <th className="py-2.5 px-3">গ্যাস ও কমন</th>
                  <th className="py-2.5 px-3 font-black">মোট বিল</th>
                  <th className="py-2.5 px-3">পরিশোধের তারিখ ও মাধ্যম</th>
                  <th className="py-2.5 px-3">পরিশোধ (৳)</th>
                  <th className="py-2.5 px-3">বকেয়া (৳)</th>
                  <th className="py-2.5 px-3 text-center">স্ট্যাটাস</th>
                  <th className="py-2.5 px-3 text-right print:hidden">রশিদ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tenantBills.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-slate-400">
                      কোনো পূর্ববর্তী ভাড়ার হিসাব পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  tenantBills.map((bill) => {
                    const pay = tenantPayments.find((p) => p.billId === bill.id);

                    return (
                      <tr key={bill.id} className="hover:bg-slate-50 transition">
                        <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                          {bill.monthName}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                          ৳ {bill.baseRent.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                          ৳ {bill.electricityBill.toLocaleString()}{' '}
                          <span className="text-[10px] text-slate-400">({bill.electricityUnits} u)</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                          ৳ {(bill.gasBill + bill.waterBill + bill.serviceCharge).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 font-black text-slate-900 whitespace-nowrap">
                          ৳ {bill.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                          {pay ? (
                            <div>
                              <span className="font-semibold text-slate-900">{pay.date}</span>
                              <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono uppercase ml-1.5 font-bold">
                                {pay.method}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">পরিশোধ হয়নি</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-emerald-700 whitespace-nowrap">
                          + ৳ {bill.paidAmount.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 font-bold whitespace-nowrap">
                          {bill.dueAmount > 0 ? (
                            <span className="text-rose-600">৳ {bill.dueAmount.toLocaleString()}</span>
                          ) : (
                            <span className="text-slate-400 font-normal">০</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center whitespace-nowrap">
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
                              বাকি
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap print:hidden">
                          {bill.paidAmount > 0 ? (
                            <button
                              onClick={() => onViewReceipt(bill)}
                              className="text-[11px] font-bold text-emerald-700 hover:underline px-2 py-1 bg-emerald-50 rounded"
                            >
                              রশিদ
                            </button>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-extrabold text-slate-900 border-t-2 border-slate-300">
                  <td colSpan={4} className="py-2.5 px-3 text-right">সর্বমোট হিসাব:</td>
                  <td className="py-2.5 px-3">৳ {totalBilled.toLocaleString()}</td>
                  <td></td>
                  <td className="py-2.5 px-3 text-emerald-700">৳ {totalPaid.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-rose-600">৳ {totalDue.toLocaleString()}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer Signature */}
          <div className="mt-10 pt-6 border-t border-dashed border-gray-300 flex justify-between items-end text-xs text-gray-600">
            <div>
              <p className="font-semibold text-gray-800">স্টেটমেন্ট তৈরির তারিখ: {new Date().toISOString().split('T')[0]}</p>
              <p className="text-[10px] text-gray-400 mt-1">সফটওয়্যার: ভাড়া খাতা (VaraKhata)</p>
            </div>
            <div className="text-center">
              <div className="w-36 border-b border-gray-400 mb-1"></div>
              <p className="font-bold text-gray-800">বাড়িওয়ালা / ম্যানেজারের স্বাক্ষর</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
