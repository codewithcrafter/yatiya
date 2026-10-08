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

replaceInFile('src/components/home/NewProducts.tsx', [
    { search: 'linear-gradient(135deg, #F1E2BE 0%, #E4CE9B 35%, #D5B873 70%, #C6A15B 100%)', replace: 'linear-gradient(135deg, #F5E9CF, #E7D3A2, #D5B873)' },
    { search: 'text-[#6F5120]', replace: 'text-[#5A421F]' }, // Heading: #5A421F
    { search: 'text-[#5C4828]', replace: 'text-[#654D2A]' }, // Tabs: #654D2A
    { search: 'bg-[#A9823D]', replace: 'bg-[#B88A3B]' } // Underline: #B88A3B
]);
