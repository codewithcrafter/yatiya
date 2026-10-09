const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Ensure checkout directories exist
ensureDir('src/app/checkout');
ensureDir('src/app/checkout/success');

const checkoutPageContent = `"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart, CartItem } from '@/context/CartContext';
import { SmartImage } from '@/components/ui/SmartImage';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items: cartItems, getCartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // Checkout State
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isBuyNow, setIsBuyNow] = useState(false);
  
  // Customer Details
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  
  // Shipping Address
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('India');
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState('ONLINE');
  
  // Coupon & Totals
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setMounted(true);
    
    // Check if buy now flow
    const buyNowData = sessionStorage.getItem('yatiya-buynow');
    if (buyNowData && searchParams.get('type') === 'buynow') {
      try {
        const item = JSON.parse(buyNowData);
        setCheckoutItems([item]);
        setIsBuyNow(true);
      } catch (e) {
        setCheckoutItems(cartItems);
      }
    } else {
      setCheckoutItems(cartItems);
    }
  }, [cartItems, searchParams]);

  if (!mounted) return <div className="min-h-screen bg-[#FCFAF7]"></div>;

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-3xl font-display text-yatiya-black mb-4">Checkout</h1>
        <p className="text-yatiya-black/70 mb-8 font-sans">Your cart is currently empty.</p>
        <Link href="/products" className="bg-yatiya-black text-white px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Calculations
  const subtotal = checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 10000 ? 0 : 250;
  const total = subtotal - discountAmount + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'YATIYA10') {
      const discount = Math.floor(subtotal * 0.1);
      setDiscountAmount(discount);
      setAppliedCoupon('YATIYA10');
      setErrors({ ...errors, coupon: '' });
    } else {
      setErrors({ ...errors, coupon: 'Invalid coupon code.' });
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!mobile.trim() || !/^\\d{10}$/.test(mobile)) newErrors.mobile = 'Valid 10-digit mobile number is required.';
    if (!email.trim() || !/^\\S+@\\S+\\.\\S+$/.test(email)) newErrors.email = 'Valid email is required.';
    
    if (!addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required.';
    if (!city.trim()) newErrors.city = 'City is required.';
    if (!state.trim()) newErrors.state = 'State is required.';
    if (!pincode.trim() || !/^\\d{6}$/.test(pincode)) newErrors.pincode = 'Valid 6-digit pincode is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      // Mock order placement
      const orderRef = 'YAT-DEMO-' + Math.floor(10000 + Math.random() * 90000);
      
      // Clear specific storages
      if (isBuyNow) {
        sessionStorage.removeItem('yatiya-buynow');
      } else {
        clearCart();
      }
      
      // Store mock order info in session for success page
      sessionStorage.setItem('yatiya-last-order', JSON.stringify({
        orderRef,
        total,
        email,
        paymentMethod
      }));
      
      router.push('/checkout/success');
    } else {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] py-12 px-6 font-sans text-yatiya-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 text-center lg:text-left">
          <Link href="/" className="text-2xl font-display uppercase tracking-widest text-yatiya-black hover:opacity-80">
            Yatiya Couture
          </Link>
          <div className="flex items-center justify-center lg:justify-start gap-2 text-[12px] text-yatiya-black/60 uppercase tracking-widest mt-6">
            <Link href="/cart" className="hover:text-yatiya-black">Cart</Link>
            <span>/</span>
            <span className="text-yatiya-black font-medium">Checkout</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LEFT COLUMN - FORMS */}
          <div className="w-full lg:w-[55%] flex flex-col gap-10">
            
            {/* Customer Details */}
            <section>
              <h2 className="text-lg font-display uppercase tracking-widest mb-6 pb-2 border-b border-[#DDD0BC]">Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <input type="email" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)} className={\`w-full bg-white border p-4 text-[14px] focus:outline-none focus:border-[#C6A15B] \${errors.email ? 'border-red-500' : 'border-[#E9E3DD]'}\`} />
                  {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="Full Name *" value={fullName} onChange={e => setFullName(e.target.value)} className={\`w-full bg-white border p-4 text-[14px] focus:outline-none focus:border-[#C6A15B] \${errors.fullName ? 'border-red-500' : 'border-[#E9E3DD]'}\`} />
                    {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <input type="tel" placeholder="Mobile Number *" value={mobile} onChange={e => setMobile(e.target.value)} maxLength={10} className={\`w-full bg-white border p-4 text-[14px] focus:outline-none focus:border-[#C6A15B] \${errors.mobile ? 'border-red-500' : 'border-[#E9E3DD]'}\`} />
                    {errors.mobile && <p className="text-red-500 text-[11px] mt-1">{errors.mobile}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-lg font-display uppercase tracking-widest mb-6 pb-2 border-b border-[#DDD0BC]">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <input type="text" disabled value={country} className="w-full bg-[#F7F0E8] border border-[#E9E3DD] p-4 text-[14px] text-yatiya-black/70 cursor-not-allowed" />
                </div>
                <div>
                  <input type="text" placeholder="Address Line 1 *" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} className={\`w-full bg-white border p-4 text-[14px] focus:outline-none focus:border-[#C6A15B] \${errors.addressLine1 ? 'border-red-500' : 'border-[#E9E3DD]'}\`} />
                  {errors.addressLine1 && <p className="text-red-500 text-[11px] mt-1">{errors.addressLine1}</p>}
                </div>
                <div>
                  <input type="text" placeholder="Address Line 2 (Optional)" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} className="w-full bg-white border border-[#E9E3DD] p-4 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
                </div>
                <div>
                  <input type="text" placeholder="Landmark (Optional)" value={landmark} onChange={e => setLandmark(e.target.value)} className="w-full bg-white border border-[#E9E3DD] p-4 text-[14px] focus:outline-none focus:border-[#C6A15B]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input type="text" placeholder="City *" value={city} onChange={e => setCity(e.target.value)} className={\`w-full bg-white border p-4 text-[14px] focus:outline-none focus:border-[#C6A15B] \${errors.city ? 'border-red-500' : 'border-[#E9E3DD]'}\`} />
                    {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="State *" value={state} onChange={e => setState(e.target.value)} className={\`w-full bg-white border p-4 text-[14px] focus:outline-none focus:border-[#C6A15B] \${errors.state ? 'border-red-500' : 'border-[#E9E3DD]'}\`} />
                    {errors.state && <p className="text-red-500 text-[11px] mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="Pincode *" value={pincode} onChange={e => setPincode(e.target.value)} maxLength={6} className={\`w-full bg-white border p-4 text-[14px] focus:outline-none focus:border-[#C6A15B] \${errors.pincode ? 'border-red-500' : 'border-[#E9E3DD]'}\`} />
                    {errors.pincode && <p className="text-red-500 text-[11px] mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-lg font-display uppercase tracking-widest mb-6 pb-2 border-b border-[#DDD0BC]">Payment Method</h2>
              <div className="space-y-3">
                <label className={\`flex items-center p-4 border cursor-pointer transition-colors \${paymentMethod === 'ONLINE' ? 'border-[#C6A15B] bg-[#F7F0E8]/50' : 'border-[#E9E3DD] bg-white hover:border-[#C6A15B]'}\`}>
                  <input type="radio" name="payment" value="ONLINE" checked={paymentMethod === 'ONLINE'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-[#C6A15B] accent-[#C6A15B]" />
                  <span className="ml-3 text-[14px] font-medium">Online Payment (Cards, UPI, NetBanking)</span>
                </label>
                <label className={\`flex items-center p-4 border cursor-pointer transition-colors \${paymentMethod === 'COD' ? 'border-[#C6A15B] bg-[#F7F0E8]/50' : 'border-[#E9E3DD] bg-white hover:border-[#C6A15B]'}\`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-[#C6A15B] accent-[#C6A15B]" />
                  <span className="ml-3 text-[14px] font-medium">Cash on Delivery</span>
                </label>
              </div>
            </section>

            <div className="hidden lg:block mt-4">
              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-yatiya-black text-white py-5 text-[13px] uppercase tracking-[0.2em] font-medium hover:bg-[#C6A15B] transition-colors"
              >
                Place Order
              </button>
            </div>
            
          </div>

          {/* RIGHT COLUMN - ORDER SUMMARY */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-[#F7F0E8]/50 border border-[#DDD0BC] p-6 lg:p-8 sticky top-[100px]">
              <h2 className="text-lg font-display uppercase tracking-widest mb-6 pb-4 border-b border-[#DDD0BC]/50">Order Summary</h2>
              
              <div className="space-y-6 mb-6 pb-6 border-b border-[#DDD0BC]/50 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 relative bg-[#F7F0E8] border border-[#DDD0BC] shrink-0">
                      <SmartImage src={item.image} alt={item.title} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-yatiya-black text-white text-[10px] flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[13px] font-medium text-yatiya-black mb-1">{item.title}</h3>
                      <p className="text-[11px] text-yatiya-black/60 uppercase">
                        {item.size && \`Size: \${item.size}\`} {item.color && \`| Color: \${item.color}\`}
                      </p>
                    </div>
                    <div className="text-[14px] font-medium">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mb-6 pb-6 border-b border-[#DDD0BC]/50">
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Discount code (Try YATIYA10)" 
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 bg-white border border-[#E9E3DD] p-3 text-[13px] focus:outline-none focus:border-[#C6A15B] uppercase"
                    />
                    <button onClick={handleApplyCoupon} className="bg-yatiya-black text-white px-6 py-3 text-[11px] uppercase tracking-widest hover:bg-[#C6A15B] transition-colors">
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3">
                    <span className="text-[12px] font-medium text-green-800 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      {appliedCoupon} applied
                    </span>
                    <button onClick={handleRemoveCoupon} className="text-[11px] text-green-800 underline hover:text-green-600">Remove</button>
                  </div>
                )}
                {errors.coupon && <p className="text-red-500 text-[11px] mt-2">{errors.coupon}</p>}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b border-[#DDD0BC]/50">
                <div className="flex justify-between text-[14px]">
                  <span className="text-yatiya-black/70">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[14px] text-green-600">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[14px]">
                  <span className="text-yatiya-black/70">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : \`₹\${shipping.toLocaleString('en-IN')}\`}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-display mb-8">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className="lg:hidden">
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-yatiya-black text-white py-5 text-[13px] uppercase tracking-[0.2em] font-medium hover:bg-[#C6A15B] transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const successPageContent = `"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('yatiya-last-order');
    if (data) {
      try {
        setOrderInfo(JSON.parse(data));
      } catch (e) {}
    }
  }, []);

  return (
    <div className="min-h-[70vh] bg-[#FCFAF7] flex flex-col items-center justify-center py-20 px-6 font-sans">
      <div className="max-w-[600px] w-full bg-white p-10 md:p-16 border border-[#DDD0BC] text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-[#C6A15B]" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl md:text-4xl font-display text-yatiya-black mb-4">Order Confirmed</h1>
        <p className="text-yatiya-black/70 mb-8 leading-relaxed">
          Thank you for shopping with Yatiya Couture. Your mock frontend order has been successfully placed.
        </p>
        
        {orderInfo && (
          <div className="bg-[#F7F0E8]/50 border border-[#E9E3DD] p-6 text-left mb-10">
            <h2 className="text-[11px] uppercase tracking-widest text-yatiya-black/60 mb-4">Order Details (Frontend Mock)</h2>
            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-yatiya-black/70">Order Reference:</span>
                <span className="font-medium text-yatiya-black">{orderInfo.orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yatiya-black/70">Amount Paid:</span>
                <span className="font-medium text-yatiya-black">₹{orderInfo.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yatiya-black/70">Payment Method:</span>
                <span className="font-medium text-yatiya-black">{orderInfo.paymentMethod === 'ONLINE' ? 'Online Payment' : 'Cash on Delivery'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yatiya-black/70">Confirmation Email:</span>
                <span className="font-medium text-yatiya-black">{orderInfo.email}</span>
              </div>
            </div>
          </div>
        )}
        
        <Link href="/" className="inline-block bg-yatiya-black text-white px-10 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/checkout/page.tsx', checkoutPageContent);
fs.writeFileSync('src/app/checkout/success/page.tsx', successPageContent);

console.log("Phase 5 checkout files generated.");
