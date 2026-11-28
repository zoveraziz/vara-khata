'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Flat, Tenant, Bill, PaymentRecord, PaymentMethod, PaymentStatus, ReminderSettings, ReminderLog, Subscription, SubscriptionPlanId, SubscriptionStatus, SubscriptionRequest } from '@/types';
import {
  initialProperties,
  initialFlats,
  initialTenants,
  initialBills,
  initialPayments,
  initialReminderSettings,
  initialReminderLogs,
} from '@/lib/initialData';

interface AppContextType {
  properties: Property[];
  activePropertyId: string;
  setActivePropertyId: (id: string) => void;
  flats: Flat[];
  tenants: Tenant[];
  bills: Bill[];
  payments: PaymentRecord[];
  
  // Property Actions
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  deleteProperty: (id: string) => void;
  
  // Flat Actions
  addFlat: (flat: Omit<Flat, 'id'>) => void;
  updateFlat: (id: string, flat: Partial<Flat>) => void;
  deleteFlat: (id: string) => void;
  
  // Tenant Actions
  addTenant: (tenant: Omit<Tenant, 'id' | 'createdAt'>) => void;
  updateTenant: (id: string, tenant: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;
  
  // Bill Actions
  generateMonthlyBills: (monthName: string, monthNum: number, year: number, dueDate: string, onlyBaseRent?: boolean) => void;
  updateBillElectricity: (billId: string, currReading: number, unitPrice?: number) => void;
  updateBill: (
    billId: string,
    updates: Partial<{
      baseRent: number;
      electricityBill: number;
      gasBill: number;
      waterBill: number;
      serviceCharge: number;
      otherBill: number;
      dueDate: string;
    }>
  ) => void;
  deleteBill: (id: string) => void;
  
  // Payment Actions
  collectPayment: (params: {
    billId: string;
    amount: number;
    method: PaymentMethod;
    date: string;
    collectedBy: string;
    remarks?: string;
  }) => PaymentRecord;

  // Reminder Actions & State
  reminderSettings: ReminderSettings;
  updateReminderSettings: (settings: Partial<ReminderSettings>) => void;
  reminderLogs: ReminderLog[];
  rechargeSms: (count: number) => void;
  sendBulkReminders: (items: { tenant: Tenant; flat: Flat; bill: Bill }[]) => number;

  // Subscription Actions & State
  subscription: Subscription;
  activateSubscription: (planId: SubscriptionPlanId, trxId?: string, method?: string) => void;
  expireSubscription: () => void;
  resetToFreePlan: () => void;
  showSubscriptionModal: boolean;
  setShowSubscriptionModal: (show: boolean) => void;
  subscriptionModalReason: string;
  setSubscriptionModalReason: (reason: string) => void;
  triggerSubscriptionPrompt: (reason: string) => void;
  canPerformAction: (action: 'add_property' | 'add_flat' | 'add_tenant' | 'generate_bill' | 'print_receipt' | 'send_sms') => { allowed: boolean; reason?: string };
  subscriptionRequests: SubscriptionRequest[];
  submitSubscriptionRequest: (params: {
    planId: SubscriptionPlanId;
    method: string;
    senderPhone: string;
    trxId: string;
    userName?: string;
    userPhone?: string;
    propertyName?: string;
  }) => void;
  approveSubscriptionRequest: (requestId: string) => void;
  rejectSubscriptionRequest: (requestId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper: Recalculates bills chronologically per tenant so prior dues never compound incorrectly
function recalculateDues(billList: Bill[]): Bill[] {
  const flatGroups = new Map<string, Bill[]>();
  for (const b of billList) {
    const key = `${b.flatId}_${b.tenantId}`;
    if (!flatGroups.has(key)) flatGroups.set(key, []);
    flatGroups.get(key)!.push(b);
  }

  const result: Bill[] = [];
  for (const [, billsForTenant] of flatGroups.entries()) {
    // Sort ascending by year and month
    billsForTenant.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.monthNum - b.monthNum;
    });

    let runningPreviousDue = 0;
    for (const b of billsForTenant) {
      const baseRent = b.baseRent || 0;
      const electricityBill = b.electricityBill || 0;
      const gasBill = b.gasBill || 0;
      const waterBill = b.waterBill || 0;
      const serviceCharge = b.serviceCharge || 0;
      const otherBill = b.otherBill || 0;

      const totalAmount =
        baseRent + electricityBill + gasBill + waterBill + serviceCharge + otherBill + runningPreviousDue;
      const paidAmount = b.paidAmount || 0;
      const dueAmount = Math.max(0, totalAmount - paidAmount);

      let status: PaymentStatus = 'unpaid';
      if (paidAmount >= totalAmount && totalAmount > 0) status = 'paid';
      else if (paidAmount > 0) status = 'partial';

      result.push({
        ...b,
        previousDue: runningPreviousDue,
        totalAmount,
        dueAmount,
        status,
      });

      // The due of this bill carries forward to the NEXT bill
      runningPreviousDue = dueAmount;
    }
  }

  return result;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [activePropertyId, setActivePropertyId] = useState<string>('prop-1');
  const [flats, setFlats] = useState<Flat[]>(initialFlats);
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [bills, setBills] = useState<Bill[]>(recalculateDues(initialBills));
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>(initialReminderSettings);
  const [reminderLogs, setReminderLogs] = useState<ReminderLog[]>(initialReminderLogs);

  const defaultSubscription: Subscription = {
    planId: 'free',
    planName: 'ফ্রি ট্রায়াল (৩টি ফ্ল্যাট পর্যন্ত)',
    status: 'active',
    startDate: '2026-01-01T00:00:00.000Z',
    validUntil: '2099-12-31T23:59:59.000Z',
    maxFlats: 3,
    price: 0,
  };

  const [subscription, setSubscription] = useState<Subscription>(defaultSubscription);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState<boolean>(false);
  const [subscriptionModalReason, setSubscriptionModalReason] = useState<string>('');

  const [subscriptionRequests, setSubscriptionRequests] = useState<SubscriptionRequest[]>([
    {
      id: 'req-sample-1',
      userName: 'হাজী মোঃ আব্দুল খালেক',
      userPhone: '01711223344',
      propertyName: 'আল-আকসা মঞ্জিল',
      planId: 'pro',
      planName: 'প্রো বাড়িওয়ালা',
      amount: 399,
      method: 'bkash',
      senderPhone: '01711223344',
      trxId: '9M8A2B7K1X',
      submittedAt: '2026-11-28 12:30 PM',
      status: 'approved',
    },
  ]);

  // Sync with LocalStorage after mount
  useEffect(() => {
    try {
      const savedProps = localStorage.getItem('vk_properties');
      if (savedProps) setProperties(JSON.parse(savedProps));
      
      const savedFlats = localStorage.getItem('vk_flats');
      if (savedFlats) setFlats(JSON.parse(savedFlats));
      
      const savedTenants = localStorage.getItem('vk_tenants');
      if (savedTenants) setTenants(JSON.parse(savedTenants));
      
      const savedBills = localStorage.getItem('vk_bills_v2');
      if (savedBills) {
        const parsed = JSON.parse(savedBills);
        const sanitized = recalculateDues(parsed);
        setBills(sanitized);
        localStorage.setItem('vk_bills_v2', JSON.stringify(sanitized));
      } else {
        const sanitized = recalculateDues(initialBills);
        localStorage.setItem('vk_bills_v2', JSON.stringify(sanitized));
        setBills(sanitized);
      }
      
      const savedPayments = localStorage.getItem('vk_payments_v2');
      if (savedPayments) {
        setPayments(JSON.parse(savedPayments));
      } else {
        localStorage.setItem('vk_payments_v2', JSON.stringify(initialPayments));
        setPayments(initialPayments);
      }

      const savedReminderSettings = localStorage.getItem('vk_reminder_settings');
      if (savedReminderSettings) setReminderSettings(JSON.parse(savedReminderSettings));

      const savedReminderLogs = localStorage.getItem('vk_reminder_logs');
      if (savedReminderLogs) setReminderLogs(JSON.parse(savedReminderLogs));

      const savedSub = localStorage.getItem('vk_subscription_v1');
      if (savedSub) {
        setSubscription(JSON.parse(savedSub));
      } else {
        localStorage.setItem('vk_subscription_v1', JSON.stringify(defaultSubscription));
      }

      const savedRequests = localStorage.getItem('vk_sub_requests_v1');
      if (savedRequests) {
        setSubscriptionRequests(JSON.parse(savedRequests));
      }
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
  }, []);

  // Save changes
  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  // Property handlers
  const addProperty = (prop: Omit<Property, 'id' | 'createdAt'>) => {
    const newProp: Property = {
      ...prop,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...properties, newProp];
    setProperties(updated);
    saveToStorage('vk_properties', updated);
    if (!activePropertyId) setActivePropertyId(newProp.id);
  };

  const deleteProperty = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    setProperties(updated);
    saveToStorage('vk_properties', updated);
    if (activePropertyId === id && updated.length > 0) {
      setActivePropertyId(updated[0].id);
    }
  };

  // Flat handlers
  const addFlat = (flatData: Omit<Flat, 'id'>) => {
    const newFlat: Flat = {
      ...flatData,
      id: `flat-${Date.now()}`,
    };
    const updated = [...flats, newFlat];
    setFlats(updated);
    saveToStorage('vk_flats', updated);
  };

  const updateFlat = (id: string, flatData: Partial<Flat>) => {
    const updated = flats.map((f) => (f.id === id ? { ...f, ...flatData } : f));
    setFlats(updated);
    saveToStorage('vk_flats', updated);
  };

  const deleteFlat = (id: string) => {
    const updated = flats.filter((f) => f.id !== id);
    setFlats(updated);
    saveToStorage('vk_flats', updated);
  };

  // Tenant handlers
  const addTenant = (tenantData: Omit<Tenant, 'id' | 'createdAt'>) => {
    const newTenant: Tenant = {
      ...tenantData,
      id: `ten-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updatedTenants = [...tenants, newTenant];
    setTenants(updatedTenants);
    saveToStorage('vk_tenants', updatedTenants);

    // Also mark the flat as occupied and set currentTenantId
    updateFlat(tenantData.flatId, {
      status: 'occupied',
      currentTenantId: newTenant.id,
    });
  };

  const updateTenant = (id: string, tenantData: Partial<Tenant>) => {
    const updated = tenants.map((t) => (t.id === id ? { ...t, ...tenantData } : t));
    setTenants(updated);
    saveToStorage('vk_tenants', updated);
  };

  const deleteTenant = (id: string) => {
    const tenant = tenants.find((t) => t.id === id);
    if (tenant) {
      updateFlat(tenant.flatId, { status: 'vacant', currentTenantId: undefined });
    }
    const updated = tenants.filter((t) => t.id !== id);
    setTenants(updated);
    saveToStorage('vk_tenants', updated);
  };

  // Bill Generation with Clean Carry Forward Dues
  const generateMonthlyBills = (
    monthName: string,
    monthNum: number,
    year: number,
    dueDate: string,
    onlyBaseRent: boolean = false
  ) => {
    const activeFlats = flats.filter(
      (f) => f.propertyId === activePropertyId && f.status === 'occupied' && f.currentTenantId
    );

    const newBills: Bill[] = activeFlats.map((flat) => {
      // 1. Strictly prior bills (strictly before this year and month)
      const priorBills = bills
        .filter(
          (b) =>
            b.flatId === flat.id &&
            b.tenantId === flat.currentTenantId &&
            (b.year < year || (b.year === year && b.monthNum < monthNum))
        )
        .sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          return b.monthNum - a.monthNum;
        });

      // The due to carry forward is only the due of the most recent preceding bill
      const latestPriorBill = priorBills[0];
      const previousDue = latestPriorBill ? latestPriorBill.dueAmount : 0;

      // 2. Check if a bill for THIS specific month & flat already exists
      const existingBill = bills.find(
        (b) => b.year === year && b.monthNum === monthNum && b.flatId === flat.id
      );

      const baseRent = flat.rent;
      const gasBill = onlyBaseRent ? 0 : (existingBill ? existingBill.gasBill : (flat.gasBill || 0));
      const waterBill = onlyBaseRent ? 0 : (existingBill ? existingBill.waterBill : (flat.waterBill || 0));
      const serviceCharge = onlyBaseRent ? 0 : (existingBill ? existingBill.serviceCharge : (flat.serviceCharge || 0));
      
      const prevMeterReading = existingBill ? existingBill.prevMeterReading : (flat.lastMeterReading || 0);
      const currMeterReading = existingBill ? existingBill.currMeterReading : (flat.lastMeterReading || 0);
      const electricityUnits = existingBill ? existingBill.electricityUnits : 0;
      const unitPrice = existingBill ? existingBill.unitPrice : 10;
      const electricityBill = existingBill ? existingBill.electricityBill : 0;
      const otherBill = existingBill ? existingBill.otherBill : 0;

      const totalAmount =
        baseRent + electricityBill + gasBill + waterBill + serviceCharge + otherBill + previousDue;

      // Preserve already collected payments if re-generating for this month
      const paidAmount = existingBill ? existingBill.paidAmount : 0;
      const dueAmount = Math.max(0, totalAmount - paidAmount);

      let status: PaymentStatus = 'unpaid';
      if (paidAmount >= totalAmount && totalAmount > 0) status = 'paid';
      else if (paidAmount > 0) status = 'partial';

      return {
        id: existingBill ? existingBill.id : `bill-${year}-${monthNum}-${flat.id}`,
        propertyId: flat.propertyId,
        flatId: flat.id,
        tenantId: flat.currentTenantId!,
        monthName,
        monthNum,
        year,
        baseRent,
        prevMeterReading,
        currMeterReading,
        electricityUnits,
        unitPrice,
        electricityBill,
        gasBill,
        waterBill,
        serviceCharge,
        otherBill,
        previousDue,
        totalAmount,
        paidAmount,
        dueAmount,
        status,
        dueDate,
        generatedAt: existingBill ? existingBill.generatedAt : new Date().toISOString().split('T')[0],
      };
    });

    // Replace old bills for this month and sanitize all dues
    const filteredOldBills = bills.filter(
      (b) => !(b.year === year && b.monthNum === monthNum && b.propertyId === activePropertyId)
    );
    const sanitizedBills = recalculateDues([...filteredOldBills, ...newBills]);
    setBills(sanitizedBills);
    saveToStorage('vk_bills_v2', sanitizedBills);
  };

  const updateBill = (
    billId: string,
    updates: Partial<{
      baseRent: number;
      electricityBill: number;
      gasBill: number;
      waterBill: number;
      serviceCharge: number;
      otherBill: number;
      dueDate: string;
    }>
  ) => {
    const updated = bills.map((b) => {
      if (b.id !== billId) return b;
      const baseRent = updates.baseRent !== undefined ? updates.baseRent : b.baseRent;
      const electricityBill = updates.electricityBill !== undefined ? updates.electricityBill : b.electricityBill;
      const gasBill = updates.gasBill !== undefined ? updates.gasBill : b.gasBill;
      const waterBill = updates.waterBill !== undefined ? updates.waterBill : b.waterBill;
      const serviceCharge = updates.serviceCharge !== undefined ? updates.serviceCharge : b.serviceCharge;
      const otherBill = updates.otherBill !== undefined ? updates.otherBill : b.otherBill;
      const dueDate = updates.dueDate || b.dueDate;

      const totalAmount =
        baseRent + electricityBill + gasBill + waterBill + serviceCharge + otherBill + b.previousDue;
      const dueAmount = Math.max(0, totalAmount - b.paidAmount);
      let status: PaymentStatus = 'unpaid';
      if (b.paidAmount >= totalAmount) status = 'paid';
      else if (b.paidAmount > 0) status = 'partial';

      return {
        ...b,
        baseRent,
        electricityBill,
        gasBill,
        waterBill,
        serviceCharge,
        otherBill,
        dueDate,
        totalAmount,
        dueAmount,
        status,
      };
    });

    setBills(updated);
    saveToStorage('vk_bills_v2', updated);
  };

  const updateBillElectricity = (billId: string, currReading: number, customUnitPrice?: number) => {
    const updated = bills.map((b) => {
      if (b.id !== billId) return b;
      const unitPrice = customUnitPrice || b.unitPrice || 10;
      const units = Math.max(0, currReading - b.prevMeterReading);
      const electricityBill = units * unitPrice;
      const totalAmount =
        b.baseRent +
        electricityBill +
        b.gasBill +
        b.waterBill +
        b.serviceCharge +
        b.otherBill +
        b.previousDue;
      const dueAmount = Math.max(0, totalAmount - b.paidAmount);
      let status: PaymentStatus = 'unpaid';
      if (b.paidAmount >= totalAmount) status = 'paid';
      else if (b.paidAmount > 0) status = 'partial';

      return {
        ...b,
        currMeterReading: currReading,
        electricityUnits: units,
        unitPrice,
        electricityBill,
        totalAmount,
        dueAmount,
        status,
      };
    });
    setBills(updated);
    saveToStorage('vk_bills_v2', updated);

    // Also update flat's lastMeterReading
    const targetBill = bills.find((b) => b.id === billId);
    if (targetBill) {
      updateFlat(targetBill.flatId, { lastMeterReading: currReading });
    }
  };

  const deleteBill = (id: string) => {
    const updated = bills.filter((b) => b.id !== id);
    setBills(updated);
    saveToStorage('vk_bills_v2', updated);
  };

  // Payment Recording
  const collectPayment = ({
    billId,
    amount,
    method,
    date,
    collectedBy,
    remarks,
  }: {
    billId: string;
    amount: number;
    method: PaymentMethod;
    date: string;
    collectedBy: string;
    remarks?: string;
  }): PaymentRecord => {
    const bill = bills.find((b) => b.id === billId);
    if (!bill) throw new Error('Bill not found');

    const receiptNo = `VK-${new Date().getFullYear()}-${String(payments.length + 1).padStart(4, '0')}`;
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      billId,
      flatId: bill.flatId,
      tenantId: bill.tenantId,
      amount,
      method,
      date,
      collectedBy,
      remarks,
      receiptNo,
    };

    // Update bill paid and due amounts
    const updatedBills = bills.map((b) => {
      if (b.id !== billId) return b;
      const newPaid = b.paidAmount + amount;
      const newDue = Math.max(0, b.totalAmount - newPaid);
      let status: PaymentStatus = 'unpaid';
      if (newPaid >= b.totalAmount) status = 'paid';
      else if (newPaid > 0) status = 'partial';

      return {
        ...b,
        paidAmount: newPaid,
        dueAmount: newDue,
        status,
      };
    });

    const updatedPayments = [newPayment, ...payments];
    setBills(updatedBills);
    setPayments(updatedPayments);
    saveToStorage('vk_bills_v2', updatedBills);
    saveToStorage('vk_payments_v2', updatedPayments);

    return newPayment;
  };

  // Reminder Actions
  const updateReminderSettings = (newSettings: Partial<ReminderSettings>) => {
    setReminderSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveToStorage('vk_reminder_settings', updated);
      return updated;
    });
  };

  const rechargeSms = (count: number) => {
    setReminderSettings((prev) => {
      const updated = { ...prev, smsBalance: prev.smsBalance + count };
      saveToStorage('vk_reminder_settings', updated);
      return updated;
    });
  };

  const sendBulkReminders = (items: { tenant: Tenant; flat: Flat; bill: Bill }[]): number => {
    if (items.length === 0) return 0;
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    const newLogs: ReminderLog[] = items.map((item, idx) => ({
      id: `log-${Date.now()}-${idx}`,
      tenantName: item.tenant.name,
      flatName: item.flat.name,
      phone: item.tenant.phone,
      amount: item.bill.dueAmount,
      channel: reminderSettings.channel,
      sentAt: timeStr,
      status: 'delivered',
    }));

    const updatedLogs = [...newLogs, ...reminderLogs];
    setReminderLogs(updatedLogs);
    saveToStorage('vk_reminder_logs', updatedLogs);

    // If channel sends SMS, deduct from smsBalance
    if (reminderSettings.channel === 'sms' || reminderSettings.channel === 'both') {
      const deducted = items.length;
      setReminderSettings((prev) => {
        const updated = { ...prev, smsBalance: Math.max(0, prev.smsBalance - deducted) };
        saveToStorage('vk_reminder_settings', updated);
        return updated;
      });
    }

    return items.length;
  };

  // Subscription Handlers
  const activateSubscription = (planId: SubscriptionPlanId, trxId?: string, method: string = 'bkash') => {
    const planNames: Record<SubscriptionPlanId, string> = {
      free: 'ফ্রি ট্রায়াল (৩টি ফ্ল্যাট পর্যন্ত)',
      pro: 'প্রো বাড়িওয়ালা (১৫টি ফ্ল্যাট পর্যন্ত)',
      samiti: 'এপার্টমেন্ট সমিতি (আনলিমিটেড ফ্ল্যাট)',
    };
    const maxFlatsMap: Record<SubscriptionPlanId, number> = {
      free: 3,
      pro: 15,
      samiti: 999,
    };
    const priceMap: Record<SubscriptionPlanId, number> = {
      free: 0,
      pro: 399,
      samiti: 999,
    };

    const newSub: Subscription = {
      planId,
      planName: planNames[planId],
      status: 'active',
      startDate: new Date().toISOString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      maxFlats: maxFlatsMap[planId],
      price: priceMap[planId],
      trxId: trxId || `TXN${Math.floor(100000 + Math.random() * 900000)}`,
      paymentMethod: method,
      lastPaymentDate: new Date().toISOString(),
    };

    setSubscription(newSub);
    saveToStorage('vk_subscription_v1', newSub);
  };

  const expireSubscription = () => {
    setSubscription((prev) => {
      const expired: Subscription = {
        ...prev,
        status: 'expired',
        validUntil: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      };
      saveToStorage('vk_subscription_v1', expired);
      return expired;
    });
  };

  const resetToFreePlan = () => {
    const freeSub: Subscription = {
      planId: 'free',
      planName: 'ফ্রি ট্রায়াল (৩টি ফ্ল্যাট পর্যন্ত)',
      status: 'active',
      startDate: new Date().toISOString(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      maxFlats: 3,
      price: 0,
    };
    setSubscription(freeSub);
    saveToStorage('vk_subscription_v1', freeSub);
  };

  const triggerSubscriptionPrompt = (reason: string) => {
    setSubscriptionModalReason(reason);
    setShowSubscriptionModal(true);
  };

  const canPerformAction = (action: 'add_property' | 'add_flat' | 'add_tenant' | 'generate_bill' | 'print_receipt' | 'send_sms'): { allowed: boolean; reason?: string } => {
    const isExpired = subscription.status === 'expired' || new Date(subscription.validUntil).getTime() < Date.now();
    const isPending = subscription.status === 'pending';

    if (isPending) {
      return {
        allowed: false,
        reason: 'আপনার পেমেন্ট রিকোয়েস্টটি বর্তমানে এডমিন কর্তৃক যাচাইকরণ প্রক্রিয়াধীন (Processing) রয়েছে। দ্রুতই প্যাকেজ চালু হবে।',
      };
    }
    
    if (isExpired && subscription.planId !== 'free') {
      return {
        allowed: false,
        reason: 'আপনার সাবস্ক্রিপশনের মেয়াদ শেষ হয়েছে। নিরবচ্ছিন্ন সেবা ও ফিচার সচল করতে প্যাকেজ রিনিউ করুন।',
      };
    }

    if (action === 'add_property') {
      if (isExpired) {
        return { allowed: false, reason: 'সাবস্ক্রিপশনের মেয়াদ শেষ হয়েছে। নতুন বাড়ি যোগ করতে প্যাকেজ রিনিউ করুন।' };
      }
      if (subscription.planId === 'free' && (properties.length >= 3 || flats.length >= 3)) {
        return {
          allowed: false,
          reason: 'ফ্রি প্ল্যানে সর্বোচ্চ ৩টি বাড়ি বা ইউনিট পরিচালনা করা যায়। ৪ নম্বর বাড়ি বা ফ্ল্যাট যোগ করতে অনুগ্রহ করে ‘প্রো বাড়িওয়ালা’ প্যাকেজটি কিনুন (Buy Package)।',
        };
      }
    }

    if (action === 'add_flat') {
      if (isExpired) {
        return { allowed: false, reason: 'সাবস্ক্রিপশনের মেয়াদ শেষ হয়েছে। নতুন ফ্ল্যাট যোগ করতে প্যাকেজ রিনিউ করুন।' };
      }
      if (subscription.planId === 'free' && flats.length >= 3) {
        return {
          allowed: false,
          reason: 'ফ্রি প্ল্যানে সর্বোচ্চ ৩টি বাড়ি বা ফ্ল্যাট বিনামূল্যে পরিচালনা করা যায়। ৪ নম্বর ফ্ল্যাট যোগ করতে অনুগ্রহ করে ‘প্রো বাড়িওয়ালা’ প্যাকেজটি কিনুন (Buy Package)।',
        };
      }
      if (subscription.planId === 'pro' && flats.length >= 15) {
        return {
          allowed: false,
          reason: 'প্রো প্ল্যানে সর্বোচ্চ ১৫টি ফ্ল্যাট অন্তর্ভুক্ত। আরও বেশি ফ্ল্যাটের জন্য ‘এপার্টমেন্ট সমিতি’ প্ল্যানে আপগ্রেড করুন।',
        };
      }
    }

    if (action === 'add_tenant') {
      if (isExpired) {
        return { allowed: false, reason: 'সাবস্ক্রিপশনের মেয়াদ শেষ হওয়ায় নতুন ভাড়াটিয়া যুক্ত করা সাময়িকভাবে স্থগিত। প্যাকেজ রিনিউ করুন।' };
      }
      if (subscription.planId === 'free' && (tenants.length >= 3 || flats.length >= 3)) {
        return {
          allowed: false,
          reason: 'ফ্রি প্ল্যানে সর্বোচ্চ ৩টি ভাড়াটিয়ার খাতা পরিচালনা করা যায়। ৪ নম্বর বা নতুন ভাড়াটিয়া যোগ করতে অনুগ্রহ করে ‘প্রো বাড়িওয়ালা’ প্যাকেজটি কিনুন (Buy Package)।',
        };
      }
    }

    if (action === 'generate_bill') {
      if (isExpired) {
        return { allowed: false, reason: 'সাবস্ক্রিপশন মেয়াদোত্তীর্ণ হওয়ায় নতুন মাসের বিল ও রসিদ তৈরি সাময়িকভাবে স্থগিত রাখা হয়েছে।' };
      }
      if (subscription.planId === 'free' && flats.length > 3) {
        return { allowed: false, reason: '৩টির বেশি ফ্ল্যাটের বিল তৈরি করতে প্রো বাড়িওয়ালা প্ল্যান চালু করুন।' };
      }
    }

    if (action === 'print_receipt') {
      if (isExpired) {
        return { allowed: false, reason: 'সাবস্ক্রিপশন মেয়াদ শেষ হওয়ায় মানি রিসিট প্রিন্ট সাময়িকভাবে লক করা হয়েছে। প্যাকেজ রিনিউ করলেই সচল হবে।' };
      }
    }

    if (action === 'send_sms') {
      if (isExpired) {
        return { allowed: false, reason: 'সাবস্ক্রিপশন মেয়াদ শেষ থাকায় অটো এসএমএস রিমাইন্ডার বন্ধ আছে। সচল করতে রিনিউ করুন।' };
      }
      if (subscription.planId === 'free' && flats.length > 3) {
        return { allowed: false, reason: 'এসএমএস সেবা সচল রাখতে প্রো প্যাকেজ সক্রিয় করুন।' };
      }
    }

    return { allowed: true };
  };

  const submitSubscriptionRequest = (params: {
    planId: SubscriptionPlanId;
    method: string;
    senderPhone: string;
    trxId: string;
    userName?: string;
    userPhone?: string;
    propertyName?: string;
  }) => {
    const planNames: Record<SubscriptionPlanId, string> = {
      free: 'ফ্রি ট্রায়াল (৩টি ফ্ল্যাট পর্যন্ত)',
      pro: 'প্রো বাড়িওয়ালা (১৫টি ফ্ল্যাট পর্যন্ত)',
      samiti: 'এপার্টমেন্ট সমিতি (আনলিমিটেড ফ্ল্যাট)',
    };
    const priceMap: Record<SubscriptionPlanId, number> = {
      free: 0,
      pro: 399,
      samiti: 999,
    };

    const newReq: SubscriptionRequest = {
      id: `req-${Date.now()}`,
      userName: params.userName || 'বাড়ির মালিক',
      userPhone: params.userPhone || params.senderPhone,
      propertyName: params.propertyName || 'আমার ভবন',
      planId: params.planId,
      planName: planNames[params.planId],
      amount: priceMap[params.planId],
      method: params.method,
      senderPhone: params.senderPhone,
      trxId: params.trxId,
      submittedAt: new Date().toLocaleString('bn-BD'),
      status: 'pending',
    };

    const updatedRequests = [newReq, ...subscriptionRequests];
    setSubscriptionRequests(updatedRequests);
    saveToStorage('vk_sub_requests_v1', updatedRequests);

    // Set subscription to pending
    setSubscription((prev) => {
      const pendingSub: Subscription = {
        ...prev,
        planId: params.planId,
        planName: planNames[params.planId],
        status: 'pending',
        senderPhone: params.senderPhone,
        trxId: params.trxId,
        paymentMethod: params.method,
      };
      saveToStorage('vk_subscription_v1', pendingSub);
      return pendingSub;
    });
  };

  const approveSubscriptionRequest = (requestId: string) => {
    const target = subscriptionRequests.find((r) => r.id === requestId);
    if (!target) return;

    const updatedRequests = subscriptionRequests.map((r) =>
      r.id === requestId ? { ...r, status: 'approved' as const } : r
    );
    setSubscriptionRequests(updatedRequests);
    saveToStorage('vk_sub_requests_v1', updatedRequests);

    activateSubscription(target.planId, target.trxId, target.method);
  };

  const rejectSubscriptionRequest = (requestId: string) => {
    const updatedRequests = subscriptionRequests.map((r) =>
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    );
    setSubscriptionRequests(updatedRequests);
    saveToStorage('vk_sub_requests_v1', updatedRequests);

    setSubscription((prev) => {
      const expiredSub: Subscription = {
        ...prev,
        status: 'expired',
      };
      saveToStorage('vk_subscription_v1', expiredSub);
      return expiredSub;
    });
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        activePropertyId,
        setActivePropertyId,
        flats,
        tenants,
        bills,
        payments,
        addProperty,
        deleteProperty,
        addFlat,
        updateFlat,
        deleteFlat,
        addTenant,
        updateTenant,
        deleteTenant,
        generateMonthlyBills,
        updateBillElectricity,
        updateBill,
        deleteBill,
        collectPayment,
        reminderSettings,
        updateReminderSettings,
        reminderLogs,
        rechargeSms,
        sendBulkReminders,
        subscription,
        activateSubscription,
        expireSubscription,
        resetToFreePlan,
        showSubscriptionModal,
        setShowSubscriptionModal,
        subscriptionModalReason,
        setSubscriptionModalReason,
        triggerSubscriptionPrompt,
        canPerformAction,
        subscriptionRequests,
        submitSubscriptionRequest,
        approveSubscriptionRequest,
        rejectSubscriptionRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
