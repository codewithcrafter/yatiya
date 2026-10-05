"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string; // Typically productId + size + color
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("yatiya-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("yatiya-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (item: CartItem) => {
    setItems((current) => {
      const existing = current.find(i => i.id === item.id);
      if (existing) {
        return current.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...current, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) return current.filter(i => i.id !== id);
      return current.map(i => i.id === id ? { ...i, quantity } : i);
    });
  };

  const clearCart = () => setItems([]);
  const getCartTotal = () => items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getCartCount = () => items.reduce((count, item) => count + item.quantity, 0);

  // Avoid hydration mismatch by rendering nothing (or children without state) until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    // Provide a safe fallback for SSR
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getCartTotal: () => 0,
      getCartCount: () => 0
    };
  }
  return context;
}
