"use client";

import Link from "next/link";
import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 2999 ? 0 : 250) : 0;
  const total = subtotal + shipping;

  const [step, setStep] = useState(1);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-yatiya-ivory flex flex-col items-center justify-center pt-24 pb-32">
        <p className="text-[14px] font-sans text-yatiya-black/70 mb-8 uppercase tracking-widest">
          Your bag is empty.
        </p>
        <Link 
          href="/collections/women" 
          className="bg-yatiya-black text-yatiya-ivory px-10 py-4 text-[12px] font-sans tracking-[0.15em] font-bold uppercase hover:bg-[#641F32] transition-colors"
        >
          RETURN TO STORE
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yatiya-ivory text-yatiya-black">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 flex flex-col-reverse lg:flex-row gap-12 lg:gap-20">
        
        {/* LEFT COLUMN - FORMS */}
        <div className="w-full lg:w-[55%]">
          
          {/* BREADCRUMBS */}
          <div className="flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.15em] mb-12">
            <Link href="/cart" className="text-yatiya-black/50 hover:text-yatiya-black">Cart</Link>
            <span className="text-yatiya-black/30">&gt;</span>
            <span className={step >= 1 ? "text-[#641F32] font-bold" : "text-yatiya-black/50"}>Information</span>
            <span className="text-yatiya-black/30">&gt;</span>
            <span className={step >= 2 ? "text-[#641F32] font-bold" : "text-yatiya-black/50"}>Shipping</span>
            <span className="text-yatiya-black/30">&gt;</span>
            <span className={step >= 3 ? "text-[#641F32] font-bold" : "text-yatiya-black/50"}>Payment</span>
          </div>

          <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); if(step < 3) setStep(step + 1); }}>
            
            {/* STEP 1: INFORMATION */}
            <div className={`flex flex-col gap-6 ${step !== 1 && 'opacity-40 pointer-events-none hidden'}`}>
              <div>
                <h2 className="text-[18px] font-display uppercase tracking-widest mb-6">Contact Information</h2>
                <input 
                  type="email" 
                  placeholder="Email or mobile phone number" 
                  required
                  className="w-full bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors"
                />
              </div>

              <div>
                <h2 className="text-[18px] font-display uppercase tracking-widest mb-6 mt-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <select className="col-span-2 w-full bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors appearance-none rounded-none">
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>United Arab Emirates</option>
                  </select>
                  <input type="text" placeholder="First name" required className="col-span-1 bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors" />
                  <input type="text" placeholder="Last name" required className="col-span-1 bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors" />
                  <input type="text" placeholder="Address" required className="col-span-2 bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors" />
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors" />
                  <input type="text" placeholder="City" required className="col-span-1 md:col-span-1 bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors" />
                  <select className="col-span-1 md:col-span-1 bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors appearance-none rounded-none">
                    <option>State</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Karnataka</option>
                  </select>
                  <input type="text" placeholder="PIN code" required className="col-span-2 md:col-span-2 bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors" />
                  <input type="tel" placeholder="Phone" required className="col-span-2 bg-transparent border border-[#E9E3DD] p-4 text-[13px] font-sans focus:outline-none focus:border-[#641F32] transition-colors" />
                </div>
              </div>
              
              <button type="submit" className="w-full md:w-auto self-end bg-[#641F32] text-yatiya-ivory px-10 py-5 text-[12px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-yatiya-black transition-colors mt-4">
                Continue to Shipping
              </button>
            </div>

            {/* STEP 2: SHIPPING */}
            <div className={`flex flex-col gap-6 ${step !== 2 && 'hidden'}`}>
              <div className="border border-[#E9E3DD] rounded-none divide-y divide-[#E9E3DD] p-4 text-[13px] font-sans">
                <div className="flex justify-between py-2">
                  <span className="text-yatiya-black/60 w-24">Contact</span>
                  <span className="flex-1">test@example.com</span>
                  <button type="button" onClick={() => setStep(1)} className="text-[#641F32] underline text-[11px] uppercase tracking-wider">Change</button>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-yatiya-black/60 w-24">Ship to</span>
                  <span className="flex-1">Mumbai, Maharashtra 400001, India</span>
                  <button type="button" onClick={() => setStep(1)} className="text-[#641F32] underline text-[11px] uppercase tracking-wider">Change</button>
                </div>
              </div>

              <div>
                <h2 className="text-[18px] font-display uppercase tracking-widest mb-6 mt-4">Shipping Method</h2>
                <div className="border border-[#E9E3DD] p-4 flex justify-between items-center bg-[#F7F0E8]/50">
                  <div className="flex items-center gap-4">
                    <input type="radio" checked readOnly className="accent-[#641F32] w-4 h-4" />
                    <span className="text-[13px] font-sans">Standard Delivery</span>
                  </div>
                  <span className="text-[13px] font-sans font-bold">Complimentary</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button type="button" onClick={() => setStep(1)} className="text-yatiya-black/60 hover:text-yatiya-black text-[12px] font-sans tracking-[0.1em] uppercase transition-colors">
                  &lt; Return to Information
                </button>
                <button type="submit" className="bg-[#641F32] text-yatiya-ivory px-10 py-5 text-[12px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-yatiya-black transition-colors">
                  Continue to Payment
                </button>
              </div>
            </div>

            {/* STEP 3: PAYMENT */}
            <div className={`flex flex-col gap-6 ${step !== 3 && 'hidden'}`}>
              <div>
                <h2 className="text-[18px] font-display uppercase tracking-widest mb-2">Payment</h2>
                <p className="text-[12px] font-sans text-yatiya-black/60 mb-6">All transactions are secure and encrypted.</p>
                
                <div className="border border-[#E9E3DD] divide-y divide-[#E9E3DD]">
                  <div className="p-4 flex justify-between items-center bg-[#F7F0E8]/50">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" defaultChecked className="accent-[#641F32] w-4 h-4" />
                      <span className="text-[13px] font-sans">Credit / Debit Card (Razorpay)</span>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" className="accent-[#641F32] w-4 h-4" />
                      <span className="text-[13px] font-sans">UPI / Net Banking</span>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" className="accent-[#641F32] w-4 h-4" />
                      <span className="text-[13px] font-sans">Cash on Delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button type="button" onClick={() => setStep(2)} className="text-yatiya-black/60 hover:text-yatiya-black text-[12px] font-sans tracking-[0.1em] uppercase transition-colors">
                  &lt; Return to Shipping
                </button>
                <button type="button" onClick={() => alert("Order placed successfully! Integration with Razorpay pending.")} className="bg-yatiya-black text-yatiya-ivory px-10 py-5 text-[12px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-[#641F32] transition-colors">
                  Complete Order
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN - ORDER SUMMARY */}
        <div className="w-full lg:w-[45%]">
          <div className="bg-[#F7F0E8] p-8 md:p-10 sticky top-10 border border-[#E9E3DD]">
            
            <div className="flex flex-col gap-6 max-h-[40vh] overflow-y-auto pr-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 aspect-[3/4] bg-white border border-[#E9E3DD] shrink-0">
                    <SmartImage src={item.image} alt={item.title} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#604F6F] text-yatiya-ivory text-[10px] flex items-center justify-center rounded-full font-bold z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-sans font-medium">{item.title}</p>
                    <p className="text-[11px] font-sans text-yatiya-black/60 uppercase mt-1">
                      {item.size && `Size: ${item.size}`} {item.color && `/ Color: ${item.color}`}
                    </p>
                  </div>
                  <div className="text-[13px] font-sans font-medium">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mb-8 pt-6 border-t border-[#E9E3DD]">
              <input type="text" placeholder="Gift card or discount code" className="flex-1 bg-white border border-[#E9E3DD] p-3 text-[12px] font-sans focus:outline-none focus:border-[#641F32]" />
              <button className="bg-yatiya-black text-yatiya-ivory px-6 text-[11px] font-sans font-bold tracking-widest uppercase hover:bg-[#641F32] transition-colors">Apply</button>
            </div>

            <div className="flex flex-col gap-3 text-[13px] font-sans mb-6 border-t border-[#E9E3DD] pt-6">
              <div className="flex justify-between">
                <span className="text-yatiya-black/70">Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yatiya-black/70">Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : `₹${shipping.toLocaleString('en-IN')}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-[#E9E3DD] pt-6">
              <span className="text-[14px] font-sans font-medium uppercase tracking-widest">Total</span>
              <div className="text-right flex items-center gap-2">
                <span className="text-[11px] font-sans text-yatiya-black/50">INR</span>
                <span className="text-3xl font-display">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
