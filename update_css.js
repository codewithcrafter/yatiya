const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src/app/globals.css');
if (fs.existsSync(cssPath)) {
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Replace variables in :root
  cssContent = cssContent.replace(
    /--yatiya-ivory: #FAF8F2;/g,
    '--yatiya-ivory: #F5F0E6;'
  );
  cssContent = cssContent.replace(
    /--yatiya-surface: #F5F0E6;/g,
    '--yatiya-surface: #101010;'
  );
  cssContent = cssContent.replace(
    /--yatiya-text: #0B0B0B;/g,
    '--yatiya-text: #F5F0E6;'
  );
  cssContent = cssContent.replace(
    /--yatiya-black: #080808;/g,
    '--yatiya-black: #080808;'
  );
  cssContent = cssContent.replace(
    /--yatiya-black-soft: #101010;/g,
    '--yatiya-black-soft: #101010;'
  );
  cssContent = cssContent.replace(
    /--yatiya-gold: #C6A15B;/g,
    '--yatiya-gold: #C6A15B;'
  );
  cssContent = cssContent.replace(
    /--yatiya-gold-light: #F0E4C5;/g,
    '--yatiya-gold-light: #E7D39D;'
  );
  cssContent = cssContent.replace(
    /--yatiya-muted: #8A806F;/g,
    '--yatiya-muted: #CFC6B5;'
  );
  cssContent = cssContent.replace(
    /--yatiya-border: #E8E2D9;/g,
    '--yatiya-border: rgba(198,161,91,0.45);'
  );

  // Set body to black
  cssContent = cssContent.replace(
    /body {\n\s+background-color: var\(--yatiya-ivory\);\n\s+color: var\(--yatiya-text\);/g,
    'body {\n  background-color: var(--yatiya-black);\n  color: var(--yatiya-text);'
  );

  fs.writeFileSync(cssPath, cssContent, 'utf8');
}

console.log('globals.css updated');
