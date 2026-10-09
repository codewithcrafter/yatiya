const fs = require('fs');

// Update src/app/checkout/page.tsx
let checkoutContent = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');

if (!checkoutContent.includes('useCustomer')) {
  checkoutContent = checkoutContent.replace(
    "import { useCart } from '@/context/CartContext';",
    "import { useCart } from '@/context/CartContext';\nimport { useCustomer } from '@/context/CustomerContext';"
  );
  
  checkoutContent = checkoutContent.replace(
    "const { items, cartTotal, clearCart } = useCart();",
    "const { items, cartTotal, clearCart } = useCart();\n  const { addOrder } = useCustomer();"
  );
  
  // Replace the sessionStorage order block with the new order object
  checkoutContent = checkoutContent.replace(
    "sessionStorage.setItem('yatiya-last-order', JSON.stringify({",
    `
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
        price: i.price
      })),
      subtotal: total,
      discount: discountAmount,
      shipping: shippingCost,
      total: finalTotal,
      payment: {
        method: payment.method,
        status: payment.method === 'ONLINE' ? 'PAID' : 'PENDING'
      },
      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country
      },
      shipment: {
        trackingId: 'YAT-TRACK-' + Math.floor(10000 + Math.random() * 90000),
        carrier: 'Delhivery',
        status: 'In Transit'
      }
    };
    addOrder(mockOrder);
    
    sessionStorage.setItem('yatiya-last-order', JSON.stringify({`
  );
  
  fs.writeFileSync('src/app/checkout/page.tsx', checkoutContent);
}

// Update src/app/checkout/success/page.tsx
let successContent = fs.readFileSync('src/app/checkout/success/page.tsx', 'utf8');
if (!successContent.includes('/account/orders')) {
  successContent = successContent.replace(
    '<Link href="/" className="inline-block bg-yatiya-black text-white px-10 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors">\n          Return to Home\n        </Link>',
    `<div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={\`/account/orders/\${orderInfo?.orderRef}\`} className="inline-block bg-yatiya-black text-white px-10 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#C6A15B] transition-colors">
            View My Order
          </Link>
          <Link href="/" className="inline-block border border-[#E9E3DD] text-yatiya-black px-10 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-[#FCFAF7] transition-colors">
            Return to Home
          </Link>
        </div>`
  );
  fs.writeFileSync('src/app/checkout/success/page.tsx', successContent);
}

console.log('Checkout updated for Phase 6.');
