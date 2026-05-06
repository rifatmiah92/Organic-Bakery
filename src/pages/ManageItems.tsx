import React, { useState } from 'react';
import { Eye, Trash2, Edit, ChevronRight } from 'lucide-react';
import { mockData } from '../lib/mockData';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

const ManageItems = () => {
  const [items, setItems] = useState(mockData);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      setItems(items.filter(i => i.id !== id));
      toast.success('Item removed from menu');
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#4A3322]">Manage Items</h1>
          <p className="text-[#6D4C3D] mt-2">Oversee your bakery's inventory and menu items</p>
        </div>
        <Link 
          to="/items/add" 
          className="bg-[#6D4C3D] text-[#F7F4EF] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#4A3322] transition-all"
        >
          Add New Item
        </Link>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden border border-[#E8E0D5] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F4EF]/50">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-[#6D4C3D] border-b border-[#E8E0D5]">Product</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-[#6D4C3D] border-b border-[#E8E0D5]">Category</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-[#6D4C3D] border-b border-[#E8E0D5]">Price</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-[#6D4C3D] border-b border-[#E8E0D5] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {items.map((item) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group hover:bg-[#F7F4EF]/30 transition-colors"
                  >
                    <td className="px-8 py-6 border-b border-[#E8E0D5]">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#E8E0D5] rounded-xl shrink-0 flex items-center justify-center text-[10px] text-[#4A3322]/20 font-serif italic">
                          IMG
                        </div>
                        <span className="font-serif font-bold text-lg text-[#4A3322]">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-[#E8E0D5]">
                      <span className="bg-[#E8E0D5] text-[#4A3322] px-3 py-1 rounded-full text-xs font-bold text-center">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 border-b border-[#E8E0D5]">
                      <span className="font-bold text-[#6D4C3D]">${item.price.toFixed(2)}</span>
                    </td>
                    <td className="px-8 py-6 border-b border-[#E8E0D5] text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          to={`/items/${item.id}`} 
                          className="p-3 text-[#4A3322] hover:bg-[#E8E0D5] rounded-full transition-colors"
                          title="View Details"
                        >
                          <Eye size={20} />
                        </Link>
                        <button 
                          onClick={() => toast.error('Edit feature coming soon')}
                          className="p-3 text-[#6D4C3D] hover:bg-[#E8E0D5] rounded-full transition-colors"
                          title="Edit"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-3 text-red-400 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#6D4C3D] italic">No items left in the bakery...</p>
        </div>
      )}
    </div>
  );
};

export default ManageItems;
