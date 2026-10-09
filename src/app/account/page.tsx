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
        <h2 className="text-2xl font-display text-yatiya-dark-cocoa mb-2">Overview</h2>
        <p className="text-yatiya-dark-cocoa/70 text-[14px]">Manage your account details and view your latest activity.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 text-center shadow-sm">
          <p className="text-[24px] font-display text-yatiya-dark-cocoa mb-1">{orders.length}</p>
          <p className="text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60">Total Orders</p>
        </div>
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 text-center shadow-sm">
          <p className="text-[24px] font-display text-yatiya-dark-cocoa mb-1">{pendingOrders}</p>
          <p className="text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60">Pending</p>
        </div>
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 text-center shadow-sm">
          <p className="text-[24px] font-display text-yatiya-dark-cocoa mb-1">{deliveredOrders}</p>
          <p className="text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60">Delivered</p>
        </div>
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 text-center shadow-sm">
          <p className="text-[24px] font-display text-yatiya-dark-cocoa mb-1">{items.length}</p>
          <p className="text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60">Wishlist</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/account/orders" className="group bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm hover:border-yatiya-roman-gold transition-colors flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yatiya-ivory flex items-center justify-center text-yatiya-roman-gold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-yatiya-dark-cocoa group-hover:text-yatiya-roman-gold transition-colors">My Orders</h3>
              <p className="text-[13px] text-yatiya-dark-cocoa/60">Track, return, or buy things again</p>
            </div>
          </div>
        </Link>
        
        <Link href="/account/addresses" className="group bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm hover:border-yatiya-roman-gold transition-colors flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yatiya-ivory flex items-center justify-center text-yatiya-roman-gold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-yatiya-dark-cocoa group-hover:text-yatiya-roman-gold transition-colors">Addresses</h3>
              <p className="text-[13px] text-yatiya-dark-cocoa/60">Edit delivery addresses</p>
            </div>
          </div>
        </Link>
        
        <Link href="/account/profile" className="group bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm hover:border-yatiya-roman-gold transition-colors flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yatiya-ivory flex items-center justify-center text-yatiya-roman-gold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-yatiya-dark-cocoa group-hover:text-yatiya-roman-gold transition-colors">Profile</h3>
              <p className="text-[13px] text-yatiya-dark-cocoa/60">Edit personal information</p>
            </div>
          </div>
        </Link>
        
        <Link href="/account/wishlist" className="group bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm hover:border-yatiya-roman-gold transition-colors flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yatiya-ivory flex items-center justify-center text-yatiya-roman-gold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-yatiya-dark-cocoa group-hover:text-yatiya-roman-gold transition-colors">Wishlist</h3>
              <p className="text-[13px] text-yatiya-dark-cocoa/60">View saved items</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
