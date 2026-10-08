const fs = require('fs');
const path = require('path');

const filePaths = [
  'src/components/home/DealsAndBestSeller.tsx',
];

function processFile(filePath) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');

  // Fix product cards in DealsAndBestSeller.tsx
  content = content.replace(/bg-\[#151515\] mb-\[18px\]/g, 'bg-white mb-[18px]');
  
  // Fix Sale badge
  content = content.replace(/bg-yatiya-gold text-white text-\[10px\]/g, 'bg-yatiya-gold text-yatiya-black text-[10px]');
  
  // Fix category text
  content = content.replace(/text-yatiya-muted text-\[11px\]/g, 'text-[#8A806F] text-[11px]');
  
  // Fix product name text
  content = content.replace(/text-yatiya-black hover:text-yatiya-gold transition-colors text-sm md:text-\[15px\]/g, 'text-yatiya-text hover:text-yatiya-gold transition-colors text-sm md:text-[15px]');

  // Fix current price
  content = content.replace(/text-yatiya-black font-semibold text-sm/g, 'text-[#B18A3A] font-semibold text-sm');

  // Fix buttons
  const oldButtons = `<div className="flex items-center justify-center gap-2 mt-[14px] w-full max-w-[240px]">
                    <button className="flex-1 bg-[#151515] hover:bg-yatiya-ivory border border-yatiya-border text-yatiya-black py-2 px-3 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      + Add to cart
                    </button>
                    <button className="bg-[#151515] hover:bg-yatiya-ivory border border-yatiya-border text-yatiya-muted hover:text-yatiya-gold w-[34px] h-[34px] flex items-center justify-center transition-colors shrink-0">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-[#151515] hover:bg-yatiya-ivory border border-yatiya-border text-yatiya-muted hover:text-yatiya-gold w-[34px] h-[34px] flex items-center justify-center transition-colors shrink-0">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>`;
  const newButtons = `<div className="flex items-center justify-center gap-2 mt-[14px] w-full max-w-[240px]">
                    <button className="flex-1 bg-yatiya-black hover:bg-yatiya-gold border border-yatiya-gold text-yatiya-gold-light hover:text-yatiya-black py-2 px-3 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      + Add to cart
                    </button>
                    <button className="bg-white hover:bg-yatiya-gold border border-yatiya-gold-light hover:border-yatiya-gold text-yatiya-gold hover:text-yatiya-black w-[34px] h-[34px] flex items-center justify-center transition-colors shrink-0">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-white hover:bg-yatiya-gold border border-yatiya-gold-light hover:border-yatiya-gold text-yatiya-gold hover:text-yatiya-black w-[34px] h-[34px] flex items-center justify-center transition-colors shrink-0">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>`;
  content = content.replace(oldButtons, newButtons);

  // Fix arrows
  content = content.replace(/bg-white border border-yatiya-border shadow-lg rounded-full flex items-center justify-center text-yatiya-black/g, 'bg-yatiya-black border border-yatiya-gold shadow-lg rounded-full flex items-center justify-center text-yatiya-gold');

  fs.writeFileSync(absolutePath, content, 'utf8');
}

filePaths.forEach(processFile);
