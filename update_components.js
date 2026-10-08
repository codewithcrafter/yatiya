const fs = require('fs');
const path = require('path');

function processFile(filePath, updates) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');

  updates.forEach(([search, replace]) => {
    content = content.split(search).join(replace);
  });

  fs.writeFileSync(absolutePath, content, 'utf8');
}

// 1. page.tsx
processFile('src/app/page.tsx', [
  ['bg-yatiya-ivory', 'bg-[#080808]'],
  ['text-yatiya-black', 'text-yatiya-text'],
  ['text-yatiya-text/80', 'text-[#CFC6B5]'],
  ['text-yatiya-text/90', 'text-[#F5F0E6]'],
  ['bg-yatiya-surface', 'bg-[#101010]'],
  ['bg-white', 'bg-[#101010]'],
  ['border-yatiya-black', 'border-yatiya-gold'],
  ['border-[#E9E3DD]', 'border-[rgba(198,161,91,0.25)]'],
  ['bg-yatiya-black/20', 'bg-yatiya-gold/30'],
  ['hover:bg-yatiya-black hover:text-yatiya-text', 'hover:bg-[#D6BC7A] hover:text-[#080808]'],
  ['text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-yatiya-text', 'text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#D6BC7A]'],
  ['text-yatiya-text', 'text-[#F5F0E6]'],
  ['hover:bg-yatiya-black/30', 'hover:bg-yatiya-black/50'],
]);

// 2. Header.tsx
processFile('src/components/header/Header.tsx', [
  ['bg-yatiya-ivory/95', 'bg-[#080808]/95'],
  ['border-yatiya-border', 'border-[rgba(198,161,91,0.35)]'],
  ['text-yatiya-text', 'text-[#F5F0E6]'],
  ['hover:text-yatiya-gold', 'hover:text-[#D6BC7A]'],
  ['bg-yatiya-gold', 'bg-[#C6A15B]'],
  ['bg-yatiya-black', 'bg-[#101010]'],
]);

// 3. NewProducts.tsx
processFile('src/components/home/NewProducts.tsx', [
  ['bg-yatiya-ivory', 'bg-[#101010]'],
  ['text-yatiya-black', 'text-[#D6BC7A]'],
  ['text-[#B18A3A]', 'text-[#D6BC7A]'],
  ['bg-yatiya-surface', 'bg-[#171717]'],
  ['bg-white', 'bg-[#171717]'],
  ['border-transparent', 'border-[rgba(198,161,91,0.30)]'],
  ['border-white/50', 'border-[rgba(198,161,91,0.30)]'],
  ['text-yatiya-text', 'text-[#F5F0E6]'],
  ['text-[#8A806F]', 'text-[#CFC6B5]'],
  ['bg-yatiya-black text-yatiya-ivory', 'bg-[#C6A15B] text-[#080808] border border-[#C6A15B] hover:bg-[#D6BC7A] hover:text-[#080808] font-semibold'],
  ['bg-yatiya-ivory text-yatiya-text border border-yatiya-border hover:bg-yatiya-surface', 'bg-transparent border-[rgba(198,161,91,0.55)] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#080808]'],
  ['hover:border-yatiya-gold hover:text-yatiya-gold', 'hover:bg-[#C6A15B] hover:text-[#080808]'],
  ['bg-yatiya-gold text-yatiya-text text-[10px]', 'bg-[#C6A15B] text-[#080808] text-[10px]'],
  ['text-yatiya-muted', 'text-[#CFC6B5]'],
  ['border-b-2 border-yatiya-gold', 'border-b-2 border-[#C6A15B]'],
  ['text-yatiya-gold', 'text-[#C6A15B]'],
]);

// 4. PromoGrid.tsx
processFile('src/components/home/PromoGrid.tsx', [
  ['bg-yatiya-ivory', 'bg-[#101010]'],
  ['bg-[#FAF8F2]', 'bg-[#101010]'],
  ['bg-yatiya-surface', 'bg-[#171717]'],
  ['bg-[#F5F0E6]', 'bg-[#171717]'],
  ['bg-white', 'bg-[#171717]'],
  ['text-yatiya-black', 'text-[#D6BC7A]'],
  ['text-yatiya-text', 'text-[#D6BC7A]'],
  ['text-[#8A806F]', 'text-[#CFC6B5]'],
  ['text-[#333333]', 'text-[#CFC6B5]'],
  ['text-gray-600', 'text-[#CFC6B5]'],
  ['text-yatiya-muted', 'text-[#CFC6B5]'],
  ['text-gray-500', 'text-[#CFC6B5]'],
  ['border-yatiya-black', 'border-[#C6A15B]'],
]);

// 5. DealsAndBestSeller.tsx
processFile('src/components/home/DealsAndBestSeller.tsx', [
  ['bg-yatiya-ivory', 'bg-[#101010]'],
  ['bg-[#151515]', 'bg-[#080808]'],
  ['text-yatiya-black text-[10px]', 'text-[#080808] text-[10px]'],
  ['text-yatiya-black hover:text-yatiya-gold', 'text-[#F5F0E6] hover:text-[#D6BC7A]'],
  ['text-yatiya-black font-semibold', 'text-[#D6BC7A] font-semibold'],
  ['text-[#B18A3A]', 'text-[#D6BC7A]'],
  ['text-[#8A806F]', 'text-[#A9956A]'],
  ['text-yatiya-black', 'text-[#D6BC7A]'],
  ['bg-white', 'bg-[#171717]'],
  ['border-yatiya-border', 'border-[rgba(198,161,91,0.30)]'],
  ['hover:border-yatiya-gold', 'hover:border-[#C6A15B]'],
  ['border border-white/20', 'border border-[rgba(198,161,91,0.55)]'],
  ['text-gray-400', 'text-[#CFC6B5]'],
  ['text-gray-300', 'text-[#CFC6B5]'],
  ['text-white/50', 'text-[#D6BC7A]'],
  ['bg-[#151515]/10', 'bg-[#171717]'],
  // arrows
  ['bg-yatiya-black border border-yatiya-gold shadow-lg rounded-full flex items-center justify-center text-yatiya-gold', 'bg-[#080808] border border-[#C6A15B] shadow-lg rounded-full flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#080808]'],
  // Add to cart
  ['bg-yatiya-black hover:bg-yatiya-gold border border-yatiya-gold text-yatiya-gold-light hover:text-yatiya-black', 'bg-[#C6A15B] text-[#080808] hover:bg-[#D6BC7A] hover:text-[#080808] border-[#C6A15B] font-semibold'],
  // Wishlist/View
  ['bg-white hover:bg-yatiya-gold border border-yatiya-gold-light hover:border-yatiya-gold text-yatiya-gold hover:text-yatiya-black', 'bg-transparent border-[rgba(198,161,91,0.55)] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#080808]']
]);

// 6. PromoTestimonials.tsx
processFile('src/components/home/PromoTestimonials.tsx', [
  ['bg-yatiya-ivory overflow-hidden', 'bg-[#0B0B0B] overflow-hidden'],
  ['text-yatiya-black', 'text-[#D6BC7A]'],
  ['bg-white border border-gray-100', 'bg-[#171717] border border-[rgba(198,161,91,0.30)]'],
  ['text-yatiya-black font-semibold', 'text-[#F5F0E6] font-semibold'],
  ['text-[#B18A3A] text-xs font-medium uppercase', 'text-[#A9956A] text-xs font-medium uppercase'],
  ['text-[#B18A3A] text-sm', 'text-[#CFC6B5] text-sm'],
  ['bg-yatiya-ivory border border-yatiya-border', 'bg-transparent border border-[#C6A15B]'],
  ['text-yatiya-gold', 'text-[#C6A15B]'],
  ['bg-gray-300', 'bg-[#555555]'],
  ['text-gray-300', 'text-[#F5F0E6]'],
]);

// 7. BlogSection.tsx
processFile('src/components/home/BlogSection.tsx', [
  ['bg-yatiya-ivory', 'bg-[#101010]'],
  ['bg-[#FAF8F2]', 'bg-[#101010]'],
  ['bg-white', 'bg-[#171717]'],
  ['bg-[#F5F0E6]', 'bg-[#171717]'],
  ['bg-yatiya-surface', 'bg-[#171717]'],
  ['text-yatiya-black', 'text-[#D6BC7A]'],
  ['text-yatiya-text', 'text-[#D6BC7A]'],
  ['text-[#B18A3A]', 'text-[#F5F0E6]'],
  ['text-[#8A806F]', 'text-[#A9956A]'],
  ['border-[#E8E2D9]', 'border-[rgba(198,161,91,0.25)]'],
]);

// 8. Footer.tsx
processFile('src/components/footer/Footer.tsx', [
  ['bg-yatiya-black', 'bg-[#050505]'],
  ['text-white', 'text-[#D6BC7A]'],
  ['text-gray-400', 'text-[#CFC6B5]'],
  ['hover:text-white', 'hover:text-[#C6A15B]'],
  ['border-white/10', 'border-[rgba(198,161,91,0.25)]'],
  ['bg-white text-black hover:bg-gray-200', 'bg-[#C6A15B] text-[#080808] hover:bg-[#D6BC7A] font-semibold'],
]);

console.log('Done modifying components');
