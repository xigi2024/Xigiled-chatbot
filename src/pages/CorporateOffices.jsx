import React, { useRef, useEffect, useState } from 'react'
import {  useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import Header from '../components/Header'
import cta from '../assets/cta.png';
import corporate from '../assets/corporate-office.jpg';

const ShowcaseSlider = ({ showcaseData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (showcaseData && showcaseData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showcaseData]);

  if (!showcaseData || showcaseData.length === 0) {
    return null;
  }

  return (
    <section className="bg-blue-100 py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[45px] font-semibold text-black">For Showcase</h2>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium text-sm">
            View All
          </button>
        </div>

        <div className="flex flex-col md:flex-row bg-blue-200 rounded-xl overflow-hidden">
          {/* Left Menu */}
          <div className="w-full md:w-1/3 p-10 space-y-4">
            {showcaseData.map((item, index) => (
              <div
                key={index}
                className={`text-[20px] font-medium cursor-pointer transition-colors duration-300 ${
                  index === currentIndex ? 'text-blue-700' : 'text-black'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {item.title}
              </div>
            ))}
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden md:flex items-center justify-center ">
            <div className="w-[8px] h-125 rounded-2xl bg-blue-400"></div>
          </div>

          {/* Right Content */}
          <div className="relative w-full md:w-2/3 p-10">
            <img
              src={`http://127.0.0.1:8000/storage/${showcaseData[currentIndex].image}`}
              alt={showcaseData[currentIndex].title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold text-black">
                {showcaseData[currentIndex].title}
              </h3>
              <p className="text-[17px] text-gray-900 mb-3 font-['Montserrat',sans-serif] font-medium">
                {showcaseData[currentIndex].description || 'Enhance your corporate space with our cutting-edge display solutions.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CorporateOffices = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/corporate-offices');
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

  // Helper function to find section by section name
  const findSection = (sectionName) => {
    return apiData.find(item => item.section === sectionName);
  };

  // Helper function to render Features section with masonry layout
  const renderFeaturesSection = (featuresData) => {
    if (!featuresData || !featuresData.images) return null;

    const images = featuresData.images;
    
    return (
      <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white flex flex-col items-center">
        <h2 className="text-[45px] font-semibold text-center mb-5">{featuresData.title}</h2>

        <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: First image (tall) */}
          <div className="space-y-5">
            {images[0] && (
              <div className="relative h-[600px] rounded-xl overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/storage/${images[0].image}`}
                  alt={images[0].title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                  {images[0].title}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Second and third images */}
          <div className="space-y-5">
            {images[1] && (
              <div className="relative h-[250px] rounded-xl overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/storage/${images[1].image}`}
                  alt={images[1].title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                  {images[1].title}
                </div>
              </div>
            )}
            {images[2] && (
              <div className="relative h-[330px] rounded-xl overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/storage/${images[2].image}`}
                  alt={images[2].title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                  {images[2].title}
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Fourth and fifth images */}
          <div className="space-y-5">
            {images[3] && (
              <div className="relative h-[330px] rounded-xl overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/storage/${images[3].image}`}
                  alt={images[3].title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                  {images[3].title}
                </div>
              </div>
            )}
            {images[4] && (
              <div className="relative h-[250px] rounded-xl overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/storage/${images[4].image}`}
                  alt={images[4].title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                  {images[4].title}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get sections from API data
  const section1 = findSection('corporate_office_section1');
  const section2 = findSection('corporate_office_section2');
  const section3 = findSection('corporate_office_section3');
  const section4 = findSection('corporate_office_section4');
  const section5 = findSection('corporate_office_section5');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Banner Section - Keep as is */}
      <div className="relative h-[70vh] w-full">
        <img
          src={corporate}
          alt="corporate office Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center">
            Corporate Offices
          </h1>
        </div>
      </div>

      {/* Section 1 - Main Hero Section */}
      {section1 && (
        <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/storage/${section1.images[0].image}`}
                alt={section1.title}
                className="w-full h-[300px] md:h-[500px] lg:h-[500px] rounded-2xl object-cover"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-3xl md:text-[45px] font-semibold mb-4">
                {section1.title}
              </h2>
              <p className="text-gray-900 text-[17px] mb-6 leading-relaxed font-['Montserrat',sans-serif] font-medium">
                {section1.description}
              </p>
             
            </div>
          </div>
        </section>
      )}

      {/* Section 2 - Smart Display Types */}
      {section2 && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-28">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[45px] font-semibold mb-2">
              {section2.title}
            </h2>
            {section2.description && (
              <p className="text-gray-900 max-w-2xl text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium">
                {section2.description}
              </p>
            )}
          </div>

          {/* Display Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {section2.images.map((item, index) => (
              <div key={index} className="bg-black rounded-xl overflow-hidden shadow-md">
                <img
                  src={`http://127.0.0.1:8000/storage/${item.image}`}
                  alt={item.title}
                  className="w-full h-[230px] object-cover"
                />
                <div className="text-center py-4">
                  <p className="text-white font-['Montserrat',sans-serif] font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 3 - Mounting Options */}
      {section3 && (
        <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {section3.title}
            </h2>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {section3.images.map((item, index) => (
              <div key={index} className="bg-[#EAF1FF] rounded-xl overflow-hidden shadow-md">
                <img
                  src={`http://127.0.0.1:8000/storage/${item.image}`}
                  alt={item.title}
                  className="w-full h-64 md:h-70 lg:h-100 object-cover"
                />
                <div className="text-center p-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4 - Showcase Slider */}
      {section4 && <ShowcaseSlider showcaseData={section4.images} />}

      {/* Section 5 - Features */}
      {section5 && renderFeaturesSection(section5)}

      {/* CTA Section - Keep as is */}
      <section className="w-full bg-[#f2f2fd] py-27 px-4">
        <div className="container mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          {/* Left Image */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
            <img
              src={cta}
              alt="DOOH Display"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
            <h2 className="text-3xl md:text-[45px] font-semibold text-black mb-2">
              Ready to Transform Your Advertising?
            </h2>
            <p className="text-gray-700 mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] font-medium">
              With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand
            </p>
             <button onClick={() => navigate('/contact')}
className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300">
              See Solutions for Your Industry
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CorporateOffices;