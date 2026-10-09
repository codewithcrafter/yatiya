"use client";

import Link from 'next/link';
import { MockProduct } from '@/data/mockData';
import { SmartImage } from '@/components/ui/SmartImage';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export function ProductCard({ product }: { product: MockProduct }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem, items } = useCart();
  const [toastMsg, setToastMsg] = useState('');
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const size = product.sizes?.[0] || '';
    const color = product.colors?.[0] || '';
    const itemId = `${product.id}-${size || 'nosize'}-${color || 'nocolor'}`;
    
    const existingItem = items.find(i => i.id === itemId);
    if (existingItem && existingItem.quantity >= 5) {
      setToastMsg('Only 5 items available');
      setTimeout(() => setToastMsg(''), 3000);
      return;
    }

    addItem({
      id: itemId,
      productId: product.id,
      title: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      quantity: 1,
      size,
      color,
      slug: product.slug
    });
    setToastMsg('Added to cart successfully');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="group relative flex flex-col bg-yatiya-ivory border border-yatiya-roman-gold/20 hover:border-yatiya-antique-gold/40 transition-all duration-300">
      <Link href={`/products/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-yatiya-ivory block">
        <SmartImage 
          src={product.images[0]} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <span className="bg-yatiya-burgundy text-yatiya-light-text text-[10px] tracking-widest uppercase px-2 py-1">-{product.discount}%</span>
          )}
          {product.newArrival && (
            <span className="bg-yatiya-roman-gold text-yatiya-light-text text-[10px] tracking-widest uppercase px-2 py-1">New</span>
          )}
        </div>
        
        {/* Quick Actions Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-yatiya-dark-cocoa/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-4 translate-y-4 group-hover:translate-y-0">
          <button className="bg-yatiya-cream/90 hover:bg-yatiya-cream text-yatiya-dark-cocoa p-2 rounded-full transition-colors" title="Quick View">
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-yatiya-roman-gold hover:bg-yatiya-antique-gold text-yatiya-light-text p-2 rounded-full transition-colors relative" 
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </Link>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-[100] bg-yatiya-roman-gold text-yatiya-light-text px-6 py-3 shadow-xl flex items-center rounded-sm">
          <span className="text-[12px] font-medium tracking-widest uppercase">{toastMsg}</span>
        </div>
      )}
      
      {/* Wishlist floating */}
      <button 
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className="absolute top-3 right-3 transition-colors z-10" 
        title="Wishlist"
      >
        <Heart className={`w-5 h-5 drop-shadow-md transition-colors ${isWishlisted ? 'fill-yatiya-roman-gold text-yatiya-roman-gold' : 'text-yatiya-dark-cocoa hover:text-yatiya-antique-gold'}`} />
      </button>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-yatiya-warm-bronze text-[11px] uppercase tracking-widest mb-1">{product.tags[1]}</p>
        <Link href={`/products/${product.slug}`} className="text-[14px] font-display text-yatiya-dark-cocoa hover:text-yatiya-roman-gold transition-colors line-clamp-2 mb-2 flex-grow">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-auto">
          {product.salePrice ? (
            <>
              <span className="text-[15px] font-sans font-medium text-yatiya-antique-gold">₹{product.salePrice.toLocaleString('en-IN')}</span>
              <span className="text-[12px] font-sans text-yatiya-deep-brown line-through">₹{product.price.toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="text-[15px] font-sans font-medium text-yatiya-antique-gold">₹{product.price.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
