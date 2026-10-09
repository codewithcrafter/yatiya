"use client";
import { useParams } from 'next/navigation';
import { getProductBySlug } from '@/data/mockData';
import { ProductDetail } from '@/components/shop/ProductDetail';
import Link from 'next/link';

export default function ProductSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-yatiya-ivory flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest text-yatiya-burgundy mb-6">Not Found</h1>
        <p className="text-[14px] text-yatiya-dark-cocoa/70 font-sans max-w-md mx-auto mb-10">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link href="/products" className="border border-yatiya-antique-gold px-8 py-3 text-[12px] uppercase tracking-widest hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yatiya-ivory">
      <ProductDetail product={product} />
    </div>
  );
}
