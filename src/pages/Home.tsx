import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Section 1: Hero */}
      <section className="relative h-[85vh] flex items-center justify-center pt-8">
        <div className="absolute inset-0 z-0 mx-4 md:mx-8 rounded-[40px] overflow-hidden group">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Bakery Hero" 
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.classList.add('bg-[#E8E0D5]');
            }}
          />
          {/* Hero background placeholder text (always visible or fallback) */}
          <div className="absolute inset-0 flex items-center justify-center text-[#4A3322]/10 font-serif text-8xl md:text-[15rem] select-none text-center pointer-events-none">
            ORGANIC<br/>BAKERY
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl text-center px-4"
        >
          <div className="bg-white/90 backdrop-blur-md p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/50">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#4A3322] leading-tight mb-6">
              Freshly Baked, <br/> Just for You!
            </h1>
            <p className="text-lg text-[#6D4C3D] font-sans mb-10 leading-relaxed">
              Experience the art of artisanal baking with our 100% organic, vegan-friendly creations delivered fresh to your door.
            </p>
            <Link 
              to="/menu" 
              className="inline-flex items-center gap-2 bg-[#6D4C3D] text-[#F7F4EF] px-10 py-5 rounded-full text-lg font-medium hover:bg-[#4A3322] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#6D4C3D]/30"
            >
              Order Now <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Why Choose Us? */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-bold text-[#6D4C3D] tracking-[0.4em]">Benefits</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4A3322] mt-2">Why Choose Us?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: "Artisan Breads", 
              desc: "Slow-fermented sourdoughs and rustic grains baked daily in our stone ovens.",
              icon: Star,
              image: "/images/feature-bread.jpg"
            },
            { 
              title: "Sweet Pastries", 
              desc: "Delicate layers of dairy-free butter and organic fruits for the perfect treat.",
              icon: Clock,
              image: "/images/feature-pastry.jpg"
            },
            { 
              title: "Custom Cakes", 
              desc: "Stunning, vegan showstoppers for your most special celebrations.",
              icon: ShieldCheck,
              image: "/images/feature-cake.jpg"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="group flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-[#E8E0D5] shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-full aspect-square bg-[#E8E0D5] rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const icon = target.nextElementSibling;
                    if (icon) icon.classList.remove('hidden');
                  }}
                />
                <item.icon size={48} className="text-[#6D4C3D] opacity-20 hidden" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#4A3322] mb-4">{item.title}</h3>
              <p className="text-[#6D4C3D] text-sm leading-relaxed mb-8">{item.desc}</p>
              <Link to="/menu" className="text-sm font-bold text-[#4A3322] flex items-center gap-1 group-hover:gap-2 transition-all">
                View More <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 3: Visit Us Today */}
      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4A3322] mb-8 leading-tight">Visit Us Today</h2>
            <p className="text-[#6D4C3D] text-lg leading-relaxed mb-10">
              Come smell the warm cinnamon and fresh dough. Our boutique bakery is open 7 days a week, serving the best coffee and organic snacks in the city.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#F7F4EF] rounded-full flex items-center justify-center shrink-0">
                  <Clock className="text-[#6D4C3D]" size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#4A3322]">Open Every Day</h4>
                  <p className="text-sm text-[#6D4C3D]">8:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#F7F4EF] rounded-full flex items-center justify-center shrink-0">
                  <ArrowRight className="text-[#6D4C3D]" size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#4A3322]">Find Us</h4>
                  <p className="text-sm text-[#6D4C3D]">123 Flour Street, Cookie Town</p>
                </div>
              </div>
            </div>
            <button className="bg-[#6D4C3D] text-[#F7F4EF] px-10 py-5 rounded-full text-lg font-medium hover:bg-[#4A3322] transition-colors shadow-lg">
              Get Directions
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md lg:justify-self-end">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="aspect-square bg-[#E8E0D5] rounded-3xl overflow-hidden shadow-md group border border-[#E8E0D5]/50"
              >
                <img 
                  src={`/images/visit-${i}.jpg`} 
                  alt={`Bakery visit ${i}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Gallery */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square bg-[#E8E0D5] rounded-3xl overflow-hidden flex items-center justify-center relative group">
               <img 
                src={`/images/gallery-${i}.jpg`} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.classList.remove('hidden');
                }}
               />
               <span className="text-[#4A3322]/20 font-serif italic hidden">Gallery {i}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
