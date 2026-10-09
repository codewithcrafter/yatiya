
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WishlistContextType {
  items: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("yatiya-wishlist");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("yatiya-wishlist", JSON.stringify(items));
    }
  }, [items, mounted]);

  const toggleWishlist = (productId: string) => {
    setItems((current) => {
      if (current.includes(productId)) {
        return current.filter(id => id !== productId);
      }
      return [...current, productId];
    });
  };

  const isInWishlist = (productId: string) => items.includes(productId);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    return {
      items: [],
      toggleWishlist: () => {},
      isInWishlist: () => false,
    };
  }
  return context;
}
