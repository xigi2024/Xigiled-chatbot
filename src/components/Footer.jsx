import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/Xigilogo.png'

const Footer = () => {
  return (
    <footer className="bg-black/95 text-white">
      <div className="container mx-auto px-4 py-12 md:py-10">
        <div className="grid grid-cols-1 pt-10 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <a href='/'><img src={logo} alt="XIGI LED" className="h-20 w-auto mb-4 " /></a>
            <p className="text-gray-400 text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
              Transforming spaces with innovative LED display solutions for businesses worldwide.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
                  About
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/industry" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
                  Industry
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
                <span className="block">Theni</span>
                <span className="block">Chennai</span>
                <span className="block">Bangalore</span>
              </li>
              <li className="text-gray-400 text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
                Phone: +91 9494220622
              </li>
              <li className="text-gray-400 text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
                Email: led@xigi.in
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <p className="text-gray-400 text-sm md:text-base font-['Montserrat',sans-serif] font-medium mb-4">
Follow us for bright ideas, stunning installs, and LED inspiration – stay lit with Xigi!             </p>
           <div className="flex space-x-4">
<a
  href="#"
  className="text-gray-400 hover:text-white transition-colors border  px-2 py-2 rounded"
  style={{ borderColor: '#787676' }}
>                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white border  px-2 py-2 rounded transition-colors"style={{ borderColor: '#787676' }}>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white border  px-2 py-2 rounded transition-colors"style={{ borderColor: '#787676' }}>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white  border  px-2 py-2 rounded transition-colors"style={{ borderColor: '#787676' }}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <a href="https://xigi.in" target="_blank" rel="noopener noreferrer">
  <p className="text-gray-400 text-sm md:text-base font-['Montserrat',sans-serif] font-medium">
    Copyright © 2025 XigiLed Powered by Xigi Tech Pvt. Ltd.
  </p>
</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;