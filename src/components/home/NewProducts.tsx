"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { Heart, Eye, Star, ShoppingCart } from "lucide-react";
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
  "https://images.unsplash.com/photo-1610030469983-98e550d615e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d615e1?auto=format&fit=crop&w=800&q=80", // reused
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"  // reused
];

const featuredProducts: Product[] = [
  { id: "f1", name: "Royal Embroidered Lehenga", category: "Bridal Collection", price: 11999, originalPrice: 14999, image: images[0], isSale: true, rating: 5 },
  { id: "f2", name: "Velvet Bridal Lehenga", category: "Bridal Collection", price: 14999, originalPrice: 18999, image: images[1], isSale: true, rating: 5 },
  { id: "f3", name: "Designer Zari Lehenga", category: "Designer Collection", price: 16999, originalPrice: 21999, image: images[2], isSale: true, rating: 5 },
  { id: "f4", name: "Festive Couture Lehenga", category: "Festive Collection", price: 10999, originalPrice: 13999, image: images[3], isSale: true, rating: 5 },
  { id: "f5", name: "Pastel Pink Bridal Lehenga", category: "Bridal Collection", price: 15999, originalPrice: 19999, image: images[4], isSale: true, rating: 5 },
  { id: "f6", name: "Mirror Work Couture Lehenga", category: "Couture Collection", price: 13999, originalPrice: 17999, image: images[5], isSale: true, rating: 5 },
  { id: "f7", name: "Emerald Green Designer Lehenga", category: "Designer Collection", price: 18999, originalPrice: 22999, image: images[6], isSale: true, rating: 5 },
  { id: "f8", name: "Champagne Gold Lehenga", category: "Festive Collection", price: 14999, originalPrice: 18999, image: images[7], isSale: true, rating: 5 },
  { id: "f9", name: "Rose Gold Bridal Lehenga", category: "Bridal Collection", price: 21999, originalPrice: 26999, image: images[8], isSale: true, rating: 5 },
  { id: "f10", name: "Royal Blue Wedding Lehenga", category: "Wedding Collection", price: 19999, originalPrice: 24999, image: images[9], isSale: true, rating: 5 }
];

const trendingProducts: Product[] = [
  { id: "t1", name: "Mirror Work Couture Lehenga", category: "Couture Collection", price: 13999, originalPrice: 17999, image: images[5], isSale: true, rating: 5 },
  { id: "t2", name: "Festive Couture Lehenga", category: "Festive Collection", price: 10999, originalPrice: 13999, image: images[3], isSale: true, rating: 5 },
  { id: "t3", name: "Royal Embroidered Lehenga", category: "Bridal Collection", price: 11999, originalPrice: 14999, image: images[0], isSale: true, rating: 5 },
  { id: "t4", name: "Pastel Pink Bridal Lehenga", category: "Bridal Collection", price: 15999, originalPrice: 19999, image: images[4], isSale: true, rating: 5 },
  { id: "t5", name: "Designer Zari Lehenga", category: "Designer Collection", price: 16999, originalPrice: 21999, image: images[2], isSale: true, rating: 5 },
  { id: "t6", name: "Champagne Gold Lehenga", category: "Festive Collection", price: 14999, originalPrice: 18999, image: images[7], isSale: true, rating: 5 },
  { id: "t7", name: "Rose Gold Bridal Lehenga", category: "Bridal Collection", price: 21999, originalPrice: 26999, image: images[8], isSale: true, rating: 5 },
  { id: "t8", name: "Velvet Bridal Lehenga", category: "Bridal Collection", price: 14999, originalPrice: 18999, image: images[1], isSale: true, rating: 5 },
  { id: "t9", name: "Royal Blue Wedding Lehenga", category: "Wedding Collection", price: 19999, originalPrice: 24999, image: images[9], isSale: true, rating: 5 },
  { id: "t10", name: "Emerald Green Designer Lehenga", category: "Designer Collection", price: 18999, originalPrice: 22999, image: images[6], isSale: true, rating: 5 }
];

const newArrivalProducts: Product[] = [
  { id: "n1", name: "Pastel Pink Bridal Lehenga", category: "Bridal Collection", price: 15999, originalPrice: 19999, image: images[4], isSale: true, rating: 5 },
  { id: "n2", name: "Champagne Gold Lehenga", category: "Festive Collection", price: 14999, originalPrice: 18999, image: images[7], isSale: true, rating: 5 },
  { id: "n3", name: "Rose Gold Bridal Lehenga", category: "Bridal Collection", price: 21999, originalPrice: 26999, image: images[8], isSale: true, rating: 5 },
  { id: "n4", name: "Designer Zari Lehenga", category: "Designer Collection", price: 16999, originalPrice: 21999, image: images[2], isSale: true, rating: 5 },
  { id: "n5", name: "Mirror Work Couture Lehenga", category: "Couture Collection", price: 13999, originalPrice: 17999, image: images[5], isSale: true, rating: 5 },
  { id: "n6", name: "Festive Couture Lehenga", category: "Festive Collection", price: 10999, originalPrice: 13999, image: images[3], isSale: true, rating: 5 },
  { id: "n7", name: "Royal Blue Wedding Lehenga", category: "Wedding Collection", price: 19999, originalPrice: 24999, image: images[9], isSale: true, rating: 5 },
  { id: "n8", name: "Velvet Bridal Lehenga", category: "Bridal Collection", price: 14999, originalPrice: 18999, image: images[1], isSale: true, rating: 5 },
  { id: "n9", name: "Royal Embroidered Lehenga", category: "Bridal Collection", price: 11999, originalPrice: 14999, image: images[0], isSale: true, rating: 5 },
  { id: "n10", name: "Emerald Green Designer Lehenga", category: "Designer Collection", price: 18999, originalPrice: 22999, image: images[6], isSale: true, rating: 5 }
];

const tabs = ["Featured", "Trending", "New Arrival"] as const;
type TabType = typeof tabs[number];

export function NewProducts() {
  const [activeTab, setActiveTab] = useState<TabType>("Featured");
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

  const getProducts = () => {
    switch (activeTab) {
      case "Featured": return featuredProducts;
      case "Trending": return trendingProducts;
      case "New Arrival": return newArrivalProducts;
    }
  };

  const products = getProducts();

  return (
    <section 
      className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full max-w-[1920px] mx-auto px-6 md:px-[30px] overflow-hidden relative"
      style={{
        background: `
          radial-gradient(circle at 15% 15%, rgba(255,255,255,0.30) 0%, transparent 35%),
          radial-gradient(circle at 85% 80%, rgba(169,130,61,0.18) 0%, transparent 40%),
          linear-gradient(135deg, #F1E2BE 0%, #E4CE9B 35%, #D5B873 70%, #C6A15B 100%)
        `
      }}
    >
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30S46.569 60 30 60 0 46.569 0 30 13.431 0 30 0zm0 5C16.193 5 5 16.193 5 30s11.193 25 25 25 25-11.193 25-25S43.807 5 30 5zm0 10c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15zm0 5c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z' fill='%236F5120' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative z-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-yatiya-roman-gold text-yatiya-light-text px-6 py-3 shadow-xl flex items-center">
          <span className="text-[12px] font-medium tracking-widest uppercase">{toastMsg}</span>
        </div>
      )}

      {/* HEADER & TABS */}
      <Reveal direction="up" delay={0.1}>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-[34px] font-display text-yatiya-dark-cocoa">New Products</h2>
          
          <div className="flex items-center gap-6 md:gap-10 mt-[15px] md:mt-[20px]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-semibold tracking-wide transition-colors relative ${
                  activeTab === tab ? "text-[#8A641F]" : "text-[#4B3C2A] hover:text-[#8A641F]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="newProductsTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B88A3B]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* PRODUCTS GRID */}
      <div className="relative mt-[30px] md:mt-[35px] min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[16px] md:gap-x-[30px] gap-y-[30px] md:gap-y-[40px]"
          >
            {products.map((product, idx) => (
              <motion.div 
                key={`${activeTab}-${product.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (idx % 5) * 0.05 }}
                className="group flex flex-col w-full"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[282/310] overflow-hidden bg-yatiya-ivory border border-yatiya-antique-gold/30 mb-[18px]">
                  {product.isSale && (
                    <div className="absolute top-3 left-3 z-10 bg-yatiya-antique-gold text-yatiya-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                      Sale
                    </div>
                  )}
                  
                  <Link href={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`} className="block w-full h-full">
                    <SmartImage 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.03]"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex flex-col items-center text-center px-1">
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
                    <button onClick={() => handleAddToCart(product)} className="flex-1 bg-transparent hover:bg-yatiya-antique-gold border border-yatiya-antique-gold text-yatiya-deep-brown hover:text-yatiya-light-text py-2 px-3 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0">
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
          </motion.div>
        </AnimatePresence>
      </div>

      </div>
    </section>
  );
}
