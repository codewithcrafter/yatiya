const fs = require('fs');
let content = fs.readFileSync('src/components/header/Header.tsx', 'utf8');

content = content.replace(/  const \{ getCartCount \} = useCart\(\);\r?\n  const cartCount = getCartCount\(\);\r?\n/, '');
content = content.replace('import { useCart } from "@/context/CartContext";', 'import { useCart } from "@/context/CartContext";\nimport { useWishlist } from "@/context/WishlistContext";');

fs.writeFileSync('src/components/header/Header.tsx', content);
