
import { MockCategory, MockCollection } from '@/data/mockData';

export interface FilterState {
  category: string;
  collection: string;
  minPrice: number | '';
  maxPrice: number | '';
  sizes: string[];
  colors: string[];
}

export function ProductFilters({ 
  filters, 
  setFilters, 
  categories, 
  collections 
}: { 
  filters: FilterState, 
  setFilters: (f: FilterState) => void,
  categories: MockCategory[],
  collections: MockCollection[]
}) {
  const sizes = ['S', 'M', 'L', 'XL', 'Custom'];
  const colors = ['Gold', 'Ivory', 'Maroon', 'Champagne', 'Black', 'Blue', 'Green'];

  const toggleSize = (s: string) => {
    setFilters({ ...filters, sizes: filters.sizes.includes(s) ? filters.sizes.filter(x => x !== s) : [...filters.sizes, s] });
  };
  
  const toggleColor = (c: string) => {
    setFilters({ ...filters, colors: filters.colors.includes(c) ? filters.colors.filter(x => x !== c) : [...filters.colors, c] });
  };

  return (
    <div className="w-full space-y-10">
      {/* Categories */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-dark-cocoa mb-4 border-b border-yatiya-light-gold pb-2">Categories</h3>
        <div className="flex flex-col gap-2 text-[13px] text-yatiya-dark-cocoa/70">
          <label className="flex items-center gap-3 cursor-pointer hover:text-yatiya-roman-gold transition-colors">
            <input type="radio" name="cat" checked={filters.category === ''} onChange={() => setFilters({ ...filters, category: '' })} className="accent-[#C6A15B]" />
            <span>All Categories</span>
          </label>
          {categories.map(c => (
            <label key={c.id} className="flex items-center gap-3 cursor-pointer hover:text-yatiya-roman-gold transition-colors">
              <input type="radio" name="cat" checked={filters.category === c.id} onChange={() => setFilters({ ...filters, category: c.id })} className="accent-[#C6A15B]" />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-dark-cocoa mb-4 border-b border-yatiya-light-gold pb-2">Collections</h3>
        <div className="flex flex-col gap-2 text-[13px] text-yatiya-dark-cocoa/70">
          <label className="flex items-center gap-3 cursor-pointer hover:text-yatiya-roman-gold transition-colors">
            <input type="radio" name="col" checked={filters.collection === ''} onChange={() => setFilters({ ...filters, collection: '' })} className="accent-[#C6A15B]" />
            <span>All Collections</span>
          </label>
          {collections.map(c => (
            <label key={c.id} className="flex items-center gap-3 cursor-pointer hover:text-yatiya-roman-gold transition-colors">
              <input type="radio" name="col" checked={filters.collection === c.id} onChange={() => setFilters({ ...filters, collection: c.id })} className="accent-[#C6A15B]" />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-dark-cocoa mb-4 border-b border-yatiya-light-gold pb-2">Price</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-yatiya-light-gold bg-transparent p-2 text-[12px] focus:border-yatiya-roman-gold focus:outline-none" />
          <span className="text-yatiya-dark-cocoa/50">-</span>
          <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-yatiya-light-gold bg-transparent p-2 text-[12px] focus:border-yatiya-roman-gold focus:outline-none" />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-dark-cocoa mb-4 border-b border-yatiya-light-gold pb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(s => (
            <button key={s} onClick={() => toggleSize(s)} className={`border px-3 py-1 text-[12px] transition-colors ${filters.sizes.includes(s) ? 'border-yatiya-roman-gold bg-yatiya-roman-gold text-yatiya-light-text' : 'border-yatiya-light-gold text-yatiya-dark-cocoa hover:border-yatiya-roman-gold'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      
      {/* Colors */}
      <div>
        <h3 className="text-[14px] font-display uppercase tracking-widest text-yatiya-dark-cocoa mb-4 border-b border-yatiya-light-gold pb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(c => (
            <button key={c} onClick={() => toggleColor(c)} className={`border px-3 py-1 text-[12px] transition-colors ${filters.colors.includes(c) ? 'border-yatiya-roman-gold bg-yatiya-roman-gold text-yatiya-light-text' : 'border-yatiya-light-gold text-yatiya-dark-cocoa hover:border-yatiya-roman-gold'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      
      <button onClick={() => setFilters({ category: '', collection: '', minPrice: '', maxPrice: '', sizes: [], colors: [] })} className="w-full py-3 text-[11px] tracking-widest uppercase border border-yatiya-antique-gold/20 text-yatiya-dark-cocoa hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
        Clear All Filters
      </button>
    </div>
  );
}
