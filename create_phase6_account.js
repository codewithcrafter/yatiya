const fs = require('fs');
const path = require('path');

const files = {
  // src/context/CustomerContext.tsx
  'src/context/CustomerContext.tsx': `
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
}

export interface CustomerAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerOrder {
  id: string;
  date: string;
  status: string;
  items: any[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  payment: {
    method: string;
    status: string;
  };
  shippingAddress: any;
  shipment?: {
    trackingId: string;
    carrier: string;
    status: string;
  };
}

interface CustomerContextType {
  customer: CustomerProfile | null;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  isLoggedIn: boolean;
  login: (profile: CustomerProfile) => void;
  logout: () => void;
  updateProfile: (profile: CustomerProfile) => void;
  addAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  updateAddress: (id: string, address: Omit<CustomerAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: CustomerOrder) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCustomer = localStorage.getItem('yatiya_customer');
      if (storedCustomer) setCustomer(JSON.parse(storedCustomer));

      const storedAddresses = localStorage.getItem('yatiya_addresses');
      if (storedAddresses) setAddresses(JSON.parse(storedAddresses));

      const storedOrders = localStorage.getItem('yatiya_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (customer) localStorage.setItem('yatiya_customer', JSON.stringify(customer));
    else localStorage.removeItem('yatiya_customer');
  }, [customer, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('yatiya_addresses', JSON.stringify(addresses));
  }, [addresses, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('yatiya_orders', JSON.stringify(orders));
  }, [orders, isLoaded]);

  const login = (profile: CustomerProfile) => setCustomer(profile);
  const logout = () => setCustomer(null);
  const updateProfile = (profile: CustomerProfile) => setCustomer(profile);

  const addAddress = (address: Omit<CustomerAddress, 'id'>) => {
    const newAddress = { ...address, id: 'ADDR-' + Date.now() };
    if (addresses.length === 0 || newAddress.isDefault) {
      newAddress.isDefault = true;
      setAddresses([...addresses.map(a => ({ ...a, isDefault: false })), newAddress]);
    } else {
      setAddresses([...addresses, newAddress]);
    }
  };

  const updateAddress = (id: string, updatedAddress: Omit<CustomerAddress, 'id'>) => {
    let newAddresses = addresses.map(a => a.id === id ? { ...updatedAddress, id } : a);
    if (updatedAddress.isDefault) {
      newAddresses = newAddresses.map(a => a.id === id ? a : { ...a, isDefault: false });
    }
    setAddresses(newAddresses);
  };

  const deleteAddress = (id: string) => {
    const newAddresses = addresses.filter(a => a.id !== id);
    if (newAddresses.length > 0 && !newAddresses.some(a => a.isDefault)) {
      newAddresses[0].isDefault = true;
    }
    setAddresses(newAddresses);
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const addOrder = (order: CustomerOrder) => {
    setOrders([order, ...orders]);
  };

  return (
    <CustomerContext.Provider value={{
      customer,
      addresses,
      orders,
      isLoggedIn: !!customer,
      login,
      logout,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      addOrder
    }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}
`,

  // src/app/account/layout.tsx
  'src/app/account/layout.tsx': `
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCustomer } from '@/context/CustomerContext';
import { useEffect, useState } from 'react';
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, customer, logout } = useCustomer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#FCFAF7]"></div>;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] bg-[#FCFAF7] flex flex-col items-center justify-center py-20 px-6 font-sans">
        <h1 className="text-3xl md:text-4xl font-display text-yatiya-black mb-4">My Account</h1>
        <p className="text-yatiya-black/70 mb-8">Please sign in to access your account.</p>
        <button 
          onClick={() => {
            const { useCustomer } = require('@/context/CustomerContext');
            // Fake login for frontend phase
            const profile = { name: 'Yatiya Customer', email: 'customer@example.com', phone: '9876543210' };
            localStorage.setItem('yatiya_customer', JSON.stringify(profile));
            window.location.reload();
          }}
          className="bg-yatiya-black text-white px-10 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors"
        >
          Sign In (Demo)
        </button>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', href: '/account', icon: User },
    { name: 'My Orders', href: '/account/orders', icon: Package },
    { name: 'Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Profile', href: '/account/profile', icon: User },
    { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] pt-24 pb-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-display text-yatiya-black mb-10 text-center md:text-left">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="md:w-[250px] shrink-0">
            <div className="bg-white border border-[#E9E3DD] p-6 shadow-sm sticky top-24">
              <div className="mb-6 pb-6 border-b border-[#E9E3DD]">
                <p className="text-[14px] text-yatiya-black/70">Welcome back,</p>
                <p className="text-[18px] font-medium text-yatiya-black truncate">{customer?.name}</p>
              </div>
              
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.href}
                      href={item.href}
                      className={\`flex items-center gap-3 px-4 py-3 text-[14px] transition-colors \${isActive ? 'bg-[#F7F0E8] text-[#C6A15B] font-medium' : 'text-yatiya-black/70 hover:bg-[#FCFAF7] hover:text-[#C6A15B]'}\`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-[14px] text-red-600/80 hover:bg-red-50 hover:text-red-700 transition-colors mt-2 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
`,

  // src/app/account/page.tsx
  'src/app/account/page.tsx': `
"use client";

import { useCustomer } from '@/context/CustomerContext';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import { Package, MapPin, Heart, User } from 'lucide-react';

export default function AccountOverview() {
  const { customer, orders } = useCustomer();
  const { items } = useWishlist();

  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
  const pendingOrders = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display text-yatiya-black mb-2">Overview</h2>
        <p className="text-yatiya-black/70 text-[14px]">Manage your account details and view your latest activity.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E9E3DD] p-6 text-center shadow-sm">
          <p className="text-[24px] font-display text-yatiya-black mb-1">{orders.length}</p>
          <p className="text-[12px] uppercase tracking-widest text-yatiya-black/60">Total Orders</p>
        </div>
        <div className="bg-white border border-[#E9E3DD] p-6 text-center shadow-sm">
          <p className="text-[24px] font-display text-yatiya-black mb-1">{pendingOrders}</p>
          <p className="text-[12px] uppercase tracking-widest text-yatiya-black/60">Pending</p>
        </div>
        <div className="bg-white border border-[#E9E3DD] p-6 text-center shadow-sm">
          <p className="text-[24px] font-display text-yatiya-black mb-1">{deliveredOrders}</p>
          <p className="text-[12px] uppercase tracking-widest text-yatiya-black/60">Delivered</p>
        </div>
        <div className="bg-white border border-[#E9E3DD] p-6 text-center shadow-sm">
          <p className="text-[24px] font-display text-yatiya-black mb-1">{items.length}</p>
          <p className="text-[12px] uppercase tracking-widest text-yatiya-black/60">Wishlist</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/account/orders" className="group bg-white border border-[#E9E3DD] p-6 shadow-sm hover:border-[#C6A15B] transition-colors flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F7F0E8] flex items-center justify-center text-[#C6A15B]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-yatiya-black group-hover:text-[#C6A15B] transition-colors">My Orders</h3>
              <p className="text-[13px] text-yatiya-black/60">Track, return, or buy things again</p>
            </div>
          </div>
        </Link>
        
        <Link href="/account/addresses" className="group bg-white border border-[#E9E3DD] p-6 shadow-sm hover:border-[#C6A15B] transition-colors flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F7F0E8] flex items-center justify-center text-[#C6A15B]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-yatiya-black group-hover:text-[#C6A15B] transition-colors">Addresses</h3>
              <p className="text-[13px] text-yatiya-black/60">Edit delivery addresses</p>
            </div>
          </div>
        </Link>
        
        <Link href="/account/profile" className="group bg-white border border-[#E9E3DD] p-6 shadow-sm hover:border-[#C6A15B] transition-colors flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F7F0E8] flex items-center justify-center text-[#C6A15B]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-yatiya-black group-hover:text-[#C6A15B] transition-colors">Profile</h3>
              <p className="text-[13px] text-yatiya-black/60">Edit personal information</p>
            </div>
          </div>
        </Link>
        
        <Link href="/account/wishlist" className="group bg-white border border-[#E9E3DD] p-6 shadow-sm hover:border-[#C6A15B] transition-colors flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F7F0E8] flex items-center justify-center text-[#C6A15B]">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-yatiya-black group-hover:text-[#C6A15B] transition-colors">Wishlist</h3>
              <p className="text-[13px] text-yatiya-black/60">View saved items</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
`,

  // src/app/account/profile/page.tsx
  'src/app/account/profile/page.tsx': `
"use client";

import { useState } from 'react';
import { useCustomer } from '@/context/CustomerContext';

export default function ProfilePage() {
  const { customer, updateProfile } = useCustomer();
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setMsg('All fields are required.');
      return;
    }
    updateProfile(formData);
    setMsg('Profile updated successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="bg-white border border-[#E9E3DD] p-6 md:p-10 shadow-sm">
      <h2 className="text-2xl font-display text-yatiya-black mb-6">Profile Settings</h2>
      
      {msg && (
        <div className={\`mb-6 p-4 text-[13px] \${msg.includes('success') ? 'bg-[#F7F0E8] text-[#C6A15B]' : 'bg-red-50 text-red-600'}\`}>
          {msg}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div>
          <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B] bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B] bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Mobile Number</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B] bg-transparent"
            required
          />
        </div>
        
        <button type="submit" className="bg-yatiya-black text-white px-8 py-3 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors w-full md:w-auto">
          Save Changes
        </button>
      </form>
    </div>
  );
}
`,

  // src/app/account/addresses/page.tsx
  'src/app/account/addresses/page.tsx': `
"use client";

import { useState } from 'react';
import { useCustomer, CustomerAddress } from '@/context/CustomerContext';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useCustomer();
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddr, setCurrentAddr] = useState<Partial<CustomerAddress>>({});

  const handleEdit = (addr: CustomerAddress) => {
    setCurrentAddr(addr);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentAddr({
      fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India', isDefault: false
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAddr.id) {
      updateAddress(currentAddr.id, currentAddr as any);
    } else {
      addAddress(currentAddr as any);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-[#E9E3DD] p-6 md:p-10 shadow-sm">
        <h2 className="text-2xl font-display text-yatiya-black mb-6">{currentAddr.id ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Full Name *</label>
              <input type="text" required value={currentAddr.fullName || ''} onChange={e => setCurrentAddr({...currentAddr, fullName: e.target.value})} className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Phone *</label>
              <input type="tel" required value={currentAddr.phone || ''} onChange={e => setCurrentAddr({...currentAddr, phone: e.target.value})} className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Address Line 1 *</label>
              <input type="text" required value={currentAddr.addressLine1 || ''} onChange={e => setCurrentAddr({...currentAddr, addressLine1: e.target.value})} className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Address Line 2 (Optional)</label>
              <input type="text" value={currentAddr.addressLine2 || ''} onChange={e => setCurrentAddr({...currentAddr, addressLine2: e.target.value})} className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">City *</label>
              <input type="text" required value={currentAddr.city || ''} onChange={e => setCurrentAddr({...currentAddr, city: e.target.value})} className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">State *</label>
              <input type="text" required value={currentAddr.state || ''} onChange={e => setCurrentAddr({...currentAddr, state: e.target.value})} className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Pincode *</label>
              <input type="text" required pattern="[0-9]{6}" value={currentAddr.pincode || ''} onChange={e => setCurrentAddr({...currentAddr, pincode: e.target.value})} className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Country</label>
              <input type="text" required value={currentAddr.country || 'India'} onChange={e => setCurrentAddr({...currentAddr, country: e.target.value})} className="w-full border border-[#E9E3DD] p-3 text-[14px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]" />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <input type="checkbox" id="default" checked={currentAddr.isDefault || false} onChange={e => setCurrentAddr({...currentAddr, isDefault: e.target.checked})} className="w-4 h-4 text-[#C6A15B]" />
            <label htmlFor="default" className="text-[14px] text-yatiya-black">Set as default address</label>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-yatiya-black text-white px-8 py-3 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors">
              Save Address
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="border border-[#E9E3DD] text-yatiya-black px-8 py-3 text-[12px] uppercase tracking-widest font-medium hover:bg-[#FCFAF7] transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-display text-yatiya-black mb-2">Saved Addresses</h2>
          <p className="text-yatiya-black/70 text-[14px]">Manage your shipping and billing addresses.</p>
        </div>
        <button onClick={handleAddNew} className="bg-yatiya-black text-white px-6 py-3 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white border border-[#E9E3DD] p-10 text-center shadow-sm">
          <MapPin className="w-10 h-10 text-[#C6A15B] mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-yatiya-black mb-2">No saved addresses</h3>
          <p className="text-[14px] text-yatiya-black/70 mb-6">You haven't saved any addresses yet.</p>
          <button onClick={handleAddNew} className="border border-[#C6A15B] text-[#C6A15B] px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] hover:text-white transition-colors">
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map(addr => (
            <div key={addr.id} className={\`bg-white border p-6 relative shadow-sm \${addr.isDefault ? 'border-[#C6A15B]' : 'border-[#E9E3DD]'}\`}>
              {addr.isDefault && (
                <span className="absolute top-0 right-0 bg-[#C6A15B] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-medium">Default</span>
              )}
              <h3 className="font-medium text-yatiya-black mb-2">{addr.fullName}</h3>
              <div className="text-[14px] text-yatiya-black/70 space-y-1 mb-6">
                <p>{addr.addressLine1}</p>
                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                <p>{addr.city}, {addr.state} {addr.pincode}</p>
                <p>{addr.country}</p>
                <p className="pt-2">Mobile: {addr.phone}</p>
              </div>
              <div className="flex items-center gap-4 border-t border-[#E9E3DD] pt-4">
                <button onClick={() => handleEdit(addr)} className="text-[13px] text-yatiya-black hover:text-[#C6A15B] flex items-center gap-1">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <span className="text-[#E9E3DD]">|</span>
                <button onClick={() => deleteAddress(addr.id)} className="text-[13px] text-red-500 hover:text-red-700 flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
                {!addr.isDefault && (
                  <>
                    <span className="text-[#E9E3DD]">|</span>
                    <button onClick={() => setDefaultAddress(addr.id)} className="text-[13px] text-[#C6A15B] hover:text-yatiya-black">
                      Set Default
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`,

  // src/app/account/orders/page.tsx
  'src/app/account/orders/page.tsx': `
"use client";

import { useCustomer } from '@/context/CustomerContext';
import Link from 'next/link';
import { Package } from 'lucide-react';
import Image from 'next/image';

export default function OrdersPage() {
  const { orders } = useCustomer();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'SHIPPED': return 'bg-blue-100 text-blue-800';
      case 'OUT_FOR_DELIVERY': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-[#F7F0E8] text-[#C6A15B]'; // CONFIRMED/PROCESSING
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-display text-yatiya-black mb-2">My Orders</h2>
        <p className="text-yatiya-black/70 text-[14px]">View and track your orders.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-[#E9E3DD] p-10 text-center shadow-sm">
          <Package className="w-10 h-10 text-[#C6A15B] mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-yatiya-black mb-2">No orders yet</h3>
          <p className="text-[14px] text-yatiya-black/70 mb-6">Looks like you haven't placed an order yet.</p>
          <Link href="/products" className="inline-block border border-[#C6A15B] text-[#C6A15B] px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] hover:text-white transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-[#E9E3DD] shadow-sm overflow-hidden">
              <div className="bg-[#FCFAF7] border-b border-[#E9E3DD] p-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6 text-[13px]">
                  <div>
                    <p className="text-yatiya-black/60 mb-1 uppercase tracking-widest text-[10px]">Order Placed</p>
                    <p className="font-medium text-yatiya-black">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-yatiya-black/60 mb-1 uppercase tracking-widest text-[10px]">Total</p>
                    <p className="font-medium text-yatiya-black">,1{order.total.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-yatiya-black/60 mb-1 uppercase tracking-widest text-[10px]">Order ID</p>
                    <p className="font-medium text-yatiya-black">{order.id}</p>
                  </div>
                </div>
                <div>
                  <Link href={\`/account/orders/\${order.id}\`} className="bg-white border border-[#E9E3DD] text-yatiya-black px-4 py-2 text-[11px] uppercase tracking-widest font-medium hover:bg-[#F7F0E8] transition-colors inline-block text-center w-full md:w-auto">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-yatiya-black">
                    <span className={\`inline-block px-2 py-1 text-[11px] uppercase tracking-widest font-medium rounded-sm mr-2 \${getStatusColor(order.status)}\`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="shrink-0 flex items-center gap-4">
                      <div className="w-16 h-20 bg-[#F7F0E8] relative overflow-hidden">
                        {item.image ? (
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#E9E3DD]"></div>
                        )}
                      </div>
                      <div className="text-[13px] hidden md:block">
                        <p className="font-medium text-yatiya-black max-w-[200px] truncate">{item.title}</p>
                        <p className="text-yatiya-black/60 mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length === 0 && <p className="text-[13px] text-yatiya-black/60">No items available</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`,

  // src/app/account/orders/[id]/page.tsx
  'src/app/account/orders/[id]/page.tsx': `
"use client";

import { useCustomer } from '@/context/CustomerContext';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { use } from 'react';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { orders } = useCustomer();
  const order = orders.find(o => o.id === resolvedParams.id);

  if (!order) {
    return notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'SHIPPED': return 'bg-blue-100 text-blue-800';
      case 'OUT_FOR_DELIVERY': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-[#F7F0E8] text-[#C6A15B]';
    }
  };

  const timelineSteps = [
    { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle },
    { key: 'PROCESSING', label: 'Processing', icon: Package },
    { key: 'SHIPPED', label: 'Shipped', icon: Truck },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
    { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIndex = timelineSteps.findIndex(s => s.key === order.status);
  const isCancelled = order.status === 'CANCELLED';

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/account/orders" className="w-10 h-10 flex items-center justify-center border border-[#E9E3DD] hover:bg-[#F7F0E8] transition-colors bg-white">
          <ArrowLeft className="w-4 h-4 text-yatiya-black" />
        </Link>
        <div>
          <h2 className="text-2xl font-display text-yatiya-black mb-1">Order Details</h2>
          <p className="text-yatiya-black/70 text-[13px]">{order.id} • {order.date}</p>
        </div>
      </div>

      <div className="bg-white border border-[#E9E3DD] shadow-sm mb-6 p-6">
        <div className="mb-8">
          <span className={\`inline-block px-3 py-1 text-[12px] uppercase tracking-widest font-medium rounded-sm \${getStatusColor(order.status)}\`}>
            {order.status.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Timeline */}
        {!isCancelled && (
          <div className="mb-10 relative">
            <div className="absolute top-4 left-0 w-full h-[2px] bg-[#E9E3DD]"></div>
            <div 
              className="absolute top-4 left-0 h-[2px] bg-[#C6A15B] transition-all duration-500" 
              style={{ width: \`\${currentStepIndex >= 0 ? (currentStepIndex / (timelineSteps.length - 1)) * 100 : 0}%\` }}
            ></div>
            <div className="relative flex justify-between">
              {timelineSteps.map((step, idx) => {
                const isCompleted = currentStepIndex >= idx;
                const isCurrent = currentStepIndex === idx;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div className={\`w-8 h-8 rounded-full flex items-center justify-center mb-2 z-10 \${isCompleted ? 'bg-[#C6A15B] text-white' : 'bg-white border-2 border-[#E9E3DD] text-[#E9E3DD]'}\`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className={\`text-[11px] uppercase tracking-widest text-center font-medium \${isCompleted ? 'text-yatiya-black' : 'text-yatiya-black/40'}\`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tracking info if shipped */}
        {order.shipment && !isCancelled && (
          <div className="bg-[#F7F0E8]/50 border border-[#E9E3DD] p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-yatiya-black/60 mb-1">Tracking Information</p>
              <p className="text-[14px] text-yatiya-black font-medium">{order.shipment.carrier} - {order.shipment.trackingId}</p>
            </div>
            <button className="bg-white border border-[#C6A15B] text-[#C6A15B] px-6 py-2 text-[11px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] hover:text-white transition-colors">
              Track Order
            </button>
          </div>
        )}

        {/* Items */}
        <h3 className="text-lg font-display text-yatiya-black mb-4">Items ({order.items.length})</h3>
        <div className="border border-[#E9E3DD] divide-y divide-[#E9E3DD] mb-8">
          {order.items.map((item, idx) => (
            <div key={idx} className="p-4 flex gap-4">
              <div className="w-20 h-24 bg-[#F7F0E8] relative shrink-0">
                {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-yatiya-black text-[14px]">{item.title}</h4>
                    <p className="text-[12px] text-yatiya-black/60 mt-1">
                      {item.size && \`Size: \${item.size}\`} {item.color && \`| Color: \${item.color}\`}
                    </p>
                  </div>
                  <p className="font-medium text-yatiya-black text-[14px]">,1{item.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between items-center text-[13px] text-yatiya-black/70">
                  <p>Qty: {item.quantity}</p>
                  <p className="font-medium text-yatiya-black">,1{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Addresses & Payment */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-3">Shipping Address</h3>
              <div className="text-[13px] text-yatiya-black/70 bg-[#FCFAF7] p-4 border border-[#E9E3DD]">
                <p className="font-medium text-yatiya-black mb-1">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-3">Payment Information</h3>
              <div className="text-[13px] text-yatiya-black/70 bg-[#FCFAF7] p-4 border border-[#E9E3DD]">
                <div className="flex justify-between mb-2">
                  <span>Method:</span>
                  <span className="font-medium text-yatiya-black">{order.payment.method === 'ONLINE' ? 'Online Payment' : 'Cash on Delivery'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={\`font-medium \${order.payment.status === 'PAID' ? 'text-green-600' : 'text-yellow-600'}\`}>
                    {order.payment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-3">Order Summary</h3>
            <div className="bg-[#FCFAF7] p-6 border border-[#E9E3DD] space-y-3 text-[14px]">
              <div className="flex justify-between text-yatiya-black/70">
                <span>Subtotal</span>
                <span>,1{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-yatiya-black/70">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : \`,1\${order.shipping.toLocaleString('en-IN')}\`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#C6A15B]">
                  <span>Discount</span>
                  <span>-,1{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="pt-3 border-t border-[#E9E3DD] flex justify-between font-medium text-yatiya-black text-[16px]">
                <span>Total</span>
                <span>,1{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,

  // src/app/account/wishlist/page.tsx
  'src/app/account/wishlist/page.tsx': `
"use client";

import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/shop/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function AccountWishlistPage() {
  const { items } = useWishlist();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-display text-yatiya-black mb-2">My Wishlist</h2>
        <p className="text-yatiya-black/70 text-[14px]">Items you've saved for later.</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-[#E9E3DD] p-10 text-center shadow-sm">
          <Heart className="w-10 h-10 text-[#C6A15B] mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-yatiya-black mb-2">Your wishlist is empty</h3>
          <p className="text-[14px] text-yatiya-black/70 mb-6">Save items you love to review them later.</p>
          <Link href="/products" className="inline-block border border-[#C6A15B] text-[#C6A15B] px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] hover:text-white transition-colors">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      )}
    </div>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

// Update src/app/layout.tsx to add CustomerProvider
let layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
if (!layoutContent.includes('CustomerProvider')) {
  layoutContent = layoutContent.replace(
    'import { WishlistProvider } from "@/context/WishlistContext";',
    'import { WishlistProvider } from "@/context/WishlistContext";\nimport { CustomerProvider } from "@/context/CustomerContext";'
  );
  layoutContent = layoutContent.replace(
    '<WishlistProvider>',
    '<CustomerProvider>\n          <WishlistProvider>'
  );
  layoutContent = layoutContent.replace(
    '</WishlistProvider>',
    '</WishlistProvider>\n          </CustomerProvider>'
  );
  fs.writeFileSync('src/app/layout.tsx', layoutContent);
}

console.log('Phase 6 account files generated.');
