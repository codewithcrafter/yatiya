"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { Heart, Eye, Star, ShoppingCart, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/mockData";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isSale?: boolean;
  rating: number;
};

// Yatiya Couture Fashion Image Assets (High Quality)
const images = [
  "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d615e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d615e1?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"  
];

const bestSellerProducts: Product[] = [
  { id: "bs1", name: "Signature Red Bridal Lehenga", category: "Bridal Collection", price: 23999, originalPrice: 29999, image: images[0], isSale: true, rating: 5 },
  { id: "bs2", name: "Ivory Pearl Couture Lehenga", category: "Couture Collection", price: 21999, originalPrice: 27999, image: images[1], isSale: true, rating: 5 },
  { id: "bs3", name: "Royal Maroon Bridal Lehenga", category: "Bridal Collection", price: 19999, originalPrice: 24999, image: images[2], isSale: true, rating: 5 },
  { id: "bs4", name: "Blush Pink Designer Lehenga", category: "Designer Collection", price: 20999, originalPrice: 26999, image: images[3], isSale: true, rating: 5 },
  { id: "bs5", name: "Emerald Green Couture Lehenga", category: "Couture Collection", price: 17999, originalPrice: 22999, image: images[4], isSale: true, rating: 5 },
  { id: "bs6", name: "Champagne Gold Bridal Lehenga", category: "Bridal Collection", price: 18999, originalPrice: 23999, image: images[5], isSale: true, rating: 5 },
  { id: "bs7", name: "Rose Gold Embroidered Lehenga", category: "Designer Collection", price: 22999, originalPrice: 28999, image: images[6], isSale: true, rating: 5 },
  { id: "bs8", name: "Midnight Blue Wedding Lehenga", category: "Wedding Collection", price: 19999, originalPrice: 25999, image: images[7], isSale: true, rating: 5 },
  { id: "bs9", name: "Wine Velvet Couture Lehenga", category: "Couture Collection", price: 21999, originalPrice: 26999, image: images[8], isSale: true, rating: 5 },
  { id: "bs10", name: "Pastel Peach Bridal Lehenga", category: "Bridal Collection", price: 19999, originalPrice: 24999, image: images[9], isSale: true, rating: 5 }
];

// Countdown Hook
function useCountdown(initialDays: number) {
  const [timeLeft, setTimeLeft] = useState(() => {
    return {
      days: initialDays,
      hours: 14,
      minutes: 36,
      seconds: 45
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Reset
                days = initialDays;
                hours = 14;
                minutes = 36;
                seconds = 45;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [initialDays]);

  return timeLeft;
}

export function DealsAndBestSeller() {
  const timeLeft = useCountdown(2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem, items } = useCart();
  const [toastMsg, setToastMsg] = useState("");

  const handleAddToCart = (product: Product) => {
    const slug = product.name.toLowerCase().replace(/ /g, '-');
    const realProduct = getProductBySlug(slug);
    
    if (realProduct) {
      const size = realProduct.sizes?.[0] || '';
      const color = realProduct.colors?.[0] || '';
      const itemId = `${realProduct.id}-${size || 'nosize'}-${color || 'nocolor'}`;
      
      const existingItem = items.find(i => i.id === itemId);
      if (existingItem && existingItem.quantity >= 5) {
        setToastMsg('Only 5 items available');
        setTimeout(() => setToastMsg(''), 3000);
        return;
      }

      addItem({
        id: itemId,
        productId: realProduct.id,
        title: realProduct.name,
        price: realProduct.salePrice || realProduct.price,
        image: realProduct.images[0],
        quantity: 1,
        size,
        color,
        slug: realProduct.slug
      });
      setToastMsg('Added to cart successfully');
      setTimeout(() => setToastMsg(''), 3000);
    } else {
       window.location.href = `/products/${slug}`;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; 
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full bg-yatiya-deep-brown overflow-hidden relative">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-[100] bg-yatiya-roman-gold text-yatiya-light-text px-6 py-3 shadow-xl flex items-center">
          <span className="text-[12px] font-medium tracking-widest uppercase">{toastMsg}</span>
        </div>
      )}

      {/* PART 1: DEALS OF THE DAY BANNER */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-[30px]">
        <Reveal direction="up" delay={0.1}>
          <div className="relative w-full aspect-[1531/700] md:aspect-[1531/500] overflow-hidden -soft flex items-center">
            {/* Background Image */}
            <SmartImage 
              src="https://images.unsplash.com/photo-1594938328870-9844837ef534?auto=format&fit=crop&w=2000&q=80"
              alt="Deals of the Day Background"
              fill
              priority
              className="object-cover opacity-60 md:opacity-80 object-[center_30%]"
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-yatiya-dark-cocoa/70 via-yatiya-dark-cocoa/40 to-transparent" />

            {/* Banner Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full px-6 md:px-[80px] py-10">
              
              {/* Left Content */}
              <div className="flex flex-col text-yatiya-light-text max-w-[500px] text-center md:text-left">
                <span className="text-yatiya-light-gold text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3 md:mb-4">
                  Limited Time Offer
                </span>
                <h2 className="text-4xl md:text-[56px] font-display leading-[1.1] mb-4 text-yatiya-light-text">
                  Deals Of The Day
                </h2>
                <p className="text-yatiya-light-text text-sm md:text-base leading-relaxed mb-6 md:mb-10 max-w-[400px]">
                  Discover exclusive couture styles at special prices for a limited time. Elevate your wardrobe with our premium collection.
                </p>

                {/* Countdown Timer */}
                <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 mb-8 md:mb-10 text-yatiya-light-text">
                  <div className="flex flex-col items-center">
                    <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[rgba(52,39,25,0.55)] backdrop-blur-md flex items-center justify-center text-xl md:text-2xl font-semibold border border-yatiya-rich-gold">
                      {formatTime(timeLeft.days)}
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider mt-2 text-yatiya-light-gold">Days</span>
                  </div>
                  <span className="text-2xl font-light text-yatiya-light-gold -mt-6">:</span>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[rgba(52,39,25,0.55)] backdrop-blur-md flex items-center justify-center text-xl md:text-2xl font-semibold border border-yatiya-rich-gold">
                      {formatTime(timeLeft.hours)}
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider mt-2 text-yatiya-light-gold">Hrs</span>
                  </div>
                  <span className="text-2xl font-light text-yatiya-light-gold -mt-6">:</span>

                  <div className="flex flex-col items-center">
                    <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[rgba(52,39,25,0.55)] backdrop-blur-md flex items-center justify-center text-xl md:text-2xl font-semibold border border-yatiya-rich-gold">
                      {formatTime(timeLeft.minutes)}
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider mt-2 text-yatiya-light-gold">Mins</span>
                  </div>
                  <span className="text-2xl font-light text-yatiya-light-gold -mt-6">:</span>

                  <div className="flex flex-col items-center">
                    <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[rgba(52,39,25,0.55)] backdrop-blur-md flex items-center justify-center text-xl md:text-2xl font-semibold border border-yatiya-rich-gold">
                      {formatTime(timeLeft.seconds)}
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider mt-2 text-yatiya-light-gold">Secs</span>
                  </div>
                </div>

                <Link 
                  href="/collection" 
                  className="inline-flex items-center justify-center bg-yatiya-antique-gold text-yatiya-light-text hover:bg-yatiya-deep-bronze transition-colors duration-300 px-8 py-3.5 text-xs font-bold uppercase tracking-widest w-fit mx-auto md:mx-0"
                >
                  Shop Collection <span className="ml-2 text-yatiya-light-text">→</span>
                </Link>
              </div>

              {/* Right Side (Optional Video/Play button area) */}
              <div className="hidden md:flex flex-col items-center justify-center mr-[10%]">
                <button className="w-20 h-20 rounded-full bg-yatiya-antique-gold hover:bg-yatiya-deep-bronze text-yatiya-light-text flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105 group relative">
                  <div className="absolute inset-0 rounded-full border border-yatiya-gold animate-ping opacity-20 group-hover:opacity-40" />
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </button>
              </div>

            </div>
          </div>
        </Reveal>
      </div>

      {/* PART 2: OUR BEST SELLER CAROUSEL */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-[30px] pt-[60px] md:pt-[70px] mt-[60px] md:mt-[70px] border-t border-[rgba(198,161,91,0.3)]">
        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-[34px] font-display text-yatiya-light-gold">Our Best Seller</h2>
            <div className="w-[60px] h-[2px] bg-yatiya-antique-gold mt-[15px]" />
          </div>
        </Reveal>

        {/* CAROUSEL WRAPPER */}
        <div className="relative mt-[35px] group">
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-[35%] -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 bg-yatiya-ivory border border-yatiya-roman-gold shadow-lg rounded-full flex items-center justify-center text-yatiya-roman-gold hover:bg-[#B88A3B] hover:text-yatiya-deep-brown hover:text-yatiya-roman-gold hover:border-yatiya-roman-gold transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-[35%] -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 bg-yatiya-ivory border border-yatiya-roman-gold shadow-lg rounded-full flex items-center justify-center text-yatiya-roman-gold hover:bg-[#B88A3B] hover:text-yatiya-deep-brown hover:text-yatiya-roman-gold hover:border-yatiya-roman-gold transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Next products"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-[30px] pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bestSellerProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="snap-start shrink-0 w-[calc(100%-1rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-20px)] lg:w-[calc(25%-22.5px)] xl:w-[calc(20%-24px)] flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[282/310] overflow-hidden bg-yatiya-ivory mb-[18px]">
                  {product.isSale && (
                    <div className="absolute top-3 left-3 z-10 bg-yatiya-antique-gold text-yatiya-light-text text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                      Sale
                    </div>
                  )}
                  
                  <Link href={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`} className="block w-full h-full">
                    <SmartImage 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex flex-col items-center text-center p-4 bg-yatiya-ivory">
                  <span className="text-yatiya-warm-bronze text-[11px] font-medium tracking-wide mb-[8px]">
                    {product.category}
                  </span>
                  
                  <Link href={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`} className="text-yatiya-deep-brown hover:text-yatiya-antique-gold transition-colors text-sm md:text-[15px] font-medium mb-[8px] line-clamp-2">
                    {product.name}
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2.5 mb-[8px]">
                    <span className="text-yatiya-warm-bronze font-semibold text-sm md:text-[15px]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[#6B5740]/60 line-through text-xs md:text-[13px]">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex text-yatiya-rich-gold gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-2 mt-[14px] w-full max-w-[240px]">
                    <button onClick={() => handleAddToCart(product)} className="flex-1 hover:bg-yatiya-antique-gold border border-yatiya-antique-gold text-yatiya-deep-brown hover:text-yatiya-light-text py-2 px-3 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      + Add to cart
                    </button>
                    <button className="bg-transparent hover:bg-yatiya-antique-gold border border-yatiya-antique-gold text-yatiya-deep-brown hover:text-yatiya-light-text w-[34px] h-[34px] flex items-center justify-center transition-colors shrink-0">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-transparent hover:bg-yatiya-antique-gold border border-yatiya-antique-gold text-yatiya-deep-brown hover:text-yatiya-light-text w-[34px] h-[34px] flex items-center justify-center transition-colors shrink-0">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Hide scrollbar styles via injected style block for simplicity */}
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
          `}} />
        </div>

      </div>

    </section>
  );
}
