"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Combine mock data + local storage products if any
  const lsProducts = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('yatiya_products') || '[]') : [];
  
  // Merge, taking local overrides where IDs match
  const mergedProducts = [...mockProducts];
  lsProducts.forEach((lp: any) => {
    const idx = mergedProducts.findIndex(p => p.id === lp.id);
    if (idx >= 0) mergedProducts[idx] = lp;
    else mergedProducts.push(lp);
  });
  
  const [products, setProducts] = useState<any[]>(mergedProducts);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product? (Mock Frontend Only)')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('yatiya_products', JSON.stringify(updated.filter(p => !mockProducts.find(mp => mp.id === p.id))));
      alert('Product deleted from mock frontend.');
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-display text-yatiya-dark-cocoa">Products</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-yatiya-dark-cocoa/40" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-yatiya-light-gold text-[13px] focus:outline-none focus:border-yatiya-roman-gold w-[200px] md:w-[250px]"
            />
          </div>
          <Link href="/admin/products/new" className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Link>
        </div>
      </div>

      <div className="bg-yatiya-cream border border-yatiya-light-gold shadow-sm overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-yatiya-ivory text-yatiya-dark-cocoa/60 border-b border-yatiya-light-gold">
            <tr>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px] w-[80px]">Image</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Product Name</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Category</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Price</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Status</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E3DD]">
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-yatiya-ivory">
                <td className="p-4">
                  <div className="w-10 h-12 bg-yatiya-light-gold overflow-hidden">
                    {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />}
                  </div>
                </td>
                <td className="p-4 font-medium text-yatiya-dark-cocoa">
                  <Link href={`/products/${product.slug}`} target="_blank" className="hover:text-yatiya-roman-gold">
                    {product.name}
                  </Link>
                </td>
                <td className="p-4 text-yatiya-dark-cocoa/80 capitalize">{product.category}</td>
                <td className="p-4 text-yatiya-dark-cocoa/80 font-medium">₹{product.price.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-green-100 text-green-800 rounded-sm">
                    {product.stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-yatiya-dark-cocoa/60">
                    <button className="hover:text-yatiya-roman-gold" title="Edit (Demo)"><Edit2 className="w-4 h-4" /></button>
                    <button className="hover:text-red-500" title="Delete" onClick={() => handleDelete(product.id)}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
