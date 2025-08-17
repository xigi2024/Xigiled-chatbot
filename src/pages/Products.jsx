import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Cpu, Activity, ShieldCheck, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Helper function to construct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If the path already starts with http, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If the path starts with a slash, remove it to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Add 'storage/' prefix if not already present
  const finalPath = cleanPath.startsWith('storage/') ? cleanPath : `storage/${cleanPath}`;
  
  return `${API_BASE_URL}/${finalPath}`;
};

// Helper function to generate URL slug from title
const generateSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// Helper function to map title to route
const getRouteFromTitle = (title) => {
  if (!title) return '/products';
  
  const titleLower = title.toLowerCase();
  
  // Map specific titles to routes
  if (titleLower.includes('indoor') && titleLower.includes('led')) {
    return '/products/indoor-led-video-walls';
  }
  if (titleLower.includes('outdoor') && titleLower.includes('led')) {
    return '/products/outdoor-led-video-walls';
  }
  if (titleLower.includes('events') && titleLower.includes('exhibitions')) {
    return '/products/events-exhibitions';
  }
  if (titleLower.includes('manufacturing') || titleLower.includes('factories')) {
    return '/products/manufacturing-factories';
  }
  if (titleLower.includes('education') && titleLower.includes('institutions')) {
    return '/products/education-institutions';
  }
  if (titleLower.includes('transport') && titleLower.includes('public')) {
    return '/products/transport-public-venues';
  }
  if (titleLower.includes('hospitality') && titleLower.includes('hotels')) {
    return '/products/hospitality-hotels';
  }
  if (titleLower.includes('government') && titleLower.includes('civic')) {
    return '/products/government-civic-spaces';
  }
  if (titleLower.includes('retail')) {
    return '/products/retail';
  }
  
  // Default: generate route from title
  const slug = generateSlug(title);
  return `/products/${slug}`;
};

// Dynamic Industry Solutions Component
const ProductSolutions = ({ sectionData }) => {
  if (!sectionData || !sectionData.images) return null;

  return (
    <section className="bg-[#e8f1ff] py-16 md:py-16 lg:py-24">
      <div className="container mx-auto">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-center mb-10 font-['Poppins',sans-serif]">
          {sectionData.title || "PRODUCT SOLUTIONS"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-6">
          {sectionData.images.map((item, idx) => (
            <Link
              to={getRouteFromTitle(item.title)}
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group block relative"
            >
              {/* Image with hover icon for mobile/tab */}
              <div className="relative overflow-hidden">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title || 'Product Image'}
                  className="w-full h-50 md:h-50 lg:h-62 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    console.error('Image failed to load:', item.image);
                    console.error('Attempted URL:', e.target.src);
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjcyODAiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPHN2Zz4='; // Base64 placeholder
                  }}
                />

                {/* Centered Icon on Hover for Mobile & Tab */}
                <div className="absolute inset-0 flex items-center justify-center lg:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-[#e6ecf6] p-4 rounded-[5px] shadow-lg">
                    <Link2 className="h-6 w-6 text-[#3a4a6f]" />
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-4 relative">
                <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium my-2 text-gray-900 font-['Poppins',sans-serif]">
                  {item.title || 'Product Title'}
                </h3>
                <p className="text-[15px] text-gray-700 mt-1 max-w-full md:max-w-full lg:max-w-80 font-medium font-['Montserrat',sans-serif]">
                  {item.description || 'Product description not available'}
                </p>

                {/* Always show icon in bottom-right on desktop */}
                <div className="absolute bottom-6 right-6 hidden lg:block">
                  <span className="bg-[#e6ecf6] p-4 rounded-[5px] shadow-lg inline-flex items-center justify-center">
                    <Link2 className="h-6 w-6 text-[#3a4a6f]" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dynamic Key Features Component
const KeyFeatures = ({ sectionData }) => {
  if (!sectionData || !sectionData.images) return null;

  // Icon mapping for the key features
  const getIcon = (title) => {
    if (title?.toLowerCase().includes('energy')) {
      return <Cpu className="w-6 h-6 text-[#2a4eff]" />;
    } else if (title?.toLowerCase().includes('outdoor')) {
      return <Activity className="w-6 h-6 text-[#2a4eff]" />;
    } else if (title?.toLowerCase().includes('maintenance')) {
      return <ShieldCheck className="w-6 h-6 text-[#2a4eff]" />;
    } else {
      return <Cpu className="w-6 h-6 text-[#2a4eff]" />;
    }
  };

  return (
    <section className="bg-white py-16 md:py-16 lg:py-24">
      <div className="">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-center mb-10 font-['Poppins',sans-serif]">
          {sectionData.title}
        </h2>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectionData.images.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#f8faff] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              {/* Icon Top-Left */}
              <div className="mb-4">
                <div className="bg-[#eef3ff] p-3 rounded-md inline-block">
                  {getIcon(feature.title)}
                </div>
              </div>

              {/* Title + Description */}
              <h3 className="text-md md:text-[20px] font-medium text-[#000] mb-2 font-['Poppins',sans-serif]">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-medium font-['Montserrat',sans-serif]">
                {feature.description || 'Our video walls enhance engagement by delivering clear, impactful messaging that resonates with your audience.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        setApiData(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get section data by section name
  const getSectionData = (sectionName) => {
    return apiData.find(item => item.section === sectionName);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8faff]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8faff]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading products: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const heroSection = getSectionData('product_section1');
  const digitalImpactSection = getSectionData('product_section2');
  const productSolutionsSection = getSectionData('product_section3');
  const keyFeaturesSection = getSectionData('product_section4');
  const transformSection = getSectionData('product_section5');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] lg:min-h-[90vh] bg-gradient-to-br from-[#000000] via-[#010150] to-[#000000] py-24 pl-[10px] md:pl-[40px] lg:pl-[100px] flex flex-col md:flex-row items-center justify-between">
        <div className="container mx-auto">
          <div className="flex-1 text-left">
            <h2 className="text-lg md:text-[17px] lg:text-[22px] font-medium text-white mb-2 ">
              XIGI LED Display
            </h2>
            <h1 className="text-[30px] md:text-[35px] lg:text-[50px] text-white mb-6 leading-tight font-medium font-['Poppins',sans-serif]">
              {heroSection?.title || "Brilliant LED Solutions for Every Sector"}
            </h1>
            <p className="text-white/100 text-lg md:text-[15px] lg:text-xl max-w-2xl mb-4 leading-[30px]">
              {heroSection?.description || "Discover LED display solutions tailored for every industry—retail, education, hospitality, corporate, and more."}
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hidden md:block w-full md:w-auto mt-10 md:mt-0">
          {heroSection?.images?.[0] ? (
            <img
              src={getImageUrl(heroSection.images[0].image)}
              alt="LED Display"
              className="w-full md:w-[700px] lg:w-[1000px] drop-shadow-2xl mx-auto"
              onError={(e) => {
                console.error('Hero image failed to load:', heroSection.images[0].image);
                console.error('Attempted URL:', e.target.src);
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjI1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2YjcyODAiPkhlcm8gSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4=';
              }}
            />
          ) : (
            <div className="w-full md:w-[700px] lg:w-[1000px] h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Hero Image Loading...</p>
            </div>
          )}
        </div>
      </section>

      {/* Digital Impact by Product Section */}
      <section className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 z-20 relative py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            {digitalImpactSection?.images?.[0] ? (
              <img
                src={getImageUrl(digitalImpactSection.images[0].image)}
                alt={digitalImpactSection.title}
                className="h-auto md:h-120 lg:h-auto rounded-xl shadow-xl w-full max-w-md md:max-w-full"
                onError={(e) => {
                  console.error('Digital impact image failed to load:', digitalImpactSection.images[0].image);
                  console.error('Attempted URL:', e.target.src);
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YjcyODAiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPHN2Zz4=';
                }}
              />
            ) : (
              <div className="h-64 bg-gray-300 rounded-xl w-full max-w-md md:max-w-full flex items-center justify-center">
                <p className="text-gray-600">Image Loading...</p>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-4 leading-snug text-gray-900 font-['Poppins',sans-serif]">
              {digitalImpactSection?.title || "Digital Impact by product"}
            </h2>
            <p className="text-gray-800 text-[14px] md:text-[16px] lg:text-[16px] font-medium font-['Montserrat',sans-serif] mb-6 leading-relaxed">
              {digitalImpactSection?.description || "At XIGI Tech, we deliver tailored digital solutions across a wide range of industries — from retail and real estate to education and entertainment. Our technology adapts to your unique needs, helping you connect, engage, and grow in today's fast-moving digital world."}
            </p>
            <button 
              onClick={() => navigate('/contact')} 
              className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-md shadow-md text-[15px] md:text-[16px] font-medium transition-all duration-300"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Product Solutions Section */}
      <ProductSolutions sectionData={productSolutionsSection} />

      {/* Key Features Section */}
      <KeyFeatures sectionData={keyFeaturesSection} />

      {/* Ready to Transform Section */}
      <section className="bg-[#f2f2fd] py-20">
        <div className="container mx-auto">
          <div
            className="h-[500px] relative rounded-3xl overflow-hidden"
            style={{
              backgroundImage: transformSection?.images?.[0] ? 
                `url(${getImageUrl(transformSection.images[0].image)})` : 
                'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Content Over Image */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 max-w-xl">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-white mb-4 leading-tight font-['Poppins',sans-serif]">
                {transformSection?.title || "Ready to Transform Your Advertising?"}
              </h2>
              <p className="mb-6 text-[17px] md:text-[17px] font-medium text-white">
                {transformSection?.description || "With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand."}
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white text-[#1e2d3d] cursor-pointer hover:bg-[#e6e6ff] px-6 py-3 rounded-md shadow-md text-[16px] font-semibold transition-all duration-300 w-fit"
              >
                See Solutions for Your Products
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;