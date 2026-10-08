const fs = require('fs');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const {search, replace} of replacements) {
        content = content.split(search).join(replace);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Reverted ${filePath}`);
    }
}

// Global CSS
const textureCSS = `
  body {
    position: relative;
  }
  body::before {
    content: "";
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: -1;
    opacity: 0.04;
    pointer-events: none;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30S46.569 60 30 60 0 46.569 0 30 13.431 0 30 0zm0 5C16.193 5 5 16.193 5 30s11.193 25 25 25 25-11.193 25-25S43.807 5 30 5zm0 10c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15zm0 5c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z' fill='%235A1720' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-size: 60px 60px;
  }
`;
replaceInFile('src/app/globals.css', [
    { search: textureCSS + '\n@layer components {', replace: '@layer components {' },
    { search: '--background: #F7EEDC;', replace: '--background: #F8F4EC;' },
    { search: '--foreground: #5F4A2A;', replace: '--foreground: #2B211B;' },
    { search: 'linear-gradient(135deg, #F7EEDC 0%, #EEDDB8 30%, #E2C98E 65%, #C6A15B 100%)', replace: 'linear-gradient(135deg, #FFFFFF 0%, #F8F4EC 35%, #F3EBDD 65%, #E9DDC8 100%)' },
    { search: 'rgba(255,255,255,0.35), transparent 35%', replace: 'rgba(255,255,255,0.8), transparent 45%' },
    { search: 'rgba(198,161,91,0.18), transparent 40%', replace: 'rgba(201,178,124,0.08), transparent 40%' }
]);

// Header
replaceInFile('src/components/header/Header.tsx', [
    { search: 'bg-gradient-to-r from-[#F7EEDC] via-[#EBD9AE] to-[#F3E4C3]', replace: 'bg-[#FCFAF7]' },
    { search: 'bg-[#F7EEDC]', replace: 'bg-[#FCFAF7]' },
    { search: 'border-[#C6A15B]', replace: 'border-[#DDD0BC]' },
    { search: 'text-[#4A3518]', replace: 'text-[#2B211B]' },
    { search: 'hover:text-[#8A641F]', replace: 'hover:text-[#C9B27C]' },
    { search: 'bg-[#8A641F]', replace: 'bg-[#C9B27C]' },
    { search: 'text-[#F7EEDC]', replace: 'text-[#FCFAF7]' },
    { search: 'bg-[#F3E4C3]', replace: 'bg-[#E9DDC8]' },
    { search: 'text-[#4A3215]', replace: 'text-[#080808]' },
    { search: 'bg-[#4A3215]', replace: 'bg-yatiya-black' }
]);

// Footer
replaceInFile('src/components/footer/Footer.tsx', [
    { search: 'bg-[#5A421F]', replace: 'bg-[#2B211B]' }, 
    { search: 'text-[#F4E8CD]', replace: 'text-[#F3EBDD]' },
    { search: 'border-[#C6A15B]/40', replace: 'border-[#C9B27C]/20' },
    { search: 'bg-[#C6A15B]', replace: 'bg-yatiya-gold' },
    { search: 'text-[#F4E8CD]/40', replace: 'text-[#F3EBDD]/40' },
    { search: 'text-[#F4E8CD]/50', replace: 'text-[#F3EBDD]/50' },
    { search: 'text-[#F4E8CD]/70', replace: 'text-[#F3EBDD]/70' },
    { search: 'text-[#F4E8CD]/80', replace: 'text-[#F3EBDD]/80' }
]);

// New Products
replaceInFile('src/components/home/NewProducts.tsx', [
    { search: 'linear-gradient(135deg, #F5E9CF, #E7D3A2, #D5B873)', replace: 'linear-gradient(135deg, #F1E2BE 0%, #E4CE9B 35%, #D5B873 70%, #C6A15B 100%)' },
    { search: 'from-[#F5E9CF]', replace: 'from-[#F3E6C8]' },
    { search: 'via-[#E7D3A2]', replace: 'via-[#E6D2A3]' },
    { search: 'to-[#D5B873]', replace: 'to-[#D8C294]' },
    { search: 'text-[#5A421F]', replace: 'text-[#2B211B]' },
    { search: 'text-[#654D2A]', replace: 'text-[#4B3C2A]' },
    { search: 'bg-[#F8F0DF]', replace: 'bg-[#F9F6F0]' },
    { search: 'border-[#C6A15B]', replace: 'border-[#E7DDCA]' },
    { search: 'bg-[#C6A15B]', replace: 'bg-[#2B211B]' },
    { search: 'text-[#2B211B]', replace: 'text-[#F9F6F0]' },
    { search: 'hover:bg-[#B88A3B]', replace: 'hover:bg-[#43352A]' },
    { search: 'bg-[#F4E7CA]', replace: 'bg-[#F7EEDB]' },
    { search: 'text-[#4A3215]', replace: 'text-[#080808]' }
]);

// Hero Slider
replaceInFile('src/components/home/HeroSlider.tsx', [
    { search: 'from-[#E8D5A8]/80', replace: 'from-[#2B211B]/60' },
    { search: 'via-[#E8D5A8]/40', replace: 'via-[#2B211B]/10' },
    { search: 'text-[#4A3215]', replace: 'text-[#2B211B]' },
    { search: 'bg-[#F4E8CD]', replace: 'bg-[#F8F4EC]' },
    { search: 'border-[#4A3215]/40', replace: 'border-yatiya-ivory/40' },
    { search: 'hover:bg-[#4A3215]', replace: 'hover:bg-yatiya-ivory' },
    { search: 'hover:text-[#F4E8CD]', replace: 'hover:text-yatiya-black' },
    { search: 'text-[#5F4A2A]', replace: 'text-yatiya-ivory/90' }
]);

// Deals & Best Seller
replaceInFile('src/components/home/DealsAndBestSeller.tsx', [
    { search: 'bg-[#F7EEDC]', replace: 'bg-[#F8F4EC]' },
    { search: 'bg-[#D8C49A]', replace: 'bg-[#F3EBDD]' }, 
    { search: 'text-[#5A421F]', replace: 'text-yatiya-text' },
    { search: 'from-[#C6A15B]/80', replace: 'from-[#2B211B]/80' },
    { search: 'via-[#D5B873]/40', replace: 'via-[#2B211B]/40' },
    { search: 'bg-[#C6A15B]', replace: 'bg-[#2B211B]' },
    { search: 'hover:bg-[#C6A15B]', replace: 'hover:bg-[#B88A3B]' },
    { search: 'bg-[#FBF3E2] border border-[#C6A15B]/40', replace: 'bg-[#F7EEDB]' },
    { search: 'text-[#3F1017]', replace: 'text-[#080808]' },
    { search: 'text-[#4A3215]', replace: 'text-[#D6BC7A]' },
    { search: 'bg-[#C6A15B]/20', replace: 'bg-[#C6A15B]/10' },
    { search: 'hover:text-[#FBF3E2]', replace: 'hover:text-[#080808]' }
]);

// Promo Testimonials
replaceInFile('src/components/home/PromoTestimonials.tsx', [
    { search: 'bg-[#F7EEDC]', replace: 'bg-[#F8F4EC]' },
    { search: 'from-[#E8D5A8]/70', replace: 'from-[#2B211B]/70' },
    { search: 'from-[#E8D5A8]/80', replace: 'from-[#2B211B]/80' },
    { search: 'via-[#F4E8CD]/40', replace: 'via-[#2B211B]/40' },
    { search: 'text-[#4A3215]', replace: 'text-[#2B211B]' }
]);

// Blog Section
replaceInFile('src/components/home/BlogSection.tsx', [
    { search: 'bg-[#F7EEDC]', replace: 'bg-[#F8F4EC]' },
    { search: 'bg-[#EBD9B0] border border-[#C6A15B]/40', replace: 'bg-[#F3EBDD]' },
    { search: 'text-[#5F4A2A]', replace: 'text-[#171717]' },
    { search: 'text-[#5A421F]', replace: 'text-yatiya-text' }
]);

console.log("Revert complete.");
