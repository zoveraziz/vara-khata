'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Flat } from '@/types';
import {
  Building2,
  Plus,
  Zap,
  User,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  Edit2,
  Home,
} from 'lucide-react';
import Link from 'next/link';

export default function FlatsPage() {
  const { properties, activePropertyId, flats, tenants, addFlat, updateFlat, deleteFlat } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'occupied' | 'vacant'>('all');

  // Form states
  const [name, setName] = useState('');
  const [floor, setFloor] = useState('1');
  const [rent, setRent] = useState('');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [balconies, setBalconies] = useState('1');
  const [meterNo, setMeterNo] = useState('');
  const [lastMeterReading, setLastMeterReading] = useState('0');
  const [gasBill, setGasBill] = useState('1080');
  const [waterBill, setWaterBill] = useState('500');
  const [serviceCharge, setServiceCharge] = useState('1200');

  const activeProperty = properties.find((p) => p.id === activePropertyId);
  const propertyFlats = flats.filter((f) => f.propertyId === activePropertyId);

  const filteredFlats = propertyFlats.filter((f) => {
    if (filterStatus === 'all') return true;
    return f.status === filterStatus;
  });

  const handleAddFlat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rent) return;

    addFlat({
      propertyId: activePropertyId,
      name,
      floor: parseInt(floor) || 1,
      rent: parseFloat(rent) || 0,
      bedrooms: parseInt(bedrooms) || 1,
      bathrooms: parseInt(bathrooms) || 1,
      balconies: parseInt(balconies) || 0,
      meterNo: meterNo.trim() || 'মিটার নাই',
      lastMeterReading: parseFloat(lastMeterReading) || 0,
      gasBill: parseFloat(gasBill) || 0,
      waterBill: parseFloat(waterBill) || 0,
      serviceCharge: parseFloat(serviceCharge) || 0,
      status: 'vacant',
    });

    setName('');
    setRent('');
    setMeterNo('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-700" />
            ফ্ল্যাট ও রুম ব্যবস্থাপনা
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {activeProperty?.name} — প্রতিটি ইউনিটের ভাড়া, সাব-মিটার এবং ইউটিলিটি নির্ধারণ করুন।
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ফ্ল্যাট যোগ করুন</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
            filterStatus === 'all'
              ? 'bg-emerald-800 text-white shadow'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          সকল ফ্ল্যাট ({propertyFlats.length})
        </button>
        <button
          onClick={() => setFilterStatus('occupied')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
            filterStatus === 'occupied'
              ? 'bg-emerald-800 text-white shadow'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          ভাড়া দেওয়া ({propertyFlats.filter((f) => f.status === 'occupied').length})
        </button>
        <button
          onClick={() => setFilterStatus('vacant')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
            filterStatus === 'vacant'
              ? 'bg-emerald-800 text-white shadow'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          খালি রয়েছে ({propertyFlats.filter((f) => f.status === 'vacant').length})
        </button>
      </div>

      {/* Flats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFlats.map((flat) => {
          const tenant = tenants.find((t) => t.id === flat.currentTenantId);

          return (
            <div
              key={flat.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-black text-slate-900">{flat.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{flat.floor} তলা</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      flat.status === 'occupied'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {flat.status === 'occupied' ? 'ভাড়া হয়েছে' : 'খালি আছে'}
                  </span>
                </div>

                {/* Flat Details */}
                <div className="mt-3 py-2 border-y border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">বেডরুম</span>
                    <strong className="text-slate-800">{flat.bedrooms} টি</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">বাথরুম</span>
                    <strong className="text-slate-800">{flat.bathrooms} টি</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">বারান্দা</span>
                    <strong className="text-slate-800">{flat.balconies} টি</strong>
                  </div>
                </div>

                {/* Financial & Meter */}
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">মূল বাড়িভাড়া:</span>
                    <strong className="text-emerald-700 font-bold text-sm">
                      ৳ {flat.rent.toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>গ্যাস + পানি + সার্ভিস:</span>
                    <span>৳ {flat.gasBill + flat.waterBill + flat.serviceCharge}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500" /> সাব-মিটার:
                    </span>
                    <span className="font-mono">{flat.meterNo} (রিডিং: {flat.lastMeterReading})</span>
                  </div>
                </div>

                {/* Tenant Info */}
                <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  {flat.status === 'occupied' && tenant ? (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px]">বর্তমান ভাড়াটিয়া:</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">{tenant.phone}</span>
                      </div>
                      <div className="font-bold text-slate-900 mt-0.5">{tenant.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{tenant.occupation}</div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-amber-800">
                      <span>বর্তমানে কোনো ভাড়াটিয়া নেই</span>
                      <Link
                        href={`/tenants/new?flatId=${flat.id}`}
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        ভাড়াটিয়া বসান
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={() => deleteFlat(flat.id)}
                  title="ফ্ল্যাট মুছুন"
                  className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {flat.status === 'vacant' && (
                  <Link
                    href={`/to-let?flatId=${flat.id}`}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>টু-লেট পোস্টার তৈরি</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Flat Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 text-gray-900 border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                নতুন ফ্ল্যাট বা রুম যোগ করুন
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFlat} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ফ্ল্যাট বা রুমের নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ফ্ল্যাট ৩-এ (3A)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">তলা নম্বর</label>
                  <input
                    type="number"
                    min="0"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  মাসিক মূল ভাড়া (টাকা) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="যেমন: 18000"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">বেডরুম</label>
                  <input
                    type="number"
                    min="1"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">বাথরুম</label>
                  <input
                    type="number"
                    min="1"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">বারান্দা</label>
                  <input
                    type="number"
                    min="0"
                    value={balconies}
                    onChange={(e) => setBalconies(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    সাব-মিটার নম্বর
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: M-104"
                    value={meterNo}
                    onChange={(e) => setMeterNo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    বর্তমান মিটার রিডিং
                  </label>
                  <input
                    type="number"
                    value={lastMeterReading}
                    onChange={(e) => setLastMeterReading(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">গ্যাস বিল</label>
                  <input
                    type="number"
                    value={gasBill}
                    onChange={(e) => setGasBill(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-xl text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">পানি বিল</label>
                  <input
                    type="number"
                    value={waterBill}
                    onChange={(e) => setWaterBill(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-xl text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">সার্ভিস চার্জ</label>
                  <input
                    type="number"
                    value={serviceCharge}
                    onChange={(e) => setServiceCharge(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow transition"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
