"use client";

import { useState } from 'react';
import { useCustomer } from '@/context/CustomerContext';

export default function ProfilePage() {
  const { customer, updateProfile } = useCustomer();
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setMsg('All fields are required.');
      return;
    }
    updateProfile(formData);
    setMsg('Profile updated successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="bg-yatiya-cream border border-yatiya-light-gold p-6 md:p-10 shadow-sm">
      <h2 className="text-2xl font-display text-yatiya-dark-cocoa mb-6">Profile Settings</h2>
      
      {msg && (
        <div className={`mb-6 p-4 text-[13px] ${msg.includes('success') ? 'bg-yatiya-ivory text-yatiya-roman-gold' : 'bg-red-50 text-red-600'}`}>
          {msg}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div>
          <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-[12px] uppercase tracking-widest text-yatiya-dark-cocoa/70 mb-2">Mobile Number</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full border border-yatiya-light-gold p-3 text-[14px] text-yatiya-dark-cocoa focus:outline-none focus:border-yatiya-roman-gold bg-transparent"
            required
          />
        </div>
        
        <button type="submit" className="bg-yatiya-antique-gold text-yatiya-light-text border border-yatiya-antique-gold px-8 py-3 text-[12px] uppercase tracking-widest font-medium hover:bg-yatiya-deep-bronze hover:border-yatiya-deep-bronze hover:text-yatiya-light-text transition-colors w-full md:w-auto">
          Save Changes
        </button>
      </form>
    </div>
  );
}
