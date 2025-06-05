import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import logo from '../assets/Xigilogo.png';
import { Link } from 'react-router-dom';

// Sample Industry Data with content for each category
const industryData = {
  'Government & Public Spaces': {
    title: 'Government & Public Spaces',
    description: 'At XIGI Tech, we deliver tailored digital solutions across a wide range of industries — from retail and real estate to education and entertainment.',
    images: [
      { id: 1, title: 'Government Building' },
      { id: 2, title: 'Public Display' },
      { id: 3, title: 'Smart City' }
    ]
  },
  'Events & Exhibitions': {
    title: 'Events & Exhibitions',
    description: 'Transform your events with stunning LED displays that captivate audiences. From trade shows to concerts, our LED solutions create memorable experiences.',
    images: [
      { id: 1, title: 'Trade Show Display' },
      { id: 2, title: 'Concert LED Wall' },
      { id: 3, title: 'Exhibition Stand' }
    ]
  },
  'Retail Environments': {
    title: 'Retail Environments',
    description: 'Revolutionize customer experience in retail with stunning visuals. Dynamic displays that attract customers and boost sales.',
    images: [
      { id: 1, title: 'Store Front Display' },
      { id: 2, title: 'Mall Advertisement' },
      { id: 3, title: 'Retail LED Wall' }
    ]
  },
  'Corporate Offices': {
    title: 'Corporate Offices',
    description: 'Enhance corporate communication with professional LED displays. Perfect for lobbies, meeting rooms, and conference centers.',
    images: [
      { id: 1, title: 'Office Lobby' },
      { id: 2, title: 'Meeting Room' },
      { id: 3, title: 'Corporate Display' }
    ]
  },
  'Education Institutions': {
    title: 'Education Institutions',
    description: 'Interactive learning environments with cutting-edge LED technology. Engage students with dynamic educational content.',
    images: [
      { id: 1, title: 'Smart Classroom' },
      { id: 2, title: 'University Display' },
      { id: 3, title: 'Interactive Board' }
    ]
  },
  'Transparent LED Displays': {
    title: 'Transparent LED Displays',
    description: 'See-through LED technology that maintains visibility while displaying content. Perfect for storefronts and modern architecture.',
    images: [
      { id: 1, title: 'Glass Display' },
      { id: 2, title: 'Transparent Wall' },
      { id: 3, title: 'See-through LED' }
    ]
  },
  'Interactive LED Displays': {
    title: 'Interactive LED Displays',
    description: 'Touch-enabled LED displays that respond to user interaction. Create engaging experiences with gesture and touch control.',
    images: [
      { id: 1, title: 'Touch Interface' },
      { id: 2, title: 'Interactive Wall' },
      { id: 3, title: 'Gesture Control' }
    ]
  },
  'Flexible & Curved LED Walls': {
    title: 'Flexible & Curved LED Walls',
    description: 'Bendable LED panels that conform to any shape. Create unique curved installations and flexible display solutions.',
    images: [
      { id: 1, title: 'Curved Display' },
      { id: 2, title: 'Flexible Panel' },
      { id: 3, title: 'Curved Wall' }
    ]
  }
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileIndustry, setShowMobileIndustry] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('Government & Public Spaces');
  const navigate = useNavigate();

  const menuItems = Object.keys(industryData);

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

  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
  };

  const handleMegaMenuEnter = () => {
    setShowMegaMenu(true);
  };

  const handleMegaMenuLeave = () => {
    setShowMegaMenu(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <nav className="max-w-10xl mx-auto px-4 md:px-8 lg:px-24 py-4 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="XIGI LED Logo" className="h-[50px] md:h-[80px] w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 relative">
            <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>

            {/* Industry Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => {
                if (!megaMenuHovered) {
                  setShowMegaMenu(false);
                }
              }}
            >
            <button
  className="text-white hover:text-blue-400 transition-colors focus:outline-none cursor-pointer"
  onClick={() => {
    setShowMegaMenu(false); // if you want to close the menu
    navigate("/industry");  // redirect to /industry
  }}
  aria-expanded={showMegaMenu}
  aria-haspopup="true"
>
  Industry
</button>

            </div>

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
                <li><Link to="/" className="block text-blue-400 border-b border-gray-700 pb-2" onClick={() => setMenuOpen(false)}>Home</Link></li>

                {/* Mobile Industry Dropdown */}
                <li className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-center" onClick={() => setShowMobileIndustry(!showMobileIndustry)}>
                    <span>Industry</span>
                    <span>{showMobileIndustry ? '-' : '+'}</span>
                  </div>

                  {showMobileIndustry && (
                    <ul className="pl-4 pt-2 space-y-3">
                      {menuItems.map((item, index) => (
                        <li key={index} className={`text-sm cursor-pointer hover:text-blue-400 transition-colors ${index === 0 ? 'text-blue-400' : ''}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li><Link to="/products" className="block border-b border-gray-700 pb-2" onClick={() => setMenuOpen(false)}>Products</Link></li>
                <li><Link to="/gallery" className="block border-b border-gray-700 pb-2" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
                <li><Link to="/blog" className="block border-b border-gray-700 pb-2" onClick={() => setMenuOpen(false)}>Blog</Link></li>
                <li><Link to="/about" className="block border-b border-gray-700 pb-2" onClick={() => setMenuOpen(false)}>About us</Link></li>
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

      {/* Full Width Mega Menu - Positioned outside nav container */}
      {showMegaMenu && (
        <div
          className="absolute left-0 top-full w-full h-[550px] bg-zinc-900 text-white px-20 py-10 shadow-xl flex z-50"
          onMouseEnter={() => {
            setShowMegaMenu(true);
            setMegaMenuHovered(true);
          }}
          onMouseLeave={() => {
            setShowMegaMenu(false);
            setMegaMenuHovered(false);
          }}
        >
          {/* Left Menu - Industry Categories */}
          <div className="w-1/3 pr-10 border-r border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-blue-400">Industry Solutions</h3>
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer transition-all duration-200 p-2 rounded-md ${selectedIndustry === item
                      ? 'text-blue-400 bg-gray-800 border-l-4 border-blue-400'
                      : 'text-white hover:text-blue-400 hover:bg-gray-800'
                    }`}
                  onMouseEnter={() => handleIndustryClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Dynamic based on selection */}
          <div className="w-2/3 pl-10 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-blue-400">
                {industryData[selectedIndustry].title}
              </h3>
              <p className="text-gray-300 max-w-2xl leading-relaxed">
                {industryData[selectedIndustry].description}
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-4 mt-auto">
              {industryData[selectedIndustry].images.map((image) => (
                <div key={image.id} className="bg-gray-800 h-32 rounded-md flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">Image {image.id}</div>
                    <div className="text-gray-300 text-xs">{image.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;