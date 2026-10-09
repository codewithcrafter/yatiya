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
      default: return 'bg-yatiya-ivory text-yatiya-roman-gold'; // CONFIRMED/PROCESSING
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-display text-yatiya-dark-cocoa mb-2">My Orders</h2>
        <p className="text-yatiya-dark-cocoa/70 text-[14px]">View and track your orders.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-10 text-center shadow-sm">
          <Package className="w-10 h-10 text-yatiya-roman-gold mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-yatiya-dark-cocoa mb-2">No orders yet</h3>
          <p className="text-[14px] text-yatiya-dark-cocoa/70 mb-6">Looks like you haven't placed an order yet.</p>
          <Link href="/products" className="inline-block border border-yatiya-roman-gold text-yatiya-roman-gold px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text hover:text-yatiya-light-text transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-yatiya-cream border border-yatiya-light-gold shadow-sm overflow-hidden">
              <div className="bg-yatiya-ivory border-b border-yatiya-light-gold p-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6 text-[13px]">
                  <div>
                    <p className="text-yatiya-dark-cocoa/60 mb-1 uppercase tracking-widest text-[10px]">Order Placed</p>
                    <p className="font-medium text-yatiya-dark-cocoa">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-yatiya-dark-cocoa/60 mb-1 uppercase tracking-widest text-[10px]">Total</p>
                    <p className="font-medium text-yatiya-dark-cocoa">,1{order.total.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-yatiya-dark-cocoa/60 mb-1 uppercase tracking-widest text-[10px]">Order ID</p>
                    <p className="font-medium text-yatiya-dark-cocoa">{order.id}</p>
                  </div>
                </div>
                <div>
                  <Link href={`/account/orders/${order.id}`} className="bg-yatiya-cream border border-yatiya-light-gold text-yatiya-dark-cocoa px-4 py-2 text-[11px] uppercase tracking-widest font-medium hover:bg-yatiya-ivory transition-colors inline-block text-center w-full md:w-auto">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-yatiya-dark-cocoa">
                    <span className={`inline-block px-2 py-1 text-[11px] uppercase tracking-widest font-medium rounded-sm mr-2 ${getStatusColor(order.status)}`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="shrink-0 flex items-center gap-4">
                      <div className="w-16 h-20 bg-yatiya-ivory relative overflow-hidden">
                        {item.image ? (
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-yatiya-light-gold"></div>
                        )}
                      </div>
                      <div className="text-[13px] hidden md:block">
                        <p className="font-medium text-yatiya-dark-cocoa max-w-[200px] truncate">{item.title}</p>
                        <p className="text-yatiya-dark-cocoa/60 mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length === 0 && <p className="text-[13px] text-yatiya-dark-cocoa/60">No items available</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
