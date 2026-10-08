export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-yatiya-ivory text-yatiya-black pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wide mb-6">
          Your Wishlist
        </h1>
        <p className="text-[13px] font-sans text-yatiya-black/70 mb-12 tracking-widest uppercase">
          Curate your favorite pieces
        </p>

        <div className="py-20 border-t border-b border-[#E9E3DD]">
          <p className="text-[14px] font-sans text-yatiya-black/70 mb-8 tracking-wider uppercase">
            Your wishlist is currently empty.
          </p>
          <a 
            href="/collections/women" 
            className="inline-block bg-yatiya-black text-yatiya-ivory px-10 py-4 text-[12px] font-sans tracking-[0.15em] font-bold uppercase hover:bg-[#641F32] transition-colors"
          >
            DISCOVER THE COLLECTIONS
          </a>
        </div>
      </div>
    </div>
  );
}
