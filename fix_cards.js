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
        console.log(`Updated ${filePath}`);
    }
}

// Deals & Best Seller
replaceInFile('src/components/home/DealsAndBestSeller.tsx', [
    { search: 'bg-[#F7EEDB]', replace: 'bg-[#FBF3E2] border border-[#C6A15B]/40' },
    { search: 'text-[#080808]', replace: 'text-[#3F1017]' }, // Dark burgundy text for some sale badges
    { search: 'text-[#D6BC7A]', replace: 'text-[#4A3215]' }, // Heading Best Seller
    { search: 'bg-[#C6A15B]/10', replace: 'bg-[#C6A15B]/20' }, // Countdown
    { search: 'hover:text-[#080808]', replace: 'hover:text-[#FBF3E2]' }
]);

// New Products
replaceInFile('src/components/home/NewProducts.tsx', [
    { search: 'bg-[#F7EEDB]', replace: 'bg-[#F4E7CA]' },
    { search: 'text-[#080808]', replace: 'text-[#4A3215]' }
]);

// Blog Section
replaceInFile('src/components/home/BlogSection.tsx', [
    { search: 'bg-[#F8F4EC]', replace: 'bg-[#F7EEDC]' },
    { search: 'bg-[#F3EBDD]', replace: 'bg-[#EBD9B0] border border-[#C6A15B]/40' },
    { search: 'text-[#171717]', replace: 'text-[#5F4A2A]' },
    { search: 'text-yatiya-text', replace: 'text-[#5A421F]' }
]);

// Header
replaceInFile('src/components/header/Header.tsx', [
    { search: 'text-[#080808]', replace: 'text-[#4A3215]' },
    { search: 'hover:text-[#080808]', replace: 'hover:text-[#8A641F]' },
    { search: 'bg-yatiya-black', replace: 'bg-[#4A3215]' } // any button backgrounds
]);

console.log("Updated product cards and miscellaneous elements.");
