const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const legacyClasses = {
  'bg-yatiya-primary-gold': 'bg-yatiya-roman-gold',
  'text-yatiya-primary-gold': 'text-yatiya-roman-gold',
  'border-yatiya-primary-gold': 'border-yatiya-roman-gold',
  'hover:bg-yatiya-primary-gold': 'hover:bg-yatiya-roman-gold',
  'hover:text-yatiya-primary-gold': 'hover:text-yatiya-roman-gold',
  'hover:border-yatiya-primary-gold': 'hover:border-yatiya-roman-gold',
  'group-hover:text-yatiya-primary-gold': 'group-hover:text-yatiya-roman-gold',

  'bg-yatiya-zari': 'bg-yatiya-antique-gold',
  'text-yatiya-zari': 'text-yatiya-antique-gold',
  
  'bg-yatiya-muted-gold': 'bg-yatiya-antique-gold',
  'text-yatiya-muted-gold': 'text-yatiya-antique-gold',
  'border-yatiya-muted-gold': 'border-yatiya-antique-gold',

  'bg-yatiya-champagne': 'bg-yatiya-light-gold',
  'text-yatiya-champagne': 'text-yatiya-light-gold',
  
  'bg-yatiya-light-champagne': 'bg-yatiya-cream',
  'text-yatiya-light-champagne': 'text-yatiya-cream',

  'bg-yatiya-beige': 'bg-yatiya-light-gold',
  
  'bg-yatiya-bronze': 'bg-yatiya-warm-bronze',
  'text-yatiya-bronze': 'text-yatiya-warm-bronze',
  
  'bg-yatiya-brown': 'bg-yatiya-deep-brown',
  'text-yatiya-brown': 'text-yatiya-deep-brown',
  'hover:text-yatiya-brown': 'hover:text-yatiya-deep-brown',

  'bg-yatiya-wine': 'bg-yatiya-burgundy',
  'text-yatiya-wine': 'text-yatiya-burgundy',

  'bg-yatiya-dark-wine': 'bg-yatiya-dark-cocoa',
  
  'bg-yatiya-black': 'bg-yatiya-dark-cocoa',
  'text-yatiya-black': 'text-yatiya-dark-cocoa',
  'bg-black': 'bg-yatiya-dark-cocoa', // some might still use standard tailwind black
  'text-black': 'text-yatiya-dark-cocoa',

  'bg-yatiya-surface': 'bg-yatiya-cream',
  
  'bg-yatiya-gold': 'bg-yatiya-roman-gold',
  'text-yatiya-gold': 'text-yatiya-roman-gold',
  
  'bg-yatiya-gold-light': 'bg-yatiya-light-gold',
  'text-yatiya-gold-light': 'text-yatiya-light-gold',
  
  'bg-yatiya-gold-pale': 'bg-yatiya-cream',
  
  'bg-yatiya-ivory-legacy': 'bg-yatiya-ivory',
  
  'bg-yatiya-white': 'bg-white',
  'text-yatiya-white': 'text-white',
  
  'bg-yatiya-muted': 'bg-yatiya-deep-brown',
  'text-yatiya-muted': 'text-yatiya-deep-brown',
  
  'border-yatiya-border': 'border-yatiya-light-gold',
  
  'text-yatiya-text': 'text-yatiya-deep-brown',
  
  'text-yatiya-primary-text': 'text-yatiya-deep-brown',
  'text-yatiya-heading-text': 'text-yatiya-dark-cocoa',
  'text-yatiya-secondary-text': 'text-yatiya-deep-brown',
  'text-yatiya-muted-text': 'text-yatiya-deep-brown'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace legacy classes with new ones
  for (const [legacy, newCls] of Object.entries(legacyClasses)) {
    // Avoid double replacing if legacy contains newCls (unlikely here)
    if (legacy === newCls) continue;
    
    // We only replace exact whole words
    const regex = new RegExp(`\\b${legacy}\\b`, 'g');
    content = content.replace(regex, newCls);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Legacy class updated: ${filePath}`);
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
console.log('Legacy replacement complete.');
