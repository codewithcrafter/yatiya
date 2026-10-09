
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ items }: { items: { label: string, href?: string }[] }) {
  return (
    <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-yatiya-dark-cocoa/60 mb-8">
      <Link href="/" className="hover:text-yatiya-roman-gold transition-colors">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-yatiya-dark-cocoa/30" />
          {item.href ? (
            <Link href={item.href} className="hover:text-yatiya-roman-gold transition-colors">{item.label}</Link>
          ) : (
            <span className="text-yatiya-dark-cocoa">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
