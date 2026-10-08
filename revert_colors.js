const fs = require('fs');
const path = require('path');

const filePaths = [
  'src/app/page.tsx',
  'src/components/home/NewProducts.tsx',
  'src/components/home/DealsAndBestSeller.tsx',
  'src/components/home/PromoTestimonials.tsx',
  'src/components/home/BlogSection.tsx',
  'src/components/header/Header.tsx',
  'src/components/footer/Footer.tsx',
  'src/components/home/HeroSlider.tsx',
  'src/components/home/PromoGrid.tsx'
];

function processFile(filePath) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');
  let original = content;

  if (filePath === 'src/app/page.tsx') {
    // Revert the intro back to ivory, but text gold -> black
    content = content.replace(/bg-yatiya-black flex items-center justify-center/g, 'bg-yatiya-ivory flex items-center justify-center');
    content = content.replace(/text-yatiya-gold">(\s*)YATYIA/g, 'text-yatiya-black">$1YATYIA');
    
    // Main wrapper should be ivory now
    content = content.replace(/<div className="bg-yatiya-black text-yatiya-ivory overflow-hidden">/g, '<div className="bg-yatiya-ivory text-yatiya-text overflow-hidden">');
    
    // Saree edit section should be ivory
    content = content.replace(/bg-yatiya-black overflow-hidden/g, 'bg-yatiya-ivory overflow-hidden');
    // Drape Edit text
    content = content.replace(/text-yatiya-ivory mb-8/g, 'text-yatiya-black mb-8');
    content = content.replace(/text-yatiya-ivory\/80/g, 'text-yatiya-black/80');
    content = content.replace(/border-yatiya-gold text-yatiya-gold hover:bg-yatiya-gold hover:text-yatiya-black/g, 'border-yatiya-black text-yatiya-black hover:bg-yatiya-black hover:text-yatiya-ivory');
    
    // Couture Banner (Bridal Edit) is one of the dark sections.
    // Ensure it keeps the dark feel.

    // Shop by Occasion
    content = content.replace(/text-yatiya-gold mb-4/g, 'text-yatiya-black mb-4');
    
    // Craft & story
    content = content.replace(/bg-yatiya-black border-t/g, 'bg-yatiya-ivory border-t');
    content = content.replace(/border-yatiya-gold\/20/g, 'border-yatiya-border');

    // Remove random bg-[#151515]
    content = content.replace(/bg-\[#151515\]/g, 'bg-yatiya-surface');

    // The Modern Muse text
    content = content.replace(/text-[12px] font-sans font-bold tracking-\[0.3em\] uppercase text-yatiya-ivory/g, 'text-[12px] font-sans font-bold tracking-[0.3em] uppercase text-yatiya-ivory'); // keep ivory text over dark image

    // Product Card Reveal (Bestsellers) - these are from old products array
    content = content.replace(/text-\[#641F32\]/g, 'text-yatiya-black'); 
    content = content.replace(/bg-\[#F7F0E8\]/g, 'bg-white');

    // Testimonials generic text
    content = content.replace(/text-yatiya-gold mb-8/g, 'text-yatiya-gold mb-8'); // stars
    content = content.replace(/text-yatiya-ivory leading-snug/g, 'text-[#604F6F] leading-snug'); // Wait, replace `#604F6F` and others
    content = content.replace(/text-yatiya-ivory/g, 'text-yatiya-text'); 
    content = content.replace(/text-yatiya-text mb-8/g, 'text-yatiya-gold mb-8');
    content = content.replace(/bg-yatiya-gold\/20/g, 'bg-yatiya-black/20');

    // Put some things back to ivory where needed
    content = content.replace(/bg-yatiya-ivory text-yatiya-text/g, 'bg-yatiya-ivory text-yatiya-text');
  }

  if (filePath === 'src/components/home/NewProducts.tsx') {
    content = content.replace(/bg-yatiya-black overflow-hidden/g, 'bg-yatiya-ivory overflow-hidden');
    content = content.replace(/text-yatiya-ivory">New Products/g, 'text-yatiya-black">New Products');
    content = content.replace(/bg-\[#151515\]/g, 'bg-white');
    content = content.replace(/bg-\[#1C1C1C\]/g, 'bg-white');
    // Sale badge: Gold background, Black text
    content = content.replace(/bg-yatiya-gold text-white/g, 'bg-yatiya-gold text-yatiya-black');
    content = content.replace(/text-yatiya-ivory font-semibold/g, 'text-[#B18A3A] font-semibold');
    content = content.replace(/text-yatiya-muted line-through/g, 'text-[#999999] line-through');
    content = content.replace(/text-yatiya-muted text-\[11px\]/g, 'text-[#8A806F] text-[11px]');
    content = content.replace(/text-yatiya-muted hover:text-yatiya-gold transition-colors text-sm md:text-\[15px\]/g, 'text-yatiya-text hover:text-yatiya-gold transition-colors text-sm md:text-[15px]');

    // Add to cart: background: #0B0B0B, text: #D4B878, border: #C6A15B
    // Hover: background: #C6A15B, text: #0B0B0B
    content = content.replace(/bg-yatiya-black hover:bg-yatiya-gold border border-yatiya-gold\/20 hover:border-yatiya-gold text-yatiya-ivory hover:text-yatiya-black/g, 'bg-yatiya-black hover:bg-yatiya-gold border border-yatiya-gold text-yatiya-gold-light hover:text-yatiya-black');

    // Wishlist / Quick view: background: #FFFFFF, border: #D4B878, icon: #C6A15B. Hover: gold background + black icon.
    content = content.replace(/bg-yatiya-black hover:bg-yatiya-gold border border-yatiya-gold\/20 hover:border-yatiya-gold text-yatiya-muted hover:text-yatiya-black/g, 'bg-white hover:bg-yatiya-gold border border-yatiya-gold-light hover:border-yatiya-gold text-yatiya-gold hover:text-yatiya-black');
  }

  if (filePath === 'src/components/home/DealsAndBestSeller.tsx') {
    // DEALS OF THE DAY -> KEEP DARK
    // BEST SELLER -> LIGHT (ivory)
    
    // Make sure Best Sellers section is light
    // In DealsAndBestSeller.tsx:
    // Deal of the Day stays dark
    content = content.replace(/<section className="py-\[60px\] md:py-\[80px\] px-4 md:px-\[30px\] bg-\[#151515\]">/g, '<section className="py-[60px] md:py-[80px] px-4 md:px-[30px] bg-yatiya-ivory">');
    content = content.replace(/text-yatiya-ivory mb-\[30px\]/g, 'text-yatiya-black mb-[30px]');
    content = content.replace(/bg-\[#151515\] border/g, 'bg-white border');
    content = content.replace(/border-yatiya-gold\/20/g, 'border-yatiya-border');
    content = content.replace(/text-yatiya-muted mb-1/g, 'text-[#8A806F] mb-1');
    content = content.replace(/text-yatiya-ivory font-medium/g, 'text-yatiya-text font-medium');
    content = content.replace(/text-yatiya-ivory font-semibold/g, 'text-[#B18A3A] font-semibold');
    content = content.replace(/text-yatiya-muted line-through/g, 'text-[#999999] line-through');
  }

  if (filePath === 'src/components/home/PromoTestimonials.tsx') {
    // OUR CLIENTS SAY -> LIGHT (warm ivory #F5F0E6 or FAF8F2)
    content = content.replace(/bg-\[#0B0B0B\]/g, 'bg-yatiya-surface');
    content = content.replace(/text-yatiya-ivory/g, 'text-yatiya-black');
    content = content.replace(/text-yatiya-black\/80/g, 'text-[#66625A]');
    content = content.replace(/text-yatiya-muted/g, 'text-[#B18A3A]');
    content = content.replace(/bg-\[#151515\]/g, 'bg-white');
  }

  if (filePath === 'src/components/home/BlogSection.tsx') {
    // FROM THE BLOG -> LIGHT
    content = content.replace(/bg-\[#151515\]/g, 'bg-white');
    content = content.replace(/bg-yatiya-black/g, 'bg-yatiya-ivory');
    content = content.replace(/text-yatiya-ivory/g, 'text-yatiya-black');
    content = content.replace(/text-yatiya-muted/g, 'text-[#B18A3A]');
    content = content.replace(/border-yatiya-gold\/20/g, 'border-yatiya-border');
    content = content.replace(/hover:text-yatiya-gold/g, 'hover:text-yatiya-gold');
  }

  if (content !== original) {
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`Reverted ${filePath}`);
  }
}

filePaths.forEach(processFile);
