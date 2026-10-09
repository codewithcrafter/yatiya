"use client";

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

export default function AdminHomepageSections() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-display text-yatiya-dark-cocoa">Homepage Sections</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-yatiya-dark-cocoa/40" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-yatiya-light-gold text-[13px] focus:outline-none focus:border-yatiya-roman-gold w-[200px]"
            />
          </div>
          <button className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      <div className="bg-yatiya-cream border border-yatiya-light-gold shadow-sm p-12 text-center">
        <div className="w-16 h-16 bg-yatiya-ivory rounded-full flex items-center justify-center mx-auto mb-4 text-yatiya-roman-gold">
          <Search className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-[14px] font-medium text-yatiya-dark-cocoa mb-2">No homepage sections found</h3>
        <p className="text-[13px] text-yatiya-dark-cocoa/60 mb-6">This section is currently empty or mock data is not configured for it yet.</p>
        <button className="border border-yatiya-roman-gold text-yatiya-roman-gold px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-ivory transition-colors">
          Add First Entry
        </button>
      </div>
    </div>
  );
}
