"use client";

import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/shop/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/data/mockData';

export default function AccountWishlistPage() {
  const { items } = useWishlist();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-display text-yatiya-dark-cocoa mb-2">My Wishlist</h2>
        <p className="text-yatiya-dark-cocoa/70 text-[14px]">Items you've saved for later.</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-10 text-center shadow-sm">
          <Heart className="w-10 h-10 text-yatiya-roman-gold mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-yatiya-dark-cocoa mb-2">Your wishlist is empty</h3>
          <p className="text-[14px] text-yatiya-dark-cocoa/70 mb-6">Save items you love to review them later.</p>
          <Link href="/products" className="inline-block border border-yatiya-roman-gold text-yatiya-roman-gold px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text hover:text-yatiya-light-text transition-colors">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
          {items.map((slug) => {
            const product = mockProducts.find(p => p.slug === slug);
            if (!product) return null;
            return <ProductCard key={product.id} product={product as any} />;
          })}
        </div>
      )}
    </div>
  );
}
