import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu as MenuIcon, Phone, Instagram, Facebook, Twitter, Plus, Settings, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, saved } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#4A3322] text-[#F7F4EF] py-2 px-4 md:px-8 flex justify-between items-center text-xs font-sans">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone size={14} /> +1 (555) BAKERY-1
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Instagram size={14} className="cursor-pointer hover:opacity-80" />
          <Facebook size={14} className="cursor-pointer hover:opacity-80" />
          <Twitter size={14} className="cursor-pointer hover:opacity-80" />
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#F7F4EF] py-4 px-4 md:px-8 flex justify-between items-center border-b border-[#E8E0D5]">
        <Link to="/" className="text-2xl font-serif font-bold text-[#4A3322] tracking-tighter">
          BAKERY
          <span className="block text-[10px] font-sans font-normal tracking-[0.2em] -mt-1 text-[#6D4C3D]">ORGANIC SWEETS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-sans font-medium text-[#4A3322]">
          <Link to="/" className="hover:text-[#6D4C3D] transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-[#6D4C3D] transition-colors">Menu</Link>
          <Link to="/about" className="hover:text-[#6D4C3D] transition-colors">About</Link>
          <Link to="/contact" className="hover:text-[#6D4C3D] transition-colors">Contact Us</Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link to="/checkout" className="relative p-2 text-[#4A3322] hover:bg-white rounded-full transition-colors group">
            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6D4C3D] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#F7F4EF]">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {!user ? (
            <Link 
              to="/login" 
              className="bg-[#6D4C3D] text-[#F7F4EF] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#4A3322] transition-colors border border-transparent"
            >
              Order Now
            </Link>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-[#6D4C3D] text-[#F7F4EF] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#4A3322] transition-colors shadow-lg shadow-[#6D4C3D]/10"
              >
                <User size={16} />
                <span className="hidden sm:inline">My Account</span>
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-52 bg-white border border-[#E8E0D5] rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-[#F7F4EF]/50 border-b border-[#E8E0D5]">
                      <p className="text-[10px] font-bold text-[#6D4C3D] uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="text-xs font-bold text-[#4A3322] truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/items/add" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#4A3322] hover:bg-[#F7F4EF] transition-colors"
                    >
                      <Plus size={16} className="opacity-60" /> Add Item
                    </Link>
                    <Link 
                      to="/items/manage" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#4A3322] hover:bg-[#F7F4EF] transition-colors"
                    >
                      <Settings size={16} className="opacity-60" /> Manage Items
                    </Link>
                    <div className="h-px bg-[#E8E0D5] mx-2"></div>
                    <button 
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <button className="md:hidden text-[#4A3322] p-2">
            <MenuIcon size={24} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
