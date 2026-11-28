'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { ReminderChannel, Tenant, Flat, Bill } from '@/types';
import {
  Bell,
  Send,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Phone,
  ShieldCheck,
  Zap,
  Check,
  ExternalLink,
  Info,
  DollarSign,
  Search,
  Filter,
} from 'lucide-react';
import Link from 'next/link';

export default function RemindersPage() {
  const { currentUser } = useAuth();
  const {
    properties,
    activePropertyId,
    flats,
    tenants,
    bills,
    reminderSettings,
    updateReminderSettings,
    reminderLogs,
    rechargeSms,
    sendBulkReminders,
    canPerformAction,
    triggerSubscriptionPrompt,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'settings' | 'logs'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSendingBulk, setIsSendingBulk] = useState(false);

  // Settings form local state
  const [enabled, setEnabled] = useState(reminderSettings.enabled);
  const [channel, setChannel] = useState<ReminderChannel>(reminderSettings.channel);
  const [startDay, setStartDay] = useState(reminderSettings.startDay);
  const [endDay, setEndDay] = useState(reminderSettings.endDay);
  const [sendTime, setSendTime] = useState(reminderSettings.sendTime);
  const [customNote, setCustomNote] = useState(reminderSettings.customNote || '');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const activeProperty = properties.find((p) => p.id === activePropertyId);

  // Identify unpaid or partial bills for current property
  const unpaidList = bills
    .filter((b) => b.propertyId === activePropertyId && b.dueAmount > 0)
    .map((bill) => {
      const flat = flats.find((f) => f.id === bill.flatId);
      const tenant = tenants.find((t) => t.id === bill.tenantId);
      return { bill, flat, tenant };
    })
    .filter((item): item is { bill: Bill; flat: Flat; tenant: Tenant } => 
      item.flat !== undefined && item.tenant !== undefined
    )
    .filter((item) => {
      const query = searchTerm.toLowerCase();
      return (
        item.tenant.name.toLowerCase().includes(query) ||
        item.tenant.phone.includes(query) ||
        item.flat.name.toLowerCase().includes(query)
      );
    });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateReminderSettings({
      enabled,
      channel,
      startDay,
      endDay,
      sendTime,
      customNote,
    });
    setSettingsSaved(true);
    showToast('স্মার্ট রিমাইন্ডার সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!');
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleRecharge = (amount: number, cost: number) => {
    rechargeSms(amount);
    showToast(`অভিনন্দন! ৳${cost} পরিশোধ করে ${amount} টি এসএমএস ব্যালেন্স রিচার্জ সম্পন্ন হয়েছে।`);
  };

  // Build personalized message text
  const getMessageText = (tenantName: string, flatName: string, month: string, amount: number) => {
    return `আসসালামু আলাইকুম ${tenantName} সাহেব,
${activeProperty?.name || 'বাড়ি'} (${flatName})-এর ${month} মাসের ভাড়া ও ইউটিলিটি বিল বাবদ মোট ৳${amount.toLocaleString()} টাকা বকেয়া রয়েছে।
অনুগ্রহ করে আগামী ${endDay} তারিখের মধ্যে ভাড়া পরিশোধ করার জন্য বিনীত অনুরোধ করা হলো।
${customNote ? `\nবিশেষ দ্রষ্টব্য: ${customNote}` : ''}
— বাড়িওয়ালা (${currentUser?.name || 'হাজী মোঃ আব্দুল খালেক'})`;
  };

  // WhatsApp 1-click URL
  const getWhatsAppLink = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const fullPhone = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone}`;
    return `https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(text)}`;
  };

  // Send single reminder
  const handleSendSingle = (item: { tenant: Tenant; flat: Flat; bill: Bill }, targetChannel: ReminderChannel) => {
    const check = canPerformAction('send_sms');
    if (!check.allowed) {
      triggerSubscriptionPrompt(check.reason || 'অটো রিমাইন্ডার সেবা পেতে সাবস্ক্রিপশন সচল করুন।');
      return;
    }
    sendBulkReminders([item]);
    showToast(`${item.tenant.name} (${item.flat.name})-কে রিমাইন্ডার পাঠানো সম্পন্ন হয়েছে!`);
  };

  // Send bulk reminders to all unpaid tenants
  const handleSendAll = () => {
    const check = canPerformAction('send_sms');
    if (!check.allowed) {
      triggerSubscriptionPrompt(check.reason || 'অটো রিমাইন্ডার সেবা পেতে সাবস্ক্রিপশন সচল করুন।');
      return;
    }
    if (unpaidList.length === 0) {
      showToast('কোনো বকেয়া ভাড়াটিয়া নেই!');
      return;
    }
    if ((reminderSettings.channel === 'sms' || reminderSettings.channel === 'both') && reminderSettings.smsBalance < unpaidList.length) {
      showToast('আপনার পর্যাপ্ত SMS ব্যালেন্স নেই! দয়া করে রিচার্জ করুন।');
      return;
    }

    setIsSendingBulk(true);
    setTimeout(() => {
      const count = sendBulkReminders(unpaidList);
      setIsSendingBulk(false);
      showToast(`মোট ${count} জন বকেয়া ভাড়াটিয়াকে সফলভাবে রিমাইন্ডার পাঠানো হয়েছে!`);
    }, 600);
  };

  // Sample preview tenant
  const previewTenant = unpaidList[0]?.tenant?.name || 'তানভীর আহমেদ';
  const previewFlat = unpaidList[0]?.flat?.name || 'ফ্ল্যাট ১-বি (1B)';
  const previewAmount = unpaidList[0]?.bill?.dueAmount || 19980;
  const previewMonth = unpaidList[0]?.bill?.monthName || 'নভেম্বর ২০২৬';
  const sampleMessage = getMessageText(previewTenant, previewFlat, previewMonth, previewAmount);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>স্বয়ংক্রিয় ভাড়া নোটিফিকেশন ইঞ্জিন</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>অটো ভাড়া রিমাইন্ডার</span>
              <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                reminderSettings.enabled 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' 
                  : 'bg-rose-500/20 text-rose-300 border-rose-400/40'
              }`}>
                {reminderSettings.enabled ? '● সক্রিয় (Active)' : '○ নিষ্ক্রিয় (Disabled)'}
              </span>
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              প্রতি মাসের ১ থেকে ৫ তারিখ শুধুমাত্র বকেয়া থাকা ভাড়াটিয়াদের মোবাইল এসএমএস ও হোয়াটসঅ্যাপে স্বয়ংক্রিয় তাগাদা বার্তা পাঠানো হয়। ভাড়া পরিশোধ হলে স্বয়ংক্রিয়ভাবে মেসেজ বন্ধ হয়ে যায়।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div>
              <p className="text-[11px] font-bold text-emerald-200">বর্তমান এসএমএস ব্যালেন্স</p>
              <p className="text-2xl font-black text-white">{reminderSettings.smsBalance} <span className="text-xs font-normal text-emerald-300">টি</span></p>
            </div>
            <button
              onClick={() => handleRecharge(100, 50)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3 py-2 rounded-xl transition shadow-sm active:scale-95"
            >
              + ১০০ রিচার্জ (৳৫০)
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'pending'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>আজকের বকেয়া তালিকা ({unpaidList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'settings'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>শিডিউল ও মেসেজ সেটিংস</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'logs'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>ডেলিভারি হিস্ট্রি ({reminderLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: Unpaid Queue & Instant Send */}
      {activeTab === 'pending' && (
        <div className="space-y-6">
          {/* Quick Action Header Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span>বকেয়া থাকা ভাড়াটিয়াদের তালিকা ({activeProperty?.name})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                যাঁদের চলতি মাসে এখনও ভাড়া ও ইউটিলিটি বিল বকেয়া রয়েছে, তাঁদের সরাসরি বা একসাথে রিমাইন্ডার পাঠান।
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="ভাড়াটিয়া বা ফ্ল্যাট খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-emerald-600 focus:bg-white"
                />
              </div>

              <button
                onClick={handleSendAll}
                disabled={isSendingBulk || unpaidList.length === 0}
                className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition active:scale-95 whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span>{isSendingBulk ? 'পাঠানো হচ্ছে...' : `সকলকে একসাথে রিমাইন্ডার পাঠান (${unpaidList.length})`}</span>
              </button>
            </div>
          </div>

          {/* Tenants Queue Table */}
          {unpaidList.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">মাশাআল্লাহ! কোনো ভাড়া বকেয়া নেই</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                এই প্রপার্টির সকল ভাড়াটিয়া চলতি মাসের ভাড়া সম্পূর্ণ পরিশোধ করেছেন। স্বয়ংক্রিয় রিমাইন্ডার কোনো মেসেজ পাঠাবে না।
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[850px] text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold whitespace-nowrap">
                    <tr>
                      <th className="py-3.5 px-4 whitespace-nowrap">ভাড়াটিয়া ও ফ্ল্যাট</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">মোবাইল নম্বর</th>
                      <th className="py-3.5 px-4 text-right whitespace-nowrap">বকেয়া পরিমাণ</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">মাধ্যম</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">স্ট্যাটাস</th>
                      <th className="py-3.5 px-4 text-right whitespace-nowrap">তাৎক্ষণিক অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {unpaidList.map((item) => {
                      const msgText = getMessageText(
                        item.tenant.name,
                        item.flat.name,
                        item.bill.monthName,
                        item.bill.dueAmount
                      );
                      const waLink = getWhatsAppLink(item.tenant.phone, msgText);

                      return (
                        <tr key={item.bill.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-bold text-slate-900">{item.tenant.name}</div>
                            <div className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5 border border-emerald-200/60">
                              {item.flat.name}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-700 whitespace-nowrap">
                            {item.tenant.phone}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="font-black text-rose-600 text-sm sm:text-base">
                              ৳ {item.bill.dueAmount.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-slate-400">মোট বিল: ৳{item.bill.totalAmount.toLocaleString()}</div>
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {reminderSettings.channel === 'both' ? 'SMS + WhatsApp' : reminderSettings.channel === 'sms' ? 'Mobile SMS' : 'WhatsApp'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              আজকের তাগাদা বাকি
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center justify-end gap-2 whitespace-nowrap">
                              {/* WhatsApp Direct Link */}
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-xs transition shrink-0"
                                title="হোয়াটসঅ্যাপে পাঠান"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>হোয়াটসঅ্যাপ</span>
                              </a>

                              {/* Simulated SMS Send */}
                              <button
                                onClick={() => handleSendSingle(item, 'sms')}
                                className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-xs transition shrink-0"
                                title="মোবাইল এসএমএস পাঠান"
                              >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>SMS</span>
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
          )}

          {/* Explanation Box */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5">
            <h4 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>স্বয়ংক্রিয় ১ থেকে ৫ তারিখ ফিল্টারিং নীতি:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-emerald-900/90 font-medium leading-relaxed">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-bold text-emerald-950 mb-1">১. শুধুমাত্র বকেয়া তালিকা</p>
                যেসব ভাড়াটিয়া মাসের ১ তারিখেও ভাড়া দেননি, কেবল তাঁদের মোবাইল ও হোয়াটসঅ্যাপে রিমাইন্ডার মেসেজ শিডিউল হবে।
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-bold text-emerald-950 mb-1">২. পরিশোধের সাথে সাথে স্টপ</p>
                ভাড়াটিয়া ভাড়া দেওয়ার পর ড্যাশবোর্ডে পেমেন্ট রেকর্ড করার সাথে সাথে তাঁকে স্বয়ংক্রিয়ভাবে তালিকা থেকে বাদ দেওয়া হয়।
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-bold text-emerald-950 mb-1">৩. বাটন ফোনেও কার্যকরী</p>
                এসএমএস মোড চালু রাখলে ইন্টারনেট বা স্মার্টফোন ছাড়া যেকোনো সাধারণ মোবাইল ফোনেও বাংলা মেসেজ পৌঁছে যাবে।
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Settings & Message Template Preview */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Settings Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-700" />
                <span>স্বয়ংক্রিয় রিমাইন্ডার শিডিউল কনফিগারেশন</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                মাসিক ভাড়ার নোটিফিকেশন পাঠানোর তারিখ, সময় ও চ্যানেল নির্বাচন করুন।
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              {/* Active Switch */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-sm font-bold text-slate-900">অটো রিমাইন্ডার ইঞ্জিন চালু রাখুন</span>
                  <p className="text-xs text-slate-500">অন থাকলে নির্ধারিত তারিখে স্বয়ংক্রিয়ভাবে মেসেজ ট্রিগার হবে</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Delivery Channel Radio Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">মেসেজ প্রেরণের মাধ্যম (Delivery Channel):</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Both */}
                  <label
                    onClick={() => setChannel('both')}
                    className={`cursor-pointer p-3.5 rounded-xl border flex flex-col justify-between transition ${
                      channel === 'both'
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-slate-900">উভয় মাধ্যম</span>
                      {channel === 'both' && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                    </div>
                    <span className="text-[11px] text-slate-500">SMS এবং WhatsApp দুটোতেই যাবে (রেকমেন্ডেড)</span>
                  </label>

                  {/* SMS only */}
                  <label
                    onClick={() => setChannel('sms')}
                    className={`cursor-pointer p-3.5 rounded-xl border flex flex-col justify-between transition ${
                      channel === 'sms'
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-slate-900">শুধু মোবাইল SMS</span>
                      {channel === 'sms' && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                    </div>
                    <span className="text-[11px] text-slate-500">বাটন ফোনেও যাবে, ইন্টারনেট প্রয়োজন নেই</span>
                  </label>

                  {/* WhatsApp only */}
                  <label
                    onClick={() => setChannel('whatsapp')}
                    className={`cursor-pointer p-3.5 rounded-xl border flex flex-col justify-between transition ${
                      channel === 'whatsapp'
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-slate-900">শুধু WhatsApp</span>
                      {channel === 'whatsapp' && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                    </div>
                    <span className="text-[11px] text-slate-500">সম্পূর্ণ ফ্রি, নোটিফিকেশন মিস হয় না</span>
                  </label>
                </div>
              </div>

              {/* Day Range & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শুরুর তারিখ (মাসের):</label>
                  <select
                    value={startDay}
                    onChange={(e) => setStartDay(Number(e.target.value))}
                    className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-emerald-600"
                  >
                    <option value={1}>১ তারিখ (Default)</option>
                    <option value={2}>২ তারিখ</option>
                    <option value={3}>৩ তারিখ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শেষ তারিখ (মাসের):</label>
                  <select
                    value={endDay}
                    onChange={(e) => setEndDay(Number(e.target.value))}
                    className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-emerald-600"
                  >
                    <option value={5}>৫ তারিখ (Default)</option>
                    <option value={7}>৭ তারিখ</option>
                    <option value={10}>১০ তারিখ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মেসেজ পাঠানোর সময়:</label>
                  <select
                    value={sendTime}
                    onChange={(e) => setSendTime(e.target.value)}
                    className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-emerald-600"
                  >
                    <option value="09:00 AM">সকাল ৯:০০ AM</option>
                    <option value="10:00 AM">সকাল ১০:০০ AM (Default)</option>
                    <option value="11:00 AM">সকাল ১১:০০ AM</option>
                    <option value="04:00 PM">বিকাল ৪:০০ PM</option>
                  </select>
                </div>
              </div>

              {/* Custom Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বিশেষ নির্দেশনা / পেমেন্ট নির্দেশিকা (ঐচ্ছিক):
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="যেমন: বিকাশ অথবা নগদ এ পাঠালে দয়া করে রেফারেন্সে আপনার ফ্ল্যাট নম্বর দিন।"
                  className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 focus:outline-emerald-600 leading-relaxed"
                ></textarea>
                <p className="text-[11px] text-slate-400 mt-1">এই নোটটি মেসেজের শেষে স্বয়ংক্রিয়ভাবে জুড়ে যাবে।</p>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {settingsSaved ? '✅ সেটিংস সংরক্ষিত!' : 'পরিবর্তন সম্পন্ন হলে সংরক্ষণ করুন'}
                </span>
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition active:scale-95"
                >
                  সেটিংস সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>

          {/* Live Mobile Message Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>লাইভ মেসেজ প্রিভিউ (ভাড়াটিয়ার মোবাইল স্ক্রিন)</span>
              </h3>

              {/* Simulated Mobile Mockup */}
              <div className="bg-slate-900 rounded-3xl p-3 shadow-xl max-w-sm mx-auto border-4 border-slate-800 text-white">
                {/* Mobile top status bar */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 px-3 py-1 border-b border-slate-800 mb-2">
                  <span>10:00 AM</span>
                  <div className="flex items-center gap-1">
                    <span>4G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Sender Header */}
                <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-800/80 rounded-xl mb-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                    ভ
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">ভাড়া খাতা ({activeProperty?.name})</p>
                    <p className="text-[10px] text-emerald-400">অফিসিয়াল নোটিফিকেশন</p>
                  </div>
                </div>

                {/* Message Bubble */}
                <div className="bg-emerald-950/80 border border-emerald-700/50 rounded-2xl p-3.5 text-xs text-slate-100 space-y-2 leading-relaxed">
                  <p className="whitespace-pre-line text-[11px] sm:text-xs">
                    {sampleMessage}
                  </p>
                  <div className="text-[9px] text-emerald-300/70 text-right pt-1 border-t border-emerald-800/60">
                    আজ সকাল ১০:০০ AM • ডেলিভার্ড ✓
                  </div>
                </div>
              </div>

              {/* Tags Helper */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-600 mb-1.5">ডাইনামিক অটো-ট্যাগিং:</p>
                <div className="flex flex-wrap gap-1 text-[10px] text-emerald-800 font-mono">
                  <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">ভাড়াটিয়ার নাম</span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">ফ্ল্যাট নম্বর</span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">বকেয়া টাকা</span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">বিল্ডিং নাম</span>
                </div>
              </div>
            </div>

            {/* SMS Recharge Pricing Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>এসএমএস প্যাক রিচার্জ (সরাসরি রেট)</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">প্রতি এসএমএস মাত্র ৪০ পয়সা (Banglalink/Grameenphone/Robi/Teletalk)</p>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleRecharge(100, 50)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-center transition"
                >
                  <div className="font-black text-slate-900 text-sm">১০০ SMS</div>
                  <div className="text-xs font-bold text-emerald-700">৳ ৫০</div>
                </button>
                <button
                  onClick={() => handleRecharge(300, 130)}
                  className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50 text-center transition ring-1 ring-emerald-400"
                >
                  <div className="font-black text-slate-900 text-sm">৩০০ SMS</div>
                  <div className="text-xs font-bold text-emerald-700">৳ ১৩০</div>
                </button>
                <button
                  onClick={() => handleRecharge(500, 200)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-center transition"
                >
                  <div className="font-black text-slate-900 text-sm">৫০০ SMS</div>
                  <div className="text-xs font-bold text-emerald-700">৳ ২০০</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Delivery Logs & History */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>রিমাইন্ডার ডেলিভারি লগ ও অডিট হিস্ট্রি</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                কোন ভাড়াটিয়াকে কবে, কোন সময়ে এবং কোন মাধ্যমে নোটিফিকেশন গিয়েছে তার সম্পূর্ণ রেকর্ড।
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              মোট প্রেরিত: {reminderLogs.length} টি
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[850px] text-left text-xs sm:text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold whitespace-nowrap">
                <tr>
                  <th className="py-3 px-4 whitespace-nowrap">তারিখ ও সময়</th>
                  <th className="py-3 px-4 whitespace-nowrap">ভাড়াটিয়ার নাম</th>
                  <th className="py-3 px-4 whitespace-nowrap">ফ্ল্যাট নম্বর</th>
                  <th className="py-3 px-4 whitespace-nowrap">মোবাইল</th>
                  <th className="py-3 px-4 text-right whitespace-nowrap">বকেয়া টাকা</th>
                  <th className="py-3 px-4 text-center whitespace-nowrap">মাধ্যম</th>
                  <th className="py-3 px-4 text-center whitespace-nowrap">ডেলিভারি স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {reminderLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono text-xs text-slate-600 whitespace-nowrap">
                      {log.sentAt}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {log.tenantName}
                    </td>
                    <td className="py-3 px-4 text-emerald-800 font-bold whitespace-nowrap">
                      {log.flatName}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                      {log.phone}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-rose-600 whitespace-nowrap">
                      ৳ {log.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {log.channel === 'both' ? 'SMS + WhatsApp' : log.channel === 'sms' ? 'SMS' : 'WhatsApp'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <Check className="w-3 h-3 text-emerald-600" />
                        সফলভাবে প্রেরিত
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
