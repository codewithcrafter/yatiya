"use client";

import Link from "next/link";
import { use } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addItem } = useCart();
  
  // Clean up the slug for display
  const title = slug.replace("-", " ").toUpperCase();

  // For this demo, just show all products
  const collectionProducts = products;

  return (
    <div className="min-h-screen bg-yatiya-ivory text-yatiya-black">
      {/* HEADER HERO */}
      <div className="w-full h-[40vh] bg-[#604F6F] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-yatiya-ivory relative z-10">
          THE {title} EDIT
        </h1>
        <p className="text-[12px] font-sans text-yatiya-ivory/80 mt-4 tracking-widest uppercase relative z-10">
          Curated collection
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        
        {/* BREADCRUMBS & FILTERS */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-[#E9E3DD] pb-6 gap-6">
          <div className="flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.15em]">
            <Link href="/" className="text-yatiya-black/50 hover:text-yatiya-black">Home</Link>
            <span className="text-yatiya-black/30">&gt;</span>
            <Link href="/collections" className="text-yatiya-black/50 hover:text-yatiya-black">Collections</Link>
            <span className="text-yatiya-black/30">&gt;</span>
            <span className="text-yatiya-black font-bold">{title}</span>
          </div>
          
          <div className="flex gap-8 text-[11px] font-sans uppercase tracking-widest">
            <button className="hover:text-[#641F32]">Filter</button>
            <button className="hover:text-[#641F32]">Sort By</button>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
          {collectionProducts.map((product) => (
            <div key={product.id} className="flex flex-col group">
              <Link href={`/product/${product.slug}`} className="w-full aspect-[3/4] relative bg-[#F7F0E8] overflow-hidden mb-4">
                <SmartImage 
                  src={product.images[0]} 
                  alt={product.title} 
                  fill 
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-105" 
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-yatiya-black">
                    New
                  </span>
                )}
                {/* QUICK ADD OVERLAY */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addItem({
                      id: `${product.id}-${product.sizes[0]}-${product.colors[0]}`,
                      productId: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.images[0],
                      quantity: 1,
                      size: product.sizes[0],
                      color: product.colors[0]
                    });
                    alert("Added to bag!");
                  }}
                  className="absolute bottom-0 left-0 w-full bg-yatiya-ivory/95 text-yatiya-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-yatiya-black hover:text-yatiya-ivory"
                >
                  Quick Add
                </button>
              </Link>
              <Link href={`/product/${product.slug}`} className="flex flex-col">
                <h3 className="text-[13px] md:text-[14px] font-sans font-medium text-yatiya-black group-hover:text-[#641F32] transition-colors mb-1">
                  {product.title}
                </h3>
                <p className="text-[13px] font-sans text-yatiya-black/70">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </Link>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
