export type PaymentMethod = 'cash' | 'bkash' | 'nagad' | 'rocket' | 'bank';
export type PaymentStatus = 'paid' | 'partial' | 'unpaid';
export type FlatStatus = 'occupied' | 'vacant';
export type ReminderChannel = 'sms' | 'whatsapp' | 'both';

export interface Property {
  id: string;
  name: string;
  address: string;
  totalFloors: number;
  notes?: string;
  createdAt: string;
}

export interface Flat {
  id: string;
  propertyId: string;
  name: string;
  floor: number;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  meterNo: string;
  lastMeterReading: number;
  gasBill: number;
  waterBill: number;
  serviceCharge: number;
  status: FlatStatus;
  currentTenantId?: string;
}

export interface Tenant {
  id: string;
  propertyId: string;
  flatId: string;
  name: string;
  phone: string;
  email?: string;
  nid: string;
  occupation: string;
  religion: string;
  dateOfBirth?: string;
  fatherName?: string;
  permanentAddress?: string;
  workplace?: string;
  advanceDeposit: number;
  startDate: string;
  familyMembers: number;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  emergencyContactAddress: string;
  photoUrl?: string;
  status: 'active' | 'left';
  createdAt: string;
}

export interface Bill {
  id: string;
  propertyId: string;
  flatId: string;
  tenantId: string;
  monthName: string;
  monthNum: number;
  year: number;
  baseRent: number;
  prevMeterReading: number;
  currMeterReading: number;
  electricityUnits: number;
  unitPrice: number;
  electricityBill: number;
  gasBill: number;
  waterBill: number;
  serviceCharge: number;
  otherBill: number;
  previousDue: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: PaymentStatus;
  dueDate: string;
  generatedAt: string;
}

export interface PaymentRecord {
  id: string;
  billId: string;
  flatId: string;
  tenantId: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  collectedBy: string;
  remarks?: string;
  receiptNo: string;
}

export interface ReminderSettings {
  enabled: boolean;
  channel: ReminderChannel;
  startDay: number; // 1
  endDay: number; // 5
  sendTime: string; // "10:00 AM"
  customNote?: string;
  smsBalance: number;
}

export interface ReminderLog {
  id: string;
  tenantName: string;
  flatName: string;
  phone: string;
  amount: number;
  channel: ReminderChannel;
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
}

export interface CashHandoverRecord {
  id: string;
  propertyId: string;
  managerName: string;
  amount: number;
  date: string;
  method: 'cash' | 'bank_deposit';
  receivedBy: string;
  voucherNo: string;
  note?: string;
  status: 'completed';
}

export type SubscriptionPlanId = 'free' | 'pro' | 'samiti';
export type SubscriptionStatus = 'active' | 'expired' | 'pending';

export interface Subscription {
  planId: SubscriptionPlanId;
  planName: string;
  status: SubscriptionStatus;
  startDate: string;
  validUntil: string;
  maxFlats: number;
  price: number;
  trxId?: string;
  paymentMethod?: string;
  lastPaymentDate?: string;
  senderPhone?: string;
}

export interface SubscriptionRequest {
  id: string;
  userName: string;
  userPhone: string;
  propertyName: string;
  planId: SubscriptionPlanId;
  planName: string;
  amount: number;
  method: string;
  senderPhone: string;
  trxId: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
