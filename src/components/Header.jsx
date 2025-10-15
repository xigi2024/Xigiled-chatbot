import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, Home, Building2, Package, FileText, Users } from 'lucide-react';
import logo from '../assets/xigi_led_logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('nav')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Function to handle navigation and close mobile menu
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Active page detection for mobile bottom nav
  const homeMatch = currentPath === '/';
  const industryMatch = currentPath === '/industry';
  const productsMatch = currentPath === '/products';
  const blogMatch = currentPath === '/blog';
  const aboutMatch = currentPath === '/about';
  const contactMatch = currentPath === '/contact';

  return (
    <>
      {/* Mobile/Tablet Top Bar - Logo and Contact Button only */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-black">
        <nav className="max-w-10xl mx-auto px-4 md:px-8 py-3">
          <div className="flex justify-between items-center">
            {/* Logo on the left */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="XIGI LED Logo" className="h-[50px] md:h-[80px] w-auto" />
            </Link>

            {/* Contact Button on the right */}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-2 rounded-[5px] text-sm font-medium transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </header>

      {/* Desktop Header - Full Navigation (unchanged) */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden lg:block ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
        <nav className="max-w-10xl mx-auto px-4 md:px-8 lg:px-24 py-3 relative">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="XIGI LED Logo" className="h-[50px] md:h-[70px] py-1 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-8 relative">
              <Link
                to="/"
                className={`text-[20px] transition-colors ${currentPath === '/' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
              >
                Home
              </Link>
              <button
                className={`text-[20px] transition-colors focus:outline-none cursor-pointer ${currentPath === '/industry' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
                onClick={() => navigate('/industry')}
              >
                Industry
              </button>
              <Link
                to="/products"
                className={`text-[20px] transition-colors ${currentPath === '/products' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
              >
                Products
              </Link>
                 <Link
                to="/gallery"
                className={`text-[20px] transition-colors ${currentPath === '/products' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
              >
                Gallery
              </Link>
              <Link
                to="/blog"
                className={`text-[20px] transition-colors ${currentPath === '/blog' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className={`text-[20px] transition-colors ${currentPath === '/about' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-5 text-[16px] py-2 rounded-[5px] text-sm font-medium transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile/Tablet Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm  border-gray-700 z-50 lg:hidden">
        <div className="flex justify-around items-center py-2 px-4"style={{border:"1px solid #ddd"}}>
          <div 
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 cursor-pointer ${homeMatch ? 'text-blue-600' : 'text-gray-700'} `}
            onClick={() => handleNavigation("/")}
          >
            <Home size={22} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </div>
          
          <div 
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 cursor-pointer ${industryMatch ? 'text-blue-600' : 'text-gray-700'} `}
            onClick={() => handleNavigation("/industry")}
          >
            <Building2 size={22} />
            <span className="text-xs mt-1 font-medium">Industry</span>
          </div>
          
          <div 
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 cursor-pointer ${productsMatch ? 'text-blue-600' : 'text-gray-700'} `}
            onClick={() => handleNavigation("/products")}
          >
            <Package size={22} />
            <span className="text-xs mt-1 font-medium">Products</span>
          </div>
          
          <div 
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 cursor-pointer ${blogMatch ? 'text-blue-600' : 'text-gray-700'}`}
            onClick={() => handleNavigation("/blog")}
          >
            <FileText size={22} />
            <span className="text-xs mt-1 font-medium">Blog</span>
          </div>
          
          <div 
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 cursor-pointer ${aboutMatch ? 'text-blue-600' : 'text-gray-700'} `}
            onClick={() => handleNavigation("/about")}
          >
            <Users size={22} />
            <span className="text-xs mt-1 font-medium">About</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;