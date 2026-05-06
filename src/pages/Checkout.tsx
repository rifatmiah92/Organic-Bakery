import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, CreditCard, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Review, 2: Payment
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const total = getCartTotal();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to complete purchase');
      navigate('/login');
      return;
    }
    
    toast.loading('Processing payment...', { duration: 2000 });
    
    setTimeout(() => {
      toast.success('Baking your order! Payment successful.');
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#F7F4EF]">
        <ShoppingBag size={80} className="text-[#6D4C3D] opacity-20 mb-6" />
        <h2 className="text-3xl font-serif font-bold text-[#4A3322] mb-4">Your basket is empty</h2>
        <p className="text-[#6D4C3D] mb-8 max-w-md">Looks like you haven't added any treats to your basket yet. Why not explore our menu?</p>
        <Link to="/menu" className="bg-[#6D4C3D] text-[#F7F4EF] px-10 py-4 rounded-full font-bold shadow-xl hover:bg-[#4A3322] transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Cart Items / Forms */}
        <div className="lg:w-2/3">
          <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-[#4A3322]">Checkout</h1>
            <div className="flex gap-4 mt-6">
              <div className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase ${step >= 1 ? 'text-[#4A3322]' : 'text-gray-300'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[#4A3322] bg-[#4A3322] text-white' : 'border-gray-300'}`}>1</span>
                Review
              </div>
              <div className="w-12 h-px bg-gray-200 self-center"></div>
              <div className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase ${step >= 2 ? 'text-[#4A3322]' : 'text-gray-300'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[#4A3322] bg-[#4A3322] text-white' : 'border-gray-300'}`}>2</span>
                Payment
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {cart.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-[32px] border border-[#E8E0D5] flex items-center gap-6 shadow-sm">
                    <div className="w-24 h-24 bg-[#E8E0D5] rounded-2xl flex items-center justify-center text-[10px] text-[#4A3322]/20 font-serif italic shrink-0">
                      IMG
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-serif font-bold text-[#4A3322]">{item.title}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:bg-red-50 p-2 rounded-full">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-[#6D4C3D] mt-1">{item.category}</p>
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center gap-4 text-sm font-bold text-[#4A3322]">
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <span className="font-bold text-[#4A3322] text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end pt-8">
                  <button 
                    onClick={() => setStep(2)}
                    className="bg-[#6D4C3D] text-[#F7F4EF] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#4A3322] transition-colors flex items-center gap-2 shadow-xl"
                  >
                    Proceed to Payment <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form onSubmit={handleCheckout} className="bg-white p-10 rounded-[40px] border border-[#E8E0D5] shadow-xl space-y-8">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#4A3322] mb-6">Delivery Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322]">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4A3322] transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322]">Shipping Address</label>
                        <input 
                          type="text" 
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4A3322] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#4A3322] mb-6">Payment Information</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322]">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6D4C3D] opacity-40" size={20} />
                          <input 
                            type="text" 
                            required
                            placeholder="0000 0000 0000 0000"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                            className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[#4A3322] transition-colors"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322]">Expiry Date</label>
                          <input 
                            type="text" 
                            required
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                            className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4A3322] transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322]">CVV</label>
                          <input 
                            type="text" 
                            required
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                            className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4A3322] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-10 py-5 rounded-full border-2 border-[#E8E0D5] text-[#4A3322] font-bold text-lg hover:bg-[#F7F4EF]"
                    >
                      Back to Basket
                    </button>
                    <button 
                      type="submit"
                      className="flex-grow bg-[#6D4C3D] text-[#F7F4EF] py-5 rounded-full font-bold text-lg hover:bg-[#4A3322] transition-colors shadow-xl"
                    >
                      Complete Purchase ${total.toFixed(2)}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Summary */}
        <div className="lg:w-1/3">
          <div className="bg-[#4A3322] text-[#F7F4EF] p-10 rounded-[40px] shadow-2xl sticky top-8">
            <h3 className="text-2xl font-serif font-bold mb-8">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm opacity-80">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm opacity-80">
                <span>Shipping</span>
                <span className="text-green-300 font-bold uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="flex justify-between text-sm opacity-80">
                <span>Tax (Organic Surcharge)</span>
                <span>$2.50</span>
              </div>
              <div className="h-px bg-white/20 my-6"></div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${(total + 2.5).toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                <ShieldCheck size={20} />
                Secure Checkout
              </div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                <Truck size={20} />
                Fresh Next Day Delivery
              </div>
            </div>
            
            <div className="mt-12 bg-white/5 p-6 rounded-3xl border border-white/10">
               <p className="text-[10px] uppercase font-bold tracking-widest opacity-50 mb-2">Notice</p>
               <p className="text-xs leading-relaxed opacity-80 italic">Orders placed before 4PM are baked fresh tonight and delivered tomorrow morning.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
