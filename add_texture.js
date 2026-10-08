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
    { search: '@layer components {', replace: textureCSS + '\n@layer components {' }
]);
