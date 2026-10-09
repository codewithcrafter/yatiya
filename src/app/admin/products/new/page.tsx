"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProduct() {
  const router = useRouter();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mock save successful!');
    router.push('/admin/products');
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display text-yatiya-dark-cocoa">Add New Product</h1>
        <Link href="/admin/products" className="text-[13px] text-yatiya-dark-cocoa hover:text-yatiya-roman-gold transition-colors">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm space-y-6">
          <h2 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-4 pb-2 border-b border-yatiya-light-gold">Basic Information</h2>
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Product Name *</label>
            <input type="text" required className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Slug *</label>
              <input type="text" required className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">SKU *</label>
              <input type="text" required className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Description</label>
            <textarea rows={4} className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold"></textarea>
          </div>
        </div>

        <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm space-y-6">
          <h2 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-4 pb-2 border-b border-yatiya-light-gold">Pricing & Inventory</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Price *</label>
              <input type="number" required className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Stock Status</label>
              <select className="w-full border border-yatiya-light-gold bg-yatiya-cream p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold">
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
          Save Product
        </button>
      </form>
    </div>
  );
}
