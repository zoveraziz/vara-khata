'use client';

import React, { useRef } from 'react';
import { Bill, Tenant, Flat, Property, PaymentRecord } from '@/types';
import { X, Printer, Share2, CheckCircle2, MessageCircle } from 'lucide-react';

interface ReceiptModalProps {
  bill: Bill;
  tenant?: Tenant;
  flat?: Flat;
  property?: Property;
  payment?: PaymentRecord;
  onClose: () => void;
}

export default function ReceiptModal({
  bill,
  tenant,
  flat,
  property,
  payment,
  onClose,
}: ReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp share link builder
  const buildWhatsAppUrl = () => {
    if (!tenant?.phone) return '#';
    const cleanPhone = tenant.phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone}`;
    
    const text = encodeURIComponent(
      `সম্মানিত ভাড়াটিয়া ${tenant.name},\n` +
      `আপনার ${property?.name || 'বাড়ি'}-এর ${flat?.name || 'ফ্ল্যাট'}-এর ${bill.monthName}-এর ভাড়ার রশিদ:\n` +
      `---------------------------------\n` +
      `মূল ভাড়া: ৳${bill.baseRent.toLocaleString()}\n` +
      `বিদ্যুৎ বিল (${bill.electricityUnits} ইউনিট): ৳${bill.electricityBill.toLocaleString()}\n` +
      `গ্যাস বিল: ৳${bill.gasBill.toLocaleString()}\n` +
      `পানি ও সার্ভিস চার্জ: ৳${(bill.waterBill + bill.serviceCharge).toLocaleString()}\n` +
      (bill.previousDue > 0 ? `পূর্বের বকেয়া: ৳${bill.previousDue.toLocaleString()}\n` : '') +
      `সর্বমোট বিল: ৳${bill.totalAmount.toLocaleString()}\n` +
      `আদায়কৃত টাকা: ৳${(payment?.amount || bill.paidAmount).toLocaleString()} (${payment?.method ? `মাধ্যমে: ${payment.method.toUpperCase()}` : ''})\n` +
      `অবশিষ্ট বকেয়া: ৳${bill.dueAmount.toLocaleString()}\n` +
      `---------------------------------\n` +
      `রশিদ নং: ${payment?.receiptNo || 'VK-' + bill.id}\n` +
      `তারিখ: ${payment?.date || new Date().toISOString().split('T')[0]}\n\n` +
      `টাকা বুঝে পেলাম। ধন্যবাদান্তে,\n${payment?.collectedBy || 'বাড়িওয়ালা'}`
    );

    return `https://api.whatsapp.com/send?phone=${intlPhone}&text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 text-gray-900 border border-gray-100 my-8 print:shadow-none print:border-none print:m-0 print:p-0">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 print:hidden">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>ভাড়ার ডিজিটাল মানি রিসিট</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / PDF</span>
            </button>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp-এ পাঠান</span>
            </a>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div ref={receiptRef} className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl mt-4 print:border-none print:p-2">
          {/* Header */}
          <div className="text-center pb-4 border-b-2 border-emerald-800">
            <h2 className="text-2xl font-black text-emerald-900 tracking-tight">
              {property?.name || 'আল-আকসা মঞ্জিল'}
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">{property?.address || 'মিরপুর, ঢাকা'}</p>
            <div className="inline-block bg-emerald-800 text-white font-bold text-xs px-4 py-1 rounded-full uppercase mt-2 tracking-wider">
              ভাড়া আদায়ের মানি রিসিট (Money Receipt)
            </div>
          </div>

          {/* Meta Details */}
          <div className="grid grid-cols-2 gap-4 text-xs py-3.5 border-b border-gray-200">
            <div>
              <p className="text-gray-500">রশিদ নং:</p>
              <p className="font-bold text-gray-900">{payment?.receiptNo || 'VK-' + bill.id}</p>
              <p className="text-gray-500 mt-1">ভাড়াটিয়ার নাম:</p>
              <p className="font-bold text-gray-900 text-sm">{tenant?.name || 'সম্মানিত ভাড়াটিয়া'}</p>
              <p className="text-gray-500">ফোন: {tenant?.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">তারিখ:</p>
              <p className="font-bold text-gray-900">{payment?.date || new Date().toISOString().split('T')[0]}</p>
              <p className="text-gray-500 mt-1">ফ্ল্যাট / ইউনিট:</p>
              <p className="font-bold text-emerald-800 text-sm">{flat?.name}</p>
              <p className="text-gray-500">ভাড়ার মাস: <span className="font-bold text-gray-900">{bill.monthName}</span></p>
            </div>
          </div>

          {/* Table Breakdown */}
          <table className="w-full text-xs mt-3 border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                <th className="py-2 text-left font-bold">বিবরণ (Item Description)</th>
                <th className="py-2 text-right font-bold">টাকার পরিমাণ (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2 text-gray-800">মূল মাসিক বাড়িভাড়া</td>
                <td className="py-2 text-right font-semibold">৳ {bill.baseRent.toLocaleString()}</td>
              </tr>
              {bill.electricityBill > 0 && (
                <tr>
                  <td className="py-2 text-gray-800">
                    বিদ্যুৎ বিল (সাব-মিটার ইউনিট: {bill.electricityUnits} @ ৳{bill.unitPrice})
                  </td>
                  <td className="py-2 text-right font-semibold">৳ {bill.electricityBill.toLocaleString()}</td>
                </tr>
              )}
              {bill.gasBill > 0 && (
                <tr>
                  <td className="py-2 text-gray-800">গ্যাস বিল</td>
                  <td className="py-2 text-right font-semibold">৳ {bill.gasBill.toLocaleString()}</td>
                </tr>
              )}
              {(bill.waterBill > 0 || bill.serviceCharge > 0) && (
                <tr>
                  <td className="py-2 text-gray-800">পানি ও সার্ভিস চার্জ / কমন বিল</td>
                  <td className="py-2 text-right font-semibold">
                    ৳ {(bill.waterBill + bill.serviceCharge).toLocaleString()}
                  </td>
                </tr>
              )}
              {bill.previousDue > 0 && (
                <tr className="bg-amber-50/50">
                  <td className="py-2 text-amber-900 font-medium">পূর্বের বকেয়া (Carried Forward)</td>
                  <td className="py-2 text-right font-bold text-amber-900">৳ {bill.previousDue.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 font-bold bg-gray-50">
                <td className="py-2.5 text-gray-900">সর্বমোট প্রদেয় বিল:</td>
                <td className="py-2.5 text-right text-gray-900 text-sm">৳ {bill.totalAmount.toLocaleString()}</td>
              </tr>
              <tr className="border-t border-emerald-100 bg-emerald-50 text-emerald-950 font-bold">
                <td className="py-2 text-emerald-900 flex items-center gap-1">
                  <span>প্রাপ্ত টাকা:</span>
                  <span className="text-[11px] font-normal text-emerald-800">
                    ({payment?.method ? `মাধ্যমে: ${payment.method.toUpperCase()}` : 'পরিশোধিত'})
                  </span>
                </td>
                <td className="py-2 text-right text-emerald-900 text-base">
                  ৳ {(payment?.amount || bill.paidAmount).toLocaleString()}
                </td>
              </tr>
              {bill.dueAmount > 0 && (
                <tr className="bg-red-50 text-red-900 font-bold">
                  <td className="py-1.5">অবশিষ্ট বকেয়া (Due Amount):</td>
                  <td className="py-1.5 text-right">৳ {bill.dueAmount.toLocaleString()}</td>
                </tr>
              )}
            </tfoot>
          </table>

          {/* Footer Signature */}
          <div className="mt-8 pt-6 border-t border-dashed border-gray-300 flex justify-between items-end text-xs text-gray-600">
            <div>
              <p className="font-semibold text-gray-800">সংগ্রহকারী: {payment?.collectedBy || 'বাড়িওয়ালা'}</p>
              {payment?.remarks && <p className="text-gray-500 italic mt-0.5">নোট: {payment.remarks}</p>}
              <p className="text-[10px] text-gray-400 mt-2">সফটওয়্যার: ভাড়া খাতা (VaraKhata)</p>
            </div>
            <div className="text-center">
              <div className="w-32 border-b border-gray-400 mb-1"></div>
              <p className="font-bold text-gray-800">বাড়িওয়ালা / ম্যানেজারের স্বাক্ষর</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
