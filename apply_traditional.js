const fs = require('fs');
const path = require('path');

function updateFile(filePath, replacer) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');
  content = replacer(content);
  fs.writeFileSync(absolutePath, content, 'utf8');
}

// 1. globals.css
updateFile('src/app/globals.css', (content) => {
  let c = content.replace(/--background: #FAF8F2;/g, '--background: #080808;');
  c = c.replace(/--foreground: #171717;/g, '--foreground: #F2E8D5;');
  
  c = c.replace(/body \{[\s\S]*?\}/, `body {
    background-color: var(--background);
    background-image: 
      radial-gradient(circle at 15% 15%, rgba(198,161,91,0.24), transparent 45%),
      radial-gradient(circle at 85% 75%, rgba(169,130,61,0.18), transparent 50%),
      linear-gradient(135deg, #080808 0%, #17130C 38%, #0B0A08 65%, #1C140B 100%);
    background-attachment: fixed;
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }`);
  
  // Also update theme colors if they exist
  c = c.replace(/--color-yatiya-black: #0B0B0B;/g, '--color-yatiya-black: #080808;');
  c = c.replace(/--color-yatiya-gold: #C6A15B;/g, '--color-yatiya-gold: #C6A15B;');
  return c;
});

// 2. Header.tsx
updateFile('src/components/header/Header.tsx', (content) => {
  // Update Announcement bar
  let c = content.replace(/bg-\[#1C1C1C\] text-\[#C6A15B\]/g, 'bg-[#A9823D] text-[#080808]');
  c = c.replace(/bg-yatiya-black/g, 'bg-[#080808] border-b border-[#A9823D]/30');
  return c;
});

// 3. NewProducts.tsx
updateFile('src/components/home/NewProducts.tsx', (content) => {
  // Background
  let c = content.replace(/style=\{\{ background: .*? \}\}/, 'style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.22), transparent 55%), linear-gradient(135deg, #080808, #11100D, #080808)" }}');
  // Heading
  c = c.replace(/text-white/g, 'text-[#D4B76A]');
  c = c.replace(/text-\[#F5F0E6\]/g, 'text-[#D4B76A]');
  // Cards
  c = c.replace(/bg-\[#171717\]/g, 'bg-[#171411]');
  c = c.replace(/border-transparent/g, 'border-[rgba(198,161,91,0.35)]');
  c = c.replace(/hover:border-yatiya-gold\/30/g, 'hover:border-[#C6A15B]/60');
  // Product title
  c = c.replace(/text-white/g, 'text-[#F2E8D5]');
  return c;
});

// 4. PromoGrid.tsx
updateFile('src/components/home/PromoGrid.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "linear-gradient.*? \}\}/g, 'style={{ background: "linear-gradient(120deg, #080808 0%, #241A0A 45%, #0B0B0B 100%)" }}');
  return c;
});

// 5. DealsAndBestSeller.tsx
updateFile('src/components/home/DealsAndBestSeller.tsx', (content) => {
  // Deals
  let c = content.replace(/style=\{\{ background: "radial-gradient.*?#090909"\)"? \}\}/, 'style={{ background: "radial-gradient(ellipse at center, rgba(198,161,91,0.25), transparent 60%), linear-gradient(120deg, #050505, #211A0D, #090909)" }}');
  // Best Seller
  c = c.replace(/style=\{\{ background: "radial-gradient.*?#101010"\)"? \}\}/, 'style={{ background: "radial-gradient(circle at 50% 20%, rgba(198,161,91,0.18), transparent 55%), #0B0A08" }}');
  // Cards
  c = c.replace(/bg-\[#171717\]/g, 'bg-[#171411]');
  return c;
});

// 6. PromoTestimonials.tsx
updateFile('src/components/home/PromoTestimonials.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "linear-gradient.*? \}\}/, 'style={{ background: "linear-gradient(135deg, #080808, #17130C, #0B0B0B)" }}');
  c = c.replace(/bg-\[#1C1C1C\]/g, 'bg-[#1B1813]'); // charcoal cards
  c = c.replace(/border-transparent/g, 'border-[#A9823D]/20');
  return c;
});

// 7. BlogSection.tsx
updateFile('src/components/home/BlogSection.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "radial-gradient.*? \}\}/, 'style={{ background: "radial-gradient(circle at 50% 0%, rgba(198,161,91,0.16), transparent 50%), linear-gradient(180deg, #080808, #17130C, #0B0B0B)" }}');
  c = c.replace(/bg-\[#1C1C1C\]/g, 'bg-[#1B1813]');
  return c;
});

// 8. Footer.tsx
updateFile('src/components/footer/Footer.tsx', (content) => {
  let c = content.replace(/style=\{\{ background: "linear-gradient.*? \}\}/, 'style={{ background: "linear-gradient(120deg, #050505, #171108, #050505)" }}');
  return c;
});

console.log('Applied final traditional gold tweaks');
