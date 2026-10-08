const fs = require('fs');
const path = require('path');

function updateFile(filePath, replacer) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');
  content = replacer(content);
  fs.writeFileSync(absolutePath, content, 'utf8');
}

// 1. NewProducts.tsx
updateFile('src/components/home/NewProducts.tsx', (content) => {
  // Remove black backgrounds
  content = content.replace(/bg-yatiya-black/g, '');
  content = content.replace(/bg-black/g, '');
  content = content.replace(/bg-\[#101010\]/g, '');
  content = content.replace(/bg-\[#171411\]/g, 'bg-[#F7EEDB]');
  content = content.replace(/bg-\[#F3E6C8\]/g, 'bg-[#F7EEDB]'); // my previous replacement
  
  // Section background
  content = content.replace(/<section className="pt-\[70px\] md:pt-\[90px\] pb-\[60px\] w-full max-w-\[1920px\] mx-auto px-6 md:px-\[30px\].*?"( style=\{\{.*?\}\})?>/, `<section className="pt-[70px] md:pt-[90px] pb-[60px] w-full max-w-[1920px] mx-auto px-6 md:px-[30px]" style={{ background: "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.30) 0%, transparent 35%), radial-gradient(circle at 85% 80%, rgba(169,130,61,0.18) 0%, transparent 40%), linear-gradient(135deg, #F1E2BE 0%, #E4CE9B 35%, #D5B873 70%, #C6A15B 100%)" }}>`);

  // Heading
  content = content.replace(/text-\[#3B2A16\]/g, 'text-[#6F5120]');
  content = content.replace(/text-white/g, 'text-[#6F5120]');
  
  // Tabs
  content = content.replace(/text-\[#C8B99D\]/g, 'text-[#5C4828]');
  content = content.replace(/text-yatiya-text-muted/g, 'text-[#5C4828]');
  content = content.replace(/text-yatiya-gold/g, 'text-[#8A641F]');
  content = content.replace(/bg-yatiya-gold/g, 'bg-[#A9823D]');
  
  // Prices & Borders
  content = content.replace(/text-\[#8F6B25\]/g, 'text-[#79591F]');
  content = content.replace(/border-\[#B8944A\]\/40/g, 'border-[#B8944A]');
  content = content.replace(/border-yatiya-border/g, 'border-[#B8944A]');
  
  // Sale Badge
  content = content.replace(/bg-\[#C6A15B\]/g, 'bg-[#B8944A]');

  return content;
});

// 2. HeroSlider.tsx
updateFile('src/components/home/HeroSlider.tsx', (content) => {
  content = content.replace(/bg-yatiya-black/g, '');
  content = content.replace(/<section className="relative w-full h-\[100vh\] min-h-\[600px\] overflow-hidden">/, '<section className="relative w-full h-[100vh] min-h-[600px] overflow-hidden" style={{ background: "linear-gradient(135deg, #EAD9B0, #C6A15B)" }}>');
  return content;
});

// 3. DealsAndBestSeller.tsx
updateFile('src/components/home/DealsAndBestSeller.tsx', (content) => {
  content = content.replace(/bg-yatiya-black/g, '');
  content = content.replace(/<section className="pt-\[70px\] md:pt-\[80px\] pb-\[70px\] md:pb-\[80px\] w-full overflow-hidden".*?>/, '<section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #D8C294, #A9823D)" }}>');
  content = content.replace(/<div className="w-full max-w-\[1920px\] mx-auto px-6 md:px-\[30px\] pt-\[60px\].*?>/, '<div className="w-full max-w-[1920px] mx-auto px-6 md:px-[30px] pt-[60px] md:pt-[70px] mt-[60px] md:mt-[70px] border-t border-[rgba(198,161,91,0.3)]">');
  content = content.replace(/bg-\[#171411\]/g, 'bg-[#F7EEDB]');
  content = content.replace(/bg-\[#F3E6C8\]/g, 'bg-[#F7EEDB]');
  return content;
});

// 4. PromoTestimonials.tsx
updateFile('src/components/home/PromoTestimonials.tsx', (content) => {
  content = content.replace(/bg-yatiya-black/g, '');
  content = content.replace(/<section className="pt-\[70px\] md:pt-\[80px\] pb-\[70px\] md:pb-\[80px\] w-full max-w-\[1920px\] mx-auto px-6 md:px-\[30px\] overflow-hidden".*?>/, '<section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full max-w-[1920px] mx-auto px-6 md:px-[30px] overflow-hidden" style={{ background: "linear-gradient(135deg, #F3E6C8, #EAD9B0)" }}>');
  content = content.replace(/bg-\[#1B1813\]/g, 'bg-[#EAD9B0]');
  content = content.replace(/bg-\[#EAD9B0\]/g, 'bg-[#F7EEDB]');
  return content;
});

// 5. BlogSection.tsx
updateFile('src/components/home/BlogSection.tsx', (content) => {
  content = content.replace(/bg-yatiya-black/g, '');
  content = content.replace(/<section className="py-\[70px\] md:py-\[90px\] w-full".*?>/, '<section className="py-[70px] md:py-[90px] w-full" style={{ background: "linear-gradient(135deg, #EAD9B0, #D8C294)" }}>');
  content = content.replace(/bg-\[#1B1813\]/g, 'bg-[#F7EEDB]');
  content = content.replace(/bg-\[#EAD9B0\]/g, 'bg-[#F7EEDB]');
  return content;
});

// 6. PromoGrid.tsx
updateFile('src/components/home/PromoGrid.tsx', (content) => {
  content = content.replace(/bg-yatiya-black/g, '');
  content = content.replace(/bg-black/g, '');
  return content;
});

// 7. Footer.tsx
updateFile('src/components/footer/Footer.tsx', (content) => {
  content = content.replace(/bg-yatiya-black/g, '');
  content = content.replace(/<footer className="pt-16 md:pt-24 pb-8 border-t border-\[rgba\(198,161,91,0\.25\)\].*?>/, '<footer className="pt-16 md:pt-24 pb-8 border-t border-[rgba(198,161,91,0.25)] text-[#3B2A16]" style={{ background: "linear-gradient(135deg, #A9823D, #C6A15B, #D8C294)" }}>');
  return content;
});

// 8. Global CSS Background
updateFile('src/app/globals.css', (content) => {
  content = content.replace(/--background: #080808;/g, '--background: #E6D2A3;');
  content = content.replace(/--background: #FAF8F2;/g, '--background: #E6D2A3;');
  return content;
});

console.log('Applied golden background theme across all sections.');
