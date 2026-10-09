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
      default: return 'bg-yatiya-ivory text-yatiya-roman-gold';
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
        <Link href="/account/orders" className="w-10 h-10 flex items-center justify-center border border-yatiya-light-gold hover:bg-yatiya-ivory transition-colors bg-yatiya-cream">
          <ArrowLeft className="w-4 h-4 text-yatiya-dark-cocoa" />
        </Link>
        <div>
          <h2 className="text-2xl font-display text-yatiya-dark-cocoa mb-1">Order Details</h2>
          <p className="text-yatiya-dark-cocoa/70 text-[13px]">{order.id} • {order.date}</p>
        </div>
      </div>

      <div className="bg-yatiya-cream border border-yatiya-light-gold shadow-sm mb-6 p-6">
        <div className="mb-8">
          <span className={`inline-block px-3 py-1 text-[12px] uppercase tracking-widest font-medium rounded-sm ${getStatusColor(order.status)}`}>
            {order.status.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Timeline */}
        {!isCancelled && (
          <div className="mb-10 relative">
            <div className="absolute top-4 left-0 w-full h-[2px] bg-yatiya-light-gold"></div>
            <div 
              className="absolute top-4 left-0 h-[2px] bg-yatiya-roman-gold transition-all duration-500" 
              style={{ width: `${currentStepIndex >= 0 ? (currentStepIndex / (timelineSteps.length - 1)) * 100 : 0}%` }}
            ></div>
            <div className="relative flex justify-between">
              {timelineSteps.map((step, idx) => {
                const isCompleted = currentStepIndex >= idx;
                const isCurrent = currentStepIndex === idx;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 z-10 ${isCompleted ? 'bg-yatiya-roman-gold text-yatiya-light-text' : 'bg-yatiya-cream border-2 border-yatiya-light-gold text-[#E9E3DD]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className={`text-[11px] uppercase tracking-widest text-center font-medium ${isCompleted ? 'text-yatiya-dark-cocoa' : 'text-yatiya-dark-cocoa/40'}`}>
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
          <div className="bg-yatiya-ivory/50 border border-yatiya-light-gold p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-yatiya-dark-cocoa/60 mb-1">Tracking Information</p>
              <p className="text-[14px] text-yatiya-dark-cocoa font-medium">{order.shipment.carrier} - {order.shipment.trackingId}</p>
            </div>
            <button className="bg-yatiya-cream border border-yatiya-roman-gold text-yatiya-roman-gold px-6 py-2 text-[11px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text hover:text-yatiya-light-text transition-colors">
              Track Order
            </button>
          </div>
        )}

        {/* Items */}
        <h3 className="text-lg font-display text-yatiya-dark-cocoa mb-4">Items ({order.items.length})</h3>
        <div className="border border-yatiya-light-gold divide-y divide-[#E9E3DD] mb-8">
          {order.items.map((item, idx) => (
            <div key={idx} className="p-4 flex gap-4">
              <div className="w-20 h-24 bg-yatiya-ivory relative shrink-0">
                {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-yatiya-dark-cocoa text-[14px]">{item.title}</h4>
                    <p className="text-[12px] text-yatiya-dark-cocoa/60 mt-1">
                      {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                    </p>
                    {item.customMeasurements && (
                      <div className="mt-2 text-[11px] p-2 bg-yatiya-ivory/50 border border-yatiya-light-gold">
                        <p className="font-medium text-yatiya-roman-gold mb-1">Custom Measurements</p>
                        <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-yatiya-dark-cocoa/70">
                          {Object.entries(item.customMeasurements).map(([k, v]) => v ? (
                            <li key={k} className="truncate">
                              <span className="capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}:</span> {v as string}
                            </li>
                          ) : null)}
                        </ul>
                      </div>
                    )}
                  </div>
                  <p className="font-medium text-yatiya-dark-cocoa text-[14px]">,1{item.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between items-center text-[13px] text-yatiya-dark-cocoa/70">
                  <p>Qty: {item.quantity}</p>
                  <p className="font-medium text-yatiya-dark-cocoa">,1{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Addresses & Payment */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-3">Shipping Address</h3>
              <div className="text-[13px] text-yatiya-dark-cocoa/70 bg-yatiya-ivory p-4 border border-yatiya-light-gold">
                <p className="font-medium text-yatiya-dark-cocoa mb-1">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-3">Payment Information</h3>
              <div className="text-[13px] text-yatiya-dark-cocoa/70 bg-yatiya-ivory p-4 border border-yatiya-light-gold">
                <div className="flex justify-between mb-2">
                  <span>Method:</span>
                  <span className="font-medium text-yatiya-dark-cocoa">{order.payment.method === 'ONLINE' ? 'Online Payment' : 'Cash on Delivery'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium ${order.payment.status === 'PAID' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.payment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-3">Order Summary</h3>
            <div className="bg-yatiya-ivory p-6 border border-yatiya-light-gold space-y-3 text-[14px]">
              <div className="flex justify-between text-yatiya-dark-cocoa/70">
                <span>Subtotal</span>
                <span>,1{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-yatiya-dark-cocoa/70">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : `,1${order.shipping.toLocaleString('en-IN')}`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-yatiya-roman-gold">
                  <span>Discount</span>
                  <span>-,1{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="pt-3 border-t border-yatiya-light-gold flex justify-between font-medium text-yatiya-dark-cocoa text-[16px]">
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
