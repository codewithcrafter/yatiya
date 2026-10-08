const fs = require('fs');
const path = require('path');

let headerPath = path.join(__dirname, 'src', 'components', 'header', 'Header.tsx');
let headerContent = fs.readFileSync(headerPath, 'utf8');

// Fix Header
headerContent = headerContent.replace(/text-\[#604F6F\]/g, 'text-yatiya-gold');
headerContent = headerContent.replace(/border-\[#E9E3DD\]/g, 'border-yatiya-gold/20');
headerContent = headerContent.replace(/bg-yatiya-ivory mb-4/g, 'bg-yatiya-surface mb-4'); // Collections mega menu img bg
headerContent = headerContent.replace(/text-\[#B17165\]/g, 'text-yatiya-gold');
headerContent = headerContent.replace(/text-\[#641F32\]/g, 'text-yatiya-gold');
headerContent = headerContent.replace(/border-\[#641F32\]/g, 'border-yatiya-gold');
headerContent = headerContent.replace(/bg-\[#F7F0E8\]/g, 'bg-yatiya-black');
headerContent = headerContent.replace(/text-yatiya-black text-\[18px\]/g, 'text-yatiya-ivory text-[18px]');
headerContent = headerContent.replace(/text-\[18px\] font-sans uppercase text-yatiya-black/g, 'text-[18px] font-sans uppercase text-yatiya-ivory');
headerContent = headerContent.replace(/w-full bg-yatiya-ivory p-8/g, 'w-full bg-[#151515] border-t border-yatiya-gold/20 p-8');
headerContent = headerContent.replace(/gap-8 text-yatiya-black/g, 'gap-8 text-yatiya-ivory');

fs.writeFileSync(headerPath, headerContent, 'utf8');

let footerPath = path.join(__dirname, 'src', 'components', 'footer', 'Footer.tsx');
let footerContent = fs.readFileSync(footerPath, 'utf8');

// Fix Footer
footerContent = footerContent.replace(/bg-\[#321A28\]/g, 'bg-[#070707]');

fs.writeFileSync(footerPath, footerContent, 'utf8');

console.log("Header and Footer fixed!");
