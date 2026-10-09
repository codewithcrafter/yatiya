"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IndianRupee, ShoppingBag, Users, Package } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, customers: 0, products: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);

  useEffect(() => {
    // Calculate from localStorage or use mocks
    const storedOrders = JSON.parse(localStorage.getItem('yatiya_orders') || '[]');
    let rev = storedOrders.reduce((sum: number, o: any) => sum + o.total, 0);
    
    // Add some realistic base numbers if empty
    if (storedOrders.length === 0) {
      rev = 248500;
    }
    
    setStats({
      revenue: rev,
      orders: storedOrders.length || 128,
      customers: 96,
      products: mockProducts.length
    });

    setRecentOrders(storedOrders.slice(0, 5));

    // Calculate low stock (just mock logic for now)
    const ls = mockProducts.slice(0, 4).map(p => ({
      id: p.id, name: p.name, sku: 'SKU-' + p.id.toUpperCase(), stock: Math.floor(Math.random() * 5)
    }));
    setLowStock(ls);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display text-yatiya-dark-cocoa">Dashboard Overview</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: IndianRupee },
          { label: 'Total Orders', value: stats.orders, icon: Package },
          { label: 'Customers', value: stats.customers, icon: Users },
          { label: 'Products', value: stats.products, icon: ShoppingBag },
        ].map((stat, idx) => (
          <div key={idx} className="bg-yatiya-cream border border-yatiya-light-gold p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-yatiya-ivory flex items-center justify-center text-yatiya-roman-gold rounded-full shrink-0">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60 mb-1">{stat.label}</p>
              <p className="text-xl font-display text-yatiya-dark-cocoa font-medium">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-yatiya-cream border border-yatiya-light-gold">
          <div className="p-4 border-b border-yatiya-light-gold flex justify-between items-center bg-yatiya-ivory">
            <h2 className="font-medium text-yatiya-dark-cocoa text-[14px]">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[12px] text-yatiya-roman-gold hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-yatiya-cream text-yatiya-dark-cocoa/60 border-b border-yatiya-light-gold">
                <tr>
                  <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Order ID</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Date</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Amount</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E3DD]">
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-yatiya-dark-cocoa/60">No recent orders found.</td></tr>
                ) : recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-yatiya-ivory">
                    <td className="p-4 font-medium text-yatiya-dark-cocoa">
                      <Link href={`/admin/orders/${order.id}`} className="hover:text-yatiya-roman-gold">{order.id}</Link>
                    </td>
                    <td className="p-4 text-yatiya-dark-cocoa/80">{order.date}</td>
                    <td className="p-4 text-yatiya-dark-cocoa/80">₹{order.total.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-yatiya-ivory text-yatiya-roman-gold rounded-sm">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-yatiya-cream border border-yatiya-light-gold">
          <div className="p-4 border-b border-yatiya-light-gold flex justify-between items-center bg-yatiya-ivory">
            <h2 className="font-medium text-yatiya-dark-cocoa text-[14px]">Low Stock Alerts</h2>
            <Link href="/admin/inventory" className="text-[12px] text-yatiya-roman-gold hover:underline">Manage</Link>
          </div>
          <div className="divide-y divide-[#E9E3DD]">
            {lowStock.map(item => (
              <div key={item.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-[13px] font-medium text-yatiya-dark-cocoa truncate w-[150px]">{item.name}</p>
                  <p className="text-[11px] text-yatiya-dark-cocoa/60">{item.sku}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-red-100 text-red-800 rounded-sm mb-1">
                    {item.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                  </span>
                  <p className="text-[12px] text-yatiya-dark-cocoa/80 font-medium">{item.stock} left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
