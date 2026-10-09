"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart, CartItem } from '@/context/CartContext';
import { useCustomer } from '@/context/CustomerContext';
import { SmartImage } from '@/components/ui/SmartImage';

import { Suspense } from 'react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items: cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useCustomer();
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

  if (!mounted) return <div className="min-h-screen bg-yatiya-ivory"></div>;

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-yatiya-ivory flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-3xl font-display text-yatiya-dark-cocoa mb-4">Checkout</h1>
        <p className="text-yatiya-dark-cocoa/70 mb-8 font-sans">Your cart is currently empty.</p>
        <Link href="/products" className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
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
    if (!mobile.trim() || !/^\d{10}$/.test(mobile)) newErrors.mobile = 'Valid 10-digit mobile number is required.';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Valid email is required.';
    
    if (!addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required.';
    if (!city.trim()) newErrors.city = 'City is required.';
    if (!state.trim()) newErrors.state = 'State is required.';
    if (!pincode.trim() || !/^\d{6}$/.test(pincode)) newErrors.pincode = 'Valid 6-digit pincode is required.';
    
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
      
    const mockOrder = {
      id: orderRef,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'CONFIRMED',
      items: checkoutItems.map(i => ({
        productId: i.productId,
        title: i.title,
        image: i.image,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        price: i.price,
        customMeasurements: i.customMeasurements
      })),
      subtotal: subtotal,
      discount: discountAmount,
      shipping: shipping,
      total: total,
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'ONLINE' ? 'PAID' : 'PENDING'
      },
      shippingAddress: {
        fullName: fullName,
        phone: mobile,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        pincode: pincode,
        country: country
      },
      shipment: {
        trackingId: 'YAT-TRACK-' + Math.floor(10000 + Math.random() * 90000),
        carrier: 'Delhivery',
        status: 'In Transit'
      }
    };
    addOrder(mockOrder as any);
    
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
    <div className="min-h-screen bg-yatiya-ivory py-12 px-6 font-sans text-yatiya-dark-cocoa">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 text-center lg:text-left">
          <Link href="/" className="text-2xl font-display uppercase tracking-widest text-yatiya-dark-cocoa hover:opacity-80">
            Yatiya Couture
          </Link>
          <div className="flex items-center justify-center lg:justify-start gap-2 text-[12px] text-yatiya-dark-cocoa/60 uppercase tracking-widest mt-6">
            <Link href="/cart" className="hover:text-yatiya-dark-cocoa">Cart</Link>
            <span>/</span>
            <span className="text-yatiya-dark-cocoa font-medium">Checkout</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LEFT COLUMN - FORMS */}
          <div className="w-full lg:w-[55%] flex flex-col gap-10">
            
            {/* Customer Details */}
            <section>
              <h2 className="text-lg font-display uppercase tracking-widest mb-6 pb-2 border-b border-yatiya-light-gold">Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <input type="email" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)} className={`w-full bg-yatiya-cream border p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold ${errors.email ? 'border-red-500' : 'border-yatiya-light-gold'}`} />
                  {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="Full Name *" value={fullName} onChange={e => setFullName(e.target.value)} className={`w-full bg-yatiya-cream border p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold ${errors.fullName ? 'border-red-500' : 'border-yatiya-light-gold'}`} />
                    {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <input type="tel" placeholder="Mobile Number *" value={mobile} onChange={e => setMobile(e.target.value)} maxLength={10} className={`w-full bg-yatiya-cream border p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold ${errors.mobile ? 'border-red-500' : 'border-yatiya-light-gold'}`} />
                    {errors.mobile && <p className="text-red-500 text-[11px] mt-1">{errors.mobile}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-lg font-display uppercase tracking-widest mb-6 pb-2 border-b border-yatiya-light-gold">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <input type="text" disabled value={country} className="w-full bg-yatiya-ivory border border-yatiya-light-gold p-4 text-[14px] text-yatiya-dark-cocoa/70 cursor-not-allowed" />
                </div>
                <div>
                  <input type="text" placeholder="Address Line 1 *" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} className={`w-full bg-yatiya-cream border p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold ${errors.addressLine1 ? 'border-red-500' : 'border-yatiya-light-gold'}`} />
                  {errors.addressLine1 && <p className="text-red-500 text-[11px] mt-1">{errors.addressLine1}</p>}
                </div>
                <div>
                  <input type="text" placeholder="Address Line 2 (Optional)" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} className="w-full bg-yatiya-cream border border-yatiya-light-gold p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
                </div>
                <div>
                  <input type="text" placeholder="Landmark (Optional)" value={landmark} onChange={e => setLandmark(e.target.value)} className="w-full bg-yatiya-cream border border-yatiya-light-gold p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input type="text" placeholder="City *" value={city} onChange={e => setCity(e.target.value)} className={`w-full bg-yatiya-cream border p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold ${errors.city ? 'border-red-500' : 'border-yatiya-light-gold'}`} />
                    {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="State *" value={state} onChange={e => setState(e.target.value)} className={`w-full bg-yatiya-cream border p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold ${errors.state ? 'border-red-500' : 'border-yatiya-light-gold'}`} />
                    {errors.state && <p className="text-red-500 text-[11px] mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="Pincode *" value={pincode} onChange={e => setPincode(e.target.value)} maxLength={6} className={`w-full bg-yatiya-cream border p-4 text-[14px] focus:outline-none focus:border-yatiya-roman-gold ${errors.pincode ? 'border-red-500' : 'border-yatiya-light-gold'}`} />
                    {errors.pincode && <p className="text-red-500 text-[11px] mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-lg font-display uppercase tracking-widest mb-6 pb-2 border-b border-yatiya-light-gold">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border cursor-pointer transition-colors ${paymentMethod === 'ONLINE' ? 'border-yatiya-roman-gold bg-yatiya-ivory/50' : 'border-yatiya-light-gold bg-yatiya-cream hover:border-yatiya-roman-gold'}`}>
                  <input type="radio" name="payment" value="ONLINE" checked={paymentMethod === 'ONLINE'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-yatiya-roman-gold accent-[#C6A15B]" />
                  <span className="ml-3 text-[14px] font-medium">Online Payment (Cards, UPI, NetBanking)</span>
                </label>
                <label className={`flex items-center p-4 border cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-yatiya-roman-gold bg-yatiya-ivory/50' : 'border-yatiya-light-gold bg-yatiya-cream hover:border-yatiya-roman-gold'}`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-yatiya-roman-gold accent-[#C6A15B]" />
                  <span className="ml-3 text-[14px] font-medium">Cash on Delivery</span>
                </label>
              </div>
            </section>

            <div className="hidden lg:block mt-4">
              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold py-5 text-[13px] uppercase tracking-[0.2em] font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors"
              >
                Place Order
              </button>
            </div>
            
          </div>

          {/* RIGHT COLUMN - ORDER SUMMARY */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-yatiya-ivory/50 border border-yatiya-light-gold p-6 lg:p-8 sticky top-[100px]">
              <h2 className="text-lg font-display uppercase tracking-widest mb-6 pb-4 border-b border-yatiya-light-gold/50">Order Summary</h2>
              
              <div className="space-y-6 mb-6 pb-6 border-b border-yatiya-light-gold/50 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 relative bg-yatiya-ivory border border-yatiya-light-gold shrink-0">
                      <SmartImage src={item.image} alt={item.title} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold text-[10px] flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[13px] font-medium text-yatiya-dark-cocoa mb-1">{item.title}</h3>
                      <p className="text-[11px] text-yatiya-dark-cocoa/60 uppercase">
                        {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                      </p>
                      {item.customMeasurements && (
                        <div className="mt-1 text-[10px] text-yatiya-dark-cocoa/50">
                          Custom Measurements Included
                        </div>
                      )}
                    </div>
                    <div className="text-[14px] font-medium">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mb-6 pb-6 border-b border-yatiya-light-gold/50">
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Discount code (Try YATIYA10)" 
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 bg-yatiya-cream border border-yatiya-light-gold p-3 text-[13px] focus:outline-none focus:border-yatiya-roman-gold uppercase"
                    />
                    <button onClick={handleApplyCoupon} className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-6 py-3 text-[11px] uppercase tracking-widest hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
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
              <div className="space-y-3 mb-6 pb-6 border-b border-yatiya-light-gold/50">
                <div className="flex justify-between text-[14px]">
                  <span className="text-yatiya-dark-cocoa/70">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[14px] text-green-600">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[14px]">
                  <span className="text-yatiya-dark-cocoa/70">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-display mb-8">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className="lg:hidden">
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold py-5 text-[13px] uppercase tracking-[0.2em] font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors"
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


export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-yatiya-ivory"></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
