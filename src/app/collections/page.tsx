
"use client";
import { getCollections } from '@/data/mockData';
import { CategoryCard } from '@/components/shop/CategoryCard';
import { Breadcrumb } from '@/components/shop/Breadcrumb';

export default function CollectionsPage() {
  const collections = getCollections();
  
  return (
    <div className="min-h-screen bg-yatiya-ivory">
      <div className="bg-yatiya-light-gold py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-yatiya-burgundy">Collections</h1>
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
