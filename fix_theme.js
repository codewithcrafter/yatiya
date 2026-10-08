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

// 1. Update globals.css
replaceInFile('src/app/globals.css', [
    { search: '--background: #E6D2A3;', replace: '--background: #F8F4EC;' },
    { search: '--foreground: #5A4930;', replace: '--foreground: #2B211B;' },
    { search: 'linear-gradient(135deg, #F3E6C8 0%, #E6D2A3 35%, #D8C294 65%, #C6A15B 100%)', replace: 'linear-gradient(135deg, #FFFFFF 0%, #F8F4EC 35%, #F3EBDD 65%, #E9DDC8 100%)' }
]);

// 2. Update Footer.tsx
replaceInFile('src/components/footer/Footer.tsx', [
    { search: 'bg-[#070707]', replace: 'bg-[#2B211B]' },
    { search: 'bg-[#111111]', replace: 'bg-[#2B211B]' },
    { search: 'text-yatiya-ivory', replace: 'text-[#F3EBDD]' },
    { search: 'border-yatiya-gold/20', replace: 'border-[#C9B27C]/20' },
    { search: 'text-[#D6BC7A]', replace: 'text-[#C9B27C]' },
    { search: 'YATYIA', replace: 'YATIYA' }, // Note: we'll keep the big text as YATIYA for now as requested, or replace with an image
]);

// 3. Update Header.tsx
replaceInFile('src/components/header/Header.tsx', [
    { search: 'YATYIA', replace: 'YATIYA' }
]);

// 4. Update HeroSlider.tsx if it exists
replaceInFile('src/components/home/HeroSlider.tsx', [
    { search: 'YATYIA', replace: 'YATIYA' },
    { search: 'bg-[#000000]', replace: 'bg-[#F8F4EC]' },
    { search: 'bg-[#080808]', replace: 'bg-[#F8F4EC]' },
    { search: 'from-[#080808]', replace: 'from-[#2B211B]' }
]);

// 5. Update DealsAndBestSeller.tsx if it exists
replaceInFile('src/components/home/DealsAndBestSeller.tsx', [
    { search: 'bg-[#000000]', replace: 'bg-[#F8F4EC]' },
    { search: 'bg-[#080808]', replace: 'bg-[#F8F4EC]' },
    { search: 'bg-[#111111]', replace: 'bg-[#F3EBDD]' }
]);

console.log("Done");
