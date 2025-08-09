import React, { useRef, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ledWave from '../assets/led-wave.png';
import { useNavigate } from 'react-router-dom';
import { Link ,  } from "react-router-dom";
import Highdefinition from '../assets/industry/High-definition.png'
import seamless from '../assets/industry/seamless.png'
import vibrantColor from '../assets/industry/vibrantColor.png'
import WideAngle from '../assets/industry/WideAngle.png'
import ultraThin from '../assets/industry/ultraThin.png'
import {
  ChevronLeft,
  ChevronRight,
  Container
} from "lucide-react";

const ManufacturingFactories = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://xigiled.in/api/manufacturing-factories');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get section data by section name
  const getSectionData = (sectionName) => {
    return apiData.find(item => item.section === sectionName);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Get data for different sections
  const heroSection = getSectionData('manufacturing_factory_section1');
  const visibilitySection = getSectionData('manufacturing_factory_section2');
  const smartDisplaysSection = getSectionData('manufacturing_factory_section3');
  const smartFeaturesSection = getSectionData('manufacturing_factory_section4');
  const showcaseSection = getSectionData('manufacturing_factory_section5');
  const flexibleDisplaySection = getSectionData('manufacturing_factory_section6');
  const eventPlannersSection = getSectionData('manufacturing_factory_section7');
  const transformSection = getSectionData('manufacturing_factory_section8');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff]">
      <Header />
      
      {/* Hero Section */}
      {heroSection && (
        <section className="relative min-h-[40vh] md:min-h-[60vh] lg:min-h-[90vh] bg-gradient-to-br from-[#000000] via-[#010150] to-[#000000] py-24 pl-[10px] md:pl-[40px] lg:pl-[100px] flex flex-col md:flex-row items-center justify-between">
          <div className="container mx-auto">
            <div className="flex-1 text-left">
              <h1 className="text-lg md:text-[20px] lg:text-[20px] uppercase font-medium text-white mb-2">
                {heroSection.title || "XIGI LED Display"}
              </h1>

              <p className="text-[30px] md:text-[30px] lg:text-[30px] text-white mb-6 leading-tight">
                {heroSection.description || "Brilliant LED Solutions for Manufacturing Factories"}
              </p>
            </div>
          </div>

          <div className="hidden md:block w-full md:w-auto mt-10 md:mt-0">
            {heroSection.images?.[0]?.image && (
              <img
                src={`https://xigiled.in/storage/${heroSection.images[0].image}`}
                alt="LED Display"
                className="w-full md:w-[600px] h-[400px] lg:w-[600px] drop-shadow-2xl mx-auto"
              />
            )}
          </div>
        </section>
      )}

      {/* Visibility & Versatility Section */}
      <section className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 z-20 relative py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="container text-sm text-gray-500 mb-10">
          <span className="inline-flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-1 text-decoration-none text-black hover:underline">
              🏠 Home
            </Link>
            <span>›</span>
            <Link to="/industry" className="text-gray-500 text-decoration-none hover:text-blue-600 hover:underline">
              Industry
            </Link>
            <span>›</span>
            <span className="text-blue-600 text-decoration-none font-medium">Manufacturing Factories</span>
          </span>
        </div>

        <div className="container mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <div className="flex justify-center w-full">
            <img
              src={visibilitySection?.images?.[0]?.image ? `https://xigiled.in/storage/${visibilitySection.images[0].image}` : ""}
              alt="LED Display in Factory"
              className="w-full max-w-[800px] h-80 md:h-100 lg:h-120 rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="w-full">
            <h2 className="text-[35px] font-semibold mb-4 text-gray-900 leading-tight">
              {visibilitySection?.title || "Designed for Manufacturing Environments"}
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
              {visibilitySection?.description || "Our LED displays are built to perform in demanding factory settings. Every unit is engineered to provide excellent image clarity, easy setup, and dependable operation in industrial conditions."}
            </p>

            <div className="space-y-6">
              {visibilitySection?.images?.slice(1).map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-2 rounded-md ${
                    index === 0 ? 'bg-blue-100 text-blue-700' : 
                    index === 1 ? 'bg-purple-100 text-purple-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {index === 0 ? '🏭' : index === 1 ? '⚙️' : '🛠️'}
                  </div>
                  <p className="text-gray-900 text-base leading-relaxed">
                    <strong>{item.title}</strong>{item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart Displays Section */}
      <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-24">
        <div className='container mx-auto'>
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-[35px] font-medium mb-2">
              {smartDisplaysSection?.title || "Smart Displays for Efficient Manufacturing"}
            </h2>
            <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium">
              {smartDisplaysSection?.description || "Manufacturing plants use LED displays for production monitoring, safety alerts, and process visualization"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
            {smartDisplaysSection?.images?.map((item, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden shadow-md h-[300px]">
                <img
                  src={`https://xigiled.in/storage/${item.image}`}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-4">
                  <p className="text-white text-[20px] font-['Montserrat',sans-serif] font-medium text-center">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Features Section */}
      <SmartFeaturesSection data={smartFeaturesSection} />

      {/* Showcase Section */}
      <ShowcaseSlider data={showcaseSection} />

      {/* Flexible Display Sizes Section */}
      <section className="bg-white py-22 px-4 md:px-10 lg:px-28">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Text + Cards */}
          <div>
            <h2 className="text-[35px] font-semibold text-gray-900 leading-tight mb-4">
              {flexibleDisplaySection?.title || "Industrial-Grade Display Solutions"}
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-8 max-w-xl">
              {flexibleDisplaySection?.description || "Choose from a range of rugged displays designed for factory environments:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md">
              {flexibleDisplaySection?.images?.slice(1).map((item, index) => (
                <div key={index} className="bg-[#EAF1FF] hover:bg-[#dce8ff] transition rounded-xl p-5 shadow-md">
                  <h4 className="text-blue-700 text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-800 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div>
            <img
              src={flexibleDisplaySection?.images?.[0]?.image ? `https://xigiled.in/storage/${flexibleDisplaySection.images[0].image}` : ""}
              alt="Factory Display"
              className="rounded-xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Manufacturers Choose Section */}
      <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#EAF1FF] flex flex-col items-center">
        <h2 className="text-[32px] md:text-[42px] font-semibold text-center mb-10">
          Why Manufacturers Choose Xigi LED
        </h2>

        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: High-definition */}
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 h-full flex flex-col justify-between shadow-lg">
              <img
                src={Highdefinition}
                alt="High-definition"
                className="w-full object-cover rounded-md mb-4"
              />
              <div>
                <h3 className="text-white text-xl font-bold mb-2">High-definition</h3>
                <p className="text-white text-sm">
                  Crystal-clear visuals with stunning clarity ensure every detail stands out. Experience
                  sharp, lifelike images that captivate your audience instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Seamless + Vibrant Color */}
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg">
              <img
                src={seamless}
                alt="Seamless"
                className="mx-auto w-70 object-cover rounded-md mb-3"
              />
              <div>
                <h3 className="text-white text-lg font-semibold">Seamless</h3>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg">
              <img
                src={vibrantColor}
                alt="Vibrant Color"
                className="w-full object-cover rounded-md mb-3"
              />
              <div>
                <h3 className="text-white text-lg font-semibold">Vibrant Color</h3>
                <p className="text-white text-sm">
                  Vibrant colors that pop with brilliance, bringing every image to life.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Ultra-thin + Wide Angle */}
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg">
              <img
                src={ultraThin}
                alt="Ultra-thin"
                className="w-66 object-cover rounded-md mb-3"
              />
              <div>
                <h3 className="text-white text-lg font-semibold">Ultra-thin</h3>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg">
              <img
                src={WideAngle}
                alt="Wide Angle"
                className="w-full object-cover rounded-md mb-3"
              />
              <div>
                <h3 className="text-white text-lg font-semibold">Wide Angle</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Transform Section */}
      <section className="bg-[#f2f2fd] py-20">
        <div className="container mx-auto">
          <div
            className="h-[500px] relative rounded-3xl overflow-hidden"
            style={{
              backgroundImage: transformSection?.images?.[0]?.image ? `url(https://xigiled.in/storage/${transformSection.images[0].image})` : '',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/55 z-0"></div>

            {/* Content Over Image */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 max-w-xl">
              <h2 className="text-[30px] md:text-[40px] font-medium text-white mb-4 leading-tight">
                {transformSection?.title || "Ready to Transform Your Manufacturing Operations?"}
              </h2>
              <p className="mb-6 text-[17px] md:text-[17px] font-medium text-white">
                {transformSection?.description || "With Xigi LED displays, you're not just getting screens – you're gaining a partner committed to elevating your operational efficiency."}
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

// Smart Features Section Component
const SmartFeaturesSection = ({ data }) => {
  const [openIndoor, setOpenIndoor] = useState(null);
  const [openOutdoor, setOpenOutdoor] = useState(null);

  if (!data) return null;

  const indoorData = data.images?.find(img => img.title === "Indoor LED Displays");
  const outdoorData = data.images?.find(img => img.title === "Outoor LED Displays");

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[35px] font-medium text-gray-900 mb-2">
            {data.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Indoor */}
          {indoorData && (
            <div className="bg-[#F4F6FA] rounded-xl shadow-md overflow-hidden">
              <img
                src={`https://xigiled.in/storage/${indoorData.image}`}
                alt="Indoor LED"
                className="w-full object-cover h-[400px]  mb-4 rounded-t-xl"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold text-center mb-4">{indoorData.title}</h3>
                <div className="space-y-3">
                  {indoorData.faqs?.map((faq, index) => (
                    <div 
                      key={index}
                      onClick={() => setOpenIndoor(openIndoor === index ? null : index)}
                      className="bg-white rounded-md border-[3px] border-[#E8F1FF] p-4 cursor-pointer"
                    >
                      <div className="font-semibold flex justify-between items-center">
                        <span>{faq.question}</span>
                        <span className="text-lg">
                          {openIndoor === index ? '−' : '+'}
                        </span>
                      </div>
                      <div
                        className={`text-sm text-gray-700 transition-all duration-300 overflow-hidden ${
                          openIndoor === index ? "mt-3 opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
                        }`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Outdoor */}
          {outdoorData && (
            <div className="bg-[#F4F6FA] rounded-xl shadow-md overflow-hidden">
              <img
                src={`https://xigiled.in/storage/${outdoorData.image}`}
                alt="Outdoor LED"
                className="w-full object-cover h-[400px] mb-4 rounded-t-xl"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold text-center mb-4">Outdoor LED Displays</h3>
                <div className="space-y-3">
                  {outdoorData.faqs?.map((faq, index) => (
                    <div 
                      key={index}
                      onClick={() => setOpenOutdoor(openOutdoor === index ? null : index)}
                      className="bg-white rounded-md border-[3px] border-[#E8F1FF] p-4 cursor-pointer"
                    >
                      <div className="font-semibold flex justify-between items-center">
                        <span>{faq.question}</span>
                        <span className="text-lg">
                          {openOutdoor === index ? '−' : '+'}
                        </span>
                      </div>
                      <div
                        className={`text-sm text-gray-700 transition-all duration-300 overflow-hidden ${
                          openOutdoor === index ? "mt-3 opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
                        }`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Note */}
        <div className="bg-[#EDF3FF] text-sm md:text-base text-gray-800 px-6 py-4 rounded-md flex items-center gap-3 mt-10">
          <span className="text-yellow-500 text-xl">💡</span>
          <p>Suggestion: P5 to P10 is a suitable choice for industrial applications.</p>
        </div>
      </div>
    </section>
  );
};

// Showcase Slider Component
const ShowcaseSlider = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data || !data.images) return null;

  const showcaseItems = data.images.map(img => ({
    title: img.title,
    image: `https://xigiled.in/storage/${img.image}`
  }));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? showcaseItems.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showcaseItems.length]);

  return (
    <section className="bg-[#EAF1FF] py-22 ">
      <div className="container mx-auto text-center">
        <h2 className="text-[35px] font-semibold text-gray-900 mb-6">
          {data.title || "Manufacturing Showcase"}
        </h2>
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={showcaseItems[currentIndex]?.image}
            alt={showcaseItems[currentIndex]?.title}
            className="w-full h-[550px] object-cover rounded-2xl"
          />
          <h3 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xl md:text-2xl font-semibold drop-shadow-lg">
            {showcaseItems[currentIndex]?.title}
          </h3>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingFactories;