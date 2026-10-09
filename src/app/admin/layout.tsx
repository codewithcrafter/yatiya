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

  if (!mounted) return <div className="min-h-screen bg-yatiya-ivory"></div>;

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
      <div className="min-h-screen bg-yatiya-ivory flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-yatiya-cream p-10 border border-yatiya-light-gold shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display text-yatiya-dark-cocoa mb-2">Admin Panel</h1>
            <p className="text-[14px] text-yatiya-dark-cocoa/70">Sign in to manage Yatiya Couture</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" placeholder="admin@yatiya.com" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" placeholder="admin123" />
            </div>
            <button type="submit" className="w-full bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
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
    <div className="min-h-screen bg-yatiya-ivory flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-yatiya-deep-brown/70 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen w-[260px] bg-yatiya-cream border-r border-yatiya-light-gold shrink-0 z-50 transform transition-transform duration-300 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between border-b border-yatiya-light-gold">
          <h1 className="text-xl font-display text-yatiya-dark-cocoa font-medium tracking-wide">YATIYA <span className="text-yatiya-roman-gold">CMS</span></h1>
          <button className="lg:hidden text-yatiya-dark-cocoa" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h2 className="text-[10px] uppercase tracking-widest text-yatiya-dark-cocoa/50 font-bold mb-3 px-3">{group.title}</h2>
              <div className="space-y-1">
                {group.items.map(item => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 text-[13px] rounded-md transition-colors ${isActive ? 'bg-yatiya-ivory text-yatiya-roman-gold font-medium' : 'text-yatiya-dark-cocoa/70 hover:bg-yatiya-ivory hover:text-yatiya-roman-gold'}`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-yatiya-light-gold">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 w-full rounded-md transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen">
        <header className="bg-yatiya-cream h-16 border-b border-yatiya-light-gold flex items-center px-4 lg:px-8 shrink-0 justify-between">
          <button className="lg:hidden text-yatiya-dark-cocoa p-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center text-[13px] text-yatiya-dark-cocoa/60">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="capitalize">{pathname.split('/').pop() || 'Overview'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-medium text-yatiya-dark-cocoa bg-yatiya-ivory px-3 py-1 rounded-full text-yatiya-roman-gold">
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
