'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Bill, Tenant, Flat, Property, PaymentRecord } from '@/types';
import { X, Printer, CheckCircle2, MessageCircle, ShieldCheck, Upload, Trash2, Copy, Check } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom Landlord Signature State
  const [customSignature, setCustomSignature] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSig = localStorage.getItem('vara_khata_signature');
      if (savedSig) {
        setCustomSignature(savedSig);
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Signature Upload Handler
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setCustomSignature(base64);
        if (typeof window !== 'undefined') {
          localStorage.setItem('vara_khata_signature', base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSignature = () => {
    setCustomSignature(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vara_khata_signature');
    }
  };

  // Dynamic Public Receipt Link
  const receiptIdentifier = payment?.receiptNo || `VK-${bill.id}`;
  const getReceiptUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/receipt?id=${encodeURIComponent(receiptIdentifier)}`;
    }
    return `https://varakhata-bd.vercel.app/receipt?id=${encodeURIComponent(receiptIdentifier)}`;
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(getReceiptUrl());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // WhatsApp share link builder with full itemized breakdown and clickable digital receipt URL
  const buildWhatsAppUrl = () => {
    if (!tenant?.phone) return '#';
    const cleanPhone = tenant.phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone}`;
    const liveReceiptUrl = getReceiptUrl();

    const text = encodeURIComponent(
      `সম্মানিত ভাড়াটিয়া ${tenant.name},\n` +
      `আপনার ${property?.name || 'বাড়ি'}-এর ${flat?.name || 'ফ্ল্যাট'}-এর ${bill.monthName}-এর ভাড়ার অফিসিয়াল ডিজিটাল রসিদ:\n\n` +
      `---------------------------------\n` +
      `📊 ভাড়ার বিবরণী:\n` +
      `• মূল মাসিক বাড়িভাড়া: ৳${bill.baseRent.toLocaleString()}\n` +
      (bill.electricityBill > 0 ? `• বিদ্যুৎ বিল (${bill.electricityUnits} ইউনিট): ৳${bill.electricityBill.toLocaleString()}\n` : '') +
      (bill.gasBill > 0 ? `• গ্যাস বিল: ৳${bill.gasBill.toLocaleString()}\n` : '') +
      (bill.waterBill + bill.serviceCharge > 0 ? `• পানি ও সার্ভিস চার্জ: ৳${(bill.waterBill + bill.serviceCharge).toLocaleString()}\n` : '') +
      (bill.previousDue > 0 ? `• পূর্বের বকেয়া: ৳${bill.previousDue.toLocaleString()}\n` : '') +
      `---------------------------------\n` +
      `💵 সর্বমোট প্রদেয় বিল: ৳${bill.totalAmount.toLocaleString()}\n` +
      `✅ প্রাপ্ত টাকা: ৳${(payment?.amount || bill.paidAmount).toLocaleString()} (${payment?.method ? `মাধ্যমে: ${payment.method.toUpperCase()}` : 'পরিশোধিত'})\n` +
      (bill.dueAmount > 0 ? `⚠️ অবশিষ্ট বকেয়া: ৳${bill.dueAmount.toLocaleString()}\n` : `🎉 অবশিষ্ট বকেয়া: ৳০ (সম্পূর্ণ পরিশোধিত)\n`) +
      `🧾 রসিদ নং: ${receiptIdentifier}\n` +
      `📅 তারিখ: ${payment?.date || new Date().toISOString().split('T')[0]}\n\n` +
      `🌐 আপনার অফিসিয়াল ডিজিটাল রসিদ দেখতে ও PDF ডাউনলোড করতে লিংকে ক্লিক করুন:\n` +
      `👉 ${liveReceiptUrl}\n\n` +
      `টাকা বুঝে পেলাম। ধন্যবাদান্তে,\n${payment?.collectedBy || 'বাড়িওয়ালা'}\nভাড়া খাতা (Vara Khata)`
    );

    return `https://api.whatsapp.com/send?phone=${intlPhone}&text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto print:p-0 print:bg-white printable-receipt-modal">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-4 sm:p-6 text-gray-900 border border-gray-100 my-4 print:shadow-none print:border-none print:m-0 print:p-0 print:max-w-none">
        
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 print:hidden">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <span>ভাড়ার ডিজিটাল মানি রিসিট</span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition shadow-xs"
              title="A4 ১ পাতায় প্রিন্ট বা PDF ডাউনলোড করুন"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / ১-পেজ PDF</span>
            </button>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
              title="ভাড়াটিয়ার হোয়াটসঅ্যাপে রসিদ পাঠান"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp-এ পাঠান</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
              title="রসিদের লাইভ লিঙ্ক কপি করুন"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'কপি হয়েছে' : 'লিংক কপি'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body (Strict 1-Page A4 Guarantee) */}
        <div
          ref={receiptRef}
          className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl mt-3 print:border-2 print:border-emerald-800 print:p-4 printable-receipt-card"
        >
          {/* Header */}
          <div className="text-center pb-3 border-b-2 border-emerald-800">
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
              {property?.name || 'আল-আকসা মঞ্জিল'}
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">{property?.address || 'মিরপুর, ঢাকা'}</p>
            <div className="inline-block bg-emerald-800 text-white font-bold text-[11px] px-3.5 py-0.5 rounded-full uppercase mt-2 tracking-wider">
              ভাড়া আদায়ের মানি রিসিট (Money Receipt)
            </div>
          </div>

          {/* Meta Details */}
          <div className="grid grid-cols-2 gap-3 text-xs py-2.5 border-b border-gray-200">
            <div>
              <p className="text-gray-500 text-[11px]">রশিদ নং:</p>
              <p className="font-bold font-mono text-gray-900">{receiptIdentifier}</p>
              <p className="text-gray-500 text-[11px] mt-1">ভাড়াটিয়ার নাম:</p>
              <p className="font-bold text-gray-900 text-xs sm:text-sm">{tenant?.name || 'সম্মানিত ভাড়াটিয়া'}</p>
              <p className="text-gray-500 text-[11px]">ফোন: {tenant?.phone || 'প্রযোজ্য নয়'}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-[11px]">তারিখ:</p>
              <p className="font-bold text-gray-900">{payment?.date || new Date().toISOString().split('T')[0]}</p>
              <p className="text-gray-500 text-[11px] mt-1">ফ্ল্যাট / ইউনিট:</p>
              <p className="font-bold text-emerald-800 text-xs sm:text-sm">{flat?.name}</p>
              <p className="text-gray-500 text-[11px]">
                ভাড়ার মাস: <span className="font-bold text-gray-900">{bill.monthName}</span>
              </p>
            </div>
          </div>

          {/* Table Breakdown */}
          <table className="w-full text-xs mt-2.5 border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-800 border-b border-slate-200 text-[11px]">
                <th className="py-1.5 px-2 text-left font-bold">বিবরণ (Item Description)</th>
                <th className="py-1.5 px-2 text-right font-bold">টাকার পরিমাণ (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px] sm:text-xs">
              <tr>
                <td className="py-1.5 px-2 text-gray-800">মূল মাসিক বাড়িভাড়া</td>
                <td className="py-1.5 px-2 text-right font-semibold">৳ {bill.baseRent.toLocaleString()}</td>
              </tr>
              {bill.electricityBill > 0 && (
                <tr>
                  <td className="py-1.5 px-2 text-gray-800">
                    বিদ্যুৎ বিল (সাব-মিটার ইউনিট: {bill.electricityUnits} @ ৳{bill.unitPrice})
                  </td>
                  <td className="py-1.5 px-2 text-right font-semibold">৳ {bill.electricityBill.toLocaleString()}</td>
                </tr>
              )}
              {bill.gasBill > 0 && (
                <tr>
                  <td className="py-1.5 px-2 text-gray-800">গ্যাস বিল</td>
                  <td className="py-1.5 px-2 text-right font-semibold">৳ {bill.gasBill.toLocaleString()}</td>
                </tr>
              )}
              {(bill.waterBill > 0 || bill.serviceCharge > 0) && (
                <tr>
                  <td className="py-1.5 px-2 text-gray-800">পানি ও সার্ভিস চার্জ / কমন বিল</td>
                  <td className="py-1.5 px-2 text-right font-semibold">
                    ৳ {(bill.waterBill + bill.serviceCharge).toLocaleString()}
                  </td>
                </tr>
              )}
              {bill.previousDue > 0 && (
                <tr className="bg-amber-50/50">
                  <td className="py-1.5 px-2 text-amber-900 font-medium">পূর্বের বকেয়া (Carried Forward)</td>
                  <td className="py-1.5 px-2 text-right font-bold text-amber-900">৳ {bill.previousDue.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 font-bold bg-slate-50 text-[11px] sm:text-xs">
                <td className="py-2 px-2 text-slate-900">সর্বমোট প্রদেয় বিল:</td>
                <td className="py-2 px-2 text-right text-slate-900 font-black">৳ {bill.totalAmount.toLocaleString()}</td>
              </tr>
              <tr className="border-t border-emerald-100 bg-emerald-50 text-emerald-950 font-bold text-[11px] sm:text-xs">
                <td className="py-1.5 px-2 text-emerald-900 flex items-center gap-1">
                  <span>প্রাপ্ত টাকা:</span>
                  <span className="text-[10px] font-normal text-emerald-800">
                    ({payment?.method ? `মাধ্যমে: ${payment.method.toUpperCase()}` : 'পরিশোধিত'})
                  </span>
                </td>
                <td className="py-1.5 px-2 text-right text-emerald-900 text-sm font-black">
                  ৳ {(payment?.amount || bill.paidAmount).toLocaleString()}
                </td>
              </tr>
              {bill.dueAmount > 0 ? (
                <tr className="bg-red-50 text-red-900 font-bold text-[11px]">
                  <td className="py-1 px-2">অবশিষ্ট বকেয়া (Due Amount):</td>
                  <td className="py-1 px-2 text-right">৳ {bill.dueAmount.toLocaleString()}</td>
                </tr>
              ) : (
                <tr className="bg-emerald-50/40 text-emerald-800 font-bold text-[10px]">
                  <td className="py-1 px-2">স্ট্যাটাস:</td>
                  <td className="py-1 px-2 text-right">✓ সম্পূর্ণ পরিশোধিত (Paid)</td>
                </tr>
              )}
            </tfoot>
          </table>

          {/* Footer Signature & Digital Verification Seal Section */}
          <div className="mt-5 pt-3.5 border-t border-dashed border-gray-300 flex justify-between items-end text-xs text-gray-600 gap-4">
            
            {/* Left: System Verification Badge */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>ডিজিটালি ভেরিফাইড রসিদ</span>
              </div>
              <p className="text-[11px] text-gray-800 font-medium">
                সংগ্রহকারী: <strong className="font-bold">{payment?.collectedBy || 'বাড়িওয়ালা'}</strong>
              </p>
              {payment?.remarks && <p className="text-[10px] text-gray-500 italic">নোট: {payment.remarks}</p>}
              <p className="text-[9px] text-gray-400">সফটওয়্যার: ভাড়া খাতা (VaraKhata SaaS)</p>
            </div>

            {/* Right: Signature Area with Digital Stamp or Custom Uploaded Signature */}
            <div className="flex flex-col items-center text-center shrink-0">
              <div className="min-h-[46px] flex items-center justify-center mb-1">
                {customSignature ? (
                  // Custom Hand-drawn / Uploaded Signature
                  <div className="relative group">
                    <img
                      src={customSignature}
                      alt="স্বাক্ষর"
                      className="max-h-12 max-w-[120px] object-contain"
                    />
                    <button
                      onClick={handleRemoveSignature}
                      className="absolute -top-2 -right-2 p-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-[9px] print:hidden opacity-0 group-hover:opacity-100 transition"
                      title="স্বাক্ষর মুছে ফেলুন"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  // Official Digital Verified Stamp Badge
                  <div className="border border-emerald-700/40 rounded-xl px-2.5 py-1 bg-emerald-50/70 flex items-center gap-1.5 text-emerald-950 shadow-2xs">
                    <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-[9px]">
                      ✓
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-black block leading-none text-emerald-950 font-serif italic">
                        {payment?.collectedBy || property?.name || 'অনুমোদিত স্বাক্ষর'}
                      </span>
                      <span className="text-[8px] font-bold text-emerald-800 uppercase tracking-wider block mt-0.5">
                        Digitally Signed
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-36 border-b border-gray-400 mb-1"></div>
              <p className="font-bold text-[11px] text-gray-800">বাড়িওয়ালা / ম্যানেজারের স্বাক্ষর</p>

              {/* Upload Signature Toggle Button (Hidden in Print) */}
              <div className="mt-1 print:hidden">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-[10px] text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                >
                  <Upload className="w-2.5 h-2.5" />
                  <span>{customSignature ? 'স্বাক্ষর পরিবর্তন' : 'স্বাক্ষর আপলোড'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
