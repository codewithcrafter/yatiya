"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

// A mock "heart" icon for wishlist
const HeartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Extract slug from params
  const { slug } = use(params);
  
  // Find product from mock data, or default to a generic product if not found
  const product = products.find(p => p.slug === slug) || products[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    });
    // Normally you'd trigger a toast or slide-out cart here
    alert("Added to bag!");
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#242124]">
      {/* BREADCRUMBS */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.15em]">
          <Link href="/" className="text-[#242124]/50 hover:text-[#242124]">Home</Link>
          <span className="text-[#242124]/30">&gt;</span>
          <Link href="/collections/women" className="text-[#242124]/50 hover:text-[#242124]">Women</Link>
          <span className="text-[#242124]/30">&gt;</span>
          <span className="text-[#242124] font-bold">{product.title}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-24 flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* LEFT - IMAGES */}
        <div className="w-full md:w-1/2 flex gap-4 lg:gap-6">
          <div className="hidden lg:flex flex-col gap-4 w-[100px] shrink-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(idx)}
                className={`w-full aspect-[3/4] relative overflow-hidden bg-[#F7F0E8] border ${selectedImage === idx ? 'border-[#641F32]' : 'border-transparent'}`}
              >
                <SmartImage src={img} alt={`${product.title} view ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] relative bg-[#F7F0E8] overflow-hidden">
            <SmartImage src={product.images[selectedImage]} alt={product.title} fill className="object-cover" />
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="w-full md:w-1/2 flex flex-col lg:py-10">
          {product.isNew && <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#641F32] mb-4">New Arrival</span>}
          
          <h1 className="text-3xl md:text-[42px] font-display mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-end gap-4 mb-8">
            <span className="text-2xl font-sans">₹{product.price.toLocaleString('en-IN')}</span>
            {product.compareAtPrice && (
              <span className="text-[15px] font-sans text-[#242124]/50 line-through pb-1">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[10px] font-sans text-[#242124]/60 uppercase tracking-widest pb-1.5 ml-2">(INCL. OF ALL TAXES)</span>
          </div>

          <p className="text-[14px] font-sans text-[#242124]/80 leading-relaxed mb-10 border-b border-[#E9E3DD] pb-10">
            {product.description}
          </p>

          <div className="flex flex-col gap-8 mb-10">
            {/* COLORS */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#604F6F]">Color</span>
                <span className="text-[11px] font-sans text-[#242124]">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-[#641F32]' : 'border-transparent ring-1 ring-[#E9E3DD]'}`}
                    style={{ backgroundColor: color.toLowerCase() === 'ivory' ? '#fffff0' : color.toLowerCase() === 'gold' ? '#ffd700' : color.toLowerCase().replace(' ', '') }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#604F6F]">Size</span>
                <button className="text-[11px] font-sans uppercase underline text-[#242124]/60 hover:text-[#242124]">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-12 flex items-center justify-center border text-[12px] font-sans transition-colors ${selectedSize === size ? 'border-[#641F32] text-[#641F32] bg-[#F7F0E8]' : 'border-[#E9E3DD] text-[#242124]/70 hover:border-[#242124]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#641F32] text-[#FCFAF7] py-5 text-[12px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-[#242124] transition-colors shadow-lg"
            >
              ADD TO BAG
            </button>
            <button className="w-16 h-[54px] flex items-center justify-center border border-[#E9E3DD] text-[#242124]/60 hover:text-[#641F32] transition-colors bg-white">
              <HeartIcon />
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-12 pt-8 border-t border-[#E9E3DD] text-[12px] font-sans text-[#242124]/70">
            <div className="flex items-center gap-3">
              <span className="font-bold tracking-widest uppercase text-[#242124]">Shipping:</span>
              <span>Dispatched within 7-10 working days.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold tracking-widest uppercase text-[#242124]">Returns:</span>
              <span>Complimentary returns within 14 days.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
