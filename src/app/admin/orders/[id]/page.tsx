"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('yatiya_orders') || '[]');
    const found = storedOrders.find((o: any) => o.id === resolvedParams.id);
    if (found) setOrder(found);
  }, [resolvedParams.id]);

  const handleStatusChange = (newStatus: string) => {
    const storedOrders = JSON.parse(localStorage.getItem('yatiya_orders') || '[]');
    const updatedOrders = storedOrders.map((o: any) => o.id === resolvedParams.id ? { ...o, status: newStatus } : o);
    localStorage.setItem('yatiya_orders', JSON.stringify(updatedOrders));
    setOrder({ ...order, status: newStatus });
    alert('Status updated to ' + newStatus);
  };

  if (!order) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display text-yatiya-dark-cocoa">Order {order.id}</h1>
          <p className="text-[13px] text-yatiya-dark-cocoa/60">{order.date}</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border border-yatiya-light-gold bg-yatiya-cream p-2 text-[13px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold"
          >
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm">
          <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-4">Customer Details</h3>
          <div className="text-[14px] text-yatiya-dark-cocoa/80 space-y-2">
            <p><span className="text-yatiya-dark-cocoa/60">Name:</span> {order.shippingAddress.fullName}</p>
            <p><span className="text-yatiya-dark-cocoa/60">Phone:</span> {order.shippingAddress.phone}</p>
            <p><span className="text-yatiya-dark-cocoa/60">Address:</span> {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
          </div>
        </div>
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm">
          <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-4">Payment Summary</h3>
          <div className="text-[14px] text-yatiya-dark-cocoa/80 space-y-2">
            <div className="flex justify-between"><span className="text-yatiya-dark-cocoa/60">Subtotal:</span> <span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-yatiya-dark-cocoa/60">Shipping:</span> <span>₹{order.shipping.toLocaleString('en-IN')}</span></div>
            {order.discount > 0 && <div className="flex justify-between"><span className="text-yatiya-roman-gold">Discount:</span> <span className="text-yatiya-roman-gold">-₹{order.discount.toLocaleString('en-IN')}</span></div>}
            <div className="flex justify-between font-medium text-yatiya-dark-cocoa pt-2 border-t border-yatiya-light-gold"><span>Total:</span> <span>₹{order.total.toLocaleString('en-IN')}</span></div>
          </div>
        </div>
      </div>
      
      <div className="bg-yatiya-cream border border-yatiya-light-gold shadow-sm">
        <div className="p-4 border-b border-yatiya-light-gold bg-yatiya-ivory">
          <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa">Order Items</h3>
        </div>
        <div className="divide-y divide-[#E9E3DD]">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="p-4 flex gap-4">
              <div className="w-16 h-20 bg-yatiya-light-gold shrink-0 overflow-hidden">
                {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 flex justify-between">
                <div>
                  <p className="font-medium text-yatiya-dark-cocoa text-[14px]">{item.title}</p>
                  <p className="text-[12px] text-yatiya-dark-cocoa/60 mt-1">Size: {item.size} | Color: {item.color}</p>
                  {item.customMeasurements && (
                    <div className="mt-2 text-[11px] p-2 bg-yatiya-ivory border border-yatiya-light-gold">
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
                <div className="text-right">
                  <p className="font-medium text-yatiya-dark-cocoa text-[14px]">₹{item.price.toLocaleString('en-IN')}</p>
                  <p className="text-[12px] text-yatiya-dark-cocoa/60">Qty: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
