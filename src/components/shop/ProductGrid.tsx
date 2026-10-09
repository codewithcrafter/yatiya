
import { MockProduct } from '@/data/mockData';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: MockProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-yatiya-dark-cocoa/60">
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
