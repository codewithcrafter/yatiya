
"use client";
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/shop/Breadcrumb';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ProductSort, SortOption } from '@/components/shop/ProductSort';
import { getProducts, getCategoryBySlug } from '@/data/mockData';

export default function SlugPage() {
  const { slug } = useParams();
  const entity = getCategoryBySlug(slug as string);
  const allProducts = getProducts();
  
  const [sort, setSort] = useState<SortOption>('featured');
  
  const products = useMemo(() => {
    if (!entity) return [];
    let result = allProducts.filter(p => p.categoryId === entity.id);
    
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
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-yatiya-light-gold">
        <img src={entity.image} alt={entity.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-yatiya-deep-brown/60 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-yatiya-light-text drop-shadow-lg">{entity.name}</h1>
          <p className="mt-4 max-w-lg text-[14px] text-yatiya-light-text/90 drop-shadow-md">{entity.description}</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: 'Categories', href: '/categories' }, { label: entity.name }]} />
        
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-yatiya-light-gold">
          <span className="text-[12px] tracking-widest text-yatiya-dark-cocoa/60 uppercase">{products.length} Products</span>
          <ProductSort value={sort} onChange={setSort} />
        </div>
        
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
