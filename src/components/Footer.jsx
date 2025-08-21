import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin,Youtube } from 'lucide-react';
import logo from '../assets/Xigilogo.png'

const Footer = () => {
  return (
    <footer className="bg-black/95 text-white">
      <div className="container  px-4 py-12 md:py-10">
        <div className="grid grid-cols-1 pt-10 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <a href='/'><img src={logo} alt="XIGI LED" className="h-25  mb-4 " /></a>
            <p className="text-white  text-sm md:text-base font-['Montserrat',sans-serif] ">
              Transforming spaces with innovative LED display solutions for businesses worldwide.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] ">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] ">
                  About
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] ">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/industry" className="text-white hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif] ">
                  Industry
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-white transition-colors text-sm md:text-base font-['Montserrat',sans-serif]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-white text-sm md:text-base font-['Montserrat',sans-serif] ">
                <span className="block mb-2">Theni</span>
                <span className="block mb-2">Chennai</span>
                <span className="block mb-2">Bangalore</span>
                <span className="block mb-2">Coimbatore</span>
              </li>
              <li className="text-white text-sm md:text-base font-['Montserrat',sans-serif] ">
                Phone: +91 9494220622
              </li>
              <li className="text-white text-sm md:text-base font-['Montserrat',sans-serif] ">
                Email: info@xigiled.com
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <p className="text-white text-sm md:text-base font-['Montserrat',sans-serif]  mb-4">
Follow us for bright ideas, stunning installs, and LED inspiration – stay lit with Xigi!             </p>
     <div className="flex space-x-4">
  <a
    href="https://www.facebook.com/people/Xigi-LED/61567250657888/?rdid=oQBREpIxCMyRCuZI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FhT6fLQSr%2F"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors border px-2 py-2 rounded"
    style={{ borderColor: '#787676' }}
  >
    <Facebook size={20} />
  </a>

  <a
      href="https://www.youtube.com/@Xigitech"  // YouTube profile URL
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors border px-2 py-2 rounded"
      style={{ borderColor: '#787676' }}
    >
      <Youtube size={20} />
    </a>

  <a
    href="https://www.instagram.com/xigiled/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors border px-2 py-2 rounded"
    style={{ borderColor: '#787676' }}
  >
    <Instagram size={20} />
  </a>

  <a
    href="https://www.linkedin.com/company/xigi/?originalSubdomain=in"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors border px-2 py-2 rounded"
    style={{ borderColor: '#787676' }}
  >
    <Linkedin size={20} />
  </a>
</div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <a href="https://xigi.in" target="_blank" rel="noopener noreferrer">
  <p className="text-white text-sm md:text-base font-['Montserrat',sans-serif] ">
    Copyright © 2025 XigiLed Powered by Xigi Tech Pvt. Ltd.
  </p>
</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;