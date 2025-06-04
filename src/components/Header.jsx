import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Xigilogo.png'
import { Link } from 'react-router-dom';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('nav')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <nav className="max-w-10xl mx-auto px-4 md:px-8 lg:px-24 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo}
              alt="XIGI LED Logo" 
              className="h-[50px] md:h-[80px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/industry" className="text-white hover:text-blue-400 transition-colors">Industry</Link>
            <Link to="/products" className="text-white hover:text-blue-400 transition-colors">Products</Link>
            <Link to="/gallery" className="text-white hover:text-blue-400 transition-colors">Gallery</Link>
            <Link to="/blog" className="text-white hover:text-blue-400 transition-colors">Blog</Link>
            <Link to="/about" className="text-white hover:text-blue-400 transition-colors">About</Link>
            <Link to="/contact" className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-[5px] text-sm font-medium transition-all duration-300">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden fixed top-[70px] left-0 right-0 bg-black bg-opacity-95 text-white py-4 z-50 shadow-lg">
            <div className="container mx-auto px-4">
              <ul className="flex flex-col gap-6 text-[17px] font-medium">
                <li>
                  <Link 
                    to="/" 
                    className="block text-blue-400 border-b border-gray-700 pb-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/industry" 
                    className="block border-b border-gray-700 pb-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Industry
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products" 
                    className="block border-b border-gray-700 pb-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/gallery" 
                    className="block border-b border-gray-700 pb-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="block border-b border-gray-700 pb-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="block border-b border-gray-700 pb-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    About us
                  </Link>
                </li>
                <li className="pt-2">
                  <Link to="/contact" className="w-full bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-[5px] text-sm font-medium transition-all duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 