const fs = require('fs');
const path = require('path');

function updateFile(filePath, replacements) {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;
  let content = fs.readFileSync(absolutePath, 'utf8');

  replacements.forEach(([search, replace]) => {
    content = content.split(search).join(replace);
  });

  fs.writeFileSync(absolutePath, content, 'utf8');
}

// 1. globals.css
updateFile('src/app/globals.css', [
  [
    'body {\n  background-color: var(--yatiya-black);\n  color: var(--yatiya-text);\n}',
    `body {
  background-color: var(--yatiya-black);
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(198,161,91,0.10) 0%, rgba(198,161,91,0.04) 25%, transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(214,188,122,0.08) 0%, transparent 50%);
  background-attachment: fixed;
  color: var(--yatiya-text);
}`
  ]
]);

// 2. NewProducts.tsx
updateFile('src/components/home/NewProducts.tsx', [
  [
    '<section className="pt-[70px] md:pt-[90px] pb-[60px] w-full max-w-[1920px] mx-auto px-6 md:px-[30px] bg-[#101010]">',
    '<section className="pt-[70px] md:pt-[90px] pb-[60px] w-full max-w-[1920px] mx-auto px-6 md:px-[30px]" style={{ background: "radial-gradient(circle at 50% 0%, rgba(198,161,91,0.12), transparent 45%), #101010" }}>'
  ],
  // ensure the glow stays behind the content
  [
    '<div className="flex flex-col items-center mb-[40px] md:mb-[50px]">',
    '<div className="flex flex-col items-center mb-[40px] md:mb-[50px] relative z-10">'
  ]
]);

// 3. DealsAndBestSeller.tsx
updateFile('src/components/home/DealsAndBestSeller.tsx', [
  [
    '<section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full bg-[#080808] overflow-hidden">',
    '<section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full overflow-hidden" style={{ background: "radial-gradient(circle at 50% 20%, rgba(198,161,91,0.16), transparent 60%), #080808" }}>'
  ],
  [
    '<div className="w-full max-w-[1920px] mx-auto px-6 md:px-[30px] mt-[60px] md:mt-[70px]">',
    '<div className="w-full max-w-[1920px] mx-auto px-6 md:px-[30px] pt-[60px] md:pt-[70px] mt-[60px] md:mt-[70px] border-t border-[rgba(198,161,91,0.15)]" style={{ background: "radial-gradient(circle at 50% 0%, rgba(198,161,91,0.10), transparent 50%), #101010" }}>'
  ]
]);

// 4. PromoTestimonials.tsx
updateFile('src/components/home/PromoTestimonials.tsx', [
  [
    '<section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full max-w-[1920px] mx-auto px-6 md:px-[30px] bg-[#0B0B0B] overflow-hidden">',
    '<section className="pt-[70px] md:pt-[80px] pb-[70px] md:pb-[80px] w-full max-w-[1920px] mx-auto px-6 md:px-[30px] overflow-hidden" style={{ background: "radial-gradient(circle at 50% 50%, rgba(214,188,122,0.08), transparent 60%), #0B0B0B" }}>'
  ]
]);

// 5. BlogSection.tsx
updateFile('src/components/home/BlogSection.tsx', [
  [
    '<section className="py-[70px] md:py-[90px] w-full bg-[#101010]">',
    '<section className="py-[70px] md:py-[90px] w-full" style={{ background: "radial-gradient(circle at 50% 0%, rgba(198,161,91,0.10), transparent 50%), #101010" }}>'
  ]
]);

// 6. PromoGrid.tsx
updateFile('src/components/home/PromoGrid.tsx', [
  [
    'bg-[#101010]',
    'bg-transparent'
  ],
  [
    'bg-[#171717]',
    'bg-transparent'
  ],
  [
    'className="flex flex-col items-start justify-end h-full px-8 pb-10 pt-16 z-10 relative"',
    'className="flex flex-col items-start justify-end h-full px-8 pb-10 pt-16 z-10 relative" style={{ background: "linear-gradient(135deg, rgba(11,11,11,0.9), rgba(26,22,13,0.9))" }}'
  ],
  [
    'className="flex flex-col items-start justify-end h-full p-8 z-10 relative"',
    'className="flex flex-col items-start justify-end h-full p-8 z-10 relative" style={{ background: "linear-gradient(135deg, rgba(11,11,11,0.9), rgba(26,22,13,0.9))" }}'
  ]
]);

console.log('Added gold backgrounds');
