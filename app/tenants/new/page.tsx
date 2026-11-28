'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Users,
  Building,
  ShieldCheck,
  User,
  Phone,
  Briefcase,
  Calendar,
  Wallet,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

function NewTenantForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedFlatId = searchParams.get('flatId') || '';

  const { properties, activePropertyId, flats, addTenant, canPerformAction, triggerSubscriptionPrompt } = useApp();

  const propertyFlats = flats.filter((f) => f.propertyId === activePropertyId);

  // Form states
  const [flatId, setFlatId] = useState(preSelectedFlatId || (propertyFlats[0]?.id || ''));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nid, setNid] = useState('');
  const [occupation, setOccupation] = useState('চাকুরিজীবী');
  const [religion, setReligion] = useState('ইসলাম');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [advanceDeposit, setAdvanceDeposit] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [familyMembers, setFamilyMembers] = useState('3');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [emergencyContactAddress, setEmergencyContactAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !flatId) return;

    const check = canPerformAction('add_tenant');
    if (!check.allowed) {
      triggerSubscriptionPrompt(check.reason || 'নতুন ভাড়াটিয়া যোগ করতে প্যাকেজ সক্রিয় করুন।');
      return;
    }

    addTenant({
      propertyId: activePropertyId,
      flatId,
      name,
      phone,
      email: email.trim() || undefined,
      nid: nid.trim() || 'এনআইডি সংরক্ষিত নাই',
      occupation,
      religion,
      dateOfBirth: dateOfBirth || undefined,
      fatherName: fatherName.trim() || undefined,
      permanentAddress: permanentAddress.trim() || undefined,
      workplace: workplace.trim() || undefined,
      advanceDeposit: parseFloat(advanceDeposit) || 0,
      startDate,
      familyMembers: parseInt(familyMembers) || 1,
      emergencyContactName: emergencyContactName.trim() || 'অজ্ঞাত',
      emergencyContactRelation: emergencyContactRelation.trim() || 'আত্মীয়',
      emergencyContactPhone: emergencyContactPhone.trim() || phone,
      emergencyContactAddress: emergencyContactAddress.trim() || 'একই ঠিকানা',
      status: 'active',
    });

    router.push('/tenants');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back button & Title */}
      <div className="flex items-center gap-3">
        <Link
          href="/tenants"
          className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-700" />
            নতুন ভাড়াটিয়া নিবন্ধন (Onboarding)
          </h1>
          <p className="text-xs text-slate-500">
            ভাড়াটিয়ার সকল তথ্য পুলিশ ভেরিফিকেশন ফরম ও ডিজিটাল রসিদের সাথে স্বয়ংক্রিয়ভাবে যুক্ত হবে।
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Section 1: Flat Selection */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building className="w-4 h-4 text-emerald-600" />
            ১. ফ্ল্যাট ও ভাড়ার বিবরণ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ফ্ল্যাট নির্বাচন করুন <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={flatId}
                onChange={(e) => setFlatId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
              >
                {propertyFlats.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.status === 'vacant' ? 'খালি আছে' : 'বর্তমান ভাড়াটিয়া আছে'}) — ৳{f.rent}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ভাড়া শুরুর তারিখ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                অগ্রিম / জামানত (টাকা)
              </label>
              <input
                type="number"
                placeholder="যেমন: 36000"
                value={advanceDeposit}
                onChange={(e) => setAdvanceDeposit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Personal Information */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-emerald-600" />
            ২. ভাড়াটিয়ার ব্যক্তিগত তথ্য (পুলিশ ফরমের জন্য)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ভাড়াটিয়ার পুরো নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="যেমন: 01711223344"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                জাতীয় পরিচয়পত্র (NID) নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="১০, ১৩ বা ১৭ ডিজিটের NID"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">পিতার নাম</label>
              <input
                type="text"
                placeholder="পিতার নাম লিখুন"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">পেশা</label>
              <input
                type="text"
                placeholder="যেমন: সরকারি কর্মকর্তা / ব্যবসায়ী / শিক্ষক"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">কর্মস্থল ও ঠিকানা</label>
              <input
                type="text"
                placeholder="যেমন: সচিবালয় / মতিঝিল, ঢাকা"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ধর্ম</label>
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              >
                <option value="ইসলাম">ইসলাম</option>
                <option value="হিন্দু">হিন্দু</option>
                <option value="খ্রিস্টান">খ্রিস্টান</option>
                <option value="বৌদ্ধ">বৌদ্ধ</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">পরিবারের সদস্য সংখ্যা</label>
              <input
                type="number"
                min="1"
                value={familyMembers}
                onChange={(e) => setFamilyMembers(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">স্থায়ী ঠিকানা</label>
              <input
                type="text"
                placeholder="গ্রাম, ডাকঘর, থানা ও জেলা"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Emergency Contact */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            ৩. জরুরি যোগাযোগ (Emergency Contact)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                জরুরি ব্যক্তির নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: মোঃ ফারুক হোসেন"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">সম্পর্ক</label>
              <input
                type="text"
                placeholder="যেমন: বড় ভাই / পিতা / চাচা"
                value={emergencyContactRelation}
                onChange={(e) => setEmergencyContactRelation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                জরুরি ব্যক্তির ফোন নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="যেমন: 01812345678"
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">জরুরি ব্যক্তির ঠিকানা</label>
              <input
                type="text"
                placeholder="বর্তমান বসবাসের ঠিকানা"
                value={emergencyContactAddress}
                onChange={(e) => setEmergencyContactAddress(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex gap-4 pt-4 border-t border-slate-200">
          <Link
            href="/tenants"
            className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition text-center"
          >
            বাতিল
          </Link>
          <button
            type="submit"
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>ভাড়াটিয়া সংরক্ষণ ও পুলিশ ফরম প্রস্তুত করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewTenantPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">লোড হচ্ছে...</div>}>
      <NewTenantForm />
    </Suspense>
  );
}
