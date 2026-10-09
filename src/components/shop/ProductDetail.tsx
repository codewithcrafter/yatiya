"use client";

import { useState } from 'react';
import { MockProduct, getProducts, mockCategories, mockCollections } from '@/data/mockData';
import { SmartImage } from '@/components/ui/SmartImage';
import { Heart, Minus, Plus, Truck, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { ProductGrid } from './ProductGrid';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export function ProductDetail({ product }: { product: MockProduct }) {
  const { items, addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors.length > 0 ? product.colors[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryMsg, setDeliveryMsg] = useState('');
  const [cartMsg, setCartMsg] = useState('');
  const [expandedSection, setExpandedSection] = useState<string>('description');
  
  const [customMeasurements, setCustomMeasurements] = useState({
    bust: '',
    waist: '',
    hip: '',
    shoulder: '',
    sleeveLength: '',
    blouseLength: '',
    lehengaLength: '',
    specialRequirement: ''
  });
  
  const handleMeasurementChange = (field: keyof typeof customMeasurements, value: string) => {
    setCustomMeasurements(prev => ({ ...prev, [field]: value }));
  };
  
  // Find related products (same category, exclude current)
  const allProducts = getProducts();
  const relatedProducts = allProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const category = mockCategories.find(c => c.id === product.categoryId);
  const collections = product.collectionIds ? mockCollections.filter(c => product.collectionIds.includes(c.id)) : [];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setCartMsg('Please select a size before adding to cart.');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      setCartMsg('Please select a color before adding to cart.');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }
    if (product.stockStatus === 'OUT_OF_STOCK') {
      setCartMsg('Sorry, this product is currently out of stock.');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }

    let itemId = `${product.id}-${selectedSize || 'nosize'}-${selectedColor || 'nocolor'}`;
    if (selectedSize === 'Customise Size') {
      itemId = `${itemId}-${Date.now()}`;
    }
    
    const existingItem = items.find(i => i.id === itemId);
    if (existingItem && existingItem.quantity + quantity > 5) {
      setCartMsg('Only 5 items available');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }
    
    const measurements = selectedSize === 'Customise Size' ? customMeasurements : undefined;

    addItem({
      id: itemId,
      productId: product.id,
      title: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
      slug: product.slug,
      customMeasurements: measurements
    } as any);

    setCartMsg('Added to cart successfully');
    setTimeout(() => setCartMsg(''), 3000);
  };

  const handleBuyNow = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setCartMsg('Please select a size to proceed.');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      setCartMsg('Please select a color to proceed.');
      setTimeout(() => setCartMsg(''), 3000);
      return;
    }
    if (product.stockStatus === 'OUT_OF_STOCK') return;
    
    const measurements = selectedSize === 'Customise Size' ? customMeasurements : undefined;
    
    // Set checkout item in session storage for buy now flow
    let itemId = `${product.id}-${selectedSize || 'nosize'}-${selectedColor || 'nocolor'}`;
    if (selectedSize === 'Customise Size') {
      itemId = `${itemId}-${Date.now()}`;
    }

    const buyNowItem = {
      id: itemId,
      productId: product.id,
      title: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
      slug: product.slug,
      customMeasurements: measurements
    };
    sessionStorage.setItem('yatiya-buynow', JSON.stringify(buyNowItem));
    
    window.location.href = '/checkout?type=buynow';
  };

  const checkDelivery = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryMsg('Delivery available in 3-5 business days.');
    } else {
      setDeliveryMsg('Please enter a valid 6-digit pincode.');
    }
  };
  
  const inStock = product.stockStatus !== 'OUT_OF_STOCK';

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb items={[
        { label: category ? category.name : 'Products', href: category ? `/categories/${category.slug}` : '/products' },
        { label: product.name }
      ]} />

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20 mt-8">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full bg-yatiya-ivory overflow-hidden group">
            {product.images[selectedImage] ? (
              <SmartImage src={product.images[selectedImage]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-yatiya-dark-cocoa/30">No Image</div>
            )}
            {product.discount && (
              <span className="absolute top-4 left-4 bg-yatiya-burgundy text-yatiya-light-text text-[11px] tracking-widest uppercase px-3 py-1 z-10">
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
                  className={`relative w-20 aspect-[3/4] flex-shrink-0 bg-yatiya-ivory overflow-hidden border-2 transition-colors ${selectedImage === idx ? 'border-yatiya-roman-gold' : 'border-transparent'}`}
                >
                  <SmartImage src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {category && (
              <Link href={`/categories/${category.slug}`} className="text-yatiya-roman-gold text-[12px] uppercase tracking-widest hover:underline">
                {category.name}
              </Link>
            )}
            {collections.map(col => (
              <span key={col.id} className="text-yatiya-roman-gold/50 text-[12px]">|</span>
            ))}
            {collections.map(col => (
              <Link key={col.id} href={`/collections/${col.slug}`} className="text-yatiya-dark-cocoa/60 text-[12px] uppercase tracking-widest hover:text-yatiya-roman-gold hover:underline">
                {col.name}
              </Link>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-display text-yatiya-dark-cocoa mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yatiya-roman-gold">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'fill-current' : 'text-yatiya-light-gold'}`} />
              ))}
            </div>
            <span className="text-[12px] font-sans text-yatiya-dark-cocoa/60">
              {product.rating.toFixed(1)} ({product.reviews} Reviews)
            </span>
          </div>
          
          <div className="flex items-end gap-3 mb-6 pb-6 border-b border-yatiya-light-gold">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-sans font-medium text-yatiya-antique-gold">₹{product.salePrice.toLocaleString('en-IN')}</span>
                <span className="text-lg font-sans text-yatiya-deep-brown line-through mb-1">₹{product.price.toLocaleString('en-IN')}</span>
              </>
            ) : (
              <span className="text-2xl font-sans font-medium text-yatiya-antique-gold">₹{product.price.toLocaleString('en-IN')}</span>
            )}
            
            <div className="ml-auto">
              <span className={`text-[11px] uppercase tracking-widest px-3 py-1 font-medium ${
                product.stockStatus === 'IN_STOCK' ? 'text-green-700 bg-green-50 border border-green-200' : 
                product.stockStatus === 'LOW_STOCK' ? 'text-amber-700 bg-amber-50 border border-amber-200' : 
                'text-red-700 bg-red-50 border border-red-200'
              }`}>
                {product.stockStatus.replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <p className="text-[14px] text-yatiya-deep-brown font-sans leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="bg-yatiya-ivory text-yatiya-dark-cocoa/70 text-[11px] uppercase tracking-widest px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa mb-3">
                Color: <span className="text-yatiya-dark-cocoa/60 ml-1">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`border px-4 py-2 text-[12px] uppercase tracking-wider transition-colors ${selectedColor === color ? 'border-yatiya-roman-gold bg-yatiya-ivory text-yatiya-burgundy' : 'border-yatiya-light-gold text-yatiya-dark-cocoa hover:border-yatiya-roman-gold'}`}
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
                <h3 className="text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa">Size</h3>
                <button className="text-[11px] uppercase tracking-widest text-yatiya-dark-cocoa/60 underline hover:text-yatiya-roman-gold">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border min-w-[3rem] px-3 py-2 text-[13px] font-medium transition-colors ${selectedSize === size ? 'border-yatiya-antique-gold bg-yatiya-antique-gold text-yatiya-light-text' : 'bg-transparent border-yatiya-light-gold text-yatiya-dark-cocoa hover:border-yatiya-antique-gold'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize === 'Customise Size' && (
                <div className="mt-4 p-4 border border-yatiya-roman-gold bg-yatiya-ivory/30">
                  <h4 className="text-[12px] uppercase tracking-widest text-yatiya-roman-gold mb-3">Enter Your Measurements (in inches)</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { label: 'Bust', field: 'bust' },
                      { label: 'Waist', field: 'waist' },
                      { label: 'Hip', field: 'hip' },
                      { label: 'Shoulder', field: 'shoulder' },
                      { label: 'Sleeve Length', field: 'sleeveLength' },
                      { label: 'Blouse Length', field: 'blouseLength' },
                      { label: 'Lehenga Length', field: 'lehengaLength' }
                    ].map(item => (
                      <div key={item.field}>
                        <label className="block text-[11px] text-yatiya-dark-cocoa/70 uppercase tracking-widest mb-1">{item.label}</label>
                        <input 
                          type="text" 
                          value={customMeasurements[item.field as keyof typeof customMeasurements]}
                          onChange={(e) => handleMeasurementChange(item.field as keyof typeof customMeasurements, e.target.value)}
                          className="w-full border border-yatiya-light-gold p-2 text-[13px] focus:outline-none focus:border-yatiya-roman-gold"
                          placeholder="e.g. 34"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[11px] text-yatiya-dark-cocoa/70 uppercase tracking-widest mb-1">Any Special Requirement</label>
                    <textarea 
                      value={customMeasurements.specialRequirement}
                      onChange={(e) => handleMeasurementChange('specialRequirement', e.target.value)}
                      className="w-full border border-yatiya-light-gold p-2 text-[13px] focus:outline-none focus:border-yatiya-roman-gold min-h-[60px]"
                      placeholder="Optional notes..."
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa mb-3">Quantity</h3>
            <div className="flex items-center border border-yatiya-light-gold w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-yatiya-dark-cocoa/60 hover:text-yatiya-dark-cocoa hover:bg-yatiya-ivory transition-colors" disabled={!inStock}>
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-[14px] font-medium min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-yatiya-dark-cocoa/60 hover:text-yatiya-dark-cocoa hover:bg-yatiya-ivory transition-colors" disabled={!inStock || quantity >= 5}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          {cartMsg && (
            <div className={`mb-4 p-4 text-[13px] border ${cartMsg.includes('Sorry') || cartMsg.includes('Please') ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
              {cartMsg}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 py-4 bg-yatiya-antique-gold border border-yatiya-antique-gold text-yatiya-light-text text-[12px] font-medium uppercase tracking-widest hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="p-4 border border-yatiya-light-gold text-yatiya-dark-cocoa hover:border-yatiya-antique-gold hover:text-yatiya-antique-gold transition-colors bg-transparent"
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-yatiya-roman-gold text-yatiya-roman-gold' : ''}`} />
              </button>
            </div>
            <button 
              onClick={handleBuyNow}
              disabled={!inStock}
              className="w-full py-4 bg-yatiya-deep-bronze border border-yatiya-deep-bronze text-yatiya-light-text text-[12px] font-medium uppercase tracking-widest hover:bg-yatiya-dark-cocoa hover:border-yatiya-dark-cocoa transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy It Now
            </button>
          </div>

          {/* Delivery */}
          <div className="bg-yatiya-ivory/50 border border-yatiya-light-gold p-5 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-yatiya-roman-gold" />
              <h3 className="text-[13px] uppercase tracking-widest text-yatiya-dark-cocoa font-medium">Check Delivery</h3>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="Enter Pincode" 
                className="flex-1 border border-yatiya-light-gold bg-yatiya-cream px-4 py-3 text-[13px] focus:outline-none focus:border-yatiya-roman-gold"
                maxLength={6}
              />
              <button onClick={checkDelivery} className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-6 py-3 text-[11px] uppercase tracking-widest hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
                Check
              </button>
            </div>
            {deliveryMsg && <p className="mt-3 text-[12px] text-yatiya-dark-cocoa/70 font-sans">{deliveryMsg}</p>}
          </div>

          {/* Accordion Details */}
          <div className="border-t border-yatiya-light-gold">
            {[
              { id: 'description', title: 'Product Details', content: (
                <ul className="list-disc pl-5 space-y-2 marker:text-yatiya-roman-gold">
                  {product.details?.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              )},
              { id: 'fabric', title: 'Fabric & Care', content: (
                <div className="space-y-4">
                  <p><strong className="text-yatiya-dark-cocoa font-medium">Fabric:</strong> {product.fabric}</p>
                  <p><strong className="text-yatiya-dark-cocoa font-medium">Care:</strong> {product.care}</p>
                </div>
              )},
              { id: 'fit', title: 'Fit & Sizing', content: <p>{product.fit}</p> },
              { id: 'shipping', title: 'Shipping & Returns', content: <p>Free shipping on orders above ₹10,000. Easy 7-day returns for eligible items. Custom orders are non-returnable.</p> }
            ].map(section => (
              <div key={section.id} className="border-b border-yatiya-light-gold">
                <button 
                  onClick={() => setExpandedSection(expandedSection === section.id ? '' : section.id)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-[12px] font-medium uppercase tracking-widest text-yatiya-dark-cocoa group-hover:text-yatiya-roman-gold transition-colors">{section.title}</span>
                  {expandedSection === section.id ? <ChevronUp className="w-4 h-4 text-yatiya-roman-gold" /> : <ChevronDown className="w-4 h-4 text-yatiya-dark-cocoa/40 group-hover:text-yatiya-roman-gold transition-colors" />}
                </button>
                {expandedSection === section.id && (
                  <div className="pb-5 text-[14px] font-sans text-yatiya-dark-cocoa/70 leading-relaxed">
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
        <div className="mt-24 border-t border-yatiya-light-gold pt-16">
          <h2 className="text-2xl md:text-3xl font-display text-center uppercase tracking-widest text-yatiya-burgundy mb-12">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
