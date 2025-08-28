import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Xigilogo.png';

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <nav className="max-w-10xl mx-auto px-4 md:px-8 lg:px-24 py-3 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="XIGI LED Logo" className="h-[50px] md:h-[70px] w-auto" />
          </Link>

          {/* Desktop Navigation: visible from lg and above */}
          <div className="hidden lg:flex items-center gap-8 relative">
            <Link
              to="/"
              className={`text-[18px] transition-colors ${currentPath === '/' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
            >
              Home
            </Link>
            <button
              className={`text-[18px] transition-colors focus:outline-none cursor-pointer ${currentPath === '/industry' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
              onClick={() => navigate('/industry')}
            >
              Industry
            </button>
            <Link
              to="/products"
              className={`text-[18px] transition-colors ${currentPath === '/products' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
            >
              Products
            </Link>
            {/* <Link
              to="/gallery"
              className={`text-[18px] transition-colors ${currentPath === '/gallery' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
            >
              Gallery
            </Link> */}
            <Link
              to="/blog"
              className={`text-[18px] transition-colors ${currentPath === '/blog' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`text-[18px]  transition-colors ${currentPath === '/about' ? 'text-blue-400' : 'text-white'} hover:text-blue-400`}
            >
              About
            </Link>
                      <Link
  to="/contact"
  className={` bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 
    hover:from-indigo-700 hover:to-blue-700 text-white px-5 text-[16px] py-2 rounded-[5px] text-sm font-medium transition-all duration-300
    ${currentPath === '/contact' 
      ? 'bg-blue-800 text-white' 
      : 'bg-blue-700 hover:bg-blue-800 text-white'
    }`}
>
  Contact
</Link>
          </div>

          {/* Mobile + Tablet Menu Button: visible below lg */}
          <button
            className="lg:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile + Tablet Menu: visible below lg only when open */}
        {menuOpen && (
          <div className="lg:hidden fixed top-[80px] md:top-[95px] left-0 right-0 bg-black bg-opacity-95 text-white py-4 z-50 shadow-lg">
            <div className="container mx-auto px-4">
              <ul className="flex flex-col gap-6 text-[17px] font-medium">
                <li>
                  <Link
                    to="/"
                    className={`block border-b border-gray-700 pb-2 ${currentPath === '/' ? 'text-blue-400' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/industry"
                    className={`block border-b border-gray-700 pb-2 ${currentPath === '/industry' ? 'text-blue-400' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Industry
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className={`block border-b border-gray-700 pb-2 ${currentPath === '/products' ? 'text-blue-400' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/gallery"
                    className={`block border-b border-gray-700 pb-2 ${currentPath === '/gallery' ? 'text-blue-400' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/blog"
                    className={`block border-b border-gray-700 pb-2 ${currentPath === '/blog' ? 'text-blue-400' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`block border-b border-gray-700 pb-2 ${currentPath === '/about' ? 'text-blue-400' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    About us
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/contact"
                    className={`w-full px-5 py-2 rounded-[5px] text-sm font-medium transition-all duration-300 ${
                      currentPath === '/contact'
                        ? 'bg-blue-800 text-white'
                        : 'bg-blue-700 hover:bg-blue-800 text-white'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
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
