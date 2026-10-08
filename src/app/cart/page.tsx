"use client";

import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { useCart } from "@/context/CartContext";

const MinusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 2999 ? 0 : 250) : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-yatiya-ivory text-yatiya-black pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-display uppercase text-center mb-16 tracking-wide">
          Your Shopping Bag
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-t border-b border-[#E9E3DD]">
            <p className="text-[14px] font-sans text-yatiya-black/70 mb-8 tracking-wider uppercase">
              Your bag is currently empty.
            </p>
            <Link 
              href="/collections/women" 
              className="bg-yatiya-black text-yatiya-ivory px-10 py-4 text-[12px] font-sans tracking-[0.15em] font-bold uppercase hover:bg-[#641F32] transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* ITEMS LIST */}
            <div className="w-full lg:w-[60%] flex flex-col gap-8">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#E9E3DD] text-[10px] font-sans font-bold tracking-[0.15em] uppercase text-[#604F6F]">
                <div className="col-span-6">PRODUCT</div>
                <div className="col-span-3 text-center">QUANTITY</div>
                <div className="col-span-3 text-right">TOTAL</div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 py-6 border-b border-[#E9E3DD] items-center">
                  
                  {/* PRODUCT DETAILS */}
                  <div className="col-span-1 md:col-span-6 flex gap-6 relative">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute -top-2 -left-2 md:hidden w-8 h-8 flex items-center justify-center bg-[#F7F0E8] rounded-full text-yatiya-black/60 hover:text-[#641F32] z-10"
                      aria-label="Remove item"
                    >
                      <XIcon />
                    </button>
                    <Link href={`/product/${item.productId}`} className="w-[100px] md:w-[120px] aspect-[3/4] relative bg-[#F7F0E8] shrink-0 block overflow-hidden rounded-[2px]">
                      <SmartImage src={item.image} alt={item.title} fill className="object-cover" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link href={`/product/${item.productId}`} className="text-[14px] md:text-[15px] font-sans font-medium text-yatiya-black mb-2 hover:text-[#B17165] transition-colors">
                        {item.title}
                      </Link>
                      <p className="text-[13px] font-sans text-yatiya-black/70 mb-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                      {item.size && (
                        <p className="text-[12px] font-sans text-yatiya-black/60 uppercase tracking-wider mt-2">
                          Size: {item.size}
                        </p>
                      )}
                      {item.color && (
                        <p className="text-[12px] font-sans text-yatiya-black/60 uppercase tracking-wider">
                          Color: {item.color}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="col-span-1 md:col-span-3 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-[11px] font-sans font-bold tracking-widest uppercase text-[#604F6F]">QUANTITY</span>
                    <div className="flex items-center border border-[#E9E3DD]">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#F7F0E8] transition-colors text-yatiya-black/60 hover:text-yatiya-black"
                      >
                        <MinusIcon />
                      </button>
                      <span className="w-10 text-center text-[13px] font-sans">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#F7F0E8] transition-colors text-yatiya-black/60 hover:text-yatiya-black"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="col-span-1 md:col-span-3 flex justify-between md:justify-end items-center relative">
                    <span className="md:hidden text-[11px] font-sans font-bold tracking-widest uppercase text-[#604F6F]">TOTAL</span>
                    <span className="text-[15px] font-sans font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-8 text-yatiya-black/40 hover:text-[#641F32] transition-colors"
                      aria-label="Remove item"
                    >
                      <XIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="w-full lg:w-[40%]">
              <div className="bg-[#F7F0E8] p-8 md:p-10 sticky top-32 rounded-[2px]">
                <h2 className="text-[16px] font-display uppercase tracking-widest border-b border-[#E9E3DD] pb-6 mb-6">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-4 text-[14px] font-sans mb-6">
                  <div className="flex justify-between">
                    <span className="text-yatiya-black/80">Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yatiya-black/80">Shipping</span>
                    <span>{shipping === 0 ? "Complimentary" : `₹${shipping.toLocaleString('en-IN')}`}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-[#E9E3DD] pt-6 mb-8">
                  <span className="text-[14px] font-sans font-medium uppercase tracking-widest">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-display block">₹{total.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-yatiya-black/60 uppercase tracking-widest">(INCL. TAXES)</span>
                  </div>
                </div>

                <Link 
                  href="/checkout" 
                  className="w-full block text-center bg-[#641F32] text-yatiya-ivory py-5 text-[12px] font-sans tracking-[0.2em] font-bold uppercase hover:bg-yatiya-black transition-colors shadow-lg"
                >
                  PROCEED TO CHECKOUT
                </Link>

                <p className="text-[11px] font-sans text-center text-yatiya-black/60 mt-6 leading-relaxed">
                  Shipping and taxes calculated at checkout.<br/>
                  By proceeding, you agree to our <Link href="/terms" className="underline hover:text-yatiya-black">Terms</Link>.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
