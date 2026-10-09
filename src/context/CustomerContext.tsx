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
