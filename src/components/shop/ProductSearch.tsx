
import { Search } from 'lucide-react';

export function ProductSearch({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-md">
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search couture..." 
        className="w-full border-b border-yatiya-antique-gold bg-transparent py-2 pl-8 pr-4 text-[13px] tracking-wide focus:outline-none focus:border-yatiya-roman-gold text-yatiya-dark-cocoa placeholder-yatiya-black/40"
      />
      <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-yatiya-antique-gold" />
    </div>
  );
}
