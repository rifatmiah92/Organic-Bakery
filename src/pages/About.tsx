import React from 'react';
import { motion } from 'motion/react';
import { Heart, Leaf, Sun, Coffee } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4 md:px-8 bg-[#F7F4EF]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase font-bold text-[#6D4C3D] tracking-[0.4em] mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#4A3322] mb-12 leading-tight">
            Baked with Love, <br/> Grown for You.
          </h1>
          <div className="aspect-[16/7] bg-[#E8E0D5] rounded-[40px] shadow-2xl relative overflow-hidden flex items-center justify-center">
             <img 
              src="/images/about-bakery.jpg" 
              alt="Bakery Interior" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling!.classList.remove('hidden');
              }}
             />
             <div className="absolute inset-0 flex items-center justify-center text-[#4A3322]/10 font-serif italic text-4xl hidden">
               Bakery Interior Placeholder
             </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-[#4A3322]">A Tradition of Purity</h2>
            <p className="text-lg text-[#6D4C3D] leading-relaxed">
              Founded in 2024, our Organic Bakery began as a small home kitchen project. We believe that what you put into your body should be as pure as the Earth intended. That's why every loaf, cake, and pastry is 100% plant-based and made from 100% organic ingredients.
            </p>
            <p className="text-lg text-[#6D4C3D] leading-relaxed">
              We work directly with local organic farmers to source our grains, fruits, and nuts, ensuring that every bite supports sustainable agriculture and a healthier planet.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
               <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-[#E8E0D5]">
                  <Leaf className="text-[#6D4C3D] mb-4" size={32} />
                  <span className="font-serif font-bold text-lg text-[#4A3322]">100% Vegan</span>
               </div>
               <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-[#E8E0D5]">
                  <Sun className="text-[#6D4C3D] mb-4" size={32} />
                  <span className="font-serif font-bold text-lg text-[#4A3322]">Organic Soil</span>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 h-[600px]">
             <div className="space-y-6">
                <div className="h-2/3 bg-[#E8E0D5] rounded-3xl overflow-hidden">
                  <img src="/images/about-collage-1.jpg" alt="About 1" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.visibility = 'hidden'}/>
                </div>
                <div className="h-1/3 bg-[#E8E0D5] rounded-3xl overflow-hidden">
                  <img src="/images/about-collage-2.jpg" alt="About 2" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.visibility = 'hidden'}/>
                </div>
             </div>
             <div className="space-y-6 pt-12">
                <div className="h-1/3 bg-[#E8E0D5] rounded-3xl overflow-hidden">
                  <img src="/images/about-collage-3.jpg" alt="About 3" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.visibility = 'hidden'}/>
                </div>
                <div className="h-2/3 bg-[#E8E0D5] rounded-3xl overflow-hidden">
                  <img src="/images/about-collage-4.jpg" alt="About 4" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.visibility = 'hidden'}/>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#4A3322]">Our Core Values</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: "Transparency", 
              desc: "From seed to slice, we share exactly where our ingredients come from and how they are handled.",
              icon: Heart 
            },
            { 
              title: "Sustainability", 
              desc: "Plastic-free packaging and zero-waste kitchen practices are mandatory in our daily operations.",
              icon: Coffee 
            },
            { 
              title: "Community", 
              desc: "We host weekly workshops to teach the art of breadmaking and sustainable living.",
              icon: Sun 
            }
          ].map((v, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-[#F7F4EF] rounded-full flex items-center justify-center mx-auto mb-6">
                <v.icon size={24} className="text-[#6D4C3D]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#4A3322] mb-4">{v.title}</h3>
              <p className="text-sm text-[#6D4C3D] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
