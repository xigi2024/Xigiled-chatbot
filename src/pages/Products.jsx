import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';import { Link } from 'react-router-dom';

// Updated API base URL
const API_BASE_URL = 'https://xigiled.in/api';

// Helper function to construct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If the path starts with a slash, remove it to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Add 'storage/' prefix if not already present
  const finalPath = cleanPath.startsWith('storage/') ? cleanPath : `storage/${cleanPath}`;
  
  return `https://xigiled.in/${finalPath}`;
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
  if (titleLower.includes('interactive') && titleLower.includes('display')) {
    return '/products/interactive-displays';
  }
  if (titleLower.includes('truck') && titleLower.includes('mounted')) {
    return '/products/truck-mounted-displays';
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
    <h2 className="text-[28px] md:text-[32px] lg:text-[40px]  font-medium  text-left md:text-center mb-10 font-['Poppins',sans-serif]">
      {sectionData.title || "PRODUCT SOLUTIONS"}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
    {sectionData.images.map((item, idx) => (
  <Link
    to={getRouteFromTitle(item.title)}
    key={idx}
    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group block relative h-full flex flex-col"
  >
    {/* Image with hover effects */}
    <div className="relative overflow-hidden">
      <img
        src={getImageUrl(item.image) || 'https://via.placeholder.com/300x200?text=Product+Image'}
        alt={item.title || 'Product Image'}
        className="w-full h-50 md:h-50 lg:h-62 object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    {/* Content Section */}
    <div className="p-4 relative flex-1 flex flex-col">
      {/* Category/Title in blue */}
      <h3 className="text-[16px] text-[#0000ff] md:text-[16px] lg:text-[16px] mb-3 font-medium font-['Poppins',sans-serif]">
        {item.title || 'Product Title'}
      </h3>
      
      {/* Main description text */}
      <p className="text-[16px] text-black font-medium font-['Montserrat',sans-serif] mb-4 flex-1">
        {item.description || 'Product description not available'}
      </p>
      
      {/* Learn More button at the bottom */}
    
   <div className="flex items-center text-[#0000ff] font-medium hover:text-[#0000cc] transition-colors duration-200">
<FontAwesomeIcon 
  icon={faLink} 
  className="h-3 w-3 mr-2 border border-gray-300 p-[8px] rounded-[5px] bg-[#0d0dff26] text-[#0000ff]" 
/>        <span className="text-[16px] font-['Poppins',sans-serif]">Learn More</span>
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

  return (
    <section className="bg-white py-16 md:py-16 lg:py-24">
      <div className="container mx-auto">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-left md:text-center mb-10 font-['Poppins',sans-serif]">
          {sectionData.title || 'Key Features of Our LED Video Walls'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {sectionData.images.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#f8faff] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full"
            >
              <div className="mb-4">
                <div className="bg-[#eef3ff] p-3 rounded-md inline-block">
                  {feature.image && (
                    <img
                      src={getImageUrl(feature.image)}
                      alt={feature.title}
                      className="w-10 h-10"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
              <h3 className="text-[20px] md:text-[20px] font-medium text-[#000] mb-2 font-['Poppins',sans-serif]">
                {feature.title}
              </h3>
              <p className="text-black text-[16px] md:text-[17px] leading-relaxed font-medium font-['Montserrat',sans-serif]">
                {feature.description}
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

   const handleCtaClick = () => {
    navigate('/contact');
    sessionStorage.setItem('scrollToContactForm', 'true');
  };


  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        setApiData(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        // Use fallback data if API fails
        setApiData(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get section data by section name
  const getSectionData = (sectionName) => {
    return apiData.find(item => item.section === sectionName) || 
      FALLBACK_DATA.find(item => item.section === sectionName);
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

  const heroSection = getSectionData('product_section1');
  const digitalImpactSection = getSectionData('product_section2');
  const productSolutionsSection = getSectionData('product_section3');
  const keyFeaturesSection = getSectionData('product_section4');
  const transformSection = getSectionData('product_section5');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] lg:min-h-[90vh] lg:pr-[100px]  bg-gradient-to-br from-[#000000] via-[#010150] to-[#000000] py-24 pl-[10px] md:pl-[40px] lg:pl-[100px] flex flex-col md:flex-row items-center justify-between">
        <div className="container mx-auto">
          <div className="flex-1 text-left">
      
            <h1 className="text-[30px] md:text-[35px] lg:text-[50px] text-white mb-6 leading-tight font-medium font-['Poppins',sans-serif]">
              {heroSection?.title || "Brilliant LED Solutions for Every Sector"}
            </h1>
            <p className="text-white/100 text-lg md:text-[15px] lg:text-xl max-w-2xl mb-4 leading-[30px]">
              {heroSection?.images?.[0]?.description || "Discover LED display solutions tailored for every industry—retail, education, hospitality, corporate, and more."}
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className=" md:block w-full md:w-auto mt-10 md:mt-0">
          <img
            src={getImageUrl(heroSection?.images?.[0]?.image) || 'https://via.placeholder.com/1000x600?text=XIGI+LED+Display'}
            alt="LED Display"
            className="w-full p-3 md:w-[700px] lg:w-[1000px] lg:h-[400px] drop-shadow-2xl mx-auto"
          />
        </div>
      </section>

      {/* Digital Impact by Product Section */}
      <section className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 z-20 relative py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src={getImageUrl(digitalImpactSection?.images?.[0]?.image) || 'https://via.placeholder.com/600x400?text=Digital+Impact'}
              alt={digitalImpactSection?.title}
              className="lg:h-[400px] md:h-[300px] rounded-xl shadow-xl w-full max-w-md md:max-w-full"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-4 leading-snug text-gray-900 font-['Poppins',sans-serif]">
              {digitalImpactSection?.title || "Digital Impact by product"}
            </h2>
            <p className="text-black text-[16px] md:text-[17px] lg:text-[17px] font-medium font-['Montserrat',sans-serif] mb-6 leading-relaxed">
              {digitalImpactSection?.description || "At XIGI Tech, we deliver tailored digital solutions across a wide range of industries — from retail and real estate to education and entertainment. Our technology adapts to your unique needs, helping you connect, engage, and grow in today's fast-moving digital world."}
            </p>
            <button 
  onClick={handleCtaClick}
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
      <section className="bg-[#e8f1ff] py-20">
        <div className="container mx-auto">
          <div
            className="h-[500px] relative rounded-3xl overflow-hidden"
            style={{
              backgroundImage: `url(${getImageUrl(transformSection?.images?.[0]?.image) || 'https://via.placeholder.com/1200x500?text=Transform+Your+Advertising'})`,
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
              <p className="mb-6 text-[16px] md:text-[17px] font-medium text-white">
                {transformSection?.description || "With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand."}
              </p>
              <button 
  onClick={handleCtaClick}
className={` bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 
    hover:from-indigo-700 hover:to-blue-700 text-white px-5 text-[18px] py-3 rounded-[5px] w-[300px] text-sm font-medium transition-all duration-300
`}              >
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