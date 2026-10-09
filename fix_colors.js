const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Map of Hex codes to their new Tailwind semantic names
const hexToClass = {
  '#F6F0E4': 'yatiya-ivory',
  '#EFE5D2': 'yatiya-cream',
  '#342719': 'yatiya-dark-cocoa',
  '#4A3622': 'yatiya-deep-brown',
  '#B08D57': 'yatiya-roman-gold',
  '#A67C45': 'yatiya-antique-gold',
  '#D2B477': 'yatiya-light-gold',
  '#604725': 'yatiya-deep-bronze',
  '#5A2525': 'yatiya-burgundy',
  '#FFF8EA': 'yatiya-light-text',
  '#80613A': 'yatiya-warm-bronze',
  '#C19A5B': 'yatiya-rich-gold', 
  '#9C7A45': 'yatiya-old-gold',
  '#E8C98A': 'yatiya-light-gold',
  '#F3D9A3': 'yatiya-light-gold',
  '#FFFDF7': 'yatiya-light-text',
  '#F5F0E6': 'yatiya-light-text',
  '#2B211B': 'yatiya-dark-cocoa' // The older dark brown hex I used
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace all HEX codes in Tailwind classes (e.g., text-[#F6F0E4] -> text-yatiya-ivory)
  for (const [hex, cls] of Object.entries(hexToClass)) {
    const regex1 = new RegExp(`bg-\\[${hex}\\]`, 'gi');
    content = content.replace(regex1, `bg-${cls}`);
    
    const regex2 = new RegExp(`text-\\[${hex}\\]`, 'gi');
    content = content.replace(regex2, `text-${cls}`);
    
    const regex3 = new RegExp(`border-\\[${hex}\\]`, 'gi');
    content = content.replace(regex3, `border-${cls}`);
    
    const regex4 = new RegExp(`from-\\[${hex}\\]`, 'gi');
    content = content.replace(regex4, `from-${cls}`);
    
    const regex5 = new RegExp(`via-\\[${hex}\\]`, 'gi');
    content = content.replace(regex5, `via-${cls}`);
    
    const regex6 = new RegExp(`to-\\[${hex}\\]`, 'gi');
    content = content.replace(regex6, `to-${cls}`);
    
    const regex7 = new RegExp(`hover:bg-\\[${hex}\\]`, 'gi');
    content = content.replace(regex7, `hover:bg-${cls}`);
    
    const regex8 = new RegExp(`hover:text-\\[${hex}\\]`, 'gi');
    content = content.replace(regex8, `hover:text-${cls}`);
    
    const regex9 = new RegExp(`hover:border-\\[${hex}\\]`, 'gi');
    content = content.replace(regex9, `hover:border-${cls}`);
    
    const regex10 = new RegExp(`group-hover:bg-\\[${hex}\\]`, 'gi');
    content = content.replace(regex10, `group-hover:bg-${cls}`);
    
    const regex11 = new RegExp(`group-hover:text-\\[${hex}\\]`, 'gi');
    content = content.replace(regex11, `group-hover:text-${cls}`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walk(srcDir);
console.log('Color processing complete.');
