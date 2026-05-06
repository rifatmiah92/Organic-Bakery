import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, DollarSign, Type, FileText, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    category: 'Breads'
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding item would go here
    toast.success('Delicious item added successfully!');
    navigate('/items/manage');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white p-10 rounded-[40px] shadow-2xl border border-[#E8E0D5]"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-[#4A3322] mb-2">New Creation</h1>
          <p className="text-[#6D4C3D]">Add a fresh bake to the catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322] px-1">Item Name</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6D4C3D]" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[#4A3322] transition-colors"
                  placeholder="e.g. Sourdough Loaf"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322] px-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4A3322] transition-colors appearance-none"
              >
                <option>Breads</option>
                <option>Pastries</option>
                <option>Cakes</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322] px-1">Price ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6D4C3D]" size={18} />
              <input 
                type="number" 
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[#4A3322] transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#4A3322] px-1">Description</label>
            <div className="relative">
              <FileText className="absolute left-4 top-5 text-[#6D4C3D]" size={18} />
              <textarea 
                required
                rows={4}
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full bg-[#F7F4EF]/50 border border-[#E8E0D5] rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[#4A3322] transition-colors"
                placeholder="Describe the flavors, texture..."
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#6D4C3D] text-[#F7F4EF] py-5 rounded-full font-bold text-lg hover:bg-[#4A3322] transition-all shadow-xl shadow-[#6D4C3D]/20 flex items-center justify-center gap-2"
          >
            Add to Menu <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddItem;
