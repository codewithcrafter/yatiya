"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const slides = [
  { id: 1, color: "Red", img: "https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=1920&q=80" },
  { id: 2, color: "Emerald", img: "https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=1920&q=80" },
  { id: 3, color: "Champagne", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80" },
  { id: 4, color: "Royal Blue", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1920&q=80" },
  { id: 5, color: "Pink", img: "https://images.unsplash.com/photo-1515347619362-e67ebf8d4e7b?auto=format&fit=crop&w=1920&q=80" }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section 
      className="relative w-full h-[620px] md:h-[760px] bg-[#242124] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 1.1 } }}
          transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <SmartImage
            src={slides[current].img}
            alt={`${slides[current].color} Lehenga`}
            fill
            className="object-cover opacity-80 md:opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/80 via-transparent to-transparent md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#242124]/60 via-[#242124]/20 to-transparent hidden md:block" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-8 md:p-16 lg:p-24 z-10">
        <div className="max-w-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#FCFAF7] uppercase mb-4 block">
                The Lehenga Edit
              </span>
              <h2 className="text-4xl md:text-6xl font-display text-[#FCFAF7] mb-6 leading-tight">
                Statement silhouettes crafted for celebrations.
              </h2>
              <p className="text-[14px] font-sans text-[#FCFAF7]/80 leading-relaxed mb-8 max-w-md hidden md:block">
                Intricate detailing, considered proportions, and unforgettable evenings. Discover our signature occasion wear.
              </p>
            </motion.div>
          </AnimatePresence>
          
          <Reveal direction="up" delay={0.6}>
            <Link 
              href="/collections/women"
              className="inline-block border border-[#FCFAF7]/40 text-[#FCFAF7] px-8 py-4 text-[11px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-[#FCFAF7] hover:text-[#242124] transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </Reveal>
        </div>
      </div>

      {/* INDICATOR */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 flex items-center gap-4">
        <span className="text-[12px] font-display text-[#FCFAF7] italic tracking-widest">
          {String(current + 1).padStart(2, '0')}
        </span>
        <div className="w-16 md:w-24 h-[1px] bg-[#FCFAF7]/30 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[#FCFAF7]"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "100%" }}
            key={current} // Retrigger animation
            transition={{ duration: isHovered ? 0 : 5, ease: "linear" }}
          />
        </div>
        <span className="text-[12px] font-display text-[#FCFAF7] italic tracking-widest opacity-50">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
