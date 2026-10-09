
"use client";

import { useWishlist } from '@/context/WishlistContext';
import { getProducts } from '@/data/mockData';
import { ProductCard } from '@/components/shop/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { items } = useWishlist();
  const allProducts = getProducts();
  const wishlistProducts = allProducts.filter(p => items.includes(p.id));

  return (
    <div className="min-h-screen bg-yatiya-ivory px-6 py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl md:text-5xl font-display text-center text-yatiya-dark-cocoa mb-4 uppercase tracking-widest">Your Wishlist</h1>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-yatiya-dark-cocoa/60 font-sans mb-8">You haven't saved any items yet.</p>
            <Link href="/products" className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-8 py-4 text-[12px] uppercase tracking-widest hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
              Discover Products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/60 mb-12">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {wishlistProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
