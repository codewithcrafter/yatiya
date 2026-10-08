const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const {search, replace} of replacements) {
        content = content.split(search).join(replace);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

// Global CSS
replaceInFile('src/app/globals.css', [
    { search: '--background: #F8F4EC;', replace: '--background: #F7EEDC;' },
    { search: '--foreground: #2B211B;', replace: '--foreground: #5F4A2A;' },
    { search: 'linear-gradient(135deg, #FFFFFF 0%, #F8F4EC 35%, #F3EBDD 65%, #E9DDC8 100%)', replace: 'linear-gradient(135deg, #F7EEDC 0%, #EEDDB8 30%, #E2C98E 65%, #C6A15B 100%)' },
    { search: 'rgba(255,255,255,0.8), transparent 45%', replace: 'rgba(255,255,255,0.35), transparent 35%' },
    { search: 'rgba(201,178,124,0.08), transparent 40%', replace: 'rgba(198,161,91,0.18), transparent 40%' }
]);

// Header
replaceInFile('src/components/header/Header.tsx', [
    { search: 'bg-[#FCFAF7]', replace: 'bg-[#F7EEDC]' },
    { search: 'border-[#DDD0BC]', replace: 'border-[#C6A15B]' },
    { search: 'text-[#2B211B]', replace: 'text-[#4A3518]' },
    { search: 'hover:text-[#C9B27C]', replace: 'hover:text-[#8A641F]' },
    { search: 'bg-[#C9B27C]', replace: 'bg-[#8A641F]' },
    { search: 'text-[#FCFAF7]', replace: 'text-[#F7EEDC]' },
    { search: 'bg-[#E9DDC8]', replace: 'bg-[#F3E4C3]' }
]);

// Footer
replaceInFile('src/components/footer/Footer.tsx', [
    { search: 'bg-[#2B211B]', replace: 'bg-[#5A421F]' }, // Deep Traditional Brown
    { search: 'text-[#F3EBDD]', replace: 'text-[#F4E8CD]' },
    { search: 'border-[#C9B27C]/20', replace: 'border-[#C6A15B]/40' },
    { search: 'text-[#C9B27C]', replace: 'text-[#F4E8CD]' },
    { search: 'bg-yatiya-gold', replace: 'bg-[#C6A15B]' },
    { search: 'text-[#F3EBDD]/40', replace: 'text-[#F4E8CD]/40' },
    { search: 'text-[#F3EBDD]/50', replace: 'text-[#F4E8CD]/50' },
    { search: 'text-[#F3EBDD]/70', replace: 'text-[#F4E8CD]/70' },
    { search: 'text-[#F3EBDD]/80', replace: 'text-[#F4E8CD]/80' }
]);

// New Products
replaceInFile('src/components/home/NewProducts.tsx', [
    { search: 'from-[#F3E6C8]', replace: 'from-[#F5E9CF]' },
    { search: 'via-[#E6D2A3]', replace: 'via-[#E7D3A2]' },
    { search: 'to-[#D8C294]', replace: 'to-[#D5B873]' },
    { search: 'text-[#2B211B]', replace: 'text-[#5A421F]' },
    { search: 'text-[#4B3C2A]', replace: 'text-[#654D2A]' },
    { search: 'text-yatiya-text', replace: 'text-[#5A421F]' },
    { search: 'bg-[#F9F6F0]', replace: 'bg-[#F8F0DF]' },
    { search: 'border-[#E7DDCA]', replace: 'border-[#C6A15B]' },
    { search: 'bg-[#2B211B]', replace: 'bg-[#C6A15B]' },
    { search: 'text-[#F9F6F0]', replace: 'text-[#2B211B]' },
    { search: 'hover:bg-[#43352A]', replace: 'hover:bg-[#B88A3B]' }
]);

// Hero Slider
replaceInFile('src/components/home/HeroSlider.tsx', [
    { search: 'from-[#2B211B]/60', replace: 'from-[#E8D5A8]/80' },
    { search: 'via-[#2B211B]/10', replace: 'via-[#E8D5A8]/40' },
    { search: 'text-yatiya-ivory', replace: 'text-[#4A3215]' },
    { search: 'text-[#2B211B]', replace: 'text-[#4A3215]' },
    { search: 'bg-[#F8F4EC]', replace: 'bg-[#F4E8CD]' },
    { search: 'bg-yatiya-ivory', replace: 'bg-[#F4E8CD]' },
    { search: 'border-yatiya-ivory/40', replace: 'border-[#4A3215]/40' },
    { search: 'hover:bg-yatiya-ivory', replace: 'hover:bg-[#4A3215]' },
    { search: 'hover:text-yatiya-black', replace: 'hover:text-[#F4E8CD]' },
    { search: 'text-yatiya-ivory/90', replace: 'text-[#5F4A2A]' }
]);

// Deals & Best Seller
replaceInFile('src/components/home/DealsAndBestSeller.tsx', [
    { search: 'bg-[#F8F4EC]', replace: 'bg-[#F7EEDC]' },
    { search: 'bg-[#F3EBDD]', replace: 'bg-[#D8C49A]' }, // Warm beige
    { search: 'text-yatiya-text', replace: 'text-[#5A421F]' },
    { search: 'from-[#2B211B]/80', replace: 'from-[#C6A15B]/80' },
    { search: 'via-[#2B211B]/40', replace: 'via-[#D5B873]/40' },
    { search: 'text-[#F8F4EC]', replace: 'text-[#2B211B]' },
    { search: 'bg-[#2B211B]', replace: 'bg-[#C6A15B]' },
    { search: 'bg-yatiya-gold', replace: 'bg-[#C6A15B]' },
    { search: 'text-[#2B211B]', replace: 'text-[#4A3215]' },
    { search: 'hover:bg-[#C6A15B]', replace: 'hover:bg-[#B88A3B]' }
]);

// Promo Testimonials
replaceInFile('src/components/home/PromoTestimonials.tsx', [
    { search: 'bg-[#F8F4EC]', replace: 'bg-[#F7EEDC]' },
    { search: 'from-[#2B211B]/70', replace: 'from-[#E8D5A8]/70' },
    { search: 'from-[#2B211B]/80', replace: 'from-[#E8D5A8]/80' },
    { search: 'via-[#2B211B]/40', replace: 'via-[#F4E8CD]/40' },
    { search: 'text-[#2B211B]', replace: 'text-[#4A3215]' }
]);

console.log("Applied new theme variables!");
