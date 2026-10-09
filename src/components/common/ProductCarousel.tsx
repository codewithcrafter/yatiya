"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCarouselProps {
  title?: string;
  products: Product[];
  viewAllLink?: string;
}

export function ProductCarousel({ title, products, viewAllLink }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full relative">
      <div className="container-luxury">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-8 pb-12 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[70vw] md:min-w-[320px] lg:min-w-[360px] flex-shrink-0 snap-start group relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-yatiya-light-gold mb-5">
                
                {/* Wishlist Button - Subtle */}
                <button className="absolute top-4 right-4 z-20 text-[#171413]/40 hover:text-yatiya-antique-gold transition-colors opacity-0 group-hover:opacity-100 hidden md:block">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>

                <Link href={`/product/${product.slug}`} className="block h-full w-full">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-opacity duration-[800ms] ease-in-out"
                    sizes="(max-width: 768px) 70vw, 25vw"
                  />
                  {product.images[1] && (
                    <Image
                      src={product.images[1]}
                      alt={`${product.title} alternate view`}
                      fill
                      className="object-cover transition-opacity duration-[800ms] ease-in-out opacity-0 group-hover:opacity-100 absolute inset-0"
                      sizes="(max-width: 768px) 70vw, 25vw"
                    />
                  )}
                </Link>

                {/* Collection/Status Label */}
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  {product.compareAtPrice && (
                    <span className="bg-yatiya-antique-gold text-yatiya-ivory px-2 py-1 text-[9px] font-bold tracking-[0.2em] uppercase">Exclusive</span>
                  )}
                  {product.isNew && (
                    <span className="bg-yatiya-ivory text-[#171413] px-2 py-1 text-[9px] font-bold tracking-[0.2em] uppercase shadow-sm">The Atelier Edit</span>
                  )}
                </div>
              </div>

              {/* Product Info - Quiet Typography */}
              <div className="flex flex-col">
                <h3 className="font-sans text-[12px] font-[400] text-[#171413] tracking-[0.05em] uppercase mb-1">
                  <Link href={`/product/${product.slug}`}>{product.title}</Link>
                </h3>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[13px] font-[500] text-[#2A2725]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.compareAtPrice && (
                    <span className="font-sans text-[12px] text-[#A79A8F] line-through">
                      ₹{product.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Controls Outside */}
        {products.length > 4 && (
          <div className="hidden md:flex justify-end gap-3 mt-2 pr-4 absolute -top-16 right-0">
            <button 
              onClick={() => scroll("left")} 
              className="w-10 h-10 flex items-center justify-center border border-yatiya-light-gold rounded-full bg-transparent hover:border-[#171413] text-[#171413] transition-colors group"
              aria-label="Scroll left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              onClick={() => scroll("right")} 
              className="w-10 h-10 flex items-center justify-center border border-yatiya-light-gold rounded-full bg-transparent hover:border-[#171413] text-[#171413] transition-colors group"
              aria-label="Scroll right"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
