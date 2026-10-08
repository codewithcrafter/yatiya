const fs = require('fs');
const path = require('path');

const filePaths = [
  'src/components/home/DealsAndBestSeller.tsx',
  'src/components/home/PromoTestimonials.tsx',
];

function processFile(filePath) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');

  if (filePath.includes('DealsAndBestSeller')) {
    content = content.replace(/bg-\[#151515\]/g, 'bg-yatiya-ivory');
  }

  if (filePath.includes('PromoTestimonials')) {
    content = content.replace(/bg-white overflow-hidden/g, 'bg-yatiya-ivory overflow-hidden');
    // keep testimonial cards white or surface? Let's leave them white for contrast.
  }

  fs.writeFileSync(absolutePath, content, 'utf8');
}

filePaths.forEach(processFile);
