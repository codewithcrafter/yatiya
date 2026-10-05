import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";

export default function JournalPage() {
  const articles = [
    {
      id: 1,
      title: "The Art of Draping",
      excerpt: "Exploring the fluid poetry of the modern saree and how contemporary silhouettes are reshaping tradition.",
      category: "Style Guide",
      image: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=800&q=80",
      date: "October 12, 2024"
    },
    {
      id: 2,
      title: "Monochrome Magic",
      excerpt: "Why tone-on-tone dressing is the ultimate expression of quiet luxury for festive occasions.",
      category: "Editorial",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      date: "September 28, 2024"
    },
    {
      id: 3,
      title: "Behind the Seams: The Bridal Edit",
      excerpt: "An intimate look at the meticulous craftsmanship and countless hours that go into creating a Yatiya bridal lehenga.",
      category: "Behind the Scenes",
      image: "https://images.unsplash.com/photo-1515347619362-e67ebf8d4e7b?auto=format&fit=crop&w=800&q=80",
      date: "September 15, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#242124]">
      {/* HEADER HERO */}
      <div className="w-full bg-[#E9E3DD] py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-[#641F32]">
          The Journal
        </h1>
        <p className="text-[13px] font-sans text-[#242124]/70 mt-6 tracking-widest uppercase">
          Stories of style, craft, and culture
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {articles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <Link href={`/journal/${article.id}`} className="block w-full aspect-[4/5] relative bg-[#F7F0E8] overflow-hidden mb-6">
                <SmartImage 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-105" 
                />
              </Link>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#641F32] font-bold">
                  {article.category}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#242124]/50">
                  {article.date}
                </span>
              </div>
              <h2 className="text-[20px] font-display mb-3 group-hover:text-[#641F32] transition-colors leading-snug">
                <Link href={`/journal/${article.id}`}>{article.title}</Link>
              </h2>
              <p className="text-[13px] font-sans text-[#242124]/70 leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <Link href={`/journal/${article.id}`} className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#242124] border-b border-[#242124] pb-1 hover:text-[#641F32] hover:border-[#641F32] transition-colors font-bold">
                Read More
              </Link>
            </article>
          ))}

        </div>
      </div>
    </div>
  );
}
