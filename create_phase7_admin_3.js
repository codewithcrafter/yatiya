const fs = require('fs');
const path = require('path');

const generateGenericPage = (title) => `
"use client";

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

export default function Admin${title.replace(/\s/g, '')}() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-display text-yatiya-black">${title}</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-yatiya-black/40" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-[#E9E3DD] text-[13px] focus:outline-none focus:border-[#C6A15B] w-[200px]"
            />
          </div>
          <button className="bg-yatiya-black text-white px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E9E3DD] shadow-sm p-12 text-center">
        <div className="w-16 h-16 bg-[#F7F0E8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C6A15B]">
          <Search className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-[14px] font-medium text-yatiya-black mb-2">No ${title.toLowerCase()} found</h3>
        <p className="text-[13px] text-yatiya-black/60 mb-6">This section is currently empty or mock data is not configured for it yet.</p>
        <button className="border border-[#C6A15B] text-[#C6A15B] px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-[#F7F0E8] transition-colors">
          Add First Entry
        </button>
      </div>
    </div>
  );
}
`;

const files = {
  'src/app/admin/inventory/page.tsx': generateGenericPage('Inventory'),
  'src/app/admin/categories/page.tsx': generateGenericPage('Categories'),
  'src/app/admin/collections/page.tsx': generateGenericPage('Collections'),
  'src/app/admin/customers/page.tsx': generateGenericPage('Customers'),
  'src/app/admin/coupons/page.tsx': generateGenericPage('Coupons'),
  'src/app/admin/banners/page.tsx': generateGenericPage('Banners'),
  'src/app/admin/homepage/page.tsx': generateGenericPage('Homepage Sections'),
  'src/app/admin/testimonials/page.tsx': generateGenericPage('Testimonials'),
  'src/app/admin/blog/page.tsx': generateGenericPage('Blog'),
  'src/app/admin/returns/page.tsx': generateGenericPage('Returns & Refunds'),
  'src/app/admin/settings/page.tsx': `
"use client";

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-display text-yatiya-black mb-6">Store Settings</h1>
      
      <div className="bg-white border border-[#E9E3DD] p-6 shadow-sm">
        <h2 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-4 pb-2 border-b border-[#E9E3DD]">General Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Store Name</label>
            <input type="text" defaultValue="Yatiya Couture" className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Support Email</label>
            <input type="email" defaultValue="support@yatiya.com" className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E9E3DD] p-6 shadow-sm">
        <h2 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-black mb-4 pb-2 border-b border-[#E9E3DD]">Shipping & Logistics</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Default Shipping Cost (₹)</label>
            <input type="number" defaultValue="150" className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-black/70 mb-2">Free Shipping Threshold (₹)</label>
            <input type="number" defaultValue="5000" className="w-full border border-[#E9E3DD] p-3 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
          </div>
        </div>
      </div>

      <button className="bg-yatiya-black text-white px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors">
        Save Settings
      </button>
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

console.log('Phase 7 admin generic pages created.');
