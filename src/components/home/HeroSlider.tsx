"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";

const slides = [
  { 
    id: 1, 
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1920&q=80",
    mobileImg: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    label: "NEW COLLECTION",
    heading: "THE NEW ERA OF\nINDIAN COUTURE",
    text: "Discover timeless elegance crafted for your special moments.",
    cta: "SHOP COLLECTION →",
    link: "/collections/new"
  },
  { 
    id: 2, 
    img: "https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=1920&q=80",
    mobileImg: "https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=800&q=80",
    label: "BRIDAL EDIT",
    heading: "CRAFTED FOR YOUR\nMOST BEAUTIFUL MOMENTS",
    text: "Explore exquisite bridal silhouettes designed to make an entrance.",
    cta: "EXPLORE BRIDAL →",
    link: "/collections/bridal"
  },
  { 
    id: 3, 
    img: "https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=1920&q=80",
    mobileImg: "https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=800&q=80",
    label: "FESTIVE COLLECTION",
    heading: "ELEGANCE THAT\nSPEAKS FOR ITSELF",
    text: "Discover statement pieces for every celebration.",
    cta: "SHOP NOW →",
    link: "/collections/festive"
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance with clean timer reset
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500); // 4-5 seconds interval
    return () => clearInterval(timer);
  }, [isHovered, current]); // 'current' dependency resets timer on manual click

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const activeSlide = slides[current];

  return (
    <section 
      className="relative w-full h-[85vh] md:aspect-[192/77] md:h-auto 2xl:h-[770px]  overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Desktop Image */}
          <SmartImage
            src={activeSlide.img}
            alt={activeSlide.heading.replace('\n', ' ')}
            fill
            className="hidden md:block object-cover object-[center_30%]"
            priority={true}
          />
          {/* Mobile Image */}
          <SmartImage
            src={activeSlide.mobileImg}
            alt={activeSlide.heading.replace('\n', ' ')}
            fill
            className="block md:hidden object-cover object-top"
            priority={true}
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#2B211B]/60 via-[#2B211B]/10 to-transparent md:to-transparent z-0" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="absolute inset-0 w-full max-w-[1920px] mx-auto px-6 md:px-20 lg:px-32 flex flex-col justify-end md:justify-center md:items-end z-10 pb-20 md:pb-0 pointer-events-none">
        <div className="w-full md:w-[500px] lg:w-[600px] flex flex-col items-start md:text-left pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full"
            >
              <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#2B211B] uppercase mb-4 block">
                {activeSlide.label}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-display text-[#2B211B] mb-6 leading-[1.05] whitespace-pre-line">
                {activeSlide.heading}
              </h2>
              <p className="text-[14px] md:text-[15px] font-sans text-[#2B211B]/90 leading-relaxed mb-10 max-w-md">
                {activeSlide.text}
              </p>
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current + "cta"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Link 
                href={activeSlide.link}
                className="inline-flex items-center gap-4 bg-[#F8F4EC] text-[#2B211B] px-10 py-4 text-[11px] font-sans tracking-[0.2em] font-bold uppercase hover: hover:text-[#2B211B] border border-transparent hover:border-yatiya-ivory transition-all duration-400"
              >
                {activeSlide.cta}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-yatiya-ivory/40 flex items-center justify-center text-[#2B211B] hover:bg-[#F8F4EC] hover:text-[#2B211B] transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-yatiya-ivory/40 flex items-center justify-center text-[#2B211B] hover:bg-[#F8F4EC] hover:text-[#2B211B] transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Elegant Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-500 ease-out rounded-full ${
              current === idx 
                ? "w-8 h-[2px] bg-[#F8F4EC]" 
                : "w-2 h-[2px] bg-[#F8F4EC]/40 hover:bg-[#F8F4EC]/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
