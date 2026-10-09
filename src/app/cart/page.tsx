
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
        <h1 className="text-3xl md:text-5xl font-display text-yatiya-dark-cocoa mb-6 uppercase tracking-widest text-center">Your Cart</h1>
        <p className="text-yatiya-dark-cocoa/60 font-sans mb-10 text-center">Your cart is currently empty.</p>
        <Link href="/products" className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-8 py-4 text-[12px] uppercase tracking-widest hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yatiya-ivory px-6 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-display text-yatiya-dark-cocoa mb-12 uppercase tracking-widest">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-yatiya-light-gold text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            
            <div className="flex flex-col gap-6 pt-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center py-4 border-b border-yatiya-light-gold/50">
                  <div className="col-span-6 flex gap-4 w-full">
                    <Link href={`/products/${item.slug}`} className="w-24 aspect-[3/4] relative bg-yatiya-ivory flex-shrink-0 block">
                      <SmartImage src={item.image} alt={item.title} fill className="object-cover" />
                    </Link>
                    <div className="flex flex-col flex-grow">
                      <Link href={`/products/${item.slug}`} className="text-[14px] md:text-[16px] font-display text-yatiya-dark-cocoa hover:text-yatiya-antique-gold mb-2 line-clamp-2">
                        {item.title}
                      </Link>
                      <div className="text-[12px] text-yatiya-dark-cocoa/60 font-sans space-y-1 mb-3">
                        {item.size && <p>Size: {item.size}</p>}
                        {item.color && <p>Color: {item.color}</p>}
                        {item.customMeasurements && (
                          <div className="mt-2 text-[11px] p-2 bg-yatiya-ivory/50 border border-yatiya-light-gold">
                            <p className="font-medium text-yatiya-roman-gold mb-1">Custom Measurements</p>
                            <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                              {Object.entries(item.customMeasurements).map(([k, v]) => v ? (
                                <li key={k} className="truncate">
                                  <span className="capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}:</span> {v}
                                </li>
                              ) : null)}
                            </ul>
                          </div>
                        )}
                        <p className="md:hidden">Price: ₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-auto">
                        <button onClick={() => removeItem(item.id)} className="text-[11px] uppercase tracking-widest text-red-700/70 hover:text-red-700 flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                        <button onClick={() => handleMoveToWishlist(item)} className="text-[11px] uppercase tracking-widest text-yatiya-dark-cocoa/60 hover:text-yatiya-antique-gold flex items-center gap-1">
                          <Heart className="w-3 h-3" /> Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex justify-between md:justify-center items-center w-full md:w-auto mt-4 md:mt-0">
                    <span className="md:hidden text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60">Qty</span>
                    <div className="flex items-center border border-yatiya-light-gold">
                      <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)} className="px-3 py-1 hover:bg-yatiya-ivory">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-[13px]">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)} className="px-3 py-1 hover:bg-yatiya-ivory">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-3 text-right w-full md:w-auto mt-2 md:mt-0 font-medium">
                    <span className="md:hidden text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60 mr-2">Total</span>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-yatiya-ivory/50 border border-yatiya-light-gold p-6 sticky top-24">
              <h2 className="text-[14px] font-medium uppercase tracking-widest text-yatiya-dark-cocoa mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-[14px] font-sans text-yatiya-dark-cocoa/80 mb-6 pb-6 border-b border-yatiya-light-gold">
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
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-[18px] font-medium text-yatiya-dark-cocoa mb-8">
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
                    className="flex-1 border border-yatiya-light-gold bg-yatiya-cream px-3 py-2 text-[12px] uppercase tracking-wider focus:outline-none focus:border-yatiya-roman-gold"
                  />
                  <button onClick={applyCoupon} className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-4 py-2 text-[11px] uppercase tracking-widest hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-[11px] ${couponMsg.includes('success') ? 'text-green-700' : 'text-red-700'}`}>{couponMsg}</p>
                )}
              </div>
              
              <Link href="/checkout" className="block w-full bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold text-center py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors mb-4">
                Proceed to Checkout
              </Link>
              <Link href="/products" className="block w-full bg-transparent border border-yatiya-antique-gold text-yatiya-dark-cocoa text-center py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-ivory hover:border-yatiya-roman-gold transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
