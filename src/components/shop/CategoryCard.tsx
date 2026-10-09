
import Link from 'next/link';
import { MockCategory } from '@/data/mockData';
import { SmartImage } from '@/components/ui/SmartImage';

export function CategoryCard({ category, isCollection = false }: { category: MockCategory | any, isCollection?: boolean }) {
  const link = isCollection ? `/collections/${category.slug}` : `/categories/${category.slug}`;
  return (
    <Link href={link} className="group relative block aspect-[3/4] overflow-hidden bg-yatiya-ivory">
      <SmartImage src={category.image} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-yatiya-deep-brown/40 group-hover:bg-yatiya-deep-brown/60 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl md:text-3xl font-display uppercase tracking-widest text-yatiya-light-text mb-3 drop-shadow-md">{category.name}</h2>
        <p className="text-[13px] font-sans text-yatiya-light-text/90 mb-6 drop-shadow-md max-w-sm hidden md:block">{category.description}</p>
        <span className="text-[11px] tracking-widest uppercase border-b border-white text-yatiya-light-text pb-1 group-hover:border-yatiya-roman-gold group-hover:text-yatiya-roman-gold transition-colors">
          Explore
        </span>
      </div>
    </Link>
  );
}
