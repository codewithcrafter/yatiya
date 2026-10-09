"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

// ── Icons ─────────────────────────────────────────────────────────────────
const SearchIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const UserIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const HeartIcon   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const BagIcon     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const MenuIcon    = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const XIcon       = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const ChevronDown = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;

// ── Announcement bar ───────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  "FREE SHIPPING ON ORDERS ABOVE ₹2,999",
  "OVER 100K HAPPY CUSTOMERS",
  "COD AVAILABLE",
  "5% OFF ON PREPAID ORDERS",
];

// ── Dropdown imagery ───────────────────────────────────────────────────────
const HEADER_IMAGES = {
  womenEdit:   "https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=600&q=80",
  collections: "https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=600&q=80",
  occasions:   "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
};

// ── Nav items ─────────────────────────────────────────────────────────────
const LEFT_NAV = [
  { name: "HOME",          type: "link",     href: "/" },
  { name: "NEW ARRIVALS",  type: "link",     href: "/new-arrivals" },
  { name: "COLLECTIONS",   type: "dropdown", href: "#" },
  { name: "WOMEN'S EDIT",  type: "dropdown", href: "#" },
];

const RIGHT_NAV = [
  { name: "SHOP BY OCCASION", type: "dropdown", href: "#" },
  { name: "THE JOURNAL",      type: "link",     href: "/journal" },
  { name: "ABOUT",            type: "link",     href: "/about" },
];

// ── Shared nav-link style ──────────────────────────────────────────────────
const NAV_LINK_CLASS =
  "relative text-[10px] xl:text-[11px] font-sans font-medium tracking-[0.14em] uppercase whitespace-nowrap text-yatiya-dark-cocoa hover:text-yatiya-antique-gold transition-colors duration-200 flex items-center gap-1 group";

export function Header() {
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = getCartCount();

  const [isScrolled,        setIsScrolled]        = useState(false);
  const [activeMenu,        setActiveMenu]         = useState<string | null>(null);
  const [mobileOpen,        setMobileOpen]         = useState(false);
  const [mobileExpanded,    setMobileExpanded]     = useState<string | null>(null);
  const [announcementIdx,   setAnnouncementIdx]    = useState(0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAnnouncementIdx(i => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  // ── Mega-menu content ────────────────────────────────────────────────────
  const megaContent: Record<string, React.ReactElement> = {
    "WOMEN'S EDIT": (
      <div className="flex w-full p-10" style={{ width: 860 }}>
        <div className="w-1/3 pr-8 border-r border-yatiya-roman-gold/20">
          <h4 className="text-[9px] font-sans font-semibold tracking-[0.2em] text-yatiya-roman-gold uppercase mb-5">SHOP</h4>
          <ul className="space-y-3">
            {["New Arrivals","Best Sellers","Wedding Wear","Festive Wear","Occasion Wear"].map(i => (
              <li key={i}><Link href="#" className="text-[13px] font-sans text-yatiya-dark-cocoa hover:text-yatiya-antique-gold transition-colors">{i}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-1/3 px-8 border-r border-yatiya-roman-gold/20">
          <h4 className="text-[9px] font-sans font-semibold tracking-[0.2em] text-yatiya-roman-gold uppercase mb-5">CATEGORIES</h4>
          <ul className="space-y-3">
            {["Lehengas","Sarees","Dresses","Kurtis","Anarkalis","Co-Ord Sets","Tops & Shirts","Drapes"].map(i => (
              <li key={i}><Link href="#" className="text-[13px] font-sans text-yatiya-dark-cocoa hover:text-yatiya-antique-gold transition-colors">{i}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-1/3 pl-8">
          <h4 className="text-[9px] font-sans font-semibold tracking-[0.2em] text-yatiya-roman-gold uppercase mb-5">FEATURED</h4>
          <Link href="/collections/women" className="group/img block">
            <div className="w-full aspect-[4/5] relative overflow-hidden bg-yatiya-cream mb-3">
              <SmartImage src={HEADER_IMAGES.womenEdit} alt="Women's Edit" fill className="object-cover group-hover/img:scale-105 transition-transform duration-700"/>
            </div>
            <p className="text-[14px] font-display mb-1 group-hover/img:text-yatiya-antique-gold transition-colors">THE WOMEN'S EDIT</p>
            <span className="text-[10px] font-sans font-semibold tracking-[0.1em] text-yatiya-roman-gold uppercase border-b border-yatiya-roman-gold pb-0.5">EXPLORE &rarr;</span>
          </Link>
        </div>
      </div>
    ),
    "COLLECTIONS": (
      <div className="flex w-full p-10" style={{ width: 680 }}>
        <div className="w-1/2 pr-8 border-r border-yatiya-roman-gold/20">
          <h4 className="text-[9px] font-sans font-semibold tracking-[0.2em] text-yatiya-roman-gold uppercase mb-5">CURATED EDITS</h4>
          <ul className="space-y-3">
            {["THE BRIDAL EDIT","THE FESTIVE EDIT","THE EVENING EDIT","THE EVERYDAY EDIT","NEW SEASON"].map(i => (
              <li key={i}><Link href="#" className="text-[13px] font-sans text-yatiya-dark-cocoa hover:text-yatiya-antique-gold transition-colors">{i}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-8">
          <Link href="/collections" className="group/img block">
            <div className="w-full h-[190px] relative overflow-hidden bg-yatiya-cream mb-3">
              <SmartImage src={HEADER_IMAGES.collections} alt="Collections" fill className="object-cover group-hover/img:scale-105 transition-transform duration-700"/>
            </div>
            <p className="text-[14px] font-display mb-1 group-hover/img:text-yatiya-antique-gold transition-colors">ALL COLLECTIONS</p>
            <span className="text-[10px] font-sans font-semibold tracking-[0.1em] text-yatiya-roman-gold uppercase border-b border-yatiya-roman-gold pb-0.5">SHOP NOW &rarr;</span>
          </Link>
        </div>
      </div>
    ),
    "SHOP BY OCCASION": (
      <div className="flex w-full p-10" style={{ width: 680 }}>
        <div className="w-1/2 pr-8 border-r border-yatiya-roman-gold/20">
          <h4 className="text-[9px] font-sans font-semibold tracking-[0.2em] text-yatiya-roman-gold uppercase mb-5">DRESS THE MOMENT</h4>
          <ul className="space-y-3">
            {["WEDDINGS","FESTIVALS","PARTIES","EVENING","CELEBRATIONS","EVERYDAY"].map(i => (
              <li key={i}><Link href="#" className="text-[13px] font-sans text-yatiya-dark-cocoa hover:text-yatiya-antique-gold transition-colors">{i}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-8">
          <Link href="/collections/occasions" className="group/img block">
            <div className="w-full h-[190px] relative overflow-hidden bg-yatiya-cream mb-3">
              <SmartImage src={HEADER_IMAGES.occasions} alt="Occasions" fill className="object-cover group-hover/img:scale-105 transition-transform duration-700"/>
            </div>
            <p className="text-[14px] font-display mb-1 group-hover/img:text-yatiya-antique-gold transition-colors">THE OCCASION EDIT</p>
            <span className="text-[10px] font-sans font-semibold tracking-[0.1em] text-yatiya-roman-gold uppercase border-b border-yatiya-roman-gold pb-0.5">SHOP NOW &rarr;</span>
          </Link>
        </div>
      </div>
    ),
  };

  // ── Render a single nav item (link or dropdown trigger) ──────────────────
  const NavItem = ({ item }: { item: typeof LEFT_NAV[0] }) => (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => item.type === "dropdown" && setActiveMenu(item.name)}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <Link href={item.href || "#"} className={NAV_LINK_CLASS}>
        {item.name}
        {item.type === "dropdown" && <span className="opacity-50"><ChevronDown /></span>}
        {/* underline hover indicator */}
        <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-yatiya-roman-gold group-hover:w-full transition-all duration-300" />
      </Link>

      {/* Mega-menu dropdown */}
      {item.type === "dropdown" && megaContent[item.name] && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 bg-yatiya-ivory border border-yatiya-roman-gold/20 shadow-[0_20px_60px_-15px_rgba(52,39,25,0.18)] transition-all duration-250 ease-out z-[300] ${
            activeMenu === item.name
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          {megaContent[item.name]}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="w-full z-[100]" style={{ position: "relative" }}>

        {/* ── ANNOUNCEMENT BAR ─────────────────────────────────────────── */}
        <div className="w-full h-[34px] bg-yatiya-roman-gold flex items-center justify-center overflow-hidden">
          <p className="text-[10px] font-sans font-semibold tracking-[0.22em] uppercase text-yatiya-dark-cocoa">
            {ANNOUNCEMENTS[announcementIdx]}
          </p>
        </div>

        {/* ── MAIN NAV BAR ─────────────────────────────────────────────── */}
        <div
          className={`w-full bg-yatiya-ivory border-b transition-all duration-300 ${
            isScrolled
              ? "border-yatiya-roman-gold/30 shadow-[0_2px_20px_-8px_rgba(52,39,25,0.14)]"
              : "border-yatiya-roman-gold/15"
          }`}
          style={isScrolled ? { position: "fixed", top: 0, zIndex: 200 } : { position: "relative", zIndex: 100 }}
        >
          {/*
           * ╔══════════════════════════════════════════════════════════╗
           * ║  CSS GRID  —  grid-template-columns: 1fr auto 1fr       ║
           * ║  LEFT col  = left nav  (justify-self: start)            ║
           * ║  CENTER col = logo     (justify-self: center, auto)     ║
           * ║  RIGHT col = right nav + icons  (justify-self: end)     ║
           * ╚══════════════════════════════════════════════════════════╝
           */}
          <div
            className="mx-auto px-6 xl:px-10"
            style={{
              maxWidth: "1440px",
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              height: isScrolled ? "66px" : "76px",
              transition: "height 0.3s",
            }}
          >

            {/* ── COL 1 · LEFT ─────────────────────────────────────────── */}
            <div style={{ justifySelf: "start", display: "flex", alignItems: "center", height: "100%" }}>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden mr-3 text-yatiya-dark-cocoa hover:text-yatiya-antique-gold transition-colors"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </button>

              {/* Desktop left nav */}
              <nav
                className="hidden lg:flex items-center gap-[20px] xl:gap-[26px]"
                style={{ height: "100%" }}
              >
                {LEFT_NAV.map(item => <NavItem key={item.name} item={item} />)}
              </nav>
            </div>

            {/* ── COL 2 · CENTER LOGO (always at 50% width) ────────────── */}
            <div style={{ justifySelf: "center", display: "flex", alignItems: "center" }}>
              <Link
                href="/"
                className="flex items-center transition-opacity duration-300 hover:opacity-75"
                aria-label="YATIYA COUTURE — Home"
              >
                <SmartImage
                  src="/logo.png"
                  alt="YATIYA COUTURE"
                  fill={false}
                  width={200}
                  height={60}
                  priority
                  className="object-contain"
                  style={{
                    height: isScrolled ? "38px" : "48px",
                    width: "auto",
                    transition: "height 0.3s",
                  }}
                />
              </Link>
            </div>

            {/* ── COL 3 · RIGHT ────────────────────────────────────────── */}
            <div
              style={{ justifySelf: "end", display: "flex", alignItems: "center", height: "100%", gap: "0" }}
            >
              {/* Desktop right nav */}
              <nav
                className="hidden lg:flex items-center gap-[20px] xl:gap-[26px] mr-[20px] xl:mr-[26px]"
                style={{ height: "100%" }}
              >
                {RIGHT_NAV.map(item => <NavItem key={item.name} item={item} />)}
              </nav>

              {/* Action icons */}
              <div className="flex items-center gap-[14px] xl:gap-[18px] text-yatiya-dark-cocoa">
                <button className="hover:text-yatiya-antique-gold transition-colors" aria-label="Search">
                  <SearchIcon />
                </button>
                <Link href="/account" className="hover:text-yatiya-antique-gold transition-colors hidden sm:flex" aria-label="Account">
                  <UserIcon />
                </Link>
                <Link href="/wishlist" className="hover:text-yatiya-antique-gold transition-colors relative hidden sm:flex" aria-label="Wishlist">
                  <HeartIcon />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-[14px] h-[14px] bg-yatiya-burgundy text-yatiya-light-text text-[8px] font-bold flex items-center justify-center rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link href="/cart" className="hover:text-yatiya-antique-gold transition-colors relative flex" aria-label="Cart">
                  <BagIcon />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-[14px] h-[14px] bg-yatiya-antique-gold text-yatiya-light-text text-[8px] font-bold flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

          </div>{/* end grid */}
        </div>{/* end nav bar */}
      </header>

      {/* ── MOBILE SLIDE-IN MENU ─────────────────────────────────────────── */}
      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-yatiya-dark-cocoa/40 z-[300] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-[85vw] max-w-[360px] bg-yatiya-ivory z-[400] flex flex-col transition-transform duration-400 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile header row */}
        <div className="flex items-center justify-between px-5 h-[66px] border-b border-yatiya-roman-gold/20 shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <SmartImage src="/logo.png" alt="YATIYA COUTURE" fill={false} width={130} height={40} className="object-contain h-[30px] w-auto" />
          </Link>
          <button onClick={() => setMobileOpen(false)} aria-label="Close" className="text-yatiya-dark-cocoa hover:text-yatiya-antique-gold transition-colors">
            <XIcon />
          </button>
        </div>

        {/* Mobile nav */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="divide-y divide-yatiya-roman-gold/12">
            {[
              { label: "Home",             href: "/" },
              { label: "New Arrivals",     href: "/new-arrivals" },
              { label: "Collections",      href: "/collections" },
              { label: "Shop by Occasion", href: "/collections/occasions" },
              { label: "The Journal",      href: "/journal" },
              { label: "About",            href: "/about" },
            ].map(link => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center px-6 py-4 text-[15px] font-sans font-medium uppercase tracking-[0.08em] text-yatiya-dark-cocoa hover:text-yatiya-antique-gold hover:bg-yatiya-cream transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Women's Edit accordion */}
            <li>
              <button
                className="flex items-center justify-between w-full px-6 py-4 text-[15px] font-sans font-medium uppercase tracking-[0.08em] text-yatiya-dark-cocoa hover:text-yatiya-antique-gold hover:bg-yatiya-cream transition-colors"
                onClick={() => setMobileExpanded(mobileExpanded === "W" ? null : "W")}
              >
                Women&apos;s Edit
                <span className={`transition-transform duration-300 ${mobileExpanded === "W" ? "rotate-180" : ""}`}>
                  <ChevronDown />
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === "W" ? "max-h-[400px]" : "max-h-0"}`}>
                <div className="flex flex-col gap-0 pl-10 pr-6 pb-4 border-l-2 border-yatiya-roman-gold/30 ml-6">
                  {["Lehengas","Sarees","Dresses","Anarkalis","Kurtis","Co-Ord Sets","Tops & Shirts","Drapes"].map(item => (
                    <Link key={item} href="#" className="py-2 text-[13px] font-sans text-yatiya-dark-cocoa/75 hover:text-yatiya-antique-gold transition-colors" onClick={() => setMobileOpen(false)}>
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Mobile bottom actions */}
        <div className="shrink-0 border-t border-yatiya-roman-gold/20 bg-yatiya-cream px-6 py-4 flex items-center justify-around text-yatiya-dark-cocoa">
          <Link href="/account" className="flex flex-col items-center gap-1 hover:text-yatiya-antique-gold transition-colors" onClick={() => setMobileOpen(false)}>
            <UserIcon /><span className="text-[8px] font-sans font-semibold uppercase tracking-wider">Account</span>
          </Link>
          <Link href="/wishlist" className="flex flex-col items-center gap-1 hover:text-yatiya-antique-gold transition-colors" onClick={() => setMobileOpen(false)}>
            <HeartIcon /><span className="text-[8px] font-sans font-semibold uppercase tracking-wider">Wishlist</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center gap-1 hover:text-yatiya-antique-gold transition-colors relative" onClick={() => setMobileOpen(false)}>
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 right-2 w-[14px] h-[14px] bg-yatiya-antique-gold text-yatiya-light-text text-[8px] font-bold flex items-center justify-center rounded-full">{cartCount}</span>
            )}
            <span className="text-[8px] font-sans font-semibold uppercase tracking-wider">Cart</span>
          </Link>
        </div>
      </div>
    </>
  );
}
