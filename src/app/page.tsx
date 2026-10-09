"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { CategoryStrip } from "@/components/header/CategoryStrip";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PromoGrid } from "@/components/home/PromoGrid";
import { NewProducts } from "@/components/home/NewProducts";
import { DealsAndBestSeller } from "@/components/home/DealsAndBestSeller";
import { PromoTestimonials } from "@/components/home/PromoTestimonials";
import { BlogSection } from "@/components/home/BlogSection";
import { products } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";

const featuredProducts = products.slice(0, 4);

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Parallax for Hero
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 800], [0, 150]);
  const heroTextY = useTransform(scrollY, [0, 800], [0, -50]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.04]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Parallax for Modern Muse
  const museRef = useRef(null);
  const { scrollYProgress: museScroll } = useScroll({ target: museRef, offset: ["start end", "end start"] });
  const museImageY = useTransform(museScroll, [0, 1], ["-10%", "10%"]);
  const museTextY = useTransform(museScroll, [0, 1], ["20px", "-20px"]);

  // Parallax for Craft & Story
  const craftRef = useRef(null);
  const { scrollYProgress: craftScroll } = useScroll({ target: craftRef, offset: ["start end", "end start"] });
  const craftImgY = useTransform(craftScroll, [0, 1], ["0%", "8%"]);

  return (
    <>
      {/* 1. CINEMATIC PAGE INTRO */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-yatiya-dark-cocoa flex items-center justify-center pointer-events-none"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-display uppercase tracking-[0.2em] text-yatiya-light-text"
            >
              YATIYA
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HOME PAGE — Ivory/Cream base, dark sections use Dark Cocoa */}
      <div className="bg-yatiya-ivory text-yatiya-dark-cocoa overflow-hidden">
        
        {/* 2. MAIN HERO SLIDER */}
        <HeroSlider />

        {/* PROMO GRID SECTION */}
        <PromoGrid />

        {/* NEW PRODUCTS SECTION */}
        <NewProducts />

        {/* DEALS AND BEST SELLER SECTION */}
        <DealsAndBestSeller />

        {/* PROMO & TESTIMONIALS SECTION */}
        <PromoTestimonials />

        {/* WIDE PROMO & BLOG SECTION */}
        <BlogSection />

        {/* 3. CATEGORY SECTION */}
        <Reveal direction="up" delay={0.1} duration={1}>
          <CategoryStrip />
        </Reveal>

        {/* 5. SAREE / DRAPE EDIT — Dark Cocoa section for contrast */}
        <section className="py-24 bg-yatiya-dark-cocoa overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-7/12">
              <Reveal direction="left" duration={1.2}>
                <div className="w-full aspect-[4/5] relative bg-yatiya-deep-brown overflow-hidden group">
                  <motion.div className="w-full h-full origin-center" whileHover={{ scale: 1.03 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <SmartImage 
                      src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=1200&q=80" 
                      alt="The Drape Edit" 
                      fill 
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </Reveal>
            </div>
            <div className="w-full md:w-5/12 flex flex-col items-start">
              <Reveal direction="right" delay={0.2} duration={1}>
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-roman-gold uppercase mb-6 block">Focus</span>
                <h2 className="text-5xl md:text-6xl font-display text-yatiya-light-text mb-8 leading-[1.1]">
                  THE DRAPE<br/>EDIT
                </h2>
                <p className="text-[15px] font-sans text-yatiya-light-text/70 leading-relaxed mb-10 max-w-md">
                  Timeless drapes, reimagined for now. Fluid silhouettes crafted from weightless fabrics that move beautifully with every step.
                </p>
                <Link 
                  href="/collections/drapes"
                  className="border border-yatiya-roman-gold text-yatiya-roman-gold hover:bg-yatiya-roman-gold hover:text-yatiya-light-text px-10 py-4 text-[11px] font-sans tracking-[0.2em] font-bold uppercase transition-colors duration-300"
                >
                  EXPLORE SAREES
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 6. BRIDAL EDIT CAMPAIGN — uses photography with dark cocoa overlay */}
        <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
          <ImageReveal className="absolute inset-0">
            <SmartImage 
              src="https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=1920&q=80" 
              alt="The Bridal Edit" 
              fill 
              className="object-cover"
            />
          </ImageReveal>
          <div className="absolute inset-0 bg-yatiya-dark-cocoa/60" />
          
          <div className="relative z-10 text-center px-6">
            <Reveal direction="up" duration={1.2}>
              <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-6 block">A Bridal Story</span>
              <h2 className="text-5xl md:text-8xl font-display text-yatiya-light-text mb-6">THE BRIDAL EDIT</h2>
              <p className="text-[14px] md:text-[15px] font-sans text-yatiya-light-text/80 mb-10 tracking-widest uppercase max-w-lg mx-auto">For moments that become memories. Exquisite handwork and timeless elegance.</p>
              <Link 
                href="/collections/bridal"
                className="border border-yatiya-light-gold text-yatiya-light-text px-10 py-4 text-[11px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-yatiya-roman-gold hover:border-yatiya-roman-gold transition-colors duration-300 inline-block"
              >
                DISCOVER BRIDAL
              </Link>
            </Reveal>
          </div>
        </section>

        {/* 7. SHOP BY OCCASION — Light Ivory section */}
        <section className="py-24 md:py-32 max-w-[1400px] mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-display text-yatiya-dark-cocoa mb-4">DRESS THE MOMENT</h2>
              <p className="text-[12px] font-sans uppercase tracking-[0.2em] text-yatiya-muted-text">Shop by Occasion</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            
            <div className="md:col-span-7 flex flex-col">
              <Reveal direction="up" delay={0.1}>
                <Link href="/occasions/weddings" className="group block relative w-full aspect-[4/3] bg-yatiya-cream overflow-hidden mb-6">
                  <SmartImage src="https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=1000&q=80" alt="Weddings" fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                </Link>
                <div className="inline-block group cursor-pointer">
                  <h3 className="text-[14px] font-sans font-bold tracking-[0.15em] uppercase text-yatiya-dark-cocoa">Weddings</h3>
                  <div className="h-[1px] w-0 bg-yatiya-roman-gold group-hover:w-full transition-all duration-400 mt-1" />
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-5 flex flex-col md:pt-24">
              <Reveal direction="up" delay={0.25}>
                <Link href="/occasions/evening" className="group block relative w-full aspect-[3/4] bg-yatiya-cream overflow-hidden mb-6">
                  <SmartImage src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80" alt="Evening" fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                </Link>
                <div className="inline-block group cursor-pointer">
                  <h3 className="text-[14px] font-sans font-bold tracking-[0.15em] uppercase text-yatiya-dark-cocoa">Evening</h3>
                  <div className="h-[1px] w-0 bg-yatiya-roman-gold group-hover:w-full transition-all duration-400 mt-1" />
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-4 flex flex-col">
              <Reveal direction="up" delay={0.1}>
                <Link href="/occasions/celebrations" className="group block relative w-full aspect-[1/1] bg-yatiya-cream overflow-hidden mb-6">
                  <SmartImage src="https://images.unsplash.com/photo-1515347619362-e67ebf8d4e7b?auto=format&fit=crop&w=800&q=80" alt="Celebrations" fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                </Link>
                <div className="inline-block group cursor-pointer">
                  <h3 className="text-[14px] font-sans font-bold tracking-[0.15em] uppercase text-yatiya-dark-cocoa">Celebrations</h3>
                  <div className="h-[1px] w-0 bg-yatiya-roman-gold group-hover:w-full transition-all duration-400 mt-1" />
                </div>
              </Reveal>
            </div>
            
            <div className="md:col-span-8 flex flex-col md:pt-16">
              <Reveal direction="up" delay={0.3}>
                <Link href="/occasions/festivals" className="group block relative w-full aspect-[16/9] bg-yatiya-cream overflow-hidden mb-6">
                  <SmartImage src="https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=1200&q=80" alt="Festivals" fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                </Link>
                <div className="inline-block group cursor-pointer">
                  <h3 className="text-[14px] font-sans font-bold tracking-[0.15em] uppercase text-yatiya-dark-cocoa">Festivals</h3>
                  <div className="h-[1px] w-0 bg-yatiya-roman-gold group-hover:w-full transition-all duration-400 mt-1" />
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* 8. CRAFT & STORY — Dark Cocoa section */}
        <section ref={craftRef} className="py-24 bg-yatiya-dark-cocoa border-t border-yatiya-roman-gold/20 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
              <Reveal direction="right" duration={1.2}>
                <h2 className="text-4xl md:text-5xl font-display text-yatiya-light-gold mb-8 leading-[1.1]">
                  CRAFTED WITH INTENTION
                </h2>
                <p className="text-[15px] font-sans text-yatiya-light-text/70 leading-relaxed mb-10 max-w-md">
                  From intricate detailing to considered silhouettes, every YATIYA piece is created to make an impression. We honor traditional Indian handwork, interpreted through a modern editorial lens.
                </p>
                <Link 
                  href="/about"
                  className="border-b border-yatiya-roman-gold text-yatiya-roman-gold pb-1 text-[11px] font-sans tracking-[0.2em] font-bold uppercase hover:text-yatiya-light-gold hover:border-yatiya-light-gold transition-colors"
                >
                  DISCOVER OUR STORY
                </Link>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-end">
              <Reveal direction="left" delay={0.2} duration={1.2} className="w-full md:w-10/12">
                <div className="w-full aspect-[4/5] relative bg-yatiya-deep-brown overflow-hidden">
                  <motion.div style={{ y: craftImgY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                    <SmartImage 
                      src="https://images.unsplash.com/photo-1610030469983-98e550d615e1?auto=format&fit=crop&w=800&q=80" 
                      alt="Embroidery detail" 
                      fill 
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 9. THE MODERN MUSE — Cinematic Parallax over photography */}
        <section ref={museRef} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
          <motion.div style={{ y: museImageY }} className="absolute inset-[-10%] w-[120%] h-[120%] z-0">
            <SmartImage 
              src="https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=1920&q=80"
              alt="Modern Muse"
              fill
              className="object-cover opacity-90"
            />
          </motion.div>
          <div className="absolute inset-0 bg-yatiya-dark-cocoa/55 z-0" />
          
          <motion.div style={{ y: museTextY }} className="relative z-10 text-center px-6 flex flex-col items-center">
            <Reveal direction="up" delay={0.1}>
              <h2 className="text-[12px] font-sans font-bold tracking-[0.3em] uppercase text-yatiya-light-gold mb-8">THE MODERN MUSE</h2>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="text-4xl md:text-6xl font-display text-yatiya-light-text italic max-w-2xl mx-auto leading-tight">
                Quiet luxury.<br/> Effortless grace.<br/> Timeless appeal.
              </p>
            </Reveal>
          </motion.div>
        </section>

        {/* 10. THE CURATION — Product Cards on light ivory */}
        <section className="py-24 md:py-32 max-w-[1400px] mx-auto px-6">
          <Reveal direction="up">
            <div className="flex justify-between items-end mb-16 border-b border-yatiya-roman-gold/30 pb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-display text-yatiya-dark-cocoa">THE CURATION</h2>
                <p className="text-[12px] font-sans uppercase tracking-[0.2em] text-yatiya-muted-text mt-3">Exquisite pieces for the season</p>
              </div>
              <Link href="/collections/women" className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-yatiya-antique-gold border-b border-yatiya-antique-gold/50 hover:text-yatiya-roman-gold hover:border-yatiya-roman-gold transition-colors pb-1 hidden md:block">
                VIEW ALL
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="group cursor-pointer flex flex-col"
              >
                <Link href={`/product/${product.slug}`} className="block relative w-full aspect-[3/4] bg-yatiya-cream overflow-hidden mb-5">
                  <SmartImage 
                    src={product.images[0]} 
                    alt={product.title} 
                    fill 
                    className="object-cover transition-all duration-[700ms] group-hover:scale-[1.045] group-hover:opacity-0" 
                  />
                  {product.images[1] && (
                    <SmartImage 
                      src={product.images[1]} 
                      alt={product.title} 
                      fill 
                      className="object-cover absolute inset-0 opacity-0 transition-opacity duration-[700ms] group-hover:opacity-100 group-hover:scale-[1.045]" 
                    />
                  )}
                  {/* Wishlist Fade In */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#342719" strokeWidth="1.5" className="hover:fill-yatiya-burgundy hover:stroke-yatiya-burgundy transition-colors"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </div>
                  {/* Quick View Slide Up */}
                  <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out z-20">
                    <div className="bg-yatiya-dark-cocoa/90 backdrop-blur-sm text-yatiya-light-text py-3 text-center text-[10px] font-bold uppercase tracking-widest hover:bg-yatiya-roman-gold transition-colors">
                      Quick View
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-yatiya-roman-gold font-bold mb-2">{product.categoryId}</span>
                  <Link href={`/product/${product.slug}`} className="text-[14px] md:text-[15px] font-sans font-medium text-yatiya-dark-cocoa hover:text-yatiya-roman-gold transition-colors mb-2">
                    {product.title}
                  </Link>
                  <span className="text-[13px] font-sans text-yatiya-antique-gold font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 11. TESTIMONIALS — Dark Cocoa section */}
        <section className="py-32 bg-yatiya-dark-cocoa overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <Reveal direction="none" delay={0.1}>
              <div className="text-yatiya-roman-gold mb-8 text-2xl tracking-widest">★★★★★</div>
            </Reveal>
            <Reveal direction="up" delay={0.25} duration={1}>
              <p className="text-3xl md:text-5xl font-display text-yatiya-light-text leading-snug mb-10">
                &ldquo;Every detail felt thoughtfully considered —<br className="hidden md:block"/> from the fabric to the flawless finishing.&rdquo;
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-yatiya-light-text/50 relative inline-block">
                <span className="absolute left-[-40px] top-1/2 w-8 h-[1px] bg-yatiya-roman-gold/30" />
                YATIYA CUSTOMER
                <span className="absolute right-[-40px] top-1/2 w-8 h-[1px] bg-yatiya-roman-gold/30" />
              </span>
            </Reveal>
          </div>
        </section>

        {/* 12. INSTAGRAM / SOCIAL GRID — light ivory */}
        <section className="py-24 max-w-[1400px] mx-auto px-6">
          <Reveal direction="up">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-[12px] font-sans font-bold tracking-[0.2em] uppercase text-yatiya-roman-gold mb-4">#YATIYAWOMAN</h2>
              <p className="text-3xl md:text-4xl font-display text-yatiya-dark-cocoa">Join our editorial gallery</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
            {[
              { img: "https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=800&q=80", col: "md:col-span-4", aspect: "aspect-[3/4]" },
              { img: "https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=800&q=80", col: "md:col-span-3", aspect: "aspect-square" },
              { img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80", col: "md:col-span-5", aspect: "aspect-[4/3]" },
              { img: "https://images.unsplash.com/photo-1515347619362-e67ebf8d4e7b?auto=format&fit=crop&w=800&q=80", col: "md:col-span-5", aspect: "aspect-[16/9]" },
              { img: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=800&q=80", col: "md:col-span-4", aspect: "aspect-[3/4]" },
              { img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80", col: "md:col-span-3", aspect: "aspect-square" }
            ].map((item, i) => (
              <Reveal direction="up" delay={0.1 * (i % 3)} key={i} className={`${item.col}`}>
                <div className={`group relative w-full ${item.aspect} bg-yatiya-cream overflow-hidden cursor-pointer`}>
                  <SmartImage src={item.img} alt="Instagram" fill className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]" />
                  <div className="absolute inset-0 bg-yatiya-dark-cocoa/0 group-hover:bg-yatiya-dark-cocoa/50 transition-colors duration-400 flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 text-yatiya-light-text opacity-0 group-hover:opacity-100 transition-opacity duration-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span className="text-[10px] font-sans font-bold text-yatiya-light-text tracking-[0.2em] uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-100">View on Instagram</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
