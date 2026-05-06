import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Eye } from 'lucide-react';
import { mockData } from '../lib/mockData';
import { motion, AnimatePresence } from 'motion/react';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [items, setItems] = useState(mockData);

  useEffect(() => {
    const filtered = mockData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || item.category === category;
      return matchesSearch && matchesCategory;
    });
    setItems(filtered);
  }, [searchTerm, category]);

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-[#4A3322] mb-4">Our Menu</h1>
        <p className="text-[#6D4C3D] font-sans">Browse our collection of fresh, stone-baked organic treats</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6D4C3D]" size={20} />
          <input 
            type="text" 
            placeholder="Search for bread, cake, or pastry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E8E0D5] rounded-full py-4 pl-12 pr-6 text-[#4A3322] focus:outline-none focus:border-[#6D4C3D] transition-colors"
          />
        </div>
        <div className="flex gap-4">
          {['All', 'Breads', 'Pastries', 'Cakes'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-4 rounded-full text-sm font-medium transition-all ${
                category === cat 
                  ? 'bg-[#6D4C3D] text-[#F7F4EF] shadow-lg shadow-[#6D4C3D]/20' 
                  : 'bg-white text-[#6D4C3D] border border-[#E8E0D5] hover:bg-[#F7F4EF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode='popLayout'>
          {items.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={item.id}
              className="bg-white rounded-[32px] overflow-hidden border border-[#E8E0D5] shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="aspect-square bg-[#E8E0D5] relative overflow-hidden flex items-center justify-center">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#4A3322]/10 font-serif italic text-2xl">
                    {item.category}
                  </div>
                )}
                <div className="absolute inset-0 bg-[#4A3322]/0 group-hover:bg-[#4A3322]/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <Link to={`/items/${item.id}`} className="bg-white text-[#4A3322] p-4 rounded-full shadow-xl">
                      <Eye size={24} />
                   </Link>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase font-bold text-[#6D4C3D] tracking-widest">{item.category}</span>
                  <span className="text-xl font-bold text-[#4A3322]">${item.price.toFixed(2)}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#4A3322] mb-3">{item.title}</h3>
                <p className="text-sm text-[#6D4C3D] mb-8 line-clamp-2 leading-relaxed">{item.desc}</p>
                <Link 
                  to={`/items/${item.id}`} 
                  className="inline-flex items-center gap-2 font-bold text-[#4A3322] hover:text-[#6D4C3D] transition-all"
                >
                  View Details <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <div className="text-center py-24">
          <p className="text-2xl font-serif text-[#6D4C3D] opacity-40 italic">No delicious treats found for your search...</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
