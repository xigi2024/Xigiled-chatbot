import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link2 } from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Industry = () => {
  const navigate = useNavigate();
  const [industryData, setIndustryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to convert title to URL slug
  const createSlug = (title) => {
    const specialCases = {
      'Manfacturing and factories': 'ManfacturingAndFactories',
      'Transport and Public Venues': 'TransportAndPublicVenues',
      'Hospitality & Hotels': 'HospitalityHotels',
      'Government & Civic Spaces': 'GovernmentCivicSpaces',
      'Events & Exhibitions': 'EventsAndExhibitions',
      'Education and Institutions': 'EducationAndInstitutions',
      'Retail': 'Retail'
    };

    if (specialCases[title]) {
      return specialCases[title];
    }

    return title
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
        const data = Array.isArray(result) ? result : (result.data ? result.data : []);
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

  // Handle card click
  const handleCardClick = (title) => {
    const slug = createSlug(title);
    navigate(`/industry/${slug}`);
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

  // Organize data by section
  const organizedData = {};
  industryData.forEach(item => {
    organizedData[item.section] = item;
  });

  const heroSection = organizedData['industry_section1'];
  const digitalImpactSection = organizedData['industry_section2'];
  const industrySection = organizedData['industry_section3'];
  const keyFeaturesSection = organizedData['industry_section4'];
  const transformSection = organizedData['industry_section5'];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] lg:min-h-[90vh] pr-[100px] bg-gradient-to-br from-[#000000] via-[#010150] to-[#000000] py-24 pl-[10px] md:pl-[40px] lg:pl-[100px] flex flex-col md:flex-row items-center justify-between">
        <div className="container mx-auto">
          <div className="flex-1 text-left">
            <h2 className="text-lg md:text-[17px] lg:text-[22px] font-medium text-white mb-2">
              XIGI LED Display
            </h2>
            <h1 className="text-[30px] md:text-[35px] lg:text-[50px] text-white mb-6 leading-[1.3] font-['Poppins',sans-serif]">
              {heroSection?.title || 'Brilliant LED Solutions for Every Sector'}
            </h1>
            <p className="text-white/100 text-lg md:text-[15px] lg:text-xl max-w-2xl mb-4 leading-[30px] font-['Montserrat',sans-serif]">
              {heroSection?.description || 'Discover LED display solutions tailored for every industry—retail, education, hospitality, corporate, and more.'}
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hidden md:block w-full md:w-auto mt-10 md:mt-0">
          {heroSection?.images?.[0] && (
            <img
              src={`${API_BASE_URL.replace('/api', '')}/storage/${heroSection.images[0].image}`}
              alt="LED Display"
              className="w-full md:w-[700px] lg:w-[1000px] drop-shadow-2xl mx-auto"
            />
          )}
        </div>
      </section>

      {/* Digital Impact by Industry Section */}
      <section className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 z-20 relative py-16 md:py-20 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            {digitalImpactSection?.images?.[0] && (
              <img
                src={`${API_BASE_URL.replace('/api', '')}/storage/${digitalImpactSection.images[0].image}`}
                alt="Digital Impact"
                className="h-auto md:h-120 lg:h-auto rounded-xl shadow-xl w-full max-w-md md:max-w-full"
              />
            )}
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-4 leading-snug text-gray-900 font-['Poppins',sans-serif]">
              {digitalImpactSection?.title || 'Digital Impact by Industry'}
            </h2>
            <p className="text-gray-800 text-[14px] md:text-[16px] lg:text-[16px] font-medium font-['Montserrat',sans-serif] mb-6 leading-relaxed">
              {digitalImpactSection?.description || 'At XIGI Tech, we deliver tailored digital solutions across a wide range of industries — from retail and real estate to education and entertainment.'}
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

      {/* Industry Solutions Section */}
      <section className="bg-[#e8f1ff] py-16 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-center mb-10 font-['Poppins',sans-serif]">
            {industrySection?.title || 'INDUSTRY SOLUTIONS'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
            {industrySection?.images?.map((card, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick(card.title)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group block relative cursor-pointer"
              >
                {/* Image with hover icon */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${API_BASE_URL.replace('/api', '')}/storage/${card.image}`}
                    alt={card.title}
                    className="w-full h-50 md:h-50 lg:h-62 object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <h3 className="text-[16px] md:text-[18px] lg:text-[22px] my-2 font-medium text-gray-900 font-['Poppins',sans-serif]">
                    {card.title}
                  </h3>
                  <p className="text-[15px] pb-3 text-gray-700 mt-1 pr-[15px] max-w-full pr-[10px] md:max-w-full lg:max-w-80 font-medium font-['Montserrat',sans-serif]">
                    {card.description}
                  </p>

                  {/* Always show icon in bottom-right on desktop */}
                  <div className="absolute bottom-6 right-6 hidden lg:block">
                    <span className="bg-[#e6ecf6] p-4 rounded-[5px] shadow-lg inline-flex items-center justify-center">
                      <Link2 className="h-6 w-6 text-[#3a4a6f]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-white py-16 md:py-16 lg:py-24">
        <div className="">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-center mb-10 font-['Poppins',sans-serif]">
            {keyFeaturesSection?.title || 'Key Features of Our LED Video Walls'}
          </h2>

          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyFeaturesSection?.images?.map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#f8faff] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
              >
                {/* Icon Top-Left */}
                <div className="mb-4">
                  <div className="bg-[#eef3ff] p-3 rounded-md inline-block">
                    {feature.image && (
                      <img
                        src={`${API_BASE_URL.replace('/api', '')}/storage/${feature.image}`}
                        alt={feature.title}
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                </div>

                {/* Title + Description */}
                <h3 className="text-md md:text-[20px] font-medium text-[#000] mb-2 font-['Poppins',sans-serif]">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-medium font-['Montserrat',sans-serif]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Transform Section */}
      <section className="bg-[#f2f2fd] py-20">
        <div className="container mx-auto">
          <div
            className="h-[500px] relative rounded-3xl overflow-hidden"
            style={{
              backgroundImage: transformSection?.images?.[0] 
                ? `url(${API_BASE_URL.replace('/api', '')}/storage/${transformSection.images[0].image})`
                : 'none',
              backgroundColor: transformSection?.images?.[0] ? 'transparent' : '#1e2d3d',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Content Over Image */}
            <div className="relative z-10 h-full flex flex-col bg-black/30 justify-center px-6 sm:px-10 max-w-xl">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-white mb-4 leading-tight font-['Poppins',sans-serif]">
                {transformSection?.title || 'Ready to Transform Your Advertising?'}
              </h2>
              <p className="mb-6 text-[17px] md:text-[17px] font-medium text-white">
                {transformSection?.description || 'With Xigi DOOH, you\'re not just getting ad space – you\'re gaining a partner committed to elevating your brand.'}
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white w-[280px] text-semibold hover:from-indigo-700 cursor-pointer px-7 py-3 rounded-md shadow-md text-[16px]"
              >
                See Solutions for Your Industry
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industry;