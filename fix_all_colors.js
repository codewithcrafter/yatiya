const fs = require('fs');
const path = require('path');

const filePaths = [
  'src/app/page.tsx',
  'src/components/home/NewProducts.tsx',
  'src/components/home/DealsAndBestSeller.tsx',
  'src/components/home/PromoTestimonials.tsx',
  'src/components/home/BlogSection.tsx',
];

function processFile(filePath) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');
  let original = content;

  if (filePath === 'src/app/page.tsx') {
    content = content.replace(/bg-yatiya-ivory flex items-center justify-center/g, 'bg-yatiya-black flex items-center justify-center');
    content = content.replace(/text-yatiya-black">(\s*)YATYIA/g, 'text-yatiya-gold">$1YATYIA');
    // Global wrapper
    content = content.replace(/<div className="bg-yatiya-ivory text-yatiya-black overflow-hidden">/g, '<div className="bg-yatiya-black text-yatiya-ivory overflow-hidden">');
    // Saree edit
    content = content.replace(/bg-yatiya-ivory overflow-hidden/g, 'bg-yatiya-black overflow-hidden');
    content = content.replace(/text-yatiya-black mb-8/g, 'text-yatiya-ivory mb-8');
    content = content.replace(/text-yatiya-black\/80/g, 'text-yatiya-ivory/80');
    content = content.replace(/border-yatiya-black text-yatiya-black/g, 'border-yatiya-gold text-yatiya-gold hover:bg-yatiya-gold hover:text-yatiya-black');
    content = content.replace(/bg-\[#F7F0E8\]/g, 'bg-[#151515]');
    content = content.replace(/text-yatiya-black\/60/g, 'text-yatiya-muted');
    content = content.replace(/text-yatiya-black"/g, 'text-yatiya-ivory"');
    content = content.replace(/bg-yatiya-ivory border-t/g, 'bg-yatiya-black border-t border-yatiya-gold/20');
    content = content.replace(/text-\[#641F32\]/g, 'text-yatiya-gold');
    content = content.replace(/border-\[#641F32\]/g, 'border-yatiya-gold');
    content = content.replace(/hover:text-\[#641F32\]/g, 'hover:text-yatiya-gold');
    content = content.replace(/bg-\[#641F32\]/g, 'bg-yatiya-black-soft');
    content = content.replace(/bg-\[#F7F0E8\]/g, 'bg-yatiya-surface');
    content = content.replace(/text-\[#604F6F\]/g, 'text-yatiya-gold');
    content = content.replace(/bg-yatiya-black\/20/g, 'bg-yatiya-gold/20');
    content = content.replace(/border-b border-\[#E9E3DD\]/g, 'border-b border-yatiya-gold/20');
    content = content.replace(/text-yatiya-black hover:text-\[#641F32\]/g, 'text-yatiya-ivory hover:text-yatiya-gold');
    // text-yatiya-black that should be ivory
    content = content.replace(/text-yatiya-black/g, 'text-yatiya-ivory');
    // but the wrapper is already fixed
  }

  if (filePath === 'src/components/home/NewProducts.tsx') {
    content = content.replace(/bg-white/g, 'bg-yatiya-black');
    content = content.replace(/text-yatiya-black/g, 'text-yatiya-ivory');
    content = content.replace(/bg-\[#F7F0E8\]/g, 'bg-[#151515]');
    content = content.replace(/bg-white hover:bg-yatiya-ivory/g, 'bg-[#151515] hover:bg-[#1C1C1C]');
    content = content.replace(/border-gray-200/g, 'border-yatiya-gold/20 hover:border-yatiya-gold');
    // Buttons
    content = content.replace(/text-yatiya-ivory hover:text-yatiya-gold/g, 'text-yatiya-ivory hover:text-yatiya-gold'); 
    // Fix the active/inactive tabs
    content = content.replace(/text-yatiya-ivory hover:text-yatiya-gold/g, 'text-yatiya-muted hover:text-yatiya-gold');
  }

  if (filePath === 'src/components/home/DealsAndBestSeller.tsx') {
    content = content.replace(/bg-white/g, 'bg-[#151515]');
    content = content.replace(/text-\[#242124\]/g, 'text-yatiya-ivory');
    content = content.replace(/text-\[#666\]/g, 'text-yatiya-muted');
    content = content.replace(/text-\[#999\]/g, 'text-yatiya-muted');
    content = content.replace(/border-gray-200/g, 'border-yatiya-gold/20');
    content = content.replace(/bg-\[#F7F0E8\]/g, 'bg-[#151515]');
  }

  if (filePath === 'src/components/home/PromoTestimonials.tsx') {
    content = content.replace(/bg-white/g, 'bg-[#151515]');
    content = content.replace(/text-\[#242124\]/g, 'text-yatiya-ivory');
    content = content.replace(/text-\[#666\]/g, 'text-yatiya-ivory/80');
    content = content.replace(/text-\[#999\]/g, 'text-yatiya-muted');
    content = content.replace(/border-\[#F2E8D9\]/g, 'border-yatiya-gold');
    content = content.replace(/bg-\[#FCFAF7\]/g, 'bg-[#0B0B0B]');
  }

  if (filePath === 'src/components/home/BlogSection.tsx') {
    content = content.replace(/bg-white/g, 'bg-[#151515]');
    content = content.replace(/text-\[#242124\]/g, 'text-yatiya-ivory');
    content = content.replace(/text-\[#666\]/g, 'text-yatiya-muted');
    content = content.replace(/border-gray-200/g, 'border-yatiya-gold/20');
    content = content.replace(/bg-\[#F7F0E8\]/g, 'bg-[#151515]');
  }

  if (content !== original) {
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  }
}

filePaths.forEach(processFile);
