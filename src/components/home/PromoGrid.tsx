"use client";

import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function PromoGrid() {
  return (
    <section className="pt-[60px] md:pt-[80px] pb-[60px] w-full max-w-[1920px] mx-auto px-6 md:px-8">
      {/* Container holding the two main columns */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-[30px]">
        
        {/* Left Column */}
        <div className="flex flex-col gap-5 lg:gap-[28px] lg:w-[58.7%]">
          
          {/* Top Row of Left Column */}
          <div className="flex flex-col sm:flex-row gap-5 lg:gap-[30px]">
            {/* PROMO 1 */}
            <Reveal direction="up" delay={0.1} className="flex-1 flex">
              <Link href="/collections/women" className="group block relative w-full aspect-[4/3] sm:aspect-[425/337] overflow-hidden">
                <SmartImage 
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
                  alt="Shop Women"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-yatiya-dark-cocoa/40 group-hover:bg-yatiya-dark-cocoa/60 transition-colors duration-500" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-3 block">
                    SHOP WOMEN
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-display text-yatiya-light-text leading-tight mb-4">
                    UP TO 70% OFF &<br/>FREE SHIPPING
                  </h3>
                  <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-yatiya-light-text border-b border-transparent group-hover:border-yatiya-light-text transition-colors pb-0.5 mt-2">
                    VIEW COLLECTION &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* PROMO 2 */}
            <Reveal direction="up" delay={0.2} className="flex-1 flex">
              <Link href="/collections/exclusive" className="group block relative w-full aspect-[4/3] sm:aspect-[426/337] overflow-hidden">
                <SmartImage 
                  src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=800&q=80"
                  alt="Exclusive Offer"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-yatiya-dark-cocoa/40 group-hover:bg-yatiya-dark-cocoa/60 transition-colors duration-500" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-3 block">
                    EXCLUSIVE OFFER
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-display text-yatiya-light-text leading-tight mb-4">
                    FREE SHIPPING<br/>ON ORDERS
                  </h3>
                  <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-yatiya-light-text border-b border-transparent group-hover:border-yatiya-light-text transition-colors pb-0.5 mt-2">
                    SHOP NOW &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>

          {/* Bottom Row of Left Column (PROMO 4) */}
          <Reveal direction="up" delay={0.3} className="w-full flex">
            <Link href="/collections/bridal" className="group block relative w-full aspect-[16/9] sm:aspect-[881/322] overflow-hidden">
              <SmartImage 
                src="https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=1200&q=80"
                alt="Bridal Edit"
                fill
                className="object-cover object-[center_30%] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-yatiya-dark-cocoa/40 group-hover:bg-yatiya-dark-cocoa/60 transition-colors duration-500" />
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center items-start text-left">
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-3 block">
                  BRIDAL EDIT
                </span>
                <h3 className="text-3xl lg:text-4xl font-display text-yatiya-light-text leading-tight mb-4">
                  TIMELESS BRIDAL<br/>ELEGANCE
                </h3>
                <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-yatiya-light-text border-b border-transparent group-hover:border-yatiya-light-text transition-colors pb-0.5 mt-2">
                  DISCOVER MORE &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
          
        </div>

        {/* Right Column (PROMO 3) */}
        <Reveal direction="up" delay={0.4} className="w-full lg:w-[41.3%] flex">
          <Link href="/collections/new-arrivals" className="group block relative w-full aspect-[3/4] lg:aspect-auto h-full min-h-[400px] overflow-hidden">
            <SmartImage 
              src="https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=1000&q=80"
              alt="New Arrivals"
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-yatiya-dark-cocoa/30 group-hover:bg-yatiya-dark-cocoa/50 transition-colors duration-500" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-center text-center pb-12 lg:pb-16">
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-3 block">
                NEW ARRIVALS
              </span>
              <h3 className="text-4xl lg:text-5xl font-display text-yatiya-light-text leading-tight mb-8">
                THE COUTURE EDIT
              </h3>
              <span className="bg-yatiya-roman-gold text-yatiya-light-text px-8 py-4 text-[11px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-yatiya-antique-gold transition-colors border border-yatiya-roman-gold">
                EXPLORE COLLECTION &rarr;
              </span>
            </div>
          </Link>
        </Reveal>

      </div>
    </section>
  );
}
