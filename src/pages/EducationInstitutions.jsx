import React, { useRef, useEffect, useState } from 'react'
import {  useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import Header from '../components/Header'
import indoorImage from '../assets/goverment.jpg';
import education from '../assets/education.webp';

const EducationInstitutions = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
  

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://xigiled.in/api/education');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Find sections by their identifiers
  const getSection = (sectionId) => {
    return apiData.find(item => item.section === sectionId) || {};
  };

  const heroSection = getSection('education_section1');
  const smartDisplaySection = getSection('education_section2');
  const mountingSection = getSection('education_section3');
  const showcaseSection = getSection('education_section4');
  const featuresSection = getSection('education_section5');

  // Auto-rotate showcase slider
  useEffect(() => {
    if (showcaseSection.images && showcaseSection.images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % showcaseSection.images.length
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showcaseSection.images]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Banner Section - Keep as hardcoded */}
      <div className="relative h-[70vh] w-full">
        <img
          src={education}
          alt="education Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center">
            Education Institutions
          </h1>
        </div>
      </div>

      {/* Hero Section - API Data */}
      {heroSection.images && heroSection.images.length > 0 && (
        <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="flex justify-center">
              <img
                src={`https://xigiled.in/storage/${heroSection.images[0].image}`}
                alt={heroSection.title}
                className="w-full h-[300px] md:h-[500px] lg:h-[500px] rounded-2xl object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-[45px] font-semibold mb-4">
                {heroSection.title}
              </h2>
              <p className="text-gray-900 text-[17px] mb-6 leading-relaxed font-['Montserrat',sans-serif] font-medium">
                {heroSection.description}
              </p>
         
            </div>
          </div>
        </section>
      )}

      {/* Smart Display Types Section - API Data */}
      {smartDisplaySection.images && smartDisplaySection.images.length > 0 && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-28">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[45px] font-semibold mb-2">
              {smartDisplaySection.title}
            </h2>
            {smartDisplaySection.description && (
              <p className="text-gray-900 max-w-2xl text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium">
                {smartDisplaySection.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {smartDisplaySection.images.slice(0, 4).map((item, index) => (
              <div key={index} className="bg-black rounded-xl overflow-hidden shadow-md">
                <img
                  src={`https://xigiled.in/storage/${item.image}`}
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

          {/* Additional items if more than 4 */}
          {smartDisplaySection.images.length > 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
              {smartDisplaySection.images.slice(4).map((item, index) => (
                <div key={index + 4} className="bg-black rounded-xl overflow-hidden shadow-md">
                  <img
                    src={`https://xigiled.in/storage/${item.image}`}
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
          )}
        </section>
      )}

      {/* Mounting Section - API Data */}
      {mountingSection.images && mountingSection.images.length > 0 && (
        <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {mountingSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {mountingSection.images.map((item, index) => (
              <div key={index} className="bg-[#EAF1FF] rounded-xl overflow-hidden shadow-md">
                <img
                  src={`https://xigiled.in/storage/${item.image}`}
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

      {/* Showcase Slider Section - API Data */}
      {showcaseSection.images && showcaseSection.images.length > 0 && (
        <section className="bg-blue-100 py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-[45px] font-semibold text-black">
                {showcaseSection.title}
              </h2>
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium text-sm">
                View All
              </button>
            </div>

            <div className="flex flex-col md:flex-row bg-blue-200 rounded-xl overflow-hidden">
              {/* Left Menu */}
              <div className="w-full md:w-1/3 p-10 space-y-4">
                {showcaseSection.images.map((item, index) => (
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
              <div className="hidden md:flex items-center justify-center">
                <div className="w-[8px] h-125 rounded-2xl bg-blue-400"></div>
              </div>

              {/* Right Content */}
              <div className="relative w-full md:w-2/3 p-10">
                <img
                  src={`https://xigiled.in/storage/${showcaseSection.images[currentIndex]?.image}`}
                  alt={showcaseSection.images[currentIndex]?.title}
                  className="w-full h-[400px] object-cover rounded-xl"
                />
                <div className="mt-4">
                  <h3 className="text-[22px] font-semibold text-black">
                    {showcaseSection.images[currentIndex]?.title}
                  </h3>
                  {showcaseSection.images[currentIndex]?.description && (
                    <p className="text-[17px] text-gray-900 mb-3 font-['Montserrat',sans-serif] font-medium">
                      {showcaseSection.images[currentIndex].description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section - API Data */}
      {featuresSection.images && featuresSection.images.length > 0 && (
        <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white flex flex-col items-center">
          <h2 className="text-[45px] font-semibold text-center mb-5">
            {featuresSection.title}
          </h2>

          <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* First column - Single large image */}
            {featuresSection.images[0] && (
              <div className="space-y-5">
                <div className="relative h-[600px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[0].image}`}
                    alt={featuresSection.images[0].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                    {featuresSection.images[0].title}
                  </div>
                </div>
              </div>
            )}

            {/* Second column - Two stacked images */}
            <div className="space-y-5">
              {featuresSection.images[1] && (
                <div className="relative h-[290px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[1].image}`}
                    alt={featuresSection.images[1].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[1].title}
                  </div>
                </div>
              )}
              {featuresSection.images[2] && (
                <div className="relative h-[290px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[2].image}`}
                    alt={featuresSection.images[2].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[2].title}
                  </div>
                </div>
              )}
            </div>

            {/* Third column - Two stacked images */}
            <div className="space-y-5">
              {featuresSection.images[3] && (
                <div className="relative h-[290px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[3].image}`}
                    alt={featuresSection.images[3].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[3].title}
                  </div>
                </div>
              )}
              {featuresSection.images[4] && (
                <div className="relative h-[290px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[4].image}`}
                    alt={featuresSection.images[4].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[4].title}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Keep as hardcoded */}
      <section className="w-full bg-[#f2f2fd] py-27 px-4">
        <div className="container mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
            <img
              src={indoorImage}
              alt="DOOH Display"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
            <h2 className="text-3xl md:text-[45px] font-semibold text-black mb-2">
              Ready to Transform Your Advertising?
            </h2>
            <p className="text-gray-700 mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] font-medium">
              With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand
            </p>
            <button   onClick={() => navigate('/contact')}
 className="bg-gradient-to-r from-blue-600 cursor-pointer to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300">
              See Solutions for Your Industry
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EducationInstitutions;