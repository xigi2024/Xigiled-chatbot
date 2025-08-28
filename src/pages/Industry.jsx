import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = 'https://xigiled.in/api';

// Add these missing helper functions
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

// Helper function to map title to route for industries
const getRouteFromTitle = (title) => {
  if (!title) return '/industry';
  
  const titleLower = title.toLowerCase();
  
  // Map specific industry titles to routes
  if (titleLower.includes('events') && titleLower.includes('exhibitions')) {
    return '/industry/EventsAndExhibitions';
  }
  if (titleLower.includes('manufacturing') && titleLower.includes('factories')) {
    return '/industry/ManufacturingAndFactories';
  }
  if (titleLower.includes('transport') && titleLower.includes('public')) {
    return '/industry/TransportPublicVenues';
  }
  if (titleLower.includes('hospitality') && titleLower.includes('hotels')) {
    return '/industry/HospitalityAndHotels';
  }
  if (titleLower.includes('government') && titleLower.includes('civic')) {
    return '/industry/GovernmentCivicSpaces';
  }
  if (titleLower.includes('education') && titleLower.includes('institutions')) {
    return '/industry/EducationAndInstitutions';
  }
  if (titleLower.includes('retail')) {
    return '/industry/Retail';
  }
  if (titleLower.includes('rental') && titleLower.includes('led')) {
    return '/industry/RentalLED';
  }
  if (titleLower.includes('corporate') && titleLower.includes('office')) {
    return '/industry/CorporateOffice';
  }
  
  // Default: generate route from title using PascalCase format
  const slug = title
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  return `/industry/${slug}`;
};

const Industry = () => {
  const navigate = useNavigate();
  const [industryData, setIndustryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const handleCtaClick = () => {
    navigate('/contact');
    sessionStorage.setItem('scrollToContactForm', 'true');
  };

  // Function to convert title to URL slug
  const createSlug = (title) => {
    const specialCases = {
      'Events & Exhibitions': 'EventsAndExhibitions',
      'Manufacturing & Factories': 'ManufacturingAndFactories',
      'Transport and Public Venues': 'TransportPublicVenues',
      'Hospitality & Hotels': 'HospitalityAndHotels',
      'Government & Civic Spaces': 'GovernmentCivicSpaces',
      'Education and Institutions': 'EducationAndInstitutions',
      'Retail': 'Retail',
      'Rental LED': 'RentalLED',
      'Corporate Office': 'CorporateOffice'
    };

    // Return predefined slug if exists
    if (specialCases[title]) {
      return specialCases[title];
    }

    // Default conversion for other cases
    return title
      .trim()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  // Fetch data from API
  useEffect(() => {
    const fetchIndustryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/industry`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result); // Debug log
        
        // Handle the response structure correctly
        let data = [];
        if (result.success && Array.isArray(result.data)) {
          data = result.data;
        } else if (Array.isArray(result)) {
          data = result;
        } else if (result.data && Array.isArray(result.data)) {
          data = result.data;
        }
        
        console.log('Processed Data:', data); // Debug log
        setIndustryData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching industry data:', err);
        setError('Failed to load industry data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIndustryData();
  }, []);

  // Handle card click with error handling
  const handleCardClick = (title) => {
    try {
      const slug = createSlug(title);
      console.log(`Navigating to: /industry/${slug}`);
      navigate(`/industry/${slug}`);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to generic industry page if route fails
      navigate('/industry');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8faff]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading industry solutions...</p>
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
            <p className="text-red-600 mb-4">{error}</p>
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

  // Organize data by section - FIXED LOGIC
  const organizedData = {};
  console.log('Industry Data for organizing:', industryData); // Debug log
  
  industryData.forEach(item => {
    if (item && item.section) {
      organizedData[item.section] = item;
      console.log(`Added section ${item.section}:`, item); // Debug log
    }
  });
  
  console.log('Organized Data:', organizedData); // Debug log

  // Get sections with fallback values
  const heroSection = organizedData['industry_section1'];
  const digitalImpactSection = organizedData['industry_section2'];
  const industrySection = organizedData['industry_section3'];
  const keyFeaturesSection = organizedData['industry_section4'];
  const transformSection = organizedData['industry_section5'];

  console.log('Hero Section:', heroSection); // Debug log

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff]">
      <Header />
      
      {/* Hero Section - FIXED */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] lg:min-h-[90vh] pr-[100px] bg-gradient-to-br from-[#000000] via-[#010150] to-[#000000] py-24 pl-[10px] md:pl-[40px] lg:pl-[100px] flex flex-col md:flex-row items-center justify-between">
        <div className="container mx-auto">
          <div className="flex-1 text-left">
           
            <h1 className="text-[30px] md:text-[35px] lg:text-[50px] text-white mb-6 leading-[1.3] font-['Poppins',sans-serif]">
              {heroSection?.images?.[0]?.title || heroSection?.title || 'Brilliant LED Solutions for Every Sector'}
            </h1>
            <p className="text-white/100 text-lg md:text-[15px] lg:text-xl max-w-2xl mb-4 leading-[30px] font-['Montserrat',sans-serif]">
              {heroSection?.images?.[0]?.description || heroSection?.description || 'Discover LED display solutions tailored for every industry—retail, education, hospitality, corporate, and more.'}
            </p>
          </div>
        </div>

        {/* Hero Image - FIXED */}
        <div className="md:block w-full md:w-auto mt-10 md:mt-0">
          {heroSection?.images?.[0] && (
            <img
              src={getImageUrl(heroSection.images[0].image)}
              alt={heroSection.images[0].title || "LED Display"}
              className="w-full md:w-[700px] lg:w-[1000px] ml-[20px] drop-shadow-2xl lg:h-[400px] md:h-[300px] mx-auto"
              loading="lazy"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
      </section>

      {/* Digital Impact by Industry Section */}
      <section className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 z-20 relative py-16 md:py-20 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            {digitalImpactSection?.images?.[0] && (
              <img
                src={getImageUrl(digitalImpactSection.images[0].image)}
                alt="Digital Impact"
                className="lg:h-[400px] md:h-[300px] rounded-xl shadow-xl w-full max-w-md md:max-w-full"
                loading="lazy"
              />
            )}
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-4 leading-snug text-gray-900 font-['Poppins',sans-serif]">
              {digitalImpactSection?.title || 'Digital Impact by Industry'}
            </h2>
            <p className="text-black text-[14px] md:text-[17px] lg:text-[17px] font-medium font-['Montserrat',sans-serif] mb-6 leading-relaxed">
              {digitalImpactSection?.description || 'At XIGI Tech, we deliver tailored digital solutions across a wide range of industries — from retail and real estate to education and entertainment.'}
            </p>
            <button 
  onClick={handleCtaClick}
              className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700
               text-white px-6 py-3 rounded-md shadow-md text-[15px] md:text-[16px] font-medium transition-all duration-300"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="bg-[#e8f1ff] py-16 md:py-16 lg:py-24">
        <div className="container mx-auto">
          {/* Section Title */}
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-center mb-10 font-['Poppins',sans-serif]">
            {industrySection?.title || 'INDUSTRY SOLUTIONS'}
          </h2>

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            {industrySection?.images?.map((item, idx) => {
              const cleanTitle = item.title?.trim() || 'Industry Solution';
              const cleanDescription =
                item.description?.replace(/\n/g, '') || 'Description not available';

              return (
                <Link
                  to={getRouteFromTitle(cleanTitle)}
                  key={idx}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group block relative h-full flex flex-col"
                >
                  {/* Image with hover scale */}
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(item.image) || 'https://via.placeholder.com/300x200?text=Product+Image'}
                      alt={cleanTitle}
                      className="w-full h-50 md:h-50 lg:h-62 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 relative flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-[16px] text-[#0000ff] md:text-[16px] lg:text-[16px] mb-3 font-medium font-['Poppins',sans-serif]">
                      {cleanTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-[17px] text-black font-medium font-['Montserrat',sans-serif] mb-4 flex-1">
                      {cleanDescription}
                    </p>

                    {/* Learn More button with icon */}
                    <div className="flex items-center text-[#0000ff] font-medium hover:text-[#0000cc] transition-colors duration-200">
                      <FontAwesomeIcon 
                        icon={faLink} 
                        className="h-3 w-3 mr-2 border border-gray-300 p-[8px] rounded-[5px] bg-[#0d0dff26] text-[#0000ff]" 
                      />                      
                      <span className="text-[16px] font-['Poppins',sans-serif]">Learn More</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      {keyFeaturesSection && (
        <section className="bg-white py-16 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-center mb-10 font-['Poppins',sans-serif]">
              {keyFeaturesSection.title || 'Key Features of Our LED Video Walls'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {keyFeaturesSection.images?.map((feature, idx) => (
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
                  <h3 className="text-md md:text-[20px] font-medium text-[#000] mb-2 font-['Poppins',sans-serif]">
                    {feature.title}
                  </h3>
                  <p className="text-black text-sm md:text-[17px] leading-relaxed font-medium font-['Montserrat',sans-serif]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ready to Transform Section */}
      {transformSection && (
        <section className="bg-[#e8f1ff] py-20">
          <div className="container mx-auto">
            <div
              className="h-[500px] relative rounded-3xl overflow-hidden"
              style={{
                backgroundImage: transformSection.images?.[0]?.image 
                  ? `url(${getImageUrl(transformSection.images[0].image)})`
                  : 'none',
                backgroundColor: transformSection.images?.[0]?.image ? 'transparent' : '#1e2d3d',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/65 z-0"></div>
              <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 max-w-xl">
                <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-white mb-4 leading-tight font-['Poppins',sans-serif]">
                  {transformSection.title || 'Ready to Transform Your Advertising?'}
                </h2>
                <p className="mb-6 text-[17px] md:text-[17px] font-medium text-white">
                  {transformSection.description || 'With Xigi DOOH, you\'re not just getting ad space – you\'re gaining a partner committed to elevating your brand.'}
                </p>
                <button 
  onClick={handleCtaClick}
                  className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 
                    hover:from-indigo-700 hover:to-blue-700 text-white text-[18px] py-2 rounded-[5px] text-sm font-medium w-[300px] transition-all duration-300"
                >
                  See Solutions for Your Industry
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Industry;