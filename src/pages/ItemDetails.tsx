import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CheckCircle2, Heart } from 'lucide-react';
import { mockData } from '../lib/mockData';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToSaved } = useCart();
  const item = mockData.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-[#4A3322] mb-4">Pastry not found</h2>
          <Link to="/menu" className="text-[#6D4C3D] hover:underline">Back to Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#6D4C3D] hover:text-[#4A3322] font-medium mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Menu
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Image placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-square bg-[#E8E0D5] rounded-[40px] flex items-center justify-center border border-[#E8E0D5]/50 shadow-inner overflow-hidden"
        >
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.classList.add('flex-col');
                const placeholder = document.createElement('div');
                placeholder.className = "text-[#4A3322]/10 font-serif italic text-4xl text-center p-12";
                placeholder.innerHTML = `${item.title}<br/><span class="text-xl">Image Placeholder</span>`;
                target.parentElement!.appendChild(placeholder);
              }}
            />
          ) : (
            <div className="text-[#4A3322]/10 font-serif italic text-4xl text-center p-12 text-balance">
              {item.title} <br/> 
              <span className="text-xl">Image Placeholder</span>
            </div>
          )}
        </motion.div>

        {/* Right Column: Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <span className="inline-block bg-[#6D4C3D]/10 text-[#6D4C3D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {item.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#4A3322] mb-4 leading-tight">{item.title}</h1>
            <p className="text-4xl font-sans font-bold text-[#6D4C3D]">${item.price.toFixed(2)}</p>
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#4A3322] mb-3">Description</h3>
              <p className="text-lg text-[#6D4C3D] leading-relaxed">{item.desc}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#4A3322] mb-4">Ingredients</h3>
              <ul className="grid grid-cols-2 gap-3">
                {item.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#6D4C3D]">
                    <CheckCircle2 size={16} className="text-[#6D4C3D] opacity-40 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => addToCart(item)}
              className="flex-grow bg-[#6D4C3D] text-[#F7F4EF] py-5 rounded-full font-bold text-lg hover:bg-[#4A3322] transition-colors flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              <ShoppingBag size={24} />
              Add to Basket
            </button>
            <button 
              onClick={() => addToSaved(item)}
              className="px-10 py-5 rounded-full border-2 border-[#E8E0D5] text-[#4A3322] font-bold text-lg hover:bg-white transition-all flex items-center gap-2 group active:scale-95"
            >
              <Heart size={24} className="group-hover:fill-[#4A3322] transition-colors" />
              Save Later
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-[#E8E0D5] flex items-center justify-between text-xs text-[#6D4C3D] font-bold tracking-widest uppercase">
            <div className="flex gap-4">
              <span>Delivery Available</span>
              <span>•</span>
              <span>Plastic Free Packaging</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItemDetails;
