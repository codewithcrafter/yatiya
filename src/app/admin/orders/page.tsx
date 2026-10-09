"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('yatiya_orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const filteredOrders = orders.filter(o => o.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-display text-yatiya-dark-cocoa">Orders</h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-yatiya-dark-cocoa/40" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-yatiya-light-gold text-[13px] focus:outline-none focus:border-yatiya-roman-gold w-[250px]"
          />
        </div>
      </div>

      <div className="bg-yatiya-cream border border-yatiya-light-gold shadow-sm overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-yatiya-ivory text-yatiya-dark-cocoa/60 border-b border-yatiya-light-gold">
            <tr>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Order ID</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Customer</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Date</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Amount</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Payment</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Status</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E3DD]">
            {filteredOrders.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-yatiya-dark-cocoa/60">No orders found.</td></tr>
            ) : filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-yatiya-ivory">
                <td className="p-4 font-medium text-yatiya-dark-cocoa">{order.id}</td>
                <td className="p-4 text-yatiya-dark-cocoa/80">{order.shippingAddress?.fullName}</td>
                <td className="p-4 text-yatiya-dark-cocoa/80">{order.date}</td>
                <td className="p-4 text-yatiya-dark-cocoa/80 font-medium">₹{order.total.toLocaleString('en-IN')}</td>
                <td className="p-4 text-yatiya-dark-cocoa/80">{order.payment?.method}</td>
                <td className="p-4">
                  <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-yatiya-ivory text-yatiya-roman-gold rounded-sm">
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link href={`/admin/orders/${order.id}`} className="text-yatiya-roman-gold hover:underline font-medium">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
