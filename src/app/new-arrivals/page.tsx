"use client";

import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function NewArrivalsPage() {
  const { addItem } = useCart();
  
  // Filter new arrivals
  const newArrivals = products.filter(p => p.isNew);

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#242124]">
      {/* HEADER HERO */}
      <div className="w-full h-[35vh] bg-[#B17165] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-[#FCFAF7]">
          NEW ARRIVALS
        </h1>
        <p className="text-[12px] font-sans text-[#FCFAF7]/80 mt-4 tracking-widest uppercase">
          The latest additions to our collection
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
          {newArrivals.map((product) => (
            <div key={product.id} className="flex flex-col group">
              <Link href={`/product/${product.slug}`} className="w-full aspect-[3/4] relative bg-[#F7F0E8] overflow-hidden mb-4">
                <SmartImage 
                  src={product.images[0]} 
                  alt={product.title} 
                  fill 
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-105" 
                />
                <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#242124]">
                  New
                </span>
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
                  className="absolute bottom-0 left-0 w-full bg-[#FCFAF7]/95 text-[#242124] py-4 text-[10px] font-bold uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#242124] hover:text-[#FCFAF7]"
                >
                  Quick Add
                </button>
              </Link>
              <Link href={`/product/${product.slug}`} className="flex flex-col">
                <h3 className="text-[13px] md:text-[14px] font-sans font-medium text-[#242124] group-hover:text-[#641F32] transition-colors mb-1">
                  {product.title}
                </h3>
                <p className="text-[13px] font-sans text-[#242124]/70">
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
