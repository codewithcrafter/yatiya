"use client";

import { useState } from 'react';
import { useCustomer, CustomerAddress } from '@/context/CustomerContext';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useCustomer();
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddr, setCurrentAddr] = useState<Partial<CustomerAddress>>({});

  const handleEdit = (addr: CustomerAddress) => {
    setCurrentAddr(addr);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentAddr({
      fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India', isDefault: false
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAddr.id) {
      updateAddress(currentAddr.id, currentAddr as any);
    } else {
      addAddress(currentAddr as any);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 md:p-10 shadow-sm">
        <h2 className="text-2xl font-display text-yatiya-dark-cocoa mb-6">{currentAddr.id ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Full Name *</label>
              <input type="text" required value={currentAddr.fullName || ''} onChange={e => setCurrentAddr({...currentAddr, fullName: e.target.value})} className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Phone *</label>
              <input type="tel" required value={currentAddr.phone || ''} onChange={e => setCurrentAddr({...currentAddr, phone: e.target.value})} className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Address Line 1 *</label>
              <input type="text" required value={currentAddr.addressLine1 || ''} onChange={e => setCurrentAddr({...currentAddr, addressLine1: e.target.value})} className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Address Line 2 (Optional)</label>
              <input type="text" value={currentAddr.addressLine2 || ''} onChange={e => setCurrentAddr({...currentAddr, addressLine2: e.target.value})} className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">City *</label>
              <input type="text" required value={currentAddr.city || ''} onChange={e => setCurrentAddr({...currentAddr, city: e.target.value})} className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">State *</label>
              <input type="text" required value={currentAddr.state || ''} onChange={e => setCurrentAddr({...currentAddr, state: e.target.value})} className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Pincode *</label>
              <input type="text" required pattern="[0-9]{6}" value={currentAddr.pincode || ''} onChange={e => setCurrentAddr({...currentAddr, pincode: e.target.value})} className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Country</label>
              <input type="text" required value={currentAddr.country || 'India'} onChange={e => setCurrentAddr({...currentAddr, country: e.target.value})} className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold" />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <input type="checkbox" id="default" checked={currentAddr.isDefault || false} onChange={e => setCurrentAddr({...currentAddr, isDefault: e.target.checked})} className="w-4 h-4 text-yatiya-roman-gold" />
            <label htmlFor="default" className="text-[14px] text-yatiya-dark-cocoa">Set as default address</label>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-8 py-3 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors">
              Save Address
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="border border-yatiya-light-gold text-yatiya-dark-cocoa px-8 py-3 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-ivory transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-display text-yatiya-dark-cocoa mb-2">Saved Addresses</h2>
          <p className="text-yatiya-dark-cocoa/70 text-[14px]">Manage your shipping and billing addresses.</p>
        </div>
        <button onClick={handleAddNew} className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-6 py-3 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-yatiya-cream border border-yatiya-light-gold p-10 text-center shadow-sm">
          <MapPin className="w-10 h-10 text-yatiya-roman-gold mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-yatiya-dark-cocoa mb-2">No saved addresses</h3>
          <p className="text-[14px] text-yatiya-dark-cocoa/70 mb-6">You haven't saved any addresses yet.</p>
          <button onClick={handleAddNew} className="border border-yatiya-roman-gold text-yatiya-roman-gold px-6 py-2 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text hover:text-yatiya-light-text transition-colors">
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map(addr => (
            <div key={addr.id} className={`bg-yatiya-cream border p-6 relative shadow-sm ${addr.isDefault ? 'border-yatiya-roman-gold' : 'border-yatiya-light-gold'}`}>
              {addr.isDefault && (
                <span className="absolute top-0 right-0 bg-yatiya-roman-gold text-yatiya-light-text text-[10px] uppercase tracking-widest px-3 py-1 font-medium">Default</span>
              )}
              <h3 className="font-medium text-yatiya-dark-cocoa mb-2">{addr.fullName}</h3>
              <div className="text-[14px] text-yatiya-dark-cocoa/70 space-y-1 mb-6">
                <p>{addr.addressLine1}</p>
                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                <p>{addr.city}, {addr.state} {addr.pincode}</p>
                <p>{addr.country}</p>
                <p className="pt-2">Mobile: {addr.phone}</p>
              </div>
              <div className="flex items-center gap-4 border-t border-yatiya-light-gold pt-4">
                <button onClick={() => handleEdit(addr)} className="text-[13px] text-yatiya-dark-cocoa hover:text-yatiya-roman-gold flex items-center gap-1">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <span className="text-[#E9E3DD]">|</span>
                <button onClick={() => deleteAddress(addr.id)} className="text-[13px] text-red-500 hover:text-red-700 flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
                {!addr.isDefault && (
                  <>
                    <span className="text-[#E9E3DD]">|</span>
                    <button onClick={() => setDefaultAddress(addr.id)} className="text-[13px] text-yatiya-roman-gold hover:text-yatiya-dark-cocoa">
                      Set Default
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
