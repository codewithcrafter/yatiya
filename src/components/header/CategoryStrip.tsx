"use client";

import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { imageCatalog } from "@/lib/catalog";

export function CategoryStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="w-full py-16 md:py-24 bg-yatiya-ivory border-b border-yatiya-light-gold">
      <div className="max-w-[1300px] mx-auto px-6">
        
        {/* CENTERED HEADING */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-[12px] font-sans font-bold tracking-[0.2em] uppercase text-yatiya-burgundy">
            Shop by Category
          </h2>
        </motion.div>

        {/* CATEGORY GRID */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12">
          {imageCatalog.categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.8, delay: 0.1 + (index * 0.1), ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Link 
                href={cat.link} 
                className="group flex flex-col items-center w-[120px] md:w-[140px] cursor-pointer"
              >
                {/* Circle Container */}
                <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden mb-5 bg-yatiya-ivory relative shadow-none group-hover:shadow-[0_10px_40px_-10px_rgba(36,33,36,0.15)] transition-all duration-500 ring-0 group-hover:ring-1 ring-yatiya-gold/50 ring-offset-4 ring-offset-yatiya-ivory">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <SmartImage 
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Label */}
                <div className="flex flex-col items-center transform transition-transform duration-300 group-hover:-translate-y-[3px]">
                  <span className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-yatiya-dark-cocoa text-center whitespace-nowrap group-hover:text-yatiya-burgundy transition-colors">
                    {cat.name}
                  </span>
                  <div className="h-[1px] w-0 bg-yatiya-roman-gold mt-1 transition-all duration-300 group-hover:w-full" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
