"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCustomer } from '@/context/CustomerContext';
import { useEffect, useState } from 'react';
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, customer, logout } = useCustomer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-yatiya-ivory"></div>;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] bg-yatiya-ivory flex flex-col items-center justify-center py-20 px-6 font-sans">
        <h1 className="text-3xl md:text-4xl font-display text-yatiya-dark-cocoa mb-4">My Account</h1>
        <p className="text-yatiya-dark-cocoa/70 mb-8">Please sign in to access your account.</p>
        <button 
          onClick={() => {
            const { useCustomer } = require('@/context/CustomerContext');
            // Fake login for frontend phase
            const profile = { name: 'Yatiya Customer', email: 'customer@example.com', phone: '9876543210' };
            localStorage.setItem('yatiya_customer', JSON.stringify(profile));
            window.location.reload();
          }}
          className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-10 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors"
        >
          Sign In (Demo)
        </button>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', href: '/account', icon: User },
    { name: 'My Orders', href: '/account/orders', icon: Package },
    { name: 'Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Profile', href: '/account/profile', icon: User },
    { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-yatiya-ivory pt-24 pb-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-display text-yatiya-dark-cocoa mb-10 text-center md:text-left">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="md:w-[250px] shrink-0">
            <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm sticky top-24">
              <div className="mb-6 pb-6 border-b border-yatiya-light-gold">
                <p className="text-[14px] text-yatiya-dark-cocoa/70">Welcome back,</p>
                <p className="text-[18px] font-medium text-yatiya-dark-cocoa truncate">{customer?.name}</p>
              </div>
              
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 text-[14px] transition-colors ${isActive ? 'bg-yatiya-ivory text-yatiya-roman-gold font-medium' : 'text-yatiya-dark-cocoa/70 hover:bg-yatiya-ivory hover:text-yatiya-roman-gold'}`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-[14px] text-red-600/80 hover:bg-red-50 hover:text-red-700 transition-colors mt-2 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
