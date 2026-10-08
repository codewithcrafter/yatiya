const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const colorMap = {
  '\\[#242124\\]': 'yatiya-black',
  '\\[#0B0B0B\\]': 'yatiya-black',
  '\\[#151515\\]': 'yatiya-black-soft',
  '\\[#1C1C1C\\]': 'yatiya-surface',
  '\\[#C7A66A\\]': 'yatiya-gold',
  '\\[#C6A15B\\]': 'yatiya-gold',
  '\\[#D4B878\\]': 'yatiya-gold-light',
  '\\[#E5D3A3\\]': 'yatiya-gold-pale',
  '\\[#FCFAF7\\]': 'yatiya-ivory',
  '\\[#F7F4ED\\]': 'yatiya-ivory',
  '\\[#F6F1EA\\]': 'yatiya-ivory',
  '\\[#A7A7A7\\]': 'yatiya-muted',
  '\\[#999999\\]': 'yatiya-muted',
  '\\[#999\\]': 'yatiya-muted',
  '\\[#666666\\]': 'yatiya-muted',
  '\\[#666\\]': 'yatiya-muted',
  '\\[#1a1a1a\\]': 'yatiya-black-soft',
  '\\[#111111\\]': 'yatiya-black-soft',
  '\\[#F2E8D9\\]': 'yatiya-border', // We can use yatiya-gold/20
  'bg-\\[#F2E8D9\\]': 'bg-yatiya-gold/20',
  'border-\\[#F2E8D9\\]': 'border-yatiya-gold/20',
};

walk('src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Apply color replacements
    for (const [key, value] of Object.entries(colorMap)) {
      const regex = new RegExp(key, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, value);
        changed = true;
      }
    }
    
    // Also change instances of pink if any
    const pinkRegex = /\[#ff00ff\]|\[#e83e8c\]/gi; // just in case
    if (pinkRegex.test(content)) {
      content = content.replace(pinkRegex, 'yatiya-gold');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
console.log('Color replacement done.');
