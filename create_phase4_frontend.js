const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. Create WishlistContext
const ctxDir = path.join(baseDir, 'context');
ensureDir(ctxDir);

const wishlistContextContent = `
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
`;
fs.writeFileSync(path.join(ctxDir, 'WishlistContext.tsx'), wishlistContextContent);


// 2. Update Layout
const layoutPath = path.join(baseDir, 'app', 'layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
if (!layoutContent.includes('WishlistProvider')) {
  layoutContent = layoutContent.replace(
    'import { CartProvider } from "@/context/CartContext";',
    `import { CartProvider } from "@/context/CartContext";\nimport { WishlistProvider } from "@/context/WishlistContext";`
  );
  layoutContent = layoutContent.replace(
    '<CartProvider>',
    '<CartProvider>\n          <WishlistProvider>'
  );
  layoutContent = layoutContent.replace(
    '</CartProvider>',
    '</WishlistProvider>\n        </CartProvider>'
  );
  fs.writeFileSync(layoutPath, layoutContent);
}


// 3. Update Header
const headerPath = path.join(baseDir, 'components', 'header', 'Header.tsx');
let headerContent = fs.readFileSync(headerPath, 'utf8');
if (headerContent.includes('export function Header()')) {
  headerContent = headerContent.replace(
    'import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";',
    'import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";\nimport { useCart } from "@/context/CartContext";\nimport { useWishlist } from "@/context/WishlistContext";'
  );
  headerContent = headerContent.replace(
    'export function Header() {',
    'export function Header() {\n  const { getCartCount } = useCart();\n  const { items: wishlistItems } = useWishlist();\n  const cartCount = getCartCount();'
  );
  
  // replace <ShoppingBag className="w-5 h-5" /> with the one that includes badge
  headerContent = headerContent.replace(
    /<ShoppingBag className="w-5 h-5" \/>/g,
    `
      <div className="relative">
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#641F32] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </div>
    `
  );

  // replace Heart
  headerContent = headerContent.replace(
    /<Heart className="w-5 h-5" \/>/g,
    `
      <div className="relative">
        <Heart className="w-5 h-5" />
        {wishlistItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#641F32] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {wishlistItems.length}
          </span>
        )}
      </div>
    `
  );

  fs.writeFileSync(headerPath, headerContent);
}


// 4. Create Cart Page
ensureDir(path.join(baseDir, 'app', 'cart'));
const cartPageContent = `
"use client";

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { SmartImage } from '@/components/ui/SmartImage';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { getProductBySlug } from '@/data/mockData';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'YATIYA10') {
      setDiscount(subtotal * 0.1);
      setCouponMsg('Coupon applied successfully!');
    } else {
      setDiscount(0);
      setCouponMsg('Invalid coupon code.');
    }
  };

  const handleMoveToWishlist = (item: any) => {
    const prod = getProductBySlug(item.slug);
    if (prod && !isInWishlist(prod.id)) {
      toggleWishlist(prod.id);
    }
    removeItem(item.id);
  };

  const handleUpdateQuantity = (item: any, newQty: number) => {
    const prod = getProductBySlug(item.slug);
    if (prod && prod.stockStatus === 'OUT_OF_STOCK') return;
    updateQuantity(item.id, Math.max(1, Math.min(newQty, 5)));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-yatiya-ivory px-6 py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-display text-yatiya-black mb-6 uppercase tracking-widest text-center">Your Cart</h1>
        <p className="text-yatiya-black/60 font-sans mb-10 text-center">Your cart is currently empty.</p>
        <Link href="/products" className="bg-yatiya-black text-white px-8 py-4 text-[12px] uppercase tracking-widest hover:bg-[#C6A15B] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yatiya-ivory px-6 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-display text-yatiya-black mb-12 uppercase tracking-widest">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#E9E3DD] text-[12px] uppercase tracking-widest text-yatiya-black/60">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            
            <div className="flex flex-col gap-6 pt-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center py-4 border-b border-[#E9E3DD]/50">
                  <div className="col-span-6 flex gap-4 w-full">
                    <Link href={\`/products/\${item.slug}\`} className="w-24 aspect-[3/4] relative bg-[#F7F0E8] flex-shrink-0 block">
                      <SmartImage src={item.image} alt={item.title} fill className="object-cover" />
                    </Link>
                    <div className="flex flex-col flex-grow">
                      <Link href={\`/products/\${item.slug}\`} className="text-[14px] md:text-[16px] font-display text-yatiya-black hover:text-[#C6A15B] mb-2 line-clamp-2">
                        {item.title}
                      </Link>
                      <div className="text-[12px] text-yatiya-black/60 font-sans space-y-1 mb-3">
                        {item.size && <p>Size: {item.size}</p>}
                        {item.color && <p>Color: {item.color}</p>}
                        <p className="md:hidden">Price: ₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-auto">
                        <button onClick={() => removeItem(item.id)} className="text-[11px] uppercase tracking-widest text-red-700/70 hover:text-red-700 flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                        <button onClick={() => handleMoveToWishlist(item)} className="text-[11px] uppercase tracking-widest text-yatiya-black/60 hover:text-[#C6A15B] flex items-center gap-1">
                          <Heart className="w-3 h-3" /> Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex justify-between md:justify-center items-center w-full md:w-auto mt-4 md:mt-0">
                    <span className="md:hidden text-[12px] uppercase tracking-widest text-yatiya-black/60">Qty</span>
                    <div className="flex items-center border border-[#E9E3DD]">
                      <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)} className="px-3 py-1 hover:bg-[#F7F0E8]">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-[13px]">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)} className="px-3 py-1 hover:bg-[#F7F0E8]">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-3 text-right w-full md:w-auto mt-2 md:mt-0 font-medium">
                    <span className="md:hidden text-[12px] uppercase tracking-widest text-yatiya-black/60 mr-2">Total</span>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#F7F0E8]/50 border border-[#E9E3DD] p-6 sticky top-24">
              <h2 className="text-[14px] font-medium uppercase tracking-widest text-yatiya-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-[14px] font-sans text-yatiya-black/80 mb-6 pb-6 border-b border-[#E9E3DD]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : \`₹\${shipping}\`}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-[18px] font-medium text-yatiya-black mb-8">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="mb-8">
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    placeholder="Enter coupon code" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 border border-[#E9E3DD] bg-white px-3 py-2 text-[12px] uppercase tracking-wider focus:outline-none focus:border-[#C6A15B]"
                  />
                  <button onClick={applyCoupon} className="bg-yatiya-black text-white px-4 py-2 text-[11px] uppercase tracking-widest hover:bg-[#C6A15B] transition-colors">
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={\`text-[11px] \${couponMsg.includes('success') ? 'text-green-700' : 'text-red-700'}\`}>{couponMsg}</p>
                )}
              </div>
              
              <Link href="/checkout" className="block w-full bg-yatiya-black text-white text-center py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors mb-4">
                Proceed to Checkout
              </Link>
              <Link href="/products" className="block w-full bg-transparent border border-yatiya-black text-yatiya-black text-center py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#F7F0E8] hover:border-[#C6A15B] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(baseDir, 'app', 'cart', 'page.tsx'), cartPageContent);

// 5. Create Wishlist Page
ensureDir(path.join(baseDir, 'app', 'wishlist'));
const wishlistPageContent = `
"use client";

import { useWishlist } from '@/context/WishlistContext';
import { getProducts } from '@/data/mockData';
import { ProductCard } from '@/components/shop/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { items } = useWishlist();
  const allProducts = getProducts();
  const wishlistProducts = allProducts.filter(p => items.includes(p.id));

  return (
    <div className="min-h-screen bg-yatiya-ivory px-6 py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl md:text-5xl font-display text-center text-yatiya-black mb-4 uppercase tracking-widest">Your Wishlist</h1>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-yatiya-black/60 font-sans mb-8">You haven't saved any items yet.</p>
            <Link href="/products" className="bg-yatiya-black text-white px-8 py-4 text-[12px] uppercase tracking-widest hover:bg-[#C6A15B] transition-colors">
              Discover Products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-[12px] uppercase tracking-widest text-yatiya-black/60 mb-12">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {wishlistProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(baseDir, 'app', 'wishlist', 'page.tsx'), wishlistPageContent);

console.log("Phase 4 files partially generated.");
