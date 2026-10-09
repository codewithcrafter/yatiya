const fs = require('fs');
const path = require('path');

const files = {
  // src/app/admin/orders/page.tsx
  'src/app/admin/orders/page.tsx': `
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('yatiya_orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const filteredOrders = orders.filter(o => o.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-display text-yatiya-black">Orders</h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-yatiya-black/40" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-[#E9E3DD] text-[13px] focus:outline-none focus:border-[#C6A15B] w-[250px]"
          />
        </div>
      </div>

      <div className="bg-white border border-[#E9E3DD] shadow-sm overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#FCFAF7] text-yatiya-black/60 border-b border-[#E9E3DD]">
            <tr>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Order ID</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Customer</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Date</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Amount</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Payment</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Status</th>
              <th className="p-4 font-medium uppercase tracking-wider text-[11px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E3DD]">
            {filteredOrders.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-yatiya-black/60">No orders found.</td></tr>
            ) : filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-[#FCFAF7]">
                <td className="p-4 font-medium text-yatiya-black">{order.id}</td>
                <td className="p-4 text-yatiya-black/80">{order.shippingAddress?.fullName}</td>
                <td className="p-4 text-yatiya-black/80">{order.date}</td>
                <td className="p-4 text-yatiya-black/80 font-medium">₹{order.total.toLocaleString('en-IN')}</td>
                <td className="p-4 text-yatiya-black/80">{order.payment?.method}</td>
                <td className="p-4">
                  <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-[#F7F0E8] text-[#C6A15B] rounded-sm">
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link href={\`/admin/orders/\${order.id}\`} className="text-[#C6A15B] hover:underline font-medium">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`,

  // src/app/admin/orders/[id]/page.tsx
  'src/app/admin/orders/[id]/page.tsx': `
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('yatiya_orders') || '[]');
    const found = storedOrders.find((o: any) => o.id === resolvedParams.id);
    if (found) setOrder(found);
  }, [resolvedParams.id]);

  const handleStatusChange = (newStatus: string) => {
    const storedOrders = JSON.parse(localStorage.getItem('yatiya_orders') || '[]');
    const updatedOrders = storedOrders.map((o: any) => o.id === resolvedParams.id ? { ...o, status: newStatus } : o);
    localStorage.setItem('yatiya_orders', JSON.stringify(updatedOrders));
    setOrder({ ...order, status: newStatus });
    alert('Status updated to ' + newStatus);
  };

  if (!order) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display text-yatiya-black">Order {order.id}</h1>
          <p className="text-[13px] text-yatiya-black/60">{order.date}</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border border-[#E9E3DD] bg-white p-2 text-[13px] text-yatiya-black focus:outline-none focus:border-[#C6A15B]"
          >
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E9E3DD] p-6 shadow-sm">
          <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-4">Customer Details</h3>
          <div className="text-[14px] text-yatiya-black/80 space-y-2">
            <p><span className="text-yatiya-black/60">Name:</span> {order.shippingAddress.fullName}</p>
            <p><span className="text-yatiya-black/60">Phone:</span> {order.shippingAddress.phone}</p>
            <p><span className="text-yatiya-black/60">Address:</span> {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
          </div>
        </div>
        <div className="bg-white border border-[#E9E3DD] p-6 shadow-sm">
          <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-4">Payment Summary</h3>
          <div className="text-[14px] text-yatiya-black/80 space-y-2">
            <div className="flex justify-between"><span className="text-yatiya-black/60">Subtotal:</span> <span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-yatiya-black/60">Shipping:</span> <span>₹{order.shipping.toLocaleString('en-IN')}</span></div>
            {order.discount > 0 && <div className="flex justify-between"><span className="text-[#C6A15B]">Discount:</span> <span className="text-[#C6A15B]">-₹{order.discount.toLocaleString('en-IN')}</span></div>}
            <div className="flex justify-between font-medium text-yatiya-black pt-2 border-t border-[#E9E3DD]"><span>Total:</span> <span>₹{order.total.toLocaleString('en-IN')}</span></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-[#E9E3DD] shadow-sm">
        <div className="p-4 border-b border-[#E9E3DD] bg-[#FCFAF7]">
          <h3 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black">Order Items</h3>
        </div>
        <div className="divide-y divide-[#E9E3DD]">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="p-4 flex gap-4">
              <div className="w-16 h-20 bg-[#E9E3DD] shrink-0 overflow-hidden">
                {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 flex justify-between">
                <div>
                  <p className="font-medium text-yatiya-black text-[14px]">{item.title}</p>
                  <p className="text-[12px] text-yatiya-black/60 mt-1">Size: {item.size} | Color: {item.color}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-yatiya-black text-[14px]">₹{item.price.toLocaleString('en-IN')}</p>
                  <p className="text-[12px] text-yatiya-black/60">Qty: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,

  // src/app/admin/products/page.tsx
  'src/app/admin/products/page.tsx': `
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
        <h1 className="text-2xl font-display text-yatiya-black">Products</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-yatiya-black/40" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-[#E9E3DD] text-[13px] focus:outline-none focus:border-[#C6A15B] w-[200px] md:w-[250px]"
            />
          </div>
          <Link href="/admin/products/new" className="bg-yatiya-black text-white px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Link>
        </div>
      </div>

      <div className="bg-white border border-[#E9E3DD] shadow-sm overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#FCFAF7] text-yatiya-black/60 border-b border-[#E9E3DD]">
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
              <tr key={product.id} className="hover:bg-[#FCFAF7]">
                <td className="p-4">
                  <div className="w-10 h-12 bg-[#E9E3DD] overflow-hidden">
                    {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />}
                  </div>
                </td>
                <td className="p-4 font-medium text-yatiya-black">
                  <Link href={\`/products/\${product.slug}\`} target="_blank" className="hover:text-[#C6A15B]">
                    {product.name}
                  </Link>
                </td>
                <td className="p-4 text-yatiya-black/80 capitalize">{product.category}</td>
                <td className="p-4 text-yatiya-black/80 font-medium">₹{product.price.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-green-100 text-green-800 rounded-sm">
                    {product.stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-yatiya-black/60">
                    <button className="hover:text-[#C6A15B]" title="Edit (Demo)"><Edit2 className="w-4 h-4" /></button>
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
`,

  // src/app/admin/products/new/page.tsx
  'src/app/admin/products/new/page.tsx': `
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
        <h1 className="text-2xl font-display text-yatiya-black">Add New Product</h1>
        <Link href="/admin/products" className="text-[13px] text-yatiya-black hover:text-[#C6A15B] transition-colors">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white border border-[#E9E3DD] p-6 shadow-sm space-y-6">
          <h2 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-4 pb-2 border-b border-[#E9E3DD]">Basic Information</h2>
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Product Name *</label>
            <input type="text" required className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Slug *</label>
              <input type="text" required className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">SKU *</label>
              <input type="text" required className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
            </div>
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Description</label>
            <textarea rows={4} className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]"></textarea>
          </div>
        </div>

        <div className="bg-white border border-[#E9E3DD] p-6 shadow-sm space-y-6">
          <h2 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-4 pb-2 border-b border-[#E9E3DD]">Pricing & Inventory</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Price *</label>
              <input type="number" required className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Stock Status</label>
              <select className="w-full border border-[#E9E3DD] bg-white p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]">
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="bg-yatiya-black text-white px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors">
          Save Product
        </button>
      </form>
    </div>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

console.log('Phase 7 admin orders and products created.');
