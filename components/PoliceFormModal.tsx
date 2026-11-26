'use client';

import React from 'react';
import { Tenant, Flat, Property } from '@/types';
import { X, Printer, ShieldCheck, UserCheck } from 'lucide-react';

interface PoliceFormModalProps {
  tenant: Tenant;
  flat?: Flat;
  property?: Property;
  onClose: () => void;
}

export default function PoliceFormModal({
  tenant,
  flat,
  property,
  onClose,
}: PoliceFormModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 text-gray-900 border border-gray-100 my-6 print:shadow-none print:border-none print:m-0 print:p-0">
        {/* Top Action Bar (Hidden in Print) */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 print:hidden">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>বাংলাদেশ পুলিশ — ভাড়াটিয়া তথ্য ফরম (Auto Generated)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>ফরম প্রিন্ট করুন (Print / PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Police Form Body */}
        <div className="p-6 bg-white border border-gray-300 rounded-xl mt-4 print:border-none print:p-4 text-xs text-gray-900 leading-relaxed font-serif">
          {/* Form Header */}
          <div className="flex justify-between items-start border-b-2 border-black pb-3">
            <div className="w-24 h-28 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-center p-1 text-[10px] text-gray-500 rounded bg-gray-50">
              <UserCheck className="w-6 h-6 text-gray-400 mb-1" />
              <span>১ কপি পাসপোর্ট সাইজ ছবি</span>
            </div>

            <div className="text-center flex-1 px-4">
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">
                বাংলাদেশ পুলিশ
              </h2>
              <h3 className="text-base font-extrabold text-black mt-0.5">
                ভাড়াটিয়া তথ্য ফরম (Tenant Information Form)
              </h3>
              <p className="text-[11px] text-gray-700 mt-1">
                (সংশ্লিষ্ট থানা ও স্থানীয় পুলিশ ফাঁড়ির জন্য সংরক্ষিত)
              </p>
            </div>

            <div className="w-24 text-right text-[11px] text-gray-600">
              <p>তারিখ: <strong>{tenant.startDate}</strong></p>
              <p className="mt-1">ফ্ল্যাট: <strong>{flat?.name}</strong></p>
            </div>
          </div>

          {/* Form Sections */}
          <div className="mt-4 space-y-3.5">
            {/* Section 1: Address */}
            <div className="bg-gray-100/70 p-2 font-bold text-gray-800 text-xs border-l-4 border-emerald-800">
              ১. ভাড়াটিয়ার বর্তমান ঠিকানা ও ফ্ল্যাটের বিবরণ
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pl-2">
              <p><span className="font-semibold text-gray-700">বাড়ি/ভবনের নাম:</span> {property?.name}</p>
              <p><span className="font-semibold text-gray-700">ফ্ল্যাট / ইউনিট নং:</span> {flat?.name} ({flat?.floor} তলা)</p>
              <p className="col-span-2"><span className="font-semibold text-gray-700">ঠিকানা ও এলাকা:</span> {property?.address}</p>
              <p><span className="font-semibold text-gray-700">ভাড়ার শুরুর তারিখ:</span> {tenant.startDate}</p>
              <p><span className="font-semibold text-gray-700">মাসিক ভাড়া:</span> ৳ {flat?.rent?.toLocaleString()} টাকা</p>
            </div>

            {/* Section 2: Tenant Personal Info */}
            <div className="bg-gray-100/70 p-2 font-bold text-gray-800 text-xs border-l-4 border-emerald-800">
              ২. ভাড়াটিয়ার ব্যক্তিগত পরিচিতি
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pl-2">
              <p><span className="font-semibold text-gray-700">ভাড়াটিয়ার পুরো নাম:</span> <strong className="text-black text-sm">{tenant.name}</strong></p>
              <p><span className="font-semibold text-gray-700">পিতার নাম:</span> {tenant.fatherName || 'মরহুম/উক্ত'}</p>
              <p><span className="font-semibold text-gray-700">মোবাইল নম্বর:</span> <strong className="text-emerald-900">{tenant.phone}</strong></p>
              <p><span className="font-semibold text-gray-700">ইমেইল (যদি থাকে):</span> {tenant.email || 'নাই'}</p>
              <p><span className="font-semibold text-gray-700">জাতীয় পরিচয়পত্র (NID):</span> <strong className="text-black">{tenant.nid}</strong></p>
              <p><span className="font-semibold text-gray-700">জন্ম তারিখ:</span> {tenant.dateOfBirth || '—'}</p>
              <p><span className="font-semibold text-gray-700">ধর্ম:</span> {tenant.religion}</p>
              <p><span className="font-semibold text-gray-700">পেশা ও কর্মস্থল:</span> {tenant.occupation} ({tenant.workplace || 'ঢাকা'})</p>
              <p className="col-span-2"><span className="font-semibold text-gray-700">স্থায়ী ঠিকানা:</span> {tenant.permanentAddress || 'গ্রাম: সদর, জেলা: ঢাকা'}</p>
            </div>

            {/* Section 3: Family Members */}
            <div className="bg-gray-100/70 p-2 font-bold text-gray-800 text-xs border-l-4 border-emerald-800">
              ৩. ফ্ল্যাটে বসবাসরত পরিবারের সদস্য বিবরণ
            </div>
            <div className="pl-2">
              <p><span className="font-semibold text-gray-700">মোট পরিবারের সদস্য সংখ্যা:</span> <strong>{tenant.familyMembers} জন</strong></p>
              <p className="text-[11px] text-gray-500 mt-0.5">*(পরিবারের সকল প্রাপ্তবয়স্ক সদস্যের তথ্য ও NID কার্ডের ফটোকপি সংযুক্ত করা যেতে পারে)*</p>
            </div>

            {/* Section 4: Emergency Contact */}
            <div className="bg-gray-100/70 p-2 font-bold text-gray-800 text-xs border-l-4 border-emerald-800">
              ৪. জরুরি যোগাযোগ (Emergency Contact)
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pl-2">
              <p><span className="font-semibold text-gray-700">জরুরি যোগাযোগের নাম:</span> <strong>{tenant.emergencyContactName}</strong></p>
              <p><span className="font-semibold text-gray-700">ভাড়াটিয়ার সাথে সম্পর্ক:</span> {tenant.emergencyContactRelation}</p>
              <p><span className="font-semibold text-gray-700">মোবাইল নম্বর:</span> {tenant.emergencyContactPhone}</p>
              <p><span className="font-semibold text-gray-700">ঠিকানা:</span> {tenant.emergencyContactAddress}</p>
            </div>
          </div>

          {/* Declaration & Signatures */}
          <div className="mt-8 pt-4 border-t-2 border-gray-300">
            <p className="text-[11px] text-gray-700 text-justify italic">
              "আমি নিশ্চয়তা প্রদান করিতেছি যে, উপরে উল্লেখিত সকল তথ্য সত্য এবং নির্ভুল। এই বাসায় কোনো অবৈধ বা রাষ্ট্রবিরোধী কার্যকলাপ পরিচালিত হইবে না।"
            </p>

            <div className="mt-14 flex justify-between items-end text-xs font-bold text-gray-800">
              <div className="text-center">
                <div className="w-44 border-b border-black mb-1"></div>
                <p>ভাড়াটিয়ার স্বাক্ষর ও তারিখ</p>
              </div>

              <div className="text-center">
                <div className="w-44 border-b border-black mb-1"></div>
                <p>বাড়িওয়ালার স্বাক্ষর ও তারিখ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
