'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { SubscriptionPlanId } from '@/types';
import {
  Crown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
  CreditCard,
  Building2,
  ShieldCheck,
  Check,
  ArrowRight,
  Clock,
  RotateCcw,
  Zap,
  MessageCircle,
  Copy,
  Phone,
} from 'lucide-react';

export default function SubscriptionModal() {
  const { currentUser } = useAuth();
  const {
    subscription,
    activateSubscription,
    expireSubscription,
    resetToFreePlan,
    showSubscriptionModal,
    setShowSubscriptionModal,
    subscriptionModalReason,
    setSubscriptionModalReason,
    flats,
    properties,
    activePropertyId,
    submitSubscriptionRequest,
  } = useApp();

  const activeProperty = properties.find((p) => p.id === activePropertyId);

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId>(
    subscription.planId === 'free' ? 'pro' : subscription.planId
  );
  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'bank'>('bkash');
  const [senderPhone, setSenderPhone] = useState(currentUser?.phone || '');
  const [trxId, setTrxId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(30);

  const OFFICIAL_PAYMENT_NUMBER = '01721838990';
  const DISPLAY_PAYMENT_NUMBER = '01721-838990';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const remaining = Math.max(
        0,
        Math.ceil(
          (new Date(subscription.validUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      );
      setDaysRemaining(remaining);
    }
  }, [subscription.validUntil]);

  if (!showSubscriptionModal) return null;

  const isExpired = subscription.status === 'expired';
  const isPending = subscription.status === 'pending';

  const handleClose = () => {
    setShowSubscriptionModal(false);
    setSubscriptionModalReason('');
    setSuccessMsg(false);
  };

  const handleCopyNumber = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(OFFICIAL_PAYMENT_NUMBER);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  const planNameBangla =
    selectedPlan === 'pro'
      ? 'প্রো বাড়িওয়ালা (১৫টি ফ্ল্যাট)'
      : selectedPlan === 'samiti'
      ? 'এপার্টমেন্ট সমিতি (আনলিমিটেড)'
      : 'ফ্রি ট্রায়াল';

  const planPrice = selectedPlan === 'pro' ? 399 : selectedPlan === 'samiti' ? 999 : 0;

  // WhatsApp Pre-filled Link Builder
  const buildWhatsAppPaymentUrl = () => {
    const text =
      `আসসালামু আলাইকুম, আমি ‘ভাড়া খাতা’ সফটওয়্যারের প্যাকেজের জন্য পেমেন্ট করেছি:\n\n` +
      `📋 পেমেন্টের বিবরণ:\n` +
      `• বাড়িওয়ালার নাম: ${currentUser?.name || 'বাড়ির মালিক'}\n` +
      `• ভবনের নাম: ${activeProperty?.name || 'আমার ভবন'}\n` +
      `• মোবাইল নম্বর: ${senderPhone || currentUser?.phone || 'দেওয়া হয়নি'}\n` +
      `• প্যাকেজ: ${planNameBangla}\n` +
      `• প্রদেয় ফি: ৳${planPrice}\n` +
      `• পেমেন্ট মাধ্যম: ${selectedMethod.toUpperCase()}\n` +
      `• ট্রানজেকশন আইডি (TrxID): ${trxId.trim() || 'সংযুক্ত স্ক্রিনশটে দেখুন'}\n\n` +
      `📷 নিচে আমার পেমেন্টের স্ক্রিনশটটি পাঠাচ্ছি। অনুগ্রহ করে যাচাই করে প্যাকেজটি সক্রিয় করে দিন। ধন্যবাদ!`;

    return `https://wa.me/8801721838990?text=${encodeURIComponent(text)}`;
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    submitSubscriptionRequest({
      planId: selectedPlan,
      method: selectedMethod,
      senderPhone: senderPhone || currentUser?.phone || '01700000000',
      trxId: trxId.trim() || 'WhatsApp-এ স্ক্রিনশট দেখুন',
      userName: currentUser?.name || 'বাড়ির মালিক',
      userPhone: currentUser?.phone || senderPhone,
      propertyName: activeProperty?.name || 'আমার ভবন',
    });

    const url = buildWhatsAppPaymentUrl();
    window.open(url, '_blank');
    setSuccessMsg(true);
  };

  const handleSubmitOnly = (e: React.FormEvent) => {
    e.preventDefault();
    submitSubscriptionRequest({
      planId: selectedPlan,
      method: selectedMethod,
      senderPhone: senderPhone || currentUser?.phone || '01700000000',
      trxId: trxId.trim() || `TXN${Math.floor(100000 + Math.random() * 900000)}`,
      userName: currentUser?.name || 'বাড়ির মালিক',
      userPhone: currentUser?.phone || senderPhone,
      propertyName: activeProperty?.name || 'আমার ভবন',
    });
    setSuccessMsg(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-5 sm:p-7 text-slate-900 border border-slate-100 relative my-6 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 sm:right-6 top-4 sm:top-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              বাড়িওয়ালা সাবস্ক্রিপশন ও প্যাকেজ
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              আপনার বাড়ি বা ভবনের ডিজিটাল খাতা নিরবচ্ছিন্ন ও সচল রাখুন।
            </p>
          </div>
        </div>

        {/* Trigger Alert Reason Banner */}
        {subscriptionModalReason && (
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900 font-semibold shadow-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">ফিচারটি সাময়িকভাবে লক রয়েছে:</p>
              <p className="mt-0.5 text-amber-800">{subscriptionModalReason}</p>
            </div>
          </div>
        )}

        {/* Current Plan Status Card */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">বর্তমান প্যাকেজ:</span>
            <div className="flex items-center gap-2 mt-0.5">
              <strong className="text-sm sm:text-base font-black text-slate-900">
                {subscription.planName}
              </strong>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isPending
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                    : !isExpired
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                }`}
              >
                {isPending
                  ? '⏳ পেমেন্ট যাচাই চলছে (In Processing)'
                  : !isExpired
                  ? '✓ সক্রিয় (Active)'
                  : '✕ মেয়াদ শেষ (Expired)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              মোট ফ্ল্যাট পরিচালিত: <strong>{flats.length} টি</strong> (কোটা সীমা: {subscription.maxFlats} টি)
            </p>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
            <span className="text-[11px] text-slate-500 font-semibold block">মেয়াদ ও স্থায়িত্ব:</span>
            <strong className={`text-xs sm:text-sm font-bold block ${isExpired ? 'text-rose-600 font-black' : 'text-slate-800'}`}>
              {!isExpired ? `${daysRemaining} দিন বাকি` : 'মেয়াদ শেষ হয়ে গেছে'}
            </strong>
            <span className="text-[10px] text-slate-400">
              মেয়াদ তারিখ: {new Date(subscription.validUntil).toLocaleDateString('bn-BD')}
            </span>
          </div>
        </div>

        {/* If In Processing (Pending Approval) Notice Card */}
        {isPending && (
          <div className="mt-4 p-4 bg-amber-50/80 border border-amber-300 rounded-2xl text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              <span>আপনার পেমেন্ট বর্তমানে যাচাইকরণ প্রক্রিয়ায় রয়েছে (In Processing)</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
              আপনার পেমেন্টের তথ্য গৃহীত হয়েছে। আমাদের অ্যাডমিন টিম বিকাশ/নগদ স্টেটমেন্ট চেক করার সাথে সাথেই (সর্বোচ্চ ৫–১৫ মিনিটের মধ্যে) আপনার প্যাকেজটি চালু করে দেবে।
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={buildWhatsAppPaymentUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>হোয়াটসঅ্যাপে তাগাদা বা স্ক্রিনশট দিন</span>
              </a>
              <button
                type="button"
                onClick={() => activateSubscription(selectedPlan)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] transition"
              >
                টেস্ট মোড: এখনই সচল করুন
              </button>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-black text-emerald-950">পেমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে!</p>
              <p className="text-[11px] text-emerald-800 font-medium">অ্যাডমিন টিম বিকাশ/নগদ যাচাই করার সাথে সাথেই প্যাকেজ চালু হয়ে যাবে।</p>
            </div>
          </div>
        )}

        {/* Plan Selection Cards */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            কাঙ্ক্ষিত প্যাকেজ নির্বাচন করুন:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Pro Plan */}
            <div
              onClick={() => setSelectedPlan('pro')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                selectedPlan === 'pro'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="absolute -top-2.5 right-3 bg-emerald-700 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                জনপ্রিয়
              </span>
              <h4 className="font-black text-sm text-slate-900">প্রো বাড়িওয়ালা</h4>
              <p className="text-base font-black text-emerald-700 mt-1">
                ৳ ৩৯৯ <span className="text-[10px] font-normal text-slate-500">/মাস</span>
              </p>
              <ul className="text-[11px] text-slate-600 mt-2 space-y-1">
                <li className="flex items-center gap-1">✓ ১৫টি ফ্ল্যাট পর্যন্ত</li>
                <li className="flex items-center gap-1">✓ আনলিমিটেড রসিদ ও বিল</li>
                <li className="flex items-center gap-1">✓ অটো রিমাইন্ডার সুবিধা</li>
              </ul>
            </div>

            {/* Samiti Plan */}
            <div
              onClick={() => setSelectedPlan('samiti')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                selectedPlan === 'samiti'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <h4 className="font-black text-sm text-slate-900">এপার্টমেন্ট সমিতি</h4>
              <p className="text-base font-black text-slate-900 mt-1">
                ৳ ৯৯৯ <span className="text-[10px] font-normal text-slate-500">/মাস</span>
              </p>
              <ul className="text-[11px] text-slate-600 mt-2 space-y-1">
                <li className="flex items-center gap-1">✓ আনলিমিটেড ফ্ল্যাট</li>
                <li className="flex items-center gap-1">✓ মাল্টি-ম্যানেজার এক্সেস</li>
                <li className="flex items-center gap-1">✓ সমিতি অডিট খাতা</li>
              </ul>
            </div>

            {/* Free Plan */}
            <div
              onClick={() => setSelectedPlan('free')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                selectedPlan === 'free'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <h4 className="font-black text-sm text-slate-900">ফ্রি ট্রায়াল</h4>
              <p className="text-base font-black text-slate-900 mt-1">
                ৳ ০ <span className="text-[10px] font-normal text-slate-500">/আজীবন</span>
              </p>
              <ul className="text-[11px] text-slate-600 mt-2 space-y-1">
                <li className="flex items-center gap-1">✓ সর্বোচ্চ ৩টি ফ্ল্যাট</li>
                <li className="flex items-center gap-1">✓ সাব-মিটার ক্যালকুলেটর</li>
                <li className="flex items-center gap-1">✓ ডিজিটাল মানি রিসিট</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Channels and Form (Only if paid plan chosen) */}
        {selectedPlan !== 'free' ? (
          <form className="mt-5 space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                পেমেন্ট মাধ্যম বেছে নিন:
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('bkash')}
                  className={`py-2 px-2 rounded-xl border text-center transition ${
                    selectedMethod === 'bkash'
                      ? 'border-[#E2136E] bg-[#E2136E]/10 text-[#E2136E] font-black'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  বিকাশ
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('nagad')}
                  className={`py-2 px-2 rounded-xl border text-center transition ${
                    selectedMethod === 'nagad'
                      ? 'border-[#F7941D] bg-[#F7941D]/10 text-[#F7941D] font-black'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  নগদ
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('rocket')}
                  className={`py-2 px-2 rounded-xl border text-center transition ${
                    selectedMethod === 'rocket'
                      ? 'border-[#8C3494] bg-[#8C3494]/10 text-[#8C3494] font-black'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  রকেট
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('bank')}
                  className={`py-2 px-2 rounded-xl border text-center transition ${
                    selectedMethod === 'bank'
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-800 font-black'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ব্যাংক
                </button>
              </div>
            </div>

            {/* Official Payment Number Box with 1-Click Copy */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-xs text-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">আমাদের অফিশিয়াল বিকাশ/নগদ নম্বর:</span>
                <div className="flex items-center gap-2">
                  <strong className="text-emerald-950 font-black text-sm select-all">
                    {DISPLAY_PAYMENT_NUMBER}
                  </strong>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="px-2 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] transition flex items-center gap-1 shadow-2xs"
                  >
                    {copiedNumber ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
                    <span>{copiedNumber ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">প্রদেয় মোট পরিমাণ:</span>
                <strong className="text-emerald-800 font-black text-base">
                  ৳ {planPrice} <span className="text-xs font-normal text-slate-600">(১ মাস)</span>
                </strong>
              </div>
            </div>

            {/* User Requested Simple 1-2 Line Instruction Box */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3.5 text-xs text-amber-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>পেমেন্ট ও সক্রিয়করণের সহজ নিয়ম:</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-amber-900 font-medium">
                বিকাশ বা নগদে টাকা পাঠিয়ে নিচের বোতামে চাপ দিয়ে হোয়াটসঅ্যাপে স্ক্রিনশট ও ট্রানজেকশন আইডি পাঠান। আমাদের অ্যাডমিন টিম সর্বোচ্চ ৫-১০ মিনিটের মধ্যে পেমেন্ট যাচাই করে প্যাকেজটি চালু করে দেবে।
              </p>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  যে নম্বর থেকে টাকা পাঠিয়েছেন <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="যেমন: 017xxxxxxxx"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ট্রানজেকশন আইডি (TrxID)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: 9M8A2B7K1X (ঐচ্ছিক)"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
                />
              </div>
            </div>

            {/* Action Buttons: WhatsApp Send & Submit */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                title="হোয়াটসঅ্যাপে সরাসরি স্ক্রিনশট ও বিবরণ পাঠান"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp-এ পেমেন্ট স্ক্রিনশট পাঠান</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitOnly}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>পেমেন্ট তথ্য সাবমিট করুন</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => {
                resetToFreePlan();
                setSuccessMsg(true);
                setTimeout(handleClose, 1000);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition"
            >
              ফ্রি প্ল্যানে সেট করুন (সর্বোচ্চ ৩টি ফ্ল্যাট)
            </button>
          </div>
        )}

        {/* Developer / Testing Controls Strip */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-600">লক ও আনলক টেস্ট টুলস:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                expireSubscription();
                alert('সাবস্ক্রিপশন মেয়াদ শেষ (Expired) করা হয়েছে! এখন ফিচারগুলো লক থাকবে।');
              }}
              className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-bold hover:bg-rose-100 transition"
            >
              টেস্ট: মেয়াদ শেষ (Expire)
            </button>
            <button
              type="button"
              onClick={() => {
                activateSubscription('pro');
                alert('প্রো বাড়িওয়ালা প্ল্যান ৩০ দিনের জন্য সফলভাবে সক্রিয় করা হয়েছে!');
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold hover:bg-emerald-100 transition"
            >
              টেস্ট: অনুমোদন (Approve)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
