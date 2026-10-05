"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";

import { useCart } from "@/context/CartContext";

// Icons
const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const HeartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const BagIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const XIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;

const announcementMessages = [
  "FREE SHIPPING ON ORDERS ABOVE ₹2,999",
  "OVER 100K HAPPY CUSTOMERS",
  "COD AVAILABLE",
  "5% OFF ON PREPAID ORDERS"
];

const headerImages = {
  womenEdit: "https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=600&q=80",
  collections: "https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=600&q=80",
  occasions: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcementMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const NAV_LINKS = [
    { name: "HOME", type: "link", href: "/" },
    { name: "NEW ARRIVALS", type: "link", href: "/new-arrivals" },
    { name: "COLLECTIONS", type: "dropdown" },
    { name: "WOMEN'S EDIT", type: "dropdown" },
    { name: "SHOP BY OCCASION", type: "dropdown" },
    { name: "THE JOURNAL", type: "link", href: "/journal" },
    { name: "ABOUT", type: "link", href: "/about" },
  ];

  return (
    <>
      <header className="w-full relative z-50">
        
        {/* ROW 1: ANNOUNCEMENT BAR */}
        <div className="w-full h-[38px] bg-[#B17165] text-[#FCFAF7] overflow-hidden flex items-center justify-center relative">
          <div className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase transition-opacity duration-500">
            {announcementMessages[announcementIndex]}
          </div>
        </div>

        {/* ROW 2: MAIN HEADER */}
        <div 
          className={`w-full bg-[#604F6F] text-[#FCFAF7] transition-all duration-400 ease-out ${
            isScrolled ? 'h-[70px] border-b border-[#FCFAF7]/10 shadow-[0_10px_40px_-10px_rgba(36,33,36,0.2)] sticky top-0' : 'h-[80px] border-b-0'
          }`}
          style={{ position: isScrolled ? 'fixed' : 'relative' }}
        >
          <div className="h-full flex items-center justify-between mx-auto" style={{ maxWidth: '1440px', width: 'calc(100% - 48px)' }}>
            
            {/* LEFT: LOGO */}
            <div className="flex items-center shrink-0 lg:w-[150px]">
              <button 
                className="lg:hidden mr-4 hover:text-[#C7A66A] transition-colors" 
                aria-label="Menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon />
              </button>
              <Link href="/" className="flex items-center hover:text-[#C7A66A] transition-colors">
                <span className="font-display text-[26px] md:text-[30px] tracking-[0.1em] uppercase leading-none mt-1">
                  YATYIA
                </span>
              </Link>
            </div>

            {/* CENTER: DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center justify-center flex-1 h-full">
              <div className="flex items-center gap-[24px] xl:gap-[32px] h-full">
                {NAV_LINKS.map((link) => (
                  <div 
                    key={link.name} 
                    className="h-full flex items-center relative group"
                    onMouseEnter={() => link.type === "dropdown" && setActiveMenu(link.name)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <Link 
                      href={link.href || "#"} 
                      className="text-[11px] xl:text-[12px] font-sans font-medium tracking-[0.15em] whitespace-nowrap hover:text-[#C7A66A] transition-colors flex items-center gap-1 uppercase"
                    >
                      {link.name}
                      <span className="absolute bottom-[24px] left-0 w-0 h-[1.5px] bg-[#C7A66A] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    
                    {/* MEGA MENU DROPDOWNS */}
                    {link.type === "dropdown" && (
                      <div 
                        className={`absolute top-full left-1/2 -translate-x-1/2 bg-[#FCFAF7] text-[#242124] border border-[#E9E3DD] shadow-2xl transition-all duration-300 ease-out z-[100] flex ${
                          activeMenu === link.name ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                        }`}
                        style={{ width: link.name === "WOMEN'S EDIT" ? '900px' : '700px' }}
                      >
                        
                        {/* WOMEN'S EDIT MENU */}
                        {link.name === "WOMEN'S EDIT" && (
                          <div className="w-full flex p-10">
                            <div className="w-1/3 flex flex-col pr-8 border-r border-[#E9E3DD]">
                              <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#604F6F] uppercase mb-5">SHOP</h4>
                              <ul className="space-y-4">
                                {["New Arrivals", "Best Sellers", "Wedding Wear", "Festive Wear", "Occasion Wear"].map((item) => (
                                  <li key={item}><Link href="#" className="text-[14px] font-sans hover:text-[#B17165] transition-colors">{item}</Link></li>
                                ))}
                              </ul>
                            </div>
                            <div className="w-1/3 flex flex-col px-8 border-r border-[#E9E3DD]">
                              <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#604F6F] uppercase mb-5">CATEGORIES</h4>
                              <ul className="space-y-4">
                                {["Lehengas", "Sarees", "Dresses", "Kurtis", "Anarkalis", "Co-Ord Sets", "Tops & Shirts", "Drapes"].map((item) => (
                                  <li key={item}><Link href="#" className="text-[14px] font-sans hover:text-[#B17165] transition-colors">{item}</Link></li>
                                ))}
                              </ul>
                            </div>
                            <div className="w-1/3 flex flex-col pl-8">
                              <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#604F6F] uppercase mb-5">FEATURED</h4>
                              <Link href="/collections/women" className="group block">
                                <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#F7F0E8] mb-4">
                                  <SmartImage src={headerImages.womenEdit} alt="Women's Edit" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <h5 className="text-[14px] font-display mb-1 group-hover:text-[#B17165] transition-colors">THE WOMEN'S EDIT</h5>
                                <p className="text-[12px] font-sans text-[#242124]/70 mb-2">Contemporary silhouettes, timeless craftsmanship and occasion-ready pieces for the modern woman.</p>
                                <span className="text-[11px] font-sans font-bold tracking-[0.1em] text-[#641F32] uppercase border-b border-[#641F32] pb-0.5">EXPLORE THE COLLECTION &rarr;</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* COLLECTIONS MENU */}
                        {link.name === "COLLECTIONS" && (
                          <div className="w-full flex p-10">
                            <div className="w-1/2 flex flex-col pr-8 border-r border-[#E9E3DD]">
                              <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#604F6F] uppercase mb-5">CURATED EDITS</h4>
                              <ul className="space-y-4">
                                {["THE BRIDAL EDIT", "THE FESTIVE EDIT", "THE EVENING EDIT", "THE EVERYDAY EDIT", "NEW SEASON"].map((item) => (
                                  <li key={item}><Link href="#" className="text-[14px] font-sans hover:text-[#B17165] transition-colors uppercase">{item}</Link></li>
                                ))}
                              </ul>
                            </div>
                            <div className="w-1/2 flex flex-col pl-8">
                              <Link href="/collections" className="group block h-full">
                                <div className="w-full h-[200px] relative overflow-hidden bg-[#F7F0E8] mb-4">
                                  <SmartImage src={headerImages.collections} alt="Collections" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <h5 className="text-[14px] font-display mb-1 group-hover:text-[#B17165] transition-colors">EXPLORE ALL COLLECTIONS</h5>
                                <span className="text-[11px] font-sans font-bold tracking-[0.1em] text-[#641F32] uppercase border-b border-[#641F32] pb-0.5">SHOP NOW &rarr;</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* OCCASIONS MENU */}
                        {link.name === "SHOP BY OCCASION" && (
                          <div className="w-full flex p-10">
                            <div className="w-1/2 flex flex-col pr-8 border-r border-[#E9E3DD]">
                              <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#604F6F] uppercase mb-5">DRESS THE MOMENT</h4>
                              <ul className="space-y-4">
                                {["WEDDINGS", "FESTIVALS", "PARTIES", "EVENING", "CELEBRATIONS", "EVERYDAY"].map((item) => (
                                  <li key={item}><Link href="#" className="text-[14px] font-sans hover:text-[#B17165] transition-colors uppercase">{item}</Link></li>
                                ))}
                              </ul>
                            </div>
                            <div className="w-1/2 flex flex-col pl-8">
                              <Link href="/collections/occasions" className="group block h-full">
                                <div className="w-full h-[200px] relative overflow-hidden bg-[#F7F0E8] mb-4">
                                  <SmartImage src={headerImages.occasions} alt="Occasions" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <h5 className="text-[14px] font-display mb-1 group-hover:text-[#B17165] transition-colors">THE OCCASION EDIT</h5>
                                <span className="text-[11px] font-sans font-bold tracking-[0.1em] text-[#641F32] uppercase border-b border-[#641F32] pb-0.5">SHOP NOW &rarr;</span>
                              </Link>
                            </div>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* RIGHT: ICONS */}
            <div className="flex items-center justify-end shrink-0 gap-[20px] lg:w-[150px]">
              <button className="hover:text-[#C7A66A] transition-colors" aria-label="Search">
                <SearchIcon />
              </button>
              <Link href="/account" className="hover:text-[#C7A66A] transition-colors hidden sm:block" aria-label="Account">
                <UserIcon />
              </Link>
              <Link href="/wishlist" className="hover:text-[#C7A66A] transition-colors hidden sm:block" aria-label="Wishlist">
                <HeartIcon />
              </Link>
              <Link href="/cart" className="hover:text-[#C7A66A] transition-colors relative" aria-label="Cart">
                <BagIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#C7A66A] text-[#242124] text-[9px] font-bold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU */}
      <div 
        className={`fixed inset-0 bg-[#FCFAF7] z-[100] transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-full h-[80px] flex items-center justify-between px-6 border-b border-[#E9E3DD] shrink-0 bg-[#604F6F] text-[#FCFAF7]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <span className="font-display text-[24px] tracking-[0.1em] uppercase leading-none mt-1">
              YATYIA
            </span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu" className="hover:text-[#C7A66A] transition-colors">
            <XIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-6">
            <li>
              <Link href="/" className="text-[18px] font-sans uppercase text-[#242124]" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="text-[18px] font-sans uppercase text-[#242124]" onClick={() => setMobileMenuOpen(false)}>NEW ARRIVALS</Link>
            </li>
            
            {/* WOMEN'S EDIT ACCORDION */}
            <li className="flex flex-col border-b border-[#E9E3DD] pb-4">
              <button 
                className="flex items-center justify-between w-full text-[18px] font-sans uppercase text-[#242124]"
                onClick={() => setMobileExpanded(mobileExpanded === 'WOMENS_EDIT' ? null : 'WOMENS_EDIT')}
              >
                WOMEN'S EDIT
                <span className={`transition-transform duration-300 ${mobileExpanded === 'WOMENS_EDIT' ? 'rotate-180' : ''}`}><ChevronDown /></span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === 'WOMENS_EDIT' ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-4 pl-4 border-l border-[#B17165]/30">
                  {["Lehengas", "Sarees", "Dresses", "Anarkalis", "Kurtis", "Co-Ord Sets", "Tops & Shirts", "Drapes"].map((item) => (
                    <Link key={item} href="#" className="text-[15px] font-sans text-[#242124]/80" onClick={() => setMobileMenuOpen(false)}>{item}</Link>
                  ))}
                  <Link href="/collections/women" className="text-[14px] font-sans font-bold text-[#641F32] mt-2" onClick={() => setMobileMenuOpen(false)}>EXPLORE THE COLLECTION &rarr;</Link>
                </div>
              </div>
            </li>

            <li>
              <Link href="/collections" className="text-[18px] font-sans uppercase text-[#242124]" onClick={() => setMobileMenuOpen(false)}>COLLECTIONS</Link>
            </li>
            <li>
              <Link href="/collections/occasions" className="text-[18px] font-sans uppercase text-[#242124]" onClick={() => setMobileMenuOpen(false)}>SHOP BY OCCASION</Link>
            </li>
            <li>
              <Link href="/journal" className="text-[18px] font-sans uppercase text-[#242124]" onClick={() => setMobileMenuOpen(false)}>THE JOURNAL</Link>
            </li>
            <li>
              <Link href="/about" className="text-[18px] font-sans uppercase text-[#242124]" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
            </li>
          </ul>
        </div>
        
        <div className="w-full bg-[#F7F0E8] p-8 flex justify-center gap-8 text-[#242124]">
          <Link href="/account" className="flex flex-col items-center gap-2 hover:text-[#B17165]" onClick={() => setMobileMenuOpen(false)}>
            <UserIcon />
            <span className="text-[10px] uppercase font-bold tracking-widest">Account</span>
          </Link>
          <Link href="/wishlist" className="flex flex-col items-center gap-2 hover:text-[#B17165]" onClick={() => setMobileMenuOpen(false)}>
            <HeartIcon />
            <span className="text-[10px] uppercase font-bold tracking-widest">Wishlist</span>
          </Link>
        </div>
      </div>
    </>
  );
}
