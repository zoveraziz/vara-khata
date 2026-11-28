'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
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
} from 'lucide-react';

export default function SubscriptionModal() {
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
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId>(
    subscription.planId === 'free' ? 'pro' : subscription.planId
  );
  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'bank'>('bkash');
  const [trxId, setTrxId] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(30);

  React.useEffect(() => {
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

  const handleClose = () => {
    setShowSubscriptionModal(false);
    setSubscriptionModalReason('');
    setSuccessMsg(false);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTrx = trxId.trim() || `TXN${Math.floor(100000 + Math.random() * 900000)}`;
    activateSubscription(selectedPlan, finalTrx, selectedMethod);
    setSuccessMsg(true);
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const handleInstantActivate = (plan: SubscriptionPlanId) => {
    activateSubscription(plan, `AUTO-${Date.now().toString().slice(-6)}`, 'bkash');
    setSuccessMsg(true);
    setTimeout(() => {
      handleClose();
    }, 1200);
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
                  !isExpired
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                }`}
              >
                {!isExpired ? '✓ সক্রিয় (Active)' : '✕ মেয়াদ শেষ (Expired)'}
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

        {/* Success Alert */}
        {successMsg && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-black text-emerald-950">অভিনন্দন! প্যাকেজ সফলভাবে সক্রিয় হয়েছে।</p>
              <p className="text-[11px] text-emerald-800 font-medium">আপনার সকল ফিচার এখন সম্পূর্ণ আনলক করা হয়েছে।</p>
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
          <form onSubmit={handlePaymentSubmit} className="mt-5 space-y-4 pt-4 border-t border-slate-100">
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

            {/* Payment Details Box */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-xs text-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <span>আমাদের অফিসিয়াল নম্বর:</span>
                <strong className="text-emerald-950 font-black text-sm select-all">01721-838990</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>প্রদেয় মোট পরিমাণ:</span>
                <strong className="text-emerald-800 font-black text-sm">
                  {selectedPlan === 'pro' ? '৳ ৩৯৯ (১ মাস)' : '৳ ৯৯৯ (১ মাস)'}
                </strong>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-emerald-200/60">
                * বিকাশ/নগদে Send Money বা Payment করে প্রাপ্ত ট্রানজেকশন আইডি (TrxID) নিচের বক্সে দিন।
              </p>
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
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>পেমেন্ট নিশ্চিত ও সচল করুন</span>
              </button>

              <button
                type="button"
                onClick={() => handleInstantActivate(selectedPlan)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 whitespace-nowrap"
                title="টেস্ট করার জন্য তাৎক্ষণিক আনলক করুন"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>১-ক্লিক ইনস্ট্যান্ট অ্যাক্টিভেশন (টেস্ট)</span>
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
              টেস্ট: মেয়াদ শেষ (Expire) করুন
            </button>
            <button
              type="button"
              onClick={() => {
                activateSubscription('pro');
                alert('প্রো বাড়িওয়ালা প্ল্যান ৩০ দিনের জন্য সফলভাবে সক্রিয় করা হয়েছে!');
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold hover:bg-emerald-100 transition"
            >
              টেস্ট: আনলক করুন
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
