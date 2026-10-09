"use client";

import { useState, useEffect, useCallback } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

// Yatiya Couture Fashion Image Assets (High Quality)
const wideBannerImage = "https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=2000&q=80";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Perfect Bridal Lehenga",
    date: "October 08, 2026",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    link: "/journal/perfect-bridal-lehenga"
  },
  {
    id: 2,
    title: "5 Timeless Couture Styles Every Bride Should Know",
    date: "October 05, 2026",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    link: "/journal/timeless-couture-styles"
  },
  {
    id: 3,
    title: "How to Style Your Lehenga for a Wedding",
    date: "September 28, 2026",
    image: "https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=600&q=80",
    link: "/journal/style-lehenga-wedding"
  },
  {
    id: 4,
    title: "Choosing the Right Embroidery for Your Occasion",
    date: "September 22, 2026",
    image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=600&q=80",
    link: "/journal/choosing-right-embroidery"
  },
  {
    id: 5,
    title: "2026 Bridal Couture Trends to Watch",
    date: "September 15, 2026",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    link: "/journal/bridal-couture-trends"
  },
  {
    id: 6,
    title: "From Fabric to Finish: Understanding Couture Craftsmanship",
    date: "September 10, 2026",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    link: "/journal/couture-craftsmanship"
  },
  {
    id: 7,
    title: "How to Accessorize Your Designer Lehenga",
    date: "September 02, 2026",
    image: "https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=600&q=80",
    link: "/journal/accessorize-designer-lehenga"
  },
  {
    id: 8,
    title: "The Art of Indian Bridal Couture",
    date: "August 28, 2026",
    image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=600&q=80",
    link: "/journal/art-indian-bridal-couture"
  }
];

export function BlogSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };
    
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const totalPages = Math.max(1, blogPosts.length - visibleCount + 1);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current === totalPages - 1 ? 0 : current + 1));
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? totalPages - 1 : current - 1));
  }, [totalPages]);

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full max-w-[1920px] mx-auto overflow-hidden bg-yatiya-ivory">
      
      {/* PART 1: WIDE PROMOTIONAL BANNER */}
      <Reveal direction="up" delay={0.1}>
        <div className="px-6 md:px-[30px] w-full">
          <Link href="/collection/new-season" className="group relative w-full aspect-[4/3] sm:aspect-[16/7] md:aspect-[1531/400] overflow-hidden bg-yatiya-deep-brown-soft flex items-center rounded-sm">
            <SmartImage 
              src={wideBannerImage}
              alt="Elevate Your Couture Style"
              fill
              className="object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-[1.03] object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-yatiya-dark-cocoa/80 via-yatiya-dark-cocoa/40 to-transparent" />
            
            <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-[90%] md:max-w-[50%] text-yatiya-light-text">
              <span className="text-yatiya-light-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-4">
                NEW SEASON
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-[42px] font-display leading-tight mb-3 md:mb-4">
                ELEVATE YOUR COUTURE STYLE
              </h3>
              <p className="text-yatiya-light-text text-sm md:text-[15px] mb-6 md:mb-8 max-w-[400px] leading-relaxed">
                Discover exquisite silhouettes crafted for unforgettable moments.
              </p>
              <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest hover:text-yatiya-light-gold transition-colors border-b border-transparent hover:border-yatiya-light-gold pb-1 w-fit">
                SHOP NOW <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </div>
      </Reveal>

      {/* PART 2: FROM THE BLOG */}
      <div className="mt-[60px] md:mt-[70px] px-6 md:px-[30px] w-full">
        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-[34px] font-display text-yatiya-deep-brown">From The Blog</h2>
            <div className="w-[60px] h-[2px] bg-yatiya-antique-gold mt-[15px]" />
          </div>
        </Reveal>

        {/* Blog Carousel */}
        <div 
          className="relative mt-[35px] md:mt-[45px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Controls */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-[-15px] md:left-[-20px] top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-yatiya-ivory shadow-md rounded-full flex items-center justify-center text-yatiya-deep-brown hover:bg-yatiya-antique-gold hover:text-yatiya-light-text transition-colors"
                aria-label="Previous blog posts"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-[-15px] md:right-[-20px] top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-yatiya-ivory shadow-md rounded-full flex items-center justify-center text-yatiya-deep-brown hover:bg-yatiya-antique-gold hover:text-yatiya-light-text transition-colors"
                aria-label="Next blog posts"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="overflow-hidden w-full px-1 py-2">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
            >
              {blogPosts.map((post) => (
                <div 
                  key={post.id}
                  className="shrink-0 px-2 md:px-[15px]"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <Link href={post.link} className="group block h-full flex flex-col">
                    
                    {/* Image */}
                    <div className="relative w-full aspect-[360/313] overflow-hidden rounded-sm bg-yatiya-cream mb-5 shrink-0">
                      <SmartImage
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col grow">
                      <span className="text-yatiya-warm-bronze text-[11px] md:text-xs font-medium uppercase tracking-widest mb-2">
                        {post.date}
                      </span>
                      <h4 className="text-yatiya-deep-brown font-display text-lg md:text-[20px] leading-[1.3] mb-4 group-hover:text-yatiya-antique-gold transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="mt-auto text-xs font-bold uppercase tracking-widest text-yatiya-deep-brown group-hover:text-yatiya-antique-gold transition-colors inline-flex items-center">
                        READ MORE <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                      </span>
                    </div>

                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
