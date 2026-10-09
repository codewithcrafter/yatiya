const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. Update Mock Data to add extended details (fabric, care, etc.)
const mockDataPath = path.join(baseDir, 'data', 'mockData.ts');
let mockData = fs.readFileSync(mockDataPath, 'utf8');

if (!mockData.includes('fabric: string;')) {
  mockData = mockData.replace(
    'tags: string[];',
    \`tags: string[];
  fabric?: string;
  care?: string;
  details?: string[];
  fit?: string;\`
  );
  
  mockData = mockData.replace(
    /stockStatus: (.*?),\n\s*tags:/g,
    \`stockStatus: $1,
    fabric: i % 2 === 0 ? 'Premium Silk Organza' : 'Handwoven Banarasi Silk',
    care: 'Dry clean only. Do not bleach. Store in a cool, dry place away from direct sunlight.',
    fit: 'True to size. The model is 5\\\\'8\\" and is wearing a size S.',
    details: [
      'Hand-embroidered zari work',
      'Intricate traditional motifs',
      'Includes matching unstitched blouse piece',
      'Premium inner lining for comfort'
    ],
    tags:\`
  );
  
  mockData = mockData.replace(
    \`export const getProductBySlug = \`,
    \`\`
  );
  
  mockData += \`\nexport const getProductBySlug = (slug: string) => mockProducts.find(p => p.slug === slug);\`;
  
  fs.writeFileSync(mockDataPath, mockData);
}


// 2. Create Product Details Component
const compDir = path.join(baseDir, 'components', 'shop');
ensureDir(compDir);

const productDetailContent = \`
"use client";

import { useState } from 'react';
import { MockProduct, getProducts, getCategoryBySlug, mockCategories } from '@/data/mockData';
import { SmartImage } from '@/components/ui/SmartImage';
import { Heart, Minus, Plus, Truck, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { ProductGrid } from './ProductGrid';

export function ProductDetail({ product }: { product: MockProduct }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors.length > 0 ? product.colors[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryMsg, setDeliveryMsg] = useState('');
  const [cartMsg, setCartMsg] = useState('');
  const [expandedSection, setExpandedSection] = useState<string>('description');
  
  // Find related products (same category, exclude current)
  const allProducts = getProducts();
  const relatedProducts = allProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const category = mockCategories.find(c => c.id === product.categoryId);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setCartMsg('Please select a size before adding to cart.');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }
    if (product.stockStatus === 'OUT_OF_STOCK') {
      setCartMsg('Sorry, this product is currently out of stock.');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }
    setCartMsg('Successfully added to your cart!');
    setTimeout(() => setCartMsg(''), 3000);
  };

  const handleBuyNow = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setCartMsg('Please select a size to proceed.');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }
    if (product.stockStatus === 'OUT_OF_STOCK') return;
    window.location.href = '/checkout';
  };

  const checkDelivery = () => {
    if (pincode.length === 6 && /^\\d+$/.test(pincode)) {
      setDeliveryMsg('Delivery available in 3-5 business days.');
    } else {
      setDeliveryMsg('Please enter a valid 6-digit pincode.');
    }
  };
  
  const inStock = product.stockStatus !== 'OUT_OF_STOCK';

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb items={[
        { label: category ? category.name : 'Products', href: category ? \`/categories/\${category.slug}\` : '/products' },
        { label: product.name }
      ]} />

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full bg-[#F7F0E8] overflow-hidden">
            {product.images[selectedImage] ? (
              <SmartImage src={product.images[selectedImage]} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-yatiya-black/30">No Image</div>
            )}
            {product.discount && (
              <span className="absolute top-4 left-4 bg-[#641F32] text-white text-[11px] tracking-widest uppercase px-3 py-1">
                -{product.discount}%
              </span>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(idx)}
                  className={\`relative w-20 aspect-[3/4] flex-shrink-0 bg-[#F7F0E8] overflow-hidden border-2 transition-colors \${selectedImage === idx ? 'border-[#C6A15B]' : 'border-transparent'}\`}
                >
                  <SmartImage src={img} alt={\`Thumbnail \${idx}\`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <p className="text-[#C6A15B] text-[12px] uppercase tracking-widest mb-2">{category?.name}</p>
          <h1 className="text-3xl md:text-4xl font-display text-yatiya-black mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-[#C6A15B]">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={\`w-4 h-4 \${star <= Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}\`} />
              ))}
            </div>
            <span className="text-[12px] font-sans text-yatiya-black/60">
              {product.rating.toFixed(1)} ({product.reviews} Reviews)
            </span>
          </div>
          
          <div className="flex items-end gap-3 mb-6 pb-6 border-b border-[#E9E3DD]">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-sans font-medium text-yatiya-black">₹{product.salePrice.toLocaleString('en-IN')}</span>
                <span className="text-lg font-sans text-yatiya-black/50 line-through mb-1">₹{product.price.toLocaleString('en-IN')}</span>
              </>
            ) : (
              <span className="text-2xl font-sans font-medium text-yatiya-black">₹{product.price.toLocaleString('en-IN')}</span>
            )}
            
            <div className="ml-auto">
              <span className={\`text-[11px] uppercase tracking-widest px-2 py-1 \${inStock ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}\`}>
                {product.stockStatus.replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <p className="text-[14px] text-yatiya-black/80 font-sans leading-relaxed mb-8">
            {product.description}
          </p>
          
          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[12px] uppercase tracking-widest text-yatiya-black mb-3">
                Color: <span className="text-yatiya-black/60">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={\`border px-4 py-2 text-[12px] transition-colors \${selectedColor === color ? 'border-[#C6A15B] bg-[#F7F0E8] text-[#641F32]' : 'border-[#E9E3DD] text-yatiya-black hover:border-[#C6A15B]'}\`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[12px] uppercase tracking-widest text-yatiya-black">Size</h3>
                <button className="text-[11px] uppercase tracking-widest text-yatiya-black/60 underline hover:text-[#C6A15B]">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={\`border min-w-[3rem] px-3 py-2 text-[13px] font-medium transition-colors \${selectedSize === size ? 'border-[#C6A15B] bg-[#C6A15B] text-white' : 'border-[#E9E3DD] text-yatiya-black hover:border-[#C6A15B]'}\`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-[12px] uppercase tracking-widest text-yatiya-black mb-3">Quantity</h3>
            <div className="flex items-center border border-[#E9E3DD] w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-yatiya-black/60 hover:text-yatiya-black hover:bg-[#F7F0E8] transition-colors" disabled={!inStock}>
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-[14px] font-medium min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-yatiya-black/60 hover:text-yatiya-black hover:bg-[#F7F0E8] transition-colors" disabled={!inStock}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          {cartMsg && (
            <div className={\`mb-4 p-3 text-[13px] border \${cartMsg.includes('Sorry') || cartMsg.includes('Please') ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}\`}>
              {cartMsg}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 py-4 bg-transparent border border-yatiya-black text-yatiya-black text-[12px] uppercase tracking-widest hover:bg-[#F7F0E8] hover:border-[#C6A15B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-4 border border-[#E9E3DD] text-yatiya-black hover:border-[#C6A15B] hover:text-[#C6A15B] transition-colors"
                title="Wishlist"
              >
                <Heart className={\`w-5 h-5 \${isWishlisted ? 'fill-[#C6A15B] text-[#C6A15B]' : ''}\`} />
              </button>
            </div>
            <button 
              onClick={handleBuyNow}
              disabled={!inStock}
              className="w-full py-4 bg-yatiya-black border border-yatiya-black text-white text-[12px] uppercase tracking-widest hover:bg-[#C6A15B] hover:border-[#C6A15B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy It Now
            </button>
          </div>

          {/* Delivery */}
          <div className="bg-[#F7F0E8]/50 border border-[#E9E3DD] p-5 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-[#C6A15B]" />
              <h3 className="text-[13px] uppercase tracking-widest text-yatiya-black">Check Delivery</h3>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="Enter Pincode" 
                className="flex-1 border border-[#E9E3DD] bg-white px-3 py-2 text-[13px] focus:outline-none focus:border-[#C6A15B]"
                maxLength={6}
              />
              <button onClick={checkDelivery} className="bg-yatiya-black text-white px-4 py-2 text-[11px] uppercase tracking-widest">
                Check
              </button>
            </div>
            {deliveryMsg && <p className="mt-3 text-[12px] text-yatiya-black/70">{deliveryMsg}</p>}
          </div>

          {/* Accordion Details */}
          <div className="border-t border-[#E9E3DD]">
            {[
              { id: 'description', title: 'Product Details', content: (
                <ul className="list-disc pl-4 space-y-2">
                  {product.details?.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              )},
              { id: 'fabric', title: 'Fabric & Care', content: (
                <div className="space-y-4">
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p><strong>Care:</strong> {product.care}</p>
                </div>
              )},
              { id: 'fit', title: 'Fit & Sizing', content: <p>{product.fit}</p> },
              { id: 'shipping', title: 'Shipping & Returns', content: <p>Free shipping on orders above ₹10,000. Easy 7-day returns for eligible items. Custom orders are non-returnable.</p> }
            ].map(section => (
              <div key={section.id} className="border-b border-[#E9E3DD]">
                <button 
                  onClick={() => setExpandedSection(expandedSection === section.id ? '' : section.id)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-[13px] uppercase tracking-widest text-yatiya-black">{section.title}</span>
                  {expandedSection === section.id ? <ChevronUp className="w-4 h-4 text-[#C6A15B]" /> : <ChevronDown className="w-4 h-4 text-yatiya-black/40" />}
                </button>
                {expandedSection === section.id && (
                  <div className="pb-4 text-[13px] font-sans text-yatiya-black/70 leading-relaxed">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t border-[#E9E3DD] pt-16">
          <h2 className="text-2xl md:text-3xl font-display text-center uppercase tracking-widest text-[#641F32] mb-12">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
\`;

fs.writeFileSync(path.join(compDir, 'ProductDetail.tsx'), productDetailContent);


// 3. Create Page File
ensureDir(path.join(baseDir, 'app', 'product', '[slug]'));

const pageContent = \`
"use client";
import { useParams } from 'next/navigation';
import { getProductBySlug } from '@/data/mockData';
import { ProductDetail } from '@/components/shop/ProductDetail';

export default function ProductSlugPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug as string);

  if (!product) {
    return (
      <div className="min-h-screen bg-yatiya-ivory flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest text-[#641F32] mb-6">Not Found</h1>
        <p className="text-[14px] text-yatiya-black/70 font-sans max-w-md mx-auto mb-10">
          The product you are looking for does not exist or has been removed.
        </p>
        <a href="/products" className="border border-yatiya-black px-8 py-3 text-[12px] uppercase tracking-widest hover:bg-yatiya-black hover:text-white transition-colors">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yatiya-ivory">
      <ProductDetail product={product} />
    </div>
  );
}
\`;

fs.writeFileSync(path.join(baseDir, 'app', 'product', '[slug]', 'page.tsx'), pageContent);

console.log('Phase 3 - Product Detail Frontend Created.');
