"use client";

import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { products } from "@/data/products";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#242124]">
      {/* HEADER HERO */}
      <div className="w-full bg-[#E9E3DD] py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-[#641F32]">
          Our Collections
        </h1>
        <p className="text-[13px] font-sans text-[#242124]/70 mt-6 tracking-widest uppercase">
          Curated edits for the modern woman
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          
          {/* Collection 1 */}
          <Link href="/collections/wedding" className="group flex flex-col items-center cursor-pointer">
            <div className="w-full aspect-[4/5] relative bg-[#F7F0E8] overflow-hidden mb-6">
              <SmartImage 
                src="https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=800&q=80" 
                alt="The Wedding Edit" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[800ms]" 
              />
            </div>
            <h2 className="text-[18px] font-display uppercase tracking-widest mb-2 group-hover:text-[#641F32] transition-colors">
              The Wedding Edit
            </h2>
            <p className="text-[12px] font-sans text-[#242124]/60 text-center uppercase tracking-widest border-b border-[#242124]/20 pb-1 group-hover:border-[#641F32]">
              Explore
            </p>
          </Link>

          {/* Collection 2 */}
          <Link href="/collections/festive" className="group flex flex-col items-center cursor-pointer md:mt-16">
            <div className="w-full aspect-[4/5] relative bg-[#F7F0E8] overflow-hidden mb-6">
              <SmartImage 
                src="https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=800&q=80" 
                alt="The Festive Edit" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[800ms]" 
              />
            </div>
            <h2 className="text-[18px] font-display uppercase tracking-widest mb-2 group-hover:text-[#641F32] transition-colors">
              The Festive Edit
            </h2>
            <p className="text-[12px] font-sans text-[#242124]/60 text-center uppercase tracking-widest border-b border-[#242124]/20 pb-1 group-hover:border-[#641F32]">
              Explore
            </p>
          </Link>

          {/* Collection 3 */}
          <Link href="/collections/everyday" className="group flex flex-col items-center cursor-pointer">
            <div className="w-full aspect-[4/5] relative bg-[#F7F0E8] overflow-hidden mb-6">
              <SmartImage 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" 
                alt="The Everyday Edit" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[800ms]" 
              />
            </div>
            <h2 className="text-[18px] font-display uppercase tracking-widest mb-2 group-hover:text-[#641F32] transition-colors">
              The Everyday Edit
            </h2>
            <p className="text-[12px] font-sans text-[#242124]/60 text-center uppercase tracking-widest border-b border-[#242124]/20 pb-1 group-hover:border-[#641F32]">
              Explore
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}
