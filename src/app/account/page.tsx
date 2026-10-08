"use client";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-yatiya-ivory text-yatiya-black pt-24 pb-32">
      <div className="max-w-[500px] mx-auto px-6">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wide mb-4">
            Sign In
          </h1>
          <p className="text-[12px] font-sans text-yatiya-black/60 uppercase tracking-widest">
            Welcome back to Yatiya
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-sans uppercase tracking-[0.1em] text-yatiya-black/80">Email</label>
            <input 
              type="email" 
              className="w-full border-b border-[#E9E3DD] bg-transparent py-3 text-[14px] font-sans focus:outline-none focus:border-[#641F32] transition-colors rounded-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-sans uppercase tracking-[0.1em] text-yatiya-black/80">Password</label>
              <a href="#" className="text-[10px] font-sans uppercase tracking-widest text-yatiya-black/50 hover:text-yatiya-black underline">Forgot?</a>
            </div>
            <input 
              type="password" 
              className="w-full border-b border-[#E9E3DD] bg-transparent py-3 text-[14px] font-sans focus:outline-none focus:border-[#641F32] transition-colors rounded-none"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full bg-yatiya-black text-yatiya-ivory py-5 mt-6 text-[12px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-[#641F32] transition-colors shadow-lg">
            Sign In
          </button>
        </form>

        <div className="text-center mt-12 pt-8 border-t border-[#E9E3DD]">
          <p className="text-[11px] font-sans uppercase tracking-widest text-yatiya-black/60 mb-4">
            Don't have an account?
          </p>
          <a href="#" className="text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-[#641F32] hover:text-yatiya-black transition-colors underline">
            Create Account
          </a>
        </div>

      </div>
    </div>
  );
}
