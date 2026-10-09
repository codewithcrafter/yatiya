"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('yatiya-last-order');
    if (data) {
      try {
        setOrderInfo(JSON.parse(data));
      } catch (e) {}
    }
  }, []);

  return (
    <div className="min-h-[70vh] bg-yatiya-ivory flex flex-col items-center justify-center py-20 px-6 font-sans">
      <div className="max-w-[600px] w-full bg-yatiya-cream p-10 md:p-16 border border-yatiya-light-gold text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-yatiya-roman-gold" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl md:text-4xl font-display text-yatiya-dark-cocoa mb-4">Order Confirmed</h1>
        <p className="text-yatiya-dark-cocoa/70 mb-8 leading-relaxed">
          Thank you for shopping with Yatiya Couture. Your mock frontend order has been successfully placed.
        </p>
        
        {orderInfo && (
          <div className="bg-yatiya-ivory/50 border border-yatiya-light-gold p-6 text-left mb-10">
            <h2 className="text-[11px] uppercase tracking-widest text-yatiya-dark-cocoa/60 mb-4">Order Details (Frontend Mock)</h2>
            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-yatiya-dark-cocoa/70">Order Reference:</span>
                <span className="font-medium text-yatiya-dark-cocoa">{orderInfo.orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yatiya-dark-cocoa/70">Amount Paid:</span>
                <span className="font-medium text-yatiya-dark-cocoa">₹{orderInfo.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yatiya-dark-cocoa/70">Payment Method:</span>
                <span className="font-medium text-yatiya-dark-cocoa">{orderInfo.paymentMethod === 'ONLINE' ? 'Online Payment' : 'Cash on Delivery'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yatiya-dark-cocoa/70">Confirmation Email:</span>
                <span className="font-medium text-yatiya-dark-cocoa">{orderInfo.email}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={`/account/orders/${orderInfo?.orderRef}`} className="inline-block bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-10 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
            View My Order
          </Link>
          <Link href="/" className="inline-block border border-yatiya-light-gold text-yatiya-dark-cocoa px-10 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-ivory transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
