"use client";

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-display text-yatiya-dark-cocoa mb-6">Store Settings</h1>
      
      <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm">
        <h2 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-4 pb-2 border-b border-yatiya-light-gold">General Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Store Name</label>
            <input type="text" defaultValue="Yatiya Couture" className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Support Email</label>
            <input type="email" defaultValue="support@yatiya.com" className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
          </div>
        </div>
      </div>

      <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 shadow-sm">
        <h2 className="text-[12px] uppercase tracking-widest font-medium text-yatiya-dark-cocoa mb-4 pb-2 border-b border-yatiya-light-gold">Shipping & Logistics</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Default Shipping Cost (₹)</label>
            <input type="number" defaultValue="150" className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Free Shipping Threshold (₹)</label>
            <input type="number" defaultValue="5000" className="w-full border border-yatiya-light-gold p-3 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
          </div>
        </div>
      </div>

      <button className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
        Save Settings
      </button>
    </div>
  );
}
