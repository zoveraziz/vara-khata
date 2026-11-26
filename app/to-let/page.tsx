'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Building,
  Phone,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

function ToLetContent() {
  const searchParams = useSearchParams();
  const flatIdParam = searchParams.get('flatId') || '';

  const { properties, activePropertyId, flats } = useApp();
  const propertyFlats = flats.filter((f) => f.propertyId === activePropertyId);
  const activeProperty = properties.find((p) => p.id === activePropertyId);

  const initialFlat = propertyFlats.find((f) => f.id === flatIdParam) || propertyFlats[0];

  const [selectedFlatId, setSelectedFlatId] = useState(initialFlat?.id || '');
  const [targetTenant, setTargetTenant] = useState('ছোট ফ্যামিলি / চাকুরিজীবী');
  const [rentAvailableFrom, setRentAvailableFrom] = useState('১লা ডিসেম্বর ২০২৬ হইতে');
  const [contactPhone, setContactPhone] = useState('01711-223344');
  const [specialFeatures, setSpecialFeatures] = useState('২৪ ঘণ্টা পানি, লিফট ও জেনারেটর সুবিধা, আলো-বাতাসপূর্ণ মনোরম পরিবেশ');
  const [copied, setCopied] = useState(false);

  const currentFlat = propertyFlats.find((f) => f.id === selectedFlatId) || initialFlat;

  const handlePrint = () => {
    window.print();
  };

  const getFacebookPostText = () => {
    return (
      `🏠 ফ্ল্যাট ভাড়া দেওয়া হইবে (TO-LET) 🏠\n` +
      `------------------------------------------\n` +
      `📍 অবস্থান: ${activeProperty?.name || 'আল-আকসা মঞ্জিল'}, ${activeProperty?.address || 'মিরপুর, ঢাকা'}\n` +
      `📅 ভাড়া শুরু: ${rentAvailableFrom}\n` +
      `👥 যাদের জন্য: ${targetTenant}\n\n` +
      `✨ ফ্ল্যাটের বিবরণ:\n` +
      `• তলা: ${currentFlat?.floor || 1} তলা (${currentFlat?.name || 'ফ্ল্যাট'})\n` +
      `• বেডরুম: ${currentFlat?.bedrooms || 2} টি\n` +
      `• বাথরুম: ${currentFlat?.bathrooms || 2} টি\n` +
      `• বারান্দা: ${currentFlat?.balconies || 1} টি\n` +
      `• ড্রইং ও ডাইনিং স্পেস\n` +
      `• বৈশিষ্ট্য: ${specialFeatures}\n\n` +
      `💰 মাসিক ভাড়া: ৳${currentFlat?.rent.toLocaleString() || 'আলোচনা সাপেক্ষে'}\n` +
      `📞 বিস্তারিত জানতে যোগাযোগ করুন: ${contactPhone}\n` +
      `------------------------------------------\n` +
      `*(পোস্টটি শেয়ার করে অন্যকে বাসা পাওয়ার সুযোগ করে দিন)*`
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFacebookPostText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-700" />
            টু-লেট (TO-LET) পোস্টার ও নোটিশ জেনারেটর
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            গেটে লাগানোর জন্য আকর্ষণীয় প্রিন্ট পোস্টার অথবা ফেসবুকে পোস্ট করার টেক্সট এক ক্লিকে তৈরি করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'পোস্ট কপি হয়েছে!' : 'ফেসবুক পোস্ট কপি'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow"
          >
            <Printer className="w-4 h-4" />
            <span>পোস্টার প্রিন্ট করুন</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
        {/* Left Form Controls (Hidden in Print) */}
        <div className="lg:col-span-5 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            পোস্টারের তথ্য কাস্টমাইজ করুন
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ফ্ল্যাট নির্বাচন করুন
            </label>
            <select
              value={selectedFlatId}
              onChange={(e) => setSelectedFlatId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none bg-white"
            >
              {propertyFlats.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.floor} তলা) — ৳{f.rent.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">যাদের জন্য প্রযোজ্য</label>
            <input
              type="text"
              value={targetTenant}
              onChange={(e) => setTargetTenant(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">কবে থেকে ভাড়া হবে</label>
            <input
              type="text"
              value={rentAvailableFrom}
              onChange={(e) => setRentAvailableFrom(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">যোগাযোগের মোবাইল নম্বর</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">বিশেষ সুযোগ-সুবিধা</label>
            <textarea
              rows={3}
              value={specialFeatures}
              onChange={(e) => setSpecialFeatures(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* Right Printable Poster View */}
        <div className="lg:col-span-7 print:w-full print:m-0 print:p-0">
          <div className="bg-white border-4 border-black p-6 sm:p-10 rounded-2xl shadow-md text-black print:border-4 print:border-black print:rounded-none print:shadow-none print:p-8">
            {/* Poster Header */}
            <div className="text-center border-b-4 border-black pb-4">
              <span className="text-sm font-bold tracking-widest uppercase bg-black text-white px-4 py-1 rounded-full">
                বিসমিল্লাহির রহমানির রাহিম
              </span>
              <h1 className="text-3xl sm:text-5xl font-black mt-3 uppercase tracking-tight leading-none text-black">
                ফ্ল্যাট ভাড়া দেওয়া হইবে
              </h1>
              <p className="text-xl sm:text-2xl font-black tracking-widest mt-1 text-slate-800">
                ( TO — LET )
              </p>
            </div>

            {/* Availability Badge */}
            <div className="text-center my-4">
              <span className="inline-block bg-emerald-800 text-white font-extrabold text-base sm:text-lg px-6 py-1.5 rounded-xl uppercase">
                {rentAvailableFrom}
              </span>
            </div>

            {/* Poster Features Grid */}
            <div className="my-6 bg-slate-50 border-2 border-black p-5 rounded-xl space-y-3 text-sm sm:text-base font-bold">
              <div className="flex justify-between items-center border-b border-dashed border-slate-300 pb-2">
                <span>ফ্ল্যাট / তলা:</span>
                <span className="text-xl font-black">{currentFlat?.name} ({currentFlat?.floor} তলা)</span>
              </div>
              <div className="flex justify-between items-center border-b border-dashed border-slate-300 pb-2">
                <span>বেডরুম ও বাথরুম:</span>
                <span>{currentFlat?.bedrooms} টি বেডরুম, {currentFlat?.bathrooms} টি বাথরুম</span>
              </div>
              <div className="flex justify-between items-center border-b border-dashed border-slate-300 pb-2">
                <span>বারান্দা:</span>
                <span>{currentFlat?.balconies} টি খোলামেলা বারান্দা</span>
              </div>
              <div className="flex justify-between items-center border-b border-dashed border-slate-300 pb-2">
                <span>কাদের জন্য:</span>
                <span className="text-emerald-900">{targetTenant}</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span>মাসিক ভাড়া:</span>
                <span className="text-2xl font-black text-emerald-800">৳ {currentFlat?.rent.toLocaleString()} /-</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="p-3 bg-slate-100 rounded-xl border border-black text-xs sm:text-sm font-semibold text-center">
              ⭐ {specialFeatures}
            </div>

            {/* Address & Contact */}
            <div className="mt-8 pt-4 border-t-4 border-black text-center space-y-2">
              <p className="text-sm sm:text-base font-bold text-slate-800">
                ঠিকানা: <strong>{activeProperty?.name}</strong>, {activeProperty?.address}
              </p>
              <div className="inline-block bg-black text-white px-6 py-3 rounded-2xl shadow mt-2">
                <p className="text-xs tracking-wider uppercase">যোগাযোগ করুন</p>
                <p className="text-2xl sm:text-3xl font-black tracking-wider font-mono">
                  {contactPhone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ToLetPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">লোড হচ্ছে...</div>}>
      <ToLetContent />
    </Suspense>
  );
}
