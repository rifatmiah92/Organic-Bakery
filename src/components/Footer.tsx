import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#F7F4EF] border-t border-[#E8E0D5] py-12 px-4 md:px-8 text-[#4A3322]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter">
            BAKERY
          </Link>
          <p className="mt-4 text-sm font-sans leading-relaxed opacity-80">
            Artisanal organic treats baked with love and the finest plant-based ingredients for a healthier, happier you.
          </p>
          <div className="flex gap-4 mt-6">
            <Instagram size={18} className="hover:text-[#6D4C3D] cursor-pointer" />
            <Facebook size={18} className="hover:text-[#6D4C3D] cursor-pointer" />
            <Twitter size={18} className="hover:text-[#6D4C3D] cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="font-serif font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm font-sans opacity-80">
            <li><Link to="/" className="hover:text-[#6D4C3D]">Home</Link></li>
            <li><Link to="/menu" className="hover:text-[#6D4C3D]">Our Menu</Link></li>
            <li><Link to="/about" className="hover:text-[#6D4C3D]">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#6D4C3D]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-sm font-sans opacity-80">
            <li><Link to="/shipping" className="hover:text-[#6D4C3D]">Shipping Info</Link></li>
            <li><Link to="/returns" className="hover:text-[#6D4C3D]">Returns Policy</Link></li>
            <li><Link to="/faq" className="hover:text-[#6D4C3D]">FAQs</Link></li>
            <li><Link to="/privacy" className="hover:text-[#6D4C3D]">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-lg mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm font-sans opacity-80">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 -mt-0.5" />
              <span>123 Flour Street, Cookie Town, CA 90210</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0" />
              <span>+1 (555) BAKERY-1</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0" />
              <span>hello@organicbakery.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#E8E0D5] text-center text-[10px] font-sans uppercase tracking-widest opacity-50">
        © 2026 ORGANIC BAKERY E-COMMERCE. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
