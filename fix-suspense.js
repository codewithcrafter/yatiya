const fs = require('fs');
let content = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');

content = content.replace("export default function CheckoutPage() {", `import { Suspense } from 'react';\n\nfunction CheckoutContent() {`);

content += `\n\nexport default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCFAF7]"></div>}>
      <CheckoutContent />
    </Suspense>
  );
}\n`;

fs.writeFileSync('src/app/checkout/page.tsx', content);
console.log("Suspense added!");
