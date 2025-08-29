import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '../assets/Xigilogo.png';

const Footer = () => {
  return (
    <footer className="bg-black/95 text-white">
      <div className="container mx-auto px-4 py-12 md:py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 pt-10">
          
          {/* Company Info - Full width on mobile, 4 columns on desktop */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3 space-y-4">
            <a href='/'>
              <img 
                src={logo}
                alt="XIGI LED" 
                className="h-16 mb-4" 
              />
            </a>
            <p className="text-white text-sm md:text-base font-['Montserrat',sans-serif]">
              Transforming spaces with innovative LED display solutions for businesses worldwide.
            </p>
          </div>

          {/* Quick Links and Contact in same row on mobile */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9 ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 ">
              
              {/* Quick Links - Left column on mobile */}
              <div className="col-span-1 lg:ms-10 sidebar">
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif]">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif]">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/products" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif]">
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="/industry" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif]">
                      Industry
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif]">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info - Right column on mobile */}
              <div className="col-span-1">
                <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                <div className="space-y-3">
                  <div className="text-gray-300 text-sm md:text-base font-['Montserrat',sans-serif]">
                    <div className="mb-1">Theni</div>
                    <div className="mb-1">Chennai</div>
                    <div className="mb-1">Bangalore</div>
                    <div className="mb-3">Coimbatore</div>
                  </div>
                  <div className="text-gray-300 text-sm md:text-base font-['Montserrat',sans-serif]">
                    📞 +91 9494220622
                  </div>
                  <div className="text-gray-300 text-sm md:text-base font-['Montserrat',sans-serif]">
                    ✉️ info@xigiled.com
                  </div>
                </div>
              </div>

              {/* Social Links - Full width below on mobile, third column on tablet+ */}
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold mb-4 text-white">Social Links</h3>
                <p className="text-gray-300 text-sm md:text-base font-['Montserrat',sans-serif] mb-4">
                  Follow us for bright ideas, stunning installs, and LED inspiration – stay lit with Xigi!
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com/people/Xigi-LED/61567250657888/?rdid=oQBREpIxCMyRCuZI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FhT6fLQSr%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors border border-gray-600 hover:border-gray-400 p-2 rounded-md"
                  >
                    <Facebook size={20} />
                  </a>

                  <a
                    href="https://www.youtube.com/@Xigitech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors border border-gray-600 hover:border-gray-400 p-2 rounded-md"
                  >
                    <Youtube size={20} />
                  </a>

                  <a
                    href="https://www.instagram.com/xigiled/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors border border-gray-600 hover:border-gray-400 p-2 rounded-md"
                  >
                    <Instagram size={20} />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/xigi/?originalSubdomain=in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors border border-gray-600 hover:border-gray-400 p-2 rounded-md"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <a href="https://xigi.in" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            <p className="text-gray-400 text-sm md:text-base font-['Montserrat',sans-serif]">
              Copyright © 2025 XigiLed Powered by Xigi Tech Pvt. Ltd.
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;