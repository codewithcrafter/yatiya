const fs = require('fs');
const path = require('path');

const files = {
  // src/app/admin/layout.tsx
  'src/app/admin/layout.tsx': `
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, FolderTree, Layers, Package, Users, Tag, Image as ImageIcon, LayoutTemplate, MessageSquare, FileText, RotateCcw, Settings, LogOut, Menu, X, Box } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('yatiya_admin_session')) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#FCFAF7]"></div>;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@yatiya.com' && password === 'admin123') {
      localStorage.setItem('yatiya_admin_session', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use admin@yatiya.com / admin123');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('yatiya_admin_session');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white p-10 border border-[#E9E3DD] shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display text-yatiya-black mb-2">Admin Panel</h1>
            <p className="text-[14px] text-yatiya-black/70">Sign in to manage Yatiya Couture</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" placeholder="admin@yatiya.com" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" placeholder="admin123" />
            </div>
            <button type="submit" className="w-full bg-yatiya-black text-white px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navGroups = [
    {
      title: 'Dashboard',
      items: [{ name: 'Overview', href: '/admin', icon: LayoutDashboard }]
    },
    {
      title: 'Catalog',
      items: [
        { name: 'Products', href: '/admin/products', icon: ShoppingBag },
        { name: 'Categories', href: '/admin/categories', icon: FolderTree },
        { name: 'Collections', href: '/admin/collections', icon: Layers },
        { name: 'Inventory', href: '/admin/inventory', icon: Box },
      ]
    },
    {
      title: 'Sales & Users',
      items: [
        { name: 'Orders', href: '/admin/orders', icon: Package },
        { name: 'Customers', href: '/admin/customers', icon: Users },
      ]
    },
    {
      title: 'Marketing',
      items: [
        { name: 'Coupons', href: '/admin/coupons', icon: Tag },
        { name: 'Banners', href: '/admin/banners', icon: ImageIcon },
        { name: 'Homepage', href: '/admin/homepage', icon: LayoutTemplate },
        { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
      ]
    },
    {
      title: 'Content & Settings',
      items: [
        { name: 'Blog', href: '/admin/blog', icon: FileText },
        { name: 'Returns', href: '/admin/returns', icon: RotateCcw },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={\`fixed lg:sticky top-0 h-screen w-[260px] bg-white border-r border-[#E9E3DD] shrink-0 z-50 transform transition-transform duration-300 overflow-y-auto \${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}\`}>
        <div className="p-6 flex items-center justify-between border-b border-[#E9E3DD]">
          <h1 className="text-xl font-display text-yatiya-black font-medium tracking-wide">YATIYA <span className="text-[#C6A15B]">CMS</span></h1>
          <button className="lg:hidden text-yatiya-black" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h2 className="text-[10px] uppercase tracking-widest text-yatiya-black/50 font-bold mb-3 px-3">{group.title}</h2>
              <div className="space-y-1">
                {group.items.map(item => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={\`flex items-center gap-3 px-3 py-2 text-[13px] rounded-md transition-colors \${isActive ? 'bg-[#F7F0E8] text-[#C6A15B] font-medium' : 'text-yatiya-black/70 hover:bg-[#FCFAF7] hover:text-[#C6A15B]'}\`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-[#E9E3DD]">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 w-full rounded-md transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen">
        <header className="bg-white h-16 border-b border-[#E9E3DD] flex items-center px-4 lg:px-8 shrink-0 justify-between">
          <button className="lg:hidden text-yatiya-black p-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center text-[13px] text-yatiya-black/60">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="capitalize">{pathname.split('/').pop() || 'Overview'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-medium text-yatiya-black bg-[#F7F0E8] px-3 py-1 rounded-full text-[#C6A15B]">
              Admin User
            </span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
`,

  // src/app/admin/page.tsx
  'src/app/admin/page.tsx': `
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
        <h1 className="text-2xl font-display text-yatiya-black">Dashboard Overview</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: \`₹\${stats.revenue.toLocaleString('en-IN')}\`, icon: IndianRupee },
          { label: 'Total Orders', value: stats.orders, icon: Package },
          { label: 'Customers', value: stats.customers, icon: Users },
          { label: 'Products', value: stats.products, icon: ShoppingBag },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-[#E9E3DD] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F7F0E8] flex items-center justify-center text-[#C6A15B] rounded-full shrink-0">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-widest text-yatiya-black/60 mb-1">{stat.label}</p>
              <p className="text-xl font-display text-yatiya-black font-medium">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-[#E9E3DD]">
          <div className="p-4 border-b border-[#E9E3DD] flex justify-between items-center bg-[#FCFAF7]">
            <h2 className="font-medium text-yatiya-black text-[14px]">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[12px] text-[#C6A15B] hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-white text-yatiya-black/60 border-b border-[#E9E3DD]">
                <tr>
                  <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Order ID</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Date</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Amount</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E3DD]">
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-yatiya-black/60">No recent orders found.</td></tr>
                ) : recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-[#FCFAF7]">
                    <td className="p-4 font-medium text-yatiya-black">
                      <Link href={\`/admin/orders/\${order.id}\`} className="hover:text-[#C6A15B]">{order.id}</Link>
                    </td>
                    <td className="p-4 text-yatiya-black/80">{order.date}</td>
                    <td className="p-4 text-yatiya-black/80">₹{order.total.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-[#F7F0E8] text-[#C6A15B] rounded-sm">
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
        <div className="bg-white border border-[#E9E3DD]">
          <div className="p-4 border-b border-[#E9E3DD] flex justify-between items-center bg-[#FCFAF7]">
            <h2 className="font-medium text-yatiya-black text-[14px]">Low Stock Alerts</h2>
            <Link href="/admin/inventory" className="text-[12px] text-[#C6A15B] hover:underline">Manage</Link>
          </div>
          <div className="divide-y divide-[#E9E3DD]">
            {lowStock.map(item => (
              <div key={item.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-[13px] font-medium text-yatiya-black truncate w-[150px]">{item.name}</p>
                  <p className="text-[11px] text-yatiya-black/60">{item.sku}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-red-100 text-red-800 rounded-sm mb-1">
                    {item.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                  </span>
                  <p className="text-[12px] text-yatiya-black/80 font-medium">{item.stock} left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

console.log('Phase 7 admin layout and dashboard created.');
