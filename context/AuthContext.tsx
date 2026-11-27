'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'owner' | 'manager';

export interface ManagerStaff {
  name: string;
  phone: string;
  addedAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  password?: string;
  propertyName: string;
  propertyAddress: string;
  role?: UserRole;
  createdAt: string;
}

interface AuthContextType {
  currentUser: UserAccount | null;
  isLoggedIn: boolean;
  activeRole: UserRole;
  isOwner: boolean;
  isManager: boolean;
  switchRole: (role: UserRole) => void;
  managerStaff: ManagerStaff | null;
  saveManagerStaff: (staff: ManagerStaff | null) => void;
  login: (phoneOrEmail: string, password?: string) => Promise<{ success: boolean; message: string }>;
  register: (params: {
    name: string;
    phone: string;
    email?: string;
    password?: string;
    propertyName: string;
    propertyAddress: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const defaultDemoUser: UserAccount = {
  id: 'user-demo-1',
  name: 'হাজী মোঃ আব্দুল খালেক',
  phone: '01711223344',
  email: 'landlord@varakhata.com',
  propertyName: 'আল-আকসা মঞ্জিল',
  propertyAddress: 'বাড়ি #১২, রোড #০৫, ব্লক-ডি, মিরপুর-২, ঢাকা',
  role: 'owner',
  createdAt: '2026-01-01',
};

const defaultDemoManager: ManagerStaff = {
  name: 'মোঃ কালাম হোসেন (ম্যানেজার)',
  phone: '01811223344',
  addedAt: '2026-02-01',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [users, setUsers] = useState<UserAccount[]>([defaultDemoUser]);
  const [activeRole, setActiveRole] = useState<UserRole>('owner');
  const [managerStaff, setManagerStaff] = useState<ManagerStaff | null>(defaultDemoManager);

  // Load auth state and role from LocalStorage on mount
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem('vk_all_users');
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        localStorage.setItem('vk_all_users', JSON.stringify([defaultDemoUser]));
      }

      const activeUser = localStorage.getItem('vk_auth_user');
      if (activeUser) {
        setCurrentUser(JSON.parse(activeUser));
      }

      const savedRole = localStorage.getItem('vk_active_role') as UserRole;
      if (savedRole === 'owner' || savedRole === 'manager') {
        setActiveRole(savedRole);
      }

      const savedManager = localStorage.getItem('vk_manager_staff');
      if (savedManager) {
        setManagerStaff(JSON.parse(savedManager));
      }
    } catch (e) {
      console.warn('Auth storage error', e);
    }
  }, []);

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    try {
      localStorage.setItem('vk_active_role', role);
    } catch (e) {
      console.warn(e);
    }
  };

  const saveManagerStaff = (staff: ManagerStaff | null) => {
    setManagerStaff(staff);
    try {
      if (staff) {
        localStorage.setItem('vk_manager_staff', JSON.stringify(staff));
      } else {
        localStorage.removeItem('vk_manager_staff');
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const login = async (phoneOrEmail: string, password?: string) => {
    const cleanContact = phoneOrEmail.trim().toLowerCase();
    const foundUser = users.find(
      (u) =>
        u.phone.replace(/[^0-9]/g, '') === cleanContact.replace(/[^0-9]/g, '') ||
        (u.email && u.email.toLowerCase() === cleanContact)
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem('vk_auth_user', JSON.stringify(foundUser));
      return { success: true, message: 'লগইন সফল হয়েছে!' };
    } else {
      return { success: false, message: 'এই নম্বর বা ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে সাইনআপ করুন।' };
    }
  };

  const register = async (params: {
    name: string;
    phone: string;
    email?: string;
    password?: string;
    propertyName: string;
    propertyAddress: string;
  }) => {
    const cleanPhone = params.phone.trim();
    const existing = users.find((u) => u.phone === cleanPhone);

    if (existing) {
      return { success: false, message: 'এই মোবাইল নম্বর দিয়ে আগেই একটি অ্যাকাউন্ট খোলা আছে। দয়া করে লগইন করুন।' };
    }

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: params.name.trim(),
      phone: cleanPhone,
      email: params.email?.trim() || undefined,
      password: params.password,
      propertyName: params.propertyName.trim(),
      propertyAddress: params.propertyAddress.trim() || 'ঢাকা, বাংলাদেশ',
      role: 'owner',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);

    localStorage.setItem('vk_all_users', JSON.stringify(updatedUsers));
    localStorage.setItem('vk_auth_user', JSON.stringify(newUser));

    return { success: true, message: 'অভিনন্দন! আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vk_auth_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        activeRole,
        isOwner: activeRole === 'owner',
        isManager: activeRole === 'manager',
        switchRole,
        managerStaff,
        saveManagerStaff,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
