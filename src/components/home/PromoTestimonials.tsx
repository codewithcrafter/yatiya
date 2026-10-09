"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

// Yatiya Couture Fashion Image Assets (High Quality)
const bannerImages = [
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=1200&q=80"
];

const testimonials = [
  {
    id: 1,
    name: "Aarohi Sharma",
    role: "Verified Customer",
    review: "The craftsmanship and detailing were absolutely beautiful. The lehenga looked even better in person.",
    rating: 5,
    initials: "AS"
  },
  {
    id: 2,
    name: "Mehak Kapoor",
    role: "Verified Customer",
    review: "Yatiya Couture made my wedding shopping experience so special. The fit and finishing were perfect.",
    rating: 5,
    initials: "MK"
  },
  {
    id: 3,
    name: "Riya Malhotra",
    role: "Verified Customer",
    review: "The embroidery, fabric and overall finish were stunning. I received compliments all evening.",
    rating: 5,
    initials: "RM"
  },
  {
    id: 4,
    name: "Simran Kaur",
    role: "Verified Customer",
    review: "Absolutely in love with the pastel bridal collection! The customer service was exceptionally helpful.",
    rating: 5,
    initials: "SK"
  },
  {
    id: 5,
    name: "Ananya Desai",
    role: "Verified Customer",
    review: "The intricate zari work and the quality of the silk are top-notch. Highly recommend for festive wear.",
    rating: 5,
    initials: "AD"
  },
  {
    id: 6,
    name: "Pooja Singhania",
    role: "Verified Customer",
    review: "From ordering to delivery, everything was seamless. The lehenga fits like a dream and looks regal.",
    rating: 5,
    initials: "PS"
  }
];

export function PromoTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const totalPages = Math.max(1, testimonials.length - visibleCount + 1);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current === totalPages - 1 ? 0 : current + 1));
  }, [totalPages]);

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full max-w-[1920px] mx-auto px-6 md:px-[30px] overflow-hidden" style={{ background: "linear-gradient(135deg, #F3E6C8, #EAD9B0)" }}>
      
      {/* PART 1: PROMOTIONAL BANNERS */}
      <Reveal direction="up" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[30px] w-full">
          
          {/* Banner 1 */}
          <Link href="/collection/new-arrivals" className="group relative w-full aspect-[746/281] overflow-hidden -soft flex items-center">
            <SmartImage 
              src={bannerImages[0]}
              alt="New Arrivals"
              fill
              className="object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-[1.03] object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-yatiya-dark-cocoa/70 to-transparent" />
            
            <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-10 max-w-[80%] text-yatiya-light-text">
              <span className="text-yatiya-light-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3">
                NEW ARRIVALS
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-[34px] font-display leading-tight mb-2 md:mb-3">
                UP TO 25% OFF
              </h3>
              <p className="text-yatiya-light-text text-xs md:text-sm mb-4 md:mb-6 max-w-[250px] leading-relaxed">
                Discover our latest couture collection.
              </p>
              <span className="text-xs font-bold uppercase tracking-widest hover:text-yatiya-light-gold transition-colors flex items-center">
                SHOP NOW <span className="ml-2">→</span>
              </span>
            </div>
          </Link>

          {/* Banner 2 */}
          <Link href="/collection/special-offer" className="group relative w-full aspect-[746/281] overflow-hidden -soft flex items-center">
            <SmartImage 
              src={bannerImages[1]}
              alt="Special Offer"
              fill
              className="object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-[1.03] object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-yatiya-dark-cocoa/70 to-transparent" />
            
            <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-10 max-w-[80%] text-yatiya-light-text">
              <span className="text-yatiya-light-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3">
                SPECIAL OFFER
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-[34px] font-display leading-tight mb-2 md:mb-3">
                UP TO 35% OFF
              </h3>
              <p className="text-yatiya-light-text text-xs md:text-sm mb-4 md:mb-6 max-w-[280px] leading-relaxed">
                Exclusive styles crafted for your special moments.
              </p>
              <span className="text-xs font-bold uppercase tracking-widest hover:text-yatiya-light-gold transition-colors flex items-center">
                DISCOVER NOW <span className="ml-2">→</span>
              </span>
            </div>
          </Link>

        </div>
      </Reveal>

      {/* PART 2: OUR CLIENTS SAY */}
      <div className="mt-[60px] md:mt-[70px]">
        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-[34px] font-display text-yatiya-deep-brown">Our Clients Say</h2>
            <div className="w-[60px] h-[2px] bg-yatiya-antique-gold mt-[15px]" />
          </div>
        </Reveal>

        {/* Testimonial Carousel */}
        <div 
          className="relative mt-[35px] overflow-hidden px-1 py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="shrink-0 px-2 md:px-[15px]"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="bg-yatiya-ivory border border-[rgba(198,161,91,0.30)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-md p-6 md:p-8 flex flex-col items-center text-center h-full">
                  
                  {/* Avatar */}
                  <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full bg-transparent border border-yatiya-antique-gold flex items-center justify-center text-yatiya-antique-gold font-display text-xl mb-4 shrink-0">
                    {testimonial.initials}
                  </div>
                  
                  {/* Name & Role */}
                  <h4 className="text-yatiya-deep-brown font-semibold text-[15px] md:text-base">
                    {testimonial.name}
                  </h4>
                  <span className="text-yatiya-warm-bronze text-xs font-medium uppercase tracking-wider mt-1 mb-5 block">
                    {testimonial.role}
                  </span>
                  
                  {/* Review */}
                  <p className="text-yatiya-deep-brown/80 text-sm md:text-[15px] leading-relaxed italic mb-6 grow">
                    "{testimonial.review}"
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center text-yatiya-rich-gold gap-1 shrink-0 mt-auto">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-[20px] md:mt-[25px]">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === idx 
                  ? "w-[24px] h-[6px] bg-yatiya-antique-gold" 
                  : "w-[6px] h-[6px] bg-yatiya-deep-brown hover:bg-yatiya-antique-gold/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
