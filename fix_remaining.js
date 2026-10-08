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

replaceInFile('src/components/home/PromoTestimonials.tsx', [
    { search: 'from-black/70', replace: 'from-[#2B211B]/70' },
    { search: 'from-black/80', replace: 'from-[#2B211B]/80' },
    { search: 'via-black/40', replace: 'via-[#2B211B]/40' },
    { search: 'bg-black', replace: 'bg-[#2B211B]' },
    { search: 'bg-[#151515]', replace: 'bg-[#F3EBDD]' },
    { search: 'bg-[#101010]', replace: 'bg-[#F3EBDD]' },
    { search: 'bg-[#171717]', replace: 'bg-[#F8F4EC]' },
    { search: 'bg-[#000000]', replace: 'bg-[#F8F4EC]' }
]);

replaceInFile('src/components/home/DealsAndBestSeller.tsx', [
    { search: 'from-black/80', replace: 'from-[#2B211B]/80' },
    { search: 'via-black/40', replace: 'via-[#2B211B]/40' },
    { search: 'bg-[#151515]', replace: 'bg-[#F3EBDD]' },
    { search: 'bg-[#101010]', replace: 'bg-[#2B211B]' }, // It was a button background, keep it dark for contrast or #2B211B
    { search: 'bg-[#171717]', replace: 'bg-[#F8F4EC]' },
    { search: 'bg-yatiya-black', replace: 'bg-[#F8F4EC]' }
]);

replaceInFile('src/components/home/BlogSection.tsx', [
    { search: 'from-black/80', replace: 'from-[#2B211B]/80' },
    { search: 'via-black/40', replace: 'via-[#2B211B]/40' },
    { search: 'bg-[#151515]', replace: 'bg-[#F3EBDD]' },
    { search: 'bg-[#101010]', replace: 'bg-[#2B211B]' },
    { search: 'bg-[#171717]', replace: 'bg-[#F8F4EC]' }
]);

replaceInFile('src/components/home/PromoGrid.tsx', [
    { search: 'from-black/80', replace: 'from-[#2B211B]/80' },
    { search: 'via-black/40', replace: 'via-[#2B211B]/40' },
    { search: 'bg-[#151515]', replace: 'bg-[#F3EBDD]' },
    { search: 'bg-[#101010]', replace: 'bg-[#2B211B]' },
    { search: 'bg-[#171717]', replace: 'bg-[#F8F4EC]' },
    { search: 'bg-yatiya-black', replace: 'bg-[#F8F4EC]' }
]);

replaceInFile('src/components/home/HeroSlider.tsx', [
    { search: 'from-yatiya-black/80', replace: 'from-[#2B211B]/60' },
    { search: 'via-yatiya-black/20', replace: 'via-[#2B211B]/10' },
    { search: 'text-yatiya-black', replace: 'text-[#2B211B]' },
    { search: 'from-[#080808]', replace: 'from-[#2B211B]' }
]);

console.log("Done fixed remaining.");
