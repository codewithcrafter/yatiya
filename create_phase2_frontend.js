const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. Data Layer
const mockDataContent = `
export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface MockCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  collectionIds: string[];
  price: number;
  salePrice?: number;
  discount?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  tags: string[];
}

export const mockCategories: MockCategory[] = [
  { id: 'cat-1', name: 'Bridal', slug: 'bridal', description: 'Exquisite bridal wear for your special day.', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=800&q=80' },
  { id: 'cat-2', name: 'Wedding', slug: 'wedding', description: 'Stunning outfits for wedding guests and family.', image: 'https://images.unsplash.com/photo-1594938298596-189f31b53e77?w=800&q=80' },
  { id: 'cat-3', name: 'Festive', slug: 'festive', description: 'Celebrate in style with our festive collection.', image: 'https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?w=800&q=80' },
  { id: 'cat-4', name: 'Party Wear', slug: 'party-wear', description: 'Glamorous evening and party wear.', image: 'https://images.unsplash.com/photo-1583391733958-d259728c1c46?w=800&q=80' },
  { id: 'cat-5', name: 'Designer', slug: 'designer', description: 'Exclusive designer pieces.', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80' },
];

export const mockCollections: MockCollection[] = [
  { id: 'col-1', name: 'New Arrivals', slug: 'new-arrivals', description: 'Discover our latest premium creations.', image: 'https://images.unsplash.com/photo-1610030469983-98e550d615e1?w=800&q=80' },
  { id: 'col-2', name: 'The Wedding Edit', slug: 'the-wedding-edit', description: 'Curated for the perfect wedding season.', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=800&q=80' },
  { id: 'col-3', name: 'Festive Gold', slug: 'festive-gold', description: 'Rich traditional tones for festive celebrations.', image: 'https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?w=800&q=80' },
];

export const mockProducts: MockProduct[] = Array.from({ length: 48 }).map((_, i) => {
  const cat = mockCategories[i % mockCategories.length];
  const isSale = i % 3 === 0;
  const price = 15000 + (i * 1000);
  const salePrice = isSale ? price * 0.8 : undefined;
  
  return {
    id: \`prod-\${i + 1}\`,
    name: \`Premium \${cat.name} \${i % 2 === 0 ? 'Lehenga' : 'Saree'} \${i + 1}\`,
    slug: \`premium-\${cat.slug}-\${i % 2 === 0 ? 'lehenga' : 'saree'}-\${i + 1}\`,
    description: 'A masterpiece of traditional craftsmanship blended with modern elegance. Perfect for your most special occasions.',
    categoryId: cat.id,
    collectionIds: [mockCollections[i % mockCollections.length].id, mockCollections[(i + 1) % mockCollections.length].id],
    price,
    salePrice,
    discount: isSale ? 20 : undefined,
    images: [
      cat.image,
      mockCategories[(i + 1) % mockCategories.length].image
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom'],
    colors: ['Gold', 'Ivory', 'Maroon', 'Champagne'],
    rating: 4 + (Math.random() * 1),
    reviews: Math.floor(Math.random() * 100) + 5,
    featured: i % 5 === 0,
    trending: i % 4 === 0,
    newArrival: i % 6 === 0,
    stockStatus: i % 10 === 0 ? 'LOW_STOCK' : 'IN_STOCK',
    tags: ['premium', cat.name.toLowerCase(), 'luxury']
  };
});

export const getProducts = () => mockProducts;
export const getCategories = () => mockCategories;
export const getCollections = () => mockCollections;
export const getCategoryBySlug = (slug: string) => mockCategories.find(c => c.slug === slug);
export const getCollectionBySlug = (slug: string) => mockCollections.find(c => c.slug === slug);
`;

const dataDir = path.join(baseDir, 'data');
ensureDir(dataDir);
fs.writeFileSync(path.join(dataDir, 'mockData.ts'), mockDataContent);

// 2. Components
const compDir = path.join(baseDir, 'components', 'shop');
ensureDir(compDir);

const productCardContent = `
import Link from 'next/link';
import { MockProduct } from '@/data/mockData';
import { SmartImage } from '@/components/ui/SmartImage';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

export function ProductCard({ product }: { product: MockProduct }) {
  return (
    <div className="group relative flex flex-col bg-white border border-[#E9E3DD]/50 hover:border-[#D5B873]/30 transition-all duration-300">
      <Link href={\`/product/\${product.slug}\`} className="relative aspect-[3/4] overflow-hidden bg-[#F7F0E8] block">
        <SmartImage 
          src={product.images[0]} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <span className="bg-[#641F32] text-white text-[10px] tracking-widest uppercase px-2 py-1">-{product.discount}%</span>
          )}
          {product.newArrival && (
            <span className="bg-[#C6A15B] text-white text-[10px] tracking-widest uppercase px-2 py-1">New</span>
          )}
        </div>
        
        {/* Quick Actions Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-4 translate-y-4 group-hover:translate-y-0">
          <button className="bg-white/90 hover:bg-white text-yatiya-black p-2 rounded-full transition-colors" title="Quick View">
            <Eye className="w-4 h-4" />
          </button>
          <button className="bg-[#C6A15B] hover:bg-[#B8944A] text-white p-2 rounded-full transition-colors" title="Add to Cart">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </Link>
      
      {/* Wishlist floating */}
      <button className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-10" title="Wishlist">
        <Heart className="w-5 h-5 drop-shadow-md" />
      </button>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[#C6A15B] text-[11px] uppercase tracking-widest mb-1">{product.tags[1]}</p>
        <Link href={\`/product/\${product.slug}\`} className="text-[14px] font-display text-yatiya-black hover:text-[#C6A15B] transition-colors line-clamp-2 mb-2 flex-grow">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-auto">
          {product.salePrice ? (
            <>
              <span className="text-[15px] font-sans font-medium text-yatiya-black">₹{product.salePrice.toLocaleString('en-IN')}</span>
              <span className="text-[12px] font-sans text-yatiya-black/50 line-through">₹{product.price.toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="text-[15px] font-sans font-medium text-yatiya-black">₹{product.price.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(compDir, 'ProductCard.tsx'), productCardContent);

const productGridContent = `
import { MockProduct } from '@/data/mockData';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: MockProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-yatiya-black/60">
        <p className="text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
`;
fs.writeFileSync(path.join(compDir, 'ProductGrid.tsx'), productGridContent);

const productSearchContent = `
import { Search } from 'lucide-react';

export function ProductSearch({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-md">
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search couture..." 
        className="w-full border-b border-[#D5B873] bg-transparent py-2 pl-8 pr-4 text-[13px] tracking-wide focus:outline-none focus:border-[#C6A15B] text-yatiya-black placeholder-yatiya-black/40"
      />
      <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D5B873]" />
    </div>
  );
}
`;
fs.writeFileSync(path.join(compDir, 'ProductSearch.tsx'), productSearchContent);

const productSortContent = `
export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling';

export function ProductSort({ value, onChange }: { value: SortOption, onChange: (v: SortOption) => void }) {
  return (
    <div className="flex items-center gap-3 text-[12px] tracking-widest uppercase">
      <span className="text-yatiya-black/60 hidden sm:inline-block">Sort By</span>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border-b border-[#D5B873] bg-transparent py-1 pr-6 focus:outline-none text-yatiya-black cursor-pointer appearance-none relative"
        style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23D5B873%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.2rem top 50%', backgroundSize: '0.65rem auto' }}
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
        <option value="best-selling">Best Selling</option>
      </select>
    </div>
  );
}
`;
fs.writeFileSync(path.join(compDir, 'ProductSort.tsx'), productSortContent);

const productFiltersContent = `
import { MockCategory, MockCollection } from '@/data/mockData';

export interface FilterState {
  category: string;
  collection: string;
  minPrice: number | '';
  maxPrice: number | '';
  sizes: string[];
  colors: string[];
}

export function ProductFilters({ 
  filters, 
  setFilters, 
  categories, 
  collections 
}: { 
  filters: FilterState, 
  setFilters: (f: FilterState) => void,
  categories: MockCategory[],
  collections: MockCollection[]
}) {
  const sizes = ['S', 'M', 'L', 'XL', 'Custom'];
  const colors = ['Gold', 'Ivory', 'Maroon', 'Champagne', 'Black', 'Blue', 'Green'];

  const toggleSize = (s: string) => {
    setFilters({ ...filters, sizes: filters.sizes.includes(s) ? filters.sizes.filter(x => x !== s) : [...filters.sizes, s] });
  };
  
  const toggleColor = (c: string) => {
    setFilters({ ...filters, colors: filters.colors.includes(c) ? filters.colors.filter(x => x !== c) : [...filters.colors, c] });
  };

  return (
    <div className="w-full space-y-10">
      {/* Categories */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-black mb-4 border-b border-[#E9E3DD] pb-2">Categories</h3>
        <div className="flex flex-col gap-2 text-[13px] text-yatiya-black/70">
          <label className="flex items-center gap-3 cursor-pointer hover:text-[#C6A15B] transition-colors">
            <input type="radio" name="cat" checked={filters.category === ''} onChange={() => setFilters({ ...filters, category: '' })} className="accent-[#C6A15B]" />
            <span>All Categories</span>
          </label>
          {categories.map(c => (
            <label key={c.id} className="flex items-center gap-3 cursor-pointer hover:text-[#C6A15B] transition-colors">
              <input type="radio" name="cat" checked={filters.category === c.id} onChange={() => setFilters({ ...filters, category: c.id })} className="accent-[#C6A15B]" />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-black mb-4 border-b border-[#E9E3DD] pb-2">Collections</h3>
        <div className="flex flex-col gap-2 text-[13px] text-yatiya-black/70">
          <label className="flex items-center gap-3 cursor-pointer hover:text-[#C6A15B] transition-colors">
            <input type="radio" name="col" checked={filters.collection === ''} onChange={() => setFilters({ ...filters, collection: '' })} className="accent-[#C6A15B]" />
            <span>All Collections</span>
          </label>
          {collections.map(c => (
            <label key={c.id} className="flex items-center gap-3 cursor-pointer hover:text-[#C6A15B] transition-colors">
              <input type="radio" name="col" checked={filters.collection === c.id} onChange={() => setFilters({ ...filters, collection: c.id })} className="accent-[#C6A15B]" />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-black mb-4 border-b border-[#E9E3DD] pb-2">Price</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-[#E9E3DD] bg-transparent p-2 text-[12px] focus:border-[#C6A15B] focus:outline-none" />
          <span className="text-yatiya-black/50">-</span>
          <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-[#E9E3DD] bg-transparent p-2 text-[12px] focus:border-[#C6A15B] focus:outline-none" />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-black mb-4 border-b border-[#E9E3DD] pb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(s => (
            <button key={s} onClick={() => toggleSize(s)} className={\`border px-3 py-1 text-[12px] transition-colors \${filters.sizes.includes(s) ? 'border-[#C6A15B] bg-[#C6A15B] text-white' : 'border-[#E9E3DD] text-yatiya-black hover:border-[#C6A15B]'}\`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      
      {/* Colors */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-black mb-4 border-b border-[#E9E3DD] pb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(c => (
            <button key={c} onClick={() => toggleColor(c)} className={\`border px-3 py-1 text-[12px] transition-colors \${filters.colors.includes(c) ? 'border-[#C6A15B] bg-[#C6A15B] text-white' : 'border-[#E9E3DD] text-yatiya-black hover:border-[#C6A15B]'}\`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      
      <button onClick={() => setFilters({ category: '', collection: '', minPrice: '', maxPrice: '', sizes: [], colors: [] })} className="w-full py-3 text-[11px] tracking-widest uppercase border border-yatiya-black/20 text-yatiya-black hover:bg-yatiya-black hover:text-white transition-colors">
        Clear All Filters
      </button>
    </div>
  );
}
`;
fs.writeFileSync(path.join(compDir, 'ProductFilters.tsx'), productFiltersContent);

const categoryCardContent = `
import Link from 'next/link';
import { MockCategory } from '@/data/mockData';
import { SmartImage } from '@/components/ui/SmartImage';

export function CategoryCard({ category, isCollection = false }: { category: MockCategory | any, isCollection?: boolean }) {
  const link = isCollection ? \`/collections/\${category.slug}\` : \`/categories/\${category.slug}\`;
  return (
    <Link href={link} className="group relative block aspect-[3/4] overflow-hidden bg-[#F7F0E8]">
      <SmartImage src={category.image} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl md:text-3xl font-display uppercase tracking-widest text-white mb-3 drop-shadow-md">{category.name}</h2>
        <p className="text-[13px] font-sans text-white/90 mb-6 drop-shadow-md max-w-sm hidden md:block">{category.description}</p>
        <span className="text-[11px] tracking-widest uppercase border-b border-white text-white pb-1 group-hover:border-[#C6A15B] group-hover:text-[#C6A15B] transition-colors">
          Explore
        </span>
      </div>
    </Link>
  );
}
`;
fs.writeFileSync(path.join(compDir, 'CategoryCard.tsx'), categoryCardContent);

const breadcrumbContent = `
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ items }: { items: { label: string, href?: string }[] }) {
  return (
    <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-yatiya-black/60 mb-8">
      <Link href="/" className="hover:text-[#C6A15B] transition-colors">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-yatiya-black/30" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#C6A15B] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-yatiya-black">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
`;
fs.writeFileSync(path.join(compDir, 'Breadcrumb.tsx'), breadcrumbContent);

// 3. Pages Content
const productsPageContent = `
"use client";

import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/shop/Breadcrumb';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ProductFilters, FilterState } from '@/components/shop/ProductFilters';
import { ProductSort, SortOption } from '@/components/shop/ProductSort';
import { ProductSearch } from '@/components/shop/ProductSearch';
import { getProducts, getCategories, getCollections } from '@/data/mockData';
import { SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
  const allProducts = getProducts();
  const categories = getCategories();
  const collections = getCollections();

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    collection: '',
    minPrice: '',
    maxPrice: '',
    sizes: [],
    colors: []
  });
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = allProducts;
    
    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    
    // Filters
    if (filters.category) result = result.filter(p => p.categoryId === filters.category);
    if (filters.collection) result = result.filter(p => p.collectionIds.includes(filters.collection));
    if (filters.minPrice !== '') result = result.filter(p => (p.salePrice || p.price) >= (filters.minPrice as number));
    if (filters.maxPrice !== '') result = result.filter(p => (p.salePrice || p.price) <= (filters.maxPrice as number));
    if (filters.sizes.length > 0) result = result.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    if (filters.colors.length > 0) result = result.filter(p => p.colors.some(c => filters.colors.includes(c)));
    
    // Sort
    switch(sort) {
      case 'price-asc': result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)); break;
      case 'price-desc': result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)); break;
      case 'newest': result.sort((a, b) => a.newArrival ? -1 : 1); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'best-selling': result.sort((a, b) => b.reviews - a.reviews); break;
      case 'featured': result.sort((a, b) => a.featured ? -1 : 1); break;
    }
    
    return result;
  }, [allProducts, search, filters, sort]);

  const visibleProducts = filteredProducts.slice(0, page * perPage);
  const hasMore = visibleProducts.length < filteredProducts.length;

  return (
    <div className="min-h-screen bg-yatiya-ivory">
      {/* Header Banner */}
      <div className="bg-[#E9E3DD] py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-[#641F32]">Shop All</h1>
          <p className="mt-4 text-[13px] text-yatiya-black/70 tracking-widest uppercase">Premium Indian Couture</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: 'Products' }]} />
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-[#E9E3DD]">
          <div className="flex-1 w-full md:w-auto flex items-center justify-between md:justify-start gap-4">
            <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="md:hidden flex items-center gap-2 text-[12px] tracking-widest uppercase border border-yatiya-black/20 px-4 py-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <ProductSearch value={search} onChange={setSearch} />
          </div>
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6">
            <span className="text-[12px] tracking-widest text-yatiya-black/60 hidden md:inline-block">{filteredProducts.length} Results</span>
            <ProductSort value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className={\`w-full md:w-64 flex-shrink-0 \${showMobileFilters ? 'block' : 'hidden md:block'}\`}>
            <ProductFilters filters={filters} setFilters={setFilters} categories={categories} collections={collections} />
          </div>
          
          {/* Grid */}
          <div className="flex-1">
            <ProductGrid products={visibleProducts} />
            
            {hasMore && (
              <div className="mt-16 text-center">
                <button onClick={() => setPage(p => p + 1)} className="bg-transparent border border-yatiya-black text-yatiya-black hover:bg-yatiya-black hover:text-white px-10 py-3 text-[12px] tracking-widest uppercase transition-colors">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const categoriesPageContent = `
"use client";
import { getCategories } from '@/data/mockData';
import { CategoryCard } from '@/components/shop/CategoryCard';
import { Breadcrumb } from '@/components/shop/Breadcrumb';

export default function CategoriesPage() {
  const categories = getCategories();
  
  return (
    <div className="min-h-screen bg-yatiya-ivory">
      <div className="bg-[#E9E3DD] py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-[#641F32]">Categories</h1>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: 'Categories' }]} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}
`;

const collectionsPageContent = `
"use client";
import { getCollections } from '@/data/mockData';
import { CategoryCard } from '@/components/shop/CategoryCard';
import { Breadcrumb } from '@/components/shop/Breadcrumb';

export default function CollectionsPage() {
  const collections = getCollections();
  
  return (
    <div className="min-h-screen bg-yatiya-ivory">
      <div className="bg-[#E9E3DD] py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-[#641F32]">Collections</h1>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: 'Collections' }]} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(col => (
            <CategoryCard key={col.id} category={col} isCollection={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
`;

const slugPageTemplate = (type) => `
"use client";
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/shop/Breadcrumb';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ProductSort, SortOption } from '@/components/shop/ProductSort';
import { getProducts, get${type}BySlug } from '@/data/mockData';

export default function SlugPage() {
  const { slug } = useParams();
  const entity = get${type}BySlug(slug as string);
  const allProducts = getProducts();
  
  const [sort, setSort] = useState<SortOption>('featured');
  
  const products = useMemo(() => {
    if (!entity) return [];
    let result = allProducts.filter(p => ${type === 'Category' ? 'p.categoryId === entity.id' : 'p.collectionIds.includes(entity.id)'});
    
    switch(sort) {
      case 'price-asc': result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)); break;
      case 'price-desc': result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)); break;
      case 'newest': result.sort((a, b) => a.newArrival ? -1 : 1); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'best-selling': result.sort((a, b) => b.reviews - a.reviews); break;
      case 'featured': result.sort((a, b) => a.featured ? -1 : 1); break;
    }
    return result;
  }, [entity, sort, allProducts]);

  if (!entity) return <div className="py-32 text-center">Not Found</div>;

  return (
    <div className="min-h-screen bg-yatiya-ivory">
      {/* Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-[#E9E3DD]">
        <img src={entity.image} alt={entity.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-white drop-shadow-lg">{entity.name}</h1>
          <p className="mt-4 max-w-lg text-[14px] text-white/90 drop-shadow-md">{entity.description}</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: '${type === 'Category' ? 'Categories' : 'Collections'}', href: '/${type === 'Category' ? 'categories' : 'collections'}' }, { label: entity.name }]} />
        
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E9E3DD]">
          <span className="text-[12px] tracking-widest text-yatiya-black/60 uppercase">{products.length} Products</span>
          <ProductSort value={sort} onChange={setSort} />
        </div>
        
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
`;

// Write Pages
ensureDir(path.join(baseDir, 'app', 'products'));
fs.writeFileSync(path.join(baseDir, 'app', 'products', 'page.tsx'), productsPageContent);

ensureDir(path.join(baseDir, 'app', 'categories'));
fs.writeFileSync(path.join(baseDir, 'app', 'categories', 'page.tsx'), categoriesPageContent);
ensureDir(path.join(baseDir, 'app', 'categories', '[slug]'));
fs.writeFileSync(path.join(baseDir, 'app', 'categories', '[slug]', 'page.tsx'), slugPageTemplate('Category'));

ensureDir(path.join(baseDir, 'app', 'collections'));
fs.writeFileSync(path.join(baseDir, 'app', 'collections', 'page.tsx'), collectionsPageContent);
ensureDir(path.join(baseDir, 'app', 'collections', '[slug]'));
fs.writeFileSync(path.join(baseDir, 'app', 'collections', '[slug]', 'page.tsx'), slugPageTemplate('Collection'));

console.log('Frontend Phase 2 Created.');
