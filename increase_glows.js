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
    `background-image: 
    radial-gradient(circle at 20% 20%, rgba(198,161,91,0.10) 0%, rgba(198,161,91,0.04) 25%, transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(214,188,122,0.08) 0%, transparent 50%);`,
    `background-image: 
    radial-gradient(circle at 15% 15%, rgba(198,161,91,0.22) 0%, rgba(198,161,91,0.10) 22%, transparent 48%),
    radial-gradient(circle at 85% 35%, rgba(214,188,122,0.16) 0%, rgba(198,161,91,0.07) 25%, transparent 55%),
    radial-gradient(circle at 45% 100%, rgba(198,161,91,0.14) 0%, transparent 48%),
    linear-gradient(135deg, #080808 0%, #15110A 35%, #0B0B0B 60%, #1A1409 100%);`
  ]
]);

// 2. NewProducts.tsx
updateFile('src/components/home/NewProducts.tsx', [
  [
    'style={{ background: "radial-gradient(circle at 50% 0%, rgba(198,161,91,0.12), transparent 45%), #101010" }}',
    'style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.20), transparent 55%), linear-gradient(135deg, #080808, #17130C, #0B0B0B)" }}'
  ]
]);

// 3. DealsAndBestSeller.tsx
updateFile('src/components/home/DealsAndBestSeller.tsx', [
  [
    'style={{ background: "radial-gradient(circle at 50% 20%, rgba(198,161,91,0.16), transparent 60%), #080808" }}',
    'style={{ background: "radial-gradient(ellipse at center, rgba(198,161,91,0.25), transparent 60%), linear-gradient(120deg, #050505, #211A0D, #090909)" }}'
  ],
  [
    'style={{ background: "radial-gradient(circle at 50% 0%, rgba(198,161,91,0.10), transparent 50%), #101010" }}',
    'style={{ background: "radial-gradient(circle at 50% 20%, rgba(198,161,91,0.18), transparent 55%), #101010" }}'
  ]
]);

// 4. PromoTestimonials.tsx
updateFile('src/components/home/PromoTestimonials.tsx', [
  [
    'style={{ background: "radial-gradient(circle at 50% 50%, rgba(214,188,122,0.08), transparent 60%), #0B0B0B" }}',
    'style={{ background: "linear-gradient(135deg, #080808, #1B150B, #0B0B0B)" }}'
  ]
]);

// 5. BlogSection.tsx
updateFile('src/components/home/BlogSection.tsx', [
  [
    'style={{ background: "radial-gradient(circle at 50% 0%, rgba(198,161,91,0.10), transparent 50%), #101010" }}',
    'style={{ background: "radial-gradient(circle at 50% 0%, rgba(214,188,122,0.16), transparent 50%), #101010" }}'
  ]
]);

// 6. PromoGrid.tsx
updateFile('src/components/home/PromoGrid.tsx', [
  [
    'style={{ background: "linear-gradient(135deg, rgba(11,11,11,0.9), rgba(26,22,13,0.9))" }}',
    'style={{ background: "linear-gradient(120deg, rgba(8,8,8,0.95) 0%, rgba(33,26,13,0.95) 45%, rgba(11,11,11,0.95) 100%)" }}'
  ]
]);

// 7. Footer.tsx
updateFile('src/components/footer/Footer.tsx', [
  [
    '<footer className="bg-[#050505] pt-16 md:pt-24 pb-8 border-t border-[rgba(198,161,91,0.25)] text-[#D6BC7A]">',
    '<footer className="pt-16 md:pt-24 pb-8 border-t border-[rgba(198,161,91,0.25)] text-[#D6BC7A]" style={{ background: "linear-gradient(120deg, #050505, #171108, #050505)" }}>'
  ]
]);

console.log('Stronger black + gold backgrounds applied');
