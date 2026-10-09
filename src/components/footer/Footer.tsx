"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({ 
    target: footerRef, 
    offset: ["start end", "end end"] 
  });
  
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["20px", "-10px"]);

  return (
    <footer ref={footerRef} className="w-full bg-yatiya-dark-cocoa text-yatiya-light-text relative overflow-hidden">
      
      {/* SUBTLE GRAIN BACKGROUND */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-12">
        
        {/* FOOTER HERO AREA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-32"
        >
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-6 block">
            The Yatiya World
          </span>
          <h2 className="text-6xl md:text-8xl font-display uppercase tracking-wider mb-8 leading-[0.9]">
            Dress the<br/>Moment.
          </h2>
          <p className="text-[13px] md:text-[14px] font-sans text-yatiya-light-text/70 leading-relaxed mb-10 max-w-lg mx-auto uppercase tracking-widest">
            Discover considered silhouettes, expressive details and modern Indian craftsmanship.
          </p>
          <Link 
            href="/collections/women"
            className="group flex items-center gap-4 text-[11px] font-sans tracking-[0.2em] font-bold uppercase text-yatiya-light-text hover:text-yatiya-roman-gold transition-colors"
          >
            Explore the Collection
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </motion.div>

        {/* HUGE WORDMARK */}
        <motion.div 
          style={{ y: wordmarkY }}
          className="w-full flex justify-center mb-24 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <img src="/logo.png" alt="YATIYA COUTURE" className="object-contain w-[60vw] md:w-[40vw] max-w-[800px] h-auto opacity-80" />
          </motion.div>
        </motion.div>

        {/* CONTACT / CONCIERGE STRIP */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between border-b border-yatiya-dark-cocoa/20 pb-16 mb-16 gap-12"
        >
          <div className="flex flex-col md:w-1/2 gap-4 text-[13px] font-sans text-yatiya-light-text/70">
            <h4 className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-2">Concierge</h4>
            <a href="mailto:hello@yatyia.com" className="hover:text-yatiya-roman-gold transition-colors">hello@yatyia.com</a>
            <a href="tel:+910000000000" className="hover:text-yatiya-roman-gold transition-colors">+91 99999 00000</a>
          </div>
          
          <div className="flex flex-col md:w-1/2 gap-4 text-[13px] font-sans text-yatiya-light-text/70">
            <h4 className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-2">Private Styling</h4>
            <p>Book an appointment with our styling team for a personalized experience.</p>
            <Link href="/appointment" className="group flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.15em] uppercase text-yatiya-light-text mt-2 hover:text-yatiya-roman-gold transition-colors">
              Book an Appointment <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>

        {/* MAIN NAVIGATION & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* NAV COLUMNS */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <h4 className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-text/50 uppercase mb-8">Shop</h4>
              <ul className="flex flex-col gap-4">
                {["New Arrivals", "Lehengas", "Sarees", "Dresses", "Kurtis", "Anarkalis", "Co-Ord Sets"].map(link => (
                  <li key={link}>
                    <Link href="#" className="text-[13px] font-sans text-yatiya-light-text/80 hover:text-yatiya-roman-gold transition-colors inline-block relative group">
                      {link}
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <h4 className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-text/50 uppercase mb-8">Discover</h4>
              <ul className="flex flex-col gap-4">
                {["About YATIYA", "Our Story", "Craftsmanship", "Journal", "Collections"].map(link => (
                  <li key={link}>
                    <Link href="#" className="text-[13px] font-sans text-yatiya-light-text/80 hover:text-yatiya-roman-gold transition-colors inline-block relative group">
                      {link}
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.6 }}>
              <h4 className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-text/50 uppercase mb-8">Services</h4>
              <ul className="flex flex-col gap-4">
                {["Private Styling", "Book an Appointment", "Track Order", "Shipping & Delivery", "Returns & Exchanges"].map(link => (
                  <li key={link}>
                    <Link href="#" className="text-[13px] font-sans text-yatiya-light-text/80 hover:text-yatiya-roman-gold transition-colors inline-block relative group">
                      {link}
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.7 }}>
              <h4 className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-text/50 uppercase mb-8">Help</h4>
              <ul className="flex flex-col gap-4">
                {["Contact Us", "FAQs", "WhatsApp", "Email"].map(link => (
                  <li key={link}>
                    <Link href="#" className="text-[13px] font-sans text-yatiya-light-text/80 hover:text-yatiya-roman-gold transition-colors inline-block relative group">
                      {link}
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* NEWSLETTER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-5 flex flex-col items-start lg:pl-16 border-t lg:border-t-0 lg:border-l border-yatiya-dark-cocoa/20 pt-16 lg:pt-0"
          >
            <h4 className="text-[10px] font-sans font-bold tracking-[0.2em] text-yatiya-light-gold uppercase mb-6">Join The Private List</h4>
            <p className="text-[13px] font-sans text-yatiya-light-text/70 leading-relaxed mb-10 max-w-sm">
              Be first to discover new collections, exclusive edits and private invitations.
            </p>
            <form className="w-full flex items-end group relative pb-2" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="bg-transparent flex-1 text-[13px] font-sans text-yatiya-light-text tracking-widest placeholder-yatiya-dark-cocoa/40 focus:outline-none"
                required
              />
              <button type="submit" className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-yatiya-light-text hover:text-yatiya-roman-gold transition-colors pb-1 flex items-center gap-2">
                Join <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              {/* Animated Underline */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-yatiya-dark-cocoa/20" />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-yatiya-roman-gold group-focus-within:w-full transition-all duration-500 ease-out" />
            </form>
          </motion.div>
        </div>

        {/* SOCIAL & COPYRIGHT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col gap-10 border-t border-yatiya-dark-cocoa/20 pt-10"
        >
          <div className="flex justify-between items-end flex-col md:flex-row gap-8">
            
            <div className="flex gap-8 text-[11px] font-sans uppercase tracking-[0.15em] text-yatiya-light-text/40">
              <p>© 2026 YATIYA</p>
              <div className="hidden md:flex gap-6">
                <Link href="/privacy" className="hover:text-yatiya-roman-gold transition-colors relative group">
                  Privacy Policy<span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/terms" className="hover:text-yatiya-roman-gold transition-colors relative group">
                  Terms & Conditions<span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/shipping" className="hover:text-yatiya-roman-gold transition-colors relative group">
                  Shipping<span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/returns" className="hover:text-yatiya-roman-gold transition-colors relative group">
                  Returns<span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/cookies" className="hover:text-yatiya-roman-gold transition-colors relative group">
                  Cookies<span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-yatiya-roman-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>

            {/* SOCIAL ICONS (Line style) */}
            <div className="flex gap-6">
              {[
                { name: "Instagram", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
                { name: "Pinterest", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.65 7.89 6.42 9.27-.09-.79-.17-2.01.04-2.88.19-.8 1.25-5.32 1.25-5.32s-.32-.64-.32-1.58c0-1.48.86-2.59 1.93-2.59.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.93 1.57 1.93 1.89 0 3.34-1.99 3.34-4.87 0-2.55-1.83-4.33-4.45-4.33-3.04 0-4.83 2.28-4.83 4.64 0 .91.35 1.89.79 2.42.09.1.1.2.07.31l-.25 1.03c-.04.14-.13.16-.27.1-1.02-.48-1.65-1.99-1.65-3.21 0-2.61 1.9-5.01 5.48-5.01 2.87 0 5.11 2.05 5.11 4.78 0 2.86-1.8 5.16-4.3 5.16-1.25 0-2.42-.65-2.82-1.42l-.77 2.92c-.28 1.06-1.04 2.39-1.55 3.2C9.57 23.77 10.75 24 12 24c5.52 0 10-4.48 10-10S17.52 2 12 2z"></path></svg> },
                { name: "Facebook", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> }
              ].map(social => (
                <a 
                  key={social.name} 
                  href="#" 
                  className="text-yatiya-light-text/50 hover:text-yatiya-roman-gold transition-all duration-300 hover:-translate-y-1 relative group"
                  aria-label={social.name}
                >
                  {social.icon}
                  <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-yatiya-roman-gold transition-all duration-300 group-hover:w-[12px]"></span>
                </a>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </footer>
  );
}
