
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
      <div className="bg-yatiya-light-gold py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-yatiya-burgundy">Shop All</h1>
          <p className="mt-4 text-[13px] text-yatiya-dark-cocoa/70 tracking-widest uppercase">Premium Indian Couture</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: 'Products' }]} />
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-yatiya-light-gold">
          <div className="flex-1 w-full md:w-auto flex items-center justify-between md:justify-start gap-4">
            <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="md:hidden flex items-center gap-2 text-[12px] tracking-widest uppercase border border-yatiya-antique-gold/20 px-4 py-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <ProductSearch value={search} onChange={setSearch} />
          </div>
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6">
            <span className="text-[12px] tracking-widest text-yatiya-dark-cocoa/60 hidden md:inline-block">{filteredProducts.length} Results</span>
            <ProductSort value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className={`w-full md:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
            <ProductFilters filters={filters} setFilters={setFilters} categories={categories} collections={collections} />
          </div>
          
          {/* Grid */}
          <div className="flex-1">
            <ProductGrid products={visibleProducts} />
            
            {hasMore && (
              <div className="mt-16 text-center">
                <button onClick={() => setPage(p => p + 1)} className="bg-transparent border border-yatiya-antique-gold text-yatiya-dark-cocoa hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text px-10 py-3 text-[12px] tracking-widest uppercase transition-colors">
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
