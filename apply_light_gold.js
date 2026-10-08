const fs = require('fs');
const path = require('path');

function updateFile(filePath, replacer) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');
  content = replacer(content);
  fs.writeFileSync(absolutePath, content, 'utf8');
}

// 1. Global CSS
updateFile('src/app/globals.css', (content) => {
  let c = content.replace(/--background: #080808;/g, '--background: #E6D2A3;');
  c = c.replace(/--foreground: #F2E8D5;/g, '--foreground: #5A4930;');
  
  c = c.replace(/body\s*\{[\s\S]*?\}/, `body {
    background-color: var(--background);
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.28), transparent 35%),
      radial-gradient(circle at 80% 70%, rgba(198,161,91,0.30), transparent 40%),
      linear-gradient(135deg, #F3E6C8 0%, #E6D2A3 35%, #D8C294 65%, #C6A15B 100%);
    background-attachment: fixed;
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }`);
  return c;
});

// 2. Header.tsx
updateFile('src/components/header/Header.tsx', (content) => {
  let c = content.replace(/bg-\[#080808\]/g, 'bg-[#EAD9B0]');
  c = c.replace(/bg-\[#A9823D\] text-\[#080808\]/g, 'bg-[#C6A15B] text-[#F3E6C8]');
  c = c.replace(/border-b border-\[#A9823D\]\/30/g, 'border-b border-[#B8944A]/40');
  
  // Replace dark/white text with golden text colors
  c = c.replace(/text-white/g, 'text-[#3B2A16]');
  c = c.replace(/text-\[#F2E8D5\]/g, 'text-[#3B2A16]');
  c = c.replace(/text-\[#C6A15B\]/g, 'text-[#8F6B25]');
  return c;
});

// 3. NewProducts.tsx
updateFile('src/components/home/NewProducts.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "radial-gradient.*? \}\}/, 'style={{ background: "linear-gradient(135deg, #F3E6C8, #EAD9B0, #D8C294)" }}');
  c = c.replace(/bg-\[#171411\]/g, 'bg-[#F3E6C8]');
  c = c.replace(/border-\[rgba\(198,161,91,0.35\)\]/g, 'border-[#B8944A]/40');
  
  c = c.replace(/text-\[#D4B76A\]/g, 'text-[#3B2A16]');
  c = c.replace(/text-\[#F2E8D5\]/g, 'text-[#5A4930]');
  c = c.replace(/text-\[#C6A15B\]/g, 'text-[#8F6B25]');
  
  return c;
});

// 4. PromoGrid.tsx
updateFile('src/components/home/PromoGrid.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "linear-gradient.*? \}\}/g, 'style={{ background: "linear-gradient(120deg, #EAD9B0 0%, #D8C294 45%, #E6D2A3 100%)" }}');
  c = c.replace(/text-white/g, 'text-[#3B2A16]');
  c = c.replace(/text-white\/80/g, 'text-[#5A4930]');
  return c;
});

// 5. DealsAndBestSeller.tsx
updateFile('src/components/home/DealsAndBestSeller.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "radial-gradient\(ellipse at center, rgba\(198,161,91,0\.25\), transparent 60%\), linear-gradient\(120deg, #050505, #211A0D, #090909\)" \}\}/, 'style={{ background: "linear-gradient(135deg, #C6A15B, #EAD9B0, #D8C294)" }}');
  c = c.replace(/style=\{\{ background: "radial-gradient\(circle at 50% 20%, rgba\(198,161,91,0\.18\), transparent 55%\), #0B0A08" \}\}/, 'style={{ background: "linear-gradient(180deg, #EAD9B0, #F3E6C8)" }}');
  
  c = c.replace(/bg-\[#171411\]/g, 'bg-[#F3E6C8]');
  c = c.replace(/text-white/g, 'text-[#3B2A16]');
  c = c.replace(/text-\[#D4B76A\]/g, 'text-[#3B2A16]');
  return c;
});

// 6. PromoTestimonials.tsx
updateFile('src/components/home/PromoTestimonials.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "linear-gradient.*? \}\}/, 'style={{ background: "linear-gradient(135deg, #F3E6C8, #EAD9B0, #E6D2A3)" }}');
  c = c.replace(/bg-\[#1B1813\]/g, 'bg-[#EAD9B0]');
  c = c.replace(/border-\[#A9823D\]\/20/g, 'border-[#B8944A]/30');
  
  c = c.replace(/text-white/g, 'text-[#3B2A16]');
  c = c.replace(/text-white\/80/g, 'text-[#5A4930]');
  return c;
});

// 7. BlogSection.tsx
updateFile('src/components/home/BlogSection.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "radial-gradient.*? \}\}/, 'style={{ background: "linear-gradient(180deg, #D8C294, #B8944A)" }}');
  c = c.replace(/bg-\[#1B1813\]/g, 'bg-[#EAD9B0]');
  c = c.replace(/text-white/g, 'text-[#3B2A16]');
  c = c.replace(/text-white\/70/g, 'text-[#7A6748]');
  return c;
});

// 8. Footer.tsx
updateFile('src/components/footer/Footer.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "linear-gradient.*? \}\}/, 'style={{ background: "linear-gradient(135deg, #A9823D, #C6A15B, #D8C294)" }}');
  c = c.replace(/bg-\[#050505\]/g, 'bg-transparent');
  c = c.replace(/text-\[#D6BC7A\]/g, 'text-[#3B2A16]');
  return c;
});

console.log('Applied light gold theme updates');
