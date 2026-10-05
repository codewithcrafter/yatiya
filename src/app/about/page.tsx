import { SmartImage } from "@/components/ui/SmartImage";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#242124]">
      {/* HERO */}
      <div className="w-full h-[60vh] relative overflow-hidden bg-[#604F6F]">
        <SmartImage 
          src="https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=1920&q=80"
          alt="About Yatiya"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#FCFAF7] text-center px-6">
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest mb-6">
            Our Story
          </h1>
          <p className="text-[12px] font-sans tracking-[0.2em] uppercase max-w-lg">
            Redefining Modern Indian Couture
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[800px] mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-display uppercase tracking-widest mb-10 text-[#641F32]">
          The Quiet Luxury House
        </h2>
        
        <div className="flex flex-col gap-8 text-[15px] font-sans text-[#242124]/80 leading-relaxed">
          <p>
            Yatiya was born from a desire to bring a sense of quiet, understated luxury to Indian fashion. We believe that true elegance lies in restraint, impeccable tailoring, and the finest fabrics.
          </p>
          <p>
            Our collections are a thoughtful curation of occasion wear, designed exclusively for the modern woman who values craftsmanship over ostentation. Every piece in our catalog is meticulously crafted, focusing on timeless silhouettes that transcend seasonal trends.
          </p>
          <p>
            From the rich heritage of handcrafted lehengas to the contemporary grace of draped sarees, Yatiya is an homage to Indian textiles, reinterpreted through a minimalist, global lens.
          </p>
        </div>
      </div>

      <div className="w-full bg-[#E9E3DD] py-24">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-display uppercase tracking-widest mb-6 text-[#641F32]">
              Our Craft
            </h2>
            <p className="text-[14px] font-sans text-[#242124]/80 leading-relaxed mb-6">
              We work directly with master artisans across India, ensuring that traditional techniques are preserved and celebrated. Our commitment to quality means that every stitch, every seam, and every detail is perfected before a garment reaches you.
            </p>
            <p className="text-[14px] font-sans text-[#242124]/80 leading-relaxed">
              At Yatiya, luxury is not just in the final product, but in the process of its creation. We are dedicated to ethical practices, sustainable sourcing, and creating fashion that you will cherish for a lifetime.
            </p>
          </div>
          <div className="w-full md:w-1/2 aspect-[4/5] relative bg-[#FCFAF7] overflow-hidden">
            <SmartImage 
              src="https://images.unsplash.com/photo-1610030469983-98e550d615e1?auto=format&fit=crop&w=800&q=80"
              alt="Our Craft"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
