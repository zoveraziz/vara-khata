'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Tenant, Bill } from '@/types';
import {
  Users,
  Plus,
  ShieldCheck,
  Phone,
  FileText,
  Trash2,
  Building,
  Search,
  MessageCircle,
  History,
} from 'lucide-react';
import Link from 'next/link';
import PoliceFormModal from '@/components/PoliceFormModal';
import TenantStatementModal from '@/components/TenantStatementModal';
import ReceiptModal from '@/components/ReceiptModal';

export default function TenantsPage() {
  const { properties, activePropertyId, flats, tenants, bills, payments, deleteTenant } = useApp();
  const [selectedTenantForPoliceForm, setSelectedTenantForPoliceForm] = useState<Tenant | null>(null);
  const [selectedTenantForStatement, setSelectedTenantForStatement] = useState<Tenant | null>(null);
  const [selectedBillForReceipt, setSelectedBillForReceipt] = useState<Bill | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeProperty = properties.find((p) => p.id === activePropertyId);
  const propertyTenants = tenants.filter((t) => t.propertyId === activePropertyId);

  const filteredTenants = propertyTenants.filter((t) => {
    const flat = flats.find((f) => f.id === t.flatId);
    const query = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(query) ||
      t.phone.includes(query) ||
      t.nid.includes(query) ||
      flat?.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-700" />
            ভাড়াটিয়া তালিকা ও প্রোফাইল
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {activeProperty?.name} — ভাড়াটিয়াদের পূর্ণাঙ্গ বায়োডাটা, এনআইডি, পেমেন্ট স্টেটমেন্ট ও পুলিশ ফরম।
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="নাম, ফোন বা NID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <Link
            href="/tenants/new"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ভাড়াটিয়া এন্ট্রি</span>
          </Link>
        </div>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTenants.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">কোনো ভাড়াটিয়া পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-400 mt-1">উপরের "নতুন ভাড়াটিয়া এন্ট্রি" বাটনে ক্লিক করে যোগ করুন।</p>
          </div>
        ) : (
          filteredTenants.map((tenant) => {
            const flat = flats.find((f) => f.id === tenant.flatId);
            const cleanPhone = tenant.phone.replace(/[^0-9]/g, '');

            // Calculate paid & dues for this tenant
            const tenantBills = bills.filter((b) => b.tenantId === tenant.id);
            const totalDue = tenantBills.reduce((acc, b) => acc + b.dueAmount, 0);

            return (
              <div
                key={tenant.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Flat Badge & Status */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <Building className="w-3.5 h-3.5" />
                      {flat?.name || 'ফ্ল্যাট নির্ধারিত হয়নি'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      শুরু: <strong>{tenant.startDate}</strong>
                    </span>
                  </div>

                  {/* Tenant Basic Info */}
                  <div className="mt-4 flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                        {tenant.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{tenant.occupation}</p>
                      <p className="text-xs text-emerald-700 font-mono font-bold mt-1">
                        {tenant.phone}
                      </p>
                    </div>
                  </div>

                  {/* Details & NID */}
                  <div className="mt-4 space-y-1.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    <div className="flex justify-between">
                      <span className="text-slate-500">এনআইডি (NID):</span>
                      <strong className="text-slate-800 font-mono">{tenant.nid}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">অগ্রিম/জামানত:</span>
                      <strong className="text-emerald-700">৳ {tenant.advanceDeposit.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">মোট হিসাবকৃত মাস:</span>
                      <strong className="text-slate-800">{tenantBills.length} মাস</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">বর্তমান বকেয়া:</span>
                      {totalDue > 0 ? (
                        <strong className="text-rose-600 font-black">৳ {totalDue.toLocaleString()}</strong>
                      ) : (
                        <span className="text-emerald-700 font-bold">পরিশোধিত ✓</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  {/* Tenant Rent History Statement Button */}
                  <button
                    onClick={() => setSelectedTenantForStatement(tenant)}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm active:scale-98"
                  >
                    <History className="w-4 h-4 text-emerald-200" />
                    <span>ভাড়ার স্টেটমেন্ট ও পেমেন্ট হিস্ট্রি</span>
                  </button>

                  {/* Bangladesh Police Form Button */}
                  <button
                    onClick={() => setSelectedTenantForPoliceForm(tenant)}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition shadow-sm active:scale-98"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>পুলিশ ভাড়াটিয়া ফরম ডাউনলোড (PDF)</span>
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${tenant.phone}`}
                        title="সরাসরি কল দিন"
                        className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-xs flex items-center gap-1 font-semibold"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>কল দিন</span>
                      </a>

                      <a
                        href={`https://api.whatsapp.com/send?phone=88${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                        className="p-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-xs flex items-center gap-1 font-semibold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    <button
                      onClick={() => deleteTenant(tenant.id)}
                      title="ভাড়াটিয়া রিমুভ করুন"
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Tenant Statement Modal */}
      {selectedTenantForStatement && (
        <TenantStatementModal
          tenant={selectedTenantForStatement}
          flat={flats.find((f) => f.id === selectedTenantForStatement.flatId)}
          property={activeProperty}
          bills={bills}
          payments={payments}
          onClose={() => setSelectedTenantForStatement(null)}
          onViewReceipt={(bill) => {
            setSelectedBillForReceipt(bill);
          }}
        />
      )}

      {/* Police Form Modal */}
      {selectedTenantForPoliceForm && (
        <PoliceFormModal
          tenant={selectedTenantForPoliceForm}
          flat={flats.find((f) => f.id === selectedTenantForPoliceForm.flatId)}
          property={activeProperty}
          onClose={() => setSelectedTenantForPoliceForm(null)}
        />
      )}

      {/* Specific Bill Receipt Modal */}
      {selectedBillForReceipt && (
        <ReceiptModal
          bill={selectedBillForReceipt}
          tenant={tenants.find((t) => t.id === selectedBillForReceipt.tenantId)}
          flat={flats.find((f) => f.id === selectedBillForReceipt.flatId)}
          property={activeProperty}
          payment={payments.find((p) => p.billId === selectedBillForReceipt.id)}
          onClose={() => setSelectedBillForReceipt(null)}
        />
      )}
    </div>
  );
}
